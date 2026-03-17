import { useEffect } from "react";

const TYPE_COLORS = {
  behavioural: { bg: "rgba(59,139,235,0.12)", border: "rgba(59,139,235,0.3)", text: "#5BA8F5" },
  technical:   { bg: "rgba(123,92,245,0.12)", border: "rgba(123,92,245,0.3)", text: "#9B7CF7" },
  "system design": { bg: "rgba(93,202,165,0.12)", border: "rgba(93,202,165,0.3)", text: "#5DCAA5" },
  mixed:       { bg: "rgba(245,163,35,0.12)",  border: "rgba(245,163,35,0.3)",  text: "#F5A623" },
};

export default function QuestionCard({ question, index, total, timeLeft, onHint, hintUsed }) {
  const colors = TYPE_COLORS[question?.type] || TYPE_COLORS.mixed;

  useEffect(() => {
    if (!question?.question) return;
    const u = new SpeechSynthesisUtterance(question.question);
    u.rate = 0.92;
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(u);
   
    return () => window.speechSynthesis.cancel();  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [question?.id]);

  const mins = String(Math.floor(timeLeft / 60)).padStart(2, "0");
  const secs = String(timeLeft % 60).padStart(2, "0");
  const pct = timeLeft / 120;

  return (
    <div style={{
      background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.08)",
      borderRadius: 20, padding: "1.75rem", position: "relative", overflow: "hidden",
    }}>
      <div style={{ position: "absolute", top: 0, left: "15%", right: "15%", height: 1, background: "linear-gradient(90deg, transparent, rgba(123,92,245,0.5), transparent)" }} />

      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1rem" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
          <span style={{ fontSize: "0.72rem", fontWeight: 500, letterSpacing: "0.08em", textTransform: "uppercase", color: "rgba(245,244,240,0.35)" }}>
            Question {index + 1} of {total}
          </span>
          <span style={{ fontSize: "0.7rem", padding: "0.18rem 0.65rem", borderRadius: 100, background: colors.bg, border: `1px solid ${colors.border}`, color: colors.text, fontWeight: 500 }}>
            {question?.type}
          </span>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <div style={{ width: 36, height: 36, borderRadius: "50%", position: "relative", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <svg width="36" height="36" style={{ position: "absolute", top: 0, left: 0, transform: "rotate(-90deg)" }}>
              <circle cx="18" cy="18" r="14" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="2.5"/>
              <circle cx="18" cy="18" r="14" fill="none" stroke={pct > 0.3 ? "#5DCAA5" : "#E24B4A"} strokeWidth="2.5"
                strokeDasharray={`${2 * Math.PI * 14}`} strokeDashoffset={`${2 * Math.PI * 14 * (1 - pct)}`}
                style={{ transition: "stroke-dashoffset 1s linear, stroke 0.3s" }}/>
            </svg>
            <span style={{ fontSize: "0.65rem", fontWeight: 500, color: pct > 0.3 ? "#5DCAA5" : "#E24B4A", zIndex: 1 }}>{mins}:{secs}</span>
          </div>
        </div>
      </div>

      <p style={{ fontSize: "1.05rem", fontWeight: 400, lineHeight: 1.65, color: "#F5F4F0", margin: "0 0 1.25rem" }}>
        {question?.question}
      </p>

      <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
        {question?.type === "behavioural" && (
          <span style={{ fontSize: "0.72rem", color: "rgba(245,244,240,0.3)", fontWeight: 300 }}>STAR method recommended</span>
        )}
        {!hintUsed && (
          <button onClick={onHint} style={{
            marginLeft: "auto", fontSize: "0.78rem", padding: "0.3rem 0.85rem", borderRadius: 100,
            border: "1px solid rgba(255,255,255,0.09)", background: "none",
            color: "rgba(245,244,240,0.4)", cursor: "pointer", transition: "all 0.2s",
            fontFamily: "'DM Sans', sans-serif",
          }}>Hint (−1 pt)</button>
        )}
        {hintUsed && question?.hint && (
          <div style={{ marginLeft: "auto", fontSize: "0.78rem", color: "rgba(245,163,35,0.8)", fontWeight: 300 }}>
            💡 {question.hint}
          </div>
        )}
      </div>
    </div>
  );
}