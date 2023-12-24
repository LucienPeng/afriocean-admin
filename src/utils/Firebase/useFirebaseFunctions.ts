import { getFunctions, httpsCallable } from 'firebase/functions';

export const useFirebaseFUnctions = () => {
  const functions = getFunctions();

  const getGreeting = httpsCallable(functions, 'getGreeting');

  const getData = httpsCallable(functions, 'getData');

  return {
    getGreeting,
    getData
  };
};
