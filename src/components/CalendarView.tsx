import React, { useState } from 'react';
import { CheckCircle, Lock, Unlock, Sparkles, Award, PlayCircle, Calendar } from 'lucide-react';
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
    title: 'Fase 1: Descompresión y Calma Intestinal',
    days: 'Días 1 al 7',
    desc: 'Alivio rápido de gases retenidos, desinflamación y regulación del reflejo gastrocólico.',
    accent: '#0F766E',
    bg: 'bg-[#F0FDF4]',
    border: 'border-[#BBF7D0]'
  },
  {
    phase: 2,
    title: 'Fase 2: Reparación de la Mucosa Digestiva',
    days: 'Días 8 al 14',
    desc: 'Sellado de la barrera epitelial con glutamina, colágeno y fibras solubles mucilaginosas.',
    accent: '#0284C7',
    bg: 'bg-[#F0F9FF]',
    border: 'border-[#BAE6FD]'
  },
  {
    phase: 3,
    title: 'Fase 3: Repoblación y Equilibrio de la Microbiota',
    days: 'Días 15 al 21',
    desc: 'Nutrición de bifidobacterias con prebióticos de ColiPlus y producción de butirato.',
    accent: '#D97706',
    bg: 'bg-[#FFFBEB]',
    border: 'border-[#FDE68A]'
  },
  {
    phase: 4,
    title: 'Fase 4: Consolidación y Blindaje',
    days: 'Días 22 al 30',
    desc: 'Hábitos inquebrantables, digestión ligera y graduación oficial con diploma ColShopi.',
    accent: '#10B981',
    bg: 'bg-[#ECFDF5]',
    border: 'border-[#A7F3D0]'
  }
];

