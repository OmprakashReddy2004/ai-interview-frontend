import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../config";
export default function InterviewPrep() {
  const [setup, setSetup] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const data = localStorage.getItem("interviewSetup");
    if (data) setSetup(JSON.parse(data));
  }, []);

  const handleStart = async () => {
    if (!setup) return;
    setLoading(true);

    try {
      const res = await fetch(`${BASE_URL}/api/interview/start`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          topics: setup.topics,
          difficulty: setup.difficulty,
        }),
      });

      if (!res.ok) throw new Error("Failed to fetch questions");

      const data = await res.json();
      console.log("🧠 Raw Gemini data:", data);

      let parsed = [];
      if (data.questions?.response) {
        const clean = data.questions.response.replace(/```json|```/g, "").trim();
        const json = JSON.parse(clean);
        parsed = json.questions || [];
      }

      // ✅ Save for next page
      localStorage.setItem(
        "interviewSession",
        JSON.stringify({
          sessionId: data.sessionId,
          topics: setup.topics,
          difficulty: setup.difficulty,
          questions: parsed,
        })
      );

      console.log("✅ Parsed Questions:", parsed);
      navigate("/interview/live");
    } catch (err) {
      console.error("❌ Error starting interview:", err);
      alert("Error starting interview. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!setup)
    return (
      <div className="min-h-screen bg-black flex items-center justify-center text-gray-300 text-xl">
        ⚠️ No interview details found. Please go back and select topics.
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black flex flex-col items-center justify-center px-6 text-white">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl font-bold text-blue-400 mb-8 text-center"
      >
        Interview Preparation
      </motion.h1>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="bg-gray-900/80 border border-gray-800 rounded-2xl shadow-lg shadow-blue-500/10 p-8 w-full max-w-lg"
      >
        <p className="text-lg mb-4 text-gray-300">
          <span className="text-blue-400 font-semibold">Topics:</span>{" "}
          {setup.topics.join(", ")}
        </p>

        <p className="text-lg mb-6 text-gray-300">
          <span className="text-blue-400 font-semibold">Difficulty:</span>{" "}
          {setup.difficulty.charAt(0).toUpperCase() + setup.difficulty.slice(1)}
        </p>

        {loading ? (
          <p className="text-blue-400 text-center mt-6 animate-pulse">
            🚀 Generating AI Interview Questions...
          </p>
        ) : (
          <div className="flex justify-center gap-4 mt-6">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => navigate("/interview/topics")}
              className="px-6 py-2 bg-gray-700 hover:bg-gray-600 text-gray-200 rounded-lg"
            >
              ← Back
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              onClick={handleStart}
              className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-md shadow-blue-500/30"
            >
              Start Interview
            </motion.button>
          </div>
        )}
      </motion.div>
    </div>
  );
}
