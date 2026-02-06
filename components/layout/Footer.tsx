import Container from "@/components/ui/Container";
import Link from "next/link";
import Image from "next/image";
import { site } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="bg-neutral-50 border-t border-neutral-200 py-12">
      <Container>
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <Image
            src="/logo.png"
            alt="EcoSolutions Logo"
            width={180}
            height={180}
            className="rounded-xl"
          />
        </div>

        {/* Horizontal layout for address and contact */}
        <div className="flex flex-col md:flex-row justify-center gap-12 mb-8 text-center md:text-left">
          {/* Physical Address */}
          <div>
            <p className="text-sm font-bold text-neutral-900 mb-2">Physical Address</p>
            <address className="text-xs leading-relaxed text-neutral-600 not-italic">
              Building A, Ground Floor, Lifestyle Business Park<br />
              Lifestyle Garden Centre, Ysterhout Drive & Beyers Naude Drive<br />
              Randpark Ridge, Johannesburg
            </address>
          </div>

          {/* Contact Info */}
          <div>
            <p className="text-sm font-bold text-neutral-900 mb-2">Contact</p>
            <div className="space-y-1 text-xs text-neutral-600">
              <p>Weekdays: 8:00 - 17:00</p>
              <p><a href="mailto:info@ecosolutions.co.za" className="hover:text-emerald-700 transition-colors">info@ecosolutions.co.za</a></p>
              <p><a href="tel:+27723659777" className="hover:text-emerald-700 transition-colors">+27 72 365 9777</a> | <a href="tel:+27117917326" className="hover:text-emerald-700 transition-colors">+27 011 791 7326</a></p>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <p className="text-sm font-bold text-neutral-900 mb-2">Quick Links</p>
            <div className="flex flex-col gap-1 text-xs">
              <Link href="/services" className="text-neutral-600 hover:text-emerald-700 transition-colors">Services</Link>
              <Link href="/products" className="text-neutral-600 hover:text-emerald-700 transition-colors">Products</Link>
              <Link href="/projects" className="text-neutral-600 hover:text-emerald-700 transition-colors">Projects</Link>
              <Link href="/conservation" className="text-neutral-600 hover:text-emerald-700 transition-colors">Conservation</Link>
              <Link href="/contact" className="text-neutral-600 hover:text-emerald-700 transition-colors">Contact</Link>
            </div>
          </div>
        </div>
        
        <div className="pt-6 border-t border-neutral-200">
          <p className="text-xs text-neutral-500 text-center">
            © {new Date().getFullYear()} {site.name}. All rights reserved.
          </p>
        </div>
      </Container>
    </footer>
  );
}
