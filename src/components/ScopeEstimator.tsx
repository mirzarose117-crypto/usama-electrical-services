import React, { useState } from 'react';
import { ArrowRight, MessageCircle, Check } from 'lucide-react';
import { SERVICES_LIST, buildWhatsAppUrl } from '../data/electricalData';

interface ScopeEstimatorProps {
  selectedServiceId: string;
  onSelectServiceId: (id: string) => void;
  onTransferToContact: (summary: {
    serviceId: string;
    serviceTitle: string;
    propertyType: string;
    supplyType: string;
    urgency: string;
    estimatedRange: string;
    notes: string;
  }) => void;
}

export const ScopeEstimator: React.FC<ScopeEstimatorProps> = ({
  selectedServiceId,
  onSelectServiceId,
  onTransferToContact,
}) => {
  const [propertyType, setPropertyType] = useState<'Residential' | 'Commercial'>('Residential');
  const [supplyType, setSupplyType] = useState<'Single-Phase' | 'Three-Phase' | 'UPS / Solar' | 'Unsure'>('Three-Phase');
  const [urgency, setUrgency] = useState<'Standard (1–2 Days)' | 'Same-Day Visit' | '24/7 Emergency'>('Standard (1–2 Days)');
  const [conduitRun, setConduitRun] = useState<'Under 30 ft' | '30–80 ft' | 'Over 80 ft'>('Under 30 ft');

  const activeService = SERVICES_LIST.find((s) => s.id === selectedServiceId) || SERVICES_LIST[0];

  // Calculate realistic upfront PKR estimate range based on selected parameters
  let multiplier = 1.0;
  if (propertyType === 'Commercial') multiplier += 0.25;
  if (conduitRun === '30–80 ft') multiplier += 0.15;
  if (conduitRun === 'Over 80 ft') multiplier += 0.3;
  if (urgency === 'Same-Day Visit') multiplier += 0.1;
  if (urgency === '24/7 Emergency') multiplier += 0.2;

  const minEstimate = Math.round((activeService.baseMinPrice * multiplier) / 500) * 500;
  const maxEstimate = Math.round((activeService.baseMaxPrice * multiplier) / 500) * 500;
  const estimatedRange = `PKR ${minEstimate.toLocaleString()} – PKR ${maxEstimate.toLocaleString()}`;

  const loadAdvisory =
    supplyType === 'Single-Phase' && (activeService.id === 'db-upgrade' || activeService.id === 'commercial-wiring')
      ? 'Single-phase meter selected: Includes load check & voltage protector recommendation for heavy AC usage.'
      : `Configured for ${supplyType} setup · Includes digital clamp-meter load check & pure copper thimbling.`;

  const whatsappText = `Assalam-o-Alaikum Usama Electrical Services, I would like an estimate for:\n• Service: ${activeService.title.replace(/^\d+\.\s*/, '')}\n• Property: ${propertyType}\n• Supply / Meter: ${supplyType}\n• Wire / Conduit Length: ${conduitRun}\n• Visit Timing: ${urgency}\n• Online Estimate Range: ${estimatedRange}`;

  const handleApplyToForm = () => {
    onTransferToContact({
      serviceId: activeService.id,
      serviceTitle: activeService.title.replace(/^\d+\.\s*/, ''),
      propertyType,
      supplyType,
      urgency,
      estimatedRange,
      notes: `Estimated Range: ${estimatedRange} (${propertyType}, ${supplyType} supply, ${conduitRun} wiring run, ${urgency}).`,
    });
  };

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-4 sm:p-6 md:p-8 w-full max-w-full overflow-hidden">
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 pb-6 border-b border-slate-200 min-w-0">
        <div className="min-w-0">
          <p className="text-xs text-slate-500 mb-1 break-words">
            Interactive Upfront PKR Pricing Calculator · Instant Load & Wiring Estimate
          </p>
          <h3 className="font-display text-lg sm:text-xl md:text-2xl font-bold text-slate-900 headline-balance break-words">
            Calculate Your Electrical Work Estimate in PKR
          </h3>
        </div>
        <p className="text-xs text-slate-500 max-w-md break-words">
          Select your service, meter type, and wiring requirements below to view a transparent PKR price range before booking an electrician.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 pt-6 min-w-0">
        {/* Left Controls: 7 cols */}
        <div className="lg:col-span-7 space-y-5 min-w-0">
          {/* 1. Service Selection */}
          <div className="min-w-0">
            <label htmlFor="estimator-service" className="block text-xs font-semibold text-slate-700 mb-2">
              1. Select Primary Electrical Service
            </label>
            <select
              id="estimator-service"
              value={activeService.id}
              onChange={(e) => onSelectServiceId(e.target.value)}
              className="w-full max-w-full min-w-0 px-3 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-lg text-slate-900 truncate focus:outline-none focus:ring-2 focus:ring-sky-600 focus:bg-white transition-colors"
            >
              {SERVICES_LIST.map((service) => (
                <option key={service.id} value={service.id}>
                  {service.title} ({service.priceRange})
                </option>
              ))}
            </select>
          </div>

          {/* 2. Property Type & Meter Supply Type */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 min-w-0">
            <div className="min-w-0">
              <span className="block text-xs font-semibold text-slate-700 mb-2">
                2. Property Type
              </span>
              <div className="grid grid-cols-2 gap-1.5 p-1 bg-slate-100 rounded-lg">
                {(['Residential', 'Commercial'] as const).map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setPropertyType(type)}
                    className={`py-2 px-2 text-xs font-semibold rounded-md transition-colors truncate cursor-pointer ${
                      propertyType === type
                        ? 'bg-white text-slate-900 shadow-xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            <div className="min-w-0">
              <span className="block text-xs font-semibold text-slate-700 mb-2">
                3. Meter / Power Supply Type
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-1 p-1 bg-slate-100 rounded-lg">
                {(['Single-Phase', 'Three-Phase', 'UPS / Solar', 'Unsure'] as const).map((supply) => (
                  <button
                    key={supply}
                    type="button"
                    onClick={() => setSupplyType(supply)}
                    className={`py-2 px-1.5 text-xs font-semibold rounded-md transition-colors truncate cursor-pointer ${
                      supplyType === supply
                        ? 'bg-white text-slate-900 shadow-xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                    title={supply}
                  >
                    {supply === 'Single-Phase'
                      ? '1-Phase'
                      : supply === 'Three-Phase'
                        ? '3-Phase'
                        : supply === 'UPS / Solar'
                          ? 'Solar/UPS'
                          : 'Unsure'}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* 3. Cable Run & Visit Schedule */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 min-w-0">
            <div className="min-w-0">
              <span className="block text-xs font-semibold text-slate-700 mb-2">
                4. Approximate Wire / Conduit Length
              </span>
              <div className="grid grid-cols-3 gap-1 p-1 bg-slate-100 rounded-lg">
                {(['Under 30 ft', '30–80 ft', 'Over 80 ft'] as const).map((dist) => (
                  <button
                    key={dist}
                    type="button"
                    onClick={() => setConduitRun(dist)}
                    className={`py-2 px-1 text-[11px] sm:text-xs font-semibold rounded-md transition-colors truncate cursor-pointer ${
                      conduitRun === dist
                        ? 'bg-white text-slate-900 shadow-xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                    title={dist}
                  >
                    {dist}
                  </button>
                ))}
              </div>
            </div>

            <div className="min-w-0">
              <span className="block text-xs font-semibold text-slate-700 mb-2">
                5. Visit Priority
              </span>
              <div className="grid grid-cols-3 gap-1 p-1 bg-slate-100 rounded-lg">
                {(['Standard (1–2 Days)', 'Same-Day Visit', '24/7 Emergency'] as const).map((tier) => (
                  <button
                    key={tier}
                    type="button"
                    onClick={() => setUrgency(tier)}
                    className={`py-2 px-1 text-[11px] sm:text-xs font-semibold rounded-md transition-colors truncate cursor-pointer ${
                      urgency === tier
                        ? 'bg-white text-slate-900 shadow-xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                    title={tier}
                  >
                    {tier === 'Standard (1–2 Days)' ? 'Standard' : tier === 'Same-Day Visit' ? 'Same-Day' : 'Emergency'}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Output Summary: 5 cols */}
        <div className="lg:col-span-5 flex flex-col justify-between bg-slate-900 text-white rounded-lg p-4 sm:p-6 min-w-0 overflow-hidden">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-slate-400 pb-3 border-b border-slate-800">
              <span>Estimated PKR Range</span>
              <span className="font-mono-tabular">{activeService.specTag}</span>
            </div>

            <div className="my-5 min-w-0">
              <div className="font-mono-tabular text-xl sm:text-2xl md:text-3xl font-semibold text-white tracking-tight break-words">
                {estimatedRange}
              </div>
              <p className="text-xs text-slate-300 mt-2 leading-relaxed break-words">
                {loadAdvisory}
              </p>
            </div>

            <div className="space-y-2.5 pt-3 border-t border-slate-800 text-xs text-slate-300">
              <div className="flex flex-wrap items-center justify-between gap-1">
                <span className="text-slate-400">Typical Completion Time:</span>
                <span className="font-mono-tabular text-white">{activeService.typicalDuration}</span>
              </div>
              <div className="flex flex-wrap items-center justify-between gap-1">
                <span className="text-slate-400">Recommended Setup:</span>
                <span className="font-mono-tabular text-white">{activeService.recommendedSupply}</span>
              </div>
              <div className="flex flex-wrap items-center justify-between gap-1">
                <span className="text-slate-400">Service Guarantee:</span>
                <span className="font-mono-tabular text-emerald-400 inline-flex items-center gap-1">
                  <Check className="w-3.5 h-3.5 shrink-0" />
                  <span>Verified Workmanship Warranty</span>
                </span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mt-6 pt-4 border-t border-slate-800">
            <button
              type="button"
              onClick={handleApplyToForm}
              className="flex items-center justify-center gap-2 py-2.5 px-3 bg-sky-600 hover:bg-sky-500 text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer min-w-0"
            >
              <span className="truncate">Apply to Booking Form</span>
              <ArrowRight className="w-3.5 h-3.5 shrink-0" />
            </button>
            <a
              href={buildWhatsAppUrl(whatsappText)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 py-2.5 px-3 bg-emerald-700 hover:bg-emerald-600 text-white text-xs font-semibold rounded-lg transition-colors min-w-0"
            >
              <MessageCircle className="w-3.5 h-3.5 shrink-0" />
              <span className="truncate">Send on WhatsApp</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
