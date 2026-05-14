import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { AnimatePresence, motion } from 'framer-motion';
import CountUp from 'react-countup';
import toast from 'react-hot-toast';
import {
  FaArrowRight,
  FaAward,
  FaBolt,
  FaBriefcase,
  FaCalendarCheck,
  FaCashRegister,
  FaChartLine,
  FaCheck,
  FaCheckCircle,
  FaCloud,
  FaCode,
  FaDatabase,
  FaGraduationCap,
  FaGlobe,
  FaHeadset,
  FaLayerGroup,
  FaLightbulb,
  FaMobileAlt,
  FaNetworkWired,
  FaPalette,
  FaPaperPlane,
  FaPlay,
  FaProjectDiagram,
  FaQuoteLeft,
  FaRobot,
  FaRocket,
  FaShieldAlt,
  FaSyncAlt,
  FaTools,
  FaUsers,
  FaVideo
} from 'react-icons/fa';
import { HiChevronDown, HiSparkles } from 'react-icons/hi';
import Button from '../components/ui/Button';
import Modal from '../components/ui/Modal';
import contactService from '../services/contactService';
import projectService from '../services/projectService';
import supportService from '../services/supportService';
import {
  adminMetrics,
  brand,
  certifications,
  faqs,
  industries,
  jobs,
  partners,
  pricingPackages,
  processSteps,
  projects,
  quoteOptions,
  services,
  stats,
  supportTopics,
  team,
  techStack,
  testimonials
} from '../data/companyData';
import { pageMotion, revealScale, revealUp, stagger, viewportOnce } from '../animations/motionPresets';
import { useGsapPageReveals } from '../animations/useMotionStack';

const iconMap = {
  FaAward,
  FaBolt,
  FaBriefcase,
  FaCashRegister,
  FaChartLine,
  FaCheckCircle,
  FaCloud,
  FaCode,
  FaDatabase,
  FaGlobe,
  FaGraduationCap,
  FaHeadset,
  FaLayerGroup,
  FaMobileAlt,
  FaNetworkWired,
  FaPalette,
  FaProjectDiagram,
  FaRobot,
  FaRocket,
  FaShieldAlt,
  FaSyncAlt,
  FaTools,
  FaUsers,
  FaVideo
};

const siteImages = [
  brand.assets.hero,
  brand.assets.dashboard,
  brand.assets.office,
  brand.assets.meeting,
  brand.assets.cta,
  brand.assets.team
];

const heroConfig = {
  home: {
    surface: 'bg-[#020617]',
    mesh:
      'bg-[radial-gradient(circle_at_18%_12%,rgba(34,211,238,.22),transparent_24%),radial-gradient(circle_at_82%_18%,rgba(52,211,153,.13),transparent_22%),linear-gradient(135deg,#020617,#07111f_52%,#020617)]',
    layout: 'lg:grid-cols-[.92fr_1.08fr]',
    tone: 'text-cyan-200',
    stat: ['Platform velocity', 'Security posture', 'AI workflow', 'Launch readiness'],
    visual: 'home'
  },
  about: {
    surface: 'bg-[#031018]',
    mesh:
      'bg-[radial-gradient(circle_at_12%_12%,rgba(52,211,153,.15),transparent_26%),radial-gradient(circle_at_84%_16%,rgba(251,191,36,.09),transparent_22%),linear-gradient(135deg,#020617,#06151d_55%,#020617)]',
    layout: 'lg:grid-cols-[1.02fr_.98fr]',
    tone: 'text-emerald-200',
    stat: ['Senior craft', 'Operational clarity', 'Secure delivery', 'Long-term support'],
    visual: 'about'
  },
  services: {
    surface: 'bg-[#030b16]',
    mesh:
      'bg-[radial-gradient(circle_at_14%_10%,rgba(59,130,246,.18),transparent_25%),radial-gradient(circle_at_78%_20%,rgba(251,191,36,.1),transparent_24%),linear-gradient(135deg,#020617,#07101f_55%,#020617)]',
    layout: 'lg:grid-cols-[.86fr_1.14fr]',
    tone: 'text-sky-200',
    stat: ['SaaS', 'Cloud', 'Security', 'Automation'],
    visual: 'services'
  },
  detail: {
    surface: 'bg-[#040b15]',
    mesh:
      'bg-[radial-gradient(circle_at_15%_8%,rgba(34,211,238,.18),transparent_24%),radial-gradient(circle_at_80%_20%,rgba(139,92,246,.14),transparent_22%),linear-gradient(135deg,#020617,#07101f_55%,#020617)]',
    layout: 'lg:grid-cols-[.96fr_1.04fr]',
    tone: 'text-cyan-200',
    stat: ['Scope', 'Architecture', 'Delivery', 'Launch'],
    visual: 'detail'
  },
  portfolio: {
    surface: 'bg-[#03110f]',
    mesh:
      'bg-[radial-gradient(circle_at_15%_10%,rgba(16,185,129,.18),transparent_28%),radial-gradient(circle_at_80%_20%,rgba(34,211,238,.12),transparent_24%),linear-gradient(135deg,#020617,#061712_58%,#020617)]',
    layout: 'lg:grid-cols-[.84fr_1.16fr]',
    tone: 'text-emerald-200',
    stat: ['Case studies', 'Dashboards', 'AI ops', 'Business systems'],
    visual: 'portfolio'
  },
  quote: {
    surface: 'bg-[#060b18]',
    mesh:
      'bg-[radial-gradient(circle_at_18%_10%,rgba(251,191,36,.13),transparent_26%),radial-gradient(circle_at_82%_18%,rgba(34,211,238,.15),transparent_26%),linear-gradient(135deg,#020617,#08101c_58%,#020617)]',
    layout: 'lg:grid-cols-[.85fr_1.15fr]',
    tone: 'text-amber-200',
    stat: ['Estimate', 'Roadmap', 'Risks', 'Proposal'],
    visual: 'quote'
  },
  contact: {
    surface: 'bg-[#031117]',
    mesh:
      'bg-[radial-gradient(circle_at_15%_12%,rgba(34,211,238,.14),transparent_24%),radial-gradient(circle_at_84%_20%,rgba(251,113,133,.1),transparent_22%),linear-gradient(135deg,#020617,#06141b_58%,#020617)]',
    layout: 'lg:grid-cols-[1fr_1fr]',
    tone: 'text-cyan-200',
    stat: ['Discovery', 'Sales', 'Support', 'Delivery'],
    visual: 'contact'
  },
  support: {
    surface: 'bg-[#030b18]',
    mesh:
      'bg-[radial-gradient(circle_at_18%_10%,rgba(34,211,238,.17),transparent_26%),radial-gradient(circle_at_80%_18%,rgba(59,130,246,.12),transparent_24%),linear-gradient(135deg,#020617,#071020_58%,#020617)]',
    layout: 'lg:grid-cols-[.95fr_1.05fr]',
    tone: 'text-cyan-200',
    stat: ['Triage', 'SLA', 'Incident', 'Resolution'],
    visual: 'support'
  },
  faq: {
    surface: 'bg-[#040d16]',
    mesh:
      'bg-[radial-gradient(circle_at_15%_10%,rgba(139,92,246,.13),transparent_25%),radial-gradient(circle_at_82%_18%,rgba(34,211,238,.12),transparent_24%),linear-gradient(135deg,#020617,#07111e_58%,#020617)]',
    layout: 'lg:grid-cols-[.9fr_1.1fr]',
    tone: 'text-violet-200',
    stat: ['Questions', 'Pricing', 'Security', 'Delivery'],
    visual: 'faq'
  },
  insights: {
    surface: 'bg-[#05101a]',
    mesh:
      'bg-[radial-gradient(circle_at_15%_10%,rgba(251,191,36,.11),transparent_24%),radial-gradient(circle_at_80%_20%,rgba(34,211,238,.13),transparent_24%),linear-gradient(135deg,#020617,#08131e_58%,#020617)]',
    layout: 'lg:grid-cols-[.94fr_1.06fr]',
    tone: 'text-amber-200',
    stat: ['Research', 'Strategy', 'AI', 'Security'],
    visual: 'insights'
  },
  careers: {
    surface: 'bg-[#031017]',
    mesh:
      'bg-[radial-gradient(circle_at_14%_10%,rgba(52,211,153,.14),transparent_25%),radial-gradient(circle_at_82%_18%,rgba(139,92,246,.1),transparent_24%),linear-gradient(135deg,#020617,#06141b_58%,#020617)]',
    layout: 'lg:grid-cols-[1fr_1fr]',
    tone: 'text-emerald-200',
    stat: ['Design', 'Engineering', 'Support', 'Operations'],
    visual: 'careers'
  },
  default: {
    surface: 'bg-[#020617]',
    mesh:
      'bg-[radial-gradient(circle_at_18%_12%,rgba(34,211,238,.18),transparent_24%),radial-gradient(circle_at_82%_18%,rgba(52,211,153,.1),transparent_22%),linear-gradient(135deg,#020617,#07111f_52%,#020617)]',
    layout: 'lg:grid-cols-[.95fr_1.05fr]',
    tone: 'text-cyan-200',
    stat: ['Strategy', 'Design', 'Build', 'Operate'],
    visual: 'default'
  }
};

