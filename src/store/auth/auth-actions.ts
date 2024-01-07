import { AuthError, getAuth, signOut } from 'firebase/auth';
import { useUserRedux } from '../../useUserRedux';
import { authActions } from './auth-slice';

export const useAuthActions = () => {
  const { dispatch } = useUserRedux();
  const auth = getAuth();

  const signOutHandler = () => {
    signOut(auth)
      .then(() => {
        dispatch(authActions.logOut());
        return auth;
      })
      .catch((error: AuthError) => {
        dispatch(authActions.loginFaild());
        console.log(error);
      });
  };

  return { signOutHandler };
};
