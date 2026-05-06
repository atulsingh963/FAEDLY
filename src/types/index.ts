export interface User {
  uid: string;
  email: string;
  displayName: string | null;
  photoURL: string | null;
  role: "student" | "admin";
  createdAt: number;
  lastLogin: number;
  subscriptionPlan: "free" | "pro" | "ultimate";
}

export interface Chat {
  id: string;
  userId: string;
  subject: string;
  title: string;
  createdAt: number;
  updatedAt: number;
}

export interface ChatMessage {
  id: string;
  chatId: string;
  role: "user" | "assistant";
  content: string;
  createdAt: number;
}

export interface Quiz {
  id: string;
  userId: string;
  subject: string;
  topic: string;
  score: number;
  totalQuestions: number;
  createdAt: number;
}

export interface Progress {
  id: string;
  userId: string;
  subject: string;
  masteryLevel: number; // 0-100
  studyHours: number;
  quizzesTaken: number;
  lastStudiedAt: number;
}

export interface Note {
  id: string;
  userId: string;
  subject: string;
  title: string;
  content: string;
  createdAt: number;
  updatedAt: number;
}

export interface Subscription {
  id: string;
  userId: string;
  plan: "free" | "pro" | "ultimate";
  status: "active" | "canceled" | "past_due";
  currentPeriodEnd: number;
}
