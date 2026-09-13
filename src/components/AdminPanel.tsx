import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import * as XLSX from 'xlsx';
import {
  Users,
  Bell,
  Download,
  Send,
  Lock,
  Search,
  CheckCircle2,
  AlertCircle,
  TrendingUp,
  Filter,
  X,
  Sparkles,
  Key,
  Copy,
  Check,
  Upload
} from 'lucide-react';
import { UserProfile } from '../types';
import { SECRET_50_VIP_CODES, getClaimedCodes } from '../data/vipCodes';
import { BiankaAvatar } from './BiankaAvatar';

interface AdminPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

interface AdminMetrics {
  totalUsers: number;
  pushSubscribers: number;
  avgDaysCompleted: number;
  retentionRate: number;
  angleDistribution: Record<string, number>;
  recentOrdersCount: number;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({ isOpen, onClose }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [email, setEmail] = useState('contacto@colshopi.com');
  const [pin, setPin] = useState('');
  const [authError, setAuthError] = useState('');

  const [metrics, setMetrics] = useState<AdminMetrics | null>(null);
  const [usersList, setUsersList] = useState<UserProfile[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedAngleFilter, setSelectedAngleFilter] = useState('all');

  // Admin Tab view: 'codes' | 'users' | 'metrics' | 'avatar'
  const [adminTab, setAdminTab] = useState<'codes' | 'users' | 'metrics' | 'avatar'>('codes');
  const [avatarMsg, setAvatarMsg] = useState<string | null>(null);

  const handleUploadBiankaPhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      if (dataUrl) {
        localStorage.setItem('bianka_custom_photo', dataUrl);
        window.dispatchEvent(new Event('bianka_photo_updated'));
        setAvatarMsg('¡Foto de Bianka actualizada exitosamente en toda la app!');
        setTimeout(() => setAvatarMsg(null), 4000);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleResetBiankaPhoto = () => {
    localStorage.removeItem('bianka_custom_photo');
    window.dispatchEvent(new Event('bianka_photo_updated'));
    setAvatarMsg('Se ha restablecido a la ilustración oficial de Bianka.');
    setTimeout(() => setAvatarMsg(null), 4000);
  };

  // 50 Secret VIP Codes state
  const [vipCodesInfo, setVipCodesInfo] = useState<{
    totalCodes: number;
    totalClaimed: number;
    totalAvailable: number;
    codes: Array<{
      index: number;
      code: string;
      isClaimed: boolean;
      claimedBy: string | null;
      claimedUserId: string | null;
      claimedAt: string | null;
    }>;
  }>({
    totalCodes: 50,
    totalClaimed: 0,
    totalAvailable: 50,
    codes: SECRET_50_VIP_CODES.map((c, i) => ({
      index: i + 1,
      code: c,
      isClaimed: false,
      claimedBy: null,
      claimedUserId: null,
      claimedAt: null
    }))
  });
  const [codesFilter, setCodesFilter] = useState<'all' | 'available' | 'claimed'>('all');
  const [codesSearch, setCodesSearch] = useState('');
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  // Push Broadcast state
  const [pushTitle, setPushTitle] = useState('ColiFem 30D - Mensaje de Bianka 💚');
  const [pushBody, setPushBody] = useState('Recuerda tomar tu porción de Coli Plus en agua fresca y completar tu chequeo diario.');
  const [pushPhaseFilter, setPushPhaseFilter] = useState('all');
  const [pushStatusMsg, setPushStatusMsg] = useState('');
  const [isSendingPush, setIsSendingPush] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      loadAdminData();
    }
  }, [isAuthenticated]);

  if (!isOpen) return null;

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, pin })
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setIsAuthenticated(true);
      } else {
        setAuthError(data.error || 'Credenciales no autorizadas.');
      }
    } catch (err) {
      setAuthError('Error de conexión al verificar credenciales.');
    }
  };

  const loadAdminData = async () => {
    try {
      const [mRes, uRes, cRes] = await Promise.all([
        fetch('/api/admin/metrics'),
        fetch('/api/users'),
        fetch('/api/admin/vip-codes')
      ]);
      const mData = await mRes.json();
      const uData = await uRes.json();
      setMetrics(mData);
      setUsersList(uData.users || []);

      if (cRes.ok) {
        const cData = await cRes.json();
        // Sincronizar también con claimed codes locales por si acaso
        const localClaimed = getClaimedCodes();
        const mergedCodes = cData.codes.map((item: any) => {
          const local = localClaimed[item.code];
          if (!item.isClaimed && local) {
            return {
              ...item,
              isClaimed: true,
              claimedBy: local.userName,
              claimedUserId: local.userId,
              claimedAt: local.claimedAt
            };
          }
          return item;
        });
        const claimedCount = mergedCodes.filter((c: any) => c.isClaimed).length;
        setVipCodesInfo({
          totalCodes: 50,
          totalClaimed: claimedCount,
          totalAvailable: 50 - claimedCount,
          codes: mergedCodes
        });
      }
    } catch (err) {
      console.warn('Admin fetch error:', err);
      // Fallback con datos locales
      const localClaimed = getClaimedCodes();
      const fallbackList = SECRET_50_VIP_CODES.map((code, index) => {
        const claim = localClaimed[code];
        return {
          index: index + 1,
          code,
          isClaimed: !!claim,
          claimedBy: claim?.userName || null,
          claimedUserId: claim?.userId || null,
          claimedAt: claim?.claimedAt || null
        };
      });
      const claimedCount = fallbackList.filter(c => c.isClaimed).length;
      setVipCodesInfo({
        totalCodes: 50,
        totalClaimed: claimedCount,
        totalAvailable: 50 - claimedCount,
        codes: fallbackList
      });
    }
  };

  const handleSendPush = async () => {
    setIsSendingPush(true);
    setPushStatusMsg('');

    try {
      const res = await fetch('/api/push/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: pushTitle,
          body: pushBody,
          filterPhase: pushPhaseFilter,
          filterAngle: selectedAngleFilter !== 'all' ? selectedAngleFilter : undefined
        })
      });
      const data = await res.json();
      setPushStatusMsg(data.message || 'Notificaciones enviadas.');
    } catch (err: any) {
      setPushStatusMsg('Error al enviar notificaciones push.');
    } finally {
      setIsSendingPush(false);
    }
  };

  const handleExportExcel = () => {
    const rows = usersList.map(u => ({
      'ID VIP': u.id,
      'Nombre': u.name,
      'WhatsApp': u.whatsapp,
      'Correo': u.email,
      'Rango Edad': u.ageRange,
      'Código de Acceso': u.accessCode,
      'Ángulo Digestivo': u.digestiveAngle,
      'Día Actual': u.currentDay,
      'Días Completados': u.completedDays.length,
      'Porcentaje Adherencia': `${Math.round((u.completedDays.length / 30) * 100)}%`,
      'Notificaciones Push': u.hasPush ? 'Sí' : 'No',
      'Fecha Creación': u.createdAt,
      'Última Actividad': u.lastActive
    }));

    const ws = XLSX.utils.json_to_sheet(rows);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Usuarios ColiFem');
    XLSX.writeFile(wb, 'Reporte_Usuarios_ColiFem_30D.xlsx');
  };

  const filteredUsers = usersList.filter(u => {
    const matchAngle = selectedAngleFilter === 'all' || u.digestiveAngle === selectedAngleFilter;
    const matchQuery =
      u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.whatsapp.includes(searchQuery) ||
      u.id.toLowerCase().includes(searchQuery.toLowerCase());
    return matchAngle && matchQuery;
  });

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.96 }}
        className="bg-white w-full max-w-5xl rounded-3xl shadow-2xl border border-[#E2E8F0] overflow-hidden my-6 flex flex-col max-h-[90vh]"
      >
        {/* Header */}
        <div className="bg-[#0F172A] p-5 sm:p-6 text-white flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-[#0F766E] flex items-center justify-center font-bold">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h2 className="text-lg sm:text-xl font-bold font-display">
                  Consola de Super Administrador
                </h2>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-500/20 text-emerald-300 font-bold">
                  ColShopi CRM
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Gestión de usuarios, métricas clínicas y envíos Web Push
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          
          {/* LOGIN SCREEN IF NOT AUTH */}
          {!isAuthenticated ? (
            <div className="max-w-md mx-auto py-8 space-y-6">
              <div className="text-center space-y-2">
                <div className="w-12 h-12 rounded-2xl bg-[#ECFDF5] text-[#0F766E] flex items-center justify-center mx-auto text-xl">
                  🔐
                </div>
                <h3 className="text-xl font-bold text-[#0F172A]">Acceso Restringido</h3>
                <p className="text-xs text-[#64748B]">
                  Ingresa con el PIN maestro oficial de administración (PIN: 250816).
                </p>
              </div>

              <form onSubmit={handleLogin} className="space-y-4 bg-[#F8FAFC] p-6 rounded-2xl border border-[#E2E8F0]">
                <div>
                  <label className="block text-xs font-bold text-[#334155] uppercase tracking-wider mb-1">
                    Correo Institucional
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-[#CBD5E1] bg-white text-xs font-medium"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#334155] uppercase tracking-wider mb-1">
                    PIN Maestro (6 Dígitos)
                  </label>
                  <input
                    type="password"
                    placeholder="******"
                    maxLength={6}
                    value={pin}
                    onChange={(e) => setPin(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-[#CBD5E1] bg-white text-base tracking-widest font-mono text-center"
                  />
                </div>

                {authError && (
                  <p className="text-xs text-red-600 font-semibold">{authError}</p>
                )}

                <button
                  type="submit"
                  className="w-full py-2.5 rounded-xl bg-[#0F766E] text-white font-bold text-xs hover:bg-[#115E59] transition-colors shadow-xs"
                >
                  Ingresar a la Consola
                </button>
              </form>
            </div>
          ) : (
            /* AUTHENTICATED ADMIN DASHBOARD */
            <div className="space-y-6">

              {/* Tab Navigation */}
              <div className="flex items-center space-x-2 border-b border-[#E2E8F0] pb-3 overflow-x-auto">
                <button
                  type="button"
                  onClick={() => setAdminTab('codes')}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 shrink-0 ${
                    adminTab === 'codes'
                      ? 'bg-[#0F766E] text-white shadow-xs'
                      : 'bg-[#F1F5F9] text-[#475569] hover:bg-[#E2E8F0]'
                  }`}
                >
                  <Key className="w-3.5 h-3.5" />
                  <span>50 Códigos VIP Secretos</span>
                  <span className={`ml-1.5 px-2 py-0.5 rounded-full text-[10px] font-bold ${
                    adminTab === 'codes' ? 'bg-white/20 text-white' : 'bg-emerald-100 text-emerald-800'
                  }`}>
                    {vipCodesInfo.totalAvailable} libres
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => setAdminTab('users')}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 shrink-0 ${
                    adminTab === 'users'
                      ? 'bg-[#0F766E] text-white shadow-xs'
                      : 'bg-[#F1F5F9] text-[#475569] hover:bg-[#E2E8F0]'
                  }`}
                >
                  <Users className="w-3.5 h-3.5" />
                  <span>Lista de Pacientes</span>
                  <span className={`ml-1.5 px-2 py-0.5 rounded-full text-[10px] font-bold ${
                    adminTab === 'users' ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-700'
                  }`}>
                    {usersList.length}
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => setAdminTab('metrics')}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 shrink-0 ${
                    adminTab === 'metrics'
                      ? 'bg-[#0F766E] text-white shadow-xs'
                      : 'bg-[#F1F5F9] text-[#475569] hover:bg-[#E2E8F0]'
                  }`}
                >
                  <Bell className="w-3.5 h-3.5" />
                  <span>Métricas & Push</span>
                </button>

                <button
                  type="button"
                  onClick={() => setAdminTab('avatar')}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 shrink-0 ${
                    adminTab === 'avatar'
                      ? 'bg-[#0F766E] text-white shadow-xs'
                      : 'bg-[#F1F5F9] text-[#475569] hover:bg-[#E2E8F0]'
                  }`}
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                  <span>Foto de Bianka</span>
                </button>
              </div>

              {/* ================= TAB 1: 50 CÓDIGOS VIP SECRETOS ================= */}
              {adminTab === 'codes' && (
                <div className="space-y-4">
                  {/* Overview Card */}
                  <div className="p-4 sm:p-5 rounded-2xl bg-linear-to-r from-[#0F766E]/10 to-[#10B981]/10 border border-[#0F766E]/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                    <div>
                      <div className="flex items-center space-x-2">
                        <Key className="w-4 h-4 text-[#0F766E]" />
                        <h3 className="text-sm font-bold text-[#0F172A]">
                          Listado de los 50 Códigos VIP Secretos de ColShopi
                        </h3>
                      </div>
                      <p className="text-xs text-[#64748B] mt-1">
                        Uso único y exclusivo. Cada vez que una compradora escriba a soporte por WhatsApp, Bianka le entrega uno de estos códigos. Una vez activado, el sistema bloquea su reutilización.
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        const text = SECRET_50_VIP_CODES.map((c, i) => `${i + 1}. ${c}`).join('\n');
                        navigator.clipboard.writeText(text);
                        setCopiedCode('ALL');
                        setTimeout(() => setCopiedCode(null), 2500);
                      }}
                      className="px-3 py-1.5 rounded-xl bg-white border border-[#CBD5E1] hover:bg-[#F8FAFC] text-xs font-bold text-[#0F766E] flex items-center space-x-1.5 shadow-xs transition-colors shrink-0"
                    >
                      {copiedCode === 'ALL' ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-600" />
                          <span className="text-emerald-700">¡50 Códigos Copiados!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5 text-[#0F766E]" />
                          <span>Copiar los 50 Códigos</span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* Summary Badges & Filters */}
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                    <div className="flex items-center space-x-2">
                      <button
                        type="button"
                        onClick={() => setCodesFilter('all')}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                          codesFilter === 'all'
                            ? 'bg-[#0F172A] text-white'
                            : 'bg-[#F1F5F9] text-[#64748B] hover:bg-[#E2E8F0]'
                        }`}
                      >
                        Todos ({vipCodesInfo.totalCodes})
                      </button>

                      <button
                        type="button"
                        onClick={() => setCodesFilter('available')}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                          codesFilter === 'available'
                            ? 'bg-emerald-600 text-white'
                            : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
                        }`}
                      >
                        Disponibles ({vipCodesInfo.totalAvailable})
                      </button>

                      <button
                        type="button"
                        onClick={() => setCodesFilter('claimed')}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                          codesFilter === 'claimed'
                            ? 'bg-slate-700 text-white'
                            : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                        }`}
                      >
                        Canjeados ({vipCodesInfo.totalClaimed})
                      </button>
                    </div>

                    <div className="relative">
                      <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[#94A3B8]" />
                      <input
                        type="text"
                        placeholder="Buscar código de 6 dígitos o usuaria..."
                        value={codesSearch}
                        onChange={(e) => setCodesSearch(e.target.value)}
                        className="pl-8 pr-3 py-1.5 text-xs rounded-xl border border-[#CBD5E1] bg-white w-full sm:w-64 focus:ring-2 focus:ring-[#0F766E] focus:outline-hidden"
                      />
                    </div>
                  </div>

                  {/* Codes Grid (50 Codes) */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-2.5 max-h-[440px] overflow-y-auto p-1">
                    {vipCodesInfo.codes
                      .filter((item) => {
                        if (codesFilter === 'available' && item.isClaimed) return false;
                        if (codesFilter === 'claimed' && !item.isClaimed) return false;
                        if (codesSearch.trim()) {
                          const q = codesSearch.trim().toLowerCase();
                          const matchCode = item.code.includes(q);
                          const matchUser = item.claimedBy?.toLowerCase().includes(q);
                          if (!matchCode && !matchUser) return false;
                        }
                        return true;
                      })
                      .map((item) => {
                        const isCopied = copiedCode === item.code;
                        return (
                          <div
                            key={item.code}
                            className={`p-3 rounded-xl border transition-all ${
                              item.isClaimed
                                ? 'bg-[#F8FAFC] border-[#E2E8F0] opacity-80'
                                : 'bg-white border-[#CBD5E1] hover:border-[#0F766E] hover:shadow-xs'
                            }`}
                          >
                            <div className="flex items-center justify-between mb-1.5">
                              <span className="text-[10px] font-mono font-bold text-[#94A3B8]">
                                #{String(item.index).padStart(2, '0')}
                              </span>
                              <span
                                className={`px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider ${
                                  item.isClaimed
                                    ? 'bg-slate-200 text-slate-700'
                                    : 'bg-emerald-100 text-emerald-800'
                                }`}
                              >
                                {item.isClaimed ? 'Canjeado' : 'Disponible'}
                              </span>
                            </div>

                            <div className="font-mono text-base font-black text-[#0F172A] tracking-wider text-center py-1">
                              {item.code}
                            </div>

                            {item.isClaimed ? (
                              <div className="text-[10px] text-[#64748B] text-center mt-1 truncate">
                                Usado por: <span className="font-bold text-[#334155]">{item.claimedBy || 'Compradora'}</span>
                              </div>
                            ) : (
                              <div className="text-[10px] text-emerald-600 font-semibold text-center mt-1">
                                Listo para enviar
                              </div>
                            )}

                            <div className="mt-2 pt-2 border-t border-[#F1F5F9] flex items-center justify-between gap-1">
                              <button
                                type="button"
                                onClick={() => {
                                  navigator.clipboard.writeText(item.code);
                                  setCopiedCode(item.code);
                                  setTimeout(() => setCopiedCode(null), 2000);
                                }}
                                className={`flex-1 py-1 px-2 rounded-lg text-[10px] font-bold flex items-center justify-center space-x-1 transition-colors ${
                                  isCopied
                                    ? 'bg-emerald-600 text-white'
                                    : 'bg-[#F1F5F9] hover:bg-[#E2E8F0] text-[#334155]'
                                }`}
                                title="Copiar código"
                              >
                                {isCopied ? (
                                  <>
                                    <Check className="w-3 h-3" />
                                    <span>¡Copiado!</span>
                                  </>
                                ) : (
                                  <>
                                    <Copy className="w-3 h-3" />
                                    <span>Copiar</span>
                                  </>
                                )}
                              </button>

                              <a
                                href={`https://wa.me/?text=${encodeURIComponent(
                                  `🌿 ¡Hola! Tu código secreto de acceso único y exclusivo para ColiFem 30D es: *${item.code}*. Ingresa a la app oficial y actívalo ahora mismo para comenzar tus 30 días de transformación digestiva con ColShopi Tienda By Leps Digital. ¡Bienvenida! 💚`
                                )}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="py-1 px-2 rounded-lg text-[10px] font-bold bg-[#ECFDF5] text-[#065F46] hover:bg-[#D1FAE5] transition-colors flex items-center justify-center"
                                title="Enviar mensaje con código por WhatsApp"
                              >
                                Enviar WA
                              </a>
                            </div>
                          </div>
                        );
                      })}
                  </div>
                </div>
              )}

              {/* ================= TAB 2: MÉTRICAS & PUSH ================= */}
              {adminTab === 'metrics' && (
                <div className="space-y-6">
              {/* Metrics KPIs */}
              {metrics && (
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div className="p-4 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0] space-y-1">
                    <span className="text-[10px] font-bold text-[#64748B] uppercase">Total Usuarias</span>
                    <div className="text-2xl font-black text-[#0F172A] font-display">{metrics.totalUsers}</div>
                    <span className="text-[10px] text-[#059669]">Adherencia activa</span>
                  </div>

                  <div className="p-4 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0] space-y-1">
                    <span className="text-[10px] font-bold text-[#64748B] uppercase">Suscripciones Push</span>
                    <div className="text-2xl font-black text-[#0284C7] font-display">{metrics.pushSubscribers}</div>
                    <span className="text-[10px] text-[#0284C7]">Dispositivos vinculados</span>
                  </div>

                  <div className="p-4 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0] space-y-1">
                    <span className="text-[10px] font-bold text-[#64748B] uppercase">Promedio Días</span>
                    <div className="text-2xl font-black text-[#D97706] font-display">{metrics.avgDaysCompleted} / 30</div>
                    <span className="text-[10px] text-[#D97706]">Ritmo constante</span>
                  </div>

                  <div className="p-4 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0] space-y-1">
                    <span className="text-[10px] font-bold text-[#64748B] uppercase">Retención Hito 15</span>
                    <div className="text-2xl font-black text-[#10B981] font-display">{metrics.retentionRate}%</div>
                    <span className="text-[10px] text-[#10B981]">Cruzaron mitad de camino</span>
                  </div>
                </div>
              )}

              {/* Push Notification Dispatcher */}
              <div className="p-5 rounded-3xl bg-[#FAF6F0] border border-[#E2E8F0] space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Bell className="w-4 h-4 text-[#0F766E]" />
                    <h3 className="text-sm font-bold text-[#0F172A]">
                      Emisor de Notificaciones Web Push (VAPID)
                    </h3>
                  </div>
                  <span className="text-[10px] text-[#64748B]">
                    Envío en tiempo real a navegadores y móviles
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold text-[#475569] mb-1">Título:</label>
                    <input
                      type="text"
                      value={pushTitle}
                      onChange={(e) => setPushTitle(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-[#CBD5E1] bg-white text-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-[#475569] mb-1">Segmento de Fase:</label>
                    <select
                      value={pushPhaseFilter}
                      onChange={(e) => setPushPhaseFilter(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-[#CBD5E1] bg-white text-xs font-semibold"
                    >
                      <option value="all">Todas las Fases (Masivo)</option>
                      <option value="1">Fase 1 (Días 1 a 7)</option>
                      <option value="2">Fase 2 (Días 8 a 14)</option>
                      <option value="3">Fase 3 (Días 15 a 21)</option>
                      <option value="4">Fase 4 (Días 22 a 30)</option>
                    </select>
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-[11px] font-bold text-[#475569] mb-1">Mensaje:</label>
                    <textarea
                      rows={2}
                      value={pushBody}
                      onChange={(e) => setPushBody(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-[#CBD5E1] bg-white text-xs"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between pt-1">
                  {pushStatusMsg && (
                    <span className="text-xs font-bold text-[#059669]">{pushStatusMsg}</span>
                  )}
                  <button
                    onClick={handleSendPush}
                    disabled={isSendingPush}
                    className="ml-auto inline-flex items-center px-4 py-2 rounded-xl bg-[#0F766E] text-white font-bold text-xs hover:bg-[#115E59] transition-colors shadow-xs"
                  >
                    <Send className="w-3.5 h-3.5 mr-1.5" />
                    <span>{isSendingPush ? 'Enviando...' : 'Despachar Notificación Push'}</span>
                  </button>
                </div>
              </div>
              {/* ================= TAB 4: FOTO DE BIANKA ================= */}
              {adminTab === 'avatar' && (
                <div className="space-y-6 p-6 bg-white rounded-2xl border border-[#E2E8F0] shadow-xs">
                  <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
                    <div className="flex flex-col items-center gap-2 shrink-0">
                      <BiankaAvatar size={120} showBadge className="shadow-lg ring-4 ring-[#38BDF8]/40" />
                      <span className="text-[11px] font-bold text-[#0F766E] bg-[#ECFDF5] px-2.5 py-0.5 rounded-full">
                        Vista Previa
                      </span>
                    </div>

                    <div className="space-y-3 text-center sm:text-left flex-1">
                      <div>
                        <h4 className="font-bold text-[#0F172A] text-base sm:text-lg">
                          Foto Oficial de Bianka (Avatar de Bienestar)
                        </h4>
                        <p className="text-xs text-[#64748B] mt-1 leading-relaxed">
                          Sube tu imagen <strong>Bianka en Circulo.jpg</strong> (o cualquier foto oficial de Bianka en formato JPG/PNG). Se aplicará de forma automática en toda la plataforma: en el chat de orientación, en la portada de bienvenida y en cada pantalla donde aparece Bianka.
                        </p>
                      </div>

                      <div className="p-3.5 rounded-xl bg-[#FAF6F0] border border-[#E2E8F0] text-xs text-[#334155] space-y-1.5">
                        <div className="font-semibold flex items-center justify-center sm:justify-start space-x-1.5 text-[#0F766E]">
                          <Check className="w-4 h-4" />
                          <span>Instrucción Rápida:</span>
                        </div>
                        <p className="text-[11px] text-[#64748B]">
                          Haz clic en el botón verde a continuación y selecciona el archivo <strong>Bianka en Circulo.jpg</strong> de tu dispositivo. La app lo guardará de inmediato.
                        </p>
                      </div>

                      <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 pt-1">
                        <label className="cursor-pointer px-4 py-2.5 bg-[#0F766E] hover:bg-[#0D9488] text-white text-xs font-bold rounded-xl transition-all flex items-center space-x-2 shadow-xs active:scale-95">
                          <Upload className="w-4 h-4" />
                          <span>Seleccionar "Bianka en Circulo.jpg"</span>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleUploadBiankaPhoto}
                            className="hidden"
                          />
                        </label>

                        <button
                          type="button"
                          onClick={handleResetBiankaPhoto}
                          className="px-3.5 py-2.5 bg-[#F1F5F9] hover:bg-[#E2E8F0] text-[#64748B] text-xs font-semibold rounded-xl transition-colors"
                        >
                          Restablecer a Ilustración Oficial
                        </button>
                      </div>

                      {avatarMsg && (
                        <motion.div
                          initial={{ opacity: 0, y: -4 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs font-bold text-emerald-800 flex items-center justify-center sm:justify-start space-x-2"
                        >
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                          <span>{avatarMsg}</span>
                        </motion.div>
                      )}
                    </div>
                  </div>
                </div>
              )}

            </div>
          )}

          {/* ================= TAB 3: LISTA DE PACIENTES ================= */}
          {adminTab === 'users' && (
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center space-x-3">
                    <h3 className="text-sm font-bold text-[#0F172A] flex items-center">
                      <Users className="w-4 h-4 mr-1.5 text-[#0F766E]" />
                      Directorio de Usuarias ColiFem ({filteredUsers.length})
                    </h3>

                    <button
                      onClick={handleExportExcel}
                      className="inline-flex items-center px-3 py-1.5 rounded-lg bg-[#ECFDF5] border border-[#A7F3D0] text-[#065F46] text-xs font-bold hover:bg-[#D1FAE5] transition-colors"
                    >
                      <Download className="w-3.5 h-3.5 mr-1" />
                      Descargar Excel (.xlsx)
                    </button>
                  </div>

                  <div className="flex items-center space-x-2">
                    <div className="relative">
                      <Search className="w-3.5 h-3.5 text-[#94A3B8] absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        placeholder="Buscar por nombre, ID o teléfono..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-8 pr-3 py-1.5 rounded-lg border border-[#CBD5E1] text-xs"
                      />
                    </div>

                    <select
                      value={selectedAngleFilter}
                      onChange={(e) => setSelectedAngleFilter(e.target.value)}
                      className="px-2.5 py-1.5 rounded-lg border border-[#CBD5E1] text-xs bg-white"
                    >
                      <option value="all">Todas las afecciones</option>
                      <option value="Inflamación constante y gases">Inflamación y gases</option>
                      <option value="Estreñimiento severo">Estreñimiento</option>
                      <option value="Digestión pesada e intolerancias">Digestión pesada</option>
                      <option value="Reflujo y pesadez">Reflujo y acidez</option>
                    </select>
                  </div>
                </div>

                {/* Table */}
                <div className="border border-[#E2E8F0] rounded-2xl overflow-hidden shadow-xs">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-[#F8FAFC] border-b border-[#E2E8F0] text-[#64748B] font-bold uppercase text-[10px]">
                        <tr>
                          <th className="p-3">ID / Paciente</th>
                          <th className="p-3">Contacto</th>
                          <th className="p-3">Ángulo Digestivo</th>
                          <th className="p-3">Progreso</th>
                          <th className="p-3">Push</th>
                          <th className="p-3">Última Actividad</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#F1F5F9]">
                        {filteredUsers.map((u) => (
                          <tr key={u.id} className="hover:bg-[#FAF6F0] transition-colors">
                            <td className="p-3">
                              <div className="font-bold text-[#0F172A]">{u.name}</div>
                              <span className="font-mono text-[10px] text-[#0F766E]">{u.id}</span>
                            </td>
                            <td className="p-3">
                              <div className="font-medium text-[#334155]">{u.whatsapp}</div>
                              <span className="text-[10px] text-[#94A3B8]">{u.email}</span>
                            </td>
                            <td className="p-3">
                              <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-[#F1F5F9] text-[#334155]">
                                {u.digestiveAngle}
                              </span>
                            </td>
                            <td className="p-3">
                              <div className="font-bold text-[#0F172A]">
                                Día {u.currentDay} / 30
                              </div>
                              <span className="text-[10px] text-[#059669]">
                                {u.completedDays.length} días marcados
                              </span>
                            </td>
                            <td className="p-3">
                              <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${u.hasPush ? 'bg-[#D1FAE5] text-[#065F46]' : 'bg-[#F1F5F9] text-[#94A3B8]'}`}>
                                {u.hasPush ? 'Activo ✓' : 'Inactivo'}
                              </span>
                            </td>
                            <td className="p-3 text-[#64748B] text-[11px]">
                              {new Date(u.lastActive).toLocaleDateString()}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

          </div>
        )}

        </div>

      </motion.div>
    </div>
  );
};
