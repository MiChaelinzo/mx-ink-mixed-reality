# 🧬 MolecuSculpt

**Surgery at the Molecular Scale**

MolecuSculpt is an innovative mixed reality surgical training platform that leverages the precision of Logitech MX Ink and Meta Quest to deliver nanoscale medical education. This interactive pitch deck showcases the revolutionary approach to surgical training through molecular-level visualization and haptic precision.

[![Built with Spark](https://img.shields.io/badge/Built%20with-Spark-blue)](https://github.com/features/spark)
[![React](https://img.shields.io/badge/React-19.2-61dafb?logo=react)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-3178c6?logo=typescript)](https://www.typescriptlang.org)
[![Three.js](https://img.shields.io/badge/Three.js-0.175-000000?logo=three.js)](https://threejs.org)

---

## 🎯 Overview

MolecuSculpt transforms medical education through:

- **Nanoscale Precision Training** with MX Ink's sub-millimeter accuracy
- **Interactive 3D Molecular Visualization** using WebGL and Three.js
- **Real-time Performance Analytics** with comprehensive skill tracking
- **Gamified Learning System** with achievements and progress milestones
- **Comprehensive Case Library** covering thousands of surgical scenarios
- **ROI Calculator** demonstrating measurable training efficiency gains

---

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm
- Modern browser with WebGL support

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

The application will be available at `http://localhost:5173`

---

## 🏗️ Architecture

### Technology Stack

| Category | Technologies |
|----------|-------------|
| **Framework** | React 19.2 with TypeScript |
| **3D Graphics** | Three.js for molecular visualization |
| **UI Components** | Shadcn/ui (Radix UI primitives) |
| **Styling** | Tailwind CSS 4.1 with custom theme |
| **Animation** | Framer Motion for smooth transitions |
| **Icons** | Phosphor Icons React |
| **Charts** | Recharts for data visualization |
| **State Management** | React hooks + Spark KV persistence |
| **Build Tool** | Vite 7.2 |

### Project Structure

```
src/
├── components/           # React components
│   ├── ui/              # Shadcn UI components (40+ pre-installed)
│   ├── AchievementSystem.tsx
│   ├── CaseLibrary.tsx
│   ├── ComparisonTool.tsx
│   ├── MoleculeViewer.tsx       # Three.js molecular visualization
│   ├── PerformanceDashboard.tsx
│   ├── PricingSection.tsx
│   ├── ROICalculator.tsx
│   ├── TestimonialsSection.tsx
│   └── TrainingSimulator.tsx
├── hooks/               # Custom React hooks
│   └── use-mobile.ts
├── lib/                 # Utility functions
│   └── utils.ts
├── styles/              # Additional styling
├── App.tsx             # Main application component
├── index.css           # Theme and global styles
└── main.tsx            # Application entry point
```

---

## ✨ Key Features

### 1. **Interactive Molecule Viewer**

Real-time 3D visualization of complex molecular structures:
- DNA Fragment (double helix)
- Hemoglobin Protein (oxygen transport)
- Insulin Hormone (glucose regulation)
- Catalase Enzyme (active site)

**Technologies:** Three.js WebGL renderer, dynamic lighting, mouse-controlled camera

### 2. **Training Simulator**

Hands-on surgical training with:
- Real-time precision tracking
- Interactive tool controls
- Performance scoring
- Multiple procedure types

### 3. **Analytics Dashboard**

Comprehensive performance metrics:
- Skill progression tracking
- Comparative benchmarks
- Exportable reports
- Trend analysis

### 4. **Case Library**

Searchable catalog featuring:
- Filterable by specialty, difficulty, duration
- Detailed procedure previews
- Save/favorite functionality
- Thousands of scenarios

### 5. **Achievement System**

Gamified learning with:
- Unlockable badges
- Skill milestones
- Progress visualization
- Leaderboard rankings

### 6. **ROI Calculator**

Interactive financial tool showing:
- Cost savings analysis
- Training efficiency gains
- Breakeven calculations
- Downloadable reports

---

## 🎨 Design System

### Color Palette

Built with OKLCH color space for perceptual uniformity:

```css
--primary: oklch(0.65 0.15 195)      /* Molecular Teal */
--secondary: oklch(0.25 0.08 250)    /* Deep Space Navy */
--accent: oklch(0.75 0.18 210)       /* Holographic Cyan */
--background: oklch(0.98 0.005 200)  /* Clinical White */
--foreground: oklch(0.25 0.08 250)   /* Deep Space Navy */
```

### Typography

- **Headings:** Space Grotesk (Geometric Sans) - Technical precision
- **Body:** Inter (Humanist Sans) - Clinical readability
- **Hierarchy:** 56px/36px/24px/16px/14px

### Animation Principles

- **Molecular Rotation:** 5-second continuous loops
- **Statistics Count-Up:** Eased number animations
- **Card Reveals:** Staggered fade-in-up (80ms delays)
- **Hover States:** 200ms lift with shadow expansion
- **Scroll Effects:** Parallax background motion

---

## 🛠️ Development

### Available Scripts

```bash
npm run dev       # Start development server
npm run build     # Build for production
npm run preview   # Preview production build
npm run lint      # Run ESLint
npm run optimize  # Optimize dependencies
```

### Environment

The application uses the Spark runtime SDK for:
- **Persistence:** `useKV` hook for data storage
- **LLM Integration:** `spark.llm` for AI features
- **User Context:** `spark.user()` for authentication

### Component Development

All UI components follow Shadcn patterns:

```tsx
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

export function MyComponent() {
  return (
    <Card className="p-6">
      <Button variant="default">Action</Button>
    </Card>
  )
}
```

---

## 📦 Dependencies

### Core Libraries

- **react** (19.2.0) - UI framework
- **three** (0.175.0) - 3D graphics
- **framer-motion** (12.23.25) - Animations
- **@phosphor-icons/react** (2.1.10) - Icon system
- **tailwindcss** (4.1.17) - Utility-first CSS

### UI Components

- **@radix-ui/react-*** - Accessible primitives
- **sonner** - Toast notifications
- **recharts** - Data visualization
- **cmdk** - Command palette

See [package.json](./package.json) for complete list.

---

## 🌐 Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 15+
- WebGL 2.0 required for 3D features

---

## 📱 Responsive Design

Mobile-first approach with breakpoints:
- **Mobile:** < 768px (single column, simplified animations)
- **Tablet:** 768px - 1024px (2 columns, reduced effects)
- **Desktop:** 1024px+ (full features, 3-4 columns)

Touch targets minimum 44px for accessibility.

---

## ♿ Accessibility

- Full keyboard navigation support
- ARIA labels on interactive elements
- WCAG AA contrast ratios (4.5:1 minimum)
- Reduced motion preference respected
- Screen reader compatible

---

## 📄 Documentation

- **[PRD.md](./PRD.md)** - Complete product requirements
- **[Components](./src/components/)** - Component source code
- **[Spark SDK Docs](https://github.com/github/spark)** - Runtime API reference

---

## 🤝 Contributing

This is a demonstration project for the Logitech MX Ink Innovation Challenge. For questions or feedback:

- 📧 Email: hello@molecusculpt.io
- 📍 Location: San Francisco, CA
- 🏆 Status: Meta Quest Developer Challenge Finalist

---

## 📜 License

### Application Code
This MolecuSculpt demonstration is provided as-is for educational and demonstration purposes.

### Spark Template Resources
The Spark Template files and resources from GitHub are licensed under the terms of the MIT license, Copyright GitHub, Inc.

---

## 🙏 Acknowledgments

Built with:
- **Logitech MX Ink** - Precision stylus technology
- **Meta Quest** - Mixed reality platform
- **GitHub Spark** - Development framework
- **Shadcn/ui** - Component library
- **Three.js Community** - 3D visualization tools

---

**MolecuSculpt** - *Transforming surgical training through molecular-scale precision*
