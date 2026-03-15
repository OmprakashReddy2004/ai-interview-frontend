import { useAudioAnalyzer } from "../../hooks/useAudioAnalyzer";

export default function RecordingOrb({ isListening, onStart, onStop }) {
  const { bars } = useAudioAnalyzer(isListening);

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "1.25rem", padding: "1.5rem" }}>

      <div style={{ position: "relative", width: 80, height: 80, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}
        onClick={isListening ? onStop : onStart}>
        {isListening && <>
          <div style={{ position: "absolute", width: 80, height: 80, borderRadius: "50%", border: "1px solid rgba(93,202,165,0.35)", animation: "orbPulse 1.8s ease-in-out infinite" }} />
          <div style={{ position: "absolute", width: 60, height: 60, borderRadius: "50%", border: "1px solid rgba(93,202,165,0.5)", animation: "orbPulse 1.5s ease-in-out infinite 0.3s" }} />
        </>}
        <div style={{
          width: 48, height: 48, borderRadius: "50%",
          background: isListening ? "#5DCAA5" : "rgba(123,92,245,0.2)",
          border: `1px solid ${isListening ? "rgba(93,202,165,0.6)" : "rgba(123,92,245,0.4)"}`,
          display: "flex", alignItems: "center", justifyContent: "center",
          transition: "all 0.3s",
        }}>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <rect x="7" y="2" width="6" height="10" rx="3" fill={isListening ? "white" : "#9B7CF7"}/>
            <path d="M4 10a6 6 0 0012 0" stroke={isListening ? "white" : "#9B7CF7"} strokeWidth="1.5" strokeLinecap="round"/>
            <path d="M10 16v2" stroke={isListening ? "white" : "#9B7CF7"} strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        </div>
      </div>

      {isListening && (
        <div style={{ display: "flex", gap: "3px", alignItems: "flex-end", height: 28 }}>
          {bars.map((h, i) => (
            <div key={i} style={{ width: 4, height: h, background: "#5DCAA5", borderRadius: 3, transition: "height 0.1s ease", opacity: 0.8 }} />
          ))}
        </div>
      )}

      <div style={{ textAlign: "center" }}>
        <div style={{ fontSize: "0.82rem", fontWeight: 500, color: isListening ? "#5DCAA5" : "rgba(245,244,240,0.5)", marginBottom: "0.4rem" }}>
          {isListening ? "Recording…" : "Tap to answer"}
        </div>
        {isListening && (
          <button onClick={onStop} style={{
            fontSize: "0.78rem", padding: "0.4rem 1.1rem", borderRadius: 100,
            border: "1px solid rgba(255,255,255,0.12)", background: "rgba(255,255,255,0.05)",
            color: "rgba(245,244,240,0.6)", cursor: "pointer",
            fontFamily: "'DM Sans', sans-serif", transition: "all 0.2s",
          }}>Done answering</button>
        )}
      </div>
    </div>
  );
}