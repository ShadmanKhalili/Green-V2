import { ProbingAnswers } from '../../types';

// =============================================================================
// Sector identifiers — exact P8 values from constants.ts
// =============================================================================
export const SECTOR_AGRICULTURE = 'Agriculture / crop production / nursery';
export const SECTOR_LIVESTOCK = 'Livestock / dairy / poultry / fisheries';
export const SECTOR_MANUFACTURING = 'Manufacturing or processing';
export const SECTOR_RETAIL = 'Retail or wholesale trading';
export const SECTOR_FOODSERVICE = 'Food service / restaurant / catering / hotel';
export const SECTOR_TRANSPORT = 'Transport / logistics / delivery / cold chain';
export const SECTOR_REPAIR = 'Repair, workshop, light engineering, metal work';
export const SECTOR_TEXTILE = 'Textile, garments, tailoring, dyeing, washing';
export const SECTOR_PLASTIC = 'Plastic, packaging, printing, recycling';

// =============================================================================
// Universal predicates
// =============================================================================
export const askAll = (): boolean => true;

// --- P8/P9 sector matching ---
export const sectorIs = (a: ProbingAnswers, ...sectors: string[]): boolean => {
  const p8 = a['P8'] as string | undefined;
  return !!p8 && sectors.includes(p8);
};

export const subSectorIs = (a: ProbingAnswers, ...subs: string[]): boolean => {
  const p9 = a['P9'] as string | undefined;
  return !!p9 && subs.includes(p9);
};

// --- P3 facility/premise ---
export const hasFacility = (a: ProbingAnswers): boolean => {
  const p3 = a['P3'] as string | undefined;
  return !!p3 && p3 !== 'default' && p3 !== 'Mobile business / vehicle-based';
};

export const isRented = (a: ProbingAnswers): boolean => {
  const p3 = a['P3'] as string | undefined;
  return p3 === 'Rented shop, factory, or workshop' || p3 === 'Shared market space or bazaar stall';
};

// --- P5 worker count ---
export const hasWorkers = (a: ProbingAnswers): boolean => {
  const p5 = a['P5'] as string | undefined;
  return !!p5 && p5 !== 'default' && p5 !== '1 person';
};

// --- P11 energy sources ---
export const usesEnergy = (a: ProbingAnswers): boolean => {
  const p11 = (a['P11'] as string[]) || [];
  return p11.length > 0 && !p11.includes('No significant energy use') && !p11.includes('I do not know');
};

export const usesAnyFuel = (a: ProbingAnswers, ...fuels: string[]): boolean => {
  const p11 = (a['P11'] as string[]) || [];
  return fuels.some(f => p11.includes(f));
};

export const usesGridElectricity = (a: ProbingAnswers): boolean => {
  const p11 = (a['P11'] as string[]) || [];
  return p11.includes('Grid electricity');
};

export const usesSolar = (a: ProbingAnswers): boolean => {
  const p11 = (a['P11'] as string[]) || [];
  return p11.includes('Solar electricity');
};

export const usesGenerator = (a: ProbingAnswers): boolean => {
  const p11 = (a['P11'] as string[]) || [];
  return p11.some(e => ['Diesel', 'Petrol/octane', 'Battery / IPS / generator'].includes(e));
};

export const usesBiomass = (a: ProbingAnswers): boolean => {
  const p11 = (a['P11'] as string[]) || [];
  return p11.some(e => ['Firewood', 'Coal', 'Rice husk / biomass'].includes(e));
};

export const usesCookingFuel = (a: ProbingAnswers): boolean => {
  const p11 = (a['P11'] as string[]) || [];
  return p11.some(e => ['LPG cylinder', 'Natural gas line', 'Firewood', 'Coal', 'Rice husk / biomass'].includes(e));
};

export const usesLiquidFuel = (a: ProbingAnswers): boolean => {
  const p11 = (a['P11'] as string[]) || [];
  return p11.some(e => ['Diesel', 'Petrol/octane', 'CNG', 'LPG cylinder', 'Natural gas line'].includes(e));
};

// --- P12 equipment intensity ---
export const hasMachinery = (a: ProbingAnswers): boolean => {
  const p12 = a['P12'] as string | undefined;
  return p12 === 'Yes, many' || p12 === 'Yes, a few' || p12 === 'Only small equipment';
};

export const hasIntenseMachinery = (a: ProbingAnswers): boolean => {
  const p12 = a['P12'] as string | undefined;
  return p12 === 'Yes, many' || p12 === 'Yes, a few';
};

// --- P13 water use ---
export const usesWater = (a: ProbingAnswers): boolean => {
  const p13 = a['P13'] as string | undefined;
  return p13 === 'Yes, large amount' || p13 === 'Yes, moderate amount' || p13 === 'Yes, small amount';
};

export const usesSignificantWater = (a: ProbingAnswers): boolean => {
  const p13 = a['P13'] as string | undefined;
  return p13 === 'Yes, large amount' || p13 === 'Yes, moderate amount';
};

