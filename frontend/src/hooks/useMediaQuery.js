import { useEffect, useState } from 'react';
export default function useMediaQuery(query) { const [matches, setMatches] = useState(() => matchMedia(query).matches); useEffect(() => { const m = matchMedia(query); const onChange = () => setMatches(m.matches); m.addEventListener('change', onChange); return () => m.removeEventListener('change', onChange); }, [query]); return matches; }
