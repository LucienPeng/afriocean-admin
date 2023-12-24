import {
  WhereFilterOp,
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  query,
  setDoc,
  where,
} from 'firebase/firestore';
import { EmailTemplate } from '../useEmailNotification';

export enum Collections {
  Application = 'Application',
  Material = 'Material',
  IncrementalIndex = 'IncrementalIndex',
  LocalSalesCustomer = 'LocalSalesCustomer'
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

  const deletFirebaseDocument = async (collectionPath: string, documentId: string) => {
    await deleteDoc(doc(db, collectionPath, documentId));
  };

  const getFirebaseCollectionData = async (collectionPath: string) => {
    const querySnapshot = await getDocs(collection(db, collectionPath));
    const data = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    return data;
  };

  const getFirebaseDocumentData = async (collectionPath: string, documentId: string) => {
    const docRef = doc(db, collectionPath, documentId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      return null;
    }
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

  const createFirebaseData = async (collectionPath: string, newData: unknown) => {
    const docRef = await addDoc(collection(db, collectionPath), newData);
    return docRef;
  };

  const setFirebaseData = async (collectionPath: string, documentId: string, data: unknown) => {
    const docRef = await setDoc(doc(db, collectionPath, documentId), data);
    return docRef;
  };

  const updateFirebaseData = async (collectionPath: string, documentId: string, data: unknown) => {
    const docRef = await setDoc(doc(db, collectionPath, documentId), data);
    return docRef;
  };

  return {
    db,
    collection,
    getFirebaseCollectionData,
    getFirebaseDocumentData,
    getFirebaseConditionQueryData,
    createFirebaseData,
    setFirebaseData,
    getFirebaseMultiConditionQueryData,
    updateFirebaseData,
    deletFirebaseDocument,
  };
};
