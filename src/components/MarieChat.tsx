import React, { useState, useRef, useEffect } from 'react';
import { Send, Volume2, Square, Sparkles, MessageCircle, Bot, User, RefreshCw } from 'lucide-react';
import { UserProfile } from '../types';
import { marieVoice } from '../utils/speechHelper';

interface MarieChatProps {
  user: UserProfile;
  onOpenStore: () => void;
}

interface ChatMessage {
  id: string;
  sender: 'marie' | 'user';
  text: string;
  time: string;
}

const QUICK_QUESTIONS = [
  '¿A qué hora exacta debo tomar ColiPlus?',
  'Tengo muchos gases y cólicos hoy, ¿qué me recomiendas?',
  '¿Puedo mezclar ColiPlus con leche vegetal o avena?',
  '¿Qué alimentos debo evitar en esta fase?',
  '¿Cómo interpreto mi tipo en la Escala de Bristol?'
];

export const MarieChat: React.FC<MarieChatProps> = ({ user, onOpenStore }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'm-welcome',
      sender: 'marie',
      text: `¡Hola ${user.name.split(' ')[0]}! Soy Marié, tu mentora y especialista en salud del colon. Estoy aquí para resolver cualquier duda sobre tus tomas de ColiPlus, qué comer ante una crisis de distensión o cómo optimizar tu digestión. ¿En qué te puedo ayudar hoy?`,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);

  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [playingAudioId, setPlayingAudioId] = useState<string | null>(null);
  const chatBottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const handleSendMessage = async (textToSend?: string) => {
    const query = textToSend || input;
    if (!query.trim() || loading) return;

    const userMsg: ChatMessage = {
      id: `u-${Date.now()}`,
      sender: 'user',
      text: query.trim(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    if (!textToSend) setInput('');
    setLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: query.trim(),
          userProfile: user,
          conversationHistory: messages.slice(-4)
        })
      });

      const data = await res.json();
      const botMsg: ChatMessage = {
        id: `m-${Date.now()}`,
        sender: 'marie',
        text: data.reply || 'Recuerda que tomar tu dosis de ColiPlus con 250ml de agua y respirar profundamente antes de comer relaja tu nervio vago.',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, botMsg]);
    } catch (e) {
      const fallbackMsg: ChatMessage = {
        id: `m-${Date.now()}`,
        sender: 'marie',
        text: 'Disculpa, hubo una pequeña intermitencia. Recuerda que ante gases y distensión, una infusión tibia de manzanilla con anís y tu dosis nocturna de ColiPlus son la mejor combinación.',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, fallbackMsg]);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleVoice = (msg: ChatMessage) => {
    if (playingAudioId === msg.id) {
      marieVoice.stop();
      setPlayingAudioId(null);
    } else {
      setPlayingAudioId(msg.id);
      marieVoice.speak(
        msg.text,
        () => setPlayingAudioId(msg.id),
        () => setPlayingAudioId(null),
        () => setPlayingAudioId(null)
      );
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      
      {/* Mentor Header Card */}
      <div className="bg-white rounded-3xl p-6 border border-[#E2E8F0] shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <div className="w-14 h-14 rounded-2xl bg-linear-to-br from-[#0F766E] to-[#10B981] flex items-center justify-center text-white text-2xl shadow-sm border border-[#D1FAE5]">
              👩‍⚕️
            </div>
            <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-[#10B981] border-2 border-white" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h2 className="text-xl font-bold text-[#0F172A] font-display">
                Marié • Nutricionista Especialista
              </h2>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#ECFDF5] text-[#065F46] border border-[#A7F3D0]">
                En Línea
              </span>
            </div>
            <p className="text-xs text-[#64748B] mt-0.5">
              Protocolo ColiPlus 30D • Eje Intestino-Cerebro y Microbiota
            </p>
          </div>
        </div>

        <button
          onClick={onOpenStore}
          className="px-4 py-2 rounded-xl bg-[#FAF6F0] hover:bg-[#F5EFE6] border border-[#E2E8F0] text-xs font-bold text-[#92400E] transition-colors"
        >
          Pedir Frascos Adicionales →
        </button>
      </div>

      {/* Chat Messages Container */}
      <div className="bg-white rounded-3xl border border-[#E2E8F0] shadow-sm overflow-hidden flex flex-col h-[520px]">
        
        {/* Messages List */}
        <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-4 bg-[#FAF6F0]/40">
          {messages.map((msg) => {
            const isMarie = msg.sender === 'marie';
            const isPlayingThis = playingAudioId === msg.id;

            return (
              <div
                key={msg.id}
                className={`flex items-start space-x-2.5 ${isMarie ? 'justify-start' : 'justify-end'}`}
              >
                {isMarie && (
                  <div className="w-8 h-8 rounded-xl bg-[#0F766E] text-white flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                    M
                  </div>
                )}

                <div
                  className={`max-w-[85%] sm:max-w-[75%] rounded-2xl p-4 text-xs leading-relaxed space-y-2 ${
                    isMarie
                      ? 'bg-white border border-[#E2E8F0] text-[#1E293B] shadow-xs'
                      : 'bg-[#0F766E] text-white shadow-xs'
                  }`}
                >
                  <p className="whitespace-pre-line">{msg.text}</p>
                  
                  <div className={`flex items-center justify-between pt-1 border-t text-[10px] ${isMarie ? 'border-[#F1F5F9] text-[#94A3B8]' : 'border-emerald-700/50 text-[#D1FAE5]'}`}>
                    <span>{msg.time}</span>
                    
                    {isMarie && (
                      <button
                        onClick={() => handleToggleVoice(msg)}
                        className={`flex items-center space-x-1 px-2 py-0.5 rounded-md font-bold transition-all ${
                          isPlayingThis
                            ? 'bg-[#DC2626] text-white'
                            : 'bg-[#F1F5F9] hover:bg-[#E2E8F0] text-[#0F766E]'
                        }`}
                      >
                        {isPlayingThis ? (
                          <>
                            <Square className="w-3 h-3" />
                            <span>Detener</span>
                          </>
                        ) : (
                          <>
                            <Volume2 className="w-3 h-3" />
                            <span>Escuchar</span>
                          </>
                        )}
                      </button>
                    )}
                  </div>
                </div>

                {!isMarie && (
                  <div className="w-8 h-8 rounded-xl bg-[#334155] text-white flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                    {user.name.slice(0, 1).toUpperCase()}
                  </div>
                )}
              </div>
            );
          })}

          {loading && (
            <div className="flex items-center space-x-2 text-xs text-[#64748B] p-2">
              <div className="w-2 h-2 rounded-full bg-[#0F766E] animate-bounce" />
              <div className="w-2 h-2 rounded-full bg-[#0F766E] animate-bounce delay-100" />
              <div className="w-2 h-2 rounded-full bg-[#0F766E] animate-bounce delay-200" />
              <span className="text-[11px] font-medium ml-1">Marié está redactando tu respuesta...</span>
            </div>
          )}

          <div ref={chatBottomRef} />
        </div>

        {/* Quick FAQ Suggestion Pills */}
        <div className="px-4 py-2 bg-white border-t border-[#F1F5F9] overflow-x-auto flex items-center space-x-2">
          <span className="text-[10px] font-bold uppercase text-[#94A3B8] shrink-0">Preguntas rápidas:</span>
          {QUICK_QUESTIONS.map((q, idx) => (
            <button
              key={idx}
              disabled={loading}
              onClick={() => handleSendMessage(q)}
              className="px-2.5 py-1 bg-[#FAF6F0] hover:bg-[#F1F5F9] border border-[#E2E8F0] rounded-lg text-[11px] text-[#475569] whitespace-nowrap transition-colors"
            >
              {q}
            </button>
          ))}
        </div>

        {/* Chat Input Bar */}
        <div className="p-3 sm:p-4 bg-white border-t border-[#E2E8F0]">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex items-center space-x-2"
          >
            <input
              type="text"
              disabled={loading}
              placeholder="Escribe tu consulta a Marié sobre tu digestión o ColiPlus..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 px-4 py-2.5 rounded-xl border border-[#CBD5E1] bg-[#F8FAFC] text-xs focus:ring-2 focus:ring-[#0F766E] focus:outline-hidden"
            />
            <button
              id="btn-send-chat-message"
              type="submit"
              disabled={!input.trim() || loading}
              className="px-4 py-2.5 rounded-xl bg-[#0F766E] text-white font-bold text-xs hover:bg-[#115E59] disabled:opacity-50 transition-colors flex items-center shadow-xs"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>

      </div>

    </div>
  );
};
