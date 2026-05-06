import { faker } from '@faker-js/faker';

export const SUBJECTS = ["Biology", "Physics", "Chemistry", "Mathematics", "Computer Science"];

export const TOPICS = {
  "Biology": ["Cell Structure", "Genetics", "Evolution", "Human Anatomy"],
  "Physics": ["Mechanics", "Thermodynamics", "Electromagnetism", "Quantum Physics"],
  "Chemistry": ["Organic Chemistry", "Atomic Structure", "Chemical Bonds", "Acids and Bases"],
  "Mathematics": ["Calculus", "Algebra", "Probability", "Geometry"],
  "Computer Science": ["Data Structures", "Algorithms", "Operating Systems", "Networking"],
};

export const generateTimestamp = (daysAgoStart: number, daysAgoEnd: number) => {
  return faker.date.recent({ days: daysAgoStart }).getTime();
};

export const randomSubject = () => faker.helpers.arrayElement(SUBJECTS);

export const randomTopic = (subject: string) => faker.helpers.arrayElement(TOPICS[subject as keyof typeof TOPICS]);

export const calculateMastery = (score: number, total: number) => {
  const percentage = (score / total) * 100;
  if (percentage >= 90) return "Expert";
  if (percentage >= 70) return "Proficient";
  if (percentage >= 50) return "Intermediate";
  return "Novice";
};

export const calculateXP = (score: number, difficulty: string) => {
  const base = score * 10;
  const multiplier = difficulty === "hard" ? 1.5 : difficulty === "medium" ? 1.2 : 1.0;
  return Math.round(base * multiplier);
};
