import Container from "@/components/ui/Container";
import SchoolMap from "@/components/maps/SchoolMap";

export default function SchoolsPage() {
  return (
    <div className="min-h-screen bg-white py-12 pt-28">
      <Container>
        {/* Page Header */}
        <div className="mb-12">
          <div className="mb-6">
            <h1 className="text-5xl font-bold mb-2 text-neutral-900">
              Schools Partnership Map
            </h1>
            <p className="text-lg text-neutral-600">
              Explore our conservation projects across educational institutions in KwaZulu-Natal
            </p>
          </div>
          
          {/* Quick Stats Banner */}
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-neutral-50 rounded-xl p-4 border border-neutral-200">
              <p className="text-3xl font-bold text-neutral-900 mb-1">8</p>
              <p className="text-sm text-neutral-600 font-medium">Partner Schools</p>
            </div>
            <div className="bg-neutral-50 rounded-xl p-4 border border-neutral-200">
              <p className="text-3xl font-bold text-neutral-900 mb-1">85</p>
              <p className="text-sm text-neutral-600 font-medium">Boxes Installed</p>
            </div>
            <div className="bg-neutral-50 rounded-xl p-4 border border-neutral-200">
              <p className="text-3xl font-bold text-neutral-900 mb-1">100%</p>
              <p className="text-sm text-neutral-600 font-medium">Active Projects</p>
            </div>
          </div>
        </div>

        {/* School Map Component */}
        <SchoolMap />

        {/* Additional Info */}
        <div className="mt-10 bg-neutral-50 border border-neutral-200 rounded-xl p-8">
          <div>
            <h3 className="text-xl font-bold text-neutral-900 mb-3">About Our School Projects</h3>
            <p className="text-sm text-neutral-700 leading-relaxed mb-4">
              We partner with schools across KwaZulu-Natal to install bat and owl boxes, creating sustainable pest control solutions while educating students about conservation. Each installation includes educational workshops and ongoing monitoring support.
            </p>
            <div className="flex flex-wrap gap-3">
              <div className="px-4 py-2 bg-white rounded-lg border border-neutral-300">
                <p className="text-xs text-neutral-700 font-semibold">✓ Educational Workshops</p>
              </div>
              <div className="px-4 py-2 bg-white rounded-lg border border-neutral-300">
                <p className="text-xs text-neutral-700 font-semibold">✓ Ongoing Monitoring</p>
              </div>
              <div className="px-4 py-2 bg-white rounded-lg border border-neutral-300">
                <p className="text-xs text-neutral-700 font-semibold">✓ Conservation Education</p>
              </div>
            </div>
            <a 
              href="/contact" 
              className="inline-flex items-center gap-2 mt-6 px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-xl transition-all"
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
