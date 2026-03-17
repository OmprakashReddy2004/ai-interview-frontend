const { withAuth, setCors } = require("../lib/withAuth");
const { analyzeResume } = require("../lib/claude");

module.exports = withAuth(async (req, res) => {
  setCors(res);
  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });
  try {
    const { resumeText, jobDescription } = req.body;
    if (!resumeText || !jobDescription) return res.status(400).json({ error: "resumeText and jobDescription are required" });
    const analysis = await analyzeResume({ resumeText, jobDescription });
    if (!analysis) return res.status(500).json({ error: "Analysis failed" });
    return res.status(200).json({ analysis });
  } catch (err) {
    console.error("Resume error:", err);
    return res.status(500).json({ error: "Failed to analyze resume" });
  }
});