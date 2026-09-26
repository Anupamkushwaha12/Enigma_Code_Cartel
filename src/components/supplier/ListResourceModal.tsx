import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ConditionGrade, ResourceCategory } from '../../types';
import { 
  Building2, 
  Check, 
  ChevronLeft, 
  ChevronRight, 
  FileText, 
  Globe, 
  Package, 
  Plus, 
  Scale, 
  ShieldCheck, 
  Upload, 
  X 
} from 'lucide-react';

interface ListResourceModalProps {
  onClose: () => void;
}

export const ListResourceModal: React.FC<ListResourceModalProps> = ({ onClose }) => {
  const { addResource } = useApp();
  const [step, setStep] = useState<number>(1);

  // Form State
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<ResourceCategory>('electronics');
  const [productType, setProductType] = useState('');
  const [materialType, setMaterialType] = useState('');
  const [materialProperties, setMaterialProperties] = useState('');
  const [condition, setCondition] = useState<ConditionGrade>('Grade A Refurbishable');
  const [quantity, setQuantity] = useState<number>(1000);
  const [unit, setUnit] = useState<string>('units');
  const [weightKg, setWeightKg] = useState<number>(2500);
  const [volumeCbm, setVolumeCbm] = useState<number>(6.5);

  // Location
  const [country, setCountry] = useState('United States');
  const [region, setRegion] = useState('Texas');
  const [city, setCity] = useState('Dallas');
  const [hubCode, setHubCode] = useState('USA — Dallas Logistics Hub');
  const [exactAddress, setExactAddress] = useState('4400 Logistics Way, Suite 200, Dallas, TX 75261, USA');

  // Availability
  const [availableFrom, setAvailableFrom] = useState('2026-10-01');
  const [availableUntil, setAvailableUntil] = useState('2026-11-30');
  const [preferredTiming, setPreferredTiming] = useState('Immediate container load');

  // Commercial
  const [basePrice, setBasePrice] = useState<number>(130);
  const [currency, setCurrency] = useState<'USD' | 'INR'>('USD');
  const [minAcceptablePrice, setMinAcceptablePrice] = useState<number>(120);

  // Processing
  const [refurbishmentRequired, setRefurbishmentRequired] = useState(true);
  const [testingRequired, setTestingRequired] = useState(true);
  const [certificationRequired, setCertificationRequired] = useState(true);
  const [processingDetails, setProcessingDetails] = useState('Requires standard diagnostic boot pass and plug adapter swap.');

  // Documentation mock
  const [uploadedDocs, setUploadedDocs] = useState<string[]>([
    'De-Manufacturing_Audit_Cert.pdf',
    'NIST_800-88_Sanitization_Pass.pdf'
  ]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title) {
      alert('Please provide a resource title');
      return;
    }

    addResource({
      title,
      category,
      productType: productType || title,
      materialType: materialType || 'Industrial Recovery Spec',
      materialProperties: materialProperties || 'Tested Grade Spec',
      condition,
      quantity,
      initialQuantity: quantity,
      unit,
      weightKg,
      volumeCbm,
      location: {
        country,
        region,
        city,
        hubCode,
        exactAddress,
      },
      availability: {
        availableFrom,
        availableUntil,
        preferredTiming,
      },
      commercial: {
        basePrice,
        currency,
        minAcceptablePrice,
        transactionMethod: 'direct_or_auction',
      },
      processing: {
        refurbishmentRequired,
        testingRequired,
        certificationRequired,
        processingDetails,
      },
      documentation: {
        certificates: uploadedDocs,
        complianceDocs: ['E-Waste EPR Declaration', 'Commercial Invoice Spec'],
        specSheets: ['Technical Diagnostics Log'],
      },
      sellerId: 'supplier-current-session',
      sellerAnonymousName: `${city} Qualified Resource Partner`,
      sellerExactName: 'Iron Mountain Asset Lifecycle Management LLC',
      geographicScope: country.toLowerCase().includes('india') ? 'india_industrial' : 'international_electronics',
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl border border-slate-200 max-w-2xl w-full shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="bg-white px-6 py-4 flex items-center justify-between border-b border-slate-200">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-700 border border-blue-200 flex items-center justify-center">
              <Package className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs uppercase tracking-wider text-blue-600 font-mono font-semibold">
                Resource Listing Engine
              </div>
              <h3 className="text-base font-bold text-slate-900">
                List Surplus Resource (Step {step} of 4)
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

        {/* Step Indicator */}
        <div className="bg-slate-50 px-6 py-2.5 border-b border-slate-200 flex items-center justify-between text-xs font-mono">
          <div className={`flex items-center gap-1.5 ${step === 1 ? 'font-bold text-blue-600' : 'text-slate-400'}`}>
            <span className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] ${step === 1 ? 'bg-blue-600 text-white' : 'bg-slate-200 text-slate-600'}`}>1</span>
            <span>Resource & Specs</span>
          </div>
          <div className={`flex items-center gap-1.5 ${step === 2 ? 'font-bold text-blue-600' : 'text-slate-400'}`}>
            <span className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] ${step === 2 ? 'bg-blue-600 text-white' : 'bg-slate-200 text-slate-600'}`}>2</span>
            <span>Location & Hub</span>
          </div>
          <div className={`flex items-center gap-1.5 ${step === 3 ? 'font-bold text-blue-600' : 'text-slate-400'}`}>
            <span className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] ${step === 3 ? 'bg-blue-600 text-white' : 'bg-slate-200 text-slate-600'}`}>3</span>
            <span>Commercial & Value</span>
          </div>
          <div className={`flex items-center gap-1.5 ${step === 4 ? 'font-bold text-blue-600' : 'text-slate-400'}`}>
            <span className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] ${step === 4 ? 'bg-blue-600 text-white' : 'bg-slate-200 text-slate-600'}`}>4</span>
            <span>Compliance & Uploads</span>
          </div>
        </div>

        {/* Form Content */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[70vh] overflow-y-auto text-xs">
          
          {/* STEP 1: Resource & Specs */}
          {step === 1 && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-900 mb-1">
                  Resource / Product Name *
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Dell Latitude 5420 Intel Core i5 Lot"
                  className="w-full px-3 py-2 bg-white rounded-lg border border-slate-300 focus:outline-hidden focus:border-blue-600"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-900 mb-1">Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as ResourceCategory)}
                    className="w-full px-3 py-2 bg-white rounded-lg border border-slate-300 focus:outline-hidden"
                  >
                    <option value="electronics">Electronics (Second-Life)</option>
                    <option value="components">Components / Semis</option>
                    <option value="metals">Metals / Alloys</option>
                    <option value="plastics">Plastics / Polymers</option>
                    <option value="byproducts">Manufacturing By-products</option>
                    <option value="machinery">Industrial Machinery</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-900 mb-1">Condition State</label>
                  <select
                    value={condition}
                    onChange={(e) => setCondition(e.target.value as ConditionGrade)}
                    className="w-full px-3 py-2 bg-white rounded-lg border border-slate-300 focus:outline-hidden"
                  >
                    <option value="Grade A Refurbishable">Grade A Refurbishable</option>
                    <option value="Working Secondary">Working Secondary</option>
                    <option value="Recoverable Components">Recoverable Components</option>
                    <option value="Industrial Reusable">Industrial Reusable</option>
                    <option value="Virgin By-Product">Virgin By-Product</option>
                    <option value="Scrap / Smelting Grade">Scrap / Smelting Grade</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-900 mb-1">Quantity</label>
                  <input
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-white rounded-lg border border-slate-300 font-mono"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-900 mb-1">Unit</label>
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
                  <label className="block text-xs font-semibold text-slate-900 mb-1">Gross Weight (kg)</label>
                  <input
                    type="number"
                    value={weightKg}
                    onChange={(e) => setWeightKg(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-white rounded-lg border border-slate-300 font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-900 mb-1">
                  Material Properties & Hardware Specifications
                </label>
                <textarea
                  rows={2}
                  value={materialProperties}
                  onChange={(e) => setMaterialProperties(e.target.value)}
                  placeholder="e.g. 11th Gen i5-1145G7, 16GB DDR4, 256GB SSD, Grade A Battery"
                  className="w-full px-3 py-2 bg-white rounded-lg border border-slate-300 focus:outline-hidden"
                />
              </div>
            </div>
          )}

          {/* STEP 2: Location & Availability */}
          {step === 2 && (
            <div className="space-y-4">
              <div className="p-3.5 bg-blue-50/70 rounded-xl border border-blue-200 text-blue-900 text-xs">
                <strong className="text-blue-900">Commercial Privacy Notice:</strong> Receivers only see your designated Logistics Hub (e.g. &ldquo;USA — Dallas Logistics Hub&rdquo;). Your exact street address is shared only with verified carriers.
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-900 mb-1">Country</label>
                  <select
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    className="w-full px-3 py-2 bg-white rounded-lg border border-slate-300"
                  >
                    <option value="United States">United States</option>
                    <option value="China">China</option>
                    <option value="India">India</option>
                    <option value="South Korea">South Korea</option>
                    <option value="Germany">Germany</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-900 mb-1">State / Region</label>
                  <input
                    type="text"
                    value={region}
                    onChange={(e) => setRegion(e.target.value)}
                    className="w-full px-3 py-2 bg-white rounded-lg border border-slate-300"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-900 mb-1">City</label>
                  <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full px-3 py-2 bg-white rounded-lg border border-slate-300"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-900 mb-1">
                  Designated Anonymous Regional Hub
                </label>
                <input
                  type="text"
                  value={hubCode}
                  onChange={(e) => setHubCode(e.target.value)}
                  className="w-full px-3 py-2 bg-white rounded-lg border border-slate-300 font-mono text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-900 mb-1">
                  Exact Facility Address (Internal / Carrier Only)
                </label>
                <input
                  type="text"
                  value={exactAddress}
                  onChange={(e) => setExactAddress(e.target.value)}
                  className="w-full px-3 py-2 bg-white rounded-lg border border-slate-300"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-900 mb-1">Available Until</label>
                  <input
                    type="date"
                    value={availableUntil}
                    onChange={(e) => setAvailableUntil(e.target.value)}
                    className="w-full px-3 py-2 bg-white rounded-lg border border-slate-300"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-900 mb-1">Preferred Dispatch Timing</label>
                  <input
                    type="text"
                    value={preferredTiming}
                    onChange={(e) => setPreferredTiming(e.target.value)}
                    className="w-full px-3 py-2 bg-white rounded-lg border border-slate-300"
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: Commercial & Processing */}
          {step === 3 && (
            <div className="space-y-4">
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-900 mb-1">Base Price</label>
                  <input
                    type="number"
                    value={basePrice}
                    onChange={(e) => setBasePrice(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-white rounded-lg border border-slate-300 font-mono"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-900 mb-1">Currency</label>
                  <select
                    value={currency}
                    onChange={(e) => setCurrency(e.target.value as 'USD' | 'INR')}
                    className="w-full px-3 py-2 bg-white rounded-lg border border-slate-300"
                  >
                    <option value="USD">USD ($)</option>
                    <option value="INR">INR (₹)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-900 mb-1">Minimum Floor Price</label>
                  <input
                    type="number"
                    value={minAcceptablePrice}
                    onChange={(e) => setMinAcceptablePrice(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-white rounded-lg border border-slate-300 font-mono"
                  />
                </div>
              </div>

              <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                <span className="font-bold text-slate-900 text-xs block">
                  Processing & Testing Requirements
                </span>
                <div className="space-y-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={refurbishmentRequired}
                      onChange={(e) => setRefurbishmentRequired(e.target.checked)}
                      className="rounded text-blue-600"
                    />
                    <span>Secondary refurbishment / cosmetic re-skinning required</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={testingRequired}
                      onChange={(e) => setTestingRequired(e.target.checked)}
                      className="rounded text-blue-600"
                    />
                    <span>Component diagnostic testing / assay certification required</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={certificationRequired}
                      onChange={(e) => setCertificationRequired(e.target.checked)}
                      className="rounded text-blue-600"
                    />
                    <span>Statutory cross-border certification (EPR / DGFT / BIS) applicable</span>
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-900 mb-1">
                  Processing Instructions & Acceptance Criteria
                </label>
                <textarea
                  rows={2}
                  value={processingDetails}
                  onChange={(e) => setProcessingDetails(e.target.value)}
                  className="w-full px-3 py-2 bg-white rounded-lg border border-slate-300"
                />
              </div>
            </div>
          )}

          {/* STEP 4: Compliance & Document Uploads */}
          {step === 4 && (
            <div className="space-y-4">
              <div className="border-2 border-dashed border-slate-300 rounded-xl p-6 text-center bg-slate-50">
                <Upload className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                <span className="text-xs font-semibold text-slate-900 block">
                  Upload Custody, Testing & Compliance Certs
                </span>
                <p className="text-[11px] text-slate-500 mt-1">
                  Drag & drop PDF, CSV diagnostic logs, or mill certificates
                </p>
                <button
                  type="button"
                  onClick={() => setUploadedDocs([...uploadedDocs, `Spec_Certificate_${Date.now().toString().slice(-4)}.pdf`])}
                  className="mt-3 px-3 py-1.5 text-[11px] font-semibold text-slate-700 bg-white rounded-md border border-slate-300 hover:bg-slate-100 cursor-pointer inline-flex items-center gap-1 shadow-2xs"
                >
                  <Plus className="w-3 h-3" /> Simulate Add Certificate
                </button>
              </div>

              <div className="space-y-2">
                <span className="text-xs font-semibold text-slate-900 block">
                  Attached Verification Documents ({uploadedDocs.length})
                </span>
                <div className="divide-y divide-slate-100 border border-slate-200 rounded-xl bg-white">
                  {uploadedDocs.map((doc, idx) => (
                    <div key={idx} className="p-3 flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2">
                        <FileText className="w-4 h-4 text-blue-600" />
                        <span className="font-mono text-slate-700">{doc}</span>
                      </div>
                      <span className="text-[10px] text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                        VERIFIED
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Modal Actions */}
          <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
            {step > 1 ? (
              <button
                type="button"
                onClick={() => setStep(step - 1)}
                className="px-3.5 py-2 text-xs font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 flex items-center gap-1 cursor-pointer"
              >
                <ChevronLeft className="w-3.5 h-3.5" /> Back
              </button>
            ) : (
              <div></div>
            )}

            {step < 4 ? (
              <button
                type="button"
                onClick={() => setStep(step + 1)}
                className="px-4 py-2 text-xs font-semibold bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-1 shadow-xs cursor-pointer"
              >
                Next Step <ChevronRight className="w-3.5 h-3.5" />
              </button>
            ) : (
              <button
                type="submit"
                className="px-5 py-2 text-xs font-semibold bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-1.5 shadow-xs cursor-pointer"
              >
                <Check className="w-3.5 h-3.5 text-blue-200" /> Publish to AXIA Exchange
              </button>
            )}
          </div>

        </form>

      </div>
    </div>
  );
};
