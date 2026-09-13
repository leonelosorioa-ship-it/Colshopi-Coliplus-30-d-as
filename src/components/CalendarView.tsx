import React, { useState, useEffect } from 'react';
import { CheckCircle, Lock, Unlock, Sparkles, Award, PlayCircle, Clock, Zap, AlertCircle, X, ArrowRight } from 'lucide-react';
import { DayPlan, UserProfile } from '../types';
import { COLIPLUS_30_DAYS } from '../data/coliplusDaysData';

interface CalendarViewProps {
  user: UserProfile;
  onSelectDay: (dayPlan: DayPlan) => void;
  onOpenTracker: (dayNumber: number) => void;
  onOpenStore: () => void;
}

const PHASES_INFO = [
  {
    phase: 1,
    title: 'Fase 1: Reseteo y Calma Digestiva',
    days: 'Días 1 al 7',
    desc: 'Descompresión de gases retenidos, desinflamación del colon y activación suave del tránsito.',
    accent: '#0F766E',
    bg: 'bg-[#F0FDF4]',
    border: 'border-[#BBF7D0]'
  },
  {
    phase: 2,
    title: 'Fase 2: Restauración de Mucosa',
    days: 'Días 8 al 14',
    desc: 'Sellado de la barrera epitelial con mucílagos prebióticos y nutrición de la pared intestinal.',
    accent: '#0284C7',
    bg: 'bg-[#F0F9FF]',
    border: 'border-[#BAE6FD]'
  },
  {
    phase: 3,
    title: 'Fase 3: Repoblación de Microbiota',
    days: 'Días 15 al 21',
    desc: 'Bifidobacterias activas, producción de ácidos grasos de cadena corta (butirato) y saciedad.',
    accent: '#D97706',
    bg: 'bg-[#FFFBEB]',
    border: 'border-[#FDE68A]'
  },
  {
    phase: 4,
    title: 'Fase 4: Mantenimiento y Blindaje',
    days: 'Días 22 al 30',
    desc: 'Consolidación de hábitos, digestión ligera permanente y graduación con Diploma Oficial.',
    accent: '#10B981',
    bg: 'bg-[#ECFDF5]',
    border: 'border-[#A7F3D0]'
  }
];

