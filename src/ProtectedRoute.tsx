import { useUserRedux } from './useUserRedux'; // 請替換為你的 useUserRedux hook
import { Navigate, RouteProps } from 'react-router-dom';

type ProtectedRouteProps = {
  component: React.ComponentType<RouteProps>;
};

const ProtectedRoute = ({ component: Component }: ProtectedRouteProps) => {
  const Wrapper = (props: RouteProps) => {
    const { isLoggedIn } = useUserRedux();
    return isLoggedIn ? <Component {...props} /> : <Navigate to="/login" />;
  };

  return <Wrapper />;
};

export default ProtectedRoute;
