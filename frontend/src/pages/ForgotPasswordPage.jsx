import AuthLayout from '../layouts/AuthLayout';
import ForgotPasswordForm from '../components/forms/ForgotPasswordForm';

export default function ForgotPasswordPage() {
  return (
    <AuthLayout
      title="Reset your password"
      subtitle="Enter your work email and we’ll send a secure recovery link for your STONE TECH account."
    >
      <ForgotPasswordForm />
    </AuthLayout>
  );
}
