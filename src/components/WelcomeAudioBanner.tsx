import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play, Pause, X, Volume2, Sparkles, Sun, CheckCircle } from 'lucide-react';
import { BiankaAvatar } from './BiankaAvatar';
import {
  BIANKA_AUDIO_ASSETS,
  playBiankaAudio,
  stopActiveBiankaAudio,
  formatAudioTime
} from '../utils/biankaAudioPlayer';

interface WelcomeAudioBannerProps {
  userName: string;
  userId: string;
  triggerImmediately?: boolean;
}

export const WelcomeAudioBanner: React.FC<WelcomeAudioBannerProps> = ({
  userName,
  userId,
  triggerImmediately = false
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isAutoplayBlocked, setIsAutoplayBlocked] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [hasFinished, setHasFinished] = useState(false);
  const audioInstanceRef = useRef<HTMLAudioElement | null>(null);

  const storageKey = `bianka_welcome_audio_played_${userId || 'guest'}`;

  // Start audio playback
  const startAudioPlayback = () => {
    try {
      if (audioInstanceRef.current) {
        audioInstanceRef.current.play().then(() => {
          setIsPlaying(true);
          setIsAutoplayBlocked(false);
        }).catch((err) => {
          console.warn('Playback error:', err);
          setIsAutoplayBlocked(true);
        });
        return;
      }

      const audio = playBiankaAudio(BIANKA_AUDIO_ASSETS.WELCOME, {
        onPlay: () => {
          setIsPlaying(true);
          setIsAutoplayBlocked(false);
          setIsVisible(true);
        },
        onPause: () => {
          setIsPlaying(false);
        },
        onEnded: () => {
          setIsPlaying(false);
          setHasFinished(true);
          try {
            localStorage.setItem(storageKey, 'true');
          } catch {}
        },
        onTimeUpdate: (cur, dur) => {
          setCurrentTime(cur);
          if (dur && !isNaN(dur)) setDuration(dur);
        },
        onAutoplayBlocked: () => {
          setIsAutoplayBlocked(true);
          setIsVisible(true);
        },
        onError: () => {
          setIsPlaying(false);
        }
      });

      audioInstanceRef.current = audio;
    } catch (e) {
      console.warn('Error iniciando audio:', e);
      setIsAutoplayBlocked(true);
      setIsVisible(true);
    }
  };

  const handleTogglePlayPause = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (!audioInstanceRef.current) {
      startAudioPlayback();
      return;
    }

    if (isPlaying) {
      audioInstanceRef.current.pause();
      setIsPlaying(false);
    } else {
      audioInstanceRef.current.play().then(() => {
        setIsPlaying(true);
        setIsAutoplayBlocked(false);
      }).catch(() => {
        setIsAutoplayBlocked(true);
      });
    }
  };

  const handleClose = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    stopActiveBiankaAudio();
    audioInstanceRef.current = null;
    setIsPlaying(false);
    setIsVisible(false);
    try {
      localStorage.setItem(storageKey, 'true');
    } catch {}
  };

  // Check if we should trigger the welcome audio
  useEffect(() => {
    const hasPlayed = localStorage.getItem(storageKey) === 'true';

    // Disparar si es primer ingreso o si se fuerza por registro reciente
    if (!hasPlayed || triggerImmediately) {
      setIsVisible(true);
      // Intentar reproducción automática
      const timer = setTimeout(() => {
        startAudioPlayback();
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [userId, triggerImmediately]);

  // Listener para poder disparar el audio manualmente desde cualquier botón
  useEffect(() => {
    const handleCustomTrigger = () => {
      setIsVisible(true);
      startAudioPlayback();
    };

    window.addEventListener('play_bianka_welcome_audio', handleCustomTrigger);
    return () => {
      window.removeEventListener('play_bianka_welcome_audio', handleCustomTrigger);
    };
  }, []);

  // Cleanup al desmontar
  useEffect(() => {
    return () => {
      if (audioInstanceRef.current) {
        audioInstanceRef.current.pause();
      }
    };
  }, []);

  if (!isVisible) return null;

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <AnimatePresence>
      <div className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:bottom-6 z-50 max-w-md pointer-events-auto">
        
        {/* CASO A: EL NAVEGADOR BLOQUEÓ EL AUTOPLAY DIRECTO -> TOAST SUTIL SOLICITADO */}
        {isAutoplayBlocked ? (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            onClick={startAudioPlayback}
            className="cursor-pointer bg-[#0D1926] text-white rounded-2xl p-3.5 sm:p-4 shadow-2xl border-2 border-[#10B981] flex items-center justify-between gap-3 hover:bg-[#132337] transition-all group ring-4 ring-[#10B981]/20"
          >
            <div className="flex items-center space-x-3 min-w-0">
              <div className="relative shrink-0">
                <BiankaAvatar size={44} showBadge className="ring-2 ring-[#38BDF8]" />
                <span className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-[#10B981] flex items-center justify-center text-white text-[10px] shadow-sm animate-bounce">
                  ▶
                </span>
              </div>

              <div className="min-w-0">
                <div className="flex items-center space-x-1.5">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#38BDF8] bg-[#0F766E]/50 px-2 py-0.5 rounded-full">
                    Mensaje de Bianka 💚
                  </span>
                </div>
                <p className="text-xs sm:text-sm font-semibold text-white mt-1 group-hover:text-[#5EEAD4] transition-colors leading-snug">
                  ✨ Toca aquí para escuchar el mensaje de bienvenida de Bianka 💚
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={handleClose}
              className="p-1.5 text-[#94A3B8] hover:text-white rounded-lg hover:bg-[#1E293B] shrink-0"
              title="Cerrar notificación"
            >
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        ) : (
          /* CASO B: REPRODUCIENDO O PAUSADO -> REPRODUCTOR FLOTANTE CON WAKE LOCK */
          <motion.div
            initial={{ opacity: 0, y: 25, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="bg-[#0F172A] text-white rounded-2xl p-4 shadow-2xl border border-[#1E293B] ring-2 ring-[#10B981]/30 overflow-hidden relative"
          >
            {/* Top progress bar line */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-[#1E293B]">
              <div
                className="h-full bg-linear-to-r from-[#10B981] to-[#38BDF8] transition-all duration-200"
                style={{ width: `${progressPercent}%` }}
              />
            </div>

            <div className="flex items-center justify-between gap-3 pt-0.5">
              <div className="flex items-center space-x-3 min-w-0">
                <div className="relative shrink-0">
                  <BiankaAvatar size={44} showBadge className="ring-2 ring-[#38BDF8]" />
                  {isPlaying && (
                    <span className="absolute -top-1 -right-1 flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#10B981] opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-[#10B981]"></span>
                    </span>
                  )}
                </div>

                <div className="min-w-0">
                  <div className="flex items-center space-x-2 flex-wrap">
                    <span className="text-[10px] font-bold text-[#10B981] bg-[#064E3B]/70 px-2 py-0.5 rounded-full uppercase tracking-wider">
                      Bienvenida Oficial
                    </span>
                    <span className="text-[10px] text-[#38BDF8] flex items-center font-medium bg-[#0369A1]/30 px-1.5 py-0.5 rounded">
                      <Sun className="w-2.5 h-2.5 mr-1 text-[#F59E0B]" />
                      Pantalla Activa
                    </span>
                  </div>
                  <h4 className="text-xs sm:text-sm font-bold text-white truncate mt-1">
                    {hasFinished ? 'Mensaje de Bienvenida completado' : `Mensaje de Bianka para ti, ${userName || 'Hermosa'} 💚`}
                  </h4>
                  <div className="flex items-center space-x-2 text-[11px] text-[#94A3B8] font-mono mt-0.5">
                    <span>{formatAudioTime(currentTime)}</span>
                    <span>/</span>
                    <span>{duration > 0 ? formatAudioTime(duration) : 'Cargando...'}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-1.5 shrink-0">
                <button
                  type="button"
                  id="btn-toggle-welcome-audio"
                  onClick={handleTogglePlayPause}
                  className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-white shadow-md transition-all active:scale-95 ${
                    isPlaying
                      ? 'bg-[#0F766E] hover:bg-[#115E59]'
                      : 'bg-[#10B981] hover:bg-[#059669]'
                  }`}
                  title={isPlaying ? 'Pausar audio' : 'Reproducir audio'}
                >
                  {isPlaying ? (
                    <Pause className="w-5 h-5 fill-current" />
                  ) : (
                    <Play className="w-5 h-5 fill-current ml-0.5" />
                  )}
                </button>

                <button
                  type="button"
                  onClick={handleClose}
                  className="p-2 text-[#94A3B8] hover:text-white rounded-xl hover:bg-[#1E293B]"
                  title="Cerrar reproductor"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {hasFinished && (
              <div className="mt-2.5 pt-2 border-t border-[#1E293B] flex items-center justify-between text-[11px] text-[#34D399]">
                <span className="flex items-center">
                  <CheckCircle className="w-3.5 h-3.5 mr-1" />
                  ¡Audio escuchado con éxito!
                </span>
                <button
                  type="button"
                  onClick={handleClose}
                  className="text-xs font-semibold text-white underline hover:text-[#5EEAD4]"
                >
                  Entendido
                </button>
              </div>
            )}
          </motion.div>
        )}

      </div>
    </AnimatePresence>
  );
};
