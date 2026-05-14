import { brand } from '../data/companyData';
import {
  CareersBoard,
  FinalCTA,
  PageHero,
  PageTransition,
  SEO,
  TeamGrid,
  WhyChooseUs
} from '../sections/EnterpriseSections';

export default function CareersPage() {
  return (
    <PageTransition>
      <SEO
        title="Careers"
        description="Join STONE TECH SOLUTIONS as a developer, designer, IT support specialist, or operations-minded builder."
      />
      <PageHero
        compact
        eyebrow="Careers"
        title="Build premium digital systems with a team that cares about craft."
        description="We are growing a disciplined team of product designers, full-stack developers, IT specialists, automation builders, and client success operators."
        primaryCta={{ label: 'View open roles', href: '#roles' }}
        secondaryCta={{ label: 'Contact us', href: '/contact' }}
        image={brand.assets.team}
      />
      <WhyChooseUs />
      <div id="roles">
        <CareersBoard />
      </div>
      <TeamGrid />
      <FinalCTA title="Do work that looks good, works hard, and helps real teams move faster." />
    </PageTransition>
  );
}
