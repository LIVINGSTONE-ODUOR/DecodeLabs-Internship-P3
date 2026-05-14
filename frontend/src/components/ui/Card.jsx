import { motion } from 'framer-motion';
export default function Card({ children, className = '', hover = true }) {
  return <motion.div whileHover={hover ? { y: -6, scale: 1.01 } : undefined} transition={{ type: 'spring', stiffness: 260, damping: 22 }} className={`glass rounded-2xl p-6 ${className}`}>{children}</motion.div>;
}
