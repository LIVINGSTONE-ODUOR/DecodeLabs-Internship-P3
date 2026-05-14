import { Navigate, useLocation } from 'react-router-dom';
import Spinner from '../components/ui/Spinner';
import useAuth from '../hooks/useAuth';
export default function ProtectedRoute({ children, roles }) { const { isAuthenticated, isLoading, user }=useAuth(); const location=useLocation(); if(isLoading) return <div className="grid min-h-screen place-items-center"><Spinner/></div>; if(!isAuthenticated) return <Navigate to="/sign-in" replace state={{ from: location }}/>; if(roles?.length && !roles.includes(user?.role)) return <Navigate to="/" replace/>; return children; }
