import { Link } from 'react-router-dom';
import { brand } from '../data/companyData';

export default function AuthLayout({ children, title, subtitle }) {
  return (
    <main className="relative grid min-h-screen place-items-center overflow-hidden bg-[#020617] px-4 py-10 text-white">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_16%_15%,rgba(34,211,238,.2),transparent_20%),radial-gradient(circle_at_84%_72%,rgba(139,92,246,.14),transparent_18%),linear-gradient(180deg,rgba(1,6,17,.88),rgba(1,6,17,.98))]" />
      <div className="pointer-events-none absolute left-1/2 top-1/3 h-72 w-72 -translate-x-1/2 rounded-full bg-cyan-400/10 blur-3xl" />
      <div className="pointer-events-none absolute right-10 top-10 h-40 w-40 rounded-full bg-violet-500/10 blur-3xl" />
      <div className="relative grid w-full max-w-5xl overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.05] shadow-[0_40px_120px_rgba(0,0,0,.38)] backdrop-blur-3xl lg:grid-cols-[1.04fr_.96fr]">
        <div className="hidden border-r border-white/10 p-10 lg:block">
          <Link to="/" className="inline-flex items-center gap-3">
            <span className="grid h-14 w-14 place-items-center rounded-3xl border border-white/10 bg-white/[0.05] shadow-glow">
              <img src={brand.logo} alt="" className="h-11 w-11 object-contain" />
            </span>
            <span>
              <span className="block text-sm font-black uppercase tracking-[0.22em]">STONE TECH</span>
              <span className="block text-[10px] font-black uppercase tracking-[0.26em] text-cyan-200">Client portal</span>
            </span>
          </Link>

          <h2 className="mt-16 text-4xl font-black leading-tight text-white sm:text-5xl">Secure access for projects, quotes, support, and delivery visibility.</h2>
          <div className="mt-10 grid gap-3">
            {['Quote workflow', 'Project control', 'Support routing', 'Secure operations'].map((item) => (
              <div key={item} className="rounded-3xl border border-white/10 bg-slate-950/70 p-4 text-sm font-black text-slate-300 shadow-[inset_0_0_0_1px_rgba(255,255,255,.03)]">
                {item}
              </div>
            ))}
          </div>
        </div>
        <div className="relative p-6 sm:p-8 lg:p-10">
          <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-cyan-200/5 blur-2xl" />
          <div className="absolute left-8 bottom-0 h-28 w-28 rounded-full bg-violet-500/5 blur-2xl" />
          <Link to="/" className="mb-8 flex justify-center lg:hidden">
            <img src={brand.logo} alt="STONE TECH" className="h-12 rounded-2xl border border-white/10 bg-white/[0.04] p-1 shadow-glow" />
          </Link>
          <h1 className="text-center text-3xl font-black text-white sm:text-4xl lg:text-5xl">{title}</h1>
          <p className="mb-8 mt-4 text-center text-sm leading-6 text-slate-400 sm:text-base">{subtitle}</p>
          {children}
        </div>
      </div>
    </main>
  );
}
