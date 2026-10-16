import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Bat & Owl Box Data Dashboard",
  description: "Occupancy and monitoring data from EcoSolutions bat houses and owl boxes.",
  alternates: { canonical: "/dashboard" },
  // Internal tool, not linked from the site; keep it out of search results.
  robots: { index: false, follow: false },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
