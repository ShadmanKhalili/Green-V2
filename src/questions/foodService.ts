import { MainQuestion } from '../../types';
import * as R from './routingHelpers';

// =============================================================================
// K. Food Service, Restaurants, Catering, Tea Stall and Hotel Module (FS-01..FS-12)
// =============================================================================
export const FOOD_SERVICE_QUESTIONS: MainQuestion[] = [
  {
    id: 'FS-01',
    domain: 'D3',
    weightPriority: 'High',
    text: {
      en: 'Do you monitor or estimate daily food waste from cooking, preparation, serving, or unsold food?',
      bn: 'আপনি কি রান্না, প্রস্তুতি, পরিবেশন বা অবিক্রিত খাবার থেকে দৈনিক খাদ্য বর্জ্যের পরিমাণ পর্যবেক্ষণ বা অনুমান করেন?'
    },
    evidenceExamples: { en: 'Food waste bin, estimate, record', bn: 'খাদ্য বর্জ্যের বিন, অনুমান, রেকর্ড' },
    financeLink: { en: 'Resource efficiency', bn: 'সম্পদ দক্ষতা' },
    routingCondition: (a) => R.sectorIs(a, R.SECTOR_FOODSERVICE)
  },
  {
    id: 'FS-02',
    domain: 'D3',
    weightPriority: 'High',
    text: {
      en: 'Do you separate food waste for composting, animal feed, safe collection, or other beneficial use?',
      bn: 'আপনি কি কম্পোস্টিং, পশুখাদ্য, নিরাপদ সংগ্রহ বা অন্যান্য কাজে ব্যবহারের জন্য খাদ্য বর্জ্য আলাদা করেন?'
    },
    evidenceExamples: { en: 'Separate bin, compost, collection', bn: 'আলাদা বিন, কম্পোস্ট, সংগ্রহ' },
    financeLink: { en: 'Circularity', bn: 'বৃত্তাকার অর্থনীতি' },
    routingCondition: (a) => R.producesWasteOfType(a, 'Food waste') || R.sectorIs(a, R.SECTOR_FOODSERVICE)
  },
  {
    id: 'FS-03',
    domain: 'D2',
    weightPriority: 'Very High',
    criticalRisk: true,
    text: {
      en: 'Do you manage used cooking oil safely instead of dumping it into drains, soil, canals, or water bodies?',
      bn: 'আপনি কি ব্যবহৃত রান্নার তেল ড্রেন, মাটি, খাল বা জলাশয়ে না ফেলে নিরাপদভাবে ব্যবস্থাপনা করেন?'
    },
    evidenceExamples: { en: 'Used oil container, buyer receipt', bn: 'ব্যবহৃত তেলের পাত্র, ক্রেতার রশিদ' },
    financeLink: { en: 'Pollution prevention', bn: 'দূষণ প্রতিরোধ' },
    routingCondition: (a) => R.sectorIs(a, R.SECTOR_FOODSERVICE) || R.producesWasteOfType(a, 'Used oil / grease')
  },
  {
    id: 'FS-04',
    domain: 'D1',
    weightPriority: 'High',
    text: {
      en: 'Do you use fuel-efficient stoves, burners, lids, insulation, pressure cookers, or improved cooking practices to reduce LPG/gas/firewood use?',
      bn: 'আপনি কি LPG/গ্যাস/লাকড়ির ব্যবহার কমাতে জ্বালানি সাশ্রয়ী চুলা, বার্নার, ঢাকনা, ইনসুলেশন, প্রেসার কুকার বা উন্নত রান্নার পদ্ধতি ব্যবহার করেন?'
    },
    evidenceExamples: { en: 'Stove observation, fuel records', bn: 'চুলার পর্যবেক্ষণ, জ্বালানি রেকর্ড' },
    financeLink: { en: 'Cleaner cooking finance', bn: 'পরিচ্ছন্ন রান্নার অর্থায়ন' },
    routingCondition: (a) => R.sectorIs(a, R.SECTOR_FOODSERVICE) && R.usesCookingFuel(a)
  },
  {
    id: 'FS-05',
    domain: 'D2',
    weightPriority: 'Medium',
    text: {
      en: 'Do you reduce water use during washing, cleaning, cooking, and dishwashing?',
      bn: 'আপনি কি ধোয়া, পরিষ্কার, রান্না এবং বাসন মাজার সময় পানির ব্যবহার কমান?'
    },
    evidenceExamples: { en: 'Washing practice, nozzles', bn: 'ধোয়ার পদ্ধতি, নজল' },
    financeLink: { en: 'Water efficiency', bn: 'পানি দক্ষতা' },
    routingCondition: (a) => R.sectorIs(a, R.SECTOR_FOODSERVICE) && R.usesWater(a)
  },
  {
    id: 'FS-06',
    domain: 'D2',
    weightPriority: 'Very High',
    criticalRisk: true,
    text: {
      en: 'Do you prevent food scraps, grease, oil, and wastewater from entering open drains?',
      bn: 'আপনি কি খাবারের অবশিষ্টাংশ, গ্রিজ, তেল এবং বর্জ্য পানি খোলা ড্রেনে যাওয়া প্রতিরোধ করেন?'
    },
    evidenceExamples: { en: 'Grease trap, drain cover, strainer', bn: 'গ্রিজ ট্র্যাপ, ড্রেন কভার, ছাঁকনি' },
    financeLink: { en: 'Pollution prevention', bn: 'দূষণ প্রতিরোধ' },
    routingCondition: (a) => R.sectorIs(a, R.SECTOR_FOODSERVICE) || R.usesOilOrGrease(a) || R.hasWastewater(a)
  },
  {
    id: 'FS-07',
    domain: 'D3',
    weightPriority: 'High',
    text: {
      en: 'Do you reduce single-use plastic plates, cups, spoons, straws, sachets, or excessive takeaway packaging?',
      bn: 'আপনি কি একবার ব্যবহারযোগ্য প্লাস্টিকের প্লেট, কাপ, চামচ, স্ট্র, সাশে বা অতিরিক্ত টেকঅ্যাওয়ে প্যাকেজিং কমান?'
    },
    evidenceExamples: { en: 'Packaging practice', bn: 'প্যাকেজিং পদ্ধতি' },
    financeLink: { en: 'Low-waste recognition', bn: 'কম-বর্জ্য স্বীকৃতি' },
    routingCondition: (a) => R.sectorIs(a, R.SECTOR_FOODSERVICE)
  },
  {
    id: 'FS-08',
    domain: 'D4',
    weightPriority: 'Medium',
    text: {
      en: 'Do you source local, seasonal, safe, or lower-waste ingredients where possible?',
      bn: 'আপনি কি যেখানে সম্ভব স্থানীয়, মৌসুমি, নিরাপদ বা কম-বর্জ্য উপকরণ সংগ্রহ করেন?'
    },
    evidenceExamples: { en: 'Supplier records, menu practice', bn: 'সরবরাহকারীর রেকর্ড, মেনু পদ্ধতি' },
    financeLink: { en: 'Green procurement', bn: 'সবুজ ক্রয় ব্যবস্থাপনা' },
    routingCondition: (a) => R.sectorIs(a, R.SECTOR_FOODSERVICE)
  },
  {
    id: 'FS-09',
    domain: 'D6',
    weightPriority: 'High',
    text: {
      en: 'Is the kitchen or cooking area ventilated and protected from excessive smoke, heat, and fumes?',
      bn: 'রান্নাঘর বা রান্নার এলাকা কি বাতাস চলাচলের ব্যবস্থা সম্পন্ন এবং অতিরিক্ত ধোঁয়া, তাপ ও গ্যাস থেকে সুরক্ষিত?'
    },
    evidenceExamples: { en: 'Ventilation, chimney, fan', bn: 'বাতাস চলাচল, চিমনি, ফ্যান' },
    financeLink: { en: 'Workplace environmental safety', bn: 'কর্মস্থলের পরিবেশগত নিরাপত্তা' },
    routingCondition: (a) => R.sectorIs(a, R.SECTOR_FOODSERVICE) && R.usesCookingFuel(a)
  },
  {
    id: 'FS-10',
    domain: 'D7',
    weightPriority: 'Medium',
    text: {
      en: 'Do you keep records of fuel, food purchases, food waste, oil disposal, water bills, or electricity bills?',
      bn: 'আপনি কি জ্বালানি, খাদ্য ক্রয়, খাদ্য বর্জ্য, তেল নিষ্কাশন, পানির বিল বা বিদ্যুৎ বিলের রেকর্ড রাখেন?'
    },
    evidenceExamples: { en: 'Bills, receipts, notebook', bn: 'বিল, রশিদ, নোটবুক' },
    financeLink: { en: 'Finance readiness', bn: 'অর্থায়ন প্রস্তুতি' },
    routingCondition: (a) => R.sectorIs(a, R.SECTOR_FOODSERVICE)
  },
  {
    id: 'FS-11',
    domain: 'D3',
    weightPriority: 'High',
    text: {
      en: 'Do you safely manage spoiled food to avoid odour, pests, flies, and contamination?',
      bn: 'আপনি কি দুর্গন্ধ, পোকামাকড়, মাছি ও দূষণ এড়াতে নষ্ট খাবার নিরাপদভাবে ব্যবস্থাপনা করেন?'
    },
    evidenceExamples: { en: 'Covered bins, disposal schedule', bn: 'ঢাকনাযুক্ত বিন, নিষ্কাশনের সময়সূচি' },
    financeLink: { en: 'Workplace/community safety', bn: 'কর্মস্থল ও সম্প্রদায়ের নিরাপত্তা' },
    routingCondition: (a) => R.producesWasteOfType(a, 'Food waste', 'Expired/spoiled products') || R.sectorIs(a, R.SECTOR_FOODSERVICE)
  },
  {
    id: 'FS-12',
    domain: 'D1',
    weightPriority: 'High',
    text: {
      en: 'For hotels/guesthouses, do you reduce laundry water, detergent, electricity, and single-use toiletries?',
      bn: 'হোটেল/গেস্টহাউসের ক্ষেত্রে, আপনি কি লন্ড্রির পানি, ডিটারজেন্ট, বিদ্যুৎ এবং একবার ব্যবহারযোগ্য টয়লেট্রিজ কমান?'
    },
    evidenceExamples: { en: 'Laundry practice, refill dispensers', bn: 'লন্ড্রি পদ্ধতি, রিফিল ডিসপেনসার' },
    financeLink: { en: 'Green hospitality readiness', bn: 'সবুজ আতিথেয়তা প্রস্তুতি' },
    routingCondition: (a) => R.subSectorIs(a, 'Hotel / guesthouse')
  }
];
