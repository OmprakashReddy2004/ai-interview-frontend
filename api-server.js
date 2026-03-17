require("dotenv").config({ path: ".env.local" });
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");

const app = express();

// ── Security headers ──────────────────────────────────────
app.use(helmet());

// ── CORS ─────────────────────────────────────────────────
const allowedOrigins = [
  "http://localhost:3000",
  process.env.CLIENT_URL,
].filter(Boolean);

app.use(cors({
  origin: (origin, cb) => {
    if (!origin || allowedOrigins.includes(origin)) return cb(null, true);
    cb(new Error("Not allowed by CORS"));
  },
  credentials: true,
}));

// ── Body limits ───────────────────────────────────────────
app.use(express.json({ limit: "5mb" }));

// ── Rate limiters ─────────────────────────────────────────

// Global — 100 requests per 15 min per IP
app.use(rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: { error: "Too many requests, please try again later" },
  standardHeaders: true,
  legacyHeaders: false,
}));

// AI endpoints — 20 requests per 15 min per IP (more expensive)
const aiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  message: { error: "AI rate limit reached, please wait before trying again" },
});

// Session save — 30 per hour
const sessionLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 30,
  message: { error: "Session save limit reached" },
});

// ── Input sanitizer ───────────────────────────────────────
function sanitize(str, maxLen = 5000) {
  if (typeof str !== "string") return "";
  return str.trim().slice(0, maxLen);
}

function validateGenerateRequest(req, res, next) {
  const { role, type, difficulty, questionCount, techStack } = req.body;
  if (!role || typeof role !== "string") {
    return res.status(400).json({ error: "role is required" });
  }
  if (role.trim().length > 100) {
    return res.status(400).json({ error: "role too long" });
  }
  const validTypes = ["behavioural", "technical", "system design", "mixed"];
  if (type && !validTypes.includes(type)) {
    return res.status(400).json({ error: "invalid type" });
  }
  const validDifficulties = ["easy", "mid", "hard", "FAANG"];
  if (difficulty && !validDifficulties.includes(difficulty)) {
    return res.status(400).json({ error: "invalid difficulty" });
  }
  if (questionCount && (questionCount < 1 || questionCount > 20)) {
    return res.status(400).json({ error: "questionCount must be 1-20" });
  }
  if (techStack && (!Array.isArray(techStack) || techStack.length > 15)) {
    return res.status(400).json({ error: "techStack must be array of max 15" });
  }
  // Sanitize
  req.body.role = sanitize(role, 100);
  req.body.techStack = techStack?.map(s => sanitize(s, 50)).filter(Boolean) || [];
  next();
}

function validateScoreRequest(req, res, next) {
  const { question, answer } = req.body;
  if (!question || !answer) {
    return res.status(400).json({ error: "question and answer are required" });
  }
  if (answer.trim().length < 5) {
    return res.status(400).json({ error: "answer too short" });
  }
  // Sanitize — cap answer at 3000 chars
  req.body.question = sanitize(question, 500);
  req.body.answer = sanitize(answer, 3000);
  next();
}

function validateResumeRequest(req, res, next) {
  const { resumeText, jobDescription } = req.body;
  if (!resumeText || !jobDescription) {
    return res.status(400).json({ error: "resumeText and jobDescription are required" });
  }
  if (resumeText.length > 10000) {
    return res.status(400).json({ error: "resume too long (max 10,000 chars)" });
  }
  if (jobDescription.length > 5000) {
    return res.status(400).json({ error: "job description too long (max 5,000 chars)" });
  }
  req.body.resumeText = sanitize(resumeText, 10000);
  req.body.jobDescription = sanitize(jobDescription, 5000);
  next();
}

// ── Routes ────────────────────────────────────────────────
app.post("/api/interview/generate",  aiLimiter,      validateGenerateRequest, require("./api/interview/generate"));
app.post("/api/interview/score",     aiLimiter,      validateScoreRequest,    require("./api/interview/score"));
app.post("/api/interview/coaching",  aiLimiter,                               require("./api/interview/coaching"));
app.post("/api/resume/analyze",      aiLimiter,      validateResumeRequest,   require("./api/resume/analyze"));
app.post("/api/sessions/save",       sessionLimiter,                          require("./api/sessions/save"));
app.get("/api/sessions/list",                                                  require("./api/sessions/list"));
app.get("/api/sessions/:id",                                                   require("./api/sessions/[id]"));
app.delete("/api/sessions/:id",                                                require("./api/sessions/[id]"));

// ── 404 handler ───────────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

// ── Global error handler ──────────────────────────────────
app.use((err, req, res, next) => {
  console.error("Server error:", err.message);
  if (err.message === "Not allowed by CORS") {
    return res.status(403).json({ error: "CORS not allowed" });
  }
  res.status(500).json({ error: "Internal server error" });
});

app.listen(4000, () => console.log("✅ API running at http://localhost:4000"));