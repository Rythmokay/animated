# Step 1 of 5: Understanding `package.json`

> **Reading Order**: Step 1 ➔ **[Step 2: `next.config.js`](file:///Users/rythmjagga/Downloads/rythmvideozip/docs/02_next_config.md)**

> **Analogy**: Think of `package.json` as the **recipe card & ingredients list**. Before building a house or cooking a meal, you look at the ingredients list to see what tools and supplies you need (like Next.js and React) and what commands start the stove (`npm run dev`).

---

## 💡 Fundamental Concepts to Know First

### 1. What is NPM (Node Package Manager)?
NPM is a global software library store. Instead of writing web engines from scratch, developers install pre-made packages (like Next.js and React) using NPM.

### 2. Dependencies vs DevDependencies
- **`dependencies`**: Tools required for the website to run when live on the internet (e.g., `next`, `react`, `react-dom`).
- **`devDependencies`**: Development helper tools used only while writing code on your laptop (e.g., `typescript`).

### 3. Version Numbers (e.g. `^15.1.0`)
- `15`: Major version (big architectural release).
- `1`: Minor version (new capabilities).
- `0`: Patch version (small bug fixes).
- `^`: Allows automatic patch & minor updates.

---

## 🔍 Code Breakdown

```json
{
  "name": "frame-scroll-animation",
  "version": "0.1.0",
  "private": true,
```
- **`name`**: The official name of your project.
- **`private: true`**: Protects your project so it cannot be accidentally published publicly.

---

### Scripts Section

```json
  "scripts": {
    "dev": "next dev --turbo",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  },
```
- **`npm run dev`**: Starts your local website preview at `http://localhost:3000` using Turbopack (a high-speed compiler).
- **`npm run build`**: Builds and optimizes the website for production.
- **`npm run start`**: Runs the production-built site.

---

### Packages List

```json
  "dependencies": {
    "next": "^15.1.0",
    "react": "^19.0.0",
    "react-dom": "^19.0.0"
  }
```
- **`next`**: The Next.js framework powering routing, server rendering, and page compilation.
- **`react` & `react-dom`**: The user-interface library that manages components and rendering.

---

## ⏭️ Next Step
Now proceed to **[Step 2: `02_next_config.md`](file:///Users/rythmjagga/Downloads/rythmvideozip/docs/02_next_config.md)** to learn how project settings are configured!
