import Container from "@/components/ui/Container";
import Link from "next/link";
import Image from "next/image";
import { site } from "@/lib/site";

// Google Maps embed URL - replace with your actual embed URL if needed
const MAP_EMBED_URL = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3580.9775842857595!2d27.94125796295167!3d-26.0948375408699!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1e957454660d9929%3A0xb6ad801da1fdb4cc!2sEcoSolutions!5e0!3m2!1sen!2sza!4v1771157144291!5m2!1sen!2sza";

export default function Footer() {
  return (
    <footer className="bg-neutral-950 text-neutral-100 border-t border-neutral-900">
      <Container>
        <div className="py-16">
          {/* Main Grid - 3 columns on desktop */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
            
            {/* Column A: Brand + Mission + Social */}
            <div className="space-y-4">
              <h3 className="text-xs font-semibold text-white mb-4 uppercase tracking-wider">About Us</h3>
              <p className="text-sm text-neutral-400 leading-relaxed">
                Science-backed pest control and conservation solutions for a sustainable future.
              </p>
              
              {/* Social Links */}
              <div>
                <h3 className="text-xs font-semibold text-white mb-3 uppercase tracking-wider">Follow Us</h3>
                <div className="flex gap-3">
                  <a 
                    href="https://www.linkedin.com/company/ecosolutions" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="p-2.5 bg-neutral-900 rounded-lg hover:bg-emerald-600 transition-all"
                    aria-label="LinkedIn"
                  >
                    <svg className="w-5 h-5 text-neutral-400" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                    </svg>
                  </a>
                  <a 
                    href="https://www.facebook.com/ecosolutionssa" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="p-2.5 bg-neutral-900 rounded-lg hover:bg-emerald-600 transition-all"
                    aria-label="Facebook"
                  >
                    <svg className="w-5 h-5 text-neutral-400" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                  </a>
                  <a 
                    href="https://www.youtube.com/@ecosolutionssa" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="p-2.5 bg-neutral-900 rounded-lg hover:bg-emerald-600 transition-all"
                    aria-label="YouTube"
                  >
                    <svg className="w-5 h-5 text-neutral-400" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                    </svg>
                  </a>
                </div>
              </div>
              
              <Link href="/" className="inline-block mt-4">
                <Image
                  src="/logo.png"
                  alt="EcoSolutions Logo"
                  width={200}
                  height={200}
                  className="rounded-xl"
                />
              </Link>
            </div>

            {/* Column B: Quick Links */}
            <div>
              <h3 className="text-xs font-semibold text-white mb-4 uppercase tracking-wider">Quick Links</h3>
              <nav className="space-y-3">
                <Link href="/" className="block text-sm text-neutral-400 hover:text-emerald-400 transition-colors">
                  Home
                </Link>
                <Link href="/services" className="block text-sm text-neutral-400 hover:text-emerald-400 transition-colors">
                  Services
                </Link>
                <Link href="/products" className="block text-sm text-neutral-400 hover:text-emerald-400 transition-colors">
                  Solutions
                </Link>
                <Link href="/products" className="block text-sm text-neutral-400 hover:text-emerald-400 transition-colors">
                  Shop Online
                </Link>
                <Link href="/projects" className="block text-sm text-neutral-400 hover:text-emerald-400 transition-colors">
                  Success Stories
                </Link>
                <Link href="/contact" className="block text-sm text-neutral-400 hover:text-emerald-400 transition-colors">
                  Contact
                </Link>
              </nav>
            </div>

            {/* Column C: Contact + Map */}
            <div className="space-y-6">
              <div>
                <h3 className="text-xs font-semibold text-white mb-4 uppercase tracking-wider">Contact Us</h3>
                <div className="space-y-3 text-sm text-neutral-400">
                  <a 
                    href="mailto:info@ecosolutions.co.za" 
                    className="flex items-start gap-2 hover:text-emerald-400 transition-colors"
                  >
                    <svg className="w-4 h-4 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <span>info@ecosolutions.co.za</span>
                  </a>
                  
                  <a 
                    href="tel:+27723659777" 
                    className="flex items-start gap-2 hover:text-emerald-400 transition-colors"
                  >
                    <svg className="w-4 h-4 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    <span>+27 72 365 9777</span>
                  </a>
                  
                  <a 
                    href="tel:+27117917326" 
                    className="flex items-start gap-2 hover:text-emerald-400 transition-colors"
                  >
                    <svg className="w-4 h-4 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    <span>+27 011 791 7326</span>
                  </a>

                  <a 
                    href="https://wa.me/27723659777" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 mt-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-medium rounded-lg transition-colors"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                    </svg>
                    WhatsApp Us
                  </a>

                  <div className="pt-2 text-xs">
                    <p className="text-neutral-500">Business Hours:</p>
                    <p>Weekdays 8:00 - 17:00</p>
                  </div>
                </div>
              </div>

              {/* Embedded Map - Responsive */}
              <div>
                <h3 className="text-xs font-semibold text-white mb-3 uppercase tracking-wider">Find Us</h3>
                <div className="relative w-full rounded-lg overflow-hidden border border-neutral-800" style={{ paddingBottom: '75%' }}>
                  <iframe 
                    src={MAP_EMBED_URL}
                    className="absolute top-0 left-0 w-full h-full"
                    style={{ border: 0 }} 
                    allowFullScreen 
                    loading="lazy" 
                    referrerPolicy="no-referrer-when-downgrade"
                    title="EcoSolutions Location"
                  />
                </div>
                <p className="text-xs text-neutral-500 mt-2 leading-relaxed">
                  Building A, Ground Floor, Lifestyle Business Park, Ysterhout Dr & Beyers Naude Dr, Randpark Ridge, Johannesburg
                </p>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="pt-8 border-t border-neutral-900">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              <p className="text-xs text-neutral-500">
                © {new Date().getFullYear()} {site.name}. All rights reserved.
              </p>
              <div className="flex gap-6 text-xs text-neutral-500">
                <Link href="/privacy" className="hover:text-emerald-400 transition-colors">
                  Privacy Policy
                </Link>
                <Link href="/terms" className="hover:text-emerald-400 transition-colors">
                  Terms of Service
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
}
