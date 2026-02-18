"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import Container from "@/components/ui/Container";

interface Testimonial {
  name: string;
  location: string;
  quote: string;
  image?: string;
}

const testimonials: Testimonial[] = [
  {
    name: "Dame Jane Goodall",
    location: "",
    quote: "",
    image: "/logos/b6fb14d7-d7c3-4044-8b99-cdeb5da5cf99.jpeg",
  },
  {
    name: "Kiran Reddy",
    location: "Noordhoek",
    quote: "Congratulations on your professional and technically skilled crew! The team online and onsite were punctual and polite. Your quote document was comprehensive and accepted by insurance without query - insurance covered the exclusion fully. An excellent experience. I'll be in touch with bat feedback as summer rolls in.",
  },
  {
    name: "Beryl Scott-Payet",
    location: "Steyn City",
    quote: "Fantastic, thanks to all at Eco Solutions for your support and help with Strix (our injured owl) and the installations of the boxes and houses at Steyn City.",
  },
  {
    name: "Cheryl Siewierski",
    location: "Hartebeespoort",
    quote: "Brilliant service from hugely knowledgeable installers at our home in Harties this morning. We are thrilled with our new bat and owl boxes and sure the residents of these will be too! Excellent to know that EcoSolutions also monitors numbers and patterns of the owls in perpetuity. Thank you!",
  },
  {
    name: "Ian Hall",
    location: "Emmarentia",
    quote: "Owl box was installed quickly and efficiently, with trees trimmed to allow for a direct flight path for (hopefully) an owl to use the box! Great service and now we wait for an owl! Thanks EcoSolutions!",
  },
  {
    name: "Jaxon Rice",
    location: "Westdene",
    quote: "Fantastic company doing great work. Installation of my owl box and barbet logs was done efficiently and quickly by skilled and knowledgable employees",
  },
];

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-scroll through all testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 6000); // Change every 6 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-12 bg-white border-t border-neutral-200">
      <Container>
        <div className="text-center mb-8">
          <p className="text-xs font-semibold tracking-wider text-emerald-700 uppercase">Testimonials</p>
          <h2 className="mt-2 text-2xl font-bold text-neutral-900">
            What our clients say
          </h2>
        </div>

        {/* Single Auto-scrolling Carousel */}
        <div className="relative max-w-4xl mx-auto">
          <div className="bg-neutral-50 rounded-xl border border-neutral-200 overflow-hidden">
            <div className="relative min-h-70">
              {testimonials.map((testimonial, index) => (
                <div
                  key={index}
                  className={`transition-opacity duration-700 ${
                    index === currentIndex ? "opacity-100" : "opacity-0 absolute inset-0"
                  }`}
                >
                  {testimonial.image ? (
                    // Dame Jane Goodall - Image display
                    <div className="flex items-center justify-center p-8">
                      <div className="relative w-full max-w-2xl h-64">
                        <Image
                          src={testimonial.image}
                          alt={testimonial.name}
                          fill
                          className="object-contain"
                        />
                      </div>
                    </div>
                  ) : (
                    // Text testimonials
                    <div className="flex flex-col items-center justify-center p-8 text-center">
                      <svg className="w-8 h-8 text-emerald-600 mb-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                      </svg>
                      <p className="text-base text-neutral-700 leading-relaxed mb-4 max-w-2xl italic">
                        "{testimonial.quote}"
                      </p>
                      <div className="font-semibold text-neutral-900">{testimonial.name}</div>
                      {testimonial.location && (
                        <div className="text-sm text-neutral-600">{testimonial.location}</div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
            
            {/* Navigation dots */}
            <div className="flex justify-center gap-2 pb-6">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === currentIndex ? "bg-emerald-600 w-8" : "bg-neutral-300"
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
