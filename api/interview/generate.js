const { withAuth, setCors } = require("../lib/withAuth");
const { generateQuestions } = require("../lib/claude");

module.exports = withAuth(async (req, res) => {
  setCors(res);
  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });
  try {
    const { role, techStack, type, difficulty, questionCount } = req.body;
    if (!role) return res.status(400).json({ error: "role is required" });
    const questions = await generateQuestions({ role, techStack: techStack || [], type: type || "mixed", difficulty: difficulty || "mid", questionCount: Math.min(questionCount || 10, 20) });
    return res.status(200).json({ questions });
  } catch (err) {
    console.error("Generate error:", err);
    return res.status(500).json({ error: "Failed to generate questions" });
  }
});