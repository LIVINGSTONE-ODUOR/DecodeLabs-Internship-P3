export const brand = {
  name: 'STONE TECH SOLUTIONS',
  slogan: 'Building Smart Digital Solutions for a Smarter Future',
  email: 'hello@stonetechsolutions.com',
  phone: '+1 (555) 018-2048',
  location: 'Serving clients globally',
  logo: '/assets/STONE TECH SOLUTIONS LOGO.png',
  mark: '/logo.svg',
  assets: {
    hero: '/assets/hero-bg.jpg',
    office: '/assets/office-1.jpg',
    meeting: '/assets/meeting-1.jpg',
    dashboard: '/assets/dashboard-1.jpg',
    cta: '/assets/cta-bg.jpg',
    team: '/assets/team-1.jpg'
  }
};

export const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Services', href: '/services' },
  { label: 'Projects', href: '/portfolio' },
  { label: 'Careers', href: '/careers' },
  { label: 'Insights', href: '/insights' },
  { label: 'Contact', href: '/contact' }
];

export const utilityLinks = [
  { label: 'Quote', href: '/quote' },
  { label: 'Support', href: '/support' },
  { label: 'FAQ', href: '/faq' },
  { label: 'Admin', href: '/admin' }
];

export const services = [
  {
    title: 'Website Development',
    slug: 'website-development',
    icon: 'FaGlobe',
    tagline: 'Premium marketing sites, portals, and conversion systems.',
    description:
      'High-performance websites built with clear storytelling, polished UX, strong technical SEO, analytics, CMS workflows, and maintainable frontend architecture.',
    benefits: ['Fast loading pages', 'SEO-ready structure', 'CMS-ready workflows', 'Accessible responsive UI'],
    technologies: ['React', 'Next.js', 'Tailwind CSS', 'Headless CMS', 'Vercel'],
    pricing: 'From $1,800',
    timeline: '2-6 weeks',
    caseStudy: 'Northstar Studio digital relaunch',
    outcomes: ['41% lift in qualified leads', '96+ Lighthouse performance', 'Launch playbook included']
  },
  {
    title: 'SaaS Development',
    slug: 'saas-development',
    icon: 'FaLayerGroup',
    tagline: 'Secure dashboards, subscriptions, APIs, and product workflows.',
    description:
      'We design and engineer SaaS products with production-grade user flows, role-based access, billing readiness, API contracts, analytics, and admin tooling.',
    benefits: ['Role-based portals', 'Scalable data models', 'Subscription-ready flows', 'Product analytics'],
    technologies: ['React', 'Node.js', 'PostgreSQL', 'Supabase', 'Stripe'],
    pricing: 'From $7,500',
    timeline: '6-14 weeks',
    caseStudy: 'AtlasOps workflow platform',
    outcomes: ['MVP shipped in 9 weeks', 'Admin console delivered', 'Secure onboarding flows']
  },
  {
    title: 'Mobile App Development',
    slug: 'mobile-app-development',
    icon: 'FaMobileAlt',
    tagline: 'iOS and Android apps with elegant product-grade interfaces.',
    description:
      'Native-feeling mobile applications for customers, staff, and field teams, with offline-ready flows, push notifications, APIs, and app store preparation.',
    benefits: ['Cross-platform delivery', 'Offline-ready journeys', 'Push notifications', 'API integration'],
    technologies: ['React Native', 'Expo', 'Firebase', 'REST APIs', 'App Store tooling'],
    pricing: 'From $6,800',
    timeline: '6-12 weeks',
    caseStudy: 'HelioCare patient companion',
    outcomes: ['4.8 beta satisfaction score', 'Field data sync', 'Reduced manual follow-up']
  },
  {
    title: 'POS Systems',
    slug: 'pos-systems',
    icon: 'FaCashRegister',
    tagline: 'Retail and hospitality point-of-sale platforms.',
    description:
      'Custom POS systems with inventory, staff roles, reports, receipt flows, branch management, and integrations for payment, accounting, and stock control.',
    benefits: ['Inventory visibility', 'Branch reporting', 'Staff permissions', 'Payment-ready workflows'],
    technologies: ['React', 'Node.js', 'PostgreSQL', 'Cloud hosting', 'Payment APIs'],
    pricing: 'From $4,500',
    timeline: '4-10 weeks',
    caseStudy: 'NovaMart multi-branch POS',
    outcomes: ['12 locations unified', 'Daily closing automated', 'Stock variance reduced']
  },
  {
    title: 'School Systems',
    slug: 'school-systems',
    icon: 'FaGraduationCap',
    tagline: 'Admissions, records, payments, and learning operations.',
    description:
      'Modern school platforms for student records, parent portals, finance, timetables, grading, announcements, and administrative reporting.',
    benefits: ['Parent portals', 'Fee tracking', 'Student records', 'Academic reports'],
    technologies: ['React', 'Node.js', 'PostgreSQL', 'Cloud storage', 'SMS APIs'],
    pricing: 'From $5,200',
    timeline: '5-12 weeks',
    caseStudy: 'BrightPath Academy operations suite',
    outcomes: ['Admin time cut by 38%', 'Parent communication centralized', 'Finance reports automated']
  },
  {
    title: 'Cloud Hosting',
    slug: 'cloud-hosting',
    icon: 'FaCloud',
    tagline: 'Reliable hosting, deployment, backups, and monitoring.',
    description:
      'Cloud architecture and managed hosting for websites, APIs, databases, file storage, backups, monitoring, uptime checks, and secure deployment pipelines.',
    benefits: ['Managed deployments', 'Backups and monitoring', 'Cost optimization', 'Security baselines'],
    technologies: ['AWS', 'Azure', 'Vercel', 'Docker', 'CI/CD'],
    pricing: 'From $250/mo',
    timeline: '1-4 weeks',
    caseStudy: 'ClearPath infrastructure migration',
    outcomes: ['99.95% target uptime', 'Deployment time reduced', 'Backup policy documented']
  },
  {
    title: 'Networking Solutions',
    slug: 'networking-solutions',
    icon: 'FaNetworkWired',
    tagline: 'Business networks designed for uptime and control.',
    description:
      'Office networking, Wi-Fi planning, firewalls, VPNs, cabling coordination, segmentation, device policies, and documentation for teams that need stable operations.',
    benefits: ['Stable office connectivity', 'VPN access', 'Network segmentation', 'Hardware documentation'],
    technologies: ['Ubiquiti', 'Cisco', 'MikroTik', 'VPN', 'Firewall policies'],
    pricing: 'From $900',
    timeline: '1-5 weeks',
    caseStudy: 'CivicWorks network refresh',
    outcomes: ['Coverage gaps removed', 'Guest network secured', 'Support runbook delivered']
  },
  {
    title: 'Cybersecurity',
    slug: 'cybersecurity',
    icon: 'FaShieldAlt',
    tagline: 'Practical security for people, systems, and cloud operations.',
    description:
      'Security reviews, access controls, MFA rollout, backup hardening, vulnerability triage, policy design, endpoint hygiene, and incident readiness.',
    benefits: ['Risk visibility', 'Access governance', 'MFA rollout', 'Incident-ready documentation'],
    technologies: ['MFA', 'IAM', 'SIEM', 'Endpoint security', 'Backup policies'],
    pricing: 'From $1,200',
    timeline: '2-6 weeks',
    caseStudy: 'Summit Advisory hardening program',
    outcomes: ['Critical gaps closed', 'Policy pack delivered', 'Executive risk summary']
  },
  {
    title: 'AI Automation',
    slug: 'ai-automation',
    icon: 'FaRobot',
    tagline: 'AI assistants, workflow copilots, and automated operations.',
    description:
      'AI workflows that help teams qualify leads, answer support questions, summarize documents, route tasks, and connect business systems responsibly.',
    benefits: ['AI chat assistants', 'Workflow triggers', 'Document intelligence', 'Human handoff controls'],
    technologies: ['OpenAI APIs', 'Vector search', 'Zapier', 'Make', 'Webhooks'],
    pricing: 'From $2,400',
    timeline: '3-8 weeks',
    caseStudy: 'HelioCare support assistant',
    outcomes: ['Support load reduced 32%', 'Lead qualification automated', 'Human review controls']
  },
  {
    title: 'CCTV Systems',
    slug: 'cctv-systems',
    icon: 'FaVideo',
    tagline: 'Camera planning, installation coordination, and monitoring setup.',
    description:
      'CCTV system planning for offices, schools, retail, and facilities, including camera coverage, storage, remote viewing, network impact, and handover.',
    benefits: ['Coverage mapping', 'Remote access setup', 'Storage planning', 'Maintenance guidance'],
    technologies: ['IP cameras', 'NVR', 'PoE networking', 'Remote viewing', 'Access controls'],
    pricing: 'From $750',
    timeline: '1-4 weeks',
    caseStudy: 'MetroWorks facility visibility',
    outcomes: ['Blind spots mapped', 'Remote viewing enabled', 'Maintenance checklist created']
  },
  {
    title: 'IT Consulting',
    slug: 'it-consulting',
    icon: 'FaProjectDiagram',
    tagline: 'Architecture, audits, vendor selection, and roadmap clarity.',
    description:
      'Senior technical guidance for teams planning new systems, replacing legacy tools, choosing vendors, improving operations, or preparing for scale.',
    benefits: ['System audits', 'Roadmap planning', 'Vendor selection', 'Executive-friendly recommendations'],
    technologies: ['Architecture reviews', 'Cost modeling', 'Cloud audits', 'Data mapping', 'Security checks'],
    pricing: 'From $150/hr',
    timeline: '1-3 weeks',
    caseStudy: 'Apex Cloud modernization roadmap',
    outcomes: ['Prioritized delivery plan', 'Budget ranges clarified', 'Risk register created']
  },
  {
    title: 'Software Troubleshooting',
    slug: 'software-troubleshooting',
    icon: 'FaTools',
    tagline: 'Fast diagnosis for broken apps, systems, and workflows.',
    description:
      'Debugging, configuration fixes, performance triage, software setup, integration repair, data issue investigation, and documented recovery steps.',
    benefits: ['Root-cause analysis', 'Configuration repair', 'Performance triage', 'Clear handover notes'],
    technologies: ['Logs', 'APIs', 'Databases', 'Browser tooling', 'Monitoring'],
    pricing: 'From $120/hr',
    timeline: 'Same week',
    caseStudy: 'NovaPay integration repair',
    outcomes: ['Payment errors isolated', 'Monitoring added', 'Incident notes delivered']
  },
  {
    title: 'System Maintenance',
    slug: 'system-maintenance',
    icon: 'FaSyncAlt',
    tagline: 'Ongoing updates, monitoring, backups, and support retainers.',
    description:
      'Maintenance programs for websites, apps, cloud environments, office systems, and internal platforms with scheduled reporting and proactive fixes.',
    benefits: ['Routine updates', 'Uptime checks', 'Backup verification', 'Monthly reporting'],
    technologies: ['Monitoring', 'CI/CD', 'Patch management', 'Backups', 'Analytics'],
    pricing: 'From $300/mo',
    timeline: 'Ongoing',
    caseStudy: 'CivicWorks reliability program',
    outcomes: ['Issues caught earlier', 'Monthly reports delivered', 'Change history maintained']
  },
  {
    title: 'Branding & UI/UX',
    slug: 'branding-ui-ux',
    icon: 'FaPalette',
    tagline: 'Premium digital identity, product design, and conversion UX.',
    description:
      'Brand systems, landing pages, design systems, product interfaces, prototypes, usability improvements, and high-fidelity UI that feels credible immediately.',
    benefits: ['Visual identity', 'Design systems', 'Interactive prototypes', 'Conversion-focused UX'],
    technologies: ['Figma', 'Framer', 'Design systems', 'User journeys', 'Accessibility'],
    pricing: 'From $1,500',
    timeline: '2-6 weeks',
    caseStudy: 'Summit Advisory identity refresh',
    outcomes: ['Visual trust improved', 'Sales deck aligned', 'Component system created']
  }
];

