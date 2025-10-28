import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function TopicWiseInterview() {
  const [topics, setTopics] = useState([]);
  const [difficulty, setDifficulty] = useState("medium");
  const [input, setInput] = useState("");
  const navigate = useNavigate();

  const addTopic = () => {
    if (input.trim() && !topics.includes(input.trim())) {
      setTopics([...topics, input.trim()]);
      setInput("");
    }
  };

  const removeTopic = (t) => {
    setTopics(topics.filter((topic) => topic !== t));
  };

  const startInterview = () => {
    const payload = { topics, difficulty };
    localStorage.setItem("interviewSetup", JSON.stringify(payload));
    navigate("/interview/prep");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black flex flex-col items-center justify-center text-white px-6 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(59,130,246,0.15),transparent_70%)]" />

      {/* Heading */}
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl font-bold text-blue-400 mb-8 text-center"
      >
        Topic-wise Mock Interview Setup
      </motion.h1>

      {/* Input Card */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="bg-gray-900/80 backdrop-blur-md border border-gray-800 rounded-2xl shadow-2xl shadow-blue-500/10 w-full max-w-lg p-8"
      >
        {/* Topic Input */}
        <label className="block mb-2 text-gray-300 font-medium">
          Enter Topics (Press Enter to add multiple):
        </label>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addTopic())}
          placeholder="e.g. Java, Spring Boot, REST APIs"
          className="w-full px-4 py-2 bg-gray-800 rounded-lg border border-gray-700 focus:ring-2 focus:ring-blue-500 outline-none text-white placeholder-gray-500 transition"
        />

        {/* Topic Chips */}
        <div className="flex flex-wrap gap-2 mt-4">
          <AnimatePresence>
            {topics.map((t) => (
              <motion.span
                key={t}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.6 }}
                className="flex items-center gap-2 bg-blue-600/20 text-blue-300 border border-blue-600/30 px-3 py-1 rounded-full text-sm font-medium"
              >
                {t}
                <button
                  onClick={() => removeTopic(t)}
                  className="text-red-400 hover:text-red-500 transition"
                >
                  ✕
                </button>
              </motion.span>
            ))}
          </AnimatePresence>
        </div>

        {/* Difficulty */}
        <div className="mt-6">
          <label className="block mb-2 text-gray-300 font-medium">
            Select Difficulty:
          </label>
          <div className="flex justify-between">
            {["easy", "medium", "hard"].map((level) => (
              <motion.button
                key={level}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => setDifficulty(level)}
                className={`flex-1 mx-1 py-2 rounded-lg border text-center transition-all duration-300 ${
                  difficulty === level
                    ? "bg-blue-600 border-blue-500 text-white shadow-lg shadow-blue-500/30"
                    : "bg-gray-800 border-gray-700 text-gray-300 hover:bg-gray-700"
                }`}
              >
                {level.charAt(0).toUpperCase() + level.slice(1)}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Proceed Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          disabled={topics.length === 0}
          onClick={startInterview}
          className={`w-full mt-8 py-3 rounded-xl font-semibold text-lg shadow-md transition-all duration-300 ${
            topics.length === 0
              ? "bg-gray-700 text-gray-400 cursor-not-allowed"
              : "bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white shadow-blue-500/30"
          }`}
        >
          Proceed to Interview
        </motion.button>
      </motion.div>
    </div>
  );
}
