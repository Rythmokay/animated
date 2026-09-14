# Beginners Guide to `app/page.tsx`

> **Analogy**: Imagine a physical **flipbook** with 240 drawn pages. As you turn the pages quickly with your thumb, the drawing animates into a smooth moving picture. `app/page.tsx` turns your web browser into a high-speed digital flipbook where your **mouse scroll wheel acts as your thumb**, flipping through 240 frame images drawn on a high-speed HTML5 Canvas.

---

## 💡 Fundamental Concepts to Know First

### 1. What is an HTML5 `<canvas>`?
An HTML5 Canvas is an empty digital grid of pixels (like an artist's blank canvas). Instead of displaying static image tags (`<img src="..." />`), JavaScript uses 2D drawing instructions (`ctx.drawImage`) to paint pictures onto the canvas thousands of times per second.

### 2. Client Components vs Server Components (`'use client'`)
Next.js runs code on the server by default. But features that interact with browser events (like scrolling, window resizing, mouse movement, canvas drawing) require browser APIs (`window`, `document`, `requestAnimationFrame`). Adding `'use client'` at line 1 tells Next.js: *"Run this interactive component in the browser!"*

### 3. What is React State (`useState`) vs Refs (`useRef`)?
- **`useState`**: Used when you want React to re-render the screen when data changes (e.g. updating the "Loading assets 50%" text).
- **`useRef`**: Used for storing values that change 60 times per second (like current scroll position or canvas element) **without** causing slow React re-renders.

### 4. What is Linear Interpolation (Lerp)?
If you jump instantly from frame 10 to frame 50 when scrolling fast, the animation looks jerky. **Lerping** smoothly slides `currentFrame` towards `targetFrame` step-by-step:
`currentFrame += (targetFrame - currentFrame) * 0.35`
This creates a silky-smooth, cinematic motion blur feel.

### 5. What is `requestAnimationFrame` (rAF)?
`requestAnimationFrame` is a browser tool that synchronizes your animation drawing loop with your monitor's refresh rate (e.g. 60Hz or 120Hz), ensuring smooth, tear-free animation without wasting battery or CPU when the tab is hidden.

### 6. What is Object-Cover Scaling?
`object-fit: cover` calculates scale so that the image always fills 100% of the screen width and height regardless of whether the user is on a wide desktop screen or a tall phone screen, centering the picture cleanly without stretching or distortion.

---

## 🔍 Detailed Code Section-by-Section

### Section 1: Setup & Preloading Frames

```tsx
1: 'use client';
2: import { useEffect, useRef, useState } from 'react';
3: const TOTAL_FRAMES = 240;
```
- **Line 1**: Declares this file as a interactive Client Component.
- **Line 5**: Sets `TOTAL_FRAMES = 240`, matching our 240 image files (`frame_001.jpg` to `frame_240.jpg`).

```tsx
7: const getFramePath = (index: number) => {
8:   const frameNum = String(index + 1).padStart(3, '0');
9:   return `/frames/frame_${frameNum}.jpg`;
10: };
```
- Converts a number like `0` into `/frames/frame_001.jpg`, `9` into `/frames/frame_010.jpg`, `239` into `/frames/frame_240.jpg`.

---

### Section 2: Component State & Preloader

```tsx
13: const canvasRef = useRef<HTMLCanvasElement | null>(null);
14: const imagesRef = useRef<HTMLImageElement[]>([]);
15: const [loadedCount, setLoadedCount] = useState(0);
16: const [isLoaded, setIsLoaded] = useState(false);
```
- `canvasRef`: Points directly to the `<canvas>` HTML element on screen.
- `imagesRef`: Holds the array of 240 preloaded `HTMLImageElement` objects in memory.
- `loadedCount` & `isLoaded`: Tracks how many images have finished downloading to display the subtle loading progress pill.

```tsx
24: useEffect(() => {
25:   let isMounted = true;
26:   const images: HTMLImageElement[] = [];
27:   let loadedCounter = 0;
28:   for (let i = 0; i < TOTAL_FRAMES; i++) {
29:     const img = new Image();
30:     img.src = getFramePath(i);
...
```
- Preloads all 240 image files into browser RAM in the background so scrolling is instantaneous without waiting for network downloads.

---

### Section 3: Canvas Drawing Engine (`drawFrame`)

```tsx
61: const drawFrame = (frameIndex: number) => {
62:   const canvas = canvasRef.current;
63:   if (!canvas) return;
64:   const ctx = canvas.getContext('2d');
```
- Gets the 2D drawing context (`ctx`) from the canvas.

```tsx
87:   const dpr = window.devicePixelRatio || 1;
88:   const displayWidth = window.innerWidth;
89:   const displayHeight = window.innerHeight;
```
- **DPR (Device Pixel Ratio)**: Handles crisp high-density Retina screens (like Apple Retina displays) by multiplying canvas resolution by the screen's pixel ratio so images look razor-sharp.

```tsx
111:   if (canvasAspect > imgAspect) {
112:     drawWidth = canvasWidth;
113:     drawHeight = canvasWidth / imgAspect;
...
```
- Calculates the math for `object-cover` so the picture fills every pixel of the screen without letterboxing or squishing.

---

### Section 4: Scroll Event Tracking

```tsx
128: useEffect(() => {
129:   const handleScroll = () => {
130:     const scrollTop = window.scrollY || document.documentElement.scrollTop || document.body.scrollTop || 0;
131:     const docHeight = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight);
132:     const winHeight = window.innerHeight;
133:     const maxScroll = docHeight - winHeight;
134:     if (maxScroll <= 0) return;
135:     const scrollFraction = Math.min(1, Math.max(0, scrollTop / maxScroll));
136:     targetFrameRef.current = scrollFraction * (TOTAL_FRAMES - 1);
137:   };
```
- **Scroll Math**:
  1. `scrollTop`: How far down the user has scrolled in pixels.
  2. `maxScroll`: Total scrollable distance on the page.
  3. `scrollFraction`: A number between `0.0` (top of page) and `1.0` (bottom of page).
  4. `targetFrameRef.current`: Multiplies `scrollFraction * 239` to determine which frame should be showing.

---

### Section 5: The Lerp Render Loop

```tsx
157: useEffect(() => {
160:   const animate = () => {
161:     const target = targetFrameRef.current;
162:     const current = currentFrameRef.current;
163:     const diff = target - current;
164:     if (Math.abs(diff) > 0.001) {
165:       currentFrameRef.current += diff * 0.35;
166:     } else {
167:       currentFrameRef.current = target;
168:     }
...
183:     requestRef.current = requestAnimationFrame(animate);
184:   };
```
- Runs continuously on every screen refresh frame. Smoothly interpolates `currentFrameRef` towards `targetFrameRef` and draws the frame onto the canvas.

---

### Section 6: Full Screen Canvas Markup

```tsx
196: return (
197:   <main style={{ minHeight: '600vh', height: '600vh', position: 'relative', width: '100%', background: '#050505' }}>
198:     <canvas
199:       ref={canvasRef}
200:       style={{
201:         position: 'fixed',
202:         top: 0,
203:         left: 0,
204:         width: '100vw',
205:         height: '100vh',
206:         display: 'block',
207:         objectFit: 'cover',
208:         pointerEvents: 'none',
209:         zIndex: 1,
210:       }}
211:     />
```
- `<main style={{ minHeight: '600vh' }}>`: Gives the page 600% viewport height of scroll space so the user can scroll smoothly across 240 frames.
- `<canvas style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh' }}>`: Pins the canvas to the screen so it stays locked full screen while the user scrolls.

---

## 🎯 Summary Checklist
- Uses `useRef` for high-frequency 60FPS animation state.
- Preloads 240 images into memory.
- Uses `object-cover` math to fill any screen seamlessly.
- Uses `requestAnimationFrame` + Lerp for fluid frame transitions on scroll.
