import { MainQuestion } from '../../types';
import { UNIVERSAL_QUESTIONS } from './universal';
import { ENERGY_QUESTIONS } from './energy';
import { WATER_QUESTIONS } from './water';
import { WASTE_QUESTIONS } from './waste';
import { CHEMICALS_QUESTIONS } from './chemicals';
import { AGRICULTURE_QUESTIONS } from './agriculture';
import { LIVESTOCK_QUESTIONS } from './livestock';
import { FOOD_PROCESSING_QUESTIONS } from './foodProcessing';
import { TEXTILE_QUESTIONS } from './textile';
import { RETAIL_QUESTIONS } from './retail';
import { FOOD_SERVICE_QUESTIONS } from './foodService';
import { WORKSHOP_QUESTIONS } from './workshop';
import { PLASTIC_QUESTIONS } from './plastic';
import { TRANSPORT_QUESTIONS } from './transport';
import { BUILDING_QUESTIONS } from './building';
import { MANAGEMENT_QUESTIONS } from './management';

export { DOMAINS } from './domains';

export const MAIN_QUESTIONS: MainQuestion[] = [
  ...UNIVERSAL_QUESTIONS,
  ...ENERGY_QUESTIONS,
  ...WATER_QUESTIONS,
  ...WASTE_QUESTIONS,
  ...CHEMICALS_QUESTIONS,
  ...AGRICULTURE_QUESTIONS,
  ...LIVESTOCK_QUESTIONS,
  ...FOOD_PROCESSING_QUESTIONS,
  ...TEXTILE_QUESTIONS,
  ...RETAIL_QUESTIONS,
  ...FOOD_SERVICE_QUESTIONS,
  ...WORKSHOP_QUESTIONS,
  ...PLASTIC_QUESTIONS,
  ...TRANSPORT_QUESTIONS,
  ...BUILDING_QUESTIONS,
  ...MANAGEMENT_QUESTIONS,
];
