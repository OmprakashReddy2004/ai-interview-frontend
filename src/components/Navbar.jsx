import { onAuthStateChanged, signOut } from "firebase/auth";
import { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { auth } from "../firebase";

export default function Navbar() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [interviewOpen, setInterviewOpen] = useState(false);
  const dropdownRef = useRef(null);

  // ✅ Track login state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => setUser(currentUser));
    return () => unsubscribe();
  }, []);

  // ✅ Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setInterviewOpen(false);
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
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

  const handleDropdownSelect = (path) => {
    navigate(path);
    setInterviewOpen(false);
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
      <div className="flex space-x-4 items-center" ref={dropdownRef}>
        <Link className={linkClass("/")} to="/">Home</Link>
        <Link className={linkClass("/resume-analyzer")} to="/resume-analyzer">
          Resume Analyzer
        </Link>

        {/* Interview Dropdown */}
        <div
          className="relative"
          onMouseEnter={() => setInterviewOpen(true)}
          onMouseLeave={() => setInterviewOpen(false)}
        >
          <button
            onClick={() => setInterviewOpen(!interviewOpen)}
            className={`px-4 py-2 rounded-md transition-all duration-300 ${
              pathname.startsWith("/interview")
                ? "bg-blue-600 text-white shadow-md shadow-blue-500/30"
                : "text-gray-300 hover:text-white hover:bg-blue-800/40"
            }`}
          >
            Interview ▾
          </button>

          {/* Dropdown menu */}
          <div
            className={`absolute top-full mt-1 w-52 bg-gray-900 border border-gray-700 rounded-lg shadow-xl transform transition-all duration-200 origin-top ${
              interviewOpen
                ? "opacity-100 scale-100 visible"
                : "opacity-0 scale-95 invisible"
            }`}
            onMouseEnter={() => setInterviewOpen(true)}
            onMouseLeave={() => setInterviewOpen(false)}
          >
            <button
              onClick={() => handleDropdownSelect("/interview/topics")}
              className="block w-full text-left px-4 py-2 text-gray-300 hover:bg-gray-800 transition"
              
            >
              Topics-wise
            </button>
            <button
              onClick={() => handleDropdownSelect("/interview/topics")}
              className="block w-full text-left px-4 py-2 text-gray-300 hover:bg-gray-800 transition rounded-b-lg"
            >
              Mock Interview
            </button>
          </div>
        </div>

        <Link className={linkClass("/dashboard")} to="/dashboard">
          Dashboard
        </Link>
      </div>

      {/* Profile */}
      <div className="relative">
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-full text-white font-semibold transition"
        >
          {user ? (
            <>
              <img
                src={
                  user.photoURL ||
                  "https://api.dicebear.com/7.x/avataaars/svg?seed=AIUser"
                }
                alt="Profile"
                className="w-7 h-7 rounded-full border-2 border-white"
              />
              <span className="hidden sm:inline">{user.displayName || "Profile"}</span>
            </>
          ) : (
            <span>Sign In</span>
          )}
        </button>

        {menuOpen && (
          <div className="absolute right-0 mt-3 w-44 bg-gray-900 border border-gray-700 rounded-lg shadow-xl">
            {user ? (
              <>
                <p className="text-sm text-gray-400 px-3 py-2 truncate">{user.email}</p>
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
                  onClick={() => handleDropdownSelect("/signin")}
                  className="block w-full text-left px-3 py-2 hover:bg-gray-800 text-gray-300"
                >
                  Login
                </button>
                <button
                  onClick={() => handleDropdownSelect("/signup")}
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