function routeVariant(pathname) {
  if (pathname === '/') return 'home';
  if (pathname.startsWith('/about')) return 'about';
  if (pathname.startsWith('/services/')) return 'detail';
  if (pathname.startsWith('/services')) return 'services';
  if (pathname.startsWith('/portfolio')) return 'portfolio';
  if (pathname.startsWith('/quote')) return 'quote';
  if (pathname.startsWith('/contact')) return 'contact';
  if (pathname.startsWith('/support')) return 'support';
  if (pathname.startsWith('/faq')) return 'faq';
  if (pathname.startsWith('/insights')) return 'insights';
  if (pathname.startsWith('/careers')) return 'careers';
  return 'default';
}

function getIcon(name) {
  return iconMap[name] || FaLayerGroup;
}

export function SEO({ title, description }) {
  const pageTitle = title ? `${title} | ${brand.name}` : `${brand.name} | ${brand.slogan}`;
  return (
    <Helmet>
      <title>{pageTitle}</title>
      <meta name="description" content={description || brand.slogan} />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={description || brand.slogan} />
      <meta property="og:image" content="/og-image.png" />
      <meta name="twitter:card" content="summary_large_image" />
    </Helmet>
  );
}

export function PageTransition({ children }) {
  const location = useLocation();
  useGsapPageReveals(location.pathname);
  return <motion.div {...pageMotion}>{children}</motion.div>;
}

export function FloatingParticles({ density = 18 }) {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {Array.from({ length: density }).map((_, index) => (
        <motion.span
          key={index}
          className="absolute h-px w-10 bg-gradient-to-r from-transparent via-cyan-200/50 to-transparent"
          style={{
            left: `${(index * 31) % 100}%`,
            top: `${(index * 43) % 100}%`
          }}
          animate={{
            x: [0, 28, -12, 0],
            y: [0, -18, 8, 0],
            opacity: [0.08, 0.72, 0.2]
          }}
          transition={{ duration: 7 + (index % 6), repeat: Infinity, delay: index * 0.13, ease: 'easeInOut' }}
        />
      ))}
    </div>
  );
}

export function SectionHeader({ eyebrow, title, description, align = 'center', className = '' }) {
  const alignment = align === 'left' ? 'text-left' : 'mx-auto text-center';
  return (
    <motion.div
      variants={stagger}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      data-gsap-reveal
      className={`${alignment} max-w-3xl ${className}`}
    >
      {eyebrow && (
        <motion.p variants={revealUp} className="eyebrow">
          <HiSparkles className="text-base" />
          {eyebrow}
        </motion.p>
      )}
      <motion.h2 variants={revealUp} className="mt-4 text-3xl font-black leading-tight text-white sm:text-4xl lg:text-5xl">
        {title}
      </motion.h2>
      {description && (
        <motion.p variants={revealUp} className="mt-5 body-copy">
          {description}
        </motion.p>
      )}
    </motion.div>
  );
}

function HeroMetric({ label, value, suffix = '' }) {
  return (
    <div className="premium-card p-4">
      <p className="text-2xl font-black text-white">
        {typeof value === 'number' ? <CountUp end={value} suffix={suffix} duration={1.8} /> : value}
      </p>
      <p className="mt-1 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">{label}</p>
    </div>
  );
}

function Bars({ values = [44, 68, 52, 86, 74] }) {
  return (
    <div className="flex h-24 items-end gap-2">
      {values.map((height, index) => (
        <motion.span
          key={`${height}-${index}`}
          className="flex-1 rounded-t-sm bg-gradient-to-t from-cyan-400/40 to-emerald-200"
          initial={{ height: 10, opacity: 0.4 }}
          whileInView={{ height: `${height}%`, opacity: 1 }}
          viewport={viewportOnce}
          transition={{ duration: 0.7, delay: index * 0.05, ease: [0.22, 1, 0.36, 1] }}
        />
      ))}
    </div>
  );
}

