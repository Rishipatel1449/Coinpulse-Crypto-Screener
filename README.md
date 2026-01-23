
# <div align="center">CoinPulse </div>

<div align="center">
  <img src="public/logo.svg" alt="CoinPulse Logo" width="200" />
  
  ### The Ultimate Real-Time Crypto Screener & Explorer
  
  ![Next.js](https://img.shields.io/badge/Next.js-14_App_Router-black?style=for-the-badge&logo=next.js&logoColor=white)
  ![React](https://img.shields.io/badge/React-19-blue?style=for-the-badge&logo=react&logoColor=white)
  ![TypeScript](https://img.shields.io/badge/TypeScript-5.0-student?style=for-the-badge&logo=typescript&logoColor=white)
  ![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

  [Features](#-features) • [Tech Stack](#-tech-stack) • [Getting Started](#-getting-started) • [Contributing](#-contributing)
</div>

---

## 🚀 Overview

**CoinPulse** is a cutting-edge cryptocurrency screener designed to provide traders and enthusiasts with real-time market data, interactive charts, and deep insights into the crypto world. Built with performance and aesthetics in mind, it offers a seamless, "live-like" experience even on free API tiers thanks to intelligent polling architectures.

Whether you're tracking Bitcoin's hour-by-hour movement or hunting for the next gem via global search, CoinPulse delivers the data you need with the speed you expect.

## ✨ Features

### 🔍 Global Instant Search
Find any coin instantly with our globally accessible, debounced search modal. Just hit `Search` in the nav and type away.
- **Debounced Functionality**: Optimized API calls for smooth typing.
- **Keyboard Navigation**: Fully accessible interaction.

### 📈 Live-Like Market Data
Experience real-time updates without the cost of WebSocket APIs.
- **Smart Polling**: Custom hooks poll price data every 30s and OHLC data every 60s.
- **Dynamic visual indicators**: Green/Red flashes for price movement direction.

### 📊 Professional Interactive Charts
Analyze trends like a pro with integrated TradingView-style charts.
- **Lightweight Charts**: High-performance, touch-responsive financial charts.
- **Multi-Timeframe**: Switch seamlessly between 1D, 1W, 1M, and more.
- **Candlestick & Volume layers**: Detailed market structure visualization.

### 💎 Coin Details Deep Dive
Every coin has a dedicated home.
- **Key Metrics**: Market Cap, 24h Volume, Circulating Supply, and Rank.
- **Related Links**: Direct access to homepage, blockchain explorers, and community forums.
- **Exchange Listings**: See where the action is happening.

## 🛠 Tech Stack

Built on the bleeding edge of modern web development:

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/) for robust type safety.
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) with `tailwindcss-animate`.
- **UI Components**: [Shadcn UI](https://ui.shadcn.com/) (Radix Primitives) for accessible, beautiful components.
- **Charting**: [Lightweight Charts](https://tradingview.github.io/lightweight-charts/) by TradingView.
- **Data Fetching**: Server Actions & Custom React Hooks (`useCoinGeckoWebSocket` poll-mode).
- **Icons**: [Lucide React](https://lucide.dev/).

## ⚡ Getting Started

Clone the repository and spin up your local instance in seconds.

### Prerequisites
- Node.js 18+
- npm or pnpm

### Installation

1.  **Clone the repo**
    ```bash
    git clone https://github.com/Rishipatel1449/Coinpulse-Crypto-Screener.git
    cd coinpulse
    ```

2.  **Install dependencies**
    ```bash
    npm install
    # or
    pnpm install
    ```

3.  **Configure Environment**
    Create a `.env.local` file in the root directory and add your CoinGecko API keys (Demo keys work perfectly!):
    ```env
    COINGECKO_API_KEY=your_api_key_here
    COINGECKO_BASE_URL=https://api.coingecko.com/api/v3
    NEXT_PUBLIC_COINGECKO_API_KEY=your_api_key_here
    NEXT_PUBLIC_COINGECKO_WEBSOCKET_URL=wss://ws.coingecko.com/bitcoin/
    ```

4.  **Run Development Server**
    ```bash
    npm run dev
    ```

    Open [http://localhost:3000](http://localhost:3000) to see the app in action!

## 📸 Screenshots

<div align="center">
  <!-- Add your screenshots here -->
  <br/>
  <i>Impressive dashboard view coming soon...</i>
</div>

## 🤝 Contributing

Contributions make the open-source community an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1.  Fork the Project
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the Branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

## 📄 License

Javascript Mastery 

---

<div align="center">
  Made with ❤️ by Rishi Patel abd inspired by Javascript mastery
</div>
