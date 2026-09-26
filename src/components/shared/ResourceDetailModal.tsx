import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ResourceListing } from '../../types';
import { EconomicsPanel } from '../common/EconomicsPanel';
import { calculateLandedEconomics } from '../../utils/landedCostEngine';
import { 
  AlertCircle, 
  ArrowRight, 
  Boxes, 
  Building2, 
  CheckCircle2, 
  FileCheck, 
  Gavel, 
  Globe2, 
  HelpCircle, 
  MapPin, 
  Scale, 
  ShieldCheck, 
  ShoppingCart, 
  Truck, 
  X 
} from 'lucide-react';

interface ResourceDetailModalProps {
  resource: ResourceListing;
  onClose: () => void;
}

export const ResourceDetailModal: React.FC<ResourceDetailModalProps> = ({ resource, onClose }) => {
  const { 
    role, 
    requirements, 
    expressInterest, 
    executeDirectBuy, 
    setSelectedAuction, 
    auctions,
    adminFeeConfig 
  } = useApp();

  const [orderQuantity, setOrderQuantity] = useState<number>(
    Math.min(1000, resource.quantity - resource.soldQuantity)
  );
  const [isSuccessDirectBuy, setIsSuccessDirectBuy] = useState(false);

  const availableQty = resource.quantity - resource.soldQuantity;
  const isAuctionMode = resource.status === 'in_auction' || resource.interestedBuyerCount >= 2;

  // Find a target destination for simulation (default to Mumbai Hub if receiver)
  const defaultDest = requirements[0]?.destination || {
    country: 'India',
    region: 'Maharashtra',
    city: 'Mumbai',
    hubCode: 'IND — Mumbai Distribution Hub',
    exactAddress: '',
  };

  const calculatedEcon = calculateLandedEconomics({
    quantity: orderQuantity,
    basePrice: resource.commercial.basePrice,
    currency: resource.commercial.currency,
    weightKg: (resource.weightKg / resource.quantity) * orderQuantity,
    origin: resource.location,
    destination: defaultDest,
    maxBuyerBudgetInr: 20000,
    refurbishmentRequired: resource.processing.refurbishmentRequired,
    testingRequired: resource.processing.testingRequired,
    certificationRequired: resource.processing.certificationRequired,
    customFeeConfig: adminFeeConfig,
  });

  const handleExpressInterest = () => {
    expressInterest(resource.id, 'buyer-user-session');
    alert('Commercial interest recorded! AXIA rule: When 2 or more buyers show interest, an anonymous auction will automatically open.');
  };

  const handleDirectBuy = () => {
    executeDirectBuy(
      resource.id,
      requirements[0]?.id || 'req-mumbai-refurb-laptops',
      'buyer-user-session',
      orderQuantity
    );
    setIsSuccessDirectBuy(true);
  };

  const handleOpenAuction = () => {
    const auc = auctions.find(a => a.resourceId === resource.id) || auctions[0];
    onClose();
    setSelectedAuction(auc);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl border border-slate-200 max-w-3xl w-full shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="bg-white px-6 py-4 flex items-center justify-between border-b border-slate-200">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-700 border border-blue-200 flex items-center justify-center">
              <Boxes className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-blue-600 font-mono font-semibold">
                <span>{resource.code}</span>
                <span>·</span>
                <span>{resource.geographicScope === 'international_electronics' ? 'International Second-Life' : 'Domestic Industrial'}</span>
              </div>
              <h3 className="text-base font-bold text-slate-900">
                {resource.title}
              </h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
          
          {/* Success Banner */}
          {isSuccessDirectBuy && (
            <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 shrink-0 mt-0.5 text-emerald-600" />
              <div>
                <strong className="text-sm block font-semibold">Direct Buy Transaction Confirmed!</strong>
                <p className="mt-1 leading-relaxed">
                  AXIA has secured commercial escrow and dispatched logistics assignment. Track the new shipment under the <strong>Shipments</strong> tab. Commercial anonymity maintained between parties.
                </p>
              </div>
            </div>
          )}

          {/* Quick Specs Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs">
            <div>
              <span className="text-[11px] text-slate-400 uppercase font-mono block">Available Quantity</span>
              <strong className="text-slate-900 font-mono text-sm">{availableQty.toLocaleString('en-IN')} {resource.unit}</strong>
              <span className="text-[10px] text-slate-500 block">Total listed: {resource.quantity}</span>
            </div>

            <div>
              <span className="text-[11px] text-slate-400 uppercase font-mono block">Condition Grade</span>
              <strong className="text-slate-900 text-xs">{resource.condition}</strong>
              <span className="text-[10px] text-slate-500 block">Verified by AXIA</span>
            </div>

            <div>
              <span className="text-[11px] text-slate-400 uppercase font-mono block">Origin Hub (Anonymous)</span>
              <strong className="text-slate-900 text-xs line-clamp-1">{resource.location.hubCode}</strong>
              <span className="text-[10px] text-slate-500 block">Escrow Port Cleared</span>
            </div>

            <div>
              <span className="text-[11px] text-slate-400 uppercase font-mono block">Base Value</span>
              <strong className="text-slate-900 font-mono text-sm">
                {resource.commercial.currency === 'USD' ? `$${resource.commercial.basePrice} USD` : `₹${resource.commercial.basePrice.toLocaleString('en-IN')}`}
              </strong>
              <span className="text-[10px] text-slate-500 block">Per {resource.unit}</span>
            </div>
          </div>

          {/* Material Properties & Specifications */}
          <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-2 text-xs">
            <h4 className="font-bold text-slate-900 uppercase tracking-wider text-[11px]">
              Technical Specifications & Processing Requirements
            </h4>
            <p className="text-slate-600 leading-relaxed">
              <strong className="text-slate-900">Material/Hardware:</strong> {resource.materialProperties}
            </p>
            <p className="text-slate-600 leading-relaxed">
              <strong className="text-slate-900">Processing Protocol:</strong> {resource.processing.processingDetails}
            </p>
            <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-100 text-[11px] text-slate-600">
              <span className="px-2 py-0.5 bg-slate-50 rounded-md border border-slate-200">
                Refurbishment: {resource.processing.refurbishmentRequired ? 'Yes' : 'Not required'}
              </span>
              <span className="px-2 py-0.5 bg-slate-50 rounded-md border border-slate-200">
                Testing / Diagnostics: {resource.processing.testingRequired ? 'Completed' : 'Visual only'}
              </span>
              <span className="px-2 py-0.5 bg-slate-50 rounded-md border border-slate-200">
                Regulatory Certification: {resource.processing.certificationRequired ? 'Applicable' : 'Exempt'}
              </span>
            </div>
          </div>

          {/* Landed Economics Engine for this Resource */}
          <EconomicsPanel
            economics={calculatedEcon}
            role={role}
            quantity={orderQuantity}
            unit={resource.unit}
          />

          {/* Compliance & Certification badges */}
          <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-2 text-xs">
            <h4 className="font-bold text-slate-900 uppercase tracking-wider text-[11px]">
              Verified Compliance & Custody Documents
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              {resource.documentation.certificates.map((cert, idx) => (
                <div key={idx} className="flex items-center gap-2 p-2.5 rounded-lg bg-slate-50 border border-slate-200 text-slate-700">
                  <FileCheck className="w-4 h-4 text-blue-600 shrink-0" />
                  <span className="truncate">{cert}</span>
                </div>
              ))}
              {resource.documentation.complianceDocs.map((doc, idx) => (
                <div key={idx} className="flex items-center gap-2 p-2.5 rounded-lg bg-slate-50 border border-slate-200 text-slate-700">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span className="truncate">{doc}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Commercial Logic Decision Zone: Fixed Price vs Auction */}
          <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs uppercase font-mono tracking-wider font-bold text-slate-900 block">
                  Commercial Transaction Routing
                </span>
                <span className="text-xs text-slate-500">
                  AXIA Rule: Direct Buy for single buyer interest; Auction triggered when 2+ qualified buyers express interest.
                </span>
              </div>
              <div className="text-right">
                <span className="text-[11px] font-mono text-slate-400">Interested Buyers</span>
                <div className="text-sm font-bold text-slate-900 font-mono">{resource.interestedBuyerCount} Qualified</div>
              </div>
            </div>

            {/* If Auction is Active */}
            {isAuctionMode ? (
              <div className="p-4 bg-white rounded-xl border border-amber-200 shadow-2xs flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-amber-50 text-amber-700 border border-amber-200 flex items-center justify-center shrink-0">
                    <Gavel className="w-5 h-5" />
                  </div>
                  <div className="text-xs">
                    <strong className="text-slate-900 block font-semibold">Multi-Buyer Auction Active</strong>
                    <span className="text-slate-500">2 or more verified buyers showed interest in this resource lot.</span>
                  </div>
                </div>
                <button
                  onClick={handleOpenAuction}
                  className="px-4 py-2 text-xs font-semibold bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors whitespace-nowrap cursor-pointer shadow-xs flex items-center gap-1.5"
                >
                  <Gavel className="w-3.5 h-3.5 text-amber-200" />
                  Enter Auction Room
                </button>
              </div>
            ) : (
              /* If Direct Buy Mode */
              <div className="p-4 bg-white rounded-xl border border-slate-200 shadow-2xs flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center justify-center shrink-0">
                    <ShoppingCart className="w-5 h-5" />
                  </div>
                  <div className="text-xs">
                    <strong className="text-slate-900 block font-semibold">Direct Buy Available</strong>
                    <span className="text-slate-500">Single buyer interest threshold. No auction needed.</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <button
                    onClick={handleExpressInterest}
                    className="flex-1 sm:flex-initial px-3.5 py-2 text-xs font-medium text-slate-700 bg-slate-50 border border-slate-300 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
                  >
                    Express Interest
                  </button>

                  <button
                    onClick={handleDirectBuy}
                    disabled={availableQty <= 0 || isSuccessDirectBuy}
                    className="flex-1 sm:flex-initial px-4 py-2 text-xs font-semibold bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 cursor-pointer shadow-xs flex items-center justify-center gap-1.5"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-blue-200" />
                    Direct Buy (Escrow)
                  </button>
                </div>
              </div>
            )}
          </div>

        </div>

        {/* Footer */}
        <div className="bg-slate-50 px-6 py-3.5 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-blue-600" />
            <span>Commercial Anonymity Guaranteed by AXIA</span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-1.5 text-xs font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
          >
            Close Details
          </button>
        </div>

      </div>
    </div>
  );
};
