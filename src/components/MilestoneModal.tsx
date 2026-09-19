import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import {
  Award,
  Download,
  Share2,
  X,
  Sparkles,
  Play,
  Pause,
  Sun,
  Volume2,
  ExternalLink,
  ShoppingBag,
  CheckCircle2,
  FileText
} from 'lucide-react';
import { generateDiplomaPDF } from '../utils/pdfGenerator';
import {
  BIANKA_AUDIO_ASSETS,
  playBiankaAudio,
  stopActiveBiankaAudio,
  formatAudioTime
} from '../utils/biankaAudioPlayer';
import { BiankaAvatar } from './BiankaAvatar';

interface MilestoneModalProps {
  dayNumber: number;
  userName: string;
  isOpen: boolean;
  onClose: () => void;
  onOpenStore?: () => void;
}

export const MilestoneModal: React.FC<MilestoneModalProps> = ({
  dayNumber,
  userName,
  isOpen,
  onClose,
  onOpenStore
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isAutoplayBlocked, setIsAutoplayBlocked] = useState(false);
  const [audioEnded, setAudioEnded] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Determinar datos según el hito
  const isDay10 = dayNumber === 10;
  const isDay15 = dayNumber === 15;
  const isDay30 = dayNumber === 30 || dayNumber > 15 && !isDay15 && !isDay10;

  const audioUrl = isDay10
    ? BIANKA_AUDIO_ASSETS.DAY_10
    : isDay15
    ? BIANKA_AUDIO_ASSETS.DAY_15
    : BIANKA_AUDIO_ASSETS.DAY_30;

  // Iniciar audio
  const startAudio = (url: string) => {
    try {
      const audio = playBiankaAudio(url, {
        onPlay: () => {
          setIsPlaying(true);
          setIsAutoplayBlocked(false);
        },
        onPause: () => {
          setIsPlaying(false);
        },
        onEnded: () => {
          setIsPlaying(false);
          setAudioEnded(true);
        },
        onTimeUpdate: (cur, dur) => {
          setCurrentTime(cur);
          if (dur && !isNaN(dur)) setDuration(dur);
        },
        onAutoplayBlocked: () => {
          setIsAutoplayBlocked(true);
          setIsPlaying(false);
        },
        onError: () => {
          setIsPlaying(false);
        }
      });
      audioRef.current = audio;
    } catch (err) {
      console.warn('Error iniciando audio en MilestoneModal:', err);
      setIsAutoplayBlocked(true);
    }
  };

  useEffect(() => {
    if (isOpen) {
      // 1. Explosión de Confeti festivo
      try {
        confetti({
          particleCount: 120,
          spread: 80,
          origin: { y: 0.6 },
          colors: ['#10B981', '#0F766E', '#F59E0B', '#38BDF8', '#8B5CF6']
        });
      } catch (e) {
        console.warn('Confetti burst error:', e);
      }

      // 2. Reset de estados y auto-reproducción del audio con Wake Lock
      setCurrentTime(0);
      setDuration(0);
      setAudioEnded(false);
      setIsAutoplayBlocked(false);

      const timer = setTimeout(() => {
        startAudio(audioUrl);
      }, 400);

      return () => {
        clearTimeout(timer);
        stopActiveBiankaAudio();
        audioRef.current = null;
        setIsPlaying(false);
      };
    } else {
      stopActiveBiankaAudio();
      audioRef.current = null;
      setIsPlaying(false);
    }
  }, [isOpen, dayNumber, audioUrl]);

  if (!isOpen) return null;

  const handleTogglePlay = () => {
    if (!audioRef.current) {
      startAudio(audioUrl);
      return;
    }

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
        setIsAutoplayBlocked(false);
      }).catch(() => {
        setIsAutoplayBlocked(true);
      });
    }
  };

  const handleCloseModal = () => {
    stopActiveBiankaAudio();
    audioRef.current = null;
    setIsPlaying(false);
    onClose();
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = parseFloat(e.target.value);
    setCurrentTime(newTime);
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
    }
  };

  const handleShareWhatsApp = () => {
    let text = '';
    if (isDay10) {
      text = encodeURIComponent(
        `🌿 ¡Completé mis primeros 10 Días del Reto ColiFem con Coli Plus de ColShopi! Mi colon se siente mucho más liviano, sin gases ni inflamación. ¡Gracias a Bianka y al protocolo natural!`
      );
    } else if (isDay15) {
      text = encodeURIComponent(
        `🎉 ¡Llegué al Día 15 en mi Reto ColiFem con Coli Plus! Mitad del protocolo conquistada: digestión ligera, tránsito regular y energía renovada.`
      );
    } else {
      text = encodeURIComponent(
        `🏆 ¡Acabo de completar los 30 Días del Reto ColiFem con Coli Plus de ColShopi! Logré desinflamar mi colon, regular mi digestión y sentirme con una energía increíble. ¡Victoria Digestiva Total!`
      );
    }
    window.open(`https://wa.me/?text=${text}`, '_blank');
  };

  const handleWhatsAppReorder = () => {
    const text = encodeURIComponent(
      `Hola Bianka 💚, completé el Día 15 en ColiFem 30D. Deseo reordenar mi próximo frasco de Coli Plus con mi descuento VIP para asegurar la continuidad del tratamiento.`
    );
    window.open(`https://wa.me/573104007428?text=${text}`, '_blank');
  };

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/75 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        className="bg-white w-full max-w-xl rounded-3xl shadow-2xl border border-[#E2E8F0] overflow-hidden text-center p-5 sm:p-7 space-y-5 relative max-h-[92vh] overflow-y-auto"
      >
        {/* Botón Cerrar */}
        <button
          onClick={handleCloseModal}
          className="absolute top-4 right-4 p-2 text-[#94A3B8] hover:text-[#0F172A] rounded-xl hover:bg-[#F1F5F9] transition-colors z-10"
          title="Cerrar modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* ============================================================ */}
        {/* ENCABEZADO VISUAL Y MEDALLA DEL HITO                          */}
        {/* ============================================================ */}
        <div className="pt-2">
          {isDay10 && (
            <div className="mx-auto w-20 h-20 rounded-3xl bg-linear-to-br from-[#D1FAE5] to-[#A7F3D0] border-2 border-[#10B981] flex items-center justify-center text-4xl shadow-lg">
              🌿
            </div>
          )}

          {isDay15 && (
            <div className="mx-auto w-20 h-20 rounded-3xl bg-linear-to-br from-[#FEF3C7] to-[#FDE68A] border-2 border-[#F59E0B] flex items-center justify-center text-4xl shadow-lg">
              🎉
            </div>
          )}

          {isDay30 && (
            <div className="mx-auto w-20 h-20 rounded-3xl bg-linear-to-br from-[#FEF3C7] via-[#FDE68A] to-[#FCD34D] border-2 border-[#D97706] flex items-center justify-center text-4xl shadow-xl animate-pulse">
              🏆
            </div>
          )}
        </div>

        {/* TÍTULOS Y MENSAJES EXACTOS SEGÚN HITO */}
        <div className="space-y-1.5 px-2">
          {isDay10 && (
            <>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-[#ECFDF5] text-[#065F46] border border-[#A7F3D0]">
                <Sparkles className="w-3.5 h-3.5 mr-1 text-[#10B981]" />
                Fase de Restauración • Día 10
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-[#0F172A] font-display">
                ¡10 Días de Constancia Digestiva! 🌿
              </h2>
              <p className="text-xs sm:text-sm text-[#047857] font-semibold max-w-md mx-auto">
                Escucha el mensaje especial de Bianka para tu evolución.
              </p>
              <p className="text-xs text-[#64748B] max-w-md mx-auto pt-1 leading-relaxed">
                Tu mucosa intestinal está asimilando la fibra prebiótica y los 8 superalimentos de Coli Plus. La inflamación post-comida y los gases han disminuido sensiblemente.
              </p>
            </>
          )}

          {isDay15 && (
            <>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-[#FEF3C7] text-[#92400E] border border-[#FDE68A]">
                <Sparkles className="w-3.5 h-3.5 mr-1 text-[#D97706]" />
                Mitad del Protocolo • Día 15
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-[#0F172A] font-display">
                ¡Mitad del Reto Cumplida! 🎉
              </h2>
              <p className="text-xs sm:text-sm text-[#B45309] font-semibold max-w-md mx-auto">
                Tu microbiota se está renovando. Escucha a Bianka y asegura tu continuidad con Coli Plus.
              </p>
              <p className="text-xs text-[#64748B] max-w-md mx-auto pt-1 leading-relaxed">
                Has completado la reparación inicial. Ahora comienza la fase de repoblación bacteriana y blindaje de tus hábitos digestivos.
              </p>
            </>
          )}

          {isDay30 && (
            <>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-[#FEF3C7] text-[#92400E] border border-[#F59E0B]">
                <Award className="w-3.5 h-3.5 mr-1 text-[#D97706]" />
                Victoria Digestiva Total • Día 30
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-[#0F172A] font-display">
                ¡Reto 30 Días Conquistado! 🏆👑
              </h2>
              <p className="text-xs sm:text-sm text-[#0F766E] font-bold max-w-md mx-auto">
                Bianka celebra tu transformación total.
              </p>
              <p className="text-xs text-[#64748B] max-w-md mx-auto pt-1 leading-relaxed">
                Has concluido con éxito los 30 días de transformación con ColiFem y Coli Plus. Tu colon está desinflamado, ligero y con hábitos blindados.
              </p>
            </>
          )}
        </div>

        {/* ============================================================ */}
        {/* REPRODUCTOR DE AUDIO DE BIANKA CON WAKE LOCK INTEGRADO        */}
        {/* ============================================================ */}
        <div className="bg-[#0F172A] text-white rounded-2xl p-4 border border-[#1E293B] shadow-inner text-left space-y-3 relative overflow-hidden">
          
          {/* Barra de progreso superior sutil */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-[#1E293B]">
            <div
              className="h-full bg-linear-to-r from-[#10B981] to-[#38BDF8] transition-all duration-150"
              style={{ width: `${progressPercent}%` }}
            />
          </div>

          <div className="flex items-center justify-between gap-3 pt-1">
            <div className="flex items-center space-x-3 min-w-0">
              <div className="relative shrink-0">
                <BiankaAvatar size={48} showBadge className="ring-2 ring-[#38BDF8]" />
                {isPlaying && (
                  <span className="absolute -top-1 -right-1 flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#10B981] opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-[#10B981]"></span>
                  </span>
                )}
              </div>

              <div className="min-w-0">
                <div className="flex items-center space-x-2 flex-wrap gap-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#38BDF8] bg-[#0F766E]/50 px-2 py-0.5 rounded-full">
                    Audio Oficial de Bianka 💚
                  </span>
                  <span className="text-[10px] text-[#FDE68A] flex items-center font-medium bg-[#78350F]/40 px-1.5 py-0.5 rounded border border-[#B45309]/30">
                    <Sun className="w-2.5 h-2.5 mr-1 text-[#F59E0B]" />
                    Pantalla Activa (Wake Lock)
                  </span>
                </div>
                <h4 className="text-xs sm:text-sm font-bold text-white truncate mt-1">
                  {isDay10 && 'Seguimiento Oficial: Hito 10 Días'}
                  {isDay15 && 'Seguimiento Oficial: Hito 15 Días'}
                  {isDay30 && 'Palabras Finales: 30 Días Conquistados'}
                </h4>
              </div>
            </div>

            {/* Botón Play / Pausa */}
            <button
              type="button"
              id="btn-modal-audio-toggle"
              onClick={handleTogglePlay}
              className={`w-12 h-12 rounded-2xl flex items-center justify-center font-bold text-white shadow-lg transition-all active:scale-95 shrink-0 ${
                isPlaying
                  ? 'bg-[#0F766E] hover:bg-[#115E59]'
                  : 'bg-[#10B981] hover:bg-[#059669]'
              }`}
              title={isPlaying ? 'Pausar audio' : 'Reproducir audio'}
            >
              {isPlaying ? (
                <Pause className="w-6 h-6 fill-current" />
              ) : (
                <Play className="w-6 h-6 fill-current ml-0.5" />
              )}
            </button>
          </div>

          {/* Timeline / Scrubber */}
          <div className="space-y-1">
            <input
              type="range"
              min="0"
              max={duration || 100}
              step="0.1"
              value={currentTime}
              onChange={handleSeek}
              className="w-full h-1.5 bg-[#334155] rounded-lg appearance-none cursor-pointer accent-[#10B981]"
            />
            <div className="flex justify-between text-[10px] text-[#94A3B8] font-mono">
              <span>{formatAudioTime(currentTime)}</span>
              <span>{duration > 0 ? formatAudioTime(duration) : 'Cargando audio...'}</span>
            </div>
          </div>

          {/* Toast de bloqueo de autoplay si el navegador lo bloqueó */}
          {isAutoplayBlocked && !isPlaying && (
            <div
              onClick={handleTogglePlay}
              className="cursor-pointer bg-[#10B981]/20 border border-[#10B981] p-2.5 rounded-xl text-center text-xs text-[#A7F3D0] hover:bg-[#10B981]/30 transition-colors flex items-center justify-center space-x-2"
            >
              <Volume2 className="w-4 h-4 text-[#34D399]" />
              <span>✨ Toca aquí para reproducir el mensaje de Bianka</span>
            </div>
          )}

          {audioEnded && (
            <div className="text-[11px] text-[#34D399] flex items-center justify-center space-x-1 pt-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#10B981]" />
              <span>Audio de Bianka finalizado. ¡Excelente progreso!</span>
            </div>
          )}
        </div>

        {/* ============================================================ */}
        {/* BOTONES DE ACCIÓN ESPECÍFICOS SEGÚN EL HITO                   */}
        {/* ============================================================ */}
        <div className="space-y-3 pt-2">
          
          {/* HITO DÍA 30: BOTÓN DE DESCARGA PDF ADJUNTO OBLIGATORIO */}
          {isDay30 && (
            <div className="space-y-2.5">
              <a
                id="btn-download-nutritional-plan-pdf"
                href={BIANKA_AUDIO_ASSETS.PDF_PLAN}
                target="_blank"
                rel="noopener noreferrer"
                download="Plan_Nutricional_con_Coliplus.pdf"
                className="w-full py-4 px-6 rounded-2xl bg-linear-to-r from-[#0F766E] via-[#059669] to-[#10B981] text-white font-black text-sm sm:text-base hover:opacity-95 transition-all shadow-lg flex items-center justify-center space-x-2.5 ring-2 ring-[#5EEAD4]/50"
              >
                <Download className="w-5 h-5 shrink-0" />
                <span>📥 Descargar Mi Plan Nutricional Coli Plus (PDF)</span>
              </a>

              <button
                id="btn-download-diploma-pdf"
                onClick={() => generateDiplomaPDF(userName)}
                className="w-full py-3 px-5 rounded-xl bg-[#FAF6F0] hover:bg-[#F3EDE2] text-[#0F766E] font-bold text-xs sm:text-sm border border-[#CBD5E1] transition-all flex items-center justify-center space-x-2"
              >
                <Award className="w-4 h-4 text-[#D97706]" />
                <span>Descargar Diploma Oficial de Victoria Digestiva (PDF)</span>
              </button>
            </div>
          )}

          {/* HITO DÍA 15: BOTÓN PARA REORDENAR POR WHATSAPP CON DESCUENTO VIP */}
          {isDay15 && (
            <div className="space-y-2.5">
              <button
                id="btn-whatsapp-reorder-milestone15"
                onClick={handleWhatsAppReorder}
                className="w-full py-3.5 px-6 rounded-2xl bg-linear-to-r from-[#25D366] to-[#128C7E] text-white font-black text-xs sm:text-sm hover:opacity-95 transition-all shadow-md flex items-center justify-center space-x-2"
              >
                <ShoppingBag className="w-4 h-4 shrink-0" />
                <span>🛒 Reordenar Mi Próximo Coli Plus por WhatsApp (Descuento VIP)</span>
              </button>

              {onOpenStore && (
                <button
                  onClick={() => {
                    handleCloseModal();
                    onOpenStore();
                  }}
                  className="w-full py-2.5 px-4 rounded-xl bg-[#FFFBEB] hover:bg-[#FEF3C7] text-[#92400E] font-bold text-xs border border-[#FDE68A] transition-colors flex items-center justify-center space-x-1.5"
                >
                  <Sparkles className="w-3.5 h-3.5 text-[#D97706]" />
                  <span>Ver Todos los Packs en la Tienda Oficial</span>
                </button>
              )}
            </div>
          )}

          {/* HITO DÍA 10: BOTÓN DE MOTIVACIÓN PARA DÍA 11 */}
          {isDay10 && (
            <button
              onClick={handleCloseModal}
              className="w-full py-3.5 px-6 rounded-2xl bg-linear-to-r from-[#0F766E] to-[#10B981] text-white font-bold text-xs sm:text-sm hover:opacity-95 transition-all shadow-md flex items-center justify-center space-x-2"
            >
              <Sparkles className="w-4 h-4" />
              <span>¡Continuar hacia el Día 11 con Energía!</span>
            </button>
          )}

          {/* BOTONES SECUNDARIOS: COMPARTIR EN WHATSAPP Y CONTINUAR */}
          <div className="flex items-center justify-center space-x-3 pt-1">
            <button
              onClick={handleShareWhatsApp}
              className="px-4 py-2 rounded-xl bg-[#FAF6F0] hover:bg-[#F5EFE6] text-[#334155] text-xs font-semibold flex items-center space-x-1.5 transition-colors border border-[#CBD5E1]"
            >
              <Share2 className="w-3.5 h-3.5 text-[#059669]" />
              <span>Compartir Logro en WhatsApp</span>
            </button>

            <button
              onClick={handleCloseModal}
              className="px-4 py-2 rounded-xl text-[#64748B] hover:text-[#0F172A] text-xs font-semibold transition-colors"
            >
              Cerrar
            </button>
          </div>

        </div>

      </motion.div>
    </div>
  );
};
