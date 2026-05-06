import { MainQuestion } from '../../types';
import * as R from './routingHelpers';

// =============================================================================
// N. Transport, Logistics, Delivery, Cold Chain and Warehouse Module (TR-01..TR-10)
// =============================================================================
export const TRANSPORT_QUESTIONS: MainQuestion[] = [
  {
    id: 'TR-01',
    domain: 'D1',
    weightPriority: 'High',
    text: {
      en: 'Do you track fuel use and cost for vehicles, generators, cold rooms, or delivery operations?',
      bn: 'আপনি কি যানবাহন, জেনারেটর, কোল্ড রুম বা ডেলিভারি কাজের জন্য জ্বালানির ব্যবহার ও খরচের হিসাব রাখেন?'
    },
    evidenceExamples: { en: 'Fuel records, receipts', bn: 'জ্বালানির রেকর্ড, রশিদ' },
    financeLink: { en: 'Fuel efficiency finance', bn: 'জ্বালানি সাশ্রয়ী অর্থায়ন' },
    routingCondition: (a) => R.sectorIs(a, R.SECTOR_TRANSPORT)
  },
  {
    id: 'TR-02',
    domain: 'D1',
    weightPriority: 'Very High',
    criticalRisk: true,
    text: {
      en: 'Are vehicles, engines, tyres, brakes, and filters maintained regularly to reduce fuel use and smoke?',
      bn: 'জ্বালানির ব্যবহার ও ধোঁয়া কমাতে আপনি কি নিয়মিতভাবে যানবাহন, ইঞ্জিন, টায়ার, ব্রেক এবং ফিল্টার রক্ষণাবেক্ষণ করেন?'
    },
    evidenceExamples: { en: 'Maintenance record, observation', bn: 'রক্ষণাবেক্ষণের রেকর্ড, পর্যবেক্ষণ' },
    financeLink: { en: 'Cleaner transport finance', bn: 'পরিচ্ছন্ন পরিবহন অর্থায়ন' },
    routingCondition: (a) => R.sectorIs(a, R.SECTOR_TRANSPORT)
  },
  {
    id: 'TR-03',
    domain: 'D1',
    weightPriority: 'High',
    text: {
      en: 'Do you reduce unnecessary trips through route planning, combined deliveries, full loads, or scheduled delivery days?',
      bn: 'আপনি কি রুট পরিকল্পনা, একসাথে ডেলিভারি, পূর্ণ লোড বা নির্দিষ্ট ডেলিভারি দিনের মাধ্যমে অপ্রয়োজনীয় ট্রিপ কমান?'
    },
    evidenceExamples: { en: 'Delivery plan, route records', bn: 'ডেলিভারি পরিকল্পনা, রুটের রেকর্ড' },
    financeLink: { en: 'Emission reduction', bn: 'নির্গমন হ্রাস' },
    routingCondition: (a) => R.sectorIs(a, R.SECTOR_TRANSPORT)
  },
  {
    id: 'TR-04',
    domain: 'D1',
    weightPriority: 'Medium',
    text: {
      en: 'Do vehicles avoid unnecessary idling during loading, unloading, waiting, or parking?',
      bn: 'লোডিং, আনলোডিং, অপেক্ষা বা পার্কিংয়ের সময় আপনার যানবাহন কি অপ্রয়োজনীয়ভাবে ইঞ্জিন চালু রাখা এড়িয়ে চলে?'
    },
    evidenceExamples: { en: 'Driver statement, observation', bn: 'চালকের বক্তব্য, পর্যবেক্ষণ' },
    financeLink: { en: 'Fuel saving', bn: 'জ্বালানি সাশ্রয়' },
    routingCondition: (a) => R.sectorIs(a, R.SECTOR_TRANSPORT)
  },
  {
    id: 'TR-05',
    domain: 'D1',
    weightPriority: 'High',
    text: {
      en: 'Do you monitor smoke, oil leaks, fuel leaks, or abnormal emissions from vehicles or engines?',
      bn: 'আপনি কি যানবাহন বা ইঞ্জিন থেকে ধোঁয়া, তেল লিক, জ্বালানি লিক বা অস্বাভাবিক নির্গমন পর্যবেক্ষণ করেন?'
    },
    evidenceExamples: { en: 'Inspection, repair receipts', bn: 'পরিদর্শন, মেরামতের রশিদ' },
    financeLink: { en: 'Pollution reduction', bn: 'দূষণ হ্রাস' },
    routingCondition: (a) => R.sectorIs(a, R.SECTOR_TRANSPORT)
  },
  {
    id: 'TR-06',
    domain: 'D3',
    weightPriority: 'Very High',
    criticalRisk: true,
    text: {
      en: 'Do you safely collect and dispose of used oil, batteries, tyres, filters, and spare parts?',
      bn: 'আপনি কি ব্যবহৃত তেল, ব্যাটারি, টায়ার, ফিল্টার এবং খুচরা যন্ত্রাংশ নিরাপদে সংগ্রহ ও নিষ্পত্তি করেন?'
    },
    evidenceExamples: { en: 'Storage, recycler receipt', bn: 'সংরক্ষণ, recycler-এর রশিদ' },
    financeLink: { en: 'Hazardous waste readiness', bn: 'বিপজ্জনক বর্জ্য ব্যবস্থাপনার প্রস্তুতি' },
    routingCondition: (a) => R.sectorIs(a, R.SECTOR_TRANSPORT) || R.hasHazardousWaste(a)
  },
  {
    id: 'TR-07',
    domain: 'D1',
    weightPriority: 'Very High',
    criticalRisk: true,
    text: {
      en: 'For cold chain/cold storage, do you monitor temperature, door opening, insulation, and electricity use?',
      bn: 'কোল্ড চেইন/কোল্ড স্টোরেজের ক্ষেত্রে, আপনি কি তাপমাত্রা, দরজা খোলা, ইনসুলেশন এবং বিদ্যুতের ব্যবহার পর্যবেক্ষণ করেন?'
    },
    evidenceExamples: { en: 'Temperature logs, electricity bills', bn: 'তাপমাত্রার লগ, বিদ্যুৎ বিল' },
    financeLink: { en: 'Energy finance', bn: 'শক্তি অর্থায়ন' },
    routingCondition: (a) => R.subSectorIs(a, 'Cold storage / cold chain')
  },
  {
    id: 'TR-08',
    domain: 'D1',
    weightPriority: 'Very High',
    criticalRisk: true,
    text: {
      en: 'Do you maintain refrigerators, cold rooms, compressors, and insulation to reduce electricity loss?',
      bn: 'বিদ্যুতের অপচয় কমাতে আপনি কি ফ্রিজ, কোল্ড রুম, কম্প্রেসার এবং ইনসুলেশন রক্ষণাবেক্ষণ করেন?'
    },
    evidenceExamples: { en: 'Service record, observation', bn: 'সার্ভিস রেকর্ড, পর্যবেক্ষণ' },
    financeLink: { en: 'Energy efficiency finance', bn: 'শক্তি সাশ্রয়ী অর্থায়ন' },
    routingCondition: (a) => R.subSectorIs(a, 'Cold storage / cold chain')
  },
  {
    id: 'TR-09',
    domain: 'D1',
    weightPriority: 'Medium',
    text: {
      en: 'Do you use cleaner vehicles, CNG, electric vehicles, bicycles, route optimization, or fuel-efficient driving where possible?',
      bn: 'যেখানে সম্ভব, আপনি কি পরিচ্ছন্ন যানবাহন, CNG, ইলেকট্রিক যানবাহন, সাইকেল, রুট অপটিমাইজেশন বা জ্বালানি সাশ্রয়ী ড্রাইভিং ব্যবহার করেন?'
    },
    evidenceExamples: { en: 'Vehicle type, practice', bn: 'যানবাহনের ধরন, অনুশীলন' },
    financeLink: { en: 'Green transport pathway', bn: 'সবুজ পরিবহন pathway' },
    routingCondition: (a) => R.sectorIs(a, R.SECTOR_TRANSPORT)
  },
  {
    id: 'TR-10',
    domain: 'D7',
    weightPriority: 'Medium',
    text: {
      en: 'Do you keep records of vehicle maintenance, fuel, delivery volume, and repair cost?',
      bn: 'আপনি কি যানবাহনের রক্ষণাবেক্ষণ, জ্বালানি, ডেলিভারির পরিমাণ এবং মেরামতের খরচের রেকর্ড রাখেন?'
    },
    evidenceExamples: { en: 'Receipts, logbook', bn: 'রশিদ, লগবুক' },
    financeLink: { en: 'Finance readiness', bn: 'অর্থায়নের প্রস্তুতি' },
    routingCondition: (a) => R.sectorIs(a, R.SECTOR_TRANSPORT)
  }
];
