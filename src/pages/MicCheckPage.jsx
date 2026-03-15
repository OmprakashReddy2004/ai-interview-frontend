import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAudioAnalyzer } from "../hooks/useAudioAnalyzer";
import {
    badgeStyle,
    cardStyle,
    globalCSS,
    gridBg,
    logoStyle,
    navStyle,
    pageStyle,
    subStyle,
    topAccent
} from "../styles/interview";
export default function MicCheckPage() {
  const [listening, setListening] = useState(false);
  const [passed, setPassed] = useState(false);
  const { bars, volume } = useAudioAnalyzer(listening);
  const navigate = useNavigate();

  useEffect(() => {
    const t = setTimeout(() => setListening(true), 800);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (volume > 18 && !passed) setPassed(true);
  }, [volume, passed]);

  return (
    <div style={pageStyle}>
      <style>{globalCSS}</style>
      <div style={{ position: "fixed", top: "-10%", left: "50%", transform: "translateX(-50%)", width: 600, height: 500, background: "radial-gradient(ellipse, rgba(93,202,165,0.1) 0%, transparent 65%)", pointerEvents: "none" }} />
      <div style={gridBg} />

      <nav style={navStyle}>
        <div style={logoStyle}>InterviewAI</div>
        <div style={{ fontSize: "0.78rem", color: "rgba(245,244,240,0.28)", letterSpacing: "0.06em" }}>Step 2 of 3 — Mic check</div>
      </nav>

      <main style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: "8rem 5vw 4rem", position: "relative", zIndex: 1 }}>
        <div style={{ width: "100%", maxWidth: 480, textAlign: "center" }}>
          <div style={cardStyle}>
            <div style={{ ...topAccent, background: "linear-gradient(90deg, transparent, rgba(93,202,165,0.5), transparent)" }} />

            <div style={{ marginBottom: "2rem" }}>
              <div style={{ ...badgeStyle, background: "rgba(93,202,165,0.1)", border: "1px solid rgba(93,202,165,0.3)", color: "#5DCAA5" }}>Microphone test</div>
              <h2 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "1.6rem", letterSpacing: "-0.03em", marginBottom: "0.5rem" }}>Say something to test your mic</h2>
              <p style={subStyle}>We need microphone access to hear your answers. Speak a few words to continue.</p>
            </div>

            <div style={{ display: "flex", gap: "4px", alignItems: "flex-end", height: 48, justifyContent: "center", margin: "1.5rem 0" }}>
              {bars.map((h, i) => (
                <div key={i} style={{ width: 5, height: h + 4, background: passed ? "#5DCAA5" : "rgba(123,92,245,0.6)", borderRadius: 4, transition: "height 0.1s ease, background 0.4s" }} />
              ))}
            </div>

            <div style={{ marginBottom: "1.5rem", fontSize: "0.875rem", color: passed ? "#5DCAA5" : "rgba(245,244,240,0.38)", fontWeight: passed ? 500 : 300, transition: "color 0.4s" }}>
              {passed ? "✓ Mic detected — you're good to go" : listening ? "Listening for your voice…" : "Requesting microphone access…"}
            </div>

            <button
              onClick={() => navigate("/interview/live")}
              disabled={!passed}
              style={{
                width: "100%", padding: "0.95rem", borderRadius: 12, border: "none",
                background: passed ? "linear-gradient(135deg, #7B5CF5, #3B8BEB)" : "rgba(255,255,255,0.05)",
                color: passed ? "white" : "rgba(245,244,240,0.2)",
                fontFamily: "'DM Sans', sans-serif", fontSize: "0.95rem", fontWeight: 500,
                cursor: passed ? "pointer" : "not-allowed", transition: "all 0.3s",
              }}
            >
              {passed ? "Start interview →" : "Waiting for audio…"}
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}