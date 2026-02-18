import Container from "@/components/ui/Container";
import SectionHeading from "@/components/sections/SectionHeading";
import Card from "@/components/ui/Card";
import CTA from "@/components/sections/CTA";

export const metadata = {
  title: "Conservation",
  description:
    "How EcoSolutions integrates conservation into pest management—protecting biodiversity while solving real-world pest challenges.",
};

export default function ConservationPage() {
  return (
    <>
      <section className="py-14 pt-28">
        <Container>
          <SectionHeading
            title="Conservation-first pest management"
            subtitle="Our work protects biodiversity while addressing real pest challenges—creating measurable conservation outcomes alongside practical solutions."
          />
          
          <div className="mt-8 max-w-3xl space-y-4 text-sm leading-7 text-neutral-700">
            <p>
              Traditional pest control relies on poisons that harm non-target species and disrupt
              ecosystems. We take a different approach: using natural predators and habitat restoration
              to create sustainable, wildlife-friendly solutions.
            </p>
            <p>
              Every owl box, bat house, and habitat installation we deploy serves a dual purpose—
              reducing pest pressure while creating safe nesting and roosting sites for threatened species.
            </p>
          </div>

          <div className="mt-12">
            <h3 className="text-xl font-semibold text-neutral-900">Conservation outcomes</h3>
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <Card title="Barn Owls" eyebrow="Species protection">
                Creating safe nesting sites for Barn Owls—a natural rodent control species under
                pressure from habitat loss and secondary poisoning.
              </Card>
              <Card title="Bats" eyebrow="Ecosystem services">
                Supporting bat populations through roosting habitat and exclusion guidance—protecting
                essential insect control and pollination services.
              </Card>
              <Card title="Non-target species" eyebrow="Biodiversity">
                Eliminating secondary poisoning risks for raptors, owls, and other species that feed
                on rodents and pests.
              </Card>
              <Card title="Habitat restoration" eyebrow="Long-term impact">
                Installing wildlife-friendly infrastructure that supports biodiversity recovery and
                ecosystem resilience.
              </Card>
              <Card title="Monitoring & research" eyebrow="Data-driven">
                Tracking occupancy, breeding success, and pest reduction to measure conservation and
                pest management outcomes.
              </Card>
              <Card title="Education & awareness" eyebrow="Community impact">
                Training landowners, estates, and organisations on biodiversity-first approaches to
                pest management.
              </Card>
            </div>
          </div>
        </Container>
      </section>
      <CTA />
    </>
  );
}
