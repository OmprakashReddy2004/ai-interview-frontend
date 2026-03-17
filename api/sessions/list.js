const { withAuth, setCors } = require("../lib/withAuth");
const { getUserSessions, getUserStats } = require("../lib/firestore");

module.exports = withAuth(async (req, res) => {
  setCors(res);
  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "GET") return res.status(405).json({ error: "Method not allowed" });
  try {
    const limit = parseInt(req.query.limit) || 20;
    const [sessions, stats] = await Promise.all([
      getUserSessions(req.user.uid, limit),
      getUserStats(req.user.uid),
    ]);
    return res.status(200).json({ sessions, stats });
  } catch (err) {
    console.error("List error:", err);
    return res.status(500).json({ error: "Failed to fetch sessions" });
  }
});