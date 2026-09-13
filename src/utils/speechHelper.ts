// Speech synthesizer for Bianka's audio coaching
class BiankaVoiceManager {
  private synth: SpeechSynthesis | null = null;
  private isSpeaking = false;
  private currentUtterance: SpeechSynthesisUtterance | null = null;

  constructor() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      this.synth = window.speechSynthesis;
    }
  }

  public speak(text: string, onStart?: () => void, onEnd?: () => void, onError?: () => void) {
    if (!this.synth) {
      console.warn('Speech synthesis not supported in this browser.');
      onError?.();
      return;
    }

    this.stop();

    const utterance = new SpeechSynthesisUtterance(text);
    this.currentUtterance = utterance;
    utterance.lang = 'es-CO'; // Colombian/Latin Spanish
    utterance.rate = 0.95; // Warm, gentle, friendly pacing
    utterance.pitch = 1.05; // Friendly feminine tone

    // Try to pick a natural Spanish female voice if available
    const voices = this.synth.getVoices();
    const spanishFemaleVoice = voices.find(v => 
      v.lang.startsWith('es') && (v.name.toLowerCase().includes('female') || v.name.toLowerCase().includes('sabina') || v.name.toLowerCase().includes('monica') || v.name.toLowerCase().includes('paulina') || v.name.toLowerCase().includes('google'))
    ) || voices.find(v => v.lang.startsWith('es'));

    if (spanishFemaleVoice) {
      utterance.voice = spanishFemaleVoice;
    }

    utterance.onstart = () => {
      this.isSpeaking = true;
      onStart?.();
    };

    utterance.onend = () => {
      this.isSpeaking = false;
      this.currentUtterance = null;
      onEnd?.();
    };

    utterance.onerror = (e) => {
      console.warn('Speech error:', e);
      this.isSpeaking = false;
      this.currentUtterance = null;
      onError?.();
    };

    this.synth.speak(utterance);
  }

  public stop() {
    if (this.synth) {
      this.synth.cancel();
      this.isSpeaking = false;
      this.currentUtterance = null;
    }
  }

  public speaking(): boolean {
    return this.isSpeaking;
  }
}

export const biankaVoice = new BiankaVoiceManager();
export const marieVoice = biankaVoice; // Alias for compatibility

