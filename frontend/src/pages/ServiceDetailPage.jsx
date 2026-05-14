import { Link, Navigate, useParams } from 'react-router-dom';
import { FaArrowRight, FaCheck, FaClock, FaDollarSign, FaLayerGroup } from 'react-icons/fa';
import Button from '../components/ui/Button';
import { brand, findServiceBySlug, projects, services } from '../data/companyData';
import { FinalCTA, PageHero, PageTransition, SEO, SmartRecommendations } from '../sections/EnterpriseSections';

export default function ServiceDetailPage() {
  const { slug } = useParams();
  const service = findServiceBySlug(slug);

  if (!service) {
    return <Navigate to="/services" replace />;
  }

  const relatedServices = services.filter((item) => item.slug !== service.slug).slice(0, 3);
  const relatedProjects = projects.slice(0, 2);

  return (
    <PageTransition>
      <SEO title={service.title} description={service.description} />
      <PageHero
        compact
        eyebrow="Service detail"
        title={service.title}
        description={service.description}
        primaryCta={{ label: 'Request this service', href: '/quote' }}
        secondaryCta={{ label: 'All services', href: '/services' }}
        image={brand.assets.dashboard}
      />
      <section className="section-pad bg-[#030712] text-white">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[.8fr_1.2fr] lg:px-8">
          <aside className="premium-card-strong p-6">
            <p className="quiet-label text-cyan-200">Engagement snapshot</p>
            <div className="mt-6 space-y-4">
              {[
                [FaDollarSign, 'Pricing', service.pricing],
                [FaClock, 'Timeline', service.timeline],
                [FaLayerGroup, 'Case study', service.caseStudy]
              ].map(([Icon, label, value]) => (
                <div key={label} className="rounded-lg border border-white/10 bg-slate-950/70 p-4">
                  <div className="flex items-center gap-3">
                    <Icon className="text-cyan-200" />
                    <span className="text-sm font-black text-slate-400">{label}</span>
                  </div>
                  <p className="mt-2 text-xl font-black">{value}</p>
                </div>
              ))}
            </div>
            <Button as={Link} to="/quote" className="mt-6 w-full" icon={FaArrowRight}>
              Start with this service
            </Button>
          </aside>

          <div className="space-y-6">
            <div className="premium-card p-6">
              <p className="quiet-label text-cyan-200">What you get</p>
              <h2 className="mt-4 text-3xl font-black">{service.tagline}</h2>
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {service.benefits.map((benefit) => (
                  <div key={benefit} className="flex gap-3 rounded-lg bg-slate-950/70 p-4 text-sm font-bold text-slate-200">
                    <FaCheck className="mt-1 text-emerald-200" />
                    {benefit}
                  </div>
                ))}
              </div>
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
              <div className="premium-card p-6">
                <p className="quiet-label text-cyan-200">Technologies used</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {service.technologies.map((tech) => (
                    <span key={tech} className="rounded-lg border border-white/10 bg-white/[0.06] px-4 py-2 text-sm font-bold text-slate-200">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
              <div className="premium-card p-6">
                <p className="quiet-label text-cyan-200">Expected outcomes</p>
                <div className="mt-5 space-y-3">
                  {service.outcomes.map((outcome) => (
                    <p key={outcome} className="rounded-lg bg-slate-950/70 p-4 text-sm font-bold text-slate-200">
                      {outcome}
                    </p>
                  ))}
                </div>
              </div>
            </div>

            <div className="premium-card p-6">
              <p className="quiet-label text-cyan-200">Related case studies</p>
              <div className="mt-5 grid gap-4 md:grid-cols-2">
                {relatedProjects.map((project) => (
                  <div key={project.title} className="rounded-lg bg-slate-950/70 p-5">
                    <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-500">{project.type}</p>
                    <h3 className="mt-3 text-xl font-black">{project.title}</h3>
                    <p className="mt-3 text-sm leading-7 text-slate-300">{project.summary}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
      <SmartRecommendations />
      <section className="bg-[#030712] px-4 py-16 text-white sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="quiet-label text-cyan-200">Related services</p>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {relatedServices.map((item) => (
              <Link key={item.slug} to={`/services/${item.slug}`} className="premium-card p-6 transition hover:-translate-y-1 hover:border-cyan-200/40">
                <h3 className="text-xl font-black">{item.title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-300">{item.tagline}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <FinalCTA title={`Ready to plan ${service.title.toLowerCase()}?`} />
    </PageTransition>
  );
}