export const stats = [
  { label: 'Projects shipped', value: 180, suffix: '+', icon: 'FaRocket' },
  { label: 'Client teams served', value: 75, suffix: '+', icon: 'FaUsers' },
  { label: 'Average response', value: 15, suffix: 'm', icon: 'FaBolt' },
  { label: 'Delivery satisfaction', value: 98, suffix: '%', icon: 'FaAward' }
];

export const processSteps = [
  {
    title: 'Discover',
    description: 'We clarify business goals, user journeys, technical risk, success metrics, budget, and delivery constraints.'
  },
  {
    title: 'Architect',
    description: 'We turn the brief into system maps, page flows, data models, security assumptions, and a milestone roadmap.'
  },
  {
    title: 'Design',
    description: 'We shape the visual system, interactions, content hierarchy, accessibility, and prototype before heavy development.'
  },
  {
    title: 'Build',
    description: 'We ship in focused cycles with polished frontend, resilient backend, integrations, QA, and transparent review points.'
  },
  {
    title: 'Launch',
    description: 'We deploy, monitor, document, train your team, and prepare post-launch support so the rollout lands cleanly.'
  }
];

export const projects = [
  {
    title: 'Northstar Client Portal',
    type: 'SaaS platform',
    industry: 'Creative operations',
    image: brand.assets.dashboard,
    summary: 'A client portal with intake, project stages, approvals, messaging, and executive visibility.',
    metrics: ['41% faster approvals', '9-week MVP', 'Role-based dashboard'],
    tags: ['React', 'Node.js', 'PostgreSQL', 'Automation']
  },
  {
    title: 'ClearPath Logistics Command Center',
    type: 'Business automation',
    industry: 'Logistics',
    image: brand.assets.meeting,
    summary: 'A dispatch and reporting layer that unified spreadsheet workflows into one operational console.',
    metrics: ['26 hrs saved weekly', 'Live KPI board', 'Automated alerts'],
    tags: ['Dashboards', 'APIs', 'Cloud', 'Analytics']
  },
  {
    title: 'HelioCare AI Support Assistant',
    type: 'AI integration',
    industry: 'Healthcare operations',
    image: brand.assets.office,
    summary: 'A guided support assistant with escalation logic, knowledge retrieval, and human review controls.',
    metrics: ['32% fewer tickets', '24/7 first response', 'Secure knowledge base'],
    tags: ['AI', 'Support', 'Vector search', 'Security']
  },
  {
    title: 'BrightPath Academy System',
    type: 'School management',
    industry: 'Education',
    image: brand.assets.team,
    summary: 'Admissions, parent portals, payment tracking, academic reports, announcements, and admin workflows.',
    metrics: ['38% less admin time', 'Parent portal launched', 'Finance automation'],
    tags: ['School systems', 'SMS', 'Payments', 'Reports']
  }
];

