import { brand } from '../data/companyData';
import {
  FinalCTA,
  IndustriesGrid,
  PageHero,
  PageTransition,
  ProjectShowcase,
  SEO,
  TestimonialsWall,
  VideoSignalBand
} from '../sections/EnterpriseSections';

export default function PortfolioPage() {
  return (
    <PageTransition>
      <SEO
        title="Portfolio and Projects"
        description="Explore STONE TECH SOLUTIONS case studies across SaaS platforms, AI automation, business dashboards, school systems, websites, and digital operations."
      />
      <PageHero
        compact
        eyebrow="Portfolio"
        title="Project work that blends premium interface design with serious operations."
        description="A showcase of the platforms, automations, and support systems we design for teams that need digital confidence."
        primaryCta={{ label: 'Start a similar project', href: '/quote' }}
        secondaryCta={{ label: 'Explore services', href: '/services' }}
        image={brand.assets.dashboard}
      />
      <ProjectShowcase />
      <VideoSignalBand />
      <IndustriesGrid />
      <TestimonialsWall />
      <FinalCTA title="Your project should feel this credible from the first screen." />
    </PageTransition>
  );
}
