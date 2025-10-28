import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import InterviewLive from "./pages/InterviewLive";
import InterviewPage from "./pages/InterviewPage";
import InterviewPrep from "./pages/InterviewPrep";
import ResumeAnalyzerPage from "./pages/ResumeAnalyzerPage";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";
import TopicWiseInterview from "./pages/TopicWiseInterview";
export default function App() {
  return (
    <BrowserRouter>
      <div className="bg-black min-h-screen text-white font-sans">
        <Navbar />
        <div className="p-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signin" element={<SignInPage />} />
            <Route path="/signup" element={<SignUpPage />} />

            {/* 🔐 Protected Routes */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/interview"
              element={
                <ProtectedRoute>
                  <InterviewPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/resume-analyzer"
              element={
                <ProtectedRoute>
                  <ResumeAnalyzerPage />
                </ProtectedRoute>
              }
            />
            <Route path="/interview/topics" 
              element={
                <ProtectedRoute>
                    <TopicWiseInterview />
                  </ProtectedRoute>
              }
            />
            <Route path="/interview/prep" 
              element={
                <ProtectedRoute>
                   <InterviewPrep />
                  </ProtectedRoute>
              }
            />
            <Route path="/interview/live" 
              element={
                <ProtectedRoute>
                   <InterviewLive />
                  </ProtectedRoute>
              }
            />

          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}
