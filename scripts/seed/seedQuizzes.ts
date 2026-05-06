import { faker } from '@faker-js/faker';
import { db } from './helpers/firebaseAdmin';
import { SUBJECTS, TOPICS, randomSubject, randomTopic } from './helpers/utils';

export const seedQuizzes = async (count: number = 100) => {
  console.log(`Seeding ${count} quizzes...`);
  const batch = db.batch();
  const quizzes: any[] = [];

  for (let i = 0; i < count; i++) {
    const subject = randomSubject();
    const topic = randomTopic(subject);
    const difficulty = faker.helpers.arrayElement(["easy", "medium", "hard"]);
    const quizId = faker.string.uuid();
    
    const numQuestions = faker.number.int({ min: 5, max: 15 });
    const questions = Array.from({ length: numQuestions }).map((_, idx) => ({
      id: `q${idx + 1}`,
      text: faker.lorem.sentence({ min: 5, max: 15 }) + "?",
      type: faker.helpers.arrayElement(["mcq", "true_false", "multi_select", "short_answer"]),
      options: ["mcq", "multi_select"].includes("mcq") ? [
        faker.lorem.words(2), faker.lorem.words(3), faker.lorem.words(1), faker.lorem.words(2)
      ] : undefined,
      correctAnswers: [faker.lorem.words(1)],
      explanation: faker.lorem.paragraph(),
      topic: topic,
      difficulty: difficulty,
      points: faker.number.int({ min: 5, max: 20 }),
    }));

    const totalPoints = questions.reduce((sum, q) => sum + q.points, 0);

    const quiz = {
      id: quizId,
      title: `${topic} ${faker.helpers.arrayElement(["Fundamentals", "Mastery", "Practice Test", "Review"])}`,
      subject,
      description: faker.lorem.sentences(2),
      durationMinutes: faker.number.int({ min: 10, max: 60 }),
      questions,
      tags: [subject, topic, difficulty],
      totalPoints,
      createdAt: faker.date.past({ years: 1 }).getTime(),
    };

    quizzes.push(quiz);
    const quizRef = db.collection('quizzes').doc(quizId);
    batch.set(quizRef, quiz);
  }

  await batch.commit();
  console.log('Quizzes seeded successfully!');
  return quizzes;
};
