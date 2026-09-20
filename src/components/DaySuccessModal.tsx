import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import { CheckCircle2, Sparkles, Clock, ArrowRight, ShieldCheck, Heart, Award, X } from 'lucide-react';
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
        particleCount: 90,
        spread: 70,
        origin: { y: 0.55 },
        colors: ['#10B981', '#0F766E', '#F59E0B', '#00E5FF', '#EC4899', '#8B5CF6']
      });
      // Second light shower
      setTimeout(() => {
        try {
          confetti({
            particleCount: 45,
            angle: 60,
            spread: 55,
            origin: { x: 0, y: 0.6 },
            colors: ['#10B981', '#00E5FF', '#F59E0B']
          });
          confetti({
            particleCount: 45,
            angle: 120,
            spread: 55,
            origin: { x: 1, y: 0.6 },
            colors: ['#10B981', '#00E5FF', '#F59E0B']
          });
        } catch (e) {}
      }, 350);
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
      <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-3.5 sm:p-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="bg-white w-full max-w-lg rounded-3xl shadow-2xl border-2 border-[#10B981]/30 overflow-hidden relative"
        >
          {/* Top celebratory decorative banner */}
          <div className="bg-gradient-to-r from-[#0F766E] via-[#10B981] to-[#059669] p-6 text-white text-center relative overflow-hidden">
            {/* Background Glow */}
            <div className="absolute -right-8 -top-8 w-32 h-32 bg-white/10 rounded-full blur-xl pointer-events-none" />
            <div className="absolute -left-8 -bottom-8 w-32 h-32 bg-[#F59E0B]/20 rounded-full blur-xl pointer-events-none" />

            {/* Close button */}
            <button
              onClick={onCloseAndGoHome}
              className="absolute top-4 right-4 p-1.5 rounded-full bg-black/20 hover:bg-black/30 text-white/90 hover:text-white transition-colors cursor-pointer"
              title="Cerrar y volver al inicio"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Avatar & Celebration Icon */}
            <div className="flex flex-col items-center justify-center relative">
              <div className="relative mb-2">
                <div className="relative p-1 rounded-full bg-white/20 shadow-lg ring-4 ring-white/30">
                  <BiankaAvatar size="lg" className="border-2 border-white" />
                </div>
                <div className="absolute -bottom-1 -right-1 bg-[#F59E0B] text-white p-1.5 rounded-full shadow-md animate-bounce">
                  <Sparkles className="w-4 h-4" />
                </div>
              </div>

              <div className="inline-flex items-center space-x-1.5 px-3 py-0.5 rounded-full bg-white/20 text-white text-xs font-bold uppercase tracking-wider mb-1">
                <span>✨ ¡Registro Guardado con Éxito! ✨</span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-extrabold font-display tracking-tight text-white drop-shadow-xs">
                ¡Día {dayNumber} Completado!
              </h2>
              <p className="text-emerald-100 text-xs sm:text-sm font-medium mt-1">
                {dayPlan?.phaseTitle || 'Transformación Digestiva Coli Plus'}
              </p>
            </div>
          </div>

          {/* Modal Body */}
          <div className="p-6 sm:p-7 space-y-5 bg-[#FAF6F0]">
            {/* Congratulatory Message from Bianka */}
            <div className="bg-white p-4 sm:p-5 rounded-2xl border border-[#E2E8F0] shadow-xs space-y-2.5">
              <div className="flex items-center space-x-2 text-[#0F766E] font-bold text-xs uppercase tracking-wide">
                <Heart className="w-4 h-4 text-[#E11D48] fill-[#E11D48]" />
                <span>Mensaje de Bianka</span>
              </div>
              <p className="text-[#1E293B] text-sm leading-relaxed">
                ¡Excelente trabajo, <strong className="text-[#0F766E]">{userName}</strong>!{' '}
                {isCheckInOnly
                  ? `Registraste tus síntomas y estado digestivo del Día ${dayNumber}. Tu constancia es el secreto para restaurar tu flora intestinal y desinflamar tu colon.`
                  : `Has cumplido y registrado tus hábitos del Día ${dayNumber} con éxito. Cada paso diario con Coli Plus fortalece tu mucosa digestiva y te acerca a la ligereza total.`}
              </p>
              {dayPlan?.biankaQuote && (
                <div className="text-xs text-[#065F46] bg-[#ECFDF5] p-3 rounded-xl border border-[#A7F3D0] italic">
                  "{dayPlan.biankaQuote}"
                </div>
              )}
            </div>

            {/* Success Highlights Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-3.5 rounded-xl bg-white border border-[#E2E8F0] flex items-start space-x-3 shadow-2xs">
                <div className="p-2 rounded-lg bg-[#ECFDF5] text-[#10B981] shrink-0">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-[#0F172A]">Información Guardada</h4>
                  <p className="text-[11px] text-[#64748B] mt-0.5">
                    Registrado en tu historial y sincronizado con tu progreso.
                  </p>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-white border border-[#E2E8F0] flex items-start space-x-3 shadow-2xs">
                <div className="p-2 rounded-lg bg-[#FEF3C7] text-[#D97706] shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-[#0F172A]">Ciclo Biológico (24h)</h4>
                  <p className="text-[11px] text-[#64748B] mt-0.5">
                    {dayNumber < 30
                      ? `El Día ${nextDay} se habilitará en 24h para cuidar tu ritmo.`
                      : '¡Completaste los 30 días de la guía de colon!'}
                  </p>
                </div>
              </div>
            </div>

            {/* Countdown and Auto-return notice */}
            <div className="bg-[#F0FDF4] border border-[#BBF7D0] p-3.5 rounded-2xl flex items-center justify-between text-xs">
              <div className="flex items-center space-x-2 text-[#065F46]">
                <Sparkles className="w-4 h-4 text-[#10B981] animate-spin" style={{ animationDuration: '3s' }} />
                <span>
                  Volviendo automáticamente al inicio en <strong>{countdown}s</strong>
                </span>
              </div>
              <div className="w-16 bg-[#DCFCE7] h-2 rounded-full overflow-hidden">
                <div
                  className="bg-[#10B981] h-full transition-all duration-1000 ease-linear"
                  style={{ width: `${(countdown / 4) * 100}%` }}
                />
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row items-center gap-2.5 pt-1">
              <button
                id="btn-celebration-go-home"
                onClick={onCloseAndGoHome}
                className="w-full sm:flex-1 py-3 px-5 rounded-xl bg-gradient-to-r from-[#0F766E] to-[#10B981] text-white font-bold text-xs sm:text-sm hover:opacity-95 transition-all shadow-md flex items-center justify-center space-x-2 cursor-pointer active:scale-98"
              >
                <span>Volver a la Sección Principal</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              {onGoToMetrics && (
                <button
                  id="btn-celebration-go-metrics"
                  onClick={onGoToMetrics}
                  className="w-full sm:w-auto py-3 px-4 rounded-xl bg-white border border-[#CBD5E1] text-[#334155] font-bold text-xs hover:bg-[#F8FAFC] transition-colors whitespace-nowrap cursor-pointer"
                >
                  Ver Métricas 📊
                </button>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
