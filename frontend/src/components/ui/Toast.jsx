import toast from 'react-hot-toast';
export const showToast = { success: (m) => toast.success(m), error: (m) => toast.error(m), info: (m) => toast(m), warning: (m) => toast(m, { icon: '!' }) };
export default function Toast() { return null; }
