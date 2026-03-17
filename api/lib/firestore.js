const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../../.env.local") });

let db = null;

function getDb() {
  if (db) return db;
  const { initializeApp, getApps, cert } = require("firebase-admin/app");
  const { getFirestore } = require("firebase-admin/firestore");
  if (!getApps().length) {
    initializeApp({
      credential: cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
      }),
    });
  }
  db = getFirestore();
  return db;
}

async function saveSession({ userId, config, questions, answers, scores, coachingNotes }) {
  const { FieldValue } = require("firebase-admin/firestore");
  const ref = getDb().collection("sessions").doc();
  const session = { id: ref.id, userId, config, questions, answers, scores, coachingNotes, createdAt: FieldValue.serverTimestamp() };
  await ref.set(session);
  return session;
}

async function getSession(sessionId, userId) {
  const doc = await getDb().collection("sessions").doc(sessionId).get();
  if (!doc.exists) return null;
  const data = doc.data();
  if (data.userId !== userId) return null;
  return { id: doc.id, ...data };
}

async function getUserSessions(userId, limit = 20) {
  const snap = await getDb().collection("sessions").where("userId", "==", userId).orderBy("createdAt", "desc").limit(limit).get();
  return snap.docs.map(d => ({ id: d.id, ...d.data() }));
}

async function deleteSession(sessionId, userId) {
  const doc = await getDb().collection("sessions").doc(sessionId).get();
  if (!doc.exists || doc.data().userId !== userId) return false;
  await getDb().collection("sessions").doc(sessionId).delete();
  return true;
}

async function getUserStats(userId) {
  const snap = await getDb().collection("sessions").where("userId", "==", userId).orderBy("createdAt", "desc").get();
  const sessions = snap.docs.map(d => d.data());
  if (!sessions.length) return { totalSessions: 0, avgScore: 0, bestScore: 0 };
  const scores = sessions.map(s => s.scores?.overall ?? 0).filter(Boolean);
  return {
    totalSessions: sessions.length,
    avgScore: scores.length ? Math.round((scores.reduce((a, b) => a + b, 0) / scores.length) * 10) / 10 : 0,
    bestScore: scores.length ? Math.max(...scores) : 0,
    recentSessions: sessions.slice(0, 5).map(s => ({ id: s.id, role: s.config?.role, type: s.config?.type, overall: s.scores?.overall })),
  };
}

module.exports = { saveSession, getSession, getUserSessions, deleteSession, getUserStats };