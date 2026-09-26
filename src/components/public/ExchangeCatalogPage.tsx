import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ResourceCategory, ResourceListing } from '../../types';
import { 
  Boxes, 
  CheckCircle2, 
  Cpu, 
  Filter, 
  Flame, 
  Gavel, 
  Globe2, 
  MapPin, 
  Search, 
  ShieldCheck, 
  SlidersHorizontal 
} from 'lucide-react';

export const ExchangeCatalogPage: React.FC = () => {
  const { resources, setSelectedResource, setSelectedAuction, auctions } = useApp();

  const [activeScope, setActiveScope] = useState<'all' | 'international' | 'india'>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredResources = resources.filter(res => {
    if (activeScope === 'international' && res.geographicScope !== 'international_electronics') return false;
    if (activeScope === 'india' && res.geographicScope !== 'india_industrial') return false;
    if (selectedCategory !== 'all' && res.category !== selectedCategory) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return (
        res.title.toLowerCase().includes(q) ||
        res.location.city.toLowerCase().includes(q) ||
        res.location.hubCode.toLowerCase().includes(q) ||
        res.category.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Title & Scope Tabs */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200 pb-6">
        <div className="space-y-2">
          <div className="text-xs font-mono uppercase tracking-wider text-blue-600 font-semibold">
            Live Verified Inventory
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Resource Exchange Catalog
          </h1>
          <p className="text-xs text-slate-500 max-w-xl">
            Browse qualified bulk industrial materials and second-life IT assets with certified custody, assay reports, and guaranteed logistics feasibility.
          </p>
        </div>

        {/* Geographic Scope Filter Tabs */}
        <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-lg text-xs font-medium self-start md:self-auto border border-slate-200">
          <button
            onClick={() => setActiveScope('all')}
            className={`px-3 py-1.5 rounded-md transition-colors cursor-pointer ${
              activeScope === 'all' ? 'bg-white text-slate-900 shadow-xs font-semibold' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            All Inventory ({resources.length})
          </button>
          <button
            onClick={() => setActiveScope('international')}
            className={`px-3 py-1.5 rounded-md transition-colors cursor-pointer flex items-center gap-1.5 ${
              activeScope === 'international' ? 'bg-white text-blue-700 shadow-xs font-semibold' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Globe2 className="w-3.5 h-3.5 text-blue-600" />
            International Electronics
          </button>
          <button
            onClick={() => setActiveScope('india')}
            className={`px-3 py-1.5 rounded-md transition-colors cursor-pointer flex items-center gap-1.5 ${
              activeScope === 'india' ? 'bg-white text-emerald-700 shadow-xs font-semibold' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <span>🇮🇳</span>
            India Industrial
          </button>
        </div>
      </div>

      {/* Search and Category Filter Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white p-3.5 rounded-xl border border-slate-200 shadow-xs">
        
        {/* Search */}
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by product, material, or hub..."
            className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 rounded-lg border border-slate-200 focus:outline-hidden focus:border-blue-600"
          />
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-1 overflow-x-auto w-full sm:w-auto text-xs py-1">
          {['all', 'electronics', 'components', 'metals', 'plastics', 'machinery'].map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1 rounded-md text-[11px] whitespace-nowrap capitalize transition-colors cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-blue-600 text-white font-semibold shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

      </div>

      {/* Resource Listings Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredResources.map((res) => {
          const availableQty = res.quantity - res.soldQuantity;
          const isAuction = res.status === 'in_auction' || res.interestedBuyerCount >= 2;

          return (
            <div
              key={res.id}
              className="bg-white rounded-xl border border-slate-200 hover:border-blue-400 shadow-xs hover:shadow-md transition-all flex flex-col justify-between overflow-hidden"
            >
              
              <div className="p-5 space-y-4">
                
                {/* Header Strip */}
                <div className="flex items-center justify-between text-xs">
                  <span className="font-mono text-[11px] text-slate-500">
                    {res.code} · {res.category}
                  </span>
                  
                  {isAuction ? (
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200">
                      <Flame className="w-3 h-3 text-amber-600 animate-pulse" /> AUCTION ACTIVE
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                      <CheckCircle2 className="w-3 h-3 text-emerald-600" /> DIRECT BUY
                    </span>
                  )}
                </div>

                {/* Title */}
                <div>
                  <h3 className="font-bold text-sm text-slate-900 line-clamp-2 leading-snug">
                    {res.title}
                  </h3>
                  <div className="text-[11px] text-slate-500 mt-1 line-clamp-1">
                    {res.materialProperties}
                  </div>
                </div>

                {/* Specs Matrix */}
                <div className="grid grid-cols-2 gap-2 text-xs bg-slate-50 p-3 rounded-lg border border-slate-100">
                  <div>
                    <span className="text-[10px] uppercase font-mono text-slate-400 block">Available</span>
                    <strong className="text-slate-900 font-mono">{availableQty.toLocaleString('en-IN')} {res.unit}</strong>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-mono text-slate-400 block">Base Price</span>
                    <strong className="text-slate-900 font-mono">
                      {res.commercial.currency === 'USD' ? `$${res.commercial.basePrice} USD` : `₹${res.commercial.basePrice.toLocaleString('en-IN')}`}
                    </strong>
                  </div>
                  <div className="col-span-2 pt-1 border-t border-slate-200 flex items-center justify-between text-[11px] text-slate-600">
                    <span className="flex items-center gap-1 truncate">
                      <MapPin className="w-3 h-3 text-blue-500 shrink-0" />
                      <span className="truncate">{res.location.hubCode}</span>
                    </span>
                    <span className="shrink-0">{res.condition}</span>
                  </div>
                </div>

              </div>

              {/* Card Footer / Action */}
              <div className="p-4 bg-slate-50/60 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[11px] text-slate-500">
                  {res.interestedBuyerCount} interested buyer{res.interestedBuyerCount !== 1 ? 's' : ''}
                </span>

                <div className="flex items-center gap-2">
                  {isAuction ? (
                    <button
                      onClick={() => {
                        const auc = auctions.find(a => a.resourceId === res.id) || auctions[0];
                        setSelectedAuction(auc);
                      }}
                      className="px-3.5 py-1.5 text-xs font-semibold bg-amber-600 text-white rounded-lg hover:bg-amber-700 flex items-center gap-1 shadow-xs cursor-pointer"
                    >
                      <Gavel className="w-3 h-3 text-amber-200" />
                      Bid in Auction
                    </button>
                  ) : (
                    <button
                      onClick={() => setSelectedResource(res)}
                      className="px-3.5 py-1.5 text-xs font-semibold bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-xs cursor-pointer"
                    >
                      Inspect & Buy
                    </button>
                  )}
                </div>
              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
};