// --- P14 wastewater route ---
export const hasWastewater = (a: ProbingAnswers): boolean => {
  const p14 = a['P14'] as string | undefined;
  return !!p14 && p14 !== 'default' && p14 !== 'No wastewater is produced' && p14 !== 'I do not know';
};

export const hasUnsafeWastewater = (a: ProbingAnswers): boolean => {
  const p14 = a['P14'] as string | undefined;
  return p14 === 'Drain' || p14 === 'Pond/canal/river/water body' || p14 === 'Open land';
};

export const usesSepticOrSoak = (a: ProbingAnswers): boolean => {
  const p14 = a['P14'] as string | undefined;
  return p14 === 'Septic tank/soak pit';
};

// --- P15 waste types ---
export const hasWaste = (a: ProbingAnswers): boolean => {
  const p15 = (a['P15'] as string[]) || [];
  return p15.length > 0 && !p15.includes('Very little waste') && !p15.includes('I do not know');
};

export const producesWasteOfType = (a: ProbingAnswers, ...types: string[]): boolean => {
  const p15 = (a['P15'] as string[]) || [];
  return types.some(t => p15.includes(t));
};

export const hasHazardousWaste = (a: ProbingAnswers): boolean => {
  const p15 = (a['P15'] as string[]) || [];
  return ['Used oil / grease', 'Chemical containers', 'Pesticide/fertilizer packets or bottles', 'Medical/veterinary waste', 'Wastewater sludge'].some(t => p15.includes(t));
};

export const hasManureOrLitter = (a: ProbingAnswers): boolean => {
  return producesWasteOfType(a, 'Manure / dung / poultry litter / fish waste');
};

export const hasRecyclableWaste = (a: ProbingAnswers): boolean => {
  return producesWasteOfType(a, 'Plastic packaging', 'Paper/cardboard', 'Fabric waste', 'Metal scrap', 'Wood waste');
};

// --- P16 waste handling ---
export const hasUnsafeWasteHandling = (a: ProbingAnswers): boolean => {
  const p16 = a['P16'] as string | undefined;
  return p16 === 'Burned' || p16 === 'Thrown in open place' || p16 === 'Disposed in drain/canal/pond/river';
};

// --- P17 nuisance/community impact ---
export const causesNuisance = (a: ProbingAnswers): boolean => {
  const p17 = a['P17'] as string | undefined;
  return p17 === 'Yes, often' || p17 === 'Sometimes';
};

// --- P18 chemicals/inputs ---
export const usesChemicals = (a: ProbingAnswers): boolean => {
  const p18 = (a['P18'] as string[]) || [];
  return p18.length > 0 && !p18.includes('None of these') && !p18.includes('I do not know');
};

export const usesChemicalOfType = (a: ProbingAnswers, ...types: string[]): boolean => {
  const p18 = (a['P18'] as string[]) || [];
  return types.some(t => p18.includes(t));
};

export const usesPesticideOrFertilizer = (a: ProbingAnswers): boolean => {
  return usesChemicalOfType(a, 'Fertilizer', 'Pesticide / insecticide / herbicide');
};

export const usesVeterinaryMedicine = (a: ProbingAnswers): boolean => {
  return usesChemicalOfType(a, 'Veterinary medicine');
};

export const usesDyesOrSolvents = (a: ProbingAnswers): boolean => {
  return usesChemicalOfType(a, 'Dye / colour / printing chemical', 'Solvent / thinner / paint');
};

export const usesOilOrGrease = (a: ProbingAnswers): boolean => {
  return usesChemicalOfType(a, 'Lubricating oil / engine oil / grease');
};

export const usesCleaningChems = (a: ProbingAnswers): boolean => {
  return usesChemicalOfType(a, 'Detergent or cleaning chemical', 'Acid / alkali / bleaching agent');
};

export const storesFuelOnSite = (a: ProbingAnswers): boolean => {
  return usesChemicalOfType(a, 'Fuel stored on site');
};

// --- P20 records ---
export const hasRecords = (a: ProbingAnswers): boolean => {
  const p20 = (a['P20'] as string[]) || [];
  return p20.length > 0 && !p20.includes('No records') && !p20.includes('I keep records in memory only');
};

// --- P23 finance interest ---
export const hasFinanceInterest = (a: ProbingAnswers): boolean => {
  const p23 = a['P23'] as string | undefined;
  return p23 === 'Yes, within 6 months' || p23 === 'Yes, within 1 year' || p23 === 'Maybe later';
};

// --- P26 certification interest ---
export const hasCertificationInterest = (a: ProbingAnswers): boolean => {
  const p26 = a['P26'] as string | undefined;
  return p26 === 'Yes, definitely' || p26 === 'Maybe, if it helps my business';
};

// --- Composite: any condition ---
export const any = (...conds: boolean[]): boolean => conds.some(Boolean);
export const all = (...conds: boolean[]): boolean => conds.every(Boolean);
