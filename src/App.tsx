/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import {
  Menu,
  X,
  ArrowRight,
  MessageCircle,
  PhoneCall,
  CheckCircle2,
  AlertCircle,
  Calculator,
  MapPin,
  Clock,
  Mail,
} from 'lucide-react';
import {
  BUSINESS_INFO,
  HERO_IMAGE,
  EV_CHARGER_IMAGE,
  LIGHTING_IMAGE,
  ABOUT_ELECTRICIAN_IMAGE,
  SERVICES_LIST,
  CASE_STUDIES,
  INSPECTION_PROTOCOL,
  ServiceCategory,
  buildWhatsAppUrl,
} from './data/electricalData';
import { ResilientImage } from './components/ResilientImage';
import { ScopeEstimator } from './components/ScopeEstimator';
import { WhatsAppWidget } from './components/WhatsAppWidget';

interface ContactFormState {
  fullName: string;
  phone: string;
  email: string;
  address: string;
  serviceType: string;
  urgency: string;
  notes: string;
}

interface SubmittedReceipt extends ContactFormState {
  referenceId: string;
  submittedAt: string;
}

export default function App() {
  useEffect(() => {
    document.title = 'Usama Electrical Services';
  }, []);

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [serviceFilter, setServiceFilter] = useState<ServiceCategory>('all');
  const [estimatorServiceId, setEstimatorServiceId] = useState<string>('db-upgrade');

  const [formData, setFormData] = useState<ContactFormState>({
    fullName: '',
    phone: '',
    email: '',
    address: '',
    serviceType: 'Main Distribution Board (DB) & Three-Phase Load Balancing',
    urgency: 'Standard (1–2 Days)',
    notes: '',
  });

  const [formErrors, setFormErrors] = useState<Partial<Record<keyof ContactFormState, string>>>({});
  const [submittedReceipt, setSubmittedReceipt] = useState<SubmittedReceipt | null>(null);
  const [prefillBanner, setPrefillBanner] = useState<string | null>(null);

  const filteredServices =
    serviceFilter === 'all'
      ? SERVICES_LIST
      : SERVICES_LIST.filter((item) => item.category === serviceFilter);

  const handleSelectServiceForEstimator = (serviceId: string) => {
    setEstimatorServiceId(serviceId);
    const el = document.getElementById('scope-estimator');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  const handleTransferFromEstimator = (summary: {
    serviceId: string;
    serviceTitle: string;
    propertyType: string;
    supplyType: string;
    urgency: string;
    estimatedRange: string;
    notes: string;
  }) => {
    setFormData((prev) => ({
      ...prev,
      serviceType: summary.serviceTitle,
      urgency: summary.urgency,
      notes: prev.notes
        ? `${prev.notes}\n${summary.notes}`
        : summary.notes,
    }));
    setPrefillBanner(`Selected estimate applied: ${summary.serviceTitle} (${summary.estimatedRange})`);
    setSubmittedReceipt(null);
    const contactEl = document.getElementById('contact');
    if (contactEl) {
      contactEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const validateForm = (): boolean => {
    const errors: Partial<Record<keyof ContactFormState, string>> = {};
    if (!formData.fullName.trim() || formData.fullName.trim().length < 2) {
      errors.fullName = 'Please enter your full name.';
    }
    const cleanPhone = formData.phone.replace(/[^\d+]/g, '');
    if (cleanPhone.length < 10) {
      errors.phone = 'Please enter a valid Pakistani mobile or phone number (e.g. 0300-1234567).';
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formData.email.trim() && !emailRegex.test(formData.email.trim())) {
      errors.email = 'Please enter a valid email address.';
    }
    if (!formData.address.trim() || formData.address.trim().length < 4) {
      errors.address = 'Please provide your area, society, or street address (e.g. DHA Phase 5, Lahore).';
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    const refNumber = `UES-${Math.floor(100000 + Math.random() * 900000)}`;
    const now = new Date();
    const formattedTime = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    setSubmittedReceipt({
      ...formData,
      referenceId: refNumber,
      submittedAt: `Today at ${formattedTime}`,
    });
    setFormErrors({});
  };

  const buildFormWhatsAppMessage = () => {
    const lines = [
      'Assalam-o-Alaikum Usama Electrical Services, I would like to book an electrician:',
      `• Name: ${formData.fullName || 'Not specified'}`,
      `• Mobile: ${formData.phone || 'Not specified'}`,
      `• Location / Society: ${formData.address || 'Not specified'}`,
      `• Required Service: ${formData.serviceType}`,
      `• Visit Priority: ${formData.urgency}`,
    ];
    if (formData.notes.trim()) {
      lines.push(`• Details: ${formData.notes.trim()}`);
    }
    return buildWhatsAppUrl(lines.join('\n'));
  };

  return (
    <div className="min-h-screen w-full max-w-full overflow-x-clip flex flex-col bg-slate-50 text-slate-900 selection:bg-sky-600 selection:text-white">
      {/* Strict 3-Zone Top Bar Contract */}
      <header className="sticky top-0 z-40 w-full max-w-full bg-white/95 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-14 sm:h-16 flex items-center justify-between gap-2 sm:gap-4 min-w-0">
          {/* Zone 1: Single text element wordmark */}
          <a
            href="#home"
            className="font-display text-sm sm:text-base lg:text-xl font-bold tracking-tight text-slate-900 truncate min-w-0"
          >
            {BUSINESS_INFO.brandWordmark}
          </a>

          {/* Zone 2: 5 clean text navigation links */}
          <nav
            aria-label="Primary Navigation"
            className="hidden md:flex items-center gap-4 lg:gap-7 text-xs lg:text-sm font-medium text-slate-600 shrink-0"
          >
            <a
              href="#home"
              className="hover:text-slate-900 hover:underline underline-offset-4 transition-colors whitespace-nowrap"
            >
              Home
            </a>
            <a
              href="#services"
              className="hover:text-slate-900 hover:underline underline-offset-4 transition-colors whitespace-nowrap"
            >
              Services
            </a>
            <a
              href="#case-studies"
              className="hover:text-slate-900 hover:underline underline-offset-4 transition-colors whitespace-nowrap"
            >
              Projects
            </a>
            <a
              href="#about"
              className="hover:text-slate-900 hover:underline underline-offset-4 transition-colors whitespace-nowrap"
            >
              About
            </a>
            <a
              href="#contact"
              className="hover:text-slate-900 hover:underline underline-offset-4 transition-colors whitespace-nowrap"
            >
              Contact
            </a>
          </nav>

          {/* Zone 3: 1-2 primary actions */}
          <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
            <a
              href="#contact"
              className="hidden lg:inline-flex items-center justify-center px-4 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors whitespace-nowrap"
            >
              Book Electrician
            </a>
            <a
              href={buildWhatsAppUrl(
                'Assalam-o-Alaikum Usama Electrical Services, I would like to inquire about your electrical services and PKR rates.'
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-2.5 sm:px-3.5 py-1.5 sm:py-2 text-xs font-semibold text-white bg-emerald-700 hover:bg-emerald-600 rounded-lg transition-colors whitespace-nowrap"
            >
              <MessageCircle className="w-3.5 h-3.5 shrink-0" />
              <span>WhatsApp</span>
            </a>
            <button
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              className="md:hidden inline-flex items-center justify-center p-1.5 sm:p-2 text-slate-700 hover:text-slate-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900 cursor-pointer shrink-0"
              aria-expanded={mobileMenuOpen}
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Responsive Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-b border-slate-200 px-4 pt-2 pb-4 space-y-2 w-full max-w-full overflow-hidden">
            <nav className="flex flex-col space-y-1 text-sm font-medium text-slate-700">
              {[
                { label: 'Home', href: '#home' },
                { label: 'Services & PKR Rates', href: '#services' },
                { label: 'Recent Projects', href: '#case-studies' },
                { label: 'About Usama Electrical', href: '#about' },
                { label: 'Contact & Booking', href: '#contact' },
              ].map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-3 py-2.5 rounded-lg hover:bg-slate-100 text-slate-900 transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </nav>
            <div className="pt-2 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-2 gap-2">
              <a
                href={`tel:${BUSINESS_INFO.phoneTel}`}
                className="inline-flex items-center justify-center gap-2 py-2.5 px-3 text-xs font-mono-tabular font-semibold text-slate-900 bg-slate-100 rounded-lg truncate"
              >
                <PhoneCall className="w-3.5 h-3.5 shrink-0" />
                <span className="truncate">{BUSINESS_INFO.phoneDisplay}</span>
              </a>
              <a
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="inline-flex items-center justify-center py-2.5 px-3 text-xs font-semibold text-white bg-slate-900 rounded-lg truncate"
              >
                Book Online
              </a>
            </div>
          </div>
        )}
      </header>

      <main className="flex-1 w-full max-w-full overflow-x-clip">
        {/* 1. HERO SECTION (Proposition) */}
        <section id="home" className="scroll-mt-14 sm:scroll-mt-16 pt-8 pb-14 md:pt-14 md:pb-20 border-b border-slate-200 bg-white w-full max-w-full overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center min-w-0">
              {/* Left Column: Copy & Primary Conversion Action */}
              <div className="lg:col-span-6 space-y-5 sm:space-y-6 min-w-0">
                {/* Unboxed Metadata Line (Zero-Pill Discipline) */}
                <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-slate-500">
                  <span className="font-semibold text-slate-800">{BUSINESS_INFO.taglineMeta}</span>
                  <span aria-hidden="true">·</span>
                  <span>{BUSINESS_INFO.emergencyResponse}</span>
                </div>

                <h1 className="font-display text-2xl sm:text-4xl lg:text-[48px] font-bold text-slate-900 tracking-tight leading-[1.12] headline-balance break-words">
                  Reliable Residential, Commercial & Solar/UPS Electrical Services.
                </h1>

                <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-xl break-words">
                  From three-phase DB board load balancing and hybrid solar/UPS wiring to false ceiling SMD lights, Inverter AC lines, and deep copper earthing—we deliver neat, durable electrical work with upfront Pakistani Rupee (PKR) pricing.
                </p>

                {/* Quick Unboxed PKR Price Highlights */}
                <div className="pt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-600">
                  <span>Fault Visit from <strong className="font-mono-tabular text-slate-900">PKR 1,500</strong></span>
                  <span aria-hidden="true">·</span>
                  <span>AC Circuit <strong className="font-mono-tabular text-slate-900">PKR 2,500+</strong></span>
                  <span aria-hidden="true">·</span>
                  <span>UPS/Solar Wiring <strong className="font-mono-tabular text-slate-900">PKR 4,500+</strong></span>
                </div>

                {/* Primary & Secondary Action Pair */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-1 min-w-0">
                  <a
                    href="#contact"
                    className="inline-flex items-center justify-center gap-2 px-4 sm:px-6 py-3.5 text-xs sm:text-sm font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors text-center min-w-0"
                  >
                    <span className="truncate">Book Home or Office Visit</span>
                    <ArrowRight className="w-4 h-4 shrink-0" />
                  </a>
                  <a
                    href={buildWhatsAppUrl(
                      'Assalam-o-Alaikum Usama Electrical Services, I need an electrician for a home/office electrical job. Please share availability.'
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-4 sm:px-5 py-3.5 text-xs sm:text-sm font-semibold text-emerald-900 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-lg transition-colors text-center min-w-0"
                  >
                    <MessageCircle className="w-4 h-4 text-emerald-700 shrink-0" />
                    <span className="truncate">Chat on WhatsApp Now</span>
                  </a>
                </div>

                {/* Direct Phone & Coverage Area Metadata */}
                <div className="pt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-500">
                  <span>Direct Helpline:</span>
                  <a
                    href={`tel:${BUSINESS_INFO.phoneTel}`}
                    className="font-mono-tabular font-semibold text-slate-900 hover:text-sky-700 underline underline-offset-4"
                  >
                    {BUSINESS_INFO.phoneDisplay}
                  </a>
                  <span aria-hidden="true">·</span>
                  <span className="break-words">{BUSINESS_INFO.serviceArea}</span>
                </div>
              </div>

              {/* Right Column: Dominant 16:9 Focal Visual Carrier */}
              <div className="lg:col-span-6 min-w-0">
                <div className="relative rounded-xl overflow-hidden border border-slate-200 bg-slate-900 aspect-video w-full">
                  <ResilientImage
                    src={HERO_IMAGE}
                    alt="Senior technician at Usama Electrical Services inspecting a three-phase distribution board"
                    className="w-full h-full object-cover"
                    fallbackTitle="Main DB & Three-Phase Load Balancing"
                    fallbackSubtitle="Pure Copper Busbar & Voltage Protection"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent flex flex-col justify-end p-4 sm:p-6">
                    <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-1.5 sm:gap-2 text-white min-w-0">
                      <div className="min-w-0">
                        <p className="text-[11px] sm:text-xs text-slate-300 truncate">
                          Featured Installation · DHA Phase 6, Lahore
                        </p>
                        <p className="font-display text-xs sm:text-base font-semibold text-white mt-0.5 line-clamp-2 break-words">
                          Three-Phase DB Board Overhaul, Phase Balancing & Digital Voltage Protection
                        </p>
                      </div>
                      <span className="font-mono-tabular text-xs text-amber-300 shrink-0">
                        PKR 8,500 – 28,000
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quantitative Operational Metrics Bar (Hairline Divided) */}
            <div className="mt-12 pt-8 border-t border-slate-200 grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8 min-w-0">
              <div className="min-w-0">
                <div className="font-mono-tabular text-xl sm:text-3xl font-semibold text-slate-900">
                  3,200+
                </div>
                <p className="text-xs text-slate-500 mt-1 break-words">
                  Homes, Plazas & Offices Served Across Major Housing Societies
                </p>
              </div>
              <div className="min-w-0">
                <div className="font-mono-tabular text-xl sm:text-3xl font-semibold text-slate-900">
                  45 min
                </div>
                <p className="text-xs text-slate-500 mt-1 break-words">
                  Average Emergency Short-Circuit & Breaker Fault Arrival Time
                </p>
              </div>
              <div className="min-w-0">
                <div className="font-mono-tabular text-xl sm:text-3xl font-semibold text-slate-900">
                  99.9%
                </div>
                <p className="text-xs text-slate-500 mt-1 break-words">
                  Pure Copper Wiring (Pakistan Cables, Fast Cables & GM Cables)
                </p>
              </div>
              <div className="min-w-0">
                <div className="font-mono-tabular text-xl sm:text-3xl font-semibold text-slate-900">
                  100%
                </div>
                <p className="text-xs text-slate-500 mt-1 break-words">
                  Upfront PKR Rate Quotes Before Starting Any Repair or Wiring Job
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 2. CORE CAPABILITIES & SERVICES (Mechanism / Capabilities) */}
        <section id="services" className="scroll-mt-14 sm:scroll-mt-16 py-14 md:py-24 border-b border-slate-200 w-full max-w-full overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 sm:space-y-14">
            {/* Section Header + Interactive Filter Controls */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 min-w-0">
              <div className="max-w-2xl min-w-0">
                <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-slate-500 mb-2">
                  <span>Our Electrical Services & PKR Rate Guide</span>
                  <span aria-hidden="true">·</span>
                  <span>Transparent Pricing</span>
                </div>
                <h2 className="font-display text-2xl sm:text-4xl font-bold text-slate-900 tracking-tight headline-balance break-words">
                  Complete Electrical Solutions with Clear PKR Pricing.
                </h2>
              </div>

              {/* Interactive Segmented Filter Control */}
              <div
                role="tablist"
                aria-label="Filter electrical services by category"
                className="flex flex-wrap items-center gap-1 p-1 bg-slate-200/80 rounded-lg self-start md:self-auto max-w-full"
              >
                {(
                  [
                    { id: 'all', label: 'All Services' },
                    { id: 'ups-solar', label: 'DB & Backup Power' },
                    { id: 'residential', label: 'Residential' },
                    { id: 'commercial', label: 'Commercial' },
                  ] as const
                ).map((tab) => (
                  <button
                    key={tab.id}
                    type="button"
                    role="tab"
                    aria-selected={serviceFilter === tab.id}
                    onClick={() => setServiceFilter(tab.id)}
                    className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                      serviceFilter === tab.id
                        ? 'bg-white text-slate-900 shadow-xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Asymmetric Bento-Grid Highlighting Marquee Capabilities */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 min-w-0">
              {/* Marquee Card 1: 7 Columns */}
              <div className="lg:col-span-7 bg-white border border-slate-200 rounded-xl overflow-hidden flex flex-col justify-between min-w-0">
                <div className="grid grid-cols-1 md:grid-cols-12 min-w-0">
                  <div className="md:col-span-6 aspect-4/3 md:aspect-auto bg-slate-900 min-w-0">
                    <ResilientImage
                      src={EV_CHARGER_IMAGE}
                      alt="Heavy-duty distribution box and backup power changeover conduit installation"
                      className="w-full h-full object-cover"
                      fallbackTitle="UPS, Solar Inverter & DB Upgrades"
                      fallbackSubtitle="Single-Phase & Three-Phase Load Balancing"
                    />
                  </div>
                  <div className="md:col-span-6 p-5 sm:p-6 flex flex-col justify-between min-w-0">
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-slate-500 mb-2">
                        <span>Most Requested Service</span>
                        <span aria-hidden="true">·</span>
                        <span className="font-mono-tabular">1.5kW – 15kW Backup</span>
                      </div>
                      <h3 className="font-display text-lg font-bold text-slate-900 headline-balance break-words">
                        Three-Phase DB Dressing, UPS & Hybrid Solar Inverter Wiring
                      </h3>
                      <p className="text-sm text-slate-600 mt-2.5 leading-relaxed break-words">
                        We eliminate frequent breaker tripping and high electricity wastage by balancing your three-phase meter loads, installing digital voltage protectors, and separating UPS/Solar wiring loops.
                      </p>
                    </div>
                    <div className="pt-5 mt-5 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
                      <div className="min-w-0">
                        <span className="block text-xs text-slate-500">Typical PKR Range</span>
                        <span className="font-mono-tabular text-sm font-semibold text-slate-900">
                          PKR 4,500 – PKR 28,000
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleSelectServiceForEstimator('ups-solar-wiring')}
                        className="px-3.5 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors whitespace-nowrap cursor-pointer"
                      >
                        Calculate PKR Quote
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Secondary Card 2: 5 Columns */}
              <div className="lg:col-span-5 bg-white border border-slate-200 rounded-xl overflow-hidden flex flex-col justify-between min-w-0">
                <div className="aspect-4/3 bg-slate-900 max-h-52 overflow-hidden">
                  <ResilientImage
                    src={LIGHTING_IMAGE}
                    alt="Modern false ceiling warm LED rope light and SMD spotlight installation"
                    className="w-full h-full object-cover"
                    fallbackTitle="False Ceiling SMD & Chandelier Fitting"
                    fallbackSubtitle="3/29 & 7/29 Pure Copper Wiring"
                  />
                </div>
                <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between min-w-0">
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-slate-500 mb-1.5">
                      <span>Home Renovation & New Build</span>
                      <span aria-hidden="true">·</span>
                      <span className="font-mono-tabular">SMD & COB Lights</span>
                    </div>
                    <h3 className="font-display text-lg font-bold text-slate-900 headline-balance break-words">
                      False Ceiling SMD Lights, Rope Lighting & Switchboards
                    </h3>
                    <p className="text-sm text-slate-600 mt-2 leading-relaxed break-words">
                      Clean installation of warm/daylight ceiling lights, chandeliers, modern piano switch sheets, and dedicated 7/44 copper lines for Inverter ACs.
                    </p>
                  </div>
                  <div className="pt-4 mt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2">
                    <span className="font-mono-tabular text-sm font-semibold text-slate-900">
                      PKR 3,500 – PKR 22,000
                    </span>
                    <button
                      type="button"
                      onClick={() => handleSelectServiceForEstimator('ceiling-lighting')}
                      className="px-3.5 py-2 text-xs font-semibold text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors whitespace-nowrap cursor-pointer"
                    >
                      Calculate Lighting
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Numbered Editorial Service List (01 through 06) */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 min-w-0">
              {filteredServices.map((service) => (
                <article
                  key={service.id}
                  className="bg-white border border-slate-200 rounded-xl p-5 sm:p-6 flex flex-col justify-between min-w-0 overflow-hidden"
                >
                  <div className="min-w-0">
                    {/* Quiet 1-line unboxed metadata kicker */}
                    <div className="flex flex-wrap items-center justify-between gap-1 text-xs text-slate-500 mb-2.5">
                      <span>{service.categoryLabel}</span>
                      <span className="font-mono-tabular">{service.specTag}</span>
                    </div>

                    <h3 className="font-display text-base sm:text-lg font-bold text-slate-900 leading-snug headline-balance break-words">
                      {service.title}
                    </h3>

                    <p className="text-sm text-slate-600 mt-2.5 leading-relaxed break-words">
                      {service.summary}
                    </p>

                    <ul className="mt-4 pt-4 border-t border-slate-100 space-y-2 text-xs text-slate-700">
                      {service.deliverables.map((item) => (
                        <li key={item} className="flex items-start gap-2 min-w-0">
                          <span className="text-sky-600 font-bold select-none shrink-0">·</span>
                          <span className="break-words">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-200 space-y-3 min-w-0">
                    <div className="flex flex-wrap items-baseline justify-between gap-1">
                      <span className="text-xs text-slate-500">Estimated Rate (PKR)</span>
                      <span className="font-mono-tabular text-sm sm:text-base font-semibold text-slate-900">
                        {service.priceRange}
                      </span>
                    </div>
                    <div className="text-xs text-slate-500 flex flex-wrap items-center justify-between gap-1">
                      <span>Completion Time:</span>
                      <span className="font-mono-tabular text-slate-700">{service.typicalDuration}</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                      <button
                        type="button"
                        onClick={() => handleSelectServiceForEstimator(service.id)}
                        className="inline-flex items-center justify-center gap-1.5 py-2 px-3 text-xs font-semibold text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer min-w-0"
                      >
                        <Calculator className="w-3.5 h-3.5 shrink-0" />
                        <span className="truncate">Calculate PKR</span>
                      </button>
                      <a
                        href={buildWhatsAppUrl(
                          `Assalam-o-Alaikum Usama Electrical Services, I would like a quote for ${service.title.replace(/^\d+\.\s*/, '')} (${service.priceRange}).`
                        )}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-1.5 py-2 px-3 text-xs font-semibold text-emerald-900 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-lg transition-colors min-w-0"
                      >
                        <MessageCircle className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                        <span className="truncate">WhatsApp Quote</span>
                      </a>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            {/* Quick Reference Standard PKR Labor Rate Table */}
            <div className="bg-white border border-slate-200 rounded-xl p-5 sm:p-8 min-w-0 overflow-hidden">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 pb-5 border-b border-slate-200 min-w-0">
                <div className="min-w-0">
                  <p className="text-xs text-slate-500 mb-1 break-words">
                    Quick Reference Rate List · Standard Minor Jobs & Installations
                  </p>
                  <h3 className="font-display text-lg sm:text-xl font-bold text-slate-900 break-words">
                    Common Electrical Visit & Fitting Charges (PKR Examples)
                  </h3>
                </div>
                <span className="text-xs text-slate-500">
                  Final quote shared after on-site inspection
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-2 pt-5 text-xs sm:text-sm min-w-0">
                {[
                  { item: 'Standard Electrician Inspection / Fault Visit', rate: 'PKR 1,000 – 1,500' },
                  { item: 'Ceiling Fan Installation / Capacitor Replacement', rate: 'PKR 800 – 1,500' },
                  { item: 'Single Switchboard / Piano Sheet Replacement', rate: 'PKR 1,200 – 2,500' },
                  { item: 'Inverter AC Breaker & Power Plug Fitting', rate: 'PKR 1,800 – 3,500' },
                  { item: 'Digital High/Low Voltage Protector Installation', rate: 'PKR 2,000 – 3,500' },
                  { item: 'UPS / Generator Manual Changeover Switch', rate: 'PKR 2,200 – 4,000' },
                  { item: 'False Ceiling SMD / COB Light Fitting (Per Light)', rate: 'PKR 250 – 450' },
                  { item: 'Automatic Water Tank Float Switch Installation', rate: 'PKR 1,800 – 3,000' },
                  { item: 'Deep Bore Copper Earthing Pit (With Material)', rate: 'PKR 12,000 – 24,000' },
                ].map((row) => (
                  <div
                    key={row.item}
                    className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1 py-2.5 border-b border-slate-100 min-w-0"
                  >
                    <span className="text-slate-700 break-words min-w-0">{row.item}</span>
                    <span className="font-mono-tabular font-semibold text-slate-900 shrink-0">
                      {row.rate}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Interactive Upfront Scope & Load Estimator */}
            <div id="scope-estimator" className="scroll-mt-24 min-w-0">
              <ScopeEstimator
                selectedServiceId={estimatorServiceId}
                onSelectServiceId={setEstimatorServiceId}
                onTransferToContact={handleTransferFromEstimator}
              />
            </div>
          </div>
        </section>

        {/* 3. PROOF OF IMPACT & CASE STUDIES (Placed Immediately Adjacent to Capabilities) */}
        <section id="case-studies" className="scroll-mt-14 sm:scroll-mt-16 py-14 md:py-24 bg-white border-b border-slate-200 w-full max-w-full overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 min-w-0">
              <div className="max-w-2xl min-w-0">
                <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-slate-500 mb-2">
                  <span>Recent Work Across Pakistan</span>
                  <span aria-hidden="true">·</span>
                  <span>Verified Client Feedback</span>
                </div>
                <h2 className="font-display text-2xl sm:text-4xl font-bold text-slate-900 tracking-tight headline-balance break-words">
                  Completed Residential & Commercial Electrical Projects.
                </h2>
              </div>
              <p className="text-sm text-slate-600 max-w-md break-words">
                Every project is tested with digital clamp meters under full AC and backup load before handover.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 min-w-0">
              {CASE_STUDIES.map((study) => (
                <article
                  key={study.id}
                  className="bg-slate-50 border border-slate-200 rounded-xl p-5 sm:p-6 flex flex-col justify-between min-w-0 overflow-hidden"
                >
                  <div className="min-w-0">
                    {/* Unboxed Metadata with Middot Separators */}
                    <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-slate-500 mb-3">
                      <span className="font-mono-tabular font-semibold text-slate-800">
                        {study.index}
                      </span>
                      <span aria-hidden="true">·</span>
                      <span>{study.location}</span>
                      <span aria-hidden="true">·</span>
                      <span className="font-mono-tabular">{study.completionTime}</span>
                    </div>

                    <h3 className="font-display text-base sm:text-lg font-bold text-slate-900 leading-snug headline-balance break-words">
                      {study.title}
                    </h3>

                    {/* Quantified Outcome Block */}
                    <div className="my-4 py-3 px-4 bg-white border border-slate-200 rounded-lg min-w-0">
                      <div className="font-mono-tabular text-sm sm:text-base font-semibold text-sky-700 break-words">
                        {study.primaryMetric}
                      </div>
                      <p className="text-xs text-slate-600 mt-0.5 break-words">{study.metricContext}</p>
                    </div>

                    <p className="text-sm text-slate-600 leading-relaxed break-words">
                      {study.scopeSummary}
                    </p>
                  </div>

                  {/* Attributable Testimonial with Concrete Before/Change/Outcome */}
                  <blockquote className="mt-6 pt-5 border-t border-slate-200 min-w-0">
                    <p className="text-xs text-slate-700 italic leading-relaxed break-words">
                      "{study.testimonial.quote}"
                    </p>
                    <footer className="mt-3 text-xs text-slate-500 break-words">
                      <span className="font-semibold text-slate-900">
                        {study.testimonial.author}
                      </span>
                      <span aria-hidden="true"> · </span>
                      <span>{study.testimonial.role}</span>
                      <span aria-hidden="true"> · </span>
                      <span>{study.testimonial.organization}</span>
                    </footer>
                  </blockquote>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* 4. ABOUT & SAFETY PROTOCOL SECTION */}
        <section id="about" className="scroll-mt-14 sm:scroll-mt-16 py-14 md:py-24 border-b border-slate-200 bg-slate-50 w-full max-w-full overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14 sm:space-y-16">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center min-w-0">
              {/* Left Column: Documentary Portrait */}
              <div className="lg:col-span-5 min-w-0">
                <div className="rounded-xl overflow-hidden border border-slate-200 bg-slate-900 aspect-4/3 w-full">
                  <ResilientImage
                    src={ABOUT_ELECTRICIAN_IMAGE}
                    alt="Senior electrician at Usama Electrical Services testing a distribution board with a digital multimeter"
                    className="w-full h-full object-cover"
                    fallbackTitle="Muhammad Usama — Lead Electrical Specialist"
                    fallbackSubtitle="12+ Years Experience in Residential & Commercial Power"
                  />
                </div>
                <div className="mt-3 flex flex-wrap items-center justify-between gap-1 text-xs text-slate-500 px-1">
                  <span>Muhammad Usama, Founder & Lead Technician</span>
                  <span className="font-mono-tabular">12+ Years Field Experience</span>
                </div>
              </div>

              {/* Right Column: Standards & Local Trust Signals */}
              <div className="lg:col-span-7 space-y-5 min-w-0">
                <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-slate-500">
                  <span>About {BUSINESS_INFO.fullLegalName}</span>
                  <span aria-hidden="true">·</span>
                  <span>Serving Homes, Plazas & Offices</span>
                  <span aria-hidden="true">·</span>
                  <span>Trusted Local Team</span>
                </div>

                <h2 className="font-display text-2xl sm:text-4xl font-bold text-slate-900 tracking-tight headline-balance break-words">
                  Experienced Pakistani Electricians Dedicated to Safe, Neat Wiring.
                </h2>

                <p className="text-sm sm:text-base text-slate-600 leading-relaxed break-words">
                  Led by senior electrical specialist Muhammad Usama, <strong>Usama Electrical Services</strong> was founded to solve the most common electrical problems faced by Pakistani homeowners and businesses: overheating DB boards, unbalanced three-phase meters, high electricity bills from faulty wiring, and messy UPS/Solar connections.
                </p>

                <p className="text-sm text-slate-600 leading-relaxed break-words">
                  Our technicians arrive on time with digital clamp meters, insulation testers, drill machines, and genuine electrical accessories. Whether you need a single ceiling fan dimmer replaced, dedicated 7/44 copper lines for new Inverter ACs, or complete three-phase wiring for a new house or commercial showroom, we treat your property with care and respect.
                </p>

                {/* Unboxed Credential Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-slate-200 min-w-0">
                  <div className="min-w-0">
                    <div className="font-mono-tabular text-sm font-semibold text-slate-900">
                      99.9% Pure Copper
                    </div>
                    <p className="text-xs text-slate-500 mt-0.5 break-words">
                      We recommend and install genuine Pakistan Cables, Fast Cables & GM Cables
                    </p>
                  </div>
                  <div className="min-w-0">
                    <div className="font-mono-tabular text-sm font-semibold text-slate-900">
                      Original Breakers
                    </div>
                    <p className="text-xs text-slate-500 mt-0.5 break-words">
                      Genuine Schneider, Terasaki, and CNC MCB breakers & voltage protectors
                    </p>
                  </div>
                  <div className="min-w-0">
                    <div className="font-mono-tabular text-sm font-semibold text-slate-900">
                      Fair PKR Rates
                    </div>
                    <p className="text-xs text-slate-500 mt-0.5 break-words">
                      Clear labor and material estimates agreed upfront before starting work
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* 4-Step Inspection & Execution Protocol */}
            <div className="pt-8 border-t border-slate-200 min-w-0">
              <div className="mb-8 min-w-0">
                <p className="text-xs text-slate-500 mb-1">
                  How We Work · Every Home & Commercial Visit
                </p>
                <h3 className="font-display text-xl sm:text-2xl font-bold text-slate-900 break-words">
                  Our 4-Step Electrical Service Process
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 min-w-0">
                {INSPECTION_PROTOCOL.map((item) => (
                  <div
                    key={item.step}
                    className="bg-white border border-slate-200 rounded-xl p-5 min-w-0 overflow-hidden"
                  >
                    <h4 className="font-display text-base font-bold text-slate-900 mb-2 break-words">
                      {item.step}
                    </h4>
                    <p className="text-xs text-slate-600 leading-relaxed break-words">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 5. INTERACTIVE LEAD CAPTURE & CONTACT SECTION (Conversion / Action) */}
        <section id="contact" className="scroll-mt-14 sm:scroll-mt-16 py-14 md:py-24 bg-white w-full max-w-full overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 min-w-0">
              {/* Left Column: Direct Dispatch Details & WhatsApp Fast-Track */}
              <div className="lg:col-span-5 space-y-8 min-w-0">
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-slate-500 mb-2">
                    <span>Book an Electrician</span>
                    <span aria-hidden="true">·</span>
                    <span>Fast Response Across All Sectors</span>
                  </div>
                  <h2 className="font-display text-2xl sm:text-4xl font-bold text-slate-900 tracking-tight headline-balance break-words">
                    Book a Visit or Get an Instant Quote on WhatsApp.
                  </h2>
                  <p className="text-sm text-slate-600 mt-3 leading-relaxed break-words">
                    Fill out the booking form or send us a photo/video of your DB board, switchboard, or UPS on WhatsApp for a quick PKR estimate.
                  </p>
                </div>

                {/* Fast-Track WhatsApp Card */}
                <div className="bg-slate-900 text-white rounded-xl p-5 sm:p-6 space-y-4 min-w-0 overflow-hidden">
                  <div className="min-w-0">
                    <p className="text-xs text-emerald-400 font-semibold break-words">
                      Fastest Way to Get a Quote · Send DB / Wiring Photos
                    </p>
                    <h3 className="font-display text-lg font-bold text-white mt-1 break-words">
                      WhatsApp Photo & Voice-Note Support
                    </h3>
                    <p className="text-xs text-slate-300 mt-1.5 leading-relaxed break-words">
                      Send a photo of your main DB box, burnt breaker, or room ceiling along with a quick voice note on WhatsApp and get a response within 15 minutes.
                    </p>
                  </div>
                  <a
                    href={buildWhatsAppUrl(
                      'Assalam-o-Alaikum Usama Electrical Services, I want to share a photo/details of my electrical issue for a quick PKR estimate.'
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 py-3 px-3 sm:px-4 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold rounded-lg transition-colors text-center min-w-0"
                  >
                    <MessageCircle className="w-4 h-4 shrink-0" />
                    <span className="truncate">Open WhatsApp ({BUSINESS_INFO.phoneDisplay})</span>
                  </a>
                </div>

                {/* Contact Details List */}
                <div className="space-y-4 pt-2 border-t border-slate-200 text-sm min-w-0">
                  <div className="flex items-start gap-3 min-w-0">
                    <PhoneCall className="w-4 h-4 text-slate-500 mt-1 shrink-0" />
                    <div className="min-w-0">
                      <p className="text-xs text-slate-500">24/7 Mobile & WhatsApp Helpline</p>
                      <a
                        href={`tel:${BUSINESS_INFO.phoneTel}`}
                        className="font-mono-tabular font-semibold text-slate-900 hover:text-sky-700 break-all"
                      >
                        {BUSINESS_INFO.phoneDisplay}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 min-w-0">
                    <Mail className="w-4 h-4 text-slate-500 mt-1 shrink-0" />
                    <div className="min-w-0">
                      <p className="text-xs text-slate-500">Email for Commercial Quotations</p>
                      <a
                        href={`mailto:${BUSINESS_INFO.email}`}
                        className="font-mono-tabular font-semibold text-slate-900 hover:text-sky-700 break-all"
                      >
                        {BUSINESS_INFO.email}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 min-w-0">
                    <MapPin className="w-4 h-4 text-slate-500 mt-1 shrink-0" />
                    <div className="min-w-0">
                      <p className="text-xs text-slate-500">Main Office & Workshop</p>
                      <p className="text-slate-800 break-words">{BUSINESS_INFO.headquarters}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 min-w-0">
                    <Clock className="w-4 h-4 text-slate-500 mt-1 shrink-0" />
                    <div className="min-w-0">
                      <p className="text-xs text-slate-500">Working Hours</p>
                      <p className="text-slate-800 break-words">{BUSINESS_INFO.hours}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Validated Lead Capture Form */}
              <div className="lg:col-span-7 min-w-0">
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 sm:p-8 min-w-0 overflow-hidden">
                  {prefillBanner && !submittedReceipt && (
                    <div className="mb-6 p-3.5 bg-sky-50 border border-sky-200 rounded-lg flex flex-wrap items-center justify-between gap-2 text-xs text-sky-900 min-w-0">
                      <div className="flex items-center gap-2 min-w-0">
                        <CheckCircle2 className="w-4 h-4 text-sky-600 shrink-0" />
                        <span className="font-medium break-words">{prefillBanner}</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => setPrefillBanner(null)}
                        className="text-sky-700 hover:text-sky-950 font-semibold cursor-pointer shrink-0"
                      >
                        Dismiss
                      </button>
                    </div>
                  )}

                  {submittedReceipt ? (
                    <div className="bg-white border border-slate-200 rounded-xl p-5 sm:p-8 space-y-6 min-w-0 overflow-hidden">
                      <div className="flex items-start gap-3 min-w-0">
                        <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0 mt-0.5" />
                        <div className="min-w-0">
                          <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-slate-500">
                            <span className="font-mono-tabular font-semibold text-emerald-700">
                              Booking Ref #{submittedReceipt.referenceId}
                            </span>
                            <span aria-hidden="true">·</span>
                            <span>Received {submittedReceipt.submittedAt}</span>
                          </div>
                          <h3 className="font-display text-lg sm:text-xl font-bold text-slate-900 mt-1 break-words">
                            Electrician Booking Request Confirmed
                          </h3>
                          <p className="text-sm text-slate-600 mt-1 break-words">
                            Shukriya, {submittedReceipt.fullName}. Usama Electrical Services has received your request and will call or WhatsApp you at{' '}
                            <span className="font-mono-tabular font-semibold text-slate-900">
                              {submittedReceipt.phone}
                            </span>{' '}
                            within 20 minutes to confirm the technician's arrival time.
                          </p>
                        </div>
                      </div>

                      <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg space-y-2.5 text-xs min-w-0">
                        <div className="flex flex-col sm:flex-row sm:justify-between gap-0.5 sm:gap-2">
                          <span className="text-slate-500 shrink-0">Selected Service:</span>
                          <span className="font-semibold text-slate-900 sm:text-right break-words">{submittedReceipt.serviceType}</span>
                        </div>
                        <div className="flex flex-col sm:flex-row sm:justify-between gap-0.5 sm:gap-2">
                          <span className="text-slate-500 shrink-0">Visit Priority:</span>
                          <span className="font-semibold text-slate-900 sm:text-right break-words">{submittedReceipt.urgency}</span>
                        </div>
                        <div className="flex flex-col sm:flex-row sm:justify-between gap-0.5 sm:gap-2">
                          <span className="text-slate-500 shrink-0">Address / Area:</span>
                          <span className="font-semibold text-slate-900 sm:text-right break-words">{submittedReceipt.address}</span>
                        </div>
                        {submittedReceipt.notes && (
                          <div className="pt-2 border-t border-slate-200">
                            <span className="text-slate-500 block mb-1">Job Details & Estimate Notes:</span>
                            <p className="text-slate-800 whitespace-pre-line break-words">{submittedReceipt.notes}</p>
                          </div>
                        )}
                      </div>

                      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 min-w-0">
                        <a
                          href={buildWhatsAppUrl(
                            `Assalam-o-Alaikum Usama Electrical Services, following up on my booking Ref #${submittedReceipt.referenceId} (${submittedReceipt.serviceType}) at ${submittedReceipt.address}.`
                          )}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 inline-flex items-center justify-center gap-2 py-3 px-4 bg-emerald-700 hover:bg-emerald-600 text-white text-xs font-semibold rounded-lg transition-colors min-w-0"
                        >
                          <MessageCircle className="w-4 h-4 shrink-0" />
                          <span className="truncate">Send Booking #{submittedReceipt.referenceId} on WhatsApp</span>
                        </a>
                        <button
                          type="button"
                          onClick={() => setSubmittedReceipt(null)}
                          className="py-3 px-4 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer min-w-0"
                        >
                          Submit Another Request
                        </button>
                      </div>
                    </div>
                  ) : (
                    <form onSubmit={handleFormSubmit} noValidate className="space-y-5 min-w-0">
                      <div className="border-b border-slate-200 pb-4 min-w-0">
                        <h3 className="font-display text-lg font-bold text-slate-900 break-words">
                          Online Electrician Booking & Estimate Form
                        </h3>
                        <p className="text-xs text-slate-500 mt-0.5 break-words">
                          Enter your contact details and location below for a fast call-back and PKR quote.
                        </p>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 min-w-0">
                        <div className="min-w-0">
                          <label
                            htmlFor="fullName"
                            className="block text-xs font-semibold text-slate-700 mb-1.5"
                          >
                            Full Name *
                          </label>
                          <input
                            id="fullName"
                            type="text"
                            value={formData.fullName}
                            onChange={(e) => {
                              setFormData({ ...formData, fullName: e.target.value });
                              if (formErrors.fullName) setFormErrors({ ...formErrors, fullName: undefined });
                            }}
                            placeholder="e.g. Bilal Ahmed"
                            className={`w-full min-w-0 px-3.5 py-2.5 text-sm bg-white border rounded-lg text-slate-900 focus:outline-none focus:ring-2 transition-colors ${
                              formErrors.fullName
                                ? 'border-red-500 focus:ring-red-500'
                                : 'border-slate-200 focus:ring-sky-600'
                            }`}
                          />
                          {formErrors.fullName && (
                            <p className="mt-1 text-xs text-red-600 flex items-start gap-1">
                              <AlertCircle className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                              <span className="break-words">{formErrors.fullName}</span>
                            </p>
                          )}
                        </div>

                        <div className="min-w-0">
                          <label
                            htmlFor="phone"
                            className="block text-xs font-semibold text-slate-700 mb-1.5"
                          >
                            Mobile / WhatsApp Number *
                          </label>
                          <input
                            id="phone"
                            type="tel"
                            value={formData.phone}
                            onChange={(e) => {
                              setFormData({ ...formData, phone: e.target.value });
                              if (formErrors.phone) setFormErrors({ ...formErrors, phone: undefined });
                            }}
                            placeholder="e.g. 0300-1234567"
                            className={`w-full min-w-0 px-3.5 py-2.5 text-sm font-mono-tabular bg-white border rounded-lg text-slate-900 focus:outline-none focus:ring-2 transition-colors ${
                              formErrors.phone
                                ? 'border-red-500 focus:ring-red-500'
                                : 'border-slate-200 focus:ring-sky-600'
                            }`}
                          />
                          {formErrors.phone && (
                            <p className="mt-1 text-xs text-red-600 flex items-start gap-1">
                              <AlertCircle className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                              <span className="break-words">{formErrors.phone}</span>
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 min-w-0">
                        <div className="min-w-0">
                          <label
                            htmlFor="email"
                            className="block text-xs font-semibold text-slate-700 mb-1.5"
                          >
                            Email Address (Optional)
                          </label>
                          <input
                            id="email"
                            type="email"
                            value={formData.email}
                            onChange={(e) => {
                              setFormData({ ...formData, email: e.target.value });
                              if (formErrors.email) setFormErrors({ ...formErrors, email: undefined });
                            }}
                            placeholder="bilal@example.com"
                            className={`w-full min-w-0 px-3.5 py-2.5 text-sm bg-white border rounded-lg text-slate-900 focus:outline-none focus:ring-2 transition-colors ${
                              formErrors.email
                                ? 'border-red-500 focus:ring-red-500'
                                : 'border-slate-200 focus:ring-sky-600'
                            }`}
                          />
                          {formErrors.email && (
                            <p className="mt-1 text-xs text-red-600 flex items-start gap-1">
                              <AlertCircle className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                              <span className="break-words">{formErrors.email}</span>
                            </p>
                          )}
                        </div>

                        <div className="min-w-0">
                          <label
                            htmlFor="address"
                            className="block text-xs font-semibold text-slate-700 mb-1.5"
                          >
                            Area / Housing Society / Address *
                          </label>
                          <input
                            id="address"
                            type="text"
                            value={formData.address}
                            onChange={(e) => {
                              setFormData({ ...formData, address: e.target.value });
                              if (formErrors.address) setFormErrors({ ...formErrors, address: undefined });
                            }}
                            placeholder="e.g. House 42, Block K, DHA Phase 5"
                            className={`w-full min-w-0 px-3.5 py-2.5 text-sm bg-white border rounded-lg text-slate-900 focus:outline-none focus:ring-2 transition-colors ${
                              formErrors.address
                                ? 'border-red-500 focus:ring-red-500'
                                : 'border-slate-200 focus:ring-sky-600'
                            }`}
                          />
                          {formErrors.address && (
                            <p className="mt-1 text-xs text-red-600 flex items-start gap-1">
                              <AlertCircle className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                              <span className="break-words">{formErrors.address}</span>
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 min-w-0">
                        <div className="min-w-0">
                          <label
                            htmlFor="serviceType"
                            className="block text-xs font-semibold text-slate-700 mb-1.5"
                          >
                            Required Electrical Service
                          </label>
                          <select
                            id="serviceType"
                            value={formData.serviceType}
                            onChange={(e) => setFormData({ ...formData, serviceType: e.target.value })}
                            className="w-full max-w-full min-w-0 px-3 py-2.5 text-xs sm:text-sm bg-white border border-slate-200 rounded-lg text-slate-900 truncate focus:outline-none focus:ring-2 focus:ring-sky-600"
                          >
                            {SERVICES_LIST.map((s) => {
                              const cleanTitle = s.title.replace(/^\d+\.\s*/, '');
                              return (
                                <option key={s.id} value={cleanTitle}>
                                  {cleanTitle}
                                </option>
                              );
                            })}
                            <option value="General Electrical Inspection / Other">
                              General Electrical Inspection / Other
                            </option>
                          </select>
                        </div>

                        <div className="min-w-0">
                          <label
                            htmlFor="urgency"
                            className="block text-xs font-semibold text-slate-700 mb-1.5"
                          >
                            Preferred Visit Timing
                          </label>
                          <select
                            id="urgency"
                            value={formData.urgency}
                            onChange={(e) => setFormData({ ...formData, urgency: e.target.value })}
                            className="w-full max-w-full min-w-0 px-3 py-2.5 text-xs sm:text-sm bg-white border border-slate-200 rounded-lg text-slate-900 truncate focus:outline-none focus:ring-2 focus:ring-sky-600"
                          >
                            <option value="Standard (1–2 Days)">Standard (1–2 Days)</option>
                            <option value="Same-Day Visit">Same-Day Visit</option>
                            <option value="24/7 Emergency">
                              24/7 Emergency Fault Visit
                            </option>
                          </select>
                        </div>
                      </div>

                      <div className="min-w-0">
                        <label
                          htmlFor="notes"
                          className="block text-xs font-semibold text-slate-700 mb-1.5"
                        >
                          Work Details or Fault Description (Optional)
                        </label>
                        <textarea
                          id="notes"
                          rows={3}
                          value={formData.notes}
                          onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                          placeholder="Mention number of AC points, DB board issue, UPS/Solar inverter size, or ceiling lights needed..."
                          className="w-full min-w-0 px-3.5 py-2.5 text-sm bg-white border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-600"
                        />
                      </div>

                      <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 min-w-0">
                        <button
                          type="submit"
                          className="flex-1 inline-flex items-center justify-center gap-2 py-3.5 px-4 sm:px-6 text-xs sm:text-sm font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors cursor-pointer min-w-0"
                        >
                          <span className="truncate">Confirm Electrician Booking</span>
                          <ArrowRight className="w-4 h-4 shrink-0" />
                        </button>
                        <a
                          href={buildFormWhatsAppMessage()}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center gap-2 py-3.5 px-4 sm:px-5 text-xs sm:text-sm font-semibold text-emerald-900 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-lg transition-colors min-w-0"
                        >
                          <MessageCircle className="w-4 h-4 text-emerald-700 shrink-0" />
                          <span className="truncate">Send Details via WhatsApp</span>
                        </a>
                      </div>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* 6. QUIET FOOTER */}
      <footer className="bg-slate-900 text-slate-400 border-t border-slate-800 py-12 w-full max-w-full overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 min-w-0">
            <div className="min-w-0">
              <a
                href="#home"
                className="font-display text-lg font-bold tracking-tight text-white break-words"
              >
                {BUSINESS_INFO.brandWordmark}
              </a>
              <p className="text-xs text-slate-400 mt-1 break-words">
                {BUSINESS_INFO.taglineMeta} · {BUSINESS_INFO.serviceArea}
              </p>
            </div>

            <nav aria-label="Footer Navigation" className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs font-medium text-slate-300">
              <a href="#home" className="hover:text-white transition-colors">
                Home
              </a>
              <a href="#services" className="hover:text-white transition-colors">
                Services & PKR Rates
              </a>
              <a href="#scope-estimator" className="hover:text-white transition-colors">
                PKR Rate Calculator
              </a>
              <a href="#case-studies" className="hover:text-white transition-colors">
                Projects
              </a>
              <a href="#about" className="hover:text-white transition-colors">
                About
              </a>
              <a href="#contact" className="hover:text-white transition-colors">
                Contact
              </a>
            </nav>
          </div>

          <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-slate-500 min-w-0">
            <p className="break-words">
              © {new Date().getFullYear()} {BUSINESS_INFO.fullLegalName}. All rights reserved.
            </p>
            <p className="break-words">
              {BUSINESS_INFO.headquarters} · {BUSINESS_INFO.phoneDisplay}
            </p>
          </div>
        </div>
      </footer>

      {/* Floating Mobile-Friendly WhatsApp Button & Quick Dispatch Popover */}
      <WhatsAppWidget />
    </div>
  );
}
