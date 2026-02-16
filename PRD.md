# Planning Guide

A dynamic interactive pitch deck showcasing "MolecuSculpt" - a revolutionary molecular surgery training platform that leverages the MX Ink stylus for nanoscale precision in mixed reality medical education.

**Experience Qualities**:
1. **Visionary** - Presents cutting-edge technology in a way that feels both futuristic and immediately achievable
2. **Precise** - Every interaction and visual element conveys the accuracy and control that MX Ink enables at the molecular level
3. **Inspiring** - Sparks imagination about the transformative potential for medical training and patient outcomes

**Complexity Level**: Complex Application (advanced functionality, likely with multiple views)
- This is an immersive, interactive pitch platform featuring a surgical training simulator, performance analytics dashboard, case library management, gamification system, ROI calculator, and dynamic 3D molecular visualizations with state persistence and real-time data

## Essential Features

### Hero Section with 3D Visualization
- **Functionality**: Animated hero with rotating molecular structure and compelling tagline
- **Purpose**: Immediately capture attention and communicate the app's core innovation
- **Trigger**: Page load
- **Progression**: Fade in title → Animate molecular structure → Reveal CTA buttons → Enable scroll
- **Success criteria**: Under 2 seconds to full interactivity, smooth 60fps animations

### Interactive Problem Statement
- **Functionality**: Animated statistics revealing the gap in surgical training
- **Purpose**: Establish market need and opportunity size
- **Trigger**: Scroll into viewport
- **Progression**: User scrolls → Statistics count up → Pain points highlight → Solution preview appears
- **Success criteria**: Numbers animate smoothly, content is scannable in 10 seconds

### The Solution: MolecuSculpt Demo
- **Functionality**: Interactive 3D molecular visualization using Three.js with real-time controls and multiple complex molecular structures (DNA, Hemoglobin protein, Insulin hormone, Catalase enzyme)
- **Purpose**: Demonstrate the actual molecular-scale precision and MX Ink integration capabilities across different biological structures
- **Trigger**: User reaches section, molecule automatically begins rotating
- **Progression**: Section scrolls into view → 3D molecule renders and rotates → User can select different molecules via buttons → User can hover to manually control rotation → Playback controls adjust speed → Element legend identifies molecular structure with elements including Carbon, Nitrogen, Oxygen, Phosphorus, Sulfur, and Iron
- **Success criteria**: 60fps smooth rendering, responsive mouse interaction, seamless molecule switching, clear visual hierarchy, works across devices

### Technology Stack Showcase
- **Functionality**: Interactive cards displaying MX Ink capabilities
- **Purpose**: Prove technical feasibility and highlight stylus features
- **Trigger**: Hover or tap on feature cards
- **Progression**: User hovers card → Card expands → Technical specs reveal → Related features suggest
- **Success criteria**: Immediate feedback (<100ms), clear information hierarchy

### Market Opportunity
- **Functionality**: Animated charts showing TAM/SAM/SOM
- **Purpose**: Validate business case with data
- **Trigger**: Section enters viewport
- **Progression**: Chart animates in → Key figures highlight → Market segments breakdown → Revenue projections display
- **Success criteria**: Data is credible and instantly digestible

### Team & Credentials
- **Functionality**: Profile cards with expertise areas
- **Purpose**: Build credibility through team qualifications
- **Trigger**: Scroll or direct navigation
- **Progression**: Cards fade in staggered → Hover reveals details → Credentials display
- **Success criteria**: Professional presentation, clear expertise mapping

### Interactive Training Simulator
- **Functionality**: Hands-on demo with surgical tool controls, precision tracking, and real-time feedback
- **Purpose**: Let users experience the MX Ink precision firsthand through interactive scenarios
- **Trigger**: User clicks "Try Simulator" button
- **Progression**: Simulator loads → User selects procedure → Tool control UI appears → User performs actions → Real-time precision metrics display → Performance score calculated
- **Success criteria**: Responsive controls (<50ms latency), intuitive UI, accurate hit detection

### Performance Analytics Dashboard
- **Functionality**: Real-time metrics showing training effectiveness, skill progression, and comparative benchmarks
- **Purpose**: Demonstrate measurable training outcomes and ROI
- **Trigger**: Auto-loads with sample data, updates live during simulator use
- **Progression**: Dashboard appears → Animated charts populate → Key metrics highlight → Trend analysis shows → Export option available
- **Success criteria**: Clear data visualization, intuitive insights, mobile-responsive

### Case Library Browser
- **Functionality**: Searchable, filterable catalog of surgical scenarios and procedures
- **Purpose**: Showcase the breadth of training content available
- **Trigger**: User navigates to library section or clicks "Browse Cases"
- **Progression**: Grid view loads → User applies filters (specialty, difficulty, duration) → Cases display with previews → Click opens detailed view → Save/favorite functionality
- **Success criteria**: Fast search, smooth filtering, clear categorization

