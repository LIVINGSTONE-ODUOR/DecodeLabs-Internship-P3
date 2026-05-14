import { FaCode, FaCloudDownloadAlt, FaHeadset, FaProjectDiagram, FaRobot, FaRocket } from 'react-icons/fa';
import { HiArrowRight } from 'react-icons/hi';
import Card from '../ui/Card';
const icons = { FaCode, FaCloudDownloadAlt, FaHeadset, FaProjectDiagram, FaRobot, FaRocket };
export default function ServiceCard({ service }) { const Icon = icons[service.icon] || FaCode; return <Card className="group h-full"><div className="mb-6 grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-primary to-secondary text-xl text-white shadow-glow"><Icon /></div><h3 className="font-display text-xl font-bold">{service.title}</h3><p className="mt-3 leading-7 text-slate-600 dark:text-slate-300">{service.description}</p><a href="/get-started" className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-primary">Learn More <HiArrowRight className="transition group-hover:translate-x-1" /></a></Card>; }
