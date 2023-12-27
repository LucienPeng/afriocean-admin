import { getFunctions, httpsCallable } from 'firebase/functions';

export const useFirebaseFunctions = () => {
  const functions = getFunctions();
  const getCustomerIncrementalId = httpsCallable(functions, 'getCustomerIncrementalId');
  const createNewCustomer = httpsCallable(functions, 'createNewCustomer');
  const createNewOrder = httpsCallable(functions, 'createNewOrder');
  const getCustomerOrder = httpsCallable(functions, 'getCustomerOrder');

  return { getCustomerOrder, createNewCustomer, createNewOrder, getCustomerIncrementalId };
};
