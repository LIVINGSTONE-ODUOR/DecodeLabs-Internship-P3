import { forwardRef, useState } from 'react';
import { HiEye, HiEyeOff } from 'react-icons/hi';
const Input = forwardRef(({ label, icon: Icon, error, type = 'text', className = '', ...props }, ref) => {
  const [visible, setVisible] = useState(false);
  const inputType = type === 'password' && visible ? 'text' : type;
  return <label className="block"><span className="mb-2 block text-sm font-semibold text-slate-200">{label}</span><span className={`flex min-h-12 items-center gap-3 rounded-lg border bg-slate-950/70 px-4 transition ${error ? 'border-error animate-[shake_.24s_ease]' : 'border-white/10 focus-within:border-cyan-300'}`}>{Icon && <Icon className="text-slate-500" />}<input ref={ref} type={inputType} className={`w-full bg-transparent py-3 text-sm text-white outline-none placeholder:text-slate-500 ${className}`} {...props} />{type === 'password' && <button type="button" className="text-slate-400 hover:text-cyan-200" onClick={() => setVisible((v) => !v)} aria-label={visible ? 'Hide password' : 'Show password'}>{visible ? <HiEyeOff /> : <HiEye />}</button>}</span>{error && <span className="mt-2 block text-sm text-error">{error.message || error}</span>}</label>;
});
Input.displayName = 'Input';
export default Input;
