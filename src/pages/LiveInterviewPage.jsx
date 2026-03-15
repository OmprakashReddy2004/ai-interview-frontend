import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import LiveTranscript from "../components/interview/LiveTranscript";
import QuestionCard from "../components/interview/QuestionCard";
import RecordingOrb from "../components/interview/RecordingOrb";
import { useInterview } from "../context/InterviewContext";
import { useInterviewSession } from "../hooks/useInterviewSession";
import { useSpeechRecognition } from "../hooks/useSpeechRecognition";
import {
    globalCSS,
    gridBg,
    logoStyle,
    navStyle,
    pageStyle
} from "../styles/interview";
export default function LiveInterviewPage() {
  const navigate = useNavigate();
  const { config } = useInterview();
  const { submitAnswer, isScoring, currentQuestion, currentIndex, total } = useInterviewSession();
  const { transcript, isListening, start, stop } = useSpeechRecognition();
  const [timeLeft, setTimeLeft] = useState(120);
  const [hintUsed, setHintUsed] = useState(false);

  useEffect(() => {
    setTimeLeft(120);
    setHintUsed(false);
  }, [currentIndex]);

  useEffect(() => {
    if (!isListening) return;
    const t = setInterval(() => setTimeLeft(s => {
      if (s <= 1) { handleDone(); return 0; }
      return s - 1;
    }), 1000);
    return () => clearInterval(t);
  }, [isListening]);

  const handleDone = async () => {
    stop();
    if (!transcript.trim()) return;
    const result = await submitAnswer(transcript);
    if (result === "debrief") navigate("/interview/debrief");
  };

  const progress = (currentIndex / total) * 100;

  if (!currentQuestion) return (
    <div style={{ ...pageStyle, alignItems: "center", justifyContent: "center" }}>
      <style>{globalCSS}</style>
      <div style={{ color: "rgba(245,244,240,0.4)", fontFamily: "'Syne', sans-serif" }}>Loading questions…</div>
    </div>
  );

  return (
    <div style={pageStyle}>
      <style>{globalCSS}</style>
      <div style={{ position: "fixed", top: "-10%", left: "50%", transform: "translateX(-50%)", width: 700, height: 500, background: "radial-gradient(ellipse, rgba(93,202,165,0.07) 0%, transparent 65%)", pointerEvents: "none" }} />
      <div style={gridBg} />

      <nav style={navStyle}>
        <div style={logoStyle}>InterviewAI</div>
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          {isListening && <div style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
            <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#E24B4A", animation: "orbPulse 1s infinite" }} />
            <span style={{ fontSize: "0.78rem", color: "#E24B4A", fontWeight: 500 }}>Live</span>
          </div>}
          <span style={{ fontSize: "0.78rem", color: "rgba(245,244,240,0.3)" }}>Q{currentIndex + 1} of {total}</span>
          <button onClick={() => navigate("/interview/debrief")} style={{ fontSize: "0.78rem", padding: "0.3rem 0.85rem", borderRadius: 100, border: "1px solid rgba(226,75,74,0.3)", background: "rgba(226,75,74,0.08)", color: "rgba(226,75,74,0.7)", cursor: "pointer", fontFamily: "'DM Sans', sans-serif" }}>End session</button>
        </div>
      </nav>

      <div style={{ position: "fixed", top: 64, left: 0, right: 0, height: 2, background: "rgba(255,255,255,0.06)", zIndex: 10 }}>
        <div style={{ width: `${progress}%`, height: "100%", background: "linear-gradient(90deg, #7B5CF5, #3B8BEB)", transition: "width 0.5s ease" }} />
      </div>

      <main style={{ flex: 1, display: "flex", flexDirection: "column", padding: "6rem 5vw 2rem", gap: "1.25rem", maxWidth: 860, margin: "0 auto", width: "100%", position: "relative", zIndex: 1 }}>

        <QuestionCard
          question={currentQuestion}
          index={currentIndex}
          total={total}
          timeLeft={timeLeft}
          onHint={() => setHintUsed(true)}
          hintUsed={hintUsed}
        />

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1.6fr", gap: "1.25rem" }}>
          <div style={{ background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 20, padding: "1.5rem" }}>
            <RecordingOrb isListening={isListening} onStart={start} onStop={handleDone} />
          </div>
          <div style={{ background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 20, padding: "1.5rem" }}>
            <LiveTranscript transcript={transcript} />
          </div>
        </div>

        {isScoring && (
          <div style={{ textAlign: "center", padding: "1rem", fontSize: "0.85rem", color: "rgba(245,244,240,0.35)", fontWeight: 300 }}>
            Scoring your answer…
          </div>
        )}
      </main>
    </div>
  );
}