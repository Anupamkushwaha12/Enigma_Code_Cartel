import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { PostRequirementModal } from './PostRequirementModal';
import { 
  AlertCircle, 
  ArrowRight, 
  Boxes, 
  Building2, 
  CheckCircle2, 
  Compass, 
  Cpu, 
  FileText, 
  Flame, 
  Gavel, 
  Globe2, 
  HelpCircle, 
  Leaf, 
  MapPin, 
  Percent, 
  Plus, 
  Search, 
  ShieldCheck, 
  ShoppingCart, 
  Target, 
  TrendingUp, 
  Truck 
} from 'lucide-react';

export const ReceiverDashboard: React.FC = () => {
  const { 
    requirements, 
    resources, 
    matches, 
    transactions, 
    shipments, 
    setSelectedResource, 
    setSelectedAuction,
    auctions,
    openImpactReportForTransaction 
  } = useApp();

  const [activeTab, setActiveTab] = useState<'discovery' | 'requirements' | 'matches' | 'orders'>('discovery');
  const [showPostModal, setShowPostModal] = useState(false);

  // Focus requirement (defaults to Mumbai 1,000 laptops req)
  const currentReq = requirements[0];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-indigo-600 font-semibold">
            <span>Receiver Sourcing Portal</span>
            <span>·</span>
            <span>Mumbai Distribution Hub (Verified Facility)</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Surplus Resource Acquisition Engine
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            NexGen Refurbishment & Re-Commerce Pvt. Ltd. · Commercial anonymity maintained
          </p>
        </div>

        {/* Post Requirement Button */}
        <button
          onClick={() => setShowPostModal(true)}
          className="px-4 py-2.5 text-xs font-semibold bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all shadow-xs flex items-center gap-2 cursor-pointer self-start sm:self-auto"
        >
          <Plus className="w-4 h-4 text-indigo-200" />
          <span>Post Requirement</span>
        </button>
      </div>

      {/* Primary KPI Strip */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="p-5 rounded-xl bg-white border border-slate-200 shadow-xs">
          <span className="text-[11px] text-slate-400 uppercase font-mono block mb-1">Active Sourcing Orders</span>
          <div className="text-2xl font-bold font-mono text-slate-900 tabular-nums">
            {requirements.length}
          </div>
          <span className="text-[10px] text-slate-500 block mt-0.5">Specifications active in matching</span>
        </div>

        <div className="p-5 rounded-xl bg-white border border-slate-200 shadow-xs">
          <span className="text-[11px] text-slate-400 uppercase font-mono block mb-1">Viable Matched Lots</span>
          <div className="text-2xl font-bold font-mono text-emerald-700 tabular-nums">
            {matches.filter(m => m.isEconomicallyViable).length}
          </div>
          <span className="text-[10px] text-emerald-600 block mt-0.5 font-medium">Under maximum landed budget</span>
        </div>

        <div className="p-5 rounded-xl bg-indigo-50/70 border border-indigo-200 shadow-xs">
          <span className="text-[11px] text-indigo-700 uppercase font-mono block mb-1 font-semibold">Target Landed Benchmark</span>
          <div className="text-2xl font-bold font-mono text-indigo-900 tabular-nums">
            ₹{currentReq?.maxLandedCost.toLocaleString('en-IN') || '20,000'}
          </div>
          <span className="text-[10px] text-indigo-600/80 block mt-0.5">Maximum landed ceiling</span>
        </div>

        <div className="p-5 rounded-xl bg-white border border-slate-200 shadow-xs">
          <span className="text-[11px] text-slate-400 uppercase font-mono block mb-1">Active Shipments Inbound</span>
          <div className="text-2xl font-bold font-mono text-slate-900 tabular-nums">
            {shipments.filter(s => s.status !== 'delivered').length}
          </div>
          <span className="text-[10px] text-blue-600 block mt-0.5 font-medium">In transit / customs clear</span>
        </div>

      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 text-xs font-medium pb-px">
        <button
          onClick={() => setActiveTab('discovery')}
          className={`px-3 py-2 border-b-2 transition-colors cursor-pointer flex items-center gap-1.5 ${
            activeTab === 'discovery'
              ? 'border-indigo-600 text-indigo-600 font-bold'
              : 'border-transparent text-slate-500 hover:text-slate-900'
          }`}
        >
          <Compass className="w-3.5 h-3.5 text-indigo-600" />
          <span>Smart Resource Discovery (Viable vs Non-Viable)</span>
        </button>
        <button
          onClick={() => setActiveTab('requirements')}
          className={`px-3 py-2 border-b-2 transition-colors cursor-pointer ${
            activeTab === 'requirements'
              ? 'border-indigo-600 text-indigo-600 font-bold'
              : 'border-transparent text-slate-500 hover:text-slate-900'
          }`}
        >
          My Posted Requirements ({requirements.length})
        </button>
        <button
          onClick={() => setActiveTab('matches')}
          className={`px-3 py-2 border-b-2 transition-colors cursor-pointer ${
            activeTab === 'matches'
              ? 'border-indigo-600 text-indigo-600 font-bold'
              : 'border-transparent text-slate-500 hover:text-slate-900'
          }`}
        >
          Matching Engine Evaluations ({matches.length})
        </button>
        <button
          onClick={() => setActiveTab('orders')}
          className={`px-3 py-2 border-b-2 transition-colors cursor-pointer ${
            activeTab === 'orders'
              ? 'border-indigo-600 text-indigo-600 font-bold'
              : 'border-transparent text-slate-500 hover:text-slate-900'
          }`}
        >
          Orders, Shipments & Impact ({transactions.length})
        </button>
      </div>

      {/* TAB 1: SMART RESOURCE DISCOVERY (Prompt Section 10 Demo Scenario) */}
      {activeTab === 'discovery' && (
        <div className="space-y-6">
          
          {/* Active Need Context Banner */}
          <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-[11px] font-mono uppercase text-slate-400">Active Requirement Filter</span>
              <h3 className="font-bold text-slate-900 text-sm">
                Need: 1,000 Laptops · Max Landed Cost: ₹20,000/unit · Required before 15 October
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                AXIA scanned available global opportunities to calculate complete landed feasibility.
              </p>
            </div>
            <button
              onClick={() => setShowPostModal(true)}
              className="text-xs font-semibold text-indigo-600 hover:underline cursor-pointer"
            >
              Edit Target Specs
            </button>
          </div>

          {/* Discovery Results Comparison Grid (USA VIABLE vs CHINA NOT VIABLE) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* 1. USA → India Opportunity (VIABLE) */}
            <div className="bg-white rounded-xl border border-emerald-300 p-6 shadow-xs flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-slate-900">
                    USA → India Corridor
                  </span>
                  <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-md border border-emerald-200">
                    <CheckCircle2 className="w-3.5 h-3.5" /> STATUS: VIABLE
                  </span>
                </div>

                <h3 className="text-base font-bold text-slate-900">
                  Dell Latitude 5420 Intel Core i5 (4,000 Units)
                </h3>
                <p className="text-xs text-slate-500">
                  Dallas Logistics Hub · Grade A Refurbishable · NIST 800-88 Data Sanitized
                </p>

                {/* Economics comparison strip */}
                <div className="grid grid-cols-3 gap-2 p-3 rounded-lg bg-slate-50 border border-slate-200 text-xs">
                  <div>
                    <span className="text-[10px] text-slate-400 block uppercase font-mono">Estimated Landed</span>
                    <strong className="text-base font-mono font-bold text-slate-900 tabular-nums">
                      ₹15,000
                    </strong>
                    <span className="text-[10px] text-emerald-700 block font-medium">₹5,000 under budget</span>
                  </div>

                  <div>
                    <span className="text-[10px] text-slate-400 block uppercase font-mono">Receiver Max</span>
                    <strong className="text-base font-mono font-bold text-slate-600 tabular-nums">
                      ₹20,000
                    </strong>
                    <span className="text-[10px] text-slate-400 block">Your target limit</span>
                  </div>

                  <div>
                    <span className="text-[10px] text-slate-400 block uppercase font-mono">Destination Value</span>
                    <strong className="text-base font-mono font-bold text-emerald-700 tabular-nums">
                      ₹23,500
                    </strong>
                    <span className="text-[10px] text-slate-400 block">Resale benchmark</span>
                  </div>
                </div>

                <div className="text-[11px] text-emerald-900 bg-emerald-50/80 p-3 rounded-lg border border-emerald-200">
                  <strong>Feasibility Passed:</strong> Positive net margin spread of ₹8,500 per unit above landed cost. 1 buyer interested (Direct Buy mode enabled).
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs text-slate-400 font-mono">AX-RES-1042</span>
                <button
                  onClick={() => setSelectedResource(resources[0])}
                  className="px-4 py-2 text-xs font-semibold bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-xs cursor-pointer flex items-center gap-1.5"
                >
                  <ShoppingCart className="w-3.5 h-3.5 text-blue-200" />
                  <span>Inspect & Purchase (₹15,000)</span>
                </button>
              </div>
            </div>

            {/* 2. China → India Opportunity (NOT VIABLE) */}
            <div className="bg-white rounded-xl border border-rose-200 p-6 shadow-xs flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-slate-900">
                    China → India Corridor
                  </span>
                  <span className="inline-flex items-center gap-1 text-xs font-bold text-rose-700 bg-rose-50 px-2.5 py-0.5 rounded-md border border-rose-200">
                    <AlertCircle className="w-3.5 h-3.5" /> STATUS: NOT VIABLE
                  </span>
                </div>

                <h3 className="text-base font-bold text-slate-900">
                  Dell Latitude 5420 Intel Core i5 (4,000 Units)
                </h3>
                <p className="text-xs text-slate-500">
                  Shenzhen Cargo Terminal · Grade B Exterior · Additional chassis skinning needed
                </p>

                {/* Economics comparison strip */}
                <div className="grid grid-cols-3 gap-2 p-3 rounded-lg bg-slate-50 border border-slate-200 text-xs">
                  <div>
                    <span className="text-[10px] text-slate-400 block uppercase font-mono">Estimated Landed</span>
                    <strong className="text-base font-mono font-bold text-rose-700 tabular-nums">
                      ₹21,800
                    </strong>
                    <span className="text-[10px] text-rose-700 block font-medium">+₹1,800 over budget</span>
                  </div>

                  <div>
                    <span className="text-[10px] text-slate-400 block uppercase font-mono">Receiver Max</span>
                    <strong className="text-base font-mono font-bold text-slate-600 tabular-nums">
                      ₹20,000
                    </strong>
                    <span className="text-[10px] text-slate-400 block">Your target limit</span>
                  </div>

                  <div>
                    <span className="text-[10px] text-slate-400 block uppercase font-mono">Destination Value</span>
                    <strong className="text-base font-mono font-bold text-slate-600 tabular-nums">
                      ₹20,000
                    </strong>
                    <span className="text-[10px] text-slate-400 block">Market ceiling</span>
                  </div>
                </div>

                <div className="text-[11px] text-rose-900 bg-rose-50/80 p-3 rounded-lg border border-rose-200">
                  <strong>Automatically Deprioritized:</strong> Landed cost (₹21,800/unit) exceeds maximum budget ceiling (₹20,000/unit) due to higher base FOB quotes and chassis refurbishment costs.
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs text-slate-400 font-mono">AX-RES-1043</span>
                <button
                  onClick={() => setSelectedResource(resources[1])}
                  className="px-3.5 py-1.5 text-xs font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer"
                >
                  View Cost Breakdown
                </button>
              </div>
            </div>

          </div>

          {/* Active Auction Highlight if applicable */}
          <div className="p-5 rounded-xl bg-amber-50/70 border border-amber-200 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-amber-100 text-amber-700 border border-amber-200 flex items-center justify-center shrink-0">
                <Flame className="w-5 h-5 text-amber-600 animate-pulse" />
              </div>
              <div className="text-xs">
                <div className="font-mono text-[10px] font-bold text-amber-800 uppercase tracking-wider">
                  Live Multi-Buyer Auction
                </div>
                <strong className="text-sm text-slate-900 block">
                  100 Tonnes Mild Steel Continuous Cast Billets (AX-AUC-401)
                </strong>
                <span className="text-slate-600">
                  Triggered because 3 verified buyers expressed commercial interest. Current highest bid: ₹51/kg.
                </span>
              </div>
            </div>

            <button
              onClick={() => setSelectedAuction(auctions[0])}
              className="px-4 py-2 text-xs font-semibold bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors shadow-xs flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
            >
              <Gavel className="w-3.5 h-3.5 text-amber-200" />
              <span>Enter Anonymous Auction</span>
            </button>
          </div>

        </div>
      )}

      {/* TAB 2: MY POSTED REQUIREMENTS */}
      {activeTab === 'requirements' && (
        <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
          <div className="p-4 bg-slate-50/60 border-b border-slate-100 flex items-center justify-between">
            <span className="font-bold text-xs uppercase tracking-wider text-slate-900">
              Your Sourcing Specifications
            </span>
            <button
              onClick={() => setShowPostModal(true)}
              className="text-xs font-semibold text-indigo-600 hover:underline flex items-center gap-1 cursor-pointer"
            >
              <Plus className="w-3 h-3" /> Post New
            </button>
          </div>

          <div className="divide-y divide-slate-100 text-xs">
            {requirements.map(req => (
              <div key={req.id} className="p-4 space-y-2 hover:bg-slate-50 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[11px] text-slate-400">{req.code}</span>
                    <strong className="text-sm text-slate-900">{req.title}</strong>
                  </div>
                  <span className="font-mono font-bold text-xs text-indigo-700 bg-indigo-50 px-2.5 py-0.5 rounded-md border border-indigo-200">
                    Max Landed: ₹{req.maxLandedCost.toLocaleString('en-IN')}/{req.unit}
                  </span>
                </div>

                <p className="text-slate-600 leading-snug">
                  <strong className="text-slate-900">Specs:</strong> {req.requiredSpecifications}
                </p>

                <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1">
                  <span>Quantity: {req.quantityRequired.toLocaleString('en-IN')} {req.unit} · Required by: {req.requiredByDate}</span>
                  <span className="font-mono text-slate-700">{req.destination.hubCode}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: MATCHING ENGINE EVALUATIONS (Prompt Section 12) */}
      {activeTab === 'matches' && (
        <div className="space-y-4">
          <div className="text-xs text-slate-600 bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
            <strong className="text-slate-900">Deterministic Match Formula:</strong> Material Compatibility (35%) + Quantity Fit (20%) + Economic Feasibility (20%) + Distance (15%) + Timing (10%). Economic viability operates as a strict hard gate.
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {matches.map(m => {
              const res = resources.find(r => r.id === m.resourceId);
              const req = requirements.find(r => r.id === m.requirementId);
              if (!res || !req) return null;

              return (
                <div key={m.id} className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-4 flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-mono text-[11px] text-slate-400">{res.code} ↔ {req.code}</span>
                      <div className="flex items-center gap-1.5 font-bold font-mono text-sm text-slate-900">
                        <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                        <span>{m.matchScore}% Match</span>
                      </div>
                    </div>

                    <h4 className="font-bold text-sm text-slate-900">
                      {res.title}
                    </h4>

                    {/* Hard Gate Status Badges */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5 text-[10px]">
                      <span className="p-1 rounded-md bg-slate-50 border border-slate-200 text-emerald-700 flex items-center gap-1 font-medium">
                        <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Material compatible
                      </span>
                      <span className="p-1 rounded-md bg-slate-50 border border-slate-200 text-emerald-700 flex items-center gap-1 font-medium">
                        <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Quantity available
                      </span>
                      <span className={`p-1 rounded-md border flex items-center gap-1 font-medium ${
                        m.checks.withinBudget 
                          ? 'bg-slate-50 border-slate-200 text-emerald-700' 
                          : 'bg-rose-50 border-rose-200 text-rose-700'
                      }`}>
                        {m.checks.withinBudget ? <CheckCircle2 className="w-3 h-3 text-emerald-600" /> : <AlertCircle className="w-3 h-3 text-rose-600" />}
                        Within budget
                      </span>
                      <span className="p-1 rounded-md bg-slate-50 border border-slate-200 text-emerald-700 flex items-center gap-1 font-medium">
                        <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Logistics feasible
                      </span>
                      <span className="p-1 rounded-md bg-slate-50 border border-slate-200 text-emerald-700 flex items-center gap-1 font-medium">
                        <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Timing feasible
                      </span>
                      <span className="p-1 rounded-md bg-slate-50 border border-slate-200 text-emerald-700 flex items-center gap-1 font-medium">
                        <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Compliance passed
                      </span>
                    </div>

                    <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-between text-xs">
                      <span className="text-slate-500">Estimated Landed Cost:</span>
                      <strong className="font-mono text-slate-900">₹{m.economics.costPerUnitInr.toLocaleString('en-IN')}/{res.unit}</strong>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-[11px] text-slate-400 font-mono">
                      Corridor: {res.location.hubCode.split('—')[0]} → {req.destination.city}
                    </span>
                    <button
                      onClick={() => setSelectedResource(res)}
                      className="px-3 py-1.5 text-xs font-semibold bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors cursor-pointer shadow-2xs"
                    >
                      View Landed Details
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 4: ORDERS, SHIPMENTS & IMPACT */}
      {activeTab === 'orders' && (
        <div className="space-y-6">
          <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
            <div className="p-4 bg-slate-50/60 border-b border-slate-100 flex items-center justify-between">
              <span className="font-bold text-xs uppercase tracking-wider text-slate-900">
                Confirmed Acquisition Orders & Milestone Status
              </span>
              <span className="text-xs text-slate-500">All orders backed by AXIA Commercial Escrow</span>
            </div>

            <div className="divide-y divide-slate-100 text-xs">
              {transactions.map(tx => {
                const shp = shipments.find(s => s.id === tx.shipmentId) || shipments[0];

                return (
                  <div key={tx.id} className="p-5 space-y-3 hover:bg-slate-50 transition-colors">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <strong className="font-mono text-sm text-slate-900">{tx.code}</strong>
                        <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                          {tx.status.toUpperCase().replace('_', ' ')}
                        </span>
                      </div>
                      <span className="font-mono text-xs font-bold text-slate-900">
                        Total Landed Cost: ₹{tx.buyerTotalLandedCostInr.toLocaleString('en-IN')}
                      </span>
                    </div>

                    <div className="text-xs text-slate-600">
                      Lot: {tx.quantity.toLocaleString('en-IN')} {tx.unit} · Route: {tx.sellerAnonymousHub} → {tx.buyerAnonymousHub}
                    </div>

                    {/* Shipment Milestones Progress */}
                    {shp && (
                      <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                        <div className="flex items-center justify-between text-[11px]">
                          <span className="font-mono text-slate-900">Tracking: {shp.trackingNumber} ({shp.carrier})</span>
                          <span className="text-slate-400">ETA: {shp.eta}</span>
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1 text-[10px]">
                          {shp.milestones.slice(0, 4).map((m, idx) => (
                            <div key={idx} className="space-y-0.5">
                              <span className={`block font-semibold ${
                                m.status === 'completed' ? 'text-emerald-700' : m.status === 'in_progress' ? 'text-amber-700' : 'text-slate-400'
                              }`}>
                                {m.status === 'completed' ? '✓ ' : '· '}{m.title}
                              </span>
                              <span className="text-[9px] text-slate-400 truncate block">{m.location}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Action buttons: Track shipment and View Environmental Impact */}
                    <div className="pt-2 flex items-center justify-between">
                      <span className="text-[11px] text-slate-400">
                        Invoiced Date: {tx.transactionDate}
                      </span>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => openImpactReportForTransaction(tx.id)}
                          className="px-3 py-1.5 text-xs font-semibold text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors flex items-center gap-1.5 cursor-pointer shadow-2xs"
                        >
                          <Leaf className="w-3.5 h-3.5 text-emerald-600" />
                          <span>View Environmental Impact</span>
                        </button>
                      </div>
                    </div>

                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Post Requirement Modal */}
      {showPostModal && (
        <PostRequirementModal onClose={() => setShowPostModal(false)} />
      )}

    </div>
  );
};
