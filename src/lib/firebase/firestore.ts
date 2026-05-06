import { db } from "./config";
import { 
  collection, 
  doc, 
  getDoc, 
  getDocs, 
  setDoc, 
  updateDoc, 
  query, 
  where, 
  DocumentData,
  QueryConstraint
} from "firebase/firestore";
import { User, Progress } from "@/types";

// Collection Names
export const USERS_COLLECTION = "users";
export const PROGRESS_COLLECTION = "progress";
export const QUIZZES_COLLECTION = "quizzes";
export const CHATS_COLLECTION = "chats";

// Generic CRUD
export async function getDocument<T>(collectionName: string, id: string): Promise<T | null> {
  const docRef = doc(db, collectionName, id);
  const docSnap = await getDoc(docRef);
  return docSnap.exists() ? (docSnap.data() as T) : null;
}

export async function setDocument<T extends DocumentData>(collectionName: string, id: string, data: T): Promise<void> {
  const docRef = doc(db, collectionName, id);
  await setDoc(docRef, data, { merge: true });
}

export async function updateDocument(collectionName: string, id: string, data: Partial<DocumentData>): Promise<void> {
  const docRef = doc(db, collectionName, id);
  await updateDoc(docRef, data);
}

export async function queryDocuments<T>(collectionName: string, constraints: QueryConstraint[]): Promise<T[]> {
  const q = query(collection(db, collectionName), ...constraints);
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => doc.data() as T);
}

// Specific Helpers
export async function createUserProfile(uid: string, data: Partial<User>) {
  const userData: User = {
    uid,
    email: data.email!,
    displayName: data.displayName || null,
    photoURL: data.photoURL || null,
    role: "student",
    createdAt: Date.now(),
    lastLogin: Date.now(),
    subscriptionPlan: "free",
    ...data,
  };
  await setDocument(USERS_COLLECTION, uid, userData);
  return userData;
}

export async function getUserProgress(userId: string) {
  return queryDocuments<Progress>(PROGRESS_COLLECTION, [where("userId", "==", userId)]);
}
