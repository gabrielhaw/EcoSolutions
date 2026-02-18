"use client";

import Container from "@/components/ui/Container";
import Image from "next/image";
import content from "@/content/owlproject-education.json";
import { useState, useEffect } from "react";

interface AustrianTestimonial {
  quote: string;
  author: string;
}

const austrianTestimonials: AustrianTestimonial[] = [
  {
    quote: "Privatschule Friesgasse Vienna. Very impressive!!!!! Wow!!",
    author: "David J.",
  },
  {
    quote: "Continent connecting owl project. Exemplary how globally it can collaborate.",
    author: "Ernestus S.",
  },
  {
    quote: "It is impressive what one person, Jonathan, has established and which big difference he and his team are making for conservation and in society.",
    author: "Viktoria K.",
  },
  {
    quote: "It was a very interesting presentation and a successful informational event! Congratulations!",
    author: "Major Friedrich Fahrnberger, Goestling/Ybbs",
  },
  {
    quote: "Owl fever has broken out during three weeks of an owl school project. Very cool. Very professional. Your enthusiasm is infectious.",
    author: "Teacher Claudia B., Goestling/Ybbs",
  },
];

function AustrianTestimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-scroll through all testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % austrianTestimonials.length);
    }, 6000); // Change every 6 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-12 bg-white border-t border-neutral-200">
      <Container>
        <div className="text-center mb-8">
          <p className="text-xs font-semibold tracking-wider text-emerald-700 uppercase">International Impact</p>
          <h2 className="mt-2 text-2xl font-bold text-neutral-900">
            Austrian Educational Exchange
          </h2>
        </div>

        {/* Single Auto-scrolling Carousel */}
        <div className="relative max-w-4xl mx-auto">
          <div className="bg-neutral-50 rounded-xl border border-neutral-200 overflow-hidden">
            <div className="relative min-h-70">
              {austrianTestimonials.map((testimonial, index) => (
                <div
                  key={index}
                  className={`transition-opacity duration-700 ${
                    index === currentIndex ? "opacity-100" : "opacity-0 absolute inset-0"
                  }`}
                >
                  {/* Text testimonials */}
                  <div className="flex flex-col items-center justify-center p-8 text-center">
                    <svg className="w-8 h-8 text-emerald-600 mb-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                    </svg>
                    <p className="text-base text-neutral-700 leading-relaxed mb-4 max-w-2xl italic">
                      "{testimonial.quote}"
                    </p>
                    <div className="font-semibold text-neutral-900">{testimonial.author}</div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Navigation dots */}
            <div className="flex justify-center gap-2 pb-6">
              {austrianTestimonials.map((_, index) => (
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

export default function OwlProjectPage() {
  return (
    <>
      {/* Hero Section with Background Video */}
      <section className="relative min-h-screen flex items-center overflow-hidden bg-slate-900">
        {/* Background Video - YouTube Embed */}
        <div className="absolute inset-0 z-0">
          <iframe
            src="https://www.youtube-nocookie.com/embed/dPxrN3_D9Yg?start=20&autoplay=1&mute=1&loop=1&playlist=dPxrN3_D9Yg&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1"
            className="absolute inset-0 w-full h-full pointer-events-none border-0"
            allow="autoplay; fullscreen"
            style={{ 
              border: 'none',
              width: '100vw',
              height: '100vh',
              objectFit: 'cover',
              transform: 'scale(1.5)',
            }}
          />
          {/* Overlay for text readability */}
          <div className="absolute inset-0 bg-black/30 z-10" />
        </div>

        {/* Content Overlay */}
        <Container className="relative z-20">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 drop-shadow-2xl">
              Owlproject.org
            </h1>
            
            <p className="text-base md:text-lg text-white/80 mb-12 drop-shadow-lg font-light max-w-2xl mx-auto">
              {content.quickSummary}
            </p>

            <div className="flex flex-wrap gap-6 justify-center mb-12">
              {content.stats.map((stat, index) => (
                <div key={index} className="bg-white/5 backdrop-blur-md rounded-2xl px-8 py-5 border border-white/10">
                  <p className="text-4xl font-bold text-white mb-1">{stat.number}</p>
                  <p className="text-sm text-white/70 font-medium">{stat.label}</p>
                </div>
              ))}
            </div>

            <a
              href="/contact"
              className="inline-flex items-center gap-3 px-8 py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-lg rounded-xl transition-all duration-300 shadow-2xl hover:shadow-emerald-500/50 hover:scale-105"
            >
              <span>Partner With Us</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </a>
          </div>
        </Container>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 animate-bounce">
          <div className="w-6 h-10 rounded-full border-2 border-white/40 flex items-start justify-center p-2">
            <div className="w-1.5 h-2 bg-white/60 rounded-full" />
          </div>
        </div>
      </section>

      {/* Key Achievements */}
      {/* Impact at a Glance - Combined Key Achievements + Quote */}
      <section className="py-20 bg-white">
        <Container>
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <div className="flex justify-center mb-8">
                <Image
                  src="/owlproject/327261299_575238884472935_2322100378308773305_n.png"
                  alt="OWL Project Logo"
                  width={200}
                  height={200}
                  className="object-contain"
                />
              </div>
              <h2 className="text-3xl font-bold text-neutral-900 mb-4">Impact at a Glance</h2>
              <p className="text-lg text-neutral-600 max-w-3xl mx-auto">
                Two decades of transforming lives through education and conservation
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Left: Key Achievements */}
              <div className="bg-neutral-50 border border-neutral-200 rounded-xl p-8">
                <h3 className="text-xl font-semibold text-neutral-900 mb-6">Key Achievements</h3>
                <ul className="space-y-3">
                  {content.keyTakeaways.map((takeaway, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <span className="text-emerald-600 mt-1">•</span>
                      <span className="text-base text-neutral-700">{takeaway}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Right: Headmaster Quote */}
              <div className="bg-neutral-50 border border-neutral-200 rounded-xl p-8 flex flex-col justify-center">
                <blockquote className="text-lg text-neutral-800 leading-relaxed mb-6 italic">
                  "owlproject.org raises the standard of living for children in these areas in 2 ways. It teaches them to nurture. They learn to look after the owls in their care, something not generally experienced by township children. Secondly, it teaches them awe and amazement for the world in which they live and the creatures with whom they share that world."
                </blockquote>
                <cite className="text-sm font-medium text-neutral-600 not-italic">
                  — Headmaster, participating township school
                </cite>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* OWL Project History */}
      <section className="py-16 bg-white">
        <Container>
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-neutral-900 mb-8">About owlproject.org</h2>
            <div className="space-y-6 text-neutral-700 leading-relaxed">
              <p>
                Owlproject.org was founded in 2001 with the purpose of introducing young South African children to the wonderful world of owls, their beauty as well as their enormous potential as partners in the control and management of rats within the often rodent infested and impoverished communities in which they live. In order to achieve this, it was essential to demystify the negative stigma attached to owls in Southern Africa.
              </p>
              <p>
                20 years on, 260,000 children and their parents have participated in the owlproject.org programme. A simple question to many urban South African children regarding owls will be met with the instantaneous answer, "they eat rats". Many informal settlement schools now enjoy occupied owl boxes of their own and participate in owl pellet dissection programmes that contribute greatly to owl/prey data analysis. The programme has been presented at 2 world owl conferences and was awarded the Birdlife Africa Award for Conservation as well as an award from the International Owl Centre in Houston, Minnesota. Owlproject.org is now underway with the continuation of this programme into other parts of South Africa as well as into our neighbouring African countries.
              </p>
              <p>
                The cornerstone of this programme is educational, although social and economic consideration is vital for the programme's success. In Africa, with its kaleidoscope of problems, from poverty, corruption, political and social unrest, the maxim "Without education there can be no conservation" could not be more true.
              </p>
              <p>
                There are so many challenges facing the youth in our country that the idea of donating to an owl programme in townships may seem frivolous. There are big issues that donor funds are required to tackle - health, education, food security, safety and more. Although rodents in townships impact on food security, affect health and the owlproject.org programme is highly educational, a discussion with a headmaster at one of our participating schools was particularly insightful.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Why Owls Section - Simplified */}
      <section className="py-16 bg-white">
        <Container>
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-neutral-900 mb-4">Why Owls?</h2>
              <p className="text-lg text-neutral-600 max-w-3xl mx-auto">
                Nature's most effective pest control solution
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-neutral-50 rounded-xl p-6 border border-neutral-200">
                <h3 className="text-lg font-bold text-neutral-900 mb-2">Effective</h3>
                <p className="text-neutral-600 text-sm leading-relaxed">
                  A single barn owl family can consume over 3,000 rodents per year.
                </p>
              </div>

              <div className="bg-neutral-50 rounded-xl p-6 border border-neutral-200">
                <h3 className="text-lg font-bold text-neutral-900 mb-2">Eco-Friendly</h3>
                <p className="text-neutral-600 text-sm leading-relaxed">
                  No chemicals, no poisons, no environmental damage. Pure nature.
                </p>
              </div>

              <div className="bg-neutral-50 rounded-xl p-6 border border-neutral-200">
                <h3 className="text-lg font-bold text-neutral-900 mb-2">Cost-Effective</h3>
                <p className="text-neutral-600 text-sm leading-relaxed">
                  One-time installation provides years of natural pest control.
                </p>
              </div>

              <div className="bg-neutral-50 rounded-xl p-6 border border-neutral-200">
                <h3 className="text-lg font-bold text-neutral-900 mb-2">Educational</h3>
                <p className="text-neutral-600 text-sm leading-relaxed">
                  Provides unique opportunities about conservation and ecology.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Austrian Testimonials Section */}
      <AustrianTestimonials />

      {/* Final CTA Strip */}
      <section className="py-16 bg-linear-to-br from-emerald-600 to-emerald-700">
        <Container>
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Make a Difference?
            </h2>
            <p className="text-lg text-white/90 mb-10 max-w-2xl mx-auto">
              Partner with us to bring the OWL Project to your community or support conservation education worldwide.
            </p>
            
            <div className="flex flex-wrap gap-4 justify-center">
              {/* WhatsApp Button */}
              <a 
                href="https://wa.me/27723659777"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-8 py-4 bg-white text-emerald-700 font-semibold rounded-xl hover:bg-neutral-50 transition-all shadow-lg hover:shadow-xl"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                WhatsApp Us
              </a>

              {/* Call Button */}
              <a 
                href="tel:+27118024214"
                className="inline-flex items-center gap-3 px-8 py-4 bg-white text-emerald-700 font-semibold rounded-xl hover:bg-neutral-50 transition-all shadow-lg hover:shadow-xl"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                Call Us
              </a>

              {/* Email Button */}
              <a 
                href="mailto:info@ecosolutions.co.za"
                className="inline-flex items-center gap-3 px-8 py-4 bg-white text-emerald-700 font-semibold rounded-xl hover:bg-neutral-50 transition-all shadow-lg hover:shadow-xl"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Email Us
              </a>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
