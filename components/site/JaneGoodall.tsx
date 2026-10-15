import Image from "next/image";

/** Dr Jane Goodall's handwritten note to Jonathan Haw, shown whole with a transcription beside it. */
export default function JaneGoodall({ as: Heading = "h2" }: { as?: "h1" | "h2" }) {
  return (
    <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
      <div className="lg:col-span-5" data-reveal>
        <p className="label text-accent">A note from Dr Jane Goodall</p>
        <Heading className="display mt-5 text-[clamp(1.6rem,1.2rem+1.6vw,2.5rem)] leading-[1.2]">
          “Together we can make this a better world for all… What you are doing is <span className="text-accent">amazing</span>, and I truly look forward to working with you.”
        </Heading>
        <p className="mt-6 text-[15px] text-fg-3">Handwritten to Jonathan Haw, founder of EcoSolutions and Owlproject.org</p>
      </div>
      <figure className="lg:col-span-7" data-reveal style={{ "--d": "120ms" } as React.CSSProperties}>
        <div className="rounded-3xl bg-canvas-2 p-3 sm:p-5">
          <Image
            src="/media/testimonials/3c790926d7.jpg"
            alt="Handwritten note from Jane Goodall: “For Jonathan – Together we can make this a better world for all, save some of the amazing animals with whom we share this planet. What you are doing is amazing & I truly look forward to working with you. Jane Goodall”"
            width={1024}
            height={913}
            sizes="(min-width: 1024px) 55vw, 100vw"
            className="h-auto w-full rounded-2xl shadow-xl shadow-black/15"
          />
        </div>
      </figure>
    </div>
  );
}
