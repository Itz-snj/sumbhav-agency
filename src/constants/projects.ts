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
    id: "POS Inventory",
    title: "POS Inventory APP",
    client: "British Gas Pvt Ltd",
    description:
      "A real-time Point of Sale application with RBAC system, helping cashiers to print and sale items to vendors with real time sync with accounting software.",
    techStack: ["Flutter", "Firebase", "C#", "CloudFlare"],
    gallery: [
      // POS terminal / retail checkout
      { src: ph("1556742049-0cfed4f6a45d"), alt: "POS terminal checkout" },
      // Barcode scanner / inventory shelf
      { src: ph("1553413077-190dd305871c"), alt: "Inventory warehouse shelves" },
      // Receipt / payment transaction
      {
        src: "https://images.unsplash.com/photo-1580048915913-4f8f5cb481c4?w=800&auto=format&fit=crop",
        alt: "Payment receipt transaction"
      }
    ],
    liveLink: "",
    year: "2025",
  },

  {
    id: "Office-V2-CMS",
    title: "V2 CMS",
    client: "Tara Solutions",
    description:
      "A CMS platform used for inhouse customer ticket management by tara solutions, with over 2K+ support tickets, 1k+ leads / quotations managed in house with complete data privacy",
    techStack: ["NEXT Js", "CloudFlare tunnes", "MongoDb", "TypeScript"],
    gallery: [
      // Person working at a support/office desk
      { src: ph("1497366216548-37526070297c"), alt: "Office support desk" },
      // Laptop with dashboard / CMS UI
      { src: ph("1460925895917-afdab827c52f"), alt: "CMS dashboard on laptop" },
      // Team working / ticket management
      {
        src: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&auto=format&fit=crop",
        alt: "Team ticket management"
      }
    ],
    liveLink: "https://example.com/atlas-cms",
    year: "2024",
  },

  {
    id: "SlothOps",
    title: "SlothOps",
    client: "SlothDevs",
    description:
      "An Agentic Pipeline built for startups to manage there codebase, do agentic QA's and run automated resolutions all under the hood of SlothOps",
    techStack: ["Python", "LangChain", "VertEx AI Studio", "GraphQL"],
    gallery: [
      // Code / terminal screen
      { src: ph("1558494949-ef010cbdcc31"), alt: "Code terminal screen" },
      // Server room / infrastructure
      { src: ph("1504639725590-34d0984388bd"), alt: "Server infrastructure" },
      // AI / neural network visualization
      { src: ph("1620712943543-bcc4688e7485"), alt: "AI pipeline visualization" },
    ],
    liveLink: "https://www.slothdevs.xyz/",
    year: "2026",
  },

  {
    id: "Bulk WhatsApp Sender",
    title: "Whatsapp Sender",
    client: "K . K . Solutions",
    description:
      "An Selenium based system which allows me to automate bulk WhatsApp messaging to multiple contacts for outreach and marketing campaigns.",
    techStack: ["React", "Selenium", "Python", "Node.js"],
    gallery: [
      // WhatsApp / chat on phone screen
      { src: ph("1611746872915-64382b5c76da"), alt: "WhatsApp chat interface" },
      // Smartphone messaging app
      { src: ph("1516321318423-f06f85e504b3"), alt: "Mobile messaging app" },
      // Bulk notification / broadcast concept
      { src: ph("1563986768609-322da13575f3"), alt: "Bulk message broadcast" },
    ],
    liveLink: "https://example.com/muse-studio",
    year: "2026",
  },

  {
    id: "Clinkr",
    title: "Clinkr",
    client: "Chowdhury Mehbub Alam",
    description:
      "Link Analytics That Actually Matter — Track every click, understand your audience, and get actionable insights to optimize your content strategy.",
    techStack: ["React", "Next.js", "PostgreSQL", "TypeScript"],
    gallery: [
      // Analytics dashboard with charts
      { src: ph("1551288049-bebda4e38f71"), alt: "Analytics dashboard" },
      // Data visualization / graphs
      { src: ph("1460925895917-afdab827c52f"), alt: "Click data visualization" },
      // Web analytics / tracking metrics
      { src: ph("1504868584819-f8e8b4b6d7e3"), alt: "Link tracking metrics" },
    ],
    liveLink: "https://clinkr.live/",
    year: "2026",
  },
];