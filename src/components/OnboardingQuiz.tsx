import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShieldCheck, CheckCircle2, ArrowRight, ArrowLeft, Sparkles, Activity, HeartHandshake } from 'lucide-react';
import { DigestiveAngle, UserProfile } from '../types';
import { isValidVIPCode } from '../data/vipCodes';

interface OnboardingQuizProps {
  onComplete: (profile: UserProfile) => void;
}

const AGE_RANGES = ['18-24', '25-34', '35-44', '45-54', '55+'];

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
  'Cansancio y pesadez tras almorzar',
  'Dolor o espasmo sordo en el costado del colon'
];

export const OnboardingQuiz: React.FC<OnboardingQuizProps> = ({ onComplete }) => {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);

  // Form State
  const [name, setName] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [email, setEmail] = useState('');
  const [ageRange, setAgeRange] = useState('25-34');
  const [accessCode, setAccessCode] = useState('');
  const [digestiveAngle, setDigestiveAngle] = useState<DigestiveAngle>('Hinchazón Abdominal y Gases');
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([
    'Vientre inflamado al final de la tarde',
    'Gases retenidos que causan pinchazos o cólicos'
  ]);
  const [codeError, setCodeError] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const toggleSymptom = (symptom: string) => {
    if (selectedSymptoms.includes(symptom)) {
      setSelectedSymptoms(selectedSymptoms.filter(s => s !== symptom));
    } else {
      setSelectedSymptoms([...selectedSymptoms, symptom]);
    }
  };

  const handleVerifyCode = () => {
    const cleaned = accessCode.trim().toUpperCase();
    if (!cleaned) {
      setCodeError('Por favor introduce tu código de acceso VIP.');
      return;
    }
    if (!isValidVIPCode(cleaned)) {
      setCodeError('Código no reconocido. Ingresa los 6 dígitos de tu empaque de Coli Plus o usa el código de cortesía COLI30 o 518472.');
      return;
    }
    setCodeError('');
    setStep(3);
  };

  const handleFinish = async () => {
    setIsGenerating(true);

    const generatedId = `VIP-${Math.floor(1000 + Math.random() * 9000)}`;
    const newProfile: UserProfile = {
      id: generatedId,
      name: name.trim() || 'Clienta ColShopi',
      whatsapp: whatsapp.trim() || '+57 300 000 0000',
      email: email.trim() || 'cliente@colshopi.com',
      ageRange,
      accessCode: accessCode.toUpperCase() || 'COLI30',
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
      console.warn('Backend sync fallback, saving locally:', e);
    }

    setTimeout(() => {
      setIsGenerating(false);
      onComplete(newProfile);
    }, 1600);
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center p-4 sm:p-6">
      <div className="w-full max-w-2xl bg-white rounded-3xl shadow-xl border border-[#E2E8F0] overflow-hidden">
        
        {/* Top Progress Bar */}
        <div className="bg-[#FAF6F0] p-6 border-b border-[#E2E8F0]">
          <div className="flex items-center justify-between text-xs font-semibold text-[#64748B] mb-2">
            <span>PASO {step} DE 4</span>
            <span className="text-[#0F766E]">
              {step === 1 ? 'Datos de Bienvenida' : step === 2 ? 'Validación de Frasco Coli Plus' : step === 3 ? 'Prioridad Digestiva' : 'Síntomas & Personalización'}
            </span>
          </div>
          <div className="w-full bg-[#E2E8F0] h-2 rounded-full overflow-hidden">
            <div
              className="bg-linear-to-r from-[#0F766E] to-[#10B981] h-full transition-all duration-500"
              style={{ width: `${(step / 4) * 100}%` }}
            />
          </div>
        </div>

        {/* Form Body */}
        <div className="p-6 sm:p-8">
          <AnimatePresence mode="wait">
            
            {/* STEP 1 */}
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div>
                  <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#ECFDF5] text-[#047857] border border-[#A7F3D0] mb-2.5">
                    <HeartHandshake className="w-3.5 h-3.5 text-[#10B981]" />
                    <span>Obsequio Exclusivo ColShopi Tienda By Leps Digital</span>
                  </div>
                  <h2 className="text-2xl font-bold text-[#0F172A] font-display">
                    ¡Bienvenida a ColiFem 30D!
                  </h2>
                  <p className="text-sm text-[#64748B] mt-1 leading-relaxed">
                    Personalicemos tu experiencia con Bianka (Guía de Bienestar & Hábitos Saludables) para acompañar tu toma del suplemento <span className="font-semibold text-[#0F766E]">Coli Plus</span>.
                  </p>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-[#334155] uppercase tracking-wider mb-1.5">
                      Nombre Completo *
                    </label>
                    <input
                      id="input-user-name"
                      type="text"
                      required
                      placeholder="Ej. Carolina Montoya"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-[#CBD5E1] focus:ring-2 focus:ring-[#0F766E] focus:outline-hidden text-sm bg-[#F8FAFC]"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-[#334155] uppercase tracking-wider mb-1.5">
                        WhatsApp (Colombia) *
                      </label>
                      <input
                        id="input-user-whatsapp"
                        type="tel"
                        required
                        placeholder="+57 312 456 7890"
                        value={whatsapp}
                        onChange={(e) => setWhatsapp(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-[#CBD5E1] focus:ring-2 focus:ring-[#0F766E] focus:outline-hidden text-sm bg-[#F8FAFC]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#334155] uppercase tracking-wider mb-1.5">
                        Correo Electrónico *
                      </label>
                      <input
                        id="input-user-email"
                        type="email"
                        required
                        placeholder="tu@correo.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-[#CBD5E1] focus:ring-2 focus:ring-[#0F766E] focus:outline-hidden text-sm bg-[#F8FAFC]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#334155] uppercase tracking-wider mb-1.5">
                      Rango de Edad
                    </label>
                    <div className="grid grid-cols-5 gap-2">
                      {AGE_RANGES.map((r) => (
                        <button
                          key={r}
                          type="button"
                          onClick={() => setAgeRange(r)}
                          className={`py-2 text-xs font-semibold rounded-xl border transition-all ${
                            ageRange === r
                              ? 'bg-[#0F766E] text-white border-[#0F766E]'
                              : 'bg-[#F8FAFC] text-[#475569] border-[#E2E8F0] hover:bg-[#F1F5F9]'
                          }`}
                        >
                          {r}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-4 flex justify-end">
                  <button
                    id="btn-step1-next"
                    disabled={!name.trim() || !whatsapp.trim()}
                    onClick={() => setStep(2)}
                    className="inline-flex items-center px-6 py-3 rounded-xl bg-[#0F766E] text-white font-semibold text-sm hover:bg-[#115E59] disabled:opacity-50 transition-all shadow-xs"
                  >
                    <span>Siguiente Paso</span>
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </button>
                </div>
              </motion.div>
            )}

            {/* STEP 2 */}
            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#D1FAE5] text-[#065F46] mb-2">
                    <ShieldCheck className="w-3.5 h-3.5 mr-1 text-[#059669]" />
                    Acceso Exclusivo Clientas Coli Plus
                  </span>
                  <h2 className="text-2xl font-bold text-[#0F172A] font-display">
                    Código de Validación de tu Frasco
                  </h2>
                  <p className="text-sm text-[#64748B] mt-1">
                    Ingresa el código VIP de 6 dígitos que acompaña tu frasco de Coli Plus (o tu remisión de compra de ColShopi).
                  </p>
                </div>

                <div className="bg-[#FAF6F0] p-4 rounded-2xl border border-[#E2E8F0] text-xs text-[#475569] space-y-2">
                  <p className="font-semibold text-[#0F172A]">Códigos de Acceso Rápido y Prueba:</p>
                  <p>
                    Si adquiriste tu frasco recientemente o estás evaluando la PWA, puedes tocar uno de estos códigos verificados:
                  </p>
                  <div className="flex flex-wrap gap-2 pt-1">
                    <button
                      type="button"
                      onClick={() => { setAccessCode('518472'); setCodeError(''); }}
                      className="px-2.5 py-1.5 bg-white border border-[#CBD5E1] rounded-lg font-mono font-bold text-[#0F766E] hover:bg-[#ECFDF5]"
                    >
                      518472 (Código Frasco VIP)
                    </button>
                    <button
                      type="button"
                      onClick={() => { setAccessCode('COLI30'); setCodeError(''); }}
                      className="px-2.5 py-1.5 bg-white border border-[#CBD5E1] rounded-lg font-mono font-bold text-[#047857] hover:bg-[#ECFDF5]"
                    >
                      COLI30 (Demo 30D)
                    </button>
                    <button
                      type="button"
                      onClick={() => { setAccessCode('VIP777'); setCodeError(''); }}
                      className="px-2.5 py-1.5 bg-white border border-[#CBD5E1] rounded-lg font-mono font-bold text-[#D97706] hover:bg-[#FFFBEB]"
                    >
                      VIP777 (VIP Especial)
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#334155] uppercase tracking-wider mb-1.5">
                    Código de Activación VIP
                  </label>
                  <input
                    id="input-access-code"
                    type="text"
                    maxLength={10}
                    placeholder="Ej. 518472 o COLI30"
                    value={accessCode}
                    onChange={(e) => { setAccessCode(e.target.value); setCodeError(''); }}
                    className="w-full px-4 py-3 rounded-xl border border-[#CBD5E1] focus:ring-2 focus:ring-[#0F766E] text-base font-mono uppercase tracking-widest bg-[#F8FAFC]"
                  />
                  {codeError && <p className="text-xs text-red-600 mt-1.5 font-medium">{codeError}</p>}
                </div>

                <div className="pt-4 flex justify-between">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="inline-flex items-center px-4 py-2.5 rounded-xl border border-[#CBD5E1] text-[#475569] text-sm font-semibold hover:bg-[#F8FAFC]"
                  >
                    <ArrowLeft className="w-4 h-4 mr-1.5" />
                    Volver
                  </button>
                  <button
                    id="btn-step2-verify"
                    onClick={handleVerifyCode}
                    className="inline-flex items-center px-6 py-3 rounded-xl bg-[#0F766E] text-white font-semibold text-sm hover:bg-[#115E59] transition-all shadow-xs"
                  >
                    <span>Validar Código</span>
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </button>
                </div>
              </motion.div>
            )}

            {/* STEP 3 */}
            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div>
                  <h2 className="text-2xl font-bold text-[#0F172A] font-display">
                    ¿Cuál es tu principal motivo de atención?
                  </h2>
                  <p className="text-sm text-[#64748B] mt-1">
                    Esto calibrará los consejos de bienestar diarios de Bianka y el horario óptimo de tu dosis de Coli Plus.
                  </p>
                </div>

                <div className="grid grid-cols-1 gap-3">
                  {DIGESTIVE_ANGLES.map((item) => {
                    const isSelected = digestiveAngle === item.angle;
                    return (
                      <div
                        key={item.angle}
                        onClick={() => setDigestiveAngle(item.angle)}
                        className={`p-4 rounded-2xl border-2 cursor-pointer transition-all flex items-start space-x-3.5 ${
                          isSelected
                            ? 'border-[#0F766E] bg-[#F0FDF4]'
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

                <div className="pt-4 flex justify-between">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="inline-flex items-center px-4 py-2.5 rounded-xl border border-[#CBD5E1] text-[#475569] text-sm font-semibold hover:bg-[#F8FAFC]"
                  >
                    <ArrowLeft className="w-4 h-4 mr-1.5" />
                    Volver
                  </button>
                  <button
                    id="btn-step3-next"
                    onClick={() => setStep(4)}
                    className="inline-flex items-center px-6 py-3 rounded-xl bg-[#0F766E] text-white font-semibold text-sm hover:bg-[#115E59] transition-all shadow-xs"
                  >
                    <span>Continuar</span>
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </button>
                </div>
              </motion.div>
            )}

            {/* STEP 4 */}
            {step === 4 && (
              <motion.div
                key="step4"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div>
                  <h2 className="text-2xl font-bold text-[#0F172A] font-display">
                    Selecciona los síntomas que experimentas
                  </h2>
                  <p className="text-sm text-[#64748B] mt-1">
                    Marca todo lo que hayas sentido recientemente para medir tu curva de alivio y evolución digestiva.
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

                <div className="p-4 rounded-2xl bg-[#ECFDF5] border border-[#A7F3D0] flex items-center space-x-3">
                  <Sparkles className="w-6 h-6 text-[#0F766E] shrink-0" />
                  <p className="text-xs text-[#065F46] font-medium leading-relaxed">
                    Al finalizar, activaremos tu guía de 30 días en 4 fases con Bianka y tu registro diario de hidratación y bienestar.
                  </p>
                </div>

                <div className="pt-4 flex justify-between">
                  <button
                    type="button"
                    onClick={() => setStep(3)}
                    className="inline-flex items-center px-4 py-2.5 rounded-xl border border-[#CBD5E1] text-[#475569] text-sm font-semibold hover:bg-[#F8FAFC]"
                  >
                    <ArrowLeft className="w-4 h-4 mr-1.5" />
                    Volver
                  </button>
                  <button
                    id="btn-finish-onboarding"
                    disabled={isGenerating}
                    onClick={handleFinish}
                    className="inline-flex items-center px-7 py-3 rounded-xl bg-linear-to-r from-[#0F766E] to-[#10B981] text-white font-bold text-sm hover:opacity-95 transition-all shadow-md"
                  >
                    {isGenerating ? (
                      <>
                        <Activity className="w-4 h-4 mr-2 animate-spin" />
                        <span>Construyendo Tu Guía...</span>
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-4 h-4 mr-2" />
                        <span>Comenzar Mi Transformación</span>
                      </>
                    )}
                  </button>
                </div>
              </motion.div>
            )}

          </AnimatePresence>
        </div>

      </div>
    </div>
  );
};
