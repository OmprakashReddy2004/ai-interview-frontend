import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import JobDescriptionStep from "./JobDescriptionStep";
import ResumeUploadStep from "./ResumeUploadStep";
import TailoredSuggestionsStep from "./TailoredSuggestionsStep";

const steps = [
  { id: 1, title: "Upload Resume" },
  { id: 2, title: "Enter Job Description" },
  { id: 3, title: "Tailored Suggestions" },
];

export default function UploadCarousel() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [resumeFile, setResumeFile] = useState(null);
  const [jobDescription, setJobDescription] = useState("");
  const [shouldAnalyze, setShouldAnalyze] = useState(false);

  const nextStep = () => {
    if (currentStep === 3) {
      navigate("/");
      return;
    }
    if (currentStep === 2 && jobDescription.trim().length > 50 && resumeFile) {
      setShouldAnalyze(true);
    }
    if (currentStep < steps.length) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => setCurrentStep((s) => Math.max(1, s - 1));

  useEffect(() => {
    if (currentStep !== 3) setShouldAnalyze(false);
  }, [currentStep]);

  const isNextDisabled =
    (currentStep === 1 && !resumeFile) ||
    (currentStep === 2 && jobDescription.trim().length < 50);

  return (
    <div style={{ width: "100%" }}>

      {/* ── Stepper ── */}
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "2.5rem", position: "relative" }}>

        {/* connector line */}
        <div style={{ position: "absolute", top: 18, left: "15%", right: "15%", height: 1, background: "rgba(255,255,255,0.07)", zIndex: 0 }}>
          <div style={{
            height: "100%",
            background: "linear-gradient(90deg, #7B5CF5, #3B8BEB)",
            borderRadius: 100,
            transition: "width 0.5s ease",
            width: `${((currentStep - 1) / (steps.length - 1)) * 100}%`,
          }} />
        </div>

        {steps.map((step) => {
          const isDone    = step.id < currentStep;
          const isActive  = step.id === currentStep;
          const isLocked  = step.id > currentStep;

          return (
            <div
              key={step.id}
              onClick={() => step.id <= currentStep && setCurrentStep(step.id)}
              style={{
                display: "flex", flexDirection: "column", alignItems: "center",
                flex: 1, zIndex: 1,
                cursor: isLocked ? "not-allowed" : "pointer",
                opacity: isLocked ? 0.4 : 1,
                transition: "opacity 0.3s",
              }}
            >
              {/* circle */}
              <div style={{
                width: 36, height: 36,
                borderRadius: "50%",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontFamily: "'Syne', sans-serif",
                fontWeight: 700,
                fontSize: "0.85rem",
                transition: "all 0.3s",
                background: isDone
                  ? "rgba(93,202,165,0.15)"
                  : isActive
                  ? "linear-gradient(135deg, #7B5CF5, #3B8BEB)"
                  : "rgba(255,255,255,0.04)",
                border: isDone
                  ? "1px solid rgba(93,202,165,0.4)"
                  : isActive
                  ? "none"
                  : "1px solid rgba(255,255,255,0.1)",
                color: isDone ? "#5DCAA5" : isActive ? "white" : "rgba(245,244,240,0.3)",
                boxShadow: isActive ? "0 0 20px rgba(123,92,245,0.4)" : "none",
              }}>
                {isDone
                  ? <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2 7l3.5 3.5L12 4" stroke="#5DCAA5" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  : step.id
                }
              </div>

              {/* label */}
              <span style={{
                marginTop: "0.5rem",
                fontSize: "0.75rem",
                fontWeight: isActive ? 500 : 300,
                color: isActive ? "rgba(155,124,247,0.9)" : "rgba(245,244,240,0.35)",
                letterSpacing: "0.02em",
                textAlign: "center",
                transition: "color 0.3s",
              }}>
                {step.title}
              </span>
            </div>
          );
        })}
      </div>

      {/* ── Step content ── */}
      <div style={{
        background: "rgba(255,255,255,0.02)",
        border: "1px solid rgba(255,255,255,0.07)",
        borderRadius: 20,
        padding: "2rem",
        minHeight: 300,
        position: "relative",
        overflow: "hidden",
      }}>
        {/* inner top accent */}
        <div style={{ position: "absolute", top: 0, left: "20%", right: "20%", height: 1, background: "linear-gradient(90deg, transparent, rgba(123,92,245,0.3), transparent)" }} />

        {currentStep === 1 && <ResumeUploadStep resumeFile={resumeFile} setResumeFile={setResumeFile} />}
        {currentStep === 2 && <JobDescriptionStep jobDescription={jobDescription} setJobDescription={setJobDescription} />}
        {currentStep === 3 && <TailoredSuggestionsStep resumeFile={resumeFile} jobDescription={jobDescription} shouldAnalyze={shouldAnalyze} />}
      </div>

      {/* ── Navigation ── */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "1.75rem" }}>
        <button
          onClick={prevStep}
          disabled={currentStep === 1}
          style={{
            padding: "0.7rem 1.5rem",
            borderRadius: 100,
            border: "1px solid rgba(255,255,255,0.09)",
            background: "rgba(255,255,255,0.03)",
            color: currentStep === 1 ? "rgba(245,244,240,0.2)" : "rgba(245,244,240,0.6)",
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "0.88rem",
            fontWeight: 400,
            cursor: currentStep === 1 ? "not-allowed" : "pointer",
            transition: "all 0.2s",
            display: "flex", alignItems: "center", gap: "0.4rem",
          }}
          onMouseEnter={e => { if (currentStep !== 1) e.currentTarget.style.background = "rgba(255,255,255,0.07)"; }}
          onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.03)"; }}
        >
          ← Previous
        </button>

        <button
          onClick={nextStep}
          disabled={isNextDisabled}
          style={{
            padding: "0.7rem 1.75rem",
            borderRadius: 100,
            border: "none",
            background: isNextDisabled
              ? "rgba(123,92,245,0.2)"
              : "linear-gradient(135deg, #7B5CF5, #3B8BEB)",
            color: isNextDisabled ? "rgba(245,244,240,0.3)" : "white",
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "0.88rem",
            fontWeight: 500,
            cursor: isNextDisabled ? "not-allowed" : "pointer",
            transition: "all 0.2s",
            display: "flex", alignItems: "center", gap: "0.4rem",
          }}
          onMouseEnter={e => { if (!isNextDisabled) e.currentTarget.style.opacity = "0.88"; }}
          onMouseLeave={e => { e.currentTarget.style.opacity = "1"; }}
        >
          {currentStep < 3 ? "Next Step →" : "← Back to Home"}
        </button>
      </div>
    </div>
  );
}