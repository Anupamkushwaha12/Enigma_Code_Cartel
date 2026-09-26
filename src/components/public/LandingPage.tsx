import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  ArrowRight, 
  BarChart3, 
  Boxes, 
  Building2, 
  CheckCircle2, 
  ChevronRight, 
  Compass, 
  Cpu, 
  Flame, 
  Globe2, 
  Layers, 
  Leaf, 
  Scale, 
  ShieldCheck, 
  Sparkles, 
  TrendingUp, 
  Truck 
} from 'lucide-react';

interface LandingPageProps {
  onNavigateTab: (tab: 'landing' | 'how-it-works' | 'exchange' | 'impact') => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onNavigateTab }) => {
  const { setRole } = useApp();

  // Quick interactive simulation calculator on the landing page
  const [calcQuantity, setCalcQuantity] = useState<number>(1000);
  const [calcBasePriceUsd, setCalcBasePriceUsd] = useState<number>(125);
  const [calcDestBudgetInr, setCalcDestBudgetInr] = useState<number>(20000);

  // Simplified live math for the interactive widget
  const estimatedLandedInr = Math.round((calcBasePriceUsd * 83.5) + 4560);
  const netArbitrageSpreadInr = Math.max(0, calcDestBudgetInr - estimatedLandedInr);
  const isWidgetViable = estimatedLandedInr <= calcDestBudgetInr;

  return (
    <div className="space-y-16 pb-20">
      
      {/* HERO SECTION */}
      <section className="relative overflow-hidden pt-12 pb-16 border-b border-slate-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Content (7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-xs font-semibold text-blue-700">
                <span className="w-2 h-2 rounded-full bg-blue-600"></span>
                <span>Managed B2B Resource-Exchange Infrastructure</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.08] text-balance">
                Where Surplus Finds Its Next Value.
              </h1>

              <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl text-balance">
                AXIA connects surplus industrial materials and second-life electronics with viable global demand — managing discovery, economics, logistics, compliance, and impact across the exchange.
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button
                  onClick={() => onNavigateTab('exchange')}
                  className="px-6 py-3 text-sm font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-all shadow-sm flex items-center gap-2 cursor-pointer"
                >
                  <span>Explore Resources</span>
                  <ArrowRight className="w-4 h-4 text-blue-200" />
                </button>

                <button
                  onClick={() => setRole('supplier')}
                  className="px-6 py-3 text-sm font-semibold text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-all cursor-pointer shadow-xs"
                >
                  List a Resource
                </button>

                <button
                  onClick={() => setRole('admin')}
                  className="px-4 py-3 text-xs font-medium text-slate-500 hover:text-blue-600 transition-colors cursor-pointer"
                >
                  Admin Scanner View →
                </button>
              </div>

              {/* Core Trust & Operational Proof */}
              <div className="pt-6 grid grid-cols-3 gap-6 border-t border-slate-100 text-xs">
                <div>
                  <div className="font-mono font-bold text-xl text-slate-900 tabular-nums">100%</div>
                  <div className="text-slate-500 mt-0.5">Commercial Anonymity</div>
                </div>
                <div>
                  <div className="font-mono font-bold text-xl text-slate-900 tabular-nums">₹15,000</div>
                  <div className="text-slate-500 mt-0.5">Verified Landed Model</div>
                </div>
                <div>
                  <div className="font-mono font-bold text-xl text-slate-900 tabular-nums">2+ Rule</div>
                  <div className="text-slate-500 mt-0.5">Auction Trigger Threshold</div>
                </div>
              </div>

            </div>

            {/* Right Architectural Schematic Card: SOURCE → AXIA → DESTINATION (5 cols) */}
            <div className="lg:col-span-5">
              <div className="bg-slate-50 rounded-2xl p-6 shadow-sm border border-slate-200 relative overflow-hidden">
                
                <div className="relative z-10 space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                    <span className="text-[11px] font-mono uppercase tracking-wider text-blue-600 font-semibold">
                      Platform Architecture
                    </span>
                    <span className="text-[11px] font-mono text-slate-500">Managed Arbitrage Layer</span>
                  </div>

                  {/* Flow Steps */}
                  <div className="space-y-3">
                    
                    {/* Source Node */}
                    <div className="p-3.5 rounded-xl bg-white border border-slate-200 shadow-2xs flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center font-bold text-xs font-mono border border-blue-100">
                          SRC
                        </div>
                        <div>
                          <span className="text-xs font-bold text-slate-900 block">Commercial Supplier</span>
                          <span className="text-[11px] text-slate-500">Surplus Assets · Confidential Identity</span>
                        </div>
                      </div>
                      <span className="text-[10px] font-mono text-slate-400">USA / China / India</span>
                    </div>

                    {/* Down Arrow / Transfer Axis */}
                    <div className="flex justify-center -my-1">
                      <div className="w-0.5 h-4 bg-blue-300"></div>
                    </div>

                    {/* AXIA Core Engine (Middle Layer) */}
                    <div className="p-4 rounded-xl bg-white border-2 border-blue-500 shadow-sm space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 rounded-md bg-blue-600 text-white flex items-center justify-center font-bold text-xs">
                            AX
                          </div>
                          <span className="font-extrabold text-sm tracking-wide text-slate-900">AXIA PLATFORM</span>
                        </div>
                        <span className="text-[10px] font-mono font-semibold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                          COMMERCIAL ESCROW
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-600 leading-snug">
                        Calculates Acquisition + Freight + Testing + Customs + Compliance + Platform Margin. Parties remain commercially anonymous.
                      </p>
                      <div className="grid grid-cols-3 gap-1.5 pt-2 text-[10px] font-mono text-center">
                        <span className="py-1 px-1 rounded bg-slate-100 text-slate-700 font-medium">Economics</span>
                        <span className="py-1 px-1 rounded bg-slate-100 text-slate-700 font-medium">Logistics</span>
                        <span className="py-1 px-1 rounded bg-slate-100 text-slate-700 font-medium">Compliance</span>
                      </div>
                    </div>

                    {/* Down Arrow */}
                    <div className="flex justify-center -my-1">
                      <div className="w-0.5 h-4 bg-blue-300"></div>
                    </div>

                    {/* Destination Node */}
                    <div className="p-3.5 rounded-xl bg-white border border-slate-200 shadow-2xs flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold text-xs font-mono border border-emerald-100">
                          DST
                        </div>
                        <div>
                          <span className="text-xs font-bold text-slate-900 block">Verified Receiver</span>
                          <span className="text-[11px] text-slate-500">Refurbisher / Foundry / Molder</span>
                        </div>
                      </div>
                      <span className="text-[10px] font-mono text-slate-400">Destination Hub</span>
                    </div>

                  </div>

                  <div className="pt-2 text-[11px] text-slate-500 text-center border-t border-slate-200">
                    Neither party sees the other&apos;s commercial identity or pricing margins.
                  </div>
                </div>

              </div>
            </div>

          </div>

        </div>
      </section>

      {/* SECTION: TWO-TIER GEOGRAPHIC BUSINESS MODEL */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
          <div className="text-xs font-mono uppercase tracking-wider text-blue-600 font-semibold">
            Targeted Geographic Scope
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
            Dual Strategic Focus: India Domestic & Cross-Border Lanes
          </h2>
          <p className="text-sm text-slate-600">
            AXIA is not an &ldquo;e-waste only&rdquo; platform. Within India, it operates a comprehensive industrial resource recovery exchange. Internationally, it specializes in high-margin second-life electronics and components.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Inside India Panel */}
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm hover:border-slate-300 transition-colors space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-emerald-50 border border-emerald-100 text-slate-800 flex items-center justify-center font-bold">
                  🇮🇳
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">Inside India: Industrial Ecosystem</h3>
                  <span className="text-[11px] text-slate-500">Broader multi-category resource exchange</span>
                </div>
              </div>
              <span className="text-[11px] font-mono font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                Domestic Hubs
              </span>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              Handles bulk continuous industrial surplus, foundry offcuts, secondary cathodes, polymer regrinds, capital machinery, and domestic e-waste across Indian industrial clusters.
            </p>

            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="p-3 rounded-lg bg-slate-50 border border-slate-100">
                <strong className="text-slate-900 block">Non-Ferrous & Steel</strong>
                <span className="text-[11px] text-slate-500">Copper, Aluminum 6063, Steel billets</span>
              </div>
              <div className="p-3 rounded-lg bg-slate-50 border border-slate-100">
                <strong className="text-slate-900 block">Polymers & By-Products</strong>
                <span className="text-[11px] text-slate-500">Impact PP, Slag fillers, Dielectric resin</span>
              </div>
              <div className="p-3 rounded-lg bg-slate-50 border border-slate-100">
                <strong className="text-slate-900 block">Machinery & Motors</strong>
                <span className="text-[11px] text-slate-500">IE3 induction motors, Transformers</span>
              </div>
              <div className="p-3 rounded-lg bg-slate-50 border border-slate-100">
                <strong className="text-slate-900 block">Dismantled Telecom</strong>
                <span className="text-[11px] text-slate-500">Motherboard scrap, Precious yields</span>
              </div>
            </div>

            <button
              onClick={() => onNavigateTab('exchange')}
              className="text-xs font-semibold text-blue-600 hover:text-blue-800 flex items-center gap-1 transition-colors cursor-pointer"
            >
              Browse Indian Industrial Surplus Catalog →
            </button>
          </div>

          {/* Outside India Panel */}
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm hover:border-blue-300 transition-colors space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-blue-50 border border-blue-100 text-blue-600 flex items-center justify-center font-bold">
                  🌐
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">International: Second-Life Electronics</h3>
                  <span className="text-[11px] text-slate-500">Cross-border arbitrage: USA / China → India</span>
                </div>
              </div>
              <span className="text-[11px] font-mono font-semibold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-md border border-blue-200">
                High-Arbitrage Corridor
              </span>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              Takes low-value enterprise surplus (depreciated corporate laptops, off-lease handsets, datacenter SSDs, RAM modules) in high-wage western markets and lands them compliantly into high-demand Indian refurbishment facilities.
            </p>

            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="p-3 rounded-lg bg-slate-50 border border-slate-100">
                <strong className="text-slate-900 block">Enterprise Laptops</strong>
                <span className="text-[11px] text-slate-500">Dell Latitude, Lenovo ThinkPad lots</span>
              </div>
              <div className="p-3 rounded-lg bg-slate-50 border border-slate-100">
                <strong className="text-slate-900 block">Datacenter SSDs & RAM</strong>
                <span className="text-[11px] text-slate-500">NVMe PCIe Gen4, DDR4 Server RDIMMs</span>
              </div>
              <div className="p-3 rounded-lg bg-slate-50 border border-slate-100">
                <strong className="text-slate-900 block">Secondary Mobile Lots</strong>
                <span className="text-[11px] text-slate-500">Unlocked iPhone carrier returns</span>
              </div>
              <div className="p-3 rounded-lg bg-slate-50 border border-slate-100">
                <strong className="text-slate-900 block">Statutory Compliance</strong>
                <span className="text-[11px] text-slate-500">DGFT import permits & EPR filings</span>
              </div>
            </div>

            <button
              onClick={() => onNavigateTab('exchange')}
              className="text-xs font-semibold text-blue-600 hover:text-blue-800 flex items-center gap-1 transition-colors cursor-pointer"
            >
              Browse International Electronics Listings →
            </button>
          </div>

        </div>
      </section>

      {/* SECTION: INTERACTIVE LANDED ARBITRAGE SIMULATOR */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm space-y-6">
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-4">
            <div>
              <div className="text-xs font-mono uppercase tracking-wider text-blue-600 font-semibold">
                Interactive Landed Arbitrage Engine
              </div>
              <h3 className="text-xl font-bold text-slate-900">
                Simulate Cross-Border Economic Viability
              </h3>
            </div>
            <div className="text-xs text-slate-500 max-w-sm">
              Adjust source acquisition and receiver target price to watch AXIA&apos;s deterministic feasibility gate in action.
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            
            {/* Sliders / Inputs (7 cols) */}
            <div className="lg:col-span-7 space-y-4">
              
              <div>
                <div className="flex justify-between text-xs font-semibold text-slate-900 mb-1">
                  <span>Lot Quantity:</span>
                  <span className="font-mono text-blue-600">{calcQuantity.toLocaleString('en-IN')} units</span>
                </div>
                <input
                  type="range"
                  min="500"
                  max="5000"
                  step="250"
                  value={calcQuantity}
                  onChange={(e) => setCalcQuantity(Number(e.target.value))}
                  className="w-full accent-blue-600"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs font-semibold text-slate-900 mb-1">
                  <span>USA Source Acquisition Price:</span>
                  <span className="font-mono text-blue-600">${calcBasePriceUsd} USD / unit</span>
                </div>
                <input
                  type="range"
                  min="90"
                  max="240"
                  step="5"
                  value={calcBasePriceUsd}
                  onChange={(e) => setCalcBasePriceUsd(Number(e.target.value))}
                  className="w-full accent-blue-600"
                />
                <span className="text-[11px] text-slate-500">
                  Equates to ₹{(calcBasePriceUsd * 83.5).toLocaleString('en-IN')} raw acquisition cost
                </span>
              </div>

              <div>
                <div className="flex justify-between text-xs font-semibold text-slate-900 mb-1">
                  <span>India Receiver Max Budget:</span>
                  <span className="font-mono text-blue-600">₹{calcDestBudgetInr.toLocaleString('en-IN')} / unit</span>
                </div>
                <input
                  type="range"
                  min="14000"
                  max="28000"
                  step="500"
                  value={calcDestBudgetInr}
                  onChange={(e) => setCalcDestBudgetInr(Number(e.target.value))}
                  className="w-full accent-blue-600"
                />
              </div>

            </div>

            {/* Live Calculation Output Card (5 cols) */}
            <div className="lg:col-span-5">
              <div className={`p-6 rounded-xl border transition-all ${
                isWidgetViable 
                  ? 'bg-slate-50 border-emerald-200 shadow-xs' 
                  : 'bg-rose-50/50 border-rose-200'
              }`}>
                <div className="flex items-center justify-between border-b border-slate-200 pb-3 mb-4">
                  <span className="text-xs uppercase font-mono font-semibold text-slate-500">
                    Feasibility Outcome
                  </span>
                  {isWidgetViable ? (
                    <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-md border border-emerald-200">
                      <CheckCircle2 className="w-3.5 h-3.5" /> ROUTE VIABLE
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-xs font-bold text-rose-700 bg-rose-50 px-2.5 py-0.5 rounded-md border border-rose-200">
                      NOT VIABLE
                    </span>
                  )}
                </div>

                <div className="space-y-3 text-xs">
                  <div className="flex justify-between text-slate-600">
                    <span>Raw Base (USD converted):</span>
                    <span className="font-mono font-bold text-slate-900">
                      ₹{(calcBasePriceUsd * 83.5).toLocaleString('en-IN')}
                    </span>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>Logistics, Duty & Testing:</span>
                    <span className="font-mono text-slate-900">₹4,560</span>
                  </div>
                  <div className="pt-2 border-t border-slate-200 flex justify-between font-bold text-sm">
                    <span className="text-slate-900">Total Landed Cost / Unit:</span>
                    <span className="font-mono text-blue-600">₹{estimatedLandedInr.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between text-emerald-700 font-bold">
                    <span>Target Arbitrage Spread:</span>
                    <span className="font-mono">
                      {isWidgetViable ? `+₹${netArbitrageSpreadInr.toLocaleString('en-IN')}` : 'Negative Margin'}
                    </span>
                  </div>
                </div>

                <p className="text-[11px] text-slate-500 mt-4 leading-snug">
                  {isWidgetViable 
                    ? 'Economic feasibility passes. Opportunity eligible for automated matching and anonymous dispatch.'
                    : 'Landed costs exceed receiver threshold. AXIA automatically deprioritizes or suppresses this opportunity.'}
                </p>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* SECTION: 4 DEMO ROLES WITH DIRECT SWITCHERS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="border border-slate-200 bg-white rounded-2xl p-8 shadow-sm">
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div>
              <div className="text-xs font-mono uppercase tracking-wider text-blue-600 font-semibold">
                Role-Based Interactive Experience
              </div>
              <h3 className="text-xl font-bold text-slate-900">
                Explore AXIA Across Four Operational Roles
              </h3>
            </div>
            <p className="text-xs text-slate-500 max-w-sm">
              Switch directly into any demo persona to experience their tailored views, data permissions, and action capabilities.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            
            {/* Supplier */}
            <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 flex flex-col justify-between space-y-4 hover:border-blue-400 hover:shadow-xs transition-all">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center">
                    <Building2 className="w-4 h-4" />
                  </div>
                  <span className="text-[10px] font-mono text-slate-400">Surplus Holder</span>
                </div>
                <h4 className="font-bold text-sm text-slate-900">Demo Supplier</h4>
                <p className="text-xs text-slate-600 mt-1 leading-snug">
                  List surplus lots, view active matches, monitor 30/60/90-day forecasts, and review net payouts.
                </p>
              </div>
              <button
                onClick={() => setRole('supplier')}
                className="w-full py-2 text-xs font-semibold bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors cursor-pointer shadow-xs"
              >
                Enter Supplier View →
              </button>
            </div>

            {/* Receiver */}
            <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 flex flex-col justify-between space-y-4 hover:border-indigo-400 hover:shadow-xs transition-all">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="w-8 h-8 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center">
                    <Boxes className="w-4 h-4" />
                  </div>
                  <span className="text-[10px] font-mono text-slate-400">Resource Offtaker</span>
                </div>
                <h4 className="font-bold text-sm text-slate-900">Demo Receiver</h4>
                <p className="text-xs text-slate-600 mt-1 leading-snug">
                  Post requirements, discover viable opportunities, buy directly or participate in anonymous auctions.
                </p>
              </div>
              <button
                onClick={() => setRole('receiver')}
                className="w-full py-2 text-xs font-semibold bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors cursor-pointer shadow-xs"
              >
                Enter Receiver View →
              </button>
            </div>

            {/* Admin */}
            <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 flex flex-col justify-between space-y-4 hover:border-purple-400 hover:shadow-xs transition-all">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="w-8 h-8 rounded-lg bg-purple-100 text-purple-700 flex items-center justify-center">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <span className="text-[10px] font-mono text-slate-400">Platform Operator</span>
                </div>
                <h4 className="font-bold text-sm text-slate-900">Demo Admin</h4>
                <p className="text-xs text-slate-600 mt-1 leading-snug">
                  Access the Global Opportunity Scanner, full unmasked financial ledgers, fee tuning, and auctions.
                </p>
              </div>
              <button
                onClick={() => setRole('admin')}
                className="w-full py-2 text-xs font-semibold bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors cursor-pointer shadow-xs"
              >
                Enter Admin View →
              </button>
            </div>

            {/* Logistics */}
            <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 flex flex-col justify-between space-y-4 hover:border-emerald-400 hover:shadow-xs transition-all">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center">
                    <Truck className="w-4 h-4" />
                  </div>
                  <span className="text-[10px] font-mono text-slate-400">Freight Partner</span>
                </div>
                <h4 className="font-bold text-sm text-slate-900">Demo Logistics</h4>
                <p className="text-xs text-slate-600 mt-1 leading-snug">
                  View unmasked pickup and delivery addresses, update transit milestones, and manage customs release.
                </p>
              </div>
              <button
                onClick={() => setRole('logistics')}
                className="w-full py-2 text-xs font-semibold bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors cursor-pointer shadow-xs"
              >
                Enter Logistics View →
              </button>
            </div>

          </div>

        </div>
      </section>

    </div>
  );
};
