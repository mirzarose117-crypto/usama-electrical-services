export type ServiceCategory = 'all' | 'residential' | 'commercial' | 'ups-solar';

export interface ElectricalService {
  id: string;
  number: string;
  title: string;
  category: Exclude<ServiceCategory, 'all'>;
  categoryLabel: string;
  summary: string;
  deliverables: string[];
  specTag: string;
  typicalDuration: string;
  priceRange: string;
  baseMinPrice: number;
  baseMaxPrice: number;
  recommendedSupply: string;
}

export interface CaseStudy {
  id: string;
  index: string;
  title: string;
  location: string;
  propertyType: string;
  completionTime: string;
  primaryMetric: string;
  metricContext: string;
  scopeSummary: string;
  testimonial: {
    quote: string;
    author: string;
    role: string;
    organization: string;
  };
}

export const BUSINESS_INFO = {
  brandWordmark: 'Usama Electrical Services',
  fullLegalName: 'Usama Electrical Services',
  taglineMeta: 'Residential, Commercial & Solar/UPS Electrical Specialists',
  phoneDisplay: '+92 300 8459210',
  phoneTel: '+923008459210',
  whatsappNumber: '923008459210',
  email: 'info@usamaelectrical.pk',
  serviceArea: 'DHA, Bahria Town, Gulberg, Johar Town & Surrounding Areas',
  headquarters: 'Office 14, Ground Floor, Commercial Market, DHA Phase 6, Lahore',
  emergencyResponse: '45-Min Rapid Fault & Short-Circuit Response',
  hours: 'Mon–Sun 08:00 AM – 10:00 PM · 24/7 Emergency Fault Support',
};

export const HERO_IMAGE = '/src/assets/images/hero_electrician_panel_1791449323935.jpg';
export const EV_CHARGER_IMAGE = '/src/assets/images/service_ev_charger_1791449337480.jpg';
export const LIGHTING_IMAGE = '/src/assets/images/service_architectural_lighting_1791449348596.jpg';
export const ABOUT_ELECTRICIAN_IMAGE = '/src/assets/images/about_master_electrician_1791449359112.jpg';

