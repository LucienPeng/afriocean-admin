import { getAuth } from 'firebase/auth';
import { collection, getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

export const useFirebase = () => {
  const auth = getAuth();
  const db = getFirestore();
  const storage = getStorage();

  return { auth, db, storage, collection };
};
