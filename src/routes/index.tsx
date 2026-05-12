import { createFileRoute } from "@tanstack/react-router";
import { Hero } from "@/components/site/Hero";
import { Marquee } from "@/components/site/Marquee";
import { Terminal } from "@/components/site/Terminal";
import { Manifesto } from "@/components/site/Manifesto";
import { SelectedWorks } from "@/components/site/SelectedWorks";
import { Footer } from "@/components/site/Footer";
import { InvertedScrollSection } from "@/components/site/InvertedScrollSection";
import { Team } from "@/components/site/Team";
import { EnquiryForm } from "@/components/site/EnquiryForm";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "SumBhav — B2B Software Studio" },
      {
        name: "description",
        content:
          "SumBhav is a senior software studio designing and shipping production B2B platforms — type-safe systems, distributed services, and interfaces with taste."
      },
      { property: "og:title", content: "SumBhav — B2B Software Studio" },
      {
        property: "og:description",
        content: "We design, build and ship production software for ambitious B2B teams."
      }
    ]
  })
});

function Index() {
  return (
    <main className="bg-background text-foreground antialiased">
      <Hero />
      <Marquee />
      <InvertedScrollSection />
      <Manifesto />
      <SelectedWorks />
      <Team />
      <Terminal />
      <EnquiryForm />
      <Footer />
    </main>
  );
}
