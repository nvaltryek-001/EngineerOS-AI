<h1 align="center">⚙️ EngineerOS AI</h1>

<p align="center"><b>One workspace for an engineering student's placement journey: AI mentor, résumé analysis, roadmap, placement tracker, coding log and notes.</b></p>

<p align="center">
  <img src="https://img.shields.io/badge/React_19-20232A?style=flat-square&logo=react&logoColor=61DAFB" alt="React 19" />
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Vite-646CFF?style=flat-square&logo=vite&logoColor=white" alt="Vite" />
  <img src="https://img.shields.io/badge/Express-000000?style=flat-square&logo=express&logoColor=white" alt="Express" />
  <img src="https://img.shields.io/badge/Firebase_Auth-FFCA28?style=flat-square&logo=firebase&logoColor=black" alt="Firebase Auth" />
  <img src="https://img.shields.io/badge/Supabase-3FCF8E?style=flat-square&logo=supabase&logoColor=white" alt="Supabase" />
  <img src="https://img.shields.io/badge/Gemini-8E75B2?style=flat-square&logo=googlegemini&logoColor=white" alt="Gemini" />
</p>

## Problem

Students preparing for placements juggle a résumé doc, a spreadsheet of applications, a LeetCode tab, scattered notes and generic career advice. EngineerOS puts those in one signed-in dashboard and adds an AI mentor that can see the context.

## Features

| Page | What it does |
|---|---|
| **Dashboard** | Overview of progress across the other modules |
| **AI Mentor** | Chat backed by Gemini through the server (`POST /api/chat`); the key never reaches the browser |
| **Résumé** | Upload PDF or DOCX → text extracted server-side (`pdf-parse`, `mammoth`) → Gemini feedback (`POST /api/resume/analyze`) |
| **Roadmap** | Career roadmap with AI recommendations |
| **Placement** | Track companies, rounds and status (`placements` table) |
| **Coding** | Log practice problems |
| **Notes** | Personal study notes (`notes` table) |
| **Auth** | Email/password and Google sign-in through Firebase Auth; Profile and Settings pages |

## Architecture

```mermaid
flowchart LR
  subgraph Browser
    UI[React 19 + Vite<br/>React Router · Zustand · Recharts]
  end
  UI -- sign-in --> FA[Firebase Auth]
  UI -- data --> SB[(Supabase<br/>users · placements · notes)]
  UI -- /api/chat<br/>/api/resume/analyze --> API[Express server.ts]
  API -- multer → pdf-parse / mammoth --> API
  API -- GEMINI_API_KEY --> G[Google Gemini]
```

## Project structure

```text
server.ts                 # Express: Gemini chat + résumé analysis, serves the SPA in production
src/
  pages/                  # Dashboard, Mentor, Resume, Roadmap, Placement, Coding, Notes, Profile, Settings, Login, Signup
  components/             # common/, mentor/, resume/
  services/               # firebase/, gemini/, resume/, supabase/
  store/ hooks/ context/ routes/
supabase/schema.sql       # users, placements, notes tables
```

## Run locally

```bash
git clone https://github.com/nvaltryek-001/EngineerOS-AI && cd EngineerOS-AI
npm install
cp .env.example .env      # set GEMINI_API_KEY; Firebase/Supabase values optional (see below)
npm run dev               # Express + Vite on one port
```

| Variable | Needed for |
|---|---|
| `GEMINI_API_KEY` | AI Mentor and résumé analysis (server-side only) |
| `VITE_FIREBASE_*` | Your own Firebase project. If unset, the app falls back to the project's public web config. |
| `SUPABASE_URL`, `SUPABASE_ANON_KEY` | Persisting placements and notes; apply `supabase/schema.sql` first |

Production: `npm run build && npm start` (bundles `server.ts` to `dist/server.cjs`).

## Quality checks

- `npm run lint`: TypeScript type-check (`tsc --noEmit`)
- CI (`.github/workflows/ci.yml`) runs type-check and build on every push and PR.

## Known limitations

- No automated tests yet; CI covers type-check and build only.
- AI answers depend on Gemini availability and quota; without `GEMINI_API_KEY` the mentor replies with a clearly labelled mock response.

## Roadmap

- Unit tests for the résumé extraction endpoint.
- Screenshots and demo GIF in `docs/`.
