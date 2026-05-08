import { MainQuestion } from '../../types';
import * as R from './routingHelpers';

// =============================================================================
// F. Agriculture and Crop Production Module (AG-01..AG-14)
// =============================================================================
export const AGRICULTURE_QUESTIONS: MainQuestion[] = [
  {
    id: 'AG-01',
    domain: 'D5',
    weightPriority: 'High',
    text: {
      en: 'Do you use compost, cow dung, vermicompost, crop residue, green manure, or other organic matter to improve soil?',
      bn: 'আপনি কি মাটির গুণমান বাড়াতে compost, গোবর, vermicompost, ফসলের অবশিষ্টাংশ, সবুজ সার বা অন্য কোনো জৈব উপাদান ব্যবহার করেন?'
    },
    evidenceExamples: {
      en: 'Field observation, compost pit, input record',
      bn: 'মাঠ পর্যবেক্ষণ, compost পিট, উপকরণের রেকর্ড'
    },
    financeLink: {
      en: 'Organic/safe agriculture readiness',
      bn: 'অর্গানিক/নিরাপদ কৃষি প্রস্তুতি'
    },
    routingCondition: (a) => R.sectorIs(a, R.SECTOR_AGRICULTURE)
  },
  {
    id: 'AG-02',
    domain: 'D5',
    weightPriority: 'Very High',
    criticalRisk: true,
    text: {
      en: 'Do you avoid overusing chemical fertilizer by measuring dose, following advice, or using soil test results?',
      bn: 'আপনি কি মাত্রা পরিমাপ করে, পরামর্শ অনুসরণ করে বা মাটি পরীক্ষার ফলাফল দেখে রাসায়নিক সারের অতিরিক্ত ব্যবহার এড়িয়ে চলেন?'
    },
    evidenceExamples: {
      en: 'Fertilizer record, soil test, extension advice',
      bn: 'সারের রেকর্ড, মাটি পরীক্ষা, কৃষি পরামর্শ'
    },
    financeLink: {
      en: 'Organic/safe agriculture readiness',
      bn: 'অর্গানিক/নিরাপদ কৃষি প্রস্তুতি'
    },
    routingCondition: (a) => R.usesChemicalOfType(a, 'Fertilizer')
  },
  {
    id: 'AG-03',
    domain: 'D4',
    weightPriority: 'Very High',
    criticalRisk: true,
    text: {
      en: 'Do you use pesticide only when needed and in the correct dose?',
      bn: 'আপনি কি শুধু প্রয়োজন হলে এবং সঠিক মাত্রায় pesticide ব্যবহার করেন?'
    },
    evidenceExamples: {
      en: 'Pesticide record, advice slip, container label',
      bn: 'Pesticide-এর রেকর্ড, পরামর্শ স্লিপ, কন্টেইনারের লেবেল'
    },
    financeLink: {
      en: 'Organic/safe agriculture readiness',
      bn: 'অর্গানিক/নিরাপদ কৃষি প্রস্তুতি'
    },
    routingCondition: (a) => R.usesChemicalOfType(a, 'Pesticide / insecticide / herbicide')
  },
  {
    id: 'AG-04',
    domain: 'D5',
    weightPriority: 'High',
    text: {
      en: 'Do you use non-chemical pest control methods where possible, such as traps, nets, hand removal, resistant varieties, biological control, or field sanitation?',
      bn: 'আপনি কি সম্ভব হলে রাসায়নিক ছাড়া পোকা দমন পদ্ধতি ব্যবহার করেন, যেমন ফাঁদ, জাল, হাতে তোলা, রোগ-প্রতিরোধী জাত, biological control বা মাঠ পরিচ্ছন্নতা?'
    },
    evidenceExamples: {
      en: 'Field observation, traps, photos',
      bn: 'মাঠ পর্যবেক্ষণ, ফাঁদ, ছবি'
    },
    financeLink: {
      en: 'Organic/safe agriculture readiness',
      bn: 'অর্গানিক/নিরাপদ কৃষি প্রস্তুতি'
    },
    routingCondition: (a) => R.sectorIs(a, R.SECTOR_AGRICULTURE)
  },
  {
    id: 'AG-05',
    domain: 'D4',
    weightPriority: 'Very High',
    criticalRisk: true,
    text: {
      en: 'Are pesticides and fertilizers stored safely away from food, children, livestock, water sources, and living areas?',
      bn: 'Pesticide ও সার কি খাবার, শিশু, গবাদিপশু, পানির উৎস এবং বসবাসের জায়গা থেকে নিরাপদ দূরত্বে সংরক্ষণ করা হয়?'
    },
    evidenceExamples: {
      en: 'Storage photo, observation',
      bn: 'সংরক্ষণের ছবি, পর্যবেক্ষণ'
    },
    financeLink: {
      en: 'Certification readiness',
      bn: 'সার্টিফিকেশন প্রস্তুতি'
    },
    routingCondition: R.usesPesticideOrFertilizer
  },
  {
    id: 'AG-06',
    domain: 'D2',
    weightPriority: 'Very High',
    criticalRisk: true,
    text: {
      en: 'Do you prevent fertilizer, pesticide, compost, or soil runoff from entering ponds, canals, rivers, drains, or neighbouring land?',
      bn: 'আপনি কি সার, pesticide, compost বা মাটির runoff পুকুর, খাল, নদী, ড্রেন বা পাশের জমিতে যাওয়া থেকে বিরত রাখেন?'
    },
    evidenceExamples: {
      en: 'Buffer strip, drainage control, observation',
      bn: 'Buffer strip, ড্রেনেজ নিয়ন্ত্রণ, পর্যবেক্ষণ'
    },
    financeLink: {
      en: 'Green agriculture',
      bn: 'সবুজ কৃষি'
    },
    routingCondition: (a) => R.sectorIs(a, R.SECTOR_AGRICULTURE)
  },
  {
    id: 'AG-07',
    domain: 'D2',
    weightPriority: 'High',
    text: {
      en: 'Do you use water-saving irrigation or avoid unnecessary irrigation?',
      bn: 'আপনি কি পানি সাশ্রয়ী সেচ পদ্ধতি ব্যবহার করেন বা অপ্রয়োজনীয় সেচ এড়িয়ে চলেন?'
    },
    evidenceExamples: {
      en: 'Irrigation schedule, field observation',
      bn: 'সেচের সময়সূচি, মাঠ পর্যবেক্ষণ'
    },
    financeLink: {
      en: 'Water efficiency finance',
      bn: 'পানি সাশ্রয়ী অর্থায়ন'
    },
    routingCondition: (a) => R.sectorIs(a, R.SECTOR_AGRICULTURE) && R.usesWater(a)
  },
  {
    id: 'AG-08',
    domain: 'D5',
    weightPriority: 'High',
    text: {
      en: 'Do you protect soil from erosion, waterlogging, salinity, or nutrient loss?',
      bn: 'আপনি কি মাটিকে ক্ষয়, জলাবদ্ধতা, লবণাক্ততা বা পুষ্টি ক্ষয় থেকে রক্ষা করেন?'
    },
    evidenceExamples: {
      en: 'Raised beds, drainage, mulch, crop cover',
      bn: 'উঁচু বেড, ড্রেনেজ, mulch, ফসল আবরণ'
    },
    financeLink: {
      en: 'Climate resilience',
      bn: 'জলবায়ু সহনশীলতা'
    },
    routingCondition: (a) => R.sectorIs(a, R.SECTOR_AGRICULTURE)
  },
  {
    id: 'AG-09',
    domain: 'D5',
    weightPriority: 'Medium',
    text: {
      en: 'Do you rotate crops, diversify crops, or avoid planting the same crop continuously where possible?',
      bn: 'আপনি কি সম্ভব হলে শস্য আবর্তন করেন, ফসলের বৈচিত্র্য রাখেন বা একই ফসল ধারাবাহিকভাবে চাষ করা এড়িয়ে চলেন?'
    },
    evidenceExamples: {
      en: 'Crop calendar, field observation',
      bn: 'ফসল ক্যালেন্ডার, মাঠ পর্যবেক্ষণ'
    },
    financeLink: {
      en: 'Soil health',
      bn: 'মাটির স্বাস্থ্য'
    },
    routingCondition: (a) => R.sectorIs(a, R.SECTOR_AGRICULTURE)
  },
  {
    id: 'AG-10',
    domain: 'D7',
    weightPriority: 'High',
    text: {
      en: 'Do you keep basic records of seed, fertilizer, pesticide, irrigation, production, and sales?',
      bn: 'আপনি কি বীজ, সার, pesticide, সেচ, উৎপাদন এবং বিক্রির সাধারণ রেকর্ড রাখেন?'
    },
    evidenceExamples: {
      en: 'Notebook, receipts, mobile record',
      bn: 'নোটবুক, রশিদ, মোবাইল রেকর্ড'
    },
    financeLink: {
      en: 'Organic/safe agriculture readiness',
      bn: 'অর্গানিক/নিরাপদ কৃষি প্রস্তুতি'
    },
    routingCondition: (a) => R.sectorIs(a, R.SECTOR_AGRICULTURE)
  },
  {
    id: 'AG-11',
    domain: 'D4',
    weightPriority: 'Very High',
    criticalRisk: true,
    text: {
      en: 'Do you safely dispose of pesticide bottles, packets, and fertilizer bags instead of reusing them for food, water, or household purposes?',
      bn: 'আপনি কি pesticide-এর বোতল, প্যাকেট ও সারের ব্যাগ খাবার, পানি বা গৃহস্থালি কাজে পুনঃব্যবহার না করে নিরাপদভাবে নিষ্পত্তি করেন?'
    },
    evidenceExamples: {
      en: 'Disposal practice, separate storage',
      bn: 'নিষ্পত্তির পদ্ধতি, আলাদা সংরক্ষণ'
    },
    financeLink: {
      en: 'Safety and certification',
      bn: 'নিরাপত্তা ও সার্টিফিকেশন'
    },
    routingCondition: R.usesPesticideOrFertilizer
  },
  {
    id: 'AG-12',
    domain: 'D5',
    weightPriority: 'Medium',
    text: {
      en: 'Do you use local, climate-resilient, disease-resistant, or suitable seed/variety choices?',
      bn: 'আপনি কি স্থানীয়, জলবায়ু-সহনশীল, রোগ-প্রতিরোধী বা উপযোগী বীজ/জাত বেছে নেন?'
    },
    evidenceExamples: {
      en: 'Seed packets, supplier info, farmer statement',
      bn: 'বীজের প্যাকেট, সরবরাহকারীর তথ্য, কৃষকের বক্তব্য'
    },
    financeLink: {
      en: 'Climate resilience',
      bn: 'জলবায়ু সহনশীলতা'
    },
    routingCondition: (a) => R.sectorIs(a, R.SECTOR_AGRICULTURE)
  },
  {
    id: 'AG-13',
    domain: 'D5',
    weightPriority: 'Medium',
    text: {
      en: 'Do you use shade, mulching, raised beds, drainage, windbreaks, or other methods to reduce climate or weather-related crop loss?',
      bn: 'আপনি কি জলবায়ু বা আবহাওয়াজনিত ফসলের ক্ষতি কমাতে ছায়া, mulching, উঁচু বেড, ড্রেনেজ, windbreak বা অন্য কোনো পদ্ধতি ব্যবহার করেন?'
    },
    evidenceExamples: {
      en: 'Field observation',
      bn: 'মাঠ পর্যবেক্ষণ'
    },
    financeLink: {
      en: 'Climate adaptation finance',
      bn: 'জলবায়ু অভিযোজন অর্থায়ন'
    },
    routingCondition: (a) => R.sectorIs(a, R.SECTOR_AGRICULTURE)
  },
  {
    id: 'AG-14',
    domain: 'D8',
    weightPriority: 'Pathway',
    text: {
      en: 'Are you interested in transitioning toward organic, safe food, or reduced-chemical production?',
      bn: 'আপনি কি অর্গানিক, নিরাপদ খাদ্য বা কম-রাসায়নিক উৎপাদনের দিকে এগোতে আগ্রহী?'
    },
    evidenceExamples: {
      en: 'Stated interest',
      bn: 'প্রকাশিত আগ্রহ'
    },
    financeLink: {
      en: 'Organic/safe agriculture certification',
      bn: 'অর্গানিক/নিরাপদ কৃষি সার্টিফিকেশন'
    },
    routingCondition: (a) => R.hasCertificationInterest(a) || R.sectorIs(a, R.SECTOR_AGRICULTURE)
  }
];
