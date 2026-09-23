import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  ArrowLeft,
  CheckCircle,
  Circle,
  Sparkles,
  Utensils,
  Check,
  Pill,
  Droplet,
  Clock,
  Lock,
  Zap,
  Heart,
  Star,
  ShieldCheck,
  Smile,
  AlertTriangle,
  Leaf,
  Flame,
  Info
} from 'lucide-react';
import { DayPlan, UserProfile, CheckInRecord } from '../types';
import { getChronologicalStatus } from '../utils/chronologicalCycle';
import { WHY_IT_WORKS_DATA } from '../data/whyItWorksData';

interface DayDetailModalProps {
  dayPlan: DayPlan | null;
  user: UserProfile;
  onClose: () => void;
  onCompleteDay: (dayNumber: number, allTasksDone: boolean) => void;
  onSaveCheckIn?: (dayNumber: number, checkIn: CheckInRecord) => void;
  onOpenTracker: (dayNumber: number) => void;
  onOpenRecipe: (recipeId: string) => void;
  onOpenMarieChat?: () => void;
}

type MoodOption = {
  id: string;
  label: string;
  emoji: string;
};

const MOOD_OPTIONS: MoodOption[] = [
  { id: 'radiante', label: 'Radiante', emoji: '🌸' },
  { id: 'tranquila', label: 'Tranquila', emoji: '🧘‍♀️' },
  { id: 'enfocada', label: 'Enfocada', emoji: '🎯' },
  { id: 'sensible', label: 'Sensible', emoji: '🥺' },
  { id: 'agotada', label: 'Agotada', emoji: '😫' }
];

type DigestionOption = {
  id: 'liviana' | 'normal' | 'pesada' | 'inflamada';
  label: string;
  emoji: string;
  colorClass: string;
  badgeClass: string;
};

const DIGESTION_OPTIONS: DigestionOption[] = [
  {
    id: 'liviana',
    label: 'Liviana',
    emoji: '🌿',
    colorClass: 'text-[#065F46] border-[#10B981] bg-[#ECFDF5]',
    badgeClass: 'bg-[#ECFDF5] text-[#065F46] border border-[#A7F3D0]'
  },
  {
    id: 'normal',
    label: 'Normal',
    emoji: '✨',
    colorClass: 'text-[#0F766E] border-[#14B8A6] bg-[#F0FDFA]',
    badgeClass: 'bg-[#F0FDFA] text-[#0F766E] border border-[#99F6E4]'
  },
  {
    id: 'pesada',
    label: 'Pesada',
    emoji: '🍂',
    colorClass: 'text-[#92400E] border-[#F59E0B] bg-[#FFFBEB]',
    badgeClass: 'bg-[#FFFBEB] text-[#92400E] border border-[#FDE68A]'
  },
  {
    id: 'inflamada',
    label: 'Inflamada',
    emoji: '⚠️',
    colorClass: 'text-[#991B1B] border-[#EF4444] bg-[#FEF2F2]',
    badgeClass: 'bg-[#FEF2F2] text-[#991B1B] border border-[#FECACA]'
  }
];

