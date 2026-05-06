import { MainQuestion } from '../../types';
import * as R from './routingHelpers';

// =============================================================================
// I. Textile, Garments, Tailoring, Dyeing and Washing Module (TX-01..TX-12)
// =============================================================================
export const TEXTILE_QUESTIONS: MainQuestion[] = [
  {
    id: 'TX-01',
    domain: 'D3',
    weightPriority: 'Medium',
    text: {
      en: 'Do you track fabric, thread, trims, and other material waste from cutting, sewing, embroidery, or production?',
      bn: 'আপনি কি কাটিং, সেলাই, এমব্রয়ডারি বা উৎপাদন থেকে কাপড়, সুতা, ট্রিমস এবং অন্যান্য উপাদানের অপচয়ের হিসাব রাখেন?'
    },
    evidenceExamples: { en: 'Waste records, cutting room observation', bn: 'অপচয়ের রেকর্ড, কাটিং রুম পর্যবেক্ষণ' },
    financeLink: { en: 'Buyer compliance readiness', bn: 'বায়ার কমপ্লায়েন্স প্রস্তুতি' },
    routingCondition: (a) => R.sectorIs(a, R.SECTOR_TEXTILE)
  },
  {
    id: 'TX-02',
    domain: 'D3',
    weightPriority: 'High',
    text: {
      en: 'Do you reduce fabric waste through pattern efficiency, reuse, resale, recycling, or making smaller products?',
      bn: 'আপনি কি প্যাটার্ন দক্ষতা, পুনঃব্যবহার, পুনঃবিক্রয়, recycle বা ছোট পণ্য তৈরির মাধ্যমে কাপড়ের অপচয় কমান?'
    },
    evidenceExamples: { en: 'Fabric reuse, scrap sale receipt', bn: 'কাপড় পুনঃব্যবহার, scrap বিক্রির রশিদ' },
    financeLink: { en: 'Circularity, textile readiness', bn: 'সার্কুলারিটি, টেক্সটাইল প্রস্তুতি' },
    routingCondition: (a) => R.sectorIs(a, R.SECTOR_TEXTILE)
  },
  {
    id: 'TX-03',
    domain: 'D2',
    weightPriority: 'Very High',
    criticalRisk: true,
    text: {
      en: 'If dyeing, washing, printing, or finishing is done, is wastewater treated, reused, or safely disposed?',
      bn: 'যদি ডাইং, ওয়াশিং, প্রিন্টিং বা ফিনিশিং করা হয়, তাহলে wastewater কি treat, পুনঃব্যবহার বা নিরাপদে নিষ্কাশন করা হয়?'
    },
    evidenceExamples: { en: 'ETP, settling tank, disposal route', bn: 'ETP, settling ট্যাঙ্ক, নিষ্কাশনের পথ' },
    financeLink: { en: 'Buyer compliance, ISO 14001', bn: 'বায়ার কমপ্লায়েন্স, ISO 14001' },
    routingCondition: (a) => R.subSectorIs(a, 'Dyeing', 'Washing', 'Printing')
  },
  {
    id: 'TX-04',
    domain: 'D4',
    weightPriority: 'Very High',
    criticalRisk: true,
    text: {
      en: 'Do you store dyes, chemicals, detergents, solvents, or bleaching agents safely and separately?',
      bn: 'আপনি কি ডাই, রাসায়নিক, ডিটারজেন্ট, সলভেন্ট বা ব্লিচিং এজেন্ট নিরাপদে এবং আলাদাভাবে সংরক্ষণ করেন?'
    },
    evidenceExamples: { en: 'Chemical storage, labels', bn: 'রাসায়নিক সংরক্ষণ, লেবেল' },
    financeLink: { en: 'Higg/FEM-style readiness, ISO 14001', bn: 'Higg/FEM ধাঁচের প্রস্তুতি, ISO 14001' },
    routingCondition: (a) => R.sectorIs(a, R.SECTOR_TEXTILE) && R.usesChemicals(a)
  },
  {
    id: 'TX-05',
    domain: 'D2',
    weightPriority: 'Very High',
    criticalRisk: true,
    text: {
      en: 'Do you avoid pouring dye, chemical, detergent, or printing wastewater directly into drains, canals, ponds, or open land?',
      bn: 'আপনি কি ডাই, রাসায়নিক, ডিটারজেন্ট বা প্রিন্টিং wastewater সরাসরি ড্রেন, খাল, পুকুর বা খোলা মাটিতে ফেলা এড়িয়ে চলেন?'
    },
    evidenceExamples: { en: 'Drainage observation', bn: 'ড্রেনেজ পর্যবেক্ষণ' },
    financeLink: { en: 'Pollution prevention', bn: 'দূষণ প্রতিরোধ' },
    routingCondition: (a) => R.subSectorIs(a, 'Dyeing', 'Washing', 'Printing')
  },
  {
    id: 'TX-06',
    domain: 'D1',
    weightPriority: 'Medium',
    text: {
      en: 'Do you track electricity use from sewing machines, ironing, boilers, compressors, lighting, or washing machines?',
      bn: 'আপনি কি সেলাই মেশিন, ইস্ত্রি, বয়লার, কম্প্রেসর, লাইটিং বা ওয়াশিং মেশিনের বিদ্যুৎ ব্যবহারের হিসাব রাখেন?'
    },
    evidenceExamples: { en: 'Electricity bills, production records', bn: 'বিদ্যুৎ বিল, উৎপাদন রেকর্ড' },
    financeLink: { en: 'Energy finance', bn: 'শক্তি অর্থায়ন' },
    routingCondition: (a) => R.sectorIs(a, R.SECTOR_TEXTILE) && R.hasMachinery(a)
  },
  {
    id: 'TX-07',
    domain: 'D1',
    weightPriority: 'Medium',
    text: {
      en: 'Do you use efficient lighting, motors, irons, boilers, compressors, or production equipment?',
      bn: 'আপনি কি দক্ষ লাইটিং, মোটর, ইস্ত্রি, বয়লার, কম্প্রেসর বা উৎপাদন যন্ত্রপাতি ব্যবহার করেন?'
    },
    evidenceExamples: { en: 'Equipment receipts, photos', bn: 'যন্ত্রপাতির রশিদ, ছবি' },
    financeLink: { en: 'Energy efficiency finance', bn: 'শক্তি সাশ্রয়ী অর্থায়ন' },
    routingCondition: (a) => R.sectorIs(a, R.SECTOR_TEXTILE) && R.hasMachinery(a)
  },
  {
    id: 'TX-08',
    domain: 'D7',
    weightPriority: 'High',
    text: {
      en: 'Do you keep buyer, supplier, fabric, chemical, production, and waste records?',
      bn: 'আপনি কি বায়ার, সরবরাহকারী, কাপড়, রাসায়নিক, উৎপাদন এবং অপচয়ের রেকর্ড রাখেন?'
    },
    evidenceExamples: { en: 'Purchase records, buyer docs', bn: 'ক্রয়ের রেকর্ড, বায়ার ডকুমেন্ট' },
    financeLink: { en: 'Buyer compliance readiness', bn: 'বায়ার কমপ্লায়েন্স প্রস্তুতি' },
    routingCondition: (a) => R.sectorIs(a, R.SECTOR_TEXTILE)
  },
  {
    id: 'TX-09',
    domain: 'D6',
    weightPriority: 'High',
    text: {
      en: 'Are workers protected from chemical smell, dust, lint, heat, noise, and poor ventilation?',
      bn: 'কর্মীরা কি রাসায়নিক গন্ধ, ধুলা, লিন্ট, তাপ, শব্দ এবং দুর্বল ভেন্টিলেশন থেকে সুরক্ষিত?'
    },
    evidenceExamples: { en: 'Ventilation, masks, fans, observation', bn: 'ভেন্টিলেশন, মাস্ক, ফ্যান, পর্যবেক্ষণ' },
    financeLink: { en: 'Workplace environmental safety', bn: 'কর্মস্থলের পরিবেশগত নিরাপত্তা' },
    routingCondition: (a) => R.sectorIs(a, R.SECTOR_TEXTILE) && R.hasWorkers(a)
  },
  {
    id: 'TX-10',
    domain: 'D3',
    weightPriority: 'High',
    text: {
      en: 'Do you segregate rejected garments, fabric offcuts, thread cones, plastic packaging, paper, and hazardous waste?',
      bn: 'আপনি কি বাতিল গার্মেন্টস, কাপড়ের কাটা টুকরো, সুতার কোন, plastic প্যাকেজিং, কাগজ এবং hazardous waste আলাদা করেন?'
    },
    evidenceExamples: { en: 'Separate storage, recycler receipt', bn: 'আলাদা সংরক্ষণ, recycler-এর রশিদ' },
    financeLink: { en: 'Circularity readiness', bn: 'সার্কুলারিটি প্রস্তুতি' },
    routingCondition: (a) => R.sectorIs(a, R.SECTOR_TEXTILE)
  },
  {
    id: 'TX-11',
    domain: 'D4',
    weightPriority: 'Medium',
    text: {
      en: 'Do you use lower-impact materials, recycled fabric, organic cotton, certified inputs, or buyer-approved materials where possible?',
      bn: 'আপনি কি যেখানে সম্ভব কম-প্রভাবযুক্ত উপাদান, recycled কাপড়, organic cotton, certified ইনপুট বা বায়ার-অনুমোদিত উপাদান ব্যবহার করেন?'
    },
    evidenceExamples: { en: 'Supplier certificates, purchase docs', bn: 'সরবরাহকারীর সার্টিফিকেট, ক্রয়ের ডকুমেন্ট' },
    financeLink: { en: 'Certification/buyer readiness', bn: 'সার্টিফিকেশন/বায়ার প্রস্তুতি' },
    routingCondition: (a) => R.sectorIs(a, R.SECTOR_TEXTILE) && R.hasCertificationInterest(a)
  },
  {
    id: 'TX-12',
    domain: 'D8',
    weightPriority: 'Pathway',
    text: {
      en: 'Are you interested in buyer compliance, environmental audit readiness, recycled-content certification, or ISO 14001-style improvement?',
      bn: 'আপনি কি বায়ার কমপ্লায়েন্স, পরিবেশগত অডিট প্রস্তুতি, recycled-content সার্টিফিকেশন বা ISO 14001 ধাঁচের উন্নতিতে আগ্রহী?'
    },
    evidenceExamples: { en: 'Stated interest', bn: 'ঘোষিত আগ্রহ' },
    financeLink: { en: 'Certification pathway', bn: 'সার্টিফিকেশন pathway' },
    routingCondition: (a) => R.sectorIs(a, R.SECTOR_TEXTILE)
  }
];
