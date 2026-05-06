import { faker } from '@faker-js/faker';
import { db } from './helpers/firebaseAdmin';

export const seedQuizAttempts = async (users: any[], quizzes: any[], count: number = 500) => {
  console.log(`Seeding ${count} quiz attempts...`);
  
  // We chunk because Firestore batches only support 500 operations
  const chunks = [];
  for (let i = 0; i < count; i += 400) {
    chunks.push(Array.from({ length: Math.min(400, count - i) }));
  }

  for (const chunk of chunks) {
    const batch = db.batch();
    
    for (const _ of chunk) {
      const user = faker.helpers.arrayElement(users);
      const quiz = faker.helpers.arrayElement(quizzes);
      const attemptId = faker.string.uuid();
      
      const earnedPoints = faker.number.int({ min: Math.floor(quiz.totalPoints * 0.3), max: quiz.totalPoints });
      const accuracy = Math.round((earnedPoints / quiz.totalPoints) * 100);
      
      const attempt = {
        id: attemptId,
        userId: user.uid,
        quizId: quiz.id,
        quizTitle: quiz.title,
        subject: quiz.subject,
        score: earnedPoints,
        totalPoints: quiz.totalPoints,
        accuracy,
        timeSpentMinutes: faker.number.int({ min: 2, max: quiz.durationMinutes }),
        completedAt: faker.date.recent({ days: 60 }).getTime(),
        weakTopics: accuracy < 70 ? [faker.helpers.arrayElement(quiz.tags)] : [],
      };

      const ref = db.collection('quizAttempts').doc(attemptId);
      batch.set(ref, attempt);
    }
    
    await batch.commit();
  }

  console.log('Quiz attempts seeded successfully!');
};
