# QuizForge – Interactive Technical Quiz & Mock Test Platform

QuizForge is a modern, responsive single-page web application designed for computer science students and software engineers to practice timed mock tests, assess technical depth, and track performance analytics.

![QuizForge Dark UI](https://img.shields.io/badge/Theme-Dark%20Slate-0b0f19?style=for-the-badge)
![Tech Stack](https://img.shields.io/badge/Tech-HTML5%20%7C%20CSS3%20%7C%20JS%20ES6%2B-3b82f6?style=for-the-badge)
![Storage](https://img.shields.io/badge/Storage-localStorage-10b981?style=for-the-badge)

---

## 🌟 Key Features

* **9 Technical Quiz Categories**: Web Development, Data Structures & Algorithms, Python, Java, DBMS, Computer Networks, Operating Systems, Artificial Intelligence, and Quantitative Aptitude.
* **Dual Randomization**: Fisher-Yates shuffle algorithm randomizes question selection and option order every time a test is initiated.
* **Interactive Test Screen**:
  * Countdown timer with visual warning pulses and auto-submission on 00:00.
  * Question navigator palette with 5 distinct status colors.
  * Mark for Review & Clear Choice features.
  * Keyboard navigation shortcuts (`1-4`, `A-D`, `Arrows`, `M`).
* **Instant Analytics & Score Gauges**: Score breakdown, accuracy rate, time used, and animated circular performance gauges.
* **Deep Answer Review**: Itemized breakdown with user selections, correct answers, and thorough technical explanations.
* **Local History & JSON Backup**: Save past attempts in `localStorage` with options to export/import JSON history files.
* **Custom Exam Builder**: Create custom assessments with mixed topics ("Full Stack CS") and configurable timers.

---

## 🚀 Getting Started

No build tools or backend servers required! Simply open `index.html` in any web browser.

### Clone & Open

```bash
git clone <your-repository-url>
cd quizforge
```

Then open `index.html` directly in your browser.

---

## 📁 Directory Structure

```
quizforge/
├── index.html         # Main SPA entry point
├── css/
│   └── styles.css     # Deep dark theme & responsive layout styles
├── js/
│   ├── questions.js   # Structured JavaScript question bank (135+ questions)
│   ├── storage.js     # localStorage persistence & analytics engine
│   ├── quiz-engine.js # Test runtime state machine & timer countdown
│   └── app.js         # Navigation controller, Audio FX & modal manager
├── .gitignore
└── README.md
```

---

## 📄 License

Distributed under the MIT License.
