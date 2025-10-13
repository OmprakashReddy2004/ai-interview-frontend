import { onAuthStateChanged, signOut } from "firebase/auth";
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { auth } from "../firebase";

export default function Navbar() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const linkClass = (path) =>
    `px-4 py-2 rounded-md transition-all duration-300 ${
      pathname === path
        ? "bg-blue-600 text-white shadow-md shadow-blue-500/30"
        : "text-gray-300 hover:text-white hover:bg-blue-800/40"
    }`;

  const handleLogout = async () => {
    await signOut(auth);
    setUser(null);
    navigate("/signin");
  };

  return (
    <nav className="bg-black/80 backdrop-blur-md border-b border-gray-800 sticky top-0 z-50 flex items-center justify-between px-8 py-4">
      {/* Logo */}
      <h1
        className="text-2xl font-bold text-blue-400 tracking-wide cursor-pointer"
        onClick={() => navigate("/")}
      >
        AI Interviewer
      </h1>

      {/* Links */}
      <div className="flex space-x-4">
        <Link className={linkClass("/")} to="/">Home</Link>
        <Link className={linkClass("/resume-analyzer")} to="/resume-analyzer">Resume Analyzer</Link>
        <Link className={linkClass("/interview")} to="/interview">Interview</Link>
        <Link className={linkClass("/dashboard")} to="/dashboard">Dashboard</Link>
      </div>

      {/* Profile Button */}
      <div className="relative">
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-full text-white font-semibold transition"
        >
          {user ? (
            <>
              <img
                src={user.photoURL || "https://api.dicebear.com/7.x/avataaars/svg?seed=AIUser"}
                alt="Profile"
                className="w-7 h-7 rounded-full border-2 border-white"
              />
              <span className="hidden sm:inline">{user.displayName || "Profile"}</span>
            </>
          ) : (
            <span>Sign In</span>
          )}
        </button>

        {/* Dropdown Menu */}
        {menuOpen && (
          <div className="absolute right-0 mt-3 w-44 bg-gray-900 border border-gray-700 rounded-lg shadow-xl">
            {user ? (
              <>
                <p className="text-sm text-gray-400 px-3 py-2 truncate">
                  {user.email}
                </p>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-3 py-2 hover:bg-gray-800 text-gray-300 rounded-b-lg"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => navigate("/signin")}
                  className="block w-full text-left px-3 py-2 hover:bg-gray-800 text-gray-300"
                >
                  Login
                </button>
                <button
                  onClick={() => navigate("/signup")}
                  className="block w-full text-left px-3 py-2 hover:bg-gray-800 text-gray-300 rounded-b-lg"
                >
                  Sign Up
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
