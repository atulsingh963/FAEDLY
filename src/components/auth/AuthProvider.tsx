"use client";

import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "@/lib/firebase/config";
import { doc, getDoc } from "firebase/firestore";
import { useAuthStore } from "@/store/useAuthStore";
import { User } from "@/types";
import Cookies from "js-cookie";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { setUser, setLoading } = useAuthStore();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      try {
        if (firebaseUser) {
          // Set a cookie for the middleware
          Cookies.set("auth-token", firebaseUser.uid, { expires: 7 });

          // Fetch user data from Firestore
          const userDocRef = doc(db, "users", firebaseUser.uid);
          const userDocSnap = await getDoc(userDocRef);

          if (userDocSnap.exists()) {
            setUser(userDocSnap.data() as User, firebaseUser);
          } else {
            // Edge case: Firebase user exists but Firestore doc doesn't
            // This shouldn't happen with our auth flow, but just in case
            setUser(null, null);
            Cookies.remove("auth-token");
          }
        } else {
          setUser(null, null);
          Cookies.remove("auth-token");
        }
      } catch (error) {
        console.error("Auth state change error:", error);
        setUser(null, null);
        Cookies.remove("auth-token");
      } finally {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, [setUser, setLoading]);

  return <>{children}</>;
}
