import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, CheckCircle, Circle, Sparkles, BookOpen, Utensils, Check, Pill, Droplet, Clock, Lock, Zap } from 'lucide-react';
import { DayPlan, UserProfile } from '../types';
import { getChronologicalStatus } from '../utils/chronologicalCycle';

interface DayDetailModalProps {
  dayPlan: DayPlan | null;
  user: UserProfile;
  onClose: () => void;
  onCompleteDay: (dayNumber: number, allTasksDone: boolean) => void;
  onOpenTracker: (dayNumber: number) => void;
  onOpenRecipe: (recipeId: string) => void;
}

export const DayDetailModal: React.FC<DayDetailModalProps> = ({
  dayPlan,
  user,
  onClose,
  onCompleteDay,
  onOpenTracker,
  onOpenRecipe
}) => {
  const [completedTaskIds, setCompletedTaskIds] = useState<string[]>([]);
  const [demoMode, setDemoMode] = useState(false);

  // 1-second ticker for real-time countdown
  const [now, setNow] = useState(Date.now());
  useEffect(() => {
    const timer = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (dayPlan) {
      // Check if tasks were completed in state or mark all if day already completed
      const isDayDone = user.completedDays ? user.completedDays.includes(dayPlan.day) : false;
      if (isDayDone) {
        setCompletedTaskIds(dayPlan.tasks.map(t => t.id));
      } else {
        setCompletedTaskIds([]);
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

    let updated: string[];
    if (completedTaskIds.includes(taskId)) {
      updated = completedTaskIds.filter(id => id !== taskId);
    } else {
      updated = [...completedTaskIds, taskId];
    }
    setCompletedTaskIds(updated);

    // If all tasks completed, celebrate and return to main section
    if (updated.length === dayPlan.tasks.length && !isDayCompleted) {
      onCompleteDay(dayPlan.day, true);
      onClose();
    }
  };

  const handleCompleteButtonClick = () => {
    if (isActionBlocked && !isDayCompleted) return;
    if (isDayCompleted) {
      // Already completed: return to main section
      onClose();
      return;
    }
    // Register completion, celebrate, and return to main section
    onCompleteDay(dayPlan.day, true);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.96 }}
        className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl border border-[#E2E8F0] overflow-hidden my-6"
      >
        {/* Modal Header */}
        <div className="bg-[#FDFBF7] p-5 sm:p-6 border-b border-[#E2E8F0] flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-[#0F766E] text-white flex items-center justify-center font-mono font-bold text-sm">
              D{dayPlan.day}
            </div>
            <div>
              <span className="text-xs font-bold text-[#0F766E] uppercase tracking-wider">
                {dayPlan.phaseTitle}
              </span>
              <h2 className="text-lg sm:text-xl font-bold text-[#0F172A] font-display">
                {dayPlan.dailyGoal}
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-[#64748B] hover:text-[#0F172A] hover:bg-[#F1F5F9] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-5 sm:p-6 space-y-6 max-h-[75vh] overflow-y-auto">
          
          {/* 24h Countdown Alert Banner inside Modal */}
          {isDayWaiting24h && (
            <div className="p-4 rounded-2xl bg-linear-to-r from-[#FFFBEB] to-[#FEF3C7] border-2 border-[#F59E0B] flex items-center justify-between gap-3 text-xs text-[#92400E]">
              <div className="flex items-center space-x-2.5">
                <Clock className="w-5 h-5 text-[#D97706] shrink-0 animate-pulse" />
                <div>
                  <div className="font-extrabold text-[#78350F]">En proceso de asimilación digestiva (24h)</div>
                  <div className="text-[11px] text-[#B45309]">Para un ciclo cronológico de 30 días, este día se activará en:</div>
                </div>
              </div>
              <div className="font-mono text-base font-black text-[#B45309] bg-white px-3 py-1 rounded-xl border border-[#FDE68A] shrink-0 shadow-2xs">
                {cycleStatus.formattedTime}
              </div>
            </div>
          )}

          {/* Locked Future Day Banner */}
          {isDayLockedFuture && (
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center space-x-3 text-xs text-slate-600">
              <Lock className="w-4 h-4 text-slate-400 shrink-0" />
              <div>
                <strong>Día Bloqueado:</strong> Para garantizar el uso cronológico y ordenado de tu ciclo, completa primero el <strong>Día {cycleStatus.nextDayNumber}</strong>.
              </div>
            </div>
          )}

          {/* Bianka Quote / Mensaje Diario (solo si existe y tiene contenido) */}
          {dayPlan.biankaQuote && dayPlan.biankaQuote.trim() !== '' && (
            <div className="bg-[#FAF6F0] p-4 rounded-2xl border-l-4 border-[#0F766E] italic text-xs text-[#334155] leading-relaxed flex items-start space-x-2.5">
              <span className="text-base not-italic leading-none">🌿</span>
              <span>"{dayPlan.biankaQuote}"</span>
            </div>
          )}

          {/* Supplement Dosage Guideline */}
          <div className="p-3.5 rounded-2xl bg-[#F0FDF4] border border-[#BBF7D0] flex items-start space-x-3">
            <Pill className="w-4 h-4 text-[#0F766E] shrink-0 mt-0.5" />
            <div className="text-xs">
              <span className="font-bold text-[#065F46]">Dosis de Coli Plus para hoy:</span>
              <p className="text-[#047857] mt-0.5 leading-relaxed">
                1 cucharada dosificadora rasa disuelta en 250ml de agua fresca o infusión tibia (momento ideal: 20-30 min después de cenar o en ayunas). Acompáñalo con mínimo 2 litros de agua durante el día.
              </p>
            </div>
          </div>

          {/* Checklist of Tasks */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold text-[#475569] uppercase tracking-wider">
                Tareas de Bienestar del Día ({completedTaskIds.length}/{dayPlan.tasks.length})
              </h3>
              <span className="text-[11px] text-[#0F766E] font-medium">
                Marca cada tarea al completarla
              </span>
            </div>

            <div className="space-y-2">
              {dayPlan.tasks.map((task) => {
                const isChecked = completedTaskIds.includes(task.id);
                return (
                  <div
                    key={task.id}
                    onClick={() => toggleTask(task.id)}
                    className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-start space-x-3 ${
                      isChecked
                        ? 'bg-[#F0FDF4] border-[#86EFAC]'
                        : 'bg-[#F8FAFC] border-[#E2E8F0] hover:bg-white hover:border-[#CBD5E1]'
                    }`}
                  >
                    <div className="mt-0.5">
                      {isChecked ? (
                        <CheckCircle className="w-4 h-4 text-[#10B981]" />
                      ) : (
                        <Circle className="w-4 h-4 text-[#94A3B8]" />
                      )}
                    </div>
                    <div className="flex-1">
                      <h4 className={`text-xs font-bold ${isChecked ? 'line-through text-[#64748B]' : 'text-[#0F172A]'}`}>
                        {task.title}
                      </h4>
                      <p className="text-[11px] text-[#64748B] mt-0.5 leading-normal">
                        {task.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Digestive Tip & Recipe Integration */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            
            {/* Tip */}
            <div className="p-3.5 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#0F766E]">
                💡 Tip de Bianka
              </span>
              <p className="text-xs text-[#475569] leading-snug">
                {dayPlan.digestiveTip}
              </p>
            </div>

            {/* Recipe link if present */}
            {dayPlan.recommendedRecipeId && (
              <div
                onClick={() => {
                  onOpenRecipe(dayPlan.recommendedRecipeId!);
                  onClose();
                }}
                className="p-3.5 rounded-xl bg-[#FFFBEB] border border-[#FDE68A] hover:border-[#F59E0B] cursor-pointer transition-all space-y-1 group"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#92400E] flex items-center">
                    <Utensils className="w-3 h-3 mr-1" />
                    Receta Antiinflamatoria
                  </span>
                  <span className="text-[10px] text-[#D97706] font-bold group-hover:underline">Ver Receta →</span>
                </div>
                <p className="text-xs text-[#78350F] font-medium leading-snug">
                  Diseñado para reducir fermentación y proteger tu colon hoy.
                </p>
              </div>
            )}
          </div>

        </div>

        {/* Modal Footer Actions */}
        <div className="p-4 sm:p-5 bg-[#FAF6F0] border-t border-[#E2E8F0] flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={() => {
                onOpenTracker(dayPlan.day);
                onClose();
              }}
              className="w-full sm:w-auto px-4 py-2.5 rounded-xl border border-[#CBD5E1] bg-white hover:bg-[#F8FAFC] text-[#334155] text-xs font-bold transition-colors shadow-xs"
            >
              {isActionBlocked ? 'Ver Tracker de Síntomas →' : 'Registrar Síntomas en Tracker →'}
            </button>

            {isActionBlocked && (
              <button
                type="button"
                onClick={() => setDemoMode(true)}
                className="px-3 py-2 rounded-xl border border-[#F59E0B] bg-[#FEF3C7] text-[#92400E] font-bold text-xs hover:bg-[#FDE68A] transition-colors whitespace-nowrap flex items-center gap-1"
                title="Permite omitir la espera de 24h para demostración"
              >
                <Zap className="w-3.5 h-3.5 text-[#D97706]" />
                <span>Demo</span>
              </button>
            )}
          </div>

          <button
            id="btn-mark-day-complete"
            onClick={handleCompleteButtonClick}
            disabled={isActionBlocked && !isDayCompleted}
            className={`w-full sm:w-auto px-6 py-2.5 rounded-xl font-bold text-xs flex items-center justify-center space-x-1.5 transition-all shadow-xs ${
              isDayCompleted
                ? 'bg-[#10B981] text-white hover:bg-[#059669] cursor-pointer'
                : isDayWaiting24h
                ? 'bg-[#FEF3C7] text-[#92400E] border border-[#FDE68A] cursor-not-allowed'
                : isDayLockedFuture
                ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                : 'bg-[#0F766E] text-white hover:bg-[#115E59] cursor-pointer'
            }`}
          >
            {isDayCompleted ? (
              <>
                <Check className="w-4 h-4" />
                <span>Día Registrado • Volver al Inicio 🌿</span>
              </>
            ) : isDayWaiting24h ? (
              <>
                <Clock className="w-4 h-4 text-[#D97706] animate-pulse" />
                <span>Esperando 24 Horas ({cycleStatus.formattedTime})</span>
              </>
            ) : isDayLockedFuture ? (
              <>
                <Lock className="w-4 h-4 text-slate-400" />
                <span>Día Bloqueado (Completa Día {cycleStatus.nextDayNumber})</span>
              </>
            ) : (
              <>
                <Check className="w-4 h-4" />
                <span>Confirmar y Completar Día {dayPlan.day} ✨</span>
              </>
            )}
          </button>
        </div>

      </motion.div>
    </div>
  );
};
