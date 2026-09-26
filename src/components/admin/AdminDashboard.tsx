import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { GlobalOpportunityScanner } from './GlobalOpportunityScanner';
import { FinancialBreakdownModal } from './FinancialBreakdownModal';
import { 
  AlertCircle, 
  ArrowRight, 
  BarChart3, 
  Boxes, 
  Building2, 
  CheckCircle2, 
  DollarSign, 
  Eye, 
  FileSpreadsheet, 
  Flame, 
  Gavel, 
  Globe2, 
  HelpCircle, 
  Layers, 
  Leaf, 
  Scale, 
  Settings, 
  ShieldAlert, 
  ShieldCheck, 
  Sliders, 
  TrendingUp, 
  Truck, 
  Users 
} from 'lucide-react';
import { Transaction } from '../../types';

export const AdminDashboard: React.FC = () => {
  const { 
    resources, 
    requirements, 
    transactions, 
    auctions, 
    shipments, 
    adminFeeConfig, 
    updateAdminFeeConfig,
    setSelectedAuction,
    openImpactReportForTransaction 
  } = useApp();

  const [activeAdminTab, setActiveAdminTab] = useState<'scanner' | 'financials' | 'auctions' | 'logistics' | 'settings'>('scanner');
  const [selectedAuditTx, setSelectedAuditTx] = useState<Transaction | null>(null);

  // Fee configuration inputs state
  const [supplierFee, setSupplierFee] = useState<number>(adminFeeConfig.supplierFeePercent);
  const [receiverFee, setReceiverFee] = useState<number>(adminFeeConfig.receiverFeePercent);
  const [usdRate, setUsdRate] = useState<number>(adminFeeConfig.defaultUsdInrRate);
  const [dutyRate, setDutyRate] = useState<number>(adminFeeConfig.importDutyElectronicsPercent);

  const handleSaveFeeConfig = (e: React.FormEvent) => {
    e.preventDefault();
    updateAdminFeeConfig({
      supplierFeePercent: Number(supplierFee),
      receiverFeePercent: Number(receiverFee),
      defaultUsdInrRate: Number(usdRate),
      importDutyElectronicsPercent: Number(dutyRate),
    });
    alert('Platform fee and tax parameters updated! Landed calculations refreshed across all modules.');
  };

  const totalGrossTransactionValue = transactions.reduce((acc, t) => acc + t.grossTransactionValueInr, 0);
  const totalPlatformRevenue = transactions.reduce((acc, t) => acc + t.axiaPlatformRevenueInr, 0);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-purple-600 font-semibold">
            <ShieldCheck className="w-4 h-4" />
            <span>Master Control & Operations Console</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Platform Infrastructure & Global Scanner
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Complete unmasked counterparty ledger · Multi-corridor arbitrage verification · Escrow authority
          </p>
        </div>

        {/* Global Status Indicators */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-mono shadow-2xs">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            <span>Escrow Ledger Online</span>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-purple-50 text-purple-700 border border-purple-200 rounded-lg text-xs font-mono font-bold">
            <span>USD/INR: {adminFeeConfig.defaultUsdInrRate}</span>
          </div>
        </div>
      </div>

      {/* KPI Cards Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        
        <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs">
          <span className="text-[10px] text-slate-400 uppercase font-mono block">Total Resources</span>
          <div className="text-xl font-bold font-mono text-slate-900 tabular-nums mt-0.5">
            {resources.length} Lots
          </div>
          <span className="text-[10px] text-slate-500">Active listings</span>
        </div>

        <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs">
          <span className="text-[10px] text-slate-400 uppercase font-mono block">Active Demands</span>
          <div className="text-xl font-bold font-mono text-slate-900 tabular-nums mt-0.5">
            {requirements.length} Reqs
          </div>
          <span className="text-[10px] text-slate-500">Sourcing orders</span>
        </div>

        <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs">
          <span className="text-[10px] text-slate-400 uppercase font-mono block">Gross Volume</span>
          <div className="text-xl font-bold font-mono text-slate-900 tabular-nums mt-0.5">
            ₹{(totalGrossTransactionValue / 10000000).toFixed(2)} Cr
          </div>
          <span className="text-[10px] text-emerald-600 font-medium">Transacted GMV</span>
        </div>

        <div className="p-4 rounded-xl bg-purple-50/70 border border-purple-200 shadow-xs">
          <span className="text-[10px] text-purple-700 uppercase font-mono block font-semibold">Platform Revenue</span>
          <div className="text-xl font-bold font-mono text-purple-900 tabular-nums mt-0.5">
            ₹{(totalPlatformRevenue / 100000).toFixed(2)} L
          </div>
          <span className="text-[10px] text-purple-600">Retained fees</span>
        </div>

        <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs">
          <span className="text-[10px] text-slate-400 uppercase font-mono block">Active Auctions</span>
          <div className="text-xl font-bold font-mono text-amber-800 tabular-nums mt-0.5">
            {auctions.filter(a => a.status === 'active').length}
          </div>
          <span className="text-[10px] text-slate-500">2+ buyers rule</span>
        </div>

        <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs">
          <span className="text-[10px] text-slate-400 uppercase font-mono block">Active In Transit</span>
          <div className="text-xl font-bold font-mono text-slate-900 tabular-nums mt-0.5">
            {shipments.filter(s => s.status !== 'delivered').length}
          </div>
          <span className="text-[10px] text-slate-500">Cargo tracking</span>
        </div>

      </div>

      {/* Admin Sub-Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 text-xs font-medium pb-px overflow-x-auto">
        <button
          onClick={() => setActiveAdminTab('scanner')}
          className={`px-3 py-2 border-b-2 transition-colors cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
            activeAdminTab === 'scanner'
              ? 'border-purple-600 text-purple-600 font-bold'
              : 'border-transparent text-slate-500 hover:text-slate-900'
          }`}
        >
          <Globe2 className="w-3.5 h-3.5 text-purple-600" />
          <span>Global Opportunity Scanner</span>
        </button>

        <button
          onClick={() => setActiveAdminTab('financials')}
          className={`px-3 py-2 border-b-2 transition-colors cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
            activeAdminTab === 'financials'
              ? 'border-purple-600 text-purple-600 font-bold'
              : 'border-transparent text-slate-500 hover:text-slate-900'
          }`}
        >
          <FileSpreadsheet className="w-3.5 h-3.5" />
          <span>Financials & Audit Ledger</span>
        </button>

        <button
          onClick={() => setActiveAdminTab('auctions')}
          className={`px-3 py-2 border-b-2 transition-colors cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
            activeAdminTab === 'auctions'
              ? 'border-purple-600 text-purple-600 font-bold'
              : 'border-transparent text-slate-500 hover:text-slate-900'
          }`}
        >
          <Gavel className="w-3.5 h-3.5" />
          <span>Multi-Buyer Auctions ({auctions.length})</span>
        </button>

        <button
          onClick={() => setActiveAdminTab('logistics')}
          className={`px-3 py-2 border-b-2 transition-colors cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
            activeAdminTab === 'logistics'
              ? 'border-purple-600 text-purple-600 font-bold'
              : 'border-transparent text-slate-500 hover:text-slate-900'
          }`}
        >
          <Truck className="w-3.5 h-3.5" />
          <span>Logistics & Customs Oversight ({shipments.length})</span>
        </button>

        <button
          onClick={() => setActiveAdminTab('settings')}
          className={`px-3 py-2 border-b-2 transition-colors cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
            activeAdminTab === 'settings'
              ? 'border-purple-600 text-purple-600 font-bold'
              : 'border-transparent text-slate-500 hover:text-slate-900'
          }`}
        >
          <Settings className="w-3.5 h-3.5" />
          <span>Platform Fee & Tax Config</span>
        </button>
      </div>

      {/* TAB 1: GLOBAL OPPORTUNITY SCANNER */}
      {activeAdminTab === 'scanner' && (
        <GlobalOpportunityScanner />
      )}

      {/* TAB 2: FINANCIAL AUDIT LEDGER */}
      {activeAdminTab === 'financials' && (
        <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
          <div className="p-4 bg-slate-50/60 border-b border-slate-100 flex items-center justify-between">
            <div>
              <span className="font-bold text-xs uppercase tracking-wider text-slate-900 block">
                Unmasked Counterparty Transaction Ledger
              </span>
              <span className="text-[11px] text-slate-500">
                Internal records disclosing true seller, true buyer, tax withholdings, and AXIA margins
              </span>
            </div>
            <span className="text-xs font-mono font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
              Audited Escrow
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase font-mono tracking-wider text-[11px]">
                <tr>
                  <th className="py-3 px-4">Transaction Code</th>
                  <th className="py-3 px-4">Unmasked Supplier</th>
                  <th className="py-3 px-4">Unmasked Receiver</th>
                  <th className="py-3 px-4 text-right">Supplier Net</th>
                  <th className="py-3 px-4 text-right">Receiver Landed</th>
                  <th className="py-3 px-4 text-right">AXIA Margin</th>
                  <th className="py-3 px-4 text-center">Status</th>
                  <th className="py-3 px-4 text-right">Ledger</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {transactions.map(tx => (
                  <tr key={tx.id} className="hover:bg-slate-50 transition-colors">
                    <td className="py-3.5 px-4 font-mono font-bold text-slate-900">
                      {tx.code}
                      <span className="text-[10px] text-slate-400 block font-normal">{tx.transactionDate}</span>
                    </td>
                    <td className="py-3.5 px-4">
                      <strong className="text-slate-900 block line-clamp-1">{tx.sellerExactName}</strong>
                      <span className="text-[10px] text-slate-400 font-mono">{tx.sellerAnonymousHub}</span>
                    </td>
                    <td className="py-3.5 px-4">
                      <strong className="text-slate-900 block line-clamp-1">{tx.buyerExactName}</strong>
                      <span className="text-[10px] text-slate-400 font-mono">{tx.buyerAnonymousHub}</span>
                    </td>
                    <td className="py-3.5 px-4 text-right font-mono font-bold text-slate-900 tabular-nums">
                      ₹{tx.sellerNetPayoutInr.toLocaleString('en-IN')}
                    </td>
                    <td className="py-3.5 px-4 text-right font-mono font-bold text-slate-900 tabular-nums">
                      ₹{tx.buyerTotalLandedCostInr.toLocaleString('en-IN')}
                    </td>
                    <td className="py-3.5 px-4 text-right font-mono font-bold text-blue-600 tabular-nums">
                      ₹{tx.axiaPlatformRevenueInr.toLocaleString('en-IN')}
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                        {tx.status.toUpperCase().replace('_', ' ')}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right whitespace-nowrap">
                      <button
                        onClick={() => setSelectedAuditTx(tx)}
                        className="px-2.5 py-1 text-[11px] font-semibold text-purple-700 bg-purple-50 border border-purple-200 rounded-md hover:bg-purple-100 transition-colors cursor-pointer inline-flex items-center gap-1 shadow-2xs"
                      >
                        <Eye className="w-3 h-3 text-purple-600" />
                        <span>Audit</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 3: AUCTION MANAGEMENT */}
      {activeAdminTab === 'auctions' && (
        <div className="space-y-4">
          <div className="p-4 bg-white rounded-xl border border-slate-200 flex items-center justify-between text-xs">
            <div>
              <strong className="text-slate-900 text-sm block">AXIA Auction State Authority</strong>
              <span className="text-slate-500">
                Auctions trigger deterministically when <strong>interested buyer count &ge; 2</strong>.
              </span>
            </div>
            <span className="font-mono text-xs text-amber-800 font-bold bg-amber-50 px-2.5 py-1 rounded-md border border-amber-200">
              {auctions.length} Total Auction Lots
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {auctions.map(auc => (
              <div key={auc.id} className="p-5 bg-white rounded-xl border border-slate-200 shadow-xs space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-mono font-bold text-slate-400">{auc.code}</span>
                  <span className="text-[10px] font-semibold text-amber-800 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200">
                    {auc.status.toUpperCase()}
                  </span>
                </div>

                <h4 className="font-bold text-sm text-slate-900">{auc.resourceTitle}</h4>

                <div className="grid grid-cols-3 gap-2 p-3 bg-slate-50 rounded-lg border border-slate-200 text-xs">
                  <div>
                    <span className="text-[10px] text-slate-400 block uppercase font-mono">Lot Size</span>
                    <strong className="font-mono text-slate-900">{auc.quantity} {auc.unit}</strong>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block uppercase font-mono">Current Bid</span>
                    <strong className="font-mono text-emerald-700">₹{auc.currentHighestBidInr.toLocaleString('en-IN')}</strong>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block uppercase font-mono">Total Bids</span>
                    <strong className="font-mono text-slate-900">{auc.bids.length}</strong>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[11px] text-slate-500">
                    Active Bidders: {auc.interestedBuyerCount} Enterprises
                  </span>
                  <button
                    onClick={() => setSelectedAuction(auc)}
                    className="px-3.5 py-1.5 text-xs font-semibold bg-purple-600 text-white rounded-lg hover:bg-purple-700 cursor-pointer shadow-xs"
                  >
                    Open Live Room
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: LOGISTICS & CUSTOMS OVERSIGHT */}
      {activeAdminTab === 'logistics' && (
        <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
          <div className="p-4 bg-slate-50/60 border-b border-slate-100 flex items-center justify-between">
            <span className="font-bold text-xs uppercase tracking-wider text-slate-900">
              Real-Time Intermodal Shipments & Milestone Checkpoints
            </span>
            <span className="text-xs text-slate-500">
              Carriers assigned: Maersk Intermodal, TCI Freight, V-Trans
            </span>
          </div>

          <div className="divide-y divide-slate-100 text-xs">
            {shipments.map(shp => (
              <div key={shp.id} className="p-5 space-y-3 hover:bg-slate-50 transition-colors">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <strong className="font-mono text-sm text-slate-900">{shp.code}</strong>
                    <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                      {shp.status.toUpperCase().replace('_', ' ')}
                    </span>
                    <span className="text-slate-400 font-mono text-[11px]">({shp.carrier})</span>
                  </div>
                  <span className="font-mono text-xs text-slate-900">
                    ETA: {shp.eta}
                  </span>
                </div>

                <div className="text-xs text-slate-600">
                  <strong>Lot:</strong> {shp.resourceTitle} · <strong>Route:</strong> {shp.route}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 p-3.5 bg-slate-50 rounded-xl border border-slate-200 text-[11px]">
                  <div>
                    <span className="text-slate-400 block uppercase font-mono text-[10px]">Unmasked Pickup Address:</span>
                    <span className="font-medium text-slate-900">{shp.exactPickupAddress}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block uppercase font-mono text-[10px]">Unmasked Delivery Address:</span>
                    <span className="font-medium text-slate-900">{shp.exactDeliveryAddress}</span>
                  </div>
                </div>

                <div className="text-[11px] text-slate-500 flex items-center justify-between pt-1">
                  <span>Last Milestone Update: {shp.lastUpdate}</span>
                  <span className="font-mono text-slate-700">Tracking No: {shp.trackingNumber}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 5: PLATFORM FEE & TAX CONFIGURATION */}
      {activeAdminTab === 'settings' && (
        <div className="max-w-2xl bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-6">
          <div className="border-b border-slate-100 pb-3">
            <h3 className="font-bold text-base text-slate-900">
              Landed Economics Engine & Fee Parameter Controls
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Tune platform take-rates, statutory customs duties, and currency conversion benchmarks.
            </p>
          </div>

          <form onSubmit={handleSaveFeeConfig} className="space-y-4 text-xs">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-900 mb-1">
                  Supplier Platform Take-Rate (%)
                </label>
                <input
                  type="number"
                  step="0.5"
                  value={supplierFee}
                  onChange={(e) => setSupplierFee(Number(e.target.value))}
                  className="w-full px-3 py-2 bg-white rounded-lg border border-slate-300 font-mono text-sm"
                />
                <span className="text-[10px] text-slate-400">Deducted from gross source payout</span>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-900 mb-1">
                  Receiver Platform Fee (%)
                </label>
                <input
                  type="number"
                  step="0.5"
                  value={receiverFee}
                  onChange={(e) => setReceiverFee(Number(e.target.value))}
                  className="w-full px-3 py-2 bg-white rounded-lg border border-slate-300 font-mono text-sm"
                />
                <span className="text-[10px] text-slate-400">Added into landed destination invoice</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-900 mb-1">
                  Default USD / INR Exchange Rate
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={usdRate}
                  onChange={(e) => setUsdRate(Number(e.target.value))}
                  className="w-full px-3 py-2 bg-white rounded-lg border border-slate-300 font-mono text-sm"
                />
                <span className="text-[10px] text-slate-400">Standard conversion benchmark</span>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-900 mb-1">
                  Electronics Basic Customs Duty (%)
                </label>
                <input
                  type="number"
                  step="0.5"
                  value={dutyRate}
                  onChange={(e) => setDutyRate(Number(e.target.value))}
                  className="w-full px-3 py-2 bg-white rounded-lg border border-slate-300 font-mono text-sm"
                />
                <span className="text-[10px] text-slate-400">Indian DGFT / Customs tariff</span>
              </div>
            </div>

            <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 text-[11px] text-slate-600 leading-relaxed">
              <strong>Notice:</strong> These mock calculations demonstrate deterministic pricing arbitrage. Changes will immediately take effect across all match evaluations and the Global Opportunity Scanner.
            </div>

            <button
              type="submit"
              className="px-5 py-2.5 text-xs font-semibold bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors shadow-xs cursor-pointer"
            >
              Save Platform Configuration
            </button>
          </form>
        </div>
      )}

      {/* Financial Breakdown Modal */}
      {selectedAuditTx && (
        <FinancialBreakdownModal
          transaction={selectedAuditTx}
          onClose={() => setSelectedAuditTx(null)}
        />
      )}

    </div>
  );
};
