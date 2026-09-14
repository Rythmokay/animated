# Beginners Guide to `package.json`

> **Analogy**: Think of `package.json` as the **ingredients list & instruction manual** for a recipe. It lists every external tool/library your project depends on (like React and Next.js) and defines shortcut commands (like `npm run dev`) to run your app.

---

## 💡 Fundamental Concepts to Know First

### 1. What is NPM (Node Package Manager)?
NPM is a global library store for JavaScript software. Instead of writing everything from scratch, developers download packages (like Next.js) using NPM.

### 2. Dependencies vs DevDependencies
- **`dependencies`**: Required for the app to function in production (e.g. `next`, `react`).
- **`devDependencies`**: Tools only needed while editing code (e.g. `typescript`, type definitions).

### 3. Semantic Versioning (e.g. `^15.1.0`)
- `15`: Major version (big changes).
- `1`: Minor version (new features).
- `0`: Patch version (bug fixes).
- `^`: Allows automatic patch/minor updates when installing.

---

## 🔍 Section-by-Section Breakdown

```json
{
  "name": "frame-scroll-animation",
  "version": "0.1.0",
  "private": true,
```
- `name`: Project identifier.
- `private: true`: Prevents accidental publication of this project to the public NPM registry.

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
- **`npm run dev`**: Starts the local Turbopack development server on `http://localhost:3000`.
- **`npm run build`**: Compiles and optimizes your app for production deployment.
- **`npm run start`**: Runs the production-built site.

---

### Dependencies & DevDependencies

```json
  "dependencies": {
    "next": "^15.1.0",
    "react": "^19.0.0",
    "react-dom": "^19.0.0"
  },
  "devDependencies": {
    "@types/node": "^22.0.0",
    "@types/react": "^19.0.0",
    "@types/react-dom": "^19.0.0",
    "typescript": "^5.7.0"
  }
```
- **`next`**: The Next.js web framework.
- **`react` & `react-dom`**: The UI rendering engine.
- **`typescript`**: Safety type checker.

---

## 🎯 Summary Checklist
- `package.json` is the central project manifest.
- Defines runnable `npm` scripts.
- Tracks project dependencies and TypeScript types.
