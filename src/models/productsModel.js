import { db } from "./firebase.js";

import {
  collection,
  getDocs,
  doc,
  getDoc,
  addDoc,
  setDoc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";

const productsCollection = collection(db, "products");

export const getAllProducts = async () => {
  //return [{id:1, name:"product 1"}];
   try {
    const snapshot = await getDocs(productsCollection);
    const products = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return products;
  } catch (error) {
    console.error(error);
  }
    
};

export const getProductById = async (id) => {
  try {
    const docRef = doc(productsCollection, id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() };
    } else {
      return null;
    }
  } catch (error) {
    console.error(error);
  }
};

export const createProduct = async (newProduct) => {
  try {
    const docRef = await addDoc(productsCollection, newProduct);
    return { id: docRef.id, ...newProduct };
  } catch (error) {
    console.error(error);
  }
};

/*
export const updateProduct = async (id, updatedProductData) => {
  try {
    const docRef = doc(productsCollection, id);
    await setDoc(docRef, updatedProductData, { merge: true });
    return { id, ...updatedProductData };
  } catch (error) {
    console.error(error);
    return null;
  }
};
*/

export const deleteProduct = async (id) => {
  try {
    const docRef = doc(productsCollection, id);
    if (!(await getDoc(docRef)).exists()) return false;
    await deleteDoc(docRef);
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const updateProduct = async (id, data) => {
  try {
    const docRef = doc(productsCollection, id);
    await updateDoc(docRef, data);
    return true;
  } catch (error) {
    if (error.code === 'not-found') {
      console.warn(`No se encontró el documento con ID: ${id}`);
    } else {
      console.error("Error al actualizar:", error);
    }
    return false;
  }
};