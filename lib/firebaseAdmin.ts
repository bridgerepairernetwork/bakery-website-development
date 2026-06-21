import { initializeApp, cert, getApps, App } from "firebase-admin/app";
import { getFirestore, Firestore } from "firebase-admin/firestore";
import { getAuth, Auth } from "firebase-admin/auth";

let adminApp: App | null = null;

if (!getApps().length) {
  const projectId = process.env.FIREBASE_ADMIN_PROJECT_ID;
  const clientEmail = process.env.FIREBASE_ADMIN_CLIENT_EMAIL;
  const privateKeyB64 = process.env.FIREBASE_ADMIN_PRIVATE_KEY;

  if (!projectId || !clientEmail || !privateKeyB64) {
    console.error(
      "[firebaseAdmin] Missing required env vars:",
      JSON.stringify({ projectId: !!projectId, clientEmail: !!clientEmail, privateKey: !!privateKeyB64 }),
    );
  } else {
    try {
      // FIREBASE_ADMIN_PRIVATE_KEY is stored as a Base64-encoded string to avoid
      // line-break mangling in hosting environment variables.
      const privateKey = Buffer.from(privateKeyB64, "base64").toString("utf-8");

      adminApp = initializeApp({
        credential: cert({ projectId, clientEmail, privateKey }),
      });
    } catch (err) {
      console.error("[firebaseAdmin] Failed to initialize Firebase Admin SDK:", err);
    }
  }
} else {
  adminApp = getApps()[0];
}

// Export helpers that throw a clear error if the SDK never initialized
export function getDb(): Firestore {
  if (!adminApp) {
    throw new Error(
      "Firebase Admin SDK is not initialized. Check FIREBASE_ADMIN_* environment variables.",
    );
  }
  return getFirestore(adminApp);
}

export function getAdminAuth(): Auth {
  if (!adminApp) {
    throw new Error(
      "Firebase Admin SDK is not initialized. Check FIREBASE_ADMIN_* environment variables.",
    );
  }
  return getAuth(adminApp);
}

// Convenience exports (kept for backward compatibility with existing imports)
export const db = adminApp ? getFirestore(adminApp) : (null as unknown as Firestore);
export const auth = adminApp ? getAuth(adminApp) : (null as unknown as Auth);

export async function verifyIdToken(idToken: string) {
  return getAdminAuth().verifyIdToken(idToken);
}
