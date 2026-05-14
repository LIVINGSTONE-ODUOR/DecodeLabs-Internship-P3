import { brand } from '../data/companyData';
import {
  ContactFormPanel,
  FinalCTA,
  OnboardingFlow,
  PageHero,
  PageTransition,
  SEO
} from '../sections/EnterpriseSections';

export default function ContactPage() {
  return (
    <PageTransition>
      <SEO
        title="Contact"
        description="Contact STONE TECH SOLUTIONS for software development, websites, mobile apps, IT support, cloud, cybersecurity, AI automation, and digital transformation."
      />
      <PageHero
        compact
        eyebrow="Contact"
        title="Bring us the business problem. We will shape the technical path."
        description="Whether you need a premium website, custom software, AI automation, IT support, cloud migration, or cybersecurity help, the next step starts here."
        primaryCta={{ label: 'Request a quote', href: '/quote' }}
        secondaryCta={{ label: 'Client support', href: '/support' }}
        image={brand.assets.office}
      />
      <ContactFormPanel />
      <OnboardingFlow />
      <FinalCTA title="Prefer a structured quote flow?" description="Use the smart quote calculator to estimate scope and send us a clearer project brief." />
    </PageTransition>
  );
}
