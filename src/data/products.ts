import { siteConfig } from '../config/siteConfig';

export interface TechnicalSpecRow {
  parameter: string;
  value: string;
  isEditablePlaceholder: boolean;
}

export interface ProductFAQ {
  question: string;
  answer: string;
}

export interface ProductColourOption {
  name: string;
  hex: string;
  borderClass?: string;
}

export interface ProductVariant {
  slug: string;
  name: string;
  availabilityLabel: string;
  shortDescription: string;
  overview: string;
  image: string;
  imageAlt: string;
  constructionInfo: string;
  features: string[];
  conductorOptions: string[];
  coreOptions: string[];
  availableSizes: string[];
  applications: string[];
  technicalSpecs: TechnicalSpecRow[];
  faqs: ProductFAQ[];
}

export interface ProductCategory {
  id: string;
  slug: string;
  name: string;
  pageHeading: string;
  subheading: string;
  catalogTitle: string;
  categoryGroup: 'Building & Residential' | 'Industrial & Power' | 'Conductors & Special';
  shortDescription: string;
  overview: string;
  constructionInfo: string;
  image: string;
  imageAlt: string;
  features: string[];
  availableSizes: string[];
  colourOptions?: ProductColourOption[];
  applications: string[];
  technicalSpecs: TechnicalSpecRow[];
  faqs: ProductFAQ[];
  variants: ProductVariant[];
}

export const HOUSE_WIRE_COLOURS: ProductColourOption[] = [
  { name: 'Red', hex: '#DC2626' },
  { name: 'Yellow', hex: '#EAB308' },
  { name: 'Blue', hex: '#2563EB' },
  { name: 'Green', hex: '#16A34A' },
  { name: 'Black', hex: '#171717' },
  { name: 'White', hex: '#FFFFFF', borderClass: 'border-neutral-300' },
];

const STANDARD_EDITABLE_SPECS = (
  conductorPlaceholder: string,
  insulationPlaceholder: string,
  corePlaceholder: string
): TechnicalSpecRow[] => [
  {
    parameter: 'Conductor Material & Grade',
    value: conductorPlaceholder,
    isEditablePlaceholder: true,
  },
  {
    parameter: 'Insulation / Sheathing Compound',
    value: insulationPlaceholder,
    isEditablePlaceholder: true,
  },
  {
    parameter: 'Core & Construction Options',
    value: corePlaceholder,
    isEditablePlaceholder: true,
  },
  {
    parameter: 'Rated Voltage Grade',
    value: '[Editable: Update per verified company datasheet]',
    isEditablePlaceholder: true,
  },
  {
    parameter: 'Current Carrying Capacity & Resistance',
    value: '[Editable: Update per verified technical chart]',
    isEditablePlaceholder: true,
  },
  {
    parameter: 'Applicable Standards & Approvals',
    value: '[Editable: Add verified standard / certification details]',
    isEditablePlaceholder: true,
  },
  {
    parameter: 'Standard Packing Length',
    value: '[Editable: Specify coil / drum packing length]',
    isEditablePlaceholder: true,
  },
];

function createVariant(params: {
  slug: string;
  name: string;
  image: string;
  shortDescription: string;
  constructionInfo: string;
  conductorOptions: string[];
  coreOptions: string[];
  availableSizes: string[];
  applications: string[];
  features?: string[];
  specs?: TechnicalSpecRow[];
}): ProductVariant {
  return {
    slug: params.slug,
    name: params.name,
    availabilityLabel: 'Availability on Request',
    shortDescription: params.shortDescription,
    overview: `${params.name} is presented as part of the RAILPOWER WIRE & CABLE product catalogue for dealers, contractors, and industrial buyers. Specifications, conductor configurations, and dispatch availability are confirmed directly against your project or wholesale enquiry.`,
    image: params.image,
    imageAlt: `RAILPOWER ${params.name} product photography`,
    constructionInfo: params.constructionInfo,
    features: params.features || [
      'Structured as a selectable trade & project catalogue option',
      'Clean surface finish and consistent dimensional geometry',
      'Supported with quotation and bulk enquiry coordination',
      'Technical specifications configurable per confirmed order requirement',
    ],
    conductorOptions: params.conductorOptions,
    coreOptions: params.coreOptions,
    availableSizes: params.availableSizes,
    applications: params.applications,
    technicalSpecs:
      params.specs ||
      STANDARD_EDITABLE_SPECS(
        `[Editable: ${params.conductorOptions.join(' / ')}]`,
        '[Editable: Specify confirmed insulation/sheath polymer]',
        `[Editable: ${params.coreOptions.join(' / ')}]`
      ),
    faqs: [
      {
        question: `Is ${params.name} available for immediate bulk supply?`,
        answer:
          'This variant is listed as "Availability on Request". Please submit a quotation request or contact +91 96306 83505 to confirm current production schedule, minimum order quantity, and dispatch timelines.',
      },
      {
        question: `What sizes and configurations can be requested for ${params.name}?`,
        answer: `Common reference sizes include ${params.availableSizes.slice(0, 5).join(', ')}. Additional custom project requirements can be reviewed upon enquiry.`,
      },
      {
        question: 'Where can I obtain verified technical datasheets and pricing?',
        answer:
          'Use the Request Product Quotation form on this page or connect via WhatsApp on +91 96306 83505 to receive verified specifications and trade pricing.',
      },
    ],
  };
}

