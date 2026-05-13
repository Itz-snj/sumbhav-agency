Project Context: SumBhav Works
Core Identity: A premium, interactive portfolio for an elite software agency focused on UK Enterprise Solutions.
Visual Theme: "Architectural Cyber-Minimalism" & "Interactive Workspace".
Key Directives: The existing Canvas Particle Logo and GSAP/Framer Scroll Inversion animations are locked in. Do not alter their core logic. All new additions must inherit this high-end, high-performance aesthetic.

1. Global Design System
Brand Name: Strictly SumBhav Works (Never "SumBhav OS" or "SumBhav Studio").

Color Palette:

Background: #0A0908 (Deep Obsidian).

Primary Text: #FFF0BE (Cream White).

Accents/Gradients: #FF9A86 (Warm Salmon), #FFB399 (Peach), #FFD6A6 (Sand).

Borders/UI Elements: rgba(255, 255, 255, 0.1) for subtle glassmorphism lines.

Typography: Geometric Sans-Serif (e.g., Space Grotesk/Syncopate) for massive headers; Monospace (e.g., JetBrains Mono) for UI labels, tags, and terminal text.

2. Component Architecture & Updates
A. The Workspace Hero (Draggable UI)
Background: Existing Canvas Particle Logo ("SumBhav") remains intact.

New Feature (Draggable Modules): The hero text and CTA buttons are no longer static. They must be wrapped in Framer Motion <motion.div drag> containers.

Module Styling: bg-black/40, backdrop-blur-md, 1px solid border-white/10. Add a monospace top bar to each module with a grab icon and label (e.g., [+] MOD-01 // INTRO).

Updated Copy: "Bridging Complex Business Logic with Modern Digital Experiences. Focused on UK Enterprise Solutions."

B. The Tech Stack Ticker (Differentiator Bar)
Placement: Directly below the hero space.

Behavior: Infinite horizontal CSS/Framer animation loop.

Strict Content: React.js, Next.js, Firebase, Flutter, TDL Integration, Docker. (Use monochromatic SVG icons alongside the text).

C. Service Bento Grid (High-Performance Focus)
Layout: 4-card asymmetric grid with hover-glow effects using the accent palette.

Card 1 (Web Apps): Add a UI element showing a glowing green "Lighthouse Score: 100".

Card 2 (Mobile Apps): Focus on Flutter cross-platform architecture.

Card 3 (E-commerce): Focus on headless storefronts.

Card 4 (ERP/Legacy): Must explicitly highlight "Tally & Custom API Integration" to showcase complex business logic capabilities.

D. Team & Culture Grid (New Section)
Header: "The Engineering Team // UK-Aligned Time Zone Operations".

Layout: Stark, 1px bordered grid showcasing team members.

Data: Neha, Rohan, Yaswarya, Rina, Pushpa.

Interactivity: Hovering over a team member's card slightly reveals a monochromatic photo and a link to their LinkedIn.

E. Contact Terminal & Direct Enquiry Form
The Terminal: Keep the existing "Talk to SumBhav" interactive terminal.

The Form: Placed adjacent to the terminal. Minimalist input fields with bottom-borders only (no clunky boxes).

Strict Terminology: Submit button must read "Send Enquiry" (never "Submit Lead").

Fields: Name, Company, UK/Global Location, Project Type, Description.

F. Global Footer & Compliance
Layout: Massive "LET'S WORK TOGETHER" typography remains.

Sub-Footer: Small, monospace text aligned to the bottom edge.

Data: GDPR Compliant | Data Security Standard | GST: [Pending] | HQ: West Bengal, India.

3. State & Data Management Rules
All text copy, team members, and project details must remain decoupled from the UI components to allow for rapid updating without touching the React code.

data/site-content.json: Must hold all updated Hero copy, Ticker items, and Footer compliance strings.

data/team.json: New file to hold the array of team members.

Form Handling: The Enquiry form must be structured to send a structured JSON payload, prepped for a Firebase 'enquiries' collection integration.