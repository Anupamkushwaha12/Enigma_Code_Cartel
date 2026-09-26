import React, { createContext, useContext, useState, useMemo } from 'react';
import { 
  AdminFeeConfig, 
  Auction, 
  ForecastData, 
  ImpactReportData, 
  MatchEvaluation, 
  Requirement, 
  ResourceListing, 
  Shipment, 
  ShipmentStatus, 
  Transaction, 
  UserRole 
} from '../types';
import { 
  INITIAL_AUCTIONS, 
  INITIAL_FORECAST_DATA, 
  INITIAL_REQUIREMENTS, 
  INITIAL_RESOURCES, 
  INITIAL_SHIPMENTS, 
  INITIAL_TRANSACTIONS 
} from '../data/mockData';
import { DEFAULT_FEE_CONFIG, calculateLandedEconomics } from '../utils/landedCostEngine';
import { evaluateResourceMatch } from '../utils/matchingEngine';
import { calculateTransactionImpact } from '../utils/impactCalculator';

export interface DemoStep {
  stepNumber: number;
  title: string;
  roleTarget: UserRole;
  description: string;
  actionHint: string;
}

export const DEMO_JOURNEY_STEPS: DemoStep[] = [
  {
    stepNumber: 1,
    title: 'USA Supplier Lists 4,000 Dell Laptops',
    roleTarget: 'supplier',
    description: 'Dallas enterprise asset partner lists 4,000 Dell Latitude 5420 units for cross-border reallocation.',
    actionHint: 'View resource AX-RES-1042 in Supplier Resources or inspect listing details.',
  },
  {
    stepNumber: 2,
    title: 'AXIA Calculates Landed Economics Engine',
    roleTarget: 'admin',
    description: 'AXIA evaluates Acquisition + Freight + Insurance + Refurbishment + Compliance + Duty + Risk Reserve.',
    actionHint: 'Check the Global Opportunity Scanner or Financial Breakdown in Admin.',
  },
  {
    stepNumber: 3,
    title: 'Indian Receiver Posts Requirement',
    roleTarget: 'receiver',
    description: 'Mumbai refurbisher posts requirement AX-REQ-8021: 1,000 enterprise laptops with max landed cost ₹20,000.',
    actionHint: 'Inspect Active Requirements on the Receiver Dashboard.',
  },
  {
    stepNumber: 4,
    title: 'AXIA Discovers USA → India: VIABLE',
    roleTarget: 'receiver',
    description: 'Landed cost ₹15,000/unit vs ₹20,000 budget and ₹23,500 expected market value. Status: VIABLE.',
    actionHint: 'Look at Smart Discovery / Recommended Resources under Receiver view.',
  },
  {
    stepNumber: 5,
    title: 'China → India Opportunity: NOT VIABLE',
    roleTarget: 'admin',
    description: 'Shenzhen lot has landed cost ₹21,800/unit exceeding receiver budget. AXIA automatically flags NOT VIABLE.',
    actionHint: 'Switch to Global Opportunity Scanner to see both viable & non-viable cards.',
  },
  {
    stepNumber: 6,
    title: 'Receiver Expresses Interest',
    roleTarget: 'receiver',
    description: 'Buyer expresses genuine commercial intent on the 1,000 unit portion.',
    actionHint: 'Click "Express Interest" or view pending match state.',
  },
  {
    stepNumber: 7,
    title: '1 Buyer Interested = DIRECT BUY',
    roleTarget: 'receiver',
    description: 'Rule: With only 1 buyer, AXIA enforces DIRECT BUY rather than starting an unnecessary auction.',
    actionHint: 'Observe the Direct Buy button enabled on the Dell Latitude listing.',
  },
  {
    stepNumber: 8,
    title: '2+ Buyers Interested = AUCTION STARTS',
    roleTarget: 'supplier',
    description: 'Rule: When 2 or more buyers show interest, AXIA converts the lot into an anonymous multi-buyer auction.',
    actionHint: 'See AX-RES-2089 (Steel Billets) currently active in auction with Buyer A, B, and C!',
  },
  {
    stepNumber: 9,
    title: 'Transaction Completed Through AXIA',
    roleTarget: 'admin',
    description: 'AXIA controls payment escrow and commercial anonymity (USA Dallas Hub ↔ IND Mumbai Hub).',
    actionHint: 'Review transaction AX-20481 in Admin Financials.',
  },
  {
    stepNumber: 10,
    title: 'AXIA Manages End-to-End Logistics',
    roleTarget: 'logistics',
    description: 'Logistics partner manages intermodal milestones from origin container pickup to customs port clearance.',
    actionHint: 'Open Logistics Dashboard to update milestones on shipment AX-SHP-7729.',
  },
  {
    stepNumber: 11,
    title: 'Shipment Delivered to Destination Hub',
    roleTarget: 'logistics',
    description: 'Shipment reaches destination hub, weighbridge verification clears, and escrow is released.',
    actionHint: 'See AX-SHP-6420 marked Delivered in Sanand/Ahmedabad.',
  },
  {
    stepNumber: 12,
    title: 'Receiver Clicks "View Environmental Impact"',
    roleTarget: 'receiver',
    description: 'Environmental impact is strictly OPTIONAL and on-demand. Not forced or plastered with greenwashing.',
    actionHint: 'Click "View Environmental Impact" on a completed order.',
  },
  {
    stepNumber: 13,
    title: 'AXIA Calculates Transparent CO2e',
    roleTarget: 'receiver',
    description: 'Avoided CO2e = Baseline downcycling emissions - AXIA managed refurbishment pathway emissions.',
    actionHint: 'Review the transparent calculation breakdown and mathematical formula.',
  },
  {
    stepNumber: 14,
    title: 'Generate Enterprise Resource Impact Report',
    roleTarget: 'receiver',
    description: 'Export an institutional, Scope 3 compliant PDF/document report with methodology disclosures.',
    actionHint: 'Click "Generate Report" in the impact modal to view the enterprise document.',
  },
  {
    stepNumber: 15,
    title: 'Supplier 30/60/90-Day Surplus Forecast',
    roleTarget: 'supplier',
    description: 'Deterministic forecasting displays projected surplus (80t → 110t → 140t) and absorption lead times.',
    actionHint: 'Navigate to "Forecast" tab on the Supplier Dashboard.',
  },
  {
    stepNumber: 16,
    title: 'Alternative Market Destination Intelligence',
    roleTarget: 'supplier',
    description: 'For 25 tonnes unmatched surplus, AXIA recommends alternative industrial applications (Construction, Road-base).',
    actionHint: 'Check the "Alternative Destinations" recommendation table in Forecast.',
  },
];

