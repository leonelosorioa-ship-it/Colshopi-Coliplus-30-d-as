import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  Activity,
  Download,
  Info,
  Lock,
  MessageCircle,
  ExternalLink
} from 'lucide-react';
import { DigestiveAngle, UserProfile } from '../types';
import {
  validateStrictVIPCode,
  markCodeAsClaimed,
  getWhatsAppCodeRequestUrl
} from '../data/vipCodes';
import { BiankaAvatar } from './BiankaAvatar';
import { ColShopiLogo } from './ColShopiLogo';
import { SixDigitInput } from './SixDigitInput';

interface OnboardingQuizProps {
  onComplete: (profile: UserProfile) => void;
  onOpenAdmin?: () => void;
  onInstallPWA?: () => void;
}

const AGE_RANGES = [
  '18 - 24 años',
  '25 - 34 años',
  '35 - 44 años',
  '45 - 54 años',
  '55+ años'
];

const DIGESTIVE_ANGLES: { angle: DigestiveAngle; title: string; desc: string; icon: string }[] = [
  {
    angle: 'Hinchazón Abdominal y Gases',
    title: 'Hinchazón Abdominal y Gases Post-Comida',
    desc: 'Vientre plano por la mañana que se distiende dolorosamente con el paso de las horas y acumula gases retenidos.',
    icon: '💨'
  },
  {
    angle: 'Tránsito Lento y Estreñimiento',
    title: 'Tránsito Lento / Estreñimiento Severo',
    desc: 'Evacuaciones cada 2 o 3 días, heces duras (Bristol 1-2), esfuerzo excesivo y sensación de bloqueo pélvico.',
    icon: '⏳'
  },
  {
    angle: 'Digestión Pesada e Intolerancias',
    title: 'Digestión Pesada e Intolerancias Frecuentes',
    desc: 'Sensación de tener una piedra en el estómago tras comer, somnolencia postprandial y digestiones lentas.',
    icon: '🪨'
  },
  {
    angle: 'Disbiosis y Falta de Energía',
    title: 'Detox Intestinal y Falta de Energía',
    desc: 'Cansancio corporal, niebla mental, microbiota alterada y necesidad de resetear el tracto digestivo.',
    icon: '🌱'
  }
];

const COMMON_SYMPTOMS = [
  'Vientre inflamado al final de la tarde',
  'Gases retenidos que causan pinchazos o cólicos',
  'Evacuaciones irregulares o con mucho esfuerzo',
  'Sensación de evacuación incompleta',
  'Pesadez estomacal durante más de 3 horas',
  'Intolerancia notable a lácteos, fritos o harinas',
  'Cansancio y somnolencia tras almorzar',
  'Dolor o espasmo sordo en el costado del colon'
];

