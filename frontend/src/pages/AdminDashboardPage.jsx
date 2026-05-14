import { AdminCommandCenter, PageTransition, SEO } from '../sections/EnterpriseSections';

export default function AdminDashboardPage() {
  return (
    <PageTransition>
      <SEO
        title="Admin Dashboard"
        description="STONE TECH SOLUTIONS admin dashboard for project pipeline, support health, revenue, automation, and client operations."
      />
      <AdminCommandCenter />
    </PageTransition>
  );
}
