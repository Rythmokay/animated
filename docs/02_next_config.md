# Step 2 of 5: Understanding `next.config.js`

> **Reading Order**: **[Step 1: `package.json`](file:///Users/rythmjagga/Downloads/rythmvideozip/docs/01_package_json.md)** ➔ Step 2 ➔ **[Step 3: `globals.css`](file:///Users/rythmjagga/Downloads/rythmvideozip/docs/03_globals_css.md)**

> **Analogy**: If Next.js is an engine, `next.config.js` is the **dashboard control panel**. Here you tune compiler switches and runtime behavior.

---

## 💡 Fundamental Concepts to Know First

### 1. Node.js Configuration Format
Next.js runs inside Node.js. Node uses standard JavaScript configuration files (`.js`) to set engine options before compiling the website.

### 2. CommonJS Modules (`module.exports`)
Node.js uses `module.exports = ...` to share configuration objects with Next.js.

---

## 🔍 Line-by-Line Breakdown

```javascript
1: /** @type {import('next').NextConfig} */
2: const nextConfig = {
3:   reactStrictMode: false,
4: };
5: 
6: module.exports = nextConfig;
```

- **Line 1 (`/** @type ... */`)**: Gives code editors intelligent auto-complete hints for Next.js settings.
- **Lines 2-4 (`reactStrictMode: false`)**: Disables React strict double-mount during development to keep canvas animation rendering smooth during hot-reloads.
- **Line 6 (`module.exports = nextConfig`)**: Exports the settings object for Next.js to read on startup.

---

## ⏭️ Next Step
Now proceed to **[Step 3: `03_globals_css.md`](file:///Users/rythmjagga/Downloads/rythmvideozip/docs/03_globals_css.md)** to learn how global styling and scrolling are controlled!