export const testimonials = [
  {
    name: 'Avery Johnson',
    role: 'Founder',
    company: 'Northstar Studio',
    quote:
      'STONE TECH transformed our scattered operations into a fast, polished customer portal that our clients immediately trusted.'
  },
  {
    name: 'Maya Chen',
    role: 'Operations Director',
    company: 'ClearPath Logistics',
    quote:
      'The team brought rare clarity. Every dashboard, automation, and handoff felt intentionally designed for the people using it.'
  },
  {
    name: 'Daniel Brooks',
    role: 'Managing Partner',
    company: 'Summit Advisory',
    quote:
      'They delivered the technical depth of an enterprise team with the speed and taste of a modern startup studio.'
  },
  {
    name: 'Priya Mensah',
    role: 'CEO',
    company: 'HelioCare',
    quote:
      'Our support volume dropped, our site got faster, and our sales team finally has a digital experience they are proud to share.'
  }
];

export const partners = ['Apex Cloud', 'NovaPay', 'ClearPath', 'HelioCare', 'Summit', 'CivicWorks', 'Northstar', 'AtlasOps'];

export const industries = [
  'Startups',
  'Retail',
  'Education',
  'Healthcare',
  'Professional services',
  'Logistics',
  'Nonprofits',
  'Real estate',
  'Government teams'
];