interface AppContextType {
  role: UserRole;
  setRole: (role: UserRole) => void;
  currentDemoStep: number;
  setDemoStep: (stepNumber: number) => void;
  nextDemoStep: () => void;
  prevDemoStep: () => void;
  
  resources: ResourceListing[];
  requirements: Requirement[];
  auctions: Auction[];
  transactions: Transaction[];
  shipments: Shipment[];
  forecastData: ForecastData;
  adminFeeConfig: AdminFeeConfig;
  updateAdminFeeConfig: (newConfig: Partial<AdminFeeConfig>) => void;
  
  // Computed matches
  matches: MatchEvaluation[];
  
  // Actions
  addResource: (resource: Omit<ResourceListing, 'id' | 'code' | 'createdDate' | 'status' | 'soldQuantity' | 'interestedBuyerCount' | 'interestedBuyerIds'>) => void;
  addRequirement: (req: Omit<Requirement, 'id' | 'code' | 'createdDate' | 'status'>) => void;
  expressInterest: (resourceId: string, buyerId: string) => void;
  placeAuctionBid: (auctionId: string, buyerId: string, buyerLabel: string, bidPerUnit: number) => void;
  executeDirectBuy: (resourceId: string, requirementId: string, buyerId: string, quantity: number) => Transaction;
  updateShipmentStatus: (shipmentId: string, nextStatus: ShipmentStatus) => void;
  