// Helper to format remaining milliseconds into HH:MM:SS
function formatRemainingTime(ms: number): string {
  if (ms <= 0) return '00:00:00';
  const totalSeconds = Math.floor(ms / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

export const CalendarView: React.FC<CalendarViewProps> = ({
  user,
  onSelectDay,
  onOpenTracker,
  onOpenStore
}) => {
  const [demoMode, setDemoMode] = useState(false);
  const [filterPhase, setFilterPhase] = useState<number | 'all'>('all');
  const [waitingModalDay, setWaitingModalDay] = useState<number | null>(null);

  // Real-time ticker for 24h countdown
  const [now, setNow] = useState(Date.now());
  useEffect(() => {
    const timer = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(timer);
  }, []);

  const completedCount = user.completedDays.length;
  const progressPercent = Math.min(100, Math.round((completedCount / 30) * 100));

  // Determine highest completed day
  const maxCompleted = completedCount > 0 ? Math.max(...user.completedDays) : 0;
  const nextDayToUnlock = maxCompleted + 1;

  // Retrieve completion timestamp for maxCompleted
  const getCompletionTimeForDay = (day: number): number | null => {
    if (day <= 0) return null;
    const stored = localStorage.getItem(`colifem_day_${day}_completed_timestamp`);
    if (stored) return parseInt(stored, 10);
    // If completed in check-ins
    const checkIn = user.checkIns[day];
    if (checkIn?.date) {
      const parsed = new Date(checkIn.date).getTime();
      if (!isNaN(parsed)) return parsed;
    }
    return null;
  };

  const lastCompletionTimestamp = getCompletionTimeForDay(maxCompleted);

  // Remaining time for next day
  const getRemainingTimeForNextDay = (): number => {
    if (demoMode) return 0;
    if (maxCompleted === 0) return 0; // Day 1 is always unlocked immediately
    if (!lastCompletionTimestamp) return 0;
    const unlockTime = lastCompletionTimestamp + 24 * 60 * 60 * 1000;
    return Math.max(0, unlockTime - now);
  };

  const nextDayRemainingMs = getRemainingTimeForNextDay();
  const isNextDayWaiting = maxCompleted > 0 && nextDayRemainingMs > 0 && !demoMode;

  const filteredDays = filterPhase === 'all'
    ? COLIPLUS_30_DAYS
    : COLIPLUS_30_DAYS.filter(d => d.phaseNumber === filterPhase);

  return (
    <div className="space-y-8">
      
      {/* Overview Card */}
      <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-7 border border-[#E2E8F0] shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5 sm:gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-[#D1FAE5] text-[#065F46]">
              <Sparkles className="w-3.5 h-3.5 mr-1.5 text-[#059669]" />
              Programa Activo: {user.digestiveAngle}
            </div>
            <h1 className="text-xl sm:text-3xl font-bold text-[#0F172A] font-display">
              Guía de 30 Días con Bianka 💚
            </h1>
            <p className="text-xs sm:text-sm text-[#64748B] max-w-2xl leading-relaxed">
              4 fases de transformación para acompañar tu toma del suplemento funcional <span className="font-bold text-[#0F766E]">Coli Plus</span> (INVIMA NSA-0012423-2022).
            </p>
          </div>

          {/* Progress Bar & Current Day Badge */}
          <div className="bg-[#FAF6F0] p-4 sm:p-5 rounded-2xl border border-[#E2E8F0] w-full md:min-w-[260px] md:w-auto">
            <div className="flex items-center justify-between text-xs font-bold text-[#334155] mb-2">
              <span>PROGRESO DEL RETO</span>
              <span className="text-[#0F766E] font-mono text-sm">{completedCount} / 30 Días ({progressPercent}%)</span>
            </div>
            <div className="w-full bg-[#E2E8F0] h-2.5 sm:h-3 rounded-full overflow-hidden mb-3">
              <div
                className="bg-linear-to-r from-[#0F766E] via-[#10B981] to-[#F59E0B] h-full transition-all duration-700"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <div className="flex items-center justify-between text-xs text-[#64748B]">
              <span>Día actual: <strong className="text-[#0F766E]">Día {Math.min(30, maxCompleted + 1)}</strong></span>
              <button
                onClick={() => onOpenTracker(Math.min(30, maxCompleted + 1))}
                className="text-[#0F766E] font-bold hover:underline cursor-pointer"
              >
                Chequeo de Hoy →
              </button>
            </div>
          </div>
        </div>

        {/* Phase Filter Tabs & Demo Mode Toggle */}
        <div className="mt-6 pt-5 border-t border-[#E2E8F0] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center space-x-1.5 sm:space-x-2 overflow-x-auto pb-1 scrollbar-none w-full sm:w-auto">
            <button
              onClick={() => setFilterPhase('all')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                filterPhase === 'all'
                  ? 'bg-[#0F766E] text-white shadow-xs'
                  : 'bg-[#F1F5F9] text-[#475569] hover:bg-[#E2E8F0]'
              }`}
            >
              Todos (30 Días)
            </button>
            {PHASES_INFO.map((p) => (
              <button
                key={p.phase}
                onClick={() => setFilterPhase(p.phase)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                  filterPhase === p.phase
                    ? 'bg-[#0F766E] text-white shadow-xs'
                    : 'bg-[#F1F5F9] text-[#475569] hover:bg-[#E2E8F0]'
                }`}
              >
                Fase {p.phase}
              </button>
            ))}
          </div>

          {/* Demo Simulation Switch */}
          <div className="flex items-center space-x-2 shrink-0">
            <button
              id="btn-toggle-demo-mode"
              onClick={() => setDemoMode(!demoMode)}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                demoMode
                  ? 'bg-[#FEF3C7] border-[#F59E0B] text-[#92400E] shadow-xs'
                  : 'bg-white border-[#CBD5E1] text-[#64748B] hover:text-[#0F172A] hover:bg-[#F8FAFC]'
              }`}
              title="Permite desbloquear días sin esperar las 24h obligatorias para demostración o revisión rápida"
            >
              <Zap className={`w-3.5 h-3.5 ${demoMode ? 'text-[#D97706]' : 'text-[#94A3B8]'}`} />
              <span>{demoMode ? '⚡ Modo Demo Activo' : '⚡ Modo Demo'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* 24h Notice Banner if Next Day is Waiting */}
      {isNextDayWaiting && (
        <div className="p-4 rounded-2xl bg-[#FFFBEB] border border-[#FDE68A] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <div className="flex items-center space-x-2 text-[#92400E]">
            <Clock className="w-4 h-4 text-[#D97706] shrink-0 animate-pulse" />
            <span>
              <strong>Día {nextDayToUnlock} en asimilación digestiva:</strong> Desbloqueo en <strong className="font-mono text-sm text-[#B45309]">{formatRemainingTime(nextDayRemainingMs)}</strong>.
            </span>
          </div>
          <button
            onClick={() => setDemoMode(true)}
            className="px-3 py-1 rounded-lg bg-[#F59E0B] text-white font-bold hover:bg-[#D97706] transition-colors whitespace-nowrap shadow-xs text-[11px]"
          >
            ⚡ Desbloquear en Modo Demo
          </button>
        </div>
      )}

      {/* Days Grid grouped by Phase */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6 gap-3 sm:gap-4">
        {filteredDays.map((dayPlan) => {
          const isCompleted = user.completedDays.includes(dayPlan.day);
          const isCurrentActive = !isCompleted && dayPlan.day === nextDayToUnlock && (!isNextDayWaiting || demoMode);
          const isWaiting24h = !isCompleted && dayPlan.day === nextDayToUnlock && isNextDayWaiting && !demoMode;
          const isLockedSuperior = !demoMode && dayPlan.day > nextDayToUnlock;

          // Phase color badges
          const phaseColor = dayPlan.phaseNumber === 1
            ? 'border-t-[#0F766E]'
            : dayPlan.phaseNumber === 2
            ? 'border-t-[#0284C7]'
            : dayPlan.phaseNumber === 3
            ? 'border-t-[#D97706]'
            : 'border-t-[#10B981]';

          return (
            <div
              key={dayPlan.day}
              id={`card-day-${dayPlan.day}`}
              onClick={() => {
                if (isCompleted || isCurrentActive || demoMode) {
                  onSelectDay(dayPlan);
                } else if (isWaiting24h) {
                  setWaitingModalDay(dayPlan.day);
                }
              }}
              className={`relative rounded-2xl p-4 transition-all duration-200 border border-t-4 ${phaseColor} ${
                isCompleted
                  ? 'bg-[#F0FDF4] border-[#BBF7D0] hover:shadow-md cursor-pointer group'
                  : isCurrentActive
                  ? 'bg-white border-[#0F766E] shadow-md ring-2 ring-[#0F766E] ring-offset-2 cursor-pointer group'
                  : isWaiting24h
                  ? 'bg-[#FFFBEB] border-[#FDE68A] hover:border-[#F59E0B] cursor-pointer'
                  : 'bg-[#F8FAFC] border-slate-200 opacity-60 cursor-not-allowed'
              }`}
            >
              {/* Top Icons */}
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-black font-mono text-[#0F172A]">
                  DÍA {dayPlan.day}
                </span>

                {isCompleted ? (
                  <CheckCircle className="w-4 h-4 text-[#10B981]" />
                ) : isCurrentActive ? (
                  <span className="flex h-2.5 w-2.5 relative">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#10B981] opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#059669]"></span>
                  </span>
                ) : isWaiting24h ? (
                  <Clock className="w-3.5 h-3.5 text-[#D97706]" />
                ) : (
                  <Lock className="w-3.5 h-3.5 text-[#94A3B8]" />
                )}
              </div>

              {/* Milestone Banner if Day 7, 15, 21, 30 */}
              {dayPlan.isMilestone && (
                <div className="mb-2">
                  <span className="inline-block text-[9px] font-extrabold uppercase px-1.5 py-0.5 rounded bg-[#FEF3C7] text-[#92400E]">
                    {dayPlan.day === 15 ? '★ Mitad Frasco' : dayPlan.day === 30 ? '🏆 Victoria Final' : 'Hito Semanal'}
                  </span>
                </div>
              )}

              {/* Day Goal Snippet */}
              <p className="text-xs text-[#334155] font-medium line-clamp-2 leading-snug">
                {dayPlan.dailyGoal}
              </p>

              {/* 24h Countdown indicator on Day N+1 */}
              {isWaiting24h && (
                <div className="mt-2 py-1 px-1.5 rounded-lg bg-white border border-[#FDE68A] text-center">
                  <div className="text-[9px] font-bold uppercase tracking-wider text-[#92400E]">Desbloquea en:</div>
                  <div className="font-mono text-xs font-black text-[#B45309]">
                    {formatRemainingTime(nextDayRemainingMs)}
                  </div>
                </div>
              )}

              {/* Micro Status Footer */}
              <div className="mt-3 pt-2 border-t border-[#F1F5F9] flex items-center justify-between text-[10px] text-[#64748B]">
                <span className="font-semibold text-[#0F766E]">Fase {dayPlan.phaseNumber}</span>
                {isCompleted ? (
                  <span className="text-[#059669] font-bold">Completado ✓</span>
                ) : isCurrentActive ? (
                  <span className="text-[#0F766E] font-bold">¡Hoy Activo!</span>
                ) : isWaiting24h ? (
                  <span className="text-[#D97706] font-bold">En Espera</span>
                ) : (
                  <span className="text-[#94A3B8]">Bloqueado</span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Reminder Banner for Reorder at Day 14+ */}
      {maxCompleted >= 14 && (
        <div className="p-6 rounded-3xl bg-linear-to-r from-[#FEF3C7] to-[#FED7AA] border border-[#FDE68A] flex flex-col md:flex-row items-center justify-between gap-4 shadow-sm">
          <div className="space-y-1">
            <span className="text-xs font-black uppercase tracking-wider text-[#B45309]">
              Recomendación Preventiva de Bianka 💚
            </span>
            <h3 className="text-lg font-bold text-[#78350F]">
              ¿Vas en la mitad de tu frasco de Coli Plus?
            </h3>
            <p className="text-xs text-[#92400E] max-w-xl leading-relaxed">
              No cortes la Fase 3 y 4 de repoblación de la microbiota. Aprovecha el descuento exclusivo para clientas de ColShopi Tienda con envío prioritario a toda Colombia.
            </p>
          </div>
          <button
            onClick={onOpenStore}
            className="px-5 py-2.5 rounded-xl bg-[#92400E] text-white font-bold text-xs hover:bg-[#78350F] transition-colors whitespace-nowrap shadow-xs"
          >
            Asegurar Siguiente Frasco →
          </button>
        </div>
      )}

      {/* Waiting 24h Modal Popup */}
      {waitingModalDay && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white max-w-md w-full rounded-3xl p-6 border border-[#E2E8F0] shadow-2xl space-y-4">
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-2xl bg-[#FFFBEB] text-[#D97706] border border-[#FDE68A] flex items-center justify-center font-bold">
                <Clock className="w-5 h-5" />
              </div>
              <button
                onClick={() => setWaitingModalDay(null)}
                className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div>
              <h3 className="text-lg font-bold text-[#0F172A] font-display">
                Día {waitingModalDay}: En Proceso de Asimilación
              </h3>
              <p className="text-xs text-[#64748B] mt-1.5 leading-relaxed">
                ¡Gran trabajo completando el Día {maxCompleted}! Tu mucosa intestinal y microbiota están asimilando los superalimentos de Coli Plus y descansando durante la noche.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-[#FAF6F0] border border-[#E2E8F0] text-center space-y-1">
              <div className="text-xs font-bold text-[#64748B] uppercase tracking-wider">
                Tiempo Restante para Desbloqueo Oficial:
              </div>
              <div className="font-mono text-2xl font-black text-[#0F766E]">
                {formatRemainingTime(nextDayRemainingMs)}
              </div>
            </div>

            <div className="pt-2 flex flex-col gap-2">
              <button
                onClick={() => {
                  setDemoMode(true);
                  setWaitingModalDay(null);
                }}
                className="w-full py-2.5 rounded-xl bg-[#0F766E] text-white font-bold text-xs hover:bg-[#115E59] transition-all flex items-center justify-center space-x-2"
              >
                <Zap className="w-3.5 h-3.5" />
                <span>Desbloquear Ahora (Modo Demostración)</span>
              </button>
              <button
                onClick={() => setWaitingModalDay(null)}
                className="w-full py-2.5 rounded-xl border border-slate-200 text-slate-600 font-semibold text-xs hover:bg-slate-50 transition-colors"
              >
                Esperar las 24 Horas
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
