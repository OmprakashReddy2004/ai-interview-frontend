import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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
    pageStyle,
} from "../styles/interview";

export default function LiveInterviewPage() {
  const navigate = useNavigate();
  useInterview();
  const { submitAnswer, isScoring, currentQuestion, currentIndex, total } = useInterviewSession();
  const { transcript, isListening, start, stop } = useSpeechRecognition();
  const [timeLeft, setTimeLeft] = useState(120);
  const [hintUsed, setHintUsed] = useState(false);
  const [editedTranscript, setEditedTranscript] = useState("");

  useEffect(() => {
    setTimeLeft(120);
    setHintUsed(false);
    setEditedTranscript("");
  }, [currentIndex]);

  useEffect(() => {
    setEditedTranscript(transcript);
  }, [transcript]);

  const handleDone = useCallback(async () => {
    stop();
    if (!editedTranscript.trim()) return;
    const result = await submitAnswer(editedTranscript);
    if (result === "debrief") navigate("/interview/debrief");
  }, [stop, editedTranscript, submitAnswer, navigate]);

  useEffect(() => {
    if (!isListening) return;
    const t = setInterval(() => setTimeLeft(s => {
      if (s <= 1) { handleDone(); return 0; }
      return s - 1;
    }), 1000);
    return () => clearInterval(t);
  }, [isListening, handleDone]);

  const progress = (currentIndex / total) * 100;

  if (!currentQuestion) return (
    <div style={{ ...pageStyle, alignItems: "center", justifyContent: "center" }}>
      <style>{globalCSS}</style>
      <div style={{ color: "rgba(245,244,240,0.4)", fontFamily: "'Syne', sans-serif" }}>
        Loading questions…
      </div>
    </div>
  );

  return (
    <div style={pageStyle}>
      <style>{globalCSS}</style>
      <div style={{ position: "fixed", top: "-10%", left: "50%", transform: "translateX(-50%)", width: 700, height: 500, background: "radial-gradient(ellipse, rgba(93,202,165,0.07) 0%, transparent 65%)", pointerEvents: "none" }} />
      <div style={gridBg} />

      {/* NAV */}
      <nav style={navStyle}>
        <div style={logoStyle}>InterviewAI</div>
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          {isListening && (
            <div style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
              <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#E24B4A", animation: "orbPulse 1s infinite" }} />
              <span style={{ fontSize: "0.78rem", color: "#E24B4A", fontWeight: 500 }}>Live</span>
            </div>
          )}
          <span style={{ fontSize: "0.78rem", color: "rgba(245,244,240,0.3)" }}>
            Q{currentIndex + 1} of {total}
          </span>
          <button
            onClick={() => navigate("/interview/debrief")}
            style={{ fontSize: "0.78rem", padding: "0.3rem 0.85rem", borderRadius: 100, border: "1px solid rgba(226,75,74,0.3)", background: "rgba(226,75,74,0.08)", color: "rgba(226,75,74,0.7)", cursor: "pointer", fontFamily: "'DM Sans', sans-serif" }}
          >
            End session
          </button>
        </div>
      </nav>

      {/* Progress bar */}
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

          {/* Recording orb */}
          <div style={{ background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 20, padding: "1.5rem" }}>
            <RecordingOrb isListening={isListening} onStart={start} onStop={handleDone} />
          </div>

          {/* Editable transcript */}
          <div style={{ background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 20, padding: "1.5rem", display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div style={{ fontSize: "0.72rem", fontWeight: 500, letterSpacing: "0.08em", textTransform: "uppercase", color: "rgba(245,244,240,0.35)" }}>
                Your answer
              </div>
              {editedTranscript && (
                <div style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                    <path d="M1 5l3 3 5-5" stroke="#9B7CF7" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span style={{ fontSize: "0.7rem", color: "rgba(155,124,247,0.7)", fontWeight: 300 }}>editable</span>
                </div>
              )}
            </div>

            <textarea
              value={editedTranscript}
              onChange={e => setEditedTranscript(e.target.value)}
              placeholder={isListening ? "Speaking… words will appear here" : "Tap the mic to start, or type your answer directly…"}
              style={{
                flex: 1,
                minHeight: 120,
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: 12,
                padding: "0.85rem 1rem",
                color: "#F5F4F0",
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "0.875rem",
                fontWeight: 300,
                lineHeight: 1.7,
                resize: "none",
                outline: "none",
                transition: "border-color 0.2s",
              }}
              onFocus={e => e.target.style.borderColor = "rgba(123,92,245,0.4)"}
              onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.08)"}
            />

            {/* Bottom row */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "0.5rem" }}>
              <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
                {editedTranscript.split(" ").filter(Boolean).length > 0 && (
                  <span style={{ fontSize: "0.7rem", padding: "0.2rem 0.65rem", borderRadius: 100, background: "rgba(93,202,165,0.1)", border: "1px solid rgba(93,202,165,0.2)", color: "#5DCAA5" }}>
                    {editedTranscript.split(" ").filter(Boolean).length} words
                  </span>
                )}
                {editedTranscript.split(" ").filter(Boolean).length < 20 && editedTranscript.length > 0 && (
                  <span style={{ fontSize: "0.7rem", padding: "0.2rem 0.65rem", borderRadius: 100, background: "rgba(245,163,35,0.1)", border: "1px solid rgba(245,163,35,0.2)", color: "#F5A623" }}>
                    Add more detail
                  </span>
                )}
              </div>

              {/* Submit button */}
              {editedTranscript.trim() && !isListening && (
                <button
                  onClick={handleDone}
                  disabled={isScoring}
                  style={{
                    padding: "0.5rem 1.25rem",
                    borderRadius: 100,
                    border: "none",
                    background: isScoring ? "rgba(255,255,255,0.06)" : "linear-gradient(135deg, #7B5CF5, #3B8BEB)",
                    color: isScoring ? "rgba(245,244,240,0.3)" : "white",
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "0.82rem",
                    fontWeight: 500,
                    cursor: isScoring ? "not-allowed" : "pointer",
                    transition: "all 0.2s",
                  }}
                >
                  {isScoring ? "Scoring…" : "Submit answer →"}
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Scoring indicator */}
        {isScoring && (
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0.75rem", padding: "1rem", background: "rgba(123,92,245,0.06)", border: "1px solid rgba(123,92,245,0.15)", borderRadius: 14 }}>
            <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#7B5CF5", animation: "orbPulse 1s infinite" }} />
            <span style={{ fontSize: "0.85rem", color: "rgba(245,244,240,0.5)", fontWeight: 300 }}>
              AI is scoring your answer…
            </span>
          </div>
        )}
      </main>
    </div>
  );
}