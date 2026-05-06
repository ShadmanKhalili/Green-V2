import { MainQuestion } from '../../types';
import * as R from './routingHelpers';

// =============================================================================
// P. Green Management, Records, Finance and Certification Readiness (MG-01..MG-14)
// =============================================================================
export const MANAGEMENT_QUESTIONS: MainQuestion[] = [
  {
    id: 'MG-01', domain: 'D7', weightPriority: 'High',
    text: {
      en: 'Do you keep basic records that can show improvement over time, such as bills, receipts, production records, or waste sales?',
      bn: 'আপনি কি সময়ের সাথে উন্নতি দেখাতে পারে এমন প্রাথমিক রেকর্ড রাখেন, যেমন বিল, রশিদ, উৎপাদন রেকর্ড, বা বর্জ্য বিক্রির হিসাব?'
    },
    evidenceExamples: { en: 'Records, notebooks, photos', bn: 'রেকর্ড, নোটবুক, ছবি' },
    financeLink: { en: 'Finance/certification readiness', bn: 'অর্থায়ন/সার্টিফিকেশন প্রস্তুতি' },
    routingCondition: R.askAll
  },
  {
    id: 'MG-02', domain: 'D7', weightPriority: 'Medium',
    text: {
      en: 'Do you compare current cost or waste with previous months to see if improvements are working?',
      bn: 'উন্নতি কাজ করছে কিনা তা দেখার জন্য আপনি কি বর্তমান খরচ বা বর্জ্য আগের মাসগুলোর সাথে তুলনা করেন?'
    },
    evidenceExamples: { en: 'Bill comparison, notebook', bn: 'বিল তুলনা, নোটবুক' },
    financeLink: { en: 'ISO 14001 readiness', bn: 'ISO 14001 প্রস্তুতি' },
    routingCondition: R.hasRecords
  },
  {
    id: 'MG-03', domain: 'D7', weightPriority: 'Medium',
    text: {
      en: 'Do you have photos or simple proof of green practices, such as solar, composting, recycling, efficient equipment, safe storage, or clean drainage?',
      bn: 'আপনার কি green অনুশীলনের ছবি বা সহজ প্রমাণ আছে, যেমন solar, composting, recycle, দক্ষ সরঞ্জাম, নিরাপদ সংরক্ষণ, বা পরিষ্কার ড্রেনেজ?'
    },
    evidenceExamples: { en: 'Photos', bn: 'ছবি' },
    financeLink: { en: 'Evidence confidence', bn: 'প্রমাণের নির্ভরযোগ্যতা' },
    routingCondition: R.askAll
  },
  {
    id: 'MG-04', domain: 'D8', weightPriority: 'Pathway',
    text: {
      en: 'Do you know which green investment would save the most money or reduce the biggest environmental risk?',
      bn: 'আপনি কি জানেন কোন green বিনিয়োগ সবচেয়ে বেশি অর্থ সাশ্রয় করবে বা সবচেয়ে বড় পরিবেশগত ঝুঁকি কমাবে?'
    },
    evidenceExamples: { en: 'Stated priority', bn: 'উল্লেখিত অগ্রাধিকার' },
    financeLink: { en: 'Green finance pipeline', bn: 'green অর্থায়ন pipeline' },
    routingCondition: R.hasFinanceInterest
  },
  {
    id: 'MG-05', domain: 'D8', weightPriority: 'Pathway',
    text: {
      en: 'Do you have an estimated cost for the green improvement you want to make?',
      bn: 'আপনি যে green উন্নতি করতে চান তার একটি আনুমানিক খরচ কি আপনার আছে?'
    },
    evidenceExamples: { en: 'Quotation, market price', bn: 'কোটেশন, বাজার মূল্য' },
    financeLink: { en: 'Loan/grant readiness', bn: 'ঋণ/অনুদান প্রস্তুতি' },
    routingCondition: R.hasFinanceInterest
  },
  {
    id: 'MG-06', domain: 'D8', weightPriority: 'Pathway',
    text: {
      en: 'Can you show how a green improvement may reduce electricity, fuel, water, waste, raw material, or compliance costs?',
      bn: 'আপনি কি দেখাতে পারেন একটি green উন্নতি কিভাবে বিদ্যুৎ, জ্বালানি, পানি, বর্জ্য, কাঁচামাল বা compliance খরচ কমাতে পারে?'
    },
    evidenceExamples: { en: 'Simple calculation, bill comparison', bn: 'সহজ হিসাব, বিল তুলনা' },
    financeLink: { en: 'Bankability', bn: 'ব্যাংকযোগ্যতা' },
    routingCondition: R.hasFinanceInterest
  },
  {
    id: 'MG-07', domain: 'D8', weightPriority: 'Pathway',
    text: {
      en: 'Do you have trade licence, registration, cooperative/group document, farm registration, DBID/UBID, or other identity proof for business finance?',
      bn: 'ব্যবসায়িক অর্থায়নের জন্য আপনার কি trade licence, registration, সমবায়/দলগত ডকুমেন্ট, farm registration, DBID/UBID, বা অন্য কোনো পরিচয় প্রমাণ আছে?'
    },
    evidenceExamples: { en: 'Documents', bn: 'ডকুমেন্ট' },
    financeLink: { en: 'Finance readiness', bn: 'অর্থায়ন প্রস্তুতি' },
    routingCondition: R.hasFinanceInterest
  },
  {
    id: 'MG-08', domain: 'D8', weightPriority: 'Pathway',
    text: {
      en: 'Do you have a bank account, mobile financial record, or transaction history linked to the business?',
      bn: 'ব্যবসার সাথে সংযুক্ত আপনার কি ব্যাংক অ্যাকাউন্ট, mobile financial record, বা লেনদেনের ইতিহাস আছে?'
    },
    evidenceExamples: { en: 'Bank/mobile records', bn: 'ব্যাংক/mobile রেকর্ড' },
    financeLink: { en: 'Finance readiness', bn: 'অর্থায়ন প্রস্তুতি' },
    routingCondition: R.hasFinanceInterest
  },
  {
    id: 'MG-09', domain: 'D7', weightPriority: 'Medium',
    text: {
      en: 'Are you willing to collect simple monthly records after this assessment, such as bills, fuel, waste, water, and production?',
      bn: 'এই assessment-এর পরে আপনি কি সহজ মাসিক রেকর্ড সংগ্রহ করতে ইচ্ছুক, যেমন বিল, জ্বালানি, বর্জ্য, পানি, এবং উৎপাদন?'
    },
    evidenceExamples: { en: 'Commitment', bn: 'অঙ্গীকার' },
    financeLink: { en: 'Improvement plan', bn: 'উন্নতি পরিকল্পনা' },
    routingCondition: R.askAll
  },
  {
    id: 'MG-10', domain: 'D8', weightPriority: 'Pathway',
    text: {
      en: 'Are you interested in a green certificate, green business recognition, buyer compliance, ISO 14001-style readiness, organic/safe agriculture readiness, or green building readiness?',
      bn: 'আপনি কি green সার্টিফিকেট, green ব্যবসার স্বীকৃতি, buyer compliance, ISO 14001-style প্রস্তুতি, organic/নিরাপদ কৃষি প্রস্তুতি, বা green building প্রস্তুতিতে আগ্রহী?'
    },
    evidenceExamples: { en: 'Stated interest', bn: 'উল্লেখিত আগ্রহ' },
    financeLink: { en: 'Certification pathway', bn: 'সার্টিফিকেশন pathway' },
    routingCondition: R.hasCertificationInterest
  },
  {
    id: 'MG-11', domain: 'D8', weightPriority: 'Pathway',
    text: {
      en: 'Do you understand which documents or evidence may be needed for your preferred certification or recognition pathway?',
      bn: 'আপনি কি বুঝতে পারেন আপনার পছন্দের সার্টিফিকেশন বা স্বীকৃতির pathway-এর জন্য কোন ডকুমেন্ট বা প্রমাণ লাগতে পারে?'
    },
    evidenceExamples: { en: 'Checklist, documents', bn: 'checklist, ডকুমেন্ট' },
    financeLink: { en: 'Certification readiness', bn: 'সার্টিফিকেশন প্রস্তুতি' },
    routingCondition: R.hasCertificationInterest
  },
  {
    id: 'MG-12', domain: 'D8', weightPriority: 'Pathway',
    text: {
      en: 'Are you willing to make step-by-step improvements over 3–12 months to improve your green score?',
      bn: 'আপনার green score উন্নত করতে আপনি কি ৩-১২ মাসের মধ্যে ধাপে ধাপে উন্নতি করতে ইচ্ছুক?'
    },
    evidenceExamples: { en: 'Stated commitment', bn: 'উল্লেখিত অঙ্গীকার' },
    financeLink: { en: 'AI recommendation planning', bn: 'AI সুপারিশ পরিকল্পনা' },
    routingCondition: R.askAll
  },
  {
    id: 'MG-13', domain: 'D8', weightPriority: 'Pathway',
    text: {
      en: 'Would you prefer low-cost/no-cost actions first before larger investments?',
      bn: 'বড় বিনিয়োগের আগে আপনি কি প্রথমে কম খরচের/বিনা খরচের পদক্ষেপগুলো পছন্দ করবেন?'
    },
    evidenceExamples: { en: 'Stated preference', bn: 'উল্লেখিত পছন্দ' },
    financeLink: { en: 'Recommendation personalization', bn: 'সুপারিশ ব্যক্তিগতকরণ' },
    routingCondition: R.askAll
  },
  {
    id: 'MG-14', domain: 'D7', weightPriority: 'Medium',
    text: {
      en: 'Are you willing to share evidence such as photos, bills, receipts, or records to improve the accuracy of your green score?',
      bn: 'আপনার green score-এর নির্ভুলতা উন্নত করতে আপনি কি ছবি, বিল, রশিদ, বা রেকর্ডের মতো প্রমাণ শেয়ার করতে ইচ্ছুক?'
    },
    evidenceExamples: { en: 'Consent', bn: 'সম্মতি' },
    financeLink: { en: 'Evidence confidence', bn: 'প্রমাণের নির্ভরযোগ্যতা' },
    routingCondition: R.askAll
  },
];
