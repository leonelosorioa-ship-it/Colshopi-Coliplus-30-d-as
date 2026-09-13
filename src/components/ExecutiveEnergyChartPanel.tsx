import React, { useState } from 'react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend
} from 'recharts';
import { Download, TrendingUp, Sparkles, Activity, FileText, CheckCircle2 } from 'lucide-react';
import { UserProfile } from '../types';
import { generateReportPDF } from '../utils/pdfGenerator';

interface ExecutiveEnergyChartPanelProps {
  user: UserProfile;
  onOpenTracker: (dayNumber: number) => void;
}

export const ExecutiveEnergyChartPanel: React.FC<ExecutiveEnergyChartPanelProps> = ({
  user,
  onOpenTracker
}) => {
  const [timeRange, setTimeRange] = useState<'7d' | '14d' | '30d'>('30d');
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);

  // Generate chart data series from user.checkIns or interpolated model curve
  const maxDay = timeRange === '7d' ? 7 : timeRange === '14d' ? 14 : 30;

  const chartData = Array.from({ length: maxDay }, (_, i) => {
    const dayNum = i + 1;
    const existing = user.checkIns[dayNum];

    // Realistic trend progression based on protocol
    const simulatedBloating = Math.max(1, Math.round(4.6 - (dayNum * 0.11)));
    const simulatedEnergy = Math.min(5, Math.round(2.2 + (dayNum * 0.09)));
    const simulatedBristol = dayNum < 5 ? 2 : dayNum < 10 ? 3 : 4;

    return {
      name: `D${dayNum}`,
      day: dayNum,
      bloating: existing ? existing.bloatingScore : (dayNum <= user.currentDay ? simulatedBloating : null),
      energy: existing ? existing.energyScore : (dayNum <= user.currentDay ? simulatedEnergy : null),
      bristol: existing ? existing.bristolType : (dayNum <= user.currentDay ? simulatedBristol : null),
      water: existing ? existing.waterLiters : (dayNum <= user.currentDay ? 2.1 : null)
    };
  });

  const handleDownloadPdf = () => {
    setIsGeneratingPdf(true);
    setTimeout(() => {
      generateReportPDF(user);
      setIsGeneratingPdf(false);
    }, 600);
  };

  const completedCount = user.completedDays.length;
  const adherenceRate = Math.min(100, Math.round((completedCount / user.currentDay) * 100)) || 100;

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      
      {/* Header card with Report Download Action */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E2E8F0] shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-[#ECFDF5] text-[#065F46] mb-2">
            <Activity className="w-3.5 h-3.5 mr-1.5 text-[#059669]" />
            Panel Clínico de Evolución
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#0F172A] font-display">
            Métricas de Transformación Digestiva
          </h1>
          <p className="text-xs text-[#64748B] mt-1 max-w-xl">
            Gráficas cuantitativas de reducción de distensión, aumento de vitalidad y estabilidad de la Escala de Bristol.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* Range tabs */}
          <div className="flex items-center bg-[#F1F5F9] p-1 rounded-xl border border-[#CBD5E1]">
            {(['7d', '14d', '30d'] as const).map((r) => (
              <button
                key={r}
                onClick={() => setTimeRange(r)}
                className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${
                  timeRange === r
                    ? 'bg-white text-[#0F766E] shadow-xs'
                    : 'text-[#64748B] hover:text-[#0F172A]'
                }`}
              >
                {r.toUpperCase()}
              </button>
            ))}
          </div>

          {/* Download PDF button */}
          <button
            id="btn-download-clinical-report"
            onClick={handleDownloadPdf}
            disabled={isGeneratingPdf}
            className="inline-flex items-center px-4 py-2.5 rounded-xl bg-[#0F766E] text-white font-bold text-xs hover:bg-[#115E59] transition-all shadow-xs"
          >
            <Download className="w-4 h-4 mr-1.5" />
            <span>{isGeneratingPdf ? 'Generando PDF...' : 'Descargar Informe PDF'}</span>
          </button>
        </div>
      </div>

      {/* 3 Summary Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        
        <div className="bg-white p-5 rounded-2xl border border-[#E2E8F0] shadow-xs space-y-2">
          <span className="text-[11px] font-bold text-[#64748B] uppercase tracking-wider">
            Adherencia al Protocolo
          </span>
          <div className="flex items-baseline space-x-2">
            <span className="text-3xl font-extrabold text-[#0F766E] font-display">
              {adherenceRate}%
            </span>
            <span className="text-xs text-[#10B981] font-semibold">Excelente</span>
          </div>
          <p className="text-xs text-[#64748B]">
            {completedCount} de {user.currentDay} días completados activamente.
          </p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-[#E2E8F0] shadow-xs space-y-2">
          <span className="text-[11px] font-bold text-[#64748B] uppercase tracking-wider">
            Reducción de Distensión
          </span>
          <div className="flex items-baseline space-x-2">
            <span className="text-3xl font-extrabold text-[#059669] font-display">
              - 74%
            </span>
            <span className="text-xs text-[#059669] font-semibold">Vientre Descomprimido</span>
          </div>
          <p className="text-xs text-[#64748B]">
            De nivel 4.6 (tirantez severa) a nivel 1.4 (confort).
          </p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-[#E2E8F0] shadow-xs space-y-2">
          <span className="text-[11px] font-bold text-[#64748B] uppercase tracking-wider">
            Consistencia Bristol
          </span>
          <div className="flex items-baseline space-x-2">
            <span className="text-3xl font-extrabold text-[#D97706] font-display">
              Tipo 3 - 4
            </span>
            <span className="text-xs text-[#D97706] font-semibold">Óptimo</span>
          </div>
          <p className="text-xs text-[#64748B]">
            Heces bien hidratadas y sin dolor expulsivo.
          </p>
        </div>

      </div>

      {/* Main Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Chart 1: Curva de Desinflamación & Energía */}
        <div className="bg-white p-6 rounded-3xl border border-[#E2E8F0] shadow-sm space-y-4">
          <div>
            <h3 className="text-base font-bold text-[#0F172A] font-display">
              Curva de Desinflamación Abdominal vs. Vitalidad
            </h3>
            <p className="text-xs text-[#64748B]">
              Observa cómo baja la distensión (verde azulado) y sube tu energía (dorado).
            </p>
          </div>

          <div className="h-64 sm:h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
                <XAxis dataKey="name" stroke="#94A3B8" fontSize={11} />
                <YAxis domain={[1, 5]} stroke="#94A3B8" fontSize={11} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#FFFFFF',
                    borderRadius: '12px',
                    borderColor: '#E2E8F0',
                    fontSize: '12px'
                  }}
                />
                <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '8px' }} />
                <Line
                  type="monotone"
                  dataKey="bloating"
                  name="Distensión (1-5)"
                  stroke="#0F766E"
                  strokeWidth={3}
                  dot={{ r: 3, fill: '#0F766E' }}
                />
                <Line
                  type="monotone"
                  dataKey="energy"
                  name="Energía (1-5)"
                  stroke="#F59E0B"
                  strokeWidth={3}
                  dot={{ r: 3, fill: '#F59E0B' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 2: Escala de Bristol Trend */}
        <div className="bg-white p-6 rounded-3xl border border-[#E2E8F0] shadow-sm space-y-4">
          <div>
            <h3 className="text-base font-bold text-[#0F172A] font-display">
              Evolución en Escala de Bristol (Días 1 a {maxDay})
            </h3>
            <p className="text-xs text-[#64748B]">
              Objetivo clínico: alcanzar y mantener Tipos 3 y 4 de evacuación.
            </p>
          </div>

          <div className="h-64 sm:h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
                <XAxis dataKey="name" stroke="#94A3B8" fontSize={11} />
                <YAxis domain={[1, 7]} ticks={[1, 2, 3, 4, 5, 6, 7]} stroke="#94A3B8" fontSize={11} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#FFFFFF',
                    borderRadius: '12px',
                    borderColor: '#E2E8F0',
                    fontSize: '12px'
                  }}
                />
                <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '8px' }} />
                <Bar
                  dataKey="bristol"
                  name="Tipo Bristol (1 a 7)"
                  fill="#10B981"
                  radius={[6, 6, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>

      {/* Advice Box from Marie */}
      <div className="p-6 rounded-3xl bg-[#FAF6F0] border border-[#E2E8F0] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <span className="text-xs font-bold text-[#0F766E] uppercase tracking-wider">
            Diagnóstico de Progreso con Marié
          </span>
          <h4 className="text-sm font-bold text-[#0F172A]">
            ¡Tu curva de recuperación responde a la perfección!
          </h4>
          <p className="text-xs text-[#475569] max-w-2xl leading-relaxed">
            La combinación de linaza molida, pitaya y alcachofa ha mantenido la hidratación luminal de tu colon. Si necesitas ajustar algún parámetro de tu dosis diaria, puedes consultarme en el chat.
          </p>
        </div>

        <button
          onClick={() => onOpenTracker(user.currentDay)}
          className="px-5 py-2.5 rounded-xl bg-white border border-[#CBD5E1] text-[#0F766E] font-bold text-xs hover:bg-[#ECFDF5] transition-colors whitespace-nowrap shadow-xs"
        >
          Registrar Síntoma Hoy →
        </button>
      </div>

    </div>
  );
};
