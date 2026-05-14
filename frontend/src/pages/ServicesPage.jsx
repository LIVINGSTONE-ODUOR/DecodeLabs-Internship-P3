import { brand } from '../data/companyData';
import {
  FinalCTA,
  PageHero,
  PageTransition,
  PricingCards,
  ProcessTimeline,
  SEO,
  ServicesMatrix,
  SmartRecommendations
} from '../sections/EnterpriseSections';

export default function ServicesPage() {
  return (
    <PageTransition>
      <SEO
        title="Services"
        description="Explore STONE TECH SOLUTIONS services including websites, SaaS development, mobile apps, POS systems, school systems, cloud hosting, networking, cybersecurity, AI automation, CCTV, IT consulting, troubleshooting, maintenance, and UI/UX."
      />
      <PageHero
        compact
        eyebrow="Services"
        title="Everything a serious company needs to build, secure, automate, and scale."
        description="Choose a focused service, combine a delivery squad, or use us as your long-term digital transformation partner."
        primaryCta={{ label: 'Request service quote', href: '/quote' }}
        secondaryCta={{ label: 'See case studies', href: '/portfolio' }}
        image={brand.assets.meeting}
      />
      <ServicesMatrix showIntro={false} />
      <SmartRecommendations />
      <PricingCards />
      <ProcessTimeline />
      <FinalCTA title="Need help choosing the right service?" description="Use the smart quote flow or send us the problem. We will recommend the cleanest path forward." />
    </PageTransition>
  );
}
