import Container from "@/components/ui/Container";
import SectionHeading from "@/components/sections/SectionHeading";
import ContactBar from "@/components/sections/ContactBar";
import Accordion from "@/components/ui/Accordion";
import CTA from "@/components/sections/CTA";
import content from "@/content/bats-agricultural-pest-control.json";

export const metadata = {
  title: content.title,
  description: content.quickSummary,
};

export default function BatsAgriculturalPestControlPage() {
  return (
    <>
      {/* Quick Contact Bar */}
      <ContactBar variant="compact" />

      {/* Main Content */}
      <section className="py-14 pt-28">
        <Container>
          {/* Page Title */}
          <SectionHeading
            title={content.title}
            subtitle={content.quickSummary}
          />

          {/* Key Takeaways */}
          <div className="mt-10 bg-emerald-50 border border-emerald-200 rounded-2xl p-6">
            <h3 className="text-lg font-semibold text-neutral-900 mb-4">
              Key Takeaways
            </h3>
            <ul className="space-y-2">
              {content.keyTakeaways.map((takeaway, index) => (
                <li key={index} className="flex items-start gap-3">
                  <svg
                    className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5"
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
                  <span className="text-sm text-neutral-700">{takeaway}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Full Content in Accordion */}
          <div className="mt-10">
            <Accordion title={content.scienceTitle}>
              <div
                dangerouslySetInnerHTML={{ __html: content.scienceLongText }}
              />
              {content.citations && content.citations.length > 0 && (
                <div className="mt-8 pt-6 border-t border-neutral-200">
                  <h4 className="text-sm font-semibold text-neutral-900 mb-3">
                    References
                  </h4>
                  <ul className="space-y-2">
                    {content.citations.map((citation, index) => (
                      <li key={index} className="text-xs text-neutral-600">
                        {citation}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </Accordion>
          </div>

          {/* Contact Section */}
          <div className="mt-10">
            <ContactBar />
          </div>
        </Container>
      </section>

      {/* Bottom CTA */}
      <CTA />
    </>
  );
}
