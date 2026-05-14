import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { FaArrowRight, FaCheck, FaEnvelope, FaLock, FaUser } from 'react-icons/fa';
import Button from '../ui/Button';
import Input from '../ui/Input';
import useAuth from '../../hooks/useAuth';
import { passwordRules, passwordStrength } from '../../utils/validators';

const passwordChecklist = [
  ['8+ characters', (value) => value.length >= 8],
  ['Uppercase letter', (value) => /[A-Z]/.test(value)],
  ['Lowercase letter', (value) => /[a-z]/.test(value)],
  ['Number', (value) => /\d/.test(value)],
  ['Special character', (value) => /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(value)]
];

export default function SignUpForm() {
  const { register: registerUser } = useAuth();
  const nav = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting, isValid }
  } = useForm({ mode: 'onChange' });

  const password = watch('password', '');
  const strength = passwordStrength(password);

  const onSubmit = async (data) => {
    const result = await registerUser(data);
    nav(result.requiresEmailConfirmation ? '/verify-email' : '/dashboard');
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid gap-5">
      <div className="grid gap-4 sm:grid-cols-2">
        <Input label="Full name" icon={FaUser} error={errors.fullName} autoComplete="name" {...register('fullName', { required: 'Full name is required', minLength: { value: 2, message: 'Name is too short' } })} />
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
      </div>

      <Input
        label="Password"
        type="password"
        icon={FaLock}
        error={errors.password}
        autoComplete="new-password"
        {...register('password', {
          required: 'Password is required',
          validate: (value) => passwordRules.every((rule) => rule.test(value)) || 'Use uppercase, lowercase, number, special character, and 8+ characters'
        })}
      />

      <div className="rounded-lg border border-white/10 bg-white/[0.035] p-4">
        <div className="h-2 overflow-hidden rounded-full bg-white/10">
          <span className="block h-full rounded-full bg-gradient-to-r from-rose-300 via-amber-200 to-emerald-200 transition-all" style={{ width: `${strength * 20}%` }} />
        </div>
        <div className="mt-4 grid gap-2 sm:grid-cols-2">
          {passwordChecklist.map(([label, test]) => {
            const passed = test(password);
            return (
              <span key={label} className={`flex items-center gap-2 text-xs font-bold ${passed ? 'text-emerald-200' : 'text-slate-500'}`}>
                <FaCheck /> {label}
              </span>
            );
          })}
        </div>
      </div>

      <Input
        label="Confirm password"
        type="password"
        icon={FaLock}
        error={errors.confirmPassword}
        autoComplete="new-password"
        {...register('confirmPassword', {
          required: 'Confirm your password',
          validate: (value) => value === password || 'Passwords do not match'
        })}
      />

      <label className="flex items-start gap-3 text-sm text-slate-400">
        <input type="checkbox" className="mt-1 accent-cyan-200" {...register('terms', { required: 'You must accept the terms' })} />
        <span>I agree to secure account handling, support communication, and the STONE TECH privacy terms.</span>
      </label>
      {errors.terms && <span className="text-sm text-error">{errors.terms.message}</span>}

      <Button loading={isSubmitting} disabled={!isValid} className="w-full" icon={FaArrowRight}>
        Create secure account
      </Button>

      <p className="text-center text-sm text-slate-400">
        Already have an account?{' '}
        <Link className="font-black text-cyan-200" to="/sign-in">
          Sign in
        </Link>
      </p>
    </form>
  );
}
