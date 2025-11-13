

import { Pillar, ScoreInterpretation, Resource, ProbingQuestion, Indicator, LoadingTip } from './types';

export const PILLARS: Omit<Pillar, 'indicators' | 'notes'>[] = [
  { id: 1, title: { en: 'Energy & Resource Efficiency', bn: 'শক্তি ও সম্পদ দক্ষতা' }, points: 30 },
  { id: 2, title: { en: 'Environmental Management & Climate Resilience', bn: 'পরিবেশগত ব্যবস্থাপনা ও জলবায়ু সহনশীলতা' }, points: 25 },
  { id: 3, title: { en: 'Green Finance & Investment', bn: 'সবুজ অর্থায়ন ও বিনিয়োগ' }, points: 20 },
  { id: 4, title: { en: 'Social Sustainability', bn: 'সামাজিক টেকসই' }, points: 15 },
  { id: 5, title: { en: 'Digital & Innovation', bn: 'ডিজিটাল ও উদ্ভাবন' }, points: 10 },
];

export const PROBING_QUESTIONS: ProbingQuestion[] = [
    { id: 'PQ1', type: 'select', text: { en: 'What is your primary business activity?', bn: 'আপনার প্রধান ব্যবসায়িক কার্যকলাপ কি?' }, options: [
        { value: 'default', text: { en: 'Select an option...', bn: 'একটি বিকল্প নির্বাচন করুন...' } },
        { value: 'Manufacturing (Factory-based)', text: { en: 'Manufacturing (Factory-based)', bn: 'উৎপাদন (কারখানা-ভিত্তিক)' } },
        { value: 'Manufacturing (Workshop-based)', text: { en: 'Manufacturing (Workshop-based)', bn: 'উৎপাদন (ورشਾপ-ভিত্তিক)' } },
        { value: 'Trading/Wholesale', text: { en: 'Trading/Wholesale', bn: 'ট্রেডিং/পাইকারি' } },
        { value: 'Retail', text: { en: 'Retail', bn: 'খুচরা' } },
        { value: 'Service (Office-based)', text: { en: 'Service (Office-based)', bn: 'পরিষেবা (অফিস-ভিত্তিক)' } },
        { value: 'Service (Field-based)', text: { en: 'Service (Field-based)', bn: 'পরিষেবা (ক্ষেত্র-ভিত্তিক)' } },
        { value: 'Agriculture/Processing', text: { en: 'Agriculture/Processing', bn: 'কৃষি/প্রক্রিয়াকরণ' } },
    ]},
    { id: 'PQ2', type: 'select', text: { en: 'Where is your business located?', bn: 'আপনার ব্যবসা কোথায় অবস্থিত?' }, options: [
        { value: 'default', text: { en: 'Select an option...', bn: 'একটি বিকল্প নির্বাচন করুন...' } },
        { value: 'Dhaka City', text: { en: 'Dhaka City', bn: 'ঢাকা শহর' } },
        { value: 'Chattogram City', text: { en: 'Chattogram City', bn: 'চট্টগ্রাম শহর' } },
        { value: 'Other City Corporation', text: { en: 'Other City Corporation', bn: 'অন্যান্য সিটি কর্পোরেশন' } },
        { value: 'District Town', text: { en: 'District Town', bn: 'জেলা শহর' } },
        { value: 'Rural Area', text: { en: 'Rural Area', bn: 'গ্রামাঞ্চল' } },
    ]},
    { id: 'PQ3', type: 'select', text: { en: 'Who are your main customers?', bn: 'আপনার প্রধান গ্রাহক কারা?' }, options: [
        { value: 'default', text: { en: 'Select an option...', bn: 'একটি বিকল্প নির্বাচন করুন...' } },
        { value: '100% Domestic', text: { en: '100% Domestic', bn: '১০০% দেশীয়' } },
        { value: 'Mostly Domestic (>70%)', text: { en: 'Mostly Domestic (>70%)', bn: 'বেশিরভাগই দেশীয় (>۷০%)' } },
        { value: 'Mixed (30-70% Export)', text: { en: 'Mixed (30-70% Export)', bn: 'মিশ্র (৩০-۷০% রপ্তানি)' } },
        { value: 'Mostly Export (>70%)', text: { en: 'Mostly Export (>70%)', bn: 'বেশিরভাগই রপ্তানি (>۷০%)' } },
        { value: '100% Export', text: { en: '100% Export', bn: '১০০% রপ্তানি' } },
    ]},
    { id: 'PQ4', type: 'select', text: { en: 'What is your annual turnover?', bn: 'আপনার বার্ষিক টার্নওভার কত?' }, options: [
        { value: 'default', text: { en: 'Select an option...', bn: 'একটি বিকল্প নির্বাচন করুন...' } },
        { value: '< Tk 10 lakh', text: { en: '< Tk 10 lakh', bn: '< ১০ লক্ষ টাকা' } },
        { value: 'Tk 10-50 lakh', text: { en: 'Tk 10-50 lakh', bn: '১০-৫০ লক্ষ টাকা' } },
        { value: 'Tk 50 lakh - 2 crore', text: { en: 'Tk 50 lakh - 2 crore', bn: '৫০ লক্ষ - ২ কোটি টাকা' } },
        { value: 'Tk 2-5 crore', text: { en: 'Tk 2-5 crore', bn: '২-৫ কোটি টাকা' } },
        { value: '> Tk 5 crore', text: { en: '> Tk 5 crore', bn: '> ৫ কোটি টাকা' } },
    ]},
    { id: 'PQ5', type: 'checkbox', text: { en: 'Which resources are most critical to your operations? (Select all that apply)', bn: 'আপনার কার্যক্রমের জন্য কোন সম্পদগুলি সবচেয়ে গুরুত্বপূর্ণ? (প্রযোজ্য সব নির্বাচন করুন)' }, options: [
        { value: 'Electricity', text: { en: 'Electricity', bn: 'বিদ্যুৎ' } },
        { value: 'Natural Gas', text: { en: 'Natural Gas', bn: 'প্রাকৃতিক গ্যাস' } },
        { value: 'Diesel/Fuel', text: { en: 'Diesel/Fuel', bn: 'ডিজেল/জ্বালানি' } },
        { value: 'Water (Municipal)', text: { en: 'Water (Municipal)', bn: 'জল (পৌরসভা)' } },
        { value: 'Groundwater', text: { en: 'Groundwater', bn: 'ভূগর্ভস্থ জল' } },
        { value: 'Chemicals/Raw Materials', text: { en: 'Chemicals/Raw Materials', bn: 'রাসায়নিক/কাঁচামাল' } },
        { value: 'Packaging Materials', text: { en: 'Packaging Materials', bn: 'প্যাকেজিং সামগ্রী' } },
    ]},
    { id: 'PQ6', type: 'checkbox', text: { en: 'Have you heard of or interacted with any of these? (Select all that apply)', bn: 'আপনি কি এগুলির কোনোটির কথা শুনেছেন বা যোগাযোগ করেছেন? (প্রযোজ্য সব নির্বাচন করুন)' }, options: [
        { value: 'Bangladesh Bank Green Financing', text: { en: 'Bangladesh Bank Green Financing', bn: 'বাংলাদেশ ব্যাংক গ্রিন ফাইন্যান্সিং' } },
        { value: 'SME Foundation', text: { en: 'SME Foundation', bn: 'এসএমই ফাউন্ডেশন' } },
        { value: 'Department of Environment (DoE)', text: { en: 'Department of Environment (DoE)', bn: 'পরিবেশ অধিদপ্তর (DoE)' } },
        { value: 'BGMEA Sustainability Program', text: { en: 'BGMEA Sustainability Program', bn: 'বিজিএমইএ সাসটেইনেবিলিটি প্রোগ্রাম' } },
        { value: 'ISO 14001', text: { en: 'ISO 14001', bn: 'আইএসও ১৪০০১' } },
        { value: 'None of the above', text: { en: 'None of the above', bn: 'উপরের কোনটিই নয়' } },
    ]},
    { id: 'PQ7', type: 'select', text: { en: 'What is your biggest sustainability challenge?', bn: 'আপনার সবচেয়ে বড় টেকসই চ্যালেঞ্জ কি?' }, options: [
        { value: 'default', text: { en: 'Select an option...', bn: 'একটি বিকল্প নির্বাচন করুন...' } },
        { value: 'High energy costs', text: { en: 'High energy costs', bn: 'উচ্চ শক্তি খরচ' } },
        { value: 'Waste disposal', text: { en: 'Waste disposal', bn: 'বর্জ্য নিষ্কাশন' } },
        { value: 'Water scarcity', text: { en: 'Water scarcity', bn: 'জল সংকট' } },
        { value: 'Chemical management', text: { en: 'Chemical management', bn: 'রাসায়নিক ব্যবস্থাপনা' } },
        { value: 'Meeting buyer requirements', text: { en: 'Meeting buyer requirements', bn: 'ক্রেতার প্রয়োজনীয়তা পূরণ' } },
        { value: 'Access to green finance', text: { en: 'Access to green finance', bn: 'সবুজ অর্থায়নে প্রবেশাধিকার' } },
        { value: 'Lack of knowledge', text: { en: 'Lack of knowledge', bn: 'জ্ঞানের অভাব' } },
        { value: 'Not a priority currently', text: { en: 'Not a priority currently', bn: 'বর্তমানে অগ্রাধিকার নয়' } },
    ]}
];


