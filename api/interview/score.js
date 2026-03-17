const { withAuth, setCors } = require("../lib/withAuth");
const { scoreAnswer } = require("../lib/claude");

module.exports = withAuth(async (req, res) => {
  setCors(res);
  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });
  try {
    const { question, answer, type, techStack } = req.body;
    if (!question || !answer) return res.status(400).json({ error: "question and answer are required" });
    const score = await scoreAnswer({ question, answer, type, techStack });
    return res.status(200).json({ score });
  } catch (err) {
    console.error("Score error:", err);
    return res.status(500).json({ error: "Failed to score answer" });
  }
});