import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Bat & Owl Box Data Dashboard",
  description: "Occupancy and monitoring data from EcoSolutions bat houses and owl boxes.",
  alternates: { canonical: "/dashboard" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
