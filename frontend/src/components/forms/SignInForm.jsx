import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { FaArrowRight, FaEnvelope, FaGithub, FaGoogle, FaLock, FaShieldAlt } from 'react-icons/fa';
import Button from '../ui/Button';
import Input from '../ui/Input';
import useAuth from '../../hooks/useAuth';

export default function SignInForm() {
  const { login } = useAuth();
  const nav = useNavigate();
  const loc = useLocation();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid }
  } = useForm({ mode: 'onChange' });

  const onSubmit = async (data) => {
    await login(data);
    nav(loc.state?.from?.pathname || '/dashboard');
  };

  const ssoNotice = () => toast('Enable this provider in Supabase Auth settings to activate SSO.');

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid gap-5">
      <div className="rounded-lg border border-emerald-200/20 bg-emerald-200/10 p-4">
        <div className="flex items-center gap-3">
          <span className="grid h-9 w-9 place-items-center rounded-lg bg-emerald-200 text-slate-950">
            <FaShieldAlt />
          </span>
          <div>
            <p className="text-sm font-black text-white">Secured by Supabase Auth</p>
            <p className="text-xs leading-5 text-slate-400">Sessions are verified by Supabase before dashboard access.</p>
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
      <Input label="Password" type="password" icon={FaLock} error={errors.password} autoComplete="current-password" {...register('password', { required: 'Password is required' })} />

      <div className="flex flex-col gap-3 text-sm text-slate-400 sm:flex-row sm:items-center sm:justify-between">
        <label className="flex items-center gap-2">
          <input type="checkbox" className="rounded accent-cyan-200" /> Keep me signed in
        </label>
        <Link to="/forgot-password" className="font-bold text-cyan-200">
          Forgot password?
        </Link>
      </div>

      <Button loading={isSubmitting} disabled={!isValid} className="w-full" icon={FaArrowRight}>
        Sign in securely
      </Button>

      <div className="flex items-center gap-3 text-xs uppercase tracking-[0.18em] text-slate-500">
        <span className="h-px flex-1 bg-white/10" />
        SSO ready
        <span className="h-px flex-1 bg-white/10" />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <Button type="button" variant="outline" icon={FaGoogle} onClick={ssoNotice}>
          Google
        </Button>
        <Button type="button" variant="outline" icon={FaGithub} onClick={ssoNotice}>
          GitHub
        </Button>
      </div>

      <p className="text-center text-sm text-slate-400">
        New to STONE TECH?{' '}
        <Link className="font-black text-cyan-200" to="/sign-up">
          Create an account
        </Link>
      </p>
    </form>
  );
}
