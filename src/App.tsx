import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/layout/Header';
import { DemoWalkthroughBar } from './components/layout/DemoWalkthroughBar';
import { LandingPage } from './components/public/LandingPage';
import { HowItWorksPage } from './components/public/HowItWorksPage';
import { ExchangeCatalogPage } from './components/public/ExchangeCatalogPage';
import { ImpactPhilosophyPage } from './components/public/ImpactPhilosophyPage';
import { SupplierDashboard } from './components/supplier/SupplierDashboard';
import { ReceiverDashboard } from './components/receiver/ReceiverDashboard';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { LogisticsDashboard } from './components/logistics/LogisticsDashboard';
import { ImpactReportModal } from './components/common/ImpactReportModal';
import { ResourceDetailModal } from './components/shared/ResourceDetailModal';
import { AuctionRoomModal } from './components/shared/AuctionRoomModal';

const AppContent: React.FC = () => {
  const { 
    role, 
    setRole, 
    selectedResource, 
    setSelectedResource, 
    selectedAuction, 
    setSelectedAuction 
  } = useApp();

  const [currentPublicTab, setCurrentPublicTab] = useState<'landing' | 'how-it-works' | 'exchange' | 'impact'>('landing');

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 selection:bg-blue-600 selection:text-white">
      
      {/* 16-Step Hackathon Demo Walkthrough Guide */}
      <DemoWalkthroughBar />

      {/* 3-Zone Top Bar */}
      <Header 
        currentPublicTab={currentPublicTab} 
        setCurrentPublicTab={setCurrentPublicTab} 
      />

      {/* Main Content Viewport */}
      <main className="flex-1">
        {role === 'public' && (
          <>
            {currentPublicTab === 'landing' && <LandingPage onNavigateTab={setCurrentPublicTab} />}
            {currentPublicTab === 'how-it-works' && <HowItWorksPage />}
            {currentPublicTab === 'exchange' && <ExchangeCatalogPage />}
            {currentPublicTab === 'impact' && <ImpactPhilosophyPage />}
          </>
        )}

        {role === 'supplier' && <SupplierDashboard />}
        {role === 'receiver' && <ReceiverDashboard />}
        {role === 'admin' && <AdminDashboard />}
        {role === 'logistics' && <LogisticsDashboard />}
      </main>

      {/* Global Modals */}
      <ImpactReportModal />

      {selectedResource && (
        <ResourceDetailModal
          resource={selectedResource}
          onClose={() => setSelectedResource(null)}
        />
      )}

      {selectedAuction && (
        <AuctionRoomModal
          auction={selectedAuction}
          onClose={() => setSelectedAuction(null)}
        />
      )}

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-8 text-xs text-slate-500 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-extrabold text-sm text-slate-900 tracking-tight">AXIA</span>
            <span>·</span>
            <span>Where Surplus Finds Its Next Value.</span>
          </div>

          <div className="flex items-center gap-4 text-[11px] font-mono text-slate-500">
            <span>India: Industrial Resource Exchange</span>
            <span>·</span>
            <span>International: Second-Life Electronics</span>
          </div>

          <div className="flex items-center gap-3">
            <button 
              onClick={() => setRole('supplier')} 
              className="hover:text-blue-600 transition-colors cursor-pointer"
            >
              Supplier
            </button>
            <span>·</span>
            <button 
              onClick={() => setRole('receiver')} 
              className="hover:text-blue-600 transition-colors cursor-pointer"
            >
              Receiver
            </button>
            <span>·</span>
            <button 
              onClick={() => setRole('admin')} 
              className="hover:text-blue-600 transition-colors cursor-pointer"
            >
              Admin
            </button>
            <span>·</span>
            <button 
              onClick={() => setRole('logistics')} 
              className="hover:text-blue-600 transition-colors cursor-pointer"
            >
              Logistics
            </button>
          </div>
        </div>
      </footer>

    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
