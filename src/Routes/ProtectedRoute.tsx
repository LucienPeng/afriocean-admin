import { useUserRedux } from '../useUserRedux'; // 請替換為你的 useUserRedux hook
import { Navigate, RouteProps } from 'react-router-dom';
import { Roles } from '../model/company.model';

type ProtectedRouteProps = {
  component: React.ComponentType<RouteProps>;
  permission: Roles[];
};

const ProtectedRoute = ({ component: Component, permission }: ProtectedRouteProps) => {
  const Wrapper = (props: RouteProps) => {
    const { isLoggedIn, role } = useUserRedux();
    const permissionCheck = permission.includes(role as Roles) && isLoggedIn;
    return permissionCheck ? <Component {...props} /> : <Navigate to={isLoggedIn ? '/' : '/login'} />;
  };

  return <Wrapper />;
};

export default ProtectedRoute;
