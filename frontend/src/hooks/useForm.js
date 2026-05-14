import { useForm as useReactHookForm } from 'react-hook-form';
export default function useForm(options) { return useReactHookForm({ mode: 'onChange', ...options }); }