function HomeVisual() {
  const pipeline = ['Discovery', 'Architecture', 'Prototype', 'Build', 'Launch'];
  return (
    <div className="relative">
      <motion.div
        className="premium-card-strong overflow-hidden p-4 sm:p-5"
        initial={{ opacity: 0, rotateX: 8, y: 24 }}
        animate={{ opacity: 1, rotateX: 0, y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div>
            <p className="quiet-label text-cyan-200">STONE command center</p>
            <h3 className="mt-2 text-2xl font-black text-white">Digital systems live map</h3>
          </div>
          <span className="rounded-lg bg-emerald-200 px-3 py-1 text-xs font-black text-slate-950">Live</span>
        </div>
        <div className="mt-5 grid gap-4 lg:grid-cols-[1.1fr_.9fr]">
          <div className="rounded-lg border border-white/10 bg-slate-950/75 p-4">
            <div className="flex items-center justify-between">
              <p className="text-sm font-black text-white">Platform health</p>
              <p className="text-xs font-bold text-emerald-200">99.95% uptime</p>
            </div>
            <Bars values={[48, 76, 62, 88, 70, 94, 82]} />
            <div className="mt-4 grid grid-cols-3 gap-2">
              {['API', 'Cloud', 'AI'].map((item) => (
                <span key={item} className="rounded-lg border border-white/10 bg-white/[0.04] px-3 py-2 text-center text-xs font-black text-slate-300">
                  {item}
                </span>
              ))}
            </div>
          </div>
          <div className="grid gap-3">
            {['AI lead routing', 'Security checks', 'Release pipeline'].map((item, index) => (
              <motion.div
                key={item}
                className="rounded-lg border border-white/10 bg-white/[0.045] p-4"
                animate={{ x: [0, 4, 0], opacity: [0.78, 1, 0.78] }}
                transition={{ duration: 3, repeat: Infinity, delay: index * 0.22 }}
              >
                <p className="text-sm font-black text-white">{item}</p>
                <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/10">
                  <motion.span
                    className="block h-full rounded-full bg-gradient-to-r from-cyan-300 to-emerald-200"
                    animate={{ width: ['35%', '92%', '58%'] }}
                    transition={{ duration: 4, repeat: Infinity, delay: index * 0.2 }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
        <div className="mt-4 grid gap-2 sm:grid-cols-5">
          {pipeline.map((step, index) => (
            <div key={step} className="rounded-lg border border-white/10 bg-white/[0.035] p-3">
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">0{index + 1}</p>
              <p className="mt-2 text-sm font-black text-white">{step}</p>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

function AboutVisual({ image }) {
  return (
    <div className="grid gap-4">
      <div className="premium-card overflow-hidden">
        <img src={image || brand.assets.office} alt="STONE TECH delivery workspace" className="h-64 w-full object-cover opacity-80" loading="eager" decoding="async" />
        <div className="p-5">
          <p className="quiet-label text-emerald-200">Operating principle</p>
          <p className="mt-3 text-2xl font-black text-white">Useful strategy, elegant interface, resilient engineering.</p>
        </div>
      </div>
      <div className="grid gap-3 sm:grid-cols-3">
        {['Clarity', 'Taste', 'Reliability'].map((item, index) => (
          <div key={item} className="premium-card p-4">
            <span className="text-xs font-black text-emerald-200">0{index + 1}</span>
            <p className="mt-3 font-black text-white">{item}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function ServicesVisual() {
  return (
    <div className="premium-card-strong p-5">
      <div className="grid gap-3 sm:grid-cols-2">
        {services.slice(0, 8).map((service, index) => {
          const Icon = getIcon(service.icon);
          return (
            <motion.div
              key={service.slug}
              className={`rounded-lg border p-4 ${index === 1 || index === 4 ? 'border-amber-200/20 bg-amber-200/10' : 'border-white/10 bg-white/[0.04]'}`}
              whileHover={{ y: -4, scale: 1.01 }}
              transition={{ type: 'spring', stiffness: 260, damping: 22 }}
            >
              <Icon className="text-cyan-200" />
              <p className="mt-4 font-black text-white">{service.title}</p>
              <p className="mt-2 text-xs leading-5 text-slate-400">{service.tagline}</p>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

function PortfolioVisual() {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {projects.map((project, index) => (
        <motion.div
          key={project.title}
          className={`premium-card overflow-hidden ${index === 0 ? 'sm:row-span-2' : ''}`}
          whileHover={{ y: -6 }}
          transition={{ type: 'spring', stiffness: 260, damping: 22 }}
        >
          <img src={project.image} alt="" className={`${index === 0 ? 'h-72' : 'h-36'} w-full object-cover opacity-75`} loading="lazy" decoding="async" />
          <div className="p-4">
            <p className="quiet-label text-emerald-200">{project.type}</p>
            <h3 className="mt-2 font-black text-white">{project.title}</h3>
            <p className="mt-2 text-xs leading-5 text-slate-400">{project.metrics[0]}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

function QuoteVisual() {
  return (
    <div className="premium-card-strong p-5">
      <div className="flex items-center justify-between border-b border-white/10 pb-4">
        <div>
          <p className="quiet-label text-amber-200">Smart quote model</p>
          <h3 className="mt-2 text-2xl font-black text-white">$12,840 estimated</h3>
        </div>
        <FaCalculatorIcon />
      </div>
      <div className="mt-5 space-y-4">
        {[
          ['Product scope', 74],
          ['Integration depth', 56],
          ['Security load', 82],
          ['Launch support', 68]
        ].map(([label, value]) => (
          <div key={label}>
            <div className="mb-2 flex justify-between text-xs font-black uppercase tracking-[0.18em] text-slate-500">
              <span>{label}</span>
              <span>{value}%</span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-white/10">
              <motion.span
                className="block h-full rounded-full bg-gradient-to-r from-amber-200 via-cyan-200 to-emerald-200"
                initial={{ width: 0 }}
                animate={{ width: `${value}%` }}
                transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function FaCalculatorIcon() {
  return (
    <span className="grid h-12 w-12 place-items-center rounded-lg bg-amber-200 text-slate-950">
      <FaChartLine />
    </span>
  );
}

function SupportVisual() {
  const tickets = [
    ['Critical', 'Network outage', 'Escalated'],
    ['High', 'Login issue', 'Triage'],
    ['Medium', 'AI workflow', 'Guided fix'],
    ['Low', 'Billing note', 'Queued']
  ];
  return (
    <div className="premium-card-strong p-5">
      <div className="flex items-center justify-between">
        <div>
          <p className="quiet-label text-cyan-200">Support operations</p>
          <h3 className="mt-2 text-2xl font-black text-white">Incident routing console</h3>
        </div>
        <span className="rounded-lg bg-cyan-200 px-3 py-1 text-xs font-black text-slate-950">15m avg</span>
      </div>
      <div className="mt-5 grid gap-3">
        {tickets.map(([priority, title, status], index) => (
          <motion.div
            key={title}
            className="grid grid-cols-[auto_1fr_auto] items-center gap-3 rounded-lg border border-white/10 bg-white/[0.04] p-4"
            animate={{ opacity: [0.72, 1, 0.72] }}
            transition={{ duration: 3, repeat: Infinity, delay: index * 0.18 }}
          >
            <span className="grid h-9 w-9 place-items-center rounded-lg bg-white/10 text-xs font-black text-cyan-200">{priority[0]}</span>
            <div>
              <p className="font-black text-white">{title}</p>
              <p className="text-xs text-slate-500">{priority} priority</p>
            </div>
            <span className="text-xs font-black text-emerald-200">{status}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function FAQVisual() {
  return (
    <div className="premium-card-strong p-5">
      <div className="rounded-lg border border-white/10 bg-slate-950/80 p-4">
        <p className="quiet-label text-violet-200">Knowledge base search</p>
        <div className="mt-3 flex items-center gap-3 rounded-lg border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-slate-400">
          <FaLightbulb className="text-violet-200" />
          How much does a SaaS MVP cost?
        </div>
      </div>
      <div className="mt-4 grid gap-3">
        {faqs.slice(0, 4).map((item) => (
          <div key={item.question} className="rounded-lg border border-white/10 bg-white/[0.04] p-4">
            <p className="text-xs font-black text-violet-200">{item.category}</p>
            <p className="mt-2 text-sm font-black text-white">{item.question}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function InsightsVisual() {
  return (
    <div className="grid gap-3">
      {['Product Engineering', 'Automation', 'Security', 'UX Strategy'].map((label, index) => (
        <motion.article
          key={label}
          className="premium-card p-5"
          initial={{ opacity: 0, x: index % 2 ? 24 : -24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.55, delay: index * 0.08 }}
        >
          <p className="quiet-label text-amber-200">{label}</p>
          <h3 className="mt-3 text-xl font-black text-white">{['SaaS MVP planning', 'Before you hire more admin', 'Security basics that matter', 'Dashboards executives use'][index]}</h3>
          <p className="mt-2 text-sm leading-6 text-slate-400">Strategy notes designed for founders, operators, and digital transformation leaders.</p>
        </motion.article>
      ))}
    </div>
  );
}

function CareersVisual() {
  return (
    <div className="premium-card-strong p-5">
      <p className="quiet-label text-emerald-200">Builder workspace</p>
      <h3 className="mt-3 text-2xl font-black text-white">Design, engineer, support, and improve real systems.</h3>
      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        {team.map((member) => (
          <div key={member.name} className="rounded-lg border border-white/10 bg-white/[0.04] p-4">
            <p className="font-black text-white">{member.name}</p>
            <p className="mt-1 text-xs font-bold text-emerald-200">{member.role}</p>
            <p className="mt-2 text-xs leading-5 text-slate-400">{member.focus}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function ContactVisual() {
  return (
    <div className="premium-card-strong p-5">
      <p className="quiet-label text-cyan-200">Routing desk</p>
      <h3 className="mt-3 text-2xl font-black text-white">The right conversation, routed fast.</h3>
      <div className="mt-5 grid gap-3">
        {[
          ['New build', 'Quote and roadmap'],
          ['Existing system', 'Audit and modernization'],
          ['Incident', 'Support triage'],
          ['Partnership', 'Technical strategy']
        ].map(([title, note], index) => (
          <motion.div
            key={title}
            className="flex items-center justify-between rounded-lg border border-white/10 bg-white/[0.04] p-4"
            whileHover={{ x: 5 }}
          >
            <div>
              <p className="font-black text-white">{title}</p>
              <p className="text-xs text-slate-500">{note}</p>
            </div>
            <span className="text-xs font-black text-cyan-200">0{index + 1}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function DefaultVisual({ variant, image }) {
  switch (variant) {
    case 'home':
      return <HomeVisual />;
    case 'about':
      return <AboutVisual image={image} />;
    case 'services':
    case 'detail':
      return <ServicesVisual />;
    case 'portfolio':
      return <PortfolioVisual />;
    case 'quote':
      return <QuoteVisual />;
    case 'support':
      return <SupportVisual />;
    case 'faq':
      return <FAQVisual />;
    case 'insights':
      return <InsightsVisual />;
    case 'careers':
      return <CareersVisual />;
    case 'contact':
      return <ContactVisual />;
    default:
      return <HomeVisual />;
  }
}

export function PageHero({
  eyebrow,
  title,
  description,
  primaryCta = { label: 'Request a quote', href: '/quote' },
  secondaryCta = { label: 'Explore services', href: '/services' },
  image = brand.assets.hero,
  compact = false,
  children
}) {
  const location = useLocation();
  const variant = routeVariant(location.pathname);
  const config = heroConfig[variant] || heroConfig.default;
  const metricItems = variant === 'home' ? stats : config.stat.map((label, index) => ({ label, value: index === 0 ? 'Ready' : index === 1 ? 'Secure' : index === 2 ? 'Fast' : 'Live' }));

  return (
    <section className={`relative isolate overflow-hidden text-white ${config.surface} ${compact ? 'pt-28 pb-14' : 'min-h-[92vh] pt-32 pb-20'}`}>
      <div className={`absolute inset-0 -z-20 ${config.mesh}`} />
      <div className="absolute inset-0 -z-20 bg-cover bg-center opacity-[0.18] mix-blend-screen" style={{ backgroundImage: `url(${image})` }} />
      <div className="absolute inset-0 -z-20 bg-[linear-gradient(90deg,rgba(3,7,18,.96),rgba(3,7,18,.76)_45%,rgba(3,7,18,.88)),linear-gradient(180deg,rgba(3,7,18,.2),rgba(3,7,18,.95))]" />
      <FloatingParticles density={compact ? 12 : 22} />
      <div className="absolute inset-x-0 bottom-0 -z-10 h-40 bg-gradient-to-t from-[#030712] to-transparent" />
      <div className={`shell grid items-center gap-12 pb-12 ${config.layout}`}>
        <motion.div variants={stagger} initial="hidden" animate="visible" className={compact ? 'py-10' : 'py-14 lg:py-24'}>
          {eyebrow && (
            <motion.p variants={revealUp} className={`eyebrow ${config.tone}`}>
              <HiSparkles className="text-base" />
              {eyebrow}
            </motion.p>
          )}
          <motion.h1 variants={revealUp} className="mt-6 max-w-5xl text-4xl font-black leading-[1.02] text-white sm:text-6xl lg:text-7xl">
            {title}
          </motion.h1>
          <motion.p variants={revealUp} className="mt-6 max-w-2xl text-lg leading-8 text-slate-300 sm:text-xl">
            {description}
          </motion.p>
          <motion.div variants={revealUp} className="mt-9 flex flex-col gap-3 sm:flex-row">
            {primaryCta && (
              <Button as={Link} to={primaryCta.href} size="lg" icon={FaArrowRight}>
                {primaryCta.label}
              </Button>
            )}
            {secondaryCta && (
              <Button as={Link} to={secondaryCta.href} size="lg" variant="outline" icon={FaPlay}>
                {secondaryCta.label}
              </Button>
            )}
          </motion.div>
          <motion.div variants={revealUp} className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {metricItems.slice(0, 4).map((item) => (
              <HeroMetric key={item.label} label={item.label} value={item.value} suffix={item.suffix || ''} />
            ))}
          </motion.div>
          {children}
        </motion.div>

        <DefaultVisual variant={variant} image={image} />
      </div>
      <div className="shell pb-8">
        <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {siteImages.map((item, index) => (
            <motion.div
              key={`${item}-${index}`}
              className="h-24 overflow-hidden rounded-lg border border-white/10 bg-white/[0.04]"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: index * 0.05 }}
            >
              <img src={item} alt="" className="h-full w-full object-cover opacity-70 transition duration-500 hover:scale-105 hover:opacity-95" loading={index < 2 ? 'eager' : 'lazy'} decoding="async" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function LogoCloud() {
  return (
    <section className="border-y border-white/10 bg-[#030712] py-8 text-white">
      <div className="shell">
        <p className="mb-5 text-center text-xs font-black uppercase tracking-[0.26em] text-slate-500">Trusted delivery patterns for modern teams</p>
        <div className="marquee-mask overflow-hidden">
          <div className="animate-marquee flex w-max gap-3">
            {[...partners, ...techStack, ...partners, ...techStack].map((partner, index) => (
              <span key={`${partner}-${index}`} className="rounded-lg border border-white/10 bg-white/[0.035] px-5 py-3 text-xs font-black uppercase tracking-[0.2em] text-slate-300">
                {partner}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function StatsBand({ dark = true }) {
  return (
    <section className={`section-pad ${dark ? 'bg-[#030712] text-white' : 'bg-white text-slate-950 dark:bg-[#030712] dark:text-white'}`}>
      <div className="shell">
        <div className="grid gap-4 lg:grid-cols-4">
          {stats.map((item, index) => {
            const Icon = getIcon(item.icon);
            return (
              <motion.div key={item.label} variants={revealScale} initial="hidden" whileInView="visible" viewport={viewportOnce} className="premium-card p-6">
                <div className="flex items-center justify-between">
                  <span className="grid h-11 w-11 place-items-center rounded-lg bg-cyan-200 text-slate-950">
                    <Icon />
                  </span>
                  <span className="text-xs font-black text-emerald-200">+{index + 7}% YoY</span>
                </div>
                <p className="mt-8 text-4xl font-black text-white">
                  <CountUp end={item.value} suffix={item.suffix || ''} duration={2} enableScrollSpy scrollSpyOnce />
                </p>
                <p className="mt-2 text-sm font-bold text-slate-400">{item.label}</p>
                <div className="mt-5 h-1.5 overflow-hidden rounded-full bg-white/10">
                  <motion.span
                    className="block h-full rounded-full bg-gradient-to-r from-cyan-300 to-emerald-200"
                    initial={{ width: 0 }}
                    whileInView={{ width: `${62 + index * 8}%` }}
                    viewport={viewportOnce}
                    transition={{ duration: 0.8 }}
                  />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

const serviceFilters = [
  { id: 'all', label: 'All systems' },
  { id: 'product', label: 'Product builds' },
  { id: 'infra', label: 'Cloud and security' },
  { id: 'ops', label: 'Operations' }
];

function filterServices(filter) {
  if (filter === 'product') return services.filter((item) => ['website-development', 'saas-development', 'mobile-app-development', 'pos-systems', 'school-systems', 'branding-ui-ux'].includes(item.slug));
  if (filter === 'infra') return services.filter((item) => ['cloud-hosting', 'networking-solutions', 'cybersecurity', 'cctv-systems'].includes(item.slug));
  if (filter === 'ops') return services.filter((item) => ['ai-automation', 'it-consulting', 'software-troubleshooting', 'system-maintenance'].includes(item.slug));
  return services;
}

export function ServicesMatrix({ limit, showIntro = true }) {
  const [filter, setFilter] = useState('all');
  const visibleServices = filterServices(filter).slice(0, limit || 99);
  return (
    <section className="section-pad section-surface">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_18%_12%,rgba(34,211,238,.11),transparent_26%),radial-gradient(circle_at_85%_22%,rgba(251,191,36,.06),transparent_24%)]" />
      <div className="shell">
        {showIntro && (
          <SectionHeader
            eyebrow="Service operating system"
            title="One senior partner for software, infrastructure, AI, and support."
            description="Pick a focused service or combine disciplines into a single delivery squad with strategy, design, engineering, security, and operational support."
          />
        )}

        <div className="mt-10 flex flex-wrap justify-center gap-2">
          {serviceFilters.map((item) => (
            <button
              key={item.id}
              onClick={() => setFilter(item.id)}
              className={`focus-ring rounded-lg border px-4 py-2 text-sm font-black transition ${
                filter === item.id ? 'border-cyan-200/40 bg-cyan-200 text-slate-950' : 'border-white/10 bg-white/[0.04] text-slate-300 hover:bg-white/[0.075]'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        <motion.div layout className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {visibleServices.map((service, index) => {
              const Icon = getIcon(service.icon);
              return (
                <motion.article
                  layout
                  key={service.slug}
                  initial={{ opacity: 0, y: 20, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 16, scale: 0.98 }}
                  transition={{ duration: 0.28, delay: index * 0.02 }}
                  className="group premium-card relative overflow-hidden p-6"
                >
                  <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-200/45 to-transparent opacity-0 transition group-hover:opacity-100" />
                  <div className="-mx-6 -mt-6 mb-6 h-36 overflow-hidden border-b border-white/10">
                    <img src={siteImages[index % siteImages.length]} alt="" className="h-full w-full object-cover opacity-70 transition duration-700 group-hover:scale-105 group-hover:opacity-95" loading="lazy" decoding="async" />
                  </div>
                  <div className="flex items-start justify-between gap-4">
                    <span className="grid h-12 w-12 place-items-center rounded-lg bg-white/[0.06] text-cyan-200 ring-1 ring-white/10">
                      <Icon />
                    </span>
                    <span className="rounded-lg bg-white/[0.05] px-3 py-1 text-xs font-black text-slate-400">{service.timeline}</span>
                  </div>
                  <h3 className="mt-7 text-2xl font-black text-white">{service.title}</h3>
                  <p className="mt-3 min-h-16 text-sm leading-7 text-slate-400">{service.tagline}</p>
                  <div className="mt-6 flex flex-wrap gap-2">
                    {service.technologies.slice(0, 3).map((tech) => (
                      <span key={tech} className="rounded-lg border border-white/10 bg-slate-950/70 px-3 py-1.5 text-xs font-bold text-slate-300">
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-5">
                    <p className="text-xl font-black text-white">{service.pricing}</p>
                    <Link to={`/services/${service.slug}`} className="inline-flex items-center gap-2 text-sm font-black text-cyan-200">
                      Explore <FaArrowRight />
                    </Link>
                  </div>
                </motion.article>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}

export function WhyChooseUs() {
  const reasons = [
    ['Enterprise clarity', 'Roadmaps, decisions, and handoffs are designed for executives and operators, not just engineers.', FaProjectDiagram],
    ['Frontend craft', 'Interfaces feel intentional, responsive, accessible, and polished across device classes.', FaPalette],
    ['Secure systems', 'Infrastructure, access, backups, and incident paths are planned before launch pressure hits.', FaShieldAlt],
    ['Lifecycle support', 'We stay close after launch with monitoring, improvements, support, and measured iteration.', FaHeadset]
  ];
  return (
    <section className="section-pad bg-[#061015] text-white">
      <div className="shell">
        <SectionHeader
          eyebrow="Why clients choose us"
          title="Premium digital work needs strategy, taste, and operating discipline."
          description="STONE TECH SOLUTIONS blends product design, full-stack engineering, IT operations, and security into one coherent client experience."
        />
        <div className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {reasons.map(([title, description, Icon], index) => (
            <motion.div key={title} variants={revealUp} initial="hidden" whileInView="visible" viewport={viewportOnce} className="premium-card p-6">
              <div className="-mx-6 -mt-6 mb-6 h-32 overflow-hidden border-b border-white/10">
                <img src={siteImages[(index + 2) % siteImages.length]} alt="" className="h-full w-full object-cover opacity-65" loading="lazy" decoding="async" />
              </div>
              <span className="grid h-12 w-12 place-items-center rounded-lg bg-emerald-200 text-slate-950">
                <Icon />
              </span>
              <span className="mt-8 block text-xs font-black text-slate-500">0{index + 1}</span>
              <h3 className="mt-2 text-xl font-black text-white">{title}</h3>
              <p className="mt-3 text-sm leading-7 text-slate-400">{description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ProcessTimeline() {
  return (
    <section className="section-pad bg-[#030712] text-white">
      <div className="shell">
        <SectionHeader
          eyebrow="Delivery choreography"
          title="A process that makes complex work feel controlled."
          description="Every phase has a clear artifact, decision point, owner, and risk check so projects move with momentum."
        />
        <div className="relative mt-14">
          <div className="absolute left-5 top-0 hidden h-full w-px bg-white/10 md:block" />
          <div className="grid gap-4">
            {processSteps.map((step, index) => (
              <motion.div
                key={step.title}
                className="grid gap-4 md:grid-cols-[80px_1fr]"
                initial={{ opacity: 0, x: -18 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={viewportOnce}
                transition={{ duration: 0.5, delay: index * 0.06 }}
              >
                <div className="relative hidden md:block">
                  <span className="absolute left-0 top-5 grid h-10 w-10 place-items-center rounded-lg bg-cyan-200 text-sm font-black text-slate-950">0{index + 1}</span>
                </div>
                <div className="premium-card grid gap-5 p-6 md:grid-cols-[.45fr_1fr_auto] md:items-center">
                  <div>
                    <p className="quiet-label text-cyan-200">Phase 0{index + 1}</p>
                    <h3 className="mt-2 text-2xl font-black text-white">{step.title}</h3>
                  </div>
                  <p className="text-sm leading-7 text-slate-400">{step.description}</p>
                  <div className="h-2 overflow-hidden rounded-full bg-white/10 md:w-32">
                    <motion.span
                      className="block h-full rounded-full bg-gradient-to-r from-cyan-300 to-emerald-200"
                      initial={{ width: 0 }}
                      whileInView={{ width: `${42 + index * 12}%` }}
                      viewport={viewportOnce}
                      transition={{ duration: 0.8 }}
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function ProjectShowcase({ compact = false }) {
  const [active, setActive] = useState(0);
  const project = projects[active];
  const shownProjects = compact ? projects.slice(0, 3) : projects;
  return (
    <section className="section-pad bg-[#05100f] text-white">
      <div className="shell">
        <SectionHeader
          eyebrow="Project evidence"
          title="Case studies that prove design and operations can move together."
          description="The work is presented through outcomes, product surfaces, and operational improvements rather than vague portfolio thumbnails."
        />
        <div className="mt-12 grid gap-5 lg:grid-cols-[.42fr_.58fr]">
          <div className="grid gap-3">
            {shownProjects.map((item, index) => (
              <button
                key={item.title}
                onClick={() => setActive(index)}
                className={`rounded-lg border p-5 text-left transition ${
                  active === index ? 'border-emerald-200/35 bg-emerald-200/10' : 'border-white/10 bg-white/[0.04] hover:bg-white/[0.07]'
                }`}
              >
                <p className="quiet-label text-emerald-200">{item.type}</p>
                <h3 className="mt-2 text-xl font-black text-white">{item.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-400">{item.summary}</p>
              </button>
            ))}
          </div>
          <AnimatePresence mode="wait">
            <motion.article
              key={project.title}
              className="premium-card overflow-hidden"
              initial={{ opacity: 0, y: 18, filter: 'blur(8px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -12, filter: 'blur(8px)' }}
              transition={{ duration: 0.35 }}
            >
              <img src={project.image} alt="" className="h-80 w-full object-cover opacity-80" loading="lazy" decoding="async" />
              <div className="p-6">
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span key={tag} className="rounded-lg border border-white/10 bg-white/[0.05] px-3 py-1 text-xs font-black text-slate-300">
                      {tag}
                    </span>
                  ))}
                </div>
                <h3 className="mt-5 text-3xl font-black text-white">{project.title}</h3>
                <p className="mt-3 body-copy">{project.summary}</p>
                <div className="mt-6 grid gap-3 sm:grid-cols-3">
                  {project.metrics.map((metric) => (
                    <div key={metric} className="rounded-lg border border-white/10 bg-slate-950/70 p-4 text-sm font-black text-emerald-200">
                      {metric}
                    </div>
                  ))}
                </div>
              </div>
            </motion.article>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

export function TestimonialsWall() {
  const [active, setActive] = useState(0);
  const testimonial = testimonials[active];
  return (
    <section className="section-pad bg-[#030712] text-white">
      <div className="shell">
        <SectionHeader
          eyebrow="Client confidence"
          title="The experience should make teams feel they are in serious hands."
          description="Testimonials are paired with proof signals so trust is not carried by quotes alone."
        />
        <div className="mt-12 grid gap-5 lg:grid-cols-[.7fr_.3fr]">
          <AnimatePresence mode="wait">
            <motion.div
              key={testimonial.name}
              className="premium-card p-8"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
            >
              <FaQuoteLeft className="text-3xl text-cyan-200" />
              <p className="mt-6 text-2xl font-black leading-tight text-white sm:text-4xl">&quot;{testimonial.quote}&quot;</p>
              <div className="mt-8 flex items-center justify-between border-t border-white/10 pt-6">
                <div>
                  <p className="font-black text-white">{testimonial.name}</p>
                  <p className="text-sm text-slate-400">{testimonial.role}, {testimonial.company}</p>
                </div>
                <span className="rounded-lg bg-emerald-200 px-3 py-1 text-xs font-black text-slate-950">Verified</span>
              </div>
            </motion.div>
          </AnimatePresence>
          <div className="grid gap-3">
            {testimonials.map((item, index) => (
              <button
                key={item.name}
                onClick={() => setActive(index)}
                className={`rounded-lg border p-4 text-left transition ${
                  active === index ? 'border-cyan-200/40 bg-cyan-200/10' : 'border-white/10 bg-white/[0.04] hover:bg-white/[0.07]'
                }`}
              >
                <p className="font-black text-white">{item.company}</p>
                <p className="text-xs text-slate-500">{item.role}</p>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function TechStackShowcase() {
  return (
    <section className="section-pad bg-[#061015] text-white">
      <div className="shell">
        <SectionHeader
          eyebrow="Technology stack"
          title="Modern tools chosen for speed, maintainability, and scale."
          description="The stack adapts to each client, but the standard is consistent: robust, documented, secure, and easy to evolve."
        />
        <div className="mt-12 grid gap-3 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-7">
          {techStack.map((tech, index) => (
            <motion.div
              key={tech}
              className="premium-card grid h-28 place-items-center p-4 text-center text-sm font-black text-slate-200"
              whileHover={{ y: -5, rotate: index % 2 ? 0.5 : -0.5 }}
              transition={{ type: 'spring', stiffness: 280, damping: 22 }}
            >
              {tech}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function IndustriesGrid() {
  return (
    <section className="section-pad bg-[#030712] text-white">
      <div className="shell">
        <SectionHeader
          eyebrow="Industries"
          title="Built for organizations with real operational complexity."
          description="The work adapts to your users, workflows, compliance pressure, team maturity, and growth stage."
        />
        <div className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {industries.map((industry, index) => (
            <div key={industry} className="premium-card flex items-center justify-between p-5">
              <span className="font-black text-white">{industry}</span>
              <span className="text-xs font-black text-slate-500">0{index + 1}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function PricingCards() {
  return (
    <section className="section-pad bg-[#061015] text-white">
      <div className="shell">
        <SectionHeader
          eyebrow="Pricing models"
          title="Clear packages for launch, scale, and ongoing operations."
          description="Pricing is scoped after discovery, but these models make the buying path easier to understand."
        />
        <div className="mt-12 grid gap-4 lg:grid-cols-3">
          {pricingPackages.map((pack) => (
            <motion.div
              key={pack.name}
              className={`premium-card p-7 ${pack.featured ? 'ring-1 ring-cyan-200/35' : ''}`}
              whileHover={{ y: -6 }}
              transition={{ type: 'spring', stiffness: 260, damping: 22 }}
            >
              {pack.featured && <span className="rounded-lg bg-cyan-200 px-3 py-1 text-xs font-black text-slate-950">Most chosen</span>}
              <h3 className="mt-5 text-2xl font-black text-white">{pack.name}</h3>
              <p className="mt-3 text-sm leading-7 text-slate-400">{pack.description}</p>
              <p className="mt-6 text-5xl font-black text-white">{pack.price}</p>
              <div className="mt-7 space-y-3">
                {pack.features.map((feature) => (
                  <p key={feature} className="flex gap-3 text-sm font-bold text-slate-300">
                    <FaCheck className="mt-1 text-emerald-200" />
                    {feature}
                  </p>
                ))}
              </div>
              <Button as={Link} to="/quote" className="mt-8 w-full" variant={pack.featured ? 'primary' : 'outline'} icon={FaArrowRight}>
                Scope this model
              </Button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function FAQPanel({ searchable = true, category }) {
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(0);
  const filtered = faqs.filter((item) => {
    const matchesCategory = category ? item.category === category : true;
    const q = query.toLowerCase();
    const matchesQuery = searchable ? `${item.question} ${item.answer} ${item.category}`.toLowerCase().includes(q) : true;
    return matchesCategory && matchesQuery;
  });

  return (
    <section className="section-pad bg-[#030712] text-white">
      <div className="shell">
        <SectionHeader
          eyebrow="Knowledge base"
          title="Answers that reduce uncertainty before the first meeting."
          description="Search pricing, support, delivery, security, AI, and documentation questions with a polished help-center experience."
        />
        {searchable && (
          <div className="mx-auto mt-10 max-w-2xl">
            <input value={query} onChange={(event) => setQuery(event.target.value)} className="input-premium h-14" placeholder="Search questions, pricing, AI, security..." />
          </div>
        )}
        <div className="mx-auto mt-10 max-w-4xl overflow-hidden rounded-lg border border-white/10">
          {filtered.map((item, index) => {
            const isOpen = open === index;
            return (
              <div key={item.question} className="border-b border-white/10 last:border-b-0">
                <button onClick={() => setOpen(isOpen ? -1 : index)} className="flex w-full items-start justify-between gap-5 bg-white/[0.035] p-5 text-left transition hover:bg-white/[0.065]">
                  <span>
                    <span className="quiet-label text-cyan-200">{item.category}</span>
                    <span className="mt-2 block text-xl font-black text-white">{item.question}</span>
                  </span>
                  <HiChevronDown className={`mt-2 shrink-0 text-cyan-200 transition ${isOpen ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}>
                      <p className="px-5 pb-5 leading-8 text-slate-400">{item.answer}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function QuoteCalculator() {
  const [projectType, setProjectType] = useState('website');
  const [complexity, setComplexity] = useState('standard');
  const [timeline, setTimeline] = useState('normal');
  const [features, setFeatures] = useState(['design']);
  const [quoteContact, setQuoteContact] = useState({ fullName: '', email: '', companyName: '', notes: '' });
  const [saving, setSaving] = useState(false);

  const featureCosts = { design: 900, auth: 1200, payments: 1500, ai: 2200, dashboard: 1800, security: 1600 };
  const timelineMultiplier = timeline === 'urgent' ? 1.25 : timeline === 'relaxed' ? 0.92 : 1;
  const estimate = Math.round((quoteOptions.base[projectType] * quoteOptions.multipliers[complexity] + features.reduce((sum, key) => sum + featureCosts[key], 0)) * timelineMultiplier);

  const toggleFeature = (key) => setFeatures((current) => (current.includes(key) ? current.filter((item) => item !== key) : [...current, key]));

  const submit = async (event) => {
    event.preventDefault();
    setSaving(true);
    try {
      await projectService.quote({
        projectType,
        complexity,
        timeline,
        features,
        estimate,
        ...quoteContact
      });
      toast.success('Quote saved to Supabase Postgres');
    } finally {
      setSaving(false);
    }
  };

  return (
    <section className="section-pad bg-[#030712] text-white">
      <div className="shell grid gap-8 lg:grid-cols-[.92fr_1.08fr]">
        <div>
          <SectionHeader
            align="left"
            eyebrow="Smart quote calculator"
            title="Estimate scope before the discovery call."
            description="This interactive estimate gives clients an immediate sense of budget, complexity, and planning inputs."
          />
          <div className="mt-8 premium-card p-5">
            <p className="quiet-label text-amber-200">Conversion design note</p>
            <p className="mt-3 text-sm leading-7 text-slate-400">
              The calculator turns a vague inquiry into a structured brief, making sales conversations faster and more confident.
            </p>
          </div>
        </div>

        <form onSubmit={submit} className="premium-card-strong p-6">
          <div className="grid gap-4 sm:grid-cols-3">
            <label>
              <span className="text-sm font-black text-slate-200">Project type</span>
              <select value={projectType} onChange={(event) => setProjectType(event.target.value)} className="input-premium mt-3">
                {Object.keys(quoteOptions.base).map((key) => (
                  <option key={key} value={key}>
                    {key.toUpperCase()}
                  </option>
                ))}
              </select>
            </label>
            <label>
              <span className="text-sm font-black text-slate-200">Complexity</span>
              <select value={complexity} onChange={(event) => setComplexity(event.target.value)} className="input-premium mt-3">
                {Object.keys(quoteOptions.multipliers).map((key) => (
                  <option key={key} value={key}>
                    {key.toUpperCase()}
                  </option>
                ))}
              </select>
            </label>
            <label>
              <span className="text-sm font-black text-slate-200">Timeline</span>
              <select value={timeline} onChange={(event) => setTimeline(event.target.value)} className="input-premium mt-3">
                <option value="normal">NORMAL</option>
                <option value="urgent">URGENT</option>
                <option value="relaxed">RELAXED</option>
              </select>
            </label>
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {Object.entries(featureCosts).map(([key, cost]) => (
              <button
                key={key}
                type="button"
                onClick={() => toggleFeature(key)}
                className={`rounded-lg border p-4 text-left transition ${
                  features.includes(key) ? 'border-cyan-200/40 bg-cyan-200/10' : 'border-white/10 bg-white/[0.04] hover:bg-white/[0.07]'
                }`}
              >
                <span className="font-black capitalize text-white">{key}</span>
                <span className="mt-1 block text-xs text-slate-500">+${cost.toLocaleString()}</span>
              </button>
            ))}
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            <input
              value={quoteContact.fullName}
              onChange={(event) => setQuoteContact((current) => ({ ...current, fullName: event.target.value }))}
              className="input-premium"
              placeholder="Full name"
            />
            <input
              value={quoteContact.email}
              onChange={(event) => setQuoteContact((current) => ({ ...current, email: event.target.value }))}
              className="input-premium"
              placeholder="Email for proposal"
              type="email"
            />
            <input
              value={quoteContact.companyName}
              onChange={(event) => setQuoteContact((current) => ({ ...current, companyName: event.target.value }))}
              className="input-premium"
              placeholder="Company"
            />
          </div>
          <textarea
            value={quoteContact.notes}
            onChange={(event) => setQuoteContact((current) => ({ ...current, notes: event.target.value }))}
            className="input-premium mt-4 min-h-24 resize-none py-4"
            placeholder="Optional context, integrations, launch deadline, or existing system notes."
          />

          <div className="mt-7 grid gap-4 lg:grid-cols-[.8fr_1.2fr]">
            <div className="rounded-lg border border-amber-200/20 bg-amber-200/10 p-5">
              <p className="quiet-label text-amber-200">Estimated investment</p>
              <p className="mt-3 text-5xl font-black text-white">${estimate.toLocaleString()}</p>
              <p className="mt-3 text-sm leading-6 text-slate-400">A planning estimate, not a final quote. Scope is confirmed after discovery.</p>
            </div>
            <div className="rounded-lg border border-white/10 bg-slate-950/70 p-5">
              <p className="quiet-label text-cyan-200">Scope signal</p>
              <Bars values={[50, Math.min(94, features.length * 14 + 35), complexity === 'enterprise' ? 90 : 62, timeline === 'urgent' ? 88 : 55]} />
            </div>
          </div>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-slate-400">Selected features: {features.length}</p>
            <Button type="submit" icon={FaPaperPlane} loading={saving}>
              Prepare quote
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
}

export function SmartRecommendations() {
  const [goal, setGoal] = useState('launch');
  const goals = {
    launch: ['Website Development', 'Branding & UI/UX', 'Cloud Hosting'],
    scale: ['SaaS Development', 'AI Automation', 'Cybersecurity'],
    operate: ['System Maintenance', 'Software Troubleshooting', 'IT Consulting'],
    secure: ['Cybersecurity', 'Networking Solutions', 'Cloud Hosting']
  };
  const matches = services.filter((service) => goals[goal].includes(service.title));

  return (
    <section className="section-pad bg-[#061015] text-white">
      <div className="shell grid gap-8 lg:grid-cols-[.8fr_1.2fr]">
        <div>
          <SectionHeader
            align="left"
            eyebrow="Smart recommendations"
            title="Choose the business goal. The service mix adapts."
            description="A premium website should help buyers understand what to do next, not make them decode a service catalog alone."
          />
          <div className="mt-8 flex flex-wrap gap-2">
            {[
              ['launch', 'Launch'],
              ['scale', 'Scale'],
              ['operate', 'Operate'],
              ['secure', 'Secure']
            ].map(([key, label]) => (
              <button
                key={key}
                onClick={() => setGoal(key)}
                className={`focus-ring rounded-lg border px-4 py-2 text-sm font-black transition ${
                  goal === key ? 'border-emerald-200/40 bg-emerald-200 text-slate-950' : 'border-white/10 bg-white/[0.04] text-slate-300 hover:bg-white/[0.07]'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {matches.map((service) => (
            <Link key={service.slug} to={`/services/${service.slug}`} className="premium-card group p-6 transition hover:-translate-y-1 hover:border-emerald-200/30">
              <p className="quiet-label text-emerald-200">{service.timeline}</p>
              <h3 className="mt-4 text-xl font-black text-white">{service.title}</h3>
              <p className="mt-3 text-sm leading-7 text-slate-400">{service.tagline}</p>
              <p className="mt-5 inline-flex items-center gap-2 text-sm font-black text-cyan-200">
                View path <FaArrowRight />
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ContactFormPanel({ title = 'Start the conversation', compact = false }) {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const submit = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      const form = new FormData(event.currentTarget);
      await contactService.submit({
        fullName: form.get('fullName'),
        email: form.get('email'),
        subject: `${form.get('service')} consultation${form.get('company') ? ` - ${form.get('company')}` : ''}`,
        message: form.get('message')
      });
      setOpen(true);
      toast.success('Message saved to Supabase Postgres');
      event.currentTarget.reset();
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className={`section-pad bg-[#030712] text-white ${compact ? 'pt-10' : ''}`}>
      <div className="shell grid gap-8 lg:grid-cols-[.82fr_1.18fr]">
        <div>
          <SectionHeader
            align="left"
            eyebrow="Contact routing"
            title={title}
            description="Send the project, problem, or platform idea. The form is designed to capture enough context for a useful response."
          />
          <div className="mt-8 grid gap-3">
            {[
              ['Email', brand.email],
              ['Phone', brand.phone],
              ['Coverage', brand.location]
            ].map(([label, value]) => (
              <div key={label} className="premium-card p-5">
                <p className="quiet-label text-cyan-200">{label}</p>
                <p className="mt-2 font-black text-white">{value}</p>
              </div>
            ))}
          </div>
        </div>
        <form onSubmit={submit} className="premium-card-strong p-6">
          <div className="grid gap-4 sm:grid-cols-2">
            <input required name="fullName" placeholder="Full name" className="input-premium" />
            <input required name="email" type="email" placeholder="Work email" className="input-premium" />
            <input name="company" placeholder="Company" className="input-premium" />
            <select name="service" className="input-premium">
              {services.slice(0, 10).map((service) => (
                <option key={service.slug}>{service.title}</option>
              ))}
            </select>
          </div>
          <textarea required name="message" rows="6" placeholder="Tell us what you want to build, fix, automate, or launch." className="input-premium mt-4 resize-none py-4" />
          <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <label className="flex items-center gap-3 text-sm font-semibold text-slate-300">
              <input type="checkbox" defaultChecked className="accent-cyan-300" /> Send me a project roadmap
            </label>
            <Button type="submit" loading={loading} icon={FaPaperPlane}>
              Send message
            </Button>
          </div>
        </form>
      </div>
      <Modal open={open} onClose={() => setOpen(false)} title="Message received">
        <p className="leading-7 text-slate-300">
          Your project note is ready for the team. In production this modal would connect to an email workflow and CRM handoff.
        </p>
        <Button as={Link} to="/quote" className="mt-5">
          Continue to quote request
        </Button>
      </Modal>
    </section>
  );
}

export function SupportAssistantPanel() {
  const [topic, setTopic] = useState(supportTopics[0]);
  const [priority, setPriority] = useState('Medium');
  const [sent, setSent] = useState(false);
  const [saving, setSaving] = useState(false);
  const responseMap = {
    'Website issue': 'Refresh the browser, capture the affected page URL, and include console errors if visible.',
    'Email or account access': 'Confirm the user, app, device, and whether MFA prompts are working.',
    'Network outage': 'Check whether wired and Wi-Fi users are both affected, then restart only approved endpoints.',
    'Software installation': 'Share OS version, license status, and any installer error code.',
    'Security concern': 'Do not forward suspicious files. Send sender, timestamp, and screenshot through the ticket.',
    'AI assistant support': 'Include the prompt, expected answer, and the answer the assistant returned.',
    'Billing or contract': 'Share company name and invoice or contract reference.'
  };
  const submit = async (event) => {
    event.preventDefault();
    setSaving(true);
    try {
      const form = new FormData(event.currentTarget);
      await supportService.createTicket({
        topic,
        priority,
        email: form.get('email'),
        description: form.get('description')
      });
      setSent(true);
      toast.success('Support ticket saved to Supabase Postgres');
      event.currentTarget.reset();
    } finally {
      setSaving(false);
    }
  };
  return (
    <section className="section-pad bg-[#030712] text-white">
      <div className="shell grid gap-8 lg:grid-cols-[.9fr_1.1fr]">
        <div>
          <SectionHeader
            align="left"
            eyebrow="Client support"
            title="Fast support with smart triage before escalation."
            description="The support portal helps clients send cleaner tickets, understand first actions, and route incidents to the right workflow."
          />
          <div className="mt-10 premium-card-strong p-6">
            <div className="flex items-center gap-4">
              <span className="grid h-12 w-12 place-items-center rounded-lg bg-cyan-200 text-slate-950">
                <FaRobot />
              </span>
              <div>
                <p className="text-xl font-black text-white">AI-powered support assistant</p>
                <p className="text-sm text-slate-400">Suggested next step for {topic.toLowerCase()}</p>
              </div>
            </div>
            <p className="mt-5 leading-8 text-slate-200">{responseMap[topic]}</p>
          </div>
        </div>
        <form onSubmit={submit} className="premium-card-strong p-6">
          <div className="grid gap-4 sm:grid-cols-2">
            <label>
              <span className="text-sm font-black text-slate-200">Topic</span>
              <select value={topic} onChange={(event) => setTopic(event.target.value)} className="input-premium mt-3">
                {supportTopics.map((item) => (
                  <option key={item}>{item}</option>
                ))}
              </select>
            </label>
            <label>
              <span className="text-sm font-black text-slate-200">Priority</span>
              <select value={priority} onChange={(event) => setPriority(event.target.value)} className="input-premium mt-3">
                {['Low', 'Medium', 'High', 'Critical'].map((item) => (
                  <option key={item}>{item}</option>
                ))}
              </select>
            </label>
          </div>
          <input required name="email" placeholder="Your email" type="email" className="input-premium mt-4" />
          <textarea required name="description" rows="7" placeholder="Describe what happened, what changed, and who is affected." className="input-premium mt-4 resize-none py-4" />
          <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <span className="rounded-lg border border-white/10 px-4 py-2 text-sm font-black text-slate-300">Priority: {priority}</span>
            <Button type="submit" icon={FaPaperPlane} loading={saving}>
              Submit ticket
            </Button>
          </div>
          {sent && <div className="mt-5 rounded-lg border border-emerald-300/20 bg-emerald-300/10 p-4 text-sm font-bold text-emerald-200">Ticket created and stored. The admin dashboard can now retrieve it from Supabase Postgres.</div>}
        </form>
      </div>
    </section>
  );
}

export function OnboardingFlow() {
  const steps = ['Brief', 'Discovery call', 'Proposal', 'Kickoff', 'Delivery workspace', 'Launch support'];
  return (
    <section className="section-pad bg-[#061015] text-white">
      <div className="shell">
        <SectionHeader
          eyebrow="Client onboarding"
          title="A smooth path from first message to active delivery."
          description="Clients know exactly what happens next, what we need, and when the first real artifact appears."
        />
        <div className="mt-12 grid gap-3 md:grid-cols-3 lg:grid-cols-6">
          {steps.map((step, index) => (
            <div key={step} className="premium-card p-5">
              <span className="grid h-10 w-10 place-items-center rounded-lg bg-cyan-200 text-sm font-black text-slate-950">{index + 1}</span>
              <p className="mt-5 font-black text-white">{step}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function TeamGrid() {
  return (
    <section className="section-pad bg-[#061015] text-white">
      <div className="shell">
        <SectionHeader
          eyebrow="Team"
          title="A senior, cross-functional delivery bench."
          description="Strategy, design, engineering, operations, and support work together so the client experience feels coherent."
        />
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {team.map((member) => (
            <div key={member.name} className="premium-card p-6">
              <div className="grid h-16 w-16 place-items-center rounded-lg bg-gradient-to-br from-cyan-200 to-emerald-200 text-2xl font-black text-slate-950">
                {member.name.split(' ').map((name) => name[0]).join('')}
              </div>
              <h3 className="mt-6 text-xl font-black text-white">{member.name}</h3>
              <p className="mt-2 text-sm font-bold text-cyan-200">{member.role}</p>
              <p className="mt-3 text-sm leading-7 text-slate-400">{member.focus}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function CertificationsBand() {
  return (
    <section className="bg-[#030712] py-14 text-white">
      <div className="shell grid gap-3 lg:grid-cols-4">
        {certifications.map((item) => (
          <div key={item} className="premium-card p-5 text-sm font-bold leading-6 text-slate-300">
            <FaCheckCircle className="mb-4 text-cyan-200" />
            {item}
          </div>
        ))}
      </div>
    </section>
  );
}

export function CareersBoard() {
  return (
    <section className="section-pad bg-[#030712] text-white">
      <div className="shell">
        <SectionHeader
          eyebrow="Careers"
          title="Join a team building serious systems with excellent taste."
          description="We look for people who care about craft, clarity, reliability, and the real humans using the technology."
        />
        <div className="mt-12 space-y-4">
          {jobs.map((job) => (
            <div key={job.title} className="premium-card grid gap-4 p-6 lg:grid-cols-[1fr_auto] lg:items-center">
              <div>
                <div className="flex flex-wrap gap-2">
                  <span className="rounded-lg bg-cyan-200/10 px-3 py-1 text-xs font-black text-cyan-200">{job.department}</span>
                  <span className="rounded-lg bg-white/10 px-3 py-1 text-xs font-black text-slate-300">{job.type}</span>
                  <span className="rounded-lg bg-white/10 px-3 py-1 text-xs font-black text-slate-300">{job.location}</span>
                </div>
                <h3 className="mt-4 text-2xl font-black text-white">{job.title}</h3>
                <p className="mt-3 leading-7 text-slate-400">{job.description}</p>
              </div>
              <Button as={Link} to="/contact" variant="outline" icon={FaArrowRight}>
                Apply
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function BlogGrid({ posts }) {
  return (
    <section className="section-pad bg-[#030712] text-white">
      <div className="shell">
        <SectionHeader
          eyebrow="Insights"
          title="Practical notes on product, AI, security, and operations."
          description="Useful thinking for founders, operators, and teams planning digital transformation."
        />
        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {posts.map((post, index) => (
            <article key={post.title} className={`premium-card p-6 transition hover:-translate-y-1 hover:border-cyan-200/30 ${index === 0 ? 'md:col-span-2' : ''}`}>
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-lg bg-amber-200/10 px-3 py-1 text-xs font-black text-amber-200">{post.category}</span>
                <span className="text-xs font-bold text-slate-500">{post.date}</span>
                <span className="text-xs font-bold text-slate-500">{post.readTime}</span>
              </div>
              <h3 className={`${index === 0 ? 'text-4xl' : 'text-2xl'} mt-5 font-black text-white`}>{post.title}</h3>
              <p className="mt-4 leading-7 text-slate-400">{post.excerpt}</p>
              <button onClick={() => toast.success('Insight preview opened')} className="mt-6 inline-flex items-center gap-2 text-sm font-black text-cyan-200">
                Read insight <FaArrowRight />
              </button>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function AdminCommandCenter() {
  const pipeline = [
    ['Discovery', 12, 'from-cyan-300 to-sky-300'],
    ['Proposal', 8, 'from-amber-200 to-orange-300'],
    ['Build', 14, 'from-violet-300 to-cyan-300'],
    ['Launch', 5, 'from-emerald-200 to-cyan-200']
  ];
  const activity = [
    'AI automation quote moved to proposal',
    'School system milestone approved',
    'Support SLA recovered to 98%',
    'New cybersecurity audit request assigned',
    'Client onboarding checklist completed'
  ];
  return (
    <section className="min-h-screen bg-[#030712] px-4 pb-16 pt-28 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="eyebrow">Admin dashboard</p>
            <h1 className="mt-4 text-4xl font-black sm:text-6xl">STONE operations command center.</h1>
            <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-400">
              A production-style dashboard surface for leads, projects, support health, revenue, automation, and delivery visibility.
            </p>
          </div>
          <Button as={Link} to="/quote" icon={FaCalendarCheck}>
            Create proposal
          </Button>
        </div>
        <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {adminMetrics.map((metric) => (
            <div key={metric.label} className="premium-card p-6">
              <p className="text-sm font-bold text-slate-400">{metric.label}</p>
              <p className="mt-4 text-4xl font-black text-white">{metric.value}</p>
              <div className="mt-5 flex items-center justify-between text-sm">
                <span className="font-black text-emerald-200">{metric.trend}</span>
                <span className="rounded-lg bg-white/10 px-3 py-1 font-bold text-slate-300">{metric.status}</span>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-6 grid gap-6 xl:grid-cols-[1.1fr_.9fr]">
          <div className="premium-card p-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-black text-white">Pipeline health</h2>
              <span className="rounded-lg bg-emerald-300/10 px-3 py-1 text-xs font-black text-emerald-200">Live</span>
            </div>
            <div className="mt-8 space-y-5">
              {pipeline.map(([label, value, color]) => (
                <div key={label}>
                  <div className="mb-2 flex justify-between text-sm font-bold text-slate-300">
                    <span>{label}</span>
                    <span>{value} items</span>
                  </div>
                  <div className="h-3 overflow-hidden rounded-full bg-white/10">
                    <div className={`h-full rounded-full bg-gradient-to-r ${color}`} style={{ width: `${value * 6}%` }} />
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {['Lead source', 'Service demand', 'Support queue'].map((label, index) => (
                <div key={label} className="rounded-lg bg-slate-950/70 p-4">
                  <p className="quiet-label">{label}</p>
                  <Bars values={[32, 58, 42, 76, 54, 88].map((height) => Math.max(18, height - index * 8))} />
                </div>
              ))}
            </div>
          </div>
          <div className="premium-card p-6">
            <h2 className="text-2xl font-black text-white">Recent activity</h2>
            <div className="mt-6 space-y-3">
              {activity.map((item, index) => (
                <div key={item} className="flex gap-4 rounded-lg bg-slate-950/70 p-4">
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-cyan-300/10 text-sm font-black text-cyan-200">{index + 1}</span>
                  <p className="text-sm leading-6 text-slate-400">{item}</p>
                </div>
              ))}
            </div>
            <div className="mt-6 rounded-lg border border-cyan-300/20 bg-cyan-300/10 p-5">
              <p className="font-black text-cyan-200">Automation monitor</p>
              <p className="mt-2 text-sm leading-7 text-slate-400">
                Quote emails, support ticket routing, and project status notifications are represented as workflow-ready UI.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function VideoSignalBand() {
  return (
    <section className="relative isolate overflow-hidden bg-[#030712] py-24 text-white">
      <div className="absolute inset-0 -z-20 bg-cover bg-center opacity-30" style={{ backgroundImage: `url(${brand.assets.cta})` }} />
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(3,7,18,.96),rgba(3,7,18,.62)),radial-gradient(circle_at_75%_45%,rgba(34,211,238,.22),transparent_30%)]" />
      <div className="absolute inset-0 -z-10 animate-scanlines opacity-25" />
      <div className="shell grid gap-8 lg:grid-cols-[1fr_.8fr]">
        <div>
          <p className="eyebrow">Immersive operations</p>
          <h2 className="mt-4 text-4xl font-black sm:text-5xl">Technology should feel alive, measurable, and under control.</h2>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-400">
            Motion, dashboards, support flows, and automation previews help clients understand the platform before it ships.
          </p>
        </div>
        <div className="premium-card p-5">
          <div className="grid gap-3">
            {['Lead routed to sales', 'AI triage generated summary', 'Deployment health checked', 'Client update scheduled'].map((item, index) => (
              <motion.div
                key={item}
                className="rounded-lg bg-slate-950/70 p-4 text-sm font-bold text-slate-200"
                animate={{ opacity: [0.55, 1, 0.7], x: [0, 6, 0] }}
                transition={{ repeat: Infinity, duration: 2.8, delay: index * 0.25 }}
              >
                {item}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function FinalCTA({
  title = 'Ready to build the next version of your business?',
  description = 'Bring us the ambition, the messy system, or the rough idea. We will help turn it into a polished digital platform.'
}) {
  return (
    <section className="relative overflow-hidden bg-[#030712] px-4 py-20 text-white sm:px-6 lg:px-8">
      <div className="absolute inset-0 bg-cover bg-center opacity-[0.16]" style={{ backgroundImage: `url(${brand.assets.cta})` }} />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_28%_20%,rgba(34,211,238,.18),transparent_28%),radial-gradient(circle_at_72%_82%,rgba(52,211,153,.14),transparent_30%)]" />
      <div className="relative mx-auto max-w-5xl premium-card p-8 text-center sm:p-12">
        <p className="eyebrow justify-center">Next step</p>
        <h2 className="mt-4 text-3xl font-black sm:text-5xl">{title}</h2>
        <p className="mx-auto mt-5 max-w-2xl leading-8 text-slate-400">{description}</p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Button as={Link} to="/quote" size="lg" icon={FaArrowRight}>
            Request a quote
          </Button>
          <Button as={Link} to="/support" size="lg" variant="outline" icon={FaHeadset}>
            Client support
          </Button>
        </div>
      </div>
    </section>
  );
}
