# Project Context

## What this app is
SumBhav is a one-page agency website built with React 19, TanStack Start, TanStack Router, Vite, Tailwind CSS v4, Framer Motion, GSAP, and Cloudflare deployment tooling.

The frontend is a single landing route at `/`. There are no additional public pages in the current route tree.

## Runtime flow
1. `src/start.ts` creates the TanStack Start app with a server-side error middleware.
2. `src/server.ts` loads TanStack Start’s generated server entry and normalizes catastrophic SSR failures into a branded HTML error page.
3. `src/router.tsx` creates the TanStack Router instance with scroll restoration enabled.
4. `src/routes/__root.tsx` mounts the app shell, global CSS, favicon, and the `QueryClientProvider`.
5. `src/routes/index.tsx` renders the entire homepage stack.

## Page structure
The homepage is assembled in this order:
1. `LogicLoader`
2. `Hero`
3. `Marquee`
4. `InvertedScrollSection`
5. `Manifesto`
6. `SelectedWorks`
7. `Team`
8. `Terminal`
9. `EnquiryForm`
10. `Footer`

## Current frontend behavior
### Hero
- Uses a fixed/top mobile nav and desktop inline nav.
- Reads hero copy from `src/data/site-content.json`.
- Renders a particle-based canvas wordmark via `ParticleText`.
- Wraps key hero blocks in `DraggableModule`, which enables drag on desktop only.
- Shows `FakeCursors` on desktop as decorative pointer animations.

### Loading screen
- `LogicLoader` is a full-screen canvas intro that animates particles into the SumBhav wordmark.
- It includes progress, status text, a skip affordance, and auto-dismisses via `onComplete`.

### Marquee
- Reads stack items from `src/data/site-content.json`.
- Repeats the list three times for an infinite horizontal loop.
- Uses Simple Icons CDN images for known technologies.

### Scroll inversion
- `InvertedScrollSection` uses Framer Motion scroll progress to invert background and text colors across the section.
- `WordRevealText` animates the statement word by word on scroll.

### Manifesto / services
- Reads manifesto and services from `src/data/site-content.json`.
- Renders a two-column service grid with badges and hover color changes.

### Selected works
- Uses `src/constants/projects.ts`, not JSON, for project data.
- On desktop, GSAP `ScrollTrigger` pins the section and horizontally scrolls the project track.
- Each project card shows title, client, description, tech stack, and three images.

### Team
- Reads team members from `src/data/site-content.json`.
- Renders a responsive card grid with initials, role, and bio.
- Current implementation does not use separate team photos or LinkedIn links.

### Terminal
- Provides preset Q&A buttons and simulated typed replies.
- Answers are hardcoded in the component.
- It is a visual/interaction terminal, not a real backend query surface.

### Enquiry form
- Validates with `zod`.
- Collects name, email, company, project type, and description.
- Posts to `https://api.web3forms.com/submit` with an `access_key`.
- On success it shows a confirmation state.
- The submit button text is `Send Enquiry`.

### Footer
- Shows current Asia/Kolkata time.
- Uses `src/data/site-content.json` for email, socials, and compliance items.
- Renders the large “Let’s Work Together” CTA text.

## Data sources
### `src/data/site-content.json`
Current source for:
- brand name
- hero copy
- marquee items
- manifesto copy
- services
- team members
- compliance strings
- footer socials

### `src/constants/projects.ts`
Current source for selected work / case study content, including:
- project metadata
- descriptions
- tech stack
- gallery image URLs
- live links

## Styling system
- Global theme is defined in `src/styles.css`.
- Palette is a warm obsidian theme:
  - background: deep obsidian
  - foreground: cream
  - accents: salmon, peach, sand
- Tailwind semantic tokens are mapped from CSS variables.
- Utility helpers include:
  - `.text-gradient-warm`
  - `.marquee`
  - `.blink-cursor`
  - `.selection-border`
- Fonts:
  - Inter for sans
  - JetBrains Mono for monospace

## Important implementation notes
- `DraggableModule` disables dragging on mobile.
- The current app is visually heavy and animation-driven, so changes should be checked for layout shift and overflow on both desktop and mobile.
- `src/components/ui/*` contains reusable shadcn/Radix primitives, but the landing page mostly uses custom site components instead of those primitives.
- `src/routeTree.gen.ts` is generated and should not be edited manually.

## Known context mismatches to avoid
- The repo does not currently have `data/team.json`; team data is still in `src/data/site-content.json`.
- The current team section does not have LinkedIn hover reveals or photos.
- The current terminal and enquiry form are separate sections, not a paired side-by-side module.
- The root metadata still says “Lovable App” in `src/routes/__root.tsx`; that is stale branding, not the intended site identity.
- Project data includes some legacy/rough copy in `src/constants/projects.ts`; treat source as current, but review text carefully before reusing it in new UI.

## Files to read first before frontend work
- `src/routes/index.tsx`
- `src/routes/__root.tsx`
- `src/components/site/Hero.tsx`
- `src/components/site/LogicLoader.tsx`
- `src/components/site/SelectedWorks.tsx`
- `src/components/site/EnquiryForm.tsx`
- `src/components/site/Terminal.tsx`
- `src/data/site-content.json`
- `src/constants/projects.ts`
- `src/styles.css`