  // Impact reporting modal state
  activeImpactReport: ImpactReportData | null;
  openImpactReportForTransaction: (txId: string) => void;
  closeImpactReport: () => void;
  markImpactReportGenerated: (reportId: string) => void;

  // Selected item drawers/modals
  selectedResource: ResourceListing | null;
  setSelectedResource: (res: ResourceListing | null) => void;
  selectedRequirement: Requirement | null;
  setSelectedRequirement: (req: Requirement | null) => void;
  selectedAuction: Auction | null;
  setSelectedAuction: (auc: Auction | null) => void;
  selectedTransaction: Transaction | null;
  setSelectedTransaction: (tx: Transaction | null) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [role, setRoleState] = useState<UserRole>('public');
  const [currentDemoStep, setCurrentDemoStep] = useState<number>(1);
  
  const [resources, setResources] = useState<ResourceListing[]>(INITIAL_RESOURCES);
  const [requirements, setRequirements] = useState<Requirement[]>(INITIAL_REQUIREMENTS);
  const [auctions, setAuctions] = useState<Auction[]>(INITIAL_AUCTIONS);
  const [transactions, setTransactions] = useState<Transaction[]>(INITIAL_TRANSACTIONS);
  const [shipments, setShipments] = useState<Shipment[]>(INITIAL_SHIPMENTS);
  const [forecastData] = useState<ForecastData>(INITIAL_FORECAST_DATA);
  const [adminFeeConfig, setAdminFeeConfig] = useState<AdminFeeConfig>(DEFAULT_FEE_CONFIG);

