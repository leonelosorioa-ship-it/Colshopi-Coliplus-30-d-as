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
  RotateCcw,
  CheckCircle2
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
import { AdminPanel } from './components/AdminPanel';
import { pwaManager } from './utils/pwaManager';

const LOCAL_STORAGE_KEY = 'coliplus_profile_30d_v1';

// Default prefilled demo profile for fast trial or instant preview
const DEMO_PROFILE: UserProfile = {
  id: 'VIP-7821',
  name: 'Carolina Montoya',
  whatsapp: '+57 312 456 7890',
  email: 'carolina.montoya@ejemplo.com',
  ageRange: '25-34',
  accessCode: 'COLI30',
  digestiveAngle: 'Inflamación constante y gases',
  symptoms: [
    'Vientre inflamado al final de la tarde',
    'Gases retenidos que causan pinchazos o cólicos',
    'Sensación de evacuación incompleta'
  ],
  currentDay: 14,
  completedDays: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
  checkIns: {
    1: { date: '2026-03-01', tookSupplement: true, waterLiters: 1.5, antiInflammatoryMeal: true, bloatingScore: 5, energyScore: 2, digestionType: 'pesada', bristolType: 2 },
    3: { date: '2026-03-03', tookSupplement: true, waterLiters: 2.0, antiInflammatoryMeal: true, bloatingScore: 4, energyScore: 3, digestionType: 'regular', bristolType: 3 },
    7: { date: '2026-03-07', tookSupplement: true, waterLiters: 2.2, antiInflammatoryMeal: true, bloatingScore: 3, energyScore: 3, digestionType: 'liviana', bristolType: 3 },
    10: { date: '2026-03-10', tookSupplement: true, waterLiters: 2.5, antiInflammatoryMeal: true, bloatingScore: 2, energyScore: 4, digestionType: 'liviana', bristolType: 4 },
    14: { date: '2026-03-14', tookSupplement: true, waterLiters: 2.3, antiInflammatoryMeal: true, bloatingScore: 2, energyScore: 5, digestionType: 'liviana', bristolType: 4 }
  },
  hasPush: true,
  createdAt: '2026-03-01T10:00:00.000Z',
  lastActive: new Date().toISOString()
};