export const QUESTION_BANK: Indicator[] = [
    // PILLAR 1: Energy & Resource Efficiency
    {
        id: '1.1', pillarId: 1, tags: ['MFG', 'SRV', 'ALL', 'ELEC'], maxScore: 5,
        text: { en: 'How reliable is your grid electricity supply?', bn: 'আপনার গ্রিড বিদ্যুৎ সরবরাহ কতটা নির্ভরযোগ্য?' },
        scoringGuide: [
            { score: 0, description: { en: 'Daily outages 4+ hrs', bn: 'দৈনিক ৪+ ঘন্টা বিভ্রাট' } },
            { score: 2, description: { en: 'Weekly outages', bn: 'সাপ্তাহিক বিভ্রাট' } },
            { score: 4, description: { en: 'Monthly outages', bn: 'মাসিক বিভ্রাট' } },
            { score: 5, description: { en: 'Stable supply', bn: 'স্থিতিশীল সরবরাহ' } },
        ]
    },
    {
        id: '1.2', pillarId: 1, tags: ['MFG', 'SRV', 'AGR', 'FUEL'], maxScore: 5,
        text: { en: 'How many hours per month do you use diesel generators?', bn: 'আপনি প্রতি মাসে কত ঘন্টা ডিজেল জেনারেটর ব্যবহার করেন?' },
        scoringGuide: [
            { score: 0, description: { en: '>100 hrs', bn: '>১০০ ঘন্টা' } },
            { score: 2, description: { en: '50-100 hrs', bn: '৫০-১০০ ঘন্টা' } },
            { score: 4, description: { en: '<20 hrs', bn: '<২০ ঘন্টা' } },
            { score: 5, description: { en: 'No diesel generator', bn: 'কোনো ডিজেল জেনারেটর নেই' } },
        ]
    },
    {
        id: '1.3', pillarId: 1, tags: ['ALL', 'ELEC'], maxScore: 5,
        text: { en: 'Do you maintain a power factor greater than 0.95?', bn: 'আপনি কি ০.৯৫ এর বেশি পাওয়ার ফ্যাক্টর বজায় রাখেন?' },
        scoringGuide: [
            { score: 0, description: { en: 'No idea what power factor is', bn: 'পাওয়ার ফ্যাক্টর কী তা জানি না' } },
            { score: 2, description: { en: 'Have a capacitor bank, but don\'t check', bn: 'ক্যাপাসিটর ব্যাংক আছে, কিন্তু পরীক্ষা করি না' } },
            { score: 4, description: { en: 'Regularly check and maintain', bn: 'নিয়মিত পরীক্ষা ও রক্ষণাবেক্ষণ করি' } },
            { score: 5, description: { en: 'Automated power factor correction system', bn: 'স্বয়ংক্রিয় পাওয়ার ফ্যাক্টর সংশোধন সিস্টেম' } },
        ]
    },
    {
        id: '1.4', pillarId: 1, tags: ['ALL', 'ELEC'], maxScore: 5,
        text: { en: 'Have you assessed your rooftop solar potential?', bn: ' আপনি কি আপনার ছাদে সৌর শক্তির সম্ভাবনা মূল্যায়ন করেছেন?' },
        scoringGuide: [
            { score: 0, description: { en: 'No', bn: 'না' } },
            { score: 2, description: { en: 'Informal check', bn: 'অনানুষ্ঠানিক পরীক্ষা' } },
            { score: 4, description: { en: 'Professional assessment done', bn: 'পেশাদার মূল্যায়ন করা হয়েছে' } },
            { score: 5, description: { en: 'Assessment done with financial model', bn: 'আর্থিক মডেল সহ মূল্যায়ন করা হয়েছে' } },
        ]
    },
     {
        id: '1.5', pillarId: 1, tags: ['MFG', 'AGR', 'WATER'], maxScore: 5,
        text: { en: 'Are all major water uses separately metered?', bn: 'সব প্রধান জল ব্যবহার কি আলাদাভাবে মিটার করা হয়?' },
        scoringGuide: [
            { score: 0, description: { en: 'No metering', bn: 'কোনো মিটারিং নেই' } },
            { score: 2, description: { en: 'Only main line metered', bn: 'শুধুমাত্র প্রধান লাইন মিটার করা' } },
            { score: 4, description: { en: 'Major equipment is metered', bn: 'প্রধান সরঞ্জাম মিটার করা' } },
            { score: 5, description: { en: 'All consumption points metered', bn: 'সমস্ত ব্যবহারের পয়েন্ট মিটার করা' } },
        ]
    },
    {
        id: '1.6', pillarId: 1, tags: ['MFG', 'WATER'], maxScore: 5,
        text: { en: 'What percentage of your process water is recycled?', bn: 'আপনার প্রক্রিয়া জলের কত শতাংশ পুনর্ব্যবহার করা হয়?' },
        scoringGuide: [
            { score: 0, description: { en: '0%', bn: '০%' } },
            { score: 2, description: { en: '<10%', bn: '<১০%' } },
            { score: 4, description: { en: '10-30%', bn: '১০-৩০%' } },
            { score: 5, description: { en: '>30%', bn: '>৩০%' } },
        ]
    },
    {
        id: '1.7', pillarId: 1, tags: ['ALL', 'PACKAGING'], maxScore: 5,
        text: { en: 'What percentage of your packaging is recyclable or biodegradable?', bn: 'আপনার প্যাকেজিংয়ের কত শতাংশ পুনর্ব্যবহারযোগ্য বা বায়োডিগ্রেডেবল?' },
        scoringGuide: [
            { score: 0, description: { en: '0%', bn: '০%' } },
            { score: 2, description: { en: '<25%', bn: '<২৫%' } },
            { score: 4, description: { en: '50-75%', bn: '৫০-৭৫%' } },
            { score: 5, description: { en: '>75%', bn: '>৭৫%' } },
        ]
    },
    {
        id: '1.8', pillarId: 1, tags: ['MICRO', 'SRV', 'RUR'], maxScore: 5,
        text: { en: 'Is business electricity on a separate meter from household?', bn: 'ব্যবসা এবং বাড়ির বিদ্যুৎ মিটার কি আলাদা?' },
        scoringGuide: [
            { score: 0, description: { en: 'No separation', bn: 'আলাদা নয়' } },
            { score: 2, description: { en: 'Estimated split', bn: 'আনুমানিক ভাগ করা' } },
            { score: 4, description: { en: 'Sub-meter installed', bn: 'সাব-মিটার ইনস্টল করা' } },
            { score: 5, description: { en: 'Separate connection', bn: 'আলাদা সংযোগ' } },
        ]
    },
    {
        id: '1.9', pillarId: 1, tags: ['MICRO', 'AGR', 'RUR'], maxScore: 5,
        text: { en: 'For food processing, do you use improved cookstoves?', bn: 'খাদ্য প্রক্রিয়াকরণের জন্য, আপনি কি উন্নত চুলা ব্যবহার করেন?' },
        scoringGuide: [
            { score: 0, description: { en: 'Traditional biomass', bn: 'ঐতিহ্যবাহী বায়োমাস' } },
            { score: 2, description: { en: 'Mixed use', bn: 'মিশ্র ব্যবহার' } },
            { score: 4, description: { en: 'Improved stoves', bn: 'উন্নত চুলা' } },
            { score: 5, description: { en: 'LPG/electric', bn: 'এলপিজি/বৈদ্যুতিক' } },
        ]
    },
    {
        id: '1.10', pillarId: 1, tags: ['MICRO', 'MFG', 'RUR'], maxScore: 5,
        text: { en: 'Do you use solar for business operations?', bn: 'আপনি কি ব্যবসায়িক কাজের জন্য সৌর শক্তি ব্যবহার করেন?' },
        scoringGuide: [
            { score: 0, description: { en: 'No', bn: 'না' } },
            { score: 2, description: { en: 'Household solar only', bn: 'শুধুমাত্র বাড়ির সৌর শক্তি' } },
            { score: 4, description: { en: 'Separate business system', bn: 'আলাদা ব্যবসায়িক সিস্টেম' } },
            { score: 5, description: { en: 'System >100W capacity', bn: '>১০০W ক্ষমতার সিস্টেম' } },
        ]
    },
    {
        id: '1.11', pillarId: 1, tags: ['AGR', 'RUR'], maxScore: 5,
        text: { en: 'Is your tube well fitted with water-saving devices?', bn: 'আপনার টিউবওয়েল কি জল-সাশ্রয়ী ডিভাইস দিয়ে লাগানো?' },
        scoringGuide: [
            { score: 0, description: { en: 'No', bn: 'না' } },
            { score: 2, description: { en: 'Basic pump', bn: 'সাধারণ পাম্প' } },
            { score: 4, description: { en: 'Energy-efficient pump', bn: 'শক্তি-সাশ্রয়ী পাম্প' } },
            { score: 5, description: { en: 'With water meter', bn: 'জল মিটার সহ' } },
        ]
    },
    {
        id: '1.12', pillarId: 1, tags: ['AGR', 'RUR'], maxScore: 5,
        text: { en: 'Do you use biogas from agricultural waste?', bn: 'আপনি কি কৃষি বর্জ্য থেকে বায়োগ্যাস ব্যবহার করেন?' },
        scoringGuide: [
            { score: 0, description: { en: 'No', bn: 'না' } },
            { score: 2, description: { en: 'Traditional digester', bn: 'ঐতিহ্যবাহী ডাইজেস্টার' } },
            { score: 4, description: { en: 'Fixed dome digester', bn: 'ফিক্সড ডোম ডাইজেস্টার' } },
            { score: 5, description: { en: 'With slurry reuse', bn: 'স্লারি পুনঃব্যবহার সহ' } },
        ]
    },
    {
        id: '1.13', pillarId: 1, tags: ['AGR', 'RUR'], maxScore: 5,
        text: { en: 'How is crop residue handled?', bn: 'ফসলের অবশিষ্টাংশ কীভাবে পরিচালনা করা হয়?' },
        scoringGuide: [
            { score: 0, description: { en: 'Burned in field', bn: 'জমিতে পোড়ানো হয়' } },
            { score: 2, description: { en: 'Some composting', bn: 'কিছুটা কম্পোস্ট করা হয়' } },
            { score: 4, description: { en: 'Most is composted', bn: 'বেশিরভাগই কম্পোস্ট করা হয়' } },
            { score: 5, description: { en: 'All sold/utilized', bn: 'সব বিক্রি/ব্যবহার করা হয়' } },
        ]
    },
    {
        id: '1.14', pillarId: 1, tags: ['MICRO', 'TRD'], maxScore: 5,
        text: { en: 'What percentage of packaging is reused?', bn: 'প্যাকেজিংয়ের কত শতাংশ পুনরায় ব্যবহার করা হয়?' },
        scoringGuide: [
            { score: 0, description: { en: '0%', bn: '০%' } },
            { score: 2, description: { en: '<25%', bn: '<২৫%' } },
            { score: 4, description: { en: '50-75%', bn: '৫০-৭৫%' } },
            { score: 5, description: { en: '>75%', bn: '>৭৫%' } },
        ]
    },
    {
        id: '1.15', pillarId: 1, tags: ['MICRO', 'SRV'], maxScore: 5,
        text: { en: 'Do you separate waste for sale to collectors (feriwala)?', bn: 'আপনি কি সংগ্রাহকদের (ফেরিওয়ালা) কাছে বিক্রির জন্য বর্জ্য আলাদা করেন?' },
        scoringGuide: [
            { score: 0, description: { en: 'No', bn: 'না' } },
            { score: 2, description: { en: 'Sometimes', bn: 'মাঝে মাঝে' } },
            { score: 4, description: { en: 'Always', bn: 'সবসময়' } },
            { score: 5, description: { en: 'Always, sorted by type', bn: 'সবসময়, প্রকার অনুসারে বাছাই করা' } },
        ]
    },
    {
        id: '1.16', pillarId: 1, tags: ['MICRO', 'MFG'], maxScore: 5,
        text: { en: 'Are raw materials protected from moisture/pests?', bn: 'কাঁচামাল কি আর্দ্রতা/পোকামাকড় থেকে সুরক্ষিত রাখা হয়?' },
        scoringGuide: [
            { score: 0, description: { en: 'No protection', bn: 'কোনো সুরক্ষা নেই' } },
            { score: 2, description: { en: 'Basic cover', bn: 'সাধারণ আবরণ' } },
            { score: 4, description: { en: 'Proper storage area', bn: 'সঠিক সংরক্ষণ এলাকা' } },
            { score: 5, description: { en: 'Proper storage with inventory log', bn: 'ইনভেন্টরি লগ সহ সঠিক সংরক্ষণ' } },
        ]
    },
    {
        id: '1.17', pillarId: 1, tags: ['MICRO', 'TRD', 'RUR'], maxScore: 5,
        text: { en: 'How are goods transported to the market?', bn: 'বাজারে পণ্য কীভাবে পরিবহন করা হয়?' },
        scoringGuide: [
            { score: 0, description: { en: 'Headload/personal', bn: 'মাথায়/ব্যক্তিগতভাবে' } },
            { score: 2, description: { en: 'Rickshaw van', bn: 'রিকশা ভ্যান' } },
            { score: 4, description: { en: 'CNG/auto-rickshaw', bn: 'সিএনজি/অটোরিকশা' } },
            { score: 5, description: { en: 'Consolidated/shared transport', bn: 'একত্রিত/ভাগাভাগি পরিবহন' } },
        ]
    },
    // PILLAR 2: Environmental Management
    {
        id: '2.1', pillarId: 2, tags: ['ALL'], maxScore: 5,
        text: { en: 'Who has designated responsibility for environmental matters?', bn: 'পরিবেশগত বিষয়ের জন্য কার দায়িত্ব নির্ধারিত আছে?' },
        scoringGuide: [
            { score: 0, description: { en: 'No one', bn: 'কেউ না' } },
            { score: 2, description: { en: 'Owner/Manager, informally', bn: 'মালিক/ব্যবস্থাপক, অনানুষ্ঠানিকভাবে' } },
            { score: 4, description: { en: 'A specific staff member is named', bn: 'একজন নির্দিষ্ট কর্মী মনোনীত' } },
            { score: 5, description: { en: 'A dedicated person/team with a budget', bn: 'বাজেটসহ একজন নিবেদিত ব্যক্তি/দল' } },
        ]
    },
    {
        id: '2.2', pillarId: 2, tags: ['MFG', 'EXP', 'ADVANCED'], maxScore: 5,
        text: { en: 'Do you have an Environmental Management System (e.g., ISO 14001)?', bn: 'আপনার কি পরিবেশ ব্যবস্থাপনা সিস্টেম আছে (যেমন, আইএসও ১৪০০১)?' },
        scoringGuide: [
            { score: 0, description: { en: 'No', bn: 'না' } },
            { score: 2, description: { en: 'Aware of it, but not implemented', bn: 'এ সম্পর্কে সচেতন, কিন্তু বাস্তবায়িত নয়' } },
            { score: 4, description: { en: 'System in progress of implementation', bn: 'সিস্টেম বাস্তবায়নের প্রক্রিয়ায় আছে' } },
            { score: 5, description: { en: 'Certified system in place', bn: 'প্রত্যয়িত সিস্টেম আছে' } },
        ]
    },
     {
        id: '2.3', pillarId: 2, tags: ['MFG', 'FUEL'], maxScore: 5,
        text: { en: 'Are your stack emissions monitored regularly?', bn: 'আপনার স্ট্যাক নির্গমন কি নিয়মিত পর্যবেক্ষণ করা হয়?' },
        scoringGuide: [
            { score: 0, description: { en: 'Never', bn: 'কখনো না' } },
            { score: 2, description: { en: 'Only when required by DoE', bn: 'শুধুমাত্র DoE দ্বারা প্রয়োজন হলে' } },
            { score: 4, description: { en: 'Quarterly monitoring', bn: 'ত্রৈমাসিক পর্যবেক্ষণ' } },
            { score: 5, description: { en: 'Real-time or monthly monitoring', bn: 'বাস্তব-সময় বা মাসিক পর্যবেক্ষণ' } },
        ]
    },
    {
        id: '2.4', pillarId: 2, tags: ['MFG', 'WATER'], maxScore: 5,
        text: { en: 'Do you have an operational Effluent Treatment Plant (ETP)?', bn: 'আপনার কি একটি কার্যকর বর্জ্য জল শোধনাগার (ETP) আছে?' },
        scoringGuide: [
            { score: 0, description: { en: 'No ETP required or in place', bn: 'ETP প্রয়োজন নেই বা নেই' } },
            { score: 2, description: { en: 'ETP exists but is non-functional', bn: 'ETP আছে কিন্তু অকার্যকর' } },
            { score: 4, description: { en: 'ETP is functional and operational', bn: 'ETP কার্যকরী এবং চালু আছে' } },
            { score: 5, description: { en: 'ETP is optimized and regularly monitored', bn: 'ETP অপ্টিমাইজড এবং নিয়মিত পর্যবেক্ষণ করা হয়' } },
        ]
    },
    {
        id: '2.5', pillarId: 2, tags: ['MFG', 'CHEM'], maxScore: 5,
        text: { en: 'Are chemicals stored according to safety guidelines (e.g., segregation)?', bn: 'রাসায়নিক কি নিরাপত্তা নির্দেশিকা অনুযায়ী সংরক্ষণ করা হয় (যেমন, পৃথকীকরণ)?' },
        scoringGuide: [
            { score: 0, description: { en: 'No specific storage practices', bn: 'কোনো নির্দিষ্ট সংরক্ষণ পদ্ধতি নেই' } },
            { score: 2, description: { en: 'Basic organized storage', bn: 'প্রাথমিক সংগঠিত সংরক্ষণ' } },
            { score: 4, description: { en: 'Properly segregated storage', bn: 'সঠিকভাবে পৃথক করা সংরক্ষণ' } },
            { score: 5, description: { en: 'Segregated with secondary containment', bn: 'গৌণ ধারণপাত্র সহ পৃথক করা' } },
        ]
    },
    {
        id: '2.6', pillarId: 2, tags: ['ALL', 'RUR', 'CLIMATE'], maxScore: 5,
        text: { en: 'Have you assessed your flood risk?', bn: 'আপনি কি আপনার বন্যার ঝুঁকি মূল্যায়ন করেছেন?' },
        scoringGuide: [
            { score: 0, description: { en: 'No', bn: 'না' } },
            { score: 2, description: { en: 'Informal knowledge', bn: 'অনানুষ্ঠানিক জ্ঞান' } },
            { score: 4, description: { en: 'Based on past major floods', bn: 'অতীতের বড় বন্যার উপর ভিত্তি করে' } },
            { score: 5, description: { en: 'Formal assessment / mapping', bn: 'আনুষ্ঠানিক মূল্যায়ন / ম্যাপিং' } },
        ]
    },
    {
        id: '2.7', pillarId: 2, tags: ['ALL', 'RUR', 'CLIMATE'], maxScore: 5,
        text: { en: 'Do you have a flood preparedness plan?', bn: 'আপনার কি বন্যার জন্য প্রস্তুতি পরিকল্পনা আছে?' },
        scoringGuide: [
            { score: 0, description: { en: 'No', bn: 'না' } },
            { score: 2, description: { en: 'Verbal plan', bn: 'মৌখিক পরিকল্পনা' } },
            { score: 4, description: { en: 'Written plan', bn: 'লিখিত পরিকল্পনা' } },
            { score: 5, description: { en: 'Plan is practiced with community', bn: 'পরিকল্পনাটি সম্প্রদায়ের সাথে অনুশীলন করা হয়' } },
        ]
    },
    {
        id: '2.8', pillarId: 2, tags: ['ALL', 'RUR', 'CLIMATE'], maxScore: 5,
        text: { en: 'Are critical assets/inventory elevated above past flood levels?', bn: 'গুরুত্বপূর্ণ সম্পদ/ইনভেন্টরি কি অতীতের বন্যার স্তরের উপরে উঁচু করা আছে?' },
        scoringGuide: [
            { score: 0, description: { en: 'No', bn: 'না' } },
            { score: 2, description: { en: 'Some assets are raised', bn: 'কিছু সম্পদ উঁচু করা' } },
            { score: 4, description: { en: 'Most critical assets are raised', bn: 'বেশিরভাগ গুরুত্বপূর্ণ সম্পদ উঁচু করা' } },
            { score: 5, description: { en: 'All assets raised + new construction is elevated', bn: 'সমস্ত সম্পদ উঁচু করা + নতুন নির্মাণ উঁচু' } },
        ]
    },
    {
        id: '2.9', pillarId: 2, tags: ['ALL', 'RUR', 'CLIMATE'], maxScore: 5,
        text: { en: 'Do workers have clear access to a cyclone shelter?', bn: 'কর্মীদের কি ঘূর্ণিঝড় আশ্রয়কেন্দ্রে যাওয়ার সুস্পষ্ট সুযোগ আছে?' },
        scoringGuide: [
            { score: 0, description: { en: 'No / Not applicable', bn: 'না / প্রযোজ্য নয়' } },
            { score: 2, description: { en: 'Unsure of location', bn: 'অবস্থান সম্পর্কে অনিশ্চিত' } },
            { score: 4, description: { en: 'Shelter within 2km', bn: '২ কিমি এর মধ্যে আশ্রয়কেন্দ্র' } },
            { score: 5, description: { en: 'Designated shelter and drills practiced', bn: 'নির্ধারিত আশ্রয়কেন্দ্র এবং মহড়া অনুশীলন করা হয়' } },
        ]
    },
    {
        id: '2.10', pillarId: 2, tags: ['AGR', 'RUR', 'CLIMATE'], maxScore: 5,
        text: { en: 'Do you use climate-resistant seeds (e.g., salt-tolerant)?', bn: 'আপনি কি জলবায়ু-সহনশীল বীজ (যেমন, লবণ-সহনশীল) ব্যবহার করেন?' },
        scoringGuide: [
            { score: 0, description: { en: 'No', bn: 'না' } },
            { score: 2, description: { en: 'Heard of them', bn: 'শুনেছি' } },
            { score: 4, description: { en: 'Used for some crops', bn: 'কিছু ফসলের জন্য ব্যবহৃত' } },
            { score: 5, description: { en: 'Used for all major crops', bn: 'সব প্রধান ফসলের জন্য ব্যবহৃত' } },
        ]
    },
    {
        id: '2.11', pillarId: 2, tags: ['AGR', 'RUR', 'CLIMATE'], maxScore: 5,
        text: { en: 'Do you have water storage for the dry season?', bn: 'খরা মৌসুমের জন্য আপনার কি জল সঞ্চয়ের ব্যবস্থা আছে?' },
        scoringGuide: [
            { score: 0, description: { en: 'No', bn: 'না' } },
            { score: 2, description: { en: 'Small tank', bn: 'ছোট ট্যাংক' } },
            { score: 4, description: { en: 'Pond/reservoir', bn: 'পুকুর/জলাশয়' } },
            { score: 5, description: { en: 'Storage with drip irrigation', bn: 'ড্রিপ সেচ সহ সংরক্ষণ' } },
        ]
    },
    {
        id: '2.12', pillarId: 2, tags: ['MFG', 'RUR', 'CLIMATE'], maxScore: 5,
        text: { en: 'Is your roof rated for high cyclone winds (e.g., >200 km/h)?', bn: 'আপনার ছাদ কি উচ্চ ঘূর্ণিঝড়ের বাতাসের জন্য রেট করা (যেমন, >২০০ কিমি/ঘন্টা)?' },
        scoringGuide: [
            { score: 0, description: { en: 'No', bn: 'না' } },
            { score: 2, description: { en: 'Unknown', bn: 'অজানা' } },
            { score: 4, description: { en: 'Partially reinforced', bn: 'আংশিকভাবে শক্তিশালী' } },
            { score: 5, description: { en: 'Fully compliant/engineered', bn: 'সম্পূর্ণ অনুবর্তী/প্রকৌশলী' } },
        ]
    },
    {
        id: '2.13', pillarId: 2, tags: ['ALL', 'RUR', 'CLIMATE'], maxScore: 5,
        text: { en: 'Do you receive and use climate forecasts?', bn: 'আপনি কি জলবায়ুর পূর্বাভাস পান এবং ব্যবহার করেন?' },
        scoringGuide: [
            { score: 0, description: { en: 'No', bn: 'না' } },
            { score: 2, description: { en: 'From TV/radio', bn: 'টিভি/রেডিও থেকে' } },
            { score: 4, description: { en: 'Via mobile SMS alerts', bn: 'মোবাইল এসএমএস সতর্কতার মাধ্যমে' } },
            { score: 5, description: { en: 'Use an app and have an action plan', bn: 'অ্যাপ ব্যবহার করি এবং কর্ম পরিকল্পনা আছে' } },
        ]
    },
    {
        id: '2.14', pillarId: 2, tags: ['MICRO', 'RUR'], maxScore: 5,
        text: { en: 'How is wastewater managed?', bn: 'বর্জ্য জল কীভাবে পরিচালনা করা হয়?' },
        scoringGuide: [
            { score: 0, description: { en: 'Open drain', bn: 'খোলা ড্রেন' } },
            { score: 2, description: { en: 'Soak pit', bn: 'সোক পিট' } },
            { score: 4, description: { en: 'Septic tank', bn: 'সেপটিক ট্যাংক' } },
            { score: 5, description: { en: 'Septic tank with regular cleaning', bn: 'নিয়মিত পরিষ্কার সহ সেপটিক ট্যাংক' } },
        ]
    },
    {
        id: '2.15', pillarId: 2, tags: ['MICRO', 'ALL'], maxScore: 5,
        text: { en: 'Do you burn waste on-site?', bn: 'আপনি কি আপনার জায়গায় বর্জ্য পোড়ান?' },
        scoringGuide: [
            { score: 0, description: { en: 'Regularly', bn: 'নিয়মিত' } },
            { score: 2, description: { en: 'Rarely', bn: 'খুব কম' } },
            { score: 4, description: { en: 'Never', bn: 'কখনো না' } },
            { score: 5, description: { en: 'Educate others not to burn', bn: 'অন্যদের না পোড়াতে উৎসাহিত করি' } },
        ]
    },
    {
        id: '2.16', pillarId: 2, tags: ['MICRO', 'AGR'], maxScore: 5,
        text: { en: 'Where are pesticides stored?', bn: 'কীটনাশক কোথায় সংরক্ষণ করা হয়?' },
        scoringGuide: [
            { score: 0, description: { en: 'In home / living area', bn: 'বাড়িতে / থাকার জায়গায়' } },
            { score: 2, description: { en: 'Separate area', bn: 'আলাদা এলাকায়' } },
            { score: 4, description: { en: 'Locked cabinet', bn: 'তালাবদ্ধ ক্যাবিনেট' } },
            { score: 5, description: { en: 'Locked, away from water sources', bn: 'তালাবদ্ধ, জলের উৎস থেকে দূরে' } },
        ]
    },
    {
        id: '2.17', pillarId: 2, tags: ['MICRO', 'MFG'], maxScore: 5,
        text: { en: 'How is production dust managed?', bn: 'উৎপাদনের সময় সৃষ্ট ধুলা কীভাবে পরিচালনা করা হয়?' },
        scoringGuide: [
            { score: 0, description: { en: 'No control', bn: 'কোনো নিয়ন্ত্রণ নেই' } },
            { score: 2, description: { en: 'Water spraying', bn: 'জল ছিটানো' } },
            { score: 4, description: { en: 'Extraction fan', bn: 'নিষ্কাশন ফ্যান' } },
            { score: 5, description: { en: 'Fan with mask provision for workers', bn: 'কর্মীদের জন্য মাস্ক সরবরাহ সহ ফ্যান' } },
        ]
    },
    // PILLAR 3: Green Finance & Investment
    {
        id: '3.1', pillarId: 3, tags: ['ALL', 'AWARE'], maxScore: 5,
        text: { en: 'How aware are you of Bangladesh Bank\'s Green Financing options?', bn: 'আপনি বাংলাদেশ ব্যাংকের সবুজ অর্থায়ন বিকল্প সম্পর্কে কতটা সচেতন?' },
        scoringGuide: [
            { score: 0, description: { en: 'Not aware at all', bn: 'একদমই সচেতন নই' } },
            { score: 2, description: { en: 'Heard the name', bn: 'নাম শুনেছি' } },
            { score: 4, description: { en: 'Know some details', bn: 'কিছু বিবরণ জানি' } },
            { score: 5, description: { en: 'Know rates and specific bank products', bn: 'হার এবং নির্দিষ্ট ব্যাংক পণ্য জানি' } },
        ]
    },
    {
        id: '3.2', pillarId: 3, tags: ['ALL'], maxScore: 5,
        text: { en: 'Have you applied for any form of green financing?', bn: 'আপনি কি কোনো ধরনের সবুজ অর্থায়নের জন্য আবেদন করেছেন?' },
        scoringGuide: [
            { score: 0, description: { en: 'Never', bn: 'কখনো না' } },
            { score: 2, description: { en: 'Researched options but did not apply', bn: 'বিকল্প নিয়ে গবেষণা করেছি কিন্তু আবেদন করিনি' } },
            { score: 4, description: { en: 'Applied but was rejected or is pending', bn: 'আবেদন করেছি কিন্তু প্রত্যাখ্যাত বা বিচারাধীন' } },
            { score: 5, description: { en: 'Have successfully received a green loan', bn: 'সফলভাবে একটি সবুজ ঋণ পেয়েছি' } },
        ]
    },
    {
        id: '3.3', pillarId: 3, tags: ['ALL'], maxScore: 5,
        text: { en: 'Do you calculate the Return on Investment (ROI) for green projects?', bn: 'আপনি কি সবুজ প্রকল্পের জন্য বিনিয়োগের উপর রিটার্ন (ROI) গণনা করেন?' },
        scoringGuide: [
            { score: 0, description: { en: 'Never', bn: 'কখনো না' } },
            { score: 2, description: { en: 'Simple payback period only', bn: 'শুধুমাত্র সাধারণ পরিশোধের সময়কাল' } },
            { score: 4, description: { en: 'Detailed ROI calculation', bn: 'বিস্তারিত ROI গণনা' } },
            { score: 5, description: { en: 'ROI calculation including non-financial benefits', bn: 'অ-আর্থিক সুবিধাসহ ROI গণনা' } },
        ]
    },
     {
        id: '3.4', pillarId: 3, tags: ['ALL'], maxScore: 5,
        text: { en: 'Are your business\'s financial statements audited?', bn: 'আপনার ব্যবসার আর্থিক বিবরণী কি নিরীক্ষিত হয়?' },
        scoringGuide: [
            { score: 0, description: { en: 'No formal records', bn: 'কোনো আনুষ্ঠানিক রেকর্ড নেই' } },
            { score: 2, description: { en: 'Informal records kept', bn: 'অনানুষ্ঠানিক রেকর্ড রাখা হয়' } },
            { score: 4, description: { en: 'Internally audited statements', bn: 'অভ্যন্তরীণভাবে নিরীক্ষিত বিবরণী' } },
            { score: 5, description: { en: 'Externally audited statements', bn: 'বাহ্যিকভাবে নিরীক্ষিত বিবরণী' } },
        ]
    },
    {
        id: '3.5', pillarId: 3, tags: ['MICRO', 'RUR'], maxScore: 5,
        text: { en: 'Do you use Mobile Financial Services (bKash/Nagad) for business?', bn: 'আপনি কি ব্যবসার জন্য মোবাইল ফিনান্সিয়াল সার্ভিস (বিকাশ/নগদ) ব্যবহার করেন?' },
        scoringGuide: [
            { score: 0, description: { en: 'No', bn: 'না' } },
            { score: 2, description: { en: 'Personal account only', bn: 'শুধুমাত্র ব্যক্তিগত অ্যাকাউন্ট' } },
            { score: 4, description: { en: 'Separate business account', bn: 'আলাদা ব্যবসায়িক অ্যাকাউন্ট' } },
            { score: 5, description: { en: 'Business account with transaction records', bn: 'লেনদেনের রেকর্ড সহ ব্যবসায়িক অ্যাকাউন্ট' } },
        ]
    },
    {
        id: '3.6', pillarId: 3, tags: ['MICRO', 'RUR'], maxScore: 5,
        text: { en: 'Have you accessed NGO green microfinance?', bn: 'আপনি কি এনজিও থেকে সবুজ ক্ষুদ্রঋণ নিয়েছেন?' },
        scoringGuide: [
            { score: 0, description: { en: 'No', bn: 'না' } },
            { score: 2, description: { en: 'Aware of options', bn: 'বিকল্প সম্পর্কে সচেতন' } },
            { score: 4, description: { en: 'Applied', bn: 'আবেদন করেছি' } },
            { score: 5, description: { en: 'Received a loan', bn: 'ঋণ পেয়েছি' } },
        ]
    },
    {
        id: '3.7', pillarId: 3, tags: ['MICRO', 'ALL'], maxScore: 5,
        text: { en: 'Are you part of a business "samity" or savings group?', bn: 'আপনি কি কোনো ব্যবসায়িক "সমিতি" বা সঞ্চয় দলের অংশ?' },
        scoringGuide: [
            { score: 0, description: { en: 'No', bn: 'না' } },
            { score: 2, description: { en: 'Member', bn: 'সদস্য' } },
            { score: 4, description: { en: 'Active member (regular savings)', bn: 'সক্রিয় সদস্য (নিয়মিত সঞ্চয়)' } },
            { score: 5, description: { en: 'Office bearer / leadership role', bn: 'पदाधिकारी / নেতৃত্বের ভূমিকা' } },
        ]
    },
    {
        id: '3.8', pillarId: 3, tags: ['MICRO', 'ALL'], maxScore: 5,
        text: { en: 'Are business funds kept separate from personal funds?', bn: 'ব্যবসার তহবিল কি ব্যক্তিগত তহবিল থেকে আলাদা রাখা হয়?' },
        scoringGuide: [
            { score: 0, description: { en: 'Completely mixed', bn: 'সম্পূর্ণ মিশ্রিত' } },
            { score: 2, description: { en: 'Some separation', bn: 'কিছুটা আলাদা' } },
            { score: 4, description: { en: 'Mostly separate', bn: 'বেশিরভাগই আলাদা' } },
            { score: 5, description: { en: 'Completely separate bank accounts', bn: 'সম্পূর্ণ আলাদা ব্যাংক অ্যাকাউন্ট' } },
        ]
    },
    {
        id: '3.9', pillarId: 3, tags: ['AGR', 'RUR'], maxScore: 5,
        text: { en: 'Have you invested in productive assets (e.g., machinery) in the last 2 years?', bn: 'গত ২ বছরে আপনি কি উৎপাদনশীল সম্পদে (যেমন, যন্ত্রপাতি) বিনিয়োগ করেছেন?' },
        scoringGuide: [
            { score: 0, description: { en: 'No', bn: 'না' } },
            { score: 2, description: { en: 'Small hand tools', bn: 'ছোট হাত সরঞ্জাম' } },
            { score: 4, description: { en: 'Major equipment', bn: 'প্রধান সরঞ্জাম' } },
            { score: 5, description: { en: 'Equipment with a maintenance plan', bn: 'রক্ষণাবেক্ষণ পরিকল্পনা সহ সরঞ্জাম' } },
        ]
    },
    {
        id: '3.10', pillarId: 3, tags: ['AGR', 'RUR'], maxScore: 5,
        text: { en: 'Do you have crop or livestock insurance?', bn: 'আপনার কি ফসল বা গবাদি পশুর বীমা আছে?' },
        scoringGuide: [
            { score: 0, description: { en: 'No', bn: 'না' } },
            { score: 2, description: { en: 'Heard of it', bn: 'শুনেছি' } },
            { score: 4, description: { en: 'Basic coverage', bn: 'প্রাথমিক কভারেজ' } },
            { score: 5, description: { en: 'Comprehensive coverage', bn: 'ব্যাপক কভারেজ' } },
        ]
    },
    // PILLAR 4: Social Sustainability
    {
        id: '4.1', pillarId: 4, tags: ['ALL'], maxScore: 5,
        text: { en: 'Do all your employees have written employment contracts?', bn: 'আপনার সকল কর্মচারীর কি লিখিত চাকরির চুক্তি আছে?' },
        scoringGuide: [
            { score: 0, description: { en: 'No, none have contracts', bn: 'না, কারো চুক্তি নেই' } },
            { score: 2, description: { en: 'Some have contracts', bn: 'কিছু জনের আছে' } },
            { score: 4, description: { en: 'Most (>90%) have contracts', bn: 'বেশিরভাগ (>৯০%) এর আছে' } },
            { score: 5, description: { en: 'All employees have contracts', bn: 'সকল কর্মচারীর চুক্তি আছে' } },
        ]
    },
    {
        id: '4.2', pillarId: 4, tags: ['ALL'], maxScore: 5,
        text: { en: 'What benefits are provided to employees beyond salary?', bn: 'বেতন ছাড়াও কর্মচারীদের কী কী সুবিধা দেওয়া হয়?' },
        scoringGuide: [
            { score: 0, description: { en: 'None', bn: 'কিছুই না' } },
            { score: 2, description: { en: 'Only legally required leave/festival bonus', bn: 'শুধুমাত্র আইনত প্রয়োজনীয় ছুটি/উৎসব বোনাস' } },
            { score: 4, description: { en: 'Health insurance or provident fund', bn: 'স্বাস্থ্য বীমা বা ভবিষ্য তহবিল' } },
            { score: 5, description: { en: 'Health, provident fund, and training', bn: 'স্বাস্থ্য, ভবিষ্য তহবিল, এবং প্রশিক্ষণ' } },
        ]
    },
    {
        id: '4.3', pillarId: 4, tags: ['MFG'], maxScore: 5,
        text: { en: 'How is fire safety managed at your facility?', bn: 'আপনার প্রতিষ্ঠানে অগ্নি নিরাপত্তা কীভাবে পরিচালিত হয়?' },
        scoringGuide: [
            { score: 0, description: { en: 'No specific fire safety measures', bn: 'কোনো নির্দিষ্ট অগ্নি নিরাপত্তা ব্যবস্থা নেই' } },
            { score: 2, description: { en: 'Basic fire extinguishers available', bn: 'প্রাথমিক অগ্নি নির্বাপক যন্ত্র আছে' } },
            { score: 4, description: { en: 'Extinguishers, valid NOC, and exit signs', bn: 'নির্বাপক যন্ত্র, বৈধ NOC, এবং প্রস্থান চিহ্ন' } },
            { score: 5, description: { en: 'Full system with regular drills', bn: 'নিয়মিত মহড়াসহ পূর্ণাঙ্গ সিস্টেম' } },
        ]
    },
    {
        id: '4.4', pillarId: 4, tags: ['ALL'], maxScore: 5,
        text: { en: 'What percentage of your workforce is from the local community?', bn: 'আপনার কর্মশক্তির কত শতাংশ স্থানীয় সম্প্রদায়ের?' },
        scoringGuide: [
            { score: 0, description: { en: '<25%', bn: '<২৫%' } },
            { score: 2, description: { en: '25-50%', bn: '২৫-৫০%' } },
            { score: 4, description: { en: '50-75%', bn: '৫০-৭৫%' } },
            { score: 5, description: { en: '>75%', bn: '>৭৫%' } },
        ]
    },
    {
        id: '4.5', pillarId: 4, tags: ['MICRO', 'ALL'], maxScore: 5,
        text: { en: 'What percentage of workers are family members?', bn: 'কর্মীদের কত শতাংশ পরিবারের সদস্য?' },
        scoringGuide: [
            { score: 0, description: { en: '0%', bn: '০%' } },
            { score: 2, description: { en: '<25%', bn: '<২৫%' } },
            { score: 4, description: { en: '50-75%', bn: '৫০-৭৫%' } },
            { score: 5, description: { en: '>75%', bn: '>৭৫%' } },
        ]
    },
    {
        id: '4.6', pillarId: 4, tags: ['MICRO', 'ALL'], maxScore: 5,
        text: { en: 'How are wages paid?', bn: 'মজুরি কীভাবে প্রদান করা হয়?' },
        scoringGuide: [
            { score: 0, description: { en: 'Cash only, no records', bn: 'শুধুমাত্র নগদ, কোনো রেকর্ড নেই' } },
            { score: 2, description: { en: 'Cash with informal records', bn: 'অনানুষ্ঠানিক রেকর্ড সহ নগদ' } },
            { score: 4, description: { en: 'Regular MFS payment', bn: 'নিয়মিত MFS প্রদান' } },
            { score: 5, description: { en: 'Bank transfer with formal records', bn: 'আনুষ্ঠানিক রেকর্ড সহ ব্যাংক স্থানান্তর' } },
        ]
    },
    {
        id: '4.7', pillarId: 4, tags: ['MICRO', 'MFG'], maxScore: 5,
        text: { en: 'Is there proper ventilation in the home/workshop production area?', bn: 'বাড়ি/ওয়ার্কশপের উৎপাদন এলাকায় কি সঠিক বায়ুচলাচলের ব্যবস্থা আছে?' },
        scoringGuide: [
            { score: 0, description: { en: 'No', bn: 'না' } },
            { score: 2, description: { en: 'Open windows only', bn: 'শুধুমাত্র খোলা জানালা' } },
            { score: 4, description: { en: 'Exhaust fan', bn: 'নিষ্কাশন ফ্যান' } },
            { score: 5, description: { en: 'Exhaust fan with air quality check', bn: 'বায়ুর গুণমান পরীক্ষা সহ নিষ্কাশন ফ্যান' } },
        ]
    },
    {
        id: '4.8', pillarId: 4, tags: ['MICRO', 'MFG'], maxScore: 5,
        text: { en: 'Do you have a system to verify workers are above the legal working age?', bn: 'কর্মীরা যে আইনি কর্ম বয়সের উপরে তা যাচাই করার জন্য আপনার কি কোনো সিস্টেম আছে?' },
        scoringGuide: [
            { score: 0, description: { en: 'No, employ underage workers', bn: 'না, অপ্রাপ্তবয়স্ক কর্মী নিয়োগ করি' } },
            { score: 2, description: { en: 'No system, but believe all are of age', bn: 'কোনো সিস্টেম নেই, কিন্তু বিশ্বাস করি সবাই প্রাপ্তবয়স্ক' } },
            { score: 4, description: { en: 'Informal age check', bn: 'অনানুষ্ঠানিক বয়স পরীক্ষা' } },
            { score: 5, description: { en: 'Formal age verification (e.g., NID)', bn: 'আনুষ্ঠানিক বয়স যাচাই (যেমন, NID)' } },
        ]
    },
    {
        id: '4.9', pillarId: 4, tags: ['MICRO', 'RUR'], maxScore: 5,
        text: { en: 'What percentage of the business is women-owned?', bn: 'ব্যবসার কত শতাংশের মালিক মহিলা?' },
        scoringGuide: [
            { score: 0, description: { en: '0%', bn: '০%' } },
            { score: 2, description: { en: '<25%', bn: '<২৫%' } },
            { score: 4, description: { en: '50-75%', bn: '৫০-৭৫%' } },
            { score: 5, description: { en: '>75%', bn: '>৭৫%' } },
        ]
    },
    {
        id: '4.10', pillarId: 4, tags: ['MICRO', 'RUR'], maxScore: 5,
        text: { en: 'Do women in the business make operational/financial decisions?', bn: 'ব্যবসার মহিলারা কি পরিচালন/আর্থিক সিদ্ধান্ত গ্রহণ করেন?' },
        scoringGuide: [
            { score: 0, description: { en: 'No', bn: 'না' } },
            { score: 2, description: { en: 'Are consulted', bn: 'পরামর্শ করা হয়' } },
            { score: 4, description: { en: 'Make some decisions', bn: 'কিছু সিদ্ধান্ত গ্রহণ করেন' } },
            { score: 5, description: { en: 'Have full authority', bn: 'সম্পূর্ণ কর্তৃত্ব আছে' } },
        ]
    },
    {
        id: '4.11', pillarId: 4, tags: ['MICRO', 'RUR'], maxScore: 5,
        text: { en: 'What percentage of inputs are sourced from within 10km?', bn: 'কত শতাংশ কাঁচামাল ১০ কিলোমিটারের মধ্যে থেকে কেনা হয়?' },
        scoringGuide: [
            { score: 0, description: { en: '<25%', bn: '<২৫%' } },
            { score: 2, description: { en: '25-50%', bn: '২৫-৫০%' } },
            { score: 4, description: { en: '50-75%', bn: '৫০-৭৫%' } },
            { score: 5, description: { en: '>75%', bn: '>৭৫%' } },
        ]
    },
    {
        id: '4.12', pillarId: 4, tags: ['MICRO', 'RUR'], maxScore: 5,
        text: { en: 'How are community disputes handled?', bn: 'সম্প্রদায়ের বিরোধ কীভাবে নিষ্পত্তি করা হয়?' },
        scoringGuide: [
            { score: 0, description: { en: 'Ignored', bn: 'উপেক্ষা করা হয়' } },
            { score: 2, description: { en: 'Informal discussion', bn: 'অনানুষ্ঠানিক আলোচনা' } },
            { score: 4, description: { en: 'Involving local leaders', bn: 'স্থানীয় নেতাদের জড়িত করা' } },
            { score: 5, description: { en: 'Formal mediation mechanism', bn: 'আনুষ্ঠানিক মধ্যস্থতা প্রক্রিয়া' } },
        ]
    },
    {
        id: '4.13', pillarId: 4, tags: ['MICRO', 'RUR'], maxScore: 5,
        text: { en: 'Do you support seasonal workers during the off-season?', bn: 'আপনি কি মৌসুম-বহির্ভূত সময়ে মৌসুমী কর্মীদের সহায়তা করেন?' },
        scoringGuide: [
            { score: 0, description: { en: 'No', bn: 'না' } },
            { score: 2, description: { en: 'Some informal assistance', bn: 'কিছু অনানুষ্ঠানিক সহায়তা' } },
            { score: 4, description: { en: 'Provide training for other skills', bn: 'অন্যান্য দক্ষতার জন্য প্রশিক্ষণ প্রদান' } },
            { score: 5, description: { en: 'Provide advance payment or alternative work', bn: 'অগ্রিম প্রদান বা বিকল্প কাজ প্রদান' } },
        ]
    },
    // PILLAR 5: Digital & Innovation
    {
        id: '5.1', pillarId: 5, tags: ['ALL'], maxScore: 5,
        text: { en: 'How do you manage your business accounting?', bn: 'আপনি আপনার ব্যবসার হিসাবরক্ষণ কীভাবে পরিচালনা করেন?' },
        scoringGuide: [
            { score: 0, description: { en: 'Manual paper-based ledger', bn: 'ম্যানুয়াল কাগজ-ভিত্তিক খাতা' } },
            { score: 2, description: { en: 'Using Excel spreadsheets', bn: 'এক্সেল স্প্রেডশীট ব্যবহার করে' } },
            { score: 4, description: { en: 'Using a local accounting software', bn: 'একটি স্থানীয় অ্যাকাউন্টিং সফটওয়্যার ব্যবহার করে' } },
            { score: 5, description: { en: 'Using a cloud-based automated software', bn: 'একটি ক্লাউড-ভিত্তিক স্বয়ংক্রিয় সফটওয়্যার ব্যবহার করে' } },
        ]
    },
    {
        id: '5.2', pillarId: 5, tags: ['TRD', 'SRV', 'RETAIL'], maxScore: 5,
        text: { en: 'What percentage of your sales is conducted online?', bn: 'আপনার বিক্রয়ের কত শতাংশ অনলাইনে পরিচালিত হয়?' },
        scoringGuide: [
            { score: 0, description: { en: '0%', bn: '০%' } },
            { score: 2, description: { en: '<10%', bn: '<১০%' } },
            { score: 4, description: { en: '10-30%', bn: '১০-৩০%' } },
            { score: 5, description: { en: '>30%', bn: '>৩০%' } },
        ]
    },
    {
        id: '5.3', pillarId: 5, tags: ['MFG'], maxScore: 5,
        text: { en: 'Do you have a system for real-time energy or water monitoring?', bn: 'আপনার কি বাস্তব-সময় শক্তি বা জল পর্যবেক্ষণের জন্য কোনো সিস্টেম আছে?' },
        scoringGuide: [
            { score: 0, description: { en: 'No monitoring', bn: 'কোনো পর্যবেক্ষণ নেই' } },
            { score: 2, description: { en: 'Manual readings from utility bills', bn: 'ইউটিলিটি বিল থেকে ম্যানুয়াল রিডিং' } },
            { score: 4, description: { en: 'Some digital sub-metering exists', bn: 'কিছু ডিজিটাল সাব-মিটারিং আছে' } },
            { score: 5, description: { en: 'IoT sensors with a live dashboard', bn: 'লাইভ ড্যাশবোর্ডসহ আইওটি সেন্সর' } },
        ]
    },
    {
        id: '5.4', pillarId: 5, tags: ['ALL'], maxScore: 5,
        text: { en: 'Have you implemented any green technology or process innovation in the last 2 years?', bn: 'আপনি কি গত ২ বছরে কোনো সবুজ প্রযুক্তি বা প্রক্রিয়া উদ্ভাবন বাস্তবায়ন করেছেন?' },
        scoringGuide: [
            { score: 0, description: { en: 'No', bn: 'না' } },
            { score: 2, description: { en: 'Some minor changes or ideas', bn: 'কিছু ছোটখাটো পরিবর্তন বা ধারণা' } },
            { score: 4, description: { en: 'Implemented 1-2 major innovations', bn: '১-২টি বড় উদ্ভাবন বাস্তবায়ন করা হয়েছে' } },
            { score: 5, description: { en: 'Have a continuous innovation program', bn: 'একটি অবিচ্ছিন্ন উদ্ভাবন কর্মসূচি আছে' } },
        ]
    },
    {
        id: '5.5', pillarId: 5, tags: ['MICRO', 'TRD', 'SRV'], maxScore: 5,
        text: { en: 'Do you use WhatsApp Business for customer orders?', bn: 'আপনি কি গ্রাহকের অর্ডারের জন্য হোয়াটসঅ্যাপ বিজনেস ব্যবহার করেন?' },
        scoringGuide: [
            { score: 0, description: { en: 'No', bn: 'না' } },
            { score: 2, description: { en: 'Personal WhatsApp account', bn: 'ব্যক্তিগত হোয়াটসঅ্যাপ অ্যাকাউন্ট' } },
            { score: 4, description: { en: 'WhatsApp Business account', bn: 'হোয়াটসঅ্যাপ বিজনেস অ্যাকাউন্ট' } },
            { score: 5, description: { en: 'Business account with product catalog', bn: 'পণ্য ক্যাটালগ সহ বিজনেস অ্যাকাউন্ট' } },
        ]
    },
    {
        id: '5.6', pillarId: 5, tags: ['MICRO', 'TRD'], maxScore: 5,
        text: { en: 'Do you use Facebook Live for product sales?', bn: 'আপনি কি পণ্য বিক্রির জন্য ফেসবুক লাইভ ব্যবহার করেন?' },
        scoringGuide: [
            { score: 0, description: { en: 'No', bn: 'না' } },
            { score: 2, description: { en: 'Sometimes', bn: 'মাঝে মাঝে' } },
            { score: 4, description: { en: 'Weekly', bn: 'সাপ্তাহিক' } },
            { score: 5, description: { en: 'Daily / with direct ordering', bn: 'দৈনিক / সরাসরি অর্ডার সহ' } },
        ]
    },
    {
        id: '5.7', pillarId: 5, tags: ['MICRO', 'ALL'], maxScore: 5,
        text: { en: 'Can you/your workers use a smartphone for business tasks (e.g., payments)?', bn: 'আপনি/আপনার কর্মীরা কি ব্যবসার কাজের জন্য (যেমন, পেমেন্ট) স্মার্টফোন ব্যবহার করতে পারেন?' },
        scoringGuide: [
            { score: 0, description: { en: 'No / Basic calls only', bn: 'না / শুধুমাত্র সাধারণ কল' } },
            { score: 2, description: { en: 'Can use basic apps', bn: 'সাধারণ অ্যাপ ব্যবহার করতে পারে' } },
            { score: 4, description: { en: 'Can use financial/business apps', bn: 'আর্থিক/ব্যবসায়িক অ্যাপ ব্যবহার করতে পারে' } },
            { score: 5, description: { en: 'Can train others', bn: 'অন্যদের প্রশিক্ষণ দিতে পারে' } },
        ]
    },
    {
        id: '5.8', pillarId: 5, tags: ['MICRO', 'ALL'], maxScore: 5,
        text: { en: 'Have you/your workers accessed online skill training?', bn: 'আপনি/আপনার কর্মীরা কি অনলাইন দক্ষতা প্রশিক্ষণে অংশ নিয়েছেন?' },
        scoringGuide: [
            { score: 0, description: { en: 'No', bn: 'না' } },
            { score: 2, description: { en: 'Via YouTube/social media', bn: 'ইউটিউব/সোশ্যাল মিডিয়ার মাধ্যমে' } },
            { score: 4, description: { en: 'Formal online courses', bn: 'আনুষ্ঠানিক অনলাইন কোর্স' } },
            { score: 5, description: { en: 'Completed certified programs', bn: 'প্রত্যয়িত প্রোগ্রাম সম্পন্ন করেছেন' } },
        ]
    },
    {
        id: '5.9', pillarId: 5, tags: ['AGR', 'RUR'], maxScore: 5,
        text: { en: 'Are you a member of a producer cooperative?', bn: 'আপনি কি কোনো উৎপাদক সমবায়ের সদস্য?' },
        scoringGuide: [
            { score: 0, description: { en: 'No', bn: 'না' } },
            { score: 2, description: { en: 'Member', bn: 'সদস্য' } },
            { score: 4, description: { en: 'Active member', bn: 'সক্রিয় সদস্য' } },
            { score: 5, description: { en: 'Hold a leadership role', bn: 'নেতৃত্বের ভূমিকা পালন করি' } },
        ]
    },
    {
        id: '5.10', pillarId: 5, tags: ['MICRO', 'RUR'], maxScore: 5,
        text: { en: 'Do you use traditional eco-friendly practices in your business?', bn: 'আপনি কি আপনার ব্যবসায় ঐতিহ্যবাহী পরিবেশ-বান্ধব পদ্ধতি ব্যবহার করেন?' },
        scoringGuide: [
            { score: 0, description: { en: 'No', bn: 'না' } },
            { score: 2, description: { en: 'Some practices used', bn: 'কিছু পদ্ধতি ব্যবহৃত হয়' } },
            { score: 4, description: { en: 'Mostly use traditional practices', bn: 'বেশিরভাগই ঐতিহ্যবাহী পদ্ধতি ব্যবহার করি' } },
            { score: 5, description: { en: 'Practices are documented/shared', bn: 'পদ্ধতিগুলি নথিভুক্ত/শেয়ার করা হয়' } },
        ]
    }
];


