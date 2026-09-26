import { ImpactReportData, Transaction } from '../types';

interface MaterialFactor {
  baselineDisposalEmissionsPerUnitTonnes: number; // emissions if discarded/landfilled/crude smelter
  axiaRefurbEmissionsPerUnitTonnes: number; // refurbishment / testing energy footprint
  transportFactorPerTonKm: number; // tCO2e per ton-km
  virginAvoidanceFactorPerUnitTonnes: number; // embodied carbon saved from not manufacturing new unit
}

const MATERIAL_FACTORS: Record<string, MaterialFactor> = {
  // Laptops: ~250-300kg embodied CO2e per new unit; ~45kg in crude e-waste landfill/incineration
  laptops: {
    baselineDisposalEmissionsPerUnitTonnes: 0.045, // 45 kg CO2e
    axiaRefurbEmissionsPerUnitTonnes: 0.012, // 12 kg CO2e for cleaning, testing, parts
    transportFactorPerTonKm: 0.000085, // maritime/air blended
    virginAvoidanceFactorPerUnitTonnes: 0.220, // 220 kg embodied CO2e saved by extending lifespan 3 years
  },
  // Smartphones / components
  components: {
    baselineDisposalEmissionsPerUnitTonnes: 0.008,
    axiaRefurbEmissionsPerUnitTonnes: 0.002,
    transportFactorPerTonKm: 0.000085,
    virginAvoidanceFactorPerUnitTonnes: 0.048,
  },
  // Metals (per ton)
  metals: {
    baselineDisposalEmissionsPerUnitTonnes: 0.35, // primary mining/smelting displacement
    axiaRefurbEmissionsPerUnitTonnes: 0.15, // re-melting / extrusion
    transportFactorPerTonKm: 0.000035, // rail/road freight
    virginAvoidanceFactorPerUnitTonnes: 2.10, // 2.1 tonnes CO2e per tonne of virgin metal displaced
  },
  // Default general
  default: {
    baselineDisposalEmissionsPerUnitTonnes: 0.05,
    axiaRefurbEmissionsPerUnitTonnes: 0.015,
    transportFactorPerTonKm: 0.000060,
    virginAvoidanceFactorPerUnitTonnes: 0.18,
  },
};

export function calculateTransactionImpact(
  tx: Transaction,
  resourceName: string,
  category: string,
  weightKg: number
): ImpactReportData {
  let factorKey = 'default';
  const lowerName = (resourceName + ' ' + category).toLowerCase();
  if (lowerName.includes('laptop') || lowerName.includes('computer') || lowerName.includes('latitude')) {
    factorKey = 'laptops';
  } else if (lowerName.includes('ram') || lowerName.includes('ssd') || lowerName.includes('phone') || lowerName.includes('component')) {
    factorKey = 'components';
  } else if (lowerName.includes('metal') || lowerName.includes('copper') || lowerName.includes('steel') || lowerName.includes('aluminum')) {
    factorKey = 'metals';
  }

  const factor = MATERIAL_FACTORS[factorKey] || MATERIAL_FACTORS.default;
  const quantity = tx.quantity;
  const totalWeightTonnes = Math.max(weightKg / 1000, 0.05);

  // Approximate transit distance
  const isCrossBorder = tx.sellerAnonymousHub.includes('USA') || tx.sellerAnonymousHub.includes('China');
  const distanceKm = isCrossBorder ? 13500 : 1200;

  // 1. Transport Emissions
  const transportEmissionsTonnes = Number(
    (totalWeightTonnes * distanceKm * factor.transportFactorPerTonKm).toFixed(2)
  );

  // 2. Processing Emissions (Refurbishment / re-sorting)
  const processingEmissionsTonnes = Number(
    (quantity * factor.axiaRefurbEmissionsPerUnitTonnes).toFixed(2)
  );

  // Total AXIA pathway footprint
  const axiaCo2eTonnes = Number((transportEmissionsTonnes + processingEmissionsTonnes).toFixed(2));

  // 3. Baseline Pathway Footprint:
  // Baseline includes conventional disposal (e.g. municipal solid waste / shredding) + displacement of newly manufactured replacement goods
  const directDisposalImpact = quantity * factor.baselineDisposalEmissionsPerUnitTonnes;
  const avoidedNewManufacturingImpact = quantity * factor.virginAvoidanceFactorPerUnitTonnes;
  const baselineCo2eTonnes = Number((directDisposalImpact + avoidedNewManufacturingImpact).toFixed(2));

  // 4. Net Avoided Emissions
  const avoidedCo2eTonnes = Number(Math.max(0, baselineCo2eTonnes - axiaCo2eTonnes).toFixed(2));

  return {
    id: `RPT-${tx.id}`,
    transactionId: tx.id,
    transactionCode: tx.code,
    resourceName,
    quantity,
    unit: tx.unit,
    originRegion: tx.sellerAnonymousHub,
    destinationRegion: tx.buyerAnonymousHub,
    baselinePathway: 'End-of-life downcycling & premature scrap landfill (replacement via virgin manufacturing)',
    axiaPathway: 'Managed cross-border circular reallocation & certified secondary refurbishment',
    baselineCo2eTonnes,
    axiaCo2eTonnes,
    avoidedCo2eTonnes,
    quantityDivertedTonnes: Number(totalWeightTonnes.toFixed(2)),
    quantityReusedUnits: tx.unit === 'units' ? quantity : Math.round(quantity * 100),
    transportEmissionsTonnes,
    processingEmissionsTonnes,
    reuseRecoveryFactor: 0.94, // 94% retention of functional component utility
    methodologyNotes: 
      'Emissions calculated under the Scope 3 Category 1 & 12 Life-Cycle Displacement methodology. Baseline represents cradle-to-gate emissions of virgin replacement products plus disposal treatment. AXIA pathway accounts for intermodal cargo freight and accredited facility energy consumption.',
    dateGenerated: new Date().toISOString().split('T')[0],
    isGenerated: false,
  };
}
