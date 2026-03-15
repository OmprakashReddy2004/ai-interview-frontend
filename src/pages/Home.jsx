import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif", background: "#050508", color: "#F5F4F0", overflowX: "hidden", minHeight: "100vh" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;700;800&family=DM+Sans:ital,wght@0,300;0,400;0,500;1,300&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        :root {
          --black: #050508; --white: #F5F4F0; --purple: #7B5CF5;
          --blue: #3B8BEB; --muted: rgba(245,244,240,0.45); --border: rgba(245,244,240,0.1);
        }
        body::before {
          content: ''; position: fixed; inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E");
          pointer-events: none; z-index: 0; opacity: 0.6;
        }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(24px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes pulse { 0%, 100% { opacity: 1; transform: scale(1); } 50% { opacity: 0.5; transform: scale(1.4); } }
        .nav-link { color: rgba(245,244,240,0.45); text-decoration: none; font-size: 0.875rem; transition: color 0.2s; }
        .nav-link:hover { color: #F5F4F0; }
        .nav-cta { background: #7B5CF5; color: #F5F4F0 !important; padding: 0.5rem 1.25rem; border-radius: 100px; font-weight: 500 !important; }
        .nav-cta:hover { opacity: 0.85; }
        .hero-badge { animation: fadeUp 0.6s ease both; }
        .hero-h1 { animation: fadeUp 0.7s ease 0.1s both; }
        .hero-sub { animation: fadeUp 0.7s ease 0.2s both; }
        .hero-ctas { animation: fadeUp 0.7s ease 0.3s both; }
        .hero-stats { animation: fadeUp 0.7s ease 0.4s both; }
        .btn-primary { display: inline-flex; align-items: center; gap: 0.5rem; background: linear-gradient(135deg, #7B5CF5, #3B8BEB); color: white; font-family: 'DM Sans', sans-serif; font-weight: 500; font-size: 0.95rem; padding: 0.85rem 2rem; border-radius: 100px; border: none; cursor: pointer; transition: transform 0.2s, opacity 0.2s; text-decoration: none; }
        .btn-primary:hover { transform: translateY(-2px); opacity: 0.92; }
        .btn-secondary { display: inline-flex; align-items: center; gap: 0.5rem; border: 1px solid rgba(245,244,240,0.1); color: rgba(245,244,240,0.7); font-family: 'DM Sans', sans-serif; font-weight: 400; font-size: 0.95rem; padding: 0.85rem 2rem; border-radius: 100px; background: rgba(255,255,255,0.03); cursor: pointer; transition: background 0.2s, color 0.2s, transform 0.2s; text-decoration: none; }
        .btn-secondary:hover { background: rgba(255,255,255,0.07); color: #F5F4F0; transform: translateY(-2px); }
        .feature-card { background: rgba(255,255,255,0.025); border: 1px solid rgba(245,244,240,0.1); border-radius: 20px; padding: 2rem; transition: border-color 0.3s, background 0.3s, transform 0.3s; position: relative; overflow: hidden; }
        .feature-card::before { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 1px; background: linear-gradient(90deg, transparent, rgba(123,92,245,0.5), transparent); opacity: 0; transition: opacity 0.3s; }
        .feature-card:hover { border-color: rgba(123,92,245,0.3); background: rgba(123,92,245,0.05); transform: translateY(-4px); }
        .feature-card:hover::before { opacity: 1; }
        .pricing-card { background: rgba(255,255,255,0.025); border: 1px solid rgba(245,244,240,0.1); border-radius: 24px; padding: 2.25rem; position: relative; transition: transform 0.3s; }
        .pricing-card:hover { transform: translateY(-4px); }
        .pricing-card.featured { background: rgba(123,92,245,0.1); border-color: rgba(123,92,245,0.5); }
        .plan-btn { width: 100%; padding: 0.85rem; border-radius: 100px; font-family: 'DM Sans', sans-serif; font-size: 0.9rem; font-weight: 500; cursor: pointer; transition: all 0.2s; border: 1px solid rgba(245,244,240,0.1); background: rgba(255,255,255,0.05); color: #F5F4F0; }
        .plan-btn:hover { background: rgba(255,255,255,0.1); }
        .plan-btn.featured-btn { background: linear-gradient(135deg, #7B5CF5, #3B8BEB); border: none; }
        .plan-btn.featured-btn:hover { opacity: 0.9; transform: translateY(-1px); }
        .testimonial-card { background: rgba(255,255,255,0.025); border: 1px solid rgba(245,244,240,0.1); border-radius: 20px; padding: 1.75rem; }
        .footer-link { font-size: 0.8rem; color: rgba(245,244,240,0.45); text-decoration: none; transition: color 0.2s; }
        .footer-link:hover { color: #F5F4F0; }
        .step-arrow::after { content: '→'; position: absolute; right: -0.2rem; top: 1.4rem; color: rgba(123,92,245,0.4); font-size: 1.2rem; }
      `}</style>

      {/* NAV */}
      <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "1.25rem 5vw", borderBottom: "1px solid rgba(245,244,240,0.1)", backdropFilter: "blur(18px)", background: "rgba(5,5,8,0.7)" }}>
        <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "1.2rem", letterSpacing: "-0.03em", background: "linear-gradient(135deg, #7B5CF5, #3B8BEB)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
          AI Interviewer
        </div>
        <div style={{ display: "flex", gap: "2rem", alignItems: "center" }}>
          <a href="#features" className="nav-link">Features</a>
          <a href="#how" className="nav-link">How it works</a>
          <a href="#pricing" className="nav-link">Pricing</a>
          <a href="/interview/setup" className="nav-link nav-cta">Get started free</a>
        </div>
      </nav>

      {/* HERO */}
      <section style={{ position: "relative", minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", padding: "8rem 5vw 5rem", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: "-10%", left: "50%", transform: "translateX(-50%)", width: 800, height: 600, background: "radial-gradient(ellipse at center, rgba(123,92,245,0.22) 0%, transparent 70%)", pointerEvents: "none" }} />

        <div className="hero-badge" style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", border: "1px solid rgba(123,92,245,0.4)", background: "rgba(123,92,245,0.1)", color: "rgba(180,165,255,0.9)", fontSize: "0.78rem", fontWeight: 500, letterSpacing: "0.06em", textTransform: "uppercase", padding: "0.4rem 1rem", borderRadius: 100, marginBottom: "2rem" }}>
          <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#8B6EF5", animation: "pulse 2s infinite" }} />
          AI-Powered Interview Coach
        </div>

        <h1 className="hero-h1" style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "clamp(2.8rem, 7vw, 5.5rem)", lineHeight: 1.05, letterSpacing: "-0.04em", maxWidth: 900 }}>
          Practice Technical Interviews
          <span style={{ display: "block", background: "linear-gradient(135deg, #9B7CF7 0%, #5BA8F5 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            Like It's The Real One
          </span>
        </h1>

        <p className="hero-sub" style={{ marginTop: "1.5rem", fontSize: "1.1rem", fontWeight: 300, color: "rgba(245,244,240,0.45)", maxWidth: 520, lineHeight: 1.7 }}>
          AI listens to your answers, analyzes clarity and technical depth, and gives instant feedback to help you improve faster.
        </p>

        <div className="hero-ctas" style={{ display: "flex", gap: "1rem", marginTop: "2.5rem", flexWrap: "wrap", justifyContent: "center" }}>
          <Link to="/interview/setup" className="btn-primary">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="6" stroke="white" strokeWidth="1.5"/><path d="M6.5 5.5L11 8L6.5 10.5V5.5Z" fill="white"/></svg>
            Start Mock Interview
          </Link>
          <Link to="/resume-analyzer" className="btn-secondary">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 4h10M3 8h10M3 12h6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
            Analyze Resume
          </Link>
        </div>

        <div className="hero-stats" style={{ display: "flex", gap: "2.5rem", marginTop: "4rem", alignItems: "center" }}>
          {[["12k+", "Interviews practiced"], ["94%", "Improvement rate"], ["3.2×", "Faster prep"]].map(([num, label], i) => (
            <>
              {i > 0 && <div key={`d${i}`} style={{ width: 1, height: 40, background: "rgba(245,244,240,0.1)" }} />}
              <div key={num} style={{ textAlign: "center" }}>
                <div style={{ fontFamily: "'Syne', sans-serif", fontSize: "1.8rem", fontWeight: 700, background: "linear-gradient(135deg, #F5F4F0, rgba(245,244,240,0.6))", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>{num}</div>
                <div style={{ fontSize: "0.78rem", color: "rgba(245,244,240,0.45)", marginTop: "0.2rem", letterSpacing: "0.04em" }}>{label}</div>
              </div>
            </>
          ))}
        </div>
      </section>

      <hr style={{ border: "none", borderTop: "1px solid rgba(245,244,240,0.1)" }} />

      {/* FEATURES */}
<section id="features" style={{ padding: "8rem 5vw", position: "relative", zIndex: 1, overflow: "hidden" }}>
  
  {/* Background grid pattern */}
  <div style={{
    position: "absolute", inset: 0, zIndex: 0,
    backgroundImage: `linear-gradient(rgba(123,92,245,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(123,92,245,0.04) 1px, transparent 1px)`,
    backgroundSize: "60px 60px",
    maskImage: "radial-gradient(ellipse 80% 80% at 50% 50%, black 40%, transparent 100%)",
    WebkitMaskImage: "radial-gradient(ellipse 80% 80% at 50% 50%, black 40%, transparent 100%)",
  }} />

  {/* Ambient glow */}
  <div style={{ position: "absolute", top: "20%", left: "10%", width: 500, height: 500, background: "radial-gradient(circle, rgba(123,92,245,0.08) 0%, transparent 70%)", pointerEvents: "none", zIndex: 0 }} />
  <div style={{ position: "absolute", bottom: "10%", right: "5%", width: 400, height: 400, background: "radial-gradient(circle, rgba(59,139,235,0.07) 0%, transparent 70%)", pointerEvents: "none", zIndex: 0 }} />

  <div style={{ position: "relative", zIndex: 1 }}>
    {/* Header */}
    <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", flexWrap: "wrap", gap: "2rem", marginBottom: "5rem" }}>
      <div>
        <div style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", background: "rgba(123,92,245,0.1)", border: "1px solid rgba(123,92,245,0.25)", borderRadius: 100, padding: "0.35rem 1rem", marginBottom: "1.5rem" }}>
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><circle cx="6" cy="6" r="5" stroke="#9B7CF7" strokeWidth="1.2"/><path d="M6 3v3l2 1" stroke="#9B7CF7" strokeWidth="1.2" strokeLinecap="round"/></svg>
          <span style={{ fontSize: "0.72rem", fontWeight: 500, letterSpacing: "0.08em", textTransform: "uppercase", color: "rgba(155,124,247,0.9)" }}>Why AI Interviewer</span>
        </div>
        <h2 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "clamp(2rem, 4.5vw, 3.5rem)", letterSpacing: "-0.04em", lineHeight: 1.05, maxWidth: 520 }}>
          Everything you need<br/>
          <span style={{ background: "linear-gradient(135deg, #9B7CF7, #5BA8F5)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>to land the offer</span>
        </h2>
      </div>
      <p style={{ maxWidth: 300, fontSize: "0.95rem", color: "rgba(245,244,240,0.4)", fontWeight: 300, lineHeight: 1.75, paddingTop: "3.5rem" }}>
        Six tools. One mission. Walk into every interview knowing you're the most prepared person in the room.
      </p>
    </div>

    {/* Bento Grid */}
    <div style={{ display: "grid", gridTemplateColumns: "repeat(12, 1fr)", gridTemplateRows: "auto", gap: "1rem" }}>

      {/* Card 1 — Large, spans 5 cols */}
      <div style={{ gridColumn: "span 5", gridRow: "span 2", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 24, padding: "2.5rem", position: "relative", overflow: "hidden", transition: "border-color 0.3s, transform 0.3s", cursor: "default" }}
        onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(123,92,245,0.4)"; e.currentTarget.style.transform = "translateY(-4px)"; }}
        onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)"; e.currentTarget.style.transform = "translateY(0)"; }}>
        {/* Visual mockup */}
        <div style={{ background: "rgba(123,92,245,0.08)", borderRadius: 16, padding: "1.25rem", marginBottom: "2rem", border: "1px solid rgba(123,92,245,0.15)" }}>
          <div style={{ display: "flex", gap: "0.5rem", marginBottom: "0.75rem" }}>
            {["Clarity", "Depth", "Pace"].map((label, i) => (
              <div key={label} style={{ flex: 1 }}>
                <div style={{ fontSize: "0.65rem", color: "rgba(245,244,240,0.4)", marginBottom: "0.35rem", fontWeight: 400 }}>{label}</div>
                <div style={{ height: 6, background: "rgba(255,255,255,0.06)", borderRadius: 100, overflow: "hidden" }}>
                  <div style={{ height: "100%", width: `${[82, 67, 91][i]}%`, background: `linear-gradient(90deg, ${["#7B5CF5", "#3B8BEB", "#5DCAA5"][i]}, ${["#9B7CF7", "#5BA8F5", "#7EDBBF"][i]})`, borderRadius: 100 }} />
                </div>
              </div>
            ))}
          </div>
          <div style={{ display: "flex", gap: "0.4rem", flexWrap: "wrap" }}>
            {["Avoid 'um'", "Slow down", "+technical depth"].map(t => (
              <span key={t} style={{ fontSize: "0.7rem", padding: "0.2rem 0.6rem", borderRadius: 100, background: "rgba(123,92,245,0.2)", color: "rgba(180,165,255,0.8)", fontWeight: 400 }}>{t}</span>
            ))}
          </div>
        </div>
        <div style={{ fontSize: "0.7rem", fontWeight: 500, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(123,92,245,0.7)", marginBottom: "0.6rem" }}>Real-time Analysis</div>
        <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: "1.3rem", marginBottom: "0.75rem", letterSpacing: "-0.02em" }}>Speech Analysis</div>
        <p style={{ fontSize: "0.875rem", color: "rgba(245,244,240,0.4)", lineHeight: 1.7, fontWeight: 300 }}>AI listens to every word — filler count, pacing, technical accuracy — and surfaces corrections in real time.</p>
        <div style={{ position: "absolute", bottom: 0, right: 0, width: 120, height: 120, background: "radial-gradient(circle, rgba(123,92,245,0.15) 0%, transparent 70%)", pointerEvents: "none" }} />
      </div>

      {/* Card 2 — spans 7 cols */}
      <div style={{ gridColumn: "span 7", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 24, padding: "2.5rem", position: "relative", overflow: "hidden", transition: "border-color 0.3s, transform 0.3s", cursor: "default" }}
        onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(59,139,235,0.4)"; e.currentTarget.style.transform = "translateY(-4px)"; }}
        onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)"; e.currentTarget.style.transform = "translateY(0)"; }}>
        {/* Company logo row */}
        <div style={{ display: "flex", gap: "0.6rem", marginBottom: "2rem", flexWrap: "wrap" }}>
          {[["G", "#EA4335", "Google"], ["M", "#0081FB", "Meta"], ["A", "#FF9900", "Amazon"], ["N", "#E50914", "Netflix"], ["Ap", "#555", "Apple"], ["MS", "#00A4EF", "Microsoft"]].map(([l, c, name]) => (
            <div key={name} title={name} style={{ width: 38, height: 38, borderRadius: 10, background: `${c}18`, border: `1px solid ${c}30`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.72rem", fontWeight: 700, color: c, fontFamily: "'Syne', sans-serif" }}>{l}</div>
          ))}
          <div style={{ width: 38, height: 38, borderRadius: 10, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.65rem", color: "rgba(245,244,240,0.3)", fontWeight: 500 }}>+200</div>
        </div>
        <div style={{ fontSize: "0.7rem", fontWeight: 500, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(59,139,235,0.7)", marginBottom: "0.6rem" }}>Company-Specific</div>
        <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: "1.3rem", marginBottom: "0.75rem", letterSpacing: "-0.02em" }}>Tailored Question Bank</div>
        <p style={{ fontSize: "0.875rem", color: "rgba(245,244,240,0.4)", lineHeight: 1.7, fontWeight: 300, maxWidth: 420 }}>Simulate real interview rounds for 200+ companies — role-specific formats, actual question patterns, difficulty calibrated to level.</p>
      </div>

      {/* Card 3 — spans 7 cols */}
      <div style={{ gridColumn: "span 7", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 24, padding: "2.5rem", position: "relative", overflow: "hidden", transition: "border-color 0.3s, transform 0.3s", cursor: "default" }}
        onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(93,202,165,0.4)"; e.currentTarget.style.transform = "translateY(-4px)"; }}
        onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)"; e.currentTarget.style.transform = "translateY(0)"; }}>
        {/* Score display */}
        <div style={{ display: "flex", gap: "1rem", marginBottom: "2rem" }}>
          {[["Communication", 88, "#7B5CF5"], ["Technical", 74, "#3B8BEB"], ["Structure", 92, "#5DCAA5"]].map(([label, score, color]) => (
            <div key={label} style={{ flex: 1, background: "rgba(255,255,255,0.03)", borderRadius: 14, padding: "1rem", border: "1px solid rgba(255,255,255,0.06)" }}>
              <div style={{ fontSize: "1.6rem", fontFamily: "'Syne', sans-serif", fontWeight: 800, color, lineHeight: 1 }}>{score}</div>
              <div style={{ fontSize: "0.68rem", color: "rgba(245,244,240,0.35)", marginTop: "0.3rem", fontWeight: 300 }}>{label}</div>
            </div>
          ))}
        </div>
        <div style={{ fontSize: "0.7rem", fontWeight: 500, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(93,202,165,0.8)", marginBottom: "0.6rem" }}>Post-session</div>
        <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: "1.3rem", marginBottom: "0.75rem", letterSpacing: "-0.02em" }}>Detailed Scorecards</div>
        <p style={{ fontSize: "0.875rem", color: "rgba(245,244,240,0.4)", lineHeight: 1.7, fontWeight: 300 }}>Every session scored across 4 dimensions with specific, actionable coaching notes — not generic tips.</p>
      </div>

      {/* Card 4 — spans 5 cols */}
      <div style={{ gridColumn: "span 5", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 24, padding: "2.5rem", position: "relative", overflow: "hidden", transition: "border-color 0.3s, transform 0.3s", cursor: "default" }}
        onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(245,163,35,0.4)"; e.currentTarget.style.transform = "translateY(-4px)"; }}
        onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)"; e.currentTarget.style.transform = "translateY(0)"; }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "2rem" }}>
          <div style={{ flex: 1, height: 3, background: "rgba(245,163,35,0.15)", borderRadius: 100, overflow: "hidden" }}>
            <div style={{ height: "100%", width: "70%", background: "linear-gradient(90deg, #F5A623, #FFD280)", borderRadius: 100 }} />
          </div>
          <span style={{ fontSize: "0.75rem", fontFamily: "'Syne', sans-serif", fontWeight: 700, color: "#F5A623" }}>Session 7</span>
        </div>
        <div style={{ fontSize: "0.7rem", fontWeight: 500, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(245,163,35,0.8)", marginBottom: "0.6rem" }}>Adaptive</div>
        <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: "1.3rem", marginBottom: "0.75rem", letterSpacing: "-0.02em" }}>Adaptive Question Engine</div>
        <p style={{ fontSize: "0.875rem", color: "rgba(245,244,240,0.4)", lineHeight: 1.7, fontWeight: 300 }}>Questions evolve with your skill level — harder when you're ready, focused when you need work.</p>
      </div>

      {/* Card 5 & 6 — bottom row */}
      <div style={{ gridColumn: "span 6", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 24, padding: "2.5rem", position: "relative", overflow: "hidden", transition: "border-color 0.3s, transform 0.3s", cursor: "default" }}
        onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(123,92,245,0.35)"; e.currentTarget.style.transform = "translateY(-4px)"; }}
        onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)"; e.currentTarget.style.transform = "translateY(0)"; }}>
        <div style={{ display: "flex", gap: "0.5rem", marginBottom: "2rem" }}>
          {["resume.pdf", "jd.pdf"].map((file, i) => (
            <div key={file} style={{ display: "flex", alignItems: "center", gap: "0.4rem", background: "rgba(123,92,245,0.1)", border: "1px solid rgba(123,92,245,0.2)", borderRadius: 8, padding: "0.4rem 0.75rem" }}>
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><rect x="1" y="1" width="10" height="10" rx="2" stroke="#9B7CF7" strokeWidth="1.2"/><path d="M3 5h6M3 7h4" stroke="#9B7CF7" strokeWidth="1.2" strokeLinecap="round"/></svg>
              <span style={{ fontSize: "0.7rem", color: "rgba(180,165,255,0.8)", fontWeight: 400 }}>{file}</span>
            </div>
          ))}
          <div style={{ display: "flex", alignItems: "center", gap: "0.3rem", marginLeft: "auto" }}>
            <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#5DCAA5", animation: "pulse 2s infinite" }} />
            <span style={{ fontSize: "0.7rem", color: "rgba(93,202,165,0.8)" }}>analyzing</span>
          </div>
        </div>
        <div style={{ fontSize: "0.7rem", fontWeight: 500, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(155,124,247,0.8)", marginBottom: "0.6rem" }}>Resume Intelligence</div>
        <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: "1.3rem", marginBottom: "0.75rem", letterSpacing: "-0.02em" }}>Resume Intelligence</div>
        <p style={{ fontSize: "0.875rem", color: "rgba(245,244,240,0.4)", lineHeight: 1.7, fontWeight: 300 }}>Upload your resume — AI maps your experience to likely interview questions and spots gaps before your recruiter does.</p>
      </div>

      <div style={{ gridColumn: "span 6", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 24, padding: "2.5rem", position: "relative", overflow: "hidden", transition: "border-color 0.3s, transform 0.3s", cursor: "default" }}
        onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(59,139,235,0.35)"; e.currentTarget.style.transform = "translateY(-4px)"; }}
        onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)"; e.currentTarget.style.transform = "translateY(0)"; }}>
        {/* Retake counter visual */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "2rem" }}>
          {[1,2,3,4,5].map(n => (
            <div key={n} style={{ flex: 1, height: 36, borderRadius: 8, background: n <= 3 ? "rgba(59,139,235,0.2)" : "rgba(255,255,255,0.04)", border: `1px solid ${n <= 3 ? "rgba(59,139,235,0.3)" : "rgba(255,255,255,0.06)"}`, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ fontSize: "0.65rem", fontWeight: n <= 3 ? 600 : 400, color: n <= 3 ? "#5BA8F5" : "rgba(245,244,240,0.2)", fontFamily: "'Syne', sans-serif" }}>#{n}</span>
            </div>
          ))}
          <div style={{ fontSize: "0.75rem", color: "rgba(245,244,240,0.3)", fontWeight: 300, whiteSpace: "nowrap" }}>∞ more</div>
        </div>
        <div style={{ fontSize: "0.7rem", fontWeight: 500, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(59,139,235,0.8)", marginBottom: "0.6rem" }}>Practice</div>
        <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: "1.3rem", marginBottom: "0.75rem", letterSpacing: "-0.02em" }}>Unlimited Retakes</div>
        <p style={{ fontSize: "0.875rem", color: "rgba(245,244,240,0.4)", lineHeight: 1.7, fontWeight: 300 }}>Retry any question as many times as needed. Watch your score evolve across attempts and see exactly what changed.</p>
      </div>

    </div>
  </div>
</section>

<hr style={{ border: "none", borderTop: "1px solid rgba(245,244,240,0.1)" }} />
      {/* HOW IT WORKS */}
      <section id="how" style={{ padding: "7rem 5vw", background: "rgba(255,255,255,0.015)", borderTop: "1px solid rgba(245,244,240,0.1)", borderBottom: "1px solid rgba(245,244,240,0.1)" }}>
        <div style={{ fontSize: "0.75rem", fontWeight: 500, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(155,124,247,0.8)", marginBottom: "1rem" }}>The process</div>
        <h2 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: "clamp(1.8rem, 4vw, 3rem)", letterSpacing: "-0.03em", lineHeight: 1.15, maxWidth: 600 }}>Go from nervous to confident in 4 steps</h2>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 0, marginTop: "3.5rem" }}>
          {[
            ["01", "Pick your role", "Choose your target position and company. We tailor the difficulty and focus areas for you."],
            ["02", "Answer out loud", "Respond just like you would in a real interview. Our AI listens to every word in real time."],
            ["03", "Get instant feedback", "Receive a detailed breakdown of what worked, what didn't, and exactly how to improve."],
            ["04", "Track your growth", "Watch your scores improve over sessions. Know when you're ready before the real interview."],
          ].map(([num, title, desc], i) => (
            <div key={num} className={i < 3 ? "step-arrow" : ""} style={{ padding: "0 2rem 0 0", position: "relative" }}>
              <div style={{ fontFamily: "'Syne', sans-serif", fontSize: "2.5rem", fontWeight: 800, color: "rgba(123,92,245,0.2)", lineHeight: 1, marginBottom: "1rem" }}>{num}</div>
              <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: "1rem", marginBottom: "0.5rem" }}>{title}</div>
              <p style={{ fontSize: "0.85rem", color: "rgba(245,244,240,0.45)", fontWeight: 300, lineHeight: 1.6 }}>{desc}</p>
            </div>
          ))}
        </div>
      </section>

      <hr style={{ border: "none", borderTop: "1px solid rgba(245,244,240,0.1)" }} />

      {/* TESTIMONIALS */}
      <section style={{ padding: "7rem 5vw" }}>
        <div style={{ fontSize: "0.75rem", fontWeight: 500, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(155,124,247,0.8)", marginBottom: "1rem" }}>Real results</div>
        <h2 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: "clamp(1.8rem, 4vw, 3rem)", letterSpacing: "-0.03em", lineHeight: 1.15, maxWidth: 600 }}>People who got the job</h2>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "1.25rem", marginTop: "3.5rem" }}>
          {[
            ["AK", "#9B7CF7", "rgba(123,92,245,0.2)", "After two weeks of daily practice, I could feel the difference. My answers became sharper, less rambling. I got an offer from Stripe within a month.", "Aditya K.", "Software Engineer → Stripe"],
            ["PR", "#5BA8F5", "rgba(59,139,235,0.2)", "The resume analysis alone was worth it. It found three areas I would have fumbled explaining. Now I own every line on my resume.", "Priya R.", "PM Candidate → Google"],
            ["SM", "#6ED87A", "rgba(91,168,100,0.2)", "I'm a self-taught dev and always felt behind. AI Interviewer helped me realize I knew more than I thought — and filled the gaps I didn't.", "Siddharth M.", "Fullstack Dev → Razorpay"],
          ].map(([initials, color, bg, quote, name, role]) => (
            <div key={name} className="testimonial-card">
              <div style={{ color: "#F5A623", fontSize: 12, marginBottom: "0.75rem", letterSpacing: 2 }}>★★★★★</div>
              <p style={{ fontSize: "0.9rem", lineHeight: 1.7, color: "rgba(245,244,240,0.75)", fontWeight: 300, fontStyle: "italic", marginBottom: "1.25rem" }}>"{quote}"</p>
              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                <div style={{ width: 36, height: 36, borderRadius: "50%", background: bg, color, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: "0.75rem" }}>{initials}</div>
                <div>
                  <div style={{ fontWeight: 500, fontSize: "0.875rem" }}>{name}</div>
                  <div style={{ fontSize: "0.75rem", color: "rgba(245,244,240,0.45)", fontWeight: 300 }}>{role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <hr style={{ border: "none", borderTop: "1px solid rgba(245,244,240,0.1)" }} />

      {/* PRICING */}
      <section id="pricing" style={{ padding: "7rem 5vw" }}>
        <div style={{ fontSize: "0.75rem", fontWeight: 500, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(155,124,247,0.8)", marginBottom: "1rem" }}>Simple pricing</div>
        <h2 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: "clamp(1.8rem, 4vw, 3rem)", letterSpacing: "-0.03em", lineHeight: 1.15, maxWidth: 600 }}>Start free. Upgrade when ready.</h2>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "1.25rem", marginTop: "3.5rem", maxWidth: 900 }}>
          {/* Starter */}
          <div className="pricing-card">
            <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: "1rem", marginBottom: "0.75rem" }}>Starter</div>
            <div style={{ fontFamily: "'Syne', sans-serif", fontSize: "2.8rem", fontWeight: 800, letterSpacing: "-0.04em", lineHeight: 1 }}>$0 <span style={{ fontSize: "1rem", fontWeight: 400, color: "rgba(245,244,240,0.45)" }}>/ month</span></div>
            <p style={{ fontSize: "0.82rem", color: "rgba(245,244,240,0.45)", margin: "0.75rem 0 1.5rem", fontWeight: 300 }}>Great for getting a feel for the platform.</p>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.65rem", marginBottom: "2rem" }}>
              {["5 mock interviews / month", "Basic feedback scorecard", "Resume upload (1 at a time)", "Standard question bank"].map(f => (
                <li key={f} style={{ fontSize: "0.855rem", color: "rgba(245,244,240,0.7)", display: "flex", alignItems: "center", gap: "0.6rem", fontWeight: 300 }}>
                  <span style={{ width: 16, height: 16, borderRadius: "50%", background: "rgba(91,168,245,0.2)", border: "1px solid rgba(91,168,245,0.3)", flexShrink: 0, display: "inline-flex", alignItems: "center", justifyContent: "center" }}>
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M2 5l2.5 2.5L8 3" stroke="#5BA8F5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </span>
                  {f}
                </li>
              ))}
            </ul>
            <button className="plan-btn">Get started free</button>
          </div>

          {/* Pro */}
          <div className="pricing-card featured">
            <div style={{ position: "absolute", top: -14, left: "50%", transform: "translateX(-50%)", background: "linear-gradient(135deg, #7B5CF5, #3B8BEB)", color: "white", fontSize: "0.72rem", fontWeight: 500, letterSpacing: "0.06em", textTransform: "uppercase", padding: "0.3rem 0.9rem", borderRadius: 100, whiteSpace: "nowrap" }}>Most popular</div>
            <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: "1rem", marginBottom: "0.75rem" }}>Pro</div>
            <div style={{ fontFamily: "'Syne', sans-serif", fontSize: "2.8rem", fontWeight: 800, letterSpacing: "-0.04em", lineHeight: 1 }}>$19 <span style={{ fontSize: "1rem", fontWeight: 400, color: "rgba(245,244,240,0.45)" }}>/ month</span></div>
            <p style={{ fontSize: "0.82rem", color: "rgba(245,244,240,0.45)", margin: "0.75rem 0 1.5rem", fontWeight: 300 }}>For serious candidates who want to land fast.</p>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.65rem", marginBottom: "2rem" }}>
              {["Unlimited mock interviews", "Deep AI feedback + coaching tips", "Company-specific question sets", "Resume intelligence (unlimited)", "Progress tracking dashboard", "Priority support"].map(f => (
                <li key={f} style={{ fontSize: "0.855rem", color: "rgba(245,244,240,0.7)", display: "flex", alignItems: "center", gap: "0.6rem", fontWeight: 300 }}>
                  <span style={{ width: 16, height: 16, borderRadius: "50%", background: "rgba(91,168,245,0.2)", border: "1px solid rgba(91,168,245,0.3)", flexShrink: 0, display: "inline-flex", alignItems: "center", justifyContent: "center" }}>
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M2 5l2.5 2.5L8 3" stroke="#5BA8F5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </span>
                  {f}
                </li>
              ))}
            </ul>
            <button className="plan-btn featured-btn">Start Pro free trial</button>
          </div>

          {/* Team */}
          <div className="pricing-card">
            <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: "1rem", marginBottom: "0.75rem" }}>Team</div>
            <div style={{ fontFamily: "'Syne', sans-serif", fontSize: "2.8rem", fontWeight: 800, letterSpacing: "-0.04em", lineHeight: 1 }}>$49 <span style={{ fontSize: "1rem", fontWeight: 400, color: "rgba(245,244,240,0.45)" }}>/ month</span></div>
            <p style={{ fontSize: "0.82rem", color: "rgba(245,244,240,0.45)", margin: "0.75rem 0 1.5rem", fontWeight: 300 }}>For bootcamps, colleges, and hiring programs.</p>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.65rem", marginBottom: "2rem" }}>
              {["Everything in Pro", "Up to 10 seats", "Admin dashboard", "Bulk resume analysis", "Dedicated account manager"].map(f => (
                <li key={f} style={{ fontSize: "0.855rem", color: "rgba(245,244,240,0.7)", display: "flex", alignItems: "center", gap: "0.6rem", fontWeight: 300 }}>
                  <span style={{ width: 16, height: 16, borderRadius: "50%", background: "rgba(91,168,245,0.2)", border: "1px solid rgba(91,168,245,0.3)", flexShrink: 0, display: "inline-flex", alignItems: "center", justifyContent: "center" }}>
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M2 5l2.5 2.5L8 3" stroke="#5BA8F5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </span>
                  {f}
                </li>
              ))}
            </ul>
            <button className="plan-btn">Contact sales</button>
          </div>
        </div>
      </section>

      {/* CTA BANNER */}
      <div style={{ margin: "0 5vw", padding: "4rem 3rem", borderRadius: 28, background: "linear-gradient(135deg, rgba(123,92,245,0.25), rgba(59,139,235,0.15))", border: "1px solid rgba(123,92,245,0.3)", textAlign: "center", position: "relative", overflow: "hidden", zIndex: 1 }}>
        <div style={{ position: "absolute", top: "-40%", left: "30%", width: 400, height: 400, background: "radial-gradient(circle, rgba(123,92,245,0.2) 0%, transparent 70%)", pointerEvents: "none" }} />
        <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(1.6rem, 3.5vw, 2.5rem)", fontWeight: 800, letterSpacing: "-0.03em", marginBottom: "1rem" }}>Your next offer starts with one practice session</h2>
        <p style={{ color: "rgba(245,244,240,0.45)", fontSize: "1rem", fontWeight: 300, maxWidth: 480, margin: "0 auto 2rem", lineHeight: 1.7 }}>No credit card required. Start your first mock interview in under 60 seconds.</p>
        <Link to="/interview/setup" className="btn-primary" style={{ fontSize: "1rem", padding: "1rem 2.5rem" }}>
          Start for free — it's instant
        </Link>
      </div>

      {/* FOOTER */}
      <footer style={{ marginTop: "5rem", padding: "3rem 5vw", borderTop: "1px solid rgba(245,244,240,0.1)", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem" }}>
        <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "1rem", background: "linear-gradient(135deg, #7B5CF5, #3B8BEB)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>AI Interviewer</div>
        <p style={{ fontSize: "0.8rem", color: "rgba(245,244,240,0.45)", fontWeight: 300 }}>© 2025 AI Interviewer. All rights reserved.</p>
        <div style={{ display: "flex", gap: "1.5rem" }}>
          {["Privacy", "Terms", "Blog", "Contact"].map(l => <a key={l} href="#" className="footer-link">{l}</a>)}
        </div>
      </footer>
    </div>
  );
}