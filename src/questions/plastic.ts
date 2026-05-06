import { MainQuestion } from '../../types';
import * as R from './routingHelpers';

// =============================================================================
// M. Plastic, Packaging, Printing and Recycling Module (PP-01..PP-10)
// =============================================================================
export const PLASTIC_QUESTIONS: MainQuestion[] = [
  {
    id: 'PP-01',
    domain: 'D3',
    weightPriority: 'High',
    text: {
      en: 'Do you track raw material use, rejected products, offcuts, ink, packaging, or scrap rates?',
      bn: 'আপনি কি কাঁচামালের ব্যবহার, রিজেক্ট পণ্য, অফকাট, কালি, প্যাকেজিং বা স্ক্র্যাপের হার পর্যবেক্ষণ করেন?'
    },
    evidenceExamples: {
      en: 'Production records, waste records',
      bn: 'উৎপাদন রেকর্ড, বর্জ্য রেকর্ড'
    },
    financeLink: {
      en: 'Resource efficiency',
      bn: 'রিসোর্স দক্ষতা'
    },
    routingCondition: (a) => R.sectorIs(a, R.SECTOR_PLASTIC)
  },
  {
    id: 'PP-02',
    domain: 'D3',
    weightPriority: 'High',
    text: {
      en: 'Do you reuse production scraps or sell them to recyclers where safe and possible?',
      bn: 'আপনি কি উৎপাদনের স্ক্র্যাপ পুনরায় ব্যবহার করেন বা যেখানে নিরাপদ ও সম্ভব সেখানে রিসাইক্লারদের কাছে বিক্রি করেন?'
    },
    evidenceExamples: {
      en: 'Scrap reuse, recycler receipt',
      bn: 'স্ক্র্যাপের পুনঃব্যবহার, রিসাইক্লারের রসিদ'
    },
    financeLink: {
      en: 'Circularity readiness',
      bn: 'সার্কুলারিটি প্রস্তুতি'
    },
    routingCondition: (a) => R.sectorIs(a, R.SECTOR_PLASTIC) || R.hasRecyclableWaste(a)
  },
  {
    id: 'PP-03',
    domain: 'D3',
    weightPriority: 'Medium',
    text: {
      en: 'Do you reduce defective products through machine maintenance, quality checks, and careful production planning?',
      bn: 'আপনি কি মেশিন রক্ষণাবেক্ষণ, মান যাচাই এবং সতর্ক উৎপাদন পরিকল্পনার মাধ্যমে ত্রুটিপূর্ণ পণ্য কমান?'
    },
    evidenceExamples: {
      en: 'Quality records, reduced rejects',
      bn: 'মান রেকর্ড, রিজেক্ট হ্রাস'
    },
    financeLink: {
      en: 'Resource efficiency',
      bn: 'রিসোর্স দক্ষতা'
    },
    routingCondition: (a) => R.sectorIs(a, R.SECTOR_PLASTIC) || R.sectorIs(a, R.SECTOR_MANUFACTURING)
  },
  {
    id: 'PP-04',
    domain: 'D4',
    weightPriority: 'Very High',
    criticalRisk: true,
    text: {
      en: 'Are inks, solvents, adhesives, chemicals, or cleaning agents stored safely and labelled?',
      bn: 'কালি, সলভেন্ট, আঠা, রাসায়নিক বা পরিষ্কারের পণ্য কি নিরাপদে সংরক্ষণ করা ও লেবেল করা হয়?'
    },
    evidenceExamples: {
      en: 'Storage area, labels',
      bn: 'সংরক্ষণের জায়গা, লেবেল'
    },
    financeLink: {
      en: 'ISO 14001 readiness',
      bn: 'ISO 14001 প্রস্তুতি'
    },
    routingCondition: (a) => R.sectorIs(a, R.SECTOR_PLASTIC) && R.usesChemicals(a)
  },
  {
    id: 'PP-05',
    domain: 'D2',
    weightPriority: 'Very High',
    criticalRisk: true,
    text: {
      en: 'Do you prevent ink, solvent, adhesive, chemical wash water, or plastic residue from entering drains or soil?',
      bn: 'আপনি কি কালি, সলভেন্ট, আঠা, রাসায়নিক ধোয়ার পানি বা প্লাস্টিকের অবশিষ্টাংশ ড্রেন বা মাটিতে যাওয়া থেকে প্রতিরোধ করেন?'
    },
    evidenceExamples: {
      en: 'Disposal route, storage',
      bn: 'নিষ্পত্তির পথ, সংরক্ষণ'
    },
    financeLink: {
      en: 'Pollution prevention',
      bn: 'দূষণ প্রতিরোধ'
    },
    routingCondition: (a) => R.sectorIs(a, R.SECTOR_PLASTIC) || R.usesChemicals(a) || R.hasWastewater(a)
  },
  {
    id: 'PP-06',
    domain: 'D6',
    weightPriority: 'High',
    text: {
      en: 'Do you control fumes, smell, dust, heat, or emissions from machines, printing, heating, melting, or drying?',
      bn: 'আপনি কি মেশিন, প্রিন্টিং, গরম করা, গলানো বা শুকানোর প্রক্রিয়া থেকে ধোঁয়া, গন্ধ, ধুলা, তাপ বা নির্গমন নিয়ন্ত্রণ করেন?'
    },
    evidenceExamples: {
      en: 'Ventilation, process observation',
      bn: 'ভেন্টিলেশন, প্রক্রিয়া পর্যবেক্ষণ'
    },
    financeLink: {
      en: 'Workplace/community safety',
      bn: 'কর্মস্থল/কমিউনিটির নিরাপত্তা'
    },
    routingCondition: (a) => R.sectorIs(a, R.SECTOR_PLASTIC) || R.causesNuisance(a)
  },
  {
    id: 'PP-07',
    domain: 'D4',
    weightPriority: 'Medium',
    text: {
      en: 'Do you use recycled content, recyclable materials, lower-impact inks, or less harmful materials where possible?',
      bn: 'যেখানে সম্ভব, আপনি কি রিসাইকেল করা উপাদান, recyclable উপকরণ, কম ক্ষতিকর কালি বা কম ক্ষতিকর উপাদান ব্যবহার করেন?'
    },
    evidenceExamples: {
      en: 'Supplier docs, product samples',
      bn: 'সরবরাহকারীর ডকুমেন্ট, পণ্যের নমুনা'
    },
    financeLink: {
      en: 'Circularity/certification',
      bn: 'সার্কুলারিটি/সার্টিফিকেশন'
    },
    routingCondition: (a) => R.sectorIs(a, R.SECTOR_PLASTIC) && R.hasCertificationInterest(a)
  },
  {
    id: 'PP-08',
    domain: 'D7',
    weightPriority: 'Medium',
    text: {
      en: 'Do you keep records of raw material purchase, production waste, chemical use, and scrap sales?',
      bn: 'আপনি কি কাঁচামাল ক্রয়, উৎপাদন বর্জ্য, রাসায়নিকের ব্যবহার এবং স্ক্র্যাপ বিক্রির রেকর্ড রাখেন?'
    },
    evidenceExamples: {
      en: 'Records, receipts',
      bn: 'রেকর্ড, রসিদ'
    },
    financeLink: {
      en: 'Finance/certification readiness',
      bn: 'অর্থায়ন/সার্টিফিকেশন প্রস্তুতি'
    },
    routingCondition: (a) => R.sectorIs(a, R.SECTOR_PLASTIC)
  },
  {
    id: 'PP-09',
    domain: 'D3',
    weightPriority: 'Very High',
    criticalRisk: true,
    text: {
      en: 'Do you avoid open burning of plastic, rejected materials, contaminated paper, or packaging waste?',
      bn: 'আপনি কি প্লাস্টিক, রিজেক্ট উপাদান, দূষিত কাগজ বা প্যাকেজিং বর্জ্য খোলা জায়গায় পোড়ানো এড়িয়ে চলেন?'
    },
    evidenceExamples: {
      en: 'Disposal method',
      bn: 'নিষ্পত্তির পদ্ধতি'
    },
    financeLink: {
      en: 'Air pollution prevention',
      bn: 'বায়ু দূষণ প্রতিরোধ'
    },
    routingCondition: (a) => R.sectorIs(a, R.SECTOR_PLASTIC) || R.producesWasteOfType(a, 'Plastic packaging')
  },
  {
    id: 'PP-10',
    domain: 'D6',
    weightPriority: 'High',
    text: {
      en: 'Are workers protected from chemical smell, dust, fumes, heat, and noise?',
      bn: 'শ্রমিকরা কি রাসায়নিক গন্ধ, ধুলা, ধোঁয়া, তাপ এবং শব্দ থেকে সুরক্ষিত?'
    },
    evidenceExamples: {
      en: 'Ventilation, PPE, observation',
      bn: 'ভেন্টিলেশন, PPE, পর্যবেক্ষণ'
    },
    financeLink: {
      en: 'Workplace environmental safety',
      bn: 'কর্মস্থলের পরিবেশগত নিরাপত্তা'
    },
    routingCondition: (a) => R.sectorIs(a, R.SECTOR_PLASTIC) && R.hasWorkers(a)
  }
];
