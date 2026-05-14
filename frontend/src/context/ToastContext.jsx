import { createContext } from 'react';
import toast from 'react-hot-toast';
export const ToastContext = createContext({ toast });
export function ToastProvider({ children }) { return <ToastContext.Provider value={{ toast }}>{children}</ToastContext.Provider>; }
