import { MainQuestion } from '../../types';
import * as R from './routingHelpers';

// =============================================================================
// E. Materials, Chemicals and Inputs Module (CH-01..CH-12) — Sector Agnostic
// =============================================================================
export const CHEMICALS_QUESTIONS: MainQuestion[] = [
  {
    id: 'CH-01', domain: 'D4', weightPriority: 'Medium',
    text: {
      en: 'Do you know which chemicals, oils, pesticides, fertilizers, dyes, detergents, or fuels are used in your business?',
      bn: 'আপনার ব্যবসায় কোন রাসায়নিক, তেল, পেস্টিসাইড, সার, রং, ডিটারজেন্ট বা জ্বালানি ব্যবহার করা হয় তা কি আপনি জানেন?'
    },
    evidenceExamples: {
      en: 'Input list, containers, purchase records',
      bn: 'উপাদানের তালিকা, কনটেইনার, ক্রয়ের রেকর্ড'
    },
    financeLink: { en: 'ISO 14001 readiness', bn: 'ISO 14001 প্রস্তুতি' },
    routingCondition: R.usesChemicals
  },
  {
    id: 'CH-02', domain: 'D4', weightPriority: 'High',
    text: {
      en: 'Are chemicals, oils, fuels, pesticides, dyes, or cleaning products stored in labelled or identifiable containers?',
      bn: 'রাসায়নিক, তেল, জ্বালানি, পেস্টিসাইড, রং বা পরিষ্কারের পণ্য কি লেবেলযুক্ত বা শনাক্তযোগ্য কনটেইনারে সংরক্ষণ করা হয়?'
    },
    evidenceExamples: {
      en: 'Labels, photos, storage observation',
      bn: 'লেবেল, ছবি, সংরক্ষণ পর্যবেক্ষণ'
    },
    financeLink: { en: 'Safety/certification readiness', bn: 'নিরাপত্তা/সার্টিফিকেশন প্রস্তুতি' },
    routingCondition: R.usesChemicals
  },
  {
    id: 'CH-03', domain: 'D4', weightPriority: 'Very High', criticalRisk: true,
    text: {
      en: 'Are risky materials stored away from food, drinking water, animal feed, children, drains, open soil, and heat/fire sources?',
      bn: 'ঝুঁকিপূর্ণ উপাদান কি খাবার, পানীয় জল, পশুর খাদ্য, শিশু, ড্রেন, খোলা মাটি এবং তাপ/আগুনের উৎস থেকে দূরে সংরক্ষণ করা হয়?'
    },
    evidenceExamples: {
      en: 'Separate storage, observation',
      bn: 'আলাদা সংরক্ষণ, পর্যবেক্ষণ'
    },
    financeLink: { en: 'Pollution and safety', bn: 'দূষণ ও নিরাপত্তা' },
    routingCondition: (a) => R.usesChemicals(a) || R.storesFuelOnSite(a) || R.usesLiquidFuel(a)
  },
  {
    id: 'CH-04', domain: 'D4', weightPriority: 'Medium',
    text: {
      en: 'Do you buy only the amount of chemicals, pesticides, fertilizers, dyes, or solvents needed to avoid expiry or unsafe storage?',
      bn: 'মেয়াদ উত্তীর্ণ বা অনিরাপদ সংরক্ষণ এড়াতে আপনি কি প্রয়োজনীয় পরিমাণ রাসায়নিক, পেস্টিসাইড, সার, রং বা সলভেন্ট কিনেন?'
    },
    evidenceExamples: {
      en: 'Purchase records, stock observation',
      bn: 'ক্রয়ের রেকর্ড, স্টক পর্যবেক্ষণ'
    },
    financeLink: { en: 'Resource efficiency', bn: 'সম্পদের দক্ষতা' },
    routingCondition: R.usesChemicals
  },
  {
    id: 'CH-05', domain: 'D4', weightPriority: 'High',
    text: {
      en: 'Do workers or family members know how to use chemicals, fuel, pesticides, or cleaning agents safely?',
      bn: 'কর্মী বা পরিবারের সদস্যরা কি রাসায়নিক, জ্বালানি, পেস্টিসাইড বা পরিষ্কারের এজেন্ট নিরাপদে ব্যবহার করতে জানেন?'
    },
    evidenceExamples: {
      en: 'Verbal check, training, PPE',
      bn: 'মৌখিক যাচাই, প্রশিক্ষণ, PPE'
    },
    financeLink: { en: 'ISO 14001 readiness', bn: 'ISO 14001 প্রস্তুতি' },
    routingCondition: (a) => R.usesChemicals(a) && R.hasWorkers(a)
  },
  {
    id: 'CH-06', domain: 'D4', weightPriority: 'High',
    text: {
      en: 'Do you avoid mixing chemicals or cleaning agents in unsafe ways?',
      bn: 'আপনি কি রাসায়নিক বা পরিষ্কারের এজেন্ট অনিরাপদভাবে মেশানো এড়িয়ে চলেন?'
    },
    evidenceExamples: {
      en: 'Staff statement, practice observation',
      bn: 'কর্মীর বিবৃতি, কাজের পর্যবেক্ষণ'
    },
    financeLink: { en: 'Safety readiness', bn: 'নিরাপত্তা প্রস্তুতি' },
    routingCondition: (a) => R.usesChemicals(a) || R.usesCleaningChems(a)
  },
  {
    id: 'CH-07', domain: 'D4', weightPriority: 'Medium',
    text: {
      en: 'Do you use safer, less toxic, or lower-impact alternatives where available?',
      bn: 'যেখানে সম্ভব আপনি কি নিরাপদ, কম বিষাক্ত বা কম ক্ষতিকর বিকল্প ব্যবহার করেন?'
    },
    evidenceExamples: {
      en: 'Product labels, purchase record',
      bn: 'পণ্যের লেবেল, ক্রয়ের রেকর্ড'
    },
    financeLink: { en: 'Green procurement', bn: 'সবুজ ক্রয় ব্যবস্থা' },
    routingCondition: R.usesChemicals
  },
  {
    id: 'CH-08', domain: 'D4', weightPriority: 'Very High', criticalRisk: true,
    text: {
      en: 'Do you prevent leftover chemicals, oil, pesticide, dye, or detergent from being poured into drains, ponds, canals, rivers, or soil?',
      bn: 'অবশিষ্ট রাসায়নিক, তেল, পেস্টিসাইড, রং বা ডিটারজেন্ট কি আপনি ড্রেন, পুকুর, খাল, নদী বা মাটিতে ঢেলে দেওয়া থেকে বিরত থাকেন?'
    },
    evidenceExamples: {
      en: 'Disposal/storage observation',
      bn: 'নিষ্পত্তি/সংরক্ষণ পর্যবেক্ষণ'
    },
    financeLink: { en: 'Pollution prevention', bn: 'দূষণ প্রতিরোধ' },
    routingCondition: R.usesChemicals
  },
  {
    id: 'CH-09', domain: 'D4', weightPriority: 'Very High', criticalRisk: true,
    text: {
      en: 'Do you safely manage empty chemical, pesticide, oil, dye, or veterinary medicine containers?',
      bn: 'খালি রাসায়নিক, পেস্টিসাইড, তেল, রং বা ভেটেরিনারি ওষুধের কনটেইনার কি আপনি নিরাপদে ব্যবস্থাপনা করেন?'
    },
    evidenceExamples: {
      en: 'Separate collection, disposal record',
      bn: 'আলাদা সংগ্রহ, নিষ্পত্তির রেকর্ড'
    },
    financeLink: { en: 'Environmental safety', bn: 'পরিবেশগত নিরাপত্তা' },
    routingCondition: (a) => R.usesChemicals(a) || R.producesWasteOfType(a, 'Chemical containers', 'Pesticide/fertilizer packets or bottles')
  },
  {
    id: 'CH-10', domain: 'D4', weightPriority: 'Medium',
    text: {
      en: 'Do you keep purchase or use records for high-risk inputs such as pesticides, fertilizers, veterinary medicine, dyes, oils, or solvents?',
      bn: 'পেস্টিসাইড, সার, ভেটেরিনারি ওষুধ, রং, তেল বা সলভেন্টের মতো উচ্চ-ঝুঁকিপূর্ণ উপাদানের ক্রয় বা ব্যবহারের রেকর্ড কি আপনি রাখেন?'
    },
    evidenceExamples: {
      en: 'Receipts, notebook, input register',
      bn: 'রশিদ, খাতা, ইনপুট রেজিস্টার'
    },
    financeLink: { en: 'Certification readiness', bn: 'সার্টিফিকেশন প্রস্তুতি' },
    routingCondition: (a) => R.usesPesticideOrFertilizer(a) || R.usesVeterinaryMedicine(a) || R.usesDyesOrSolvents(a) || R.usesOilOrGrease(a)
  },
  {
    id: 'CH-11', domain: 'D4', weightPriority: 'Medium',
    text: {
      en: 'Do you check expiry dates or condition of chemicals, pesticides, medicine, cleaning agents, or inputs before use?',
      bn: 'ব্যবহারের আগে আপনি কি রাসায়নিক, পেস্টিসাইড, ওষুধ, পরিষ্কারের এজেন্ট বা উপাদানের মেয়াদ বা অবস্থা পরীক্ষা করেন?'
    },
    evidenceExamples: {
      en: 'Stock check, labels, records',
      bn: 'স্টক যাচাই, লেবেল, রেকর্ড'
    },
    financeLink: { en: 'Safety and quality', bn: 'নিরাপত্তা ও মান' },
    routingCondition: R.usesChemicals
  },
  {
    id: 'CH-12', domain: 'D4', weightPriority: 'High',
    text: {
      en: 'Do you keep fuel, LPG, diesel, petrol, or gas cylinders safely to reduce fire, leak, and pollution risk?',
      bn: 'আগুন, লিকেজ এবং দূষণের ঝুঁকি কমাতে আপনি কি জ্বালানি, LPG, ডিজেল, পেট্রোল বা গ্যাস সিলিন্ডার নিরাপদে রাখেন?'
    },
    evidenceExamples: {
      en: 'Storage area, cylinder condition',
      bn: 'সংরক্ষণ এলাকা, সিলিন্ডারের অবস্থা'
    },
    financeLink: { en: 'Safety/finance readiness', bn: 'নিরাপত্তা/অর্থায়ন প্রস্তুতি' },
    routingCondition: (a) => R.storesFuelOnSite(a) || R.usesLiquidFuel(a)
  },
];
