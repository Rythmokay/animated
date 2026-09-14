# Step 5 of 5: Understanding `app/page.tsx`, Opening Quote Screen & Active-Scroll Audio

> **Reading Order**: **[Step 4: `layout.tsx`](file:///Users/rythmjagga/Downloads/rythmvideozip/docs/04_layout_tsx.md)** ➔ Step 5 (Final Step)

> **Analogy**: Imagine a **physical hand-cranked music box**. The music plays **ONLY while your hand is actively turning the crank**. The moment you stop turning the crank, the music stops instantly. `app/page.tsx` works the exact same way—audio plays **only while your fingers are actively scrolling**, and pauses immediately when scrolling stops!

---

## 💡 Fundamental Concepts to Know First

### 1. Active-Scroll Audio Gating
- **Playing on Scroll**: Listening to the `scroll` event. As long as scroll events are actively firing, `audio.play()` is triggered.
- **Scroll Stop Timeout (120ms)**: If no new scroll event is received within 120 milliseconds (meaning the user stopped scrolling), `audio.pause()` is immediately called!
- **Zero Idle Audio**: When standing still on the page, the site is 100% quiet.

### 2. Opening Quote Overlay (White Background & Black Font)
- **Background**: `#ffffff` (Pure White).
- **Text Color**: `#000000` (Deep Black).
- **Quote**:
  > *“Do not judge me by my successes, judge me by how many times I fell down and got back up again.”*  
  > — Nelson Mandela

---

## 🔍 Code Section Breakdown

### Section 1: Active Scroll Detection & Audio Timeout

```typescript
useEffect(() => {
  const handleScroll = () => {
    if (!showQuote && !isMuted && audioRef.current) {
      // 1. Play audio while active scrolling is happening
      if (audioRef.current.paused) {
        audioRef.current.play().catch(() => {});
      }

      // 2. Reset scroll-stop timer
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }

      // 3. Pause audio immediately if scrolling stops for 120ms
      scrollTimeoutRef.current = setTimeout(() => {
        if (audioRef.current && !audioRef.current.paused) {
          audioRef.current.pause();
        }
      }, 120);
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
}, [showQuote, isMuted]);
```
- **`scrollTimeoutRef`**: Ensures audio is strictly tied to active scrolling motion.

---

## 🎯 Congratulations!
You have completed the full documentation suite!
- **[Return to Step 1: `package.json`](file:///Users/rythmjagga/Downloads/rythmvideozip/docs/01_package_json.md)**
- **[Return to Documentation Index](file:///Users/rythmjagga/Downloads/rythmvideozip/docs/README.md)**
