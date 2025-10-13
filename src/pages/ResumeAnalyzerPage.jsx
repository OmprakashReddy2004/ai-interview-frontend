import UploadCarousel from "../components/UploadCarousel";

export default function ResumeAnalyzerPage() {
  return (
    <div className="min-h-screen flex justify-center items-center bg-black text-white">
      <div className="w-full max-w-4xl">
        <h2 className="text-3xl font-bold text-blue-400 mb-8 text-center">
          📄 Resume & Job Description Analyzer
        </h2>
        <UploadCarousel />
      </div>
    </div>
  );
}
