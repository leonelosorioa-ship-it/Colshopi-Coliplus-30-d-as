import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Calendar as CalendarIcon,
  Activity,
  TrendingUp,
  Utensils,
  MessageCircle,
  Bell,
  Sparkles,
  ShoppingBag,
  ShieldAlert,
  CheckCircle2,
  Download,
  X,
  Award
} from 'lucide-react';
import { UserProfile, DayPlan, CheckInRecord } from './types';
import { COLIPLUS_30_DAYS } from './data/coliplusDaysData';
import { Header } from './components/Header';
import { OnboardingQuiz } from './components/OnboardingQuiz';
import { CalendarView } from './components/CalendarView';
import { DayDetailModal } from './components/DayDetailModal';
import { DailyTracker } from './components/DailyTracker';
import { ExecutiveEnergyChartPanel } from './components/ExecutiveEnergyChartPanel';
import { RecipeBook } from './components/RecipeBook';
import { MarieChat } from './components/MarieChat';
import { OrderModal } from './components/OrderModal';
import { MilestoneModal } from './components/MilestoneModal';
import { DaySuccessModal } from './components/DaySuccessModal';
import { WelcomeAudioBanner } from './components/WelcomeAudioBanner';
import { PWAInstallModal } from './components/PWAInstallModal';
import { pwaManager } from './utils/pwaManager';
import { getDayCompletionTimestamp, getChronologicalStatus } from './utils/chronologicalCycle';

const LOCAL_STORAGE_KEY = 'coliplus_profile_30d_v1';

