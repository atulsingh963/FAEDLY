import { db } from './helpers/firebaseAdmin';

export const clearDatabase = async () => {
  console.log('WARNING: Clearing database...');
  
  if (process.env.NODE_ENV === 'production' && !process.env.FORCE_SEED) {
    console.error('CRITICAL: Attempted to clear production database without FORCE_SEED flag. Aborting.');
    process.exit(1);
  }

  const collections = ['users', 'quizzes', 'quizAttempts', 'chats', 'analytics'];
  
  for (const collectionName of collections) {
    console.log(`Deleting collection: ${collectionName}...`);
    const snapshot = await db.collection(collectionName).get();
    
    const batches = [];
    let currentBatch = db.batch();
    let count = 0;
    
    snapshot.docs.forEach((doc) => {
      currentBatch.delete(doc.ref);
      count++;
      
      if (count === 400) {
        batches.push(currentBatch.commit());
        currentBatch = db.batch();
        count = 0;
      }
    });
    
    if (count > 0) {
      batches.push(currentBatch.commit());
    }
    
    await Promise.all(batches);
  }
  
  console.log('Database cleared successfully!');
};
