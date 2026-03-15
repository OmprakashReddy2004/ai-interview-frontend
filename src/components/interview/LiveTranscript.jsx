export default function LiveTranscript({ transcript }) {
  const fillers = ["um", "uh", "so,", "like,", "you know", "basically", "actually", "literally"];
  const goodPhrases = ["for example", "specifically", "the reason", "i ensured", "i led", "we achieved", "as a result", "i prioritized"];

  const fillerCount = fillers.filter(f => transcript.toLowerCase().includes(f)).reduce((acc, f) => {
    const matches = transcript.toLowerCase().split(f).length - 1;
    return acc + matches;
  }, 0);

  const annotated = transcript.split(/(\s+)/).map((word, i) => {
    const w = word.toLowerCase().replace(/[^a-z ]/g, "");
    if (fillers.some(f => f === w || f === w + ",")) {
      return <mark key={i} style={{ background: "rgba(245,163,35,0.18)", color: "#F5A623", borderRadius: 3, padding: "0 2px" }}>{word}</mark>;
    }
    if (goodPhrases.some(p => transcript.toLowerCase().includes(p) && transcript.toLowerCase().indexOf(p) === transcript.toLowerCase().indexOf(word.toLowerCase()))) {
      return <mark key={i} style={{ background: "rgba(93,202,165,0.15)", color: "#5DCAA5", borderRadius: 3, padding: "0 2px" }}>{word}</mark>;
    }
    return <span key={i}>{word}</span>;
  });

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", height: "100%" }}>
      <div style={{ fontSize: "0.72rem", fontWeight: 500, letterSpacing: "0.08em", textTransform: "uppercase", color: "rgba(245,244,240,0.35)" }}>
        Live transcript
      </div>

      <div style={{ flex: 1, fontSize: "0.875rem", lineHeight: 1.7, color: "rgba(245,244,240,0.8)", fontWeight: 300, minHeight: 80 }}>
        {transcript ? annotated : (
          <span style={{ color: "rgba(245,244,240,0.2)", fontStyle: "italic" }}>Your words will appear here…</span>
        )}
        {transcript && <span style={{ display: "inline-block", width: 8, height: 13, background: "rgba(245,244,240,0.4)", borderRadius: 1, verticalAlign: "middle", marginLeft: 2, animation: "orbPulse 0.8s infinite" }} />}
      </div>

      <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", marginTop: "auto" }}>
        {fillerCount > 0 && (
          <span style={{ fontSize: "0.7rem", padding: "0.2rem 0.65rem", borderRadius: 100, background: "rgba(245,163,35,0.12)", border: "1px solid rgba(245,163,35,0.25)", color: "#F5A623" }}>
            {fillerCount} filler{fillerCount > 1 ? "s" : ""}
          </span>
        )}
        {transcript.length > 100 && (
          <span style={{ fontSize: "0.7rem", padding: "0.2rem 0.65rem", borderRadius: 100, background: "rgba(93,202,165,0.1)", border: "1px solid rgba(93,202,165,0.2)", color: "#5DCAA5" }}>
            Good length
          </span>
        )}
      </div>
    </div>
  );
}