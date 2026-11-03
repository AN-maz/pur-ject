const SoundEngine = {
  ctx: null,
  init() {
    if (!this.ctx) {
      this.ctx = new (window.AudioContext || window.webkitAudioContext)();
    }
  },
  playTone(freq, type, duration, gainVal = 0.1) {
    try {
      this.init();
      if (this.ctx.state === 'suspended') this.ctx.resume();
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
      gain.gain.setValueAtTime(gainVal, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + duration);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + duration);
    } catch {
      /* audio unavailable */
    }
  },
  correct() {
    this.playTone(523.25, 'triangle', 0.1, 0.15);
    setTimeout(() => this.playTone(659.25, 'triangle', 0.1, 0.15), 80);
    setTimeout(() => this.playTone(783.99, 'triangle', 0.2, 0.2), 160);
  },
  wrong() {
    this.playTone(200, 'sawtooth', 0.15, 0.2);
    setTimeout(() => this.playTone(150, 'sawtooth', 0.25, 0.25), 100);
  },
  tick() {
    this.playTone(800, 'sine', 0.03, 0.05);
  },
  bombTick() {
    this.playTone(1200, 'square', 0.04, 0.08);
  },
  explode() {
    this.playTone(100, 'sawtooth', 0.5, 0.3);
    setTimeout(() => this.playTone(60, 'square', 0.6, 0.4), 50);
  },
  fanfare() {
    const notes = [523.25, 659.25, 783.99, 1046.5];
    notes.forEach((n, idx) => {
      setTimeout(() => this.playTone(n, 'triangle', 0.25, 0.2), idx * 100);
    });
  },
};

export default SoundEngine;