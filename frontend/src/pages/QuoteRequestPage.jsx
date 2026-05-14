import { brand } from '../data/companyData';
import {
  FinalCTA,
  OnboardingFlow,
  PageHero,
  PageTransition,
  PricingCards,
  QuoteCalculator,
  SEO
} from '../sections/EnterpriseSections';

export default function QuoteRequestPage() {
  return (
    <PageTransition>
      <SEO
        title="Quote Request"
        description="Request a smart quote from STONE TECH SOLUTIONS for websites, software, mobile apps, cloud hosting, cybersecurity, AI automation, support, and digital transformation."
      />
      <PageHero
        compact
        eyebrow="Quote request"
        title="Turn your idea into a scoped technical roadmap."
        description="Use the smart quote calculator to estimate investment, choose priority services, and prepare a stronger project brief before the discovery call."
        primaryCta={{ label: 'Calculate scope', href: '#calculator' }}
        secondaryCta={{ label: 'View pricing models', href: '#pricing' }}
        image={brand.assets.cta}
      />
      <div id="calculator">
        <QuoteCalculator />
      </div>
      <OnboardingFlow />
      <div id="pricing">
        <PricingCards />
      </div>
      <FinalCTA title="A clear quote starts with a clear business goal." />
    </PageTransition>
  );
}
