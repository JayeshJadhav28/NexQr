<div align="center">

<!-- LOGO / BANNER -->
<img src="public/favicon.svg" alt="NexQR Logo" width="80" height="80" />

# ⬛ NexQR

### Modern QR Code Generator — Fast, Free & Fully Customizable

[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Netlify](https://img.shields.io/badge/Deployed-Netlify-00C7B7?style=for-the-badge&logo=netlify&logoColor=white)](https://nexqr-generator.windsurf.build/)
[![License](https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge)](LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-Welcome-brightgreen?style=for-the-badge)](https://github.com/JayeshJadhav28/NexQr/pulls)

<br/>

**[🚀 Live Demo](https://nexqr-generator.windsurf.build/) · [🐛 Report Bug](https://github.com/JayeshJadhav28/NexQr/issues) · [✨ Request Feature](https://github.com/JayeshJadhav28/NexQr/issues)**

<br/>

<!-- DEMO GIF — Replace with actual screenshot/GIF -->
<img src="https://placehold.co/900x500/0f172a/38bdf8?text=NexQR+Demo+Screenshot" alt="NexQR Demo" width="90%" style="border-radius: 12px;" />

</div>

---

## 📌 Table of Contents

- [About](#-about)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Getting Started](#-getting-started)
- [Project Structure](#-project-structure)
- [Deployment](#-deployment)
- [Contributing](#-contributing)
- [Author](#-author)

---

## 🧠 About

**NexQR** is a sleek, modern QR code generator built for speed and simplicity. Whether you're a developer, marketer, or just need a quick QR code — NexQR gets it done instantly, right in your browser. No sign-up. No fluff. Just QR.

> Generate → Customize → Download. That's it.

---

## ✨ Features

| Feature | Description |
|---|---|
| ⚡ **Instant Generation** | QR codes render in real-time as you type |
| 🎨 **Custom Styling** | Personalize colors, size, and error correction level |
| 📥 **One-Click Download** | Export your QR code as a high-quality PNG/SVG |
| 📱 **Fully Responsive** | Mobile-first design with a dedicated mobile nav |
| 🌐 **Multi-use Support** | URLs, plain text, emails, phone numbers & more |
| 🚀 **Zero Backend** | Runs 100% client-side — fast & private |

---

## 🛠 Tech Stack

<div align="center">

| Layer | Technology |
|---|---|
| **Framework** | [Next.js 15](https://nextjs.org/) (App Router) |
| **Language** | [TypeScript](https://www.typescriptlang.org/) |
| **Styling** | [Tailwind CSS](https://tailwindcss.com/) |
| **Linting** | [ESLint](https://eslint.org/) |
| **Deployment** | [Netlify](https://netlify.com/) |

</div>

---

## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed:

```bash
node  >= 18.x
npm   >= 9.x
```

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/JayeshJadhav28/NexQr.git

# 2. Navigate into the project
cd NexQr

# 3. Install dependencies
npm install

# 4. Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser. 🎉

### Available Scripts

```bash
npm run dev        # Start development server
npm run build      # Build for production
npm run start      # Run production build locally
npm run lint       # Run ESLint
```

---

## 📁 Project Structure

```
NexQr/
├── public/                  # Static assets & SVG illustrations
│   └── illustrations/       # Feature section SVGs
├── src/
│   ├── app/                 # Next.js App Router pages
│   │   ├── page.tsx         # Home — QR Generator
│   │   ├── about/           # About page
│   │   ├── how-to-use/      # How-to-use guide page
│   │   └── layout.tsx       # Root layout & metadata
│   ├── components/          # Reusable UI components
│   │   ├── Header.tsx
│   │   ├── MobileNavigation.tsx
│   │   ├── ClientMobileNavWrapper.tsx
│   │   └── QRCodeGenerator.tsx   # ⭐ Core feature component
│   └── context/             # React Context (global state)
├── netlify.toml             # Netlify deployment config
├── next.config.ts           # Next.js configuration
└── tsconfig.json            # TypeScript configuration
```

---

## 🌍 Deployment

NexQR is deployed on **Netlify** with automatic CI/CD from the main branch.

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/JayeshJadhav28/NexQr)

To deploy your own instance:

```bash
# Build the project
npm run build

# Deploy via Netlify CLI
npx netlify deploy --prod --dir=.next
```

---

## 🤝 Contributing

Contributions are always welcome!

```bash
# Fork the repo, then:
git checkout -b feature/your-feature-name
git commit -m "feat: add your feature"
git push origin feature/your-feature-name
# Open a Pull Request 🚀
```

Please follow [Conventional Commits](https://www.conventionalcommits.org/) for commit messages.

---

## 👤 Author

**Jayesh Jadhav**

[![GitHub](https://img.shields.io/badge/GitHub-JayeshJadhav28-181717?style=flat-square&logo=github)](https://github.com/JayeshJadhav28)

---

<div align="center">

⭐ **If NexQR helped you, consider giving it a star!** ⭐

Made with ❤️ and Next.js

</div>