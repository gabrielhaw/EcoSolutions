import Container from "@/components/ui/Container";

export const metadata = {
  title: "Global Impact - International Collaboration",
  description:
    "Over the past 20 years, owlproject.org has made an impact across the world through education, conservation, and international collaboration.",
  alternates: { canonical: "/our-work/international" },
};

interface QuoteBlockProps {
  quote: string;
  author: string;
}

function QuoteBlock({ quote, author }: QuoteBlockProps) {
  return (
    <blockquote className="my-12 pl-8 border-l-2 border-accent">
      <p className="text-xl md:text-2xl italic text-fg-2 leading-relaxed mb-4">
        "{quote}"
      </p>
      <footer className="text-sm text-fg-3 font-medium">
        {author}
      </footer>
    </blockquote>
  );
}

interface TestimonialCardProps {
  quote: string;
  author: string;
  location: string;
}

function TestimonialCard({ quote, author, location }: TestimonialCardProps) {
  return (
    <div className="border border-line rounded-lg p-8 hover:border-accent transition-colors">
      <p className="text-lg text-fg-2 leading-relaxed mb-6 italic">
        "{quote}"
      </p>
      <div className="text-sm text-fg-3">
        <span className="font-medium text-fg">— {author}</span>
        {location && `, ${location}`}
      </div>
    </div>
  );
}

interface SectionProps {
  title: string;
  children: React.ReactNode;
}

function Section({ title, children }: SectionProps) {
  return (
    <section className="py-16 border-b border-line last:border-b-0">
      <h2 className="text-2xl md:text-3xl font-medium text-fg mb-8">
        {title}
      </h2>
      <div className="prose prose-lg max-w-none text-fg leading-relaxed space-y-6 text-justify">
        {children}
      </div>
    </section>
  );
}

