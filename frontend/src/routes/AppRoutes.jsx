import { lazy, Suspense } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import DashboardLayout from '../layouts/DashboardLayout';
import MainLayout from '../layouts/MainLayout';
import Spinner from '../components/ui/Spinner';
import ProtectedRoute from './ProtectedRoute';

const HomePage = lazy(() => import('../pages/HomePage'));
const AboutPage = lazy(() => import('../pages/AboutPage'));
const ServicesPage = lazy(() => import('../pages/ServicesPage'));
const ServiceDetailPage = lazy(() => import('../pages/ServiceDetailPage'));
const PortfolioPage = lazy(() => import('../pages/PortfolioPage'));
const CareersPage = lazy(() => import('../pages/CareersPage'));
const BlogPage = lazy(() => import('../pages/BlogPage'));
const ContactPage = lazy(() => import('../pages/ContactPage'));
const QuoteRequestPage = lazy(() => import('../pages/QuoteRequestPage'));
const SupportPage = lazy(() => import('../pages/SupportPage'));
const FAQPage = lazy(() => import('../pages/FAQPage'));
const AdminDashboardPage = lazy(() => import('../pages/AdminDashboardPage'));
const GetStartedPage = lazy(() => import('../pages/GetStartedPage'));
const SignInPage = lazy(() => import('../pages/SignInPage'));
const SignUpPage = lazy(() => import('../pages/SignUpPage'));
const ForgotPasswordPage = lazy(() => import('../pages/ForgotPasswordPage'));
const VerifyEmailPage = lazy(() => import('../pages/VerifyEmailPage'));
const DashboardPage = lazy(() => import('../pages/DashboardPage'));
const NotFoundPage = lazy(() => import('../pages/NotFoundPage'));

function LoadingScreen() {
  return (
    <div className="grid min-h-screen place-items-center bg-slate-950">
      <div className="space-y-5 text-center text-white">
        <Spinner />
        <p className="text-xs font-black uppercase tracking-[0.32em] text-cyan-300">Loading STONE TECH</p>
        <div className="mx-auto h-2 w-64 overflow-hidden rounded-full bg-white/10">
          <div className="h-full w-1/2 animate-shimmer rounded-full bg-gradient-to-r from-transparent via-cyan-300 to-transparent" />
        </div>
      </div>
    </div>
  );
}

function Load({ children }) {
  return <Suspense fallback={<LoadingScreen />}>{children}</Suspense>;
}

function PublicPage({ children }) {
  return (
    <MainLayout>
      <Load>{children}</Load>
    </MainLayout>
  );
}

export default function AppRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PublicPage><HomePage /></PublicPage>} />
        <Route path="/about" element={<PublicPage><AboutPage /></PublicPage>} />
        <Route path="/services" element={<PublicPage><ServicesPage /></PublicPage>} />
        <Route path="/services/:slug" element={<PublicPage><ServiceDetailPage /></PublicPage>} />
        <Route path="/portfolio" element={<PublicPage><PortfolioPage /></PublicPage>} />
        <Route path="/careers" element={<PublicPage><CareersPage /></PublicPage>} />
        <Route path="/insights" element={<PublicPage><BlogPage /></PublicPage>} />
        <Route path="/contact" element={<PublicPage><ContactPage /></PublicPage>} />
        <Route path="/quote" element={<PublicPage><QuoteRequestPage /></PublicPage>} />
        <Route path="/support" element={<PublicPage><SupportPage /></PublicPage>} />
        <Route path="/faq" element={<PublicPage><FAQPage /></PublicPage>} />
        <Route path="/admin" element={<PublicPage><AdminDashboardPage /></PublicPage>} />
        <Route path="/get-started" element={<PublicPage><GetStartedPage /></PublicPage>} />
        <Route path="/sign-in" element={<Load><SignInPage /></Load>} />
        <Route path="/sign-up" element={<Load><SignUpPage /></Load>} />
        <Route path="/forgot-password" element={<Load><ForgotPasswordPage /></Load>} />
        <Route path="/verify-email" element={<Load><VerifyEmailPage /></Load>} />
        <Route path="/dashboard" element={<ProtectedRoute><DashboardLayout /></ProtectedRoute>}>
          <Route index element={<Load><DashboardPage /></Load>} />
        </Route>
        <Route path="*" element={<Load><NotFoundPage /></Load>} />
      </Routes>
    </AnimatePresence>
  );
}
