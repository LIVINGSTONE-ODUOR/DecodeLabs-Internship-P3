import { Link, Outlet } from 'react-router-dom';
import { FaChartLine, FaComments, FaFolderOpen } from 'react-icons/fa';
import useAuth from '../hooks/useAuth';
import { brand } from '../data/companyData';

export default function DashboardLayout() {
  const { user, logout } = useAuth();
  const links = [
    [FaChartLine, 'Overview', '/dashboard'],
    [FaComments, 'Messages', '#messages'],
    [FaFolderOpen, 'Requests', '#requests']
  ];

  return (
    <div className="min-h-screen bg-[#030712] text-white">
      <aside className="fixed inset-y-0 left-0 hidden w-72 border-r border-white/10 bg-slate-950/80 p-6 backdrop-blur-2xl lg:block">
        <Link to="/" className="flex items-center gap-3">
          <img src={brand.logo} alt="STONE TECH" className="h-12 w-12 rounded-lg border border-white/10 bg-white/[0.04] object-contain p-1" />
          <span>
            <span className="block text-sm font-black uppercase tracking-[0.2em]">STONE TECH</span>
            <span className="block text-[10px] uppercase tracking-[0.24em] text-cyan-200">Dashboard</span>
          </span>
        </Link>
        <nav className="mt-10 space-y-2">
          {links.map(([Icon, label, href], index) => {
            const className = `flex items-center gap-3 rounded-lg px-4 py-3 font-bold transition ${index === 0 ? 'bg-cyan-200 text-slate-950' : 'text-slate-300 hover:bg-white/[0.07] hover:text-white'}`;
            return href.startsWith('#') ? (
              <a key={label} className={className} href={href}>
                <Icon /> {label}
              </a>
            ) : (
              <Link key={label} className={className} to={href}>
                <Icon /> {label}
              </Link>
            );
          })}
        </nav>
      </aside>
      <main className="lg:pl-72">
        <header className="flex h-20 items-center justify-between border-b border-white/10 bg-slate-950/75 px-6 backdrop-blur-2xl">
          <div>
            <p className="text-sm text-slate-500">Welcome</p>
            <h1 className="text-xl font-black">{user?.fullName || user?.full_name || 'STONE TECH Client'}</h1>
          </div>
          <button onClick={logout} className="focus-ring rounded-lg border border-white/10 px-4 py-2 text-sm font-bold text-slate-200 transition hover:bg-white/[0.07]">
            Sign out
          </button>
        </header>
        <Outlet />
      </main>
    </div>
  );
}
