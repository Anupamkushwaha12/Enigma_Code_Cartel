import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Auction } from '../../types';
import { 
  AlertCircle, 
  ArrowUpRight, 
  Clock, 
  Flame, 
  Gavel, 
  HelpCircle, 
  ShieldCheck, 
  Trophy, 
  UserCheck, 
  X 
} from 'lucide-react';

interface AuctionRoomModalProps {
  auction: Auction;
  onClose: () => void;
}

export const AuctionRoomModal: React.FC<AuctionRoomModalProps> = ({ auction, onClose }) => {
  const { role, placeAuctionBid, executeDirectBuy } = useApp();
  const [customBidPrice, setCustomBidPrice] = useState<number>(auction.currentHighestBidInr + 1000);
  const [bidSubmittedMessage, setBidSubmittedMessage] = useState<string | null>(null);

  const isSupplier = role === 'supplier';
  const isAdmin = role === 'admin';
  const isReceiver = role === 'receiver';

  const winningBid = auction.bids.find(b => b.isWinning) || auction.bids[0];

  const handlePlaceBid = (e: React.FormEvent) => {
    e.preventDefault();
    if (customBidPrice <= auction.currentHighestBidInr) {
      alert(`Bid must be higher than current highest bid of ₹${auction.currentHighestBidInr.toLocaleString('en-IN')}`);
      return;
    }

    placeAuctionBid(
      auction.id,
      'buyer-user-session',
      'Buyer (You / Anonymous)',
      customBidPrice
    );

    setBidSubmittedMessage(`Bid of ₹${customBidPrice.toLocaleString('en-IN')}/${auction.unit} placed anonymously.`);
    setCustomBidPrice(customBidPrice + 1000);
    setTimeout(() => setBidSubmittedMessage(null), 4000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl border border-slate-200 max-w-2xl w-full shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="bg-white px-6 py-4 flex items-center justify-between border-b border-slate-200">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-700 border border-amber-200 flex items-center justify-center">
              <Gavel className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-amber-700 font-mono font-semibold">
                <span>Multi-Buyer Live Auction</span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping"></span>
                <span>Active</span>
              </div>
              <h3 className="text-base font-bold text-slate-900">
                {auction.resourceTitle}
              </h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Anonymity Banner */}
        <div className="bg-slate-50 px-6 py-2.5 border-b border-slate-200 text-xs text-slate-600 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-blue-600" />
            <span>
              <strong>Commercial Anonymity Enforced:</strong> All bidder identities remain encrypted and shielded by AXIA.
            </span>
          </div>
          <div className="flex items-center gap-1 text-[11px] font-mono text-slate-500">
            <Clock className="w-3.5 h-3.5" />
            <span>Closes in 48h 12m</span>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto">
          
          {/* Top KPI row */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
              <span className="text-[11px] text-slate-500 uppercase font-mono block mb-0.5">Auction Lot Size</span>
              <div className="text-lg font-bold text-slate-900 font-mono tabular-nums">
                {auction.quantity.toLocaleString('en-IN')} {auction.unit}
              </div>
              <span className="text-[10px] text-slate-400">Reserve: ₹{auction.reservePricePerUnitInr.toLocaleString('en-IN')}/{auction.unit}</span>
            </div>

            <div className="p-3.5 rounded-xl bg-amber-50/70 border border-amber-200 text-amber-950">
              <span className="text-[11px] text-amber-800 uppercase font-mono block mb-0.5 font-semibold">Current Winning Bid</span>
              <div className="text-lg font-bold text-amber-900 font-mono tabular-nums">
                ₹{auction.currentHighestBidInr.toLocaleString('en-IN')}/{auction.unit}
              </div>
              <span className="text-[10px] text-amber-700">
                Total: ₹{(auction.currentHighestBidInr * auction.quantity).toLocaleString('en-IN')}
              </span>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
              <span className="text-[11px] text-slate-500 uppercase font-mono block mb-0.5">Qualified Buyers</span>
              <div className="text-lg font-bold text-slate-900 font-mono tabular-nums">
                {auction.bids.length} Active Bids
              </div>
              <span className="text-[10px] text-slate-400">{auction.interestedBuyerCount} verified enterprises</span>
            </div>
          </div>

          {/* Supplier View: Winning Offer Notification */}
          {isSupplier && (
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase font-mono text-slate-500">Supplier Realization View</span>
                <span className="text-[11px] text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                  Highest Qualified Offer
                </span>
              </div>
              <div className="text-2xl font-bold font-mono text-slate-900 tabular-nums">
                ₹{auction.currentHighestBidInr.toLocaleString('en-IN')} / {auction.unit}
              </div>
              <p className="text-xs text-slate-500">
                As per AXIA protocol, buyer identity, exact address, and contact details are kept strictly anonymous. AXIA manages pickup, freight, and net payout upon destination receipt.
              </p>
            </div>
          )}

          {/* Bid History Table */}
          <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
            <div className="px-4 py-3 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900">
                Live Anonymous Bid Book
              </h4>
              <span className="text-[11px] font-mono text-slate-400">Encrypted Ledger</span>
            </div>

            <div className="divide-y divide-slate-100 text-xs">
              {auction.bids.map((bid, index) => {
                const isTop = index === 0 || bid.isWinning;
                return (
                  <div 
                    key={bid.id} 
                    className={`px-4 py-3 flex items-center justify-between transition-colors ${
                      isTop ? 'bg-amber-50/40' : 'hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-mono font-bold ${
                        isTop ? 'bg-amber-600 text-white' : 'bg-slate-200 text-slate-600'
                      }`}>
                        {index + 1}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <strong className="text-slate-900">
                            {/* Admin sees exact details, others see anonymous label */}
                            {isAdmin ? `${bid.anonymousBuyerLabel} [Verified Enterprise]` : bid.anonymousBuyerLabel}
                          </strong>
                          {isTop && (
                            <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
                              WINNING
                            </span>
                          )}
                        </div>
                        <span className="text-[11px] text-slate-400 font-mono">
                          {new Date(bid.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} IST
                        </span>
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="font-mono font-bold text-sm text-slate-900 tabular-nums">
                        ₹{bid.bidPerUnitInr.toLocaleString('en-IN')}/{auction.unit}
                      </div>
                      <span className="text-[11px] text-slate-400 font-mono">
                        Lot Total: ₹{bid.totalBidInr.toLocaleString('en-IN')}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Receiver / Bidding Interface */}
          {(!isSupplier) && (
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-900">Submit Anonymous Competitive Bid</span>
                <span className="text-[11px] text-slate-500">
                  Min increment: ₹500/{auction.unit}
                </span>
              </div>

              {bidSubmittedMessage && (
                <div className="p-2.5 rounded-lg bg-emerald-50 border border-emerald-200 text-xs text-emerald-700 flex items-center gap-2">
                  <UserCheck className="w-4 h-4" />
                  <span>{bidSubmittedMessage}</span>
                </div>
              )}

              <form onSubmit={handlePlaceBid} className="flex flex-col sm:flex-row gap-2">
                <div className="relative flex-1">
                  <span className="absolute left-3 top-2.5 text-xs text-slate-400 font-mono">₹</span>
                  <input
                    type="number"
                    value={customBidPrice}
                    onChange={(e) => setCustomBidPrice(Number(e.target.value))}
                    min={auction.currentHighestBidInr + 500}
                    step={100}
                    className="w-full pl-7 pr-16 py-2 text-sm font-mono font-bold bg-white rounded-lg border border-slate-300 focus:outline-hidden focus:border-blue-600"
                    placeholder="Enter bid per unit"
                  />
                  <span className="absolute right-3 top-2.5 text-xs text-slate-400 font-mono">/{auction.unit}</span>
                </div>

                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-semibold bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors whitespace-nowrap cursor-pointer shadow-xs"
                >
                  Place Counter-Bid
                </button>
              </form>

              <p className="text-[11px] text-slate-500">
                Bids placed are binding commercial commitments backed by AXIA verified buyer escrow.
              </p>
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="bg-slate-50 px-6 py-3.5 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
          <span>Lot Code: <strong className="font-mono text-slate-900">{auction.code}</strong></span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 text-xs font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
          >
            Close Auction Window
          </button>
        </div>

      </div>
    </div>
  );
};
