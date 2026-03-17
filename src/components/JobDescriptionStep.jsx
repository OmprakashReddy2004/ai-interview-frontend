export default function JobDescriptionStep({ jobDescription, setJobDescription }) {
  const minLength = 50;
  const currentLength = jobDescription.length;
  const isReady = currentLength >= minLength;
  const progress = Math.min((currentLength / minLength) * 100, 100);

  return (
    <div style={{ width: "100%" }}>

      {/* Header */}
      <div style={{ marginBottom: "1.25rem" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.4rem" }}>
          <div style={{
            width: 28, height: 28, borderRadius: 8,
            background: "rgba(59,139,235,0.1)",
            border: "1px solid rgba(59,139,235,0.2)",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
              <rect x="1" y="1" width="11" height="11" rx="2" stroke="#5BA8F5" strokeWidth="1.2"/>
              <path d="M3 5h7M3 7h5M3 9h3" stroke="#5BA8F5" strokeWidth="1.2" strokeLinecap="round"/>
            </svg>
          </div>
          <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: "0.95rem", letterSpacing: "-0.02em" }}>
            Job Description
          </span>
        </div>
        <p style={{ fontSize: "0.8rem", color: "rgba(245,244,240,0.35)", fontWeight: 300, lineHeight: 1.6 }}>
          Paste the full job description. The more detail, the better the match analysis.
        </p>
      </div>

      {/* Textarea */}
      <div style={{ position: "relative" }}>
        <textarea
          id="job-desc"
          rows={10}
          value={jobDescription}
          onChange={e => setJobDescription(e.target.value)}
          placeholder="e.g., Senior Frontend Developer: 5+ years of React experience, strong grasp of state management (Redux/Zustand), proven experience with TypeScript, ability to work in a fast-paced startup environment..."
          style={{
            width: "100%",
            background: "rgba(255,255,255,0.03)",
            border: `1px solid ${isReady ? "rgba(93,202,165,0.35)" : "rgba(255,255,255,0.09)"}`,
            borderRadius: 14,
            padding: "1rem 1.1rem",
            color: "#F5F4F0",
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "0.875rem",
            fontWeight: 300,
            lineHeight: 1.7,
            outline: "none",
            resize: "vertical",
            boxSizing: "border-box",
            transition: "border-color 0.25s, background 0.25s",
            minHeight: 200,
          }}
          onFocus={e => {
            if (!isReady) e.target.style.borderColor = "rgba(123,92,245,0.5)";
            e.target.style.background = "rgba(123,92,245,0.03)";
          }}
          onBlur={e => {
            e.target.style.borderColor = isReady ? "rgba(93,202,165,0.35)" : "rgba(255,255,255,0.09)";
            e.target.style.background = "rgba(255,255,255,0.03)";
          }}
        />
      </div>

      {/* Progress bar + counter */}
      <div style={{ marginTop: "0.75rem" }}>
        <div style={{ height: 3, background: "rgba(255,255,255,0.06)", borderRadius: 100, overflow: "hidden", marginBottom: "0.5rem" }}>
          <div style={{
            height: "100%",
            borderRadius: 100,
            width: `${progress}%`,
            background: isReady
              ? "linear-gradient(90deg, #5DCAA5, #3B8BEB)"
              : "linear-gradient(90deg, #7B5CF5, #5BA8F5)",
            transition: "width 0.3s ease, background 0.3s ease",
          }} />
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontSize: "0.72rem", color: "rgba(245,244,240,0.3)", fontWeight: 300 }}>
            Minimum 50 characters required
          </span>
          <span style={{
            fontSize: "0.72rem",
            fontWeight: 500,
            color: isReady ? "#5DCAA5" : "rgba(245,244,240,0.35)",
            display: "flex", alignItems: "center", gap: "0.3rem",
            transition: "color 0.3s",
          }}>
            {isReady && (
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                <path d="M1.5 5l2.5 2.5L8.5 2" stroke="#5DCAA5" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            )}
            {currentLength} / {minLength}+ chars
          </span>
        </div>
      </div>
    </div>
  );
}