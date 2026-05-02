
import { Pillar, ScoreInterpretation, Resource, ProbingQuestion, Indicator } from './types';

export const PILLARS: Omit<Pillar, 'indicators' | 'notes'>[] = [
  { id: 1, title: { en: 'Energy & Resource Efficiency', bn: 'শক্তি ও সম্পদ দক্ষতা' }, points: 30 },
  { id: 2, title: { en: 'Environmental Management & Climate Resilience', bn: 'পরিবেশগত ব্যবস্থাপনা ও জলবায়ু সহনশীলতা' }, points: 25 },
  { id: 3, title: { en: 'Green Finance & Investment', bn: 'সবুজ অর্থায়ন ও বিনিয়োগ' }, points: 20 },
  { id: 4, title: { en: 'Social Sustainability', bn: 'সামাজিক টেকসই' }, points: 15 },
  { id: 5, title: { en: 'Digital & Innovation', bn: 'ডিজিটাল ও উদ্ভাবন' }, points: 10 },
];

export const SCORING_OPTIONS = [
    { score: 0, text: { en: '0 - No practice / harmful practice / unmanaged risk', bn: '০ - কোনো অনুশীলন নেই / ক্ষতিকর অনুশীলন / অব্যবস্থাপিত ঝুঁকি' } },
    { score: 1, text: { en: '1 - Aware but not yet practicing', bn: '১ - সচেতন কিন্তু এখনও অনুশীলন করা হচ্ছে না' } },
    { score: 2, text: { en: '2 - Practicing sometimes or informally', bn: '২ - মাঝে মাঝে বা অনানুষ্ঠানিকভাবে অনুশীলন করা হচ্ছে' } },
    { score: 3, text: { en: '3 - Practicing regularly', bn: '৩ - নিয়মিত অনুশীলন করা হচ্ছে' } },
    { score: 4, text: { en: '4 - Practicing regularly with proof/records', bn: '৪ - প্রমাণ/রেকর্ড সহ নিয়মিত অনুশীলন করা হচ্ছে' } },
    { score: -1, text: { en: 'N/A - Not applicable', bn: 'প্রযোজ্য নয়' } }
];

