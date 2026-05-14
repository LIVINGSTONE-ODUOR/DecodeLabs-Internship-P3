import { brand } from '../data/companyData';
import {
  CertificationsBand,
  FinalCTA,
  IndustriesGrid,
  PageHero,
  PageTransition,
  SEO,
  StatsBand,
  TeamGrid,
  TestimonialsWall,
  WhyChooseUs
} from '../sections/EnterpriseSections';

export default function AboutPage() {
  return (
    <PageTransition>
      <SEO
        title="About Us"
        description="Learn about STONE TECH SOLUTIONS, a modern software development, IT support, cloud, cybersecurity, and AI automation company."
      />
      <PageHero
        compact
        eyebrow="About STONE TECH SOLUTIONS"
        title="A technology partner with strategy, taste, and operational discipline."
        description="We are a modern software development and IT solutions company helping organizations turn complex digital needs into clear, polished, secure systems."
        primaryCta={{ label: 'Meet the team', href: '/careers' }}
        secondaryCta={{ label: 'Explore services', href: '/services' }}
        image={brand.assets.office}
      />
      <StatsBand />
      <WhyChooseUs />
      <CertificationsBand />
      <IndustriesGrid />
      <TeamGrid />
      <TestimonialsWall />
      <FinalCTA title="Work with a team that treats your platform like a business asset." />
    </PageTransition>
  );
}
