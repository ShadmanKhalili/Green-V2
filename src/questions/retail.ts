import { MainQuestion } from '../../types';
import * as R from './routingHelpers';

// =============================================================================
// J. Retail, Wholesale, Grocery, Pharmacy and Trading Module (RT-01..RT-12)
// =============================================================================
export const RETAIL_QUESTIONS: MainQuestion[] = [
  {
    id: 'RT-01', domain: 'D1', weightPriority: 'High',
    text: {
      en: 'Do you use refrigerators, freezers, air conditioners, cold boxes, or cold storage?',
      bn: 'আপনি কি রেফ্রিজারেটর, ফ্রিজার, এয়ার কন্ডিশনার, কোল্ড বক্স বা কোল্ড স্টোরেজ ব্যবহার করেন?'
    },
    evidenceExamples: { en: 'Equipment observation', bn: 'যন্ত্রপাতি পর্যবেক্ষণ' },
    financeLink: { en: 'Energy finance', bn: 'শক্তি অর্থায়ন' },
    routingCondition: (a) => R.sectorIs(a, R.SECTOR_RETAIL)
  },
  {
    id: 'RT-02', domain: 'D1', weightPriority: 'High',
    text: {
      en: 'Are refrigerators, freezers, or air conditioners maintained to reduce electricity use and leakage?',
      bn: 'বিদ্যুৎ ব্যবহার ও লিকেজ কমানোর জন্য কি রেফ্রিজারেটর, ফ্রিজার বা এয়ার কন্ডিশনার নিয়মিত রক্ষণাবেক্ষণ করা হয়?'
    },
    evidenceExamples: { en: 'Service record, equipment condition', bn: 'সার্ভিস রেকর্ড, যন্ত্রপাতির অবস্থা' },
    financeLink: { en: 'Energy efficiency finance', bn: 'শক্তি সাশ্রয়ী অর্থায়ন' },
    routingCondition: (a) => R.sectorIs(a, R.SECTOR_RETAIL) && R.hasMachinery(a)
  },
  {
    id: 'RT-03', domain: 'D3', weightPriority: 'High',
    text: {
      en: 'Do you reduce single-use plastic bags or offer reusable, paper, jute, cloth, or customer-brought bag options?',
      bn: 'আপনি কি একবার ব্যবহারযোগ্য প্লাস্টিক ব্যাগ কমিয়ে পুনর্ব্যবহারযোগ্য, কাগজ, পাট, কাপড় বা ক্রেতার আনা ব্যাগের বিকল্প দেন?'
    },
    evidenceExamples: { en: 'Packaging practice, photos', bn: 'প্যাকেজিং অনুশীলন, ছবি' },
    financeLink: { en: 'Green shop recognition', bn: 'গ্রিন শপ স্বীকৃতি' },
    routingCondition: (a) => R.sectorIs(a, R.SECTOR_RETAIL)
  },
  {
    id: 'RT-04', domain: 'D3', weightPriority: 'High',
    text: {
      en: 'Do you separate cardboard, plastic, glass, expired products, and general waste?',
      bn: 'আপনি কি কার্ডবোর্ড, প্লাস্টিক, কাঁচ, মেয়াদোত্তীর্ণ পণ্য ও সাধারণ বর্জ্য আলাদা করে রাখেন?'
    },
    evidenceExamples: { en: 'Separate storage, recycler receipt', bn: 'আলাদা সংরক্ষণ, recycler-এর রশিদ' },
    financeLink: { en: 'Circularity readiness', bn: 'সার্কুলারিটি প্রস্তুতি' },
    routingCondition: (a) => R.sectorIs(a, R.SECTOR_RETAIL)
  },
  {
    id: 'RT-05', domain: 'D3', weightPriority: 'Medium',
    text: {
      en: 'Do you return packaging, crates, cartons, bottles, or expired goods to suppliers where possible?',
      bn: 'সম্ভব হলে আপনি কি প্যাকেজিং, ক্রেট, কার্টন, বোতল বা মেয়াদোত্তীর্ণ পণ্য সরবরাহকারীর কাছে ফেরত পাঠান?'
    },
    evidenceExamples: { en: 'Supplier return record', bn: 'সরবরাহকারীর রিটার্ন রেকর্ড' },
    financeLink: { en: 'Waste reduction', bn: 'বর্জ্য হ্রাস' },
    routingCondition: (a) => R.sectorIs(a, R.SECTOR_RETAIL)
  },
  {
    id: 'RT-06', domain: 'D3', weightPriority: 'High',
    text: {
      en: 'Do you reduce expired, spoiled, damaged, or unsold goods through stock rotation and careful purchasing?',
      bn: 'স্টক রোটেশন ও সতর্ক ক্রয়ের মাধ্যমে আপনি কি মেয়াদোত্তীর্ণ, নষ্ট, ক্ষতিগ্রস্ত বা অবিক্রীত পণ্য কমান?'
    },
    evidenceExamples: { en: 'Stock records, expiry checks', bn: 'স্টকের রেকর্ড, মেয়াদ পরীক্ষা' },
    financeLink: { en: 'Resource efficiency', bn: 'সম্পদ দক্ষতা' },
    routingCondition: (a) => R.sectorIs(a, R.SECTOR_RETAIL) || R.sectorIs(a, R.SECTOR_FOODSERVICE)
  },
  {
    id: 'RT-07', domain: 'D3', weightPriority: 'Very High', criticalRisk: true,
    text: {
      en: 'Do you safely manage expired medicine, chemicals, batteries, bulbs, or special waste instead of mixing them with general waste?',
      bn: 'মেয়াদোত্তীর্ণ ওষুধ, রাসায়নিক, ব্যাটারি, বাল্ব বা বিশেষ বর্জ্য কি সাধারণ বর্জ্যের সঙ্গে না মিশিয়ে নিরাপদে আলাদাভাবে ব্যবস্থাপনা করেন?'
    },
    evidenceExamples: { en: 'Separate storage, return system', bn: 'আলাদা সংরক্ষণ, ফেরত পদ্ধতি' },
    financeLink: { en: 'Environmental safety', bn: 'পরিবেশগত নিরাপত্তা' },
    routingCondition: (a) => R.subSectorIs(a, 'Pharmacy', 'Hardware shop', 'Electronics shop')
  },
  {
    id: 'RT-08', domain: 'D1', weightPriority: 'Medium',
    text: {
      en: 'Do you use LED lights, efficient fans, efficient refrigerators, or switch-off practices?',
      bn: 'আপনি কি LED বাতি, দক্ষ পাখা, দক্ষ রেফ্রিজারেটর ব্যবহার করেন বা ব্যবহারের পর সুইচ বন্ধ রাখার অভ্যাস রাখেন?'
    },
    evidenceExamples: { en: 'Equipment observation, bills', bn: 'যন্ত্রপাতি পর্যবেক্ষণ, বিল' },
    financeLink: { en: 'Energy efficiency', bn: 'শক্তি দক্ষতা' },
    routingCondition: R.hasFacility
  },
  {
    id: 'RT-09', domain: 'D7', weightPriority: 'Medium',
    text: {
      en: 'Do you keep electricity bills, waste sale receipts, expired goods records, or supplier return records?',
      bn: 'আপনি কি বিদ্যুৎ বিল, বর্জ্য বিক্রির রশিদ, মেয়াদোত্তীর্ণ পণ্যের রেকর্ড বা সরবরাহকারীর রিটার্ন রেকর্ড সংরক্ষণ করেন?'
    },
    evidenceExamples: { en: 'Records, receipts', bn: 'রেকর্ড, রশিদ' },
    financeLink: { en: 'Finance readiness', bn: 'অর্থায়ন প্রস্তুতি' },
    routingCondition: (a) => R.sectorIs(a, R.SECTOR_RETAIL)
  },
  {
    id: 'RT-10', domain: 'D4', weightPriority: 'Medium',
    text: {
      en: 'Do you sell or promote eco-friendly, local, refill, low-waste, repairable, energy-saving, or durable products?',
      bn: 'আপনি কি পরিবেশবান্ধব, স্থানীয়, রিফিল, কম বর্জ্যের, মেরামতযোগ্য, শক্তি সাশ্রয়ী বা টেকসই পণ্য বিক্রি বা প্রচার করেন?'
    },
    evidenceExamples: { en: 'Product list, shelf observation', bn: 'পণ্যের তালিকা, শেলফ পর্যবেক্ষণ' },
    financeLink: { en: 'Green market recognition', bn: 'গ্রিন মার্কেট স্বীকৃতি' },
    routingCondition: (a) => R.sectorIs(a, R.SECTOR_RETAIL)
  },
  {
    id: 'RT-11', domain: 'D3', weightPriority: 'Very High', criticalRisk: true,
    text: {
      en: 'Do you avoid dumping packaging, spoiled goods, or expired stock into drains, roadsides, water bodies, or open spaces?',
      bn: 'আপনি কি প্যাকেজিং, নষ্ট পণ্য বা মেয়াদোত্তীর্ণ স্টক ড্রেন, রাস্তার ধারে, জলাশয় বা খোলা জায়গায় ফেলা থেকে বিরত থাকেন?'
    },
    evidenceExamples: { en: 'Disposal practice', bn: 'নিষ্পত্তি অনুশীলন' },
    financeLink: { en: 'Pollution prevention', bn: 'দূষণ প্রতিরোধ' },
    routingCondition: R.hasWaste
  },
  {
    id: 'RT-12', domain: 'D8', weightPriority: 'Pathway',
    text: {
      en: 'Are you interested in being recognized as a green shop, green supplier, or low-waste retailer?',
      bn: 'আপনি কি গ্রিন শপ, গ্রিন সরবরাহকারী বা কম-বর্জ্যের retailer হিসেবে স্বীকৃতি পেতে আগ্রহী?'
    },
    evidenceExamples: { en: 'Stated interest', bn: 'প্রকাশিত আগ্রহ' },
    financeLink: { en: 'Green recognition', bn: 'গ্রিন স্বীকৃতি' },
    routingCondition: R.hasCertificationInterest
  },
];
