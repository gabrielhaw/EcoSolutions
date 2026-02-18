import Image from "next/image";

interface ImageData {
  src: string;
  alt: string;
}

interface OwlInternationalSectionProps {
  heading: string;
  children: React.ReactNode;
  images: ImageData[];
}

export default function OwlInternationalSection({ heading, children, images }: OwlInternationalSectionProps) {
  return (
    <div className="mb-16 pb-16 border-b border-neutral-200 last:border-b-0 last:mb-0 last:pb-0">
      <h3 className="text-2xl font-bold text-neutral-900 mb-6">{heading}</h3>
      
      <div className="prose prose-neutral max-w-none mb-8">
        {children}
      </div>

      {images.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {images.map((image, index) => (
            <div key={index} className="relative aspect-4/3 rounded-xl overflow-hidden border border-neutral-200 hover:shadow-lg transition-shadow">
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
