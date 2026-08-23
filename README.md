## GyanSetu

### Grounded, Bilingual NCERT Learning Platform for Classes 6–12

**GyanSetu ("Knowledge Bridge")** is a citation-grounded AI tutor built to close the coaching-class divide for Indian students. Every answer is traceable to a real NCERT textbook chapter and page number, it speaks English, Hindi, and Hinglish fluently, and it degrades gracefully all the way down to a fully offline mode — because the students who need it most often have the least reliable internet.

> 🏆 **Hackathon Submission — Phase 1: Online Prototype**

---

## 🔗 Quick Links

| | |
|---|---|
| 🚀 **Live Prototype** | `[https://gyansetu-trlu.onrender.com]` |
| 🎥 **Demo Video** | `[https://youtu.be/sTn8J3g0q_w]` |
| 📂 **GitHub Repo** | `[https://github.com/lakshmi-2908/gyansetu]` |
| 👥 **Team** | `[ARCHITECTS IN CHAOS, A.LAKSHMI KANTHAM,N.GEETHIKA ]` |
| 📋 **Problem Statement** | `[AI for Equitable Education Access]` |

> If the live link isn't available, use the [Getting Started](#-getting-started-run-it-locally) section below — the app runs fully offline on a laptop in under two minutes with zero paid API keys.

---

## 📖 Table of Contents

