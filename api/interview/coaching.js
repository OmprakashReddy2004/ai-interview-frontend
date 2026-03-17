const { withAuth, setCors } = require("../lib/withAuth");
const { generateCoachingNotes } = require("../lib/claude");

module.exports = withAuth(async (req, res) => {
  setCors(res);
  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });
  try {
    const { answers } = req.body;
    if (!answers?.length) return res.status(400).json({ error: "answers required" });
    const notes = await generateCoachingNotes(answers);
    return res.status(200).json({ notes });
  } catch (err) {
    console.error("Coaching error:", err);
    return res.status(500).json({ error: "Failed to generate coaching notes" });
  }
});