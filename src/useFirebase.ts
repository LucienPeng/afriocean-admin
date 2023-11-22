import { getAuth } from 'firebase/auth';
import { WhereFilterOp, addDoc, collection, doc, getDocs, getFirestore, query, setDoc, where } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

export enum Collections {
  Application = 'Application'
}

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

  const getFirebaseMultiConditionQueryData = async (
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

  const getFirebaseMultiConditionQueryData2 = async (
    collectionPath: string,
    key1: string,
    condition1: WhereFilterOp,
    value1: unknown,
    key2: string,
    condition2: WhereFilterOp,
    value2: unknown,
  ) => {
    const queryRef = collection(db, collectionPath);
    const q = query(queryRef, where(key1, condition1, value1), where(key2, condition2, value2));
    const querySnapshot = await getDocs(q);
    const data = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    return data;
  };

  const setFirebaseData = async (collectionPath: string, newData: unknown) => {
    const docRef = await addDoc(collection(db, collectionPath), newData);
    return docRef.id;
  };

  const updateFirebaseData = async (collectionPath: string, documentId: string, data: unknown) => {
    const docRef = await setDoc(doc(db, collectionPath, documentId), data);
    return docRef
  }

  return { auth, db, storage, collection, getFirebaseCollectionData, getFirebaseConditionQueryData, setFirebaseData, getFirebaseMultiConditionQueryData2, updateFirebaseData };
};