export const SCORE_INTERPRETATIONS: ScoreInterpretation[] = [
    { minScore: 80, rating: { level: { en: 'Green Leader', bn: 'সবুজ নেতা' }, meaning: { en: 'Excellent sustainability performance', bn: 'চমৎকার টেকসই কর্মক্ষমতা' }, actions: { en: 'Share best practices, apply for green certification', bn: 'সেরা অনুশীলন শেয়ার করুন, সবুজ সার্টিফিকেশনের জন্য আবেদন করুন' } }, colorClass: 'bg-teal-500', textColor: 'text-teal-500' },
    { minScore: 60, rating: { level: { en: 'Green Adopter', bn: 'সবুজ গ্রহীতা' }, meaning: { en: 'Good foundation with room to improve', bn: 'উন্নতির সুযোগ সহ ভাল ভিত্তি' }, actions: { en: 'Focus on 2-3 high-impact actions', bn: '২-৩টি উচ্চ-প্রভাবশালী কাজে মনোযোগ দিন' } }, colorClass: 'bg-green-500', textColor: 'text-green-500' },
    { minScore: 40, rating: { level: { en: 'Green Starter', bn: 'সবুজ স্টার্টার' }, meaning: { en: 'Beginning the journey', bn: 'যাত্রা শুরু' }, actions: { en: 'Prioritize energy audit and waste reduction', bn: 'শক্তি নিরীক্ষা এবং বর্জ্য হ্রাসে অগ্রাধিকার দিন' } }, colorClass: 'bg-yellow-500', textColor: 'text-yellow-500' },
    { minScore: 0, rating: { level: { en: 'Needs Action', bn: 'পদক্ষেপ প্রয়োজন' }, meaning: { en: 'Significant gaps exist', bn: 'উল্লেখযোগ্য ফাঁক বিদ্যমান' }, actions: { en: 'Start with basic compliance and awareness training', bn: 'প্রাথমিক সম্মতি এবং সচেতনতা প্রশিক্ষণ দিয়ে শুরু করুন' } }, colorClass: 'bg-red-500', textColor: 'text-red-500' },
];

