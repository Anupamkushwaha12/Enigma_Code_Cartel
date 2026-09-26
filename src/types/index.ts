export type UserRole = 'public' | 'supplier' | 'receiver' | 'admin' | 'logistics';

export type ResourceCategory = 
  | 'electronics' 
  | 'metals' 
  | 'plastics' 
  | 'byproducts' 
  | 'machinery'
  | 'components';

export type ConditionGrade = 
  | 'Grade A Refurbishable'
  | 'Working Secondary'
  | 'Recoverable Components'
  | 'Industrial Reusable'
  | 'Scrap / Smelting Grade'
  | 'Virgin By-Product';

export interface LocationInfo {
  country: string;
  region: string;
  city: string;
  hubCode: string; // e.g. "USA — Dallas Logistics Hub", "IND — Mumbai Distribution Hub"
  exactAddress: string; // Internal / Logistics only
  coordinates?: [number, number];
}

export interface ResourceListing {
  id: string;
  code: string; // e.g. "AX-RES-1042"
  title: string;
  category: ResourceCategory;
  productType: string;
  materialType: string;
  materialProperties: string;
  condition: ConditionGrade;
  quantity: number;
  initialQuantity: number;
  soldQuantity: number;
  unit: string; // 'units', 'tonnes', 'kg'
  weightKg: number;
  volumeCbm: number;
  location: LocationInfo;
  availability: {
    availableFrom: string;
    availableUntil: string;
    preferredTiming: string;
  };
  commercial: {
    basePrice: number; // in listing currency
    currency: 'USD' | 'INR';
    minAcceptablePrice: number;
    transactionMethod: 'direct_or_auction' | 'direct_only';
  };
  processing: {
    refurbishmentRequired: boolean;
    testingRequired: boolean;
    certificationRequired: boolean;
    processingDetails: string;
  };
  documentation: {
    certificates: string[];
    complianceDocs: string[];
    specSheets: string[];
  };
  status: 'active' | 'in_auction' | 'transacted' | 'delivering' | 'completed';
  interestedBuyerCount: number;
  interestedBuyerIds: string[];
  activeAuctionId?: string;
  sellerId: string;
  sellerAnonymousName: string;
  sellerExactName: string; // Internal / Admin only
  createdDate: string;
  geographicScope: 'international_electronics' | 'india_industrial';
}

export interface Requirement {
  id: string;
  code: string; // e.g. "AX-REQ-8021"
  title: string;
  category: ResourceCategory;
  productType: string;
  quantityRequired: number;
  unit: string;
  acceptableCondition: ConditionGrade[];
  requiredSpecifications: string;
  maxLandedCost: number; // in INR
  currency: 'INR';
  requiredByDate: string;
  destination: LocationInfo;
  processingTolerance: string;
  status: 'active' | 'matched' | 'fulfilled';
  buyerId: string;
  buyerAnonymousName: string; // e.g. "Buyer A"
  buyerExactName: string; // Internal / Admin only
  createdDate: string;
}

export interface LandedEconomics {
  baseValueSourceCurrency: number;
  currencySource: 'USD' | 'INR';
  exchangeRateToInr: number;
  acquisitionCostInr: number;
  freightCostInr: number;
  insuranceCostInr: number;
  domesticTransportInr: number;
  processingCostInr: number;
  complianceCostInr: number;
  importDutyInr: number;
  gstVatInr: number;
  riskReserveInr: number;
  supplierPlatformFeeInr: number;
  receiverPlatformFeeInr: number;
  logisticsMarginInr: number;
  totalLandedCostInr: number;
  costPerUnitInr: number;
  expectedDestinationValueInr: number;
  expectedDestinationValuePerUnitInr: number;
  netMarginTotalInr: number;
  netMarginPerUnitInr: number;
  marginPercent: number;
  isViable: boolean;
  viabilityReason: string;
  // External simplified views:
  supplierGrossValueInr: number;
  supplierNetPayoutInr: number;
  receiverTotalLandedCostInr: number;
}

export interface MatchEvaluation {
  id: string;
  resourceId: string;
  requirementId: string;
  matchScore: number; // 0 to 100
  breakdown: {
    materialCompatibility: number; // 35% weight
    quantityFit: number; // 20% weight
    economicFeasibility: number; // 20% weight
    distanceLogistics: number; // 15% weight
    timingFeasibility: number; // 10% weight
  };
  checks: {
    materialCompatible: boolean;
    quantityAvailable: boolean;
    withinBudget: boolean;
    logisticsFeasible: boolean;
    timingFeasible: boolean;
    complianceCheckPassed: boolean;
  };
  economics: LandedEconomics;
  isEconomicallyViable: boolean;
  status: 'recommended' | 'interested' | 'in_auction' | 'transacted' | 'rejected';
}

