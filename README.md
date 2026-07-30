# 🎬 Cinematic Scrollytelling Developer Portfolio (2026 Edition)

An open-source, award-winning style interactive developer portfolio featuring **HTML5 Canvas 60FPS image-sequence scrubbing**, **Clash Display typography**, **dark-mode film grain overlays**, and responsive project showcases. Built with Next.js 16 (App Router), Tailwind CSS v4, and Framer Motion.

---

## ✨ Features

- **🎞️ Canvas Sequence Scrollytelling**: High-performance 60FPS image sequence scrubber attached to scroll progress.
- **🖋️ Distinctive Typography System**:
  - **Display Headlines**: Clash Display (Fontshare)
  - **Body Copy**: Geist Sans
  - **Code & Micro Labels**: Geist Mono
- **🍿 Cinematic Vignette & Grain**: Built-in SVG noise filter overlay and radial dark scrim for crisp text contrast.
- **💼 Interactive Work Grid**: Category filter pills (`All`, `AI Developer Tools`, `Browser Extension`, `Backend Architecture`, etc.) with responsive card layouts.
- **⚡ Highly Performant**: Next.js 16 static optimization, self-hosted fonts, asset preloading, and requestAnimationFrame canvas rendering.
- **📱 Fully Responsive**: Custom mobile breakpoints with viewport height stabilization (`100dvh`).

---

## 🚀 Quick Start

### 1. Prerequisites

Make sure you have **Node.js 18+** installed on your system.

```bash
node -v
npm -v
```

### 2. Clone the Repository

```bash
git clone https://github.com/JeevaVenkidu/awwwards-style-portfolio-2026.git
cd awwwards-style-portfolio-2026
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the portfolio.

---

## 🛠️ Customization Guide

### 1. Update Personal & Metadata Information

Edit `app/layout.tsx` to update your website title, meta description, and SEO open-graph properties:

```tsx
export const metadata: Metadata = {
  title: "Your Name — Software Engineer",
  description: "Personal Scrollytelling Portfolio of Your Name.",
  // ...
};
```

### 2. Customize Hero Story & Scenes

Edit `components/Overlay.tsx` to modify the intro copy, titles, subtitles, and scroll section keyframes:

```tsx
const SECTIONS = [
  {
    fadeIn: 0.10,
    holdStart: 0.15,
    holdEnd: 0.22,
    fadeOut: 0.30,
    align: "left",
    eyebrow: "02 — ORIGIN",
    title: "Your Title Here",
    subtitle: "Your short description here.",
  },
  // Add or modify scenes...
];
```

### 3. Update Projects & Case Studies

Edit `components/Projects.tsx` and update the `PROJECTS` array with your real open-source repositories and production apps:

```tsx
const PROJECTS: Project[] = [
  {
    id: "my-project",
    title: "My Awesome Project",
    subtitle: "Short Tagline",
    category: "AI Developer Tools",
    description: "Detailed description of what you built...",
    highlights: ["Feature 1", "Feature 2", "Feature 3"],
    tech: ["TypeScript", "Next.js", "Tailwind CSS"],
    githubUrl: "https://github.com/your-username/my-project",
    liveUrl: "https://my-project.vercel.app",
    metrics: "10k+ Downloads",
    gradient: "from-cyan-500/20 via-blue-500/10 to-transparent",
  },
];
```

### 4. Sequence Images

Frame sequence PNG files are located in `/public/sequence/`. You can replace these images with your own 3D rotation, camera sweep, or portrait sequence. Update `lib/sequenceFiles.ts` if your file naming format or frame count changes.

---

## 📦 Project Structure

```
├── app/
│   ├── globals.css        # Tailwind v4 imports, custom grain & scrim utilities
│   ├── layout.tsx         # Root layout with Clash Display & Geist fonts
│   └── page.tsx           # Home entry page
├── components/
│   ├── AboutContact.tsx   # About me section & social links
│   ├── Footer.tsx         # Bottom footer component
│   ├── Navbar.tsx         # Fixed navigation header with progress indicator
│   ├── Overlay.tsx        # Cinematic full-bleed text overlays & HUD
│   ├── Projects.tsx       # Interactive project grid & category filter
│   ├── ScrollyCanvas.tsx  # HTML5 Canvas image sequence scrubber
│   └── icons.tsx          # Custom SVG icon set
├── public/
│   ├── fonts/             # Self-hosted Clash Display woff2 font files
│   └── sequence/          # 120-frame image sequence PNGs
└── lib/
    └── sequenceFiles.ts   # Sequence file path mapping
```

---

## ⚡ Deployment

### Deploy on Vercel (Recommended)

The easiest way to deploy this Next.js project is using [Vercel](https://vercel.com/):

1. Push your code to GitHub.
2. Import your repository into [Vercel Dashboard](https://vercel.com/new).
3. Vercel will automatically detect Next.js and deploy your application.

```bash
npx vercel
```

---

## 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details. You are free to use, modify, and distribute it for personal or commercial portfolios.
# -cinematic-developer-portfolio-2026
