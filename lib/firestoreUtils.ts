import {
  collection,
  addDoc,
  getDocs,
  getDoc,
  doc,
  updateDoc,
  deleteDoc,
  query,
  where,
  QueryConstraint,
  DocumentData,
  CollectionReference,
  Query,
} from 'firebase/firestore';
import { db } from './firebase';

// Create a document
export const createDocument = async (
  collectionName: string,
  data: DocumentData
) => {
  try {
    const docRef = await addDoc(collection(db, collectionName), data);
    return docRef.id;
  } catch (error) {
    console.error('Error creating document:', error);
    throw error;
  }
};

// Read a single document
export const getDocument = async (collectionName: string, docId: string) => {
  try {
    const docRef = doc(db, collectionName, docId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() };
    } else {
      console.log('No such document!');
      return null;
    }
  } catch (error) {
    console.error('Error getting document:', error);
    throw error;
  }
};

// Read all documents from a collection
export const getAllDocuments = async (collectionName: string) => {
  try {
    const querySnapshot = await getDocs(collection(db, collectionName));
    const documents: DocumentData[] = [];
    querySnapshot.forEach((doc) => {
      documents.push({ id: doc.id, ...doc.data() });
    });
    return documents;
  } catch (error) {
    console.error('Error getting documents:', error);
    throw error;
  }
};

// Query documents with conditions
export const queryDocuments = async (
  collectionName: string,
  conditions: QueryConstraint[]
) => {
  try {
    const q = query(collection(db, collectionName), ...conditions);
    const querySnapshot = await getDocs(q);
    const documents: DocumentData[] = [];
    querySnapshot.forEach((doc) => {
      documents.push({ id: doc.id, ...doc.data() });
    });
    return documents;
  } catch (error) {
    console.error('Error querying documents:', error);
    throw error;
  }
};

// Update a document
export const updateDocument = async (
  collectionName: string,
  docId: string,
  data: DocumentData
) => {
  try {
    const docRef = doc(db, collectionName, docId);
    await updateDoc(docRef, data);
    return docId;
  } catch (error) {
    console.error('Error updating document:', error);
    throw error;
  }
};

// Delete a document
export const deleteDocument = async (
  collectionName: string,
  docId: string
) => {
  try {
    const docRef = doc(db, collectionName, docId);
    await deleteDoc(docRef);
    return docId;
  } catch (error) {
    console.error('Error deleting document:', error);
    throw error;
  }
};
