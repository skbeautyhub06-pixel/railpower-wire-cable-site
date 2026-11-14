/**
 * Central Configuration File for RAILPOWER WIRE & CABLE
 *
 * Update official phone numbers, verified business email, street address details,
 * Google Maps coordinates, official PDF catalogue URL, and backend endpoints here.
 */

export const siteConfig = {
  brand: {
    name: 'RAILPOWER WIRE & CABLE',
    shortName: 'RAILPOWER',
    tagline: 'Powering Connections. Building a Stronger Tomorrow.',
    logoPath: '/assets/aistudio/WhatsApp_Image_2026-11-14_at_9.54.26_AM_ed4cd5fc.jpeg',
    logoAlt: 'RAILPOWER WIRE & CABLE Official Logo',
  },

  media: {
    heroCopperCables: '/src/assets/images/hero_copper_cables_1794630339058.jpg',
    qualityMachinery: '/src/assets/images/quality_cable_machinery_1794630338769.jpg',
    houseWires: '/src/assets/images/product_house_wires_1794630339982.jpg',
    pvcWires: '/src/assets/images/product_pvc_wires_1794630339616.jpg',
    flexibleWires: '/src/assets/images/product_flexible_wires_1794630338938.jpg',
    industrialCables: '/src/assets/images/product_industrial_cables_1794630339409.jpg',
    aluminiumConductors: '/src/assets/images/product_aluminium_conductors_1794630340236.jpg',
    powerCables: '/src/assets/images/product_power_cables_1794630340738.jpg',
    electricalCables: '/src/assets/images/product_electrical_cables_1794630341668.jpg',
    submersibleCables: '/src/assets/images/product_submersible_cables_1794631191367.jpg',
    solarCables: '/src/assets/images/product_solar_cables_1794631192596.jpg',
    weldingCables: '/src/assets/images/product_welding_cables_1794631193016.jpg',
  },

  seo: {
    siteUrl: '', // Leave empty to resolve dynamically from window.location.origin, or set production domain
    defaultTitle: 'RAILPOWER WIRE & CABLE – Electrical Wire & Cable Solutions',
    defaultDescription:
      'RAILPOWER WIRE & CABLE supplies House Wires, PVC Insulated Wires, Industrial Cables, Aluminium Conductors, Power Cables, and Flexible Wires from Satna, Madhya Pradesh, India.',
    keywords: [
      'Electrical Wire Manufacturer',
      'Electrical Cable Supplier',
      'House Wire Manufacturer',
      'Industrial Electrical Cables',
      'Aluminium Conductors',
      'Power Cables',
      'Electrical Wire Dealer',
      'Wire and Cable Distributor',
      'Electrical Wire Supplier in India',
      'RAILPOWER WIRE & CABLE Satna',
    ],
  },

  contact: {
    /**
     * Official Business Phone & WhatsApp
     */
    phoneDisplay: '+91 96306 83505',
    phoneHref: 'tel:+919630683505',
    whatsappNumber: '919630683505',
    isWhatsappConfigured: true,

    /**
     * Official Email — Provided as 'railpowerwire@.com' (domain pending confirmation).
     * Keep `isEmailVerified: false` until the full domain is confirmed so no broken mailto link is activated.
     */
    emailDisplay: 'railpowerwire@.com',
    isEmailVerified: false,
    emailStatusNote: 'Official email domain pending confirmation — update in siteConfig.ts once verified.',

    /**
     * Business Location — Satna, Madhya Pradesh, India.
     * Street address and PIN code remain editable when additional details are provided.
     */
    city: 'Satna',
    state: 'Madhya Pradesh',
    country: 'India',
    streetAddress: '', // Optional: add street/industrial area when available
    pinCode: '', // Optional: add PIN code when available
    officeAddressDisplay: 'Satna, Madhya Pradesh, India',
    businessHours: 'Monday – Saturday · 09:30 AM – 06:30 PM IST',

    /**
     * Google Maps Location — Uses Satna, Madhya Pradesh, India without inventing coordinates.
     */
    googleMapsEmbedQuery: 'Satna, Madhya Pradesh, India',
    googleMapsLink: 'https://maps.google.com/?q=Satna,+Madhya+Pradesh,+India',
    isMapConfigured: true,
  },

  catalogue: {
    /**
     * Set `pdfUrl` once the official RAILPOWER Product Catalogue PDF is hosted or added to /public.
     */
    pdfUrl: '',
    lastUpdatedNote:
      'Official RAILPOWER WIRE & CABLE PDF catalogue is ready for future integration once finalized technical datasheets are uploaded.',
  },

  legal: {
    legalEntityName: 'RAILPOWER WIRE & CABLE',
    jurisdiction: 'Satna, Madhya Pradesh, India',
    grievanceEmailDisplay: 'railpowerwire@.com',
    effectiveDate: '[Configure Effective Date]',
  },

  backendIntegration: {
    /**
     * Configure your REST API, CRM webhook, or Email Service when backend credentials are ready.
     */
    isConfigured: false,
    enquiryEndpoint: '/api/enquiry',
    dealershipEndpoint: '/api/dealership',
  },

  aboutContent: {
    introduction:
      'RAILPOWER WIRE & CABLE is dedicated to supplying dependable electrical wire and cable solutions engineered for residential, commercial, and industrial electrical networks. Operating from Satna, Madhya Pradesh, India, we work closely with electrical dealers, distributors, contractors, and project buyers to deliver consistent product availability and responsive business support.',
    vision:
      'To establish RAILPOWER WIRE & CABLE as a trusted electrical wire and cable brand known across regional and national markets for product consistency, ethical trade partnerships, and dependable supply.',
    mission:
      'To serve homes, commercial complexes, industrial plants, and infrastructure projects with a structured portfolio of electrical wires and cables while empowering our dealer and distributor network with transparent commercial practices.',
    commitment:
      'Every coil and cable length supplied under the RAILPOWER name reflects our focus on careful raw material selection, disciplined production oversight, and reliable customer service from enquiry to dispatch.',
    businessPhilosophy:
      'We believe sustainable growth in the electrical industry comes from long-term channel partnerships. Rather than chasing short-term transactions, we prioritize fair dealer support, steady inventory coordination, and clear technical communication.',
    qualityFocus:
      'Our quality-focused approach centers on conductor consistency, uniform insulation thickness, neat packaging, and systematic batch verification before dispatch—ensuring contractors and end users receive dependable products.',
  },
} as const;

export function getFormattedAddress(): string {
  const parts = [
    siteConfig.contact.streetAddress,
    siteConfig.contact.city,
    siteConfig.contact.state,
    siteConfig.contact.pinCode ? `${siteConfig.contact.country} – ${siteConfig.contact.pinCode}` : siteConfig.contact.country,
  ].filter(Boolean);
  return parts.join(', ');
}

export function buildWhatsAppUrl(customMessage?: string): string {
  const cleanNumber = siteConfig.contact.whatsappNumber.replace(/\D/g, '');
  const message =
    customMessage ||
    'Hello RAILPOWER WIRE & CABLE team, I would like to enquire about your electrical wires, cables, and dealership opportunities.';
  return `https://wa.me/${cleanNumber}?text=${encodeURIComponent(message)}`;
}
