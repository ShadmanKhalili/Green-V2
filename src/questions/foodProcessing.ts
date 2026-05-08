import { MainQuestion } from '../../types';
import * as R from './routingHelpers';

// =============================================================================
// H. Food Processing, Rice Mill, Husking and Small Manufacturing (FP-01..FP-14)
// =============================================================================
export const FOOD_PROCESSING_QUESTIONS: MainQuestion[] = [
  {
    id: 'FP-01', domain: 'D1', weightPriority: 'Very High', criticalRisk: true,
    text: {
      en: 'What is the main energy source for production machines, boilers, dryers, ovens, grinders, or husking machines, and is it tracked?',
      bn: 'উৎপাদন মেশিন, বয়লার, ড্রায়ার, ওভেন, গ্রাইন্ডার বা হাস্কিং মেশিনের প্রধান শক্তি উৎস কী, এবং তার হিসাব রাখা হয় কি?'
    },
    evidenceExamples: { en: 'Fuel/electricity records', bn: 'জ্বালানি/বিদ্যুতের রেকর্ড' },
    financeLink: { en: 'Energy finance', bn: 'শক্তি অর্থায়ন' },
    routingCondition: (a) => R.sectorIs(a, R.SECTOR_MANUFACTURING) || R.subSectorIs(a, 'Rice mill / husking', 'Food processing', 'Bakery / snacks / sweets production', 'Spice grinding / oil processing')
  },
  {
    id: 'FP-02', domain: 'D1', weightPriority: 'Very High', criticalRisk: true,
    text: {
      en: 'Are motors, belts, bearings, boilers, dryers, grinders, or husking machines maintained to reduce energy waste?',
      bn: 'শক্তি অপচয় কমাতে মোটর, বেল্ট, বিয়ারিং, বয়লার, ড্রায়ার, গ্রাইন্ডার বা হাস্কিং মেশিনের রক্ষণাবেক্ষণ করা হয় কি?'
    },
    evidenceExamples: { en: 'Maintenance receipt, observation', bn: 'রক্ষণাবেক্ষণের রশিদ, পর্যবেক্ষণ' },
    financeLink: { en: 'Energy efficiency finance', bn: 'শক্তি সাশ্রয়ী অর্থায়ন' },
    routingCondition: (a) => R.hasMachinery(a) && (R.sectorIs(a, R.SECTOR_MANUFACTURING) || R.subSectorIs(a, 'Rice mill / husking', 'Food processing', 'Bakery / snacks / sweets production', 'Spice grinding / oil processing'))
  },
  {
    id: 'FP-03', domain: 'D1', weightPriority: 'High',
    text: {
      en: 'Do you track electricity, diesel, gas, biomass, or firewood cost per batch, product, maund, or production cycle?',
      bn: 'প্রতি ব্যাচ, পণ্য, মণ বা উৎপাদন চক্রে বিদ্যুৎ, ডিজেল, গ্যাস, বায়োমাস বা লাকড়ির খরচের হিসাব রাখেন কি?'
    },
    evidenceExamples: { en: 'Production and fuel records', bn: 'উৎপাদন ও জ্বালানির রেকর্ড' },
    financeLink: { en: 'Green finance readiness', bn: 'গ্রিন ফাইন্যান্স প্রস্তুতি' },
    routingCondition: (a) => (R.sectorIs(a, R.SECTOR_MANUFACTURING) || R.subSectorIs(a, 'Rice mill / husking', 'Food processing', 'Bakery / snacks / sweets production', 'Spice grinding / oil processing')) && R.hasFinanceInterest(a)
  },
  {
    id: 'FP-04', domain: 'D3', weightPriority: 'High',
    text: {
      en: 'Do you reuse or sell by-products such as rice husk, bran, ash, broken rice, peels, shells, pulp, or rejected materials?',
      bn: 'তুষ, কুঁড়া, ছাই, ভাঙা চাল, খোসা, শাঁস, পাল্প বা বাতিল উপাদানের মতো উপজাত পুনঃব্যবহার বা বিক্রি করেন কি?'
    },
    evidenceExamples: { en: 'Sale record, storage, buyer contact', bn: 'বিক্রয়ের রেকর্ড, সংরক্ষণ, ক্রেতার যোগাযোগ' },
    financeLink: { en: 'Circular economy finance', bn: 'সার্কুলার ইকোনমি অর্থায়ন' },
    routingCondition: (a) => R.producesWasteOfType(a, 'Rice husk / bran / ash', 'Wood waste', 'Crop residue', 'Food waste') || R.subSectorIs(a, 'Rice mill / husking', 'Food processing', 'Spice grinding / oil processing')
  },
  {
    id: 'FP-05', domain: 'D6', weightPriority: 'High',
    text: {
      en: 'Do you control dust from husking, grinding, cutting, sanding, drying, mixing, or storage?',
      bn: 'হাস্কিং, গ্রাইন্ডিং, কাটিং, স্যান্ডিং, শুকানো, মেশানো বা সংরক্ষণের সময় ধুলা নিয়ন্ত্রণ করেন কি?'
    },
    evidenceExamples: { en: 'Dust collector, mask, ventilation', bn: 'ডাস্ট কালেক্টর, মাস্ক, ভেন্টিলেশন' },
    financeLink: { en: 'Workplace/community safety', bn: 'কর্মস্থল/সম্প্রদায় নিরাপত্তা' },
    routingCondition: (a) => R.subSectorIs(a, 'Rice mill / husking', 'Spice grinding / oil processing', 'Furniture / wood products') || R.causesNuisance(a)
  },
  {
    id: 'FP-06', domain: 'D1', weightPriority: 'High',
    text: {
      en: 'Do you control smoke from boilers, dryers, ovens, kilns, biomass, firewood, coal, diesel, or fuel-burning equipment?',
      bn: 'বয়লার, ড্রায়ার, ওভেন, ভাটি, বায়োমাস, লাকড়ি, কয়লা, ডিজেল বা জ্বালানি-পোড়ানো যন্ত্রপাতির ধোঁয়া নিয়ন্ত্রণ করেন কি?'
    },
    evidenceExamples: { en: 'Chimney, improved stove, fuel switch', bn: 'চিমনি, উন্নত চুলা, জ্বালানি পরিবর্তন' },
    financeLink: { en: 'Cleaner technology finance', bn: 'ক্লিনার টেকনোলজি অর্থায়ন' },
    routingCondition: (a) => R.usesBiomass(a) || R.usesGenerator(a) || R.usesCookingFuel(a)
  },
  {
    id: 'FP-07', domain: 'D2', weightPriority: 'Very High', criticalRisk: true,
    text: {
      en: 'Do you prevent wash water, food residue, oil, grease, sludge, or processing wastewater from entering open drains or water bodies untreated?',
      bn: 'ধোয়ার পানি, খাদ্যের অবশিষ্টাংশ, তেল, গ্রিজ, স্লাজ বা প্রক্রিয়াজাত বর্জ্য পানি অপরিশোধিত অবস্থায় খোলা ড্রেন বা জলাশয়ে প্রবেশ করা থেকে রোধ করেন কি?'
    },
    evidenceExamples: { en: 'Drain cover, grease trap, settling tank', bn: 'ড্রেন কভার, গ্রিজ ট্র্যাপ, সেটলিং ট্যাঙ্ক' },
    financeLink: { en: 'Pollution prevention', bn: 'দূষণ প্রতিরোধ' },
    routingCondition: R.hasWastewater
  },
  {
    id: 'FP-08', domain: 'D3', weightPriority: 'Medium',
    text: {
      en: 'Do you reduce raw material losses through better storage, sorting, stock rotation, or production planning?',
      bn: 'উন্নত সংরক্ষণ, বাছাই, স্টক রোটেশন বা উৎপাদন পরিকল্পনার মাধ্যমে কাঁচামালের ক্ষতি কমান কি?'
    },
    evidenceExamples: { en: 'Storage records, lower spoilage', bn: 'সংরক্ষণ রেকর্ড, কম নষ্ট হওয়া' },
    financeLink: { en: 'Resource efficiency', bn: 'সম্পদ দক্ষতা' },
    routingCondition: (a) => R.sectorIs(a, R.SECTOR_MANUFACTURING) || R.subSectorIs(a, 'Rice mill / husking', 'Food processing', 'Bakery / snacks / sweets production', 'Spice grinding / oil processing')
  },
  {
    id: 'FP-09', domain: 'D1', weightPriority: 'High',
    text: {
      en: 'Do you use efficient lighting, motors, belts, bearings, dryers, ovens, boilers, or insulation to reduce energy cost?',
      bn: 'শক্তির খরচ কমাতে দক্ষ লাইটিং, মোটর, বেল্ট, বিয়ারিং, ড্রায়ার, ওভেন, বয়লার বা ইনসুলেশন ব্যবহার করেন কি?'
    },
    evidenceExamples: { en: 'Equipment photo, receipts', bn: 'যন্ত্রপাতির ছবি, রশিদ' },
    financeLink: { en: 'Green finance', bn: 'গ্রিন ফাইন্যান্স' },
    routingCondition: R.hasMachinery
  },
  {
    id: 'FP-10', domain: 'D6', weightPriority: 'High',
    text: {
      en: 'Do workers have ventilation and protection from dust, smoke, heat, noise, or chemical smell?',
      bn: 'শ্রমিকদের ধুলা, ধোঁয়া, তাপ, শব্দ বা রাসায়নিক গন্ধ থেকে ভেন্টিলেশন এবং সুরক্ষা আছে কি?'
    },
    evidenceExamples: { en: 'Ventilation, fans, PPE, observation', bn: 'ভেন্টিলেশন, ফ্যান, PPE, পর্যবেক্ষণ' },
    financeLink: { en: 'Workplace environmental safety', bn: 'কর্মস্থলের পরিবেশগত নিরাপত্তা' },
    routingCondition: (a) => R.hasWorkers(a) && (R.sectorIs(a, R.SECTOR_MANUFACTURING) || R.subSectorIs(a, 'Rice mill / husking', 'Food processing', 'Spice grinding / oil processing', 'Furniture / wood products'))
  },
  {
    id: 'FP-11', domain: 'D3', weightPriority: 'Medium',
    text: {
      en: 'Do you store raw materials and finished products to avoid moisture, pests, contamination, spoilage, and waste?',
      bn: 'আর্দ্রতা, কীটপতঙ্গ, দূষণ, পচন এবং অপচয় এড়াতে কাঁচামাল ও তৈরি পণ্য সংরক্ষণ করেন কি?'
    },
    evidenceExamples: { en: 'Storage area, pallets, covers', bn: 'সংরক্ষণ এলাকা, প্যালেট, কভার' },
    financeLink: { en: 'Food safety/efficiency', bn: 'খাদ্য নিরাপত্তা/দক্ষতা' },
    routingCondition: (a) => R.sectorIs(a, R.SECTOR_MANUFACTURING) || R.sectorIs(a, R.SECTOR_RETAIL)
  },
  {
    id: 'FP-12', domain: 'D8', weightPriority: 'Pathway',
    text: {
      en: 'Would you consider replacing diesel, inefficient motors, old boilers, or high-fuel equipment with cleaner or efficient alternatives if finance is available?',
      bn: 'অর্থায়ন পাওয়া গেলে ডিজেল, অদক্ষ মোটর, পুরনো বয়লার বা বেশি জ্বালানি-ব্যবহারকারী যন্ত্রপাতি ক্লিনার বা দক্ষ বিকল্প দিয়ে প্রতিস্থাপন করতে চাইবেন কি?'
    },
    evidenceExamples: { en: 'Stated interest', bn: 'প্রকাশিত আগ্রহ' },
    financeLink: { en: 'Green finance pipeline', bn: 'গ্রিন ফাইন্যান্স পাইপলাইন' },
    routingCondition: R.hasFinanceInterest
  },
  {
    id: 'FP-13', domain: 'D3', weightPriority: 'High',
    text: {
      en: 'Do you have a safe system for ash, sludge, sawdust, husk, rejected products, or process residues?',
      bn: 'ছাই, স্লাজ, করাতকল ধুলা, তুষ, বাতিল পণ্য বা প্রক্রিয়ার অবশিষ্টাংশের জন্য নিরাপদ ব্যবস্থা আছে কি?'
    },
    evidenceExamples: { en: 'Storage/disposal observation', bn: 'সংরক্ষণ/নিষ্পত্তি পর্যবেক্ষণ' },
    financeLink: { en: 'Circularity/pollution prevention', bn: 'সার্কুলারিটি/দূষণ প্রতিরোধ' },
    routingCondition: (a) => R.producesWasteOfType(a, 'Rice husk / bran / ash', 'Wood waste', 'Wastewater sludge')
  },
  {
    id: 'FP-14', domain: 'D4', weightPriority: 'High',
    text: {
      en: 'Do you maintain fire safety and safe fuel storage around ovens, boilers, dryers, kilns, or generators?',
      bn: 'ওভেন, বয়লার, ড্রায়ার, ভাটি বা জেনারেটরের আশেপাশে অগ্নি নিরাপত্তা এবং নিরাপদ জ্বালানি সংরক্ষণ বজায় রাখেন কি?'
    },
    evidenceExamples: { en: 'Storage layout, extinguisher, observation', bn: 'সংরক্ষণ বিন্যাস, অগ্নিনির্বাপক, পর্যবেক্ষণ' },
    financeLink: { en: 'Safety and finance readiness', bn: 'নিরাপত্তা ও অর্থায়ন প্রস্তুতি' },
    routingCondition: (a) => R.usesCookingFuel(a) || R.storesFuelOnSite(a)
  }
];
