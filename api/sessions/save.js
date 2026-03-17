const { withAuth, setCors } = require("../lib/withAuth");
const { saveSession } = require("../lib/firestore");
const { generateCoachingNotes } = require("../lib/claude");

module.exports = withAuth(async (req, res) => {
  setCors(res);
  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });
  try {
    const { config, questions, answers, scores } = req.body;
    if (!answers?.length) return res.status(400).json({ error: "answers required" });
    const coachingNotes = await generateCoachingNotes(answers);
    const session = await saveSession({ userId: req.user.uid, config, questions, answers, scores, coachingNotes });
    return res.status(201).json({ session });
  } catch (err) {
    console.error("Save error:", err);
    return res.status(500).json({ error: "Failed to save session" });
  }
});