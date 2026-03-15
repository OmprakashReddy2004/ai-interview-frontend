const statusLabel = (score) => {
  if (score >= 8.5) return { label: "Strong",     bg: "rgba(93,202,165,0.12)",  border: "rgba(93,202,165,0.25)",  text: "#5DCAA5" };
  if (score >= 7)   return { label: "Good",        bg: "rgba(59,139,235,0.12)",  border: "rgba(59,139,235,0.25)",  text: "#5BA8F5" };
  if (score >= 5)   return { label: "Needs work",  bg: "rgba(245,163,35,0.12)",  border: "rgba(245,163,35,0.25)",  text: "#F5A623" };
  return               { label: "Weak",        bg: "rgba(226,75,74,0.12)",   border: "rgba(226,75,74,0.25)",   text: "#E24B4A" };
};

export default function DebriefBreakdown({ answers }) {
  return (
    <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 20, overflow: "hidden" }}>
      <div style={{ padding: "0.85rem 1.5rem", borderBottom: "1px solid rgba(255,255,255,0.07)", fontSize: "0.82rem", fontWeight: 500, color: "rgba(245,244,240,0.5)", letterSpacing: "0.06em", textTransform: "uppercase" }}>
        Per-question breakdown
      </div>
      {answers.map((a, i) => {
        const s = statusLabel(a.score?.overall ?? 5);
        return (
          <div key={i} style={{
            display: "grid", gridTemplateColumns: "36px 1fr 52px 100px",
            gap: "1rem", alignItems: "center", padding: "0.9rem 1.5rem",
            borderBottom: i < answers.length - 1 ? "1px solid rgba(255,255,255,0.05)" : "none",
            transition: "background 0.2s",
          }}
            onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.025)"}
            onMouseLeave={e => e.currentTarget.style.background = "transparent"}
          >
            <span style={{ fontSize: "0.78rem", color: "rgba(245,244,240,0.3)", fontFamily: "'Syne', sans-serif", fontWeight: 700 }}>Q{i + 1}</span>
            <span style={{ fontSize: "0.875rem", color: "rgba(245,244,240,0.8)", fontWeight: 300, lineHeight: 1.4 }}>{a.question}</span>
            <span style={{ fontFamily: "'Syne', sans-serif", fontSize: "1.1rem", fontWeight: 700, color: s.text, textAlign: "center" }}>{a.score?.overall ?? "—"}</span>
            <span style={{ fontSize: "0.72rem", padding: "0.25rem 0.7rem", borderRadius: 100, background: s.bg, border: `1px solid ${s.border}`, color: s.text, textAlign: "center", fontWeight: 500 }}>{s.label}</span>
          </div>
        );
      })}
    </div>
  );
}