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
  Sparkles
} from 'lucide-react';
import { UserProfile } from '../types';

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

  // Push Broadcast state
  const [pushTitle, setPushTitle] = useState('ColiPlus 30D - Mensaje de Marié');
  const [pushBody, setPushBody] = useState('Recuerda tomar tu dosis de ColiPlus en agua fresca y completar tu chequeo diario.');
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
      const [mRes, uRes] = await Promise.all([
        fetch('/api/admin/metrics'),
        fetch('/api/users')
      ]);
      const mData = await mRes.json();
      const uData = await uRes.json();
      setMetrics(mData);
      setUsersList(uData.users || []);
    } catch (err) {
      console.warn('Admin fetch error:', err);
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
    XLSX.utils.book_append_sheet(wb, ws, 'Usuarios ColiPlus');
    XLSX.writeFile(wb, 'Reporte_Usuarios_ColiPlus_30D.xlsx');
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
            <div className="space-y-8">
              
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

              {/* Users Table & Filters */}
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center space-x-3">
                    <h3 className="text-sm font-bold text-[#0F172A] flex items-center">
                      <Users className="w-4 h-4 mr-1.5 text-[#0F766E]" />
                      Directorio de Pacientes ColiPlus ({filteredUsers.length})
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

            </div>
          )}

        </div>

      </motion.div>
    </div>
  );
};
