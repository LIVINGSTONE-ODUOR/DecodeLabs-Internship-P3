import { AnimatePresence, motion } from 'framer-motion';
import { HiX } from 'react-icons/hi';

export default function Modal({ open, onClose, title, children }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[80] grid place-items-center bg-slate-950/70 p-4 backdrop-blur-xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onMouseDown={onClose}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={title}
            className="premium-card w-full max-w-lg p-6 text-white"
            initial={{ opacity: 0, y: 24, scale: 0.96, filter: 'blur(8px)' }}
            animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: 16, scale: 0.98, filter: 'blur(8px)' }}
            onMouseDown={(e) => e.stopPropagation()}
          >
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-black text-white">{title}</h2>
              <button className="focus-ring rounded-lg p-2 text-slate-300 hover:bg-white/10 hover:text-white" onClick={onClose} aria-label="Close">
                <HiX />
              </button>
            </div>
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
