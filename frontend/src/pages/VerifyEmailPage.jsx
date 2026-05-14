import { Link } from 'react-router-dom';
import AuthLayout from '../layouts/AuthLayout';
import Button from '../components/ui/Button';

export default function VerifyEmailPage() {
  return (
    <AuthLayout
      title="Verify your email"
      subtitle="We’ve sent a verification link to your inbox. Confirm your email address to unlock your STONE TECH client portal."
    >
      <div className="grid gap-6 rounded-3xl border border-white/10 bg-white/[0.04] p-8 text-center text-white shadow-glow">
        <p className="text-sm leading-6 text-slate-400">
          If your verification email is delayed, check your spam folder or request another link from the sign-in page.
        </p>
        <Button as={Link} to="/sign-in" size="lg" variant="outline" className="mx-auto w-full max-w-[260px]">
          Back to sign in
        </Button>
      </div>
    </AuthLayout>
  );
}
