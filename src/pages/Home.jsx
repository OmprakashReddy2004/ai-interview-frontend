import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black text-gray-200">
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center py-24 px-4">
        <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-4">
          Crack Interviews Smarter 
        </h1>
        <p className="text-lg text-gray-400 max-w-2xl mb-8">
          Practice real technical interviews, analyze your spoken answers,
          and track your progress — all powered by AI.
        </p>
        <div className="flex space-x-4">
          <Link
            to="/interview"
            className="px-6 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-lg transition-all"
          >
            Start Practicing
          </Link>
          <Link
            to="/resume-analyzer"
            className="px-6 py-3 rounded-lg border border-gray-600 hover:bg-gray-800 text-gray-300 transition-all"
          >
            Upload Resume
          </Link>
        </div>
      </section>

      {/* Feature Cards Section */}
      <section className="grid md:grid-cols-3 gap-8 px-8 md:px-24 py-16">
        <FeatureCard
          title="🎤 Voice Interview Simulator"
          desc="Experience AI-driven mock interviews that listen and respond like real interviewers."
          to="/interview"
        />
        <FeatureCard
          title="📄 Resume Analyzer"
          desc="Upload your resume and job description to see your compatibility score and missing skills."
          to="/resume-analyzer"
        />
        <FeatureCard
          title="📊 Performance Dashboard"
          desc="Track your clarity, confidence, and progress across multiple sessions."
          to="/dashboard"
        />
      </section>

      {/* Footer */}
      <footer className="text-center text-gray-500 py-6 border-t border-gray-800">
        <p>
          © {new Date().getFullYear()} AI Interviewer — Built for smarter
          interview prep.
        </p>
      </footer>
    </div>
  );
}

// Reusable Card Component
function FeatureCard({ title, desc, to }) {
  return (
    <Link
      to={to}
      className="bg-gray-900 hover:bg-gray-800 rounded-xl p-6 border border-gray-800 hover:border-blue-500/50 transition-all duration-300 shadow-md hover:shadow-blue-500/10 flex flex-col justify-between"
    >
      <div>
        <h3 className="text-xl font-bold text-white mb-3">{title}</h3>
        <p className="text-gray-400 text-sm">{desc}</p>
      </div>
      <div className="mt-4 text-blue-400 font-medium flex items-center space-x-1">
        <span>Learn More</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-4 h-4"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
          />
        </svg>
      </div>
    </Link>
  );
}
