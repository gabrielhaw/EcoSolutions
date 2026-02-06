import Container from "@/components/ui/Container";
import SectionHeading from "@/components/sections/SectionHeading";

export const metadata = {
  title: "Contact",
  description:
    "Request a consultation or product recommendation from EcoSolutions Urban Ecology.",
};

export default function ContactPage() {
  return (
    <section className="py-14">
      <Container>
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <SectionHeading
              title="Request a consultation"
              subtitle="Tell us what you’re dealing with and where. We’ll respond with a practical, biodiversity-first plan."
            />
            <div className="mt-6 space-y-3 text-sm text-neutral-700">
              <p><span className="font-medium">Focus:</span> Non-toxic rodent/pest control, owls, bats, habitat installs.</p>
              <p><span className="font-medium">Service areas:</span> South Africa (national projects available).</p>
              <p className="text-neutral-500">
                Tip: Include photos, property type (farm/estate/home/business), and your location/province.
              </p>
            </div>
          </div>

          <form className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
            <div className="grid gap-4">
              <div>
                <label className="text-sm font-medium">Name</label>
                <input
                  className="mt-1 w-full rounded-xl border border-neutral-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-200"
                  placeholder="Your name"
                  name="name"
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="text-sm font-medium">Email</label>
                  <input
                    className="mt-1 w-full rounded-xl border border-neutral-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-200"
                    placeholder="you@example.com"
                    name="email"
                    type="email"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Phone</label>
                  <input
                    className="mt-1 w-full rounded-xl border border-neutral-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-200"
                    placeholder="+27…"
                    name="phone"
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium">Property type</label>
                <select
                  className="mt-1 w-full rounded-xl border border-neutral-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-200"
                  name="propertyType"
                  defaultValue="Farm"
                >
                  <option>Farm / Agricultural estate</option>
                  <option>Eco estate / Developer</option>
                  <option>Homeowner / Residential estate</option>
                  <option>Business</option>
                  <option>Conservation organisation</option>
                </select>
              </div>

              <div>
                <label className="text-sm font-medium">What do you need?</label>
                <textarea
                  className="mt-1 min-h-30 w-full rounded-xl border border-neutral-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-200"
                  placeholder="Briefly describe the pest issue, location, and what you’ve tried so far…"
                  name="message"
                />
              </div>

              <button
                type="button"
                className="rounded-xl bg-emerald-700 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-800 focus:outline-none focus:ring-2 focus:ring-emerald-200"
              >
                Send request
              </button>

              <p className="text-xs text-neutral-500">
                This is a placeholder submit button. Next step: wire this to email/Zoho/Zapier/Vercel function.
              </p>
            </div>
          </form>
        </div>
      </Container>
    </section>
  );
}
