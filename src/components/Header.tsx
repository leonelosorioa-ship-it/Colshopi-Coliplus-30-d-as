import React from 'react';
import { Sparkles, ShoppingBag, ShieldCheck, Bell, Smartphone, UserCheck, KeyRound } from 'lucide-react';
import { UserProfile } from '../types';

interface HeaderProps {
  user: UserProfile | null;
  onOpenStore: () => void;
  onOpenAdmin: () => void;
  onOpenProfile: () => void;
  onRequestPush: () => void;
  canInstallPWA: boolean;
  onInstallPWA: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  user,
  onOpenStore,
  onOpenAdmin,
  onOpenProfile,
  onRequestPush,
  canInstallPWA,
  onInstallPWA
}) => {
  return (
    <header className="sticky top-0 z-40 bg-[#FFFFFF]/95 backdrop-blur-md border-b border-[#E2E8F0] shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Brand & Identity */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={onOpenProfile}>
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-linear-to-br from-[#0F766E] to-[#10B981] flex items-center justify-center text-white shadow-sm border border-[#D1FAE5]">
              <div className="text-center font-bold text-lg tracking-wider">CF</div>
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-lg sm:text-xl font-bold tracking-tight text-[#0F172A] font-display">
                  ColiFem <span className="text-[#0F766E]">30D</span>
                </span>
                <span className="hidden md:inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-[#FEF3C7] text-[#92400E] border border-[#FDE68A]">
                  <Sparkles className="w-3 h-3 mr-1 text-[#D97706]" />
                  Protocolo Oficial
                </span>
              </div>
              <p className="text-xs text-[#64748B] font-medium hidden sm:block">
                ColShopi By Leps Digital • INVIMA NSA-0012423-2022
              </p>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            
            {/* PWA install button if available */}
            {canInstallPWA && (
              <button
                id="btn-install-pwa"
                onClick={onInstallPWA}
                className="hidden sm:inline-flex items-center px-3 py-1.5 text-xs font-semibold rounded-lg bg-[#F1F5F9] text-[#334155] hover:bg-[#E2E8F0] transition-colors border border-[#CBD5E1]"
                title="Instalar App en tu pantalla de inicio"
              >
                <Smartphone className="w-3.5 h-3.5 mr-1.5 text-[#0F766E]" />
                Instalar App
              </button>
            )}

            {/* Push Notifications trigger */}
            <button
              id="btn-push-subscribe"
              onClick={onRequestPush}
              className={`p-2 rounded-lg border transition-colors ${
                user?.hasPush
                  ? 'bg-[#ECFDF5] border-[#A7F3D0] text-[#059669]'
                  : 'bg-white border-[#E2E8F0] text-[#64748B] hover:text-[#0F766E] hover:border-[#CBD5E1]'
              }`}
              title={user?.hasPush ? 'Notificaciones Push Activas' : 'Activar Notificaciones Diarias'}
            >
              <Bell className="w-4 h-4" />
            </button>

            {/* Store / Reorder Button */}
            <button
              id="btn-reorder-coliplus"
              onClick={onOpenStore}
              className="inline-flex items-center px-3.5 py-2 text-xs sm:text-sm font-semibold rounded-xl bg-linear-to-r from-[#0F766E] to-[#10B981] text-white shadow-xs hover:opacity-95 transition-all transform active:scale-98"
            >
              <ShoppingBag className="w-4 h-4 mr-1.5" />
              <span>Pedir Coli Plus</span>
              <span className="ml-1.5 hidden md:inline-block px-1.5 py-0.2 bg-[#047857] text-[10px] rounded-md font-bold text-[#D1FAE5]">
                -40% VIP
              </span>
            </button>

            {/* VIP User Pill / Profile */}
            {user ? (
              <button
                id="btn-user-profile-badge"
                onClick={onOpenProfile}
                className="flex items-center space-x-1.5 px-2.5 py-1.5 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] text-xs font-semibold text-[#1E293B] hover:bg-[#F1F5F9] transition-colors"
                title="Ver tu perfil VIP y progreso"
              >
                <div className="w-6 h-6 rounded-full bg-[#10B981]/20 text-[#0F766E] flex items-center justify-center font-bold text-[10px]">
                  {user.name.slice(0, 1).toUpperCase()}
                </div>
                <span className="hidden lg:inline max-w-[90px] truncate">{user.name.split(' ')[0]}</span>
                <span className="text-[10px] text-[#0F766E] font-mono bg-[#CCFBF1] px-1.5 py-0.5 rounded">
                  {user.id}
                </span>
              </button>
            ) : null}

            {/* Admin Key Button */}
            <button
              id="btn-admin-access"
              onClick={onOpenAdmin}
              className="p-2 rounded-lg text-[#94A3B8] hover:text-[#0F172A] hover:bg-[#F1F5F9] transition-colors"
              title="Panel de Administración (PIN: 250816)"
            >
              <KeyRound className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
