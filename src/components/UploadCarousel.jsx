import { useEffect, useState } from "react";
import JobDescriptionStep from "./JobDescriptionStep";
import ResumeUploadStep from "./ResumeUploadStep";
import TailoredSuggestionsStep from "./TailoredSuggestionsStep";
import { CardSpotlight } from "./ui/card-spotlight";

const steps = [
  { id: 1, title: "Upload Resume" },
  { id: 2, title: "Enter Job Description" },
  { id: 3, title: "Tailored Suggestions" },
];

export default function UploadCarousel() {
  const [currentStep, setCurrentStep] = useState(1);
  const [resumeFile, setResumeFile] = useState(null);
  const [jobDescription, setJobDescription] = useState("");
  const [shouldAnalyze, setShouldAnalyze] = useState(false); // 🚀 trigger flag

  const nextStep = () => {
    if (currentStep === 2 && jobDescription.trim().length > 50 && resumeFile) {
      // When moving from JD → Tailored Suggestions
      setShouldAnalyze(true);
    }
    if (currentStep < steps.length) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => setCurrentStep((s) => Math.max(1, s - 1));

  useEffect(() => {
    if (currentStep !== 3) setShouldAnalyze(false); // reset flag if user goes back
  }, [currentStep]);

  return (
    <CardSpotlight className="max-w-3xl mx-auto mt-10 p-8">
      {/* --- Stepper --- */}
      <div className="flex justify-between items-start mb-8 relative">
        <div className="absolute top-4 left-[15%] right-[15%] h-0.5 bg-gray-700">
          <div
            className="h-full bg-blue-500 transition-all duration-500"
            style={{
              width: `${((currentStep - 1) / (steps.length - 1)) * 100}%`,
            }}
          />
        </div>

        {steps.map((step) => (
          <div
            key={step.id}
            className={`flex flex-col items-center z-10 w-1/2 ${
              step.id <= currentStep
                ? "cursor-pointer"
                : "cursor-not-allowed opacity-50"
            }`}
            onClick={() => step.id <= currentStep && setCurrentStep(step.id)}
          >
            <div
              className={`w-10 h-10 flex items-center justify-center rounded-full border-4 ${
                step.id < currentStep
                  ? "bg-green-500 border-green-500 text-white"
                  : step.id === currentStep
                  ? "bg-blue-600 border-blue-600 text-white"
                  : "bg-gray-800 border-gray-700 text-gray-400"
              }`}
            >
              {step.id}
            </div>
            <span
              className={`text-sm mt-2 ${
                step.id === currentStep
                  ? "text-blue-400 font-semibold"
                  : "text-gray-400"
              }`}
            >
              {step.title}
            </span>
          </div>
        ))}
      </div>

      {/* --- Step Content --- */}
      <div className="min-h-[300px] bg-gray-900 rounded-lg p-6 border border-gray-700">
        {currentStep === 1 && (
          <ResumeUploadStep
            resumeFile={resumeFile}
            setResumeFile={setResumeFile}
          />
        )}

        {currentStep === 2 && (
          <JobDescriptionStep
            jobDescription={jobDescription}
            setJobDescription={setJobDescription}
          />
        )}

        {currentStep === 3 && (
          <TailoredSuggestionsStep
            resumeFile={resumeFile}
            jobDescription={jobDescription}
            shouldAnalyze={shouldAnalyze} // 🔥 trigger signal
          />
        )}
      </div>

      {/* --- Navigation --- */}
      <div className="flex justify-between mt-8">
        <button
          onClick={prevStep}
          disabled={currentStep === 1}
          className="px-6 py-2 rounded-lg bg-gray-800 hover:bg-gray-700 text-gray-300 disabled:opacity-50"
        >
          ← Previous
        </button>
        <button
          onClick={nextStep}
          disabled={
            (currentStep === 1 && !resumeFile) ||
            (currentStep === 2 && jobDescription.trim().length < 50)
          }
          className="px-6 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium"
        >
          {currentStep < 3 ? "Next Step →" : "Finish"}
        </button>
      </div>
    </CardSpotlight>
  );
}
