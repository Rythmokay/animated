# Step 5 of 5: Understanding `app/page.tsx`

> **Reading Order**: **[Step 4: `layout.tsx`](file:///Users/rythmjagga/Downloads/rythmvideozip/docs/04_layout_tsx.md)** ➔ Step 5 (Final Step)

> **Analogy**: Imagine a physical **flipbook** with 240 drawn pages. As you turn the pages quickly with your thumb, the drawing animates into a smooth moving picture. `app/page.tsx` turns your browser into a high-speed digital flipbook where your **scroll wheel acts as your thumb**, flipping through 240 image frames rendered onto an HTML5 Canvas.

---

## 💡 Fundamental Concepts to Know First

### 1. What is an HTML5 `<canvas>`?
An HTML5 Canvas is an empty high-speed pixel grid. Instead of loading slow static image tags (`<img />`), JavaScript paints image frames onto the canvas 60 times per second using `ctx.drawImage()`.

### 2. Client Components (`'use client'`)
Browsers handle user interactions like scrolling, canvas drawing, and window resizing. Adding `'use client'` at line 1 tells Next.js to run this code inside the user's browser.

### 3. React `useState` vs `useRef`
- **`useState`**: Used for data that updates the UI when changed (e.g. updating the "Loading assets 50%" counter text).
- **`useRef`**: Used for fast-changing values (60 times per second, like scroll position or canvas reference) **without causing slow React re-renders**.

### 4. Linear Interpolation (Lerp)
If scrolling fast jumps instantly from frame 10 to frame 50, the animation stutters. **Lerping** smoothly bridges the distance step-by-step:
`currentFrame += (targetFrame - currentFrame) * 0.35`
This creates silky-smooth cinematic motion.

### 5. `requestAnimationFrame` (rAF)
Synchronizes canvas redrawing with your monitor's exact refresh rate (e.g. 60Hz or 120Hz) for stutter-free performance.

### 6. Object-Cover Math
Calculates image scaling so the frame always covers 100% of the screen width and height regardless of whether the user is on a phone or ultrawide monitor.

---

## 🔍 Section-by-Section Code Breakdown

### Section 1: Preloading All 240 Frames

```tsx
5: const TOTAL_FRAMES = 240;
6: const getFramePath = (index: number) => {
7:   const frameNum = String(index + 1).padStart(3, '0');
8:   return `/frames/frame_${frameNum}.jpg`;
9: };
```
- Maps frame index `0` ➔ `/frames/frame_001.jpg` up to index `239` ➔ `/frames/frame_240.jpg`.

```tsx
24: useEffect(() => {
28:   for (let i = 0; i < TOTAL_FRAMES; i++) {
29:     const img = new Image();
30:     img.src = getFramePath(i);
31:     img.onload = () => setLoadedCount(c => c + 1);
...
```
- Downloads all 240 images into browser memory immediately so scrolling is instant and fast.

---

### Section 2: Drawing Frames with DPR & Object-Cover

```tsx
61: const drawFrame = (frameIndex: number) => {
...
87:   const dpr = window.devicePixelRatio || 1;
88:   const displayWidth = window.innerWidth;
89:   const displayHeight = window.innerHeight;
```
- **DPR (Device Pixel Ratio)**: Multiplies resolution on Retina high-DPI displays so the picture is razor-sharp.

```tsx
111:   if (canvasAspect > imgAspect) {
112:     drawWidth = canvasWidth;
113:     drawHeight = canvasWidth / imgAspect;
...
```
- Calculates centered `object-cover` scaling so images fill the screen without stretching or distortion.

---

### Section 3: Scroll Position Calculation

```tsx
129: const handleScroll = () => {
130:   const scrollTop = window.scrollY || document.documentElement.scrollTop;
131:   const docHeight = document.documentElement.scrollHeight;
132:   const maxScroll = docHeight - window.innerHeight;
135:   const scrollFraction = Math.min(1, Math.max(0, scrollTop / maxScroll));
136:   targetFrameRef.current = scrollFraction * (TOTAL_FRAMES - 1);
137: };
```
- **Scroll Math**: Converts scroll pixel position into a fraction from `0.0` (top) to `1.0` (bottom) and multiplies by `239` to get the target frame number!

---

### Section 4: The 60FPS Lerp Render Loop

```tsx
160: const animate = () => {
161:   const target = targetFrameRef.current;
162:   const current = currentFrameRef.current;
163:   const diff = target - current;
165:   currentFrameRef.current += diff * 0.35;
177:   if (frameToDraw !== lastDrawnFrame) {
178:     drawFrame(frameToDraw);
179:   }
183:   requestRef.current = requestAnimationFrame(animate);
184: };
```
- Smoothly advances `currentFrameRef` toward `targetFrameRef` and draws the frame onto the canvas on every screen refresh.

---

### Section 5: Full Screen Fixed Canvas Markup

```tsx
197: return (
198:   <main style={{ minHeight: '600vh', height: '600vh', position: 'relative', width: '100%' }}>
199:     <canvas
200:       ref={canvasRef}
201:       style={{
202:         position: 'fixed',
203:         top: 0,
204:         left: 0,
205:         width: '100vw',
206:         height: '100vh',
207:         objectFit: 'cover',
208:         pointerEvents: 'none',
209:         zIndex: 1,
210:       }}
211:     />
```
- `<main style={{ minHeight: '600vh' }}>`: Gives the page 600% height of scroll space.
- `<canvas style={{ position: 'fixed', width: '100vw', height: '100vh' }}>`: Locks the canvas full screen while you scroll.

---

## 🎯 Congratulations!
You have completed all 5 steps of the documentation suite!
- **[Return to Step 1: `package.json`](file:///Users/rythmjagga/Downloads/rythmvideozip/docs/01_package_json.md)**
- **[Return to Documentation Index](file:///Users/rythmjagga/Downloads/rythmvideozip/docs/README.md)**
