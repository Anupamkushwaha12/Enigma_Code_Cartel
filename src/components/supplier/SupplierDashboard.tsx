import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ListResourceModal } from './ListResourceModal';
import { 
  AlertCircle, 
  ArrowRight, 
  BarChart3, 
  Boxes, 
  Calendar, 
  CheckCircle2, 
  Clock, 
  FileText, 
  Flame, 
  Gavel, 
  Layers, 
  Leaf, 
  LineChart, 
  Package, 
  Plus, 
  Scale, 
  ShieldCheck, 
  TrendingUp, 
  Truck 
} from 'lucide-react';

export const SupplierDashboard: React.FC = () => {
  const { 
    resources, 
    transactions, 
    shipments, 
    forecastData, 
    setSelectedResource, 
    setSelectedAuction,
    auctions,
    openImpactReportForTransaction 
  } = useApp();

  const [activeTab, setActiveTab] = useState<'overview' | 'resources' | 'forecast' | 'transactions'>('overview');
  const [showListModal, setShowListModal] = useState(false);

  // Supplier-specific KPIs
  const myResources = resources.filter(r => r.sellerId.includes('supplier'));
  const totalListedQty = myResources.reduce((sum, r) => sum + r.quantity, 0);
  const totalSoldQty = myResources.reduce((sum, r) => sum + r.soldQuantity, 0);
  const remainingQty = totalListedQty - totalSoldQty;
  const estimatedRecoveredValueInr = transactions
    .filter(t => t.sellerId.includes('supplier'))
    .reduce((sum, t) => sum + t.sellerNetPayoutInr, 0);

  const activeAuctionCount = auctions.filter(a => a.status === 'active').length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Top Header Strip */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-blue-600 font-semibold">
            <span>Supplier Portal</span>
            <span>·</span>
            <span>Commercial Confidentiality Shield Active</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Surplus Resource Management Console
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Dallas Enterprise Disposition Partner (Alias) · All listings transacted via AXIA Escrow
          </p>
        </div>

        {/* Primary Action */}
        <button
          onClick={() => setShowListModal(true)}
          className="px-4 py-2.5 text-xs font-semibold bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all shadow-xs flex items-center gap-2 cursor-pointer self-start sm:self-auto"
        >
          <Plus className="w-4 h-4 text-blue-200" />
          <span>List Surplus Resource</span>
        </button>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Total Listed */}
        <div className="p-5 rounded-xl bg-white border border-slate-200 shadow-xs">
          <span className="text-[11px] text-slate-400 uppercase font-mono block mb-1">Total Quantity Listed</span>
          <div className="text-2xl font-bold font-mono text-slate-900 tabular-nums">
            {totalListedQty.toLocaleString('en-IN')}
          </div>
          <span className="text-[10px] text-slate-500 block mt-0.5">Across {myResources.length} asset lots</span>
        </div>

        {/* Sold vs Remaining */}
        <div className="p-5 rounded-xl bg-white border border-slate-200 shadow-xs">
          <span className="text-[11px] text-slate-400 uppercase font-mono block mb-1">Transacted / Remaining</span>
          <div className="text-2xl font-bold font-mono text-slate-900 tabular-nums">
            {totalSoldQty.toLocaleString('en-IN')} <span className="text-xs font-normal text-slate-400">/ {remainingQty.toLocaleString('en-IN')}</span>
          </div>
          <span className="text-[10px] text-emerald-700 block mt-0.5 font-medium">
            {Math.round((totalSoldQty / (totalListedQty || 1)) * 100)}% liquidation rate
          </span>
        </div>

        {/* Net Recovered Value */}
        <div className="p-5 rounded-xl bg-blue-50/70 border border-blue-200 shadow-xs">
          <span className="text-[11px] text-blue-700 uppercase font-mono block mb-1 font-semibold">Net Recovered Value</span>
          <div className="text-2xl font-bold font-mono text-blue-900 tabular-nums">
            ₹{(estimatedRecoveredValueInr / 100000).toFixed(2)} Lakh
          </div>
          <span className="text-[10px] text-blue-600/80 block mt-0.5">Net escrow payouts disbursed</span>
        </div>

        {/* Projected Next Surplus */}
        <div className="p-5 rounded-xl bg-white border border-slate-200 shadow-xs">
          <span className="text-[11px] text-slate-400 uppercase font-mono block mb-1">Projected 90D Surplus</span>
          <div className="text-2xl font-bold font-mono text-slate-900 tabular-nums">
            {forecastData.surplus90Days} Tonnes
          </div>
          <span className="text-[10px] text-amber-700 block mt-0.5 font-medium">
            {forecastData.activeAbsorptionCapacity}t active demand identified
          </span>
        </div>

      </div>

      {/* Navigation Sub-Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 text-xs font-medium pb-px">
        <button
          onClick={() => setActiveTab('overview')}
          className={`px-3 py-2 border-b-2 transition-colors cursor-pointer ${
            activeTab === 'overview'
              ? 'border-blue-600 text-blue-600 font-bold'
              : 'border-transparent text-slate-500 hover:text-slate-900'
          }`}
        >
          Active Listings & Matches ({myResources.length})
        </button>
        <button
          onClick={() => setActiveTab('forecast')}
          className={`px-3 py-2 border-b-2 transition-colors cursor-pointer flex items-center gap-1.5 ${
            activeTab === 'forecast'
              ? 'border-blue-600 text-blue-600 font-bold'
              : 'border-transparent text-slate-500 hover:text-slate-900'
          }`}
        >
          <TrendingUp className="w-3.5 h-3.5 text-blue-600" />
          <span>Surplus Forecast & Next Markets</span>
        </button>
        <button
          onClick={() => setActiveTab('transactions')}
          className={`px-3 py-2 border-b-2 transition-colors cursor-pointer ${
            activeTab === 'transactions'
              ? 'border-blue-600 text-blue-600 font-bold'
              : 'border-transparent text-slate-500 hover:text-slate-900'
          }`}
        >
          Transacted Orders & Impact ({transactions.length})
        </button>
      </div>

      {/* TAB 1: OVERVIEW & ACTIVE LISTINGS */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          
          {/* Active Listings Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {myResources.map(res => {
              const availableQty = res.quantity - res.soldQuantity;
              const isAuction = res.status === 'in_auction';

              return (
                <div 
                  key={res.id} 
                  className="bg-white rounded-xl border border-slate-200 shadow-xs p-5 flex flex-col justify-between space-y-4 hover:border-blue-400 hover:shadow-sm transition-all"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-mono text-[11px] text-slate-400">{res.code}</span>
                      {isAuction ? (
                        <span className="inline-flex items-center gap-1 text-[10px] font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200">
                          <Flame className="w-3 h-3 text-amber-600 animate-pulse" /> IN AUCTION
                        </span>
                      ) : (
                        <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                          OPEN DIRECT BUY
                        </span>
                      )}
                    </div>

                    <h3 className="font-bold text-sm text-slate-900 line-clamp-2">
                      {res.title}
                    </h3>
                    <div className="text-[11px] text-slate-500 line-clamp-1">
                      {res.materialProperties}
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-xs bg-slate-50 p-3 rounded-lg border border-slate-100">
                      <div>
                        <span className="text-[10px] uppercase font-mono text-slate-400 block">Available</span>
                        <strong className="text-slate-900 font-mono">{availableQty.toLocaleString('en-IN')} {res.unit}</strong>
                      </div>
                      <div>
                        <span className="text-[10px] uppercase font-mono text-slate-400 block">Net Realization</span>
                        <strong className="text-slate-900 font-mono">
                          {res.commercial.currency === 'USD' ? `$${res.commercial.basePrice} USD` : `₹${res.commercial.basePrice.toLocaleString('en-IN')}`}
                        </strong>
                      </div>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-[11px] text-slate-500">
                      {res.interestedBuyerCount} Interested Buyer{res.interestedBuyerCount !== 1 ? 's' : ''}
                    </span>

                    <button
                      onClick={() => setSelectedResource(res)}
                      className="px-3 py-1.5 text-xs font-semibold text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer"
                    >
                      Manage Lot
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      )}

      {/* TAB 2: FORECASTING ENGINE */}
      {activeTab === 'forecast' && (
        <div className="space-y-6">
          
          {/* Section 16 & 17: Surplus Forecast & Demand Absorption Insight */}
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-6">
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
              <div>
                <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-blue-600 font-semibold">
                  <BarChart3 className="w-4 h-4" />
                  <span>Deterministic Volume Model</span>
                </div>
                <h3 className="text-lg font-bold text-slate-900">
                  30 / 60 / 90-Day Surplus Generation Forecast
                </h3>
              </div>
              <span className="text-xs font-mono text-slate-500 bg-slate-50 px-2.5 py-1 rounded-md border border-slate-200">
                Estimated Model — Non-Speculative
              </span>
            </div>

            {/* 30/60/90 Bar Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <span className="text-xs font-mono text-slate-500 block">Next 30 Days (October)</span>
                <div className="text-3xl font-bold font-mono text-slate-900 tabular-nums">
                  {forecastData.surplus30Days} <span className="text-xs font-normal text-slate-400">Tonnes</span>
                </div>
                <p className="text-[11px] text-slate-500 pt-1">
                  Scheduled enterprise decommission batch & packaging offcuts.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <span className="text-xs font-mono text-slate-500 block">Next 60 Days (November)</span>
                <div className="text-3xl font-bold font-mono text-slate-900 tabular-nums">
                  {forecastData.surplus60Days} <span className="text-xs font-normal text-slate-400">Tonnes</span>
                </div>
                <p className="text-[11px] text-slate-500 pt-1">
                  Quarterly data center refresh & secondary component purge.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-blue-50/70 border border-blue-200 space-y-1">
                <span className="text-xs font-mono text-blue-700 block font-semibold">Next 90 Days (December)</span>
                <div className="text-3xl font-bold font-mono text-blue-900 tabular-nums">
                  {forecastData.surplus90Days} <span className="text-xs font-normal text-blue-600/70">Tonnes</span>
                </div>
                <p className="text-[11px] text-blue-800/80 pt-1">
                  Annual lease termination bulk return volume.
                </p>
              </div>

            </div>

            {/* Actionable Strategic Insight Banner */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 space-y-1">
              <strong className="text-slate-900 block font-semibold">
                AXIA Strategic Recommendation:
              </strong>
              <p className="leading-relaxed">
                &ldquo;Projected November/December surplus reaches <strong>{forecastData.surplus90Days} tonnes</strong>. Current active registered demand on the platform can absorb approximately <strong>{forecastData.activeAbsorptionCapacity} tonnes</strong>. AXIA recommends opening confidential buyer discovery approximately <strong>{forecastData.recommendedDiscoveryLeadWeeks} weeks</strong> before expected physical availability to lock forward freight rates.&rdquo;
              </p>
            </div>

          </div>

          {/* Section 16: Alternative Market Destinations for Unmatched Surplus */}
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h4 className="text-sm font-bold text-slate-900">
                  Alternative Next Market Destinations (Unsold Volume Intelligence)
                </h4>
                <p className="text-xs text-slate-500">
                  For your {forecastData.remainingUnmatchedQty} tonnes of unmatched surplus, AXIA evaluates adjacent downstream industrial applications:
                </p>
              </div>
              <span className="text-xs font-mono font-bold text-slate-900 bg-slate-100 px-2 py-0.5 rounded">
                {forecastData.remainingUnmatchedQty} Tonnes Unmatched
              </span>
            </div>

            <div className="divide-y divide-slate-100 text-xs">
              {forecastData.alternativeMarkets.map((alt, idx) => (
                <div key={idx} className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <strong className="text-sm text-slate-900">{alt.marketName}</strong>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded font-mono ${
                        alt.demandLevel === 'HIGH' 
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' 
                          : alt.demandLevel === 'MEDIUM'
                          ? 'bg-amber-50 text-amber-700 border border-amber-200'
                          : 'bg-slate-100 text-slate-600 border border-slate-200'
                      }`}>
                        DEMAND: {alt.demandLevel}
                      </span>
                    </div>
                    <p className="text-slate-600 leading-snug">
                      <span className="font-semibold text-slate-900">Why recommended:</span> {alt.reason}
                    </p>
                  </div>

                  <div className="sm:text-right shrink-0">
                    <span className="font-mono font-bold text-xs text-slate-900 block">{alt.estimatedValueRecovery}</span>
                    <span className="text-[11px] text-slate-400 block">{alt.absorptionCapacity}</span>
                  </div>
                </div>
              ))}
            </div>

          </div>

        </div>
      )}

      {/* TAB 3: COMPLETED TRANSACTIONS & OPTIONAL IMPACT REPORTS */}
      {activeTab === 'transactions' && (
        <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
          <div className="p-4 bg-slate-50/60 border-b border-slate-100 flex items-center justify-between">
            <span className="font-bold text-xs uppercase tracking-wider text-slate-900">
              Transacted Settlement Orders
            </span>
            <span className="text-xs text-slate-500">
              Optional Environmental Impact reports available on completed lots
            </span>
          </div>

          <div className="divide-y divide-slate-100 text-xs">
            {transactions.map(tx => (
              <div key={tx.id} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50 transition-colors">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <strong className="text-sm font-mono text-slate-900">{tx.code}</strong>
                    <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                      {tx.status.toUpperCase().replace('_', ' ')}
                    </span>
                  </div>
                  <div className="text-xs text-slate-600">
                    Transacted Lot: {tx.quantity.toLocaleString('en-IN')} {tx.unit} · Route: {tx.sellerAnonymousHub.split('—')[0]} → {tx.buyerAnonymousHub.split('—')[0]}
                  </div>
                  <div className="text-[11px] text-slate-400 font-mono">
                    Net Payout to Escrow: ₹{tx.sellerNetPayoutInr.toLocaleString('en-IN')} · Date: {tx.transactionDate}
                  </div>
                </div>

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
            ))}
          </div>
        </div>
      )}

      {/* List Resource Modal */}
      {showListModal && (
        <ListResourceModal onClose={() => setShowListModal(false)} />
      )}

    </div>
  );
};
