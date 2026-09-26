import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ConditionGrade, ResourceCategory } from '../../types';
import { 
  Building2, 
  Check, 
  ChevronRight, 
  FileText, 
  HelpCircle, 
  MapPin, 
  ShieldCheck, 
  Target, 
  X 
} from 'lucide-react';

interface PostRequirementModalProps {
  onClose: () => void;
}

export const PostRequirementModal: React.FC<PostRequirementModalProps> = ({ onClose }) => {
  const { addRequirement } = useApp();

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<ResourceCategory>('electronics');
  const [productType, setProductType] = useState('Enterprise Laptop');
  const [quantityRequired, setQuantityRequired] = useState<number>(1000);
  const [unit, setUnit] = useState<string>('units');
  const [maxLandedCost, setMaxLandedCost] = useState<number>(20000); // Default ₹20,000 as per prompt!
  const [requiredByDate, setRequiredByDate] = useState('2026-10-25');
  const [specs, setSpecs] = useState('Intel Core i5 11th Gen, min 8GB RAM, clean screen, SSD boot drive');
  const [processingTolerance, setProcessingTolerance] = useState('Destination shop will handle testing and local keyboard engraving.');

  // Destination
  const [city, setCity] = useState('Mumbai');
  const [region, setRegion] = useState('Maharashtra');
  const [hubCode, setHubCode] = useState('IND — Mumbai Distribution Hub');
  const [exactAddress, setExactAddress] = useState('Bhiwandi Logistics Park, Unit 12B, Thane-Bhiwandi Bypass, MH 421302, India');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title) {
      alert('Please specify requirement title');
      return;
    }

    addRequirement({
      title,
      category,
      productType,
      quantityRequired,
      unit,
      acceptableCondition: ['Grade A Refurbishable', 'Working Secondary'],
      requiredSpecifications: specs,
      maxLandedCost,
      currency: 'INR',
      requiredByDate,
      destination: {
        country: 'India',
        region,
        city,
        hubCode,
        exactAddress,
      },
      processingTolerance,
      buyerId: 'buyer-current-session',
      buyerAnonymousName: 'Buyer (You / Verified)',
      buyerExactName: 'NexGen Computing Refurbishment & Re-Commerce Pvt. Ltd.',
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl border border-slate-200 max-w-2xl w-full shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="bg-white px-6 py-4 flex items-center justify-between border-b border-slate-200">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-indigo-50 text-indigo-700 border border-indigo-200 flex items-center justify-center">
              <Target className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs uppercase tracking-wider text-indigo-600 font-mono font-semibold">
                Smart Demand Intake
              </div>
              <h3 className="text-base font-bold text-slate-900">
                Post Material or Hardware Requirement
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

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[70vh] overflow-y-auto text-xs">
          
          <div>
            <label className="block text-xs font-semibold text-slate-900 mb-1">
              Requirement Title *
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. 1,000 Refurbished Laptops under ₹20,000 Landed Cost"
              className="w-full px-3 py-2 bg-white rounded-lg border border-slate-300 focus:outline-hidden focus:border-indigo-600"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-900 mb-1">Resource Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as ResourceCategory)}
                className="w-full px-3 py-2 bg-white rounded-lg border border-slate-300"
              >
                <option value="electronics">Electronics (Second-Life)</option>
                <option value="components">Components & Memory</option>
                <option value="metals">Metals / Scrap Billets</option>
                <option value="plastics">Industrial Plastics</option>
                <option value="byproducts">Manufacturing By-products</option>
                <option value="machinery">Industrial Machinery</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-900 mb-1">Product Archetype</label>
              <input
                type="text"
                value={productType}
                onChange={(e) => setProductType(e.target.value)}
                className="w-full px-3 py-2 bg-white rounded-lg border border-slate-300"
              />
            </div>
          </div>

          {/* Hard Economic Gate Constraint */}
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <span className="font-bold text-slate-900 text-xs block">
                  Hard Economic Gate: Maximum Landed Cost
                </span>
                <span className="text-[11px] text-slate-500">
                  AXIA automatically filters out any cross-border or domestic opportunity exceeding this threshold.
                </span>
              </div>
              <span className="text-xs font-mono font-bold text-indigo-700 bg-indigo-50 px-2.5 py-0.5 rounded-md border border-indigo-200">
                INR (₹) Landed
              </span>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="block text-[11px] font-semibold text-slate-900 mb-1">Quantity Required</label>
                <input
                  type="number"
                  value={quantityRequired}
                  onChange={(e) => setQuantityRequired(Number(e.target.value))}
                  className="w-full px-3 py-2 bg-white rounded-lg border border-slate-300 font-mono text-sm"
                />
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-slate-900 mb-1">Unit</label>
                <select
                  value={unit}
                  onChange={(e) => setUnit(e.target.value)}
                  className="w-full px-3 py-2 bg-white rounded-lg border border-slate-300"
                >
                  <option value="units">units</option>
                  <option value="tonnes">tonnes</option>
                  <option value="kg">kg</option>
                </select>
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-slate-900 mb-1">Max Landed Cost / Unit (₹)</label>
                <input
                  type="number"
                  value={maxLandedCost}
                  onChange={(e) => setMaxLandedCost(Number(e.target.value))}
                  className="w-full px-3 py-2 bg-white rounded-lg border border-indigo-400 font-mono font-bold text-sm text-indigo-900"
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-900 mb-1">
              Required Technical Specifications
            </label>
            <textarea
              rows={2}
              value={specs}
              onChange={(e) => setSpecs(e.target.value)}
              className="w-full px-3 py-2 bg-white rounded-lg border border-slate-300"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-900 mb-1">Required By Date</label>
              <input
                type="date"
                value={requiredByDate}
                onChange={(e) => setRequiredByDate(e.target.value)}
                className="w-full px-3 py-2 bg-white rounded-lg border border-slate-300"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-900 mb-1">Destination Logistics Hub</label>
              <input
                type="text"
                value={hubCode}
                onChange={(e) => setHubCode(e.target.value)}
                className="w-full px-3 py-2 bg-white rounded-lg border border-slate-300 font-mono"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-900 mb-1">
              Destination Exact Receiving Address (Carrier Only)
            </label>
            <input
              type="text"
              value={exactAddress}
              onChange={(e) => setExactAddress(e.target.value)}
              className="w-full px-3 py-2 bg-white rounded-lg border border-slate-300"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-900 mb-1">
              In-House Processing Tolerance & Packaging Criteria
            </label>
            <textarea
              rows={2}
              value={processingTolerance}
              onChange={(e) => setProcessingTolerance(e.target.value)}
              className="w-full px-3 py-2 bg-white rounded-lg border border-slate-300"
            />
          </div>

          <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
            <span className="text-[11px] text-slate-400">
              Encrypted matching runs automatically against global inventory.
            </span>
            <button
              type="submit"
              className="px-5 py-2 text-xs font-semibold bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors shadow-xs cursor-pointer flex items-center gap-1.5"
            >
              <Check className="w-3.5 h-3.5 text-indigo-200" />
              Publish Requirement to Matching Engine
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
