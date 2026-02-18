"use client";

import Link from "next/link";
import Image from "next/image";
import Container from "@/components/ui/Container";
import { site } from "@/lib/site";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-neutral-900/95 border-b border-neutral-800 backdrop-blur-md shadow-lg' 
        : 'bg-neutral-900/70 border-b border-neutral-800/30 backdrop-blur-md'
    }`}>
      <Container>
        <div className="flex h-20 items-center justify-between">
          <Link href="/" className="flex items-center -ml-8 mt-3">
            <Image
              src="/logo.png"
              alt="EcoSolutions Logo"
              width={160}
              height={160}
              className="rounded-xl"
            />
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            {site.nav.slice(1).map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm transition-colors text-white/90 hover:text-white font-medium"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/contact"
              className="rounded-xl bg-emerald-600 px-3 py-2 text-sm font-medium text-white hover:bg-emerald-700 transition-colors"
            >
              Get a quote
            </Link>
          </nav>

          <Link
            href="/contact"
            className="md:hidden rounded-xl bg-emerald-600 px-3 py-2 text-sm font-medium text-white hover:bg-emerald-700"
          >
            Quote
          </Link>
        </div>
      </Container>
    </header>
  );
}
