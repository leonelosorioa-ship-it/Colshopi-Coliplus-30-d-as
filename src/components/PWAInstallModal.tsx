import React, { useState, useEffect } from 'react';
import {
  X,
  Smartphone,
  CheckCircle2,
  Zap,
  ShieldCheck,
  Download,
  Share2,
  PlusSquare,
  Globe,
  Monitor,
  Sparkles,
  Check,
  HelpCircle,
  Laptop
} from 'lucide-react';

interface PWAInstallModalProps {
  isOpen: boolean;
  onClose: () => void;
  deferredPrompt?: any;
  onInstallAccepted?: () => void;
}

export const PWAInstallModal: React.FC<PWAInstallModalProps> = ({
  isOpen,
  onClose,
  deferredPrompt,
  onInstallAccepted
}) => {
  const [activeTab, setActiveTab] = useState<'android' | 'ios' | 'pc'>('android');
  const [isInstalled, setIsInstalled] = useState(false);
  const [installing, setInstalling] = useState(false);
  const [guideNote, setGuideNote] = useState<string | null>(null);

  // Auto-detect user platform
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const ua = window.navigator.userAgent.toLowerCase();
      if (/iphone|ipad|ipod/.test(ua)) {
        setActiveTab('ios');
      } else if (/android/.test(ua)) {
        setActiveTab('android');
      } else if (/windows|macintosh|linux/.test(ua)) {
        setActiveTab('pc');
      }

      // Check if already running in standalone PWA mode
      if (
        window.matchMedia('(display-mode: standalone)').matches ||
        (window.navigator as any).standalone === true
      ) {
        setIsInstalled(true);
      }
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleNativeInstall = async () => {
    if (deferredPrompt) {
      try {
        setInstalling(true);
        deferredPrompt.prompt();
        const choice = await deferredPrompt.userChoice;
        if (choice.outcome === 'accepted') {
          setIsInstalled(true);
          onInstallAccepted?.();
          setTimeout(() => onClose(), 1500);
        }
      } catch (err) {
        console.error('Error invoking PWA prompt:', err);
      } finally {
        setInstalling(false);
      }
    } else {
      // In-modal friendly visual tip (never use window.alert)
      if (activeTab === 'android') {
        setGuideNote('Toca los 3 puntos (⋮) o el menú de tu navegador arriba/abajo y pulsa "Instalar aplicación" o "Agregar a la pantalla principal".');
      } else if (activeTab === 'ios') {
        setGuideNote('Toca el botón Compartir (⎋) abajo en Safari y selecciona "Agregar al inicio" (⊞).');
      } else {
        setGuideNote('Haz clic en el ícono de instalar (⊕) o pantalla con flecha en la barra de direcciones de tu navegador.');
      }
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md overflow-y-auto animate-fadeIn"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        id="pwa-install-modal"
        className="relative w-full max-w-lg bg-[#081520] border border-[#14B8A6]/40 rounded-3xl p-5 sm:p-6 text-white shadow-2xl overflow-hidden my-auto"
      >
        {/* Ambient Top Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-72 h-24 bg-gradient-to-b from-[#00E5FF]/20 to-transparent blur-2xl pointer-events-none" />

        {/* Top Header Row */}
        <div className="flex items-center justify-between pb-3 border-b border-white/10 relative z-10">
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-[#134E4A]/80 border border-[#2DD4BF]/40 text-[#2DD4BF] text-[11px] font-bold tracking-wide uppercase">
            <Sparkles className="w-3.5 h-3.5 text-[#5EEAD4]" />
            <span>Descarga Oficial Multiplataforma</span>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            aria-label="Cerrar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Main Title & Subtitle */}
        <div className="mt-4 flex items-center space-x-2 relative z-10">
          <Download className="w-5 h-5 text-[#2DD4BF]" />
          <h2 className="text-lg sm:text-xl font-extrabold text-white tracking-tight">
            Descargar e Instalar ColiFem 30D
          </h2>
        </div>
        <p className="text-xs text-slate-300 mt-1 relative z-10">
          Instala la aplicación en tu celular, tablet o computador para usarla en cualquier momento con un solo toque.
        </p>

        {/* Card: App Preview with Official Logo */}
        <div className="mt-4 p-3.5 sm:p-4 rounded-2xl bg-gradient-to-b from-[#0A2230] to-[#061621] border border-[#00E5FF]/25 shadow-inner relative z-10 text-center flex flex-col items-center">
          {/* Official Logo Container */}
          <div className="relative mb-2.5 group">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-b from-[#071F2C] to-[#030D14] p-1 border-2 border-[#00E5FF]/60 shadow-[0_0_20px_rgba(0,229,255,0.35)] flex items-center justify-center overflow-hidden">
              <img
                src="/colshopi-logo.png"
                alt="ColShopi Tienda Logo"
                className="w-full h-full object-contain filter drop-shadow-md transition-transform duration-300 group-hover:scale-105"
                onError={(e) => {
                  const target = e.currentTarget;
                  if (!target.src.includes('icon-512.png')) {
                    target.src = '/icon-512.png';
                  } else if (!target.src.includes('icon.svg')) {
                    target.src = '/icon.svg';
                  }
                }}
              />
            </div>
            {/* Sparkle badge bottom-right */}
            <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-[#00E5FF] text-[#042F2C] flex items-center justify-center shadow-md">
              <Sparkles className="w-3 h-3 fill-current" />
            </div>
          </div>

          <h3 className="text-sm sm:text-base font-extrabold text-white tracking-tight">
            ColShopi Tienda • ColiFem™ 30D
          </h3>
          <p className="text-xs text-[#99F6E4] mt-0.5 font-medium">
            Acompañamiento VIP Coli Plus • 4 Fases y Seguimiento Diario
          </p>
          <div className="mt-1 flex items-center justify-center space-x-1 text-[11px] text-slate-400 font-mono">
            <Globe className="w-3 h-3 text-[#2DD4BF]" />
            <span>App Oficial PWA Segura (HTTPS)</span>
          </div>
        </div>

        {/* Benefits List */}
        <div className="mt-3.5 p-3 rounded-xl bg-[#04111A] border border-white/5 space-y-1.5 relative z-10 text-xs text-slate-200">
          <div className="flex items-center space-x-2">
            <CheckCircle2 className="w-4 h-4 text-[#2DD4BF] shrink-0" />
            <span>Acceso directo desde la pantalla de inicio (sin abrir navegador)</span>
          </div>
          <div className="flex items-center space-x-2">
            <Zap className="w-4 h-4 text-[#38BDF8] shrink-0" />
            <span>Carga ultrarrápida, funciona sin conexión y guarda tu progreso</span>
          </div>
          <div className="flex items-center space-x-2">
            <ShieldCheck className="w-4 h-4 text-[#FBBF24] shrink-0" />
            <span>No consume memoria de tu tienda de apps (ligera y privada)</span>
          </div>
        </div>

        {/* Platform Selector Tabs */}
        <div className="mt-4 grid grid-cols-3 gap-1.5 p-1 rounded-xl bg-[#030B12] border border-white/10 relative z-10">
          <button
            type="button"
            onClick={() => {
              setActiveTab('android');
              setGuideNote(null);
            }}
            className={`py-2 px-1 rounded-lg text-xs font-bold transition-all text-center cursor-pointer flex items-center justify-center space-x-1 ${
              activeTab === 'android'
                ? 'bg-[#134E4A] text-[#5EEAD4] shadow-sm border border-[#2DD4BF]/30'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span>Android</span>
          </button>
          <button
            type="button"
            onClick={() => {
              setActiveTab('ios');
              setGuideNote(null);
            }}
            className={`py-2 px-1 rounded-lg text-xs font-bold transition-all text-center cursor-pointer flex items-center justify-center space-x-1 ${
              activeTab === 'ios'
                ? 'bg-[#134E4A] text-[#5EEAD4] shadow-sm border border-[#2DD4BF]/30'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span>iPhone / iPad</span>
          </button>
          <button
            type="button"
            onClick={() => {
              setActiveTab('pc');
              setGuideNote(null);
            }}
            className={`py-2 px-1 rounded-lg text-xs font-bold transition-all text-center cursor-pointer flex items-center justify-center space-x-1 ${
              activeTab === 'pc'
                ? 'bg-[#134E4A] text-[#5EEAD4] shadow-sm border border-[#2DD4BF]/30'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Monitor className="w-3.5 h-3.5" />
            <span>PC / Mac</span>
          </button>
        </div>

        {/* In-Modal Guide Note / Tip */}
        {guideNote && (
          <div className="mt-2.5 p-2.5 rounded-xl bg-[#134E4A]/90 border border-[#2DD4BF]/60 text-xs text-[#99F6E4] flex items-start space-x-2 animate-fadeIn relative z-10">
            <HelpCircle className="w-4 h-4 text-[#5EEAD4] shrink-0 mt-0.5" />
            <p className="leading-snug">{guideNote}</p>
          </div>
        )}

        {/* Dynamic Instructions Card */}
        <div className="mt-3 p-3.5 rounded-xl bg-[#071B26] border border-[#00E5FF]/15 relative z-10 text-xs text-slate-300">
          {activeTab === 'android' && (
            <div className="space-y-3">
              <div className="text-[11px] font-bold text-[#5EEAD4] uppercase tracking-wider flex items-center justify-between">
                <span>Instalación en Android (Samsung, Xiaomi, Motorola, etc.):</span>
                <span className="text-[10px] text-slate-400 font-normal">Chrome / Samsung Internet</span>
              </div>
              <div className="flex items-start space-x-2.5">
                <span className="w-5 h-5 rounded-full bg-[#134E4A] text-[#5EEAD4] font-bold text-[10px] flex items-center justify-center shrink-0 border border-[#2DD4BF]/40">
                  1
                </span>
                <p>
                  Presiona el botón <strong className="text-white">"Descargar / Instalar"</strong> que aparece abajo. Si tu navegador abre la ventana de confirmación, pulsa <strong className="text-[#5EEAD4]">Instalar</strong>.
                </p>
              </div>
              <div className="flex items-start space-x-2.5">
                <span className="w-5 h-5 rounded-full bg-[#134E4A] text-[#5EEAD4] font-bold text-[10px] flex items-center justify-center shrink-0 border border-[#2DD4BF]/40">
                  2
                </span>
                <div>
                  <p className="font-semibold text-white mb-0.5">Si no abre automático:</p>
                  <p className="text-slate-300">
                    • En <strong>Google Chrome</strong>: Toca los <strong>3 puntos ⋮</strong> arriba a la derecha y selecciona <strong>"Instalar aplicación"</strong> o <strong>"Agregar a la pantalla principal"</strong>.
                  </p>
                  <p className="text-slate-300 mt-1">
                    • En <strong>Samsung Internet</strong>: Toca las <strong>3 rayitas ☰</strong> abajo a la derecha, pulsa <strong>"Agregar página a"</strong> y elige <strong>"Pantalla de inicio"</strong>.
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-2.5">
                <span className="w-5 h-5 rounded-full bg-[#134E4A] text-[#5EEAD4] font-bold text-[10px] flex items-center justify-center shrink-0 border border-[#2DD4BF]/40">
                  3
                </span>
                <p>
                  ¡Listo! ColiFem 30D aparecerá con su ícono en tu menú de aplicaciones y en tu pantalla de inicio como una aplicación nativa.
                </p>
              </div>
            </div>
          )}

          {activeTab === 'ios' && (
            <div className="space-y-3">
              <div className="text-[11px] font-bold text-[#5EEAD4] uppercase tracking-wider flex items-center space-x-1.5">
                <Smartphone className="w-3.5 h-3.5" />
                <span>Instalación en iPhone / iPad (Safari):</span>
              </div>
              <div className="flex items-start space-x-2.5">
                <span className="w-5 h-5 rounded-full bg-[#134E4A] text-[#5EEAD4] font-bold text-[10px] flex items-center justify-center shrink-0 border border-[#2DD4BF]/40">
                  1
                </span>
                <p>
                  Abre este enlace en <strong className="text-white">Safari</strong> y toca el botón <strong className="text-white">Compartir</strong> (<Share2 className="w-3.5 h-3.5 inline text-[#38BDF8]" /> o cuadro con flecha hacia arriba <span className="font-mono">⎋</span>) en la barra inferior.
                </p>
              </div>
              <div className="flex items-start space-x-2.5">
                <span className="w-5 h-5 rounded-full bg-[#134E4A] text-[#5EEAD4] font-bold text-[10px] flex items-center justify-center shrink-0 border border-[#2DD4BF]/40">
                  2
                </span>
                <p>
                  Desliza las opciones hacia abajo y selecciona <strong className="text-white">"Agregar al inicio"</strong> (<PlusSquare className="w-3.5 h-3.5 inline text-[#38BDF8]" />).
                </p>
              </div>
              <div className="flex items-start space-x-2.5">
                <span className="w-5 h-5 rounded-full bg-[#134E4A] text-[#5EEAD4] font-bold text-[10px] flex items-center justify-center shrink-0 border border-[#2DD4BF]/40">
                  3
                </span>
                <p>
                  Toca <strong className="text-white">"Agregar"</strong> en la esquina superior derecha y la app quedará fija en tu pantalla con su ícono oficial.
                </p>
              </div>
            </div>
          )}

          {activeTab === 'pc' && (
            <div className="space-y-3">
              <div className="text-[11px] font-bold text-[#5EEAD4] uppercase tracking-wider flex items-center space-x-1.5">
                <Laptop className="w-3.5 h-3.5" />
                <span>Instalación en PC / Mac / Laptops (Chrome, Edge, Safari):</span>
              </div>
              <div className="flex items-start space-x-2.5">
                <span className="w-5 h-5 rounded-full bg-[#134E4A] text-[#5EEAD4] font-bold text-[10px] flex items-center justify-center shrink-0 border border-[#2DD4BF]/40">
                  1
                </span>
                <p>
                  Presiona el botón <strong className="text-white">"Descargar / Instalar"</strong> abajo para lanzar el instalador de Chrome o Edge.
                </p>
              </div>
              <div className="flex items-start space-x-2.5">
                <span className="w-5 h-5 rounded-full bg-[#134E4A] text-[#5EEAD4] font-bold text-[10px] flex items-center justify-center shrink-0 border border-[#2DD4BF]/40">
                  2
                </span>
                <p>
                  O haz clic en el ícono de instalar (<Download className="w-3 h-3 inline text-[#38BDF8]" /> o <span className="font-mono">⊕</span>) situado en la barra de direcciones superior de tu navegador.
                </p>
              </div>
              <div className="flex items-start space-x-2.5">
                <span className="w-5 h-5 rounded-full bg-[#134E4A] text-[#5EEAD4] font-bold text-[10px] flex items-center justify-center shrink-0 border border-[#2DD4BF]/40">
                  3
                </span>
                <p>
                  Confirma <strong className="text-white">"Instalar"</strong> y tendrás ColiFem 30D en tu escritorio y barra de tareas como programa independiente sin bordes de navegador.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="mt-5 pt-3 border-t border-white/10 flex items-center justify-between gap-3 relative z-10">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2.5 rounded-xl text-slate-400 hover:text-white text-xs font-semibold hover:bg-white/5 transition-colors cursor-pointer"
          >
            Cerrar
          </button>

          <button
            type="button"
            onClick={handleNativeInstall}
            disabled={installing || isInstalled}
            className="flex-1 py-2.5 px-4 rounded-xl bg-gradient-to-r from-[#00E5FF] to-[#10B981] hover:from-[#22E6FF] hover:to-[#059669] text-[#022825] font-extrabold text-xs sm:text-sm flex items-center justify-center space-x-1.5 shadow-[0_0_18px_rgba(0,229,255,0.4)] transition-all cursor-pointer active:scale-98 disabled:opacity-75 disabled:cursor-default"
          >
            {isInstalled ? (
              <>
                <Check className="w-4 h-4 text-[#022825]" />
                <span>¡App Ya Instalada!</span>
              </>
            ) : (
              <>
                <Download className="w-4 h-4" />
                <span>{installing ? 'Instalando...' : 'Descargar / Instalar App'}</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
