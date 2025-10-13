import { useState } from "react";
import JobDescriptionStep from "./JobDescriptionStep";
import ResumeUploadStep from "./ResumeUploadStep";
import TailoredSuggestionsStep from "./TailoredSuggestionsStep";
import { CardSpotlight } from "./ui/card-spotlight";

const steps = [
  { id: 1, title: "Upload Resume", Component: ResumeUploadStep },
  { id: 2, title: "Enter Job Description", Component: JobDescriptionStep },
  {id:3, title: "Tailored Suggestions", Component: TailoredSuggestionsStep }
];

export default function UploadCarousel() {
  const [currentStep, setCurrentStep] = useState(1);
  const [resumeFile, setResumeFile] = useState(null);
  const [jobDescription, setJobDescription] = useState("");

  const isStepComplete = (stepId) => {
    if (stepId === 1) return !!resumeFile;
    if (stepId === 2) return jobDescription.trim().length > 50;
    return false;
  };

  const nextStep = () => {
    if (currentStep < steps.length && isStepComplete(currentStep)) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const stepData = steps.find((s) => s.id === currentStep);

  return (
    <CardSpotlight className="max-w-3xl mx-auto mt-10 p-8">
      {/* Progress */}
      <div className="flex justify-between items-start mb-8 relative">
        <div className="absolute top-4 left-[15%] right-[15%] h-0.5 bg-gray-700">
          <div
            className="h-full bg-blue-500 transition-all duration-500"
            style={{ width: `${(currentStep - 1) / (steps.length - 1) * 100}%` }}
          />
        </div>

        {steps.map((step) => (
          <div
            key={step.id}
            className={`flex flex-col items-center z-10 w-1/2 transition-all duration-300 ${
              isStepComplete(step.id) || step.id === currentStep
                ? "cursor-pointer"
                : "cursor-not-allowed opacity-50"
            }`}
            onClick={() => step.id <= currentStep && setCurrentStep(step.id)}
          >
            <div
              className={`w-10 h-10 flex items-center justify-center rounded-full border-4 transition-all duration-300 ${
                step.id < currentStep
                  ? "bg-green-500 border-green-500 text-white"
                  : step.id === currentStep
                  ? "bg-blue-600 border-blue-600 text-white scale-105"
                  : "bg-gray-800 border-gray-700 text-gray-400"
              }`}
            >
              <span className="font-semibold text-lg">{step.id}</span>
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

      {/* Step title */}
    

      {/* Step content */}
      <div className="min-h-[280px] flex items-start p-4 bg-gray-900 rounded-lg border border-gray-700">
        {stepData.id === 1 && (
          <ResumeUploadStep
            setResumeFile={setResumeFile}
            resumeFile={resumeFile}
          />
        )}
        {stepData.id === 2 && (
          <JobDescriptionStep
            setJobDescription={setJobDescription}
            jobDescription={jobDescription}
          />
        )}
      </div>

      {/* Navigation */}
      <div className="flex justify-between mt-8">
        <button
          onClick={prevStep}
          disabled={currentStep === 1}
          className="px-6 py-2 rounded-lg bg-gray-800 hover:bg-gray-700 text-gray-300 disabled:opacity-50 transition"
        >
          ← Previous
        </button>
        <button
          onClick={nextStep}
          disabled={currentStep === steps.length || !isStepComplete(currentStep)}
          className={`px-6 py-2 rounded-lg text-white font-medium transition ${
            isStepComplete(currentStep)
              ? "bg-blue-600 hover:bg-blue-700 shadow-md"
              : "bg-blue-400 cursor-not-allowed opacity-70"
          }`}
        >
          {currentStep < steps.length ? "Next Step →" : "All Set!"}
        </button>
      </div>
    </CardSpotlight>
  );
}
