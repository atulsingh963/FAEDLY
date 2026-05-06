import { faker } from '@faker-js/faker';
import { db } from './helpers/firebaseAdmin';

export const seedUsers = async (count: number = 50) => {
  console.log(`Seeding ${count} users...`);
  const batch = db.batch();
  const users: any[] = [];

  for (let i = 0; i < count; i++) {
    const userId = faker.string.uuid();
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    
    const user = {
      uid: userId,
      email: faker.internet.email({ firstName, lastName }),
      displayName: `${firstName} ${lastName}`,
      photoURL: faker.image.avatar(),
      subscriptionTier: faker.helpers.arrayElement(["free", "premium", "premium"]), // Weighted to premium
      educationLevel: faker.helpers.arrayElement(["High School", "Undergraduate", "Graduate"]),
      preferredSubjects: faker.helpers.arrayElements(["Biology", "Physics", "Chemistry", "Mathematics", "Computer Science"], { min: 1, max: 3 }),
      stats: {
        studyStreak: faker.number.int({ min: 0, max: 45 }),
        totalXP: faker.number.int({ min: 100, max: 15000 }),
        quizzesCompleted: faker.number.int({ min: 0, max: 120 }),
        averageScore: faker.number.int({ min: 40, max: 98 }),
        studyTimeMinutes: faker.number.int({ min: 120, max: 5000 }),
      },
      createdAt: faker.date.past({ years: 1 }).getTime(),
      updatedAt: Date.now(),
    };

    users.push(user);
    const userRef = db.collection('users').doc(userId);
    batch.set(userRef, user);
  }

  await batch.commit();
  console.log('Users seeded successfully!');
  return users;
};
