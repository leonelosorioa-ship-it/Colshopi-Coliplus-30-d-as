import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import { Award, Download, Share2, X, Sparkles, Heart } from 'lucide-react';
import { generateDiplomaPDF } from '../utils/pdfGenerator';
import { marieVoice } from '../utils/speechHelper';

interface MilestoneModalProps {
  dayNumber: number;
  userName: string;
  isOpen: boolean;
  onClose: () => void;
  onOpenStore: () => void;
}

export const MilestoneModal: React.FC<MilestoneModalProps> = ({
  dayNumber,
  userName,
  isOpen,
  onClose,
  onOpenStore
}) => {
  useEffect(() => {
    if (isOpen) {
      // Confetti burst
      try {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (e) {
        console.warn('Confetti burst error:', e);
      }

      // Voice coaching congratulations
      const audioText = dayNumber === 30
        ? `¡Felicidades con todo el corazón, ${userName}! Hoy completaste tus 30 días de transformación digestiva. Tu esfuerzo, constancia y amor por tu cuerpo han dado fruto. Tu colon está desinflamado y equilibrado. Descarga tu Diploma Oficial de Victoria Digestiva firmado con orgullo por ColShopi y por mí.`
        : `¡Felicidades, ${userName}! Llegaste al Día 15, la mitad exacta del protocolo ColiPlus. Tu abdomen está respondiendo de forma increíble. Sigue adelante con la misma energía.`;

      marieVoice.speak(audioText);
    }
  }, [isOpen, dayNumber, userName]);

  if (!isOpen) return null;

  const isGraduation = dayNumber === 30;

  const handleShareWhatsApp = () => {
    const text = encodeURIComponent(
      `🎉 ¡Acabo de completar el Protocolo de 30 Días con ColiPlus de ColShopi! Logré desinflamar mi colon, regular mi digestión y sentirme con una energía increíble. ¡Gracias a Marié y a la fórmula natural de ColiPlus!`
    );
    window.open(`https://wa.me/?text=${text}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-white w-full max-w-xl rounded-3xl shadow-2xl border border-[#E2E8F0] overflow-hidden text-center p-6 sm:p-8 space-y-6 relative"
      >
        <button
          onClick={() => {
            marieVoice.stop();
            onClose();
          }}
          className="absolute top-4 right-4 p-2 text-[#94A3B8] hover:text-[#0F172A] rounded-xl hover:bg-[#F1F5F9]"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Icon & Milestone Badge */}
        <div className="mx-auto w-20 h-20 rounded-3xl bg-linear-to-br from-[#FEF3C7] to-[#FDE68A] border-2 border-[#F59E0B] flex items-center justify-center text-4xl shadow-md">
          {isGraduation ? '🏆' : '⭐'}
        </div>

        <div className="space-y-2">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-[#FEF3C7] text-[#92400E]">
            <Sparkles className="w-3.5 h-3.5 mr-1 text-[#D97706]" />
            {isGraduation ? '¡VICTORIA DIGESTIVA TOTAL!' : '¡HITO DE LA MITAD DEL CAMINO!'}
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-[#0F172A] font-display">
            {isGraduation ? `¡Graduación Oficial, ${userName}!` : `¡Día 15 Alcanzado, ${userName}!`}
          </h2>
          <p className="text-xs sm:text-sm text-[#64748B] max-w-md mx-auto leading-relaxed">
            {isGraduation
              ? 'Has culminado con éxito las 4 fases del protocolo: descompresión, regeneración de la mucosa, repoblación bacteriana y blindaje de hábitos.'
              : 'Has completado la desinflamación y reparación inicial. Tu microbiota ahora está lista para fortalecerse en las Fases 3 y 4.'}
          </p>
        </div>

        {/* Marie Endorsement Box */}
        <div className="p-4 rounded-2xl bg-[#ECFDF5] border border-[#A7F3D0] text-xs text-[#065F46] flex items-center space-x-3 text-left">
          <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-lg shrink-0 shadow-xs">
            👩‍⚕️
          </div>
          <div>
            <span className="font-bold">Palabras de Marié:</span>
            <p className="mt-0.5 italic">
              {isGraduation
                ? '"Tu compromiso con tu salud digestiva ha transformado tu calidad de vida. Este diploma es testimonio de tu constancia."'
                : '"Revisa la cantidad restante de tu frasco para asegurar tu continuidad en las semanas más importantes."'}
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3 pt-2">
          {isGraduation ? (
            <button
              id="btn-download-official-diploma"
              onClick={() => generateDiplomaPDF(userName)}
              className="w-full py-3.5 px-6 rounded-2xl bg-linear-to-r from-[#0F766E] to-[#10B981] text-white font-bold text-sm hover:opacity-95 transition-all shadow-md flex items-center justify-center space-x-2"
            >
              <Download className="w-4 h-4" />
              <span>Descargar Diploma Oficial en PDF</span>
            </button>
          ) : (
            <button
              onClick={() => {
                onClose();
                onOpenStore();
              }}
              className="w-full py-3.5 px-6 rounded-2xl bg-linear-to-r from-[#D97706] to-[#F59E0B] text-white font-bold text-sm hover:opacity-95 transition-all shadow-md flex items-center justify-center space-x-2"
            >
              <Sparkles className="w-4 h-4" />
              <span>Asegurar Próximo Frasco con Descuento VIP</span>
            </button>
          )}

          <div className="flex items-center justify-center space-x-3">
            <button
              onClick={handleShareWhatsApp}
              className="px-4 py-2 rounded-xl bg-[#FAF6F0] hover:bg-[#F5EFE6] text-[#334155] text-xs font-semibold flex items-center space-x-1.5 transition-colors border border-[#CBD5E1]"
            >
              <Share2 className="w-3.5 h-3.5 text-[#059669]" />
              <span>Compartir Logro en WhatsApp</span>
            </button>

            <button
              onClick={() => {
                marieVoice.stop();
                onClose();
              }}
              className="px-4 py-2 rounded-xl text-[#64748B] hover:text-[#0F172A] text-xs font-semibold"
            >
              Continuar Protocolo
            </button>
          </div>
        </div>

      </motion.div>
    </div>
  );
};
