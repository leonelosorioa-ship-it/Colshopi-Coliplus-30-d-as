export type DigestiveAngle =
  | 'Inflamación constante y gases'
  | 'Estreñimiento severo'
  | 'Digestión pesada e intolerancias'
  | 'Reflujo y pesadez';

export interface CheckInRecord {
  date: string;
  tookSupplement: boolean;
  waterLiters: number;
  antiInflammatoryMeal: boolean;
  bloatingScore: number; // 1 (vientre plano/sin molestia) a 5 (distensión máxima/dolor)
  energyScore: number; // 1 (agotada) a 5 (vitalidad plena)
  digestionType: 'liviana' | 'regular' | 'pesada';
  bristolType: number; // 1-7
  notes?: string;
}

export interface UserProfile {
  id: string;
  name: string;
  whatsapp: string;
  email: string;
  ageRange: string;
  accessCode: string;
  digestiveAngle: DigestiveAngle;
  symptoms: string[];
  currentDay: number;
  completedDays: number[];
  checkIns: Record<number, CheckInRecord>;
  hasPush?: boolean;
  createdAt: string;
  lastActive: string;
}

export interface DayTask {
  id: string;
  title: string;
  description: string;
  type: 'supplement' | 'hydration' | 'nutrition' | 'wellness';
  completed: boolean;
}

export interface DayPlan {
  day: number;
  phaseNumber: 1 | 2 | 3 | 4;
  phaseTitle: string;
  phaseSub: string;
  dailyGoal: string;
  marieQuote: string;
  marieAudioText: string;
  tasks: DayTask[];
  digestiveTip: string;
  recommendedRecipeId?: string;
  isMilestone?: boolean;
}

export interface Recipe {
  id: string;
  title: string;
  category: 'Batidos & Smoothies' | 'Desayunos Colon-Friendly' | 'Almuerzos & Cenas' | 'Infusiones & Caldos';
  prepTime: string;
  servings: string;
  colplusUsage?: string;
  description: string;
  fodmapStatus: 'Bajo en FODMAPs' | 'Digestión Suave' | 'Anti-Gases';
  ingredients: string[];
  instructions: string[];
  gutBenefit: string;
}

export interface ProductPack {
  id: string;
  title: string;
  subtitle: string;
  bottlesCount: number;
  priceCOP: number;
  regularPriceCOP: number;
  discountPercentage: number;
  freeShipping: boolean;
  badge?: string;
  bonusGift: string;
  popular?: boolean;
  imageAlt: string;
}

export interface BristolTypeInfo {
  type: number;
  title: string;
  description: string;
  status: 'Estreñimiento severo' | 'Estreñimiento leve' | 'Ideal y saludable' | 'Tendencia a diarrea' | 'Inflamación o urgencia';
  color: string;
  recommendation: string;
}
