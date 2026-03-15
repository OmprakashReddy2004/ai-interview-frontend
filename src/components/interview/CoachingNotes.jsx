export default function CoachingNotes({ notes }) {
  if (!notes?.length) return null;
  return (
    <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 20, padding: "1.5rem" }}>
      <div style={{ fontSize: "0.72rem", fontWeight: 500, letterSpacing: "0.08em", textTransform: "uppercase", color: "rgba(245,244,240,0.35)", marginBottom: "1rem" }}>
        AI coaching notes
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "0.85rem" }}>
        {notes.map((n, i) => (
          <div key={i} style={{ display: "flex", gap: "0.75rem", alignItems: "flex-start" }}>
            <div style={{ width: 7, height: 7, borderRadius: "50%", flexShrink: 0, marginTop: 6, background: n.type === "positive" ? "#5DCAA5" : "#F5A623" }} />
            <p style={{ fontSize: "0.875rem", color: "rgba(245,244,240,0.65)", fontWeight: 300, lineHeight: 1.65, margin: 0 }}>{n.note}</p>
          </div>
        ))}
      </div>
    </div>
  );
}