### Achievement & Progress System
- **Functionality**: Gamified learning with badges, milestones, and skill trees
- **Purpose**: Drive engagement and motivation through visible progress
- **Trigger**: Actions in simulator, completed cases, time spent training
- **Progression**: User completes action → Achievement notification appears → Badge added to profile → Progress bar updates → Next milestone previewed
- **Success criteria**: Satisfying animations, clear progression path, meaningful rewards

### Training Comparison Tool
- **Functionality**: Side-by-side comparison of traditional training vs MolecuSculpt outcomes
- **Purpose**: Visualize the advantages through data-driven comparison
- **Trigger**: User clicks "Compare Methods"
- **Progression**: Split screen appears → Metrics populate on both sides → Key differences highlight → Cost/time savings calculate → Success rates compare
- **Success criteria**: Clear visual contrast, compelling data presentation

### ROI Calculator
- **Functionality**: Interactive calculator showing cost savings and training efficiency gains
- **Purpose**: Help decision-makers justify investment
- **Trigger**: User inputs institution size, current training costs, student count
- **Progression**: User enters data → Calculations run → Results animate in → Breakeven analysis shows → Downloadable report generates
- **Success criteria**: Realistic calculations, professional presentation, shareable output

### Live Collaboration Indicator
- **Functionality**: Show real-time multi-user training capabilities
- **Purpose**: Highlight the platform's collaborative features
- **Trigger**: Simulated in demo mode
- **Progression**: User avatars appear → Actions sync in real-time → Chat/annotation tools visible → Instructor controls demonstrated
- **Success criteria**: Smooth animations, clear communication tools

### Testimonials & Social Proof
- **Functionality**: Animated testimonial carousel with video/text options
- **Purpose**: Build trust through real user experiences
- **Trigger**: Auto-plays on scroll into view
- **Progression**: Testimonial fades in → Quote displays → Source credentials show → Next testimonial preview appears → User can navigate
- **Success criteria**: Credible sources, authentic presentation

### Pricing & Packages
- **Functionality**: Interactive pricing tiers with feature comparison
- **Purpose**: Provide clear path to purchase for different segments
- **Trigger**: User scrolls to pricing section
- **Progression**: Tiers appear → User toggles billing period → Feature comparison expands → Custom quote CTA available
- **Success criteria**: Transparent pricing, clear differentiation

### Call to Action
- **Functionality**: Contact form or meeting scheduler integration
- **Purpose**: Convert interest into concrete next steps
- **Trigger**: Reached end of pitch or CTA button click
- **Progression**: User clicks CTA → Form/calendar appears → User submits → Confirmation with next steps
- **Success criteria**: Low friction, clear value exchange, mobile-friendly

## Edge Case Handling

- **Slow Connection**: Progressive loading with skeleton screens for images, core content visible immediately
- **No JavaScript**: Graceful degradation with static content, core pitch visible without interactions
- **Small Screens**: Mobile-first responsive design, simplified animations on mobile to preserve performance
- **Accessibility**: Full keyboard navigation, ARIA labels, sufficient color contrast, reduced motion preference respected
- **Browser Compatibility**: Fallbacks for advanced CSS features, tested in modern browsers

## Design Direction

The design should evoke clinical precision meets cutting-edge innovation - like a surgical instrument designed by a tech company. Clean, sterile whites balanced with holographic teals and deep space blues. Every element should feel engineered, precise, and trustworthy while maintaining warmth through organic molecular shapes and fluid animations.

## Color Selection

A sophisticated palette balancing medical sterility with technological innovation, using molecular teal as the signature color.

- **Primary Color**: Molecular Teal `oklch(0.65 0.15 195)` - Represents precision technology, innovation, and the microscopic world. Evokes trust and cutting-edge science.
- **Secondary Colors**: 
  - Deep Space Navy `oklch(0.25 0.08 250)` - Grounding color for backgrounds and major sections, provides depth
  - Clinical White `oklch(0.98 0.005 200)` - Ultra-clean backgrounds with a subtle cool tint
  - Surgical Steel `oklch(0.55 0.02 240)` - Muted elements and borders
- **Accent Color**: Holographic Cyan `oklch(0.75 0.18 210)` - Attention-grabbing for CTAs, highlights, and interactive elements
- **Foreground/Background Pairings**:
  - Deep Space Navy (oklch(0.25 0.08 250)): Clinical White text (oklch(0.98 0.005 200)) - Ratio 12.8:1 ✓
  - Molecular Teal (oklch(0.65 0.15 195)): Clinical White text (oklch(0.98 0.005 200)) - Ratio 5.2:1 ✓
  - Clinical White (oklch(0.98 0.005 200)): Deep Space Navy text (oklch(0.25 0.08 250)) - Ratio 12.8:1 ✓
  - Holographic Cyan (oklch(0.75 0.18 210)): Deep Space Navy text (oklch(0.25 0.08 250)) - Ratio 6.1:1 ✓

