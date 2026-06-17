# Parisatva — Precision Fermentation & Biotech

A React.js rewrite of the Parisatva website.

## Tech Stack

- **React 18** — component-based UI
- **CSS Custom Properties** — theme tokens from the original Tailwind config
- **WebGL Shader** — organic animated hero background
- **Three.js** — floating cellular 3D overlay in the hero
- **Material Symbols** — Google icon font

## Project Structure

```
src/
├── components/
│   ├── NavBar.jsx       # Fixed top navigation
│   ├── Hero.jsx         # Full-screen hero with WebGL + Three.js
│   ├── About.jsx        # About / foundation section
│   ├── Science.jsx      # Three science cards
│   ├── Technology.jsx   # 5-step process architecture
│   └── Sections.jsx     # Metrics, Sustainability, Research, Contact, Footer
├── App.jsx              # Root component + scroll animations
├── index.js             # ReactDOM entry
└── index.css            # Global styles & CSS variables
```

## Getting Started

```bash
npm install
npm start
```

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Build

```bash
npm run build
```
