import Link from "next/link";
import Image from "next/image";
import Container from "@/components/ui/Container";
import { site } from "@/lib/site";

export default function Navbar() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-transparent backdrop-blur-sm">
      <Container>
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center">
            <Image
              src="/logo.png"
              alt="EcoSolutions Logo"
              width={200}
              height={200}
              className="rounded-xl"
            />
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            {site.nav.slice(1).map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm text-white/90 hover:text-white"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/contact"
              className="rounded-xl bg-emerald-600 px-3 py-2 text-sm font-medium text-white hover:bg-emerald-700"
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
