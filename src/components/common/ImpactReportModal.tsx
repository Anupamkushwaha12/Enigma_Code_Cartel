import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  CheckCircle, 
  Download, 
  FileText, 
  HelpCircle, 
  Info, 
  Leaf, 
  Printer, 
  Scale, 
  Share2, 
  ShieldCheck, 
  Sparkles, 
  X 
} from 'lucide-react';

export const ImpactReportModal: React.FC = () => {
  const { activeImpactReport, closeImpactReport, markImpactReportGenerated } = useApp();
  const [isGeneratedView, setIsGeneratedView] = useState(false);

  if (!activeImpactReport) return null;

  const r = activeImpactReport;

  const handleGenerate = () => {
    markImpactReportGenerated(r.id);
    setIsGeneratedView(true);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl border border-slate-200 max-w-3xl w-full shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="bg-white px-6 py-4 flex items-center justify-between border-b border-slate-200">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center justify-center">
              <Leaf className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs uppercase tracking-wider text-emerald-700 font-mono font-semibold">
                Optional Sustainability Assessment
              </div>
              <h3 className="text-base font-bold text-slate-900">
                Resource Environmental Impact Evaluation
              </h3>
            </div>
          </div>
          <button
            onClick={closeImpactReport}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
          
          {/* Discretionary Notice */}
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 flex items-start gap-3">
            <Info className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
            <div>
              <strong className="text-slate-900">Methodology-Based Transaction Accounting:</strong> This evaluation reflects emissions avoided specifically by diverting this transacted lot from conventional end-of-life disposal into certified high-yield reallocation. It is intended for internal Scope 3 reporting and does not constitute statutory sovereign certification.
            </div>
          </div>

          {/* Transaction Metadata Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs">
            <div>
              <span className="text-[11px] text-slate-400 uppercase font-mono block">Transaction ID</span>
              <strong className="text-slate-900 font-mono text-sm">{r.transactionCode}</strong>
            </div>
            <div>
              <span className="text-[11px] text-slate-400 uppercase font-mono block">Resource Lot</span>
              <strong className="text-slate-900 line-clamp-1">{r.resourceName}</strong>
            </div>
            <div>
              <span className="text-[11px] text-slate-400 uppercase font-mono block">Quantity / Weight</span>
              <strong className="text-slate-900 font-mono">{r.quantity.toLocaleString('en-IN')} {r.unit} ({r.quantityDivertedTonnes}t)</strong>
            </div>
            <div>
              <span className="text-[11px] text-slate-400 uppercase font-mono block">Corridor</span>
              <strong className="text-slate-900 text-[11px]">{r.originRegion.split('—')[0]} → {r.destinationRegion.split('—')[0]}</strong>
            </div>
          </div>

          {/* Primary Calculation Equation */}
          <div className="bg-white p-5 rounded-xl border border-slate-200">
            <div className="text-xs uppercase font-mono tracking-wider text-slate-500 font-semibold mb-3">
              Comparative Life-Cycle Pathway Equation
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center text-center">
              
              {/* Baseline */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-xs font-semibold text-rose-700 block mb-1">Baseline Pathway</span>
                <div className="text-2xl font-bold font-mono text-slate-900 tabular-nums">
                  {r.baselineCo2eTonnes} <span className="text-xs font-normal text-slate-500">tCO₂e</span>
                </div>
                <p className="text-[11px] text-slate-500 mt-1.5 leading-snug">
                  Conventional scrap downcycling & premature landfilling
                </p>
              </div>

              {/* Subtraction indicator */}
              <div className="flex flex-col items-center justify-center">
                <span className="text-xs font-mono font-bold text-slate-400">LESS</span>
                <span className="text-xs text-slate-500">AXIA Pathway</span>
                <div className="w-8 h-0.5 bg-slate-200 my-1"></div>
              </div>

              {/* AXIA Pathway */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-xs font-semibold text-blue-700 block mb-1">AXIA Pathway Footprint</span>
                <div className="text-2xl font-bold font-mono text-slate-900 tabular-nums">
                  {r.axiaCo2eTonnes} <span className="text-xs font-normal text-slate-500">tCO₂e</span>
                </div>
                <p className="text-[11px] text-slate-500 mt-1.5 leading-snug">
                  Intermodal freight + precision testing & refurbishment
                </p>
              </div>

            </div>

            {/* Avoided Emissions Result Hero */}
            <div className="mt-5 p-5 rounded-xl bg-emerald-50 border border-emerald-200 text-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3.5 text-left">
                <div className="w-11 h-11 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-sm">
                  <Leaf className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-xs uppercase font-mono tracking-wider text-emerald-800 font-semibold">
                    Estimated Net Avoided CO₂e
                  </div>
                  <div className="text-2xl font-black font-mono tracking-tight text-emerald-900 tabular-nums">
                    {r.avoidedCo2eTonnes} Tonnes CO₂e
                  </div>
                </div>
              </div>
              <div className="text-right text-xs text-emerald-800 max-w-[220px]">
                Equivalent to approximately {Math.round(r.avoidedCo2eTonnes * 1.8)} long-haul passenger flights avoided.
              </div>
            </div>

          </div>

          {/* Component Emission Factor Breakdown */}
          <div className="bg-white p-5 rounded-xl border border-slate-200 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900">
              Detailed Factor Contributions
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
                <span className="text-slate-500 block text-[11px]">Intermodal Transport:</span>
                <span className="font-mono font-bold text-slate-900 text-sm tabular-nums">
                  {r.transportEmissionsTonnes} tCO₂e
                </span>
                <span className="text-[10px] text-slate-400 block mt-0.5">Maritime / highway line-haul</span>
              </div>

              <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
                <span className="text-slate-500 block text-[11px]">Refurbishment & Testing:</span>
                <span className="font-mono font-bold text-slate-900 text-sm tabular-nums">
                  {r.processingEmissionsTonnes} tCO₂e
                </span>
                <span className="text-[10px] text-slate-400 block mt-0.5">Diagnostic energy & packaging</span>
              </div>

              <div className="p-3 rounded-lg bg-emerald-50/60 border border-emerald-200">
                <span className="text-emerald-800 block text-[11px]">Component Utility Retention:</span>
                <span className="font-mono font-bold text-emerald-700 text-sm tabular-nums">
                  {Math.round(r.reuseRecoveryFactor * 100)}%
                </span>
                <span className="text-[10px] text-emerald-600 block mt-0.5">Displacing new raw extraction</span>
              </div>
            </div>

            <div className="pt-2 text-[11px] text-slate-500 border-t border-slate-100 flex items-center justify-between">
              <span>Calculation Standard: GHG Protocol Scope 3 Technical Guidance</span>
              <span className="font-mono text-slate-700">Generated: {r.dateGenerated}</span>
            </div>
          </div>

          {/* Enterprise Document Preview (when generated) */}
          {isGeneratedView && (
            <div className="p-6 bg-slate-50 border-2 border-dashed border-emerald-300 rounded-xl text-xs space-y-4">
              <div className="flex justify-between items-center border-b border-slate-200 pb-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-blue-600 text-white font-bold flex items-center justify-center text-xs">AX</div>
                  <span className="font-bold text-slate-900 text-sm">AXIA Verified Resource Impact Record</span>
                </div>
                <div className="text-[11px] font-mono text-slate-500">DOC-REF: {r.id}</div>
              </div>
              <p className="text-slate-600 leading-relaxed">
                This document certifies that transaction <strong>{r.transactionCode}</strong> involving <strong>{r.quantity.toLocaleString('en-IN')} {r.unit}</strong> of <em>{r.resourceName}</em> was processed via AXIA&apos;s managed secondary value chain. By extending functional service lifespan and displacing equivalent primary manufacturing, the estimated net greenhouse gas reduction achieved is <strong>{r.avoidedCo2eTonnes} metric tonnes CO₂ equivalent</strong>.
              </p>
              <div className="flex items-center justify-between text-[11px] text-slate-400 pt-2 border-t border-slate-200">
                <span>Issued by AXIA Resource Exchange Infrastructure</span>
                <span>Deterministic Model v1.2</span>
              </div>
            </div>
          )}

        </div>

        {/* Footer Actions */}
        <div className="bg-slate-50 px-6 py-4 border-t border-slate-200 flex items-center justify-between">
          <div className="text-xs text-slate-500">
            Recorded in transaction audit log: <span className="font-mono font-medium text-slate-900">{r.transactionCode}</span>
          </div>

          <div className="flex items-center gap-3">
            {isGeneratedView ? (
              <button
                onClick={handlePrint}
                className="px-4 py-2 text-xs font-semibold bg-slate-900 text-white rounded-lg hover:bg-slate-800 flex items-center gap-2 shadow-xs transition-colors cursor-pointer"
              >
                <Printer className="w-3.5 h-3.5" />
                Print / Export Official Document
              </button>
            ) : (
              <button
                onClick={handleGenerate}
                className="px-4 py-2 text-xs font-semibold bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2 shadow-xs transition-colors cursor-pointer"
              >
                <FileText className="w-3.5 h-3.5 text-blue-200" />
                Generate Institutional Impact Report
              </button>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};
