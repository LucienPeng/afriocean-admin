import { Navigate } from 'react-router-dom';
// import { useAuth } from '../hooks/useAuth';
import { ReactNode } from 'react';

export const ProtectedRoute = ({ children, isLoggedIn }: { children: ReactNode; isLoggedIn: boolean }) => {
  //const { user } = useAuth();
  if (!isLoggedIn) {
    // user is not authenticated
    return <Navigate to="/" />;
  }
  return children;
};
