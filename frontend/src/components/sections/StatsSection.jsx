import { stats } from '../../utils/constants';
import StatCounter from '../features/StatCounter';
export default function StatsSection() { return <section className="section-pad relative overflow-hidden bg-slate-950"><div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0,rgba(10,102,255,.35),transparent_38%)]"/><div className="relative mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 md:grid-cols-4 lg:px-8">{stats.map((stat)=><StatCounter key={stat.label} stat={stat}/>)}</div></section>; }
