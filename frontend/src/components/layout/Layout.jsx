import Navbar from './Navbar';
import Footer from './Footer';
import AIChatbot from '../features/AIChatbot';
export default function Layout({ children }) {
  return (
    <>
      <a
        href="#main-content"
        className="focus-ring fixed left-4 top-4 z-[90] -translate-y-20 rounded-lg bg-cyan-200 px-4 py-3 text-sm font-black text-slate-950 transition focus:translate-y-0"
      >
        Skip to content
      </a>
      <Navbar />
      <main id="main-content">{children}</main>
      <Footer />
      <AIChatbot />
    </>
  );
}
