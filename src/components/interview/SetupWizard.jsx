import { useState } from "react";

const TYPES = ["behavioural", "technical", "system design", "mixed"];
const DIFFICULTIES = ["easy", "mid", "hard", "FAANG"];
const COUNTS = [5, 10, 15, 20];
const TECH_STACKS = [
  "React", "Node.js", "Python", "Java", "Go",
  "TypeScript", "AWS", "System Design", "DSA", "SQL",
  "Docker", "GraphQL", "Other",
];

export default function SetupWizard({ onSubmit, defaultConfig }) {
  const [config, setConfig] = useState({ ...defaultConfig, techStack: defaultConfig.techStack || [] });
  const [customStack, setCustomStack] = useState("");
  const [showCustomInput, setShowCustomInput] = useState(false);

  const set = (k, v) => setConfig(c => ({ ...c, [k]: v }));

  const toggleStack = (stack) => {
    if (stack === "Other") {
      setShowCustomInput(s => !s);
      if (showCustomInput) setCustomStack("");
      return;
    }
    setConfig(c => ({
      ...c,
      techStack: c.techStack.includes(stack)
        ? c.techStack.filter(s => s !== stack)
        : [...c.techStack, stack],
    }));
  };

  const addCustomStack = () => {
    const val = customStack.trim();
    if (!val || config.techStack.includes(val)) return;
    setConfig(c => ({ ...c, techStack: [...c.techStack, val] }));
    setCustomStack("");
  };

  const removeStack = (stack) => {
    setConfig(c => ({ ...c, techStack: c.techStack.filter(s => s !== stack) }));
  };

  const clearAll = () => {
    set("techStack", []);
    setCustomStack("");
    setShowCustomInput(false);
  };

  const Pill = ({ label, active, onClick, multi }) => (
    <button onClick={onClick} style={{
      padding: "0.5rem 1.1rem", borderRadius: 100,
      border: `1px solid ${active ? "rgba(123,92,245,0.5)" : "rgba(255,255,255,0.09)"}`,
      background: active ? "rgba(123,92,245,0.15)" : "rgba(255,255,255,0.03)",
      color: active ? "#9B7CF7" : "rgba(245,244,240,0.55)",
      fontFamily: "'DM Sans', sans-serif", fontSize: "0.85rem", cursor: "pointer",
      transition: "all 0.2s", display: "flex", alignItems: "center", gap: "0.35rem",
    }}>
      {multi && active && (
        <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
          <path d="M2 5l2.5 2.5L8 3" stroke="#9B7CF7" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )}
      {label}
    </button>
  );

  const canSubmit = config.role.trim();

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>

      {/* Role */}
      <div>
        <div style={labelStyle}>Target role</div>
        <input
          value={config.role}
          onChange={e => set("role", e.target.value)}
          placeholder="e.g. Software Engineer, Product Manager…"
          style={inputStyle}
          onFocus={e => e.target.style.borderColor = "rgba(123,92,245,0.55)"}
          onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.09)"}
        />
      </div>

      {/* Tech stack */}
      <div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "0.65rem" }}>
          <div style={labelStyle}>
            Tech stack
            <span style={{ color: "rgba(245,244,240,0.25)", fontWeight: 300, textTransform: "none", letterSpacing: 0, marginLeft: "0.4rem" }}>
              (pick all that apply)
            </span>
          </div>
          {(config.techStack.length > 0 || showCustomInput) && (
            <button onClick={clearAll} style={{
              fontSize: "0.72rem", color: "rgba(245,244,240,0.3)", background: "none",
              border: "none", cursor: "pointer", fontFamily: "'DM Sans', sans-serif",
              transition: "color 0.2s", padding: 0,
            }}
              onMouseEnter={e => e.target.style.color = "#E24B4A"}
              onMouseLeave={e => e.target.style.color = "rgba(245,244,240,0.3)"}
            >
              Clear all
            </button>
          )}
        </div>

        {/* Preset pills */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
          {TECH_STACKS.map(s => (
            <Pill
              key={s}
              label={s}
              active={s === "Other" ? showCustomInput : config.techStack.includes(s)}
              onClick={() => toggleStack(s)}
              multi={s !== "Other"}
            />
          ))}
        </div>

        {/* Custom input — shown when "Other" is toggled */}
        {showCustomInput && (
          <div style={{ marginTop: "0.85rem", display: "flex", gap: "0.5rem", alignItems: "center" }}>
            <div style={{ position: "relative", flex: 1 }}>
              <input
                autoFocus
                value={customStack}
                onChange={e => setCustomStack(e.target.value)}
                onKeyDown={e => { if (e.key === "Enter") addCustomStack(); if (e.key === "Escape") { setShowCustomInput(false); setCustomStack(""); } }}
                placeholder="e.g. Rust, Kubernetes, Flutter…"
                style={{
                  ...inputStyle,
                  paddingLeft: "2.5rem",
                  borderColor: "rgba(123,92,245,0.4)",
                  background: "rgba(123,92,245,0.06)",
                }}
                onFocus={e => e.target.style.borderColor = "rgba(123,92,245,0.6)"}
                onBlur={e => e.target.style.borderColor = "rgba(123,92,245,0.4)"}
              />
              {/* pencil icon */}
              <svg style={{ position: "absolute", left: "0.9rem", top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }} width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M9.5 2.5l2 2L4 12H2v-2L9.5 2.5z" stroke="#9B7CF7" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <button
              onClick={addCustomStack}
              disabled={!customStack.trim()}
              style={{
                padding: "0.85rem 1.1rem", borderRadius: 12, border: "none", flexShrink: 0,
                background: customStack.trim() ? "rgba(123,92,245,0.25)" : "rgba(255,255,255,0.04)",
                color: customStack.trim() ? "#9B7CF7" : "rgba(245,244,240,0.2)",
                fontFamily: "'DM Sans', sans-serif", fontSize: "0.85rem", fontWeight: 500,
                cursor: customStack.trim() ? "pointer" : "not-allowed", transition: "all 0.2s",
              }}
            >
              Add →
            </button>
          </div>
        )}

        {/* Custom tags added by user */}
        {config.techStack.filter(s => !TECH_STACKS.slice(0, -1).includes(s)).length > 0 && (
          <div style={{ marginTop: "0.75rem", display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
            {config.techStack
              .filter(s => !TECH_STACKS.slice(0, -1).includes(s))
              .map(s => (
                <div key={s} style={{
                  display: "flex", alignItems: "center", gap: "0.35rem",
                  padding: "0.3rem 0.7rem 0.3rem 0.85rem", borderRadius: 100,
                  background: "rgba(93,202,165,0.1)", border: "1px solid rgba(93,202,165,0.25)",
                  fontSize: "0.78rem", color: "#5DCAA5",
                }}>
                  {s}
                  <button onClick={() => removeStack(s)} style={{
                    background: "none", border: "none", cursor: "pointer",
                    color: "rgba(93,202,165,0.6)", padding: 0, lineHeight: 1,
                    display: "flex", alignItems: "center", transition: "color 0.15s",
                  }}
                    onMouseEnter={e => e.currentTarget.style.color = "#E24B4A"}
                    onMouseLeave={e => e.currentTarget.style.color = "rgba(93,202,165,0.6)"}
                  >
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path d="M3 3l6 6M9 3l-6 6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
                    </svg>
                  </button>
                </div>
              ))}
          </div>
        )}

        {/* Selection summary */}
        {config.techStack.length > 0 && (
          <div style={{ marginTop: "0.75rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <div style={{ width: 5, height: 5, borderRadius: "50%", background: "#5DCAA5", flexShrink: 0 }} />
            <span style={{ fontSize: "0.75rem", color: "rgba(93,202,165,0.75)", fontWeight: 300 }}>
              {config.techStack.length} selected —{" "}
              {config.techStack.slice(0, 3).join(", ")}
              {config.techStack.length > 3 ? ` +${config.techStack.length - 3} more` : ""}
            </span>
          </div>
        )}
      </div>

      {/* Interview type */}
      <div>
        <div style={labelStyle}>Interview type</div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
          {TYPES.map(t => (
            <Pill key={t} label={t} active={config.type === t} onClick={() => set("type", t)} />
          ))}
        </div>
      </div>

      {/* Difficulty + Questions */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem" }}>
        <div>
          <div style={labelStyle}>Difficulty</div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
            {DIFFICULTIES.map(d => (
              <Pill key={d} label={d} active={config.difficulty === d} onClick={() => set("difficulty", d)} />
            ))}
          </div>
        </div>
        <div>
          <div style={labelStyle}>Questions</div>
          <div style={{ display: "flex", gap: "0.5rem" }}>
            {COUNTS.map(n => (
              <Pill key={n} label={String(n)} active={config.questionCount === n} onClick={() => set("questionCount", n)} />
            ))}
          </div>
        </div>
      </div>

      {/* Submit */}
      <button
        onClick={() => onSubmit(config)}
        disabled={!canSubmit}
        style={{
          padding: "0.95rem", borderRadius: 12, border: "none",
          background: canSubmit ? "linear-gradient(135deg, #7B5CF5, #3B8BEB)" : "rgba(255,255,255,0.06)",
          color: canSubmit ? "white" : "rgba(245,244,240,0.3)",
          fontFamily: "'DM Sans', sans-serif", fontSize: "0.95rem", fontWeight: 500,
          cursor: canSubmit ? "pointer" : "not-allowed", transition: "all 0.2s",
          position: "relative", overflow: "hidden",
        }}
        onMouseEnter={e => { if (canSubmit) e.currentTarget.style.opacity = "0.88"; }}
        onMouseLeave={e => { e.currentTarget.style.opacity = "1"; }}
      >
        Continue to mic check →
      </button>
    </div>
  );
}

const labelStyle = {
  fontSize: "0.72rem", fontWeight: 500, letterSpacing: "0.08em",
  textTransform: "uppercase", color: "rgba(245,244,240,0.35)",
  marginBottom: "0.65rem",
};

const inputStyle = {
  width: "100%", background: "rgba(255,255,255,0.04)",
  border: "1px solid rgba(255,255,255,0.09)",
  borderRadius: 12, padding: "0.85rem 1.1rem", color: "#F5F4F0",
  fontFamily: "'DM Sans', sans-serif", fontSize: "0.9rem", fontWeight: 300,
  outline: "none", boxSizing: "border-box", transition: "border-color 0.2s",
};