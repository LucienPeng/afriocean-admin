import { useUserRedux } from '../useUserRedux'; // 請替換為你的 useUserRedux hook
import { Navigate, RouteProps } from 'react-router-dom';
import { Roles } from '../model/company.model';
import { useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { authActions } from '../Store/Auth/auth-slice';

type ProtectedRouteProps = {
  component: React.ComponentType<RouteProps>;
  permission: Roles[];
};

const ProtectedRoute = ({ component: Component, permission }: ProtectedRouteProps) => {
  const { role, isLoggedIn, dispatch } = useUserRedux();

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(
          authActions.stillLoggedIn({
            isLoggedIn: true,
          }),
        );
      } else {
        dispatch(
          authActions.stillLoggedIn({
            isLoggedIn: false,
          }),
        );
      }
    });
  });

  const Wrapper = (props: RouteProps) => {
    const permissionCheck = permission.includes(role as Roles) && isLoggedIn;
    return permissionCheck ? <Component {...props} /> : <Navigate to={isLoggedIn ? '/' : '/login'} />;
  };

  return <Wrapper />;
};

export default ProtectedRoute;
