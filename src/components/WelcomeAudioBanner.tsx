import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play, Pause, X } from 'lucide-react';
import { BiankaAvatar } from './BiankaAvatar';
import {
  BIANKA_AUDIO_ASSETS,
  playBiankaAudio,
  stopActiveBiankaAudio,
  formatAudioTime
} from '../utils/biankaAudioPlayer';

interface WelcomeAudioBannerProps {
  userName?: string;
  userId?: string;
}

export const WelcomeAudioBanner: React.FC<WelcomeAudioBannerProps> = ({
  userName = 'Hermosa',
  userId = 'guest'
}) => {
  const [isVisible, setIsVisible] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isAutoplayBlocked, setIsAutoplayBlocked] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [hasFinished, setHasFinished] = useState(false);
  const audioInstanceRef = useRef<HTMLAudioElement | null>(null);

  // Audio oficial configurado: https://f005.backblazeb2.com/file/ColShopi/ColiPlus/ColShopi+App.mp3
  // Volumen promedio medio (0.5)
  const OFFICIAL_AUDIO_URL = BIANKA_AUDIO_ASSETS.APP_START;
  const MEDIUM_VOLUME = 0.5;

  // Iniciar reproducción de audio con volumen medio y auto-cierre al finalizar
  const startAudioPlayback = useCallback(() => {
    try {
      if (audioInstanceRef.current) {
        audioInstanceRef.current.volume = MEDIUM_VOLUME;
        audioInstanceRef.current
          .play()
          .then(() => {
            setIsPlaying(true);
            setIsAutoplayBlocked(false);
            setIsVisible(true);
          })
          .catch((err) => {
            console.warn('Autoplay bloqueado por políticas del navegador:', err);
            setIsAutoplayBlocked(true);
            setIsVisible(true);
          });
        return;
      }

      const audio = playBiankaAudio(
        OFFICIAL_AUDIO_URL,
        {
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
            // Al terminar el audio, se quita automáticamente de la pantalla de inmediato
            setTimeout(() => {
              setIsVisible(false);
            }, 400);
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
            setIsVisible(false);
          }
        },
        MEDIUM_VOLUME
      );

      // Event listener adicional directo en el audio element para garantizar auto-cierre al terminar
      audio.addEventListener('ended', () => {
        setIsPlaying(false);
        setHasFinished(true);
        setTimeout(() => {
          setIsVisible(false);
        }, 400);
      });

      audioInstanceRef.current = audio;
    } catch (e) {
      console.warn('Error iniciando audio:', e);
      setIsAutoplayBlocked(true);
      setIsVisible(true);
    }
  }, [OFFICIAL_AUDIO_URL]);

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
      audioInstanceRef.current.volume = MEDIUM_VOLUME;
      audioInstanceRef.current
        .play()
        .then(() => {
          setIsPlaying(true);
          setIsAutoplayBlocked(false);
        })
        .catch(() => {
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
  };

  // 1. DISPARADOR AL ABRIR / RECARGAR LA APLICACIÓN
  useEffect(() => {
    setIsVisible(true);
    setHasFinished(false);

    // Intentar reproducir automáticamente después de una breve pausa de montaje
    const timer = setTimeout(() => {
      startAudioPlayback();
    }, 400);

    return () => clearTimeout(timer);
  }, [startAudioPlayback]);

  // 2. DISPARADOR AL ACTIVAR / VOLVER A LA PESTAÑA O DESBLOQUEAR EL CELULAR
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        if (!audioInstanceRef.current || audioInstanceRef.current.paused) {
          setIsVisible(true);
          startAudioPlayback();
        }
      }
    };

    const handleWindowFocus = () => {
      if (!audioInstanceRef.current || audioInstanceRef.current.paused) {
        setIsVisible(true);
        startAudioPlayback();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('focus', handleWindowFocus);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('focus', handleWindowFocus);
    };
  }, [startAudioPlayback]);

  // 3. DESBLOQUEO INMEDIATO ANTE CUALQUIER PRIMER TOQUE SI EL NAVEGADOR BLOQUEÓ EL AUTOPLAY DIRECTO
  useEffect(() => {
    const handleFirstUserInteraction = () => {
      if (isAutoplayBlocked || (audioInstanceRef.current && audioInstanceRef.current.paused && !hasFinished)) {
        startAudioPlayback();
      }
    };

    window.addEventListener('click', handleFirstUserInteraction, { once: true });
    window.addEventListener('touchstart', handleFirstUserInteraction, { once: true });
    window.addEventListener('keydown', handleFirstUserInteraction, { once: true });

    return () => {
      window.removeEventListener('click', handleFirstUserInteraction);
      window.removeEventListener('touchstart', handleFirstUserInteraction);
      window.removeEventListener('keydown', handleFirstUserInteraction);
    };
  }, [isAutoplayBlocked, hasFinished, startAudioPlayback]);

  // 4. Listener para poder disparar el audio manualmente desde cualquier componente
  useEffect(() => {
    const handleCustomTrigger = () => {
      setIsVisible(true);
      startAudioPlayback();
    };

    window.addEventListener('play_bianka_welcome_audio', handleCustomTrigger);
    return () => {
      window.removeEventListener('play_bianka_welcome_audio', handleCustomTrigger);
    };
  }, [startAudioPlayback]);

  // Cleanup al desmontar
  useEffect(() => {
    return () => {
      if (audioInstanceRef.current) {
        audioInstanceRef.current.pause();
      }
    };
  }, []);

  if (!isVisible) return null;

  const progressPercent = duration > 0 ? Math.min(100, (currentTime / duration) * 100) : 0;

  return (
    <AnimatePresence>
      {/* Posicionado sutilmente sobre la barra de navegación inferior móvil (bottom-20) y en la esquina en escritorio */}
      <div className="fixed bottom-20 left-3 right-3 sm:left-auto sm:right-6 sm:bottom-6 z-40 max-w-sm pointer-events-auto">
        
        {/* CASO A: SI EL NAVEGADOR BLOQUEA AUTOPLAY -> CHIP FLOTANTE ULTRA DISCRETO */}
        {isAutoplayBlocked ? (
          <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 15, scale: 0.95 }}
            onClick={startAudioPlayback}
            className="cursor-pointer bg-[#0F172A]/95 backdrop-blur-md text-white rounded-full pl-2 pr-3 py-1.5 shadow-xl border border-[#10B981]/50 flex items-center justify-between gap-2.5 hover:bg-[#1E293B] transition-all group select-none ring-2 ring-[#10B981]/20"
          >
            <div className="flex items-center space-x-2 min-w-0">
              <div className="relative shrink-0">
                <BiankaAvatar size={30} showBadge className="ring-1.5 ring-[#10B981]" />
                <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-[#10B981] flex items-center justify-center text-white text-[8px] shadow-sm">
                  ▶
                </span>
              </div>
              <div className="min-w-0">
                <p className="text-xs font-semibold text-white truncate group-hover:text-[#5EEAD4] transition-colors">
                  🔊 Toca para escuchar audio de ColShopi 💚
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={handleClose}
              className="p-1 text-[#94A3B8] hover:text-white rounded-full hover:bg-slate-700/50 shrink-0 cursor-pointer"
              title="Cerrar"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </motion.div>
        ) : (
          /* CASO B: REPRODUCTOR FLOTANTE COMPACTO Y ELEGANTE (CHIP MINIMALISTA) */
          <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 15, scale: 0.95 }}
            className="bg-[#0F172A]/95 backdrop-blur-md text-white rounded-full pl-2.5 pr-2 py-1.5 shadow-xl border border-[#334155] ring-1 ring-[#10B981]/30 overflow-hidden relative select-none"
          >
            {/* Barra de progreso sutil en la parte inferior del chip */}
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#334155]/50">
              <div
                className="h-full bg-linear-to-r from-[#10B981] to-[#38BDF8] transition-all duration-200"
                style={{ width: `${progressPercent}%` }}
              />
            </div>

            <div className="flex items-center justify-between gap-2.5">
              {/* Avatar + Nombre + Ondas de sonido */}
              <div className="flex items-center space-x-2 min-w-0">
                <div className="relative shrink-0">
                  <BiankaAvatar size={32} showBadge className="ring-1.5 ring-[#38BDF8]" />
                  {isPlaying && (
                    <span className="absolute -top-0.5 -right-0.5 flex h-2.5 w-2.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#10B981] opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#10B981]"></span>
                    </span>
                  )}
                </div>

                <div className="min-w-0 pr-1">
                  <div className="flex items-center space-x-1.5">
                    <span className="text-xs font-bold text-white truncate max-w-[130px] sm:max-w-[160px]">
                      ColShopi App • Bianka
                    </span>
                    {/* Animación de ecualizador cuando suena */}
                    {isPlaying && (
                      <div className="flex items-end space-x-0.5 h-3 shrink-0">
                        <span className="w-0.5 bg-[#10B981] rounded-full animate-[pulse_0.6s_ease-in-out_infinite] h-2"></span>
                        <span className="w-0.5 bg-[#38BDF8] rounded-full animate-[pulse_0.8s_ease-in-out_infinite] h-3"></span>
                        <span className="w-0.5 bg-[#10B981] rounded-full animate-[pulse_0.5s_ease-in-out_infinite] h-1.5"></span>
                      </div>
                    )}
                  </div>
                  <div className="flex items-center space-x-1.5 text-[10px] text-[#94A3B8] font-mono">
                    <span className="text-[#34D399] font-semibold">{formatAudioTime(currentTime)}</span>
                    <span>/</span>
                    <span>{duration > 0 ? formatAudioTime(duration) : '0:45'}</span>
                  </div>
                </div>
              </div>

              {/* Botón de Play/Pausa + Botón Cerrar */}
              <div className="flex items-center space-x-1 shrink-0">
                <button
                  type="button"
                  id="btn-toggle-welcome-audio"
                  onClick={handleTogglePlayPause}
                  className={`w-7 h-7 rounded-full flex items-center justify-center text-white shadow-sm transition-all active:scale-95 cursor-pointer ${
                    isPlaying
                      ? 'bg-[#0F766E] hover:bg-[#115E59]'
                      : 'bg-[#10B981] hover:bg-[#059669]'
                  }`}
                  title={isPlaying ? 'Pausar' : 'Reproducir'}
                >
                  {isPlaying ? (
                    <Pause className="w-3.5 h-3.5 fill-current" />
                  ) : (
                    <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
                  )}
                </button>

                <button
                  type="button"
                  onClick={handleClose}
                  className="w-6 h-6 text-[#94A3B8] hover:text-white rounded-full hover:bg-slate-700/60 flex items-center justify-center shrink-0 cursor-pointer"
                  title="Cerrar reproductor"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </motion.div>
        )}

      </div>
    </AnimatePresence>
  );
};