1. [The Problem](#-the-problem)
2. [Our Approach](#-our-approach)
3. [Key Features](#-key-features)
4. [What's Real vs. Demo Data](#-whats-real-vs-demoseeded-data)
5. [Tech Stack & Architecture](#-tech-stack--architecture)
6. [Getting Started (Run It Locally)](#-getting-started-run-it-locally)
7. [Environment Configuration](#-environment-configuration)
8. [Project Structure](#-project-structure)
9. [API Reference](#-api-reference)
10. [AI Brain Router & Offline Fallback](#-ai-brain-router--fallback-topology)
11. [Retrieval Method & Known Limitations](#-retrieval-method--its-limitations)
12. [Testing](#-testing)
13. [Data Verification](#-data-verification)
14. [Accessibility](#-accessibility)
15. [Evaluation Criteria — How This Prototype Delivers](#-evaluation-criteria--how-this-prototype-delivers)
16. [Roadmap (Phase 2+)](#-roadmap-phase-2)
17. [Known Limitations & Honest Disclosures](#-known-limitations--honest-disclosures)
18. [Team & Acknowledgements](#-team--acknowledgements)

---

## 🎯 The Problem

Millions of Indian students, especially in Tier 2/3 towns and rural areas, rely on expensive private coaching to clear doubts and prepare for board exams — an option that's financially out of reach for many first-generation learners. Free AI chatbots exist, but they:

- **Hallucinate** — giving confident, wrong, or off-syllabus answers with no way to verify them against the actual textbook.
- **Aren't bilingual-native** — most don't handle the natural code-switching between English, Hindi, and Hinglish that Indian students actually use.
- **Assume good connectivity** — useless for students on 2G networks or shared family phones.
- **Don't help teachers** — a student's doubt disappears into a chat log instead of informing what the *whole class* is struggling with.
- **Don't connect learning to opportunity** — a student may ace a topic but never learn about the scholarship or career pathway it unlocks.

## 💡 Our Approach

GyanSetu is built around one non-negotiable principle: **every claim must be traceable to a real NCERT chapter and page number.** We call this the **Grounding Gate**. Instead of asking an LLM to "know" NCERT content from memory (and risk hallucination), we:

1. **Retrieve first, generate second** — a TF-IDF + cosine-similarity search over indexed NCERT chunks finds the exact textbook passage relevant to the student's question.
2. **Cite everything** — the AI is instructed to answer *only* from the retrieved passage and cite `[Class X Subject, Chapter, p. N]` after every claim.
3. **Never refuse, always label** — if a question falls outside our indexed chapters, we still answer it using general curriculum knowledge, but we visibly flag it as "ungrounded" so students and teachers know the difference. Honesty over false confidence.
4. **Fail gracefully to zero dependencies** — a three-tier AI brain router (OpenRouter → Gemini → fully offline deterministic engine) means the app **never goes down**, even with no internet and no API keys, because the offline engine builds real answers from the same indexed NCERT chunks.
5. **Close the loop for teachers and students** — every doubt and practice attempt feeds a shared event spine that powers a live "class struggle" dashboard for teachers, and a Scholarship Matcher + Career Compass that turns curriculum strengths into real opportunities.

---

## ✨ Key Features

### 1. 🧠 Doubt-Solving Agent
- Understands English, शुद्ध हिंदी (Devanagari), and conversational Hinglish — in the same conversation.
- Every claim cited with exact `[Chapter, Page]` references pulled from the retrieval engine.
- **"Explain More Simply"** — one click re-synthesizes the answer with simpler vocabulary and analogies.
- Multi-turn threads support natural follow-up questions.
- Ungrounded questions get an honest ⚠️ warning banner instead of a fabricated citation.

### 2. ✅ Adaptive Practice Generator
- "Practice for me" auto-detects concepts the student has recently asked about and generates fresh MCQs grounded in the same NCERT chunks.
- One-question-at-a-time UI with instant feedback and a cited explanation for every question.

### 3. 📊 Teacher Insight Dashboard
- Reads the *same* shared event spine as the student-facing tools — no separate data pipeline.
- Computes a weighted **Struggle Score** `(Doubts × 1.5) + (Practice Errors × 2.0)` per concept to tell teachers exactly what to re-teach next class.
- One-click "Copy Lesson Plan" for the top struggling concepts.
- Printable worksheet & exam-paper generator.

### 4. 🎓 Scholarship Matcher & Career Compass
- Matches a student's profile (grade, income, category, gender, marks) against an authentic database of Indian national & state scholarship schemes (NMMSS, PM YASASVI, etc.) with eligibility checklists and direct application links.
- A zero-coaching Career Pathways explorer spanning Science, Commerce, Humanities, Vocational/ITI, and Govt Exam tracks — with free government college options and realistic starting salaries.

### 5. 📡 Low-Bandwidth / 2G Access Concept Demo
- A UI concept demo of what a WhatsApp/SMS-delivered version of GyanSetu could look like for students without reliable 4G/5G — clearly labeled as a simulation, not a live integration.

### 6. 🗺️ Concept Mastery Map
- A visual, filterable knowledge graph of every indexed NCERT concept, color-coded by mastery status (mastered / needs review / in progress / unattempted), so a student can see their whole syllabus at a glance.

---

## 📊 What's Real vs. Demo/Seeded Data

Full transparency for judges — here's exactly what's live-computed vs. sample data:

| Feature | Status | Details |
| :--- | :--- | :--- |
| **NCERT Knowledge Base** | ✅ Real | 73 hand-curated NCERT sections across Classes 6–12 (Mathematics, Science, Physics, Chemistry, Biology, Social Science), TF-IDF indexed at boot from `server/knowledge_base_data.ts`. |
| **Retrieval & Grounding Gate** | ✅ Real | Live TF-IDF cosine-similarity ranking with a tunable `SIMILARITY_THRESHOLD`; genuinely rejects (labels as ungrounded) out-of-syllabus queries at runtime. |
| **Event Spine** (`data/events.jsonl`) | ✅ Real | Synchronously written on every doubt and practice submission. |
| **Teacher Dashboard** | ✅ Real query + seeded baseline | Live-queries `data/events.jsonl`; seeded with realistic sample interactions for Class 10-A so the dashboard isn't empty on first run. |
| **AI Brain Routing** | ✅ Real | Live 3-tier fallback (OpenRouter → Gemini → offline grounded engine) with real telemetry (`brainUsed`, `latencyMs`) shown on every answer. |
| **Scholarship Matcher** | ✅ Real | Authentic Indian scholarship scheme data, matched live against the filter form. |
| **Career Compass** | ✅ Real (curated, not AI-generated) | Curated career pathway dataset. |
| **Low-Bandwidth / 2G Simulator** | 🎭 UI Concept Demo | Fully client-side simulated chat — **not** a live WhatsApp/SMS/IVR integration. Labeled in-app. |

---

## 🏗️ Tech Stack & Architecture

```
┌─────────────────────────────┐        ┌──────────────────────────────────┐
│   Frontend (Vite + React 19) │        │        Backend (Express + TS)      │
│  ─ Tailwind CSS v4            │──HTTP─▶│  ─ /api/ask, /api/practice, ...    │
│  ─ Bilingual UI (EN/HI)       │◀──────│  ─ TF-IDF Retrieval Engine         │
│  ─ Concept Map, Scholarships  │  JSON  │  ─ AI Brain Router (3-tier)        │
└─────────────────────────────┘        │  ─ Event Spine (JSONL)             │
                                        └──────────────┬─────────────────────┘
                                                        │
                                        ┌───────────────▼───────────────┐
                                        │  AI Brain Router (fallback)    │
                                        │  1. OpenRouter (free models)   │
                                        │  2. Google Gemini (free tier)  │
                                        │  3. Offline Grounded Engine    │
                                        │     (zero external dependency) │
                                        └─────────────────────────────────┘
```

**Frontend:** Vite, React 19, TypeScript, Tailwind CSS v4, `lucide-react`, `react-markdown`, `motion`
**Backend:** Node.js, Express, TypeScript (run directly via `tsx`, bundled via `esbuild` for production)
**AI:** OpenRouter (free-tier models, e.g. `nvidia/nemotron-3-ultra-550b-a55b:free`) → Google Gemini (`@google/genai`) → a fully deterministic offline grounded-answer engine
**Retrieval:** Custom TF-IDF + cosine-similarity engine with keyword/fuzzy-match boosting (no external vector DB — zero infra dependency, runs anywhere)
**Storage:** Flat-file JSON/JSONL (`data/index/`, `data/events.jsonl`) — no database server required, ideal for low-resource deployment environments

---

## 🚀 Getting Started (Run It Locally)

### Prerequisites
- **Node.js** ≥ 18 (developed & tested on Node 22)
- **npm** (bundled with Node)
- No database, no Docker, no paid API keys required to run the full app end-to-end.

### 1. Clone & Install

```bash
git clone <this-repo-url>
cd gyansetu
npm install
```

### 2. Configure Environment (Optional)

Copy the example env file. **The app works fully offline with zero configuration** — this step only matters if you want live LLM-generated answers instead of the offline grounded engine.

```bash
cp .env.example .env
```

See [Environment Configuration](#-environment-configuration) below for what each variable does.

### 3. Build the Knowledge Base Index

```bash
npm run index-kb
```

This reads `server/knowledge_base_data.ts` (73 NCERT sections) and writes a TF-IDF index to `data/index/` — takes under a second. If you skip this step, the server builds the index automatically on first boot anyway.

### 4. Run the Dev Server

```bash
npm run dev
```

Open **http://localhost:3000** — the app serves both the API and the Vite-powered frontend from a single process.

### 5. Production Build (Optional)

```bash
npm run build   # bundles frontend (Vite) + backend (esbuild) into dist/
npm start        # runs the production bundle
```

### 6. Run the Test Suite

```bash
npx tsx test_ai_brains.ts   # end-to-end functional test suite (16 assertions)
npm run lint                 # tsc --noEmit — zero-error TypeScript check
```

That's it — **no external services, no signup, no database setup.** The whole platform, including AI-generated (offline) doubt answers and practice questions, works standalone on a fresh laptop.

---

## ⚙️ Environment Configuration

```env
# Gemini API Key (Fallback brain) — optional
GEMINI_API_KEY=""

# OpenRouter API Key (Primary brain) — optional, free tier available at openrouter.ai
OPENROUTER_API_KEY=""
OPENROUTER_MODEL="nvidia/nemotron-3-ultra-550b-a55b:free"

# Grounding / Retrieval Tunable Thresholds
# SIMILARITY_THRESHOLD: minimum cosine-similarity score (0–1) a query's top
# retrieved chunk must reach to be treated as "grounded". Default: 0.18.
# Raise it for stricter grounding, lower it to be more permissive.
SIMILARITY_THRESHOLD="0.18"
TOP_K_CHUNKS="4"

# APP_URL: the URL this app is hosted at (used in OpenRouter request headers)
APP_URL=""
```

**Leaving `OPENROUTER_API_KEY` and `GEMINI_API_KEY` blank is completely fine** — GyanSetu automatically falls back to its offline grounded engine, which builds real, cited answers directly from the indexed NCERT chunks. This was a deliberate design choice for reliability in low-connectivity classrooms.

---

## 📁 Project Structure

```
gyansetu/
├── server/
│   ├── knowledge_base_data.ts   # 73 curated NCERT sections (source of truth)
│   ├── indexer.ts                # Builds TF-IDF index from knowledge_base_data.ts
│   ├── retrieval.ts               # Cosine-similarity retrieval + grounding gate
│   ├── brain_router.ts            # 3-tier AI fallback (OpenRouter → Gemini → offline)
│   ├── doubt_service.ts           # Doubt-solving orchestration
│   ├── practice_service.ts        # Adaptive MCQ generation
│   ├── events_store.ts            # Shared event spine + teacher analytics
│   └── types.ts
├── src/
│   ├── components/                 # React components (DoubtsView, PracticeView, TeacherView, ScholarshipView, ConceptMapVisualization, modals...)
│   ├── data/                       # Scholarship & career pathway datasets
│   └── App.tsx
├── data/
│   ├── index/                      # Generated TF-IDF index (gitignored, regenerate with `npm run index-kb`)
│   └── events.jsonl                # Shared event spine (auto-created)
├── test_ai_brains.ts               # End-to-end functional test suite
├── server.ts                       # Express entrypoint
├── .env.example
└── README.md
```

---

## 🔌 API Reference

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET`  | `/api/health` | Brain router status, indexed chunk count, event count |
| `POST` | `/api/ask` | Submit a doubt; returns a grounded (or honestly-labeled ungrounded) answer with citations |
| `POST` | `/api/practice` | Generate adaptive MCQs for a student/concept |
| `POST` | `/api/practice/submit` | Log a practice attempt result to the event spine |
| `GET`  | `/api/teacher/summary` | Aggregated class struggle-score analytics |
| `GET`  | `/api/concepts` | Full list of indexed NCERT concepts (powers the Concept Map) |

<details>
<summary><strong>Example: <code>POST /api/ask</code></strong></summary>

```bash
curl -X POST http://localhost:3000/api/ask \
  -H "Content-Type: application/json" \
  -d '{
    "query": "What is the quadratic formula?",
    "studentSessionId": "stud-abc123",
    "classCode": "CLASS-10A",
    "classLevel": 10,
    "subjectFilter": "Mathematics"
  }'
```

Returns a JSON object with `answer`, `isGrounded`, `groundingBadge`, `citations[]`, `brainUsed`, and `latencyMs`.
</details>

---

## 🧠 AI Brain Router & Fallback Topology

A unified `brain_router` module tries three tiers, in order, on every request:

1. **Primary — OpenRouter** (`nvidia/nemotron-3-ultra-550b-a55b:free`, configurable), with several other free-tier models as automatic candidates if the primary is unavailable.
2. **Fallback — Google Gemini** (`@google/genai`, free tier).
3. **Offline Grounded Engine** — if both cloud providers are unconfigured or unreachable, a fully deterministic, zero-dependency engine synthesizes an answer **directly from the actually-retrieved NCERT chunk(s)** for the student's specific question. It never falls back to a generic unrelated example — this was a deliberate design goal so the platform degrades gracefully to something genuinely useful, not a canned demo.

Every response carries `brainUsed` and `latencyMs` telemetry, visible in the UI on every answer bubble and in the System Health modal.

---

## 🔍 Retrieval Method & Its Limitations

Retrieval uses **TF-IDF weighted vectors + cosine similarity**, boosted with keyword/concept-tag exact-match and edit-distance fuzzy-match bonuses — **not** a semantic embeddings model. In practice:

- Queries close to the textbook's own vocabulary (or matching indexed keywords/concept tags) retrieve very reliably, across English, Hindi, and Hinglish.
- Heavily paraphrased queries with no NCERT-specific vocabulary may score lower and occasionally fall through the grounding gate, since there's no learned semantic understanding behind the words.
- The gate compares the top score against `SIMILARITY_THRESHOLD` (default `0.18`, live-configurable via `.env`).

We chose TF-IDF over embeddings deliberately for Phase 1: **zero external dependencies, zero API cost, and it runs instantly on a laptop with no GPU or vector database** — directly serving the low-resource-deployment goal of the project. Semantic embeddings are on the [roadmap](#-roadmap-phase-2) for Phase 2.

---

## 🧪 Testing

```bash
npx tsx test_ai_brains.ts
```

Runs a 16-assertion end-to-end functional suite covering:
- NCERT curriculum coverage (all 7 class levels, all 6 core subjects)
- Bilingual/Hinglish/Devanagari retrieval accuracy across 7 real query cases spanning Classes 6–12
- Doubt-solver groundedness and citation generation
- Adaptive practice MCQ schema validity
- Teacher analytics aggregation
- Scholarship database integrity

```bash
npm run lint   # tsc --noEmit — zero TypeScript errors
```

---

## ✅ Data Verification

A sample of chunks in `server/knowledge_base_data.ts`, spanning multiple class levels and subjects, was manually spot-checked against standard NCERT textbook content:

- Class 6 Science — Components of Food (vitamin deficiency diseases)
- Class 8 Science — Force & Pressure (`P = F/A`)
- Class 9 Science — Newton's Laws of Motion (`F = dp/dt = ma`)
- Class 10 Science — Ohm's Law & Resistance (`V = IR`)
- Class 10 Science — Mirror Formula (`1/v + 1/u = 1/f`)
- Class 11 Mathematics — Sets, Union/Intersection & De Morgan's Laws
- Class 12 Mathematics — Conditional Probability & Bayes' Theorem
- Class 12 Biology — Recombinant DNA Technology

All checked chunks matched standard NCERT terminology, formulas, and unit conventions. This was a spot check, not an exhaustive audit.

---

## ♿ Accessibility

- Visible `:focus-visible` outline on every interactive element (buttons, links, inputs, tab triggers, MCQ option buttons) for keyboard navigation.
- `aria-label`s on all icon-only controls (modal close buttons, send buttons, header toggles).
- WCAG AA contrast (≥4.5:1) verified for all text/background color combinations used in the dark theme.
- Mobile-responsive down to 360px viewport width, tested on the Scholarship Matcher and Concept Map views.

---

## 🏆 Evaluation Criteria — How This Prototype Delivers

| Criterion | How GyanSetu Addresses It |
| :--- | :--- |
| **Innovation** | The "retrieve-then-cite" Grounding Gate is a genuinely different approach from typical AI tutoring chatbots — it makes hallucination structurally harder rather than just prompting the model to "be careful." The 3-tier brain router with a *real* offline fallback (not a canned demo) is unusual in student-facing AI tools. |
| **Technical Implementation** | Full-stack TypeScript, a custom-built TF-IDF retrieval engine (no external vector DB dependency), a resilient multi-provider AI router with per-model timeouts and candidate fallback, and a shared event spine architecture that powers three different surfaces (Doubts, Practice, Teacher Dashboard) from one source of truth. |
| **Feasibility** | Runs with zero paid infrastructure — no database server, no vector DB, no mandatory API keys. Deployable on a single low-spec VM or even offline on a school's local network. |
| **Scalability** | Flat-file JSONL event storage and a stateless retrieval index mean horizontal scaling is straightforward; the architecture is intentionally simple to keep infra cost near-zero, which matters for a tool meant to serve under-resourced schools at scale. |
| **Code Quality** | Fully typed TypeScript across frontend and backend, zero `tsc --noEmit` errors, an end-to-end automated test suite (16 assertions), consistent design system, and documented data-quality/retrieval-limitation caveats rather than overselling accuracy. |
| **Documentation** | This README, inline code comments, an honest "What's Real vs. Demo Data" table, a manual NCERT content verification log, and accessibility/mobile QA notes. |
| **Presentation** | See the [demo video](#-quick-links) for a walkthrough of all four tabs, the offline-mode fallback in action, and the teacher analytics dashboard. |

---

## 🗺️ Roadmap (Phase 2+)

- [ ] Semantic embedding-based retrieval (in addition to / replacing TF-IDF) for better paraphrase handling
- [ ] Real PDF ingestion pipeline to expand the knowledge base beyond the 73 curated sections
- [ ] Live WhatsApp Business API / SMS gateway integration (currently a UI concept demo only)
- [ ] Persistent database (currently flat-file JSONL) for multi-school deployments
- [ ] Teacher-authored content review/correction workflow
- [ ] Expanded regional language support beyond Hindi/Hinglish



## 👥 Team & Acknowledgements

`[ARCHITECTS IN CHAOS, A.LAKSHMI KANTHAM -Backend & AI Infrastructure Lead, N.GEETHIKA - Lead Frontend & UI/UX Developer]`

Built for `[OOSE-4.0]`, Phase 1 — Online Prototype Submission.

Content sourced from official NCERT textbooks (Classes 6–12) for educational, non-commercial use in this hackathon prototype.

---

<p align="center">
  <strong>ज्ञानसेतु GYANSETU — Bridging the gap between every student and quality education.</strong>
</p>
