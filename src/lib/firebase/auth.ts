import { auth } from "./config";
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signInWithPopup, 
  GoogleAuthProvider, 
  signOut, 
  sendPasswordResetEmail,
  updateProfile
} from "firebase/auth";
import { createUserProfile, getDocument, USERS_COLLECTION } from "./firestore";
import { User } from "@/types";

export async function loginWithEmail(email: string, password: string) {
  return signInWithEmailAndPassword(auth, email, password);
}

export async function signupWithEmail(email: string, password: string, displayName: string) {
  const result = await createUserWithEmailAndPassword(auth, email, password);
  
  await updateProfile(result.user, { displayName });
  
  await createUserProfile(result.user.uid, {
    email: result.user.email!,
    displayName,
  });
  
  return result.user;
}

export async function loginWithGoogle() {
  const provider = new GoogleAuthProvider();
  const result = await signInWithPopup(auth, provider);
  
  // Check if user document exists, if not create one
  const existingUser = await getDocument<User>(USERS_COLLECTION, result.user.uid);
  if (!existingUser) {
    await createUserProfile(result.user.uid, {
      email: result.user.email!,
      displayName: result.user.displayName,
      photoURL: result.user.photoURL,
    });
  }
  
  return result.user;
}

export async function resetPassword(email: string) {
  return sendPasswordResetEmail(auth, email);
}

export async function logoutUser() {
  return signOut(auth);
}
