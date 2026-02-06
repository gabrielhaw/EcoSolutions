import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";

export default function CTA() {
  return (
    <section className="py-14">
      <Container>
        <div className="rounded-3xl border border-emerald-100 bg-emerald-50 p-8 sm:p-10">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="max-w-2xl">
              <h3 className="text-xl font-semibold text-neutral-900">
                Ready to go poison-free?
              </h3>
              <p className="mt-2 text-sm leading-6 text-neutral-700">
                Request a site assessment or product recommendation. We’ll design an IPM plan that
                protects biodiversity and solves your pest problem sustainably.
              </p>
            </div>
            <div className="flex gap-3">
              <Button href="/contact">Request a consultation</Button>
              <Button href="/services" variant="ghost">
                Explore services
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
