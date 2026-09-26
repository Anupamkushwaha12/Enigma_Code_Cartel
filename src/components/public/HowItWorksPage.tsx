import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  ArrowRight, 
  Boxes, 
  CheckCircle2, 
  Cpu, 
  FileCheck, 
  Gavel, 
  Globe2, 
  HelpCircle, 
  Lock, 
  Scale, 
  ShieldCheck, 
  Truck 
} from 'lucide-react';

export const HowItWorksPage: React.FC = () => {
  const { setRole } = useApp();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      
      {/* Header */}
      <div className="max-w-3xl space-y-3">
        <div className="text-xs font-mono uppercase tracking-wider text-blue-600 font-semibold">
          System Architecture & Mechanics
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          How AXIA Manages the Complete Exchange Pipeline
        </h1>
        <p className="text-sm text-slate-600 leading-relaxed">
          Unlike static classifieds or waste portals, AXIA is an active infrastructure layer. We handle pricing discovery, multi-jurisdiction compliance, commercial anonymity, logistics routing, and transaction escrow between qualified B2B counterparties.
        </p>
      </div>

      {/* 6 Step Pipeline */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        
        {/* Step 1 */}
        <div className="p-6 rounded-xl bg-white border border-slate-200 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <span className="w-7 h-7 rounded-lg bg-blue-100 text-blue-700 font-mono font-bold text-xs flex items-center justify-center">
              01
            </span>
            <span className="text-[11px] font-mono text-slate-400">Intake Phase</span>
          </div>
          <h3 className="font-bold text-base text-slate-900">Surplus & Demand Onboarding</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Suppliers list surplus lots with physical properties, testing logs, and availability. Receivers specify technical specs and maximum acceptable landed cost thresholds.
          </p>
          <div className="text-[11px] text-slate-500 pt-2 border-t border-slate-100">
            Encrypted custody documentation & assay certification required.
          </div>
        </div>

        {/* Step 2 */}
        <div className="p-6 rounded-xl bg-white border border-slate-200 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <span className="w-7 h-7 rounded-lg bg-blue-100 text-blue-700 font-mono font-bold text-xs flex items-center justify-center">
              02
            </span>
            <span className="text-[11px] font-mono text-slate-400">Economics</span>
          </div>
          <h3 className="font-bold text-base text-slate-900">Landed Economics Engine</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            AXIA evaluates source acquisition, intermodal freight rates, cargo insurance, refurbishment costs, customs duties (7.5%), GST (18%), and statutory compliance filing fees.
          </p>
          <div className="text-[11px] text-slate-500 pt-2 border-t border-slate-100">
            Deterministic feasibility classification: VIABLE vs NOT VIABLE.
          </div>
        </div>

        {/* Step 3 */}
        <div className="p-6 rounded-xl bg-white border border-slate-200 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <span className="w-7 h-7 rounded-lg bg-blue-100 text-blue-700 font-mono font-bold text-xs flex items-center justify-center">
              03
            </span>
            <span className="text-[11px] font-mono text-slate-400">Anonymity</span>
          </div>
          <h3 className="font-bold text-base text-slate-900">Commercial Shielding</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Parties remain mutually anonymous. Suppliers see &ldquo;IND — Mumbai Distribution Hub&rdquo;; receivers see &ldquo;USA — Dallas Logistics Hub&rdquo;. All billing and escrow flow through AXIA.
          </p>
          <div className="text-[11px] text-slate-500 pt-2 border-t border-slate-100">
            No direct contact info or margin leaks between buyers and sellers.
          </div>
        </div>

        {/* Step 4 */}
        <div className="p-6 rounded-xl bg-white border border-slate-200 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <span className="w-7 h-7 rounded-lg bg-blue-100 text-blue-700 font-mono font-bold text-xs flex items-center justify-center">
              04
            </span>
            <span className="text-[11px] font-mono text-slate-400">Commercial Rule</span>
          </div>
          <h3 className="font-bold text-base text-slate-900">Direct Buy vs Auction Trigger</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            If 1 buyer shows interest, transaction is executed via <strong>Direct Buy</strong>. If 2 or more buyers show interest, AXIA automatically converts the lot into an <strong>Anonymous Auction</strong>.
          </p>
          <div className="text-[11px] text-slate-500 pt-2 border-t border-slate-100">
            Prevents artificial auction delays for non-competitive lots.
          </div>
        </div>

        {/* Step 5 */}
        <div className="p-6 rounded-xl bg-white border border-slate-200 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <span className="w-7 h-7 rounded-lg bg-blue-100 text-blue-700 font-mono font-bold text-xs flex items-center justify-center">
              05
            </span>
            <span className="text-[11px] font-mono text-slate-400">Fulfillment</span>
          </div>
          <h3 className="font-bold text-base text-slate-900">Managed Logistics & Customs</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Upon escrow confirmation, verified freight partners are dispatched for origin pickup, bonded line-haul, customs clearance, and delivery to the receiver&apos;s receiving facility.
          </p>
          <div className="text-[11px] text-slate-500 pt-2 border-t border-slate-100">
            End-to-end chain of custody with real-time milestone checkpoints.
          </div>
        </div>

        {/* Step 6 */}
        <div className="p-6 rounded-xl bg-white border border-slate-200 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <span className="w-7 h-7 rounded-lg bg-blue-100 text-blue-700 font-mono font-bold text-xs flex items-center justify-center">
              06
            </span>
            <span className="text-[11px] font-mono text-slate-400">Optional Impact</span>
          </div>
          <h3 className="font-bold text-base text-slate-900">Scope 3 Impact Accounting</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            On-demand only. When requested, AXIA calculates avoided emissions using transparent life-cycle displacement math comparing downcycling vs managed reuse.
          </p>
          <div className="text-[11px] text-slate-500 pt-2 border-t border-slate-100">
            Generates downloadable corporate ESG documentation without greenwashing.
          </div>
        </div>

      </div>

      {/* Anonymity Diagram */}
      <div className="p-8 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-6">
        <div className="max-w-2xl space-y-2">
          <div className="text-xs font-mono uppercase tracking-wider text-blue-600 font-semibold">
            Data Privacy & Commercial Safeguards
          </div>
          <h3 className="text-xl font-bold text-slate-900">
            Commercial Anonymity Guarantee
          </h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Direct buyer-seller contacts often lead to disintermediation, counterparty risk, and price erosion. AXIA resolves this by acting as the legal and logistics principal in every exchange.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
            <strong className="text-slate-900 block font-mono text-sm">Supplier Sees:</strong>
            <ul className="space-y-1 text-slate-600">
              <li>· Winning anonymous offer (₹/kg or $/unit)</li>
              <li>· Destination hub region (e.g. Mumbai Hub)</li>
              <li>· Net guaranteed payout in escrow</li>
              <li>· Zero buyer corporate identity or address</li>
            </ul>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
            <strong className="text-slate-900 block font-mono text-sm">Receiver Sees:</strong>
            <ul className="space-y-1 text-slate-600">
              <li>· Landed cost all-inclusive at local hub</li>
              <li>· Verified condition grade & assay certificates</li>
              <li>· Consolidated B2B tax invoice</li>
              <li>· Zero supplier origin company identity</li>
            </ul>
          </div>

          <div className="p-4 rounded-xl bg-blue-50/60 border border-blue-200 space-y-2">
            <strong className="text-blue-800 block font-mono text-sm">AXIA Controls:</strong>
            <ul className="space-y-1 text-blue-900/80">
              <li>· Escrow payment settlement</li>
              <li>· Carrier assignment & customs clearing</li>
              <li>· Multi-buyer anonymous auction room</li>
              <li>· Full audit ledger (Admin only)</li>
            </ul>
          </div>
        </div>
      </div>

    </div>
  );
};
