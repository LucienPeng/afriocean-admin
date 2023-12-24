import { getFunctions, httpsCallable } from 'firebase/functions';

export const useFirebaseFUnctions = () => {
  const functions = getFunctions();

  const getCustomerIncrementalId = httpsCallable(functions, 'getCustomerIncrementalId');

  return { getCustomerIncrementalId };
};
