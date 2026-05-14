import { useInView } from 'react-intersection-observer';
export default function useScrollAnimation(options = {}) { return useInView({ triggerOnce: true, threshold: .15, ...options }); }
