import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SetupWizard from "../components/interview/SetupWizard";
import { useInterview } from "../context/InterviewContext";
import { generateQuestions } from "../services/interviewAI";
import {
    badgeStyle,
    cardStyle,
    globalCSS,
    gradientText,
    gridBg,
    h1Style,
    logoStyle,
    navStyle,
    pageStyle,
    subStyle,
    topAccent,
} from "../styles/interview";
export default function InterviewSetupPage() {
  const { config, setConfig, setQuestions } = useInterview();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (cfg) => {
    setConfig(cfg);
    setLoading(true);
    const qs = await generateQuestions(cfg);
    setQuestions(qs);
    setLoading(false);
    navigate("/interview/mic-check");
  };

  return (
    <div style={pageStyle}>
      <style>{globalCSS}</style>
      <div style={{ position: "fixed", top: "-15%", left: "50%", transform: "translateX(-50%)", width: 700, height: 600, background: "radial-gradient(ellipse, rgba(123,92,245,0.12) 0%, transparent 65%)", pointerEvents: "none" }} />
      <div style={gridBg} />

      <nav style={navStyle}>
        <div style={logoStyle}>InterviewAI</div>
        <div style={{ fontSize: "0.78rem", color: "rgba(245,244,240,0.28)", letterSpacing: "0.06em" }}>Step 1 of 3 — Setup</div>
      </nav>

      <main style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: "8rem 5vw 4rem", position: "relative", zIndex: 1 }}>
        <div style={{ width: "100%", maxWidth: 560 }}>
          <div style={{ marginBottom: "2.5rem" }}>
            <div style={badgeStyle}>Configure your session</div>
            <h1 style={h1Style}>Set up your<br/><span style={gradientText}>mock interview</span></h1>
            <p style={subStyle}>Tell us the role, company, and format — we'll generate the perfect question set.</p>
          </div>

          <div style={cardStyle}>
            <div style={topAccent} />
            {loading
              ? <div style={{ textAlign: "center", padding: "3rem", color: "rgba(245,244,240,0.4)" }}>
                  <div style={{ fontFamily: "'Syne', sans-serif", fontSize: "1.1rem", marginBottom: "0.5rem" }}>Generating questions…</div>
                  <div style={{ fontSize: "0.85rem", fontWeight: 300 }}>Tailoring {config.questionCount} questions for {config.role}</div>
                </div>
              : <SetupWizard onSubmit={handleSubmit} defaultConfig={config} />
            }
          </div>
        </div>
      </main>
    </div>
  );
}