export interface AuctionBid {
  id: string;
  buyerId: string;
  anonymousBuyerLabel: string; // "Buyer A", "Buyer B"
  bidPerUnitInr: number;
  totalBidInr: number;
  timestamp: string;
  isWinning?: boolean;
}

export interface Auction {
  id: string;
  code: string; // e.g. "AX-AUC-401"
  resourceId: string;
  resourceTitle: string;
  quantity: number;
  unit: string;
  reservePricePerUnitInr: number;
  currentHighestBidInr: number;
  startTime: string;
  endTime: string;
  status: 'active' | 'closed';
  interestedBuyerCount: number;
  bids: AuctionBid[];
  winningBid?: AuctionBid;
}

export type ShipmentStatus =
  | 'matched'
  | 'verification'
  | 'logistics_assigned'
  | 'pickup_scheduled'
  | 'picked_up'
  | 'in_transit'
  | 'customs_compliance'
  | 'destination_hub'
  | 'delivered';

export interface ShipmentMilestone {
  title: string;
  location: string;
  date: string;
  status: 'completed' | 'in_progress' | 'pending';
  notes?: string;
}

export interface Shipment {
  id: string;
  code: string; // e.g. "AX-SHP-7729"
  transactionId: string;
  resourceId: string;
  resourceTitle: string;
  carrier: string;
  trackingNumber: string;
  route: string;
  originHub: string;
  destinationHub: string;
  exactPickupAddress: string; // Logistics / Admin only
  exactDeliveryAddress: string; // Logistics / Admin only
  weightKg: number;
  volumeCbm: number;
  freightCostInr: number;
  eta: string;
  status: ShipmentStatus;
  milestones: ShipmentMilestone[];
  lastUpdate: string;
}

export interface Transaction {
  id: string;
  code: string; // e.g. "AX-20481"
  resourceId: string;
  requirementId?: string;
  sellerId: string;
  buyerId: string;
  sellerAnonymousHub: string;
  buyerAnonymousHub: string;
  sellerExactName: string; // Admin only
  buyerExactName: string; // Admin only
  quantity: number;
  unit: string;
  agreedPricePerUnitInr: number;
  grossTransactionValueInr: number;
  sellerNetPayoutInr: number;
  buyerTotalLandedCostInr: number;
  axiaPlatformRevenueInr: number;
  transactionMethod: 'direct_buy' | 'auction';
  status: ShipmentStatus;
  shipmentId: string;
  transactionDate: string;
  hasImpactReport: boolean;
  economics: LandedEconomics;
}

export interface ImpactReportData {
  id: string;
  transactionId: string;
  transactionCode: string;
  resourceName: string;
  quantity: number;
  unit: string;
  originRegion: string;
  destinationRegion: string;
  baselinePathway: string;
  axiaPathway: string;
  baselineCo2eTonnes: number;
  axiaCo2eTonnes: number;
  avoidedCo2eTonnes: number;
  quantityDivertedTonnes: number;
  quantityReusedUnits: number;
  transportEmissionsTonnes: number;
  processingEmissionsTonnes: number;
  reuseRecoveryFactor: number;
  methodologyNotes: string;
  dateGenerated: string;
  isGenerated: boolean;
}

export interface ForecastData {
  currentListedQty: number;
  soldQty: number;
  remainingUnmatchedQty: number;
  surplus30Days: number;
  surplus60Days: number;
  surplus90Days: number;
  activeAbsorptionCapacity: number;
  recommendedDiscoveryLeadWeeks: number;
  alternativeMarkets: Array<{
    marketName: string;
    demandLevel: 'HIGH' | 'MEDIUM' | 'LOW';
    reason: string;
    absorptionCapacity: string;
    estimatedValueRecovery: string;
  }>;
}

export interface AdminFeeConfig {
  supplierFeePercent: number; // e.g. 8%
  receiverFeePercent: number; // e.g. 6%
  defaultUsdInrRate: number; // e.g. 83.50
  importDutyElectronicsPercent: number; // e.g. 7.5%
  gstGeneralPercent: number; // e.g. 18%
  riskReservePercent: number; // e.g. 2.5%
}