export default function App() {
  const [user, setUser] = useState<UserProfile | null>(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return null;
      }
    }
    return null;
  });

  const [activeTab, setActiveTab] = useState<'calendar' | 'tracker' | 'charts' | 'recipes' | 'chat'>('calendar');
  const [selectedDayPlan, setSelectedDayPlan] = useState<DayPlan | null>(null);
  const [trackerDay, setTrackerDay] = useState<number>(1);
  const [viewRecipeId, setViewRecipeId] = useState<string | null>(null);

  // Modals
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [milestoneModal, setMilestoneModal] = useState<{ isOpen: boolean; day: number }>({
    isOpen: false,
    day: 15
  });

  // Push notifications state
  const [isPushActive, setIsPushActive] = useState(false);
  const [pwaInstallPrompt, setPwaInstallPrompt] = useState<any>(null);

  // PWA & Push initialization
  useEffect(() => {
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

  // Handle Onboarding Completion
  const handleOnboardingComplete = (newProfile: UserProfile) => {
    setUser(newProfile);
    setActiveTab('calendar');
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

  // Install PWA
  const handleInstallPWA = async () => {
    if (pwaInstallPrompt) {
      pwaInstallPrompt.prompt();
      const choice = await pwaInstallPrompt.userChoice;
      if (choice.outcome === 'accepted') {
        setPwaInstallPrompt(null);
      }
    }
  };

  // Handle Day Completion
  const handleCompleteDay = async (dayNumber: number, allTasksDone: boolean) => {
    if (!user) return;

    let updatedCompleted = [...user.completedDays];
    if (allTasksDone) {
      if (!updatedCompleted.includes(dayNumber)) {
        updatedCompleted.push(dayNumber);
      }
    } else {
      updatedCompleted = updatedCompleted.filter(d => d !== dayNumber);
    }

    const nextCurrentDay = Math.min(30, Math.max(user.currentDay, dayNumber + 1));

    const updatedUser: UserProfile = {
      ...user,
      completedDays: updatedCompleted,
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
          completedDays: updatedCompleted
        })
      });
    } catch (e) {
      console.warn('Backend sync fallback');
    }

    // Check for celebration milestone (Day 15 or Day 30)
    if (dayNumber === 15 || dayNumber === 30) {
      setMilestoneModal({
        isOpen: true,
        day: dayNumber
      });
    }
  };

  // Handle Check-in Save
  const handleSaveCheckIn = async (dayNumber: number, record: CheckInRecord) => {
    if (!user) return;

    const updatedCheckIns = {
      ...user.checkIns,
      [dayNumber]: record
    };

    let updatedCompleted = [...user.completedDays];
    if (!updatedCompleted.includes(dayNumber)) {
      updatedCompleted.push(dayNumber);
    }

    const updatedUser: UserProfile = {
      ...user,
      checkIns: updatedCheckIns,
      completedDays: updatedCompleted,
      lastActive: new Date().toISOString()
    };

    setUser(updatedUser);

    try {
      await fetch(`/api/users/${user.id}/progress`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          checkIn: { day: dayNumber, record },
          completedDays: updatedCompleted
        })
      });
    } catch (e) {
      console.warn('Backend check-in sync fallback');
    }
  };

  // Quick Demo account loader
  const handleLoadDemo = () => {
    setUser(DEMO_PROFILE);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(DEMO_PROFILE));
  };

  const handleResetAccount = () => {
    if (window.confirm('¿Deseas reiniciar la aplicación y volver al formulario de registro inicial?')) {
      localStorage.removeItem(LOCAL_STORAGE_KEY);
      setUser(null);
      setActiveTab('calendar');
    }
  };

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
        onOpenAdmin={() => setIsAdminOpen(true)}
        onTogglePush={handleTogglePush}
        isPushActive={isPushActive}
      />

      {/* PWA Install Notification Bar */}
      {pwaInstallPrompt && (
        <div className="bg-linear-to-r from-[#0F766E] to-[#10B981] text-white px-4 py-2.5 text-xs flex items-center justify-between shadow-xs">
          <div className="flex items-center space-x-2">
            <Sparkles className="w-4 h-4 text-[#FDE68A] shrink-0" />
            <span>
              <strong>Instala ColiPlus 30D en tu celular:</strong> accede directo desde tu pantalla de inicio sin depender del navegador.
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
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8">
        {!user ? (
          /* ONBOARDING & VALIDATION FLOW */
          <OnboardingQuiz onComplete={handleOnboardingComplete} />
        ) : (
          /* PROTOCOL APPLICATION INTERFACE */
          <div className="space-y-6">
            
            {/* Top Quick Status Pill */}
            <div className="flex flex-wrap items-center justify-between text-xs text-[#64748B] pb-1">
              <div className="flex items-center space-x-2">
                <span>Hola, <strong>{user.name}</strong></span>
                <span>•</span>
                <span className="font-mono text-[#0F766E] font-bold">{user.id}</span>
                <span>•</span>
                <span className="bg-[#ECFDF5] text-[#065F46] font-semibold px-2 py-0.5 rounded-md">
                  {user.digestiveAngle}
                </span>
              </div>

              <div className="flex items-center space-x-3 mt-2 sm:mt-0">
                <button
                  onClick={handleLoadDemo}
                  className="text-[11px] text-[#0F766E] hover:underline font-semibold"
                >
                  Cargar Perfil Demo (Día 14)
                </button>
                <span>•</span>
                <button
                  onClick={handleResetAccount}
                  className="text-[11px] text-[#94A3B8] hover:text-red-600 font-semibold"
                >
                  Reiniciar
                </button>
              </div>
            </div>

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

      {/* MOBILE BOTTOM NAVIGATION BAR */}
      {user && (
        <div className="md:hidden sticky bottom-0 z-40 bg-white/95 backdrop-blur-md border-t border-[#E2E8F0] px-3 py-2 flex items-center justify-around shadow-lg">
          {[
            { id: 'calendar', label: 'Protocolo', icon: CalendarIcon },
            { id: 'tracker', label: 'Tracker', icon: Activity },
            { id: 'charts', label: 'Métricas', icon: TrendingUp },
            { id: 'recipes', label: 'Recetas', icon: Utensils },
            { id: 'chat', label: 'Marié', icon: MessageCircle }
          ].map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id as any);
                  if (item.id !== 'recipes') setViewRecipeId(null);
                }}
                className={`flex flex-col items-center justify-center p-1 text-[10px] font-bold transition-all ${
                  isActive
                    ? 'text-[#0F766E]'
                    : 'text-[#64748B] hover:text-[#0F172A]'
                }`}
              >
                <Icon className={`w-5 h-5 mb-0.5 ${isActive ? 'text-[#0F766E]' : 'text-[#94A3B8]'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      )}

      {/* FOOTER */}
      <footer className="bg-[#FAF6F0] border-t border-[#E2E8F0] mt-12 py-8 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#64748B]">
          <div className="flex items-center space-x-2">
            <span className="font-bold text-[#0F172A]">ColiPlus 30D</span>
            <span>•</span>
            <span>Fórmula Nutricional para el Colon (450g)</span>
            <span>•</span>
            <span>ColShopi Colombia</span>
          </div>

          <div className="flex items-center space-x-4">
            <button
              onClick={() => setIsAdminOpen(true)}
              className="text-[#94A3B8] hover:text-[#0F766E] transition-colors"
            >
              Consola Admin
            </button>
            <span>•</span>
            <span>Desarrollado para ColShopi por Leps Digital</span>
          </div>
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
        isOpen={milestoneModal.isOpen}
        onClose={() => setMilestoneModal({ isOpen: false, day: 15 })}
        onOpenStore={() => setIsOrderModalOpen(true)}
      />

      {/* 4. Super Administrator Console */}
      <AdminPanel
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
      />

    </div>
  );
}
