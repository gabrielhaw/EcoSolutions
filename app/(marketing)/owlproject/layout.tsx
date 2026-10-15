import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Owlproject.org | Owl Education & Conservation in Schools",
  description:
    "Owlproject.org, EcoSolutions' non-profit, has reached 260,000 South African children and parents since 2001, putting owl boxes in schools and townships.",
  alternates: { canonical: "/owlproject" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
