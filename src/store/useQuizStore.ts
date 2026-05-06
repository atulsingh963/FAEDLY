import { create } from "zustand";
import { QuizDef } from "@/lib/quiz/mockData";
import { evaluateAnswer, EvaluationResult } from "@/lib/quiz/gradingEngine";

interface QuizState {
  activeQuiz: QuizDef | null;
  currentQuestionIndex: number;
  answers: Record<string, string | string[]>;
  results: Record<string, EvaluationResult>;
  isCompleted: boolean;
  timeRemaining: number; // in seconds
  timerActive: boolean;

  // Actions
  startQuiz: (quiz: QuizDef) => void;
  setAnswer: (questionId: string, answer: string | string[]) => void;
  nextQuestion: () => void;
  prevQuestion: () => void;
  jumpToQuestion: (index: number) => void;
  tickTimer: () => void;
  submitQuiz: () => void;
  resetQuiz: () => void;
}

export const useQuizStore = create<QuizState>((set, get) => ({
  activeQuiz: null,
  currentQuestionIndex: 0,
  answers: {},
  results: {},
  isCompleted: false,
  timeRemaining: 0,
  timerActive: false,

  startQuiz: (quiz) => {
    set({
      activeQuiz: quiz,
      currentQuestionIndex: 0,
      answers: {},
      results: {},
      isCompleted: false,
      timeRemaining: quiz.durationMinutes * 60,
      timerActive: quiz.durationMinutes > 0,
    });
  },

  setAnswer: (questionId, answer) => {
    set((state) => ({
      answers: { ...state.answers, [questionId]: answer }
    }));
  },

  nextQuestion: () => {
    const { currentQuestionIndex, activeQuiz } = get();
    if (activeQuiz && currentQuestionIndex < activeQuiz.questions.length - 1) {
      set({ currentQuestionIndex: currentQuestionIndex + 1 });
    }
  },

  prevQuestion: () => {
    const { currentQuestionIndex } = get();
    if (currentQuestionIndex > 0) {
      set({ currentQuestionIndex: currentQuestionIndex - 1 });
    }
  },

  jumpToQuestion: (index) => {
    const { activeQuiz } = get();
    if (activeQuiz && index >= 0 && index < activeQuiz.questions.length) {
      set({ currentQuestionIndex: index });
    }
  },

  tickTimer: () => {
    const { timeRemaining, timerActive, submitQuiz } = get();
    if (timerActive && timeRemaining > 0) {
      set({ timeRemaining: timeRemaining - 1 });
    } else if (timerActive && timeRemaining === 0) {
      submitQuiz();
    }
  },

  submitQuiz: () => {
    const { activeQuiz, answers } = get();
    if (!activeQuiz) return;

    // Evaluate all questions
    const newResults: Record<string, EvaluationResult> = {};
    activeQuiz.questions.forEach(q => {
      newResults[q.id] = evaluateAnswer(q, answers[q.id]);
    });

    set({
      results: newResults,
      isCompleted: true,
      timerActive: false,
    });
  },

  resetQuiz: () => {
    set({
      activeQuiz: null,
      currentQuestionIndex: 0,
      answers: {},
      results: {},
      isCompleted: false,
      timeRemaining: 0,
      timerActive: false,
    });
  }
}));
