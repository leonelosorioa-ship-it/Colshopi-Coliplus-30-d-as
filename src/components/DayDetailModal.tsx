import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Volume2, Square, CheckCircle, Circle, Sparkles, BookOpen, Utensils, Check, Pill, Droplet } from 'lucide-react';
import { DayPlan, UserProfile } from '../types';
import { biankaVoice } from '../utils/speechHelper';

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
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [completedTaskIds, setCompletedTaskIds] = useState<string[]>([]);

  useEffect(() => {
    if (dayPlan) {
      // Check if tasks were completed in state or mark all if day already completed
      const isDayDone = user.completedDays.includes(dayPlan.day);
      if (isDayDone) {
        setCompletedTaskIds(dayPlan.tasks.map(t => t.id));
      } else {
        setCompletedTaskIds([]);
      }
      setIsPlayingAudio(false);
      biankaVoice.stop();
    }
  }, [dayPlan, user]);

  if (!dayPlan) return null;

  const isDayCompleted = user.completedDays.includes(dayPlan.day);

  const toggleTask = (taskId: string) => {
    let updated: string[];
    if (completedTaskIds.includes(taskId)) {
      updated = completedTaskIds.filter(id => id !== taskId);
    } else {
      updated = [...completedTaskIds, taskId];
    }
    setCompletedTaskIds(updated);

    // If all tasks completed, offer to complete day
    if (updated.length === dayPlan.tasks.length && !isDayCompleted) {
      onCompleteDay(dayPlan.day, true);
    }
  };

  const handleToggleAudio = () => {
    if (isPlayingAudio) {
      biankaVoice.stop();
      setIsPlayingAudio(false);
    } else {
      setIsPlayingAudio(true);
      biankaVoice.speak(
        dayPlan.marieAudioText,
        () => setIsPlayingAudio(true),
        () => setIsPlayingAudio(false),
        () => setIsPlayingAudio(false)
      );
    }
  };

  const handleCompleteButtonClick = () => {
    onCompleteDay(dayPlan.day, !isDayCompleted);
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
            onClick={() => {
              biankaVoice.stop();
              onClose();
            }}
            className="p-2 rounded-xl text-[#64748B] hover:text-[#0F172A] hover:bg-[#F1F5F9] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-5 sm:p-6 space-y-6 max-h-[75vh] overflow-y-auto">
          
          {/* Bianka Voice Audio Coaching Card */}
          <div className="p-4 sm:p-5 rounded-2xl bg-linear-to-r from-[#ECFDF5] to-[#F0FDF4] border border-[#A7F3D0] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center space-x-3">
              <div className="w-11 h-11 rounded-2xl bg-white shadow-xs border border-[#A7F3D0] flex items-center justify-center font-bold text-[#0F766E] text-sm">
                🌿
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <h4 className="text-xs font-bold text-[#065F46] uppercase tracking-wider">
                    Audio-Guía Diaria con Bianka 💚
                  </h4>
                  {isPlayingAudio && (
                    <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-bold bg-[#10B981] text-white animate-pulse">
                      Reproduciendo
                    </span>
                  )}
                </div>
                <p className="text-xs text-[#047857] mt-0.5">
                  Consejos prácticos de hábitos, bienestar y digestión ligera con ColShopi.
                </p>
              </div>
            </div>

            <button
              id="btn-play-bianka-audio"
              onClick={handleToggleAudio}
              className={`px-4 py-2 rounded-xl font-bold text-xs flex items-center space-x-2 transition-all shadow-xs ${
                isPlayingAudio
                  ? 'bg-[#DC2626] text-white hover:bg-[#B91C1C]'
                  : 'bg-[#0F766E] text-white hover:bg-[#115E59]'
              }`}
            >
              {isPlayingAudio ? (
                <>
                  <Square className="w-3.5 h-3.5" />
                  <span>Detener Audio</span>
                </>
              ) : (
                <>
                  <Volume2 className="w-4 h-4" />
                  <span>Escuchar a Bianka 💚</span>
                </>
              )}
            </button>
          </div>

          {/* Bianka Quote Box */}
          <div className="bg-[#FAF6F0] p-4 rounded-2xl border-l-4 border-[#0F766E] italic text-xs text-[#334155] leading-relaxed">
            "{dayPlan.marieQuote}"
          </div>

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
          <button
            onClick={() => {
              onOpenTracker(dayPlan.day);
              onClose();
            }}
            className="w-full sm:w-auto px-4 py-2.5 rounded-xl border border-[#CBD5E1] bg-white hover:bg-[#F8FAFC] text-[#334155] text-xs font-bold transition-colors shadow-xs"
          >
            Registrar Síntomas en Tracker →
          </button>

          <button
            id="btn-mark-day-complete"
            onClick={handleCompleteButtonClick}
            className={`w-full sm:w-auto px-6 py-2.5 rounded-xl font-bold text-xs flex items-center justify-center space-x-1.5 transition-all shadow-xs ${
              isDayCompleted
                ? 'bg-[#10B981] text-white hover:bg-[#059669]'
                : 'bg-[#0F766E] text-white hover:bg-[#115E59]'
            }`}
          >
            <Check className="w-4 h-4" />
            <span>{isDayCompleted ? 'Día Marcado como Completado ✓' : 'Marcar Día como Completado'}</span>
          </button>
        </div>

      </motion.div>
    </div>
  );
};
