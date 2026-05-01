import { MainQuestion, ProbingAnswers, Domain } from './types';

export const DOMAINS: Domain[] = [
    { code: 'D1', name: { en: 'Energy and emissions', bn: 'শক্তি এবং নির্গমন' } },
    { code: 'D2', name: { en: 'Water use and wastewater', bn: 'জলের ব্যবহার এবং বর্জ্য জল' } },
    { code: 'D3', name: { en: 'Waste and circularity', bn: 'বর্জ্য এবং বৃত্তাকারতা' } },
    { code: 'D4', name: { en: 'Materials and chemicals', bn: 'উপকরণ এবং রাসায়নিক' } },
    { code: 'D5', name: { en: 'Land, soil, biodiversity, livestock and agriculture impacts', bn: 'জমি, মাটি, জীববৈচিত্র্য, গবাদি পশু এবং কৃষির প্রভাব' } },
    { code: 'D6', name: { en: 'Workplace and local environmental safety', bn: 'কর্মক্ষেত্র এবং স্থানীয় পরিবেশগত নিরাপত্তা' } },
    { code: 'D7', name: { en: 'Green management, records and evidence', bn: 'সবুজ ব্যবস্থাপনা, রেকর্ড এবং প্রমাণ' } },
    { code: 'D8', name: { en: 'Finance and certification readiness', bn: 'অর্থায়ন এবং শংসাপত্র প্রস্তুতি' } },
];

