import { faker } from '@faker-js/faker';
import { db } from './helpers/firebaseAdmin';
import { randomSubject } from './helpers/utils';

export const seedChats = async (users: any[], count: number = 200) => {
  console.log(`Seeding ${count} AI tutor chats...`);
  
  const chunks = [];
  for (let i = 0; i < count; i += 400) {
    chunks.push(Array.from({ length: Math.min(400, count - i) }));
  }

  for (const chunk of chunks) {
    const batch = db.batch();
    
    for (const _ of chunk) {
      const user = faker.helpers.arrayElement(users);
      const subject = randomSubject();
      const chatId = faker.string.uuid();
      
      const numMessages = faker.number.int({ min: 2, max: 10 });
      const messages = [];
      
      let currentTime = faker.date.recent({ days: 30 }).getTime();
      
      for (let m = 0; m < numMessages; m++) {
        // User message
        messages.push({
          id: faker.string.uuid(),
          role: 'user',
          content: faker.lorem.sentence() + "?",
          timestamp: currentTime
        });
        
        currentTime += faker.number.int({ min: 10000, max: 60000 }); // 10s to 1m later
        
        // AI message
        messages.push({
          id: faker.string.uuid(),
          role: 'assistant',
          content: faker.lorem.paragraphs(2) + `\n\n\`\`\`javascript\nconsole.log('Example for ${subject}');\n\`\`\``,
          timestamp: currentTime
        });
        
        currentTime += faker.number.int({ min: 30000, max: 300000 }); // Next interaction
      }

      const chat = {
        id: chatId,
        userId: user.uid,
        title: faker.lorem.words(4),
        subject,
        messages,
        updatedAt: currentTime,
        createdAt: messages[0].timestamp,
      };

      const ref = db.collection('chats').doc(chatId);
      batch.set(ref, chat);
    }
    
    await batch.commit();
  }

  console.log('Chats seeded successfully!');
};