export const techStack = [
  'React',
  'Next.js',
  'Node.js',
  'PostgreSQL',
  'Supabase',
  'Tailwind CSS',
  'OpenAI',
  'AWS',
  'Azure',
  'Docker',
  'Stripe',
  'Figma',
  'Cloudflare',
  'Vercel'
];

export const certifications = [
  'Secure cloud deployment playbooks',
  'Accessibility-first interface standards',
  'Documented QA and launch checklists',
  'Backup, monitoring, and recovery procedures'
];

export const team = [
  { name: 'Jordan Blake', role: 'Principal Solutions Architect', focus: 'Cloud, SaaS, AI systems' },
  { name: 'Amara Stone', role: 'Product Design Lead', focus: 'Brand, UX strategy, interface systems' },
  { name: 'Noah Reed', role: 'Full-Stack Engineer', focus: 'APIs, dashboards, automation' },
  { name: 'Lina Torres', role: 'Support Operations Lead', focus: 'IT support, onboarding, client success' }
];

export const pricingPackages = [
  {
    name: 'Launch',
    price: '$1.8k+',
    description: 'Best for a premium website, landing system, or focused business workflow.',
    features: ['Discovery workshop', 'Design and build', 'SEO foundations', 'Analytics setup', 'Launch checklist']
  },
  {
    name: 'Scale',
    price: '$7.5k+',
    featured: true,
    description: 'Best for SaaS products, portals, automation suites, and integrated systems.',
    features: ['Product architecture', 'Frontend and backend', 'Admin dashboard', 'Integrations', 'QA and deployment']
  },
  {
    name: 'Operate',
    price: '$300/mo+',
    description: 'Best for ongoing support, monitoring, maintenance, and continuous improvements.',
    features: ['Priority support', 'Maintenance reports', 'Security checks', 'Backups', 'Roadmap reviews']
  }
];

