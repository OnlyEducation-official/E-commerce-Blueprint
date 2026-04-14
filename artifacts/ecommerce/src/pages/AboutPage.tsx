import { MainLayout } from '../components/layout/MainLayout';
import { Separator } from '@/components/ui/separator';

export default function AboutPage() {
  return (
    <MainLayout>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="mb-12">
          <p className="text-sm font-medium tracking-[0.3em] uppercase text-primary mb-3">Our Story</p>
          <h1 className="text-4xl font-bold mb-6">Designed for the considered life.</h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Luxe was founded in 2019 with a simple conviction: that everyday clothing should be made to last, sourced with integrity, and designed with genuine care for the people who wear it.
          </p>
        </div>

        <div className="rounded-2xl overflow-hidden aspect-video bg-muted mb-12">
          <img
            src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&q=80"
            alt="Luxe studio"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="prose prose-neutral max-w-none">
          <p className="text-muted-foreground leading-relaxed mb-6">
            We work directly with a small network of mills and workshops in Italy, Portugal, and Japan — places where craft traditions run generations deep and quality is measured in decades, not seasons.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-6">
            Every piece in our collection begins with the question: will you still want to wear this in ten years? We choose natural fibres, proven constructions, and classic silhouettes that earn a permanent place in a wardrobe.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-12">
            We're a small team — and we intend to stay that way. Staying small means we can maintain the relationships that matter, the quality controls that make a difference, and the unhurried pace that thoughtful work requires.
          </p>
        </div>

        <Separator className="mb-12" />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {[
            {
              heading: 'Quality First',
              body: 'We use natural fibres — merino wool, cashmere, cotton, silk, and linen — from mills with long track records of excellence.',
            },
            {
              heading: 'Transparent Sourcing',
              body: 'We know exactly where each fabric comes from. We visit our suppliers regularly and publish our full supply chain.',
            },
            {
              heading: 'Designed to Last',
              body: 'No trend pieces. Every item we make is designed to be worn for years. We offer a lifetime repair service on all garments.',
            },
          ].map((item) => (
            <div key={item.heading}>
              <h3 className="font-semibold mb-2">{item.heading}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{item.body}</p>
            </div>
          ))}
        </div>
      </div>
    </MainLayout>
  );
}
