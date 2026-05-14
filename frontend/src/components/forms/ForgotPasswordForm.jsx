import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaArrowRight, FaEnvelope, FaShieldAlt } from 'react-icons/fa';
import Button from '../ui/Button';
import Input from '../ui/Input';
import useAuth from '../../hooks/useAuth';

export default function ForgotPasswordForm() {
  const { forgotPassword } = useAuth();
  const [sent, setSent] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid }
  } = useForm({ mode: 'onChange' });

  const onSubmit = async (data) => {
    await forgotPassword(data);
    setSent(true);
  };

  return (
    <div className="grid gap-6">
      {sent ? (
        <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-8 text-center text-white shadow-glow">
          <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-cyan-200/10 text-cyan-200">
            <FaShieldAlt size={28} />
          </div>
          <h2 className="mt-6 text-2xl font-black">Check your inbox</h2>
          <p className="mt-4 text-sm leading-6 text-slate-400">
            We sent a secure reset link to your email address. Follow the instructions and return to sign in once your password is updated.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-5">
          <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-5 shadow-glow">
            <div className="flex items-center gap-3">
              <span className="grid h-11 w-11 place-items-center rounded-2xl bg-cyan-200/10 text-cyan-200">
                <FaShieldAlt />
              </span>
              <div>
                <p className="text-sm font-black text-white">Secure recovery</p>
                <p className="text-sm text-slate-400">A temporary security email will be sent to your registered workspace address.</p>
              </div>
            </div>
          </div>

          <Input
            label="Work email"
            type="email"
            icon={FaEnvelope}
            error={errors.email}
            autoComplete="email"
            {...register('email', {
              required: 'Email is required',
              pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Enter a valid email' }
            })}
          />

          <Button loading={isSubmitting} disabled={!isValid} className="w-full" icon={FaArrowRight}>
            Send reset instructions
          </Button>

          <p className="text-center text-sm text-slate-400">If you can’t access your inbox, contact our support team through the portal.</p>
        </form>
      )}
    </div>
  );
}
