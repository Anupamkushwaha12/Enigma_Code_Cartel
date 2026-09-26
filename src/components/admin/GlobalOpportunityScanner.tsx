import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  AlertCircle, 
  ArrowRight, 
  CheckCircle2, 
  Filter, 
  Globe2, 
  HelpCircle, 
  Layers, 
  RefreshCw, 
  Search, 
  SlidersHorizontal, 
  TrendingUp, 
  XCircle 
} from 'lucide-react';
import { calculateLandedEconomics } from '../../utils/landedCostEngine';

export const GlobalOpportunityScanner: React.FC = () => {
  const { resources, requirements, setSelectedResource, adminFeeConfig } = useApp();
  const [filterViability, setFilterViability] = useState<'all' | 'viable' | 'not_viable'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Pair resources with representative demand requirements to generate scanner analysis
  const opportunities = resources.map(res => {
    // Pick the most relevant requirement
    const req = requirements.find(r => r.category === res.category) || requirements[0];
    const targetBudget = req?.maxLandedCost || (res.commercial.currency === 'USD' ? res.commercial.basePrice * 120 : res.commercial.basePrice * 1.2);
    
    const econ = calculateLandedEconomics({
      quantity: Math.min(1000, res.quantity - res.soldQuantity || res.quantity),
      basePrice: res.commercial.basePrice,
      currency: res.commercial.currency,
      weightKg: (res.weightKg / res.quantity) * Math.min(1000, res.quantity),
      origin: res.location,
      destination: req?.destination || {
        country: 'India',
        region: 'Maharashtra',
        city: 'Mumbai',
        hubCode: 'IND — Mumbai Distribution Hub',
        exactAddress: '',
      },
      maxBuyerBudgetInr: targetBudget,
      refurbishmentRequired: res.processing.refurbishmentRequired,
      testingRequired: res.processing.testingRequired,
      certificationRequired: res.processing.certificationRequired,
      customFeeConfig: adminFeeConfig,
    });

    const corridor = `${res.location.country} → ${req?.destination.country || 'India'}`;
    const isDomestic = res.location.country.toLowerCase() === 'india';

    return {
      resource: res,
      requirement: req,
      corridor,
      isDomestic,
      economics: econ,
      isViable: econ.isViable,
    };
  });

  const filteredOpportunities = opportunities.filter(opp => {
    if (filterViability === 'viable' && !opp.isViable) return false;
    if (filterViability === 'not_viable' && opp.isViable) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return (
        opp.resource.title.toLowerCase().includes(q) ||
        opp.corridor.toLowerCase().includes(q) ||
        opp.resource.location.hubCode.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="space-y-6">
      
      {/* Scanner Header */}
      <div className="bg-white text-slate-900 p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-purple-600 font-semibold">
            <Globe2 className="w-4 h-4" />
            <span>Multi-Jurisdiction Arbitrage & Feasibility Scanner</span>
          </div>
          <h2 className="text-xl font-bold text-slate-900 mt-1">
            Global Opportunity Scanner
          </h2>
          <p className="text-xs text-slate-500 mt-1 max-w-2xl leading-relaxed">
            Continuously evaluates cross-border freight routes, customs duties, secondary refurbishment tolerances, and destination price absorption to classify commercial viability before trade execution.
          </p>
        </div>

        {/* Quick Stats */}
        <div className="flex items-center gap-3">
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-center min-w-[90px]">
            <span className="text-[10px] text-slate-400 uppercase font-mono block">Scanned Lots</span>
            <div className="text-lg font-bold font-mono text-slate-900 tabular-nums">{opportunities.length}</div>
          </div>
          <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-center min-w-[90px]">
            <span className="text-[10px] text-emerald-700 uppercase font-mono block font-semibold">Viable</span>
            <div className="text-lg font-bold font-mono text-emerald-800 tabular-nums">
              {opportunities.filter(o => o.isViable).length}
            </div>
          </div>
          <div className="p-3 bg-rose-50 rounded-xl border border-rose-200 text-center min-w-[90px]">
            <span className="text-[10px] text-rose-700 uppercase font-mono block font-semibold">Non-Viable</span>
            <div className="text-lg font-bold font-mono text-rose-800 tabular-nums">
              {opportunities.filter(o => !o.isViable).length}
            </div>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white p-3.5 rounded-xl border border-slate-200 shadow-xs">
        
        {/* Search */}
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Filter corridor, resource or hub..."
            className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 rounded-lg border border-slate-200 focus:outline-hidden focus:border-purple-600"
          />
        </div>

        {/* Segmented Filter Control */}
        <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-lg text-xs font-medium w-full sm:w-auto border border-slate-200">
          <button
            onClick={() => setFilterViability('all')}
            className={`flex-1 sm:flex-initial px-3 py-1 rounded-md transition-colors cursor-pointer ${
              filterViability === 'all' ? 'bg-white text-slate-900 shadow-xs font-semibold' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            All Corridors ({opportunities.length})
          </button>
          <button
            onClick={() => setFilterViability('viable')}
            className={`flex-1 sm:flex-initial px-3 py-1 rounded-md transition-colors cursor-pointer flex items-center justify-center gap-1.5 ${
              filterViability === 'viable' ? 'bg-white text-emerald-700 shadow-xs font-semibold' : 'text-slate-600 hover:text-emerald-700'
            }`}
          >
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            Viable ({opportunities.filter(o => o.isViable).length})
          </button>
          <button
            onClick={() => setFilterViability('not_viable')}
            className={`flex-1 sm:flex-initial px-3 py-1 rounded-md transition-colors cursor-pointer flex items-center justify-center gap-1.5 ${
              filterViability === 'not_viable' ? 'bg-white text-rose-700 shadow-xs font-semibold' : 'text-slate-600 hover:text-rose-700'
            }`}
          >
            <XCircle className="w-3.5 h-3.5 text-rose-600" />
            Non-Viable ({opportunities.filter(o => !o.isViable).length})
          </button>
        </div>

      </div>

      {/* Opportunities Table */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase font-mono tracking-wider text-[11px]">
              <tr>
                <th className="py-3 px-4">Trade Corridor</th>
                <th className="py-3 px-4">Surplus Resource Lot</th>
                <th className="py-3 px-4 text-right">Landed Cost / Unit</th>
                <th className="py-3 px-4 text-right">Destination Value</th>
                <th className="py-3 px-4 text-right">Gross Spread</th>
                <th className="py-3 px-4 text-center">Status</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredOpportunities.map((opp) => {
                const isViable = opp.isViable;
                return (
                  <tr 
                    key={opp.resource.id} 
                    className="hover:bg-slate-50 transition-colors"
                  >
                    {/* Corridor */}
                    <td className="py-3.5 px-4 font-mono font-medium text-slate-900 whitespace-nowrap">
                      <div className="flex items-center gap-1.5">
                        <span className="font-bold">{opp.corridor}</span>
                      </div>
                      <span className="text-[10px] text-slate-400 block font-normal">
                        {opp.resource.location.hubCode.split('—')[0]} → {opp.requirement?.destination.city || 'Mumbai'}
                      </span>
                    </td>

                    {/* Resource Lot */}
                    <td className="py-3.5 px-4">
                      <div className="font-semibold text-slate-900">{opp.resource.title}</div>
                      <div className="text-[11px] text-slate-500">
                        {opp.resource.quantity.toLocaleString('en-IN')} {opp.resource.unit} · {opp.resource.condition}
                      </div>
                    </td>

                    {/* Landed Cost */}
                    <td className="py-3.5 px-4 text-right font-mono font-bold text-slate-900 tabular-nums whitespace-nowrap">
                      ₹{opp.economics.costPerUnitInr.toLocaleString('en-IN')}
                      <span className="text-[10px] text-slate-400 block font-normal">
                        All-inclusive at hub
                      </span>
                    </td>

                    {/* Destination Value */}
                    <td className="py-3.5 px-4 text-right font-mono font-bold text-emerald-700 tabular-nums whitespace-nowrap">
                      ₹{opp.economics.expectedDestinationValuePerUnitInr.toLocaleString('en-IN')}
                      <span className="text-[10px] text-slate-400 block font-normal">
                        Benchmark demand
                      </span>
                    </td>

                    {/* Margin Spread */}
                    <td className="py-3.5 px-4 text-right font-mono tabular-nums whitespace-nowrap">
                      <span className={`font-bold ${isViable ? 'text-blue-600' : 'text-rose-700'}`}>
                        {isViable ? `+₹${opp.economics.netMarginPerUnitInr.toLocaleString('en-IN')}` : `-₹${Math.abs(opp.economics.netMarginPerUnitInr).toLocaleString('en-IN')}`}
                      </span>
                      <span className="text-[10px] text-slate-400 block font-normal">
                        {opp.economics.marginPercent}% margin
                      </span>
                    </td>

                    {/* Viability Badge */}
                    <td className="py-3.5 px-4 text-center whitespace-nowrap">
                      {isViable ? (
                        <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-md border border-emerald-200">
                          <CheckCircle2 className="w-3 h-3 text-emerald-600" /> VIABLE
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-rose-700 bg-rose-50 px-2.5 py-0.5 rounded-md border border-rose-200" title={opp.economics.viabilityReason}>
                          <AlertCircle className="w-3 h-3 text-rose-600" /> NOT VIABLE
                        </span>
                      )}
                    </td>

                    {/* Action */}
                    <td className="py-3.5 px-4 text-right whitespace-nowrap">
                      <button
                        onClick={() => setSelectedResource(opp.resource)}
                        className="px-2.5 py-1 text-[11px] font-semibold text-slate-700 bg-slate-50 border border-slate-200 rounded-md hover:bg-slate-100 transition-colors cursor-pointer shadow-2xs"
                      >
                        Inspect Lot
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Explanatory Methodology Card */}
      <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 space-y-2">
        <strong className="text-slate-900 block font-semibold">
          Deterministic Scanner Feasibility Criteria
        </strong>
        <p className="leading-relaxed">
          AXIA enforces a <strong>hard economic gate</strong>. If estimated landed cost (source acquisition + containerized freight + cargo insurance + customs duties + mandatory compliance testing + risk reserve) exceeds the destination demand benchmark or buyer budget, the system marks the route <strong>NOT VIABLE</strong> and suppresses proactive buyer dispatch. This prevents stranded capital and carbon-negative shipping.
        </p>
      </div>

    </div>
  );
};
