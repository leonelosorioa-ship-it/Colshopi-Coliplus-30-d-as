import React from 'react';
import {
  Sparkles,
  ShoppingBag,
  ShieldCheck,
  Calendar,
  Activity,
  TrendingUp,
  Utensils,
  MessageCircle,
  Smartphone,
  FileText,
  MessageSquareShare,
  Download
} from 'lucide-react';
import { UserProfile } from '../types';
import { ColShopiLogo } from './ColShopiLogo';

interface HeaderProps {
  user: UserProfile | null;
  activeTab?: string;
  onTabChange?: (tab: any) => void;
  onOpenStore: () => void;
  onOpenProfile?: () => void;
  onOpenMilestone?: () => void;
  onTogglePush?: () => void;
  onRequestPush?: () => void;
  isPushActive?: boolean;
  canInstallPWA?: boolean;
  onInstallPWA?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  user,
  activeTab = 'calendar',
  onTabChange,
  onOpenStore,
  onOpenProfile,
  onOpenMilestone,
  onInstallPWA
}) => {
  const completedCount = user?.completedDays?.length || 0;
  const maxCompleted = completedCount > 0 && user?.completedDays ? Math.max(...user.completedDays) : 0;
  const currentDay = Math.min(30, maxCompleted + 1);
  const percentage = Math.min(100, Math.round((completedCount / 30) * 100));

  const navTabs = [
    { id: 'calendar', label: 'Protocolo 30 Días', shortLabel: 'Protocolo', icon: Calendar },
    { id: 'tracker', label: 'Tracker Diario', shortLabel: 'Mi Día', icon: Activity },
    { id: 'charts', label: 'Métricas Clínicas', shortLabel: 'Métricas', icon: TrendingUp },
    { id: 'recipes', label: 'Recetario', shortLabel: 'Recetas', icon: Utensils },
    { id: 'chat', label: 'Asesora Bianka', shortLabel: 'Bianka', icon: MessageCircle, isLive: true }
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-[#E2E8F0] shadow-xs">
      {/* 1. Top Brand Announcement Bar - Never overflows, clean single line */}
      <div className="bg-[#042F2E] text-white px-3 sm:px-6 py-1.5 text-[11px] sm:text-xs flex items-center justify-between font-medium border-b border-[#064E3B] select-none">
        <div className="flex items-center space-x-2 truncate">
          <span className="text-[#34D399] font-bold shrink-0">ColShopi Tienda</span>
          <span className="text-[#6EE7B7] truncate">By Leps Digital</span>
          <span className="text-[#94A3B8] hidden sm:inline">•</span>
          <span className="text-[#A7F3D0] hidden sm:inline">Cuidamos de ti 💙</span>
        </div>
        <div className="flex items-center space-x-2 shrink-0 text-[10px] sm:text-[11px]">
          <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-[#064E3B] text-[#A7F3D0] border border-[#0D9488]/40">
            <ShieldCheck className="w-3 h-3 mr-1 text-[#34D399] shrink-0" />
            <span className="hidden xs:inline sm:inline">INVIMA </span>NSA-0012423-2022
          </span>
        </div>
      </div>

      {/* 2. Main Header Bar */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 sm:h-18">
          
          {/* Brand & Identity: ColShopi Logo + ColiFem 30D */}
          <div
            className="flex items-center space-x-2.5 sm:space-x-3 cursor-pointer select-none min-w-0"
            onClick={onOpenProfile}
          >
            <ColShopiLogo size={38} className="shrink-0 sm:w-11 sm:h-11" />
            <div className="min-w-0">
              <div className="flex items-center space-x-2">
                <span className="text-base sm:text-xl font-extrabold tracking-tight text-[#0F172A] font-display whitespace-nowrap">
                  ColiFem <span className="text-[#0F766E]">30D</span>
                </span>
                <span className="hidden md:inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#ECFDF5] text-[#047857] border border-[#A7F3D0]">
                  Coli Plus 450g
                </span>
              </div>
              {user ? (
                <p className="text-[11px] text-[#64748B] font-medium leading-tight truncate hidden sm:block">
                  Por <strong className="text-[#0F766E]">Bianka</strong> - Guía de Bienestar & Hábitos Saludables
                </p>
              ) : (
                <p className="text-[11px] text-[#0F766E] font-medium leading-tight truncate">
                  Activación de Protocolo
                </p>
              )}
            </div>
          </div>

          {/* Right Action Controls */}
          <div className="flex items-center space-x-1.5 sm:space-x-2 shrink-0">
            
            {/* When USER is authenticated: Show Day progress & App Actions */}
            {user ? (
              <>
                {/* Progress Badge */}
                <div className="inline-flex items-center px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full text-xs font-semibold bg-[#FFFBEB] text-[#92400E] border border-[#FDE68A] shadow-2xs">
                  <span className="font-bold text-[#B45309]">Día {currentDay}</span>
                  <span className="mx-1 text-[#D97706]/60 hidden sm:inline">|</span>
                  <span className="text-[#78350F] hidden sm:inline">{percentage}%</span>
                </div>

                {/* Bitácora / Certificate Button (desktop / tablet) */}
                {onOpenMilestone && (
                  <button
                    id="btn-header-milestone"
                    onClick={onOpenMilestone}
                    className="hidden sm:inline-flex items-center px-2.5 py-1.5 rounded-xl border border-[#CBD5E1] bg-white text-[#475569] hover:bg-[#F8FAFC] hover:text-[#0F766E] transition-colors text-xs font-semibold shadow-2xs"
                    title="Ver Bitácora de Bienestar y Certificado Oficial"
                  >
                    <FileText className="w-3.5 h-3.5 text-[#0F766E] mr-1.5" />
                    <span>Bitácora</span>
                  </button>
                )}

                {/* Pedir Button - Green Pill */}
                <button
                  id="btn-header-order"
                  onClick={onOpenStore}
                  className="inline-flex items-center px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl bg-[#10B981] hover:bg-[#059669] text-white text-xs sm:text-sm font-bold shadow-xs hover:shadow transition-all active:scale-95"
                >
                  <ShoppingBag className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1 sm:mr-1.5 shrink-0" />
                  <span>Pedir</span>
                </button>
              </>
            ) : (
              /* When in ONBOARDING / ACTIVATION MODE (No user yet): Keep header clean & helpful */
              <>
                <a
                  href="https://wa.me/573104007428?text=Hola%20Bianka,%20necesito%20ayuda%20con%20mi%20código%20de%20acceso%20para%20ColiFem%2030D"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-3 py-1.5 rounded-xl bg-[#ECFDF5] hover:bg-[#D1FAE5] text-[#047857] border border-[#A7F3D0] text-xs font-bold transition-all shadow-2xs"
                  title="¿Necesitas ayuda con tu código VIP? Escríbenos a WhatsApp"
                >
                  <MessageSquareShare className="w-3.5 h-3.5 mr-1 text-[#10B981]" />
                  <span className="hidden sm:inline">Ayuda WhatsApp</span>
                  <span className="sm:hidden">Ayuda</span>
                </a>
              </>
            )}

            {/* PWA Install / Download Button (Prominent for logged-in and onboarding users) */}
            {onInstallPWA && (
              <button
                id="btn-header-install"
                onClick={onInstallPWA}
                className="inline-flex items-center space-x-1.5 px-2.5 py-1.5 sm:px-3 sm:py-2 rounded-xl border border-[#00E5FF]/40 bg-gradient-to-r from-[#ECFEFF] to-[#E0F2FE] text-[#0E7490] hover:from-[#CFFAFE] hover:to-[#BAE6FD] hover:border-[#00E5FF]/70 transition-all shadow-xs cursor-pointer active:scale-95 group"
                title="Descargar e Instalar ColiFem 30D en tu Celular, Tablet o PC"
              >
                <Download className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#0891B2] group-hover:scale-110 transition-transform shrink-0" />
                <span className="text-[11px] sm:text-xs font-bold text-[#0E7490] whitespace-nowrap">
                  Descargar App
                </span>
              </button>
            )}
          </div>
        </div>

        {/* 3. DESKTOP SECTION NAVIGATION TABS (Visible on md+ screens when user is logged in) */}
        {user && onTabChange && (
          <div className="hidden md:flex items-center space-x-1 border-t border-[#F1F5F9] py-2 overflow-x-auto scrollbar-none">
            {navTabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  id={`btn-nav-tab-${tab.id}`}
                  onClick={() => onTabChange(tab.id)}
                  className={`inline-flex items-center px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer relative ${
                    isActive
                      ? 'bg-[#0F766E] text-white shadow-xs'
                      : 'text-[#64748B] hover:text-[#0F172A] hover:bg-[#F1F5F9]'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 mr-1.5 ${isActive ? 'text-white' : 'text-[#94A3B8]'}`} />
                  <span>{tab.label}</span>
                  {tab.isLive && (
                    <span className="ml-1.5 flex h-2 w-2 relative">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        )}
      </div>
    </header>
  );
};

