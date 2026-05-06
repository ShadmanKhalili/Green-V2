import { MainQuestion } from '../../types';
import * as R from './routingHelpers';

// =============================================================================
// B. Energy and Emissions Module (EN-01..EN-15) — Sector Agnostic
// =============================================================================
export const ENERGY_QUESTIONS: MainQuestion[] = [
  {
    id: 'EN-01', domain: 'D1', weightPriority: 'Medium',
    text: { en: 'Do you track monthly electricity use or electricity bills?', bn: 'আপনি কি মাসিক বিদ্যুতের ব্যবহার বা বিদ্যুৎ বিলের হিসাব রাখেন?' },
    evidenceExamples: { en: 'Electricity bills, meter photo', bn: 'বিদ্যুৎ বিল, মিটারের ছবি' },
    financeLink: { en: 'Energy efficiency finance', bn: 'শক্তি সাশ্রয়ী অর্থায়ন' },
    routingCondition: R.usesGridElectricity
  },
  {
    id: 'EN-02', domain: 'D1', weightPriority: 'High',
    text: { en: 'Do you track diesel, petrol, LPG, gas, coal, firewood, or biomass use and cost?', bn: 'আপনি কি ডিজেল, পেট্রোল, এলপিজি, গ্যাস, কয়লা, লাকড়ি বা বায়োমাস ব্যবহারের খরচ এবং হিসাব রাখেন?' },
    evidenceExamples: { en: 'Fuel purchase record, bills, receipts', bn: 'জ্বালানি ক্রয়ের রেকর্ড, বিল, রশিদ' },
    financeLink: { en: 'Green finance readiness', bn: 'সবুজ অর্থায়ন প্রস্তুতি' },
    routingCondition: (a) => R.usesAnyFuel(a, 'Diesel', 'Petrol/octane', 'CNG', 'LPG cylinder', 'Natural gas line', 'Firewood', 'Coal', 'Rice husk / biomass')
  },
  {
    id: 'EN-03', domain: 'D1', weightPriority: 'Medium',
    text: { en: 'Do you know which machine, process, or activity uses the most energy or fuel?', bn: 'আপনি কি জানেন কোন মেশিন, কাজ বা প্রক্রিয়ায় সবচেয়ে বেশি শক্তি বা জ্বালানি খরচ হয়?' },
    evidenceExamples: { en: 'Verbal explanation, basic calculation', bn: 'মৌখিক ব্যাখ্যা, সাধারণ হিসাব' },
    financeLink: { en: 'ISO 14001, energy audit readiness', bn: 'ISO 14001, এনার্জি অডিট প্রস্তুতি' },
    routingCondition: R.hasIntenseMachinery
  },
  {
    id: 'EN-04', domain: 'D1', weightPriority: 'High',
    text: { en: 'Are motors, pumps, compressors, grinders, sewing machines, dryers, boilers, or other machines maintained regularly?', bn: 'মোটর, পাম্প, কম্প্রেসার, গ্রাইন্ডার, সেলাই মেশিন, ড্রায়ার, বয়লার বা অন্যান্য মেশিন কি নিয়মিত রক্ষণাবেক্ষণ করা হয়?' },
    evidenceExamples: { en: 'Maintenance record, mechanic receipt, observation', bn: 'রক্ষণাবেক্ষণের রেকর্ড, মেকানিকের রশিদ, পর্যবেক্ষণ' },
    financeLink: { en: 'Energy efficiency finance', bn: 'শক্তি সাশ্রয়ী অর্থায়ন' },
    routingCondition: R.hasMachinery
  },
  {
    id: 'EN-05', domain: 'D1', weightPriority: 'Medium',
    text: { en: 'Do you replace old or inefficient equipment when repair costs and fuel/electricity use become too high?', bn: 'মেরামতের খরচ এবং জ্বালানি/বিদ্যুতের ব্যবহার অনেক বেশি হয়ে গেলে আপনি কি পুরনো বা অদক্ষ যন্ত্রপাতি পরিবর্তন করেন?' },
    evidenceExamples: { en: 'Purchase record, replacement plan', bn: 'ক্রয়ের রেকর্ড, প্রতিস্থাপন পরিকল্পনা' },
    financeLink: { en: 'Green investment plan', bn: 'সবুজ বিনিয়োগ পরিকল্পনা' },
    routingCondition: R.hasMachinery
  },
  {
    id: 'EN-06', domain: 'D1', weightPriority: 'Medium',
    text: { en: 'Do you use solar electricity, solar lights, solar pumps, or other renewable energy in the business?', bn: 'আপনি কি ব্যবসায় সৌর বিদ্যুৎ, সোলার লাইট, সোলার পাম্প বা অন্যান্য নবায়নযোগ্য শক্তি ব্যবহার করেন?' },
    evidenceExamples: { en: 'Solar panel photo, invoice', bn: 'সোলার প্যানেলের ছবি, ইনভয়েস' },
    financeLink: { en: 'Renewable energy finance', bn: 'নবায়নযোগ্য শক্তির অর্থায়ন' },
    routingCondition: R.askAll
  },
  {
    id: 'EN-07', domain: 'D1', weightPriority: 'Medium',
    text: { en: 'If solar is used, does it power productive business activities, not only mobile charging or small lighting?', bn: 'যদি সোলার ব্যবহার করেন, তা কি শুধু মোবাইল চার্জ বা ছোট আলোর জন্য নয়, বরং উৎপাদনশীল ব্যবসায়িক কাজে ব্যবহার হয়?' },
    evidenceExamples: { en: 'Connection evidence, equipment powered', bn: 'সংযোগের প্রমাণ, চালিত যন্ত্রপাতি' },
    financeLink: { en: 'Renewable energy impact', bn: 'নবায়নযোগ্য শক্তির প্রভাব' },
    routingCondition: R.askAll
  },
  {
    id: 'EN-08', domain: 'D1', weightPriority: 'High',
    text: { en: 'Do you use efficient cooking stoves, burners, boilers, dryers, or ovens to reduce fuel use and smoke?', bn: 'জ্বালানি ব্যবহার ও ধোঁয়া কমানোর জন্য আপনি কি দক্ষ চুলা, বার্নার, বয়লার, ড্রায়ার বা ওভেন ব্যবহার করেন?' },
    evidenceExamples: { en: 'Equipment photo, fuel reduction record', bn: 'যন্ত্রপাতির ছবি, জ্বালানি হ্রাসের রেকর্ড' },
    financeLink: { en: 'Cleaner technology finance', bn: 'ক্লিনার টেকনোলজি অর্থায়ন' },
    routingCondition: (a) => R.usesCookingFuel(a) || R.sectorIs(a, R.SECTOR_FOODSERVICE)
  },
  {
    id: 'EN-09', domain: 'D1', weightPriority: 'High',
    text: { en: 'Do you maintain burners, gas lines, stoves, boilers, or fuel systems to prevent leakage and excess fuel use?', bn: 'লিকেজ ও অতিরিক্ত জ্বালানি ব্যবহার রোধে আপনি কি বার্নার, গ্যাস লাইন, চুলা, বয়লার বা ফুয়েল সিস্টেম রক্ষণাবেক্ষণ করেন?' },
    evidenceExamples: { en: 'Inspection, receipt, observation', bn: 'পরিদর্শন, রশিদ, পর্যবেক্ষণ' },
    financeLink: { en: 'Safety and energy finance', bn: 'নিরাপত্তা ও শক্তি অর্থায়ন' },
    routingCondition: (a) => R.usesAnyFuel(a, 'LPG cylinder', 'Natural gas line', 'Diesel', 'Petrol/octane', 'CNG')
  },
  {
    id: 'EN-10', domain: 'D1', weightPriority: 'Medium',
    text: { en: 'Do you avoid running diesel generators or engines when grid electricity or cleaner alternatives are available?', bn: 'গ্রিড বিদ্যুৎ বা পরিচ্ছন্ন বিকল্প পাওয়া গেলে আপনি কি ডিজেল জেনারেটর বা ইঞ্জিন চালানো এড়িয়ে চলেন?' },
    evidenceExamples: { en: 'Operating records, bill comparison', bn: 'পরিচালনার রেকর্ড, বিল তুলনা' },
    financeLink: { en: 'Emission reduction finance', bn: 'নিঃসরণ হ্রাস অর্থায়ন' },
    routingCondition: R.usesGenerator
  },
  {
    id: 'EN-11', domain: 'D1', weightPriority: 'Medium',
    text: { en: 'Do you reduce idle running of vehicles, engines, pumps, or generators?', bn: 'আপনি কি গাড়ি, ইঞ্জিন, পাম্প বা জেনারেটর অযথা চালু রাখা কমিয়ে দেন?' },
    evidenceExamples: { en: 'Observation, staff statement', bn: 'পর্যবেক্ষণ, কর্মীর বক্তব্য' },
    financeLink: { en: 'Fuel efficiency', bn: 'জ্বালানি সাশ্রয়' },
    routingCondition: (a) => R.usesGenerator(a) || R.sectorIs(a, R.SECTOR_TRANSPORT)
  },
  {
    id: 'EN-12', domain: 'D1', weightPriority: 'Medium',
    text: { en: 'Do you use natural ventilation, daylight, shading, roof insulation, or reflective roofing to reduce cooling and lighting needs?', bn: 'কুলিং ও আলোর প্রয়োজন কমানোর জন্য আপনি কি প্রাকৃতিক বায়ু চলাচল, দিনের আলো, ছায়া, ছাদের ইনসুলেশন বা রিফ্লেকটিভ রুফিং ব্যবহার করেন?' },
    evidenceExamples: { en: 'Observation, photos', bn: 'পর্যবেক্ষণ, ছবি' },
    financeLink: { en: 'Green building readiness', bn: 'গ্রিন বিল্ডিং প্রস্তুতি' },
    routingCondition: R.hasFacility
  },
  {
    id: 'EN-13', domain: 'D1', weightPriority: 'High',
    text: { en: 'Do you maintain refrigerators, freezers, cold rooms, or air conditioners to reduce electricity use and leakage?', bn: 'বিদ্যুৎ ব্যবহার ও লিকেজ কমাতে আপনি কি রেফ্রিজারেটর, ফ্রিজার, কোল্ড রুম বা এয়ার কন্ডিশনার রক্ষণাবেক্ষণ করেন?' },
    evidenceExamples: { en: 'Service record, temperature log', bn: 'সার্ভিসের রেকর্ড, তাপমাত্রার লগ' },
    financeLink: { en: 'Energy efficiency finance', bn: 'শক্তি সাশ্রয়ী অর্থায়ন' },
    routingCondition: (a) => R.hasMachinery(a) && (R.sectorIs(a, R.SECTOR_RETAIL) || R.sectorIs(a, R.SECTOR_FOODSERVICE))
  },
  {
    id: 'EN-14', domain: 'D1', weightPriority: 'Medium',
    text: { en: 'Are high-energy machines used during planned hours to reduce unnecessary operation time?', bn: 'অপ্রয়োজনীয় পরিচালনার সময় কমাতে উচ্চ-শক্তি ব্যবহারকারী মেশিনগুলো কি পরিকল্পিত সময়ে চালানো হয়?' },
    evidenceExamples: { en: 'Work schedule, observation', bn: 'কাজের সময়সূচি, পর্যবেক্ষণ' },
    financeLink: { en: 'Energy management', bn: 'শক্তি ব্যবস্থাপনা' },
    routingCondition: R.hasIntenseMachinery
  },
  {
    id: 'EN-15', domain: 'D1', weightPriority: 'High',
    text: { en: 'Do you compare production output with energy/fuel use, such as electricity per batch or diesel per unit?', bn: 'আপনি কি উৎপাদনের সাথে শক্তি/জ্বালানি ব্যবহার তুলনা করেন, যেমন প্রতি ব্যাচে বিদ্যুৎ বা প্রতি ইউনিটে ডিজেল?' },
    evidenceExamples: { en: 'Production and fuel records', bn: 'উৎপাদন ও জ্বালানির রেকর্ড' },
    financeLink: { en: 'ISO 14001, energy finance', bn: 'ISO 14001, শক্তি অর্থায়ন' },
    routingCondition: R.hasFinanceInterest
  },
];
