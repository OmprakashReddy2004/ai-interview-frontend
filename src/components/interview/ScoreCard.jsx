const AXES = [
  { key: "communication",  label: "Communication",   color: "#7B5CF5" },
  { key: "technicalDepth", label: "Technical depth",  color: "#3B8BEB" },
  { key: "structure",      label: "Structure",        color: "#5DCAA5" },
  { key: "confidence",     label: "Confidence",       color: "#F5A623" },
];

export default function ScoreCard({ scores }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))", gap: "0.75rem" }}>
      {AXES.map(({ key, label, color }) => (
        <div key={key} style={{
          background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.07)",
          borderRadius: 16, padding: "1.25rem",
        }}>
          <div style={{ fontSize: "0.72rem", color: "rgba(245,244,240,0.38)", marginBottom: "0.4rem", fontWeight: 300 }}>{label}</div>
          <div style={{ fontFamily: "'Syne', sans-serif", fontSize: "2rem", fontWeight: 800, color, lineHeight: 1, marginBottom: "0.6rem" }}>
            {scores[key] ?? "—"}
          </div>
          <div style={{ width: "100%", height: 3, background: "rgba(255,255,255,0.07)", borderRadius: 100 }}>
            <div style={{ width: `${(scores[key] ?? 0) * 10}%`, height: "100%", background: color, borderRadius: 100, transition: "width 0.8s ease" }} />
          </div>
        </div>
      ))}
    </div>
  );
}