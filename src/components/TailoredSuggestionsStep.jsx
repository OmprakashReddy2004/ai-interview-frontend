import { useEffect, useState } from "react";
import ResumeLoadingAnimation from "../components/ResumeLoadingAnimation";

export default function TailoredSuggestionsStep({ resumeFile, jobDescription, shouldAnalyze }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!resumeFile || !jobDescription) return;
    
    setLoading(true);
    setError("");
    setData(null);
  }, [resumeFile, jobDescription]);

  const handleResult = (result) => {
    if (result.error) {
      setError(result.error);
    } else {
      setData(result);
    }
    setLoading(false);
  };

  // ── Loading ──
  if (loading) {
    return <ResumeLoadingAnimation onResult={handleResult} />;
  }

  // ── Error ──
  if (error) {
    return (
      <div style={{
        background: "rgba(226,75,74,0.08)",
        border: "1px solid rgba(226,75,74,0.25)",
        borderRadius: 16,
        padding: "1.5rem",
        textAlign: "center",
        marginTop: "1rem",
      }}>
        <div style={{ fontSize: "1.5rem", marginBottom: "0.75rem" }}>⚠️</div>
        <p style={{ color: "#E24B4A", fontSize: "0.875rem", fontWeight: 400, lineHeight: 1.6 }}>{error}</p>
      </div>
    );
  }

  // ── Results ──
  if (data) {
    const score = data.matchScore ?? null;
    const scoreColor = score >= 80 ? "#5DCAA5" : score >= 60 ? "#3B8BEB" : score >= 40 ? "#F5A623" : "#E24B4A";

    return (
      <div style={{ width: "100%" }}>

        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginBottom: "1.5rem" }}>
          <div style={{ width: 32, height: 32, borderRadius: 9, background: "rgba(123,92,245,0.12)", border: "1px solid rgba(123,92,245,0.25)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
              <path d="M7.5 1l1.8 3.6 4 .6-2.9 2.8.7 4L7.5 10l-3.6 1.9.7-4L1.7 5.2l4-.6z" stroke="#9B7CF7" strokeWidth="1.2" strokeLinejoin="round"/>
            </svg>
          </div>
          <div>
            <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: "1rem", letterSpacing: "-0.02em" }}>Tailored Suggestions</div>
            <div style={{ fontSize: "0.72rem", color: "rgba(245,244,240,0.35)", fontWeight: 300 }}>Based on your resume and job description</div>
          </div>
        </div>

        {/* Score card */}
        {score !== null && (
          <div style={{
            background: `${scoreColor}0D`,
            border: `1px solid ${scoreColor}30`,
            borderRadius: 16,
            padding: "1.25rem 1.5rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "1.25rem",
            position: "relative",
            overflow: "hidden",
          }}>
            <div style={{ position: "absolute", top: 0, left: "10%", right: "10%", height: 1, background: `linear-gradient(90deg, transparent, ${scoreColor}50, transparent)` }} />
            <div>
              <div style={{ fontSize: "0.7rem", fontWeight: 500, letterSpacing: "0.08em", textTransform: "uppercase", color: "rgba(245,244,240,0.4)", marginBottom: "0.2rem" }}>Compatibility Score</div>
              <div style={{ fontSize: "0.8rem", color: "rgba(245,244,240,0.5)", fontWeight: 300 }}>
                {score >= 80 ? "Excellent match — you're a strong fit" : score >= 60 ? "Good match — a few gaps to address" : score >= 40 ? "Fair match — significant gaps found" : "Low match — major improvements needed"}
              </div>
            </div>
            <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "2.2rem", color: scoreColor, letterSpacing: "-0.04em", lineHeight: 1 }}>
              {score}%
            </div>
          </div>
        )}

        {/* Detail sections */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>

          {/* Strengths */}
          {data.strengths && (
            <Section
              color="#5DCAA5"
              icon={<svg width="13" height="13" viewBox="0 0 13 13" fill="none"><path d="M2 6.5l3 3 6-6" stroke="#5DCAA5" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>}
              label="Strengths"
              content={Array.isArray(data.strengths) ? data.strengths.join(", ") : data.strengths}
            />
          )}

          {/* Gaps */}
          {data.gaps && (
            <Section
              color="#F5A623"
              icon={<svg width="13" height="13" viewBox="0 0 13 13" fill="none"><path d="M6.5 2v5M6.5 9.5v.5" stroke="#F5A623" strokeWidth="1.4" strokeLinecap="round"/></svg>}
              label="Gaps to Address"
              content={Array.isArray(data.gaps) ? data.gaps.join(", ") : data.gaps}
            />
          )}

          {/* Recommendations */}
          {(data.recommendations || data.message) && (
            <Section
              color="#9B7CF7"
              icon={<svg width="13" height="13" viewBox="0 0 13 13" fill="none"><path d="M2 4h9M2 6.5h6M2 9h4" stroke="#9B7CF7" strokeWidth="1.3" strokeLinecap="round"/></svg>}
              label="AI Recommendations"
              content={
                Array.isArray(data.recommendations)
                  ? data.recommendations.join(" ")
                  : data.recommendations || data.message || "No specific suggestions."
              }
            />
          )}
        </div>

        {/* Footer note */}
        <div style={{ marginTop: "1.5rem", textAlign: "center", fontSize: "0.72rem", color: "rgba(245,244,240,0.2)", fontWeight: 300, letterSpacing: "0.03em" }}>
          Generated by AI · powered by Gemini
        </div>
      </div>
    );
  }

  // ── Empty state ──
  return (
    <div style={{ textAlign: "center", padding: "3rem 1rem" }}>
      <div style={{ width: 52, height: 52, borderRadius: "50%", background: "rgba(123,92,245,0.08)", border: "1px solid rgba(123,92,245,0.15)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1.25rem" }}>
        <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
          <circle cx="11" cy="11" r="9" stroke="#7B5CF5" strokeWidth="1.4"/>
          <path d="M11 7v4l3 2" stroke="#7B5CF5" strokeWidth="1.4" strokeLinecap="round"/>
        </svg>
      </div>
      <p style={{ fontSize: "0.85rem", color: "rgba(245,244,240,0.3)", fontWeight: 300, lineHeight: 1.7 }}>
        Upload your resume and enter a job description<br/>to generate AI-powered suggestions.
      </p>
    </div>
  );
}

// ── Reusable section block ──
function Section({ color, icon, label, content }) {
  return (
    <div style={{
      background: `${color}08`,
      border: `1px solid ${color}20`,
      borderRadius: 14,
      padding: "1rem 1.25rem",
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", marginBottom: "0.5rem" }}>
        <div style={{ width: 22, height: 22, borderRadius: 6, background: `${color}15`, border: `1px solid ${color}25`, display: "flex", alignItems: "center", justifyContent: "center" }}>
          {icon}
        </div>
        <span style={{ fontSize: "0.72rem", fontWeight: 500, letterSpacing: "0.07em", textTransform: "uppercase", color: `${color}CC` }}>{label}</span>
      </div>
      <p style={{ fontSize: "0.855rem", color: "rgba(245,244,240,0.65)", fontWeight: 300, lineHeight: 1.7 }}>{content}</p>
    </div>
  );
}