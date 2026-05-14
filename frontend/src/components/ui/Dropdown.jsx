import { useEffect, useId, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

export default function Dropdown({ trigger, children, align = 'right' }) {
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const buttonRef = useRef(null);
  const close = () => setOpen(false);
  const centerX = align === 'center' ? '-50%' : 0;

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        close();
        buttonRef.current?.focus?.();
      }
    };

    const onPointerDown = (e) => {
      const target = e.target;
      if (!(target instanceof Node)) return;
      const panel = document.getElementById(panelId);
      if (!panel) return;
      const withinPanel = panel.contains(target);
      const withinButton = buttonRef.current?.contains(target);
      if (!withinPanel && !withinButton) close();
    };

    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('pointerdown', onPointerDown);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('pointerdown', onPointerDown);
    };
  }, [open, panelId]);

  return (
    <div className="relative">
      <button
        ref={buttonRef}
        className="focus-ring rounded-xl"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((v) => !v)}
      >
        {trigger}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            id={panelId}
            role="menu"
            initial={{ opacity: 0, y: 12, x: centerX, filter: 'blur(10px)' }}
            animate={{ opacity: 1, y: 0, x: centerX, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: 10, x: centerX, filter: 'blur(8px)' }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className={`absolute top-full z-50 mt-3 min-w-56 rounded-xl border border-white/10 bg-slate-950/92 p-2 shadow-[0_28px_90px_rgba(0,0,0,.42)] backdrop-blur-2xl ${
              align === 'right' ? 'right-0' : align === 'center' ? 'left-1/2' : 'left-0'
            }`}
            onMouseLeave={() => setOpen(false)}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
