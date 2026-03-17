import { useEffect, useRef, useState } from "react";
import { BASE_URL } from "../config";

export default function ResumeLoadingAnimation({ onResult, resumeFile, jobDescription }) {
  const [stage, setStage] = useState(0);
  const [isDone, setIsDone] = useState(false);

  const steps = [
    "Loading your resume...",
    "Parsing your resume...",
    "Identifying key skills...",
    "Analyzing job description...",
    "Generating tailored suggestions...",
  ];

  const intervalRef = useRef(null);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    // Step through progress visually
    intervalRef.current = setInterval(() => {
      setStage((prev) => (prev < steps.length - 1 ? prev + 1 : prev));
    }, 1300);

    // Call backend
    const runBackend = async () => {
      try {
        const formData = new FormData();
        formData.append("resume", resumeFile);
        formData.append("jobDescription", jobDescription);

        const response = await fetch(`${BASE_URL}/api/resume/analyze`, {
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

        setIsDone(true);
        clearInterval(intervalRef.current);
        onResult(parsed);
      } catch (err) {
        onResult({ error: "Failed to analyze resume. Please try again." });
        clearInterval(intervalRef.current);
      }
    };

    runBackend();

    return () => clearInterval(intervalRef.current); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // intentionally run once on mount

  const progress = ((stage + 1) / steps.length) * 100;

  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      minHeight: 350,
      padding: "2rem 1rem",
      width: "100%",
    }}>
      <style>{`
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes ripple {
          0%, 100% { box-shadow: 0 0 0 0 rgba(123,92,245,0.4); }
          50%       { box-shadow: 0 0 0 8px rgba(123,92,245,0); }
        }
        @keyframes subtlePulse {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0.5; }
        }
      `}</style>

      {/* Current stage label */}
      <div key={stage} style={{
        fontFamily: "'Syne', sans-serif",
        fontWeight: 700,
        fontSize: "1.1rem",
        letterSpacing: "-0.02em",
        color: isDone ? "#5DCAA5" : "rgba(155,124,247,0.9)",
        marginBottom: "2rem",
        animation: "fadeSlideUp 0.5s ease both",
        textAlign: "center",
      }}>
        {isDone ? "Finalizing suggestions..." : steps[stage]}
      </div>

      {/* Step list */}
      <div style={{ width: "100%", maxWidth: 420, display: "flex", flexDirection: "column", gap: "0.75rem", marginBottom: "2rem" }}>
        {steps.map((step, i) => {
          const isDonStep = i < stage;
          const isActive  = i === stage;
          const isPending = i > stage;

          return (
            <div key={i} style={{
              display: "flex",
              alignItems: "center",
              gap: "0.75rem",
              opacity: isPending ? 0.3 : 1,
              transition: "opacity 0.4s ease",
            }}>
              {/* Circle indicator */}
              <div style={{
                width: 22, height: 22, flexShrink: 0,
                borderRadius: "50%",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: "0.65rem",
                fontWeight: 700,
                transition: "all 0.3s",
                background: isDonStep
                  ? "rgba(93,202,165,0.15)"
                  : isActive
                  ? "rgba(123,92,245,0.15)"
                  : "transparent",
                border: isDonStep
                  ? "1.5px solid rgba(93,202,165,0.5)"
                  : isActive
                  ? "1.5px solid rgba(123,92,245,0.6)"
                  : "1.5px solid rgba(255,255,255,0.1)",
                animation: isActive ? "ripple 1.5s infinite" : "none",
                color: isDonStep ? "#5DCAA5" : "transparent",
              }}>
                {isDonStep && (
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                    <path d="M1.5 5l2.5 2.5L8.5 2" stroke="#5DCAA5" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                )}
              </div>

              {/* Step label */}
              <span style={{
                fontSize: "0.855rem",
                fontWeight: isDonStep ? 400 : isActive ? 500 : 300,
                color: isDonStep
                  ? "#5DCAA5"
                  : isActive
                  ? "rgba(180,165,255,0.9)"
                  : "rgba(245,244,240,0.3)",
                transition: "color 0.4s",
                fontFamily: "'DM Sans', sans-serif",
              }}>
                {step}
              </span>
            </div>
          );
        })}
      </div>

      {/* Progress bar */}
      <div style={{
        width: "100%",
        maxWidth: 420,
        height: 4,
        background: "rgba(255,255,255,0.06)",
        borderRadius: 100,
        overflow: "hidden",
        marginBottom: "1.5rem",
      }}>
        <div style={{
          height: "100%",
          borderRadius: 100,
          width: `${progress}%`,
          background: "linear-gradient(90deg, #7B5CF5, #5DCAA5)",
          transition: "width 0.8s ease",
        }} />
      </div>

      {/* Footer note */}
      <p style={{
        fontSize: "0.78rem",
        color: "rgba(245,244,240,0.25)",
        fontWeight: 300,
        textAlign: "center",
        lineHeight: 1.6,
        animation: "subtlePulse 2s infinite",
      }}>
        Analyzing your resume and job description…
      </p>
    </div>
  );
}