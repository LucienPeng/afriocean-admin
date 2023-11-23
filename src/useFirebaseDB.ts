import {
  WhereFilterOp,
  addDoc,
  collection,
  doc,
  getDocs,
  getFirestore,
  query,
  setDoc,
  where,
} from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { EmailTemplate } from './Utils/useEmailNotification';

export enum Collections {
  Application = 'Application',
}

export type MutationFunction = (data: MutationData) => Promise<void>;
export type MutationEmail = (data: EmailTemplate) => Promise<void>;

export type MutationData = {
  collection: string;
  id: string;
  newData: unknown;
};

type Condition = {
  firstKey: string;
  firstOperator: WhereFilterOp;
  firstValue: unknown;
};

type AdditionalCondition = {
  secondKey: string;
  secondOperator: WhereFilterOp;
  secondValue: unknown;
};

export const useFirebaseDB = () => {
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
    conditcion: WhereFilterOp,
    value: unknown,
  ) => {
    const queryRef = collection(db, collectionPath);
    const q = query(queryRef, where(key, conditcion, value));
    const querySnapshot = await getDocs(q);
    const data = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    return data;
  };

  const getFirebaseMultiConditionQueryData = async (
    collectionPath: string,
    params: Condition,
    additionalParams: AdditionalCondition,
  ) => {
    const { firstKey, firstOperator, firstValue } = params;
    const { secondKey, secondOperator, secondValue } = additionalParams;
    const queryRef = collection(db, collectionPath);
    const q = query(
      queryRef,
      where(firstKey, firstOperator, firstValue),
      where(secondKey, secondOperator, secondValue),
    );
    const querySnapshot = await getDocs(q);
    const data = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    return data;
  };

  const setFirebaseData = async (collectionPath: string, newData: unknown) => {
    const docRef = await addDoc(collection(db, collectionPath), newData);
    return docRef;
  };

  const updateFirebaseData = async (collectionPath: string, documentId: string, data: unknown) => {
    const docRef = await setDoc(doc(db, collectionPath, documentId), data);
    return docRef;
  };

  return {
    db,
    storage,
    collection,
    getFirebaseCollectionData,
    getFirebaseConditionQueryData,
    setFirebaseData,
    getFirebaseMultiConditionQueryData,
    updateFirebaseData,
  };
};
