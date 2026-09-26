import React from 'react';
import { LandedEconomics, UserRole } from '../../types';
import { 
  AlertCircle, 
  CheckCircle2, 
  ChevronRight, 
  HelpCircle, 
  Info, 
  Percent, 
  ShieldCheck, 
  TrendingUp 
} from 'lucide-react';

interface EconomicsPanelProps {
  economics: LandedEconomics;
  role: UserRole;
  quantity: number;
  unit: string;
  className?: string;
}

export const EconomicsPanel: React.FC<EconomicsPanelProps> = ({
  economics,
  role,
  quantity,
  unit,
  className = '',
}) => {
  const isViable = economics.isViable;

  // Supplier View: Gross Value and Net Payout ONLY (internal fees hidden as per spec)
  if (role === 'supplier') {
    return (
      <div className={`bg-white rounded-xl border border-slate-200 p-5 shadow-xs ${className}`}>
        <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
          <div>
            <h4 className="text-sm font-bold text-slate-900">Supplier Realization Summary</h4>
            <p className="text-xs text-slate-500">AXIA managed liquidation & net payout guarantee</p>
          </div>
          <div className="text-right">
            <span className="text-[11px] font-mono text-slate-400">Lot Size</span>
            <div className="text-xs font-semibold text-slate-900 font-mono">{quantity.toLocaleString('en-IN')} {unit}</div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-xs text-slate-500 block mb-1">Estimated Gross Value</span>
            <div className="text-lg font-bold text-slate-900 font-mono tabular-nums">
              ₹{economics.supplierGrossValueInr.toLocaleString('en-IN')}
            </div>
            {economics.currencySource === 'USD' && (
              <span className="text-[11px] text-slate-400 block font-mono">
                (${economics.baseValueSourceCurrency.toLocaleString('en-US')} USD)
              </span>
            )}
          </div>

          <div className="p-3.5 rounded-lg bg-blue-50/70 border border-blue-200 text-blue-900">
            <span className="text-xs text-blue-700 block mb-1 font-semibold">Estimated Net Payout</span>
            <div className="text-lg font-bold text-blue-900 font-mono tabular-nums">
              ₹{economics.supplierNetPayoutInr.toLocaleString('en-IN')}
            </div>
            <span className="text-[11px] text-blue-600/80 block font-mono">
              Net of AXIA managed transaction service
            </span>
          </div>
        </div>
      </div>
    );
  }

  // Receiver View: Total Landed Cost per unit (internal taxes/fees hidden as per spec)
  if (role === 'receiver') {
    return (
      <div className={`bg-white rounded-xl border border-slate-200 p-5 shadow-xs ${className}`}>
        <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
          <div>
            <div className="flex items-center gap-2">
              <h4 className="text-sm font-bold text-slate-900">Landed Economics Evaluation</h4>
              {isViable ? (
                <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                  <CheckCircle2 className="w-3 h-3" /> VIABLE
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-rose-700 bg-rose-50 px-2 py-0.5 rounded-md border border-rose-200">
                  <AlertCircle className="w-3 h-3" /> NOT VIABLE
                </span>
              )}
            </div>
            <p className="text-xs text-slate-500 mt-0.5">{economics.viabilityReason}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-[11px] text-slate-500 block mb-0.5">Estimated Landed Cost / Unit</span>
            <div className="text-lg font-bold text-slate-900 font-mono tabular-nums">
              ₹{economics.costPerUnitInr.toLocaleString('en-IN')}
            </div>
            <span className="text-[10px] text-slate-400">All inclusive at destination hub</span>
          </div>

          <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-[11px] text-slate-500 block mb-0.5">Total Destination Landed Price</span>
            <div className="text-lg font-bold text-slate-900 font-mono tabular-nums">
              ₹{economics.totalLandedCostInr.toLocaleString('en-IN')}
            </div>
            <span className="text-[10px] text-slate-400">For full lot ({quantity} {unit})</span>
          </div>

          <div className="p-3.5 rounded-lg bg-emerald-50/60 border border-emerald-200">
            <span className="text-[11px] text-emerald-800 block mb-0.5 font-medium">Destination Market Benchmark</span>
            <div className="text-lg font-bold text-emerald-700 font-mono tabular-nums">
              ₹{economics.expectedDestinationValuePerUnitInr.toLocaleString('en-IN')}
            </div>
            <span className="text-[10px] text-emerald-600">Expected resale / yield realization</span>
          </div>
        </div>

        <div className="mt-3 pt-2 text-[11px] text-slate-500 flex items-center justify-between border-t border-slate-100">
          <span>Single consolidated B2B invoice includes freight, duties, testing & documentation.</span>
          <span className="font-mono text-slate-700 font-medium">Estimated Arbitrage Spread: ~{economics.marginPercent}%</span>
        </div>
      </div>
    );
  }

  // Admin / Internal View: Complete transparent line-by-line financial ledger
  return (
    <div className={`bg-white rounded-xl border border-slate-200 p-5 shadow-xs ${className}`}>
      <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
        <div>
          <div className="flex items-center gap-2">
            <h4 className="text-sm font-bold text-slate-900">AXIA Landed Economics Engine (Internal Audit)</h4>
            {isViable ? (
              <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                <CheckCircle2 className="w-3 h-3" /> VIABLE
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-rose-700 bg-rose-50 px-2 py-0.5 rounded-md border border-rose-200">
                <AlertCircle className="w-3 h-3" /> NOT VIABLE
              </span>
            )}
          </div>
          <p className="text-xs text-slate-500 mt-0.5">{economics.viabilityReason}</p>
        </div>

        <div className="text-right">
          <span className="text-[10px] uppercase font-mono text-slate-400">Net Platform Margin</span>
          <div className="text-base font-bold text-blue-600 font-mono tabular-nums">
            ₹{(economics.supplierPlatformFeeInr + economics.receiverPlatformFeeInr + economics.logisticsMarginInr).toLocaleString('en-IN')}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
        
        {/* Source & Logistics */}
        <div className="space-y-2 p-3.5 rounded-lg bg-slate-50 border border-slate-200">
          <div className="font-bold text-slate-900 uppercase tracking-wider text-[11px] border-b border-slate-200 pb-1">
            1. Source & Logistics
          </div>
          <div className="flex justify-between text-slate-600">
            <span>Acquisition Base:</span>
            <span className="font-mono font-medium text-slate-900">₹{economics.acquisitionCostInr.toLocaleString('en-IN')}</span>
          </div>
          <div className="flex justify-between text-slate-600">
            <span>Ocean/Air Freight:</span>
            <span className="font-mono font-medium text-slate-900">₹{economics.freightCostInr.toLocaleString('en-IN')}</span>
          </div>
          <div className="flex justify-between text-slate-600">
            <span>Marine/Transit Insurance:</span>
            <span className="font-mono font-medium text-slate-900">₹{economics.insuranceCostInr.toLocaleString('en-IN')}</span>
          </div>
          <div className="flex justify-between text-slate-600">
            <span>Domestic Last-Mile Hub Transport:</span>
            <span className="font-mono font-medium text-slate-900">₹{economics.domesticTransportInr.toLocaleString('en-IN')}</span>
          </div>
        </div>

        {/* Processing & Compliance */}
        <div className="space-y-2 p-3.5 rounded-lg bg-slate-50 border border-slate-200">
          <div className="font-bold text-slate-900 uppercase tracking-wider text-[11px] border-b border-slate-200 pb-1">
            2. Processing & Compliance
          </div>
          <div className="flex justify-between text-slate-600">
            <span>Refurbishment / Testing:</span>
            <span className="font-mono font-medium text-slate-900">₹{economics.processingCostInr.toLocaleString('en-IN')}</span>
          </div>
          <div className="flex justify-between text-slate-600">
            <span>Import Duty (Customs):</span>
            <span className="font-mono font-medium text-slate-900">₹{economics.importDutyInr.toLocaleString('en-IN')}</span>
          </div>
          <div className="flex justify-between text-slate-600">
            <span>GST / VAT (Assessable):</span>
            <span className="font-mono font-medium text-slate-900">₹{economics.gstVatInr.toLocaleString('en-IN')}</span>
          </div>
          <div className="flex justify-between text-slate-600">
            <span>BIS / DGFT / EPR Compliance:</span>
            <span className="font-mono font-medium text-slate-900">₹{economics.complianceCostInr.toLocaleString('en-IN')}</span>
          </div>
        </div>

        {/* Buffer & Platform Margins */}
        <div className="space-y-2 p-3.5 rounded-lg bg-slate-50 border border-slate-200">
          <div className="font-bold text-slate-900 uppercase tracking-wider text-[11px] border-b border-slate-200 pb-1">
            3. Risk & AXIA Margin
          </div>
          <div className="flex justify-between text-slate-600">
            <span>Risk Reserve Buffer:</span>
            <span className="font-mono font-medium text-slate-900">₹{economics.riskReserveInr.toLocaleString('en-IN')}</span>
          </div>
          <div className="flex justify-between text-slate-600">
            <span>Supplier Platform Fee (8%):</span>
            <span className="font-mono font-medium text-slate-900">₹{economics.supplierPlatformFeeInr.toLocaleString('en-IN')}</span>
          </div>
          <div className="flex justify-between text-slate-600">
            <span>Receiver Platform Fee (6%):</span>
            <span className="font-mono font-medium text-slate-900">₹{economics.receiverPlatformFeeInr.toLocaleString('en-IN')}</span>
          </div>
          <div className="flex justify-between text-slate-600">
            <span>Logistics Freight Margin (8%):</span>
            <span className="font-mono font-medium text-slate-900">₹{economics.logisticsMarginInr.toLocaleString('en-IN')}</span>
          </div>
        </div>

      </div>

      {/* Summary KPI Strip */}
      <div className="mt-4 pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4">
        <div className="text-xs">
          <span className="text-slate-500">Total Landed: </span>
          <strong className="font-mono text-slate-900 text-sm">₹{economics.totalLandedCostInr.toLocaleString('en-IN')}</strong>
          <span className="text-slate-400 ml-2">(₹{economics.costPerUnitInr.toLocaleString('en-IN')}/{unit})</span>
        </div>

        <div className="text-xs">
          <span className="text-slate-500">Destination Value: </span>
          <strong className="font-mono text-emerald-700 text-sm">₹{economics.expectedDestinationValueInr.toLocaleString('en-IN')}</strong>
          <span className="text-slate-400 ml-2">(₹{economics.expectedDestinationValuePerUnitInr.toLocaleString('en-IN')}/{unit})</span>
        </div>

        <div className="text-xs">
          <span className="text-slate-500">Net Economic Spread: </span>
          <strong className="font-mono text-blue-600 text-sm">₹{economics.netMarginTotalInr.toLocaleString('en-IN')}</strong>
          <span className="text-slate-400 ml-2">({economics.marginPercent}% margin)</span>
        </div>
      </div>
    </div>
  );
};
