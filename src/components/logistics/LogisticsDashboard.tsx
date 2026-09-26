import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Shipment, ShipmentStatus } from '../../types';
import { 
  AlertCircle, 
  ArrowRight, 
  Boxes, 
  Building2, 
  CheckCircle2, 
  Clock, 
  FileCheck, 
  HelpCircle, 
  MapPin, 
  Navigation, 
  Radio, 
  ShieldCheck, 
  Truck, 
  Warehouse 
} from 'lucide-react';

export const LogisticsDashboard: React.FC = () => {
  const { shipments, updateShipmentStatus } = useApp();
  const [selectedShipment, setSelectedShipment] = useState<Shipment>(shipments[0]);

  const statusProgression: ShipmentStatus[] = [
    'matched',
    'verification',
    'logistics_assigned',
    'pickup_scheduled',
    'picked_up',
    'in_transit',
    'customs_compliance',
    'destination_hub',
    'delivered',
  ];

  const handleAdvanceStatus = (shipment: Shipment) => {
    const currentIndex = statusProgression.indexOf(shipment.status);
    if (currentIndex < statusProgression.length - 1) {
      const next = statusProgression[currentIndex + 1];
      updateShipmentStatus(shipment.id, next);
      setSelectedShipment({ ...shipment, status: next });
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-emerald-600 font-semibold">
            <Truck className="w-4 h-4" />
            <span>Carrier Operations & Chain of Custody</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Logistics Partner Dispatch Console
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Maersk Intermodal & TCI Freight Network · Authorized Custody Partner with Unmasked Physical Addresses
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono bg-white px-3 py-1.5 rounded-lg border border-slate-200 shadow-2xs">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          <span>GPS Telematics Active</span>
        </div>
      </div>

      {/* Main Grid: Left List (4 cols) & Right Detail (8 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Shipment List (4 cols) */}
        <div className="lg:col-span-4 space-y-3">
          <div className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2 flex items-center justify-between">
            <span>Assigned Shipments</span>
            <span className="font-mono text-slate-400">({shipments.length})</span>
          </div>

          <div className="space-y-2">
            {shipments.map(shp => {
              const isSelected = selectedShipment?.id === shp.id;

              return (
                <button
                  key={shp.id}
                  onClick={() => setSelectedShipment(shp)}
                  className={`w-full text-left p-4 rounded-xl border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-white border-emerald-500 shadow-sm ring-1 ring-emerald-500/20'
                      : 'bg-white border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="font-mono font-bold text-slate-900">{shp.code}</span>
                    <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                      {shp.status.replace('_', ' ').toUpperCase()}
                    </span>
                  </div>

                  <div className="font-semibold text-xs text-slate-900 line-clamp-1">{shp.resourceTitle}</div>
                  <div className="text-[11px] text-slate-500 mt-1">
                    {shp.originHub.split('—')[0]} → {shp.destinationHub.split('—')[0]}
                  </div>

                  <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 mt-2 pt-2 border-t border-slate-100">
                    <span>{shp.carrier}</span>
                    <span>ETA: {shp.eta}</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Column: Active Shipment Detail (8 cols) */}
        <div className="lg:col-span-8">
          {selectedShipment && (
            <div className="bg-white rounded-xl border border-slate-200 shadow-xs p-6 space-y-6">
              
              {/* Top Banner */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-sm font-bold text-slate-900">{selectedShipment.code}</span>
                    <span className="text-xs text-slate-400">({selectedShipment.trackingNumber})</span>
                  </div>
                  <h3 className="font-bold text-base text-slate-900 mt-0.5">{selectedShipment.resourceTitle}</h3>
                </div>

                {/* Advance Milestone Status Button */}
                {selectedShipment.status !== 'delivered' && (
                  <button
                    onClick={() => handleAdvanceStatus(selectedShipment)}
                    className="px-4 py-2 text-xs font-semibold bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors shadow-xs flex items-center gap-2 cursor-pointer self-start sm:self-auto"
                  >
                    <span>Advance Milestone Status</span>
                    <ArrowRight className="w-3.5 h-3.5 text-emerald-200" />
                  </button>
                )}
              </div>

              {/* Physical Addresses */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900 text-xs uppercase tracking-wider">
                    Unmasked Facility Origin & Destination Addresses
                  </span>
                  <span className="text-[10px] font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                    CONFIDENTIAL DISPATCH DATA
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  <div className="space-y-1 p-3 bg-white rounded-lg border border-slate-200">
                    <span className="text-[10px] uppercase font-mono text-slate-400 block flex items-center gap-1">
                      <Warehouse className="w-3 h-3 text-emerald-600" /> Exact Pickup Depot
                    </span>
                    <strong className="text-slate-900 block">{selectedShipment.exactPickupAddress}</strong>
                    <span className="text-[11px] text-slate-500">Regional Hub Alias: {selectedShipment.originHub}</span>
                  </div>

                  <div className="space-y-1 p-3 bg-white rounded-lg border border-slate-200">
                    <span className="text-[10px] uppercase font-mono text-slate-400 block flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-emerald-600" /> Exact Destination Facility
                    </span>
                    <strong className="text-slate-900 block">{selectedShipment.exactDeliveryAddress}</strong>
                    <span className="text-[11px] text-slate-500">Regional Hub Alias: {selectedShipment.destinationHub}</span>
                  </div>
                </div>
              </div>

              {/* Transit & Cargo Metric Bar */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-50 p-3.5 rounded-xl border border-slate-200 text-xs">
                <div>
                  <span className="text-[10px] uppercase font-mono text-slate-400 block">Carrier</span>
                  <strong className="text-slate-900">{selectedShipment.carrier}</strong>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-mono text-slate-400 block">Gross Weight</span>
                  <strong className="text-slate-900 font-mono">{selectedShipment.weightKg.toLocaleString('en-IN')} kg</strong>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-mono text-slate-400 block">Freight Charge</span>
                  <strong className="text-slate-900 font-mono">₹{selectedShipment.freightCostInr.toLocaleString('en-IN')}</strong>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-mono text-slate-400 block">Estimated Delivery</span>
                  <strong className="text-emerald-700 font-mono">{selectedShipment.eta}</strong>
                </div>
              </div>

              {/* Shipment Milestones Timeline */}
              <div className="space-y-3">
                <h4 className="font-bold text-xs uppercase tracking-wider text-slate-900">
                  Chain of Custody Milestones
                </h4>

                <div className="relative pl-6 space-y-6 before:content-[''] before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
                  {selectedShipment.milestones.map((m, idx) => {
                    const isDone = m.status === 'completed';
                    const isInProgress = m.status === 'in_progress';

                    return (
                      <div key={idx} className="relative text-xs">
                        {/* Dot */}
                        <div className={`absolute -left-6 top-0.5 w-4 h-4 rounded-full flex items-center justify-center ${
                          isDone 
                            ? 'bg-emerald-600 text-white' 
                            : isInProgress 
                            ? 'bg-amber-500 text-white ring-4 ring-amber-100' 
                            : 'bg-slate-200 text-white'
                        }`}>
                          {isDone ? <CheckCircle2 className="w-3 h-3" /> : <div className="w-1.5 h-1.5 rounded-full bg-white"></div>}
                        </div>

                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                          <strong className={`font-semibold ${isDone ? 'text-slate-900' : isInProgress ? 'text-amber-800' : 'text-slate-400'}`}>
                            {m.title}
                          </strong>
                          <span className="font-mono text-[11px] text-slate-400">{m.date}</span>
                        </div>
                        <div className="text-[11px] text-slate-500">{m.location}</div>
                        {m.notes && (
                          <div className="text-[11px] text-amber-800 bg-amber-50 p-2.5 rounded-lg border border-amber-200 mt-1.5">
                            {m.notes}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

            </div>
          )}
        </div>

      </div>

    </div>
  );
};
