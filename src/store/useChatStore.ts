import { create } from "zustand";

export interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: number;
}

export interface ChatSession {
  id: string;
  title: string;
  subject: string;
  updatedAt: number;
  messages: Message[];
}

interface ChatState {
  sessions: ChatSession[];
  activeSessionId: string | null;
  currentSubject: string;
  isTyping: boolean;
  
  // Actions
  setSubject: (subject: string) => void;
  createSession: (subject: string) => string;
  setActiveSession: (id: string) => void;
  deleteSession: (id: string) => void;
  renameSession: (id: string, title: string) => void;
  addMessage: (sessionId: string, message: Message) => void;
  setTyping: (isTyping: boolean) => void;
  updateMessageContent: (sessionId: string, messageId: string, chunk: string) => void;
}

export const useChatStore = create<ChatState>((set) => ({
  sessions: [],
  activeSessionId: null,
  currentSubject: "Mathematics",
  isTyping: false,

  setSubject: (subject) => set({ currentSubject: subject }),
  
  createSession: (subject) => {
    const newSession: ChatSession = {
      id: crypto.randomUUID(),
      title: "New Conversation",
      subject,
      updatedAt: Date.now(),
      messages: [],
    };
    set((state) => ({
      sessions: [newSession, ...state.sessions],
      activeSessionId: newSession.id,
      currentSubject: subject,
    }));
    return newSession.id;
  },

  setActiveSession: (id) => set({ activeSessionId: id }),
  
  deleteSession: (id) => set((state) => {
    const filtered = state.sessions.filter(s => s.id !== id);
    return {
      sessions: filtered,
      activeSessionId: state.activeSessionId === id ? (filtered[0]?.id || null) : state.activeSessionId
    };
  }),

  renameSession: (id, title) => set((state) => ({
    sessions: state.sessions.map(s => s.id === id ? { ...s, title } : s)
  })),

  addMessage: (sessionId, message) => set((state) => ({
    sessions: state.sessions.map(s => {
      if (s.id === sessionId) {
        // Auto-generate title if it's the first user message
        let newTitle = s.title;
        if (s.messages.length === 0 && message.role === "user") {
          newTitle = message.content.slice(0, 30) + (message.content.length > 30 ? "..." : "");
        }
        return {
          ...s,
          title: newTitle,
          updatedAt: Date.now(),
          messages: [...s.messages, message]
        };
      }
      return s;
    }),
    // Ensure the session is brought to top
  })),

  setTyping: (isTyping) => set({ isTyping }),

  updateMessageContent: (sessionId, messageId, chunk) => set((state) => ({
    sessions: state.sessions.map(s => {
      if (s.id === sessionId) {
        return {
          ...s,
          messages: s.messages.map(m => 
            m.id === messageId ? { ...m, content: m.content + chunk } : m
          )
        };
      }
      return s;
    })
  })),
}));
