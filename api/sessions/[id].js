const { withAuth, setCors } = require("../lib/withAuth");
const { getSession, deleteSession } = require("../lib/firestore");

module.exports = withAuth(async (req, res) => {
  setCors(res);
  if (req.method === "OPTIONS") return res.status(200).end();
  const { id } = req.query;
  if (req.method === "GET") {
    try {
      const session = await getSession(id, req.user.uid);
      if (!session) return res.status(404).json({ error: "Session not found" });
      return res.status(200).json({ session });
    } catch (err) {
      return res.status(500).json({ error: "Failed to fetch session" });
    }
  }
  if (req.method === "DELETE") {
    try {
      const deleted = await deleteSession(id, req.user.uid);
      if (!deleted) return res.status(404).json({ error: "Session not found" });
      return res.status(200).json({ success: true });
    } catch (err) {
      return res.status(500).json({ error: "Failed to delete session" });
    }
  }
  return res.status(405).json({ error: "Method not allowed" });
});