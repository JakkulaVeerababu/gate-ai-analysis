# GateScope – GATE AI Analyzer

Upload your GOAPS response sheet (.mht) to instantly get your raw score, analytics, and All India Rank prediction.

## 🚀 Running Locally

### Backend (FastAPI)
```powershell
cd "gate ai analyzer\backend"
.\venv\Scripts\uvicorn app.main:app --reload
```
→ Runs at **http://localhost:8000**  
→ API Docs at **http://localhost:8000/docs**

### Frontend (Next.js)
```powershell
cd "gate ai analyzer\frontend"
npm run dev
```
→ Runs at **http://localhost:3000**

## 🌐 Deploy

### Vercel (Recommended)
- **Frontend**: Import repo on [vercel.com](https://vercel.com), set Root Directory = `frontend`
- **Backend**: Second Vercel project, set Root Directory = `backend` (uses `vercel.json` + Python runtime)
- Add env var `NEXT_PUBLIC_API_URL` = your backend Vercel URL

### Netlify (Frontend only)
- Import repo on [netlify.com](https://netlify.com), base dir = `frontend`
- `netlify.toml` is already configured
- Host backend separately (Render, Railway, or Vercel)

## Tech Stack
- **Frontend**: Next.js 16, Tailwind CSS, Chart.js
- **Backend**: FastAPI, SQLite, SQLAlchemy, scikit-learn
