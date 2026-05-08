import { MainQuestion } from '../../types';
import * as R from './routingHelpers';

// =============================================================================
// D. Waste and Circularity Module (WS-01..WS-14) — Sector Agnostic
// =============================================================================
export const WASTE_QUESTIONS: MainQuestion[] = [
  {
    id: 'WS-01',
    domain: 'D3',
    weightPriority: 'Medium',
    text: {
      en: 'Do you know the main types of waste your business produces?',
      bn: 'আপনার ব্যবসা থেকে যে প্রধান ধরনের বর্জ্য তৈরি হয় সেগুলো কি আপনি জানেন?'
    },
    evidenceExamples: { en: 'Waste list, observation', bn: 'বর্জ্যের তালিকা, পর্যবেক্ষণ' },
    financeLink: { en: 'Waste management readiness', bn: 'বর্জ্য ব্যবস্থাপনার প্রস্তুতি' },
    routingCondition: R.hasWaste
  },
  {
    id: 'WS-02',
    domain: 'D3',
    weightPriority: 'High',
    text: {
      en: 'Do you keep different types of waste separate, such as organic waste, recyclable waste, hazardous waste, and general waste?',
      bn: 'আপনি কি বিভিন্ন ধরনের বর্জ্য আলাদা রাখেন, যেমন জৈব বর্জ্য, recyclable বর্জ্য, ঝুঁকিপূর্ণ বর্জ্য এবং সাধারণ বর্জ্য?'
    },
    evidenceExamples: { en: 'Separate bins/bags, photos', bn: 'আলাদা বিন/ব্যাগ, ছবি' },
    financeLink: { en: 'ISO 14001, circularity', bn: 'ISO 14001, circularity' },
    routingCondition: R.hasWaste
  },
  {
    id: 'WS-03',
    domain: 'D3',
    weightPriority: 'Medium',
    text: {
      en: 'Do you sell recyclable waste such as plastic, cardboard, metal, fabric, bottles, or paper to recyclers or scrap buyers?',
      bn: 'আপনি কি plastic, cardboard, ধাতু, কাপড়, বোতল বা কাগজের মতো recyclable বর্জ্য recycler বা ভাঙারি ক্রেতার কাছে বিক্রি করেন?'
    },
    evidenceExamples: { en: 'Sale receipt, recycler contact', bn: 'বিক্রির রশিদ, recycler-এর যোগাযোগ' },
    financeLink: { en: 'Circular economy', bn: 'Circular economy' },
    routingCondition: R.hasRecyclableWaste
  },
  {
    id: 'WS-04',
    domain: 'D3',
    weightPriority: 'Medium',
    text: {
      en: 'Do you reuse packaging, containers, sacks, crates, drums, or boxes safely?',
      bn: 'আপনি কি প্যাকেজিং, কনটেইনার, বস্তা, ক্রেট, ড্রাম বা বাক্স নিরাপদভাবে পুনরায় ব্যবহার করেন?'
    },
    evidenceExamples: { en: 'Reused materials, photos', bn: 'পুনর্ব্যবহৃত উপকরণ, ছবি' },
    financeLink: { en: 'Waste reduction', bn: 'বর্জ্য হ্রাস' },
    routingCondition: (a) => R.producesWasteOfType(a, 'Plastic packaging', 'Paper/cardboard') || R.sectorIs(a, R.SECTOR_RETAIL, R.SECTOR_MANUFACTURING)
  },
  {
    id: 'WS-05',
    domain: 'D3',
    weightPriority: 'Very High',
    criticalRisk: true,
    text: {
      en: 'Do you avoid open dumping of waste in roadsides, fields, drains, canals, ponds, or unused land?',
      bn: 'আপনি কি রাস্তার পাশে, মাঠে, ড্রেনে, খালে, পুকুরে বা পরিত্যক্ত জমিতে খোলা জায়গায় বর্জ্য ফেলা এড়িয়ে চলেন?'
    },
    evidenceExamples: { en: 'Observation, collection system', bn: 'পর্যবেক্ষণ, সংগ্রহ ব্যবস্থা' },
    financeLink: { en: 'Environmental risk reduction', bn: 'পরিবেশগত ঝুঁকি হ্রাস' },
    routingCondition: R.hasWaste
  },
  {
    id: 'WS-06',
    domain: 'D3',
    weightPriority: 'Very High',
    criticalRisk: true,
    text: {
      en: 'Do you avoid burning waste, especially plastic, rubber, fabric, chemical containers, oil-contaminated materials, or mixed waste?',
      bn: 'আপনি কি বর্জ্য পোড়ানো এড়িয়ে চলেন, বিশেষ করে plastic, রাবার, কাপড়, রাসায়নিক কনটেইনার, তেলে দূষিত উপকরণ বা মিশ্র বর্জ্য?'
    },
    evidenceExamples: { en: 'Observation, disposal method', bn: 'পর্যবেক্ষণ, নিষ্কাশন পদ্ধতি' },
    financeLink: { en: 'Air pollution reduction', bn: 'বায়ু দূষণ হ্রাস' },
    routingCondition: (a) => R.hasWaste(a) || R.hasUnsafeWasteHandling(a)
  },
  {
    id: 'WS-07',
    domain: 'D3',
    weightPriority: 'High',
    text: {
      en: 'Do you store waste in a way that prevents odour, pests, flies, mosquitoes, leakage, and rainwater contact?',
      bn: 'আপনি কি বর্জ্য এমনভাবে সংরক্ষণ করেন যাতে দুর্গন্ধ, পোকামাকড়, মাছি, মশা, leakage এবং বৃষ্টির পানির সংস্পর্শ এড়ানো যায়?'
    },
    evidenceExamples: { en: 'Covered bins, raised platform, photos', bn: 'ঢাকনাযুক্ত বিন, উঁচু প্ল্যাটফর্ম, ছবি' },
    financeLink: { en: 'Workplace/community safety', bn: 'কর্মস্থল/সম্প্রদায়ের নিরাপত্তা' },
    routingCondition: (a) => R.producesWasteOfType(a, 'Food waste', 'Crop residue', 'Manure / dung / poultry litter / fish waste', 'Wastewater sludge')
  },
  {
    id: 'WS-08',
    domain: 'D3',
    weightPriority: 'Medium',
    text: {
      en: 'Do you reduce waste by planning production, stock, cutting, purchasing, or portion sizes carefully?',
      bn: 'আপনি কি উৎপাদন, stock, কাটিং, ক্রয় বা portion size সাবধানে পরিকল্পনা করে বর্জ্য কমান?'
    },
    evidenceExamples: { en: 'Production plan, stock record', bn: 'উৎপাদনের পরিকল্পনা, stock-এর হিসাব' },
    financeLink: { en: 'Resource efficiency', bn: 'সম্পদের দক্ষ ব্যবহার' },
    routingCondition: (a) => R.sectorIs(a, R.SECTOR_MANUFACTURING, R.SECTOR_FOODSERVICE, R.SECTOR_RETAIL, R.SECTOR_TEXTILE)
  },
  {
    id: 'WS-09',
    domain: 'D3',
    weightPriority: 'Medium',
    text: {
      en: 'Do you have a regular collection or disposal arrangement for waste?',
      bn: 'আপনার কি বর্জ্য সংগ্রহ বা নিষ্কাশনের জন্য নিয়মিত কোনো ব্যবস্থা আছে?'
    },
    evidenceExamples: { en: 'Collector receipt, municipal service', bn: 'সংগ্রাহকের রশিদ, পৌরসভার সেবা' },
    financeLink: { en: 'Waste management readiness', bn: 'বর্জ্য ব্যবস্থাপনার প্রস্তুতি' },
    routingCondition: R.hasWaste
  },
  {
    id: 'WS-10',
    domain: 'D3',
    weightPriority: 'Medium',
    text: {
      en: 'Do you keep any record of waste sold, reused, composted, or collected?',
      bn: 'আপনি কি বিক্রি, পুনর্ব্যবহার, compost বা সংগ্রহ করা বর্জ্যের কোনো হিসাব রাখেন?'
    },
    evidenceExamples: { en: 'Receipts, notebook, photos', bn: 'রশিদ, খাতা, ছবি' },
    financeLink: { en: 'Finance/certification readiness', bn: 'অর্থায়ন/সার্টিফিকেশন প্রস্তুতি' },
    routingCondition: R.hasWaste
  },
  {
    id: 'WS-11',
    domain: 'D3',
    weightPriority: 'Medium',
    text: {
      en: 'Do you identify waste that can become a useful product, input, feed, compost, fuel, or by-product?',
      bn: 'আপনি কি এমন বর্জ্য চিহ্নিত করেন যা কোনো উপযোগী পণ্য, কাঁচামাল, পশুখাদ্য, compost, জ্বালানি বা by-product হতে পারে?'
    },
    evidenceExamples: { en: 'By-product use, sale record', bn: 'By-product-এর ব্যবহার, বিক্রির হিসাব' },
    financeLink: { en: 'Circular economy finance', bn: 'Circular economy অর্থায়ন' },
    routingCondition: (a) => R.producesWasteOfType(a, 'Rice husk / bran / ash', 'Wood waste', 'Crop residue', 'Fabric waste')
  },
  {
    id: 'WS-12',
    domain: 'D3',
    weightPriority: 'Very High',
    criticalRisk: true,
    text: {
      en: 'Do you safely manage hazardous waste such as used oil, chemical containers, pesticide bottles, veterinary waste, batteries, bulbs, or contaminated materials?',
      bn: 'আপনি কি ঝুঁকিপূর্ণ বর্জ্য নিরাপদভাবে ব্যবস্থাপনা করেন, যেমন ব্যবহৃত তেল, রাসায়নিক কনটেইনার, pesticide বোতল, ভেটেরিনারি বর্জ্য, ব্যাটারি, বাল্ব বা দূষিত উপকরণ?'
    },
    evidenceExamples: { en: 'Separate storage, disposal record', bn: 'আলাদা সংরক্ষণ, নিষ্কাশনের হিসাব' },
    financeLink: { en: 'ISO 14001 readiness', bn: 'ISO 14001 প্রস্তুতি' },
    routingCondition: R.hasHazardousWaste
  },
  {
    id: 'WS-13',
    domain: 'D3',
    weightPriority: 'High',
    text: {
      en: 'Do you prevent waste storage areas from being exposed to rain and creating dirty runoff?',
      bn: 'আপনি কি বর্জ্য সংরক্ষণের জায়গা বৃষ্টির সংস্পর্শ থেকে রক্ষা করেন যাতে নোংরা পানি বের না হয়?'
    },
    evidenceExamples: { en: 'Covered waste area', bn: 'ঢাকা বর্জ্য এলাকা' },
    financeLink: { en: 'Pollution prevention', bn: 'দূষণ প্রতিরোধ' },
    routingCondition: (a) => R.hasWaste(a) && R.hasFacility(a)
  },
  {
    id: 'WS-14',
    domain: 'D3',
    weightPriority: 'Medium',
    text: {
      en: 'Do you train or instruct workers/family members not to mix hazardous waste with general waste?',
      bn: 'আপনি কি কর্মী বা পরিবারের সদস্যদের ঝুঁকিপূর্ণ বর্জ্য সাধারণ বর্জ্যের সাথে না মেশানোর জন্য প্রশিক্ষণ বা নির্দেশনা দেন?'
    },
    evidenceExamples: { en: 'Staff explanation, sign, practice', bn: 'কর্মীর ব্যাখ্যা, সাইন, অনুশীলন' },
    financeLink: { en: 'Certification readiness', bn: 'সার্টিফিকেশন প্রস্তুতি' },
    routingCondition: (a) => R.hasHazardousWaste(a) && R.hasWorkers(a)
  }
];
