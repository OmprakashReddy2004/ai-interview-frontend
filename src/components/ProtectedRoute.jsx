import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { auth } from "../firebase";

export default function ProtectedRoute({ children }) {
  const [user, setUser] = useState(undefined); // undefined = still checking
  const location = useLocation();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => setUser(u ?? null));
    return () => unsub();
  }, []);

  // Firebase is still checking auth state — show spinner to avoid flash
  if (user === undefined) {
    return (
      <div style={{
        minHeight: "100vh",
        background: "#050508",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}>
        <style>{`
          @keyframes spin { to { transform: rotate(360deg); } }
        `}</style>
        <div style={{
          width: 28, height: 28,
          border: "2px solid rgba(123,92,245,0.2)",
          borderTopColor: "#7B5CF5",
          borderRadius: "50%",
          animation: "spin 0.7s linear infinite",
        }} />
      </div>
    );
  }

  // Not signed in → send to /signin, remember where they were going
  if (!user) {
    return <Navigate to="/signin" state={{ from: location.pathname }} replace />;
  }

  // Signed in but email not verified → send back to /signup to complete verification
  if (!user.emailVerified) {
    return <Navigate to="/signup" replace />;
  }

  // All good — render the page
  return children;
}