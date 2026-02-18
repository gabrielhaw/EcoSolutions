import Container from "@/components/ui/Container";
import SectionHeading from "@/components/sections/SectionHeading";
import CTA from "@/components/sections/CTA";

export const metadata = {
  title: "About",
  description:
    "Learn about EcoSolutions Urban Ecology—our approach to non-toxic pest control and biodiversity-first urban ecology in South Africa.",
};

export default function AboutPage() {
  return (
    <>
      <section className="py-14 pt-28">
        <Container>
          <SectionHeading
            title="About EcoSolutions"
            subtitle="We design and implement sustainable pest management that protects biodiversity while solving real pest challenges."
          />
          <div className="mt-8 max-w-3xl space-y-4 text-sm leading-7 text-neutral-700">
            <p>
              EcoSolutions is a South African environmental company specialising in integrated pest
              management (IPM) using wildlife-based solutions instead of harmful chemicals.
            </p>
            <p>
              Our work blends science, conservation, and practical implementation—tailored for farms,
              estates, homes, and businesses.
            </p>
            <p>
              We install owl boxes, bat houses, and wildlife-friendly habitat improvements, monitor
              their success, and provide ongoing maintenance and reporting.
            </p>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2">
            <div className="rounded-2xl border border-neutral-200 bg-white p-6">
              <h3 className="text-lg font-semibold text-neutral-900">Our approach</h3>
              <p className="mt-3 text-sm leading-6 text-neutral-700">
                Every project starts with a site assessment. We design an IPM plan that matches your
                land use, pest pressure, and conservation goals—then implement, monitor, and maintain
                for long-term success.
              </p>
            </div>
            <div className="rounded-2xl border border-neutral-200 bg-white p-6">
              <h3 className="text-lg font-semibold text-neutral-900">Why wildlife-based?</h3>
              <p className="mt-3 text-sm leading-6 text-neutral-700">
                Poisons kill non-target species and disrupt ecosystems. Wildlife-based systems—like
                owls and bats—control pests naturally, protect biodiversity, and create measurable,
                sustainable outcomes.
              </p>
            </div>
          </div>
        </Container>
      </section>
      <CTA />
    </>
  );
}
