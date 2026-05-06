import * as admin from 'firebase-admin';
import * as dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

export function initFirebaseAdmin() {
  if (admin.apps.length > 0) return admin.app();

  // If a service account is provided, use it. Otherwise, initialize a dummy/emulator app.
  if (process.env.FIREBASE_SERVICE_ACCOUNT) {
    try {
      const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
      return admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
      });
    } catch (error) {
      console.error('Failed to parse FIREBASE_SERVICE_ACCOUNT. Falling back to default app.', error);
    }
  }

  // Fallback for local emulation / mock execution
  console.warn("WARNING: No FIREBASE_SERVICE_ACCOUNT found. Initializing with default config (requires emulator or gcloud login).");
  return admin.initializeApp({
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "demo-faedly",
  });
}

export const db = initFirebaseAdmin().firestore();