export default function InternationalPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="pt-32 pb-24 bg-canvas">
        <Container>
          <div className="max-w-4xl mx-auto">
            <div className="mb-4 h-px w-16 bg-accent" />
            <h1 className="text-4xl md:text-5xl font-light tracking-tight text-fg mb-4">
              GLOBAL IMPACT
            </h1>
            <p className="text-xl text-fg-3 mb-12">
              International Collaboration
            </p>
            <p className="text-lg leading-relaxed text-fg-2 max-w-3xl">
              Over the past 20 years, owlproject.org has made an impact across the world 
              through education, conservation, and international collaboration.
            </p>
          </div>
        </Container>
      </section>

      {/* Main Content */}
      <Container>
        <div className="max-w-4xl mx-auto pb-24">
          {/* China Section */}
          <Section title="South Africa and China Education Exchange">
            <p>
              On Wednesday 19 April 2023, students from Shenzhen College of International Education 
              in China and Marlboro Gardens Combined School in South Africa exchanged knowledge about 
              all things owl related.
            </p>
            <p>
              For the past week, students had been researching, creating artwork, and preparing 
              presentations for this international online event.
            </p>
            <p>
              This event was coordinated by representatives of owlproject.org and teachers at 
              Shenzhen College of International Education.
            </p>

            <QuoteBlock
              quote="Events like these help bridge the gap between continents. It also allows children from different ethnic backgrounds to learn about each other's culture."
              author="— Jordan-Michael Hardey, Project Coordinator"
            />

            <p>
              The South African students performed a song titled "Help me save an owl" and presented 
              on South African owl species, the dangers of rat poison, myths surrounding owls, and 
              owl names in indigenous African languages.
            </p>
            <p>
              They also conducted a live owl pellet dissection, demonstrating how owls naturally 
              control rodent populations.
            </p>
            <p>
              Chinese students presented their own research and helped South African students learn 
              the Mandarin word for owl: Māotóuyīng.
            </p>
          </Section>

          {/* USA Section */}
          <Section title="International Owl Centre Recognition">
            <p>
              In 2017, owlproject.org received the Special Achievement Award from the International 
              Owl Centre in Houston, Minnesota.
            </p>
            <p>
              In March 2018, Jonathan Haw accepted the award at the International Festival of Owls, 
              and owlproject.org was officially inducted into the Owl Hall of Fame.
            </p>
            <p>
              This recognition reflects the global importance of owlproject.org's educational and 
              conservation work.
            </p>
          </Section>

          {/* Portugal Section */}
          <Section title="World Owl Conference – Portugal">
            <p>
              In September 2017, Jonathan Haw presented scientific research at the World Owl 
              Conference in Evora, Portugal.
            </p>
            <p>
              He presented: <em>"From Cures to Curses – Owls and their place in Traditional 
              medicine in Southern Africa"</em>
            </p>
            <p>
              The conference emphasized global collaboration and conservation education.
            </p>
          </Section>

          {/* Nepal Section */}
          <Section title="Nepal Owl Festival">
            <p>
              Owlproject.org attended the Nepal Owl Festival, which attracted approximately 10,000 
              visitors and reached millions through international media.
            </p>
            <p>
              The festival helps reduce myths and promotes owl conservation through education.
            </p>
          </Section>

          {/* India Section */}
          <Section title="World Owl Conference – India">
            <p>
              In 2019, owlproject.org presented scientific papers on owl conservation and education.
            </p>
            <p>
              Owls play a critical ecological role by naturally controlling rodent populations.
            </p>
          </Section>

          {/* Austria Section */}
          <Section title="Austria and South Africa Educational Exchange">
            <p>
              Students from Alexandra Township collaborated with Austrian students through 
              owlproject.org's education programme.
            </p>

            <QuoteBlock
              quote="Education is the most powerful weapon which you can use to change the world."
              author="— Nelson Mandela"
            />

            <QuoteBlock
              quote="It is impressive what owlproject.org has established and the difference it is making for conservation and society."
              author="— Austrian project partner"
            />
          </Section>

          {/* Testimonials Section */}
          <section className="py-24">
            <h2 className="text-2xl md:text-3xl font-medium text-fg mb-12">
              Testimonials
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <TestimonialCard
                quote="Privatschule Friesgasse Vienna. Very impressive!!!!! Wow!!"
                author="David J."
                location=""
              />
              <TestimonialCard
                quote="Continent connecting owl project. Exemplary how globally it can collaborate."
                author="Ernestus S."
                location=""
              />
              <TestimonialCard
                quote="You have been really very active and the diversity of the school projects is remarkable and impressive. Thank you again for the very interesting presentation evening in Vienna. I was pleased to find out that the project is organised much more complexly than expected – with social, political, economic, ecological, educational aspects."
                author="Roman"
                location="Vienna"
              />
              <TestimonialCard
                quote="It was a very interesting presentation and a successful informational event! Congratulations!"
                author="Major Friedrich Fahrnberger"
                location="Goestling/Ybbs"
              />
              <TestimonialCard
                quote="We all were participating in the school owl project with owlproject.org and the Duerrenstein Wilderness Area with full enthusiasm and found the project amazing! We would be happy about a continuation of the project or a similar project."
                author="School Director Josef N."
                location="Goestling/Ybbs"
              />
              <TestimonialCard
                quote="It was great. An unforgettable impression. Thank you again, Ingrid and Jonathan. I wish Jonathan a good journey home and hope that we are going to meet again. Heartfelt greetings."
                author="Biology Teacher Karin K."
                location="Vienna"
              />
              <TestimonialCard
                quote="Owl fever has broken out during three weeks of an owl school project in the school NMS Göstling. Very cool. Very professional. Your enthusiasm is infectious. Heartfelt wishes for the owlproject.org day today. Some of our kids already had contact with the kids in South Africa over the weekend."
                author="Teacher Claudia B."
                location="Goestling/Ybbs"
              />
              <TestimonialCard
                quote="It is impressive what one person, Jonathan, has established and which big difference he and his team are making for conservation and in society and how many people are reached by his work. Everyone can only love what they know. The world needs more such idealists."
                author="Viktoria K."
                location=""
              />
              <TestimonialCard
                quote="Owlproject.org was very cool. I got the opportunity to talk with Jonathan for quite a long time. Really awesome what was established and how many Barn Owls are living there. Great that you initiated school projects with such commitment and enthusiasm in different schools in Austria."
                author="Stefan K."
                location=""
              />
              <TestimonialCard
                quote="For me, it was absolutely unforgettable. You are doing such amazing and important work, it is so much fun, it leaves clues and you make such a difference in society and for conservation. Thank you for your commitment and for your precious visit to Austria!"
                author="Ingrid K."
                location=""
              />
            </div>
          </section>
        </div>
      </Container>
    </>
  );
}
