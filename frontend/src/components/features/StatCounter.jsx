import CountUp from 'react-countup';
import { FaAward, FaBolt, FaCheckCircle, FaUsers } from 'react-icons/fa';
import { useInView } from 'react-intersection-observer';
const icons = { FaCheckCircle, FaUsers, FaBolt, FaAward };
export default function StatCounter({ stat }) { const { ref, inView } = useInView({ triggerOnce: true, threshold: .4 }); const Icon = icons[stat.icon] || FaBolt; return <div ref={ref} className="text-center"><div className="mx-auto mb-4 grid h-14 w-14 place-items-center rounded-2xl bg-white/10 text-secondary"><Icon size={24} /></div><div className="font-display text-4xl font-black text-white">{inView && <CountUp end={stat.value} duration={2.2} />}{stat.suffix}</div><p className="mt-2 text-sm font-semibold text-slate-300">{stat.label}</p></div>; }