export const OnboardingQuiz: React.FC<OnboardingQuizProps> = ({
  onComplete,
  onOpenAdmin,
  onInstallPWA
}) => {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);

  // Form State
  const [name, setName] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [email, setEmail] = useState('');
  const [ageRange, setAgeRange] = useState('35 - 44 años');
  const [accessCode, setAccessCode] = useState('');
  const [digestiveAngle, setDigestiveAngle] = useState<DigestiveAngle>('Hinchazón Abdominal y Gases');
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([
    'Vientre inflamado al final de la tarde',
    'Gases retenidos que causan pinchazos o cólicos'
  ]);
  const [codeError, setCodeError] = useState('');
  const [generalError, setGeneralError] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const toggleSymptom = (symptom: string) => {
    if (selectedSymptoms.includes(symptom)) {
      setSelectedSymptoms(selectedSymptoms.filter(s => s !== symptom));
    } else {
      setSelectedSymptoms([...selectedSymptoms, symptom]);
    }
  };

  // Step 1: Validate 6-digit Code & Contact Details with Strict 50 Secret Codes & Single-Use
  const [isValidatingCode, setIsValidatingCode] = useState(false);

  const handleValidateStep1 = async () => {
    setGeneralError('');
    setCodeError('');

    if (!name.trim()) {
      setGeneralError('Por favor ingresa tu nombre completo.');
      return;
    }
    if (!whatsapp.trim()) {
      setGeneralError('Por favor ingresa tu número de WhatsApp de pedido.');
      return;
    }

    const cleanedCode = accessCode.trim();
    if (!cleanedCode) {
      setCodeError('Por favor ingresa tu código VIP de 6 dígitos.');
      return;
    }

    if (cleanedCode.length < 6) {
      setCodeError(`El código debe contener exactamente 6 dígitos (llevas ${cleanedCode.length}/6).`);
      return;
    }

    setIsValidatingCode(true);

    try {
      // 1. Intento de validación con el servidor
      const response = await fetch('/api/validate-code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: cleanedCode })
      });

      const data = await response.json();

      if (!response.ok || !data.valid) {
        setCodeError(
          data.error ||
          'Código no reconocido o no autorizado. El acceso a ColiFem 30D es exclusivo para compradoras de ColShopi. Solicita tu código único de 6 dígitos a Bianka por WhatsApp.'
        );
        setIsValidatingCode(false);
        return;
      }
    } catch {
      // 2. Validación cliente de respaldo estricta (50 códigos secretos y un solo uso)
      const localValidation = validateStrictVIPCode(cleanedCode);
      if (!localValidation.isValid) {
        setCodeError(localValidation.error || 'Código no reconocido o no autorizado.');
        setIsValidatingCode(false);
        return;
      }
    }

    setIsValidatingCode(false);

    // Avanzar al Paso 2: Prioridad Digestiva
    setStep(2);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Step 4: Finalize Onboarding & Initialize Profile
  const handleFinish = async () => {
    setIsGenerating(true);

    const generatedId = `VIP-${Math.floor(1000 + Math.random() * 9000)}`;
    const cleanCode = accessCode.trim();

    // Marcar código como reclamado de uso único y exclusivo
    markCodeAsClaimed(cleanCode, generatedId, name.trim());

    const newProfile: UserProfile = {
      id: generatedId,
      name: name.trim() || 'Clienta ColShopi',
      whatsapp: whatsapp.trim() || '+57 310 400 7428',
      email: email.trim() || 'cliente@colshopi.com',
      ageRange,
      accessCode: cleanCode,
      digestiveAngle,
      symptoms: selectedSymptoms,
      currentDay: 1,
      completedDays: [],
      checkIns: {},
      createdAt: new Date().toISOString(),
      lastActive: new Date().toISOString()
    };

    try {
      await fetch('/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newProfile)
      });
    } catch (e) {
      console.warn('Backend sync fallback, continuing locally:', e);
    }

    setTimeout(() => {
      setIsGenerating(false);
      onComplete(newProfile);
    }, 1400);
  };

  const whatsappCodeUrl = getWhatsAppCodeRequestUrl(name, whatsapp);

  return (
    <div className="w-full max-w-xl mx-auto py-2 sm:py-6 px-3 sm:px-4">
      
      {/* Outer Card */}
      <div className="w-full bg-white rounded-2xl sm:rounded-3xl shadow-xl border border-[#E2E8F0] overflow-hidden">
        
        {/* CARD DARK HEADER - Clean, modern, responsive */}
        <div className="bg-[#0D1926] text-white px-4 py-3.5 sm:px-6 sm:py-5 border-b border-[#1E293B]">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center space-x-2.5 min-w-0">
              <ColShopiLogo size={32} className="shrink-0" />
              <div className="min-w-0">
                <span className="inline-block text-[9px] sm:text-[10px] font-extrabold tracking-wider uppercase px-2 py-0.5 rounded-full bg-[#0F766E]/60 text-[#5EEAD4] border border-[#14B8A6]/40 truncate">
                  Compradoras VIP
                </span>
                <h1 className="text-xs sm:text-base font-extrabold text-white tracking-tight truncate mt-0.5">
                  Activación Protocolo 30D
                </h1>
              </div>
            </div>

            <div className="flex items-center space-x-2 shrink-0">
              {onInstallPWA && (
                <button
                  type="button"
                  onClick={onInstallPWA}
                  className="hidden sm:inline-flex items-center px-2.5 py-1 rounded-lg bg-[#1E293B] hover:bg-[#334155] text-white text-[11px] font-semibold border border-[#475569]/40 transition-colors"
                >
                  <Download className="w-3 h-3 mr-1 text-[#38BDF8]" />
                  Instalar
                </button>
              )}
              <div className="text-[11px] font-mono font-bold text-[#38BDF8] bg-[#0F172A] px-2.5 py-1 rounded-lg border border-[#1E293B] shadow-inner">
                Paso {step} de 4
              </div>
            </div>
          </div>

          {/* 4-STEP VISUAL PROGRESS BAR */}
          <div className="mt-3.5 pt-3 border-t border-[#1E293B]/70 grid grid-cols-4 gap-1.5 text-center">
            {[
              { num: 1, label: 'Acceso VIP' },
              { num: 2, label: 'Enfoque' },
              { num: 3, label: 'Síntomas' },
              { num: 4, label: 'Activación' }
            ].map((s) => {
              const isCurrent = step === s.num;
              const isPast = step > s.num;
              return (
                <div key={s.num} className="flex flex-col items-center">
                  <div
                    className={`w-full h-1 rounded-full mb-1 transition-all ${
                      isPast
                        ? 'bg-[#10B981]'
                        : isCurrent
                        ? 'bg-[#38BDF8]'
                        : 'bg-[#334155]'
                    }`}
                  />
                  <span
                    className={`text-[9px] sm:text-[10px] font-semibold truncate ${
                      isCurrent
                        ? 'text-[#38BDF8] font-bold'
                        : isPast
                        ? 'text-[#10B981]'
                        : 'text-[#64748B]'
                    }`}
                  >
                    {s.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* CARD BODY CONTENT */}
        <div className="p-4 sm:p-6">
          <AnimatePresence mode="wait">
            
            {/* ================= STEP 1: PORTADA TY EXACT FORM ================= */}
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-4 sm:space-y-5"
              >
                {/* WELCOME BANNER WITH BIANKA */}
                <div className="bg-[#0F172A] rounded-2xl p-4 sm:p-5 text-white border border-[#1E293B] shadow-lg">
                  <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-3.5 sm:gap-4">
                    <BiankaAvatar id="bianka-avatar-welcome" size={64} showBadge className="shrink-0 shadow-md ring-2 ring-[#38BDF8]/40" />
                    <div className="flex-1 min-w-0">
                      <div className="inline-block text-[10px] font-bold text-[#34D399] bg-[#064E3B]/70 px-2 py-0.5 rounded-full mb-1">
                        Tu Asistente Oficial de Bienestar
                      </div>
                      <h2 className="text-sm sm:text-base font-bold text-white flex items-center justify-center sm:justify-start gap-1">
                        <span>¡Bienvenida a ColShopi! Soy Bianka</span>
                        <span>💚</span>
                      </h2>
                      <p className="text-xs text-[#94A3B8] leading-relaxed mt-1">
                        Acompañaré tu reto de 30 días con <strong className="text-[#38BDF8]">Coli Plus</strong>. Para activar tu acceso personalizado, ingresa tu código VIP de 6 dígitos.
                      </p>
                    </div>
                  </div>

                  {/* Banner Bottom Action: Request Code via WhatsApp */}
                  <div className="mt-3.5 pt-3 border-t border-[#1E293B] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2.5">
                    <div className="flex items-center justify-center sm:justify-start text-xs text-[#CBD5E1] font-medium">
                      <Lock className="w-3.5 h-3.5 text-[#F59E0B] mr-1.5 shrink-0" />
                      <span>¿Aún no tienes tu código de 6 dígitos?</span>
                    </div>

                    <a
                      id="btn-request-code-whatsapp"
                      href={whatsappCodeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full sm:w-auto inline-flex items-center justify-center px-4 py-2.5 rounded-xl bg-[#10B981] hover:bg-[#059669] text-white text-xs font-bold transition-all shadow-md active:scale-95 text-center"
                    >
                      <MessageCircle className="w-3.5 h-3.5 mr-1.5 shrink-0" />
                      <span>Solicitar mi Código VIP a Bianka</span>
                    </a>
                  </div>
                </div>

                {/* GENERAL ERROR BANNER */}
                {generalError && (
                  <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs font-medium rounded-xl flex items-center">
                    <span className="w-2 h-2 rounded-full bg-red-500 mr-2 shrink-0" />
                    <span>{generalError}</span>
                  </div>
                )}

                {/* FORM FIELDS */}
                <div className="space-y-3.5 sm:space-y-4">
                  {/* Field 1: TU NOMBRE COMPLETO * */}
                  <div>
                    <label className="block text-[11px] sm:text-xs font-bold text-[#334155] uppercase tracking-wider mb-1">
                      TU NOMBRE COMPLETO *
                    </label>
                    <input
                      id="input-user-fullname"
                      type="text"
                      required
                      placeholder="Ej: Claudia Patricia Martínez"
                      value={name}
                      onChange={(e) => {
                        setName(e.target.value);
                        if (generalError) setGeneralError('');
                      }}
                      className="w-full px-3.5 py-2.5 sm:py-3 rounded-xl border border-[#CBD5E1] focus:ring-2 focus:ring-[#0F766E] focus:border-[#0F766E] focus:outline-hidden text-base sm:text-sm text-[#0F172A] bg-white placeholder-[#94A3B8]"
                    />
                  </div>

                  {/* Field 2 & 3: WHATSAPP DE TU PEDIDO * & RANGO DE EDAD */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    <div>
                      <label className="block text-[11px] sm:text-xs font-bold text-[#334155] uppercase tracking-wider mb-1">
                        WHATSAPP DE TU PEDIDO *
                      </label>
                      <input
                        id="input-user-whatsapp-phone"
                        type="tel"
                        required
                        placeholder="Ej: 310 400 7428"
                        value={whatsapp}
                        onChange={(e) => {
                          setWhatsapp(e.target.value);
                          if (generalError) setGeneralError('');
                        }}
                        className="w-full px-3.5 py-2.5 sm:py-3 rounded-xl border border-[#CBD5E1] focus:ring-2 focus:ring-[#0F766E] focus:border-[#0F766E] focus:outline-hidden text-base sm:text-sm text-[#0F172A] bg-white placeholder-[#94A3B8]"
                      />
                      <p className="text-[10px] sm:text-[11px] text-[#64748B] mt-1">
                        Número con el que solicitaste tu Coli Plus
                      </p>
                    </div>

                    <div>
                      <label className="block text-[11px] sm:text-xs font-bold text-[#334155] uppercase tracking-wider mb-1">
                        RANGO DE EDAD
                      </label>
                      <select
                        id="select-user-age-range"
                        value={ageRange}
                        onChange={(e) => setAgeRange(e.target.value)}
                        className="w-full px-3.5 py-2.5 sm:py-3 rounded-xl border border-[#CBD5E1] focus:ring-2 focus:ring-[#0F766E] focus:border-[#0F766E] focus:outline-hidden text-base sm:text-sm text-[#0F172A] bg-white"
                      >
                        {AGE_RANGES.map((r) => (
                          <option key={r} value={r}>
                            {r}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Field 4: TU CORREO ELECTRÓNICO PRINCIPAL * */}
                  <div>
                    <label className="block text-[11px] sm:text-xs font-bold text-[#334155] uppercase tracking-wider mb-1">
                      TU CORREO ELECTRÓNICO PRINCIPAL *
                    </label>
                    <input
                      id="input-user-email-address"
                      type="email"
                      required
                      placeholder="ejemplo@correo.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-3.5 py-2.5 sm:py-3 rounded-xl border border-[#CBD5E1] focus:ring-2 focus:ring-[#0F766E] focus:border-[#0F766E] focus:outline-hidden text-base sm:text-sm text-[#0F172A] bg-white placeholder-[#94A3B8]"
                    />

                    {/* Email Explanation Callout Box */}
                    <div className="mt-2 p-3 rounded-xl bg-[#F0F9FF] border border-[#BAE6FD] text-[#0369A1] text-xs">
                      <div className="flex items-center space-x-1.5 font-bold text-[#0284C7] mb-0.5">
                        <Info className="w-3.5 h-3.5 text-[#0284C7] shrink-0" />
                        <span>¿Por qué te solicitamos tu correo?</span>
                      </div>
                      <p className="text-[10px] sm:text-[11px] leading-relaxed text-[#075985]">
                        Al finalizar tus 30 días, Bianka generará tu <strong className="font-semibold text-[#0369A1]">"Bitácora de Bienestar ColiFem 30D"</strong> con el balance de tu constancia, hábitos y pautas de continuidad.
                      </p>
                    </div>
                  </div>

                  {/* Field 5: CÓDIGO DE ACTIVACIÓN ÚNICO (6 DÍGITOS NUMÉRICOS) * */}
                  <div className="pt-1">
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="block text-[11px] sm:text-xs font-bold text-[#334155] uppercase tracking-wider">
                        CÓDIGO DE ACTIVACIÓN ÚNICO (6 DÍGITOS) *
                      </label>
                      <span className={`text-xs font-mono font-bold ${accessCode.length === 6 ? 'text-[#0F766E]' : 'text-[#64748B]'}`}>
                        {accessCode.length}/6
                      </span>
                    </div>

                    {/* Interactive 6-Digit PIN input */}
                    <SixDigitInput
                      value={accessCode}
                      onChange={(val) => {
                        setAccessCode(val);
                        if (codeError) setCodeError('');
                      }}
                      error={codeError}
                      onEnterPress={handleValidateStep1}
                    />

                    {/* Footnote under code input */}
                    <div className="mt-2 flex flex-col sm:flex-row sm:items-center sm:justify-between text-[11px] text-[#64748B] gap-1">
                      <div className="flex items-center text-[#64748B]">
                        <Lock className="w-3 h-3 mr-1 text-[#94A3B8] shrink-0" />
                        <span>Asignado por ColShopi a cada compradora.</span>
                      </div>
                      <a
                        href={whatsappCodeUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#0F766E] hover:underline font-bold inline-flex items-center self-start sm:self-auto"
                      >
                        <span>Pedir mi código por WhatsApp</span>
                        <ArrowRight className="w-3 h-3 ml-1" />
                      </a>
                    </div>
                  </div>
                </div>

                {/* PRIMARY CTA BUTTON */}
                <div className="pt-2">
                  <button
                    id="btn-validate-vip-code"
                    type="button"
                    onClick={handleValidateStep1}
                    disabled={isValidatingCode}
                    className="w-full py-3.5 px-6 rounded-2xl bg-[#0F766E] hover:bg-[#115E59] active:bg-[#134E4A] disabled:opacity-60 text-white font-bold text-sm sm:text-base flex items-center justify-center space-x-2 transition-all shadow-md hover:shadow-lg transform active:scale-98 cursor-pointer disabled:cursor-not-allowed"
                  >
                    {isValidatingCode ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin mr-2" />
                        <span>Verificando Código en ColShopi...</span>
                      </>
                    ) : (
                      <>
                        <span>Validar Código VIP & Iniciar Diagnóstico</span>
                        <ArrowRight className="w-4 h-4 ml-1" />
                      </>
                    )}
                  </button>
                </div>
              </motion.div>
            )}

            {/* ================= STEP 2: MOTIVO DE ATENCIÓN DIGESTIVA ================= */}
            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-5"
              >
                <div>
                  <div className="inline-flex items-center space-x-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#ECFDF5] text-[#047857] mb-2">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#10B981]" />
                    <span>Código Verificado Exitosamente</span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-bold text-[#0F172A] font-display">
                    ¿Cuál es tu principal motivo de atención?
                  </h2>
                  <p className="text-xs sm:text-sm text-[#64748B] mt-1">
                    Esto calibrará los consejos de bienestar diarios de Bianka y el horario óptimo de tu dosis de Coli Plus.
                  </p>
                </div>

                <div className="space-y-3">
                  {DIGESTIVE_ANGLES.map((item) => {
                    const isSelected = digestiveAngle === item.angle;
                    return (
                      <div
                        key={item.angle}
                        onClick={() => setDigestiveAngle(item.angle)}
                        className={`p-4 rounded-2xl border-2 cursor-pointer transition-all flex items-start space-x-3.5 ${
                          isSelected
                            ? 'border-[#0F766E] bg-[#F0FDF4] shadow-xs'
                            : 'border-[#E2E8F0] hover:border-[#CBD5E1] bg-white'
                        }`}
                      >
                        <span className="text-2xl p-2 rounded-xl bg-white shadow-xs border border-[#E2E8F0]">
                          {item.icon}
                        </span>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <h4 className="text-sm font-bold text-[#0F172A]">{item.title}</h4>
                            {isSelected && <CheckCircle2 className="w-5 h-5 text-[#0F766E]" />}
                          </div>
                          <p className="text-xs text-[#64748B] mt-1 leading-relaxed">{item.desc}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="pt-3 flex justify-between items-center">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="inline-flex items-center px-4 py-2.5 rounded-xl border border-[#CBD5E1] text-[#475569] text-xs sm:text-sm font-semibold hover:bg-[#F8FAFC]"
                  >
                    <ArrowLeft className="w-4 h-4 mr-1.5" />
                    Volver
                  </button>
                  <button
                    id="btn-step2-next"
                    type="button"
                    onClick={() => setStep(3)}
                    className="inline-flex items-center px-6 py-3 rounded-xl bg-[#0F766E] hover:bg-[#115E59] text-white font-bold text-xs sm:text-sm transition-all shadow-xs"
                  >
                    <span>Siguiente Paso</span>
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </button>
                </div>
              </motion.div>
            )}

            {/* ================= STEP 3: SÍNTOMAS Y HÁBITOS ================= */}
            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-5"
              >
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-[#0F172A] font-display">
                    Selecciona los síntomas que experimentas
                  </h2>
                  <p className="text-xs sm:text-sm text-[#64748B] mt-1">
                    Marca todo lo que hayas sentido recientemente para medir tu curva de alivio y evolución digestiva con Coli Plus.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {COMMON_SYMPTOMS.map((sym) => {
                    const active = selectedSymptoms.includes(sym);
                    return (
                      <button
                        key={sym}
                        type="button"
                        onClick={() => toggleSymptom(sym)}
                        className={`p-3 text-left rounded-xl border text-xs font-semibold transition-all flex items-center justify-between ${
                          active
                            ? 'bg-[#0F766E] text-white border-[#0F766E] shadow-xs'
                            : 'bg-[#F8FAFC] text-[#334155] border-[#E2E8F0] hover:bg-[#F1F5F9]'
                        }`}
                      >
                        <span>{sym}</span>
                        {active && <CheckCircle2 className="w-4 h-4 shrink-0 ml-2" />}
                      </button>
                    );
                  })}
                </div>

                <div className="pt-3 flex justify-between items-center">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="inline-flex items-center px-4 py-2.5 rounded-xl border border-[#CBD5E1] text-[#475569] text-xs sm:text-sm font-semibold hover:bg-[#F8FAFC]"
                  >
                    <ArrowLeft className="w-4 h-4 mr-1.5" />
                    Volver
                  </button>
                  <button
                    id="btn-step3-next"
                    type="button"
                    onClick={() => setStep(4)}
                    className="inline-flex items-center px-6 py-3 rounded-xl bg-[#0F766E] hover:bg-[#115E59] text-white font-bold text-xs sm:text-sm transition-all shadow-xs"
                  >
                    <span>Ver Resumen</span>
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </button>
                </div>
              </motion.div>
            )}

            {/* ================= STEP 4: ACTIVACIÓN Y CONFIRMACIÓN ================= */}
            {step === 4 && (
              <motion.div
                key="step4"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-5"
              >
                <div className="text-center">
                  <div className="mx-auto w-14 h-14 rounded-2xl bg-[#ECFDF5] flex items-center justify-center text-[#10B981] mb-2 border border-[#A7F3D0]">
                    <Sparkles className="w-7 h-7" />
                  </div>
                  <h2 className="text-xl sm:text-2xl font-bold text-[#0F172A] font-display">
                    ¡Tu Protocolo Está Listo!
                  </h2>
                  <p className="text-xs sm:text-sm text-[#64748B] mt-1">
                    Bianka ha calibrado tu plan de 30 días en 4 fases progresivas.
                  </p>
                </div>

                {/* Summary Card */}
                <div className="bg-[#FAF6F0] p-4 rounded-2xl border border-[#E2E8F0] space-y-2 text-xs">
                  <div className="flex justify-between py-1 border-b border-[#E2E8F0]">
                    <span className="text-[#64748B]">Compradora Registrada:</span>
                    <strong className="text-[#0F172A]">{name}</strong>
                  </div>
                  <div className="flex justify-between py-1 border-b border-[#E2E8F0]">
                    <span className="text-[#64748B]">WhatsApp:</span>
                    <strong className="text-[#0F172A]">{whatsapp}</strong>
                  </div>
                  <div className="flex justify-between py-1 border-b border-[#E2E8F0]">
                    <span className="text-[#64748B]">Enfoque Digestivo:</span>
                    <strong className="text-[#0F766E]">{digestiveAngle}</strong>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-[#64748B]">Código VIP Validado:</span>
                    <strong className="font-mono text-[#0F766E]">{accessCode}</strong>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-[#ECFDF5] border border-[#A7F3D0] flex items-start space-x-3">
                  <BiankaAvatar size={42} className="shrink-0 mt-0.5" />
                  <p className="text-xs text-[#065F46] leading-relaxed">
                    <strong>Mensaje de Bianka:</strong> «Cada día a las 7:00 AM desbloquearemos tu audio-guía matutina, tus tareas del día y tu registro de bienestar. ¡Vamos juntas por tu bienestar digestivo!»
                  </p>
                </div>

                <div className="pt-3 flex justify-between items-center">
                  <button
                    type="button"
                    onClick={() => setStep(3)}
                    className="inline-flex items-center px-4 py-2.5 rounded-xl border border-[#CBD5E1] text-[#475569] text-xs sm:text-sm font-semibold hover:bg-[#F8FAFC]"
                  >
                    <ArrowLeft className="w-4 h-4 mr-1.5" />
                    Volver
                  </button>
                  <button
                    id="btn-finish-onboarding"
                    type="button"
                    disabled={isGenerating}
                    onClick={handleFinish}
                    className="inline-flex items-center px-6 py-3 rounded-xl bg-linear-to-r from-[#0F766E] to-[#10B981] text-white font-bold text-xs sm:text-sm transition-all shadow-md hover:opacity-95"
                  >
                    {isGenerating ? (
                      <>
                        <Activity className="w-4 h-4 mr-2 animate-spin" />
                        <span>Activando Tu Protocolo...</span>
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-4 h-4 mr-2" />
                        <span>Acceder al Programa de 30 Días</span>
                      </>
                    )}
                  </button>
                </div>
              </motion.div>
            )}

          </AnimatePresence>
        </div>

        {/* CARD FOOTER - Exactly like Portada TY */}
        <div className="bg-[#FAF6F0] px-5 py-3.5 border-t border-[#E2E8F0] text-center space-y-1">
          <p className="text-[11px] text-[#64748B] flex items-center justify-center flex-wrap gap-1 font-medium">
            <Lock className="w-3 h-3 text-[#0F766E] inline" />
            <span>Comunidad Exclusiva ColShopi Tienda By Leps Digital</span>
            <span>•</span>
            <span>Garantía & Registro INVIMA NSA-0012423-2022</span>
          </p>

          {onOpenAdmin && (
            <div>
              <button
                type="button"
                onClick={onOpenAdmin}
                className="text-[10px] text-[#94A3B8] hover:text-[#0F766E] transition-colors underline"
              >
                Acceso Administrativo ColShopi (contacto@colshopi.com)
              </button>
            </div>
          )}
        </div>

      </div>

    </div>
  );
};
