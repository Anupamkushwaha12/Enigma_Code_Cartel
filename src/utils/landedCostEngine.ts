import { AdminFeeConfig, LandedEconomics, LocationInfo } from '../types';

export const DEFAULT_FEE_CONFIG: AdminFeeConfig = {
  supplierFeePercent: 8, // 8%
  receiverFeePercent: 6, // 6%
  defaultUsdInrRate: 83.5, // 1 USD = 83.5 INR
  importDutyElectronicsPercent: 7.5, // 7.5% basic customs duty
  gstGeneralPercent: 18, // 18% IGST
  riskReservePercent: 2.5, // 2.5% buffer for buffer/fx/claims
};

interface LandedCostCalculationParams {
  quantity: number;
  basePrice: number;
  currency: 'USD' | 'INR';
  weightKg: number;
  origin: LocationInfo;
  destination: LocationInfo;
  expectedDestinationValueInr?: number;
  maxBuyerBudgetInr?: number;
  refurbishmentRequired?: boolean;
  testingRequired?: boolean;
  certificationRequired?: boolean;
  customFeeConfig?: Partial<AdminFeeConfig>;
}

export function calculateLandedEconomics(params: LandedCostCalculationParams): LandedEconomics {
  const config = { ...DEFAULT_FEE_CONFIG, ...(params.customFeeConfig || {}) };
  const {
    quantity,
    basePrice,
    currency,
    weightKg,
    origin,
    destination,
    refurbishmentRequired = false,
    testingRequired = false,
    certificationRequired = false,
  } = params;

  const exchangeRate = currency === 'USD' ? config.defaultUsdInrRate : 1.0;
  const isCrossBorder = origin.country !== destination.country;

  // 1. Acquisition / Source Value
  const totalBaseValueSource = basePrice * quantity;
  const acquisitionCostInr = totalBaseValueSource * exchangeRate;

  // 2. Logistics & Freight Model
  // Mock distance & freight formula:
  let distanceKm = 1200; // default domestic
  if (isCrossBorder) {
    if (origin.country.toLowerCase().includes('usa')) distanceKm = 13500;
    else if (origin.country.toLowerCase().includes('china')) distanceKm = 5200;
    else distanceKm = 8000;
  }

  // Base freight + distance rate + weight factor
  const baseFreightInr = isCrossBorder ? 45000 : 12000;
  const perTonKmRate = isCrossBorder ? 3.8 : 2.6; // INR per ton per km
  const totalWeightTonnes = Math.max(weightKg / 1000, 0.1);
  const calculatedFreight = baseFreightInr + (distanceKm * perTonKmRate * totalWeightTonnes);
  const freightCostInr = Math.round(calculatedFreight);

  // Marine/Cargo Insurance: 0.8% of acquisition
  const insuranceCostInr = Math.round(acquisitionCostInr * 0.008);

  // Domestic port/hub haulage & last-mile transfer
  const domesticTransportInr = isCrossBorder ? Math.round(18000 + (totalWeightTonnes * 1400)) : Math.round(6000 + (totalWeightTonnes * 900));

  // 3. Processing, Refurbishment & Certification
  let processingPerUnit = 0;
  if (refurbishmentRequired) processingPerUnit += 850;
  if (testingRequired) processingPerUnit += 350;
  if (certificationRequired) processingPerUnit += 250;
  const processingCostInr = Math.round(processingPerUnit * quantity);

  // 4. Compliance & Regulatory
  // BIS, DGFT, EPR & customs clearance filing
  const complianceCostInr = isCrossBorder ? Math.round(35000 + (quantity * 45)) : Math.round(12000 + (quantity * 10));

  // Customs Import Duty (Cross-border only)
  const importDutyInr = isCrossBorder 
    ? Math.round(acquisitionCostInr * (config.importDutyElectronicsPercent / 100))
    : 0;

  // GST / VAT (recoverable in supply chain, but counted in landed cashflow)
  const assessableValue = acquisitionCostInr + freightCostInr + insuranceCostInr + importDutyInr;
  const gstVatInr = Math.round(assessableValue * (config.gstGeneralPercent / 100));

  // 5. Risk Reserve & Contingency
  const riskReserveInr = Math.round(acquisitionCostInr * (config.riskReservePercent / 100));

  // 6. Platform Fees
  const supplierPlatformFeeInr = Math.round(acquisitionCostInr * (config.supplierFeePercent / 100));
  const receiverPlatformFeeInr = Math.round((acquisitionCostInr + freightCostInr) * (config.receiverFeePercent / 100));
  const logisticsMarginInr = Math.round(freightCostInr * 0.08); // 8% logistics margin

  // 7. Total Landed Cost (What Receiver pays to land the lot in India)
  // Total landed = Acquisition + Freight + Insurance + Domestic + Processing + Compliance + Duty + GST + Risk + Receiver Fee
  const totalLandedCostInr = Math.round(
    acquisitionCostInr +
    freightCostInr +
    insuranceCostInr +
    domesticTransportInr +
    processingCostInr +
    complianceCostInr +
    importDutyInr +
    gstVatInr +
    riskReserveInr +
    receiverPlatformFeeInr
  );

  const costPerUnitInr = Math.round(totalLandedCostInr / quantity);

  // 8. Expected Destination Value & Viability Analysis
  let expectedDestValuePerUnit = params.expectedDestinationValueInr;
  if (!expectedDestValuePerUnit) {
    // If not supplied, estimate benchmark market value
    if (params.maxBuyerBudgetInr) {
      expectedDestValuePerUnit = params.maxBuyerBudgetInr * 1.15;
    } else {
      expectedDestValuePerUnit = costPerUnitInr * 1.25;
    }
  }

  const expectedDestinationValueInr = Math.round(expectedDestValuePerUnit * quantity);
  const netMarginTotalInr = expectedDestinationValueInr - totalLandedCostInr;
  const netMarginPerUnitInr = Math.round(netMarginTotalInr / quantity);
  const marginPercent = Number(((netMarginTotalInr / expectedDestinationValueInr) * 100).toFixed(1));

  // Viability Gate:
  // Must have positive net margin AND if buyer budget is specified, costPerUnit must not exceed budget
  let isViable = true;
  let viabilityReason = 'Economically feasible with healthy destination arbitrage.';

  if (params.maxBuyerBudgetInr && costPerUnitInr > params.maxBuyerBudgetInr) {
    isViable = false;
    viabilityReason = `Landed cost (₹${costPerUnitInr.toLocaleString('en-IN')}/unit) exceeds receiver maximum budget (₹${params.maxBuyerBudgetInr.toLocaleString('en-IN')}/unit).`;
  } else if (netMarginTotalInr <= 0) {
    isViable = false;
    viabilityReason = 'Negative unit margin: Landed logistics and compliance exceed destination market absorption value.';
  } else if (marginPercent < 8) {
    isViable = false;
    viabilityReason = 'Arbitrage spread below minimum viability threshold (8% net reserve).';
  }

  // Supplier-facing view
  const supplierGrossValueInr = acquisitionCostInr;
  const supplierNetPayoutInr = Math.round(acquisitionCostInr - supplierPlatformFeeInr);

  return {
    baseValueSourceCurrency: totalBaseValueSource,
    currencySource: currency,
    exchangeRateToInr: exchangeRate,
    acquisitionCostInr,
    freightCostInr,
    insuranceCostInr,
    domesticTransportInr,
    processingCostInr,
    complianceCostInr,
    importDutyInr,
    gstVatInr,
    riskReserveInr,
    supplierPlatformFeeInr,
    receiverPlatformFeeInr,
    logisticsMarginInr,
    totalLandedCostInr,
    costPerUnitInr,
    expectedDestinationValueInr,
    expectedDestinationValuePerUnitInr: expectedDestValuePerUnit,
    netMarginTotalInr,
    netMarginPerUnitInr,
    marginPercent,
    isViable,
    viabilityReason,
    supplierGrossValueInr,
    supplierNetPayoutInr,
    receiverTotalLandedCostInr: totalLandedCostInr,
  };
}
