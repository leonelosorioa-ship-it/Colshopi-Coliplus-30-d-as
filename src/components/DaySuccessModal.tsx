import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import { CheckCircle2, Sparkles, Clock, ArrowRight, Heart, X, BarChart3 } from 'lucide-react';
import { UserProfile } from '../types';
import { COLIPLUS_30_DAYS } from '../data/coliplusDaysData';
import { BiankaAvatar } from './BiankaAvatar';
import { playCelebrationChime } from '../utils/soundEffects';

interface DaySuccessModalProps {
  isOpen: boolean;
  dayNumber: number;
  userName: string;
  user?: UserProfile | null;
  goalTitle?: string;
  isCheckInOnly?: boolean;
  onCloseAndGoHome: () => void;
  onGoToMetrics?: () => void;
}

export const DaySuccessModal: React.FC<DaySuccessModalProps> = ({
  isOpen,
  dayNumber,
  userName,
  user,
  goalTitle,
  isCheckInOnly = false,
  onCloseAndGoHome,
  onGoToMetrics
}) => {
  const [countdown, setCountdown] = useState(4);

  // Look up day info
  const dayPlan = COLIPLUS_30_DAYS.find((d) => d.day === dayNumber) || COLIPLUS_30_DAYS[0];
  const nextDay = Math.min(30, dayNumber + 1);

  useEffect(() => {
    if (!isOpen) return;

    // 1. Play gentle celebration chime
    playCelebrationChime();

    // 2. Launch colorful celebration confetti
    try {
      confetti({
        particleCount: 80,
        spread: 65,
        origin: { y: 0.55 },
        colors: ['#10B981', '#0F766E', '#F59E0B', '#00E5FF', '#EC4899', '#8B5CF6']
      });
      setTimeout(() => {
        try {
          confetti({
            particleCount: 35,
            angle: 60,
            spread: 50,
            origin: { x: 0.1, y: 0.6 },
            colors: ['#10B981', '#00E5FF', '#F59E0B']
          });
          confetti({
            particleCount: 35,
            angle: 120,
            spread: 50,
            origin: { x: 0.9, y: 0.6 },
            colors: ['#10B981', '#00E5FF', '#F59E0B']
          });
        } catch (e) {}
      }, 300);
    } catch (e) {
      console.debug('Confetti error:', e);
    }

    // 3. Countdown timer for automatic return to main section
    setCountdown(4);
    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          onCloseAndGoHome();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isOpen, dayNumber]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto overscroll-contain bg-slate-900/75 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 15 }}
          transition={{ type: 'spring', damping: 25, stiffness: 320 }}
          className="bg-white w-full max-w-sm sm:max-w-md rounded-3xl shadow-2xl border-2 border-[#10B981]/30 overflow-hidden relative max-h-[90vh] sm:max-h-[88vh] flex flex-col my-auto"
        >
          {/* Top celebratory decorative banner - Mobile Optimized */}
          <div className="bg-gradient-to-r from-[#064E3B] via-[#0F766E] to-[#10B981] p-4 sm:p-5 text-white text-center relative shrink-0">
            {/* Background Glow */}
            <div className="absolute -right-8 -top-8 w-24 h-24 bg-white/10 rounded-full blur-lg pointer-events-none" />
            <div className="absolute -left-8 -bottom-8 w-24 h-24 bg-[#F59E0B]/20 rounded-full blur-lg pointer-events-none" />

            {/* Close button */}
            <button
              onClick={onCloseAndGoHome}
              className="absolute top-3 right-3 p-1.5 rounded-full bg-black/20 hover:bg-black/30 text-white/90 hover:text-white transition-colors cursor-pointer"
              title="Cerrar y volver al inicio"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Avatar & Celebration Icon */}
            <div className="flex flex-col items-center justify-center relative">
              <div className="relative mb-1.5">
                <div className="relative p-0.5 rounded-full bg-white/20 shadow-md ring-2 ring-white/40">
                  <BiankaAvatar size="md" className="w-11 h-11 border-2 border-white" />
                </div>
                <div className="absolute -bottom-1 -right-1 bg-[#F59E0B] text-white p-1 rounded-full shadow-md animate-bounce">
                  <Sparkles className="w-3 h-3" />
                </div>
              </div>

              <div className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full bg-white/20 text-white text-[10px] sm:text-xs font-bold uppercase tracking-wider mb-0.5">
                <span>✨ ¡Registro Guardado con Éxito! ✨</span>
              </div>

              <h2 className="text-xl sm:text-2xl font-black font-display tracking-tight text-white drop-shadow-xs">
                ¡Día {dayNumber} Completado!
              </h2>
              <p className="text-emerald-100 text-[11px] sm:text-xs font-medium mt-0.5 truncate max-w-[280px]">
                {dayPlan?.phaseTitle || 'Transformación Digestiva Coli Plus'}
              </p>
            </div>
          </div>

          {/* Modal Body - Scrollable and Mobile Compact */}
          <div className="p-4 sm:p-5 space-y-3 bg-[#FAF6F0] overflow-y-auto overscroll-contain flex-1">
            {/* Congratulatory Message from Bianka */}
            <div className="bg-white p-3.5 sm:p-4 rounded-2xl border border-[#E2E8F0] shadow-2xs space-y-1.5">
              <div className="flex items-center space-x-1.5 text-[#0F766E] font-bold text-xs uppercase tracking-wide">
                <Heart className="w-3.5 h-3.5 text-[#E11D48] fill-[#E11D48]" />
                <span>Mensaje de Bianka</span>
              </div>
              <p className="text-[#1E293B] text-xs sm:text-sm leading-relaxed">
                ¡Excelente trabajo, <strong className="text-[#0F766E]">{userName}</strong>!{' '}
                {isCheckInOnly
                  ? `Registraste tu test de bienestar del Día ${dayNumber}. Tu constancia restaura la flora intestinal y desinflama tu colon.`
                  : `Tus hábitos y test del Día ${dayNumber} se guardaron con éxito. Cada paso diario con Coli Plus fortalece tu mucosa digestiva.`}
              </p>
              {dayPlan?.biankaQuote && (
                <div className="text-[11px] text-[#065F46] bg-[#ECFDF5] p-2 sm:p-2.5 rounded-xl border border-[#A7F3D0] italic leading-tight">
                  "{dayPlan.biankaQuote}"
                </div>
              )}
            </div>

            {/* Success Highlights Cards - 2 Column Grid, Mobile-First */}
            <div className="grid grid-cols-2 gap-2">
              <div className="p-2.5 rounded-xl bg-white border border-[#E2E8F0] flex items-center space-x-2 shadow-2xs">
                <div className="p-1.5 rounded-lg bg-[#ECFDF5] text-[#10B981] shrink-0">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <h4 className="text-[11px] font-bold text-[#0F172A] truncate">Información Guardada</h4>
                  <p className="text-[10px] text-[#64748B] leading-none mt-0.5 truncate">En tu bitácora</p>
                </div>
              </div>

              <div className="p-2.5 rounded-xl bg-white border border-[#E2E8F0] flex items-center space-x-2 shadow-2xs">
                <div className="p-1.5 rounded-lg bg-[#FEF3C7] text-[#D97706] shrink-0">
                  <Clock className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <h4 className="text-[11px] font-bold text-[#0F172A] truncate">Ciclo 24 Horas</h4>
                  <p className="text-[10px] text-[#64748B] leading-none mt-0.5 truncate">
                    {dayNumber < 30 ? `Día ${nextDay} en 24h` : 'Reto completado'}
                  </p>
                </div>
              </div>
            </div>

            {/* Countdown and Auto-return notice */}
            <div className="bg-[#F0FDF4] border border-[#BBF7D0] p-2.5 rounded-xl flex items-center justify-between text-[11px]">
              <div className="flex items-center space-x-1.5 text-[#065F46] font-medium">
                <Sparkles className="w-3.5 h-3.5 text-[#10B981] animate-spin" style={{ animationDuration: '3s' }} />
                <span>
                  Volviendo al inicio en <strong>{countdown}s</strong>
                </span>
              </div>
              <div className="w-14 bg-[#DCFCE7] h-1.5 rounded-full overflow-hidden">
                <div
                  className="bg-[#10B981] h-full transition-all duration-1000 ease-linear"
                  style={{ width: `${(countdown / 4) * 100}%` }}
                />
              </div>
            </div>

            {/* Actions - Guaranteed within Mobile Viewport */}
            <div className="pt-1 space-y-2">
              <button
                id="btn-celebration-go-home"
                onClick={onCloseAndGoHome}
                className="w-full py-2.5 sm:py-3 px-4 rounded-xl bg-gradient-to-r from-[#0F766E] to-[#10B981] text-white font-bold text-xs sm:text-sm hover:opacity-95 transition-all shadow-md flex items-center justify-center space-x-2 cursor-pointer active:scale-98"
              >
                <span>Volver a la Sección Principal 🌿</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              {onGoToMetrics && (
                <button
                  id="btn-celebration-go-metrics"
                  onClick={onGoToMetrics}
                  className="w-full py-2 px-3 text-center text-[#475569] hover:text-[#0F766E] font-semibold text-xs flex items-center justify-center space-x-1 cursor-pointer"
                >
                  <BarChart3 className="w-3.5 h-3.5 mr-1" />
                  <span>Ver Métricas y Gráficas de Progreso</span>
                </button>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
