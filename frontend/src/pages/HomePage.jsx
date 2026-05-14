import { brand } from '../data/companyData';
import {
  FinalCTA,
  LogoCloud,
  PageHero,
  PageTransition,
  ProcessTimeline,
  ProjectShowcase,
  SEO,
  ServicesMatrix,
  SmartRecommendations,
  StatsBand,
  TechStackShowcase,
  TestimonialsWall,
  VideoSignalBand,
  WhyChooseUs
} from '../sections/EnterpriseSections';

export default function HomePage() {
  return (
    <PageTransition>
      <SEO
        title="Enterprise Software, AI and IT Solutions"
        description="STONE TECH SOLUTIONS builds premium websites, software systems, mobile apps, cloud platforms, cybersecurity programs, and AI automation."
      />
      <PageHero
        eyebrow="Premium software and IT solutions"
        title={brand.slogan}
        description="We help ambitious companies launch modern websites, SaaS platforms, mobile apps, secure infrastructure, AI workflows, and reliable support systems that feel ready for the global stage."
        primaryCta={{ label: 'Build with us', href: '/quote' }}
        secondaryCta={{ label: 'View projects', href: '/portfolio' }}
        image={brand.assets.dashboard}
      />
      <LogoCloud />
      <ServicesMatrix limit={6} />
      <WhyChooseUs />
      <ProjectShowcase compact />
      <ProcessTimeline />
      <StatsBand />
      <TestimonialsWall />
      <SmartRecommendations />
      <TechStackShowcase />
      <VideoSignalBand />
      <FinalCTA />
    </PageTransition>
  );
}
