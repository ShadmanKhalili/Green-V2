import { MainQuestion } from '../../types';
import * as R from './routingHelpers';

// =============================================================================
// G. Livestock, Dairy, Poultry and Fisheries Module (LV-01..LV-14)
// =============================================================================
export const LIVESTOCK_QUESTIONS: MainQuestion[] = [
  {
    id: 'LV-01',
    domain: 'D3',
    weightPriority: 'Very High',
    criticalRisk: true,
    text: {
      en: 'How do you manage manure, dung, poultry litter, bedding, or animal waste?',
      bn: 'আপনি গোবর, হাঁস-মুরগির বিষ্ঠা, লিটার, বিছানা বা পশুর বর্জ্য কীভাবে পরিচালনা করেন?'
    },
    evidenceExamples: {
      en: 'Manure pit, compost area, disposal method',
      bn: 'গোবর গর্ত, কম্পোস্ট এলাকা, নিষ্কাশন পদ্ধতি'
    },
    financeLink: {
      en: 'Green finance, organic/safe livestock readiness',
      bn: 'সবুজ অর্থায়ন, জৈব/নিরাপদ পশুপালন প্রস্তুতি'
    },
    routingCondition: (a) => R.sectorIs(a, R.SECTOR_LIVESTOCK)
  },
  {
    id: 'LV-02',
    domain: 'D3',
    weightPriority: 'Very High',
    criticalRisk: true,
    text: {
      en: 'Do you compost manure or use it safely as fertilizer instead of leaving it unmanaged?',
      bn: 'আপনি কি গোবর কম্পোস্ট করেন বা অব্যবস্থাপনায় না রেখে নিরাপদে সারের মতো ব্যবহার করেন?'
    },
    evidenceExamples: {
      en: 'Compost pit, field use, photos',
      bn: 'কম্পোস্ট গর্ত, মাঠে ব্যবহার, ছবি'
    },
    financeLink: {
      en: 'Composting/biogas finance',
      bn: 'কম্পোস্টিং/biogas অর্থায়ন'
    },
    routingCondition: (a) => R.hasManureOrLitter(a) || R.sectorIs(a, R.SECTOR_LIVESTOCK)
  },
  {
    id: 'LV-03',
    domain: 'D2',
    weightPriority: 'Very High',
    criticalRisk: true,
    text: {
      en: 'Is manure or animal waste kept away from drains, canals, ponds, rivers, tube wells, and household water sources?',
      bn: 'গোবর বা পশুর বর্জ্য কি ড্রেন, খাল, পুকুর, নদী, টিউবওয়েল এবং ঘরের পানির উৎস থেকে দূরে রাখা হয়?'
    },
    evidenceExamples: {
      en: 'Distance/containment observation',
      bn: 'দূরত্ব/আবদ্ধতা পর্যবেক্ষণ'
    },
    financeLink: {
      en: 'Local pollution prevention',
      bn: 'স্থানীয় দূষণ প্রতিরোধ'
    },
    routingCondition: (a) => R.sectorIs(a, R.SECTOR_LIVESTOCK)
  },
  {
    id: 'LV-04',
    domain: 'D6',
    weightPriority: 'High',
    text: {
      en: 'Do you control odour, flies, mosquitoes, and dirty runoff from animal sheds or ponds?',
      bn: 'আপনি কি পশুর শেড বা পুকুর থেকে দুর্গন্ধ, মাছি, মশা এবং নোংরা পানি নিয়ন্ত্রণ করেন?'
    },
    evidenceExamples: {
      en: 'Shed cleanliness, drainage, lime, covers',
      bn: 'শেডের পরিচ্ছন্নতা, ড্রেনেজ, চুন, ঢাকনা'
    },
    financeLink: {
      en: 'Community impact reduction',
      bn: 'কমিউনিটি প্রভাব হ্রাস'
    },
    routingCondition: (a) => R.sectorIs(a, R.SECTOR_LIVESTOCK)
  },
  {
    id: 'LV-05',
    domain: 'D2',
    weightPriority: 'High',
    text: {
      en: 'Do you clean sheds, cages, or ponds using water efficiently without creating stagnant wastewater?',
      bn: 'আপনি কি শেড, খাঁচা বা পুকুর পরিষ্কারের সময় পানি দক্ষতার সাথে ব্যবহার করেন এবং জমে থাকা নোংরা পানি এড়িয়ে চলেন?'
    },
    evidenceExamples: {
      en: 'Cleaning practice, drainage observation',
      bn: 'পরিষ্কারের অভ্যাস, ড্রেনেজ পর্যবেক্ষণ'
    },
    financeLink: {
      en: 'Water and hygiene readiness',
      bn: 'পানি ও স্বাস্থ্যবিধি প্রস্তুতি'
    },
    routingCondition: (a) => R.sectorIs(a, R.SECTOR_LIVESTOCK)
  },
  {
    id: 'LV-06',
    domain: 'D3',
    weightPriority: 'High',
    text: {
      en: 'Do you use biogas, covered pits, composting, drying, or other methods to reduce animal waste impact?',
      bn: 'আপনি কি পশুর বর্জ্যের প্রভাব কমাতে biogas, ঢাকা গর্ত, কম্পোস্টিং, শুকানো বা অন্যান্য পদ্ধতি ব্যবহার করেন?'
    },
    evidenceExamples: {
      en: 'Biogas plant, covered pit, compost',
      bn: 'Biogas প্ল্যান্ট, ঢাকা গর্ত, কম্পোস্ট'
    },
    financeLink: {
      en: 'Green finance',
      bn: 'সবুজ অর্থায়ন'
    },
    routingCondition: (a) => R.hasManureOrLitter(a) || R.sectorIs(a, R.SECTOR_LIVESTOCK)
  },
  {
    id: 'LV-07',
    domain: 'D3',
    weightPriority: 'Very High',
    criticalRisk: true,
    text: {
      en: 'Do you safely dispose of dead animals, sick birds/fish, veterinary medicine containers, needles, or sharp items?',
      bn: 'আপনি কি মৃত পশু, অসুস্থ পাখি/মাছ, ভেটেরিনারি ওষুধের কন্টেইনার, সুঁই বা ধারালো জিনিস নিরাপদে নিষ্পত্তি করেন?'
    },
    evidenceExamples: {
      en: 'Disposal pit, vet records, container storage',
      bn: 'নিষ্কাশন গর্ত, ভেটেরিনারি রেকর্ড, কন্টেইনার সংরক্ষণ'
    },
    financeLink: {
      en: 'Biosecurity and safety',
      bn: 'বায়োসিকিউরিটি ও নিরাপত্তা'
    },
    routingCondition: (a) => R.sectorIs(a, R.SECTOR_LIVESTOCK)
  },
  {
    id: 'LV-08',
    domain: 'D3',
    weightPriority: 'Medium',
    text: {
      en: 'Do you manage feed storage to avoid spoilage, pests, mould, and waste?',
      bn: 'আপনি কি খাবার নষ্ট হওয়া, পোকামাকড়, ছত্রাক এবং অপচয় এড়াতে ফিড সংরক্ষণ ব্যবস্থাপনা করেন?'
    },
    evidenceExamples: {
      en: 'Feed storage, records',
      bn: 'ফিড সংরক্ষণ, রেকর্ড'
    },
    financeLink: {
      en: 'Resource efficiency',
      bn: 'সম্পদের দক্ষ ব্যবহার'
    },
    routingCondition: (a) => R.sectorIs(a, R.SECTOR_LIVESTOCK)
  },
  {
    id: 'LV-09',
    domain: 'D7',
    weightPriority: 'High',
    text: {
      en: 'Do you keep records of feed, medicine, milk/egg/meat/fish production, mortality, and waste use?',
      bn: 'আপনি কি ফিড, ওষুধ, দুধ/ডিম/মাংস/মাছ উৎপাদন, মৃত্যুহার এবং বর্জ্য ব্যবহারের রেকর্ড রাখেন?'
    },
    evidenceExamples: {
      en: 'Notebook, vet prescription, sales record',
      bn: 'নোটবুক, ভেটেরিনারি প্রেসক্রিপশন, বিক্রয় রেকর্ড'
    },
    financeLink: {
      en: 'Certification/finance readiness',
      bn: 'সার্টিফিকেশন/অর্থায়ন প্রস্তুতি'
    },
    routingCondition: (a) => R.sectorIs(a, R.SECTOR_LIVESTOCK)
  },
  {
    id: 'LV-10',
    domain: 'D6',
    weightPriority: 'High',
    text: {
      en: 'Do neighbours complain about smell, flies, wastewater, noise, or runoff from the farm?',
      bn: 'প্রতিবেশীরা কি খামারের গন্ধ, মাছি, বর্জ্য পানি, শব্দ বা নোংরা পানি নিয়ে অভিযোগ করেন?'
    },
    evidenceExamples: {
      en: 'Complaint history, owner statement',
      bn: 'অভিযোগের ইতিহাস, মালিকের বক্তব্য'
    },
    financeLink: {
      en: 'Risk flag',
      bn: 'ঝুঁকি চিহ্ন'
    },
    routingCondition: (a) => R.sectorIs(a, R.SECTOR_LIVESTOCK)
  },
  {
    id: 'LV-11',
    domain: 'D2',
    weightPriority: 'Very High',
    criticalRisk: true,
    text: {
      en: 'Do you prevent animal waste or pond wastewater from entering nearby crops, households, drains, or water bodies?',
      bn: 'আপনি কি পশুর বর্জ্য বা পুকুরের নোংরা পানি কাছাকাছি ফসল, বাড়িঘর, ড্রেন বা জলাশয়ে ঢোকা প্রতিরোধ করেন?'
    },
    evidenceExamples: {
      en: 'Drainage control, buffer area',
      bn: 'ড্রেনেজ নিয়ন্ত্রণ, বাফার এলাকা'
    },
    financeLink: {
      en: 'Pollution prevention',
      bn: 'দূষণ প্রতিরোধ'
    },
    routingCondition: (a) => R.sectorIs(a, R.SECTOR_LIVESTOCK)
  },
  {
    id: 'LV-12',
    domain: 'D4',
    weightPriority: 'High',
    text: {
      en: 'Do you use veterinary medicine carefully and avoid disposing unused medicine into drains, ponds, or soil?',
      bn: 'আপনি কি ভেটেরিনারি ওষুধ সাবধানে ব্যবহার করেন এবং অব্যবহৃত ওষুধ ড্রেন, পুকুর বা মাটিতে ফেলা এড়িয়ে চলেন?'
    },
    evidenceExamples: {
      en: 'Vet prescription, storage, disposal practice',
      bn: 'ভেটেরিনারি প্রেসক্রিপশন, সংরক্ষণ, নিষ্পত্তি পদ্ধতি'
    },
    financeLink: {
      en: 'Food safety/certification',
      bn: 'খাদ্য নিরাপত্তা/সার্টিফিকেশন'
    },
    routingCondition: (a) => R.usesVeterinaryMedicine(a) || R.producesWasteOfType(a, 'Medical/veterinary waste') || R.sectorIs(a, R.SECTOR_LIVESTOCK)
  },
  {
    id: 'LV-13',
    domain: 'D6',
    weightPriority: 'Medium',
    text: {
      en: 'Do you maintain ventilation, shade, and temperature control in sheds to reduce disease, odour, and energy waste?',
      bn: 'আপনি কি রোগ, দুর্গন্ধ এবং শক্তির অপচয় কমাতে শেডে বায়ু চলাচল, ছায়া এবং তাপমাত্রা নিয়ন্ত্রণ বজায় রাখেন?'
    },
    evidenceExamples: {
      en: 'Shed observation, fans, shade',
      bn: 'শেড পর্যবেক্ষণ, ফ্যান, ছায়া'
    },
    financeLink: {
      en: 'Productivity and welfare',
      bn: 'উৎপাদনশীলতা ও কল্যাণ'
    },
    routingCondition: (a) => R.sectorIs(a, R.SECTOR_LIVESTOCK)
  },
  {
    id: 'LV-14',
    domain: 'D2',
    weightPriority: 'High',
    text: {
      en: 'For fisheries, do you manage feed, chemicals, lime, probiotics, or pond inputs to avoid water pollution and fish mortality?',
      bn: 'মৎস্য চাষের জন্য, আপনি কি পানি দূষণ এবং মাছের মৃত্যু এড়াতে ফিড, রাসায়নিক, চুন, probiotics বা পুকুরের ইনপুট ব্যবস্থাপনা করেন?'
    },
    evidenceExamples: {
      en: 'Input records, pond observation',
      bn: 'ইনপুট রেকর্ড, পুকুর পর্যবেক্ষণ'
    },
    financeLink: {
      en: 'Safe aquaculture readiness',
      bn: 'নিরাপদ aquaculture প্রস্তুতি'
    },
    routingCondition: (a) => R.subSectorIs(a, 'Fish farming / aquaculture', 'Hatchery', 'Mixed livestock/fisheries')
  }
];