export const jobs = [
  {
    title: 'Senior Full-Stack Developer',
    location: 'Remote',
    type: 'Contract / Full-time',
    department: 'Engineering',
    description: 'Build production-grade SaaS dashboards, APIs, and automation systems for ambitious client teams.'
  },
  {
    title: 'UI/UX Product Designer',
    location: 'Hybrid / Remote',
    type: 'Contract',
    department: 'Design',
    description: 'Shape premium web experiences, product prototypes, design systems, and conversion-focused interfaces.'
  },
  {
    title: 'IT Support Specialist',
    location: 'Client sites / Remote',
    type: 'Part-time',
    department: 'Operations',
    description: 'Support networking, troubleshooting, onboarding, documentation, and fast client issue resolution.'
  }
];

export const blogPosts = [
  {
    title: 'How to plan a SaaS MVP without creating future technical debt',
    category: 'Product Engineering',
    date: 'May 2026',
    readTime: '7 min read',
    excerpt:
      'A practical framework for choosing features, data models, admin controls, and launch metrics before the first sprint begins.'
  },
  {
    title: 'What every small business should automate before hiring more admin staff',
    category: 'Automation',
    date: 'April 2026',
    readTime: '6 min read',
    excerpt:
      'Lead routing, invoice reminders, support triage, reporting, and onboarding flows can often be automated before headcount expands.'
  },
  {
    title: 'Cybersecurity basics that make the biggest operational difference',
    category: 'Security',
    date: 'March 2026',
    readTime: '8 min read',
    excerpt:
      'MFA, backups, least-privilege access, patching, and incident playbooks are still the highest leverage moves for most teams.'
  },
  {
    title: 'Designing dashboards executives will actually use',
    category: 'UX Strategy',
    date: 'February 2026',
    readTime: '5 min read',
    excerpt:
      'Useful dashboards begin with decisions, not charts. Here is how to build a dashboard that helps leaders act quickly.'
  }
];

export const faqs = [
  {
    category: 'Services',
    question: 'What types of projects does STONE TECH SOLUTIONS handle?',
    answer:
      'We build websites, SaaS platforms, mobile apps, POS systems, school systems, cloud environments, networks, cybersecurity programs, AI automations, and long-term maintenance plans.'
  },
  {
    category: 'Process',
    question: 'Can you redesign an existing beginner-looking website?',
    answer:
      'Yes. We audit the current structure, preserve what works, rebuild the visual system, improve architecture, and relaunch in phases when needed.'
  },
  {
    category: 'Pricing',
    question: 'How do project budgets work?',
    answer:
      'After discovery, we recommend a fixed milestone plan, support retainer, or hybrid model based on scope, urgency, integrations, and risk.'
  },
  {
    category: 'AI',
    question: 'Can you add AI features to an existing business workflow?',
    answer:
      'Yes. We design AI assistants, quote calculators, support triage, document workflows, recommendations, and automations with human handoff and security controls.'
  },
  {
    category: 'Support',
    question: 'Do you offer ongoing maintenance after launch?',
    answer:
      'Yes. Maintenance can include monitoring, updates, backups, bug fixes, analytics, security reviews, and continuous feature delivery.'
  },
  {
    category: 'Delivery',
    question: 'Will my team receive documentation?',
    answer:
      'Every production handoff includes environment notes, admin workflows, deployment instructions, training notes, and practical operating guidance.'
  },
  {
    category: 'Security',
    question: 'How do you approach security?',
    answer:
      'We use least-privilege access, MFA, secure environment handling, backup policies, monitoring, dependency hygiene, and clear escalation paths.'
  },
  {
    category: 'Timeline',
    question: 'How quickly can a project start?',
    answer:
      'Most engagements begin with a discovery call within two business days, followed by a written roadmap and delivery plan.'
  }
];

export const adminMetrics = [
  { label: 'Open leads', value: '38', trend: '+12%', status: 'Healthy' },
  { label: 'Active projects', value: '14', trend: '+4', status: 'In delivery' },
  { label: 'Support SLA', value: '98%', trend: '+6%', status: 'On target' },
  { label: 'Monthly revenue', value: '$84k', trend: '+18%', status: 'Growing' }
];

export const supportTopics = [
  'Website issue',
  'Email or account access',
  'Network outage',
  'Software installation',
  'Security concern',
  'AI assistant support',
  'Billing or contract'
];

export const quoteOptions = {
  base: {
    website: 1800,
    saas: 7500,
    mobile: 6800,
    automation: 2400,
    support: 300
  },
  multipliers: {
    standard: 1,
    advanced: 1.55,
    enterprise: 2.4
  }
};

export const findServiceBySlug = (slug) => services.find((service) => service.slug === slug);
