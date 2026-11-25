<img src="cat.png" alt="Cat Icon" width="400" />


# 🧠 Quantum Learning

**Quantum Learning** is a personal and open-source project inspired by Duolingo, aiming to develop a **gamified and interactive** web platform for language learning and, in the future, **quantum computing**. The central idea is to make learning more inclusive, fun, and accessible for everyone.

---

## 🎯 Overview

A gamified, Duolingo-style platform for **introductory quantum computing**, organized in three learning paths:

- Basic linear algebra
- Fundamentals of classical computing
- Introduction to quantum computing

Each lesson has short interactive challenges plus a theory page; the companion book in [`livro/`](livro/) goes deeper.
See [`docs/ROADMAP.md`](docs/ROADMAP.md) for the step-by-step plan.

---

## 🚀 Goals

- Create an engaging and motivating learning experience based on micro-lessons and rewards.
- Offer a free, open-source system accessible via web browser.
- Democratize access to quantum computing knowledge, especially in under-resourced regions.

---

## 🧰 Technologies Used

- **Next.js** 15
- **React** 19
- **TypeScript**
- **TailwindCSS**
- **Radix UI**
- **Lucide React**
- **Class Variance Authority**
- **clsx**
- **tw-animate-css**

> Backend, authentication, donation system, and database integration are still under development.

---

## 🌐 Available Languages

- 🇬🇧 English  
- 🇧🇷 Portuguese

---

## ✅ Step Checklist

### Implemented
- [x] Setup ✅
- [x] Buttons✅
- [x] Marketing Page✅
- [x] Authentication✅
- [X] Footer✅
- [X] Main Layout✅
- [X] Sidebar✅
- [X] Learn Page Wrappers✅
- [X] Drizzle & Neon (Database)✅
- [X] Courses Page✅

### In Development / Pending

- [ ] User Progress
- [ ] Seed Script
- [ ] Schema
- [ ] Units
- [ ] Lesson Button
- [ ] Course Progress
- [ ] Lesson Header
- [ ] Exit Modal
- [ ] Challenge Cards
- [ ] Challenge Footer
- [ ] Challenge Actions
- [ ] Challenge Finish Screen
- [ ] Challenge Practice
- [ ] Shop (Donation System)
- [ ] Stripe (for donations)
- [ ] Details
- [ ] Admin
- [ ] Deployment

---

## 📚 References & Credits

This project stands on the work of others. Lesson text and exercises are original, written with these sources as reference:

**Main content reference**
- Thomas G. Wong, *Introduction to Classical and Quantum Computing* (Rooted Grove, 2022) — [thomaswong.net](https://www.thomaswong.net). Lessons follow its chapters 1–3; no text is reproduced.

**Content and exercises**
- [PennyLane Codebook — Foundations of Quantum Computing](https://pennylane.ai/codebook/learning-paths/foundations-of-quantum-computing) (Xanadu)
- [Quantum-Codebooks — Xanadu Codebook notebooks](https://github.com/MonitSharma/Quantum-Codebooks/tree/main/Xanadu%20Quantum%20Codebook/Introduction) (Monit Sharma)
- Norton G. de Almeida, *Introdução à Computação e Informação Quântica* — [link](https://a.co/d/97aiWpu)
- [GIQSul Codebook](https://aprenda.quantumket.org)

**Platform and design inspiration**
- [Code With Antonio — Duolingo clone workshop](https://www.codewithantonio.com/workshops/duolingo-clone) and [repository](https://github.com/code-with-antonio/nextjs-duolingo-clone)
- [Coddy.tech](https://coddy.tech/pt) and its [Python course docs](https://coddy.tech/docs/pt/python)
- [Duolingo](https://www.duolingo.com)

**Authorship**
- The first part of the project (platform base, layout, courses, database) was built by hand by **Gubio Gomes de Lima**.
- The second part is being developed with automation help from **[Claude Code](https://claude.com/claude-code)** (Anthropic), under Gubio's direction and review.

---

## 📆 Execution Plan (Summary)

| Month | Activities |
|-------|------------|
| 1 | Technical and pedagogical planning; cloning the base version of Duolingo |
| 2 | Platform development (frontend/backend, authentication) |
| 3 | Linear Algebra Module – 10 micro-lessons |
| 4 | Classical Computing Module – 10 micro-lessons |
| 5 | Quantum Computing Module – 10 micro-lessons |
| 6 | Final tests, documentation, and beta release |

---

## 🔮 Project Future

- Platform translation to Spanish and other languages.
- Integration with tools like IBM Qiskit, Pennylane, and QuTiP.
- Mobile version development.
- Certification system for users who complete the modules.

---

## 🧪 How to Run the Project Locally

```bash
npm install
cp .env.example .env.local   # fill in Neon and Clerk keys
npm run db:push              # create tables
npm run dev
```
