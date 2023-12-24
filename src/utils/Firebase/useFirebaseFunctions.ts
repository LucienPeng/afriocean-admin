import { getFunctions, httpsCallable } from 'firebase/functions';

export const useFirebaseFunctions = () => {
  const functions = getFunctions();
  const getCustomerIncrementalId = httpsCallable(functions, 'getCustomerIncrementalId');

  return { getCustomerIncrementalId };
};
