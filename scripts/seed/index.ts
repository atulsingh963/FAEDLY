import { seedUsers } from './seedUsers';
import { seedQuizzes } from './seedQuizzes';
import { seedQuizAttempts } from './seedQuizAttempts';
import { seedChats } from './seedChats';
import { seedAnalytics } from './seedAnalytics';
import { clearDatabase } from './clearDatabase';

async function main() {
  console.log('🚀 Starting FAEDLY Demo Data Seeder...\n');

  try {
    // 1. Clear existing demo data
    await clearDatabase();
    console.log('-----------------------------------');

    // 2. Generate Base Entities
    const users = await seedUsers(50);
    const quizzes = await seedQuizzes(100);
    console.log('-----------------------------------');

    // 3. Generate Relational Activity
    await seedQuizAttempts(users, quizzes, 1000);
    await seedChats(users, 300);
    await seedAnalytics(users);
    console.log('-----------------------------------');

    console.log('✅ All data seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding failed:', error);
    process.exit(1);
  }
}

main();
