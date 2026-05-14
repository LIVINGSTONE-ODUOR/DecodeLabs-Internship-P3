import { blogPosts, brand } from '../data/companyData';
import {
  BlogGrid,
  FinalCTA,
  PageHero,
  PageTransition,
  SEO,
  SmartRecommendations,
  TechStackShowcase
} from '../sections/EnterpriseSections';

export default function BlogPage() {
  return (
    <PageTransition>
      <SEO
        title="Blog and Insights"
        description="Read STONE TECH SOLUTIONS insights on software development, AI automation, cybersecurity, cloud hosting, UX, and business operations."
      />
      <PageHero
        compact
        eyebrow="Insights"
        title="Sharp thinking for smarter digital transformation."
        description="Practical notes for leaders planning new websites, platforms, support operations, cloud environments, AI workflows, and secure digital systems."
        primaryCta={{ label: 'Talk to an expert', href: '/contact' }}
        secondaryCta={{ label: 'Get a quote', href: '/quote' }}
        image={brand.assets.meeting}
      />
      <BlogGrid posts={blogPosts} />
      <SmartRecommendations />
      <TechStackShowcase />
      <FinalCTA title="Turn insight into a working system." />
    </PageTransition>
  );
}
