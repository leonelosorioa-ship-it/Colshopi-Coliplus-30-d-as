// ============================================================================
// BIANKA AUDIO PLAYER & SCREEN WAKE LOCK API CONTROLLER
// Permite reproducción fluida de audios oficiales de Bianka, mantiene la pantalla
// activa mientras dura el audio y libera los recursos al pausar, terminar o cerrar.
// ============================================================================

export const BIANKA_AUDIO_ASSETS = {
  WELCOME: 'https://f005.backblazeb2.com/file/ColShopi/ColiPlus/Audio+Bianka+Bienvenida+App.mp3',
  DAY_10: 'https://f005.backblazeb2.com/file/ColShopi/ColiPlus/Seguimiento+App+Coli+10+d%C3%ADas.mp3',
  DAY_15: 'https://f005.backblazeb2.com/file/ColShopi/ColiPlus/Seguimiento+App+Coli+15+d%C3%ADas.mp3',
  DAY_30: 'https://f005.backblazeb2.com/file/ColShopi/ColiPlus/Final+30+d%C3%ADas+App+Coli.mp3',
  PDF_PLAN: 'https://f005.backblazeb2.com/file/ColShopi/ColiPlus/Plan+Nutricional+con+Coliplus.pdf'
} as const;

// Screen Wake Lock API management
let wakeLockSentinel: any = null;
let isWakeLockRequested = false;

/**
 * Activa Screen Wake Lock para mantener la pantalla del celular encendida durante el audio
 */
export async function enableScreenWakeLock(): Promise<boolean> {
  if (typeof navigator !== 'undefined' && 'wakeLock' in navigator) {
    try {
      if (wakeLockSentinel && !wakeLockSentinel.released) {
        return true;
      }
      isWakeLockRequested = true;
      wakeLockSentinel = await (navigator as any).wakeLock.request('screen');
      
      wakeLockSentinel.addEventListener('release', () => {
        wakeLockSentinel = null;
      });
      return true;
    } catch (err) {
      console.warn('Screen Wake Lock no disponible o denegado por el dispositivo:', err);
      return false;
    }
  }
  return false;
}

/**
 * Libera Screen Wake Lock para permitir que el dispositivo vuelva a su reposo normal
 */
export function releaseScreenWakeLock(): void {
  isWakeLockRequested = false;
  if (wakeLockSentinel !== null) {
    try {
      wakeLockSentinel.release?.().then(() => {
        wakeLockSentinel = null;
      }).catch(() => {
        wakeLockSentinel = null;
      });
    } catch {
      wakeLockSentinel = null;
    }
  }
}

// Reactivar Wake Lock si la usuaria vuelve a la pestaña mientras el audio sigue activo
if (typeof document !== 'undefined') {
  document.addEventListener('visibilitychange', async () => {
    if (document.visibilityState === 'visible' && isWakeLockRequested && (!wakeLockSentinel || wakeLockSentinel.released)) {
      try {
        await enableScreenWakeLock();
      } catch {}
    }
  });
}

export interface BiankaAudioCallbacks {
  onPlay?: () => void;
  onPause?: () => void;
  onEnded?: () => void;
  onTimeUpdate?: (currentTime: number, duration: number) => void;
  onAutoplayBlocked?: () => void;
  onError?: (error: any) => void;
}

let activeGlobalAudio: HTMLAudioElement | null = null;

/**
 * Detiene cualquier audio de Bianka en reproducción y libera el Wake Lock
 */
export function stopActiveBiankaAudio(): void {
  if (activeGlobalAudio) {
    try {
      activeGlobalAudio.pause();
      activeGlobalAudio.currentTime = 0;
    } catch {}
    activeGlobalAudio = null;
  }
  releaseScreenWakeLock();
}

/**
 * Reproductor oficial de Bianka con integración de Wake Lock y manejo de autoplay
 */
export function playBiankaAudio(
  audioUrl: string,
  callbacks?: BiankaAudioCallbacks
): HTMLAudioElement {
  // Detener cualquier audio previo
  stopActiveBiankaAudio();

  const audio = new Audio(audioUrl);
  activeGlobalAudio = audio;
  audio.preload = 'auto';

  // Evento play: solicita inmediatamente mantener la pantalla encendida
  audio.addEventListener('play', () => {
    enableScreenWakeLock();
    callbacks?.onPlay?.();
  });

  const handleStop = () => {
    releaseScreenWakeLock();
  };

  audio.addEventListener('ended', () => {
    handleStop();
    if (activeGlobalAudio === audio) {
      activeGlobalAudio = null;
    }
    callbacks?.onEnded?.();
  });

  audio.addEventListener('pause', () => {
    handleStop();
    callbacks?.onPause?.();
  });

  audio.addEventListener('timeupdate', () => {
    callbacks?.onTimeUpdate?.(audio.currentTime, audio.duration || 0);
  });

  audio.addEventListener('error', (e) => {
    console.warn('Error al reproducir audio de Bianka:', e);
    handleStop();
    if (activeGlobalAudio === audio) {
      activeGlobalAudio = null;
    }
    callbacks?.onError?.(e);
  });

  // Intentar reproducir automáticamente
  const playPromise = audio.play();
  if (playPromise !== undefined) {
    playPromise.catch((err) => {
      console.warn('Autoplay bloqueado por el navegador (requiere interacción del usuario):', err);
      handleStop();
      callbacks?.onAutoplayBlocked?.();
    });
  }

  return audio;
}

/**
 * Helper para formatear segundos en mm:ss
 */
export function formatAudioTime(seconds: number): string {
  if (isNaN(seconds) || seconds < 0) return '0:00';
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}
