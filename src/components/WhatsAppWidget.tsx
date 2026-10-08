import React, { useState } from 'react';
import { MessageCircle, X, Send, PhoneCall } from 'lucide-react';
import { BUSINESS_INFO, buildWhatsAppUrl } from '../data/electricalData';

const QUICK_PROMPTS = [
  'Emergency: Main DB breaker tripping / short circuit issue',
  'Estimate for Three-Phase DB Board & Voltage Protector setup',
  'Estimate for UPS / Hybrid Solar Inverter & changeover wiring',
  'Estimate for False Ceiling SMD lights or Inverter AC wiring',
];

export const WhatsAppWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [customMessage, setCustomMessage] = useState('');
  const chatLinkRef = React.useRef<HTMLAnchorElement>(null);

  const activeMessage =
    customMessage.trim().length > 0
      ? customMessage.trim()
      : 'Assalam-o-Alaikum Usama Electrical Services, I would like to book an electrician or get a PKR rate estimate.';

  return (
    <div
      className="fixed bottom-4 right-4 sm:bottom-5 sm:right-5 z-50 flex flex-col items-end max-w-[calc(100vw-2rem)]"
      onKeyDown={(e) => {
        if (e.key === 'Escape' && isOpen) {
          setIsOpen(false);
        }
      }}
    >
      {/* Expandable Quick Dispatch Drawer */}
      {isOpen && (
        <div
          className="mb-3 w-[calc(100vw-2rem)] max-w-sm sm:w-96 bg-white border border-slate-200 rounded-xl shadow-xl overflow-hidden transition-all duration-150"
          role="dialog"
          aria-label="WhatsApp Direct Booking"
        >
          <div className="bg-slate-900 text-white px-4 py-3.5 flex items-center justify-between gap-2">
            <div className="min-w-0">
              <p className="font-display text-sm font-bold text-white truncate">
                Usama Electrical — WhatsApp Desk
              </p>
              <p className="text-xs text-slate-300 mt-0.5 truncate">
                Fast response across DHA, Bahria Town & Main City Sectors
              </p>
            </div>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="p-1.5 text-slate-400 hover:text-white rounded-lg transition-colors cursor-pointer shrink-0"
              aria-label="Close WhatsApp window"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="p-3.5 sm:p-4 space-y-3 bg-slate-50">
            <p className="text-xs text-slate-600 leading-relaxed break-words">
              Select a quick inquiry below or type your issue to chat directly on WhatsApp (you can also share photos of your DB board or UPS in chat):
            </p>

            <div className="space-y-1.5">
              {QUICK_PROMPTS.map((prompt) => (
                <a
                  key={prompt}
                  href={buildWhatsAppUrl(`Assalam-o-Alaikum Usama Electrical Services — ${prompt}.`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full text-left px-3 py-2 text-xs font-medium text-slate-800 bg-white hover:bg-emerald-50 hover:text-emerald-900 border border-slate-200 rounded-lg transition-colors break-words"
                >
                  {prompt}
                </a>
              ))}
            </div>

            <div className="pt-2 border-t border-slate-200">
              <label htmlFor="wa-custom-input" className="block text-xs font-semibold text-slate-700 mb-1.5">
                Or write your electrical requirement:
              </label>
              <div className="flex items-center gap-2 min-w-0">
                <input
                  id="wa-custom-input"
                  type="text"
                  value={customMessage}
                  onChange={(e) => setCustomMessage(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      chatLinkRef.current?.click();
                    }
                  }}
                  placeholder="e.g. Need 2 Inverter AC lines..."
                  className="flex-1 min-w-0 px-3 py-2 text-xs bg-white border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-600"
                />
                <a
                  ref={chatLinkRef}
                  href={buildWhatsAppUrl(activeMessage)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-1.5 px-3 py-2 bg-emerald-700 hover:bg-emerald-600 text-white text-xs font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0"
                >
                  <span>Chat</span>
                  <Send className="w-3.5 h-3.5 shrink-0" />
                </a>
              </div>
            </div>

            <div className="pt-2 flex flex-wrap items-center justify-between gap-1 text-xs text-slate-500">
              <span>Direct Phone Call:</span>
              <a
                href={`tel:${BUSINESS_INFO.phoneTel}`}
                className="inline-flex items-center gap-1 font-mono-tabular font-semibold text-slate-800 hover:text-sky-700"
              >
                <PhoneCall className="w-3 h-3 shrink-0" />
                <span>{BUSINESS_INFO.phoneDisplay}</span>
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Primary Floating WhatsApp Trigger Button */}
      <div className="flex items-center gap-2 max-w-full">
        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-2.5 sm:py-3 bg-emerald-700 hover:bg-emerald-600 text-white text-xs sm:text-sm font-semibold rounded-full shadow-lg transition-transform duration-150 active:scale-95 cursor-pointer max-w-full overflow-hidden"
          aria-expanded={isOpen}
          aria-label="Chat with Usama Electrical Services on WhatsApp"
        >
          <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5 shrink-0" />
          <span className="truncate">WhatsApp Usama Electrical</span>
        </button>
      </div>
    </div>
  );
};
