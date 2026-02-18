import Image from "next/image";

interface InternationalSectionProps {
  heading: string;
  children: React.ReactNode;
  images: string[];
}

export default function InternationalSection({
  heading,
  children,
  images,
}: InternationalSectionProps) {
  return (
    <section className="mb-20">
      <h2 className="text-2xl font-semibold text-neutral-900 mb-6">{heading}</h2>
      
      {/* Image Grid */}
      {images.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {images.map((image, index) => (
            <div key={index} className="relative aspect-4/3 rounded-xl overflow-hidden border border-neutral-200">
              <Image
                src={`/owlproject/${image}`}
                alt={`${heading} - Image ${index + 1}`}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
            </div>
          ))}
        </div>
      )}
      
      {/* Content */}
      <div className="prose prose-neutral max-w-none">
        {children}
      </div>
    </section>
  );
}
