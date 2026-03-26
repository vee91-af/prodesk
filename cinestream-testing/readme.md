# 🎬 Cine-Stream

A high-performance, responsive movie discovery web application built with modern frontend technologies. Cine-Stream provides a seamless "Netflix-lite" experience, allowing users to browse, search, and manage a personalized list of favorite movies.

## 🚀 Key Features

* **Dynamic Search:** Real-time movie filtering based on user input.
* **Global State Management:** Fast and reliable "Favorites" list managed without prop-drilling.
* **Responsive UI:** Clean, modern interface optimized for all screen sizes.
* **Enterprise-Grade Reliability:** Core business logic is backed by a robust automated testing suite.

## 🛠️ Tech Stack

* **Framework:** Next.js / React
* **State Management:** Zustand
* **Styling:** CSS / Tailwind (Adjust if you used standard CSS)
* **Testing:** Vitest, React Testing Library, jsdom

---

## 🧪 The Testing Suite (Vitest)

Reliability is a core focus of this project. The application features a comprehensive automated testing suite focusing on component integration, user interaction, and state management.

**Testing Highlights:**
* Achieved **>85% overall statement coverage**.
* 100% coverage on critical user-input components (SearchBar).
* Implemented **Interaction Testing** utilizing `@testing-library/user-event` to simulate real human keystrokes and clicks.
* Successfully **mocked global Zustand stores** (`vi.mock`) to ensure component tests remain fast, isolated, and completely independent of the global state.

---

<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/a7b37472-9bdf-48ee-8490-08641ad4beb2" />



## 💻 Running the Project Locally

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed on your machine.

### Installation & Setup
1. Clone the repository:
   ```bash
   git clone [https://github.com/yourusername/cine-stream.git](https://github.com/yourusername/cine-stream.git)