export default function App() {
  const [user, setUser] = useState<UserProfile | null>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && typeof parsed === 'object' && parsed.id) {
          return {
            ...parsed,
            completedDays: Array.isArray(parsed.completedDays) ? parsed.completedDays : [],
            checkIns: parsed.checkIns && typeof parsed.checkIns === 'object' ? parsed.checkIns : {},
            symptoms: Array.isArray(parsed.symptoms) ? parsed.symptoms : [],
            dayCompletedTimestamps: parsed.dayCompletedTimestamps && typeof parsed.dayCompletedTimestamps === 'object' ? parsed.dayCompletedTimestamps : {},
            currentDay: typeof parsed.currentDay === 'number' && parsed.currentDay >= 1 && parsed.currentDay <= 30 ? parsed.currentDay : 1
          };
        }
      }
    } catch (e) {
      console.warn('Error reading stored user profile:', e);
    }
    return null;
  });

  const [activeTab, setActiveTab] = useState<'calendar' | 'tracker' | 'charts' | 'recipes' | 'chat'>('calendar');
  const [selectedDayPlan, setSelectedDayPlan] = useState<DayPlan | null>(null);
  const [trackerDay, setTrackerDay] = useState<number>(1);
  const [viewRecipeId, setViewRecipeId] = useState<string | null>(null);

  // Modals
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [milestoneModal, setMilestoneModal] = useState<{ isOpen: boolean; day: number }>({
    isOpen: false,
    day: 15
  });
  const [daySuccessModal, setDaySuccessModal] = useState<{
    isOpen: boolean;
    dayNumber: number;
    goalTitle?: string;
    isCheckInOnly?: boolean;
  }>({
    isOpen: false,
    dayNumber: 0,
    goalTitle: '',
    isCheckInOnly: false
  });
  const [celebratedDay, setCelebratedDay] = useState<number | null>(null);

  // Push notifications & PWA modal state
  const [isPushActive, setIsPushActive] = useState(false);
  const [pwaInstallPrompt, setPwaInstallPrompt] = useState<any>(null);
  const [isPWAInstallModalOpen, setIsPWAInstallModalOpen] = useState(false);

  // PWA & Push initialization
  useEffect(() => {
    document.title = 'ColiFem 30D - ColShopi';
    pwaManager.registerServiceWorker();

    const handleBeforeInstall = (e: any) => {
      e.preventDefault();
      setPwaInstallPrompt(e);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstall);

    // Check if push already subscribed
    pwaManager.isSubscribed().then((sub) => {
      if (sub) setIsPushActive(true);
    });

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstall);
    };
  }, []);

  // Sync user state to localStorage
  useEffect(() => {
    if (user) {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(user));
      setTrackerDay(user.currentDay || 1);
    }
  }, [user]);

  const [justCompletedOnboarding, setJustCompletedOnboarding] = useState(false);

  // Handle Onboarding Completion
  const handleOnboardingComplete = (newProfile: UserProfile) => {
    setUser(newProfile);
    setActiveTab('calendar');
    setJustCompletedOnboarding(true);
  };

  // Toggle Push Notifications
  const handleTogglePush = async () => {
    if (isPushActive) {
      const unsubscribed = await pwaManager.unsubscribePush();
      if (unsubscribed) setIsPushActive(false);
    } else {
      const sub = await pwaManager.subscribePush(user?.id || 'GUEST');
      if (sub) {
        setIsPushActive(true);
        if (user) {
          const updated = { ...user, hasPush: true };
          setUser(updated);
        }
      }
    }
  };

  // Install PWA (opens full modal with device instructions & native prompt)
  const handleInstallPWA = () => {
    setIsPWAInstallModalOpen(true);
  };

  // Auto-synchronize completion timestamps for 24h chronological cycle
  useEffect(() => {
    if (user && user.completedDays && user.completedDays.length > 0) {
      let updated = false;
      const newTimestamps = { ...(user.dayCompletedTimestamps || {}) };
      for (const d of user.completedDays) {
        if (!newTimestamps[d]) {
          const stored = localStorage.getItem(`colifem_day_${d}_completed_timestamp`);
          if (stored && parseInt(stored, 10) > 0) {
            newTimestamps[d] = parseInt(stored, 10);
          } else {
            // Initialize with current timestamp so 24h countdown is immediately activated
            const now = Date.now();
            newTimestamps[d] = now;
            try {
              localStorage.setItem(`colifem_day_${d}_completed_timestamp`, now.toString());
            } catch (e) {}
          }
          updated = true;
        }
      }
      if (updated) {
        setUser(prev => prev ? { ...prev, dayCompletedTimestamps: newTimestamps } : null);
      }
    }
  }, [user?.completedDays]);

  // Handle Day Completion
  const handleCompleteDay = async (dayNumber: number, allTasksDone: boolean) => {
    if (!user) return;

    let updatedCompleted = [...user.completedDays];
    let updatedTimestamps = { ...(user.dayCompletedTimestamps || {}) };
    const nowTimestamp = Date.now();

    if (allTasksDone) {
      if (!updatedCompleted.includes(dayNumber)) {
        updatedCompleted.push(dayNumber);
      }
      updatedTimestamps[dayNumber] = nowTimestamp;
      try {
        localStorage.setItem(`colifem_day_${dayNumber}_completed_timestamp`, nowTimestamp.toString());
        localStorage.setItem('colifem_last_completed_timestamp', nowTimestamp.toString());
      } catch (e) {}
    } else {
      updatedCompleted = updatedCompleted.filter(d => d !== dayNumber);
      delete updatedTimestamps[dayNumber];
      try {
        localStorage.removeItem(`colifem_day_${dayNumber}_completed_timestamp`);
      } catch (e) {}
    }

    const nextCurrentDay = Math.min(30, Math.max(...updatedCompleted, 0) + 1);

    const updatedUser: UserProfile = {
      ...user,
      completedDays: updatedCompleted,
      dayCompletedTimestamps: updatedTimestamps,
      currentDay: nextCurrentDay,
      lastActive: new Date().toISOString()
    };

    setUser(updatedUser);

    // Sync to backend
    try {
      await fetch(`/api/users/${user.id}/progress`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          currentDay: nextCurrentDay,
          completedDays: updatedCompleted,
          dayCompletedTimestamps: updatedTimestamps
        })
      });
    } catch (e) {
      console.warn('Backend sync fallback');
    }

    // Check for celebration (Milestones for Days 10, 15, 30; DaySuccessModal for all other days)
    if (allTasksDone) {
      // Automatically return to main protocol section
      setSelectedDayPlan(null);
      setActiveTab('calendar');
      setCelebratedDay(dayNumber);

      if (dayNumber === 10 || dayNumber === 15 || dayNumber === 30) {
        setMilestoneModal({
          isOpen: true,
          day: dayNumber
        });
      } else {
        const plan = COLIPLUS_30_DAYS.find(d => d.day === dayNumber);
        setDaySuccessModal({
          isOpen: true,
          dayNumber: dayNumber,
          goalTitle: plan?.dailyGoal,
          isCheckInOnly: false
        });
      }
    }
  };

  // Handle Check-in Save
  const handleSaveCheckIn = async (dayNumber: number, record: CheckInRecord) => {
    if (!user) return;

    const nowTimestamp = Date.now();
    const updatedRecord: CheckInRecord = {
      ...record,
      registeredAt: nowTimestamp
    };

    const updatedCheckIns = {
      ...user.checkIns,
      [dayNumber]: updatedRecord
    };

    let updatedCompleted = [...user.completedDays];
    if (!updatedCompleted.includes(dayNumber)) {
      updatedCompleted.push(dayNumber);
    }

    const updatedTimestamps = {
      ...(user.dayCompletedTimestamps || {}),
      [dayNumber]: nowTimestamp
    };

    try {
      localStorage.setItem(`colifem_day_${dayNumber}_completed_timestamp`, nowTimestamp.toString());
      localStorage.setItem('colifem_last_completed_timestamp', nowTimestamp.toString());
    } catch (e) {}

    const nextCurrentDay = Math.min(30, Math.max(...updatedCompleted, 0) + 1);

    const updatedUser: UserProfile = {
      ...user,
      checkIns: updatedCheckIns,
      completedDays: updatedCompleted,
      dayCompletedTimestamps: updatedTimestamps,
      currentDay: nextCurrentDay,
      lastActive: new Date().toISOString()
    };

    setUser(updatedUser);

    // Automatically return to main protocol section
    setSelectedDayPlan(null);
    setActiveTab('calendar');
    setCelebratedDay(dayNumber);

    // Trigger celebration modal (Milestone on Day 10, 15, or 30; DaySuccessModal on all other days)
    if (dayNumber === 10 || dayNumber === 15 || dayNumber === 30) {
      setMilestoneModal({
        isOpen: true,
        day: dayNumber
      });
    } else {
      const plan = COLIPLUS_30_DAYS.find(d => d.day === dayNumber);
      setDaySuccessModal({
        isOpen: true,
        dayNumber: dayNumber,
        goalTitle: plan?.dailyGoal,
        isCheckInOnly: true
      });
    }

    try {
      await fetch(`/api/users/${user.id}/progress`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          checkIn: { day: dayNumber, record: updatedRecord },
          completedDays: updatedCompleted,
          dayCompletedTimestamps: updatedTimestamps
        })
      });
    } catch (e) {
      console.warn('Backend check-in sync fallback');
    }
  };

  // Remove reset and demo overwrite to ensure users follow their 30-day program strictly without resetting


  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#1E293B] flex flex-col selection:bg-[#D1FAE5] selection:text-[#0F766E]">
      
      {/* Header */}
      <Header
        user={user}
        activeTab={activeTab}
        onTabChange={(tab) => {
          setActiveTab(tab);
          if (tab !== 'recipes') setViewRecipeId(null);
        }}
        onOpenStore={() => setIsOrderModalOpen(true)}
        onOpenMilestone={() => {
          const cDay = user?.currentDay || 10;
          const target = cDay >= 30 ? 30 : cDay >= 15 ? 15 : 10;
          setMilestoneModal({ isOpen: true, day: target });
        }}
        onTogglePush={handleTogglePush}
        isPushActive={isPushActive}
        canInstallPWA={true}
        onInstallPWA={handleInstallPWA}
      />

      {/* PWA Install Notification Bar */}
      {pwaInstallPrompt && (
        <div className="bg-linear-to-r from-[#0F766E] to-[#10B981] text-white px-4 py-2.5 text-xs flex items-center justify-between shadow-xs">
          <div className="flex items-center space-x-2">
            <Sparkles className="w-4 h-4 text-[#FDE68A] shrink-0" />
            <span>
              <strong>Instala ColiFem 30D en tu celular:</strong> accede directo desde tu pantalla de inicio sin depender del navegador.
            </span>
          </div>
          <button
            onClick={handleInstallPWA}
            className="px-3 py-1 rounded-lg bg-white text-[#0F766E] font-bold text-xs hover:bg-[#F1F5F9] transition-colors whitespace-nowrap ml-4"
          >
            Instalar App 📲
          </button>
        </div>
      )}

      {/* Main View Area */}
      <main className={`flex-1 max-w-7xl w-full mx-auto ${!user ? 'px-2 py-3 sm:px-6 sm:py-6' : 'p-3 sm:p-6 lg:p-8 pb-24 md:pb-8'}`}>
        {!user ? (
          /* ONBOARDING & VALIDATION FLOW - Matching Portada TY Home Screen */
          <OnboardingQuiz
            onComplete={handleOnboardingComplete}
            onInstallPWA={handleInstallPWA}
          />
        ) : (
          /* PROTOCOL APPLICATION INTERFACE */
          <div className="space-y-6">
            
            {/* Top Quick Status Pill */}
            <div className="flex flex-wrap items-center justify-between text-xs text-[#64748B] pb-1 gap-2">
              <div className="flex items-center space-x-2 flex-wrap gap-y-1">
                <span>Hola, <strong>{user.name}</strong></span>
                <span>•</span>
                <span className="font-mono text-[#0F766E] font-bold">{user.id}</span>
                <span>•</span>
                <span className="bg-[#ECFDF5] text-[#065F46] font-semibold px-2 py-0.5 rounded-md">
                  {user.digestiveAngle}
                </span>
              </div>

              <div className="flex items-center space-x-2 sm:space-x-3 flex-wrap gap-y-1">
                <button
                  id="btn-subbar-install-pwa"
                  onClick={handleInstallPWA}
                  className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-lg bg-[#ECFEFF] text-[#0E7490] hover:bg-[#CFFAFE] border border-[#00E5FF]/30 font-bold text-[11px] transition-all cursor-pointer shadow-2xs active:scale-95"
                  title="Descargar la app en tu celular, tablet o computador"
                >
                  <Download className="w-3.5 h-3.5 text-[#0891B2]" />
                  <span>Descargar App</span>
                </button>
              </div>
            </div>

            {/* Top Celebratory Banner when a day was just registered */}
            {celebratedDay && (
              <motion.div
                initial={{ opacity: 0, y: -8, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -8 }}
                className="p-4 rounded-2xl bg-linear-to-r from-[#ECFDF5] via-[#F0FDF4] to-[#FAF6F0] border-2 border-[#10B981] shadow-xs flex items-center justify-between gap-3 text-xs"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-2xl bg-[#10B981] text-white flex items-center justify-center font-bold text-sm shrink-0 shadow-xs">
                    D{celebratedDay}
                  </div>
                  <div>
                    <p className="font-bold text-[#065F46] text-xs sm:text-sm flex items-center gap-1.5">
                      <span>¡Día {celebratedDay} Registrado y Guardado con Éxito!</span>
                      <span>🎉</span>
                    </p>
                    <p className="text-[#334155] text-[11px] sm:text-xs mt-0.5">
                      Tus datos quedaron guardados en tu bitácora de Coli Plus. Tu próximo día se habilitará al cumplirse el ciclo de 24 horas.
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setCelebratedDay(null)}
                  className="p-1.5 rounded-lg text-[#64748B] hover:text-[#0F172A] hover:bg-[#E2E8F0] transition-colors cursor-pointer"
                  title="Cerrar aviso"
                >
                  <X className="w-4 h-4" />
                </button>
              </motion.div>
            )}

            {/* TAB 1: CALENDAR & 30-DAY PROTOCOL */}
            {activeTab === 'calendar' && (
              <CalendarView
                user={user}
                onSelectDay={(dayPlan) => setSelectedDayPlan(dayPlan)}
                onOpenTracker={(dayNum) => {
                  setTrackerDay(dayNum);
                  setActiveTab('tracker');
                }}
                onOpenStore={() => setIsOrderModalOpen(true)}
                onInstallPWA={handleInstallPWA}
              />
            )}

            {/* TAB 2: DAILY TRACKER & BRISTOL SCALE */}
            {activeTab === 'tracker' && (
              <DailyTracker
                user={user}
                selectedDay={trackerDay}
                onSaveCheckIn={handleSaveCheckIn}
                onViewCharts={() => setActiveTab('charts')}
              />
            )}

            {/* TAB 3: CHARTS & CLINICAL PROGRESS */}
            {activeTab === 'charts' && (
              <ExecutiveEnergyChartPanel
                user={user}
                onOpenTracker={(dayNum) => {
                  setTrackerDay(dayNum);
                  setActiveTab('tracker');
                }}
              />
            )}

            {/* TAB 4: ANTI-INFLAMMATORY RECIPE BOOK */}
            {activeTab === 'recipes' && (
              <RecipeBook
                initialRecipeId={viewRecipeId}
                onCloseInitial={() => setViewRecipeId(null)}
              />
            )}

            {/* TAB 5: MARIE CHAT & VOICE ASSISTANT */}
            {activeTab === 'chat' && (
              <MarieChat
                user={user}
                onOpenStore={() => setIsOrderModalOpen(true)}
              />
            )}

          </div>
        )}
      </main>

      {/* MOBILE BOTTOM NAVIGATION BAR - Sleek floating frosted bar */}
      {user && (
        <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-lg border-t border-[#E2E8F0] px-2 py-1.5 flex items-center justify-around shadow-2xl safe-bottom">
          {[
            { id: 'calendar', label: 'Protocolo', icon: CalendarIcon },
            { id: 'tracker', label: 'Mi Día', icon: Activity },
            { id: 'charts', label: 'Métricas', icon: TrendingUp },
            { id: 'recipes', label: 'Recetas', icon: Utensils },
            { id: 'chat', label: 'Bianka', icon: MessageCircle, isLive: true }
          ].map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                id={`btn-mobile-nav-${item.id}`}
                onClick={() => {
                  setActiveTab(item.id as any);
                  if (item.id !== 'recipes') setViewRecipeId(null);
                }}
                className={`relative flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition-all select-none cursor-pointer ${
                  isActive
                    ? 'bg-[#ECFDF5] text-[#0F766E] font-bold shadow-2xs'
                    : 'text-[#64748B] hover:text-[#0F172A]'
                }`}
              >
                <div className="relative">
                  <Icon className={`w-5 h-5 mb-0.5 ${isActive ? 'text-[#0F766E]' : 'text-[#94A3B8]'}`} />
                  {item.isLive && (
                    <span className="absolute -top-0.5 -right-1 flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                    </span>
                  )}
                </div>
                <span className="text-[10px] leading-tight">{item.label}</span>
              </button>
            );
          })}
        </div>
      )}

      {/* FOOTER */}
      <footer className="bg-[#FAF6F0] border-t border-[#E2E8F0] mt-12 py-8 px-4 sm:px-6 mb-16 md:mb-0">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-center gap-2 text-xs text-[#64748B] text-center">
          <span className="font-bold text-[#0F172A]">ColiFem 30D</span>
          <span>•</span>
          <span>Guía de Transformación Digestiva y Cuidado del Colon</span>
          <span>•</span>
          <span>ColShopi Tienda By Leps Digital</span>
        </div>
      </footer>

      {/* MODALS */}
      
      {/* 1. Day Detail Modal */}
      {selectedDayPlan && user && (
        <DayDetailModal
          dayPlan={selectedDayPlan}
          user={user}
          onClose={() => setSelectedDayPlan(null)}
          onCompleteDay={handleCompleteDay}
          onSaveCheckIn={handleSaveCheckIn}
          onOpenMarieChat={() => {
            setSelectedDayPlan(null);
            setActiveTab('chat');
          }}
          onOpenTracker={(dayNum) => {
            setTrackerDay(dayNum);
            setActiveTab('tracker');
          }}
          onOpenRecipe={(recipeId) => {
            setViewRecipeId(recipeId);
            setActiveTab('recipes');
          }}
        />
      )}

      {/* 2. Reorder / Commercial Pack Modal */}
      <OrderModal
        isOpen={isOrderModalOpen}
        user={user}
        onClose={() => setIsOrderModalOpen(false)}
      />

      {/* 3. Milestone & Graduation Celebration Modal */}
      <MilestoneModal
        dayNumber={milestoneModal.day}
        userName={user?.name || 'Compañera'}
        user={user}
        isOpen={milestoneModal.isOpen}
        onClose={() => {
          setMilestoneModal({ isOpen: false, day: 15 });
          setActiveTab('calendar');
        }}
        onOpenStore={() => setIsOrderModalOpen(true)}
      />

      {/* 3.1 Standard Day Registration & Completion Celebration Modal (All 30 Days) */}
      <DaySuccessModal
        isOpen={daySuccessModal.isOpen}
        dayNumber={daySuccessModal.dayNumber}
        userName={user?.name || 'Compañera'}
        user={user}
        goalTitle={daySuccessModal.goalTitle}
        isCheckInOnly={daySuccessModal.isCheckInOnly}
        onCloseAndGoHome={() => {
          setDaySuccessModal({ isOpen: false, dayNumber: 0, goalTitle: '', isCheckInOnly: false });
          setActiveTab('calendar');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onGoToMetrics={() => {
          setDaySuccessModal({ isOpen: false, dayNumber: 0, goalTitle: '', isCheckInOnly: false });
          setActiveTab('charts');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      {/* 4. PWA Direct Installation Modal */}
      <PWAInstallModal
        isOpen={isPWAInstallModalOpen}
        onClose={() => setIsPWAInstallModalOpen(false)}
        deferredPrompt={pwaInstallPrompt}
        onInstallAccepted={() => setPwaInstallPrompt(null)}
      />

      {/* 6. Official Audio & Screen Wake Lock Controller - Activates on open, active or reload */}
      <WelcomeAudioBanner
        userName={user?.name || 'Hermosa'}
        userId={user?.id || 'guest'}
      />

    </div>
  );
}
