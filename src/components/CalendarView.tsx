import React, { useState, useEffect } from 'react';
import { CheckCircle, Lock, Unlock, Sparkles, Award, PlayCircle, Clock, Zap, AlertCircle, X, ArrowRight, ShieldCheck, Download, Smartphone, Monitor } from 'lucide-react';
import { DayPlan, UserProfile } from '../types';
import { COLIPLUS_30_DAYS } from '../data/coliplusDaysData';
import { getChronologicalStatus, formatCountdown } from '../utils/chronologicalCycle';

interface CalendarViewProps {
  user: UserProfile;
  onSelectDay: (dayPlan: DayPlan) => void;
  onOpenTracker: (dayNumber: number) => void;
  onOpenStore: () => void;
  onInstallPWA?: () => void;
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

export const CalendarView: React.FC<CalendarViewProps> = ({
  user,
  onSelectDay,
  onOpenTracker,
  onOpenStore,
  onInstallPWA
}) => {
  const [demoMode, setDemoMode] = useState(false);
  const [filterPhase, setFilterPhase] = useState<number | 'all'>('all');
  const [waitingModalDay, setWaitingModalDay] = useState<number | null>(null);
  const [isStandalone, setIsStandalone] = useState(false);
  const [showInstallBanner, setShowInstallBanner] = useState(() => {
    try {
      return localStorage.getItem('colifem_hide_install_banner') !== 'true';
    } catch {
      return true;
    }
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const standalone =
        window.matchMedia('(display-mode: standalone)').matches ||
        (window.navigator as any).standalone === true;
      setIsStandalone(standalone);
    }
  }, []);

  // Real-time 1-second ticker for the 24-hour countdown clock
  const [now, setNow] = useState(Date.now());
  useEffect(() => {
    const timer = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(timer);
  }, []);

  const completedCount = user.completedDays ? user.completedDays.length : 0;
  const progressPercent = Math.min(100, Math.round((completedCount / 30) * 100));

  // Full chronological cycle evaluation
  const cycleStatus = getChronologicalStatus(user, demoMode, now);
  const {
    maxCompletedDay,
    nextDayNumber,
    isNextDayWaiting,
    remainingMs,
    formattedTime,
    hours,
    minutes,
    seconds
  } = cycleStatus;

  const filteredDays = filterPhase === 'all'
    ? COLIPLUS_30_DAYS
    : COLIPLUS_30_DAYS.filter(d => d.phaseNumber === filterPhase);

