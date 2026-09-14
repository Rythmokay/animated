# Beginners Guide to `app/globals.css`

> **Analogy**: If HTML is the wooden frame of a house, CSS is the paint, lighting, and interior design. `globals.css` contains global styling rules that apply to the entire website, removing unwanted default margins, configuring full-screen scroll behavior, and styling scrollbars.

---

## 💡 Fundamental Concepts to Know First

### 1. What is CSS (Cascading Style Sheets)?
CSS tells the browser how HTML elements should look: their colors, sizes, positions, scrolling rules, and spacing.

### 2. The CSS Box Model (`box-sizing: border-box`)
By default in HTML, if you give an element a width of 100px and add 10px of padding, the browser makes it 120px wide!
Setting `* { box-sizing: border-box; }` forces padding and borders to be included **inside** the 100px width so elements never accidentally overflow or break your layout.

### 3. What is Viewport Height (`vh`) and Viewport Width (`vw`)?
- `100vw` = 100% of the screen width.
- `100vh` = 100% of the screen height.
- `600vh` = 6 times the height of the screen (providing deep scroll room for our 240 frames).

### 4. What is `overflow-y` & `!important`?
- `overflow-y`: Controls what happens when content is taller than the screen. `overflow-y: auto` allows the user to scroll vertically.
- `!important`: A CSS rule that overrides any other CSS style, ensuring extension scripts or default browser styles cannot lock scrolling.

---

## 🔍 Detailed Rule-by-Rule Breakdown

### Rule 1: Universal CSS Reset

```css
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
```
- `*`: Matches **every** HTML element on the page.
- `margin: 0; padding: 0;`: Removes default browser white gaps and spacing around edges.

---

### Rule 2: Root `<html>` Styling

```css
html {
  width: 100%;
  min-height: 100%;
  background-color: #050505;
  color: #ffffff;
  overflow-x: hidden;
  overflow-y: auto !important;
}
```
- `background-color: #050505;`: Sets a dark aesthetic background color.
- `overflow-x: hidden;`: Prevents horizontal side-scrolling or accidental sideways shaking.
- `overflow-y: auto !important;`: Guarantees vertical scrolling is enabled.

---

### Rule 3: Document `<body>` Styling

```css
body {
  width: 100%;
  min-height: 500vh !important;
  background-color: #050505;
  color: #ffffff;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
  overflow-x: hidden !important;
  overflow-y: auto !important;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
```
- `min-height: 500vh !important;`: Ensures the document body is at least 5 times the height of the screen so the user has ample room to scroll through all 240 frames.
- `-webkit-font-smoothing: antialiased;`: Renders text crisp and clean on Mac and modern displays.

---

### Rule 4: Scroll Lock Protection

```css
body.antigravity-scroll-lock,
body[class*="scroll-lock"] {
  overflow-y: auto !important;
  height: auto !important;
}
```
- If a browser extension or tool injects a class like `scroll-lock` onto the body, this rule overrides it so scrolling remains active.

---

### Rule 5: Custom Sleek Scrollbar

```css
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: #050505;
}

::-webkit-scrollbar-thumb {
  background: #333333;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: #555555;
}
```
- Replaces ugly default browser scrollbars with a subtle dark grey scrollbar track and rounded thumb.

---

## 🎯 Summary Checklist
- Resets margins & paddings across all elements.
- Forces vertical scrolling capability with `overflow-y: auto !important`.
- Ensures body height allows `500vh`+ scroll depth.
- Customizes scrollbar aesthetics.
