export type DigestiveAngle =
  | 'Hinchazón Abdominal y Gases'
  | 'Hinchazón Abdominal y Gases post-comida'
  | 'Tránsito Lento y Estreñimiento'
  | 'Tránsito Lento / Estreñimiento severo'
  | 'Digestión Pesada e Intolerancias'
  | 'Disbiosis y Falta de Energía'
  | 'Detox Intestinal y Falta de Energía'
  | 'Inflamación constante y gases'
  | 'Estreñimiento severo'
  | 'Reflujo y pesadez'
  | string;

export interface CheckInRecord {
  date: string;
  tookSupplement: boolean; // Dosis de Coli Plus
  waterGlasses?: number; // 0 a 8 vasos de 250ml (= 2L)
  waterLiters: number;
  antiInflammatoryMeal: boolean;
  bloatingScore: number; // 1 (vientre plano/sin gas) a 5 (distensión máxima/cólico)
  energyScore: number; // 1 (agotada) a 5 (vitalidad plena)
  digestionType: 'liviana' | 'normal' | 'pesada' | 'inflamada' | 'regular';
  bristolType: number; // 1-7 Escala de Bristol
  moodScore?: number; // 1 a 5
  sleepQuality?: number; // 1 a 5 (calidad descanso nocturno)
  notes?: string;
  registeredAt?: number;
}

export interface UserProfile {
  id: string; // ej: #518472 o VIP-XXXX
  name: string;
  whatsapp: string;
  email: string;
  ageRange: string;
  accessCode: string;
  digestiveAngle: DigestiveAngle;
  symptoms: string[];
  currentDay: number;
  completedDays: number[];
  dayCompletedTimestamps?: Record<number, number>; // Registro de timestamp de finalización por día
  checkIns: Record<number, CheckInRecord>;
  hasPush?: boolean;
  createdAt: string;
  lastActive: string;
  demoModeUnlocked?: boolean; // Permite omitir la espera de 24h para pruebas
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
  biankaQuote?: string;
  biankaAudioText?: string;
  marieQuote?: string;
  marieAudioText?: string;
  tasks: DayTask[];
  digestiveTip: string;
  coliPlusIntakeGuide: string; // Modo de toma específico para el día
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
  description?: string;
  imageAlt: string;
}

export interface BristolTypeInfo {
  type: number;
  title: string;
  description: string;
  status: 'Estreñimiento severo' | 'Estreñimiento leve' | 'Ideal y saludable' | 'Tendencia a diarrea' | 'Inflamación o urgencia';
  color: string;
  recommendation: string;
  visualEmoji?: string;
}
