<div align="center">

# 🎯 Resume – Job Description Matcher

### Automated Resume Screening · Skill Extraction · Compatibility Scoring

[![Live Demo](https://img.shields.io/badge/🚀_Live_Demo-Online-00C853?style=for-the-badge)](https://resume-job-matcher-2uro.onrender.com/api/match)
[![Node.js](https://img.shields.io/badge/Node.js-18+-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org)
[![Express](https://img.shields.io/badge/Express.js-v4-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-14+-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)](https://postgresql.org)
[![Docker](https://img.shields.io/badge/Docker-Containerised-2496ED?style=for-the-badge&logo=docker&logoColor=white)](https://docker.com)
[![Render](https://img.shields.io/badge/Render-Deployed-46E3B7?style=for-the-badge&logo=render&logoColor=white)](https://render.com)

<br/>

> **Feed it a resume. Feed it a job description.**
> **Get an instant compatibility score. No manual screening. No guesswork.**

<br/>

</div>

---

## 🔗 Live Demo

> The API is live and publicly accessible — no setup needed.

```
 https://resume-job-matcher-2uro.onrender.com/api/status
```

**Try it instantly:**

```bash
curl -X POST https://resume-job-matcher-2uro.onrender.com/api/match
```

**Response:**

```json
{
  "name": "Sai Bharath",
  "salary": "12 LPA",
  "yearOfExperience": 4,
  "resumeSkills": ["Docker", "Kafka", "MySQL"],
  "matchingJobs": [
    {
      "role": "Software Engineer",
      "matchingScore": 60
    }
  ]
}
```

---

## 💡 What It Does

Recruitment platforms receive thousands of resumes per job posting. Manual screening is slow, inconsistent, and doesn't scale. This system automates the entire pipeline.

| Step | What Happens |
|------|-------------|
| 📄 **Resume In** | Resume is parsed for name, skills, experience, and salary |
| 📋 **JD In** | Job description is parsed for role, required skills, and experience |
| ⚖️ **Compare** | Skills are cross-matched against a curated technical skills list |
| 📊 **Score** | Compatibility percentage is calculated using the matching formula |
| 💾 **Store** | Result is saved to PostgreSQL for analysis |
| 📤 **Respond** | Clean JSON is returned to the client |

---

## ⚙️ How It Works

```
1.  POST /api/match          →  API receives request
2.  Load resume.txt + jd.txt →  Read input files from sample-data/
3.  resumeParser.js          →  Extract: name, skills, experience, salary
4.  jdParser.js              →  Extract: role, required skills, experience
5.  matcher.js               →  Cross-match skill sets
6.  Score formula            →  (Matched Skills / Total JD Skills) × 100
7.  PostgreSQL               →  Persist result to match_results table
8.  JSON Response            →  Return structured output to client
```

---

## 🏗️ Architecture

```
┌─────────────────────────────────┐
│       CLIENT HTTP REQUEST       │
└───────────────┬─────────────────┘
                │
                ▼
┌─────────────────────────────────┐
│       EXPRESS API SERVER        │
│       POST /api/match           │
└──────────┬──────────────────────┘
           │
     ┌─────┴──────┐
     ▼            ▼
┌─────────┐  ┌─────────┐
│ Resume  │  │   JD    │
│ Parser  │  │ Parser  │
└────┬────┘  └────┬────┘
     └──────┬─────┘
            ▼
┌─────────────────────────────────┐
│         MATCHING ENGINE         │
│   matcher.js · skillList.js     │
└───────────────┬─────────────────┘
                │
                ▼
┌─────────────────────────────────┐
│       POSTGRESQL DATABASE       │
│       table: match_results      │
└───────────────┬─────────────────┘
                │
                ▼
┌─────────────────────────────────┐
│          JSON RESPONSE          │
└─────────────────────────────────┘
```

---

## 📁 Project Structure

```
resume-job-matcher/
│
├── config/
│   └── db.js                 ← PostgreSQL connection pool
│
├── routes/
│   └── matchRoute.js         ← API route: POST /api/match
│
├── services/
│   ├── resumeParser.js       ← Extracts name, skills, experience, salary
│   ├── jdParser.js           ← Extracts role, required skills, experience
│   └── matcher.js            ← Skill comparison + score calculation
│
├── utils/
│   └── skillList.js          ← Curated technical skills reference list
│
├── sample-data/
│   ├── resume.txt            ← Input: candidate resume (edit to test)
│   └── jd.txt                ← Input: job description (edit to test)
│
├── server.js                 ← Entry point
├── Dockerfile                ← Container build instructions
└── package.json              ← Dependencies and scripts
```

---

## 🛠️ Tech Stack

| Technology | Role | Version |
|-----------|------|---------|
| **Node.js** | Server runtime | v18+ |
| **Express.js** | HTTP framework & routing | v4.x |
| **PostgreSQL** | Relational database | v14+ |
| **Docker** | Containerisation | Latest |
| **Render** | Cloud deployment | — |

---

## 🧮 Matching Algorithm

```
Matching Score = ( Matched Skills ÷ Total JD Skills ) × 100
```

**Example:**

```
JD requires  →  ["Node.js", "Docker", "PostgreSQL", "Kafka", "Redis"]   (5 skills)
Resume has   →  ["Node.js", "Docker", "PostgreSQL"]                     (3 matched)

Score = (3 / 5) × 100 = 60%
```

**Score Bands:**

| Score | Result |
|-------|--------|
| 🟢 80% – 100% | Strong match — candidate is well suited |
| 🟡 50% – 79% | Partial match — core requirements met |
| 🔴 Below 50% | Weak match — significant skill gaps |

---

## 🗄️ Database Schema

```sql
CREATE TABLE IF NOT EXISTS match_results (
    id             SERIAL PRIMARY KEY,
    name           TEXT,
    experience     INT,
    salary         TEXT,
    resume_skills  TEXT,
    matching_score INT,
    created_at     TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

> Table is auto-created on server startup.

---

## 🚀 Getting Started

### Prerequisites
- Node.js v18+
- PostgreSQL running locally
- npm

---

**Step 1 — Clone the repository**

```bash
git clone https://github.com/yourusername/resume-job-matcher.git
cd resume-job-matcher
```

**Step 2 — Install dependencies**

```bash
npm install
```

**Step 3 — Configure PostgreSQL**

Edit `config/db.js`:

```js
const pool = new Pool({
  connectionString: "postgresql://USER:PASSWORD@localhost:5432/yourdb"
});
```

**Step 4 — Start the server**

```bash
npm run dev
```

Server starts at → `http://localhost:8000`

**Step 5 — Test the API**

```bash
curl -X POST http://localhost:8000/api/match
```

---

## 🐳 Docker Setup

**Build:**

```bash
docker build -t resume-job-matcher .
```

**Run:**

```bash
docker run -p 8000:8000 \
  -e DATABASE_URL=your_postgres_connection_string \
  resume-job-matcher
```

API → `http://localhost:8000/api/match`

---

## ☁️ Deploy on Render

| Step | Action |
|------|--------|
| 1 | Push code to GitHub |
| 2 | Go to [render.com](https://render.com) → **New Web Service** |
| 3 | Select your repository |
| 4 | Set runtime → **Docker** |
| 5 | Add env variable: `DATABASE_URL` |
| 6 | Click **Deploy** |

**Live URL:**
```
https://resume-job-matcher-2uro.onrender.com/api/match
```

---

## 📡 API Reference

### `POST /api/match`

No request body needed. Reads from `sample-data/` internally.

| Field | Type | Description |
|-------|------|-------------|
| `name` | String | Candidate name from resume |
| `salary` | String | Expected salary from resume |
| `yearOfExperience` | Integer | Years of experience |
| `resumeSkills` | Array | Skills detected in resume |
| `matchingJobs` | Array | Roles with compatibility scores |

---

## ✏️ Update Resume or JD

Edit the input files and call the API again:

```
sample-data/resume.txt   ← paste your resume here
sample-data/jd.txt       ← paste the job description here
```

```bash
curl -X POST http://localhost:8000/api/match
```

---

<div align="center">

**Built with Node.js · Express · PostgreSQL · Docker · Render**

[![Try Live](https://img.shields.io/badge/🚀_Try_It_Live-resume--job--matcher-00C853?style=for-the-badge)](https://resume-job-matcher-2uro.onrender.com/api/match)

</div>