  return (
    <div className="space-y-6 sm:space-y-8">
      
      {/* PWA Download Banner when user is inside the 30-day program */}
      {onInstallPWA && showInstallBanner && !isStandalone && (
        <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl bg-gradient-to-r from-[#07242B] via-[#0F3942] to-[#041B21] p-4 sm:p-6 text-white border border-[#14B8A6]/40 shadow-lg">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#00E5FF]/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="space-y-2 max-w-2xl">
              <div className="inline-flex items-center space-x-1.5 px-3 py-0.5 rounded-full bg-[#134E4A]/80 border border-[#2DD4BF]/40 text-[#2DD4BF] text-[11px] font-bold tracking-wide uppercase">
                <Sparkles className="w-3.5 h-3.5 text-[#5EEAD4]" />
                <span>Aplicación Oficial ColiFem 30D</span>
              </div>
              <h2 className="text-base sm:text-xl font-extrabold text-white tracking-tight flex items-center gap-2">
                <Smartphone className="w-5 h-5 text-[#2DD4BF] shrink-0" />
                <span>¿Deseas descargar la app en tu Celular, Tablet o PC?</span>
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Úsala directamente desde tu pantalla de inicio en 1 toque, sin tener que abrir el navegador. Compatible con <strong className="text-white">Android</strong> (Samsung, Xiaomi, Motorola, etc.), <strong className="text-white">iPhone/iPad</strong> (Safari) y <strong className="text-white">computadores Windows / Mac</strong>.
              </p>
              <div className="flex flex-wrap items-center gap-2 pt-1 text-[11px] text-[#99F6E4]">
                <span className="bg-white/10 px-2.5 py-0.5 rounded-md">✓ Acceso directo 1 toque</span>
                <span className="bg-white/10 px-2.5 py-0.5 rounded-md">✓ Funciona sin internet</span>
                <span className="bg-white/10 px-2.5 py-0.5 rounded-md">✓ No consume memoria</span>
              </div>
            </div>

            <div className="flex items-center gap-2.5 shrink-0 pt-2 md:pt-0 w-full sm:w-auto">
              <button
                id="btn-calendar-install-app"
                onClick={onInstallPWA}
                className="flex-1 sm:flex-none px-5 py-3 rounded-xl bg-gradient-to-r from-[#00E5FF] to-[#10B981] hover:from-[#22E6FF] hover:to-[#059669] text-[#042F2C] font-extrabold text-xs sm:text-sm flex items-center justify-center space-x-2 shadow-[0_0_18px_rgba(0,229,255,0.35)] transition-all cursor-pointer active:scale-95 whitespace-nowrap"
              >
                <Download className="w-4 h-4 text-[#042F2C]" />
                <span>Descargar / Instalar App</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setShowInstallBanner(false);
                  try {
                    localStorage.setItem('colifem_hide_install_banner', 'true');
                  } catch {}
                }}
                className="p-2.5 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                title="Cerrar este aviso"
                aria-label="Cerrar aviso de instalación"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

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
          <div className="bg-[#FAF6F0] p-4 sm:p-5 rounded-2xl border border-[#E2E8F0] w-full md:min-w-[280px] md:w-auto">
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
            <div className="flex items-center justify-between text-xs text-[#64748B] gap-2">
              {isNextDayWaiting ? (
                <div className="flex items-center space-x-1.5 text-[#92400E]">
                  <Clock className="w-3.5 h-3.5 text-[#D97706] shrink-0 animate-pulse" />
                  <span>
                    Día {nextDayNumber} en: <strong className="font-mono text-[#B45309] font-black">{formattedTime}</strong>
                  </span>
                </div>
              ) : (
                <span>
                  Día actual: <strong className="text-[#0F766E]">Día {nextDayNumber}</strong>
                </span>
              )}

              {isNextDayWaiting ? (
                <button
                  id="btn-overview-waiting-clock"
                  onClick={() => setWaitingModalDay(nextDayNumber)}
                  className="px-2.5 py-1 rounded-lg bg-[#FEF3C7] text-[#92400E] hover:bg-[#FDE68A] font-bold text-[11px] transition-colors cursor-pointer whitespace-nowrap flex items-center gap-1"
                >
                  <Clock className="w-3 h-3 text-[#D97706]" />
                  <span>Ver Reloj 24h</span>
                </button>
              ) : (
                <button
                  id="btn-overview-checkin"
                  onClick={() => onOpenTracker(nextDayNumber)}
                  className="text-[#0F766E] font-bold hover:underline cursor-pointer whitespace-nowrap"
                >
                  Chequeo de Hoy →
                </button>
              )}
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
              title="Permite omitir la espera de 24h para demostración y validación rápida"
            >
              <Zap className={`w-3.5 h-3.5 ${demoMode ? 'text-[#D97706]' : 'text-[#94A3B8]'}`} />
              <span>{demoMode ? '⚡ Modo Demo Activo' : '⚡ Modo Demo'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* 24h Live Countdown Banner if Next Day is in Assimilation */}
      {isNextDayWaiting && (
        <div className="p-4 sm:p-5 rounded-2xl sm:rounded-3xl bg-linear-to-r from-[#FFFBEB] via-[#FEF3C7] to-[#FDE68A] border-2 border-[#F59E0B] shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-start space-x-3 text-[#92400E]">
            <div className="w-10 h-10 rounded-2xl bg-white border border-[#F59E0B]/50 flex items-center justify-center shrink-0 shadow-xs mt-0.5">
              <Clock className="w-5 h-5 text-[#D97706] animate-pulse" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-[10px] uppercase tracking-wider font-extrabold px-2 py-0.5 rounded-full bg-[#D97706] text-white">
                  Ciclo Cronológico de 24 Horas
                </span>
                <span className="text-xs font-bold text-[#92400E]">
                  Día {maxCompletedDay} Completado ✓
                </span>
              </div>
              <h3 className="text-sm sm:text-base font-extrabold text-[#78350F] mt-1">
                Día {nextDayNumber} en Asimilación Digestiva (24 Horas)
              </h3>
              <p className="text-xs text-[#92400E] mt-0.5 max-w-xl leading-relaxed">
                Para que los 8 superalimentos de Coli Plus cumplan su efecto progresivo y ordenado, el Día {nextDayNumber} se desbloqueará exactamente cuando el reloj llegue a cero.
              </p>
            </div>
          </div>

          {/* Large Live Digital Countdown Box */}
          <div className="bg-white/95 px-5 py-3 rounded-2xl border-2 border-[#F59E0B] text-center shadow-xs w-full md:w-auto shrink-0">
            <div className="text-[10px] font-bold uppercase tracking-wider text-[#92400E]">
              Habilitación para Registro en:
            </div>
            <div className="font-mono text-2xl sm:text-3xl font-black text-[#B45309] tracking-widest my-0.5">
              {formattedTime}
            </div>
            <div className="flex justify-center items-center space-x-3 text-[9px] text-[#A16207] font-semibold uppercase">
              <span>{hours}h</span>
              <span>•</span>
              <span>{minutes}m</span>
              <span>•</span>
              <span>{seconds}s</span>
            </div>
          </div>
        </div>
      )}

      {/* Days Grid grouped by Phase */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6 gap-3 sm:gap-4">
        {filteredDays.map((dayPlan) => {
          const isCompleted = user.completedDays ? user.completedDays.includes(dayPlan.day) : false;
          const isWaiting24h = !isCompleted && dayPlan.day === nextDayNumber && isNextDayWaiting && !demoMode;
          const isCurrentActive = !isCompleted && dayPlan.day === nextDayNumber && (!isNextDayWaiting || demoMode);
          const isLockedSuperior = !demoMode && dayPlan.day > nextDayNumber;

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
                  ? 'bg-[#FFFBEB] border-2 border-[#F59E0B] hover:shadow-md cursor-pointer'
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
                  <Clock className="w-4 h-4 text-[#D97706] animate-pulse" />
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

              {/* 24h Countdown indicator on Waiting Day */}
              {isWaiting24h && (
                <div className="mt-2.5 py-1.5 px-2 rounded-xl bg-white border border-[#FDE68A] text-center shadow-2xs">
                  <div className="text-[8.5px] font-extrabold uppercase tracking-wider text-[#92400E] flex items-center justify-center gap-1">
                    <Clock className="w-2.5 h-2.5 text-[#D97706]" />
                    <span>Faltan:</span>
                  </div>
                  <div className="font-mono text-xs font-black text-[#B45309] tracking-wider">
                    {formattedTime}
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
                  <span className="text-[#D97706] font-bold flex items-center gap-1">
                    <Clock className="w-2.5 h-2.5 text-[#D97706]" />
                    <span>En Espera</span>
                  </span>
                ) : (
                  <span className="text-[#94A3B8]">Bloqueado</span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Reminder Banner for Reorder at Day 14+ */}
      {maxCompletedDay >= 14 && (
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
              <div className="w-11 h-11 rounded-2xl bg-[#FFFBEB] text-[#D97706] border border-[#FDE68A] flex items-center justify-center font-bold">
                <Clock className="w-6 h-6 animate-pulse" />
              </div>
              <button
                onClick={() => setWaitingModalDay(null)}
                className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div>
              <div className="inline-block text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-[#FEF3C7] text-[#92400E] mb-1">
                Ciclo Cronológico de 30 Días
              </div>
              <h3 className="text-lg font-bold text-[#0F172A] font-display">
                Día {waitingModalDay}: En Asimilación Digestiva (24 Horas)
              </h3>
              <p className="text-xs text-[#64748B] mt-1.5 leading-relaxed">
                ¡Gran trabajo al registrar el Día {maxCompletedDay}! Tu microbiota y pared intestinal están asimilando los nutrientes funcionales de Coli Plus. Para que tu ciclo de 30 días sea ordenado y efectivo, el Día {waitingModalDay} no podrá registrarse hasta que este reloj llegue a cero.
              </p>
            </div>

            {/* Big 3-Block Digital Countdown */}
            <div className="p-4 rounded-2xl bg-[#FAF6F0] border-2 border-[#FDE68A] text-center space-y-2">
              <div className="text-[10px] font-bold text-[#64748B] uppercase tracking-wider">
                Tiempo Restante Para Habilitar Registro:
              </div>
              
              <div className="grid grid-cols-3 gap-2 pt-1">
                <div className="bg-white p-2.5 rounded-xl border border-[#E2E8F0] shadow-2xs">
                  <div className="font-mono text-2xl sm:text-3xl font-black text-[#0F766E]">
                    {String(hours).padStart(2, '0')}
                  </div>
                  <div className="text-[9px] font-bold uppercase text-[#64748B]">Horas</div>
                </div>
                <div className="bg-white p-2.5 rounded-xl border border-[#E2E8F0] shadow-2xs">
                  <div className="font-mono text-2xl sm:text-3xl font-black text-[#0F766E]">
                    {String(minutes).padStart(2, '0')}
                  </div>
                  <div className="text-[9px] font-bold uppercase text-[#64748B]">Minutos</div>
                </div>
                <div className="bg-white p-2.5 rounded-xl border border-[#E2E8F0] shadow-2xs">
                  <div className="font-mono text-2xl sm:text-3xl font-black text-[#D97706]">
                    {String(seconds).padStart(2, '0')}
                  </div>
                  <div className="text-[9px] font-bold uppercase text-[#64748B]">Segundos</div>
                </div>
              </div>

              <div className="text-[10px] text-[#92400E] font-medium pt-1">
                El siguiente día se activará automáticamente al cumplirse las 24 horas.
              </div>
            </div>

            <div className="pt-2 flex flex-col gap-2">
              <button
                onClick={() => setWaitingModalDay(null)}
                className="w-full py-3 rounded-xl bg-[#0F766E] text-white font-bold text-xs hover:bg-[#115E59] transition-all shadow-xs"
              >
                Entendido, cumpliré mi ciclo de 24h ✓
              </button>

              <button
                onClick={() => {
                  setDemoMode(true);
                  setWaitingModalDay(null);
                }}
                className="w-full py-2 rounded-xl border border-[#CBD5E1] text-[#475569] font-bold text-[11px] hover:bg-slate-50 transition-colors flex items-center justify-center space-x-1.5"
              >
                <Zap className="w-3.5 h-3.5 text-[#D97706]" />
                <span>Desbloquear Día Ahora (Modo Demostración)</span>
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
