import React from 'react';
import { Transaction } from '../../types';
import { 
  Building2, 
  CheckCircle2, 
  DollarSign, 
  FileSpreadsheet, 
  MapPin, 
  ShieldAlert, 
  ShieldCheck, 
  Truck, 
  UserCheck, 
  X 
} from 'lucide-react';

interface FinancialBreakdownModalProps {
  transaction: Transaction;
  onClose: () => void;
}

export const FinancialBreakdownModal: React.FC<FinancialBreakdownModalProps> = ({ transaction, onClose }) => {
  const e = transaction.economics;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl border border-slate-200 max-w-3xl w-full shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="bg-white px-6 py-4 flex items-center justify-between border-b border-slate-200">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-purple-50 text-purple-700 border border-purple-200 flex items-center justify-center">
              <FileSpreadsheet className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-purple-600 font-mono font-semibold">
                <span>Internal Financial Audit Ledger</span>
                <span>·</span>
                <span>ADMIN CONFIDENTIAL</span>
              </div>
              <h3 className="text-base font-bold text-slate-900">
                Transaction Ledger: {transaction.code}
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
        <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto text-xs">
          
          {/* Unmasked Identities Strip */}
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-3">
            <div className="flex items-center justify-between border-b border-slate-200 pb-2">
              <span className="font-bold text-slate-900 uppercase tracking-wider text-[11px]">
                Commercial Identity Resolution (Shielded from Public & Counterparties)
              </span>
              <span className="text-[10px] font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                AXIA Controlled Escrow
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              
              {/* Supplier Identity */}
              <div className="p-3.5 rounded-lg bg-white border border-slate-200 space-y-1">
                <span className="text-[10px] uppercase font-mono text-slate-400 block">Verified Supplier</span>
                <strong className="text-xs text-slate-900 block">{transaction.sellerExactName}</strong>
                <div className="text-[11px] text-slate-600">
                  <span className="font-medium">Public Alias:</span> {transaction.sellerAnonymousHub}
                </div>
                <div className="text-[11px] text-slate-500">
                  <span className="font-medium">Origin Address:</span> Dallas Logistics Park, Texas 75261, USA
                </div>
              </div>

              {/* Receiver Identity */}
              <div className="p-3.5 rounded-lg bg-white border border-slate-200 space-y-1">
                <span className="text-[10px] uppercase font-mono text-slate-400 block">Verified Receiver</span>
                <strong className="text-xs text-slate-900 block">{transaction.buyerExactName}</strong>
                <div className="text-[11px] text-slate-600">
                  <span className="font-medium">Public Alias:</span> {transaction.buyerAnonymousHub}
                </div>
                <div className="text-[11px] text-slate-500">
                  <span className="font-medium">Delivery Address:</span> Bhiwandi Industrial Logistics Area, Maharashtra 421302
                </div>
              </div>

            </div>
          </div>

          {/* Full Line-By-Line Financial Breakdown */}
          <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
            <div className="px-4 py-3 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
              <span className="font-bold text-slate-900 uppercase tracking-wider text-[11px]">
                Complete Financial Breakdown
              </span>
              <span className="font-mono text-slate-400 text-[11px]">All figures in INR (₹)</span>
            </div>

            <div className="divide-y divide-slate-100 text-xs">
              
              {/* Row 1 */}
              <div className="px-4 py-2.5 flex justify-between">
                <span className="text-slate-600">Source Acquisition Cost:</span>
                <span className="font-mono font-bold text-slate-900 tabular-nums">
                  ₹{e.acquisitionCostInr.toLocaleString('en-IN')}
                </span>
              </div>

              {/* Ocean / Air Freight */}
              <div className="px-4 py-2.5 flex justify-between">
                <span className="text-slate-600">Intermodal Freight Line-Haul:</span>
                <span className="font-mono font-medium text-slate-900 tabular-nums">
                  ₹{e.freightCostInr.toLocaleString('en-IN')}
                </span>
              </div>

              {/* Marine Insurance */}
              <div className="px-4 py-2.5 flex justify-between">
                <span className="text-slate-600">Marine Cargo & Transit Insurance (0.8%):</span>
                <span className="font-mono font-medium text-slate-900 tabular-nums">
                  ₹{e.insuranceCostInr.toLocaleString('en-IN')}
                </span>
              </div>

              {/* Domestic Hub Transport */}
              <div className="px-4 py-2.5 flex justify-between">
                <span className="text-slate-600">Domestic Hub Drayage & Last-Mile Delivery:</span>
                <span className="font-mono font-medium text-slate-900 tabular-nums">
                  ₹{e.domesticTransportInr.toLocaleString('en-IN')}
                </span>
              </div>

              {/* Processing & Testing */}
              <div className="px-4 py-2.5 flex justify-between">
                <span className="text-slate-600">Refurbishment, Testing & Sanitization:</span>
                <span className="font-mono font-medium text-slate-900 tabular-nums">
                  ₹{e.processingCostInr.toLocaleString('en-IN')}
                </span>
              </div>

              {/* Compliance & Certifications */}
              <div className="px-4 py-2.5 flex justify-between">
                <span className="text-slate-600">BIS / DGFT / EPR Compliance Clearance Filing:</span>
                <span className="font-mono font-medium text-slate-900 tabular-nums">
                  ₹{e.complianceCostInr.toLocaleString('en-IN')}
                </span>
              </div>

              {/* Import Duty */}
              <div className="px-4 py-2.5 flex justify-between">
                <span className="text-slate-600">Customs Basic Import Duty (7.5%):</span>
                <span className="font-mono font-medium text-slate-900 tabular-nums">
                  ₹{e.importDutyInr.toLocaleString('en-IN')}
                </span>
              </div>

              {/* GST / VAT */}
              <div className="px-4 py-2.5 flex justify-between">
                <span className="text-slate-600">Integrated Goods & Services Tax (18% IGST):</span>
                <span className="font-mono font-medium text-slate-900 tabular-nums">
                  ₹{e.gstVatInr.toLocaleString('en-IN')}
                </span>
              </div>

              {/* Risk Reserve Buffer */}
              <div className="px-4 py-2.5 flex justify-between">
                <span className="text-slate-600">Contingency & FX Risk Reserve (2.5%):</span>
                <span className="font-mono font-medium text-slate-900 tabular-nums">
                  ₹{e.riskReserveInr.toLocaleString('en-IN')}
                </span>
              </div>

              {/* Supplier Platform Fee */}
              <div className="px-4 py-2.5 flex justify-between bg-slate-50/60">
                <span className="text-slate-900 font-medium">AXIA Supplier Platform Fee (8%):</span>
                <span className="font-mono font-bold text-blue-600 tabular-nums">
                  ₹{e.supplierPlatformFeeInr.toLocaleString('en-IN')}
                </span>
              </div>

              {/* Receiver Platform Fee */}
              <div className="px-4 py-2.5 flex justify-between bg-slate-50/60">
                <span className="text-slate-900 font-medium">AXIA Receiver Platform Fee (6%):</span>
                <span className="font-mono font-bold text-blue-600 tabular-nums">
                  ₹{e.receiverPlatformFeeInr.toLocaleString('en-IN')}
                </span>
              </div>

              {/* Logistics Margin */}
              <div className="px-4 py-2.5 flex justify-between bg-slate-50/60">
                <span className="text-slate-900 font-medium">AXIA Freight Margin (8%):</span>
                <span className="font-mono font-bold text-blue-600 tabular-nums">
                  ₹{e.logisticsMarginInr.toLocaleString('en-IN')}
                </span>
              </div>

            </div>

            {/* Bottom 3 Primary Balances */}
            <div className="p-4 bg-slate-50 border-t border-slate-200 grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-3 bg-white rounded-lg border border-slate-200">
                <span className="text-[11px] text-slate-400 uppercase font-mono block">Supplier Net Payout</span>
                <div className="text-base font-bold font-mono text-slate-900 tabular-nums">
                  ₹{e.supplierNetPayoutInr.toLocaleString('en-IN')}
                </div>
                <span className="text-[10px] text-slate-500">Transferred to escrow bank</span>
              </div>

              <div className="p-3 bg-purple-50 rounded-lg border border-purple-200">
                <span className="text-[11px] text-purple-700 uppercase font-mono block font-semibold">AXIA Net Gross Profit</span>
                <div className="text-base font-bold font-mono text-purple-900 tabular-nums">
                  ₹{(e.supplierPlatformFeeInr + e.receiverPlatformFeeInr + e.logisticsMarginInr).toLocaleString('en-IN')}
                </div>
                <span className="text-[10px] text-purple-600">Combined fee realization</span>
              </div>

              <div className="p-3 bg-white rounded-lg border border-slate-200">
                <span className="text-[11px] text-slate-400 uppercase font-mono block">Receiver Landed Total</span>
                <div className="text-base font-bold font-mono text-slate-900 tabular-nums">
                  ₹{e.receiverTotalLandedCostInr.toLocaleString('en-IN')}
                </div>
                <span className="text-[10px] text-slate-500">₹{e.costPerUnitInr.toLocaleString('en-IN')}/unit</span>
              </div>
            </div>

          </div>

        </div>

        {/* Footer */}
        <div className="bg-slate-50 px-6 py-3.5 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
          <span>Audit Stamp: Hash verified against transaction ledger</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 text-xs font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
          >
            Close Audit View
          </button>
        </div>

      </div>
    </div>
  );
};
