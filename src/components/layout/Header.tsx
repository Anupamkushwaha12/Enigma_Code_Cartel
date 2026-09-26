import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { UserRole } from '../../types';
import { 
  Building2, 
  ChevronDown, 
  ExternalLink, 
  Flame, 
  Layers, 
  Radio, 
  ShieldCheck, 
  Truck, 
  Users 
} from 'lucide-react';

interface HeaderProps {
  currentPublicTab: 'landing' | 'how-it-works' | 'exchange' | 'impact';
  setCurrentPublicTab: (tab: 'landing' | 'how-it-works' | 'exchange' | 'impact') => void;
}

export const Header: React.FC<HeaderProps> = ({ currentPublicTab, setCurrentPublicTab }) => {
  const { role, setRole, auctions } = useApp();
  const [showRoleMenu, setShowRoleMenu] = useState(false);

  const activeAuctionCount = auctions.filter(a => a.status === 'active').length;

  const roleLabels: Record<UserRole, { label: string; icon: React.ReactNode; color: string }> = {
    public: { label: 'Public View', icon: <Radio className="w-3.5 h-3.5" />, color: 'bg-slate-100 text-slate-700 border-slate-300' },
    supplier: { label: 'Demo Supplier', icon: <Building2 className="w-3.5 h-3.5" />, color: 'bg-blue-50 text-blue-700 border-blue-200' },
    receiver: { label: 'Demo Receiver', icon: <Users className="w-3.5 h-3.5" />, color: 'bg-indigo-50 text-indigo-700 border-indigo-200' },
    admin: { label: 'Demo Admin', icon: <ShieldCheck className="w-3.5 h-3.5" />, color: 'bg-purple-50 text-purple-700 border-purple-200' },
    logistics: { label: 'Demo Logistics', icon: <Truck className="w-3.5 h-3.5" />, color: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
      {/* 3-Zone Top Bar Contract */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Zone 1: Single text element Brand mark */}
        <div className="flex items-center gap-6">
          <button 
            onClick={() => {
              setRole('public');
              setCurrentPublicTab('landing');
            }}
            className="flex items-center gap-2.5 group text-left cursor-pointer"
          >
            <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold text-sm tracking-wider shadow-sm transition-transform group-hover:scale-105">
              AX
            </div>
            <span className="text-xl font-bold tracking-tight text-slate-900">
              AXIA
            </span>
          </button>

          {/* Scope indicator tag */}
          <div className="hidden lg:flex items-center gap-2 text-xs text-slate-500 pl-4 border-l border-slate-200">
            <span className="font-semibold text-slate-700">India:</span> Industrial Surplus
            <span className="text-slate-300">·</span>
            <span className="font-semibold text-slate-700">International:</span> Second-Life Electronics
          </div>
        </div>

        {/* Zone 2: Clean text navigation links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
          {role === 'public' ? (
            <>
              <button 
                onClick={() => setCurrentPublicTab('landing')}
                className={`transition-colors hover:text-slate-900 pb-1 cursor-pointer ${
                  currentPublicTab === 'landing' ? 'text-blue-600 font-semibold border-b-2 border-blue-600' : ''
                }`}
              >
                Overview
              </button>
              <button 
                onClick={() => setCurrentPublicTab('how-it-works')}
                className={`transition-colors hover:text-slate-900 pb-1 cursor-pointer ${
                  currentPublicTab === 'how-it-works' ? 'text-blue-600 font-semibold border-b-2 border-blue-600' : ''
                }`}
              >
                Managed Architecture
              </button>
              <button 
                onClick={() => setCurrentPublicTab('exchange')}
                className={`transition-colors hover:text-slate-900 pb-1 cursor-pointer ${
                  currentPublicTab === 'exchange' ? 'text-blue-600 font-semibold border-b-2 border-blue-600' : ''
                }`}
              >
                Resource Exchange
              </button>
              <button 
                onClick={() => setCurrentPublicTab('impact')}
                className={`transition-colors hover:text-slate-900 pb-1 cursor-pointer ${
                  currentPublicTab === 'impact' ? 'text-blue-600 font-semibold border-b-2 border-blue-600' : ''
                }`}
              >
                Impact Methodology
              </button>
            </>
          ) : (
            <div className="flex items-center gap-6 text-xs text-slate-500 font-mono">
              <span className="flex items-center gap-1.5 text-slate-700">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                Active Role: <strong className="font-bold text-slate-900">{roleLabels[role].label}</strong>
              </span>
              <span>·</span>
              <button 
                onClick={() => setRole('public')} 
                className="hover:text-blue-600 hover:underline cursor-pointer"
              >
                Exit to Public View
              </button>
            </div>
          )}
        </nav>

        {/* Zone 3: Primary Actions & Quick Role Switcher */}
        <div className="flex items-center gap-3">
          
          {/* Active Auction Ping */}
          {activeAuctionCount > 0 && (
            <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold bg-amber-50 text-amber-800 rounded-md border border-amber-200">
              <Flame className="w-3.5 h-3.5 text-amber-600 animate-pulse" />
              <span>{activeAuctionCount} Active Auction{activeAuctionCount > 1 ? 's' : ''}</span>
            </div>
          )}

          {/* Quick Demo Switcher Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowRoleMenu(!showRoleMenu)}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold shadow-xs transition-all cursor-pointer border ${roleLabels[role].color}`}
            >
              {roleLabels[role].icon}
              <span className="whitespace-nowrap">{roleLabels[role].label}</span>
              <ChevronDown className="w-3 h-3 ml-0.5 opacity-70" />
            </button>

            {showRoleMenu && (
              <div 
                className="absolute right-0 mt-2 w-56 rounded-lg bg-white shadow-lg border border-slate-200 py-1.5 z-50 animate-in fade-in slide-in-from-top-1"
                onMouseLeave={() => setShowRoleMenu(false)}
              >
                <div className="px-3 py-1.5 text-[11px] font-bold text-slate-400 tracking-wider uppercase border-b border-slate-100">
                  Switch Demo Persona
                </div>
                
                {(['supplier', 'receiver', 'admin', 'logistics', 'public'] as UserRole[]).map((r) => (
                  <button
                    key={r}
                    onClick={() => {
                      setRole(r);
                      setShowRoleMenu(false);
                    }}
                    className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between transition-colors cursor-pointer hover:bg-slate-50 ${
                      role === r ? 'font-bold text-blue-600 bg-blue-50/50' : 'text-slate-700'
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      {roleLabels[r].icon}
                      {roleLabels[r].label}
                    </span>
                    {role === r && (
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Direct CTA */}
          {role === 'public' ? (
            <button
              onClick={() => setRole('receiver')}
              className="px-3.5 py-1.5 text-xs font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors whitespace-nowrap shadow-xs cursor-pointer"
            >
              Launch Console
            </button>
          ) : (
            <button
              onClick={() => setRole('public')}
              className="px-3 py-1.5 text-xs font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors whitespace-nowrap cursor-pointer"
            >
              Public Site
            </button>
          )}

        </div>
      </div>
    </header>
  );
};
