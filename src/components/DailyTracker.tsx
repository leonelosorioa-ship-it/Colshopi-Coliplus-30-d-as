import React, { useState, useEffect } from 'react';
import { Save, CheckCircle2, Droplets, Flame, BatteryCharging, AlertCircle, Info, Sparkles, Clock, Lock, Zap } from 'lucide-react';
import { CheckInRecord, UserProfile } from '../types';
import { BRISTOL_SCALE } from '../data/bristolData';
import { getChronologicalStatus } from '../utils/chronologicalCycle';

interface DailyTrackerProps {
  user: UserProfile;
  selectedDay: number;
  onSaveCheckIn: (dayNumber: number, checkIn: CheckInRecord) => void;
  onViewCharts: () => void;
}

export const DailyTracker: React.FC<DailyTrackerProps> = ({
  user,
  selectedDay,
  onSaveCheckIn,
  onViewCharts
}) => {
  const [day, setDay] = useState(selectedDay || user.currentDay || 1);
  const [demoMode, setDemoMode] = useState(false);

  // Real-time 1-second ticker for 24h countdown
  const [now, setNow] = useState(Date.now());
  useEffect(() => {
    const timer = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Form State initialized from existing check-in or defaults
  const existingCheckIn = user.checkIns ? user.checkIns[day] : undefined;

  const [tookSupplement, setTookSupplement] = useState<boolean>(existingCheckIn?.tookSupplement ?? true);
  const [waterLiters, setWaterLiters] = useState<number>(existingCheckIn?.waterLiters ?? 2.0);
  const [antiInflammatoryMeal, setAntiInflammatoryMeal] = useState<boolean>(existingCheckIn?.antiInflammatoryMeal ?? true);
  const [bloatingScore, setBloatingScore] = useState<number>(existingCheckIn?.bloatingScore ?? 2);
  const [energyScore, setEnergyScore] = useState<number>(existingCheckIn?.energyScore ?? 4);
  const [digestionType, setDigestionType] = useState<'liviana' | 'regular' | 'pesada'>(existingCheckIn?.digestionType ?? 'liviana');
  const [bristolType, setBristolType] = useState<number>(existingCheckIn?.bristolType ?? 4);
  const [notes, setNotes] = useState<string>(existingCheckIn?.notes ?? '');
  const [saveSuccess, setSaveSuccess] = useState(false);

  useEffect(() => {
    const c = user.checkIns ? user.checkIns[day] : undefined;
    if (c) {
      setTookSupplement(c.tookSupplement);
      setWaterLiters(c.waterLiters);
      setAntiInflammatoryMeal(c.antiInflammatoryMeal);
      setBloatingScore(c.bloatingScore);
      setEnergyScore(c.energyScore);
      setDigestionType(c.digestionType);
      setBristolType(c.bristolType);
      setNotes(c.notes || '');
    } else {
      setTookSupplement(true);
      setWaterLiters(2.0);
      setAntiInflammatoryMeal(true);
      setBloatingScore(2);
      setEnergyScore(4);
      setDigestionType('liviana');
      setBristolType(4);
      setNotes('');
    }
    setSaveSuccess(false);
  }, [day, user]);

  // Chronological Cycle Status
  const cycleStatus = getChronologicalStatus(user, demoMode, now);
  const isDayAlreadyCompleted = user.completedDays ? user.completedDays.includes(day) : false;
  const isDayWaiting24h = !isDayAlreadyCompleted && day === cycleStatus.nextDayNumber && cycleStatus.isNextDayWaiting && !demoMode;
  const isDayLockedFuture = !demoMode && !isDayAlreadyCompleted && day > cycleStatus.nextDayNumber;
  const isRegistrationBlocked = isDayWaiting24h || isDayLockedFuture;

  const handleSave = () => {
    if (isRegistrationBlocked) return;

    const record: CheckInRecord = {
      date: new Date().toISOString().split('T')[0],
      tookSupplement,
      waterLiters,
      antiInflammatoryMeal,
      bloatingScore,
      energyScore,
      digestionType,
      bristolType,
      notes,
      registeredAt: Date.now()
    };

    onSaveCheckIn(day, record);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const selectedBristolInfo = BRISTOL_SCALE.find(b => b.type === bristolType) || BRISTOL_SCALE[3];

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      
      {/* Header card with Day Selector */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E2E8F0] shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-[#0F766E] uppercase tracking-wider">
            Daily Digestive Tracker
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#0F172A] font-display">
            Registro Diario de Síntomas
          </h1>
          <p className="text-xs text-[#64748B] mt-1">
            Monitorea tu distensión, consistencia en Escala de Bristol y niveles de energía vital en tu ciclo de 30 días.
          </p>
        </div>

        <div className="flex items-center space-x-3 w-full sm:w-auto">
          <div className="flex items-center space-x-2">
            <label className="text-xs font-bold text-[#475569]">Día:</label>
            <select
              value={day}
              onChange={(e) => setDay(Number(e.target.value))}
              className="px-3 py-2 rounded-xl border border-[#CBD5E1] bg-[#FAF6F0] text-xs font-bold text-[#0F172A] focus:ring-2 focus:ring-[#0F766E]"
            >
              {Array.from({ length: 30 }, (_, i) => i + 1).map((d) => (
                <option key={d} value={d}>
                  Día {d} {user.completedDays?.includes(d) ? '✓ Completado' : (d === cycleStatus.nextDayNumber && cycleStatus.isNextDayWaiting) ? '⏳ En Espera (24h)' : ''}
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={onViewCharts}
            className="px-4 py-2 rounded-xl bg-[#F1F5F9] hover:bg-[#E2E8F0] text-[#334155] text-xs font-bold transition-colors"
          >
            Ver Gráficas ↗
          </button>
        </div>
      </div>

      {/* 24-HOUR COUNTDOWN BANNER IF CURRENT SELECTED DAY IS IN WAITING / ASSIMILATION */}
      {isDayWaiting24h && (
        <div className="p-5 rounded-3xl bg-linear-to-r from-[#FFFBEB] via-[#FEF3C7] to-[#FDE68A] border-2 border-[#F59E0B] shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-start space-x-3 text-[#92400E]">
            <div className="w-10 h-10 rounded-2xl bg-white border border-[#F59E0B]/50 flex items-center justify-center shrink-0 shadow-xs mt-0.5">
              <Clock className="w-5 h-5 text-[#D97706] animate-pulse" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-[10px] uppercase tracking-wider font-black px-2 py-0.5 rounded-full bg-[#D97706] text-white">
                  Ciclo de 24 Horas Activo
                </span>
                <span className="text-xs font-bold text-[#92400E]">
                  Día {cycleStatus.maxCompletedDay} Registrado con éxito ✓
                </span>
              </div>
              <h3 className="text-base font-extrabold text-[#78350F] mt-1">
                Día {day} en Asimilación Digestiva (24 Horas)
              </h3>
              <p className="text-xs text-[#92400E] mt-0.5 max-w-xl leading-relaxed">
                El registro del Día {day} no se habilitará hasta que el reloj de 24 horas llegue a cero, garantizando el uso cronológico y ordenado de todo tu ciclo de 30 días.
              </p>
            </div>
          </div>

          {/* Large Countdown Clock Box */}
          <div className="bg-white/95 px-5 py-3 rounded-2xl border-2 border-[#F59E0B] text-center shadow-xs w-full md:w-auto shrink-0">
            <div className="text-[10px] font-bold uppercase tracking-wider text-[#92400E]">
              Habilitación en:
            </div>
            <div className="font-mono text-2xl sm:text-3xl font-black text-[#B45309] tracking-widest my-0.5">
              {cycleStatus.formattedTime}
            </div>
            <div className="flex justify-center items-center space-x-2 text-[9px] text-[#A16207] font-semibold uppercase">
              <span>{cycleStatus.hours}h</span>
              <span>:</span>
              <span>{cycleStatus.minutes}m</span>
              <span>:</span>
              <span>{cycleStatus.seconds}s</span>
            </div>
          </div>
        </div>
      )}

      {/* Warning banner if selected day is locked because previous days are not done */}
      {isDayLockedFuture && (
        <div className="p-4 rounded-2xl bg-[#F8FAFC] border-2 border-slate-300 text-slate-700 flex items-center justify-between gap-3 text-xs">
          <div className="flex items-center space-x-2">
            <Lock className="w-5 h-5 text-slate-400 shrink-0" />
            <span>
              <strong>Día {day} Bloqueado:</strong> Para mantener la secuencia cronológica de 30 días, debes completar primero el <strong>Día {cycleStatus.nextDayNumber}</strong>.
            </span>
          </div>
          <button
            onClick={() => setDay(cycleStatus.nextDayNumber)}
            className="px-3 py-1.5 rounded-lg bg-[#0F766E] text-white font-bold text-xs hover:bg-[#115E59] whitespace-nowrap cursor-pointer"
          >
            Ir al Día {cycleStatus.nextDayNumber} →
          </button>
        </div>
      )}

      {/* Main Form Blocks */}
      <div className={`bg-white rounded-3xl p-6 sm:p-8 border border-[#E2E8F0] shadow-sm space-y-8 ${isRegistrationBlocked ? 'opacity-90' : ''}`}>
        
        {/* Row 1: Habit Checkers (ColiFem, Water, Clean Meal) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          
          {/* ColiFem Dose */}
          <div className="p-4 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0] space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[#334155] uppercase tracking-wider flex items-center">
                <Sparkles className="w-3.5 h-3.5 mr-1.5 text-[#0F766E]" />
                Dosis Coli Plus
              </span>
              <span className="text-[10px] font-bold text-[#0F766E] bg-[#D1FAE5] px-2 py-0.5 rounded-full">
                Fibra & Probióticos
              </span>
            </div>
            <p className="text-xs text-[#64748B]">¿Tomaste tu porción hoy (1 cucharada)?</p>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setTookSupplement(true)}
                className={`py-2 text-xs font-bold rounded-xl border transition-all ${
                  tookSupplement
                    ? 'bg-[#0F766E] text-white border-[#0F766E] shadow-xs'
                    : 'bg-white text-[#64748B] border-[#CBD5E1]'
                }`}
              >
                Sí, tomado ✓
              </button>
              <button
                type="button"
                onClick={() => setTookSupplement(false)}
                className={`py-2 text-xs font-bold rounded-xl border transition-all ${
                  !tookSupplement
                    ? 'bg-[#64748B] text-white border-[#64748B]'
                    : 'bg-white text-[#64748B] border-[#CBD5E1]'
                }`}
              >
                Pendiente
              </button>
            </div>
          </div>

          {/* Water Intake */}
          <div className="p-4 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0] space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[#334155] uppercase tracking-wider flex items-center">
                <Droplets className="w-3.5 h-3.5 mr-1.5 text-[#0284C7]" />
                Agua Ingerida
              </span>
              <span className="text-xs font-bold font-mono text-[#0284C7]">
                {waterLiters.toFixed(1)} L
              </span>
            </div>
            <p className="text-xs text-[#64748B]">Objetivo diario: 2.0L a 2.5L</p>
            <div className="flex items-center space-x-2">
              <button
                type="button"
                onClick={() => setWaterLiters(Math.max(0.5, Number((waterLiters - 0.25).toFixed(2))))}
                className="w-8 h-8 rounded-lg bg-white border border-[#CBD5E1] text-xs font-bold hover:bg-[#F1F5F9]"
              >
                -
              </button>
              <div className="flex-1 bg-[#E2E8F0] h-2 rounded-full overflow-hidden">
                <div
                  className="bg-[#0284C7] h-full transition-all"
                  style={{ width: `${Math.min(100, (waterLiters / 2.5) * 100)}%` }}
                />
              </div>
              <button
                type="button"
                onClick={() => setWaterLiters(Math.min(4.0, Number((waterLiters + 0.25).toFixed(2))))}
                className="w-8 h-8 rounded-lg bg-white border border-[#CBD5E1] text-xs font-bold hover:bg-[#F1F5F9]"
              >
                +
              </button>
            </div>
          </div>

          {/* Clean Digestive Meal */}
          <div className="p-4 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0] space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[#334155] uppercase tracking-wider flex items-center">
                <Flame className="w-3.5 h-3.5 mr-1.5 text-[#EA580C]" />
                Comida Antiinflamatoria
              </span>
              <span className="text-[10px] font-bold text-[#EA580C] bg-[#FFEDD5] px-2 py-0.5 rounded-full">
                Bajo FODMAP
              </span>
            </div>
            <p className="text-xs text-[#64748B]">¿Evitaste frituras y harinas?</p>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setAntiInflammatoryMeal(true)}
                className={`py-2 text-xs font-bold rounded-xl border transition-all ${
                  antiInflammatoryMeal
                    ? 'bg-[#10B981] text-white border-[#10B981] shadow-xs'
                    : 'bg-white text-[#64748B] border-[#CBD5E1]'
                }`}
              >
                Cumplido ✓
              </button>
              <button
                type="button"
                onClick={() => setAntiInflammatoryMeal(false)}
                className={`py-2 text-xs font-bold rounded-xl border transition-all ${
                  !antiInflammatoryMeal
                    ? 'bg-[#64748B] text-white border-[#64748B]'
                    : 'bg-white text-[#64748B] border-[#CBD5E1]'
                }`}
              >
                Salí de la pauta
              </button>
            </div>
          </div>

        </div>

        {/* Row 2: Bloating Score (1 to 5) */}
        <div className="space-y-3 pt-2">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-[#0F172A] flex items-center">
                <span>Nivel de Distensión Abdominal e Inflamación</span>
                <span className="ml-2 text-xs font-normal text-[#64748B]">
                  (1 = Vientre plano, 5 = Hinchazón severa)
                </span>
              </h3>
            </div>
            <span className="text-sm font-bold font-mono text-[#0F766E] bg-[#ECFDF5] px-3 py-0.5 rounded-lg border border-[#A7F3D0]">
              Nivel {bloatingScore} de 5
            </span>
          </div>

          <div className="grid grid-cols-5 gap-2">
            {[
              { val: 1, label: '1 - Vientre Plano', desc: 'Confort total, sin gas' },
              { val: 2, label: '2 - Plenitud Leve', desc: 'Mínima molestia' },
              { val: 3, label: '3 - Moderado', desc: 'Gas tolerable tras comer' },
              { val: 4, label: '4 - Notorio', desc: 'Ropa apretada, tirantez' },
              { val: 5, label: '5 - Severo', desc: 'Abdomen tenso y dolor' }
            ].map((item) => (
              <button
                key={item.val}
                type="button"
                onClick={() => setBloatingScore(item.val)}
                className={`p-3 rounded-xl border text-center transition-all ${
                  bloatingScore === item.val
                    ? 'bg-[#0F766E] text-white border-[#0F766E] shadow-sm'
                    : 'bg-[#F8FAFC] border-[#E2E8F0] text-[#334155] hover:bg-white'
                }`}
              >
                <div className="text-xs font-bold">{item.label}</div>
                <div className="text-[10px] opacity-80 hidden sm:block mt-0.5">{item.desc}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Row 3: Vitality & Energy (1 to 5) */}
        <div className="space-y-3 pt-2">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-[#0F172A] flex items-center">
                <BatteryCharging className="w-4 h-4 mr-1.5 text-[#F59E0B]" />
                <span>Nivel de Energía y Claridad Mental</span>
                <span className="ml-2 text-xs font-normal text-[#64748B]">
                  (1 = Fatiga post-comida, 5 = Vitalidad plena)
                </span>
              </h3>
            </div>
            <span className="text-sm font-bold font-mono text-[#D97706] bg-[#FFFBEB] px-3 py-0.5 rounded-lg border border-[#FDE68A]">
              Nivel {energyScore} de 5
            </span>
          </div>

          <div className="grid grid-cols-5 gap-2">
            {[1, 2, 3, 4, 5].map((val) => (
              <button
                key={val}
                type="button"
                onClick={() => setEnergyScore(val)}
                className={`py-2.5 rounded-xl border text-xs font-bold transition-all ${
                  energyScore === val
                    ? 'bg-[#D97706] text-white border-[#D97706] shadow-sm'
                    : 'bg-[#F8FAFC] border-[#E2E8F0] text-[#475569] hover:bg-white'
                }`}
              >
                {val} ★
              </button>
            ))}
          </div>
        </div>

        {/* Row 4: Digestion Type */}
        <div className="space-y-3 pt-2">
          <h3 className="text-sm font-bold text-[#0F172A]">Sensación Digestiva Postprandial</h3>
          <div className="grid grid-cols-3 gap-3">
            {[
              { type: 'liviana', title: 'Liviana y Ágil', icon: '🍃' },
              { type: 'regular', title: 'Normal / Estable', icon: '⚖️' },
              { type: 'pesada', title: 'Pesada / Lenta', icon: '🪨' }
            ].map((item) => (
              <button
                key={item.type}
                type="button"
                onClick={() => setDigestionType(item.type as any)}
                className={`p-3 rounded-xl border text-xs font-bold flex items-center justify-center space-x-2 transition-all ${
                  digestionType === item.type
                    ? 'bg-[#0F766E] text-white border-[#0F766E] shadow-xs'
                    : 'bg-[#F8FAFC] border-[#E2E8F0] text-[#334155] hover:bg-white'
                }`}
              >
                <span>{item.icon}</span>
                <span>{item.title}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Row 5: Bristol Stool Scale Selector */}
        <div className="space-y-4 pt-4 border-t border-[#E2E8F0]">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-[#0F172A]">
                Escala de Bristol (Consistencia de Evacuación)
              </h3>
              <p className="text-xs text-[#64748B]">
                Selecciona la forma más representativa de tu evacuación de hoy.
              </p>
            </div>
            <span className="text-xs font-bold px-2.5 py-1 rounded-md bg-[#ECFDF5] text-[#059669]">
              Ideal: Tipo 3 y 4
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-2">
            {BRISTOL_SCALE.map((item) => {
              const isSelected = bristolType === item.type;
              return (
                <div
                  key={item.type}
                  onClick={() => setBristolType(item.type)}
                  className={`p-3 rounded-2xl border-2 cursor-pointer transition-all text-center flex flex-col justify-between ${
                    isSelected
                      ? 'border-[#0F766E] bg-[#F0FDF4] shadow-xs'
                      : 'border-[#E2E8F0] bg-[#F8FAFC] hover:border-[#CBD5E1]'
                  }`}
                >
                  <div>
                    <span className="text-xs font-black font-mono text-[#0F172A]">
                      TIPO {item.type}
                    </span>
                    <p className="text-[10px] text-[#64748B] mt-1 line-clamp-2">
                      {item.title.split(':')[1]}
                    </p>
                  </div>
                  <div className="mt-2">
                    <span
                      className="text-[9px] font-bold px-1.5 py-0.5 rounded-full text-white"
                      style={{ backgroundColor: item.color }}
                    >
                      {item.status.split(' ')[0]}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Wellness Guidance based on selected Bristol Type */}
          <div className="p-4 rounded-2xl bg-[#FAF6F0] border border-[#E2E8F0] space-y-1">
            <div className="flex items-center space-x-2">
              <span className="text-xs font-bold text-[#0F766E]">
                Consejo de Bienestar de Bianka para {selectedBristolInfo.title}:
              </span>
            </div>
            <p className="text-xs text-[#334155] leading-relaxed">
              {selectedBristolInfo.recommendation}
            </p>
          </div>
        </div>

        {/* Row 6: Personal Notes */}
        <div className="space-y-2 pt-2">
          <label className="block text-xs font-bold text-[#334155] uppercase tracking-wider">
            Notas u Observaciones del Día (Opcional)
          </label>
          <textarea
            rows={2}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Ej. Noté menos gases por la tarde; la infusión con jengibre me alivió el cólico..."
            className="w-full px-4 py-3 rounded-xl border border-[#CBD5E1] text-xs bg-[#F8FAFC] focus:ring-2 focus:ring-[#0F766E] focus:outline-hidden"
          />
        </div>

        {/* Save Button */}
        <div className="pt-4 border-t border-[#E2E8F0] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            {saveSuccess && (
              <span className="text-xs font-bold text-[#10B981] flex items-center">
                <CheckCircle2 className="w-4 h-4 mr-1.5" />
                ¡Chequeo del Día {day} guardado con éxito!
              </span>
            )}
            {isDayWaiting24h && (
              <div className="flex items-center space-x-2 text-xs font-bold text-[#B45309]">
                <Clock className="w-4 h-4 text-[#D97706] animate-pulse" />
                <span>En espera de asimilación (24h): Desbloquea en {cycleStatus.formattedTime}</span>
              </div>
            )}
            {isDayLockedFuture && (
              <div className="flex items-center space-x-2 text-xs font-bold text-slate-500">
                <Lock className="w-4 h-4 text-slate-400" />
                <span>Completa primero el Día {cycleStatus.nextDayNumber}</span>
              </div>
            )}
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-2 w-full sm:w-auto">
            {isRegistrationBlocked && (
              <button
                type="button"
                onClick={() => setDemoMode(true)}
                className="w-full sm:w-auto px-3 py-2 rounded-xl border border-[#CBD5E1] text-[#64748B] hover:text-[#0F172A] font-bold text-xs flex items-center justify-center space-x-1 cursor-pointer"
                title="Permite omitir la espera de 24h para demostración"
              >
                <Zap className="w-3.5 h-3.5 text-[#D97706]" />
                <span>Omitir Espera (Demo)</span>
              </button>
            )}

            <button
              id="btn-save-checkin"
              onClick={handleSave}
              disabled={isRegistrationBlocked}
              className={`w-full sm:w-auto px-8 py-3 rounded-xl font-bold text-sm transition-all shadow-md flex items-center justify-center space-x-2 ${
                isDayWaiting24h
                  ? 'bg-[#FEF3C7] text-[#92400E] border border-[#FDE68A] cursor-not-allowed opacity-90'
                  : isDayLockedFuture
                  ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                  : 'bg-linear-to-r from-[#0F766E] to-[#10B981] text-white hover:opacity-95 cursor-pointer'
              }`}
            >
              {isDayWaiting24h ? (
                <>
                  <Clock className="w-4 h-4 text-[#D97706] animate-pulse" />
                  <span>Esperando 24 Horas ({cycleStatus.formattedTime})</span>
                </>
              ) : isDayLockedFuture ? (
                <>
                  <Lock className="w-4 h-4 text-slate-400" />
                  <span>Día Bloqueado</span>
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  <span>Guardar Chequeo de Síntomas</span>
                </>
              )}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