export const PROBING_QUESTIONS: ProbingQuestion[] = [
    { id: 'P1', backendTag: 'business_name', type: 'text', text: { en: 'What is the name of your business?', bn: 'আপনার ব্যবসার নাম কি?' } },
    { id: 'P2', backendTag: 'location_division_district', type: 'location', text: { en: 'Where is your business mainly located?', bn: 'আপনার ব্যবসা প্রধানত কোথায় অবস্থিত?' } },
    { id: 'P3', backendTag: 'business_premise_type', type: 'select', text: { en: 'Which option best describes where your business operates?', bn: 'কোন বিকল্পটি আপনার ব্যবসার অবস্থান সবচেয়ে ভালোভাবে বর্ণনা করে?' }, options: [
        { value: 'default', text: { en: 'Select an option...', bn: 'একটি বিকল্প নির্বাচন করুন...' } },
        { value: 'Home-based business', text: { en: 'Home-based business', bn: 'বাড়ি-ভিত্তিক ব্যবসা' } },
        { value: 'Farm or agricultural land', text: { en: 'Farm or agricultural land', bn: 'খামার বা কৃষি জমি' } },
        { value: 'Own shop, factory, or workshop', text: { en: 'Own shop, factory, or workshop', bn: 'নিজস্ব দোকান, কারখানা বা ওয়ার্কশপ' } },
        { value: 'Rented shop, factory, or workshop', text: { en: 'Rented shop, factory, or workshop', bn: 'ভাড়া করা দোকান, কারখানা বা ওয়ার্কশপ' } },
        { value: 'Shared market space or bazaar stall', text: { en: 'Shared market space or bazaar stall', bn: 'শেয়ার করা মার্কেট স্পেস বা বাজারের দোকান' } },
        { value: 'Mobile business / vehicle-based', text: { en: 'Mobile business / vehicle-based', bn: 'মোবাইল ব্যবসা / যানবাহন-ভিত্তিক' } },
        { value: 'Online business with physical stock/storage', text: { en: 'Online business with physical stock/storage', bn: 'ভৌত স্টক/স্টোরেজ সহ অনলাইন ব্যবসা' } },
        { value: 'Other', text: { en: 'Other', bn: 'অন্যান্য' } }
    ]},
    { id: 'P4', backendTag: 'registration_status', type: 'select', text: { en: 'What is the current legal or registration status of your business?', bn: 'আপনার ব্যবসার বর্তমান আইনি বা নিবন্ধন স্থিতি কী?' }, options: [
        { value: 'default', text: { en: 'Select an option...', bn: 'একটি বিকল্প নির্বাচন করুন...' } },
        { value: 'I have a trade licence', text: { en: 'I have a trade licence', bn: 'আমার একটি ট্রেড লাইসেন্স আছে' } },
        { value: 'I have company registration', text: { en: 'I have company registration', bn: 'আমার কোম্পানি নিবন্ধন আছে' } },
        { value: 'I have cooperative/group registration', text: { en: 'I have cooperative/group registration', bn: 'আমার সমবায়/গ্রুপ নিবন্ধন আছে' } },
        { value: 'I have agricultural/farm-related registration', text: { en: 'I have agricultural/farm-related registration', bn: 'আমার কৃষি/খামার সম্পর্কিত নিবন্ধন আছে' } },
        { value: 'I have started the process but it is not complete', text: { en: 'I have started the process but it is not complete', bn: 'আমি প্রক্রিয়া শুরু করেছি কিন্তু এটি সম্পূর্ণ হয়নি' } },
        { value: 'I do not have registration yet', text: { en: 'I do not have registration yet', bn: 'আমার এখনও নিবন্ধন নেই' } },
        { value: 'I am not sure', text: { en: 'I am not sure', bn: 'আমি নিশ্চিত নই' } }
    ]},
    { id: 'P5', backendTag: 'worker_count_band', type: 'select', text: { en: 'How many people usually work in your business, including owner, family workers, temporary workers, and paid workers?', bn: 'মালিক, পরিবারের কর্মী, অস্থায়ী কর্মী এবং বেতনভোগী কর্মী সহ সাধারণত আপনার ব্যবসায় কতজন লোক কাজ করে?' }, options: [
        { value: 'default', text: { en: 'Select an option...', bn: 'একটি বিকল্প নির্বাচন করুন...' } },
        { value: '1 person', text: { en: '1 person', bn: '১ জন' } },
        { value: '2-5 people', text: { en: '2-5 people', bn: '২-৫ জন' } },
        { value: '6-10 people', text: { en: '6-10 people', bn: '৬-১০ জন' } },
        { value: '11-30 people', text: { en: '11-30 people', bn: '১১-৩০ জন' } },
        { value: '31-100 people', text: { en: '31-100 people', bn: '৩১-১০০ জন' } },
        { value: 'More than 100 people', text: { en: 'More than 100 people', bn: '১০০ জনের বেশি' } },
        { value: 'Seasonal / changes a lot', text: { en: 'Seasonal / changes a lot', bn: 'মৌসুমী / অনেক পরিবর্তন হয়' } }
    ]},
    { id: 'P6', backendTag: 'seasonality_profile', type: 'select', text: { en: 'During your busiest season or month, does your business become much larger than usual?', bn: 'আপনার ব্যস্ততম মৌসুমে বা মাসে, আপনার ব্যবসা কি স্বাভাবিকের চেয়ে অনেক বড় হয়ে যায়?' }, dependsOn: (a) => a['P5'] === 'Seasonal / changes a lot', options: [
        { value: 'default', text: { en: 'Select an option...', bn: 'একটি বিকল্প নির্বাচন করুন...' } },
        { value: 'Yes, number of workers increases', text: { en: 'Yes, number of workers increases', bn: 'হ্যাঁ, শ্রমিকের সংখ্যা বৃদ্ধি পায়' } },
        { value: 'Yes, production or sales increases', text: { en: 'Yes, production or sales increases', bn: 'হ্যাঁ, উৎপাদন বা বিক্রয় বৃদ্ধি পায়' } },
        { value: 'Yes, water/fuel/electricity use increases', text: { en: 'Yes, water/fuel/electricity use increases', bn: 'হ্যাঁ, জল/জ্বালানি/বিদ্যুৎ ব্যবহার বৃদ্ধি পায়' } },
        { value: 'Yes, waste increases', text: { en: 'Yes, waste increases', bn: 'হ্যাঁ, বর্জ্য বৃদ্ধি পায়' } },
        { value: 'No major change', text: { en: 'No major change', bn: 'বড় কোনো পরিবর্তন নেই' } },
        { value: 'Not applicable', text: { en: 'Not applicable', bn: 'প্রযোজ্য নয়' } }
    ]},
    { id: 'P7', backendTag: 'monthly_turnover_band', type: 'select', text: { en: 'What is the approximate monthly sales or turnover of your business?', bn: 'আপনার ব্যবসার আনুমানিক মাসিক বিক্রয় বা টার্নওভার কত?' }, options: [
        { value: 'default', text: { en: 'Select an option...', bn: 'একটি বিকল্প নির্বাচন করুন...' } },
        { value: 'Less than BDT 50,000', text: { en: 'Less than BDT 50,000', bn: '৫০,০০০ টাকার কম' } },
        { value: 'BDT 50,000-200,000', text: { en: 'BDT 50,000-200,000', bn: '৫০,০০০ - ২০০,০০০ টাকা' } },
        { value: 'BDT 200,001-500,000', text: { en: 'BDT 200,001-500,000', bn: '২০০,০০১ - ৫০০,০০০ টাকা' } },
        { value: 'BDT 500,001-1,000,000', text: { en: 'BDT 500,001-1,000,000', bn: '৫০০,০০১ - ১,০০০,০০০ টাকা' } },
        { value: 'More than BDT 1,000,000', text: { en: 'More than BDT 1,000,000', bn: '১,০০০,০০০ টাকার বেশি' } },
        { value: 'I prefer not to say', text: { en: 'I prefer not to say', bn: 'আমি বলতে চাই গঠন' } },
        { value: 'I do not know exactly', text: { en: 'I do not know exactly', bn: 'আমি ঠিক জানি না' } }
    ]},
    { id: 'P8', backendTag: 'primary_sector', type: 'select', text: { en: 'Which broad category best describes your business?', bn: 'কোন বিস্তৃত বিভাগটি আপনার ব্যবসাকে সবচেয়ে ভালোভাবে বর্ণনা করে?' }, options: [
        { value: 'default', text: { en: 'Select an option...', bn: 'একটি বিকল্প নির্বাচন করুন...' } },
        { value: 'Agriculture / crop production / nursery', text: { en: 'Agriculture / crop production / nursery', bn: 'কৃষি / ফসল উৎপাদন / নার্সারি' } },
        { value: 'Livestock / dairy / poultry / fisheries', text: { en: 'Livestock / dairy / poultry / fisheries', bn: 'গবাদি পশু / ডেইরি / পোল্ট্রি / মৎস্য' } },
        { value: 'Manufacturing or processing', text: { en: 'Manufacturing or processing', bn: 'উৎপাদন বা প্রক্রিয়াকরণ' } },
        { value: 'Retail or wholesale trading', text: { en: 'Retail or wholesale trading', bn: 'খুচরা বা পাইকারি ট্রেডিং' } },
        { value: 'Food service / restaurant / catering / hotel', text: { en: 'Food service / restaurant / catering / hotel', bn: 'খাদ্য পরিষেবা / রেস্টুরেন্ট / ক্যাটারিং / হোটেল' } },
        { value: 'Transport / logistics / delivery / cold chain', text: { en: 'Transport / logistics / delivery / cold chain', bn: 'পরিবহন / লজিস্টিকস / ডেলিভারি / কোল্ড চেইন' } },
        { value: 'Repair, workshop, light engineering, metal work', text: { en: 'Repair, workshop, light engineering, metal work', bn: 'মেরামত, ওয়ার্কশপ, হালকা প্রকৌশল, ধাতব কাজ' } },
        { value: 'Textile, garments, tailoring, dyeing, washing', text: { en: 'Textile, garments, tailoring, dyeing, washing', bn: 'টেক্সটাইল, পোশাক, দর্জি, ডাইং, ওয়াশিং' } },
        { value: 'Plastic, packaging, printing, recycling', text: { en: 'Plastic, packaging, printing, recycling', bn: 'প্লাস্টিক, প্যাকেজিং, প্রিন্টিং, রিসাইক্লিং' } },
        { value: 'Other service business', text: { en: 'Other service business', bn: 'অন্যান্য পরিষেবা ব্যবসা' } },
        { value: 'Other', text: { en: 'Other', bn: 'অন্যান্য' } }
    ]},
    { id: 'P9', backendTag: 'sub_sector_activity', type: 'select', text: { en: 'What is your main business activity?', bn: 'আপনার প্রধান ব্যবসায়িক কার্যকলাপ কি?' }, dependsOn: (a) => a['P8'] !== undefined && a['P8'] !== 'default', options: (a) => {
        const p8 = a['P8'] as string;
        let opts = [{ value: 'default', text: { en: 'Select an option...', bn: 'একটি বিকল্প নির্বাচন করুন...' } }];
        
        switch (p8) {
            case 'Agriculture / crop production / nursery':
                opts.push(
                    { value: 'Rice farming', text: { en: 'Rice farming', bn: 'ধান চাষ' } },
                    { value: 'Vegetable farming', text: { en: 'Vegetable farming', bn: 'সবজি চাষ' } },
                    { value: 'Fruit farming', text: { en: 'Fruit farming', bn: 'ফল চাষ' } },
                    { value: 'Flower or nursery business', text: { en: 'Flower or nursery business', bn: 'ফুল বা নার্সারি ব্যবসা' } },
                    { value: 'Seedling production', text: { en: 'Seedling production', bn: 'চারা উৎপাদন' } },
                    { value: 'Mixed crop farming', text: { en: 'Mixed crop farming', bn: 'মিশ্র ফসল চাষ' } },
                    { value: 'Other crop/agriculture activity', text: { en: 'Other crop/agriculture activity', bn: 'অন্যান্য ফসল/কৃষি কাজ' } }
                );
                break;
            case 'Livestock / dairy / poultry / fisheries':
                opts.push(
                    { value: 'Dairy farm', text: { en: 'Dairy farm', bn: 'ডেইরি খামার' } },
                    { value: 'Cattle fattening', text: { en: 'Cattle fattening', bn: 'গবাদি পশু মোটাতাজাকরণ' } },
                    { value: 'Goat/sheep rearing', text: { en: 'Goat/sheep rearing', bn: 'ছাগল/ভেড়া পালন' } },
                    { value: 'Poultry farm', text: { en: 'Poultry farm', bn: 'পোল্ট্রি খামার' } },
                    { value: 'Duck farm', text: { en: 'Duck farm', bn: 'হাঁসের খামার' } },
                    { value: 'Fish farming / aquaculture', text: { en: 'Fish farming / aquaculture', bn: 'মাছ চাষ / জলজ চাষ' } },
                    { value: 'Hatchery', text: { en: 'Hatchery', bn: 'হ্যাচারি' } },
                    { value: 'Mixed livestock/fisheries', text: { en: 'Mixed livestock/fisheries', bn: 'মিশ্র গবাদি পশু/মৎস্য' } },
                    { value: 'Other', text: { en: 'Other', bn: 'অন্যান্য' } }
                );
                break;
            case 'Manufacturing or processing':
                opts.push(
                    { value: 'Rice mill / husking', text: { en: 'Rice mill / husking', bn: 'চালের কল / হাস্কিং' } },
                    { value: 'Food processing', text: { en: 'Food processing', bn: 'খাদ্য প্রক্রিয়াকরণ' } },
                    { value: 'Bakery / snacks / sweets production', text: { en: 'Bakery / snacks / sweets production', bn: 'বেকারি / স্ন্যাকস / মিষ্টি উৎপাদন' } },
                    { value: 'Spice grinding / oil processing', text: { en: 'Spice grinding / oil processing', bn: 'মসলা গুঁড়া করা / তেল প্রক্রিয়াকরণ' } },
                    { value: 'Furniture / wood products', text: { en: 'Furniture / wood products', bn: 'আসবাবপত্র / কাঠের পণ্য' } },
                    { value: 'Brick/block/construction material', text: { en: 'Brick/block/construction material', bn: 'ইট/ব্লক/নির্মাণ সামগ্রী' } },
                    { value: 'Small chemical or detergent production', text: { en: 'Small chemical or detergent production', bn: 'ছোট রাসায়নিক বা ডিটারজেন্ট উৎপাদন' } },
                    { value: 'Other manufacturing', text: { en: 'Other manufacturing', bn: 'অন্যান্য উৎপাদন' } }
                );
                break;
            case 'Retail or wholesale trading':
                opts.push(
                    { value: 'Grocery shop', text: { en: 'Grocery shop', bn: 'মুদি দোকান' } },
                    { value: 'Pharmacy', text: { en: 'Pharmacy', bn: 'ফার্মেসি' } },
                    { value: 'Clothing shop', text: { en: 'Clothing shop', bn: 'কাপড়ের দোকান' } },
                    { value: 'Hardware shop', text: { en: 'Hardware shop', bn: 'হার্ডওয়্যারের দোকান' } },
                    { value: 'Electronics shop', text: { en: 'Electronics shop', bn: 'ইলেকট্রনিক্সের দোকান' } },
                    { value: 'Agricultural input shop', text: { en: 'Agricultural input shop', bn: 'কৃষি উপকরণ দোকান' } },
                    { value: 'Wholesale trading', text: { en: 'Wholesale trading', bn: 'পাইকারি ট্রেডিং' } },
                    { value: 'Market stall', text: { en: 'Market stall', bn: 'বাজারের স্টল' } },
                    { value: 'Other retail/trade', text: { en: 'Other retail/trade', bn: 'অন্যান্য খুচরা/ট্রেড' } }
                );
                break;
            case 'Food service / restaurant / catering / hotel':
                opts.push(
                    { value: 'Tea stall / small food stall', text: { en: 'Tea stall / small food stall', bn: 'চায়ের স্টল / ছোট খাবারের স্টল' } },
                    { value: 'Restaurant', text: { en: 'Restaurant', bn: 'রেস্টুরেন্ট' } },
                    { value: 'Catering', text: { en: 'Catering', bn: 'ক্যাটারিং' } },
                    { value: 'Bakery outlet', text: { en: 'Bakery outlet', bn: 'বেকারি আউটলেট' } },
                    { value: 'Hotel / guesthouse', text: { en: 'Hotel / guesthouse', bn: 'হোটেল / গেস্টহাউস' } },
                    { value: 'Street food business', text: { en: 'Street food business', bn: 'রাস্তার খাবারের ব্যবসা' } },
                    { value: 'Other food service', text: { en: 'Other food service', bn: 'অন্যান্য খাদ্য পরিষেবা' } }
                );
                break;
            case 'Transport / logistics / delivery / cold chain':
                opts.push(
                    { value: 'Goods transport', text: { en: 'Goods transport', bn: 'পণ্য পরিবহন' } },
                    { value: 'Passenger transport', text: { en: 'Passenger transport', bn: 'যাত্রী পরিবহন' } },
                    { value: 'Delivery service', text: { en: 'Delivery service', bn: 'ডেলিভারি পরিষেবা' } },
                    { value: 'Cold storage / cold chain', text: { en: 'Cold storage / cold chain', bn: 'কোল্ড স্টোরেজ / কোল্ড চেইন' } },
                    { value: 'Warehouse', text: { en: 'Warehouse', bn: 'গুদাম' } },
                    { value: 'Courier/logistics', text: { en: 'Courier/logistics', bn: 'কুরিয়ার / লজিস্টিক্স' } },
                    { value: 'Other', text: { en: 'Other', bn: 'অন্যান্য' } }
                );
                break;
            case 'Repair, workshop, light engineering, metal work':
                opts.push(
                    { value: 'Welding workshop', text: { en: 'Welding workshop', bn: 'ওয়েল্ডিং ওয়ার্কশপ' } },
                    { value: 'Vehicle repair', text: { en: 'Vehicle repair', bn: 'যানবাহন মেরামত' } },
                    { value: 'Machinery repair', text: { en: 'Machinery repair', bn: 'যন্ত্রপাতি মেরামত' } },
                    { value: 'Metal fabrication', text: { en: 'Metal fabrication', bn: 'ধাতু ফ্যাব্রিকেশন' } },
                    { value: 'Electrical/electronics repair', text: { en: 'Electrical/electronics repair', bn: 'বৈদ্যুতিক/ইলেকট্রনিক্স মেরামত' } },
                    { value: 'Bicycle/rickshaw/three-wheeler repair', text: { en: 'Bicycle/rickshaw/three-wheeler repair', bn: 'সাইকেল/রিকশা/থ্রি-হুইলার মেরামত' } },
                    { value: 'Other workshop', text: { en: 'Other workshop', bn: 'অন্যান্য ওয়ার্কশপ' } }
                );
                break;
            case 'Textile, garments, tailoring, dyeing, washing':
                opts.push(
                    { value: 'Tailoring', text: { en: 'Tailoring', bn: 'টেইলরিং' } },
                    { value: 'Small garment production', text: { en: 'Small garment production', bn: 'ছোট পোশাক উৎপাদন' } },
                    { value: 'Embroidery', text: { en: 'Embroidery', bn: 'এমব্রয়ডারি' } },
                    { value: 'Dyeing', text: { en: 'Dyeing', bn: 'ডাইং' } },
                    { value: 'Washing', text: { en: 'Washing', bn: 'ওয়াশিং' } },
                    { value: 'Printing', text: { en: 'Printing', bn: 'প্রিন্টিং' } },
                    { value: 'Textile waste/recycling', text: { en: 'Textile waste/recycling', bn: 'টেক্সটাইল বর্জ্য/রিসাইক্লিং' } },
                    { value: 'Other textile activity', text: { en: 'Other textile activity', bn: 'অন্যান্য টেক্সটাইল কাজ' } }
                );
                break;
            case 'Plastic, packaging, printing, recycling':
                opts.push(
                    { value: 'Plastic product manufacturing', text: { en: 'Plastic product manufacturing', bn: 'প্লাস্টিক পণ্য উৎপাদন' } },
                    { value: 'Packaging production', text: { en: 'Packaging production', bn: 'প্যাকেজিং উৎপাদন' } },
                    { value: 'Printing press', text: { en: 'Printing press', bn: 'প্রিন্টিং প্রেস' } },
                    { value: 'Recycling / waste collection', text: { en: 'Recycling / waste collection', bn: 'রিসাইক্লিং / বর্জ্য সংগ্রহ' } },
                    { value: 'Paper/cardboard packaging', text: { en: 'Paper/cardboard packaging', bn: 'কাগজ/কার্ডবোর্ড প্যাকেজিং' } },
                    { value: 'Other', text: { en: 'Other', bn: 'অন্যান্য' } }
                );
                break;
            default:
                opts.push({ value: 'Other', text: { en: 'Other', bn: 'অন্যান্য' } });
                break;
        }
        return opts;
    }},
    { id: 'P10', backendTag: 'mixed_business_model', type: 'select', text: { en: 'Does your business do more than one type of activity?', bn: 'আপনার ব্যবসা কি একাধিক ধরনের কাজ করে?' }, dependsOn: (a) => a['P8'] !== undefined && a['P8'] !== 'default', options: [
        { value: 'default', text: { en: 'Select an option...', bn: 'একটি বিকল্প নির্বাচন করুন...' } },
        { value: 'No, only one main activity', text: { en: 'No, only one main activity', bn: 'না, কেবল একটি প্রধান কাজ' } },
        { value: 'Yes, production and sales', text: { en: 'Yes, production and sales', bn: 'হ্যাঁ, উৎপাদন ও বিক্রি' } },
        { value: 'Yes, farming and processing', text: { en: 'Yes, farming and processing', bn: 'হ্যাঁ, কৃষি কাজ ও প্রক্রিয়াজাতকরণ' } },
        { value: 'Yes, trading and transport/delivery', text: { en: 'Yes, trading and transport/delivery', bn: 'হ্যাঁ, ট্রেডিং এবং পরিবহন/ডেলিভারি' } },
        { value: 'Yes, food preparation and retail sales', text: { en: 'Yes, food preparation and retail sales', bn: 'হ্যাঁ, খাবার তৈরি এবং খুচরা বিক্রি' } },
        { value: 'Yes, repair and sales of parts/materials', text: { en: 'Yes, repair and sales of parts/materials', bn: 'হ্যাঁ, মেরামত এবং যন্ত্রাংশ/উপকরণ বিক্রি' } },
        { value: 'Yes, other combination', text: { en: 'Yes, other combination', bn: 'হ্যাঁ, অন্যান্য মিশ্রণ' } }
    ]},
    { id: 'P11', backendTag: 'energy_sources', type: 'checkbox', text: { en: 'Which types of energy or fuel does your business use? (Select all that apply)', bn: 'আপনার ব্যবসা কোন ধরণের জ্বালানি ব্যবহার করে? (প্রযোজ্য সব নির্বাচন করুন)' }, options: [
        { value: 'Grid electricity', text: { en: 'Grid electricity', bn: 'গ্রিড বিদ্যুৎ' } },
        { value: 'Solar electricity', text: { en: 'Solar electricity', bn: 'সৌর বিদ্যুৎ' } },
        { value: 'Diesel', text: { en: 'Diesel', bn: 'ডিজেল' } },
        { value: 'Petrol/octane', text: { en: 'Petrol/octane', bn: 'পেট্রোল/অকটেন' } },
        { value: 'CNG', text: { en: 'CNG', bn: 'সিএনজি' } },
        { value: 'LPG cylinder', text: { en: 'LPG cylinder', bn: 'এলপিজি সিলিন্ডার' } },
        { value: 'Natural gas line', text: { en: 'Natural gas line', bn: 'প্রাকৃতিক গ্যাস লাইন' } },
        { value: 'Firewood', text: { en: 'Firewood', bn: 'জ্বালানি কাঠ' } },
        { value: 'Coal', text: { en: 'Coal', bn: 'কয়লা' } },
        { value: 'Rice husk / biomass', text: { en: 'Rice husk / biomass', bn: 'চালের তুষ / বায়োমাস' } },
        { value: 'Battery / IPS / generator', text: { en: 'Battery / IPS / generator', bn: 'ব্যাটারি / আইপিএস / জেনারেটর' } },
        { value: 'No significant energy use', text: { en: 'No significant energy use', bn: 'কোনো উল্লেখযোগ্য শক্তির ব্যবহার নেই' } },
        { value: 'I do not know', text: { en: 'I do not know', bn: 'আমি জানি না' } }
    ]},
    { id: 'P12', backendTag: 'equipment_intensity', type: 'select', text: { en: 'Does your business use machines, motors, boilers, pumps, ovens, dryers, compressors, refrigerators, freezers, sewing machines, grinders, or vehicles?', bn: 'আপনার ব্যবসা কি মেশিন, মোটর, বয়লার, পাম্প, ওভেন, ড্রায়ার, কম্প্রেসার, রেফ্রিজারেটর, ফ্রিজার, সেলাই মেশিন, গ্রাইন্ডার বা যানবাহন ব্যবহার করে?' }, dependsOn: (a) => {
        if (!a['P8']) return false;
        const p8 = a['P8'] as string;
        const p11 = Array.isArray(a['P11']) ? a['P11'] : [];
        return p8.includes('Manufacturing') || p8.includes('Textile') || p8.includes('Repair') || p11.length > 0;
    }, options: [
        { value: 'default', text: { en: 'Select an option...', bn: 'একটি বিকল্প নির্বাচন করুন...' } },
        { value: 'Yes, many', text: { en: 'Yes, many', bn: 'হ্যাঁ, অনেকগুলো' } },
        { value: 'Yes, a few', text: { en: 'Yes, a few', bn: 'হ্যাঁ, কয়েকটি' } },
        { value: 'Only small equipment', text: { en: 'Only small equipment', bn: 'শুধুমাত্র ছোট সরঞ্জাম' } },
        { value: 'No', text: { en: 'No', bn: 'না' } },
        { value: 'I do not know', text: { en: 'I do not know', bn: 'আমি জানি না' } }
    ]},
    { id: 'P13', backendTag: 'water_use_intensity', type: 'select', text: { en: 'Does your business use water for production, washing, cleaning, irrigation, cooling, cooking, livestock, dyeing, or processing?', bn: 'আপনার ব্যবসা কি উৎপাদন, ধোয়া, পরিষ্কার, সেচ, শীতলকরণ, রান্না, গবাদি পশু, ডাইং বা প্রক্রিয়াকরণের জন্য জল ব্যবহার করে?' }, options: [
        { value: 'default', text: { en: 'Select an option...', bn: 'একটি বিকল্প নির্বাচন করুন...' } },
        { value: 'Yes, large amount', text: { en: 'Yes, large amount', bn: 'হ্যাঁ, প্রচুর পরিমাণে' } },
        { value: 'Yes, moderate amount', text: { en: 'Yes, moderate amount', bn: 'হ্যাঁ, মাঝারি পরিমাণে' } },
        { value: 'Yes, small amount', text: { en: 'Yes, small amount', bn: 'হ্যাঁ, সামান্য পরিমাণে' } },
        { value: 'No significant water use', text: { en: 'No significant water use', bn: 'কোনো উল্লেখযোগ্য জল ব্যবহার নেই' } },
        { value: 'I do not know', text: { en: 'I do not know', bn: 'আমি জানি না' } }
    ]},
    { id: 'P14', backendTag: 'wastewater_disposal_route', type: 'select', text: { en: 'Where does used water or wastewater from your business usually go?', bn: 'আপনার ব্যবসা থেকে ব্যবহৃত জল বা বর্জ্য জল সাধারণত কোথায় যায়?' }, dependsOn: (a) => ['Yes, large amount', 'Yes, moderate amount', 'Yes, small amount'].includes(a['P13'] as string), options: [
        { value: 'default', text: { en: 'Select an option...', bn: 'একটি বিকল্প নির্বাচন করুন...' } },
        { value: 'No wastewater is produced', text: { en: 'No wastewater is produced', bn: 'কোনো বর্জ্য জল উৎপন্ন হয় না' } },
        { value: 'Drain', text: { en: 'Drain', bn: 'ড্রেন' } },
        { value: 'Pond/canal/river/water body', text: { en: 'Pond/canal/river/water body', bn: 'পুকুর/খাল/নদী/জলাশয়' } },
        { value: 'Open land', text: { en: 'Open land', bn: 'খোলা জমি' } },
        { value: 'Septic tank/soak pit', text: { en: 'Septic tank/soak pit', bn: 'সেপটিক ট্যাংক/সোক পিট' } },
        { value: 'Reused for another purpose', text: { en: 'Reused for another purpose', bn: 'অন্য উদ্দেশ্যে পুনরায় ব্যবহৃত' } },
        { value: 'Treated before disposal', text: { en: 'Treated before disposal', bn: 'নিষ্পত্তির আগে শোধন করা হয়' } },
        { value: 'I do not know', text: { en: 'I do not know', bn: 'আমি জানি না' } }
    ]},
    { id: 'P15', backendTag: 'waste_types', type: 'checkbox', text: { en: 'What types of waste does your business produce? (Select all that apply)', bn: 'আপনার ব্যবসা কী ধরণের বর্জ্য তৈরি করে? (প্রযোজ্য সব নির্বাচন করুন)' }, options: [
        { value: 'Food waste', text: { en: 'Food waste', bn: 'খাদ্য বর্জ্য' } },
        { value: 'Crop residue', text: { en: 'Crop residue', bn: 'ফসলের অবশিষ্টাংশ' } },
        { value: 'Manure / dung / poultry litter / fish waste', text: { en: 'Manure / dung / poultry litter / fish waste', bn: 'সার / গোবর / পোল্ট্রি লিটার / মাছের বর্জ্য' } },
        { value: 'Plastic packaging', text: { en: 'Plastic packaging', bn: 'প্লাস্টিকের প্যাকেজিং' } },
        { value: 'Paper/cardboard', text: { en: 'Paper/cardboard', bn: 'কাগজ/কার্ডবোর্ড' } },
        { value: 'Fabric waste', text: { en: 'Fabric waste', bn: 'কাপড়ের বর্জ্য' } },
        { value: 'Metal scrap', text: { en: 'Metal scrap', bn: 'ধাতব বর্জ্য' } },
        { value: 'Wood waste', text: { en: 'Wood waste', bn: 'কাঠের বর্জ্য' } },
        { value: 'Rice husk / bran / ash', text: { en: 'Rice husk / bran / ash', bn: 'চালের তুষ / কুঁড়া / ছাই' } },
        { value: 'Used oil / grease', text: { en: 'Used oil / grease', bn: 'ব্যবহৃত তেল / গ্রীস' } },
        { value: 'Chemical containers', text: { en: 'Chemical containers', bn: 'রাসায়নিক পাত্র' } },
        { value: 'Pesticide/fertilizer packets or bottles', text: { en: 'Pesticide/fertilizer packets or bottles', bn: 'কীটনাশক/সারের প্যাকেট বা বোতল' } },
        { value: 'Expired/spoiled products', text: { en: 'Expired/spoiled products', bn: 'মেয়াদোত্তীর্ণ/নষ্ট পণ্য' } },
        { value: 'Medical/veterinary waste', text: { en: 'Medical/veterinary waste', bn: 'মেডিকেল/ভেটেরিনারি বর্জ্য' } },
        { value: 'Wastewater sludge', text: { en: 'Wastewater sludge', bn: 'বর্জ্য জলের কাদা' } },
        { value: 'General mixed waste', text: { en: 'General mixed waste', bn: 'সাধারণ মিশ্র বর্জ্য' } },
        { value: 'Very little waste', text: { en: 'Very little waste', bn: 'খুব সামান্য বর্জ্য' } },
        { value: 'I do not know', text: { en: 'I do not know', bn: 'আমি জানি না' } }
    ]},
    { id: 'P16', backendTag: 'waste_handling_method', type: 'select', text: { en: 'How is most of your waste currently handled?', bn: 'বর্তমানে আপনার বেশিরভাগ বর্জ্য কীভাবে পরিচালনা করা হয়?' }, dependsOn: (a) => {
        const waste = a['P15'] as string[] || [];
        return waste.length > 0 && !waste.includes('Very little waste') && !waste.includes('I do not know');
    }, options: [
        { value: 'default', text: { en: 'Select an option...', bn: 'একটি বিকল্প নির্বাচন করুন...' } },
        { value: 'Collected by municipal/local waste collector', text: { en: 'Collected by municipal/local waste collector', bn: 'পৌরসভা/স্থানীয় বর্জ্য সংগ্রহকারী দ্বারা সংগৃহীত' } },
        { value: 'Sold to recycler or scrap buyer', text: { en: 'Sold to recycler or scrap buyer', bn: 'রিসাইক্লার বা ভাঙারি ক্রেতার কাছে বিক্রি করা হয়' } },
        { value: 'Reused in the business', text: { en: 'Reused in the business', bn: 'ব্যাবসায় আবার ব্যবহার করা হয়' } },
        { value: 'Given to farmers/animal feed/composting', text: { en: 'Given to farmers/animal feed/composting', bn: 'কৃষক/পশুখাদ্য/কম্পোস্টিং-এর জন্য দেওয়া হয়' } },
        { value: 'Burned', text: { en: 'Burned', bn: 'পোড়ানো হয়' } },
        { value: 'Thrown in open place', text: { en: 'Thrown in open place', bn: 'খোলা জায়গায় ফেলা হয়' } },
        { value: 'Disposed in drain/canal/pond/river', text: { en: 'Disposed in drain/canal/pond/river', bn: 'ড্রেন/খাল/পুকুর/নদীতে ফেলা হয়' } },
        { value: 'Mixed with household waste', text: { en: 'Mixed with household waste', bn: 'গৃহস্থালির বর্জ্যের সাথে মেশানো হয়' } },
        { value: 'Other', text: { en: 'Other', bn: 'অন্যান্য' } },
        { value: 'I do not know', text: { en: 'I do not know', bn: 'আমি জানি না' } }
    ]},
    { id: 'P17', backendTag: 'local_pollution_nuisance', type: 'select', text: { en: 'Does your business create smoke, dust, bad smell, chemical smell, noise, heat, wastewater, or flies/mosquitoes that may affect workers, neighbours, customers, animals, crops, drains, ponds, or canals?', bn: 'আপনার ব্যবসা কি ধোঁয়া, ধুলো, দুর্গন্ধ, রাসায়নিক গন্ধ, শব্দ, তাপ, বর্জ্য জল বা মাছি/মশা তৈরি করে যা সম্ভাব্য কর্মী, প্রতিবেশী, বা পরিবেশের ক্ষতি করতে পারে?' }, options: [
        { value: 'default', text: { en: 'Select an option...', bn: 'একটি বিকল্প নির্বাচন করুন...' } },
        { value: 'Yes, often', text: { en: 'Yes, often', bn: 'হ্যাঁ, প্রায়ই' } },
        { value: 'Sometimes', text: { en: 'Sometimes', bn: 'মাঝেমধ্যে' } },
        { value: 'Rarely', text: { en: 'Rarely', bn: 'খুব কমই' } },
        { value: 'No', text: { en: 'No', bn: 'না' } },
        { value: 'I am not sure', text: { en: 'I am not sure', bn: 'আমি নিশ্চিত নই' } }
    ]},
    { id: 'P18', backendTag: 'chemical_input_types', type: 'checkbox', text: { en: 'Does your business use any of the following materials or chemicals?', bn: 'আপনার ব্যবসা কি নিম্নলিখিত কোনো উপকরণ বা রাসায়নিক ব্যবহার করে?' }, options: [
        { value: 'Fertilizer', text: { en: 'Fertilizer', bn: 'সার' } },
        { value: 'Pesticide / insecticide / herbicide', text: { en: 'Pesticide / insecticide / herbicide', bn: 'কীটনাশক / আগাছানাশক' } },
        { value: 'Veterinary medicine', text: { en: 'Veterinary medicine', bn: 'ভেটেরিনারি ওষুধ' } },
        { value: 'Detergent or cleaning chemical', text: { en: 'Detergent or cleaning chemical', bn: 'ডিটারজেন্ট বা পরিষ্কার করার রাসায়নিক' } },
        { value: 'Dye / colour / printing chemical', text: { en: 'Dye / colour / printing chemical', bn: 'রং / ছাপার রাসায়নিক' } },
        { value: 'Solvent / thinner / paint', text: { en: 'Solvent / thinner / paint', bn: 'দ্রাবক / থিনার / রং' } },
        { value: 'Lubricating oil / engine oil / grease', text: { en: 'Lubricating oil / engine oil / grease', bn: 'লুব্রিকেটিং তেল / ইঞ্জিন তেল / গ্রিজ' } },
        { value: 'Acid / alkali / bleaching agent', text: { en: 'Acid / alkali / bleaching agent', bn: 'এসিড / ক্ষার / ব্লিচিং এজেন্ট' } },
        { value: 'Plastic resin or packaging material', text: { en: 'Plastic resin or packaging material', bn: 'প্লাস্টিক রেজিন বা প্যাকেজিং সামগ্রী' } },
        { value: 'Fuel stored on site', text: { en: 'Fuel stored on site', bn: 'সাইটে রাখা জ্বালানি' } },
        { value: 'None of these', text: { en: 'None of these', bn: 'এগুলোর কোনটি নয়' } },
        { value: 'I do not know', text: { en: 'I do not know', bn: 'আমি জানি না' } }
    ]},
    { id: 'P19', backendTag: 'safe_storage_initial', type: 'select', text: { en: 'Are chemicals, fuel, oil, pesticides, fertilizer, or cleaning products stored separately and safely?', bn: 'রাসায়নিক উপাদান, জ্বালানি, তেল, কীটনাশক, সার বা পরিষ্কার করার পণ্য কি আলাদাভাবে এবং নিরাপদে সংরক্ষণ করা হয়?' }, dependsOn: (a) => {
        const mats = a['P18'] as string[] || [];
        return mats.length > 0 && !mats.includes('None of these') && !mats.includes('I do not know');
    }, options: [
        { value: 'default', text: { en: 'Select an option...', bn: 'একটি বিকল্প নির্বাচন করুন...' } },
        { value: 'Yes, always', text: { en: 'Yes, always', bn: 'হ্যাঁ, সর্বদা' } },
        { value: 'Sometimes', text: { en: 'Sometimes', bn: 'মাঝে মাঝে' } },
        { value: 'No', text: { en: 'No', bn: 'না' } },
        { value: 'Not applicable', text: { en: 'Not applicable', bn: 'প্রযোজ্য নয়' } },
        { value: 'I do not know', text: { en: 'I do not know', bn: 'আমি জানি না' } }
    ]},
    { id: 'P20', backendTag: 'recordkeeping_types', type: 'checkbox', text: { en: 'Do you keep any records related to your business operations? (Select all that apply)', bn: 'আপনি কি ব্যবসার কোনো রেকর্ড বা হিসাব রাখেন? (প্রযোজ্য সব নির্বাচন করুন)' }, options: [
        { value: 'Sales records', text: { en: 'Sales records', bn: 'বিক্রয় রেকর্ড' } },
        { value: 'Purchase records', text: { en: 'Purchase records', bn: 'ক্রয় রেকর্ড' } },
        { value: 'Electricity bills', text: { en: 'Electricity bills', bn: 'বিদ্যুৎ বিল' } },
        { value: 'Fuel cost records', text: { en: 'Fuel cost records', bn: 'জ্বালানি খরচের রেকর্ড' } },
        { value: 'Water bills or water-use records', text: { en: 'Water bills or water-use records', bn: 'জলের বিল বা পানি ব্যবহারের রেকর্ড' } },
        { value: 'Production records', text: { en: 'Production records', bn: 'উৎপাদন রেকর্ড' } },
        { value: 'Waste sale/recycling records', text: { en: 'Waste sale/recycling records', bn: 'বর্জ্য বিক্রয়/রিসাইক্লিং রেকর্ড' } },
        { value: 'Fertilizer/pesticide records', text: { en: 'Fertilizer/pesticide records', bn: 'সার/কীটনাশক রেকর্ড' } },
        { value: 'Feed/medicine records', text: { en: 'Feed/medicine records', bn: 'খাদ্য/ওষুধ রেকর্ড' } },
        { value: 'Equipment repair/maintenance records', text: { en: 'Equipment repair/maintenance records', bn: 'সরঞ্জাম মেরামত/রক্ষণাবেক্ষণের রেকর্ড' } },
        { value: 'Worker attendance/payment records', text: { en: 'Worker attendance/payment records', bn: 'কর্মীর উপস্থিতি/পেমেন্ট রেকর্ড' } },
        { value: 'Photos of improvements', text: { en: 'Photos of improvements', bn: 'উন্নতির ছবি' } },
        { value: 'No records', text: { en: 'No records', bn: 'কোনো রেকর্ড নেই' } },
        { value: 'I keep records in memory only', text: { en: 'I keep records in memory only', bn: 'আমি কেবল স্মৃতিতে রেকর্ড রাখি' } }
    ]},
    { id: 'P21', backendTag: 'green_decision_maker', type: 'select', text: { en: 'Who usually makes decisions about reducing waste, saving electricity/fuel, saving water, or improving the workplace?', bn: 'বর্জ্য কমানো, বিদ্যুৎ/জ্বালানি বাঁচানো ইত্যাদির বিষয়ে সাধারণত কে সিদ্ধান্ত নেন?' }, options: [
        { value: 'default', text: { en: 'Select an option...', bn: 'একটি বিকল্প নির্বাচন করুন...' } },
        { value: 'Owner only', text: { en: 'Owner only', bn: 'শুধুমাত্র মালিক' } },
        { value: 'Owner and family members', text: { en: 'Owner and family members', bn: 'মালিক ও পরিবারের সদস্যরা' } },
        { value: 'Manager/supervisor', text: { en: 'Manager/supervisor', bn: 'ম্যানেজার/তত্ত্বাবধায়ক' } },
        { value: 'Workers together', text: { en: 'Workers together', bn: 'কর্মীরা একসঙ্গে' } },
        { value: 'Landlord/market committee', text: { en: 'Landlord/market committee', bn: 'বাড়িওয়ালা/মার্কেট কমিটি' } },
        { value: 'No one specifically', text: { en: 'No one specifically', bn: 'নির্দিষ্ট কেউ নেই' } },
        { value: 'Not applicable', text: { en: 'Not applicable', bn: 'প্রযোজ্য নয়' } }
    ]},
    { id: 'P22', backendTag: 'recent_green_improvement', type: 'select', text: { en: 'Have you made any improvement in the last 12 months to reduce cost, waste, pollution, water use, fuel use, or electricity use?', bn: 'খরচ, বর্জ্য, দূষণ, জলের ব্যবহার, জ্বালানি ব্যবহার বা বিদ্যুতের ব্যবহার কমাতে গত ১২ মাসে আপনি কি কোনো উন্নতি করেছেন?' }, dependsOn: (a) => {
        const p21 = a['P21'] as string;
        return !!p21 && p21 !== 'default' && p21 !== 'Not applicable' && p21 !== 'No one specifically';
    }, options: [
        { value: 'default', text: { en: 'Select an option...', bn: 'একটি বিকল্প নির্বাচন করুন...' } },
        { value: 'Yes, several improvements', text: { en: 'Yes, several improvements', bn: 'হ্যাঁ, বেশ কয়েকটি উন্নতি করেছি' } },
        { value: 'Yes, one or two improvements', text: { en: 'Yes, one or two improvements', bn: 'হ্যাঁ, এক বা দুটি উন্নতি করেছি' } },
        { value: 'Planned but not yet done', text: { en: 'Planned but not yet done', bn: 'পরিকল্পনা করেছি, কিন্তু এখনও করা হয়নি' } },
        { value: 'No', text: { en: 'No', bn: 'না' } },
        { value: 'I do not know', text: { en: 'I do not know', bn: 'আমি জানি না' } }
    ]},
    { id: 'P23', backendTag: 'finance_interest_timeline', type: 'select', text: { en: 'Are you interested in receiving finance, loan, grant, subsidy, or supplier credit for improving your business?', bn: 'আপনি কি আপনার ব্যবসার উন্নতির জন্য অর্থায়ন, ঋণ, অনুদান, ভর্তুকি নিতে আগ্রহী?' }, options: [
        { value: 'default', text: { en: 'Select an option...', bn: 'একটি বিকল্প নির্বাচন করুন...' } },
        { value: 'Yes, within 6 months', text: { en: 'Yes, within 6 months', bn: 'হ্যাঁ, ৬ মাসের মধ্যে' } },
        { value: 'Yes, within 1 year', text: { en: 'Yes, within 1 year', bn: 'হ্যাঁ, ১ বছরের মধ্যে' } },
        { value: 'Maybe later', text: { en: 'Maybe later', bn: 'হয়তো পরে' } },
        { value: 'No, not now', text: { en: 'No, not now', bn: 'না, এখন নয়' } },
        { value: 'I do not know', text: { en: 'I do not know', bn: 'আমি জানি না' } }
    ]},
    { id: 'P24', backendTag: 'green_finance_interest_area', type: 'checkbox', text: { en: 'What type of green improvement would you be most interested in financing? (Select up to three)', bn: 'কোন ধরণের সবুজ উন্নতির জন্য আপনি অর্থায়ন পেতে সবচেয়ে বেশি আগ্রহী? (সর্বোচ্চ তিনটি নির্বাচন করুন)' }, dependsOn: (a) => {
        const p23 = a['P23'] as string;
        return p23 === 'Yes, within 6 months' || p23 === 'Yes, within 1 year' || p23 === 'Maybe later';
    }, options: [
        { value: 'Solar energy', text: { en: 'Solar energy', bn: 'সৌর শক্তি' } },
        { value: 'Efficient machinery or motors', text: { en: 'Efficient machinery or motors', bn: 'দক্ষ যন্ত্রপাতি বা মোটর' } },
        { value: 'Efficient lights/fans/refrigerators', text: { en: 'Efficient lights/fans/refrigerators', bn: 'দক্ষ লাইট/ফ্যান/রেফ্রিজারেটর' } },
        { value: 'Cleaner cooking, boiler, dryer, or heating system', text: { en: 'Cleaner cooking, boiler, dryer, or heating system', bn: 'পরিচ্ছন্ন রান্না, বয়লার, ড্রায়ার বা হিটিং ব্যবস্থা' } },
        { value: 'Waste management or composting', text: { en: 'Waste management or composting', bn: 'বর্জ্য ব্যবস্থাপনা বা কম্পোস্টিং' } },
        { value: 'Manure management / biogas', text: { en: 'Manure management / biogas', bn: 'সার ব্যবস্থাপনা / বায়োগ্যাস' } },
        { value: 'Water-saving system', text: { en: 'Water-saving system', bn: 'জলের সাশ্রয় ব্যবস্থা' } },
        { value: 'Wastewater treatment or safe drainage', text: { en: 'Wastewater treatment or safe drainage', bn: 'বর্জ্য জল শোধন বা নিরাপদ নিষ্কাশন' } },
        { value: 'Safe chemical storage', text: { en: 'Safe chemical storage', bn: 'নিরাপদ রাসায়নিক সংরক্ষণ' } },
        { value: 'Cleaner transport or fuel saving', text: { en: 'Cleaner transport or fuel saving', bn: 'পরিচ্ছন্ন পরিবহন বা জ্বালানি সাশ্রয়' } },
        { value: 'Building improvement, ventilation, insulation, cooling', text: { en: 'Building improvement, ventilation, insulation, cooling', bn: 'ভবন উন্নতি, বায়ুচলাচল, নিরোধক, শীতলীকরণ' } },
        { value: 'Certification or audit support', text: { en: 'Certification or audit support', bn: 'সাক্ষ্যপত্র বা অডিট সহায়তা' } },
        { value: 'I am not sure', text: { en: 'I am not sure', bn: 'আমি নিশ্চিত নই' } }
    ]},
    { id: 'P25', backendTag: 'available_evidence_types', type: 'checkbox', text: { en: 'If a bank, NGO, donor project, or buyer asked for proof of green practices, what could you show?', bn: 'যদি কোনো ব্যাংক, এনজিও, দাতা প্রকল্প, বা ক্রেতা সবুজ অনুশীলনের প্রমাণ চায়, তবে আপনি কী দেখাতে পারবেন?' }, dependsOn: (a) => {
        const p23 = a['P23'] as string;
        return p23 === 'Yes, within 6 months' || p23 === 'Yes, within 1 year' || p23 === 'Maybe later';
    }, options: [
        { value: 'Photos', text: { en: 'Photos', bn: 'ছবি' } },
        { value: 'Electricity bills', text: { en: 'Electricity bills', bn: 'বিদ্যুৎ বিল' } },
        { value: 'Fuel records', text: { en: 'Fuel records', bn: 'জ্বালানি রেকর্ড' } },
        { value: 'Purchase receipts', text: { en: 'Purchase receipts', bn: 'ক্রয় রসিদ' } },
        { value: 'Sales records', text: { en: 'Sales records', bn: 'বিক্রয় রেকর্ড' } },
        { value: 'Waste sale receipts', text: { en: 'Waste sale receipts', bn: 'বর্জ্য বিক্রয়ের রসিদ' } },
        { value: 'Maintenance records', text: { en: 'Maintenance records', bn: 'রক্ষণাবেক্ষণের রেকর্ড' } },
        { value: 'Farm/input records', text: { en: 'Farm/input records', bn: 'খামার/উপকরণ রেকর্ড' } },
        { value: 'Training certificate', text: { en: 'Training certificate', bn: 'পশিক্ষণ সনদ' } },
        { value: 'Trade licence/registration', text: { en: 'Trade licence/registration', bn: 'ট্রেড লাইসেন্স/নিবন্ধন' } },
        { value: 'Buyer/supplier documents', text: { en: 'Buyer/supplier documents', bn: 'ক্রেতা/সরবরাহকারীর নথিপত্র' } },
        { value: 'Nothing yet', text: { en: 'Nothing yet', bn: 'এখনো কিছু নেই' } },
        { value: 'I do not know', text: { en: 'I do not know', bn: 'আমি জানি না' } }
    ]},
    { id: 'P26', backendTag: 'certification_interest', type: 'select', text: { en: 'Are you interested in any certification, recognition, buyer compliance, or green label in the future?', bn: 'আপনি কি ভবিষ্যতে কোনো সার্টিফিকেশন, স্বীকৃতি, বা গ্রীন লেবেলে আগ্রহী?' }, options: [
        { value: 'default', text: { en: 'Select an option...', bn: 'একটি বিকল্প নির্বাচন করুন...' } },
        { value: 'Yes, definitely', text: { en: 'Yes, definitely', bn: 'হ্যাঁ, অবশ্যই' } },
        { value: 'Maybe, if it helps my business', text: { en: 'Maybe, if it helps my business', bn: 'হয়তো, যদি এটি আমার ব্যবসাকে সাহায্য করে' } },
        { value: 'No, not interested', text: { en: 'No, not interested', bn: 'না, আগ্রহী নই' } },
        { value: 'I do not know what certification means', text: { en: 'I do not know what certification means', bn: 'আমি জানি না সার্টিফিকেশনের মানে কী' } }
    ]},
    { id: 'P27', backendTag: 'preferred_certification_pathway', type: 'checkbox', text: { en: 'Which type of recognition or certification would be most useful for your business?', bn: 'কোন ধরণের স্বীকৃতি বা সার্টিফিকেশন আপনার ব্যবসার জন্য সবচেয়ে কার্যকর হবে?' }, dependsOn: (a) => {
        const p26 = a['P26'] as string;
        return p26 === 'Yes, definitely' || p26 === 'Maybe, if it helps my business';
    }, options: [
        { value: 'Green business recognition', text: { en: 'Green business recognition', bn: 'সবুজ ব্যবসার স্বীকৃতি' } },
        { value: 'ISO 14001-style environmental management readiness', text: { en: 'ISO 14001-style environmental management readiness', bn: 'ISO 14001-স্টাইলের পরিবেশ ব্যবস্থাপনার প্রস্তুতি' } },
        { value: 'Organic or safe food/agriculture certification', text: { en: 'Organic or safe food/agriculture certification', bn: 'অর্গানিক বা নিরাপদ খাদ্য/কৃষি সার্টিফিকেশন' } },
        { value: 'Textile/garment buyer compliance or sustainability readiness', text: { en: 'Textile/garment buyer compliance or sustainability readiness', bn: 'টেক্সটাইল/গার্মেন্টস ক্রেতার কমপ্লায়েন্স বা সাসটেইনেবিলিটি প্রস্তুতি' } },
        { value: 'LEED/EDGE-style green building or facility improvement readiness', text: { en: 'LEED/EDGE-style green building or facility improvement readiness', bn: 'LEED/EDGE-স্টাইলের সবুজ ভবন বা কারখানার উন্নতির প্রস্তুতি' } },
        { value: 'Recycled product or circular economy certification', text: { en: 'Recycled product or circular economy certification', bn: 'রিসাইকেল করা পণ্য বা সার্কুলার অর্থনীতি সার্টিফিকেশন' } },
        { value: 'Food safety certification', text: { en: 'Food safety certification', bn: 'খাদ্য নিরাপত্তা সার্টিফিকেশন' } },
        { value: 'Buyer/export compliance', text: { en: 'Buyer/export compliance', bn: 'ক্রেতা/রপ্তানি কমপ্লায়েন্স' } },
        { value: 'I am not sure', text: { en: 'I am not sure', bn: 'আমি নিশ্চিত নই' } }
    ]},
    { id: 'P28', backendTag: 'assessment_consent', type: 'select', text: { en: 'Are you willing to receive a green score and recommendations based on your answers?', bn: 'আপনি কি আপনার উত্তরের উপর ভিত্তি করে একটি সবুজ স্কোর এবং সুপারিশ পেতে ইচ্ছুক?' }, options: [
        { value: 'default', text: { en: 'Select an option...', bn: 'একটি বিকল্প নির্বাচন করুন...' } },
        { value: 'Yes', text: { en: 'Yes', bn: 'হ্যাঁ' } },
        { value: 'No', text: { en: 'No', bn: 'না' } }
    ]},
    { id: 'P29', backendTag: 'evidence_sharing_willingness', type: 'select', text: { en: 'Are you willing to share photos, bills, receipts, or other documents later to improve the accuracy of your green score?', bn: 'আপনার সবুজ স্কোরের সঠিকতা উন্নত করতে আপনি কি ছবি, বিল, রশিদ বা অন্যান্য নথিপত্র শেয়ার করতে ইচ্ছুক?' }, dependsOn: (a) => a['P28'] === 'Yes', options: [
        { value: 'default', text: { en: 'Select an option...', bn: 'একটি বিকল্প নির্বাচন করুন...' } },
        { value: 'Yes', text: { en: 'Yes', bn: 'হ্যাঁ' } },
        { value: 'Maybe later', text: { en: 'Maybe later', bn: 'হয়তো পরে' } },
        { value: 'No', text: { en: 'No', bn: 'না' } }
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
    { name: { en: 'SME Foundation', bn: 'এসএমই ফাউন্ডেশন' }, contact: 'Helpline: 16223, www.smef.gov.bd - Provides training and capacity building for SMEs' },
    { name: { en: 'BGMEA Sustainability Team', bn: 'বিজিএমইএ টেকসই দল' }, contact: 'For garment factories (www.bgmea.com.bd)' },
    { name: { en: 'IDCOL (Infrastructure Development Company Limited)', bn: 'ইডকল' }, contact: 'For solar & green financing (www.idcol.org)' },
    { name: { en: 'BIBM (Bangladesh Institute of Bank Management)', bn: 'বিআইবিএম (গ্রিন ব্যাংকিং প্রশিক্ষণ)' }, contact: 'Sustainability training for bankers & SMEs (www.bibm.org.bd)' },
    { name: { en: 'BITAC (Industrial Training)', bn: 'বিটাক (শিল্প প্রশিক্ষণ)' }, contact: 'Technical & sustainable manufacturing training (www.bitac.gov.bd)' },
    { name: { en: 'GIZ Bangladesh', bn: 'জিআইজেড বাংলাদেশ' }, contact: 'Sustainable energy & resource efficiency training (www.giz.de)' },
    { name: { en: 'Practical Action (Green Tech)', bn: 'প্রাকটিক্যাল অ্যাকশন (গ্রিন টেক)' }, contact: 'Technology for sustainable development (bd.practicalaction.org)' },
    { name: { en: 'Bangladesh Cleaner Production Centre (BCPC)', bn: 'বাংলাদেশ ক্লিনার প্রোডাকশন সেন্টার' }, contact: 'Training on resource efficiency and cleaner production (www.bdcleanerproduction.org)' },
    { name: { en: 'SCITI (Small and Cottage Industries Training Institute)', bn: 'ক্ষুদ্র ও কুটির শিল্প প্রশিক্ষণ ইনস্টিটিউট' }, contact: 'Provides various training programs for SME entrepreneurs (Under BSCIC - www.bscic.gov.bd)' },
    { name: { en: 'Department of Environment (DoE)', bn: 'পরিবেশ অধিদপ্তর' }, contact: 'Guidelines and workshops on environmental compliance (www.doe.gov.bd)' }
];
