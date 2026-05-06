import { faker } from '@faker-js/faker';
import { db } from './helpers/firebaseAdmin';

export const seedAnalytics = async (users: any[]) => {
  console.log(`Seeding analytics for ${users.length} users...`);
  
  const chunks = [];
  for (let i = 0; i < users.length; i += 400) {
    chunks.push(users.slice(i, i + 400));
  }

  for (const chunk of chunks) {
    const batch = db.batch();
    
    for (const user of chunk) {
      const statsId = user.uid; // One analytics doc per user
      
      const activityHeatmap = Array.from({ length: 30 }).map((_, i) => ({
        date: new Date(Date.now() - (i * 24 * 60 * 60 * 1000)).toISOString().split('T')[0],
        minutes: faker.number.int({ min: 0, max: 120 }),
      }));

      const analytics = {
        userId: user.uid,
        activityHeatmap,
        subjectMastery: {
          "Biology": faker.number.int({ min: 40, max: 95 }),
          "Physics": faker.number.int({ min: 40, max: 95 }),
          "Chemistry": faker.number.int({ min: 40, max: 95 }),
          "Mathematics": faker.number.int({ min: 40, max: 95 }),
          "Computer Science": faker.number.int({ min: 40, max: 95 }),
        },
        weeklyTrends: [
          { week: "Week 1", score: faker.number.int({ min: 50, max: 70 }) },
          { week: "Week 2", score: faker.number.int({ min: 60, max: 80 }) },
          { week: "Week 3", score: faker.number.int({ min: 65, max: 85 }) },
          { week: "Week 4", score: faker.number.int({ min: 70, max: 95 }) },
        ],
        updatedAt: Date.now(),
      };

      const ref = db.collection('analytics').doc(statsId);
      batch.set(ref, analytics);
    }
    
    await batch.commit();
  }

  console.log('Analytics seeded successfully!');
};
