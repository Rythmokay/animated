# Step 5 of 5: Understanding `app/page.tsx` & Crystal-Clear Sound Presets

> **Reading Order**: **[Step 4: `layout.tsx`](file:///Users/rythmjagga/Downloads/rythmvideozip/docs/04_layout_tsx.md)** ➔ Step 5 (Final Step)

> **Analogy**: Imagine a physical **vintage film projector or Apple Watch digital crown**. As you turn the wheel with your thumb, the drawing animates on screen, accompanied by pure, studio-quality micro-tone click sound effects. `app/page.tsx` turns your browser into a high-speed digital flipbook where your **scroll wheel acts as your thumb**, flipping through 240 image frames rendered onto an HTML5 Canvas while playing crystal-clear sound presets!

---

## 💡 Fundamental Concepts to Know First

### 1. What is an HTML5 `<canvas>`?
An HTML5 Canvas is an empty high-speed pixel grid. Instead of loading slow static image tags (`<img />`), JavaScript paints image frames onto the canvas 60 times per second using `ctx.drawImage()`.

### 2. Pure Oscillator Tone Synthesis (Zero Static Noise)
Instead of using noisy static sound buffers (which can sound harsh or crackly on headphones), our Web Audio engine uses **pure sine and triangle wave oscillators**.
- **Sine Wave (`sine`)**: Silky-smooth, crystal-clear tone with zero noise or distortion.
- **Pitch Sweep Envelope**: Frequency drops rapidly (e.g. from 700Hz to 160Hz in 7 milliseconds), producing a satisfying tactile micro-pop sound similar to Apple Watch digital crown feedback.

### 3. Audio Presets Available in UI
- **🎧 Haptic Click**: Pure sine pitch sweep (Apple Watch Digital Crown feel).
- **🪵 Wood Pop**: Warm triangle wave pitch sweep (camera shutter / mechanical woodblock feel).
- **✨ Soft Tick**: High-frequency whisper-quiet tap.
- **🔇 Mute**: Silences all scroll sound effects.

---

## 🔍 Code Section Breakdown

### Section 1: Pure Oscillator Sound Engine Class

```typescript
class ASMRSoundEngine {
  private ctx: AudioContext | null = null;
  public mode: SoundMode = 'haptic';

  playTick(velocity = 1) {
    if (this.mode === 'muted') return;
    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    if (this.mode === 'haptic') {
      osc.type = 'sine'; // Pure smooth tone
      osc.frequency.setValueAtTime(700, t);
      osc.frequency.exponentialRampToValueAtTime(160, t + 0.007);
      gain.gain.setValueAtTime(0.02, t);
      gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.007);
    }
    osc.start(t);
    osc.stop(t + 0.008);
  }
}
```
- **`playTick(velocity)`**: Plays a crystal-clear, non-distorted micro-tick whenever the scroll position advances to a new frame.

---

### Section 2: UI Preset Selector Menu

```tsx
<div style={{ position: 'fixed', top: '24px', right: '24px' }}>
  <button onClick={() => changeSoundMode('haptic')}>🎧 Haptic</button>
  <button onClick={() => changeSoundMode('wood')}>🪵 Wood Pop</button>
  <button onClick={() => changeSoundMode('tick')}>✨ Soft Tick</button>
  <button onClick={() => changeSoundMode('muted')}>🔇 Mute</button>
</div>
```
- A glassmorphism preset control bar positioned in the top-right corner letting users switch between sound profiles instantly.

---

## 🎯 Summary Checklist
- Uses pure sine/triangle wave Web Audio synthesis.
- Zero static noise or speaker distortion.
- Provides 3 crystal-clear sound presets + Mute option.