export const DayDetailModal: React.FC<DayDetailModalProps> = ({
  dayPlan,
  user,
  onClose,
  onCompleteDay,
  onSaveCheckIn,
  onOpenTracker,
  onOpenRecipe,
  onOpenMarieChat
}) => {
  const [demoMode, setDemoMode] = useState(false);
  const [completedTaskIds, setCompletedTaskIds] = useState<string[]>([]);

  // Interactive Daily Test State
  const existingCheckIn = dayPlan ? user.checkIns?.[dayPlan.day] : undefined;
  const [mood, setMood] = useState<string>(existingCheckIn?.mood || 'tranquila');
  const [energyScore, setEnergyScore] = useState<number>(existingCheckIn?.energyScore || 4);
  const [digestionType, setDigestionType] = useState<'liviana' | 'normal' | 'pesada' | 'inflamada'>(
    (existingCheckIn?.digestionType as any) || 'pesada'
  );

  // 1-second ticker for real-time countdown
  const [now, setNow] = useState(Date.now());
  useEffect(() => {
    const timer = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (dayPlan) {
      const isDayDone = user.completedDays ? user.completedDays.includes(dayPlan.day) : false;
      if (isDayDone) {
        setCompletedTaskIds(dayPlan.tasks.map((t) => t.id));
      } else {
        setCompletedTaskIds([]);
      }

      const c = user.checkIns?.[dayPlan.day];
      if (c) {
        if (c.mood) setMood(c.mood);
        if (c.energyScore) setEnergyScore(c.energyScore);
        if (c.digestionType && c.digestionType !== 'regular') {
          setDigestionType(c.digestionType as any);
        }
      } else {
        setMood('tranquila');
        setEnergyScore(4);
        setDigestionType(dayPlan.day === 2 ? 'pesada' : 'liviana');
      }
    }
  }, [dayPlan, user]);

  if (!dayPlan) return null;

  const cycleStatus = getChronologicalStatus(user, demoMode, now);
  const isDayCompleted = user.completedDays ? user.completedDays.includes(dayPlan.day) : false;
  const isDayWaiting24h = !isDayCompleted && dayPlan.day === cycleStatus.nextDayNumber && cycleStatus.isNextDayWaiting && !demoMode;
  const isDayLockedFuture = !demoMode && !isDayCompleted && dayPlan.day > cycleStatus.nextDayNumber;
  const isActionBlocked = isDayWaiting24h || isDayLockedFuture;

  const toggleTask = (taskId: string) => {
    if (isActionBlocked) return;
    if (completedTaskIds.includes(taskId)) {
      setCompletedTaskIds(completedTaskIds.filter((id) => id !== taskId));
    } else {
      setCompletedTaskIds([...completedTaskIds, taskId]);
    }
  };

  // Why it works explanation for this day
  const whyItWorksText =
    dayPlan.whyItWorks ||
    WHY_IT_WORKS_DATA[dayPlan.day] ||
    'La sinergia de mucílago de linaza canadiense, pitaya y fibra soluble de Coli Plus desinflama la mucosa, lubrica las paredes del colon y disuelve los gases acumulados para una digestión liviana y regular.';

  // Save complete daily test & habits
  const handleSaveAndComplete = () => {
    if (isActionBlocked && !isDayCompleted) return;

    const bloatingValue =
      digestionType === 'inflamada' ? 4 : digestionType === 'pesada' ? 3 : digestionType === 'normal' ? 2 : 1;

    const checkInRecord: CheckInRecord = {
      date: new Date().toISOString().split('T')[0],
      tookSupplement: true,
      waterLiters: 2.0,
      antiInflammatoryMeal: true,
      bloatingScore: bloatingValue,
      energyScore,
      digestionType,
      mood,
      bristolType: digestionType === 'liviana' || digestionType === 'normal' ? 4 : 2,
      registeredAt: Date.now()
    };

    if (onSaveCheckIn) {
      onSaveCheckIn(dayPlan.day, checkInRecord);
    } else {
      onCompleteDay(dayPlan.day, true);
    }

    onClose();
  };

  const selectedMoodObj = MOOD_OPTIONS.find((m) => m.id === mood) || MOOD_OPTIONS[1];
  const selectedDigestionObj = DIGESTION_OPTIONS.find((d) => d.id === digestionType) || DIGESTION_OPTIONS[0];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto overscroll-contain bg-slate-900/75 backdrop-blur-xs flex items-center justify-center p-2.5 sm:p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        transition={{ type: 'spring', damping: 25, stiffness: 320 }}
        className="bg-white w-full max-w-lg rounded-3xl shadow-2xl border border-[#E2E8F0] overflow-hidden flex flex-col max-h-[92vh] my-auto"
      >
        {/* HEADER - Styled as in screenshot with dark green gradient, pills & titles */}
        <div className="bg-gradient-to-r from-[#044E42] via-[#0F766E] to-[#044E42] p-4 sm:p-5 text-white relative shrink-0">
          {/* Top Row: DÍA X DE 30 badge on left, Volver & Close on right */}
          <div className="flex items-center justify-between gap-2 mb-2">
            <span className="bg-[#FBBF24] text-[#0F172A] font-extrabold text-[11px] sm:text-xs px-3 py-1 rounded-full uppercase tracking-wider shadow-xs">
              DÍA {dayPlan.day} DE 30
            </span>

            <div className="flex items-center space-x-1.5">
              <button
                onClick={onClose}
                className="px-3 py-1 rounded-full bg-white/15 hover:bg-white/25 text-white text-xs font-semibold flex items-center space-x-1 transition-colors cursor-pointer"
                title="Volver"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Volver</span>
              </button>

              <button
                onClick={onClose}
                className="p-1 rounded-full bg-white/15 hover:bg-white/25 text-white transition-colors cursor-pointer"
                title="Cerrar"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Phase Subtitle */}
          <p className="text-emerald-200 text-xs sm:text-sm font-semibold tracking-wide">
            {dayPlan.phaseTitle}
          </p>

          {/* Main Title / Daily Goal */}
          <h2 className="text-lg sm:text-2xl font-black font-display text-white leading-tight mt-0.5">
            {dayPlan.dailyGoal}
          </h2>

          {/* Subheading Focus */}
          {dayPlan.phaseSub && (
            <p className="text-emerald-100 text-xs sm:text-sm font-medium mt-0.5">
              {dayPlan.phaseSub}
            </p>
          )}
        </div>

        {/* SCROLLABLE MODAL BODY */}
        <div className="p-4 sm:p-5 space-y-4 bg-[#FAF6F0] overflow-y-auto overscroll-contain flex-1">
          {/* 24h Countdown Alert Banner inside Modal */}
          {isDayWaiting24h && (
            <div className="p-3.5 rounded-2xl bg-linear-to-r from-[#FFFBEB] to-[#FEF3C7] border-2 border-[#F59E0B] flex items-center justify-between gap-3 text-xs text-[#92400E]">
              <div className="flex items-center space-x-2.5">
                <Clock className="w-5 h-5 text-[#D97706] shrink-0 animate-pulse" />
                <div>
                  <div className="font-extrabold text-[#78350F]">En proceso de asimilación digestiva (24h)</div>
                  <div className="text-[11px] text-[#B45309]">Para un ciclo ordenado de 30 días, este día se activará en:</div>
                </div>
              </div>
              <div className="font-mono text-sm sm:text-base font-black text-[#B45309] bg-white px-2.5 py-1 rounded-xl border border-[#FDE68A] shrink-0 shadow-2xs">
                {cycleStatus.formattedTime}
              </div>
            </div>
          )}

          {/* Locked Future Day Banner */}
          {isDayLockedFuture && (
            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex items-center space-x-2.5 text-xs text-slate-600">
              <Lock className="w-4 h-4 text-slate-400 shrink-0" />
              <div>
                <strong>Día Bloqueado:</strong> Para garantizar el uso cronológico y ordenado de tu ciclo, completa primero el <strong>Día {cycleStatus.nextDayNumber}</strong>.
              </div>
            </div>
          )}

          {/* ============================================================== */}
          {/* CARD 1: TEST DIARIO (ESTADO DE ÁNIMO, ENERGÍA, DIGESTIÓN)        */}
          {/* ============================================================== */}
          <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-5 border border-[#E2E8F0] shadow-xs space-y-4">
            
            {/* SUB-SECTION 1: ESTADO DE ÁNIMO & BIENESTAR EMOCIONAL */}
            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-1.5 text-xs font-extrabold text-[#1E293B] uppercase tracking-wide">
                  <span className="text-sm">😊</span>
                  <span>ESTADO DE ÁNIMO & BIENESTAR EMOCIONAL</span>
                </div>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold text-[#BE185D] bg-[#FDF2F8] border border-[#FCE7F3] capitalize">
                  {selectedMoodObj.label}
                </span>
              </div>

              {/* 5 Mood Options Buttons */}
              <div className="grid grid-cols-5 gap-1.5 sm:gap-2">
                {MOOD_OPTIONS.map((item) => {
                  const isSelected = mood === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setMood(item.id)}
                      className={`p-2 rounded-xl sm:rounded-2xl flex flex-col items-center justify-center transition-all cursor-pointer text-center ${
                        isSelected
                          ? 'border-2 border-[#FB7185] bg-[#FFF1F2] text-[#BE185D] shadow-xs scale-102 font-bold ring-2 ring-[#FDA4AF]/40'
                          : 'border border-[#E2E8F0] bg-[#FAF8F5] text-[#475569] hover:bg-white hover:border-[#CBD5E1]'
                      }`}
                    >
                      <span className="text-xl sm:text-2xl mb-1">{item.emoji}</span>
                      <span className="text-[10px] sm:text-[11px] truncate w-full leading-tight">
                        {item.label}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* SEPARATOR */}
            <div className="border-t border-[#F1F5F9]" />

            {/* SUB-SECTION 2: NIVEL DE ENERGÍA */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-1.5 text-xs sm:text-sm font-bold text-[#0F172A]">
                  <span>☀️</span>
                  <span>Nivel de Energía:</span>
                </div>
                <span className="text-xs sm:text-sm font-black text-[#D97706]">
                  {energyScore}/5 ★
                </span>
              </div>

              {/* 5 Interactive Stars */}
              <div className="flex items-center space-x-2 pt-0.5">
                {[1, 2, 3, 4, 5].map((starVal) => {
                  const isFilled = starVal <= energyScore;
                  return (
                    <button
                      key={starVal}
                      type="button"
                      onClick={() => setEnergyScore(starVal)}
                      className="p-1 rounded-lg hover:bg-[#FEF3C7] transition-transform active:scale-125 cursor-pointer"
                      title={`${starVal} de 5 estrellas`}
                    >
                      <Star
                        className={`w-7 h-7 sm:w-8 sm:h-8 transition-colors ${
                          isFilled
                            ? 'text-[#F59E0B] fill-[#F59E0B] drop-shadow-2xs'
                            : 'text-[#CBD5E1] stroke-1'
                        }`}
                      />
                    </button>
                  );
                })}
              </div>
            </div>

            {/* SEPARATOR */}
            <div className="border-t border-[#F1F5F9]" />

            {/* SUB-SECTION 3: DIGESTIÓN */}
            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-1.5 text-xs sm:text-sm font-bold text-[#0F172A]">
                  <Sparkles className="w-4 h-4 text-[#0F766E]" />
                  <span>Digestión:</span>
                </div>
                <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${selectedDigestionObj.badgeClass}`}>
                  {selectedDigestionObj.label}
                </span>
              </div>

              {/* 4 Digestion Options in 2x2 Grid (As in screenshot) */}
              <div className="grid grid-cols-2 gap-2">
                {DIGESTION_OPTIONS.map((opt) => {
                  const isSelected = digestionType === opt.id;
                  return (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => setDigestionType(opt.id)}
                      className={`p-2.5 rounded-xl border text-xs font-bold flex items-center justify-center space-x-1.5 transition-all cursor-pointer ${
                        isSelected
                          ? `${opt.colorClass} border-2 shadow-2xs scale-101 ring-1 ring-black/5`
                          : 'bg-white border-[#E2E8F0] text-[#475569] hover:bg-[#F8FAFC]'
                      }`}
                    >
                      <span>{opt.emoji}</span>
                      <span>{opt.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

          </div>

          {/* ============================================================== */}
          {/* CARD 2: ¿POR QUÉ FUNCIONA ESTO EN TU CUERPO?                   */}
          {/* ============================================================== */}
          <div className="p-4 rounded-2xl bg-linear-to-br from-[#F0FDF4] to-[#F8FAFC] border border-[#BBF7D0] shadow-2xs space-y-1.5">
            <div className="flex items-center space-x-1.5 text-[#065F46] font-bold text-xs uppercase tracking-wide">
              <span>💡</span>
              <span>¿POR QUÉ FUNCIONA ESTO EN TU CUERPO?</span>
            </div>
            <p className="text-xs sm:text-sm text-[#1E293B] leading-relaxed">
              {whyItWorksText}
            </p>
          </div>

          {/* ============================================================== */}
          {/* CARD 3: DOSIS COLI PLUS & HÁBITOS DEL DÍA                      */}
          {/* ============================================================== */}
          <div className="bg-white rounded-2xl p-4 sm:p-5 border border-[#E2E8F0] shadow-xs space-y-3">
            <div className="flex items-center space-x-2 text-[#0F766E] font-bold text-xs uppercase tracking-wide">
              <Pill className="w-4 h-4 text-[#0F766E]" />
              <span>Dosis Coli Plus & Hábitos del Día</span>
            </div>

            {/* Dosage box */}
            <div className="p-3 rounded-xl bg-[#ECFDF5] border border-[#A7F3D0] text-xs text-[#065F46] flex items-start space-x-2.5">
              <span className="text-base leading-none">🌿</span>
              <div>
                <strong>Dosis Coli Plus de hoy:</strong>{' '}
                <span>{dayPlan.coliPlusIntakeGuide || '1 cucharada dosificadora en 250ml de agua fresca, 20-30 min después de cenar.'}</span>
              </div>
            </div>

            {/* Checklist of tasks */}
            <div className="space-y-2 pt-1">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-[#475569] uppercase tracking-wider text-[11px]">
                  Tareas Cumplidas ({completedTaskIds.length}/{dayPlan.tasks.length})
                </span>
                <span className="text-[11px] text-[#0F766E]">Toca para marcar</span>
              </div>

              <div className="space-y-1.5">
                {dayPlan.tasks.map((task) => {
                  const isChecked = completedTaskIds.includes(task.id);
                  return (
                    <div
                      key={task.id}
                      onClick={() => toggleTask(task.id)}
                      className={`p-2.5 rounded-xl border transition-all cursor-pointer flex items-start space-x-2.5 ${
                        isChecked
                          ? 'bg-[#F0FDF4] border-[#86EFAC]'
                          : 'bg-[#F8FAFC] border-[#E2E8F0] hover:bg-white'
                      }`}
                    >
                      <div className="mt-0.5 shrink-0">
                        {isChecked ? (
                          <CheckCircle className="w-4 h-4 text-[#10B981]" />
                        ) : (
                          <Circle className="w-4 h-4 text-[#94A3B8]" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className={`text-xs font-bold ${isChecked ? 'line-through text-[#64748B]' : 'text-[#0F172A]'}`}>
                          {task.title}
                        </h4>
                        <p className="text-[11px] text-[#64748B] leading-tight mt-0.5">
                          {task.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* ============================================================== */}
          {/* CARD 4: TIP DE BIANKA & RECETA ANTIINFLAMATORIA                */}
          {/* ============================================================== */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {/* Tip */}
            <div className="p-3.5 rounded-xl bg-white border border-[#E2E8F0] space-y-1 shadow-2xs">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#0F766E] flex items-center space-x-1">
                <span>💡</span>
                <span>Tip de Bianka</span>
              </span>
              <p className="text-xs text-[#475569] leading-snug">
                {dayPlan.digestiveTip}
              </p>
            </div>

            {/* Recommended Recipe Shortcut */}
            {dayPlan.recommendedRecipeId && (
              <div
                onClick={() => {
                  onOpenRecipe(dayPlan.recommendedRecipeId!);
                  onClose();
                }}
                className="p-3.5 rounded-xl bg-[#FFFBEB] border border-[#FDE68A] hover:border-[#F59E0B] cursor-pointer transition-all space-y-1 shadow-2xs group"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#92400E] flex items-center">
                    <Utensils className="w-3 h-3 mr-1" />
                    Receta Antiinflamatoria
                  </span>
                  <span className="text-[10px] text-[#D97706] font-bold group-hover:underline">Ver Receta →</span>
                </div>
                <p className="text-xs text-[#78350F] font-medium leading-snug">
                  Diseñado para reducir fermentación y desinflamar tu colon.
                </p>
              </div>
            )}
          </div>

          {/* Demo toggle if waiting 24h */}
          {isActionBlocked && (
            <div className="flex justify-end pt-1">
              <button
                type="button"
                onClick={() => setDemoMode(true)}
                className="px-3 py-1.5 rounded-xl border border-[#F59E0B] bg-[#FEF3C7] text-[#92400E] font-bold text-xs hover:bg-[#FDE68A] transition-colors flex items-center gap-1 cursor-pointer"
                title="Permite omitir la espera de 24h para demostración"
              >
                <Zap className="w-3.5 h-3.5 text-[#D97706]" />
                <span>Modo Demo (Omitir 24h)</span>
              </button>
            </div>
          )}
        </div>

        {/* STICKY BOTTOM ACTION BAR - As in Screenshot */}
        <div className="p-3.5 sm:p-4 bg-white/95 backdrop-blur-md border-t border-[#E2E8F0] flex items-center justify-between gap-2.5 sticky bottom-0 z-20 shrink-0">
          {/* Consultar con Marié */}
          <button
            type="button"
            onClick={() => {
              if (onOpenMarieChat) {
                onOpenMarieChat();
              } else {
                onClose();
              }
            }}
            className="px-3 sm:px-4 py-2.5 rounded-xl border border-[#CBD5E1] bg-white hover:bg-[#F8FAFC] text-[#334155] text-xs font-bold flex items-center space-x-1.5 transition-colors shadow-2xs active:scale-98 cursor-pointer shrink-0"
          >
            <Heart className="w-4 h-4 text-[#E11D48] fill-[#E11D48]" />
            <span className="hidden xs:inline">Consultar con</span>
            <span>Marié</span>
          </button>

          {/* Registrar y Guardar Día */}
          <button
            id="btn-save-and-complete-day"
            type="button"
            onClick={handleSaveAndComplete}
            disabled={isActionBlocked && !isDayCompleted}
            className={`flex-1 py-3 px-4 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center space-x-2 transition-all shadow-md active:scale-98 ${
              isActionBlocked && !isDayCompleted
                ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                : 'bg-gradient-to-r from-[#064E3B] to-[#0F766E] hover:from-[#043E2F] hover:to-[#0D655E] text-white cursor-pointer'
            }`}
          >
            <ShieldCheck className="w-4 h-4 text-[#34D399]" />
            <span>
              {isDayCompleted ? 'Actualizar y Guardar Día' : 'Registrar y Guardar Día'}
            </span>
          </button>
        </div>

      </motion.div>
    </div>
  );
};
