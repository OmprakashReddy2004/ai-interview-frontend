import UploadCarousel from "../components/UploadCarousel";

export default function ResumeAnalyzerPage() {
  return (
    <div style={{
      fontFamily: "'DM Sans', sans-serif",
      background: "#050508",
      color: "#F5F4F0",
      overflowX: "hidden",
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;700;800&family=DM+Sans:ital,wght@0,300;0,400;0,500;1,300&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50%       { opacity: 0.4; transform: scale(1.4); }
        }
        @keyframes shimmer {
          0%   { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }

        .nav-link {
          color: rgba(245,244,240,0.4);
          text-decoration: none;
          font-size: 0.875rem;
          transition: color 0.2s;
        }
        .nav-link:hover { color: #F5F4F0; }

        .step-card {
          background: rgba(255,255,255,0.025);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 20px;
          padding: 1.5rem;
          position: relative;
          overflow: hidden;
          transition: border-color 0.3s, transform 0.3s;
          text-align: left;
        }
        .step-card:hover {
          border-color: rgba(123,92,245,0.3);
          transform: translateY(-3px);
        }
        .step-card::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(123,92,245,0.45), transparent);
          opacity: 0;
          transition: opacity 0.3s;
        }
        .step-card:hover::before { opacity: 1; }
      `}</style>

      {/* Ambient glows */}
      <div style={{ position: "fixed", top: "-15%", left: "50%", transform: "translateX(-50%)", width: 900, height: 700, background: "radial-gradient(ellipse, rgba(123,92,245,0.12) 0%, transparent 65%)", pointerEvents: "none", zIndex: 0 }} />
      <div style={{ position: "fixed", bottom: "-10%", right: "0%", width: 500, height: 500, background: "radial-gradient(circle, rgba(59,139,235,0.07) 0%, transparent 70%)", pointerEvents: "none", zIndex: 0 }} />
      <div style={{ position: "fixed", bottom: "20%", left: "-5%", width: 350, height: 350, background: "radial-gradient(circle, rgba(93,202,165,0.05) 0%, transparent 70%)", pointerEvents: "none", zIndex: 0 }} />

      {/* Background grid */}
      <div style={{
        position: "fixed", inset: 0, zIndex: 0,
        backgroundImage: `linear-gradient(rgba(123,92,245,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(123,92,245,0.03) 1px, transparent 1px)`,
        backgroundSize: "60px 60px",
        maskImage: "radial-gradient(ellipse 80% 80% at 50% 40%, black 30%, transparent 100%)",
        WebkitMaskImage: "radial-gradient(ellipse 80% 80% at 50% 40%, black 30%, transparent 100%)",
        pointerEvents: "none",
      }} />

      {/* NAV */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "1.25rem 5vw",
        borderBottom: "1px solid rgba(245,244,240,0.06)",
        backdropFilter: "blur(18px)",
        background: "rgba(5,5,8,0.7)",
      }}>
        <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "1.2rem", letterSpacing: "-0.03em", background: "linear-gradient(135deg, #7B5CF5, #3B8BEB)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
          InterviewAI
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "2rem" }}>
          <a href="/" className="nav-link">Home</a>
          
          <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", background: "rgba(123,92,245,0.1)", border: "1px solid rgba(123,92,245,0.25)", borderRadius: 100, padding: "0.35rem 0.9rem" }}>
            <div style={{ width: 5, height: 5, borderRadius: "50%", background: "#5DCAA5", animation: "pulse 2s infinite" }} />
            <span style={{ fontSize: "0.72rem", color: "rgba(155,124,247,0.85)", fontWeight: 500, letterSpacing: "0.06em", textTransform: "uppercase" }}>Resume Intelligence</span>
          </div>
        </div>
      </nav>

      {/* MAIN */}
      <main style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", padding: "10rem 5vw 5rem", position: "relative", zIndex: 1 }}>

        {/* Hero header */}
        <div style={{ textAlign: "center", maxWidth: 780, animation: "fadeUp 0.6s ease both" }}>

          <div style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", border: "1px solid rgba(123,92,245,0.35)", background: "rgba(123,92,245,0.08)", borderRadius: 100, padding: "0.4rem 1.1rem", marginBottom: "2rem" }}>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <rect x="1" y="1" width="10" height="10" rx="2" stroke="#9B7CF7" strokeWidth="1.2"/>
              <path d="M3 5h6M3 7h4" stroke="#9B7CF7" strokeWidth="1.2" strokeLinecap="round"/>
            </svg>
            <span style={{ fontSize: "0.72rem", fontWeight: 500, letterSpacing: "0.08em", textTransform: "uppercase", color: "rgba(155,124,247,0.9)" }}>Resume Intelligence v1.0</span>
          </div>

          <h1 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "clamp(2.4rem, 5.5vw, 4rem)", lineHeight: 1.05, letterSpacing: "-0.04em", marginBottom: "1.5rem" }}>
            Analyze Resume &<br/>
            <span style={{ background: "linear-gradient(135deg, #9B7CF7 0%, #5BA8F5 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              Job Description
            </span>
          </h1>

          <p style={{ fontSize: "1.05rem", fontWeight: 300, color: "rgba(245,244,240,0.42)", lineHeight: 1.75, maxWidth: 520, margin: "0 auto 3.5rem" }}>
            Upload your documents to identify experience gaps, match keywords, and generate tailored interview questions in seconds.
          </p>

          {/* Stats row */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "2.5rem", marginBottom: "4rem", flexWrap: "wrap" }}>
            {[["98%", "ATS keyword accuracy"], ["< 30s", "Analysis time"], ["200+", "Job categories"]].map(([num, label], i) => (
              <div key={label} style={{ display: "flex", alignItems: "center", gap: i > 0 ? "2.5rem" : 0 }}>
                {i > 0 && <div style={{ width: 1, height: 32, background: "rgba(245,244,240,0.08)" }} />}
                <div style={{ textAlign: "center" }}>
                  <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "1.5rem", letterSpacing: "-0.03em", background: "linear-gradient(135deg, #F5F4F0, rgba(245,244,240,0.6))", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>{num}</div>
                  <div style={{ fontSize: "0.72rem", color: "rgba(245,244,240,0.35)", marginTop: "0.2rem", letterSpacing: "0.03em" }}>{label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* How it works — 3 step mini cards */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1rem", width: "100%", maxWidth: 780, marginBottom: "3rem", animation: "fadeUp 0.7s ease 0.1s both" }}>
          {[
            ["01", "#7B5CF5", <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M8 2v8M5 7l3 3 3-3" stroke="#9B7CF7" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/><path d="M2 12h12" stroke="#9B7CF7" strokeWidth="1.4" strokeLinecap="round"/></svg>, "Upload Docs", "Drop your resume & job description PDF or paste text"],
            ["02", "#3B8BEB", <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="6" stroke="#5BA8F5" strokeWidth="1.4"/><path d="M5 8l2 2 4-4" stroke="#5BA8F5" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>, "AI Analysis", "Gap detection, keyword match score, and role fit rating"],
            ["03", "#5DCAA5", <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 4h10M3 7h7M3 10h5" stroke="#5DCAA5" strokeWidth="1.4" strokeLinecap="round"/></svg>, "Get Questions", "Receive tailored interview questions based on your gaps"],
          ].map(([num, color, icon, title, desc]) => (
            <div key={title} className="step-card">
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1rem" }}>
                <div style={{ width: 32, height: 32, borderRadius: 9, background: `${color}18`, border: `1px solid ${color}30`, display: "flex", alignItems: "center", justifyContent: "center" }}>{icon}</div>
                <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "1.4rem", color: `${color}25`, letterSpacing: "-0.04em" }}>{num}</span>
              </div>
              <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: "0.95rem", marginBottom: "0.4rem", letterSpacing: "-0.02em" }}>{title}</div>
              <p style={{ fontSize: "0.8rem", color: "rgba(245,244,240,0.38)", fontWeight: 300, lineHeight: 1.6 }}>{desc}</p>
            </div>
          ))}
        </div>

        {/* Upload carousel — main component */}
        <div style={{ width: "100%", maxWidth: 780, position: "relative", animation: "fadeUp 0.7s ease 0.2s both" }}>

          {/* Card wrapper */}
          <div style={{
            background: "rgba(255,255,255,0.02)",
            border: "1px solid rgba(255,255,255,0.07)",
            borderRadius: 28,
            padding: "2.5rem",
            position: "relative",
            overflow: "hidden",
          }}>
            {/* Top accent */}
            <div style={{ position: "absolute", top: 0, left: "20%", right: "20%", height: 1, background: "linear-gradient(90deg, transparent, rgba(123,92,245,0.55), transparent)" }} />

            {/* Shimmer corner glow */}
            <div style={{ position: "absolute", top: -60, right: -60, width: 200, height: 200, background: "radial-gradient(circle, rgba(59,139,235,0.08) 0%, transparent 70%)", pointerEvents: "none" }} />
            <div style={{ position: "absolute", bottom: -40, left: -40, width: 160, height: 160, background: "radial-gradient(circle, rgba(123,92,245,0.07) 0%, transparent 70%)", pointerEvents: "none" }} />

            <UploadCarousel />
          </div>

          {/* Below-card note */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "1.5rem", marginTop: "1.25rem", flexWrap: "wrap" }}>
            {[
              [<svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2 6l3 3 5-5" stroke="#5DCAA5" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>, "PDF & DOCX supported"],
              [<svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2 6l3 3 5-5" stroke="#5DCAA5" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>, "No data stored"],
              [<svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2 6l3 3 5-5" stroke="#5DCAA5" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>, "Results in under 30s"],
            ].map(([icon, text]) => (
              <div key={text} style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
                {icon}
                <span style={{ fontSize: "0.75rem", color: "rgba(245,244,240,0.35)", fontWeight: 300, letterSpacing: "0.02em" }}>{text}</span>
              </div>
            ))}
          </div>
        </div>

      </main>

      {/* FOOTER */}
      <footer style={{ padding: "2.5rem 5vw", borderTop: "1px solid rgba(245,244,240,0.05)", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem", position: "relative", zIndex: 1 }}>
        <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "1rem", background: "linear-gradient(135deg, #7B5CF5, #3B8BEB)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
          InterviewAI
        </div>
        <div style={{ fontSize: "0.75rem", color: "rgba(245,244,240,0.18)", letterSpacing: "0.08em", textTransform: "uppercase" }}>
          High-Fidelity AI Analysis · 2026
        </div>
        <div style={{ display: "flex", gap: "1.5rem" }}>
          {["Privacy", "Terms", "Contact"].map(l => (
            <a key={l} href="#" style={{ fontSize: "0.78rem", color: "rgba(245,244,240,0.25)", textDecoration: "none", transition: "color 0.2s" }}
              onMouseEnter={e => e.target.style.color = "#F5F4F0"}
              onMouseLeave={e => e.target.style.color = "rgba(245,244,240,0.25)"}>{l}</a>
          ))}
        </div>
      </footer>
    </div>
  );
}