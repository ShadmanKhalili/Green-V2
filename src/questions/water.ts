import { MainQuestion } from '../../types';
import * as R from './routingHelpers';

// =============================================================================
// C. Water Use and Wastewater Module (WA-01..WA-12) — Sector Agnostic
// =============================================================================
export const WATER_QUESTIONS: MainQuestion[] = [
  {
    id: 'WA-01',
    domain: 'D2',
    weightPriority: 'Medium',
    text: {
      en: 'Do you know where your business water comes from, such as tube well, WASA/municipal line, pond, river, rainwater, or purchased water?',
      bn: 'আপনি কি জানেন আপনার ব্যবসার পানি কোথা থেকে আসে, যেমন টিউবওয়েল, WASA/পৌরসভার লাইন, পুকুর, নদী, বৃষ্টির পানি, নাকি কেনা পানি?'
    },
    evidenceExamples: {
      en: 'Source observation, bill, verbal explanation',
      bn: 'উৎস পর্যবেক্ষণ, বিল, মৌখিক ব্যাখ্যা'
    },
    financeLink: {
      en: 'Water risk readiness',
      bn: 'পানি ঝুঁকি প্রস্তুতি'
    },
    routingCondition: R.usesWater
  },
  {
    id: 'WA-02',
    domain: 'D2',
    weightPriority: 'Medium',
    text: {
      en: 'Do you track or estimate how much water your business uses?',
      bn: 'আপনি কি আপনার ব্যবসায় কতটুকু পানি ব্যবহার হয় তা হিসাব রাখেন বা অনুমান করেন?'
    },
    evidenceExamples: {
      en: 'Water bill, pump hours, estimate',
      bn: 'পানির বিল, পাম্প চলার সময়, অনুমান'
    },
    financeLink: {
      en: 'Water efficiency finance',
      bn: 'পানি সাশ্রয়ী অর্থায়ন'
    },
    routingCondition: R.usesSignificantWater
  },
  {
    id: 'WA-03',
    domain: 'D2',
    weightPriority: 'Medium',
    text: {
      en: 'Do you repair leaks in taps, pipes, tanks, pumps, hoses, or irrigation systems quickly?',
      bn: 'আপনি কি ট্যাপ, পাইপ, ট্যাঙ্ক, পাম্প, হোস বা সেচ ব্যবস্থায় লিকেজ দ্রুত মেরামত করেন?'
    },
    evidenceExamples: {
      en: 'Observation, repair receipt',
      bn: 'পর্যবেক্ষণ, মেরামতের রশিদ'
    },
    financeLink: {
      en: 'Water efficiency',
      bn: 'পানি সাশ্রয়'
    },
    routingCondition: R.usesWater
  },
  {
    id: 'WA-04',
    domain: 'D2',
    weightPriority: 'Medium',
    text: {
      en: 'Do you reuse water where safe, such as for cleaning floors, gardening, soaking, cooling, or pre-washing?',
      bn: 'আপনি কি নিরাপদ ক্ষেত্রে পানি পুনঃব্যবহার করেন, যেমন মেঝে পরিষ্কার, বাগান, ভেজানো, ঠান্ডা করা বা প্রি-ওয়াশের জন্য?'
    },
    evidenceExamples: {
      en: 'Observation, reuse arrangement',
      bn: 'পর্যবেক্ষণ, পুনঃব্যবহারের ব্যবস্থা'
    },
    financeLink: {
      en: 'Water efficiency',
      bn: 'পানি সাশ্রয়'
    },
    routingCondition: R.usesWater
  },
  {
    id: 'WA-05',
    domain: 'D2',
    weightPriority: 'Very High',
    criticalRisk: true,
    text: {
      en: 'Do you avoid discharging dirty water directly into open drains, canals, ponds, rivers, or open land?',
      bn: 'আপনি কি নোংরা পানি সরাসরি খোলা ড্রেন, খাল, পুকুর, নদী বা খোলা জমিতে ফেলা থেকে বিরত থাকেন?'
    },
    evidenceExamples: {
      en: 'Drainage observation, photos',
      bn: 'ড্রেনেজ পর্যবেক্ষণ, ছবি'
    },
    financeLink: {
      en: 'Pollution prevention',
      bn: 'দূষণ প্রতিরোধ'
    },
    routingCondition: R.hasUnsafeWastewater
  },
  {
    id: 'WA-06',
    domain: 'D2',
    weightPriority: 'Very High',
    criticalRisk: true,
    text: {
      en: 'Do you filter, settle, treat, or safely manage wastewater before disposal?',
      bn: 'আপনি কি বর্জ্য পানি ফেলার আগে ফিল্টার, সেটল, ট্রিট বা নিরাপদে ব্যবস্থাপনা করেন?'
    },
    evidenceExamples: {
      en: 'Settling tank, ETP, soak pit, grease trap',
      bn: 'সেটলিং ট্যাঙ্ক, ETP, সোক পিট, গ্রিজ ট্র্যাপ'
    },
    financeLink: {
      en: 'Green finance, certification',
      bn: 'গ্রিন ফাইন্যান্স, সার্টিফিকেশন'
    },
    routingCondition: R.hasWastewater
  },
  {
    id: 'WA-07',
    domain: 'D2',
    weightPriority: 'Very High',
    criticalRisk: true,
    text: {
      en: 'Do you prevent oil, grease, food scraps, chemicals, manure, dyes, or sludge from entering drains?',
      bn: 'আপনি কি তেল, গ্রিজ, খাবারের অবশিষ্টাংশ, রাসায়নিক, গোবর, রং বা স্লাজ ড্রেনে যাওয়া থেকে প্রতিরোধ করেন?'
    },
    evidenceExamples: {
      en: 'Grease trap, mesh, storage container',
      bn: 'গ্রিজ ট্র্যাপ, জাল, সংরক্ষণ কনটেইনার'
    },
    financeLink: {
      en: 'Pollution prevention',
      bn: 'দূষণ প্রতিরোধ'
    },
    routingCondition: (a) => R.hasWastewater(a) || R.hasManureOrLitter(a) || R.usesChemicals(a) || R.usesOilOrGrease(a)
  },
  {
    id: 'WA-08',
    domain: 'D2',
    weightPriority: 'Low',
    text: {
      en: 'Do you collect rainwater or use stored rainwater for any business purpose?',
      bn: 'আপনি কি বৃষ্টির পানি সংগ্রহ করেন বা ব্যবসার কোনো কাজে সংরক্ষিত বৃষ্টির পানি ব্যবহার করেন?'
    },
    evidenceExamples: {
      en: 'Rainwater tank, pond, barrel',
      bn: 'বৃষ্টির পানির ট্যাঙ্ক, পুকুর, ব্যারেল'
    },
    financeLink: {
      en: 'Climate resilience',
      bn: 'জলবায়ু সহনশীলতা'
    },
    routingCondition: (a) => R.hasFacility(a) || R.sectorIs(a, R.SECTOR_AGRICULTURE)
  },
  {
    id: 'WA-09',
    domain: 'D2',
    weightPriority: 'High',
    text: {
      en: 'Do you use water-saving irrigation practices such as scheduled irrigation, mulching, alternate wetting, drip, sprinkler, or avoiding over-irrigation?',
      bn: 'আপনি কি পানি সাশ্রয়ী সেচ পদ্ধতি ব্যবহার করেন, যেমন নির্ধারিত সময়ে সেচ, মালচিং, পর্যায়ক্রমিক ভেজানো, ড্রিপ, স্প্রিংকলার বা অতিরিক্ত সেচ এড়ানো?'
    },
    evidenceExamples: {
      en: 'Irrigation schedule, field observation',
      bn: 'সেচের সময়সূচী, মাঠ পর্যবেক্ষণ'
    },
    financeLink: {
      en: 'Green agriculture',
      bn: 'গ্রিন কৃষি'
    },
    routingCondition: (a) => R.sectorIs(a, R.SECTOR_AGRICULTURE) && R.usesWater(a)
  },
  {
    id: 'WA-10',
    domain: 'D2',
    weightPriority: 'Very High',
    criticalRisk: true,
    text: {
      en: "Do you prevent wastewater or runoff from reaching nearby drinking water sources, tube wells, ponds, canals, or neighbours' land?",
      bn: 'আপনি কি বর্জ্য পানি বা রানঅফ কাছাকাছি খাবার পানির উৎস, টিউবওয়েল, পুকুর, খাল বা প্রতিবেশীর জমিতে পৌঁছানো থেকে প্রতিরোধ করেন?'
    },
    evidenceExamples: {
      en: 'Buffer area, drainage control, observation',
      bn: 'বাফার এলাকা, ড্রেনেজ নিয়ন্ত্রণ, পর্যবেক্ষণ'
    },
    financeLink: {
      en: 'Local environmental safety',
      bn: 'স্থানীয় পরিবেশ সুরক্ষা'
    },
    routingCondition: (a) => R.usesWater(a) || R.hasWastewater(a)
  },
  {
    id: 'WA-11',
    domain: 'D2',
    weightPriority: 'Medium',
    text: {
      en: 'Do workers know which wastewater or cleaning water is unsafe to release directly?',
      bn: 'কর্মীরা কি জানেন কোন বর্জ্য পানি বা পরিষ্কারের পানি সরাসরি ছাড়া নিরাপদ নয়?'
    },
    evidenceExamples: {
      en: 'Staff statement, instruction',
      bn: 'কর্মীর বক্তব্য, নির্দেশনা'
    },
    financeLink: {
      en: 'ISO 14001 readiness',
      bn: 'ISO 14001 প্রস্তুতি'
    },
    routingCondition: (a) => R.hasWorkers(a) && R.hasWastewater(a)
  },
  {
    id: 'WA-12',
    domain: 'D2',
    weightPriority: 'Medium',
    text: {
      en: 'If your business uses a septic tank, soak pit, or drain, is it maintained and not overflowing?',
      bn: 'আপনার ব্যবসা যদি সেপটিক ট্যাঙ্ক, সোক পিট বা ড্রেন ব্যবহার করে, তা কি রক্ষণাবেক্ষণ করা হয় এবং উপচে পড়ে না?'
    },
    evidenceExamples: {
      en: 'Observation, cleaning record',
      bn: 'পর্যবেক্ষণ, পরিষ্কারের রেকর্ড'
    },
    financeLink: {
      en: 'Basic environmental safety',
      bn: 'মৌলিক পরিবেশ সুরক্ষা'
    },
    routingCondition: (a) => R.usesSepticOrSoak(a) || R.hasFacility(a)
  }
];
