import { MainQuestion } from '../../types';
import * as R from './routingHelpers';

// =============================================================================
// O. Building, Facility and Workplace Environmental Safety Module (BF-01..BF-10)
// =============================================================================
export const BUILDING_QUESTIONS: MainQuestion[] = [
  {
    id: 'BF-01', domain: 'D1', weightPriority: 'Low',
    text: {
      en: 'Does your workplace use natural daylight where possible to reduce daytime lighting needs?',
      bn: 'আপনার কর্মস্থলে কি দিনের বেলায় লাইটিংয়ের প্রয়োজন কমাতে যতটা সম্ভব প্রাকৃতিক আলো ব্যবহার করা হয়?'
    },
    evidenceExamples: { en: 'Observation, photos', bn: 'পর্যবেক্ষণ, ছবি' },
    financeLink: { en: 'LEED/EDGE-style readiness', bn: 'LEED/EDGE-স্টাইল প্রস্তুতি' },
    routingCondition: R.hasFacility
  },
  {
    id: 'BF-02', domain: 'D6', weightPriority: 'High',
    text: {
      en: 'Does your workplace have ventilation to reduce heat, smoke, chemical smell, dust, humidity, or indoor air problems?',
      bn: 'আপনার কর্মস্থলে কি গরম, ধোঁয়া, রাসায়নিক গন্ধ, ধুলা, আর্দ্রতা বা ভেতরের বাতাসের সমস্যা কমাতে ভেন্টিলেশন আছে?'
    },
    evidenceExamples: { en: 'Ventilation, windows, exhaust, fans', bn: 'ভেন্টিলেশন, জানালা, এক্সহস্ট, ফ্যান' },
    financeLink: { en: 'Green building/workplace readiness', bn: 'গ্রিন বিল্ডিং/কর্মস্থল প্রস্তুতি' },
    routingCondition: R.hasFacility
  },
  {
    id: 'BF-03', domain: 'D1', weightPriority: 'Medium',
    text: {
      en: 'Do you use shading, roof treatment, insulation, reflective paint, trees, or ventilation to reduce heat?',
      bn: 'আপনি কি গরম কমাতে শেডিং, ছাদের ট্রিটমেন্ট, ইনসুলেশন, রিফ্লেক্টিভ পেইন্ট, গাছপালা বা ভেন্টিলেশন ব্যবহার করেন?'
    },
    evidenceExamples: { en: 'Photos, observation', bn: 'ছবি, পর্যবেক্ষণ' },
    financeLink: { en: 'Green building readiness', bn: 'গ্রিন বিল্ডিং প্রস্তুতি' },
    routingCondition: R.hasFacility
  },
  {
    id: 'BF-04', domain: 'D2', weightPriority: 'High',
    text: {
      en: 'Do you maintain toilets, wash areas, drains, and cleaning areas to avoid leakage, odour, stagnant water, or unsafe wastewater?',
      bn: 'লিকেজ, দুর্গন্ধ, জমে থাকা পানি বা অনিরাপদ বর্জ্যপানি এড়াতে আপনি কি টয়লেট, ওয়াশ এরিয়া, ড্রেন এবং পরিষ্কারের জায়গাগুলো রক্ষণাবেক্ষণ করেন?'
    },
    evidenceExamples: { en: 'Observation, cleaning schedule', bn: 'পর্যবেক্ষণ, পরিষ্কারের সময়সূচি' },
    financeLink: { en: 'Basic workplace environmental safety', bn: 'কর্মস্থলের মৌলিক পরিবেশগত নিরাপত্তা' },
    routingCondition: R.hasFacility
  },
  {
    id: 'BF-05', domain: 'D3', weightPriority: 'High',
    text: {
      en: 'Do you keep the workplace clean and arranged to prevent waste mixing, spills, pest problems, and blocked drains?',
      bn: 'বর্জ্য মিশে যাওয়া, ছড়িয়ে পড়া, পোকামাকড়ের সমস্যা এবং ড্রেন বন্ধ হওয়া রোধ করতে আপনি কি কর্মস্থল পরিষ্কার ও গোছানো রাখেন?'
    },
    evidenceExamples: { en: 'Observation', bn: 'পর্যবেক্ষণ' },
    financeLink: { en: 'Workplace environmental safety', bn: 'কর্মস্থলের পরিবেশগত নিরাপত্তা' },
    routingCondition: R.hasFacility
  },
  {
    id: 'BF-06', domain: 'D2', weightPriority: 'High',
    text: {
      en: 'Are drains, waste areas, chemical storage, and fuel storage protected from rainwater and flooding?',
      bn: 'ড্রেন, বর্জ্যের জায়গা, রাসায়নিক সংরক্ষণ এবং জ্বালানি সংরক্ষণ কি বৃষ্টির পানি ও বন্যা থেকে সুরক্ষিত?'
    },
    evidenceExamples: { en: 'Raised storage, covers, drainage', bn: 'উঁচু জায়গায় সংরক্ষণ, ঢাকনা, ড্রেনেজ' },
    financeLink: { en: 'Climate resilience', bn: 'জলবায়ু সহনশীলতা' },
    routingCondition: (a) => (R.hasWaste(a) || R.usesChemicals(a) || R.storesFuelOnSite(a)) && R.hasFacility(a)
  },
  {
    id: 'BF-07', domain: 'D3', weightPriority: 'High',
    text: {
      en: 'Do you have safe storage areas for raw materials, finished products, waste, tools, fuel, and chemicals?',
      bn: 'কাঁচামাল, তৈরি পণ্য, বর্জ্য, যন্ত্রপাতি, জ্বালানি এবং রাসায়নিকের জন্য আপনার কি নিরাপদ সংরক্ষণের জায়গা আছে?'
    },
    evidenceExamples: { en: 'Layout observation', bn: 'লেআউট পর্যবেক্ষণ' },
    financeLink: { en: 'ISO 14001 readiness', bn: 'ISO 14001 প্রস্তুতি' },
    routingCondition: R.hasFacility
  },
  {
    id: 'BF-08', domain: 'D6', weightPriority: 'High',
    text: {
      en: 'Do you have basic fire and emergency arrangements for fuel, LPG, chemicals, machines, or electrical equipment?',
      bn: 'জ্বালানি, LPG, রাসায়নিক, মেশিন বা বৈদ্যুতিক সরঞ্জামের জন্য আপনার কি মৌলিক অগ্নি ও জরুরি ব্যবস্থা আছে?'
    },
    evidenceExamples: { en: 'Extinguisher, exits, storage', bn: 'এক্সটিংগুইশার, বের হওয়ার পথ, সংরক্ষণ' },
    financeLink: { en: 'Risk management readiness', bn: 'ঝুঁকি ব্যবস্থাপনা প্রস্তুতি' },
    routingCondition: (a) => (R.usesLiquidFuel(a) || R.storesFuelOnSite(a) || R.usesChemicals(a) || R.hasMachinery(a)) && R.hasFacility(a)
  },
  {
    id: 'BF-09', domain: 'D8', weightPriority: 'Pathway',
    text: {
      en: 'If you rent the workplace, have you discussed green improvements with the landlord or market committee?',
      bn: 'আপনি যদি কর্মস্থল ভাড়া নেন, তাহলে কি বাড়িওয়ালা বা মার্কেট কমিটির সাথে গ্রিন উন্নয়নের বিষয়ে আলোচনা করেছেন?'
    },
    evidenceExamples: { en: 'Verbal statement, agreement', bn: 'মৌখিক বিবৃতি, চুক্তি' },
    financeLink: { en: 'Shared facility improvement', bn: 'শেয়ারড সুবিধা উন্নয়ন' },
    routingCondition: R.isRented
  },
  {
    id: 'BF-10', domain: 'D8', weightPriority: 'Pathway',
    text: {
      en: 'Are you interested in low-cost facility improvements such as LED lighting, ventilation, water leak repair, waste bins, shading, or safe storage?',
      bn: 'আপনি কি কম খরচে সুবিধা উন্নয়ন যেমন LED লাইটিং, ভেন্টিলেশন, পানির লিক মেরামত, বর্জ্যের বিন, শেডিং বা নিরাপদ সংরক্ষণে আগ্রহী?'
    },
    evidenceExamples: { en: 'Stated interest', bn: 'প্রকাশিত আগ্রহ' },
    financeLink: { en: 'Green finance/recognition', bn: 'গ্রিন অর্থায়ন/স্বীকৃতি' },
    routingCondition: R.hasFacility
  }
];
