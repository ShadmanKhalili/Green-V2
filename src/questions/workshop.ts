import { MainQuestion } from '../../types';
import * as R from './routingHelpers';

// =============================================================================
// L. Repair, Workshop, Light Engineering, Metal Work, Vehicle Service (WK-01..WK-10)
// =============================================================================
export const WORKSHOP_QUESTIONS: MainQuestion[] = [
  {
    id: 'WK-01',
    domain: 'D3',
    weightPriority: 'Very High',
    criticalRisk: true,
    text: {
      en: 'Do you collect and store used oil, grease, lubricant, coolant, or fuel separately instead of dumping it?',
      bn: 'আপনি কি ব্যবহৃত তেল, গ্রিজ, লুব্রিকেন্ট, কুল্যান্ট বা জ্বালানি ফেলে না দিয়ে আলাদাভাবে সংগ্রহ ও সংরক্ষণ করেন?'
    },
    evidenceExamples: {
      en: 'Used oil container, recycler receipt',
      bn: 'ব্যবহৃত তেলের পাত্র, রিসাইক্লারের রসিদ'
    },
    financeLink: {
      en: 'Pollution prevention',
      bn: 'দূষণ প্রতিরোধ'
    },
    routingCondition: (a) => R.sectorIs(a, R.SECTOR_REPAIR) || R.producesWasteOfType(a, 'Used oil / grease') || R.usesOilOrGrease(a)
  },
  {
    id: 'WK-02',
    domain: 'D2',
    weightPriority: 'Very High',
    criticalRisk: true,
    text: {
      en: 'Do you prevent used oil, grease, fuel, paint, solvent, or metal dust from entering drains, soil, or water bodies?',
      bn: 'আপনি কি ব্যবহৃত তেল, গ্রিজ, জ্বালানি, রং, সলভেন্ট বা ধাতব ধুলা ড্রেন, মাটি বা জলাশয়ে প্রবেশ করা থেকে রোধ করেন?'
    },
    evidenceExamples: {
      en: 'Floor protection, spill control',
      bn: 'মেঝে সুরক্ষা, ছিটকে পড়া নিয়ন্ত্রণ'
    },
    financeLink: {
      en: 'Environmental safety',
      bn: 'পরিবেশগত নিরাপত্তা'
    },
    routingCondition: (a) => R.sectorIs(a, R.SECTOR_REPAIR)
  },
  {
    id: 'WK-03',
    domain: 'D3',
    weightPriority: 'High',
    text: {
      en: 'Do you sell or recycle metal scrap, parts, batteries, tyres, wires, plastic, or packaging?',
      bn: 'আপনি কি ধাতব স্ক্র্যাপ, পার্টস, ব্যাটারি, টায়ার, তার, প্লাস্টিক বা প্যাকেজিং বিক্রি বা recycle করেন?'
    },
    evidenceExamples: {
      en: 'Scrap sale receipt, storage',
      bn: 'স্ক্র্যাপ বিক্রির রসিদ, সংরক্ষণ'
    },
    financeLink: {
      en: 'Circular economy',
      bn: 'সার্কুলার অর্থনীতি'
    },
    routingCondition: (a) => R.sectorIs(a, R.SECTOR_REPAIR)
  },
  {
    id: 'WK-04',
    domain: 'D3',
    weightPriority: 'Very High',
    criticalRisk: true,
    text: {
      en: 'Do you safely manage batteries, bulbs, electronic parts, chemical containers, paint containers, or solvent waste?',
      bn: 'আপনি কি ব্যাটারি, বাল্ব, ইলেকট্রনিক পার্টস, রাসায়নিকের পাত্র, রঙের পাত্র বা সলভেন্ট বর্জ্য নিরাপদে ব্যবস্থাপনা করেন?'
    },
    evidenceExamples: {
      en: 'Separate storage, return system',
      bn: 'আলাদা সংরক্ষণ, ফেরত পাঠানোর ব্যবস্থা'
    },
    financeLink: {
      en: 'Hazardous waste readiness',
      bn: 'বিপজ্জনক বর্জ্য প্রস্তুতি'
    },
    routingCondition: (a) => R.sectorIs(a, R.SECTOR_REPAIR) || R.hasHazardousWaste(a)
  },
  {
    id: 'WK-05',
    domain: 'D1',
    weightPriority: 'Medium',
    text: {
      en: 'Do you reduce electricity use through efficient welding machines, compressors, motors, lighting, or switch-off practices?',
      bn: 'আপনি কি দক্ষ ওয়েল্ডিং মেশিন, কম্প্রেসর, মোটর, আলো বা সুইচ-অফ অভ্যাসের মাধ্যমে বিদ্যুৎ ব্যবহার কমান?'
    },
    evidenceExamples: {
      en: 'Equipment observation, bills',
      bn: 'যন্ত্রপাতি পর্যবেক্ষণ, বিল'
    },
    financeLink: {
      en: 'Energy efficiency finance',
      bn: 'শক্তি দক্ষতা অর্থায়ন'
    },
    routingCondition: (a) => R.sectorIs(a, R.SECTOR_REPAIR) && R.hasMachinery(a)
  },
  {
    id: 'WK-06',
    domain: 'D6',
    weightPriority: 'High',
    text: {
      en: 'Do you control welding fumes, grinding dust, paint smell, solvent smell, or smoke?',
      bn: 'আপনি কি ওয়েল্ডিংয়ের ধোঁয়া, গ্রাইন্ডিং ধুলা, রঙের গন্ধ, সলভেন্টের গন্ধ বা ধোঁয়া নিয়ন্ত্রণ করেন?'
    },
    evidenceExamples: {
      en: 'Ventilation, extractor, masks',
      bn: 'বাতাস চলাচল, এক্সট্র্যাক্টর, মাস্ক'
    },
    financeLink: {
      en: 'Workplace environmental safety',
      bn: 'কর্মস্থলের পরিবেশগত নিরাপত্তা'
    },
    routingCondition: (a) => R.sectorIs(a, R.SECTOR_REPAIR) || R.causesNuisance(a)
  },
  {
    id: 'WK-07',
    domain: 'D4',
    weightPriority: 'High',
    text: {
      en: 'Do you keep floors and work areas arranged to prevent spills, leaks, fire, and unsafe mixing of waste?',
      bn: 'আপনি কি ছিটকে পড়া, লিকেজ, আগুন এবং বর্জ্যের অনিরাপদ মিশ্রণ প্রতিরোধে মেঝে ও কাজের জায়গা গুছিয়ে রাখেন?'
    },
    evidenceExamples: {
      en: 'Observation, storage layout',
      bn: 'পর্যবেক্ষণ, সংরক্ষণের বিন্যাস'
    },
    financeLink: {
      en: 'Safety and risk reduction',
      bn: 'নিরাপত্তা ও ঝুঁকি হ্রাস'
    },
    routingCondition: (a) => R.sectorIs(a, R.SECTOR_REPAIR)
  },
  {
    id: 'WK-08',
    domain: 'D1',
    weightPriority: 'Medium',
    text: {
      en: 'Do you maintain machines and tools to reduce energy use, breakdowns, material waste, and unsafe emissions?',
      bn: 'আপনি কি শক্তি ব্যবহার, ব্রেকডাউন, উপকরণ অপচয় ও অনিরাপদ নির্গমন কমাতে মেশিন ও সরঞ্জামের রক্ষণাবেক্ষণ করেন?'
    },
    evidenceExamples: {
      en: 'Maintenance records',
      bn: 'রক্ষণাবেক্ষণের রেকর্ড'
    },
    financeLink: {
      en: 'Resource efficiency',
      bn: 'সম্পদের দক্ষতা'
    },
    routingCondition: (a) => R.sectorIs(a, R.SECTOR_REPAIR) && R.hasMachinery(a)
  },
  {
    id: 'WK-09',
    domain: 'D7',
    weightPriority: 'Medium',
    text: {
      en: 'Do you keep receipts or records for used oil sale, scrap sale, parts purchase, machine repair, or electricity/fuel bills?',
      bn: 'আপনি কি ব্যবহৃত তেল বিক্রি, স্ক্র্যাপ বিক্রি, পার্টস কেনা, মেশিন মেরামত বা বিদ্যুৎ/জ্বালানি বিলের রসিদ বা রেকর্ড রাখেন?'
    },
    evidenceExamples: {
      en: 'Receipts, notebook',
      bn: 'রসিদ, নোটবই'
    },
    financeLink: {
      en: 'Finance readiness',
      bn: 'অর্থায়নের প্রস্তুতি'
    },
    routingCondition: (a) => R.sectorIs(a, R.SECTOR_REPAIR)
  },
  {
    id: 'WK-10',
    domain: 'D3',
    weightPriority: 'Very High',
    criticalRisk: true,
    text: {
      en: 'Do you avoid open burning of tyres, wires, plastic parts, packaging, or oily waste?',
      bn: 'আপনি কি টায়ার, তার, প্লাস্টিক পার্টস, প্যাকেজিং বা তেলযুক্ত বর্জ্য খোলা জায়গায় পোড়ানো এড়িয়ে চলেন?'
    },
    evidenceExamples: {
      en: 'Disposal method, observation',
      bn: 'নিষ্পত্তির পদ্ধতি, পর্যবেক্ষণ'
    },
    financeLink: {
      en: 'Air pollution prevention',
      bn: 'বায়ু দূষণ প্রতিরোধ'
    },
    routingCondition: (a) => R.sectorIs(a, R.SECTOR_REPAIR)
  }
];