## Font Selection

Typography should convey precision engineering and medical authority while remaining approachable - combining a technical geometric sans for headings with a clinical humanist sans for body text.

- **Typographic Hierarchy**:
  - H1 (Main Headline): Space Grotesk Bold / 56px / -0.02em letter spacing / 1.1 line height - Command attention with technical confidence
  - H2 (Section Headers): Space Grotesk Bold / 36px / -0.01em / 1.2 - Clear section delineation
  - H3 (Feature Titles): Space Grotesk SemiBold / 24px / 0em / 1.3 - Precise labeling
  - Body (Descriptions): Inter Regular / 16px / 0em / 1.6 - Clinical clarity and readability
  - Caption (Stats/Small): Inter Medium / 14px / 0.01em / 1.4 - Technical precision
  - CTA Buttons: Space Grotesk Bold / 16px / 0.02em / 1 - Confident action prompts

## Animations

Animations should feel like precision instruments engaging - smooth, purposeful, with a sense of molecular-scale accuracy. Every motion reinforces the theme of surgical precision.

Core animation principles:
- **Molecular Rotation**: Continuous slow rotation of 3D molecular structures in hero (5-second loop)
- **Statistics Count-Up**: Numbers animate from 0 to target with easing, feeling calculated and precise
- **Card Reveals**: Staggered fade-in-up with 80ms delays, smooth spring physics
- **Hover States**: Subtle lift with soft shadow expansion (200ms cubic-bezier), suggesting depth
- **Section Transitions**: Parallax scrolling effects with background elements moving at 0.5x speed
- **CTA Pulse**: Gentle scale pulse (100%-102%-100%) on primary button to draw attention without being distracting

## Component Selection

- **Components**:
  - **Button**: Primary CTAs with gradient backgrounds and hover lift effects
  - **Card**: Feature cards with hover effects and expand interactions - modified with backdrop blur for glassmorphism
  - **Tabs**: Navigation between pitch sections - styled with active indicators and smooth transitions
  - **Badge**: Highlighting key metrics and features - rounded with vibrant colors
  - **Separator**: Dividing major sections - subtle gradient fades
  - **Scroll Area**: Smooth scrolling for content sections on mobile
  - **Dialog**: Expanded feature details or video player overlay
  
- **Customizations**:
  - **3D Molecular Viewer**: Custom Three.js component rendering interactive complex molecular structures with WebGL, featuring dynamic lighting, particle effects, mouse-based camera controls, and multiple selectable molecules:
    - **DNA Fragment**: Double helix structure showing base pairs and phosphate backbone
    - **Hemoglobin Protein**: Oxygen-carrying protein with iron-containing heme groups
    - **Insulin Hormone**: Peptide hormone structure regulating glucose metabolism
    - **Catalase Enzyme**: Active site showing enzyme that breaks down hydrogen peroxide
  - **Animated Counter**: Custom hook for counting animations on statistics
  - **Progress Indicator**: Vertical timeline showing pitch progress as user scrolls
  - **Feature Spotlight**: Animated spotlight effect following cursor over feature grid
  
- **States**:
  - Buttons: Default has gradient, hover lifts with shadow, active slightly depresses, disabled grays out
  - Cards: Default flat, hover lifts and glows with teal border, active state for selected features
  - Inputs (if contact form): Focused shows teal ring, valid shows subtle check, error shows warning with message
  
- **Icon Selection**:
  - **Atom** (PhosphorIcon): Molecular structures and science
  - **Dna**: DNA and genetic structures
  - **Drop**: Hemoglobin and blood proteins
  - **Pill**: Insulin and hormones
  - **Lightning**: Catalase and enzyme activity
  - **CubeFocus**: Precision targeting and MX Ink accuracy
  - **ChartLine**: Market data and growth metrics
  - **Users**: Team and collaboration features
  - **ArrowRight**: CTAs and forward progression
  - **Play**: Video demonstrations
  - **CheckCircle**: Feature benefits and validations
  - **Sparkle**: Innovation and cutting-edge features
  
- **Spacing**:
  - Section padding: py-24 md:py-32 (96px-128px vertical)
  - Card padding: p-6 (24px)
  - Grid gaps: gap-6 md:gap-8 (24px-32px)
  - Text spacing: space-y-4 for content blocks (16px)
  - Container max-width: max-w-7xl (1280px)
  
- **Mobile**:
  - Hero: Single column, reduced font sizes (H1: 36px), full-width CTA buttons stacked
  - Feature Grid: 1 column on mobile, 2 on tablet, 3-4 on desktop
  - Navigation: Sticky header with hamburger menu, smooth scroll to sections
  - Statistics: Vertical list instead of horizontal grid
  - Touch-friendly: Minimum 44px touch targets, increased padding on interactive elements
