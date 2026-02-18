import Container from "@/components/ui/Container";
import SectionHeading from "@/components/sections/SectionHeading";
import Card from "@/components/ui/Card";
import CTA from "@/components/sections/CTA";

export const metadata = {
  title: "Products",
  description:
    "Owl boxes, bat houses, and wildlife habitat products designed for real-world performance in South Africa.",
};

export default function ProductsPage() {
  return (
    <>
      <section className="py-14 pt-28">
        <Container>
          <SectionHeading
            title="Products"
            subtitle="Request pricing and recommendations based on your site and target outcomes."
          />
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <Card title="Owl boxes" eyebrow="Rodent management">
              Durable builds for farms, estates, and urban settings.
            </Card>
            <Card title="Bat houses" eyebrow="Insect management">
              Roost designs with placement guidance for higher occupancy success.
            </Card>
            <Card title="Wildlife habitat products" eyebrow="Biodiversity">
              Nesting and feeding solutions for wildlife-friendly properties.
            </Card>
          </div>
        </Container>
      </section>
      <CTA />
    </>
  );
}
