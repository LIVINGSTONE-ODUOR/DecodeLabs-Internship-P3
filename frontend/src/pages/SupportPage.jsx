import { brand } from '../data/companyData';
import {
  FAQPanel,
  FinalCTA,
  PageHero,
  PageTransition,
  SEO,
  SupportAssistantPanel
} from '../sections/EnterpriseSections';

export default function SupportPage() {
  return (
    <PageTransition>
      <SEO
        title="Client Support"
        description="Get support from STONE TECH SOLUTIONS for websites, apps, software, networking, cybersecurity, cloud hosting, and AI workflows."
      />
      <PageHero
        compact
        eyebrow="Client support"
        title="Support that triages clearly and escalates quickly."
        description="Submit a ticket, get AI-powered first steps, and route urgent issues to the right support workflow."
        primaryCta={{ label: 'Submit a ticket', href: '#ticket' }}
        secondaryCta={{ label: 'Read FAQ', href: '/faq' }}
        image={brand.assets.meeting}
      />
      <div id="ticket">
        <SupportAssistantPanel />
      </div>
      <FAQPanel searchable={false} category="Support" />
      <FinalCTA title="Need a managed support plan?" description="We can wrap monitoring, updates, backups, incident response, and monthly reports into one operating model." />
    </PageTransition>
  );
}
