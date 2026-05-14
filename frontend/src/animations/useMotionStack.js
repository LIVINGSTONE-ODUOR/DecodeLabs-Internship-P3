import { useEffect } from 'react';
import 'lenis/dist/lenis.css';

async function loadMotionTools() {
  const [{ default: gsap }, { ScrollTrigger }, { default: Lenis }] = await Promise.all([
    import('gsap'),
    import('gsap/ScrollTrigger'),
    import('lenis')
  ]);
  gsap.registerPlugin(ScrollTrigger);
  return { gsap, ScrollTrigger, Lenis };
}

export function useMotionStack() {
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return undefined;

    let cleanup;
    let active = true;

    loadMotionTools().then(({ gsap, ScrollTrigger, Lenis }) => {
      if (!active) return;

      const lenis = new Lenis({
        duration: 1.08,
        easing: (time) => Math.min(1, 1.001 - 2 ** (-10 * time)),
        smoothWheel: true
      });

      const raf = (time) => lenis.raf(time * 1000);
      lenis.on('scroll', ScrollTrigger.update);
      gsap.ticker.add(raf);
      gsap.ticker.lagSmoothing(0);

      cleanup = () => {
        gsap.ticker.remove(raf);
        lenis.destroy();
      };
    });

    return () => {
      active = false;
      cleanup?.();
    };
  }, []);
}

export function useGsapPageReveals(scopeKey) {
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return undefined;

    let active = true;
    let frame = 0;
    let animations = [];

    loadMotionTools().then(({ gsap, ScrollTrigger }) => {
      if (!active) return;

      frame = window.requestAnimationFrame(() => {
        animations = gsap.utils.toArray('[data-gsap-reveal]').map((element) =>
          gsap.fromTo(
            element,
            { autoAlpha: 0, y: 24, filter: 'blur(8px)' },
            {
              autoAlpha: 1,
              y: 0,
              filter: 'blur(0px)',
              duration: 0.7,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: element,
                start: 'top 88%',
                once: true
              }
            }
          )
        );
        ScrollTrigger.refresh();
      });
    });

    return () => {
      active = false;
      window.cancelAnimationFrame(frame);
      animations.forEach((animation) => {
        animation.scrollTrigger?.kill();
        animation.kill();
      });
    };
  }, [scopeKey]);
}
