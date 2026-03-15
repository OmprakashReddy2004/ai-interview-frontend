import {
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, githubProvider, googleProvider } from "../firebase";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(null); // 'email' | 'google' | 'github'

  const navigate = useNavigate();

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    setLoading("email");
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(null);
    }
  };

  const handleGoogleLogin = async () => {
    setLoading("google");
    try {
      await signInWithPopup(auth, googleProvider);
      navigate("/");
    } catch (error) {
      alert(`Google login failed: ${error.code}`);
    } finally {
      setLoading(null);
    }
  };

  const handleGithubLogin = async () => {
    setLoading("github");
    try {
      await signInWithPopup(auth, githubProvider);
      navigate("/");
    } catch (error) {
      alert(`GitHub login failed: ${error.code}`);
    } finally {
      setLoading(null);
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

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50%       { opacity: 0.4; transform: scale(1.4); }
        }

        .signin-input {
          width: 100%;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.09);
          border-radius: 12px;
          padding: 0.85rem 1.1rem;
          color: #F5F4F0;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.9rem;
          font-weight: 300;
          outline: none;
          transition: border-color 0.2s, background 0.2s;
          box-sizing: border-box;
        }
        .signin-input::placeholder { color: rgba(245,244,240,0.25); }
        .signin-input:focus {
          border-color: rgba(123,92,245,0.5);
          background: rgba(123,92,245,0.05);
        }

        .btn-main {
          width: 100%;
          padding: 0.9rem;
          border-radius: 12px;
          border: none;
          background: linear-gradient(135deg, #7B5CF5, #3B8BEB);
          color: white;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.9rem;
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

        .btn-oauth {
          width: 100%;
          padding: 0.85rem;
          border-radius: 12px;
          border: 1px solid rgba(255,255,255,0.09);
          background: rgba(255,255,255,0.03);
          color: rgba(245,244,240,0.75);
          font-family: 'DM Sans', sans-serif;
          font-size: 0.875rem;
          font-weight: 400;
          cursor: pointer;
          transition: background 0.2s, border-color 0.2s, transform 0.2s;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.65rem;
          box-sizing: border-box;
        }
        .btn-oauth:hover:not(:disabled) {
          background: rgba(255,255,255,0.07);
          border-color: rgba(255,255,255,0.16);
          transform: translateY(-1px);
          color: #F5F4F0;
        }
        .btn-oauth:disabled { opacity: 0.5; cursor: not-allowed; }
      `}</style>

      {/* Ambient glows */}
      <div style={{ position: "fixed", top: "-20%", left: "50%", transform: "translateX(-50%)", width: 700, height: 600, background: "radial-gradient(ellipse, rgba(123,92,245,0.15) 0%, transparent 65%)", pointerEvents: "none" }} />
      <div style={{ position: "fixed", bottom: "-10%", right: "5%", width: 400, height: 400, background: "radial-gradient(circle, rgba(59,139,235,0.08) 0%, transparent 70%)", pointerEvents: "none" }} />

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
          Welcome back
        </h1>
        <p style={{ fontSize: "0.875rem", color: "rgba(245,244,240,0.38)", fontWeight: 300, textAlign: "center", marginBottom: "2rem", lineHeight: 1.6 }}>
          Sign in to continue your interview prep
        </p>

        {/* Email form */}
        <form onSubmit={handleEmailLogin} style={{ display: "flex", flexDirection: "column", gap: "0.75rem", marginBottom: "1.5rem" }}>
          <div style={{ position: "relative" }}>
            <svg style={{ position: "absolute", left: "1rem", top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }} width="14" height="14" viewBox="0 0 14 14" fill="none">
              <rect x="1" y="3" width="12" height="8" rx="2" stroke="rgba(245,244,240,0.25)" strokeWidth="1.2"/>
              <path d="M1 5l6 4 6-4" stroke="rgba(245,244,240,0.25)" strokeWidth="1.2" strokeLinecap="round"/>
            </svg>
            <input
              className="signin-input"
              type="email"
              placeholder="Email address"
              value={email}
              onChange={e => setEmail(e.target.value)}
              style={{ paddingLeft: "2.5rem" }}
              required
            />
          </div>

          <div style={{ position: "relative" }}>
            <svg style={{ position: "absolute", left: "1rem", top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }} width="14" height="14" viewBox="0 0 14 14" fill="none">
              <rect x="2" y="6" width="10" height="7" rx="1.5" stroke="rgba(245,244,240,0.25)" strokeWidth="1.2"/>
              <path d="M4 6V4.5a3 3 0 016 0V6" stroke="rgba(245,244,240,0.25)" strokeWidth="1.2" strokeLinecap="round"/>
            </svg>
            <input
              className="signin-input"
              type="password"
              placeholder="Password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              style={{ paddingLeft: "2.5rem" }}
              required
            />
          </div>

          <div style={{ textAlign: "right", marginTop: "-0.25rem" }}>
            <a href="#" style={{ fontSize: "0.78rem", color: "rgba(155,124,247,0.7)", textDecoration: "none", fontWeight: 400 }}
              onMouseEnter={e => e.target.style.color = "#9B7CF7"}
              onMouseLeave={e => e.target.style.color = "rgba(155,124,247,0.7)"}>
              Forgot password?
            </a>
          </div>

          <button type="submit" className="btn-main" disabled={loading !== null}>
            {loading === "email" ? "Signing in…" : "Sign In"}
          </button>
        </form>

        {/* Divider */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1.25rem" }}>
          <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.07)" }} />
          <span style={{ fontSize: "0.75rem", color: "rgba(245,244,240,0.25)", fontWeight: 300 }}>or continue with</span>
          <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.07)" }} />
        </div>

        {/* OAuth buttons */}
        <div style={{ display: "flex", flexDirection: "column", gap: "0.65rem" }}>
          <button className="btn-oauth" onClick={handleGoogleLogin} disabled={loading !== null}>
            {/* Google icon */}
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M15.36 8.18c0-.57-.05-1.12-.14-1.64H8v3.1h4.12a3.52 3.52 0 01-1.53 2.31v1.92h2.47c1.45-1.33 2.3-3.3 2.3-5.69z" fill="#4285F4"/>
              <path d="M8 16c2.07 0 3.8-.69 5.07-1.86l-2.47-1.92c-.68.46-1.56.73-2.6.73-2 0-3.7-1.35-4.3-3.17H1.15v1.98A7.99 7.99 0 008 16z" fill="#34A853"/>
              <path d="M3.7 9.78A4.83 4.83 0 013.44 8c0-.62.11-1.22.26-1.78V4.24H1.15A8 8 0 000 8c0 1.29.31 2.51.85 3.59" fill="#FBBC05"/>
              <path d="M8 3.18c1.13 0 2.14.39 2.94 1.15l2.2-2.2A7.93 7.93 0 008 0 7.99 7.99 0 001.15 4.24L3.7 6.22C4.3 4.4 6 3.18 8 3.18z" fill="#EA4335"/>
            </svg>
            {loading === "google" ? "Connecting…" : "Continue with Google"}
          </button>

          <button className="btn-oauth" onClick={handleGithubLogin} disabled={loading !== null}>
            {/* GitHub icon */}
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
              <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/>
            </svg>
            {loading === "github" ? "Connecting…" : "Continue with GitHub"}
          </button>
        </div>

        {/* Footer */}
        <p style={{ textAlign: "center", fontSize: "0.82rem", color: "rgba(245,244,240,0.3)", marginTop: "1.75rem", fontWeight: 300 }}>
          Don't have an account?{" "}
          <Link to="/signup" style={{ color: "rgba(155,124,247,0.85)", textDecoration: "none", fontWeight: 400 }}
            onMouseEnter={e => e.target.style.color = "#9B7CF7"}
            onMouseLeave={e => e.target.style.color = "rgba(155,124,247,0.85)"}>
            Sign up free
          </Link>
        </p>
      </div>
    </div>
  );
}