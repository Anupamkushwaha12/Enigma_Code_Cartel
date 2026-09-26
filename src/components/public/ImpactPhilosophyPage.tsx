import React from 'react';
import { 
  ArrowRight, 
  CheckCircle2, 
  FileText, 
  HelpCircle, 
  Info, 
  Leaf, 
  Scale, 
  ShieldAlert, 
  ShieldCheck 
} from 'lucide-react';

export const ImpactPhilosophyPage: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      
      {/* Header */}
      <div className="max-w-3xl space-y-3">
        <div className="text-xs font-mono uppercase tracking-wider text-blue-600 font-semibold">
          Transparent Sustainability Accounting
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Environmental Impact Reporting Methodology
        </h1>
        <p className="text-sm text-slate-600 leading-relaxed">
          AXIA treats carbon accounting as a rigorous, optional, on-demand service. We do not plaster speculative green badges across commercial catalogues. Environmental metrics are derived exclusively from verified transaction data using life-cycle displacement methodology.
        </p>
      </div>

      {/* 3 Core Philosophical Principles */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        <div className="p-6 rounded-xl bg-white border border-slate-200 shadow-xs space-y-3">
          <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center font-bold text-xs font-mono border border-blue-100">
            01
          </div>
          <h3 className="font-bold text-base text-slate-900">On-Demand, Never Forced</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Carbon figures appear only when an enterprise counterparty specifically clicks &ldquo;View Environmental Impact&rdquo; or &ldquo;Generate Impact Report&rdquo;. It serves real audit needs without cluttering commercial trading.
          </p>
        </div>

        <div className="p-6 rounded-xl bg-white border border-slate-200 shadow-xs space-y-3">
          <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center font-bold text-xs font-mono border border-blue-100">
            02
          </div>
          <h3 className="font-bold text-base text-slate-900">Transparent Math, No Magic</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Every metric explains its underlying equation: Baseline downcycling emissions minus AXIA freight & refurbishment footprint equals Net CO₂e avoided. Every coefficient is auditable.
          </p>
        </div>

        <div className="p-6 rounded-xl bg-white border border-slate-200 shadow-xs space-y-3">
          <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center font-bold text-xs font-mono border border-blue-100">
            03
          </div>
          <h3 className="font-bold text-base text-slate-900">No Sovereign Claims</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            We clearly label all calculations as Scope 3 transaction estimates. We do not claim official government carbon credit issuance or statutory offset certifications.
          </p>
        </div>

      </div>

      {/* The Mathematical Formula Breakdown */}
      <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm space-y-6">
        <div className="border-b border-slate-100 pb-4 flex items-center justify-between">
          <span className="text-xs font-mono uppercase tracking-wider text-blue-600 font-semibold">
            Governing Displacement Equation
          </span>
          <span className="text-xs font-mono text-slate-400">Scope 3 Cat 1 / Cat 12 Model</span>
        </div>

        <div className="p-6 rounded-xl bg-slate-50 border border-slate-200 text-center space-y-3">
          <div className="text-xs uppercase font-mono text-slate-500 font-medium">Standard Formula</div>
          <div className="text-xl sm:text-2xl font-mono font-bold text-slate-900 tracking-tight">
            Avoided CO₂e = Baseline Pathway Footprint − AXIA Pathway Footprint
          </div>
          <div className="text-xs text-slate-500 max-w-xl mx-auto">
            Where AXIA Pathway Footprint = (Freight Distance × Tonnes × Cargo Factor) + (Units × Testing Energy)
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-slate-600">
          <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
            <strong className="text-slate-900 block font-mono text-sm">Baseline Pathway (The Counterfactual)</strong>
            <p className="leading-relaxed">
              Assumes premature shredding or downcycling in source geography, necessitating new replacement hardware to be extracted and manufactured virgin from raw materials (220kg CO₂e embodied per enterprise laptop).
            </p>
          </div>

          <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
            <strong className="text-slate-900 block font-mono text-sm">AXIA Managed Pathway (The Actual)</strong>
            <p className="leading-relaxed">
              Captures actual intermodal freight footprint (container vessel & low-emission rail) plus certified workshop diagnostic electricity. Net delta represents true resource conservation.
            </p>
          </div>
        </div>
      </div>

    </div>
  );
};
