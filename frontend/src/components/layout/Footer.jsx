import { Link } from 'react-router-dom';
import { FaArrowRight, FaPaperPlane } from 'react-icons/fa';
import { FaGithub, FaLinkedin, FaInstagram } from 'react-icons/fa6';
import toast from 'react-hot-toast';
import Button from '../ui/Button';
import { brand, navLinks, partners, services, techStack, utilityLinks } from '../../data/companyData';

export default function Footer() {
  const submit = (event) => {
    event.preventDefault();
    toast.success('Subscribed to STONE TECH insights');
    event.currentTarget.reset();
  };

  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-[#030712] text-white">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-200/50 to-transparent" />
      <div className="shell py-16 lg:py-20">
        <div className="grid gap-10 lg:grid-cols-[1.15fr_.75fr_.75fr_1fr]">
          <div>
            <Link to="/" className="inline-flex items-center gap-3">
              <span className="grid h-14 w-14 place-items-center rounded-lg border border-white/10 bg-white/[0.04]">
                <img src={brand.logo} alt="STONE TECH SOLUTIONS" className="h-11 w-11 object-contain" loading="lazy" decoding="async" />
              </span>
              <span>
                <span className="block text-lg font-black uppercase tracking-[0.2em] text-white">STONE TECH</span>
                <span className="block text-xs uppercase tracking-[0.28em] text-cyan-200">SOLUTIONS</span>
              </span>
            </Link>
            <p className="mt-6 max-w-md text-sm leading-7 text-slate-400">
              {brand.slogan}. Premium software engineering, AI automation, cloud infrastructure, cybersecurity, and managed technology support for ambitious teams.
            </p>

            <div className="mt-7 grid gap-3 sm:grid-cols-3">
              {['Enterprise grade', 'SLA backed', 'Secure by design'].map((item) => (
                <span key={item} className="rounded-lg border border-white/10 bg-white/[0.035] px-3 py-3 text-center text-[10px] font-black uppercase tracking-[0.2em] text-cyan-100">
                  {item}
                </span>
              ))}
            </div>

            <div className="mt-7 flex items-center gap-3 text-slate-400">
              <a href="https://www.linkedin.com/in/livingstone-oduor/" aria-label="LinkedIn" className="focus-ring grid h-10 w-10 place-items-center rounded-lg border border-white/10 transition hover:border-cyan-200/30 hover:text-cyan-200">
                <FaLinkedin />
              </a>
              <a href="https://github.com/LIVINGSTONE-ODUOR" aria-label="GitHub" className="focus-ring grid h-10 w-10 place-items-center rounded-lg border border-white/10 transition hover:border-cyan-200/30 hover:text-cyan-200">
                <FaGithub />
              </a>
              <a href="https://instagram.com/thee_nairobian_boss" aria-label="Instagram" className="focus-ring grid h-10 w-10 place-items-center rounded-lg border border-white/10 transition hover:border-cyan-200/30 hover:text-cyan-200">
                <FaInstagram />
              </a>
            </div>
          </div>

          <div>
            <h3 className="quiet-label text-cyan-200">Company</h3>
            <ul className="mt-5 space-y-3 text-sm font-semibold text-slate-400">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link to={link.href} className="transition hover:text-white">
                    {link.label}
                  </Link>
                </li>
              ))}
              {utilityLinks.map((link) => (
                <li key={link.href}>
                  <Link to={link.href} className="transition hover:text-white">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="quiet-label text-cyan-200">Solutions</h3>
            <ul className="mt-5 space-y-3 text-sm font-semibold text-slate-400">
              {services.slice(0, 8).map((service) => (
                <li key={service.slug}>
                  <Link to={`/services/${service.slug}`} className="transition hover:text-white">
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="premium-card p-6">
            <p className="quiet-label text-emerald-200">Executive brief</p>
            <h3 className="mt-4 text-2xl font-black text-white">Monthly signals for serious digital teams.</h3>
            <p className="mt-3 text-sm leading-7 text-slate-400">AI workflow ideas, platform strategy, security notes, and launch lessons in one concise briefing.</p>
            <form onSubmit={submit} className="mt-6 space-y-3">
              <label className="sr-only" htmlFor="footer-email">
                Email address
              </label>
              <input id="footer-email" required className="input-premium" placeholder="you@company.com" type="email" />
              <Button className="w-full" type="submit" icon={FaPaperPlane}>
                Subscribe
              </Button>
            </form>
          </div>
        </div>

        <div className="mt-12 border-y border-white/10 py-6">
          <div className="marquee-mask overflow-hidden">
            <div className="animate-marquee flex w-max gap-3">
              {[...partners, ...techStack, ...partners, ...techStack].map((item, index) => (
                <span key={`${item}-${index}`} className="rounded-lg border border-white/10 bg-white/[0.035] px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-slate-400">
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 grid gap-5 text-sm text-slate-500 sm:grid-cols-[1fr_auto] sm:items-center">
          <div>
            <p>&copy; {new Date().getFullYear()} {brand.name}. All rights reserved.</p>
            <p className="mt-2 text-xs uppercase tracking-[0.22em] text-slate-600">ISO-ready / SLA-backed / Privacy-first</p>
          </div>
          <div className="flex flex-wrap gap-3 sm:justify-end">
            <Button as={Link} to="/quote" size="sm" icon={FaArrowRight}>
              Start a project
            </Button>
            <button type="button" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="focus-ring rounded-lg px-3 py-2 font-black text-cyan-200 transition hover:bg-white/[0.06] hover:text-white">
              Back to top
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
