import { brand } from '../data/companyData';
import {
  ContactFormPanel,
  FAQPanel,
  PageHero,
  PageTransition,
  SEO
} from '../sections/EnterpriseSections';

export default function FAQPage() {
  return (
    <PageTransition>
      <SEO
        title="FAQ"
        description="Find answers about STONE TECH SOLUTIONS services, pricing, timelines, AI automation, support, cybersecurity, and delivery process."
      />
      <PageHero
        compact
        eyebrow="FAQ"
        title="Everything clients usually ask before we start building."
        description="Search common questions about scope, delivery, pricing, support, security, documentation, and AI features."
        primaryCta={{ label: 'Ask a question', href: '/contact' }}
        secondaryCta={{ label: 'Request quote', href: '/quote' }}
        image={brand.assets.office}
      />
      <FAQPanel />
      <ContactFormPanel compact title="Still need a specific answer?" />
    </PageTransition>
  );
}
