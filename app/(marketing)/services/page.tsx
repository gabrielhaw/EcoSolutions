import Container from "@/components/ui/Container";
import SectionHeading from "@/components/sections/SectionHeading";
import Card from "@/components/ui/Card";
import CTA from "@/components/sections/CTA";

export const metadata = {
  title: "Services",
  description:
    "Integrated Pest Management (IPM), non-toxic rodent control, owl and bat-based solutions, habitat installations, and monitoring services.",
};

export default function ServicesPage() {
  return (
    <>
      <section className="py-14 pt-28">
        <Container>
          <SectionHeading
            title="Services"
            subtitle="End-to-end delivery: assess → plan → install → monitor. Built for measurable, long-term outcomes."
          />
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <Card title="Integrated Pest Management (IPM)" eyebrow="Core">
              Strategy and implementation using non-toxic, ecosystem-based methods.
            </Card>
            <Card title="Non-toxic rodent & pest control" eyebrow="Outcome">
              Reduce pest pressure without secondary poisoning or ecosystem harm.
            </Card>
            <Card title="Owl-based solutions" eyebrow="Wildlife">
              Owl box programs for farms, estates, and developments.
            </Card>
            <Card title="Bat-based solutions" eyebrow="Wildlife">
              Bat houses, guidance, and exclusion support where needed.
            </Card>
            <Card title="Installations" eyebrow="Field work">
              Owl boxes, bat houses, nesting logs and habitat enhancements.
            </Card>
            <Card title="Monitoring & maintenance" eyebrow="Ongoing">
              Inspections, servicing, reporting, and program refinement.
            </Card>
          </div>
        </Container>
      </section>
      <CTA />
    </>
  );
}
