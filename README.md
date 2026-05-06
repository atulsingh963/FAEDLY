# FAEDLY - Modern AI-Powered EdTech Platform

FAEDLY is a premium, high-performance, and fully typed SaaS EdTech platform that leverages simulated AI models for personalized tutoring, dynamic exam generation, and granular progress analytics.

This repository serves as the complete operational infrastructure and source code for the FAEDLY frontend and serverless backend layers.

---

## 🚀 Architectural Overview

### Tech Stack
- **Framework**: Next.js 15 (App Router, Turbopack)
- **Language**: TypeScript (Strict Mode)
- **Styling**: Tailwind CSS v4, Framer Motion, shadcn/ui
- **State Management**: Zustand
- **Database & Auth**: Firebase (Firestore, Auth, Storage)
- **Data Visualization**: Recharts
- **Testing**: Vitest, React Testing Library, Playwright
- **CI/CD**: GitHub Actions, Vercel

### Core Modules
1. **Authentication System**: Secure JWT/Cookie session syncing with Firebase Auth.
2. **AI Tutor Module**: Simulated real-time streaming AI chatbot with markdown & syntax highlighting.
3. **Assessment Engine**: Dynamic quizzes, exams, and detailed algorithmic evaluation results.
4. **Analytics Dashboard**: High-fidelity data visualization tracking user XP, streaks, and subject mastery.

---

## 🛠️ CI/CD & DevOps Pipeline

We employ a zero-downtime, fully automated CI/CD pipeline integrated directly into GitHub Actions.

### Branching Strategy
- `main`: Production-ready code. Commits here automatically trigger Vercel Production deployments.
- `develop`: Staging environment.
- `feature/*`: Development branches for new features. Must pass PR checks before merging into `develop`.

### GitHub Actions Workflow
Our workflow (`.github/workflows/ci.yml`) executes the following on every PR to `main` or `develop`:
1. **Dependency Installation**: Caches `npm` modules for speed.
2. **Type Checking**: Runs `npx tsc --noEmit`.
3. **Linting**: Enforces strict ESLint rules.
4. **Unit Testing**: Executes `Vitest` suites.
5. **Build Verification**: Compiles via Next.js to catch hydration or static generation errors.

Upon successful merge to `main`, the pipeline seamlessly deploys the build to **Vercel** and pushes updated security rules (`firestore.rules`, `storage.rules`) to **Firebase**.

---

## 🐳 Docker Deployment (Enterprise Support)

For self-hosted enterprise clients, FAEDLY is containerized.

**Build and Run Locally:**
```bash
docker-compose up --build
```
This spawns an optimized Alpine Node.js image leveraging Next.js standalone output tracing to minimize image bloat.

---

## 🔒 Security & Environment Management

### Secret Management
Never commit secrets. The following variables must be configured in your Vercel Dashboard and GitHub Actions Secrets:
```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_id
NEXT_PUBLIC_APP_URL=https://faedly.com
```

### Firebase Hardening
- **Firestore**: Collections are isolated. `isOwner(userId)` rules guarantee that users can only access their personal progress and chat logs.
- **Storage**: Image uploads are capped at 5MB and restricted strictly to image MIME types.

---

## 🧪 Testing Strategy

Run the testing suites locally before committing:

- **Unit/Component Tests**: `npm run test` (Powered by Vitest & React Testing Library)
- **E2E Tests**: `npm run test:e2e` (Powered by Playwright testing critical paths like Auth and Quiz Submission)

**Husky & Lint-Staged**: A pre-commit hook automatically runs Prettier and ESLint on all staged files. Initialize hooks locally with: `npm run prepare`.

---

## 📈 Monitoring & Analytics Integration
To achieve production parity:
1. **Sentry**: Wrap `next.config.js` with the Sentry Webpack plugin for real-time crash reporting.
2. **PostHog**: Initialize the PostHog provider in `layout.tsx` to monitor funnel metrics (e.g., Quiz drop-off rates).

---

## 🏁 Deployment Checklist

Before announcing a new release, verify:
- [ ] Lighthouse score > 90 across all metrics.
- [ ] No Hydration mismatch warnings in the console.
- [ ] Firebase Rules deployed successfully.
- [ ] Vercel Environment variables accurately linked.
- [ ] All Vitest and Playwright suites pass.
- [ ] Domain SSL certificates provisioned automatically by Vercel.

---

*Engineered for scalability, speed, and modern EdTech excellence.*
