import Container from "@/components/ui/Container";
import SectionHeading from "@/components/sections/SectionHeading";
import Card from "@/components/ui/Card";
import CTA from "@/components/sections/CTA";

export const metadata = {
  title: "Projects",
  description:
    "Case studies and project examples from EcoSolutions—integrated pest management and wildlife-based solutions in action across South Africa.",
};

export default function ProjectsPage() {
  return (
    <>
      <section className="py-14 pt-28">
        <Container>
          <SectionHeading
            title="Projects & case studies"
            subtitle="Real-world examples of integrated pest management and wildlife-based solutions in action—from farms and estates to homes and businesses."
          />

          <div className="mt-8 space-y-8">
            <div className="rounded-2xl border border-neutral-200 bg-white p-8">
              <p className="text-xs font-medium tracking-wide text-emerald-700">Wine Estate • Western Cape</p>
              <h3 className="mt-2 text-xl font-semibold text-neutral-900">
                Owl-based rodent control across 200 hectares
              </h3>
              <p className="mt-3 text-sm leading-6 text-neutral-700">
                Installed 18 owl boxes across vineyards and farm buildings to reduce rodent damage to
                irrigation systems and stored grain. Result: 85% reduction in rodent signs within 18
                months, with 12 breeding pairs of Barn Owls established.
              </p>
            </div>

            <div className="rounded-2xl border border-neutral-200 bg-white p-8">
              <p className="text-xs font-medium tracking-wide text-emerald-700">Residential Estate • Gauteng</p>
              <h3 className="mt-2 text-xl font-semibold text-neutral-900">
                Bat-based insect control and exclusion guidance
              </h3>
              <p className="mt-3 text-sm leading-6 text-neutral-700">
                Deployed 24 bat houses across the estate to support natural insect control, combined
                with exclusion guidance for buildings with unwanted bat roosts. Result: Reduced mosquito
                complaints by 60% and successfully relocated bat colonies without harm.
              </p>
            </div>

            <div className="rounded-2xl border border-neutral-200 bg-white p-8">
              <p className="text-xs font-medium tracking-wide text-emerald-700">Farm • KwaZulu-Natal</p>
              <h3 className="mt-2 text-xl font-semibold text-neutral-900">
                Integrated pest management for grain storage
              </h3>
              <p className="mt-3 text-sm leading-6 text-neutral-700">
                Full IPM strategy combining owl boxes, habitat management, and monitoring for rodent
                control around grain storage facilities. Result: Eliminated need for rodenticides and
                reduced grain losses by 40%.
              </p>
            </div>
          </div>

          <div className="mt-12 rounded-2xl bg-neutral-50 p-8 text-center">
            <h3 className="text-lg font-semibold text-neutral-900">Want to see your project here?</h3>
            <p className="mt-2 text-sm text-neutral-700">
              We work with farms, estates, businesses, and conservation organisations across South Africa.
            </p>
          </div>
        </Container>
      </section>
      <CTA />
    </>
  );
}
