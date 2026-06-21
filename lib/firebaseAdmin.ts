import { initializeApp, cert, getApps } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import { getAuth } from "firebase-admin/auth";

if (!getApps().length) {
  initializeApp({
    credential: cert({
      projectId: process.env.FIREBASE_ADMIN_PROJECT_ID,
      clientEmail: process.env.FIREBASE_ADMIN_CLIENT_EMAIL,
      // FIREBASE_ADMIN_PRIVATE_KEY must be stored as a Base64-encoded string
      // to avoid line-break issues on hosting platforms (Vercel, Railway, etc.).
      // Encode locally with: btoa(privateKey) or in Node:
      //   Buffer.from(privateKey).toString("base64")
      privateKey: process.env.FIREBASE_ADMIN_PRIVATE_KEY
        ? Buffer.from(process.env.FIREBASE_ADMIN_PRIVATE_KEY, "base64").toString("utf-8")
        : undefined,
    }),
  });
}

export const db = getFirestore();
export const auth = getAuth();

export async function verifyIdToken(idToken: string) {
  return auth.verifyIdToken(idToken);
}
