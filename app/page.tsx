import Image from "next/image";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import SectionHeading from "@/components/sections/SectionHeading";
import CTA from "@/components/sections/CTA";
import PartnersMarquee from "@/components/sections/PartnersMarquee";
import { site } from "@/lib/site";

export default function HomePage() {
  return (
    <>
      {/* Hero Section with Video Background */}
      <section className="relative min-h-screen flex items-center overflow-hidden bg-slate-900">
        {/* Background Video */}
        <div className="absolute inset-0 z-0">
          {/* ImageKit video player as background */}
          <iframe
            src="https://imagekit.io/player/embed/awpovrtsl/IMG_2872.mov?controls=false&autoplay=true&loop=true&muted=true&background=%23000000"
            className="absolute inset-0 w-full h-full pointer-events-none border-0"
            allow="autoplay; fullscreen"
            style={{ border: 'none' }}
          />
          {/* Very subtle overlay for text readability */}
          <div className="absolute inset-0 bg-black/20 z-10" />
        </div>

        {/* Social Media Icons - Vertical on right side */}
        <div className="fixed right-6 top-1/2 -translate-y-1/2 z-30 flex flex-col gap-3">
          <a 
            href="https://facebook.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center justify-center w-10 h-10 rounded-full bg-neutral-500/80 hover:bg-neutral-600 transition-colors backdrop-blur-sm"
            aria-label="Facebook"
          >
            <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
            </svg>
          </a>
          <a 
            href="https://instagram.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center justify-center w-10 h-10 rounded-full bg-neutral-500/80 hover:bg-neutral-600 transition-colors backdrop-blur-sm"
            aria-label="Instagram"
          >
            <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
            </svg>
          </a>
          <a 
            href="https://youtube.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center justify-center w-10 h-10 rounded-full bg-neutral-500/80 hover:bg-neutral-600 transition-colors backdrop-blur-sm"
            aria-label="YouTube"
          >
            <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
            </svg>
          </a>
        </div>

        <Container className="relative z-20">
          <div className="py-24 sm:py-32">
            {/* Text Content - Directly on video */}
            <div className="max-w-xl">
              <p className="text-xs font-semibold tracking-widest text-emerald-400 uppercase">
                Integrated Pest Management
              </p>
              <h1 className="mt-6 text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight drop-shadow-lg">
                Poison-free pest control that strengthens ecosystems
              </h1>
              <p className="mt-6 text-sm sm:text-base leading-relaxed text-white drop-shadow-md">
                {site.description}
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <Button href="/contact">Request consultation</Button>
                <Button href="/services" variant="ghost">Our services</Button>
              </div>
            </div>
          </div>
        </Container>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 rounded-full border-2 border-white/40 flex items-start justify-center p-2">
            <div className="w-1.5 h-2 bg-white/60 rounded-full" />
          </div>
        </div>
      </section>

      {/* Partners Marquee */}
      <PartnersMarquee />

      {/* About Section */}
      <section id="about" className="py-20 sm:py-24 bg-white border-t border-neutral-200">
        <Container>
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-xs font-medium tracking-wide text-emerald-700 uppercase">About us</p>
              <h2 className="mt-4 text-3xl sm:text-4xl font-bold tracking-tight text-neutral-900">
                Science-backed solutions that protect biodiversity
              </h2>
              <p className="mt-6 text-base leading-7 text-neutral-700">
                EcoSolutions is a South African environmental company specialising in integrated pest
                management (IPM) using wildlife-based solutions instead of harmful chemicals.
              </p>
              <p className="mt-4 text-base leading-7 text-neutral-700">
                Our work blends science, conservation, and practical implementation—tailored for farms,
                estates, homes, and businesses across South Africa.
              </p>
              <div className="mt-8">
                <Button href="/about">Learn more about us</Button>
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-neutral-200 bg-neutral-50 p-6">
                <div className="text-3xl font-bold text-emerald-700">85%</div>
                <p className="mt-2 text-sm font-medium text-neutral-900">Pest reduction</p>
                <p className="mt-1 text-xs text-neutral-600">Average across projects</p>
              </div>
              <div className="rounded-2xl border border-neutral-200 bg-neutral-50 p-6">
                <div className="text-3xl font-bold text-emerald-700">100%</div>
                <p className="mt-2 text-sm font-medium text-neutral-900">Poison-free</p>
                <p className="mt-1 text-xs text-neutral-600">All our solutions</p>
              </div>
              <div className="rounded-2xl border border-neutral-200 bg-neutral-50 p-6">
                <div className="text-3xl font-bold text-emerald-700">200+</div>
                <p className="mt-2 text-sm font-medium text-neutral-900">Installations</p>
                <p className="mt-1 text-xs text-neutral-600">Owl boxes & bat houses</p>
              </div>
              <div className="rounded-2xl border border-neutral-200 bg-neutral-50 p-6">
                <div className="text-3xl font-bold text-emerald-700">10+</div>
                <p className="mt-2 text-sm font-medium text-neutral-900">Years experience</p>
                <p className="mt-1 text-xs text-neutral-600">Wildlife-based IPM</p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 sm:py-32 bg-white border-t border-neutral-200">
        <Container>
          <div className="max-w-2xl">
            <p className="text-xs font-semibold tracking-wider text-emerald-700 uppercase">What we do</p>
            <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-neutral-900">
              Biodiversity-first pest management
            </h2>
            <p className="mt-6 text-lg leading-8 text-neutral-600">
              Practical, science-backed solutions for farms, estates, homes, and businesses.
            </p>
          </div>

          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <div className="group relative bg-white rounded-lg p-8 border border-neutral-200 hover:border-neutral-300 transition-all duration-200">
              <p className="text-xs font-medium tracking-wide text-emerald-700 uppercase mb-2">Services</p>
              <h3 className="text-xl font-bold text-neutral-900 mb-3">Integrated Pest Management (IPM)</h3>
              <p className="text-sm leading-6 text-neutral-600">
                Site assessment → plan → install → monitor. Reduce pests sustainably with measurable outcomes.
              </p>
            </div>

            <div className="group relative bg-white rounded-lg p-8 border border-neutral-200 hover:border-neutral-300 transition-all duration-200">
              <p className="text-xs font-medium tracking-wide text-emerald-700 uppercase mb-2">Wildlife solutions</p>
              <h3 className="text-xl font-bold text-neutral-900 mb-3">Owl-based rodent control</h3>
              <p className="text-sm leading-6 text-neutral-600">
                Owl box strategy, placement, and follow-up designed for your land-use and rodent pressure.
              </p>
            </div>

            <div className="group relative bg-white rounded-lg p-8 border border-neutral-200 hover:border-neutral-300 transition-all duration-200">
              <p className="text-xs font-medium tracking-wide text-emerald-700 uppercase mb-2">Wildlife solutions</p>
              <h3 className="text-xl font-bold text-neutral-900 mb-3">Bat-based pest control</h3>
              <p className="text-sm leading-6 text-neutral-600">
                Bat houses and exclusion guidance to support insect control and safe co-existence.
              </p>
            </div>

            <div className="group relative bg-white rounded-lg p-8 border border-neutral-200 hover:border-neutral-300 transition-all duration-200">
              <p className="text-xs font-medium tracking-wide text-emerald-700 uppercase mb-2">Installations</p>
              <h3 className="text-xl font-bold text-neutral-900 mb-3">Habitat installations</h3>
              <p className="text-sm leading-6 text-neutral-600">
                Owl boxes, bat houses, nesting logs, and wildlife-friendly site enhancements.
              </p>
            </div>

            <div className="group relative bg-white rounded-lg p-8 border border-neutral-200 hover:border-neutral-300 transition-all duration-200">
              <p className="text-xs font-medium tracking-wide text-emerald-700 uppercase mb-2">Ongoing</p>
              <h3 className="text-xl font-bold text-neutral-900 mb-3">Monitoring & maintenance</h3>
              <p className="text-sm leading-6 text-neutral-600">
                Seasonal checks, occupancy tracking, servicing, and reporting for long-term success.
              </p>
            </div>

            <div className="group relative bg-white rounded-lg p-8 border border-neutral-200 hover:border-neutral-300 transition-all duration-200">
              <p className="text-xs font-medium tracking-wide text-emerald-700 uppercase mb-2">Impact</p>
              <h3 className="text-xl font-bold text-neutral-900 mb-3">Education & conservation support</h3>
              <p className="text-sm leading-6 text-neutral-600">
                Training, awareness, and conservation-aligned implementation for estates and organisations.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Products snapshot */}
      <section className="py-14 border-t border-neutral-200 overflow-hidden">
        <Container>
          <SectionHeading
            title="Products & solutions"
            subtitle="Built for function, durability, and real-world outcomes—designed for South African conditions."
          />
          
          {/* Horizontal scrolling slider */}
          <div className="mt-8 -mx-4 sm:-mx-6">
            <div className="flex gap-6 overflow-x-auto px-4 sm:px-6 pb-4 scrollbar-hide snap-x snap-mandatory">
              {/* Product 1 - Spotted Eagle Owl Box */}
              <div className="flex-none w-80 snap-start">
                <div className="group relative bg-white rounded-xl border border-neutral-200 hover:border-emerald-300 transition-all duration-300 overflow-hidden h-full">
                  <div className="aspect-[4/3] bg-neutral-100 relative overflow-hidden">
                    <Image
                      src="/products/SpottedEagleOwlbox_11426bb5-25a7-4d02-a4f5-4fd8119a9d07_590x.jpg.webp"
                      alt="Spotted Eagle Owl Box"
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      unoptimized
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-neutral-900 mb-2">Spotted Eagle Owl Box</h3>
                    <p className="text-sm text-neutral-600">
                      Premium owl box designed for Spotted Eagle Owls, ideal for urban and agricultural rodent control.
                    </p>
                  </div>
                </div>
              </div>

              {/* Product 2 - Rocket Bat Hotel */}
              <div className="flex-none w-80 snap-start">
                <div className="group relative bg-white rounded-xl border border-neutral-200 hover:border-emerald-300 transition-all duration-300 overflow-hidden h-full">
                  <div className="aspect-[4/3] bg-neutral-100 relative overflow-hidden">
                    <Image
                      src="/products/Rocketbathotel_590x.jpg.webp"
                      alt="Rocket Bat Hotel"
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      unoptimized
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-neutral-900 mb-2">Rocket Bat Hotel</h3>
                    <p className="text-sm text-neutral-600">
                      Multi-chamber bat house providing optimal roosting conditions for insect control.
                    </p>
                  </div>
                </div>
              </div>

              {/* Product 3 - Slimline Bat Box */}
              <div className="flex-none w-80 snap-start">
                <div className="group relative bg-white rounded-xl border border-neutral-200 hover:border-emerald-300 transition-all duration-300 overflow-hidden h-full">
                  <div className="aspect-[4/3] bg-neutral-100 relative overflow-hidden">
                    <Image
                      src="/products/Slimlinebatbox_b6db9f39-634c-467d-90e5-8b7ae6fe32ed_590x.jpg.webp"
                      alt="Slimline Bat Box"
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      unoptimized
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-neutral-900 mb-2">Slimline Bat Box</h3>
                    <p className="text-sm text-neutral-600">
                      Space-efficient bat roost perfect for urban installations and smaller properties.
                    </p>
                  </div>
                </div>
              </div>

              {/* Product 4 - Bush Baby Box */}
              <div className="flex-none w-80 snap-start">
                <div className="group relative bg-white rounded-xl border border-neutral-200 hover:border-emerald-300 transition-all duration-300 overflow-hidden h-full">
                  <div className="aspect-[4/3] bg-neutral-100 relative overflow-hidden">
                    <Image
                      src="/products/Bush_baby_box_590x.png.webp"
                      alt="Bush Baby Box"
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      unoptimized
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-neutral-900 mb-2">Bush Baby Box</h3>
                    <p className="text-sm text-neutral-600">
                      Specialized nesting habitat supporting bush baby populations and biodiversity.
                    </p>
                  </div>
                </div>
              </div>

              {/* Product 5 - Barbet Log */}
              <div className="flex-none w-80 snap-start">
                <div className="group relative bg-white rounded-xl border border-neutral-200 hover:border-emerald-300 transition-all duration-300 overflow-hidden h-full">
                  <div className="aspect-[4/3] bg-neutral-100 relative overflow-hidden">
                    <Image
                      src="/products/Barbetlog_590x.jpg.webp"
                      alt="Barbet Log"
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      unoptimized
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-neutral-900 mb-2">Barbet Log</h3>
                    <p className="text-sm text-neutral-600">
                      Natural nesting log for barbets and other cavity-nesting bird species.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 flex gap-3">
            <Button href="/products">Browse products</Button>
            <Button href="/contact" variant="ghost">Product enquiry</Button>
          </div>
        </Container>
      </section>

      <CTA />
    </>
  );
}
