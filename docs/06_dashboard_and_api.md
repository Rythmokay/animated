# Step 6 of 6: Understanding the Admin Dashboard & Next.js Backend API

> **Reading Order**: **[Step 5: `05_page_tsx.md`](file:///Users/rythmjagga/Downloads/rythmvideozip/docs/05_page_tsx.md)** ➔ Step 6 (Complete Portfolio & Dashboard)

> **Analogy**: Imagine your website as a **luxury museum**. The front page (`/`) is the public exhibition hall where visitors admire artwork and full-screen animations. The Admin Dashboard (`/dashboard`) is the **curator's control room**, where you add new artwork (Skillsets, Projects, Experience, Bio) and save changes instantly to the museum's digital archive (`data/portfolio.json`).

---

## 💡 Fundamental Concepts to Know First

### 1. What is a Next.js Backend API (`app/api/...`)?
Next.js isn't just for building visual web pages—it also runs a **Node.js backend server**.
- **`GET /api/portfolio`**: Reads `data/portfolio.json` and sends portfolio data to the website.
- **`POST /api/portfolio`**: Receives updated portfolio data from the dashboard and writes it directly to disk!

### 2. Live Data Synchronization
When you edit a skill, project, or experience on `/dashboard` and click **"Save All Changes"**, the Dashboard sends a request to `/api/portfolio`. The website on `/` immediately loads your new skillsets and projects!

---

## 🔍 Section Breakdown

### Section 1: Backend API Route (`app/api/portfolio/route.ts`)

```typescript
export async function GET() {
  const data = fs.readFileSync('data/portfolio.json', 'utf8');
  return NextResponse.json(JSON.parse(data));
}

export async function POST(request: Request) {
  const body = await request.json();
  fs.writeFileSync('data/portfolio.json', JSON.stringify(body, null, 2));
  return NextResponse.json({ message: 'Success' });
}
```
- Handles reading (`GET`) and updating (`POST`) portfolio data safely on the server.

---

### Section 2: Admin Dashboard Page (`app/dashboard/page.tsx`)

```tsx
<button onClick={handleSave}>★ Save All Changes</button>
```
- Provides interactive forms to:
  1. Edit **Bio & Quotes** (Name, title, tagline, Nelson Mandela philosophical quote).
  2. Add, edit, or delete **Skillsets** (Frontend, Backend, Creative Tech, proficiency levels).
  3. Add, edit, or delete **Experience** timeline items.
  4. Add, edit, or delete **Featured Projects**.

---

## 🎯 Documentation Complete!
You have completed all 6 steps of the documentation suite!
- **[Return to Step 1: `package.json`](file:///Users/rythmjagga/Downloads/rythmvideozip/docs/01_package_json.md)**
- **[Return to Documentation Index](file:///Users/rythmjagga/Downloads/rythmvideozip/docs/README.md)**
