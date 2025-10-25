import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function ResumeLoadingAnimation({ onResult }) {
  const [stage, setStage] = useState(0);
  const [isDone, setIsDone] = useState(false);

  const steps = [
    "Loading your resume...",
    "Parsing your resume...",
    "Identifying key skills...",
    "Analyzing job description...",
    "Generating tailored suggestions...",
  ];

  // 🧠 Step 1 — Trigger backend on first stage
  useEffect(() => {
    let progressInterval;

    const startProgress = () => {
      progressInterval = setInterval(() => {
        setStage((prev) => {
          if (prev < steps.length - 1) return prev + 1;
          return prev;
        });
      }, 1300);
    };

    startProgress();

    // ⚡ Trigger backend immediately on mount
    const runBackend = async () => {
      try {
        const formData = new FormData();
        formData.append("resume", window.__resumeFile);
        formData.append("jobDescription", window.__jobDescription);

        const response = await fetch("http://localhost:8080/api/resume/analyze", {
          method: "POST",
          body: formData,
        });

        const result = await response.json();

        let raw = result.response || "";
        raw = raw.replace(/```json|```/g, "").trim();

        let parsed = {};
        try {
          parsed = JSON.parse(raw);
        } catch {
          parsed = { message: raw };
        }

        console.log("✅ Backend completed:", parsed);
        setIsDone(true);
        clearInterval(progressInterval);

        // 🔔 Send result back to parent (TailoredSuggestionsStep)
        onResult(parsed);
      } catch (err) {
        console.error("❌ Error:", err);
        onResult({ error: "Failed to analyze resume." });
        clearInterval(progressInterval);
      }
    };

    runBackend();

    return () => clearInterval(progressInterval);
  }, []);

  return (
    <div className="flex flex-col justify-center items-center min-h-[350px] text-white">
      <AnimatePresence mode="wait">
        <motion.div
          key={stage}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.5 }}
          className="text-2xl font-semibold text-blue-400 mb-8"
        >
          {isDone ? "Finalizing suggestions..." : steps[stage]}
        </motion.div>
      </AnimatePresence>

      <div className="w-full max-w-md space-y-4">
        {steps.map((step, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: i <= stage ? 1 : 0.3, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-3"
          >
            <div
              className={`w-5 h-5 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
                i < stage
                  ? "bg-green-500 border-green-500"
                  : i === stage
                  ? "border-blue-400 animate-pulse"
                  : "border-gray-600"
              }`}
            >
              {i < stage ? "✓" : ""}
            </div>
            <span
              className={`text-sm sm:text-base ${
                i < stage
                  ? "text-green-400"
                  : i === stage
                  ? "text-blue-300"
                  : "text-gray-500"
              }`}
            >
              {step}
            </span>
          </motion.div>
        ))}
      </div>

      {/* Progress Bar */}
      <div className="w-full max-w-md mt-8 h-2 bg-gray-800 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{
            width: `${((stage + 1) / steps.length) * 100}%`,
          }}
          transition={{ duration: 0.8 }}
          className="h-full bg-gradient-to-r from-blue-500 to-green-400 rounded-full"
        />
      </div>

      <p className="mt-8 text-gray-400 text-sm animate-pulse">
        Please wait while we are analyzing your resume and job description...
      </p>
    </div>
  );
}
