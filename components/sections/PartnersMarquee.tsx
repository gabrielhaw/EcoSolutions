"use client";

import Image from "next/image";

export default function PartnersMarquee() {
  const partners = [
    { name: "BirdLife International", logo: "/logos/BirdLife_International_logo.svg.png" },
    { name: "Dainfern", logo: "/logos/Dainfern-Logo-V1-1024x812.png" },
    { name: "Partner 1", logo: "/logos/ChatGPT Image Feb 6, 2026 at 08_42_27 PM.png" },
    { name: "Partner 2", logo: "/logos/ChatGPT Image Feb 6, 2026 at 08_42_31 PM.png" },
    { name: "Partner 3", logo: "/logos/ChatGPT Image Feb 6, 2026 at 08_42_33 PM.png" },
    { name: "Nestlé South Africa", logo: "/logos/nestle-sa-vector-logo.png" },
    { name: "The Coves", logo: "/logos/The-Coves-website.png" },
  ];

  return (
    <section className="border-y border-neutral-200 bg-neutral-50 py-20 overflow-hidden">
      <p className="text-center text-sm font-semibold tracking-wide text-neutral-700 mb-12 uppercase">
        Trusted by leading organizations
      </p>
      <div className="relative">
        <div className="flex items-center gap-24 animate-marquee">
          {/* First set */}
          {partners.map((partner, idx) => (
            <div
              key={`first-${idx}`}
              className="flex-shrink-0 grayscale hover:grayscale-0 transition-all duration-300"
            >
              <Image
                src={partner.logo}
                alt={partner.name}
                width={200}
                height={100}
                style={{ width: '200px', height: '100px', objectFit: 'contain' }}
                unoptimized
              />
            </div>
          ))}
          {/* Duplicate set for seamless loop */}
          {partners.map((partner, idx) => (
            <div
              key={`second-${idx}`}
              className="flex-shrink-0 grayscale hover:grayscale-0 transition-all duration-300"
            >
              <Image
                src={partner.logo}
                alt={partner.name}
                width={200}
                height={100}
                style={{ width: '200px', height: '100px', objectFit: 'contain' }}
                unoptimized
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
