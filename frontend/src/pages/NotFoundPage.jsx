import { Link } from 'react-router-dom';
import { FaArrowRight } from 'react-icons/fa';
import Button from '../components/ui/Button';
import { PageTransition, SEO } from '../sections/EnterpriseSections';

export default function NotFoundPage() {
  return (
    <PageTransition>
      <SEO title="Page Not Found" description="The requested STONE TECH SOLUTIONS page could not be found." />
      <main className="relative grid min-h-screen place-items-center overflow-hidden bg-[#030712] px-4 text-center text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(34,211,238,.18),transparent_30%),radial-gradient(circle_at_70%_70%,rgba(52,211,153,.14),transparent_28%)]" />
        <div className="relative max-w-2xl">
          <p className="text-8xl font-black text-cyan-200">404</p>
          <h1 className="mt-4 text-4xl font-black sm:text-5xl">This page moved outside the system map.</h1>
          <p className="mx-auto mt-5 max-w-md leading-8 text-slate-300">
            The route does not exist, but the main STONE TECH SOLUTIONS experience is ready.
          </p>
          <div className="mt-8 flex justify-center">
            <Button as={Link} to="/" size="lg" icon={FaArrowRight}>
              Return home
            </Button>
          </div>
        </div>
      </main>
    </PageTransition>
  );
}
