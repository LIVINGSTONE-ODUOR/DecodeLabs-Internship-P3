import { motion } from 'framer-motion';
import { formatTime } from '../../utils/formatters';

export default function AIChatMessage({ message }) {
  const mine = message.role === 'user';
  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className={`flex ${mine ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`max-w-[84%] rounded-lg border px-4 py-3 text-sm shadow-sm ${
          mine
            ? 'border-cyan-200/30 bg-cyan-200 text-slate-950'
            : message.error
              ? 'border-rose-300/30 bg-rose-950/45 text-rose-100'
              : 'border-white/10 bg-white/[0.06] text-slate-100'
        }`}
      >
        <p className="whitespace-pre-wrap leading-6">{message.content}</p>
        <span className={`mt-1 block text-[10px] ${mine ? 'text-slate-700' : 'text-slate-500'}`}>{formatTime(message.createdAt || Date.now())}</span>
      </div>
    </motion.div>
  );
}
