import { getAuth } from 'firebase/auth';
import { WhereFilterOp, addDoc, collection, getDocs, getFirestore, query, where } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

export const useFirebase = () => {
  const auth = getAuth();
  const db = getFirestore();
  const storage = getStorage();

  const getFirebaseCollectionData = async (collectionPath: string) => {
    const querySnapshot = await getDocs(collection(db, collectionPath));
    const data = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    return data;
  };

  const getFirebaseConditionQueryData = async (
    collectionPath: string,
    key: string,
    condition: WhereFilterOp,
    value: unknown,
  ) => {
    const queryRef = collection(db, collectionPath);
    const q = query(queryRef, where(key, condition, value));
    const querySnapshot = await getDocs(q);
    const data = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    return data;
  };

  const setFirebaseData = async (collectionPath: string, newData: unknown) => {
    const docRef = await addDoc(collection(db, collectionPath), newData);
    return docRef.id;
  };

  return { auth, db, storage, collection, getFirebaseCollectionData, getFirebaseConditionQueryData, setFirebaseData };
};
