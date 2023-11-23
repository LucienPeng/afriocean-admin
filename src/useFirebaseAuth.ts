import { getAuth } from 'firebase/auth';

export const useFirebaseAuth = () => {
  const auth = getAuth();

  return { auth };
};