export const SERVICES_LIST: ElectricalService[] = [
  {
    id: 'db-upgrade',
    number: '01',
    title: '01. Main Distribution Board (DB) & Three-Phase Load Balancing',
    category: 'ups-solar',
    categoryLabel: 'DB & Backup Power',
    summary:
      'Complete replacement and neat dressing of overloaded single-phase and three-phase Distribution Boards (DBs) with original Schneider or Terasaki breakers, earth-leakage protection, and digital high/low voltage protectors.',
    deliverables: [
      'Balanced load distribution across all 3 phases to stop main breaker tripping',
      'Digital over-voltage and under-voltage protector relay installation for grid fluctuations',
      'Pure copper busbar dressing with clear circuit labeling for every room and AC line',
    ],
    specTag: 'Single & 3-Phase DB',
    typicalDuration: '4–6 hours (same-day completion)',
    priceRange: 'PKR 8,500 – PKR 28,000',
    baseMinPrice: 8500,
    baseMaxPrice: 28000,
    recommendedSupply: 'Three-Phase Supply',
  },
  {
    id: 'ups-solar-wiring',
    number: '02',
    title: '02. UPS, Hybrid Solar Inverter & Automatic Changeover Wiring',
    category: 'ups-solar',
    categoryLabel: 'DB & Backup Power',
    summary:
      'Dedicated AC/DC wiring for 1.5kW to 15kW hybrid solar inverters and home UPS systems, separating light/fan backup loops from heavy AC and geyser loads with heavy-duty changeover switches.',
    deliverables: [
      'Separate single-wire UPS/Solar backup circuit loop for lights, fans, and Wi-Fi routers',
      'Heavy-duty magnetic contactor and manual/automatic changeover switch installation',
      'Dedicated DC breaker box, surge arrestor, and battery bank copper thimbling',
    ],
    specTag: '1.5kW – 15kW Systems',
    typicalDuration: '3–5 hours',
    priceRange: 'PKR 4,500 – PKR 18,000',
    baseMinPrice: 4500,
    baseMaxPrice: 18000,
    recommendedSupply: 'Single or 3-Phase',
  },
  {
    id: 'ceiling-lighting',
    number: '03',
    title: '03. False Ceiling SMD Lights, Chandeliers & House Wiring',
    category: 'residential',
    categoryLabel: 'Residential',
    summary:
      'Modern false ceiling COB/SMD downlights, warm LED rope and profile strip lighting, chandelier installation, modular switchboard upgrades, and complete concealed house wiring.',
    deliverables: [
      'Pure copper 3/29 and 7/29 wiring (Pakistan Cables / Fast Cables / GM Cables)',
      'Precision cutting and fitting of warm/daylight SMD ceiling lights and rope lights',
      'Modern piano switchboards, fan dimmers, and outdoor boundary wall security lights',
    ],
    specTag: '3/29 & 7/29 Copper',
    typicalDuration: '3–8 hours',
    priceRange: 'PKR 3,500 – PKR 22,000',
    baseMinPrice: 3500,
    baseMaxPrice: 22000,
    recommendedSupply: 'Standard Domestic',
  },
  {
    id: 'commercial-wiring',
    number: '04',
    title: '04. Commercial Plaza, Showroom & Office Electrical Fit-Out',
    category: 'commercial',
    categoryLabel: 'Commercial',
    summary:
      'Complete electrical contracting for retail shops, restaurants, clinics, and corporate offices including three-phase sub-panels, PVC ducting/cable trays, workstation sockets, and generator ATS panels.',
    deliverables: [
      'Surface and concealed conduit/trunking runs for workstations and commercial machinery',
      'Automatic Transfer Switch (ATS) panel setup for standby generators and online UPS',
      'High-lumen commercial panel lights, track spotlights, and phase-indicator distribution boards',
    ],
    specTag: '3-Phase 400V Commercial',
    typicalDuration: '1–3 days (after-hours work available)',
    priceRange: 'PKR 25,000 – PKR 95,000',
    baseMinPrice: 25000,
    baseMaxPrice: 95000,
    recommendedSupply: '3-Phase Commercial',
  },
  {
    id: 'ac-appliance-circuits',
    number: '05',
    title: '05. Inverter AC Circuits, Geyser & Water Motor Wiring',
    category: 'residential',
    categoryLabel: 'Residential',
    summary:
      'Dedicated 7/36 and 7/44 pure copper power lines with independent two-pole MCB breakers for 1.5-ton & 2-ton Inverter ACs, electric geysers, kitchen ovens, and automatic water tank motors.',
    deliverables: [
      'Direct DB-to-AC copper line installation to prevent melted sockets and voltage drop',
      'Automatic water tank float switch installation for overhead and underground water pumps',
      'Heavy-duty 20A/32A power plugs and dedicated two-pole safety breakers',
    ],
    specTag: '7/36 & 7/44 Copper Line',
    typicalDuration: '2–4 hours',
    priceRange: 'PKR 2,500 – PKR 9,500',
    baseMinPrice: 2500,
    baseMaxPrice: 9500,
    recommendedSupply: '20A–32A Dedicated Breaker',
  },
  {
    id: 'fault-earthing',
    number: '06',
    title: '06. 24/7 Emergency Fault Tracing, Short Circuit & Copper Earthing',
    category: 'residential',
    categoryLabel: 'Residential',
    summary:
      'Rapid troubleshooting for tripping main breakers, burnt neutral wires, phase loss, electric current leakage in wet walls or plumbing taps, and deep copper rod earthing pit installation.',
    deliverables: [
      'Digital clamp-meter and insulation testing to pinpoint hidden wall short circuits',
      'On-spot replacement of burnt main breakers, melted changeover switches, and faulty sockets',
      'Deep copper rod chemical earthing bore to protect solar inverters and household appliances',
    ],
    specTag: 'Rapid Fault Recovery',
    typicalDuration: '1–2 hours',
    priceRange: 'PKR 1,500 – PKR 6,500',
    baseMinPrice: 1500,
    baseMaxPrice: 6500,
    recommendedSupply: 'All Meter Types',
  },
];

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: 'case-1',
    index: 'Project 01',
    title: 'Three-Phase DB Overhaul, Voltage Protection & 10kW Hybrid Solar Inverter Wiring',
    location: 'DHA Phase 6, Lahore',
    propertyType: '1 Kanal Residence',
    completionTime: 'Completed in 6 Hours',
    primaryMetric: '100% Balanced 3-Phase Load + Surge Defense',
    metricContext: 'Eliminated frequent main breaker tripping when running 4 Inverter ACs simultaneously',
    scopeSummary:
      'Replaced a tangled, overheating distribution board with a clean 3-phase Schneider DB, installed digital high/low voltage protectors on all three phases, and separated heavy AC loads from the 10kW solar inverter backup loop.',
    testimonial: {
      quote:
        'Previously, our main breaker tripped every afternoon when two ACs and the water motor ran together, and tangled wires inside the DB were heating up. Usama and his team re-dressed the entire DB with pure copper jumpers, balanced the three phases, and labeled every breaker neatly in a single day.',
      author: 'Tariq Mahmood',
      role: 'Homeowner',
      organization: 'DHA Phase 6, Lahore',
    },
  },
  {
    id: 'case-2',
    index: 'Project 02',
    title: 'Commercial Three-Phase Distribution, Copper Earthing & SMD Lighting Retrofit',
    location: 'Gulberg III, Lahore',
    propertyType: '3,800 sq ft Diagnostic Clinic & Office',
    completionTime: 'Completed Over 1 Weekend',
    primaryMetric: '-35% Monthly Electricity Units (PKR 42,000/mo Saved)',
    metricContext: 'Zero clinic working hours lost during full lighting and sub-panel upgrade',
    scopeSummary:
      'Installed a dedicated sub-panel with deep copper earthing for sensitive lab analyzers and replaced 70 old tube rods and choke fittings with high-lumen warm/daylight SMD ceiling panels and an automatic generator changeover system.',
    testimonial: {
      quote:
        'Our diagnostic machinery required stable, properly earthed power and seamless generator switching during load-shedding. Usama Electrical Services completed the entire wiring and SMD lighting upgrade over the weekend so our clinic opened Monday morning on schedule.',
      author: 'Dr. Kamran Siddiqui',
      role: 'Medical Director',
      organization: 'Siddiqui Diagnostic Centre',
    },
  },
  {
    id: 'case-3',
    index: 'Project 03',
    title: 'Complete UPS Wiring Separation, 3 Dedicated Inverter AC Lines & Earthing Pit',
    location: 'Bahria Town, Lahore',
    propertyType: '10 Marla Residence',
    completionTime: 'Completed in 5 Hours',
    primaryMetric: '3 Dedicated 7/44 Copper AC Circuits + Earthing',
    metricContext: 'Resolved voltage drop and appliance static current across the entire house',
    scopeSummary:
      'Pulled dedicated 7/44 pure copper circuits from the main DB for three 1.5-ton Inverter ACs, isolated the house UPS wiring from heavy kitchen sockets, and installed a 60-foot deep copper earthing pit.',
    testimonial: {
      quote:
        'Our UPS battery was draining fast because previous wiring mixed power sockets with backup lights, and our kitchen appliances had a mild static shock. Usama traced every circuit, separated the UPS points cleanly, and completed proper copper earthing at a very fair PKR rate.',
      author: 'Faisal Raza',
      role: 'Property Owner',
      organization: 'Bahria Town Sector C',
    },
  },
];

export const INSPECTION_PROTOCOL = [
  {
    step: '01. Clamp-Meter & Load Check',
    description:
      'Every visit starts with digital voltage, ampere, and phase-balance testing on your main DB board to identify loose neutral wires, overheating breakers, or earth leakage before quoting.',
  },
  {
    step: '02. Clear Upfront PKR Estimate',
    description:
      'You receive a clear breakdown of labor charges and material requirements (wire gauge, breaker ratings, and cable lengths) with zero hidden charges before work begins.',
  },
  {
    step: '03. 99.9% Pure Copper Craftsmanship',
    description:
      'We work exclusively with trusted Pakistani cable brands (Pakistan Cables, Fast Cables, GM Cables) and original MCB breakers, using proper copper thimbles and neat conduit dressing.',
  },
  {
    step: '04. Full Load Test & Service Warranty',
    description:
      'We test your ACs, UPS/Solar changeover, and voltage protectors under full load, clean the work area thoroughly, and back our electrical workmanship with a written service guarantee.',
  },
];

export function buildWhatsAppUrl(message: string): string {
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${BUSINESS_INFO.whatsappNumber}?text=${encoded}`;
}
