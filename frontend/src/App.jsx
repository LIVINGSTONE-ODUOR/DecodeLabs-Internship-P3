import { BrowserRouter } from 'react-router-dom';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { Toaster } from 'react-hot-toast';
import AppRoutes from './routes/AppRoutes';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import { ToastProvider } from './context/ToastContext';
import { AIProvider } from './context/AIContext';
import { useMotionStack } from './animations/useMotionStack';

function AppShell() {
  useMotionStack();

  return (
    <ThemeProvider>
      <ToastProvider>
        <AuthProvider>
          <AIProvider>
            <BrowserRouter>
              <AppRoutes />
            </BrowserRouter>
            <Toaster
              position="top-right"
              toastOptions={{
                duration: 4200,
                style: {
                  border: '1px solid rgba(255,255,255,.12)',
                  borderRadius: '16px',
                  background: '#020617',
                  color: '#fff',
                  fontWeight: 700
                }
              }}
            />
          </AIProvider>
        </AuthProvider>
      </ToastProvider>
    </ThemeProvider>
  );
}

export default function App() {
  return (
    <HelmetProvider>
      <Helmet>
        <title>STONE TECH SOLUTIONS | Enterprise Software, IT and AI Solutions</title>
        <meta
          name="description"
          content="STONE TECH SOLUTIONS builds premium websites, software systems, mobile apps, IT support operations, cloud solutions, cybersecurity programs, and AI automation."
        />
        <meta name="theme-color" content="#020617" />
        <meta property="og:title" content="STONE TECH SOLUTIONS" />
        <meta property="og:image" content="/og-image.png" />
      </Helmet>
      <AppShell />
    </HelmetProvider>
  );
}
