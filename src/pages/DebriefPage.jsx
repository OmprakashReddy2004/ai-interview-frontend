import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import CoachingNotes from "../components/interview/CoachingNotes";
import DebriefBreakdown from "../components/interview/DebriefBreakdown";
import ScoreCard from "../components/interview/ScoreCard";
import { useInterview } from "../context/InterviewContext";
import { generateCoachingNotes } from "../services/interviewAI";
import {
    globalCSS,
    gridBg,
    logoStyle,
    navStyle,
    pageStyle
} from "../styles/interview";
export default function DebriefPage() {
  const { scores, answers, config } = useInterview();
  const [coaching, setCoaching] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (answers.length) generateCoachingNotes(answers).then(setCoaching);  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!scores) return (
    <div style={{ ...pageStyle, alignItems: "center", justifyContent: "center" }}>
      <style>{globalCSS}</style>
      <div style={{ color: "rgba(245,244,240,0.4)", fontFamily: "'Syne', sans-serif" }}>No session data found.</div>
      <Link to="/interview/setup" style={{ color: "#9B7CF7", marginTop: "1rem", fontSize: "0.875rem" }}>Start a new session</Link>
    </div>
  );

  return (
    <div style={pageStyle}>
      <style>{globalCSS}</style>
      <div style={{ position: "fixed", top: "-10%", left: "50%", transform: "translateX(-50%)", width: 700, height: 500, background: "radial-gradient(ellipse, rgba(59,139,235,0.1) 0%, transparent 65%)", pointerEvents: "none" }} />
      <div style={gridBg} />

      <nav style={navStyle}>
        <div style={logoStyle}>InterviewAI</div>
        <div style={{ display: "flex", gap: "0.75rem" }}>
          <button style={{ fontSize: "0.82rem", padding: "0.4rem 1rem", borderRadius: 100, border: "1px solid rgba(255,255,255,0.09)", background: "none", color: "rgba(245,244,240,0.5)", cursor: "pointer", fontFamily: "'DM Sans', sans-serif" }}>Share results</button>
          <button onClick={() => navigate("/interview/setup")} style={{ fontSize: "0.82rem", padding: "0.4rem 1rem", borderRadius: 100, border: "1px solid rgba(59,139,235,0.4)", background: "rgba(59,139,235,0.1)", color: "#5BA8F5", cursor: "pointer", fontFamily: "'DM Sans', sans-serif", fontWeight: 500 }}>
            Retry →
          </button>
        </div>
      </nav>

      <main style={{ flex: 1, padding: "7rem 5vw 4rem", maxWidth: 860, margin: "0 auto", width: "100%", position: "relative", zIndex: 1, display: "flex", flexDirection: "column", gap: "1.5rem" }}>

        <div style={{ marginBottom: "0.5rem" }}>
          <div style={{ fontSize: "0.72rem", fontWeight: 500, letterSpacing: "0.08em", textTransform: "uppercase", color: "rgba(245,244,240,0.3)", marginBottom: "0.5rem" }}>
            Session complete · {config.type} · {config.company || "General"} · {config.difficulty}
          </div>
          <h1 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "clamp(1.8rem, 4vw, 2.8rem)", letterSpacing: "-0.04em", lineHeight: 1.1 }}>
            Overall score: <span style={{ background: "linear-gradient(135deg, #9B7CF7, #5BA8F5)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>{scores.overall}/10</span>
          </h1>
        </div>

        <ScoreCard scores={scores} />
        <DebriefBreakdown answers={answers} />
        <CoachingNotes notes={coaching} />

      </main>
    </div>
  );
}