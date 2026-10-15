import Container from "@/components/ui/Container";
import SchoolMap from "@/components/maps/SchoolMap";

export const metadata = {
  title: "Schools Owl Box Partnership Map",
  description: "Map of EcoSolutions and Owlproject.org owl box conservation projects at partner schools.",
  alternates: { canonical: "/schools" },
};

export default function SchoolsPage() {
  return (
    <div className="min-h-screen bg-canvas py-12 pt-28">
      <Container>
        {/* Page Header */}
        <div className="mb-12">
          <div className="mb-6">
            <h1 className="text-5xl font-bold mb-2 text-fg">
              Schools Partnership Map
            </h1>
            <p className="text-lg text-fg-2">
              Explore our conservation projects across educational institutions in KwaZulu-Natal
            </p>
          </div>
          
          {/* Quick Stats Banner */}
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-canvas-2 rounded-xl p-4 border border-line">
              <p className="text-3xl font-bold text-fg mb-1">8</p>
              <p className="text-sm text-fg-2 font-medium">Partner Schools</p>
            </div>
            <div className="bg-canvas-2 rounded-xl p-4 border border-line">
              <p className="text-3xl font-bold text-fg mb-1">85</p>
              <p className="text-sm text-fg-2 font-medium">Boxes Installed</p>
            </div>
            <div className="bg-canvas-2 rounded-xl p-4 border border-line">
              <p className="text-3xl font-bold text-fg mb-1">100%</p>
              <p className="text-sm text-fg-2 font-medium">Active Projects</p>
            </div>
          </div>
        </div>

        {/* School Map Component */}
        <SchoolMap />

        {/* Additional Info */}
        <div className="mt-10 bg-canvas-2 border border-line rounded-xl p-8">
          <div>
            <h3 className="text-xl font-bold text-fg mb-3">About Our School Projects</h3>
            <p className="text-sm text-fg-2 leading-relaxed mb-4">
              We partner with schools across KwaZulu-Natal to install bat and owl boxes, creating sustainable pest control solutions while educating students about conservation. Each installation includes educational workshops and ongoing monitoring support.
            </p>
            <div className="flex flex-wrap gap-3">
              <div className="px-4 py-2 bg-canvas rounded-lg border border-line-strong">
                <p className="text-xs text-fg-2 font-semibold">✓ Educational Workshops</p>
              </div>
              <div className="px-4 py-2 bg-canvas rounded-lg border border-line-strong">
                <p className="text-xs text-fg-2 font-semibold">✓ Ongoing Monitoring</p>
              </div>
              <div className="px-4 py-2 bg-canvas rounded-lg border border-line-strong">
                <p className="text-xs text-fg-2 font-semibold">✓ Conservation Education</p>
              </div>
            </div>
            <a 
              href="/contact" 
              className="inline-flex items-center gap-2 mt-6 px-6 py-3 bg-accent hover:bg-accent-2 text-canvas font-semibold rounded-xl transition-all"
            >
              <span>Bring This to Your School</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </a>
          </div>
        </div>
      </Container>
    </div>
  );
}
