const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../../.env.local") });

let adminInitialized = false;

/**
 * Initialize Firebase Admin SDK (only once)
 */
function initAdmin() {
  if (adminInitialized) return;

  const { initializeApp, getApps, cert } = require("firebase-admin/app");

  if (!getApps().length) {
    initializeApp({
      credential: cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
      }),
    });
  }

  adminInitialized = true;
}

/**
 * Authentication Middleware
 */
function withAuth(handler) {
  return async (req, res) => {
    try {
      // ✅ Handle preflight requests (important for frontend)
      if (req.method === "OPTIONS") {
        setCors(res);
        return res.status(200).end();
      }

      // ✅ DEV MODE (skip Firebase auth)
      if (process.env.NODE_ENV === "development") {
        req.user = {
          uid: "dev-user",
          email: "dev@example.com",
        };
        return handler(req, res);
      }

      // ✅ PRODUCTION MODE
      initAdmin();
      const { getAuth } = require("firebase-admin/auth");

      const authHeader = req.headers.authorization;

      // ❌ Missing token
      if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ error: "Missing auth token" });
      }

      const token = authHeader.split("Bearer ")[1];

      // ❌ Invalid token format
      if (!token || token.length < 100 || token.length > 2500) {
        return res.status(401).json({ error: "Invalid token format" });
      }

      // ✅ Verify token
      const decoded = await getAuth().verifyIdToken(token);

      // ❌ Expiry check (extra safety)
      const now = Math.floor(Date.now() / 1000);
      if (now - decoded.iat > 3600) {
        return res.status(401).json({
          error: "Token expired, please sign in again",
        });
      }

      // ✅ Attach user to request
      req.user = {
        uid: decoded.uid,
        email: decoded.email,
      };

      return handler(req, res);
    } catch (err) {
      console.error("Auth error:", err.message);

      // 🔥 Specific Firebase errors
      if (err.code === "auth/id-token-expired") {
        return res.status(401).json({
          error: "Token expired, please sign in again",
        });
      }

      if (err.code === "auth/argument-error") {
        return res.status(401).json({ error: "Invalid token" });
      }

      return res.status(401).json({ error: "Unauthorized" });
    }
  };
}

/**
 * CORS Setup
 */
function setCors(res) {
  res.setHeader(
    "Access-Control-Allow-Origin",
    process.env.CLIENT_URL || "http://localhost:3000"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,POST,PUT,DELETE,OPTIONS"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization"
  );
}

module.exports = { withAuth, setCors };