export const SECTOR_BENCHMARKS = [
    { sector: { en: 'Manufacturing SMEs average', bn: 'উৎপাদন এসএমই গড়' }, score: 65 },
    { sector: { en: 'Service SMEs average', bn: 'পরিষেবা এসএমই গড়' }, score: 58 },
    { sector: { en: 'Trading SMEs average', bn: 'ট্রেডিং এসএমই গড়' }, score: 52 },
];

export const KEY_RESOURCES: Resource[] = [
    { name: { en: 'Bangladesh Bank Green Banking Unit', bn: 'বাংলাদেশ ব্যাংক গ্রিন ব্যাংকিং ইউনিট' }, contact: 'greenbanking@bb.org.bd' },
    { name: { en: 'SME Foundation', bn: 'এসএমই ফাউন্ডেশন' }, contact: 'Helpline: ১৯৫, www.smef.gov.bd' },
    { name: { en: 'BGMEA Sustainability Team', bn: 'বিজিএমইএ টেকসই দল' }, contact: 'For garment factories' },
    { name: { en: 'IDCOL', bn: 'ইডকল' }, contact: 'For solar financing (www.idcol.org)' },
];

export const LOADING_TIPS: LoadingTip[] = [
    { en: "Did you know? Switching to LED lights can reduce your lighting energy consumption by up to 80%.", bn: "আপনি কি জানেন? এলইডি লাইটে স্যুইচ করলে আপনার আলোর শক্তি খরচ ৮০% পর্যন্ত কমাতে পারে।" },
    { en: "Tip: Regularly check for and fix water leaks. A single dripping tap can waste over 15 liters of water a day!", bn: "টিপ: নিয়মিত জলের লিক পরীক্ষা করুন এবং মেরামত করুন। একটি ট্যাপ থেকে ফোঁটা ফোঁটা জল দিনে ১৫ লিটারের বেশি জল নষ্ট করতে পারে!" },
    { en: "Fact: In Bangladesh, SMEs contribute to about 25% of the GDP but have immense potential for green growth.", bn: "তথ্য: বাংলাদেশে, এসএমই জিডিপির প্রায় ২৫% অবদান রাখে তবে সবুজ প্রবৃদ্ধির জন্য তাদের প্রচুর সম্ভাবনা রয়েছে।" },
    { en: "Did you know? Composting your organic waste can reduce landfill methane emissions and create valuable fertilizer.", bn: "আপনি কি জানেন? আপনার জৈব বর্জ্য কম্পোস্টিং করলে ল্যান্ডফিলের মিথেন নির্গমন কমাতে পারে এবং মূল্যবান সার তৈরি করতে পারে।" },
    { en: "Tip: A 'Green Team' of employees can help identify and implement simple, effective sustainability initiatives.", bn: "টিপ: কর্মীদের একটি 'গ্রিন টিম' সহজ, কার্যকর টেকসই উদ্যোগগুলি সনাক্ত করতে এবং বাস্তবায়ন করতে সহায়তা করতে পারে।" },
    { en: "Fact: Bangladesh Bank offers special low-interest green financing schemes for sustainable projects.", bn: "তথ্য: বাংলাদেশ ব্যাংক টেকসই প্রকল্পের জন্য বিশেষ স্বল্প-সুদে সবুজ অর্থায়ন প্রকল্প অফার করে।" },
    { en: "Did you know? Jute, the 'Golden Fibre' of Bangladesh, is a highly sustainable material that reduces plastic use.", bn: "আপনি কি জানেন? বাংলাদেশের 'সোনালী আঁশ' পাট একটি অত্যন্ত টেকসই উপাদান যা প্লাস্টিকের ব্যবহার কমায়।" },
    { en: "Fact: Bangladesh's textile sector is a major water consumer. Technologies like waterless dyeing can save millions of liters annually.", bn: "তথ্য: বাংলাদেশের বস্ত্র খাত একটি প্রধান জল ব্যবহারকারী। জলবিহীন ডাইংয়ের মতো প্রযুক্তি বার্ষিকভাবে লক্ষ লক্ষ লিটার জল সাশ্রয় করতে পারে।" },
    { en: "Tip: Improving your supply chain's efficiency not only cuts costs but also significantly reduces your carbon footprint from transportation.", bn: "টিপ: আপনার সাপ্লাই চেইনের দক্ষতা উন্নত করা শুধুমাত্র খরচই কমায় না, পরিবহন থেকে আপনার কার্বন ফুটপ্রিন্টও উল্লেখযোগ্যভাবে হ্রাস করে।" },
    { en: "Fact: Green buildings with better lighting and ventilation have been shown to improve employee productivity and reduce sick days.", bn: "তথ্য: উন্নত আলো এবং বায়ুচলাচল সহ সবুজ ভবনগুলি কর্মীদের উৎপাদনশীলতা উন্নত করতে এবং অসুস্থতার দিন কমাতে দেখানো হয়েছে।" },
    { en: "Tip: Properly sorting waste for recycling can generate extra income and reduce the burden on local landfills.", bn: "টিপ: পুনর্ব্যবহারের জন্য বর্জ্য সঠিকভাবে বাছাই করা অতিরিক্ত আয় তৈরি করতে পারে এবং স্থানীয় ল্যান্ডফিলের উপর বোঝা কমাতে পারে।" },
    { en: "Did you know? Aquaculture can be made more sustainable by using solar-powered aerators, improving both yield and energy efficiency.", bn: "আপনি কি জানেন? সৌর-চালিত এয়ারেটর ব্যবহার করে অ্যাকুয়াকালচারকে আরও টেকসই করা যেতে পারে, যা ফলন এবং শক্তি দক্ষতা উভয়ই উন্নত করে।" }
];