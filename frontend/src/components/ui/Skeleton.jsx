import ReactSkeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
export default function Skeleton({ className = '', ...props }) { return <ReactSkeleton baseColor="rgba(148,163,184,.18)" highlightColor="rgba(255,255,255,.42)" className={className} {...props} />; }
