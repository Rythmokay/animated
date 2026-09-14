# Step 3 of 5: Understanding `app/globals.css`

> **Reading Order**: **[Step 2: `next.config.js`](file:///Users/rythmjagga/Downloads/rythmvideozip/docs/02_next_config.md)** ➔ Step 3 ➔ **[Step 4: `layout.tsx`](file:///Users/rythmjagga/Downloads/rythmvideozip/docs/04_layout_tsx.md)**

> **Analogy**: If HTML is the wooden frame of a house, CSS is the **interior decoration, lighting, and layout spacing**. `globals.css` removes unwanted browser margins, enables smooth vertical scrolling, and styles custom scrollbars.

---

## 💡 Fundamental Concepts to Know First

### 1. The CSS Box Model (`box-sizing: border-box`)
By default in HTML, adding padding to a 100px element makes it 120px wide!
Setting `box-sizing: border-box` forces padding to stay inside the 100px boundary so elements never accidentally overflow or break screen layouts.

### 2. Viewport Height (`vh`) & Viewport Width (`vw`)
- `100vw` = 100% of the screen width.
- `100vh` = 100% of the screen height.
- `500vh` = 5 times the screen height (providing generous vertical scroll room for our 240 frame sequence).

### 3. What is `overflow-y` and `!important`?
- `overflow-y: auto`: Enables vertical scrolling when content extends past the bottom of the screen.
- `!important`: Overrides any external styles or browser extensions trying to disable scrolling.

---

## 🔍 Rule-by-Rule Breakdown

### Rule 1: Reset All Margins & Padding

```css
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
```
- Removes default white borders and margins added by web browsers.

---

### Rule 2: Root `<html>` & `<body>` Scroll Setup

```css
html {
  width: 100%;
  min-height: 100%;
  background-color: #050505;
  color: #ffffff;
  overflow-x: hidden;
  overflow-y: auto !important;
}

body {
  width: 100%;
  min-height: 500vh !important;
  background-color: #050505;
  color: #ffffff;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  overflow-x: hidden !important;
  overflow-y: auto !important;
}
```
- `min-height: 500vh !important`: Expands the document body height so the user can scroll down through all 240 frame images.
- `overflow-x: hidden`: Stops annoying horizontal side-shaking.
- `overflow-y: auto !important`: Enforces vertical scrolling capability.

---

### Rule 3: Sleek Custom Scrollbar

```css
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-thumb {
  background: #333333;
  border-radius: 4px;
}
```
- Replaces bulky default browser scrollbars with a subtle dark rounded bar.

---

## ⏭️ Next Step
Now proceed to **[Step 4: `04_layout_tsx.md`](file:///Users/rythmjagga/Downloads/rythmvideozip/docs/04_layout_tsx.md)** to see the master HTML page wrapper!
