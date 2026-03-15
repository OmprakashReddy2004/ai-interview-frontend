export const pageStyle = {
  fontFamily: "'DM Sans', sans-serif",
  background: "#050508",
  color: "#F5F4F0",
  minHeight: "100vh",
  display: "flex",
  flexDirection: "column",
  position: "relative",
  overflow: "hidden",
};

export const globalCSS = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@300;400;500&display=swap');
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  @keyframes orbPulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.5;transform:scale(1.15)} }
  @keyframes fadeUp { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
`;

export const gridBg = {
  position: "fixed", inset: 0, zIndex: 0,
  backgroundImage: `linear-gradient(rgba(123,92,245,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(123,92,245,0.03) 1px, transparent 1px)`,
  backgroundSize: "60px 60px",
  maskImage: "radial-gradient(ellipse 80% 80% at 50% 40%, black 20%, transparent 100%)",
  WebkitMaskImage: "radial-gradient(ellipse 80% 80% at 50% 40%, black 20%, transparent 100%)",
  pointerEvents: "none",
};

export const navStyle = {
  position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
  display: "flex", alignItems: "center", justifyContent: "space-between",
  padding: "1.1rem 5vw",
  borderBottom: "1px solid rgba(245,244,240,0.06)",
  backdropFilter: "blur(18px)",
  background: "rgba(5,5,8,0.75)",
};

export const logoStyle = {
  fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "1.1rem",
  letterSpacing: "-0.03em",
  background: "linear-gradient(135deg, #7B5CF5, #3B8BEB)",
  WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
};

export const cardStyle = {
  background: "rgba(255,255,255,0.025)",
  border: "1px solid rgba(255,255,255,0.08)",
  borderRadius: 28, padding: "2.5rem",
  position: "relative", overflow: "hidden",
};

export const topAccent = {
  position: "absolute", top: 0, left: "15%", right: "15%", height: 1,
  background: "linear-gradient(90deg, transparent, rgba(123,92,245,0.6), transparent)",
};

export const badgeStyle = {
  display: "inline-flex", alignItems: "center", gap: "0.5rem",
  border: "1px solid rgba(123,92,245,0.35)", background: "rgba(123,92,245,0.08)",
  borderRadius: 100, padding: "0.35rem 1rem", marginBottom: "1.25rem",
  fontSize: "0.72rem", fontWeight: 500, letterSpacing: "0.08em",
  textTransform: "uppercase", color: "rgba(155,124,247,0.9)",
};

export const h1Style = {
  fontFamily: "'Syne', sans-serif", fontWeight: 800,
  fontSize: "clamp(2rem, 5vw, 3rem)", letterSpacing: "-0.04em",
  lineHeight: 1.1, marginBottom: "1rem",
};

export const gradientText = {
  background: "linear-gradient(135deg, #9B7CF7, #5BA8F5)",
  WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
};

export const subStyle = {
  fontSize: "0.95rem", fontWeight: 300,
  color: "rgba(245,244,240,0.4)", lineHeight: 1.7,
};