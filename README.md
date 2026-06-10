# 💱 ConvertX Pro - Advanced Currency Converter

![ConvertX Pro Dashboard](https://img.shields.io/badge/Status-Active-success.svg)
![React](https://img.shields.io/badge/Frontend-React%20%2B%20Vite-blue)
![Node.js](https://img.shields.io/badge/Backend-Node.js%20%2B%20Express-green)
![TailwindCSS](https://img.shields.io/badge/Styling-Tailwind%20CSS-38B2AC)
![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)

**ConvertX Pro** is a modern, production-ready full-stack Currency Converter Web Application. Built with cutting-edge web technologies, it provides users with real-time exchange rates, comprehensive market insights, and interactive data visualization for over 160 global currencies.

---

## ✨ Features

* **Real-Time Currency Conversion**: Instantly convert between 160+ global fiat currencies and cryptocurrencies (like BTC) using live, up-to-date market rates.
* **Market Insights Dashboard**: Dynamically tracks and displays the absolute strongest and weakest currencies in the market compared to a standardized baseline (USD).
* **Interactive Comparison Grid**: Dive deep into a beautifully crafted modal grid that showcases all currency rates against the USD. Includes high-resolution country flags, searchable fields, and bidirectional inverse rates.
* **Conversion History**: Automatically tracks and stores your recent conversion history locally so you never lose track of a calculation.
* **Animated & Responsive UI**: Fully responsive, glassmorphism-inspired dark mode interface engineered with `Tailwind CSS` and fluid animations powered by `Framer Motion`.
* **Robust Backend API**: A dedicated Node.js backend proxy that handles secure rate fetching, caching, and rate limiting to ensure optimal performance.

---

## 🛠️ Technology Stack

### **Frontend**
* **Framework**: React.js 18
* **Build Tool**: Vite (Lightning fast HMR)
* **Styling**: Tailwind CSS (with custom Glassmorphism utilities)
* **Animations**: Framer Motion
* **Icons & Assets**: `react-icons` & FlagCDN

### **Backend**
* **Runtime**: Node.js
* **Framework**: Express.js
* **Middleware**: CORS, Helmet (Security), Morgan (Logging)
* **Data Fetching**: Axios

---

## 🚀 Quick Start & Installation

### Prerequisites
Make sure you have **Node.js** (v18 or higher) and **npm** installed on your machine.

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/currency-converter.git
cd currency-converter
```

### 2. Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the backend development server:
   ```bash
   npm run dev
   ```
   *The backend will be running on `http://localhost:5000`*

### 3. Frontend Setup
1. Open a new terminal and navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the Vite development server:
   ```bash
   npm run dev
   ```
   *The frontend will be running on `http://localhost:5173`*

---

## 📁 Project Architecture

The application strictly separates frontend UI logic from backend business logic.

```text
CurrencyConverter/
├── backend/                  # Node.js Express API Server
│   ├── src/
│   │   ├── controllers/      # Route logic (currencyController.js)
│   │   ├── routes/           # API Endpoints (currencyRoutes.js)
│   │   ├── services/         # External API Fetching (exchangeService.js)
│   │   ├── app.js            # Express app configuration
│   │   └── server.js         # Entry point
│   └── package.json
│
├── frontend/                 # React.js SPA Client
│   ├── src/
│   │   ├── components/       # Reusable UI (MarketInsights, Modals, Navbar)
│   │   ├── services/         # API Client for Backend Communication
│   │   ├── utils/            # Helper logic (Country & Flag extraction)
│   │   ├── App.jsx           # Main Application Layout
│   │   └── index.css         # Tailwind tokens & custom CSS
│   └── package.json
└── README.md
```

---

## 🔌 API Documentation

The backend exposes a clean internal API for the frontend.

| Endpoint | Method | Description | Parameters |
| :--- | :--- | :--- | :--- |
| `/api/currencies` | `GET` | Fetches a list of all available currency codes | None |
| `/api/rates` | `GET` | Fetches the latest exchange rates | `?base=USD` |
| `/api/convert` | `POST` | Converts an amount between two currencies | `from`, `to`, `amount` |
| `/api/docs` | `GET` | Retrieves the repository README.md for the UI viewer | None |

---

## 🎨 Design Philosophy

This project prioritizes **Aesthetics & Usability**. It avoids generic templates by utilizing a meticulously crafted design system:
- **Glassmorphism**: Semi-transparent, blurred backgrounds that give a premium, desktop-like feel.
- **Dynamic Interactions**: Micro-animations applied to buttons, modals, and list items using Framer Motion to make the application feel alive and responsive.
- **Error Resilience**: Graceful error handling UI so the user is never left with a blank screen.

---

## 📄 License

This project is open-source and available under the **MIT License**. Feel free to copy, modify, and use it for your own projects!
