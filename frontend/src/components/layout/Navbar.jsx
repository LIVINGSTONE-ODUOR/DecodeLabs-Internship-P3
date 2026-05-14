import { useEffect, useMemo, useRef, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaArrowRight, FaChevronDown, FaHeadset, FaMoon, FaSun } from 'react-icons/fa';
import { HiMenuAlt3 } from 'react-icons/hi';
import { brand, services } from '../../data/companyData';
import useAuth from '../../hooks/useAuth';
import useTheme from '../../hooks/useTheme';
import Avatar from '../ui/Avatar';
import Button from '../ui/Button';
import Dropdown from '../ui/Dropdown';
import MobileMenu from './MobileMenu';

const primaryLinks = [
  { label: 'Home', href: '/' },
  { label: 'Services', href: '/services' },
  { label: 'Projects', href: '/portfolio' },
  { label: 'Insights', href: '/insights' }
];

const companyLinks = [
  { label: 'About', href: '/about', note: 'Studio, standards, and delivery model' },
  { label: 'Careers', href: '/careers', note: 'Join product, engineering, and support' },
  { label: 'Contact', href: '/contact', note: 'Start a strategy conversation' },
  { label: 'FAQ', href: '/faq', note: 'Answers before the first call' }
];

function NavItem({ item, currentPath }) {
  const active = item.href === '/' ? currentPath === '/' : currentPath.startsWith(item.href);
  return (
    <NavLink
      to={item.href}
      className={`magnetic-link rounded-lg px-3 py-2 text-sm font-bold transition ${
        active ? 'bg-white/[0.08] text-white shadow-[inset_0_0_0_1px_rgba(255,255,255,.08)]' : 'text-slate-300 hover:bg-white/[0.055] hover:text-white'
      }`}
      aria-current={active ? 'page' : undefined}
    >
      {item.label}
    </NavLink>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [compressed, setCompressed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const lastY = useRef(0);
  const location = useLocation();
  const { isDark, themeName, themes, setTheme, toggleTheme } = useTheme();
  const { user, logout, isAuthenticated } = useAuth();

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 18);
      setCompressed(y > 180 && y > lastY.current);
      lastY.current = y;
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const featuredServices = useMemo(() => services.slice(0, 6), []);

  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.58, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${compressed ? 'py-2' : scrolled ? 'py-3' : 'py-5'}`}
    >
      <nav
        className={`mx-auto flex max-w-[1180px] items-center justify-between gap-3 border border-white/10 bg-slate-950/78 px-3 shadow-[0_20px_80px_rgba(0,0,0,.32)] backdrop-blur-2xl transition-all duration-500 sm:px-4 ${
          compressed ? 'h-14 rounded-xl' : 'h-18 rounded-2xl'
        } ${scrolled ? 'ring-1 ring-cyan-200/10' : ''}`}
      >
        <Link to="/" className="group flex min-w-0 items-center gap-3" aria-label="STONE TECH SOLUTIONS home">
          <span className="relative grid h-10 w-10 shrink-0 place-items-center overflow-hidden rounded-lg border border-white/10 bg-white/[0.04]">
            <img src={brand.logo} alt="" className="h-8 w-8 object-contain transition duration-500 group-hover:scale-110" />
            <span className="absolute inset-x-2 bottom-1 h-px bg-cyan-200/50" />
          </span>
          <span className={`hidden min-w-0 transition-all duration-300 sm:block ${compressed ? 'w-0 opacity-0' : 'w-44 opacity-100'}`}>
            <span className="block truncate text-[13px] font-black uppercase tracking-[0.22em] text-white">STONE TECH</span>
            <span className="block truncate text-[10px] font-bold uppercase tracking-[0.28em] text-cyan-200">Solutions</span>
          </span>
        </Link>

        <div className="hidden items-center gap-1 xl:flex">
          {primaryLinks.map((item) => (
            <NavItem key={item.href} item={item} currentPath={location.pathname} />
          ))}

          <Dropdown
            align="center"
            trigger={
              <span className="magnetic-link inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-bold text-slate-300 transition hover:bg-white/[0.055] hover:text-white">
                Company <FaChevronDown className="text-[10px]" />
              </span>
            }
          >
            <div className="grid w-[520px] max-w-[calc(100vw-2rem)] gap-2 p-2">
              {companyLinks.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  className="group grid gap-1 rounded-lg border border-transparent px-4 py-3 text-left transition hover:border-cyan-200/20 hover:bg-white/[0.06]"
                >
                  <span className="font-black text-white">{item.label}</span>
                  <span className="text-xs leading-5 text-slate-400 group-hover:text-slate-300">{item.note}</span>
                </Link>
              ))}
            </div>
          </Dropdown>

          <Dropdown
            align="center"
            trigger={
              <span className="inline-flex items-center gap-2 rounded-lg border border-cyan-200/15 bg-cyan-200/10 px-3 py-2 text-sm font-black text-cyan-100 transition hover:border-cyan-200/35 hover:bg-cyan-200/15">
                Solutions <FaChevronDown className="text-[10px]" />
              </span>
            }
          >
            <div className="w-[720px] max-w-[calc(100vw-2rem)] p-3">
              <div className="grid gap-3 md:grid-cols-[1fr_.78fr]">
                <div className="grid gap-2 sm:grid-cols-2">
                  {featuredServices.map((service) => (
                    <Link
                      key={service.slug}
                      to={`/services/${service.slug}`}
                      className="group rounded-lg border border-white/10 bg-white/[0.035] p-4 transition hover:-translate-y-0.5 hover:border-cyan-200/30 hover:bg-white/[0.075]"
                    >
                      <p className="font-black text-white">{service.title}</p>
                      <p className="mt-2 text-xs leading-5 text-slate-400">{service.tagline}</p>
                    </Link>
                  ))}
                </div>
                <div className="rounded-lg border border-emerald-200/15 bg-emerald-200/10 p-5">
                  <p className="quiet-label text-emerald-200">Delivery model</p>
                  <h3 className="mt-4 text-xl font-black text-white">Strategy, design, engineering, launch.</h3>
                  <p className="mt-3 text-sm leading-6 text-slate-300">
                    Build a website, SaaS platform, mobile app, AI workflow, or secure infrastructure program with one senior delivery partner.
                  </p>
                  <Button as={Link} to="/services" className="mt-5 w-full" size="sm" icon={FaArrowRight}>
                    View all services
                  </Button>
                </div>
              </div>
            </div>
          </Dropdown>
        </div>

        <div className="hidden items-center gap-2 xl:flex">
          <Dropdown
            trigger={
              <span className="focus-ring inline-flex h-10 items-center gap-2 rounded-lg border border-white/10 bg-white/[0.035] px-3 text-sm font-bold text-slate-200 transition hover:border-cyan-200/30 hover:bg-white/[0.075]">
                {isDark ? <FaMoon /> : <FaSun />} Theme
              </span>
            }
          >
            <div className="w-64 p-2">
              <p className="quiet-label px-3 pb-2 text-cyan-200">{themeName}</p>
              <div className="grid gap-2">
                {themes.map((item) => (
                  <button key={item.id} onClick={() => setTheme(item.id)} className="rounded-lg border border-white/10 bg-white/[0.04] px-3 py-2 text-left text-sm font-bold text-slate-200 transition hover:bg-white/[0.08]">
                    {item.name}
                  </button>
                ))}
              </div>
              <button onClick={toggleTheme} className="mt-2 w-full rounded-lg bg-cyan-200 px-3 py-2 text-sm font-black text-slate-950">
                Cycle theme
              </button>
            </div>
          </Dropdown>

          {isAuthenticated ? (
            <Dropdown trigger={<Avatar name={user.fullName || user.full_name || 'Client'} />}>
              <Link to="/dashboard" className="block rounded-lg px-4 py-3 text-sm font-semibold text-slate-200 transition hover:bg-white/10">
                Dashboard
              </Link>
              <button
                onClick={logout}
                className="block w-full rounded-lg px-4 py-3 text-left text-sm font-semibold text-slate-200 transition hover:bg-white/10"
              >
                Sign out
              </button>
            </Dropdown>
          ) : (
            <Link
              to="/sign-in"
              className="rounded-lg border border-white/10 bg-white/[0.035] px-3 py-2 text-sm font-bold text-slate-200 transition hover:bg-white/[0.075] hover:text-white"
            >
              Portal
            </Link>
          )}

          <Button as={Link} to="/support" variant="outline" size="sm" icon={FaHeadset}>
            Support
          </Button>
          <Button as={Link} to="/quote" size="sm" icon={FaArrowRight}>
            Quote
          </Button>
        </div>

        <motion.button
          whileTap={{ scale: 0.96 }}
          className="focus-ring grid h-10 w-10 place-items-center rounded-lg border border-white/10 bg-white/[0.04] text-white xl:hidden"
          onClick={() => setMobileOpen(true)}
          aria-label="Open menu"
        >
          <HiMenuAlt3 size={24} />
        </motion.button>
      </nav>
      <MobileMenu open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </motion.header>
  );
}
