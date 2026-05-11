export interface Project {
  id: string;
  title: string;
  client: string;
  description: string;
  techStack: string[];
  gallery: { src: string; alt: string }[];
  liveLink: string;
  year: string;
}

const ph = (seed: string, w = 1600, h = 1000) =>
  `https://images.unsplash.com/photo-${seed}?auto=format&fit=crop&w=${w}&h=${h}&q=80`;

export const projects: Project[] = [
  {
    id: "ledger-os",
    title: "Ledger OS",
    client: "Northwind Capital",
    description:
      "A real-time treasury console replacing seventeen spreadsheets. Sub-100ms reconciliation across nine custodians.",
    techStack: ["TypeScript", "Next.js", "Postgres", "Kafka", "Rust"],
    gallery: [
      { src: ph("1551288049-bebda4e38f71"), alt: "Ledger dashboard" },
      { src: ph("1559526324-4b87b5e36e44"), alt: "Reconciliation view" },
      { src: ph("1518186285589-2f7649de83e0"), alt: "Treasury graph" }
    ],
    liveLink: "https://example.com/ledger-os",
    year: "2025"
  },
  {
    id: "atlas-cms",
    title: "Atlas CMS",
    client: "Field & Forge",
    description:
      "A headless content platform built for editorial teams. Block-based authoring, type-safe schemas, and edge-cached delivery.",
    techStack: ["React", "tRPC", "Drizzle", "Cloudflare Workers"],
    gallery: [
      { src: ph("1467232004584-a241de8bcf5d"), alt: "Atlas editor" },
      { src: ph("1499750310107-5fef28a66643"), alt: "Schema view" },
      { src: ph("1517245386807-bb43f82c33c4"), alt: "Publishing flow" }
    ],
    liveLink: "https://example.com/atlas-cms",
    year: "2024"
  },
  {
    id: "signal-grid",
    title: "Signal Grid",
    client: "Helio Energy",
    description:
      "Telemetry mesh for 12k industrial sensors. Streaming anomaly detection with live operator dashboards.",
    techStack: ["Go", "Timescale", "WebGL", "GraphQL"],
    gallery: [
      { src: ph("1518770660439-4636190af475"), alt: "Telemetry mesh" },
      { src: ph("1496181133206-80ce9b88a853"), alt: "Operator console" },
      { src: ph("1451187580459-43490279c0fa"), alt: "Anomaly chart" }
    ],
    liveLink: "https://example.com/signal-grid",
    year: "2025"
  },
  {
    id: "muse-studio",
    title: "Muse Studio",
    client: "Independent",
    description:
      "An AI-augmented design tool. Multiplayer canvas, semantic version history, and a plug-in runtime for LLM agents.",
    techStack: ["React", "Yjs", "Wasm", "OpenAI", "Vite"],
    gallery: [
      { src: ph("1481627834876-b7833e8f5570"), alt: "Muse canvas" },
      { src: ph("1505373877841-8d25f7d46678"), alt: "Plugin runtime" },
      { src: ph("1526374965328-7f61d4dc18c5"), alt: "Multiplayer" }
    ],
    liveLink: "https://example.com/muse-studio",
    year: "2026"
  }
];