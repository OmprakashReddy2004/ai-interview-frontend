import { useCallback, useRef, useState } from 'react';

export default function ResumeUploadStep({ setResumeFile, resumeFile }) {
  const fileInputRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleFileChange = useCallback((files) => {
    if (files && files.length > 0) {
      const file = files[0];
      if (file.type === 'application/pdf' || file.type.includes('word')) {
        setResumeFile(file);
      } else {
        alert("Please upload a PDF or DOCX file.");
        setResumeFile(null);
      }
    }
  }, [setResumeFile]);

  const handleDragOver  = (e) => { e.preventDefault(); setIsDragging(true); };
  const handleDragLeave = (e) => { e.preventDefault(); setIsDragging(false); };
  const handleDrop      = (e) => { e.preventDefault(); setIsDragging(false); handleFileChange(e.dataTransfer.files); };

  // ── Uploaded state ──────────────────────────────────────────────
  if (resumeFile) {
    const ext = resumeFile.name.split('.').pop().toUpperCase();
    const kb  = Math.round(resumeFile.size / 1024);

    return (
      <div style={{
        width: "100%",
        background: "rgba(93,202,165,0.06)",
        border: "1px solid rgba(93,202,165,0.3)",
        borderRadius: 20,
        padding: "2rem",
        display: "flex",
        alignItems: "center",
        gap: "1.25rem",
        position: "relative",
        overflow: "hidden",
      }}>
        {/* top accent */}
        <div style={{ position: "absolute", top: 0, left: "10%", right: "10%", height: 1, background: "linear-gradient(90deg, transparent, rgba(93,202,165,0.6), transparent)" }} />

        {/* file icon */}
        <div style={{
          width: 52, height: 52, flexShrink: 0,
          borderRadius: 14,
          background: "rgba(93,202,165,0.12)",
          border: "1px solid rgba(93,202,165,0.25)",
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
            <path d="M6 2h7l5 5v13a1 1 0 01-1 1H6a1 1 0 01-1-1V3a1 1 0 011-1z" stroke="#5DCAA5" strokeWidth="1.4" strokeLinejoin="round"/>
            <path d="M13 2v5h5" stroke="#5DCAA5" strokeWidth="1.4" strokeLinejoin="round"/>
            <path d="M8 12h6M8 15h4" stroke="#5DCAA5" strokeWidth="1.4" strokeLinecap="round"/>
          </svg>
        </div>

        {/* file info */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.3rem" }}>
            <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: "0.95rem", letterSpacing: "-0.01em", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
              {resumeFile.name}
            </span>
            <span style={{ flexShrink: 0, fontSize: "0.65rem", fontWeight: 500, letterSpacing: "0.06em", background: "rgba(93,202,165,0.15)", border: "1px solid rgba(93,202,165,0.25)", color: "#5DCAA5", padding: "0.15rem 0.5rem", borderRadius: 100 }}>
              {ext}
            </span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
            <span style={{ fontSize: "0.78rem", color: "rgba(245,244,240,0.38)", fontWeight: 300 }}>{kb} KB</span>
            <span style={{ width: 3, height: 3, borderRadius: "50%", background: "rgba(245,244,240,0.2)" }} />
            <span style={{ display: "flex", alignItems: "center", gap: "0.3rem", fontSize: "0.78rem", color: "#5DCAA5", fontWeight: 400 }}>
              <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
                <path d="M1.5 5.5l3 3 5-5" stroke="#5DCAA5" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Ready to analyze
            </span>
          </div>
        </div>

        {/* change button */}
        <button
          onClick={() => setResumeFile(null)}
          style={{
            flexShrink: 0,
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.09)",
            borderRadius: 10,
            padding: "0.45rem 0.9rem",
            color: "rgba(245,244,240,0.45)",
            fontSize: "0.78rem",
            fontFamily: "'DM Sans', sans-serif",
            fontWeight: 400,
            cursor: "pointer",
            transition: "all 0.2s",
          }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(226,75,74,0.4)"; e.currentTarget.style.color = "#E24B4A"; }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.09)"; e.currentTarget.style.color = "rgba(245,244,240,0.45)"; }}
        >
          Replace
        </button>
      </div>
    );
  }

  // ── Upload dropzone ──────────────────────────────────────────────
  return (
    <div style={{ width: "100%" }}>
      <input
        type="file"
        ref={fileInputRef}
        onChange={(e) => handleFileChange(e.target.files)}
        accept=".pdf,.doc,.docx"
        style={{ display: "none" }}
      />

      <div
        onClick={() => fileInputRef.current.click()}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        style={{
          width: "100%",
          padding: "3rem 2rem",
          border: `1px dashed ${isDragging ? "rgba(123,92,245,0.6)" : "rgba(255,255,255,0.12)"}`,
          borderRadius: 20,
          background: isDragging ? "rgba(123,92,245,0.07)" : "rgba(255,255,255,0.015)",
          cursor: "pointer",
          transition: "all 0.25s",
          textAlign: "center",
          position: "relative",
          overflow: "hidden",
        }}
        onMouseEnter={e => {
          if (!isDragging) {
            e.currentTarget.style.borderColor = "rgba(123,92,245,0.4)";
            e.currentTarget.style.background = "rgba(123,92,245,0.04)";
          }
        }}
        onMouseLeave={e => {
          if (!isDragging) {
            e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)";
            e.currentTarget.style.background = "rgba(255,255,255,0.015)";
          }
        }}
      >
        {/* Corner glows */}
        <div style={{ position: "absolute", top: -30, right: -30, width: 120, height: 120, background: `radial-gradient(circle, ${isDragging ? "rgba(123,92,245,0.15)" : "rgba(123,92,245,0.06)"} 0%, transparent 70%)`, pointerEvents: "none", transition: "all 0.3s" }} />
        <div style={{ position: "absolute", bottom: -30, left: -30, width: 100, height: 100, background: "radial-gradient(circle, rgba(59,139,235,0.05) 0%, transparent 70%)", pointerEvents: "none" }} />

        {/* Upload icon */}
        <div style={{
          width: 56, height: 56,
          borderRadius: 16,
          background: isDragging ? "rgba(123,92,245,0.2)" : "rgba(123,92,245,0.1)",
          border: `1px solid ${isDragging ? "rgba(123,92,245,0.4)" : "rgba(123,92,245,0.2)"}`,
          display: "flex", alignItems: "center", justifyContent: "center",
          margin: "0 auto 1.5rem",
          transition: "all 0.25s",
        }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            {isDragging
              ? <path d="M12 4v12M7 9l5-5 5 5" stroke="#9B7CF7" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
              : <>
                  <path d="M12 15V4M8 8l4-4 4 4" stroke="#9B7CF7" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M4 17v1a2 2 0 002 2h12a2 2 0 002-2v-1" stroke="#7B5CF5" strokeWidth="1.6" strokeLinecap="round"/>
                </>
            }
          </svg>
        </div>

        <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: "1.05rem", letterSpacing: "-0.02em", marginBottom: "0.5rem", color: isDragging ? "#9B7CF7" : "#F5F4F0", transition: "color 0.2s" }}>
          {isDragging ? "Drop to upload" : "Drag & drop your resume"}
        </div>

        <p style={{ fontSize: "0.85rem", color: "rgba(245,244,240,0.35)", fontWeight: 300, marginBottom: "1.5rem", lineHeight: 1.6 }}>
          {isDragging ? "Release to attach your file" : "or click anywhere to browse files"}
        </p>

        {/* Accepted formats row */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem", flexWrap: "wrap" }}>
          {["PDF", "DOC", "DOCX"].map(fmt => (
            <span key={fmt} style={{
              fontSize: "0.68rem", fontWeight: 500, letterSpacing: "0.06em",
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.09)",
              color: "rgba(245,244,240,0.4)",
              padding: "0.2rem 0.6rem",
              borderRadius: 100,
            }}>{fmt}</span>
          ))}
          <span style={{ fontSize: "0.68rem", color: "rgba(245,244,240,0.25)", fontWeight: 300 }}>· Max 5 MB</span>
        </div>
      </div>
    </div>
  );
}