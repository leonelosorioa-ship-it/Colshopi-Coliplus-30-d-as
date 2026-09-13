import React from 'react';
import { Sparkles, ShoppingBag, ShieldCheck, Bell, Smartphone, FileText, KeyRound } from 'lucide-react';
import { UserProfile } from '../types';
import { ColShopiLogo } from './ColShopiLogo';

interface HeaderProps {
  user: UserProfile | null;
  activeTab?: string;
  onTabChange?: (tab: any) => void;
  onOpenStore: () => void;
  onOpenAdmin: () => void;
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
  activeTab,
  onTabChange,
  onOpenStore,
  onOpenAdmin,
  onOpenProfile,
  onOpenMilestone,
  onTogglePush,
  onRequestPush,
  isPushActive,
  canInstallPWA,
  onInstallPWA
}) => {
  const completedCount = user?.completedDays?.length || 0;
  const currentDay = user?.currentDay || 1;
  const percentage = Math.min(100, Math.round((completedCount / 30) * 100));

  const handlePush = onTogglePush || onRequestPush || (() => {});

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-[#E2E8F0] shadow-xs">
      {/* Top Brand Announcement Bar - Exactly like Portada TY */}
      <div className="bg-[#042F2E] text-white px-4 py-1.5 text-[11px] sm:text-xs flex items-center justify-between font-medium border-b border-[#064E3B]">
        <div className="flex items-center space-x-2 mx-auto sm:mx-0">
          <span className="text-[#34D399] font-bold">ColShopi Tienda</span>
          <span className="text-[#6EE7B7]">By Leps Digital</span>
          <span className="text-[#94A3B8] hidden sm:inline">•</span>
          <span className="text-[#A7F3D0] hidden sm:inline">Cuidamos de ti 💙</span>
        </div>
        <div className="hidden sm:flex items-center space-x-3 text-[11px]">
          <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-[#064E3B] text-[#A7F3D0] border border-[#0D9488]/40">
            <ShieldCheck className="w-3 h-3 mr-1 text-[#34D399]" />
            INVIMA NSA-0012423-2022
          </span>
        </div>
      </div>

      {/* Main Header Navigation Bar */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Brand & Identity: ColShopi Logo + ColiFem 30D */}
          <div
            className="flex items-center space-x-2.5 sm:space-x-3 cursor-pointer select-none"
            onClick={onOpenProfile}
          >
            <ColShopiLogo size={46} className="shrink-0" />
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-lg sm:text-xl font-extrabold tracking-tight text-[#0F172A] font-display">
                  ColiFem <span className="text-[#0F766E]">30D</span>
                </span>
                <span className="hidden md:inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-bold bg-[#ECFDF5] text-[#047857] border border-[#A7F3D0]">
                  Coli Plus 450g
                </span>
              </div>
              <p className="text-[11px] sm:text-xs text-[#64748B] font-medium leading-tight">
                Por <strong className="text-[#0F766E]">Bianka</strong> - Guía de Bienestar & Hábitos Saludables
              </p>
            </div>
          </div>

          {/* Right Action Controls: Progress Badge, Bitácora, Pedir, Install PWA, Admin */}
          <div className="flex items-center space-x-2 sm:space-x-2.5">
            
            {/* Progress Badge: Día X | Y% completado */}
            <div className="inline-flex items-center px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full text-xs font-semibold bg-[#FFFBEB] text-[#92400E] border border-[#FDE68A] shadow-2xs">
              <span className="font-bold text-[#B45309]">Día {currentDay}</span>
              <span className="mx-1.5 text-[#D97706]/60">|</span>
              <span className="text-[#78350F]">{percentage}% completado</span>
            </div>

            {/* Bitácora / Diploma Button */}
            {onOpenMilestone && (
              <button
                id="btn-header-milestone"
                onClick={onOpenMilestone}
                className="p-2 sm:px-2.5 sm:py-1.5 rounded-xl border border-[#CBD5E1] bg-white text-[#475569] hover:bg-[#F8FAFC] hover:text-[#0F766E] transition-colors text-xs font-semibold flex items-center shadow-2xs"
                title="Ver Bitácora de Bienestar y Certificado Oficial"
              >
                <FileText className="w-4 h-4 text-[#0F766E]" />
                <span className="hidden lg:inline ml-1.5">Bitácora</span>
              </button>
            )}

            {/* Pedir Button - Green Pill Button */}
            <button
              id="btn-header-order"
              onClick={onOpenStore}
              className="inline-flex items-center px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-xl bg-[#10B981] hover:bg-[#059669] text-white text-xs sm:text-sm font-bold shadow-xs hover:shadow transition-all transform active:scale-98"
            >
              <ShoppingBag className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1.5" />
              <span>Pedir</span>
            </button>

            {/* PWA Install Button */}
            {onInstallPWA && (
              <button
                id="btn-header-install"
                onClick={onInstallPWA}
                className="p-2 rounded-xl border border-[#CBD5E1] bg-white text-[#334155] hover:bg-[#F1F5F9] hover:text-[#0F766E] transition-colors shadow-2xs"
                title="Instalar App en tu dispositivo"
              >
                <Smartphone className="w-4 h-4" />
              </button>
            )}

            {/* Admin Key Button */}
            <button
              id="btn-header-admin"
              onClick={onOpenAdmin}
              className="p-2 rounded-xl text-[#94A3B8] hover:text-[#0F172A] hover:bg-[#F1F5F9] transition-colors"
              title="Acceso Administrativo ColShopi (contacto@colshopi.com)"
            >
              <KeyRound className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