export const PRODUCT_CATEGORIES: ProductCategory[] = [
  {
    id: 'house-wires',
    slug: 'house-wires',
    name: 'House Wires',
    pageHeading: 'HOUSE WIRES',
    subheading: 'Reliable Electrical Wiring Solutions for Residential and Commercial Applications.',
    catalogTitle: 'House Wires',
    categoryGroup: 'Building & Residential',
    shortDescription:
      'Complete range of residential and commercial building wire options including FR, FRLS, HRFR, Low Smoke, and Multi-Strand copper house wires.',
    overview:
      'RAILPOWER House Wires are structured for internal conduit wiring across residential homes, apartments, commercial offices, and institutional interiors. Explore our selectable house wire types, standard reference cross-sections, and colour options below—all backed by direct quotation support.',
    constructionInfo:
      'Typical house wire construction comprises a precision-drawn copper conductor covered with a uniform, smooth-stripping polymer insulation layer designed for conduit pulling and clean terminal connections. Exact conductor class and insulation compound are confirmed per selected variant.',
    image: siteConfig.media.houseWires,
    imageAlt: 'RAILPOWER House Wires coiled in red, yellow, blue, and black insulation',
    features: [
      'Smooth outer insulation finish engineered for effortless conduit routing',
      'Multiple selectable product types including FR, FRLS, HRFR, and Low Smoke options',
      'Available reference sizes from 0.5 sq. mm to 10 sq. mm',
      'Six colour coding options (Red, Yellow, Blue, Green, Black, White) subject to confirmation',
      'Suitable for retail electrical counters, contractors, and residential projects',
    ],
    availableSizes: [
      '0.5 sq. mm',
      '0.75 sq. mm',
      '1.0 sq. mm',
      '1.5 sq. mm',
      '2.5 sq. mm',
      '4.0 sq. mm',
      '6.0 sq. mm',
      '10 sq. mm',
    ],
    colourOptions: HOUSE_WIRE_COLOURS,
    applications: [
      'Residential Wiring',
      'Commercial Buildings',
      'Lighting Circuits',
      'Electrical Installations',
      'Distribution Boards',
    ],
    technicalSpecs: STANDARD_EDITABLE_SPECS(
      '[Editable: Specify Copper Grade & Stranding Class]',
      '[Editable: Specify FR / FRLS / HRFR / Low Smoke PVC]',
      '[Editable: Single Core / Multi-Strand Copper]'
    ),
    faqs: [
      {
        question: 'Are all listed House Wire types and colours continuously in stock?',
        answer:
          'All house wire variants, sizes, and colours are displayed as selectable catalogue options subject to confirmation. Contact +91 96306 83505 or submit the quotation form to confirm stock and dispatch.',
      },
      {
        question: 'Which house wire sizes are commonly used for lighting vs. power sockets?',
        answer:
          'Reference sizes from 0.5 sq. mm to 10 sq. mm are listed for selection. Your licensed electrical engineer or contractor should determine the exact cross-section based on circuit load.',
      },
      {
        question: 'Can electrical dealers order mixed coil colours and sizes?',
        answer:
          'Yes, dealers and wholesalers can specify multiple product types, sizes, and quantity requirements when submitting a quotation or dealership enquiry.',
      },
    ],
    variants: [
      createVariant({
        slug: 'fr-house-wire',
        name: 'FR House Wire',
        image: siteConfig.media.houseWires,
        shortDescription:
          'Flame Retardant insulated house wire option designed for residential and commercial internal conduits.',
        constructionInfo:
          'Copper conductor insulated with Flame Retardant (FR) PVC compound (specifications subject to official confirmation).',
        conductorOptions: ['Electrolytic Grade Copper (Configurable)'],
        coreOptions: ['Single Core'],
        availableSizes: ['0.5 sq. mm', '0.75 sq. mm', '1.0 sq. mm', '1.5 sq. mm', '2.5 sq. mm', '4.0 sq. mm', '6.0 sq. mm', '10 sq. mm'],
        applications: ['Residential Wiring', 'Commercial Buildings', 'Lighting Circuits', 'Distribution Boards'],
      }),
      createVariant({
        slug: 'frls-house-wire',
        name: 'FRLS House Wire',
        image: siteConfig.media.pvcWires,
        shortDescription:
          'Flame Retardant Low Smoke house wire option suited for public buildings, apartments, and offices.',
        constructionInfo:
          'Stranded copper conductor with Flame Retardant Low Smoke (FRLS) polymer insulation (subject to official datasheet).',
        conductorOptions: ['Copper Conductor (Configurable)'],
        coreOptions: ['Single Core'],
        availableSizes: ['0.75 sq. mm', '1.0 sq. mm', '1.5 sq. mm', '2.5 sq. mm', '4.0 sq. mm', '6.0 sq. mm', '10 sq. mm'],
        applications: ['Commercial Buildings', 'Residential Wiring', 'Electrical Installations', 'Distribution Boards'],
      }),
      createVariant({
        slug: 'hrfr-house-wire',
        name: 'HRFR House Wire',
        image: siteConfig.media.houseWires,
        shortDescription:
          'Heat Resistant Flame Retardant house wire option for higher-load domestic and commercial circuits.',
        constructionInfo:
          'Copper conductor paired with Heat Resistant Flame Retardant (HRFR) insulation layer (editable per final specification).',
        conductorOptions: ['Copper Conductor (Configurable)'],
        coreOptions: ['Single Core'],
        availableSizes: ['1.0 sq. mm', '1.5 sq. mm', '2.5 sq. mm', '4.0 sq. mm', '6.0 sq. mm', '10 sq. mm'],
        applications: ['Residential Wiring', 'Distribution Boards', 'Commercial Buildings', 'Electrical Installations'],
      }),
      createVariant({
        slug: 'low-smoke-house-wire',
        name: 'Low Smoke House Wire',
        image: siteConfig.media.pvcWires,
        shortDescription:
          'Low smoke emission building wire catalogue option intended for enclosed high-occupancy interiors.',
        constructionInfo:
          'Flexible copper conductor with specialized low-smoke insulation compound (subject to official confirmation).',
        conductorOptions: ['Copper Conductor (Configurable)'],
        coreOptions: ['Single Core'],
        availableSizes: ['1.0 sq. mm', '1.5 sq. mm', '2.5 sq. mm', '4.0 sq. mm', '6.0 sq. mm', '10 sq. mm'],
        applications: ['Commercial Buildings', 'Residential Wiring', 'Lighting Circuits', 'Electrical Installations'],
      }),
      createVariant({
        slug: 'flexible-copper-house-wire',
        name: 'Flexible Copper House Wire',
        image: siteConfig.media.flexibleWires,
        shortDescription:
          'Fine-stranded flexible copper house wire option for smooth pulling through bends and tight conduits.',
        constructionInfo:
          'Multi-strand flexible copper conductor enclosed in smooth polymer insulation (specifications configurable).',
        conductorOptions: ['Multi-Strand Flexible Copper'],
        coreOptions: ['Single Core'],
        availableSizes: ['0.5 sq. mm', '0.75 sq. mm', '1.0 sq. mm', '1.5 sq. mm', '2.5 sq. mm', '4.0 sq. mm', '6.0 sq. mm'],
        applications: ['Lighting Circuits', 'Residential Wiring', 'Electrical Installations', 'Distribution Boards'],
      }),
      createVariant({
        slug: 'single-core-house-wire',
        name: 'Single Core House Wire',
        image: siteConfig.media.pvcWires,
        shortDescription:
          'Standard single-core building wire option for organized phase, neutral, and earthing runs.',
        constructionInfo:
          'Single-core copper conductor with colour-coded PVC insulation (available options subject to confirmation).',
        conductorOptions: ['Copper Conductor (Configurable)'],
        coreOptions: ['Single Core'],
        availableSizes: ['0.5 sq. mm', '0.75 sq. mm', '1.0 sq. mm', '1.5 sq. mm', '2.5 sq. mm', '4.0 sq. mm', '6.0 sq. mm', '10 sq. mm'],
        applications: ['Residential Wiring', 'Lighting Circuits', 'Distribution Boards', 'Commercial Buildings'],
      }),
      createVariant({
        slug: 'multi-strand-house-wire',
        name: 'Multi-Strand House Wire',
        image: siteConfig.media.copperMultistrand,
        shortDescription:
          'Bunched multi-strand copper wire option designed for flexibility and reliable terminal clamping.',
        constructionInfo:
          'Concentric or bunched multi-strand copper conductor with uniform PVC insulation (subject to confirmation).',
        conductorOptions: ['Multi-Strand Copper'],
        coreOptions: ['Single Core'],
        availableSizes: ['0.75 sq. mm', '1.0 sq. mm', '1.5 sq. mm', '2.5 sq. mm', '4.0 sq. mm', '6.0 sq. mm', '10 sq. mm'],
        applications: ['Residential Wiring', 'Commercial Buildings', 'Distribution Boards', 'Electrical Installations'],
      }),
    ],
  },

  {
    id: 'pvc-wires',
    slug: 'pvc-wires',
    name: 'PVC Wires',
    pageHeading: 'PVC INSULATED WIRES & CABLES',
    subheading:
      'Versatile PVC insulated wire and cable families for domestic distribution, panels, and commercial installations.',
    catalogTitle: 'PVC Insulated Wires & Cables',
    categoryGroup: 'Building & Residential',
    shortDescription:
      'Eight specialized PVC wire and cable families covering single-core, flexible, multistrand, copper, aluminium, multicore, industrial, and panel wires.',
    overview:
      'RAILPOWER PVC Insulated Wires & Cables span building wiring, switchgear panel hookups, flexible equipment leads, and multicore distribution lines. Every family below is structured as a catalogue option with customizable sizes and quotation support.',
    constructionInfo:
      'Constructed with copper or aluminium conductors (depending on product family) insulated in smooth, abrasion-resistant PVC compound. Multicore variants include an outer PVC protective sheath over colour-coded inner cores.',
    image: siteConfig.media.pvcWires,
    imageAlt: 'RAILPOWER PVC Insulated Wires showing vibrant colour coils and stranded copper cores',
    features: [
      'Covers single-core, multistrand, flexible, multicore, and panel wiring requirements',
      'Both copper and aluminium conductor options available on request',
      'Reference cross-sections from 0.5 sq. mm up to 35 sq. mm where applicable',
      'Smooth PVC outer jacket for easy stripping, crimping, and routing',
      'Clear core identification for switchboards and industrial control panels',
    ],
    availableSizes: [
      '0.5 sq. mm',
      '0.75 sq. mm',
      '1.0 sq. mm',
      '1.5 sq. mm',
      '2.5 sq. mm',
      '4.0 sq. mm',
      '6.0 sq. mm',
      '10 sq. mm',
      '16 sq. mm (Where applicable)',
      '25 sq. mm (Where applicable)',
    ],
    colourOptions: HOUSE_WIRE_COLOURS,
    applications: [
      'Residential and Commercial Conduit Wiring',
      'Electrical Distribution Panels & Switchboards',
      'Industrial Control & Machinery Hookups',
      'Sub-main Power & Lighting Lines',
      'Wholesale Trade & Contractor Supply',
    ],
    technicalSpecs: STANDARD_EDITABLE_SPECS(
      '[Editable: Copper / Aluminium Conductor Option]',
      '[Editable: PVC Insulation & Sheathing Grade]',
      '[Editable: Single Core / Multi-Core Configuration]'
    ),
    faqs: [
      {
        question: 'What is the difference between PVC Single Core and PVC Multicore Cables?',
        answer:
          'Single-core PVC wires carry one insulated conductor for conduit or panel routing, whereas PVC multicore cables bundle multiple insulated cores inside an outer protective sheath for equipment and industrial runs.',
      },
      {
        question: 'Are PVC Insulated Aluminium Wires available in larger sizes?',
        answer:
          'Yes, aluminium conductor PVC options are typically requested in higher cross-sections where applicable. Select your desired size in the quotation form to confirm availability.',
      },
      {
        question: 'Can we request custom coil lengths or bulk drum packing?',
        answer:
          'Packing preferences and bulk quantities can be noted in the quotation form below or discussed directly at +91 96306 83505.',
      },
    ],
    variants: [
      createVariant({
        slug: 'pvc-single-core-wires',
        name: 'PVC Single Core Wires',
        image: siteConfig.media.pvcWires,
        shortDescription:
          'Single-conductor PVC insulated wires for building circuits, distribution boards, and conduit runs.',
        constructionInfo: 'Single copper or aluminium conductor with extruded PVC insulation.',
        conductorOptions: ['Copper (Configurable)', 'Aluminium (Where applicable)'],
        coreOptions: ['Single Core'],
        availableSizes: ['0.5 sq. mm', '0.75 sq. mm', '1.0 sq. mm', '1.5 sq. mm', '2.5 sq. mm', '4.0 sq. mm', '6.0 sq. mm', '10 sq. mm'],
        applications: ['Conduit Wiring', 'Distribution Boards', 'Commercial Buildings', 'Lighting Circuits'],
      }),
      createVariant({
        slug: 'pvc-flexible-wires',
        name: 'PVC Flexible Wires',
        image: siteConfig.media.flexibleWires,
        shortDescription:
          'Supple multi-strand PVC insulated wires suited for frequent bending and appliance connections.',
        constructionInfo: 'Fine-stranded flexible copper conductor with flexible PVC jacket.',
        conductorOptions: ['Flexible Stranded Copper'],
        coreOptions: ['Single Core', '2 / 3 / 4 Core (On Request)'],
        availableSizes: ['0.5 sq. mm', '0.75 sq. mm', '1.0 sq. mm', '1.5 sq. mm', '2.5 sq. mm', '4.0 sq. mm', '6.0 sq. mm'],
        applications: ['Appliances', 'Control Panels', 'Equipment Leads', 'Temporary Connections'],
      }),
      createVariant({
        slug: 'pvc-multistrand-wires',
        name: 'PVC Multistrand Wires',
        image: siteConfig.media.copperMultistrand,
        shortDescription:
          'Multi-strand PVC building wires combining ease of pulling with dependable termination.',
        constructionInfo: 'Multiple copper strands bunched uniformly under smooth PVC insulation.',
        conductorOptions: ['Multi-Strand Copper'],
        coreOptions: ['Single Core'],
        availableSizes: ['0.75 sq. mm', '1.0 sq. mm', '1.5 sq. mm', '2.5 sq. mm', '4.0 sq. mm', '6.0 sq. mm', '10 sq. mm'],
        applications: ['Residential Wiring', 'Commercial Complexes', 'Sub-circuits', 'Switchboards'],
      }),
      createVariant({
        slug: 'pvc-insulated-copper-wires',
        name: 'PVC Insulated Copper Wires',
        image: siteConfig.media.copperMultistrand,
        shortDescription:
          'Copper-conductor PVC insulated wires for reliable internal power and lighting distribution.',
        constructionInfo: 'Copper conductor insulated in uniform PVC polymer compound.',
        conductorOptions: ['Copper Conductor'],
        coreOptions: ['Single Core', 'Multicore (On Request)'],
        availableSizes: ['0.5 sq. mm', '0.75 sq. mm', '1.0 sq. mm', '1.5 sq. mm', '2.5 sq. mm', '4.0 sq. mm', '6.0 sq. mm', '10 sq. mm', '16 sq. mm'],
        applications: ['Building Distribution', 'Switchgear', 'Commercial Wiring', 'Residential Mains'],
      }),
      createVariant({
        slug: 'pvc-insulated-aluminium-wires',
        name: 'PVC Insulated Aluminium Wires',
        image: siteConfig.media.aluminiumConductors,
        shortDescription:
          'Cost-effective PVC insulated aluminium wires for service mains and utility feeders.',
        constructionInfo: 'Solid or stranded aluminium conductor with weather-resistant PVC insulation.',
        conductorOptions: ['Aluminium Conductor'],
        coreOptions: ['Single Core', 'Twin / Multicore (On Request)'],
        availableSizes: ['2.5 sq. mm', '4.0 sq. mm', '6.0 sq. mm', '10 sq. mm', '16 sq. mm', '25 sq. mm', '35 sq. mm'],
        applications: ['Service Connections', 'Sub-main Feeders', 'Utility Wiring', 'Commercial Distribution'],
      }),
      createVariant({
        slug: 'pvc-multicore-cables',
        name: 'PVC Multicore Cables',
        image: siteConfig.media.electricalCables,
        shortDescription:
          'Sheathed multicore PVC cables organizing multiple insulated conductors in one durable jacket.',
        constructionInfo: 'Colour-coded insulated cores twisted together with outer PVC sheath.',
        conductorOptions: ['Copper Conductor', 'Aluminium (On Request)'],
        coreOptions: ['2 Core', '3 Core', '4 Core', 'Multicore (On Request)'],
        availableSizes: ['0.75 sq. mm', '1.0 sq. mm', '1.5 sq. mm', '2.5 sq. mm', '4.0 sq. mm', '6.0 sq. mm', '10 sq. mm'],
        applications: ['Industrial Machinery', 'Three-Phase Equipment', 'Panel Interconnections', 'Workshop Power'],
      }),
      createVariant({
        slug: 'pvc-industrial-wires',
        name: 'PVC Industrial Wires',
        image: siteConfig.media.industrialCables,
        shortDescription:
          'Heavy-duty PVC wires tailored for factory floors, machinery wiring, and workshop distribution.',
        constructionInfo: 'Robust conductor stranding with abrasion-resistant industrial PVC insulation.',
        conductorOptions: ['Copper / Aluminium (Configurable)'],
        coreOptions: ['Single Core', 'Multicore'],
        availableSizes: ['1.5 sq. mm', '2.5 sq. mm', '4.0 sq. mm', '6.0 sq. mm', '10 sq. mm', '16 sq. mm', '25 sq. mm'],
        applications: ['Factories & Plants', 'Motor Panels', 'Industrial Lighting', 'Utility Feeders'],
      }),
      createVariant({
        slug: 'pvc-panel-wires',
        name: 'PVC Panel Wires',
        image: siteConfig.media.electricalCables,
        shortDescription:
          'Precision PVC control and switchgear panel wires for neat routing inside electrical enclosures.',
        constructionInfo: 'Flexible copper strands with crisp colour-coded PVC insulation for ferruling.',
        conductorOptions: ['Flexible Copper Conductor'],
        coreOptions: ['Single Core'],
        availableSizes: ['0.5 sq. mm', '0.75 sq. mm', '1.0 sq. mm', '1.5 sq. mm', '2.5 sq. mm', '4.0 sq. mm', '6.0 sq. mm'],
        applications: ['LT Switchgear Panels', 'MCC & PCC Cabinets', 'Automation Enclosures', 'Relay Wiring'],
      }),
    ],
  },

  {
    id: 'industrial-cables',
    slug: 'industrial-cables',
    name: 'Industrial Cables',
    pageHeading: 'INDUSTRIAL WIRES & CABLES',
    subheading:
      'Comprehensive industrial cable catalogue options for factories, power distribution, instrumentation, solar, welding, and submersible systems.',
    catalogTitle: 'Industrial Wires & Cables',
    categoryGroup: 'Industrial & Power',
    shortDescription:
      'Fifteen industrial cable families including LT/HT Power, XLPE, Armoured, Control, Instrumentation, Welding, Submersible, and Solar DC cables.',
    overview:
      'Our Industrial Wires & Cables catalogue organizes fifteen specialized product families required across manufacturing facilities, EPC projects, utility distribution, and heavy equipment. Every family is marked "Availability on Request" and links to a dedicated product detail page.',
    constructionInfo:
      'Construction varies by cable family—spanning copper or aluminium conductors, PVC or XLPE insulation, galvanized steel wire/strip armouring where specified, and heavy-duty outer sheathing.',
    image: siteConfig.media.industrialCables,
    imageAlt: 'RAILPOWER Industrial armoured multi-core electrical cables',
    features: [
      'Fifteen dedicated industrial cable families with individual detail pages',
      'Options spanning Copper & Aluminium conductors and Single / Multicore layouts',
      'Includes Armoured, Unarmoured, XLPE, Control, Instrumentation, Welding, Submersible & Solar DC categories',
      'All unconfirmed variants clearly marked Availability on Request',
      'Direct quotation workflow for EPC contractors and industrial procurement teams',
    ],
    availableSizes: [
      '1.5 sq. mm',
      '2.5 sq. mm',
      '4.0 sq. mm',
      '6.0 sq. mm',
      '10 sq. mm',
      '16 sq. mm',
      '25 sq. mm',
      '35 sq. mm',
      '50 sq. mm+',
    ],
    applications: [
      'Manufacturing Plants & Process Industries',
      'Power Distribution Trenches & Cable Trays',
      'Switchgear, MCC & Control Panels',
      'Agricultural & Borewell Submersible Pumps',
      'Solar Photovoltaic & Heavy Fabrication Sites',
    ],
    technicalSpecs: STANDARD_EDITABLE_SPECS(
      '[Editable: Copper / Aluminium Options per Family]',
      '[Editable: XLPE / PVC / Elastomeric Compound]',
      '[Editable: Single / 2 / 3 / 3.5 / 4 / Multi-Core]'
    ),
    faqs: [
      {
        question: 'Does RAILPOWER keep all 15 industrial cable families in ready stock?',
        answer:
          'These fifteen categories represent our industrial catalogue families and potential product lines. Specific families and sizes are supplied on an "Availability on Request" basis upon confirming order specifications.',
      },
      {
        question: 'Can we specify armoured vs. unarmoured construction in our enquiry?',
        answer:
          'Yes. Use the dedicated product page or quotation form to specify armoured or unarmoured construction, conductor metal, core count, and required length.',
      },
      {
        question: 'How do contractors request bulk project rates?',
        answer:
          'Submit your BOQ or quantity estimate through the Product Quotation form or call +91 96306 83505 directly.',
      },
    ],
    variants: [
      createVariant({
        slug: 'lt-power-cables',
        name: 'LT Power Cables',
        image: siteConfig.media.powerCables,
        shortDescription: 'Low-tension power cables for industrial, commercial, and utility feeders (Availability on Request).',
        constructionInfo: 'Copper or aluminium conductors with PVC/XLPE insulation and protective outer sheath.',
        conductorOptions: ['Copper', 'Aluminium'],
        coreOptions: ['Single Core', '2 Core', '3 Core', '3.5 Core', '4 Core'],
        availableSizes: ['4.0 sq. mm', '6.0 sq. mm', '10 sq. mm', '16 sq. mm', '25 sq. mm', '35 sq. mm', '50 sq. mm+'],
        applications: ['Industrial Feeders', 'Main Distribution Panels', 'Commercial Risers', 'Cable Trays'],
      }),
      createVariant({
        slug: 'ht-power-cables',
        name: 'HT Power Cables',
        image: siteConfig.media.powerCables,
        shortDescription: 'High-tension power cable catalogue category for heavy substation and utility distribution (Availability on Request).',
        constructionInfo: 'Multi-layer shielded and XLPE-insulated construction (specifications subject to project confirmation).',
        conductorOptions: ['Aluminium', 'Copper'],
        coreOptions: ['Single Core', '3 Core'],
        availableSizes: ['25 sq. mm', '35 sq. mm', '50 sq. mm', '70 sq. mm', '95 sq. mm+'],
        applications: ['Substation Interconnections', 'Heavy Industrial Plants', 'Utility Networks', 'Primary Feeders'],
      }),
      createVariant({
        slug: 'xlpe-cables',
        name: 'XLPE Cables',
        image: siteConfig.media.industrialCables,
        shortDescription: 'Cross-linked polyethylene insulated cables for demanding thermal and power distribution loads.',
        constructionInfo: 'Copper or aluminium cores with cross-linked polyethylene (XLPE) dielectric insulation.',
        conductorOptions: ['Copper', 'Aluminium'],
        coreOptions: ['Single Core', '2 / 3 / 3.5 / 4 Core'],
        availableSizes: ['6.0 sq. mm', '10 sq. mm', '16 sq. mm', '25 sq. mm', '35 sq. mm', '50 sq. mm+'],
        applications: ['Industrial Power Distribution', 'Underground Trenches', 'Process Industries', 'Commercial Grids'],
      }),
      createVariant({
        slug: 'armoured-cables',
        name: 'Armoured Cables',
        image: siteConfig.media.industrialCables,
        shortDescription: 'Mechanically reinforced cables with metallic armouring for underground and exposed industrial runs.',
        constructionInfo: 'Insulated multi-core assembly protected by metallic wire/strip armour and outer sheath.',
        conductorOptions: ['Copper', 'Aluminium'],
        coreOptions: ['2 Core', '3 Core', '3.5 Core', '4 Core', 'Multicore'],
        availableSizes: ['2.5 sq. mm', '4.0 sq. mm', '6.0 sq. mm', '10 sq. mm', '16 sq. mm', '25 sq. mm+'],
        applications: ['Direct Burial Trenches', 'Outdoor Cable Trays', 'Factory Machinery', 'Infrastructure Projects'],
      }),
      createVariant({
        slug: 'unarmoured-cables',
        name: 'Unarmoured Cables',
        image: siteConfig.media.powerCables,
        shortDescription: 'Flexible-handling unarmoured power and control cables for indoor ducts, trays, and conduits.',
        constructionInfo: 'Insulated conductors laid up with inner bedding and tough outer protective sheath without metallic armour.',
        conductorOptions: ['Copper', 'Aluminium'],
        coreOptions: ['Single Core', '2 Core', '3 Core', '4 Core', 'Multicore'],
        availableSizes: ['1.5 sq. mm', '2.5 sq. mm', '4.0 sq. mm', '6.0 sq. mm', '10 sq. mm', '16 sq. mm+'],
        applications: ['Indoor Cable Trays', 'Conduit Installations', 'Switchgear Rooms', 'Commercial Interiors'],
      }),
      createVariant({
        slug: 'single-core-industrial-cables',
        name: 'Single Core Industrial Cables',
        image: siteConfig.media.pvcWires,
        shortDescription: 'Heavy-gauge single-core industrial cables for high-current busbar and transformer links.',
        constructionInfo: 'Single stranded copper or aluminium conductor with heavy-duty industrial insulation.',
        conductorOptions: ['Copper', 'Aluminium'],
        coreOptions: ['Single Core'],
        availableSizes: ['10 sq. mm', '16 sq. mm', '25 sq. mm', '35 sq. mm', '50 sq. mm+'],
        applications: ['Transformer Leads', 'Panel Busbar Links', 'Generator Hookups', 'Industrial Mains'],
      }),
      createVariant({
        slug: 'multicore-industrial-cables',
        name: 'Multicore Industrial Cables',
        image: siteConfig.media.industrialCables,
        shortDescription: 'Multi-core industrial cables uniting power and auxiliary phases in a single outer jacket.',
        constructionInfo: 'Colour- or number-coded cores bundled with filler, inner sheath, and durable outer jacket.',
        conductorOptions: ['Copper', 'Aluminium'],
        coreOptions: ['2 Core', '3 Core', '4 Core', '5 Core+'],
        availableSizes: ['1.5 sq. mm', '2.5 sq. mm', '4.0 sq. mm', '6.0 sq. mm', '10 sq. mm', '16 sq. mm+'],
        applications: ['Three-Phase Motors', 'Industrial Machinery', 'Plant Distribution', 'Crane & Hoist Supply'],
      }),
      createVariant({
        slug: 'control-cables',
        name: 'Control Cables',
        image: siteConfig.media.electricalCables,
        shortDescription: 'Multi-core copper control cables for industrial automation, signalling, and relay circuits.',
        constructionInfo: 'Multi-core annealed copper conductors with numbered or colour-coded PVC insulation and outer sheath.',
        conductorOptions: ['Copper Conductor'],
        coreOptions: ['2 Core to 24+ Core (On Request)'],
        availableSizes: ['0.75 sq. mm', '1.0 sq. mm', '1.5 sq. mm', '2.5 sq. mm'],
        applications: ['Control Panels', 'PLC & Relay Cabinets', 'Industrial Automation', 'Process Monitoring'],
      }),
      createVariant({
        slug: 'instrumentation-cables',
        name: 'Instrumentation Cables',
        image: siteConfig.media.electricalCables,
        shortDescription: 'Low-signal twisted pair/triad cables intended for process sensors and industrial instrumentation.',
        constructionInfo: 'Fine copper conductors in paired/triad geometry with optional screening (subject to order spec).',
        conductorOptions: ['Bare / Tinned Copper (Configurable)'],
        coreOptions: ['1 Pair to Multi-Pair (On Request)'],
        availableSizes: ['0.5 sq. mm', '0.75 sq. mm', '1.0 sq. mm', '1.5 sq. mm'],
        applications: ['Process Instrumentation', 'Sensor Networks', 'Industrial Telemetry', 'Control Rooms'],
      }),
      createVariant({
        slug: 'flexible-industrial-cables',
        name: 'Flexible Industrial Cables',
        image: siteConfig.media.flexibleWires,
        shortDescription: 'High-flexibility multi-core industrial cables for mobile equipment and tight routing paths.',
        constructionInfo: 'Fine-stranded copper conductors with supple industrial-grade sheathing.',
        conductorOptions: ['Flexible Stranded Copper'],
        coreOptions: ['Single Core', '2 / 3 / 4 Core+'],
        availableSizes: ['0.75 sq. mm', '1.0 sq. mm', '1.5 sq. mm', '2.5 sq. mm', '4.0 sq. mm', '6.0 sq. mm', '10 sq. mm'],
        applications: ['Portable Machinery', 'Workshop Tools', 'Panel Doors', 'Automated Equipment'],
      }),
      createVariant({
        slug: 'welding-cables',
        name: 'Welding Cables',
        image: siteConfig.media.weldingCables,
        shortDescription: 'Ultra-flexible heavy-strand copper welding leads designed for fabrication shops and site welding.',
        constructionInfo: 'Fine-stranded bare copper conductor with tough, flexible outer jacket.',
        conductorOptions: ['Fine-Stranded Copper'],
        coreOptions: ['Single Core'],
        availableSizes: ['16 sq. mm', '25 sq. mm', '35 sq. mm', '50 sq. mm', '70 sq. mm (On Request)'],
        applications: ['Arc Welding Machines', 'Metal Fabrication Yards', 'Industrial Workshops', 'Ground Leads'],
      }),
      createVariant({
        slug: 'submersible-cables',
        name: 'Submersible Cables',
        image: siteConfig.media.submersibleCables,
        shortDescription: '3-core flat water-resistant cables tailored for agricultural and deep-well submersible pump sets.',
        constructionInfo: 'Three bunched copper cores insulated in moisture-resistant polymer with flat outer sheath.',
        conductorOptions: ['Multi-Strand Copper'],
        coreOptions: ['3 Core Flat'],
        availableSizes: ['1.5 sq. mm', '2.5 sq. mm', '4.0 sq. mm', '6.0 sq. mm', '10 sq. mm'],
        applications: ['Borewell Submersible Pumps', 'Agricultural Irrigation', 'Water Supply Stations', 'Sump Pumps'],
      }),
      createVariant({
        slug: 'solar-dc-cables',
        name: 'Solar DC Cables',
        image: siteConfig.media.solarCables,
        shortDescription: 'UV- and weather-resistant photovoltaic DC cable options for solar rooftop and utility arrays.',
        constructionInfo: 'Flexible conductor with dual-layer weather-resistant insulation/sheath (specs subject to confirmation).',
        conductorOptions: ['Tinned / Bare Copper (Configurable)'],
        coreOptions: ['Single Core', 'Twin Core (On Request)'],
        availableSizes: ['2.5 sq. mm', '4.0 sq. mm', '6.0 sq. mm', '10 sq. mm'],
        applications: ['Rooftop Solar Arrays', 'Solar Inverter Strings', 'Photovoltaic Plants', 'DC Combiner Boxes'],
      }),
      createVariant({
        slug: 'aluminium-conductor-cables',
        name: 'Aluminium Conductor Cables',
        image: siteConfig.media.aluminiumConductors,
        shortDescription: 'Lightweight aluminium-core cables suited for economical power distribution across large spans.',
        constructionInfo: 'Stranded EC-grade aluminium conductors in bare or insulated cable constructions.',
        conductorOptions: ['Aluminium Conductor'],
        coreOptions: ['Single Core', '2 / 3 / 3.5 / 4 Core'],
        availableSizes: ['6.0 sq. mm', '10 sq. mm', '16 sq. mm', '25 sq. mm', '35 sq. mm', '50 sq. mm+'],
        applications: ['Utility Distribution', 'Overhead Lines', 'Industrial Yard Feeders', 'Infrastructure Projects'],
      }),
      createVariant({
        slug: 'copper-power-cables',
        name: 'Copper Power Cables',
        image: siteConfig.media.powerCables,
        shortDescription: 'High-conductivity copper power cables for critical commercial and industrial main feeders.',
        constructionInfo: 'High-purity copper conductors with insulated cores, bedding, optional armour, and outer jacket.',
        conductorOptions: ['Electrolytic Copper'],
        coreOptions: ['Single Core', '2 Core', '3 Core', '3.5 Core', '4 Core'],
        availableSizes: ['4.0 sq. mm', '6.0 sq. mm', '10 sq. mm', '16 sq. mm', '25 sq. mm', '35 sq. mm+'],
        applications: ['Commercial Buildings', 'Hospital & Data Infrastructure', 'Industrial Substations', 'Main Risers'],
      }),
    ],
  },

  {
    id: 'aluminium-conductors',
    slug: 'aluminium-conductors',
    name: 'Aluminium Conductors',
    pageHeading: 'ALUMINIUM CONDUCTORS',
    subheading:
      'Stranded overhead conductors and aluminium power distribution cables engineered for utility and infrastructure networks.',
    catalogTitle: 'Aluminium Conductors',
    categoryGroup: 'Conductors & Special',
    shortDescription:
      'Dedicated catalogue covering AAC Conductors, AAAC Conductors, ACSR Conductors, Aluminium Bare Conductors, and Aluminium Power Cables.',
    overview:
      'RAILPOWER Aluminium Conductors address overhead distribution spans, rural electrification feeders, and utility power networks where favourable strength-to-weight characteristics are required. All technical specifications and drum schedules remain subject to company confirmation.',
    constructionInfo:
      'Concentric-lay stranded aluminium wires (with alloy or galvanized steel reinforcement core depending on AAC, AAAC, or ACSR family), wound neatly on heavy-duty reels or coils.',
    image: siteConfig.media.aluminiumConductors,
    imageAlt: 'RAILPOWER Stranded Aluminium Conductors wound on industrial spool and coil',
    features: [
      'Covers AAC, AAAC, ACSR, Bare Conductors, and Aluminium Power Cables',
      'Favourable strength-to-weight ratio for long overhead spans',
      'Consistent concentric stranding geometry for clean tensioning',
      'Available on request for utility contractors and infrastructure buyers',
      'Technical datasheets confirmed directly against tender or order inquiry',
    ],
    availableSizes: [
      '7/2.21 mm (Reference)',
      '7/3.10 mm (Reference)',
      '6/1/2.11 mm (Reference)',
      '10 sq. mm – 50 sq. mm+',
      'Custom Utility Sizes (On Request)',
    ],
    applications: [
      'Overhead Power Distribution Lines',
      'Rural & Urban Feeder Networks',
      'Industrial Yard & Campus Spans',
      'Utility Infrastructure & Sub-transmission',
    ],
    technicalSpecs: STANDARD_EDITABLE_SPECS(
      '[Editable: EC Grade Aluminium / Alloy / Steel Core]',
      '[Editable: Bare Overhead / Insulated Sheath]',
      '[Editable: AAC / AAAC / ACSR Stranding]'
    ),
    faqs: [
      {
        question: 'What is the difference between AAC, AAAC, and ACSR conductors?',
        answer:
          'AAC uses pure aluminium strands, AAAC uses high-strength aluminium alloy strands for improved corrosion resistance and strength, and ACSR combines aluminium strands around a galvanized steel core for high tensile span support.',
      },
      {
        question: 'Are all technical ratings and conductor weights finalized online?',
        answer:
          'All technical specifications for Aluminium Conductors remain subject to company confirmation based on the specific tender or purchase requirement.',
      },
      {
        question: 'How do infrastructure contractors enquire for reel quantities?',
        answer:
          'Select your conductor category, approximate drum/km quantity, and submit the quotation form or call +91 96306 83505.',
      },
    ],
    variants: [
      createVariant({
        slug: 'aac-conductors',
        name: 'AAC Conductors',
        image: siteConfig.media.aluminiumConductors,
        shortDescription: 'All Aluminium Conductors for short-span overhead urban and distribution lines.',
        constructionInfo: 'Concentric-lay stranded EC-grade aluminium conductor.',
        conductorOptions: ['EC Grade Aluminium'],
        coreOptions: ['Bare Stranded (7 / 19 / 37 Strands)'],
        availableSizes: ['Reference Utility Sizes (Subject to Confirmation)'],
        applications: ['Urban Overhead Distribution', 'Short-Span Utility Lines', 'Substation Bus Connections'],
      }),
      createVariant({
        slug: 'aaac-conductors',
        name: 'AAAC Conductors',
        image: siteConfig.media.aluminiumConductors,
        shortDescription: 'All Aluminium Alloy Conductors offering high strength-to-weight and corrosion resistance.',
        constructionInfo: 'Heat-treated aluminium-magnesium-silicon alloy stranded wires.',
        conductorOptions: ['Aluminium Alloy'],
        coreOptions: ['Bare Stranded Alloy'],
        availableSizes: ['Reference Alloy Sizes (Subject to Confirmation)'],
        applications: ['Coastal & Industrial Overhead Lines', 'Medium-Span Distribution', 'Feeder Upgrades'],
      }),
      createVariant({
        slug: 'acsr-conductors',
        name: 'ACSR Conductors',
        image: siteConfig.media.aluminiumConductors,
        shortDescription: 'Aluminium Conductor Steel Reinforced for long-span overhead power transmission and distribution.',
        constructionInfo: 'Outer aluminium layers stranded over a high-tensile galvanized steel core.',
        conductorOptions: ['Aluminium + Galvanized Steel Core'],
        coreOptions: ['Composite Concentric Stranding'],
        availableSizes: ['Squirrel / Weasel / Rabbit / Raccoon Reference (On Request)'],
        applications: ['Long-Span Overhead Lines', 'Rural & Feeder Infrastructure', 'River & Valley Crossings'],
      }),
      createVariant({
        slug: 'aluminium-bare-conductors',
        name: 'Aluminium Bare Conductors',
        image: siteConfig.media.aluminiumConductors,
        shortDescription: 'Uninsulated solid and stranded bare aluminium conductors for grounding and overhead lines.',
        constructionInfo: 'Bare drawn or stranded aluminium wire supplied in coils or drums.',
        conductorOptions: ['Bare Aluminium'],
        coreOptions: ['Solid / Stranded'],
        availableSizes: ['Custom Sizes (Subject to Confirmation)'],
        applications: ['Overhead Distribution', 'Earthing Grids', 'Utility Spans'],
      }),
      createVariant({
        slug: 'aluminium-power-cables',
        name: 'Aluminium Power Cables',
        image: siteConfig.media.powerCables,
        shortDescription: 'Insulated single and multicore aluminium power cables for underground and tray feeders.',
        constructionInfo: 'Stranded aluminium conductors with PVC or XLPE insulation and protective outer sheath.',
        conductorOptions: ['Aluminium Conductor'],
        coreOptions: ['Single Core', '2 / 3 / 3.5 / 4 Core'],
        availableSizes: ['10 sq. mm', '16 sq. mm', '25 sq. mm', '35 sq. mm', '50 sq. mm+'],
        applications: ['Main Building Feeders', 'Underground Trenches', 'Industrial Panels'],
      }),
    ],
  },

  {
    id: 'power-cables',
    slug: 'power-cables',
    name: 'Power Cables',
    pageHeading: 'POWER CABLES',
    subheading:
      'Heavy-duty copper and aluminium power distribution cables engineered for primary feeders, commercial grids, and industrial campuses.',
    catalogTitle: 'Power Cables',
    categoryGroup: 'Industrial & Power',
    shortDescription:
      'Complete power cable portfolio covering LT, XLPE, Armoured, Unarmoured, Copper, Aluminium, Single Core, and Multicore Power Cables.',
    overview:
      'RAILPOWER Power Cables cover bulk electrical power distribution from transformers to main LT switchboards, commercial building risers, and industrial substations. Browse all eight power cable families with individual detail pages and direct project quotation support.',
    constructionInfo:
      'Multi-layer power cable architecture incorporating stranded copper or aluminium conductors, PVC or XLPE primary insulation, inner bedding, optional galvanized steel armouring, and heavy-duty outer sheath.',
    image: siteConfig.media.powerCables,
    imageAlt: 'RAILPOWER Heavy Power Cables cross-section displaying multi-core conductors',
    features: [
      'Eight dedicated power cable families for residential towers, commercial complexes, and plants',
      'Copper and Aluminium conductor configurations available on request',
      'Armoured and Unarmoured mechanical protection choices',
      'Single Core and Multicore (2C, 3C, 3.5C, 4C) options',
      'Neatly marked outer sheathing for trench and tray installations',
    ],
    availableSizes: [
      '4.0 sq. mm',
      '6.0 sq. mm',
      '10 sq. mm',
      '16 sq. mm',
      '25 sq. mm',
      '35 sq. mm',
      '50 sq. mm',
      '70 sq. mm+',
    ],
    applications: [
      'Transformer to Main LT Panel Feeders',
      'Commercial High-Rise Electrical Risers',
      'Underground Cable Trenches & Ducts',
      'Industrial Plant Power Distribution',
    ],
    technicalSpecs: STANDARD_EDITABLE_SPECS(
      '[Editable: Copper / Aluminium Conductor]',
      '[Editable: XLPE / PVC Insulation System]',
      '[Editable: Single / 2 / 3 / 3.5 / 4 Core]'
    ),
    faqs: [
      {
        question: 'When should Armoured Power Cables be specified over Unarmoured?',
        answer:
          'Armoured power cables are generally selected where cables face mechanical stress such as direct ground burial or exposed industrial trays, while unarmoured cables suit enclosed ducts and indoor panel rooms.',
      },
      {
        question: 'Do you supply both Copper and Aluminium Power Cables?',
        answer:
          'Yes, both Copper Power Cables and Aluminium Power Cables are included as selectable catalogue families subject to order confirmation.',
      },
      {
        question: 'How can project buyers verify drum lengths and pricing?',
        answer:
          'Use the Request Product Quotation form below or call +91 96306 83505 with your cable schedule.',
      },
    ],
    variants: [
      createVariant({
        slug: 'lt-power-cables',
        name: 'LT Power Cables',
        image: siteConfig.media.powerCables,
        shortDescription: 'Low-tension power cables for main building distribution and industrial feeders.',
        constructionInfo: 'Copper or aluminium cores with PVC/XLPE insulation and outer protective jacket.',
        conductorOptions: ['Copper', 'Aluminium'],
        coreOptions: ['Single Core', '2 / 3 / 3.5 / 4 Core'],
        availableSizes: ['4.0 sq. mm', '6.0 sq. mm', '10 sq. mm', '16 sq. mm', '25 sq. mm', '35 sq. mm+'],
        applications: ['LT Panels', 'Commercial Complexes', 'Industrial Feeders', 'Sub-mains'],
      }),
      createVariant({
        slug: 'xlpe-power-cables',
        name: 'XLPE Power Cables',
        image: siteConfig.media.industrialCables,
        shortDescription: 'XLPE-insulated power cables suited for higher thermal endurance and bulk power runs.',
        constructionInfo: 'Cross-linked polyethylene (XLPE) insulated cores with optional armouring and outer sheath.',
        conductorOptions: ['Copper', 'Aluminium'],
        coreOptions: ['Single Core', '3 Core', '3.5 Core', '4 Core'],
        availableSizes: ['10 sq. mm', '16 sq. mm', '25 sq. mm', '35 sq. mm', '50 sq. mm+'],
        applications: ['Heavy Industrial Feeders', 'Underground Distribution', 'Substation Links'],
      }),
      createVariant({
        slug: 'armoured-power-cables',
        name: 'Armoured Power Cables',
        image: siteConfig.media.industrialCables,
        shortDescription: 'Steel-armoured power cables built for direct burial, outdoor trays, and heavy-duty sites.',
        constructionInfo: 'Insulated power cores, inner bedding, steel wire/strip armour, and robust outer sheath.',
        conductorOptions: ['Copper', 'Aluminium'],
        coreOptions: ['2 / 3 / 3.5 / 4 Core'],
        availableSizes: ['6.0 sq. mm', '10 sq. mm', '16 sq. mm', '25 sq. mm', '35 sq. mm+'],
        applications: ['Underground Trenches', 'Outdoor Yards', 'Infrastructure Networks'],
      }),
      createVariant({
        slug: 'unarmoured-power-cables',
        name: 'Unarmoured Power Cables',
        image: siteConfig.media.powerCables,
        shortDescription: 'Unarmoured power cables designed for indoor conduits, switchrooms, and enclosed trays.',
        constructionInfo: 'Multi-core or single-core insulated power conductors with flexible protective outer sheath.',
        conductorOptions: ['Copper', 'Aluminium'],
        coreOptions: ['Single Core', '2 / 3 / 4 Core'],
        availableSizes: ['4.0 sq. mm', '6.0 sq. mm', '10 sq. mm', '16 sq. mm', '25 sq. mm+'],
        applications: ['Switchgear Rooms', 'Indoor Trays', 'Commercial Risers'],
      }),
      createVariant({
        slug: 'copper-power-cables',
        name: 'Copper Power Cables',
        image: siteConfig.media.powerCables,
        shortDescription: 'High-conductivity copper power cables for critical commercial, hospital, and plant loads.',
        constructionInfo: 'Stranded electrolytic copper conductors with precision insulation and protective sheathing.',
        conductorOptions: ['Electrolytic Copper'],
        coreOptions: ['Single Core', '2 / 3 / 3.5 / 4 Core'],
        availableSizes: ['4.0 sq. mm', '6.0 sq. mm', '10 sq. mm', '16 sq. mm', '25 sq. mm+'],
        applications: ['Critical Commercial Loads', 'Manufacturing Plants', 'Main Distribution Panels'],
      }),
      createVariant({
        slug: 'aluminium-power-cables',
        name: 'Aluminium Power Cables',
        image: siteConfig.media.aluminiumConductors,
        shortDescription: 'Economical aluminium power cables for long-run distribution feeders and utility networks.',
        constructionInfo: 'Stranded aluminium conductors with insulated cores and durable outer jacket.',
        conductorOptions: ['Aluminium Conductor'],
        coreOptions: ['Single Core', '2 / 3 / 3.5 / 4 Core'],
        availableSizes: ['10 sq. mm', '16 sq. mm', '25 sq. mm', '35 sq. mm', '50 sq. mm+'],
        applications: ['Utility Feeders', 'Residential Township Distribution', 'Industrial Campuses'],
      }),
      createVariant({
        slug: 'single-core-power-cables',
        name: 'Single Core Power Cables',
        image: siteConfig.media.pvcWires,
        shortDescription: 'Heavy single-core power cables for high-ampacity phase connections and busbar feeds.',
        constructionInfo: 'Heavy stranded single copper or aluminium core with thick outer insulation.',
        conductorOptions: ['Copper', 'Aluminium'],
        coreOptions: ['Single Core'],
        availableSizes: ['16 sq. mm', '25 sq. mm', '35 sq. mm', '50 sq. mm', '70 sq. mm+'],
        applications: ['DG Set Connections', 'Transformer Tails', 'Main Busbar Links'],
      }),
      createVariant({
        slug: 'multicore-power-cables',
        name: 'Multicore Power Cables',
        image: siteConfig.media.powerCables,
        shortDescription: '2-core, 3-core, 3.5-core, and 4-core power cables for three-phase distribution lines.',
        constructionInfo: 'Multiple colour-coded insulated conductors assembled under inner bedding and outer sheath.',
        conductorOptions: ['Copper', 'Aluminium'],
        coreOptions: ['2 Core', '3 Core', '3.5 Core', '4 Core'],
        availableSizes: ['4.0 sq. mm', '6.0 sq. mm', '10 sq. mm', '16 sq. mm', '25 sq. mm+'],
        applications: ['Three-Phase Distribution', 'Industrial Motors', 'Building Risers'],
      }),
    ],
  },

  {
    id: 'flexible-wires',
    slug: 'flexible-wires',
    name: 'Flexible Wires',
    pageHeading: 'FLEXIBLE WIRES',
    subheading:
      'Fine-stranded flexible copper wires and multi-core cords built for tight panel bends, machinery, and appliances.',
    catalogTitle: 'Flexible Wires',
    categoryGroup: 'Conductors & Special',
    shortDescription:
      'Supple multi-strand copper flexible wires and multi-core cords engineered for control cabinets, portable equipment, and compact routing.',
    overview:
      'RAILPOWER Flexible Wires combine fine copper stranding with smooth outer sheathing for installations involving tight bending radii, frequent movement, or dense switchgear cabinet routing.',
    constructionInfo:
      'Multi-strand flexible copper conductors insulated and jacketed in supple polymer compounds for easy stripping and reliable lug crimping.',
    image: siteConfig.media.flexibleWires,
    imageAlt: 'RAILPOWER Flexible multi-core copper wires wound on industrial reels',
    features: [
      'Fine copper stranding for tight bending radii inside enclosures',
      'Available in single-core panel wires and multi-core flexible cords',
      'Clean-stripping sheath suited for ferrules and cable lugs',
      'Reference sizes from 0.5 sq. mm to 10 sq. mm and above on request',
    ],
    availableSizes: [
      '0.5 sq. mm',
      '0.75 sq. mm',
      '1.0 sq. mm',
      '1.5 sq. mm',
      '2.5 sq. mm',
      '4.0 sq. mm',
      '6.0 sq. mm',
      '10 sq. mm',
    ],
    colourOptions: HOUSE_WIRE_COLOURS,
    applications: [
      'Control Panels & Switchgear Cabinets',
      'Commercial & Domestic Appliances',
      'Workshop Machinery & Portable Equipment',
      'Tight-Radius Conduit Routing',
    ],
    technicalSpecs: STANDARD_EDITABLE_SPECS(
      '[Editable: Fine-Stranded Flexible Copper]',
      '[Editable: Flexible PVC / Elastomeric Grade]',
      '[Editable: Single / 2 / 3 / 4 Core+]'
    ),
    faqs: [
      {
        question: 'Where are Flexible Wires typically preferred over solid conductors?',
        answer:
          'Flexible wires are preferred in switchgear doors, moving machine parts, appliance cords, and dense control panels where tight bends are required.',
      },
      {
        question: 'Are multi-core flexible cords available in custom reel lengths?',
        answer:
          'Reel and coil packing options can be confirmed when you submit a product quotation request.',
      },
    ],
    variants: [
      createVariant({
        slug: 'single-core-flexible-copper-wire',
        name: 'Single Core Flexible Copper Wire',
        image: siteConfig.media.flexibleWires,
        shortDescription: 'Single-core fine-stranded copper wire for panel doors, enclosures, and appliances.',
        constructionInfo: 'Fine multi-strand copper conductor with supple polymer insulation.',
        conductorOptions: ['Flexible Stranded Copper'],
        coreOptions: ['Single Core'],
        availableSizes: ['0.5 sq. mm', '0.75 sq. mm', '1.0 sq. mm', '1.5 sq. mm', '2.5 sq. mm', '4.0 sq. mm', '6.0 sq. mm'],
        applications: ['Switchgear Wiring', 'Panel Doors', 'Equipment Hookups'],
      }),
      createVariant({
        slug: 'multi-core-flexible-cord',
        name: 'Multi-Core Flexible Cord',
        image: siteConfig.media.flexibleWires,
        shortDescription: '2, 3, and 4-core sheathed flexible cords for portable machinery and appliances.',
        constructionInfo: 'Twisted flexible copper cores inside a smooth protective outer jacket.',
        conductorOptions: ['Flexible Stranded Copper'],
        coreOptions: ['2 Core', '3 Core', '4 Core'],
        availableSizes: ['0.75 sq. mm', '1.0 sq. mm', '1.5 sq. mm', '2.5 sq. mm', '4.0 sq. mm'],
        applications: ['Portable Power Tools', 'Workshop Equipment', 'Commercial Appliances'],
      }),
      createVariant({
        slug: 'panel-switchgear-flexible-wire',
        name: 'Panel & Switchgear Flexible Wire',
        image: siteConfig.media.electricalCables,
        shortDescription: 'Colour-coded flexible wiring designed for MCC, PCC, and distribution panels.',
        constructionInfo: 'High-flexibility copper stranding with crisp colour-coded insulation.',
        conductorOptions: ['Flexible Copper'],
        coreOptions: ['Single Core'],
        availableSizes: ['0.5 sq. mm', '0.75 sq. mm', '1.0 sq. mm', '1.5 sq. mm', '2.5 sq. mm', '4.0 sq. mm'],
        applications: ['MCC / PCC Panels', 'Control Cabinets', 'Automation Enclosures'],
      }),
    ],
  },

  {
    id: 'special-cables',
    slug: 'special-cables',
    name: 'Special Cables',
    pageHeading: 'SPECIAL CABLES & ACCESSORIES',
    subheading:
      'Application-specific cables for submersible pumps, solar DC arrays, welding equipment, control circuits, and electrical installations.',
    catalogTitle: 'Special Cables',
    categoryGroup: 'Conductors & Special',
    shortDescription:
      'Specialized cable families including Submersible Flat Cables, Solar DC Cables, Welding Cables, and Control & Instrumentation Cables.',
    overview:
      'Beyond standard building and power cables, RAILPOWER WIRE & CABLE presents application-focused special cable categories for agricultural pumping, solar photovoltaic strings, welding fabrication, and industrial control systems—supplied on an Availability on Request basis.',
    constructionInfo:
      'Engineered per application duty—including moisture-resistant flat PVC jackets for submersible pumps, UV-stabilized sheaths for solar arrays, and heavy elastomeric jackets for welding leads.',
    image: siteConfig.media.submersibleCables,
    imageAlt: 'RAILPOWER Special Cables including 3-core flat submersible, solar DC, and welding cables',
    features: [
      'Dedicated categories for agriculture, solar energy, welding, and industrial controls',
      'Application-matched outer jacketing options (moisture, UV, or abrasion resistant)',
      'Clearly marked Availability on Request for transparent order scheduling',
      'Supported by direct technical & commercial enquiry handling',
    ],
    availableSizes: [
      '0.75 sq. mm',
      '1.5 sq. mm',
      '2.5 sq. mm',
      '4.0 sq. mm',
      '6.0 sq. mm',
      '10 sq. mm',
      '16 sq. mm – 50 sq. mm (Welding)',
    ],
    applications: [
      'Agricultural & Domestic Borewell Submersible Pumps',
      'Solar Rooftop & Utility Photovoltaic Systems',
      'Arc Welding & Metal Fabrication Workshops',
      'Factory Control & Signalling Panels',
    ],
    technicalSpecs: STANDARD_EDITABLE_SPECS(
      '[Editable: Bare / Tinned / Fine-Stranded Copper]',
      '[Editable: Water / UV / Heat-Resistant Jacket]',
      '[Editable: 3-Core Flat / Single / Multi-Core]'
    ),
    faqs: [
      {
        question: 'Can dealers stock Submersible and Solar DC cables together?',
        answer:
          'Yes, electrical retailers and agricultural hardware dealers frequently combine Submersible Flat Cables, House Wires, and Solar DC Cables in their trade enquiries.',
      },
      {
        question: 'Are Solar DC and Welding cables supplied in custom coil lengths?',
        answer:
          'Coil and drum lengths can be confirmed based on order volume when you request a product quotation.',
      },
    ],
    variants: [
      createVariant({
        slug: 'submersible-flat-cables',
        name: 'Submersible Flat Cables',
        image: siteConfig.media.submersibleCables,
        shortDescription: '3-core flat water-resistant copper cables for borewell and agricultural submersible pumps.',
        constructionInfo: 'Three multi-strand copper cores arranged side by side in a moisture-resistant flat outer jacket.',
        conductorOptions: ['Multi-Strand Copper'],
        coreOptions: ['3 Core Flat'],
        availableSizes: ['1.5 sq. mm', '2.5 sq. mm', '4.0 sq. mm', '6.0 sq. mm', '10 sq. mm'],
        applications: ['Borewell Submersible Pumps', 'Agricultural Irrigation', 'Deep-Well Motors'],
      }),
      createVariant({
        slug: 'solar-dc-cables',
        name: 'Solar DC Cables',
        image: siteConfig.media.solarCables,
        shortDescription: 'UV-stabilized photovoltaic DC cable options for solar rooftop and ground-mount arrays.',
        constructionInfo: 'Flexible copper conductor with weather- and UV-resistant outer insulation.',
        conductorOptions: ['Tinned / Bare Copper (Configurable)'],
        coreOptions: ['Single Core', 'Twin Core'],
        availableSizes: ['2.5 sq. mm', '4.0 sq. mm', '6.0 sq. mm', '10 sq. mm'],
        applications: ['Solar Panel Strings', 'Rooftop PV Systems', 'Solar Inverters'],
      }),
      createVariant({
        slug: 'welding-cables',
        name: 'Welding Cables',
        image: siteConfig.media.weldingCables,
        shortDescription: 'Heavy-duty flexible copper welding leads for industrial fabrication and site welding.',
        constructionInfo: 'High-flexibility bare copper stranding with durable outer elastomeric jacket.',
        conductorOptions: ['Fine-Stranded Copper'],
        coreOptions: ['Single Core'],
        availableSizes: ['16 sq. mm', '25 sq. mm', '35 sq. mm', '50 sq. mm'],
        applications: ['Arc Welding Units', 'Fabrication Workshops', 'Heavy Engineering Sites'],
      }),
      createVariant({
        slug: 'control-instrumentation-cables',
        name: 'Control & Instrumentation Cables',
        image: siteConfig.media.electricalCables,
        shortDescription: 'Multi-core control and signalling cables for automated panels and process lines.',
        constructionInfo: 'Numbered/colour-coded insulated copper cores under protective outer sheath.',
        conductorOptions: ['Copper Conductor'],
        coreOptions: ['2 Core to 24+ Core (On Request)'],
        availableSizes: ['0.5 sq. mm', '0.75 sq. mm', '1.0 sq. mm', '1.5 sq. mm', '2.5 sq. mm'],
        applications: ['Automation Panels', 'Process Control', 'Industrial Signalling'],
      }),
    ],
  },
];

export function getCategoryBySlug(slug: string): ProductCategory | undefined {
  // Backward-compatible alias for earlier /products/electrical-cables URL
  const normalizedSlug = slug === 'electrical-cables' ? 'special-cables' : slug;
  return PRODUCT_CATEGORIES.find((cat) => cat.slug === normalizedSlug);
}

export function getVariantBySlugs(
  categorySlug: string,
  variantSlug: string
): { category: ProductCategory; variant: ProductVariant } | undefined {
  const category = getCategoryBySlug(categorySlug);
  if (!category) return undefined;
  const variant = category.variants.find((v) => v.slug === variantSlug);
  if (!variant) return undefined;
  return { category, variant };
}