export const MAIN_QUESTIONS: MainQuestion[] = [
    // --- Universal Core Questions ---
    {
        id: 'U-01',
        domain: 'D7',
        weightPriority: 'Medium',
        text: { en: 'Do you know which activities in your business create the most waste, smoke, smell, wastewater, or high electricity/fuel cost?', bn: 'আপনার ব্যবসার কোন মূল কাজগুলি সবচেয়ে বেশি বর্জ্য, ধোঁয়া, দুর্গন্ধ, দূষিত জল বা উচ্চ বিদ্যুৎ/জ্বালানি খরচ তৈরি করে তা কি আপনি জানেন?' },
        evidenceExamples: { en: 'Verbal explanation, simple list, photo, staff confirmation', bn: 'মৌখিক ব্যাখ্যা, সহজ তালিকা, ছবি, কর্মীর নিশ্চিতকরণ' },
        financeLink: { en: 'ISO 14001 readiness', bn: 'ISO 14001 প্রস্তুতি' },
        routingCondition: () => true // Ask all
    },
    {
        id: 'U-02',
        domain: 'D1',
        weightPriority: 'Medium',
        text: { en: 'Do you try to reduce electricity, fuel, gas, or firewood use in daily operations?', bn: 'আপনি কি দৈনন্দিন কাজকর্মে বিদ্যুৎ, জ্বালানি, গ্যাস বা লাকড়ির ব্যবহার কমানোর চেষ্টা করেন?' },
        evidenceExamples: { en: 'Electricity bill, fuel record, observed practice', bn: 'বিদ্যুৎ বিল, জ্বালানি রেকর্ড, পরিলক্ষিত অনুশীলন' },
        financeLink: { en: 'Green finance readiness', bn: 'সবুজ অর্থায়ন প্রস্তুতি' },
        routingCondition: (answers) => {
            const energy = answers['P11'] as string[] || [];
             return energy.length > 0 && !energy.includes('No significant energy use') && !energy.includes('I do not know');
        }
    },
    {
        id: 'U-03',
        domain: 'D1',
        weightPriority: 'Medium',
        text: { en: 'Do you switch off lights, fans, machines, pumps, burners, or equipment when not needed?', bn: 'আপনি কি প্রয়োজন না থাকলে লাইট, ফ্যান, মেশিন, পাম্প, বার্নার বা সরঞ্জাম বন্ধ করে রাখেন?' },
        evidenceExamples: { en: 'Observation, staff statement, bill comparison', bn: 'পর্যবেক্ষণ, কর্মীর বিবৃতি, বিল তুলনা' },
        financeLink: { en: 'Cost-saving, green finance', bn: 'খরচ সাশ্রয়, সবুজ অর্থায়ন' },
        routingCondition: (answers) => {
            const energy = answers['P11'] as string[] || [];
            return energy.length > 0 && !energy.includes('No significant energy use') && !energy.includes('I do not know');
        }
    },
    {
        id: 'U-04',
        domain: 'D1',
        weightPriority: 'Medium',
        text: { en: 'Do you use LED lights, efficient fans, efficient motors, or other energy-saving equipment?', bn: 'আপনি কি এলইডি লাইট, দক্ষ ফ্যান, দক্ষ মোটর বা শক্তি সাশ্রয়ী অন্যান্য যন্ত্রপাতি ব্যবহার করেন?' },
        evidenceExamples: { en: 'Photos, purchase receipt, observation', bn: 'ছবি, ক্রয়ের রশিদ, পর্যবেক্ষণ' },
        financeLink: { en: 'Energy efficiency finance', bn: 'শক্তি সাশ্রয়ী অর্থায়ন' },
        routingCondition: (answers) => {
            const premise = answers['P3'] as string;
            // Apply if facility/equipment present
            return !!premise && premise !== 'default' && premise !== 'Mobile business / vehicle-based' && premise !== 'Online business with physical stock/storage'; 
        }
    },
    {
        id: 'U-05',
        domain: 'D3',
        weightPriority: 'High',
        text: { en: 'Do you separate reusable or recyclable waste from general waste?', bn: 'আপনি কি পুনরায় ব্যবহারযোগ্য বা পুনর্ব্যবহারযোগ্য বর্জ্যকে সাধারণ বর্জ্য থেকে আলাদা করেন?' },
        evidenceExamples: { en: 'Separate bins, bags, storage area, recycler receipt', bn: 'আলাদা বিন, ব্যাগ, স্টোরেজ এলাকা, পুনর্ব্যবহারকারীর রশিদ' },
        financeLink: { en: 'Circular economy readiness', bn: 'বৃত্তাকার অর্থনীতির প্রস্তুতি' },
        routingCondition: (answers) => {
            const waste = answers['P15'] as string[] || [];
            return waste.length > 0 && !waste.includes('Very little waste') && !waste.includes('I do not know');
        }
    },
    {
        id: 'U-06',
        domain: 'D3',
        weightPriority: 'Medium',
        text: { en: 'Do you repair, reuse, resell, recycle, compost, or donate materials instead of throwing them away?', bn: 'আপনি কি কোনো জিনিস ফেলে দেয়ার পরিবর্তে তা মেরামত, পুনরায় ব্যবহার, পুনরায় বিক্রি, রিসাইকেল, কম্পোস্ট বা দান করেন?' },
        evidenceExamples: { en: 'Scrap sale receipt, photo, reuse practice', bn: 'ভাঙারি বিক্রির রশিদ, ছবি, পুনরায় ব্যবহারের অনুশীলন' },
        financeLink: { en: 'Waste reduction, finance readiness', bn: 'বর্জ্য হ্রাস, অর্থায়ন প্রস্তুতি' },
        routingCondition: (answers) => {
            const waste = answers['P15'] as string[] || [];
            return waste.length > 0 && !waste.includes('Very little waste') && !waste.includes('I do not know');
        }
    },
    {
        id: 'U-07',
        domain: 'D4',
        weightPriority: 'High',
        text: { en: 'Do you safely store fuel, oil, chemicals, pesticides, cleaning products, or other risky materials away from food, drains, children, animals, and open soil?', bn: 'আপনি কি জ্বালানি, তেল, রাসায়নিক, কীটনাশক, পরিষ্কারের পণ্য বা অন্যান্য ঝুঁকিপূর্ণ উপাদান খাবার, ড্রেন, শিশু, প্রাণী এবং খোলা মাটি থেকে নিরাপদে দূরে সংরক্ষণ করেন?' },
        evidenceExamples: { en: 'Storage photo, labelled containers, separate shelf', bn: 'স্টোরেজ ছবি, লেবেলযুক্ত পাত্র, আলাদা তাক' },
        financeLink: { en: 'ISO 14001, safety readiness', bn: 'ISO 14001, নিরাপত্তা প্রস্তুতি' },
        routingCondition: (answers) => {
            const chemicals = answers['P18'] as string[] || [];
            const fuel = answers['P11'] as string[] || [];
            return (chemicals.length > 0 && !chemicals.includes('None of these') && !chemicals.includes('I do not know')) || 
                   (fuel.some(f => ['Diesel', 'Petrol/octane', 'CNG', 'LPG cylinder'].includes(f)));
        }
    },
    {
        id: 'U-08',
        domain: 'D2',
        weightPriority: 'Medium',
        text: { en: 'Do you take steps to reduce water wastage, leakage, or unnecessary water use?', bn: 'আপনি কি জলের অপচয়, লিক বা অপ্রয়োজনীয় জলের ব্যবহার কমানোর জন্য পদক্ষেপ নেন?' },
        evidenceExamples: { en: 'Fixed leaks, water-saving nozzle, schedule, observation', bn: 'মেরামত করা লিক, জল বাঁচানোর নজল, সময়সূচি, পর্যবেক্ষণ' },
        financeLink: { en: 'Water efficiency finance', bn: 'জল দক্ষতা অর্থায়ন' },
        routingCondition: (answers) => {
            const water = answers['P13'] as string;
            return !!water && water !== 'No significant water use' && water !== 'I do not know' && water !== 'default';
        }
    },
    {
        id: 'U-09',
        domain: 'D6',
        weightPriority: 'High',
        text: { en: 'Does smoke, dust, odour, wastewater, noise, heat, or waste from your business affect workers, neighbours, customers, land, drains, canals, or ponds?', bn: 'আপনার ব্যবসার ফলস্বরূপ তৈরি হওয়া ধোঁয়া, ধুলো, দুর্গন্ধ, দূষিত জল, শব্দ, তাপ বা বর্জ্য কি আপনার কর্মী, প্রতিবেশী, ক্রেতা, জমি, ড্রেন, খাল বা পুকুরকে প্রভাবিত করে?' },
        evidenceExamples: { en: 'Complaint record, observation, photos', bn: 'অভিযোগ রেকর্ড, পর্যবেক্ষণ, ছবি' },
        financeLink: { en: 'Environmental risk flag', bn: 'পরিবেশগত ঝুঁকি নির্দেশক' },
        routingCondition: (answers) => {
            const nuisance = answers['P17'] as string;
            return !!nuisance && ['Yes, often', 'Sometimes'].includes(nuisance);
        }
    },
    {
        id: 'U-10',
        domain: 'D7',
        weightPriority: 'Medium',
        text: { en: 'Do you keep records of electricity bills, fuel cost, water use, production, waste sale, composting, repairs, or input purchases?', bn: 'আপনি কি বিদ্যুৎ বিল, জ্বালানি খরচ, জলের ব্যবহার, উৎপাদন, বর্জ্য বিক্রি, কম্পোস্টিং, মেরামত বা উপকরণ কেনার রেকর্ড রাখেন?' },
        evidenceExamples: { en: 'Notebook, mobile record, receipts, photos', bn: 'নোটবুক, মোবাইল রেকর্ড, রশিদ, ছবি' },
        financeLink: { en: 'Finance and certification readiness', bn: 'অর্থায়ন এবং সার্টিফিকেশন প্রস্তুতি' },
        routingCondition: () => true // Ask all
    },
    {
        id: 'U-11',
        domain: 'D7',
        weightPriority: 'Low',
        text: { en: 'Have you made any green improvement in the last 12 months, even a small one?', bn: 'গত ১২ মাসে আপনি কি পরিবেশগত কোনো ছোট বা বড় উন্নতি করেছেন?' },
        evidenceExamples: { en: 'Photo, receipt, verbal statement', bn: 'ছবি, রশিদ, মৌখিক বিবরণ' },
        financeLink: { en: 'Improvement trajectory', bn: 'উন্নতির ধারা' },
        routingCondition: () => true // Ask all
    },
    {
        id: 'U-12',
        domain: 'D7',
        weightPriority: 'Low',
        text: { en: 'Do you have a regular person responsible for saving energy, reducing waste, managing water, or keeping the workplace clean?', bn: 'শক্তি সাশ্রয়, বর্জ্য হ্রাস, জলের ব্যবস্থাপনা ঠিক রাখা বা কাজ করার জায়গা পরিষ্কার রাখার জন্য আপনার কি কোনো নির্দিষ্ট লোক আছে?' },
        evidenceExamples: { en: 'Named person, staff role, owner statement', bn: 'নির্দিষ্ট নাম, কর্মীর ভূমিকা, মালিকের বক্তব্য' },
        financeLink: { en: 'ISO 14001 readiness', bn: 'ISO 14001 প্রস্তুতি' },
        routingCondition: (answers) => {
            const workers = answers['P5'] as string;
            return !!workers && workers !== '1 person' && workers !== 'default';
        }
    },
    {
        id: 'U-13',
        domain: 'D6',
        weightPriority: 'Medium',
        text: { en: 'Do workers or family members know how to handle waste, fuel, chemicals, water, or equipment safely?', bn: 'কর্মীরা বা পরিবারের সদস্যরা কি বর্জ্য, জ্বালানি, রাসায়নিক, জল বা যন্ত্রপাতি নিরাপদে ব্যবহার করতে জানে?' },
        evidenceExamples: { en: 'Verbal check, training', bn: 'মৌখিক যাচাই, প্রশিক্ষণ' },
        financeLink: { en: 'ISO 14001 readiness', bn: 'ISO 14001 প্রস্তুতি' },
        routingCondition: (answers) => {
            const workers = answers['P5'] as string;
            return !!workers && workers !== '1 person' && workers !== 'default';
        }
    },
    {
        id: 'U-14',
        domain: 'D3',
        weightPriority: 'High',
        text: { en: 'Do you avoid burning waste, plastic, fabric, packaging, used oil, or chemical containers?', bn: 'আপনি কি আবর্জনা, প্লাস্টিক, কাপড়, প্যাকেজিং, ব্যবহৃত তেল, বা রাসায়নিক পাত্র পোড়ানো থেকে বিরত থাকেন?' },
        evidenceExamples: { en: 'Observation, waste disposal method, photo, instructions', bn: 'পর্যবেক্ষণ, বর্জ্য নিষ্কাশন পদ্ধতি, ছবি, নির্দেশনা' },
        financeLink: { en: 'Pollution reduction', bn: 'দূষণ হ্রাস' },
        routingCondition: (answers) => {
            const waste = answers['P15'] as string[] || [];
            return waste.length > 0 && !waste.includes('Very little waste') && !waste.includes('I do not know');
        }
    },
    {
        id: 'U-15',
        domain: 'D2', // D2/D3/D4
        weightPriority: 'Very High',
        text: { en: 'Do you prevent waste, oil, chemicals, manure, or wastewater from entering drains, ponds, canals, rivers, or open land?', bn: 'আপনি কি বর্জ্য, তেল, রাসায়নিক, সার বা দূষিত জল খোলা ড্রেন, পুকুর, খাল, নদী বা খোলা জমিতে ফেলা থেকে বিরত থাকেন?' },
        evidenceExamples: { en: 'Drain protection, storage area, disposal record', bn: 'ড্রেন সুরক্ষা, স্টোরেজ এলাকা, নিষ্কাশন রেকর্ড' },
        financeLink: { en: 'Green finance, local environmental risk', bn: 'সবুজ অর্থায়ন, স্থানীয় পরিবেশগত ঝুঁকি' },
        routingCondition: (answers) => {
            const wastewater = answers['P14'] as string;
            const waste = answers['P15'] as string[] || [];
            const chems = answers['P18'] as string[] || [];
            const hasWastewater = !!wastewater && wastewater !== 'No wastewater is produced' && wastewater !== 'default';
            const hasWaste = waste.length > 0 && !waste.includes('Very little waste');
            const hasChems = chems.length > 0 && !chems.includes('None of these');
            return hasWastewater || hasWaste || hasChems;
        }
    },
    {
        id: 'U-16',
        domain: 'D1',
        weightPriority: 'Medium',
        text: { en: 'Do you check your equipment, pipes, burners, stoves, pumps, machines, or vehicles to prevent leakage, smoke, excess fuel use, or breakdown?', bn: 'লিক, ধোঁয়া, অতিরিক্ত জ্বালানি খরচ বা নষ্ট হওয়া আটকাতে আপনি কি নিয়মিত আপনার যন্ত্রপাতি, পাইপ, বার্নার, চুলা, পাম্প, মেশিন বা যানবাহনগুলি পরীক্ষা করেন?' },
        evidenceExamples: { en: 'Maintenance record, observation', bn: 'রক্ষণাবেক্ষণ রেকর্ড, পর্যবেক্ষণ' },
        financeLink: { en: 'Energy efficiency finance', bn: 'শক্তি সাশ্রয়ী অর্থায়ন' },
        routingCondition: (answers) => {
            const equip = answers['P12'] as string;
            return !!equip && equip !== 'No' && equip !== 'I do not know' && equip !== 'default';
        }
    },
    {
        id: 'U-17',
        domain: 'D3',
        weightPriority: 'Medium',
        text: { en: 'Do you buy materials in a way that reduces waste, packaging, spoilage, or unnecessary transport?', bn: 'আপনি কি এমনভাবে উপকরণ কেনেন যাতে বর্জ্য, প্যাকেজিং, পচন বা অপ্রয়োজনীয় পরিবহন খরচ কমে?' },
        evidenceExamples: { en: 'Purchase records, supplier practices', bn: 'ক্রয় রেকর্ড, সরবরাহকারীর অনুশীলন' },
        financeLink: { en: 'Circularity, green procurement', bn: 'সার্কুলারিটি, সবুজ ক্রয়' },
        routingCondition: (answers) => {
            const sector = answers['P8'] as string;
            return !!sector && sector !== 'default' && (sector.includes('Retail') || sector.includes('Manufacturing') || sector.includes('Food service') || sector.includes('Repair') || sector.includes('Agriculture'));
        }
    },
    {
        id: 'U-18',
        domain: 'D7',
        weightPriority: 'Low',
        text: { en: 'Do you have any simple target, habit, or rule to reduce cost and environmental impact, such as saving electricity, reducing plastic, or reusing waste?', bn: 'খরচ এবং পরিবেশের ক্ষতি কমানোর জন্য আপনার কি বিদ্যুত সাশ্রয়, প্লাস্টিক কমানো বা জিনিস পুনরায় ব্যবহার করার মতো কোনও সাধারণ লক্ষ্য, অভ্যাস বা নিয়ম আছে?' },
        evidenceExamples: { en: 'Written note, verbal rule, poster', bn: 'লিখিত নোট, মৌখিক নিয়ম, পোস্টার' },
        financeLink: { en: 'ISO 14001 readiness', bn: 'ISO 14001 প্রস্তুতি' },
        routingCondition: () => true // Ask all
    },
    {
        id: 'U-19',
        domain: 'D8',
        weightPriority: 'Pathway',
        text: { en: 'Do customers, buyers, suppliers, banks, NGOs, or local authorities ever ask about environmental or green practices?', bn: 'ভোক্তা, ক্রেতা, সরবরাহকারী, ব্যাংক, এনজিও বা স্থানীয় কর্তৃপক্ষ কি কখনো পরিবেশ বা সবুজ অনুশীলন সম্পর্কে জিজ্ঞাসা করে?' },
        evidenceExamples: { en: 'Buyer request, loan requirement, donor form', bn: 'ক্রেতার অনুরোধ, ঋণের প্রয়োজনীয়তা, দাতা ফর্ম' },
        financeLink: { en: 'Market/finance readiness', bn: 'মার্কেট/অর্থায়ন প্রস্তুতি' },
        routingCondition: () => true // Ask all
    },
    {
        id: 'U-20',
        domain: 'D8',
        weightPriority: 'Pathway',
        text: { en: 'Would you be willing to invest in green improvements if they reduced cost, improved sales, helped certification, or increased access to finance?', bn: 'সবুজ বা পরিবেশ-বান্ধব উদ্যোগে বিনিয়োগের ফলে যদি খরচ কমে, বিক্রয় বাড়ে, সার্টিফিকেশন পাওয়া সহজ হয় অথবা ঋণ পাওয়ার সুযোগ বৃদ্ধি পায়, তবে আপনি কি তাতে বিনিয়োগ করতে ইচ্ছুক?' },
        evidenceExamples: { en: 'Stated interest', bn: 'আগ্রহ প্রকাশ' },
        financeLink: { en: 'Green finance pipeline', bn: 'সবুজ অর্থায়ন পাইপলাইন' },
        routingCondition: () => true // Ask all
    },

    // --- B. Energy and Emissions Module (Sector Agnostic) ---
    {
        id: 'EN-01',
        domain: 'D1',
        weightPriority: 'Medium',
        text: { en: 'Do you track monthly electricity use or electricity bills?', bn: 'আপনি কি মাসিক বিদ্যুতের ব্যবহার বা বিদ্যুৎ বিলের হিসাব রাখেন?' },
        evidenceExamples: { en: 'Electricity bills, meter photo', bn: 'বিদ্যুৎ বিল, মিটারের ছবি' },
        financeLink: { en: 'Energy efficiency finance', bn: 'শক্তি সাশ্রয়ী অর্থায়ন' },
        routingCondition: (answers) => {
            const energy = answers['P11'] as string[] || [];
            return energy.includes('Grid electricity');
        }
    },
    {
        id: 'EN-02',
        domain: 'D1',
        weightPriority: 'High',
        text: { en: 'Do you track diesel, petrol, LPG, gas, coal, firewood, or biomass use and cost?', bn: 'আপনি কি ডিজেল, পেট্রোল, এলপিজি, গ্যাস, কয়লা, লাকড়ি বা বায়োমাস ব্যবহারের খরচ এবং হিসাব রাখেন?' },
        evidenceExamples: { en: 'Fuel purchase record, bills, receipts', bn: 'জ্বালানি ক্রয়ের রেকর্ড, বিল, রশিদ' },
        financeLink: { en: 'Green finance readiness', bn: 'সবুজ অর্থায়ন প্রস্তুতি' },
        routingCondition: (answers) => {
            const energy = answers['P11'] as string[] || [];
            return energy.some(e => ['Diesel', 'Petrol/octane', 'CNG', 'LPG cylinder', 'Natural gas line', 'Firewood', 'Coal', 'Rice husk / biomass'].includes(e));
        }
    },
    {
        id: 'EN-03',
        domain: 'D1',
        weightPriority: 'Medium',
        text: { en: 'Do you know which machine, process, or activity uses the most energy or fuel?', bn: 'আপনি কি জানেন কোন মেশিন, কাজ বা প্রক্রিয়ায় সবচেয়ে বেশি শক্তি বা জ্বালানি খরচ হয়?' },
        evidenceExamples: { en: 'Verbal explanation, basic calculation', bn: 'মৌখিক ব্যাখ্যা, সাধারণ হিসাব' },
        financeLink: { en: 'ISO 14001, energy audit readiness', bn: 'ISO 14001, এনার্জি অডিট প্রস্তুতি' },
        routingCondition: (answers) => {
            const equip = answers['P12'] as string;
            return !!equip && (equip === 'Yes, many' || equip === 'Yes, a few');
        }
    },
    {
        id: 'EN-04',
        domain: 'D1',
        weightPriority: 'High',
        text: { en: 'Are motors, pumps, compressors, grinders, sewing machines, dryers, boilers, or other machines maintained regularly?', bn: 'মোটর, পাম্প, কম্প্রেসার, গ্রাইন্ডার, সেলাই মেশিন, ড্রায়ার, বয়লার বা অন্যান্য মেশিন কি নিয়মিত রক্ষণাবেক্ষণ করা হয়?' },
        evidenceExamples: { en: 'Maintenance record, mechanic receipt, observation', bn: 'রক্ষণাবেক্ষণের রেকর্ড, মেকানিকের রশিদ, পর্যবেক্ষণ' },
        financeLink: { en: 'Energy efficiency finance', bn: 'শক্তি সাশ্রয়ী অর্থায়ন' },
        routingCondition: (answers) => {
            const equip = answers['P12'] as string;
            return !!equip && (equip === 'Yes, many' || equip === 'Yes, a few');
        }
    },
    {
        id: 'EN-06', // Adding this as conditional from earlier pdf example
        domain: 'D1',
        weightPriority: 'Medium',
        text: { en: 'Do you use solar electricity, solar lights, solar pumps, or other renewable energy in the business?', bn: 'আপনি কি ব্যবসায় সৌর বিদ্যুৎ, সোলার লাইট, সোলার পাম্প বা অন্যান্য নবায়নযোগ্য শক্তি ব্যবহার করেন?' },
        evidenceExamples: { en: 'Solar panel photo, invoice', bn: 'সোলার প্যানেলের ছবি, ইনভয়েস' },
        financeLink: { en: 'Renewable energy finance', bn: 'নবায়নযোগ্য শক্তির অর্থায়ন' },
        routingCondition: () => true // Show for everyone optionally, per PDF "all as optional"
    }

    // (More questions can be added here)
];
