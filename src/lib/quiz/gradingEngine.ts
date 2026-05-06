import { Question } from "./mockData";

export interface EvaluationResult {
  isCorrect: boolean;
  score: number;
  feedback: string;
}

export function evaluateAnswer(question: Question, userAnswer: string | string[]): EvaluationResult {
  // If no answer provided
  if (!userAnswer || (Array.isArray(userAnswer) && userAnswer.length === 0)) {
    return {
      isCorrect: false,
      score: 0,
      feedback: "No answer provided.",
    };
  }

  // Handle objective types
  if (question.type === "mcq" || question.type === "true_false") {
    const isCorrect = question.correctAnswers[0] === userAnswer;
    return {
      isCorrect,
      score: isCorrect ? question.points : 0,
      feedback: isCorrect ? "Correct!" : "Incorrect.",
    };
  }

  if (question.type === "multi_select" && Array.isArray(userAnswer)) {
    const correctCount = question.correctAnswers.filter(ans => userAnswer.includes(ans)).length;
    const incorrectCount = userAnswer.filter(ans => !question.correctAnswers.includes(ans)).length;
    
    // Exact match logic for simplicity
    const isCorrect = correctCount === question.correctAnswers.length && incorrectCount === 0;
    
    // Partial scoring can be added here
    let score = 0;
    if (isCorrect) score = question.points;
    else if (correctCount > 0) score = Math.max(0, (question.points * (correctCount / question.correctAnswers.length)) - (incorrectCount * 2));
    
    return {
      isCorrect,
      score: Math.round(score),
      feedback: isCorrect ? "Perfectly selected!" : `You got ${correctCount} right, but made ${incorrectCount} incorrect selections.`,
    };
  }

  // Handle subjective types using mock keyword matching
  if ((question.type === "short_answer" || question.type === "long_answer") && typeof userAnswer === "string") {
    const lowerAnswer = userAnswer.toLowerCase();
    const matchedKeywords = question.correctAnswers.filter(keyword => lowerAnswer.includes(keyword.toLowerCase()));
    
    const scoreRatio = matchedKeywords.length / Math.min(question.correctAnswers.length, 2); // Cap required keywords for mock
    
    const score = Math.round(question.points * Math.min(scoreRatio, 1));
    
    return {
      isCorrect: score === question.points,
      score,
      feedback: score > 0 
        ? `Good job! The AI detected key concepts like: ${matchedKeywords.join(", ")}.` 
        : "Your answer missed the core concepts.",
    };
  }

  return { isCorrect: false, score: 0, feedback: "Unable to evaluate." };
}