  const [activeImpactReport, setActiveImpactReport] = useState<ImpactReportData | null>(null);
  const [selectedResource, setSelectedResource] = useState<ResourceListing | null>(null);
  const [selectedRequirement, setSelectedRequirement] = useState<Requirement | null>(null);
  const [selectedAuction, setSelectedAuction] = useState<Auction | null>(null);
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);

  const setRole = (newRole: UserRole) => {
    setRoleState(newRole);
  };

  const setDemoStep = (stepNumber: number) => {
    if (stepNumber >= 1 && stepNumber <= DEMO_JOURNEY_STEPS.length) {
      setCurrentDemoStep(stepNumber);
      const target = DEMO_JOURNEY_STEPS[stepNumber - 1];
      if (target && target.roleTarget !== 'public') {
        setRoleState(target.roleTarget);
      }
    }
  };

  const nextDemoStep = () => {
    if (currentDemoStep < DEMO_JOURNEY_STEPS.length) {
      setDemoStep(currentDemoStep + 1);
    }
  };

  const prevDemoStep = () => {
    if (currentDemoStep > 1) {
      setDemoStep(currentDemoStep - 1);
    }
  };

  const updateAdminFeeConfig = (newConfig: Partial<AdminFeeConfig>) => {
    setAdminFeeConfig(prev => ({ ...prev, ...newConfig }));
  };

  // Pre-calculate all pairwise matches deterministically
  const matches = useMemo(() => {
    const list: MatchEvaluation[] = [];
    resources.forEach(res => {
      requirements.forEach(req => {
        if (res.category === req.category) {
          const match = evaluateResourceMatch(res, req);
          list.push(match);
        }
      });
    });
    return list.sort((a, b) => b.matchScore - a.matchScore);
  }, [resources, requirements, adminFeeConfig]);

  // Express interest with deterministic 2-buyer auction threshold rule
  const expressInterest = (resourceId: string, buyerId: string) => {
    setResources(prev => {
      return prev.map(res => {
        if (res.id !== resourceId) return res;

        const alreadyInterested = res.interestedBuyerIds.includes(buyerId);
        const newBuyerIds = alreadyInterested ? res.interestedBuyerIds : [...res.interestedBuyerIds, buyerId];
        const newCount = newBuyerIds.length;

        // RULE: IF 2 or more buyers show interest, CONVERT TO AUCTION
        let newStatus = res.status;
        let auctionId = res.activeAuctionId;

        if (newCount >= 2 && res.status !== 'in_auction') {
          newStatus = 'in_auction';
          auctionId = `auc-${res.id}`;

          // Create an auction instance if not already existing
          setAuctions(aucList => {
            if (aucList.some(a => a.resourceId === res.id)) return aucList;

            const baseInr = res.commercial.currency === 'USD' 
              ? res.commercial.basePrice * adminFeeConfig.defaultUsdInrRate 
              : res.commercial.basePrice;

            const newAuction: Auction = {
              id: auctionId!,
              code: `AX-AUC-${Math.floor(100 + Math.random() * 900)}`,
              resourceId: res.id,
              resourceTitle: res.title,
              quantity: res.quantity - res.soldQuantity,
              unit: res.unit,
              reservePricePerUnitInr: baseInr,
              currentHighestBidInr: Math.round(baseInr * 1.05),
              startTime: new Date().toISOString(),
              endTime: new Date(Date.now() + 3 * 86400000).toISOString(),
              status: 'active',
              interestedBuyerCount: newCount,
              bids: [
                {
                  id: `bid-${Date.now()}-1`,
                  buyerId: newBuyerIds[0],
                  anonymousBuyerLabel: 'Buyer A (Qualified Enterprise)',
                  bidPerUnitInr: Math.round(baseInr * 1.02),
                  totalBidInr: Math.round(baseInr * 1.02 * (res.quantity - res.soldQuantity)),
                  timestamp: new Date(Date.now() - 3600000).toISOString(),
                },
                {
                  id: `bid-${Date.now()}-2`,
                  buyerId: buyerId,
                  anonymousBuyerLabel: 'Buyer B (You / Verified)',
                  bidPerUnitInr: Math.round(baseInr * 1.05),
                  totalBidInr: Math.round(baseInr * 1.05 * (res.quantity - res.soldQuantity)),
                  timestamp: new Date().toISOString(),
                  isWinning: true,
                },
              ],
            };
            return [newAuction, ...aucList];
          });
        }

        return {
          ...res,
          interestedBuyerCount: newCount,
          interestedBuyerIds: newBuyerIds,
          status: newStatus,
          activeAuctionId: auctionId,
        };
      });
    });
  };

  const placeAuctionBid = (auctionId: string, buyerId: string, buyerLabel: string, bidPerUnit: number) => {
    setAuctions(prev => {
      return prev.map(auc => {
        if (auc.id !== auctionId) return auc;

        const newBid = {
          id: `bid-${Date.now()}`,
          buyerId,
          anonymousBuyerLabel: buyerLabel,
          bidPerUnitInr: bidPerUnit,
          totalBidInr: bidPerUnit * auc.quantity,
          timestamp: new Date().toISOString(),
          isWinning: bidPerUnit > auc.currentHighestBidInr,
        };

        const updatedBids = auc.bids.map(b => ({
          ...b,
          isWinning: false,
        }));

        return {
          ...auc,
          currentHighestBidInr: Math.max(auc.currentHighestBidInr, bidPerUnit),
          bids: [newBid, ...updatedBids],
        };
      });
    });
  };

  const executeDirectBuy = (
    resourceId: string, 
    requirementId: string, 
    buyerId: string, 
    quantity: number
  ): Transaction => {
    const res = resources.find(r => r.id === resourceId) || resources[0];
    const req = requirements.find(q => q.id === requirementId) || requirements[0];

    const econ = calculateLandedEconomics({
      quantity,
      basePrice: res.commercial.basePrice,
      currency: res.commercial.currency,
      weightKg: (res.weightKg / res.quantity) * quantity,
      origin: res.location,
      destination: req.destination,
      maxBuyerBudgetInr: req.maxLandedCost,
      refurbishmentRequired: res.processing.refurbishmentRequired,
      testingRequired: res.processing.testingRequired,
      certificationRequired: res.processing.certificationRequired,
      customFeeConfig: adminFeeConfig,
    });

    const txId = `tx-${Date.now().toString().slice(-5)}`;
    const txCode = `AX-${Math.floor(20000 + Math.random() * 9000)}`;
    const shpId = `shp-${Date.now().toString().slice(-4)}`;
    const shpCode = `AX-SHP-${Math.floor(7000 + Math.random() * 2000)}`;

    const newTx: Transaction = {
      id: txId,
      code: txCode,
      resourceId: res.id,
      requirementId: req.id,
      sellerId: res.sellerId,
      buyerId,
      sellerAnonymousHub: res.location.hubCode,
      buyerAnonymousHub: req.destination.hubCode,
      sellerExactName: res.sellerExactName,
      buyerExactName: req.buyerExactName,
      quantity,
      unit: res.unit,
      agreedPricePerUnitInr: res.commercial.currency === 'USD' 
        ? res.commercial.basePrice * adminFeeConfig.defaultUsdInrRate 
        : res.commercial.basePrice,
      grossTransactionValueInr: econ.acquisitionCostInr,
      sellerNetPayoutInr: econ.supplierNetPayoutInr,
      buyerTotalLandedCostInr: econ.totalLandedCostInr,
      axiaPlatformRevenueInr: econ.supplierPlatformFeeInr + econ.receiverPlatformFeeInr + econ.logisticsMarginInr,
      transactionMethod: 'direct_buy',
      status: 'logistics_assigned',
      shipmentId: shpId,
      transactionDate: new Date().toISOString().split('T')[0],
      hasImpactReport: true,
      economics: econ,
    };

    const newShipment: Shipment = {
      id: shpId,
      code: shpCode,
      transactionId: txId,
      resourceId: res.id,
      resourceTitle: `${quantity} ${res.unit} ${res.title}`,
      carrier: res.location.country !== req.destination.country ? 'Maersk B2B Secure Freighting' : 'TCI Supply Chain Solutions',
      trackingNumber: `AX-TRK-${Math.floor(10000000 + Math.random() * 90000000)}`,
      route: `${res.location.hubCode} → Intermodal Hub → ${req.destination.hubCode}`,
      originHub: res.location.hubCode,
      destinationHub: req.destination.hubCode,
      exactPickupAddress: res.location.exactAddress,
      exactDeliveryAddress: req.destination.exactAddress,
      weightKg: Math.round((res.weightKg / res.quantity) * quantity),
      volumeCbm: Number(((res.volumeCbm / res.quantity) * quantity).toFixed(1)),
      freightCostInr: econ.freightCostInr,
      eta: new Date(Date.now() + 18 * 86400000).toISOString().split('T')[0],
      status: 'logistics_assigned',
      lastUpdate: 'Just now — AXIA Escrow Secured',
      milestones: [
        { title: 'Transaction Confirmed & Commercial Escrow Funded', location: 'AXIA System', date: new Date().toISOString().split('T')[0], status: 'completed' },
        { title: 'Quality & Regulatory Pre-Clearance Verification', location: res.location.hubCode, date: new Date(Date.now() + 86400000).toISOString().split('T')[0], status: 'in_progress' },
        { title: 'Carrier Pickup & Consolidation', location: 'Origin Freight Depot', date: new Date(Date.now() + 3 * 86400000).toISOString().split('T')[0], status: 'pending' },
        { title: 'Primary Line-Haul Transit', location: 'En Route', date: new Date(Date.now() + 8 * 86400000).toISOString().split('T')[0], status: 'pending' },
        { title: 'Customs & Port Inspection', location: req.destination.hubCode, date: new Date(Date.now() + 14 * 86400000).toISOString().split('T')[0], status: 'pending' },
        { title: 'Final Destination Delivery & Release', location: req.destination.city, date: new Date(Date.now() + 18 * 86400000).toISOString().split('T')[0], status: 'pending' },
      ],
    };

    setTransactions(t => [newTx, ...t]);
    setShipments(s => [newShipment, ...s]);

    // Update resource sold quantity
    setResources(rList => {
      return rList.map(item => {
        if (item.id !== res.id) return item;
        const newSold = item.soldQuantity + quantity;
        return {
          ...item,
          soldQuantity: newSold,
          status: newSold >= item.quantity ? 'transacted' : item.status,
        };
      });
    });

    return newTx;
  };

  const updateShipmentStatus = (shipmentId: string, nextStatus: ShipmentStatus) => {
    setShipments(prev => {
      return prev.map(shp => {
        if (shp.id !== shipmentId) return shp;
        const milestoneIndex = shp.milestones.findIndex(m => m.status === 'in_progress');
        const updatedMilestones = shp.milestones.map((m, idx) => {
          if (idx <= milestoneIndex) return { ...m, status: 'completed' as const };
          if (idx === milestoneIndex + 1) return { ...m, status: 'in_progress' as const };
          return m;
        });

        return {
          ...shp,
          status: nextStatus,
          lastUpdate: `Updated status to ${nextStatus.replace('_', ' ').toUpperCase()} by Logistics Partner`,
          milestones: updatedMilestones,
        };
      });
    });

    // Also sync corresponding transaction status
    setTransactions(prev => {
      return prev.map(tx => {
        if (tx.shipmentId === shipmentId) {
          return { ...tx, status: nextStatus };
        }
        return tx;
      });
    });
  };

  const addResource = (data: Omit<ResourceListing, 'id' | 'code' | 'createdDate' | 'status' | 'soldQuantity' | 'interestedBuyerCount' | 'interestedBuyerIds'>) => {
    const newRes: ResourceListing = {
      ...data,
      id: `res-${Date.now()}`,
      code: `AX-RES-${Math.floor(1050 + Math.random() * 500)}`,
      status: 'active',
      soldQuantity: 0,
      interestedBuyerCount: 0,
      interestedBuyerIds: [],
      createdDate: new Date().toISOString().split('T')[0],
    };
    setResources(prev => [newRes, ...prev]);
  };

  const addRequirement = (data: Omit<Requirement, 'id' | 'code' | 'createdDate' | 'status'>) => {
    const newReq: Requirement = {
      ...data,
      id: `req-${Date.now()}`,
      code: `AX-REQ-${Math.floor(8050 + Math.random() * 500)}`,
      status: 'active',
      createdDate: new Date().toISOString().split('T')[0],
    };
    setRequirements(prev => [newReq, ...prev]);
  };

  const openImpactReportForTransaction = (txId: string) => {
    const tx = transactions.find(t => t.id === txId) || transactions[0];
    const res = resources.find(r => r.id === tx.resourceId) || resources[0];
    const report = calculateTransactionImpact(tx, res.title, res.category, res.weightKg);
    setActiveImpactReport(report);
  };

  const closeImpactReport = () => {
    setActiveImpactReport(null);
  };

  const markImpactReportGenerated = (reportId: string) => {
    if (activeImpactReport && activeImpactReport.id === reportId) {
      setActiveImpactReport({ ...activeImpactReport, isGenerated: true });
    }
  };

  return (
    <AppContext.Provider
      value={{
        role,
        setRole,
        currentDemoStep,
        setDemoStep,
        nextDemoStep,
        prevDemoStep,
        resources,
        requirements,
        auctions,
        transactions,
        shipments,
        forecastData,
        adminFeeConfig,
        updateAdminFeeConfig,
        matches,
        addResource,
        addRequirement,
        expressInterest,
        placeAuctionBid,
        executeDirectBuy,
        updateShipmentStatus,
        activeImpactReport,
        openImpactReportForTransaction,
        closeImpactReport,
        markImpactReportGenerated,
        selectedResource,
        setSelectedResource,
        selectedRequirement,
        setSelectedRequirement,
        selectedAuction,
        setSelectedAuction,
        selectedTransaction,
        setSelectedTransaction,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
};
