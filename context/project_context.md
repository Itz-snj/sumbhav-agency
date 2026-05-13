# Project Context: SumBhav Works

## 1. Project Overview & Objective
SumBhav Works is a premium, interactive portfolio for an elite software agency focused on UK Enterprise Solutions. The project embraces an "Architectural Cyber-Minimalism" theme, combining a highly interactive workspace metaphor with a performance-focused web experience.

## 2. Technology Stack
- **Core Framework**: React 19 with TanStack Start and TanStack Router for file-based routing and optimized rendering.
- **Build & Deployment**: Vite, configured for Cloudflare deployments (`@cloudflare/vite-plugin`, `wrangler`).
- **Styling**: Tailwind CSS v4 alongside `clsx` and `tailwind-merge` for dynamic utility class management.
- **Animations & Interactivity**: 
  - **Framer Motion** for physics-based interactions (e.g., draggable modules).
  - **GSAP** for high-performance scroll animations and complex sequencing (e.g., scroll inversions).
- **UI Primitives**: Radix UI headless components tailored with a custom minimal/glassmorphic design language.
- **Form Handling & Validation**: `react-hook-form` paired with `zod` for strict type safety and validation.

## 3. Architecture & Data Management
- **Content Decoupling**: A strict separation of concerns is maintained where textual content, service details, and team member information are decoupled from the React UI components. All data is managed within `src/data/site-content.json` (and `team.json`), enabling rapid content updates without requiring code changes.
- **Component Structure**:
  - `src/components/site/`: Houses the complex, stateful, and animated sections of the landing page (Hero, Marquee, Team, Terminal, EnquiryForm, etc.).
  - `src/components/ui/`: Contains atomic, reusable UI building blocks built on top of Radix UI.
  - `src/routes/`: TanStack Router directory handling the application's routing topology.

## 4. Key Sections & Design Implementation
- **Workspace Hero (`Hero.tsx` & `ParticleText.tsx`)**: An interactive "Workspace" featuring draggable Framer Motion containers (`<motion.div drag>`) layered over a high-performance Canvas particle logo.
- **Tech Stack Ticker (`Marquee.tsx`)**: An infinite horizontal animation loop highlighting the agency's core stack (React.js, Next.js, Firebase, Flutter, TDL Integration, Docker).
- **Service Bento Grid (`SelectedWorks.tsx`)**: A 4-card asymmetric grid featuring hover-glow effects, specifically highlighting Enterprise Web Platforms (Lighthouse 100 focus), Cross-Platform Mobile (Flutter), E-commerce, and ERP/Legacy (Tally & Custom API Integration).
- **Team & Culture Grid (`Team.tsx`)**: A stark, 1px bordered grid showcasing team members (Neha, Rohan, Yaswarya, Rina, Pushpa) populated from JSON data. It includes micro-interactions that reveal monochromatic photos and LinkedIn links on hover.
- **Contact Terminal & Enquiry Form (`Terminal.tsx`, `EnquiryForm.tsx`)**: A dual-layout contact section featuring an interactive terminal paired with a minimalist form (utilizing bottom-border inputs). The form is structured to send strict JSON payloads, prepared for backend integration (e.g., Firebase).
- **Global Footer (`Footer.tsx`)**: Features massive, geometric sans-serif typography ("LET'S WORK TOGETHER") and bottom-aligned monospace text for compliance data (GDPR, Data Security, GST, HQ location).

## 5. Development Guidelines & Directives
- **Performance First**: Maintain high Lighthouse scores (95+). Utilize lightweight SVG icons, optimize canvas animations, and ensure smooth framer motion interactions. Avoid heavy client-side bundles where possible.
- **Aesthetic Consistency**: Adhere strictly to the established color palette (Deep Obsidian `#0A0908`, Cream White `#FFF0BE`, Warm Salmon `#FF9A86`, and glassmorphism borders `rgba(255, 255, 255, 0.1)`) and typography rules (Space Grotesk/Syncopate for headers, JetBrains Mono for UI labels and tags).
- **Modularity**: Any new section or component must follow the established pattern of decoupling its data into the JSON data files. Maintain strict adherence to the "Architectural Cyber-Minimalism" theme.
