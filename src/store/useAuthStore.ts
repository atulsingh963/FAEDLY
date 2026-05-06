import { create } from "zustand";
import { User } from "@/types";
import { User as FirebaseUser } from "firebase/auth";

interface AuthState {
  user: User | null;
  firebaseUser: FirebaseUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  setUser: (user: User | null, firebaseUser: FirebaseUser | null) => void;
  setLoading: (isLoading: boolean) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  firebaseUser: null,
  isAuthenticated: false,
  isLoading: true,
  setUser: (user, firebaseUser) =>
    set({
      user,
      firebaseUser,
      isAuthenticated: !!user,
      isLoading: false,
    }),
  setLoading: (isLoading) => set({ isLoading }),
  logout: () =>
    set({
      user: null,
      firebaseUser: null,
      isAuthenticated: false,
      isLoading: false,
    }),
}));
