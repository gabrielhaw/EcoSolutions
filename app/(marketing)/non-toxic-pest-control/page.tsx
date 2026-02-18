import Container from "@/components/ui/Container";
import SectionHeading from "@/components/sections/SectionHeading";
import Card from "@/components/ui/Card";
import ContactBar from "@/components/sections/ContactBar";
import CTA from "@/components/sections/CTA";
import { site } from "@/lib/site";

export const metadata = {
  title: "Non-Toxic Pest Control",
  description:
    "Explore comprehensive guides on sustainable, poison-free pest control using natural predators like bats and owls. Science-backed solutions for agricultural and suburban environments.",
};

export default function NonToxicPestControlPage() {
  const availablePages = site.pestControlPages || [];

  return (
    <>
      {/* Quick Contact Bar */}
      <ContactBar variant="compact" />

      {/* Main Content */}
      <section className="py-14 pt-28">
        <Container>
          <SectionHeading
            title="Non-Toxic Pest Control Solutions"
            subtitle="Science-backed resources on sustainable, poison-free pest management using natural predators and integrated pest management (IPM) strategies."
          />

          {/* Quick Summary */}
          <div className="mt-10 bg-emerald-50 border border-emerald-200 rounded-2xl p-8">
            <h3 className="text-xl font-semibold text-neutral-900 mb-4">
              Why Choose Non-Toxic Methods?
            </h3>
            <div className="grid md:grid-cols-3 gap-6 text-sm text-neutral-700">
              <div>
                <div className="font-semibold text-emerald-700 mb-2">Wildlife-Based</div>
                <p>Harness natural predators like bats and owls to control pest populations sustainably and effectively.</p>
              </div>
              <div>
                <div className="font-semibold text-emerald-700 mb-2">Eco-Friendly</div>
                <p>Eliminate chemical pesticides that harm beneficial insects, pollinators, and contaminate ecosystems.</p>
              </div>
              <div>
                <div className="font-semibold text-emerald-700 mb-2">Cost-Effective</div>
                <p>One-time installations provide years of continuous pest control without recurring chemical costs.</p>
              </div>
            </div>
          </div>

          {/* Available Resources */}
          <div className="mt-16">
            <h2 className="text-2xl font-semibold text-neutral-900 mb-8">
              Explore Our Guides
            </h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {availablePages.map((page) => (
                <a
                  key={page.href}
                  href={page.href}
                  className="block group"
                >
                  <Card title={page.label} eyebrow="Guide">
                    <p className="text-neutral-600 group-hover:text-neutral-900 transition-colors">
                      {page.description}
                    </p>
                    <div className="mt-4 inline-flex items-center text-sm font-medium text-emerald-700 group-hover:text-emerald-800">
                      Read more
                      <svg
                        className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </div>
                  </Card>
                </a>
              ))}

              {/* Coming Soon Cards */}
              <Card title="Owls & Rodent Control" eyebrow="Coming Soon">
                <p className="text-neutral-500">
                  Comprehensive guide on using owls for agricultural rodent management.
                </p>
              </Card>

              <Card title="Non-toxic Rodent Control" eyebrow="Coming Soon">
                <p className="text-neutral-500">
                  General strategies for managing rodent populations without poisons.
                </p>
              </Card>

              <Card title="Poison-free Suburbs" eyebrow="Coming Soon">
                <p className="text-neutral-500">
                  Residential pest control solutions for suburban environments.
                </p>
              </Card>
            </div>
          </div>

          {/* Key Benefits */}
          <div className="mt-16 grid md:grid-cols-2 gap-8">
            <div className="bg-white border border-neutral-200 rounded-2xl p-8">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-emerald-100 rounded-xl shrink-0">
                  <svg
                    className="w-6 h-6 text-emerald-700"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-neutral-900 mb-2">
                    Proven Effectiveness
                  </h3>
                  <p className="text-sm text-neutral-700 leading-relaxed">
                    Scientific research demonstrates that natural predator-based pest control
                    is as effective as chemical methods, with the added benefit of long-term
                    sustainability and zero environmental impact.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white border border-neutral-200 rounded-2xl p-8">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-emerald-100 rounded-xl shrink-0">
                  <svg
                    className="w-6 h-6 text-emerald-700"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-neutral-900 mb-2">
                    Educational Resources
                  </h3>
                  <p className="text-sm text-neutral-700 leading-relaxed">
                    Each guide includes detailed scientific information, peer-reviewed
                    citations, and practical implementation advice for farmers, landowners,
                    and conservation practitioners.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Section */}
          <div className="mt-16">
            <ContactBar />
          </div>
        </Container>
      </section>

      {/* Bottom CTA */}
      <CTA />
    </>
  );
}
