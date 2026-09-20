// Celebratory sound synthesizer using Web Audio API
// High compatibility across mobile Safari, Chrome Android, and desktop browsers
export function playCelebrationChime() {
  try {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContextClass) return;

    const ctx = new AudioContextClass();
    if (ctx.state === 'suspended') {
      ctx.resume().catch(() => {});
    }

    // Gentle, bright ascending major pentatonic arpeggio (C5 -> E5 -> G5 -> C6)
    const notes = [523.25, 659.25, 783.99, 1046.5];
    const startTime = ctx.currentTime;

    notes.forEach((freq, index) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, startTime + index * 0.09);

      // Smooth attack and soft exponential release
      gain.gain.setValueAtTime(0.001, startTime + index * 0.09);
      gain.gain.exponentialRampToValueAtTime(0.18, startTime + index * 0.09 + 0.03);
      gain.gain.exponentialRampToValueAtTime(0.0001, startTime + index * 0.09 + 0.55);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(startTime + index * 0.09);
      osc.stop(startTime + index * 0.09 + 0.6);
    });
  } catch (e) {
    // Graceful fallback if Web Audio is blocked or unsupported
    console.debug('Audio chime skipped:', e);
  }
}
