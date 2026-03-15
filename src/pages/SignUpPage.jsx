import { createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebase";

export default function SignUpPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "#050508",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontFamily: "'DM Sans', sans-serif",
      color: "#F5F4F0",
      padding: "2rem",
      position: "relative",
      overflow: "hidden",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@300;400;500&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50%       { opacity: 0.4; transform: scale(1.4); }
        }

        .signup-input {
          width: 100%;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.09);
          border-radius: 12px;
          padding: 0.85rem 1.1rem 0.85rem 2.5rem;
          color: #F5F4F0;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.9rem;
          font-weight: 300;
          outline: none;
          transition: border-color 0.2s, background 0.2s;
          box-sizing: border-box;
        }
        .signup-input::placeholder { color: rgba(245,244,240,0.22); }
        .signup-input:focus {
          border-color: rgba(123,92,245,0.55);
          background: rgba(123,92,245,0.05);
        }

        .btn-main {
          width: 100%;
          padding: 0.95rem;
          border-radius: 12px;
          border: none;
          background: linear-gradient(135deg, #7B5CF5, #3B8BEB);
          color: white;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.92rem;
          font-weight: 500;
          cursor: pointer;
          transition: opacity 0.2s, transform 0.2s;
          position: relative;
          overflow: hidden;
        }
        .btn-main::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(255,255,255,0.12), transparent);
          border-radius: inherit;
        }
        .btn-main:hover:not(:disabled) { opacity: 0.88; transform: translateY(-1px); }
        .btn-main:disabled { opacity: 0.5; cursor: not-allowed; }

        .strength-bar-fill {
          height: 100%;
          border-radius: 100px;
          transition: width 0.4s ease, background 0.4s ease;
        }
      `}</style>

      {/* Ambient glows */}
      <div style={{ position: "fixed", top: "-15%", left: "50%", transform: "translateX(-50%)", width: 700, height: 600, background: "radial-gradient(ellipse, rgba(123,92,245,0.14) 0%, transparent 65%)", pointerEvents: "none", zIndex: 0 }} />
      <div style={{ position: "fixed", bottom: "-10%", right: "5%", width: 400, height: 400, background: "radial-gradient(circle, rgba(59,139,235,0.08) 0%, transparent 70%)", pointerEvents: "none", zIndex: 0 }} />

      {/* Background grid */}
      <div style={{
        position: "fixed", inset: 0, zIndex: 0,
        backgroundImage: `linear-gradient(rgba(123,92,245,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(123,92,245,0.03) 1px, transparent 1px)`,
        backgroundSize: "60px 60px",
        maskImage: "radial-gradient(ellipse 70% 70% at 50% 50%, black 30%, transparent 100%)",
        WebkitMaskImage: "radial-gradient(ellipse 70% 70% at 50% 50%, black 30%, transparent 100%)",
        pointerEvents: "none",
      }} />

      {/* Card */}
      <div style={{
        position: "relative",
        zIndex: 1,
        width: "100%",
        maxWidth: 420,
        background: "rgba(255,255,255,0.025)",
        border: "1px solid rgba(255,255,255,0.08)",
        borderRadius: 28,
        padding: "2.75rem 2.5rem",
        backdropFilter: "blur(20px)",
        animation: "fadeUp 0.6s ease both",
      }}>

        {/* Top accent line */}
        <div style={{ position: "absolute", top: 0, left: "15%", right: "15%", height: 1, background: "linear-gradient(90deg, transparent, rgba(123,92,245,0.6), transparent)", borderRadius: 100 }} />

        {/* Logo */}
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "1.3rem", letterSpacing: "-0.03em", background: "linear-gradient(135deg, #7B5CF5, #3B8BEB)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", marginBottom: "0.4rem" }}>
            InterviewAI
          </div>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem" }}>
            <div style={{ width: 5, height: 5, borderRadius: "50%", background: "#7B5CF5", animation: "pulse 2s infinite" }} />
            <span style={{ fontSize: "0.72rem", color: "rgba(245,244,240,0.35)", fontWeight: 300, letterSpacing: "0.04em" }}>AI-Powered Interview Coach</span>
          </div>
        </div>

        {/* Heading */}
        <h1 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "1.75rem", letterSpacing: "-0.04em", lineHeight: 1.1, marginBottom: "0.5rem", textAlign: "center" }}>
          Start Practicing
        </h1>
        <p style={{ fontSize: "0.875rem", color: "rgba(245,244,240,0.38)", fontWeight: 300, textAlign: "center", marginBottom: "2rem", lineHeight: 1.6 }}>
          Create your account and land that dream offer
        </p>

        {/* Form */}
        <form onSubmit={handleSignUp} style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>

          {/* Email */}
          <div style={{ position: "relative" }}>
            <svg style={{ position: "absolute", left: "1rem", top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }} width="14" height="14" viewBox="0 0 14 14" fill="none">
              <rect x="1" y="3" width="12" height="8" rx="2" stroke="rgba(245,244,240,0.25)" strokeWidth="1.2"/>
              <path d="M1 5l6 4 6-4" stroke="rgba(245,244,240,0.25)" strokeWidth="1.2" strokeLinecap="round"/>
            </svg>
            <input
              className="signup-input"
              type="email"
              placeholder="Email address"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Password */}
          <div style={{ position: "relative" }}>
            <svg style={{ position: "absolute", left: "1rem", top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }} width="14" height="14" viewBox="0 0 14 14" fill="none">
              <rect x="2" y="6" width="10" height="7" rx="1.5" stroke="rgba(245,244,240,0.25)" strokeWidth="1.2"/>
              <path d="M4 6V4.5a3 3 0 016 0V6" stroke="rgba(245,244,240,0.25)" strokeWidth="1.2" strokeLinecap="round"/>
            </svg>
            <input
              className="signup-input"
              type="password"
              placeholder="Min. 8 characters"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
          </div>

          {/* Password strength indicator */}
          {password.length > 0 && (() => {
            const score = [password.length >= 8, /[A-Z]/.test(password), /[0-9]/.test(password), /[^A-Za-z0-9]/.test(password)].filter(Boolean).length;
            const labels = ["", "Weak", "Fair", "Good", "Strong"];
            const colors = ["", "#E24B4A", "#F5A623", "#3B8BEB", "#5DCAA5"];
            return (
              <div style={{ padding: "0 0.25rem" }}>
                <div style={{ display: "flex", gap: "4px", marginBottom: "0.35rem" }}>
                  {[1,2,3,4].map(i => (
                    <div key={i} style={{ flex: 1, height: 3, borderRadius: 100, background: "rgba(255,255,255,0.07)", overflow: "hidden" }}>
                      <div className="strength-bar-fill" style={{ width: score >= i ? "100%" : "0%", background: colors[score] }} />
                    </div>
                  ))}
                </div>
                <div style={{ fontSize: "0.72rem", color: colors[score], fontWeight: 400 }}>{labels[score]}</div>
              </div>
            );
          })()}

          {/* Terms */}
          <p style={{ fontSize: "0.75rem", color: "rgba(245,244,240,0.28)", fontWeight: 300, lineHeight: 1.6, padding: "0 0.25rem" }}>
            By creating an account you agree to our{" "}
            <a href="#" style={{ color: "rgba(155,124,247,0.65)", textDecoration: "none" }}>Terms of Service</a>
            {" "}and{" "}
            <a href="#" style={{ color: "rgba(155,124,247,0.65)", textDecoration: "none" }}>Privacy Policy</a>
          </p>

          <button type="submit" className="btn-main" disabled={loading} style={{ marginTop: "0.25rem" }}>
            {loading ? "Creating account…" : "Create Account →"}
          </button>
        </form>

        {/* Divider */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", margin: "1.5rem 0" }}>
          <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.07)" }} />
          <span style={{ fontSize: "0.75rem", color: "rgba(245,244,240,0.25)", fontWeight: 300 }}>social sign-up coming soon</span>
          <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.07)" }} />
        </div>

        {/* Social placeholders */}
        <div style={{ display: "flex", gap: "0.65rem" }}>
          {[
            [<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M15.36 8.18c0-.57-.05-1.12-.14-1.64H8v3.1h4.12a3.52 3.52 0 01-1.53 2.31v1.92h2.47c1.45-1.33 2.3-3.3 2.3-5.69z" fill="#4285F4"/><path d="M8 16c2.07 0 3.8-.69 5.07-1.86l-2.47-1.92c-.68.46-1.56.73-2.6.73-2 0-3.7-1.35-4.3-3.17H1.15v1.98A7.99 7.99 0 008 16z" fill="#34A853"/><path d="M3.7 9.78A4.83 4.83 0 013.44 8c0-.62.11-1.22.26-1.78V4.24H1.15A8 8 0 000 8c0 1.29.31 2.51.85 3.59" fill="#FBBC05"/><path d="M8 3.18c1.13 0 2.14.39 2.94 1.15l2.2-2.2A7.93 7.93 0 008 0 7.99 7.99 0 001.15 4.24L3.7 6.22C4.3 4.4 6 3.18 8 3.18z" fill="#EA4335"/></svg>, "Google"],
            [<svg width="16" height="16" viewBox="0 0 16 16" fill="rgba(245,244,240,0.4)"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/></svg>, "GitHub"],
          ].map(([icon, label]) => (
            <div key={label} style={{ flex: 1, padding: "0.75rem", borderRadius: 12, border: "1px solid rgba(255,255,255,0.07)", background: "rgba(255,255,255,0.02)", display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem", opacity: 0.45, cursor: "not-allowed" }}>
              {icon}
              <span style={{ fontSize: "0.8rem", color: "rgba(245,244,240,0.5)", fontWeight: 300 }}>{label}</span>
            </div>
          ))}
        </div>

        {/* Footer link */}
        <p style={{ textAlign: "center", fontSize: "0.82rem", color: "rgba(245,244,240,0.3)", marginTop: "1.75rem", fontWeight: 300 }}>
          Already have an account?{" "}
          <Link to="/signin" style={{ color: "rgba(155,124,247,0.85)", textDecoration: "none", fontWeight: 400 }}
            onMouseEnter={e => e.target.style.color = "#9B7CF7"}
            onMouseLeave={e => e.target.style.color = "rgba(155,124,247,0.85)"}>
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}