export const CalendarView: React.FC<CalendarViewProps> = ({
  user,
  onSelectDay,
  onOpenTracker,
  onOpenStore
}) => {
  const [allowFlexibleUnlock, setAllowFlexibleUnlock] = useState(true);
  const [filterPhase, setFilterPhase] = useState<number | 'all'>('all');

  const completedCount = user.completedDays.length;
  const progressPercent = Math.min(100, Math.round((completedCount / 30) * 100));

  const filteredDays = filterPhase === 'all'
    ? COLIPLUS_30_DAYS
    : COLIPLUS_30_DAYS.filter(d => d.phaseNumber === filterPhase);

  return (
    <div className="space-y-8">
      
      {/* Overview Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E2E8F0] shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-[#D1FAE5] text-[#065F46]">
              <Sparkles className="w-3.5 h-3.5 mr-1.5 text-[#059669]" />
              Programa Activo: {user.digestiveAngle}
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-[#0F172A] font-display">
              Protocolo de 30 Días con Marié
            </h1>
            <p className="text-sm text-[#64748B] max-w-2xl leading-relaxed">
              Cada día incluye tu objetivo terapéutico, consejo en audio de Marié, pautas de dosis de ColiPlus y registro de síntomas.
            </p>
          </div>

          {/* Progress Ring / Bar */}
          <div className="bg-[#FAF6F0] p-5 rounded-2xl border border-[#E2E8F0] min-w-[240px]">
            <div className="flex items-center justify-between text-xs font-bold text-[#334155] mb-2">
              <span>PROGRESO TOTAL</span>
              <span className="text-[#0F766E] font-mono text-sm">{completedCount} / 30 Días ({progressPercent}%)</span>
            </div>
            <div className="w-full bg-[#E2E8F0] h-3 rounded-full overflow-hidden mb-3">
              <div
                className="bg-linear-to-r from-[#0F766E] via-[#10B981] to-[#F59E0B] h-full transition-all duration-700"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <div className="flex items-center justify-between text-[11px] text-[#64748B]">
              <span>Día actual: <strong>Día {user.currentDay}</strong></span>
              <button
                onClick={() => onOpenTracker(user.currentDay)}
                className="text-[#0F766E] font-bold hover:underline"
              >
                Chequeo de Hoy →
              </button>
            </div>
          </div>
        </div>

        {/* Phase Filter Tabs & Flexible Unlock Toggle */}
        <div className="mt-8 pt-6 border-t border-[#E2E8F0] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setFilterPhase('all')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                filterPhase === 'all'
                  ? 'bg-[#0F766E] text-white shadow-xs'
                  : 'bg-[#F1F5F9] text-[#475569] hover:bg-[#E2E8F0]'
              }`}
            >
              Todos los 30 Días
            </button>
            {PHASES_INFO.map((p) => (
              <button
                key={p.phase}
                onClick={() => setFilterPhase(p.phase)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  filterPhase === p.phase
                    ? 'bg-[#0F766E] text-white shadow-xs'
                    : 'bg-[#F1F5F9] text-[#475569] hover:bg-[#E2E8F0]'
                }`}
              >
                Fase {p.phase}
              </button>
            ))}
          </div>

          {/* Flexible Unlock Switch */}
          <div className="flex items-center space-x-2 text-xs text-[#64748B]">
            <button
              id="btn-toggle-flexible-unlock"
              onClick={() => setAllowFlexibleUnlock(!allowFlexibleUnlock)}
              className="flex items-center space-x-1.5 px-3 py-1 rounded-lg border border-[#CBD5E1] bg-white hover:bg-[#F8FAFC] text-[#334155] font-medium"
            >
              {allowFlexibleUnlock ? (
                <>
                  <Unlock className="w-3.5 h-3.5 text-[#10B981]" />
                  <span>Modo Abierto (Explorar Todo)</span>
                </>
              ) : (
                <>
                  <Lock className="w-3.5 h-3.5 text-[#94A3B8]" />
                  <span>Modo Secuencial</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Days Grid grouped by Phase or All */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6 gap-3 sm:gap-4">
        {filteredDays.map((dayPlan) => {
          const isCompleted = user.completedDays.includes(dayPlan.day);
          const isCurrent = user.currentDay === dayPlan.day;
          const isLocked = !allowFlexibleUnlock && dayPlan.day > user.currentDay;

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
                if (!isLocked) {
                  onSelectDay(dayPlan);
                }
              }}
              className={`relative rounded-2xl p-4 transition-all duration-200 border border-t-4 ${phaseColor} ${
                isLocked
                  ? 'bg-[#F8FAFC] border-slate-200 opacity-60 cursor-not-allowed'
                  : 'bg-white border-[#E2E8F0] hover:border-[#0F766E] hover:shadow-md cursor-pointer group'
              } ${isCurrent ? 'ring-2 ring-[#0F766E] ring-offset-2' : ''}`}
            >
              {/* Top Icons */}
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-black font-mono text-[#0F172A]">
                  DÍA {dayPlan.day}
                </span>

                {isCompleted ? (
                  <CheckCircle className="w-4 h-4 text-[#10B981]" />
                ) : isLocked ? (
                  <Lock className="w-3.5 h-3.5 text-[#94A3B8]" />
                ) : dayPlan.isMilestone ? (
                  <Award className="w-4 h-4 text-[#F59E0B]" />
                ) : (
                  <PlayCircle className="w-4 h-4 text-[#94A3B8] group-hover:text-[#0F766E]" />
                )}
              </div>

              {/* Milestone Banner if Day 7, 15, 21, 30 */}
              {dayPlan.isMilestone && (
                <div className="mb-2">
                  <span className="inline-block text-[9px] font-extrabold uppercase px-1.5 py-0.5 rounded bg-[#FEF3C7] text-[#92400E]">
                    {dayPlan.day === 15 ? '★ Mitad de Camino' : dayPlan.day === 30 ? '🏆 Graduación' : 'Hito Semanal'}
                  </span>
                </div>
              )}

              {/* Day Goal Snippet */}
              <p className="text-xs text-[#334155] font-medium line-clamp-2 leading-snug">
                {dayPlan.dailyGoal}
              </p>

              {/* Micro Status Footer */}
              <div className="mt-3 pt-2 border-t border-[#F1F5F9] flex items-center justify-between text-[10px] text-[#64748B]">
                <span className="font-semibold text-[#0F766E]">Fase {dayPlan.phaseNumber}</span>
                {isCurrent && (
                  <span className="text-[#D97706] font-bold">¡Hoy!</span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Reminder Banner for Reorder at Day 15+ */}
      {user.currentDay >= 14 && (
        <div className="p-6 rounded-3xl bg-linear-to-r from-[#FEF3C7] to-[#FED7AA] border border-[#FDE68A] flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="text-xs font-black uppercase tracking-wider text-[#B45309]">
              Recomendación Preventiva de Marié
            </span>
            <h3 className="text-lg font-bold text-[#78350F]">
              ¿Vas en la mitad de tu frasco de ColiPlus?
            </h3>
            <p className="text-xs text-[#92400E] max-w-xl">
              No interrumpas las Fases 3 y 4 de repoblación bacteriana. Aprovecha la promoción VIP con hasta 40% de descuento y envío prioritario a toda Colombia.
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

    </div>
  );
};
