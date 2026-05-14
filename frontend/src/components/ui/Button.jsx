import { motion } from 'framer-motion';
const variants = {
  primary:
    'relative border border-cyan-200/30 bg-[linear-gradient(135deg,#67e8f9,#7dd3fc_42%,#34d399)] text-slate-950 shadow-[0_18px_55px_rgba(34,211,238,.22)] hover:shadow-[0_22px_70px_rgba(52,211,153,.26)]',
  secondary: 'border border-cyan-300/20 bg-slate-900/90 text-white shadow-glass hover:border-cyan-200/40 hover:bg-slate-800',
  outline: 'border border-white/10 bg-white/[0.035] text-white hover:border-cyan-200/40 hover:bg-white/[0.075]',
  ghost: 'bg-transparent text-white hover:bg-white/10'
};
const sizes = { sm: 'h-10 px-4 text-sm', md: 'h-12 px-5 text-sm', lg: 'h-14 px-7 text-base' };
export default function Button({ children, className = '', variant = 'primary', size = 'md', as: Tag = 'button', loading = false, icon: Icon, ...props }) {
  return (
    <motion.div
      whileTap={{ scale: 0.985 }}
      whileHover={{ y: -2 }}
      transition={{ type: 'spring', stiffness: 420, damping: 30 }}
      className={className.includes('w-full') ? 'flex w-full' : 'inline-flex'}
    >
      <Tag
        className={`group focus-ring inline-flex items-center justify-center gap-2 overflow-hidden rounded-lg font-bold transition duration-300 ${variants[variant]} ${sizes[size]} disabled:cursor-not-allowed disabled:opacity-60 ${className}`}
        disabled={loading || props.disabled}
        {...props}
      >
        {variant === 'primary' && <span className="pointer-events-none absolute inset-0 translate-x-[-120%] bg-gradient-to-r from-transparent via-white/35 to-transparent transition-transform duration-700 group-hover:translate-x-[120%]" />}
        {loading && <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />}
        {Icon && !loading && <Icon aria-hidden="true" />}
        <span className="relative">{children}</span>
      </Tag>
    </motion.div>
  );
}
