# Step 4 of 5: Understanding `app/layout.tsx`

> **Reading Order**: **[Step 3: `globals.css`](file:///Users/rythmjagga/Downloads/rythmvideozip/docs/03_globals_css.md)** ➔ Step 4 ➔ **[Step 5: `page.tsx`](file:///Users/rythmjagga/Downloads/rythmvideozip/docs/05_page_tsx.md)**

> **Analogy**: Imagine a picture frame. The layout (`layout.tsx`) is the **outer physical frame** that surrounds every page. It provides the root `<html>` and `<body>` tags and loads your global CSS stylesheet.

---

## 💡 Fundamental Concepts to Know First

### 1. What is Next.js Root Layout?
In Next.js, `layout.tsx` is the mandatory master wrapper. Whichever page the user visits is passed into `{children}` inside `layout.tsx`.

### 2. What is Metadata?
Metadata is hidden page information (like website title and description) read by search engines (Google) and social media platforms.

### 3. What is `suppressHydrationWarning`?
**Hydration** is when React turns server-rendered HTML into interactive JavaScript on your computer. If a browser extension (like a dark mode extension) injects an extra class into `<body>`, React notices a mismatch. Adding `suppressHydrationWarning` tells React: *"Don't throw a warning if an extension added an extra class to body."*

---

## 🔍 Line-by-Line Breakdown

```tsx
1: import './globals.css';
2: import type { Metadata } from 'next';
```
- Imports the global CSS styles (Step 3) and TypeScript metadata types.

---

```tsx
4: export const metadata: Metadata = {
5:   title: 'Frame Scroll Animation',
6:   description: 'Full screen frame-by-frame scroll canvas animation',
7: };
```
- Sets the browser tab title to `"Frame Scroll Animation"`.

---

```tsx
9: export default function RootLayout({
10:   children,
11: }: {
12:   children: React.ReactNode;
13: }) {
14:   return (
15:     <html lang="en" suppressHydrationWarning>
16:       <body suppressHydrationWarning>{children}</body>
17:     </html>
18:   );
19: }
```
- **`children`**: Represents whichever page is currently rendering (i.e., `page.tsx`).
- **`<body>{children}</body>`**: Embeds `page.tsx` directly inside the HTML body tag!

---

## ⏭️ Next Step
Now proceed to the final core engine in **[Step 5: `05_page_tsx.md`](file:///Users/rythmjagga/Downloads/rythmvideozip/docs/05_page_tsx.md)**!
