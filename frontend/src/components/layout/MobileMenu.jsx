import { AnimatePresence, motion } from 'framer-motion';
import { Link, NavLink } from 'react-router-dom';
import { FaArrowRight, FaHeadset, FaRegCompass } from 'react-icons/fa';
import { HiX } from 'react-icons/hi';
import { brand, navLinks, services, stats } from '../../data/companyData';
import Button from '../ui/Button';

export default function MobileMenu({ open, onClose }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[70] bg-slate-950/78 backdrop-blur-2xl xl:hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) onClose?.();
          }}
        >
          <motion.aside
            className="ml-auto flex h-full w-full max-w-[440px] flex-col overflow-y-auto border-l border-white/10 bg-[#030712]/95 p-5 text-white shadow-[0_30px_120px_rgba(0,0,0,.45)]"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation"
            initial={{ x: '100%', filter: 'blur(8px)' }}
            animate={{ x: 0, filter: 'blur(0px)' }}
            exit={{ x: '100%', filter: 'blur(8px)' }}
            transition={{ type: 'spring', damping: 28, stiffness: 290 }}
          >
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <Link to="/" onClick={onClose} className="flex items-center gap-3">
                <span className="grid h-11 w-11 place-items-center rounded-lg border border-white/10 bg-white/[0.04]">
                  <img src={brand.logo} alt="" className="h-9 w-9 object-contain" />
                </span>
                <div>
                  <p className="text-sm font-black uppercase tracking-[0.22em] text-white">STONE TECH</p>
                  <p className="text-[10px] uppercase tracking-[0.28em] text-cyan-200">Command menu</p>
                </div>
              </Link>
              <button onClick={onClose} className="focus-ring grid h-11 w-11 place-items-center rounded-lg border border-white/10 text-white" aria-label="Close menu">
                <HiX size={22} />
              </button>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3">
              {stats.slice(0, 4).map((item) => (
                <div key={item.label} className="premium-card p-4">
                  <p className="text-2xl font-black text-white">
                    {item.value}
                    {item.suffix}
                  </p>
                  <p className="mt-1 text-[10px] font-black uppercase tracking-[0.18em] text-slate-500">{item.label}</p>
                </div>
              ))}
            </div>

            <div className="mt-7 space-y-2">
              {navLinks.map((link, index) => (
                <NavLink
                  onClick={onClose}
                  key={link.href}
                  to={link.href}
                  className={({ isActive }) =>
                    `group flex items-center justify-between rounded-lg border px-4 py-4 text-base font-black transition ${
                      isActive ? 'border-cyan-200/30 bg-cyan-200/10 text-white' : 'border-white/10 bg-white/[0.035] text-slate-200 hover:bg-white/[0.07]'
                    }`
                  }
                >
                  <span>{link.label}</span>
                  <span className="text-xs text-slate-500">0{index + 1}</span>
                </NavLink>
              ))}
            </div>

            <div className="mt-7 premium-card-strong p-5">
              <div className="flex items-center gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-lg bg-emerald-200 text-slate-950">
                  <FaRegCompass />
                </span>
                <div>
                  <p className="quiet-label text-emerald-200">Featured systems</p>
                  <p className="font-black text-white">Choose a build path</p>
                </div>
              </div>
              <div className="mt-5 grid gap-2">
                {services.slice(0, 5).map((service) => (
                  <Link
                    key={service.slug}
                    onClick={onClose}
                    to={`/services/${service.slug}`}
                    className="rounded-lg border border-white/10 bg-slate-950/80 px-4 py-3 transition hover:border-cyan-200/30 hover:bg-white/[0.06]"
                  >
                    <p className="text-sm font-black text-white">{service.title}</p>
                    <p className="mt-1 text-xs text-slate-500">{service.pricing} / {service.timeline}</p>
                  </Link>
                ))}
              </div>
            </div>

            <div className="mt-7 grid gap-3">
              <Button as={Link} to="/quote" onClick={onClose} className="w-full" icon={FaArrowRight}>
                Request quote
              </Button>
              <Button as={Link} to="/support" onClick={onClose} className="w-full" variant="outline" icon={FaHeadset}>
                Client support
              </Button>
            </div>

            <div className="mt-auto pt-7">
              <div className="rounded-lg border border-white/10 bg-white/[0.035] p-4 text-sm leading-6 text-slate-400">
                Enterprise software, cloud infrastructure, AI automation, cybersecurity, support, and digital transformation under one delivery system.
              </div>
            </div>
          </motion.aside>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
