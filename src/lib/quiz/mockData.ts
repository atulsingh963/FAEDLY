export interface Question {
  id: string;
  text: string;
  type: "mcq" | "true_false" | "multi_select" | "short_answer" | "long_answer";
  options?: string[]; // For MCQ, True/False, Multi-select
  correctAnswers: string[]; // Can be multiple for multi-select, or keywords for subjective
  explanation: string;
  topic: string;
  difficulty: "easy" | "medium" | "hard";
  points: number;
}

export interface QuizDef {
  id: string;
  title: string;
  subject: string;
  description: string;
  durationMinutes: number; // 0 for untimed
  questions: Question[];
  tags: string[];
  totalPoints: number;
}

export const MOCK_QUIZZES: QuizDef[] = [
  {
    id: "quiz-calc-1",
    title: "Derivatives Fundamentals",
    subject: "Mathematics",
    description: "Test your understanding of basic derivatives and the power rule.",
    durationMinutes: 15,
    totalPoints: 30,
    tags: ["Calculus", "Derivatives"],
    questions: [
      {
        id: "q1",
        text: "What is the derivative of $f(x) = x^3$?",
        type: "mcq",
        options: ["$3x^2$", "$2x^3$", "$x^2$", "$3x$"],
        correctAnswers: ["$3x^2$"],
        explanation: "Using the power rule: d/dx(x^n) = n*x^(n-1). Here n=3, so the derivative is 3x^2.",
        topic: "Power Rule",
        difficulty: "easy",
        points: 10,
      },
      {
        id: "q2",
        text: "The derivative of a constant is always zero.",
        type: "true_false",
        options: ["True", "False"],
        correctAnswers: ["True"],
        explanation: "A constant function represents a horizontal line, which has a slope (rate of change) of zero everywhere.",
        topic: "Constants",
        difficulty: "easy",
        points: 5,
      },
      {
        id: "q3",
        text: "Select all rules that apply when finding the derivative of $f(x) = (2x+1)^2$.",
        type: "multi_select",
        options: ["Power Rule", "Quotient Rule", "Chain Rule", "Product Rule"],
        correctAnswers: ["Power Rule", "Chain Rule"],
        explanation: "You must use the chain rule to handle the inner function (2x+1) and the power rule for the outer squaring function.",
        topic: "Chain Rule",
        difficulty: "medium",
        points: 15,
      }
    ]
  },
  {
    id: "quiz-bio-1",
    title: "Cellular Biology Basics",
    subject: "Biology",
    description: "Core concepts of cell structure and function.",
    durationMinutes: 10,
    totalPoints: 20,
    tags: ["Cells", "Organelles"],
    questions: [
      {
        id: "q4",
        text: "Which organelle is known as the powerhouse of the cell?",
        type: "mcq",
        options: ["Nucleus", "Mitochondria", "Ribosome", "Golgi Apparatus"],
        correctAnswers: ["Mitochondria"],
        explanation: "Mitochondria generate most of the cell's supply of ATP, used as a source of chemical energy.",
        topic: "Organelles",
        difficulty: "easy",
        points: 10,
      },
      {
        id: "q5",
        text: "Briefly explain the primary function of ribosomes.",
        type: "short_answer",
        correctAnswers: ["protein synthesis", "making proteins", "translation"],
        explanation: "Ribosomes are macromolecular machines found within all living cells that perform biological protein synthesis.",
        topic: "Organelles",
        difficulty: "medium",
        points: 10,
      }
    ]
  }
];
