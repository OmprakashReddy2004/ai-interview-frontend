import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { auth } from "./firebase";

import ProtectedRoute from "./components/ProtectedRoute";
import { InterviewProvider } from "./context/InterviewContext";
import Dashboard from "./pages/Dashboard";
import DebriefPage from "./pages/DebriefPage";
import Home from "./pages/Home";
import InterviewLive from "./pages/InterviewLive";
import InterviewPage from "./pages/InterviewPage";
import InterviewPrep from "./pages/InterviewPrep";
import InterviewSetupPage from "./pages/InterviewSetupPage";
import LiveInterviewPage from "./pages/LiveInterviewPage";
import MicCheckPage from "./pages/MicCheckPage";
import ResumeAnalyzerPage from "./pages/ResumeAnalyzerPage";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";
import TopicWiseInterview from "./pages/TopicWiseInterview";

export default function App() {
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (user) => {
      if (user) {
        
         
         
      }
    });
    return () => unsub();
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/resume-analyzer" element={<ResumeAnalyzerPage />} />

        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/interview" element={<ProtectedRoute><InterviewPage /></ProtectedRoute>} />
        <Route path="/interview/topics" element={<ProtectedRoute><TopicWiseInterview /></ProtectedRoute>} />
        <Route path="/interview/prep" element={<ProtectedRoute><InterviewPrep /></ProtectedRoute>} />
        <Route path="/interview/live" element={<ProtectedRoute><InterviewLive /></ProtectedRoute>} />

        <Route path="/interview/setup" element={<ProtectedRoute><InterviewProvider><InterviewSetupPage /></InterviewProvider></ProtectedRoute>} />
        <Route path="/interview/mic-check" element={<ProtectedRoute><InterviewProvider><MicCheckPage /></InterviewProvider></ProtectedRoute>} />
        <Route path="/interview/session" element={<ProtectedRoute><InterviewProvider><LiveInterviewPage /></InterviewProvider></ProtectedRoute>} />
        <Route path="/interview/debrief" element={<ProtectedRoute><InterviewProvider><DebriefPage /></InterviewProvider></ProtectedRoute>} />
      </Routes>
    </BrowserRouter>
  );
}