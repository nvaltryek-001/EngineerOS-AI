<div align="center">

<img src="https://capsule-render.vercel.app/api?type=waving&color=0:1e1b4b,50:4f46e5,100:2563eb&height=230&section=header&text=EngineerOS%20AI&fontSize=72&fontColor=ffffff&animation=fadeIn&fontAlignY=36&desc=The%20AI-powered%20workspace%20for%20an%20engineering%20student's%20placement%20journey&descAlignY=58&descSize=17" width="100%"/>

<img src="https://readme-typing-svg.demolab.com?font=Fira+Code&weight=600&size=22&duration=2600&pause=700&color=6366F1&center=true&vCenter=true&width=760&lines=%F0%9F%A4%96+AI+Mentor+powered+by+Google+Gemini;%F0%9F%93%84+R%C3%A9sum%C3%A9+%E2%86%92+ATS+score+%2B+missing+keywords;%F0%9F%97%BA%EF%B8%8F+Personalised+career+roadmap;%F0%9F%8E%AF+Placement+%26+interview+tracker;%F0%9F%92%BB+Coding+practice+log+%2B+study+notes" alt="Typing animation"/>

<br/>

![React 19](https://img.shields.io/badge/React_19-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white)
![Firebase Auth](https://img.shields.io/badge/Firebase_Auth-FFCA28?style=for-the-badge&logo=firebase&logoColor=black)
![Supabase](https://img.shields.io/badge/Supabase-3FCF8E?style=for-the-badge&logo=supabase&logoColor=white)
![Gemini](https://img.shields.io/badge/Google_Gemini-8E75B2?style=for-the-badge&logo=googlegemini&logoColor=white)

**[🎬 Demo](#-demo-video) · [💡 Problem](#-the-problem) · [✨ Features](#-features) · [⚙️ How it works](#%EF%B8%8F-how-it-works) · [🏗 Architecture](#-architecture) · [💻 Run](#-run-locally) · [📂 Structure](#-project-structure)**

</div>

<img src="https://capsule-render.vercel.app/api?type=rect&color=0:4f46e5,100:2563eb&height=3" width="100%"/>

## 🎬 Demo Video

<div align="center">

<img src="docs/assets/engineeros-demo.gif" alt="EngineerOS AI demo walkthrough" width="100%"/>

[![Watch the MP4 demo](https://img.shields.io/badge/▶_Watch_demo_video-MP4-EA4335?style=for-the-badge&logo=youtube&logoColor=white)](docs/assets/engineeros-demo.mp4)
![Length](https://img.shields.io/badge/length-18_seconds-6366F1?style=for-the-badge)
![Pages](https://img.shields.io/badge/screens-6_pages-2563EB?style=for-the-badge)

<sub>🎨 Animated walkthrough of the app's pages, built from the real page layouts and labels. The numbers shown are sample data.</sub>

</div>

### 🧭 What the demo shows

| ⏱️ Time | 🖥️ Screen | 👀 What you see |
|:-:|---|---|
| `0:00` | 🔐 **Login** | Email + password or **Continue with Google** (Firebase Auth) |
| `0:03` | 📊 **Dashboard** | Problems solved, interviews scheduled, roadmap progress, notes created, recent applications |
| `0:06` | 🤖 **AI Mentor** | Student asks a question → **Gemini** replies with a study plan + a suggestion card |
| `0:09` | 📄 **Resume Matcher** | Upload PDF/DOCX → **ATS score**, skill bars, missing keywords, improvement tips |
| `0:12` | 🎯 **Placement + Roadmap** | Applied / interviews / offers, Full-Stack roadmap milestones, AI recommendation |
| `0:15` | 💻 **Coding** | Practise a problem in `solution.ts` and log it to your progress |

<img src="https://capsule-render.vercel.app/api?type=rect&color=0:4f46e5,100:2563eb&height=3" width="100%"/>

## 💡 The Problem

> Students preparing for placements juggle a **résumé doc**, a **spreadsheet of applications**, a **LeetCode tab**, **scattered notes** and **generic career advice**.
>
> **EngineerOS AI** brings all of that into **one signed-in dashboard** and adds an **AI mentor** that understands the student's context.

<table>
<tr>
<td align="center" width="20%">🤖<br/><b>AI Mentor</b><br/><sub>Gemini chat</sub></td>
<td align="center" width="20%">📄<br/><b>Résumé AI</b><br/><sub>ATS score + gaps</sub></td>
<td align="center" width="20%">🗺️<br/><b>Roadmap</b><br/><sub>Personalised path</sub></td>
<td align="center" width="20%">🎯<br/><b>Placements</b><br/><sub>Apply → Offer</sub></td>
<td align="center" width="20%">💻<br/><b>Coding + Notes</b><br/><sub>Daily practice</sub></td>
</tr>
</table>

<img src="https://capsule-render.vercel.app/api?type=rect&color=0:4f46e5,100:2563eb&height=3" width="100%"/>

## ✨ Features

| | Page | What it does |
|:-:|---|---|
| 📊 | **Dashboard** | Overview of progress across every module: problems solved, interviews, roadmap progress, notes, recent applications |
| 🤖 | **AI Mentor** | Chat backed by **Google Gemini** through the server (`POST /api/chat`). The API key **never reaches the browser** |
| 📄 | **Résumé Matcher** | Upload **PDF or DOCX** → text extracted server-side (`pdf-parse`, `mammoth`) → Gemini returns an **ATS score**, technical skills, soft skills, **missing keywords** and **improvement suggestions** (`POST /api/resume/analyze`) |
| 🗺️ | **Career Roadmap** | Step-by-step learning path with **AI recommendations** |
| 🎯 | **Placement Tracker** | Track companies, rounds and status: total applied, active interviews, offers (`placements` table) |
| 💻 | **Coding** | Problem statement + code editor view to log practice problems |
| 📝 | **Notes** | Personal study notes (`notes` table) |
| 🔐 | **Auth** | Email/password and **Google sign-in** through Firebase Auth, protected routes, Profile and Settings pages |

<img src="https://capsule-render.vercel.app/api?type=rect&color=0:4f46e5,100:2563eb&height=3" width="100%"/>

## ⚙️ How it works

<p align="center">
<img src="docs/assets/how-it-works.svg" alt="How EngineerOS works – 5 steps" width="100%"/>
</p>

### 📄 Résumé analysis flow

```mermaid
sequenceDiagram
    autonumber
    participant S as 🎓 Student
    participant UI as ⚛️ React app
    participant API as 🟢 Express server
    participant G as 🤖 Google Gemini
    S->>UI: Upload résumé (PDF / DOCX)
    UI->>API: POST /api/resume/analyze (multipart)
    API->>API: multer → pdf-parse / mammoth → plain text
    API->>G: Résumé text + analysis prompt (server-side key)
    G-->>API: JSON: ATS score, skills, missing keywords, tips
    API-->>UI: Analysis result
    UI-->>S: 📊 Score card · skill chart · suggestions
```

<img src="https://capsule-render.vercel.app/api?type=rect&color=0:4f46e5,100:2563eb&height=3" width="100%"/>

## 🏗 Architecture

```mermaid
flowchart LR
    subgraph Browser["🌐 Browser"]
      UI["⚛️ React 19 + Vite<br/>React Router · Zustand · Recharts · Tailwind"]
    end
    UI -- "sign-in" --> FA["🔐 Firebase Auth"]
    UI -- "data" --> SB[("🗄️ Supabase<br/>users · placements · notes")]
    UI -- "/api/chat<br/>/api/resume/analyze" --> API["🟢 Express server.ts"]
    API -- "multer → pdf-parse / mammoth" --> API
    API -- "GEMINI_API_KEY" --> G["🤖 Google Gemini"]

    style UI fill:#2563eb,color:#fff,stroke:#1e1b4b
    style FA fill:#f59e0b,color:#000,stroke:#1e1b4b
    style SB fill:#3ecf8e,color:#000,stroke:#1e1b4b
    style API fill:#111827,color:#fff,stroke:#1e1b4b
    style G fill:#8b5cf6,color:#fff,stroke:#1e1b4b
```

| Layer | Tech |
|---|---|
| 🎨 Frontend | React 19, TypeScript, Vite, Tailwind CSS 4, React Router 7, Zustand, Recharts, Motion, Lucide icons |
| 🟢 Backend | Express (`server.ts`), Multer uploads, `pdf-parse`, `mammoth` |
| 🤖 AI | Google Gemini via `@google/genai` (server-side only) |
| 🔐 Auth | Firebase Authentication (email/password + Google) |
| 🗄️ Database | Supabase (Postgres) — schema in `supabase/schema.sql` |

<img src="https://capsule-render.vercel.app/api?type=rect&color=0:4f46e5,100:2563eb&height=3" width="100%"/>

## 💻 Run locally

<details open>
<summary><b>✅ Requirements</b></summary>
<br/>

| Tool | Version |
|---|---|
| 🟢 Node.js | 20+ |
| 🔑 Gemini API key | free from Google AI Studio |
| 🗄️ Supabase project | optional, for saving placements & notes |

</details>

```bash
git clone https://github.com/nvaltryek-001/EngineerOS-AI && cd EngineerOS-AI
npm install
cp .env.example .env      # set GEMINI_API_KEY; Firebase/Supabase values optional (see below)
npm run dev               # Express + Vite on one port
```

| Variable | Needed for |
|---|---|
| `GEMINI_API_KEY` | 🤖 AI Mentor and résumé analysis (server-side only) |
| `VITE_FIREBASE_*` | 🔐 Your own Firebase project. If unset, the app falls back to the project's public web config |
| `SUPABASE_URL`, `SUPABASE_ANON_KEY` | 🗄️ Persisting placements and notes; apply `supabase/schema.sql` first |

🚀 **Production:** `npm run build && npm start` (bundles `server.ts` to `dist/server.cjs`).

<img src="https://capsule-render.vercel.app/api?type=rect&color=0:4f46e5,100:2563eb&height=3" width="100%"/>

## 📂 Project structure

```text
📦 EngineerOS-AI
 ┣ 🟢 server.ts              Express: Gemini chat + résumé analysis, serves the SPA in production
 ┣ 📁 src/
 ┃ ┣ 📄 pages/               Dashboard · Mentor · Resume · Roadmap · Placement · Coding · Notes · Profile · Settings · Login · Signup
 ┃ ┣ 🧩 components/          common/ · mentor/ · resume/
 ┃ ┣ 🔌 services/            firebase/ · gemini/ · resume/ · supabase/
 ┃ ┗ 🗃️ store/ hooks/ context/ routes/
 ┣ 🗄️ supabase/schema.sql    users · placements · notes tables
 ┗ 🎬 docs/assets/           demo video, GIF and diagrams used in this README
```

<img src="https://capsule-render.vercel.app/api?type=rect&color=0:4f46e5,100:2563eb&height=3" width="100%"/>

## 🧪 Quality checks

- ✅ `npm run lint` — TypeScript type-check (`tsc --noEmit`)
- 🔁 Production build: `npm run build`

<details>
<summary><b>⚠️ Known limitations</b></summary>
<br/>

- 🧪 No automated tests yet.
- 🤖 AI answers depend on Gemini availability and quota. Without `GEMINI_API_KEY` the mentor replies with a clearly labelled mock response.

</details>

<details>
<summary><b>🛣️ Roadmap</b></summary>
<br/>

- Unit tests for the résumé extraction endpoint.
- Screen recording of the deployed app alongside the animated walkthrough.

</details>

<div align="center">

<br/>

⭐ **If you like this project, give it a star!** ⭐

<img src="https://capsule-render.vercel.app/api?type=waving&color=0:2563eb,50:4f46e5,100:1e1b4b&height=120&section=footer" width="100%"/>

</div>
