import axios from "axios";
import { useState } from "react";

export default function UploadSection() {
  const [resume, setResume] = useState(null);
  const [jdText, setJdText] = useState("");      // <-- JD text instead of file
  const [score, setScore] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleUpload = async () => {
    if (!resume || jdText.trim() === "") return alert("Please upload a resume and enter job description!");
    setLoading(true);

    const formData = new FormData();
    formData.append("resume", resume);
    formData.append("jdText", jdText); // send JD as text instead of PDF file

    try {
      const res = await axios.post("http://localhost:8080/api/resume/analyze", formData);
      setScore(res.data.compatibilityScore);
    } catch (err) {
      console.error(err);
      alert("Backend not reachable!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white shadow-lg rounded-2xl p-6 w-[90%] max-w-md">
      <h3 className="text-lg font-semibold text-blue-700 mb-4">
        📄 Upload Resume & Paste Job Description
      </h3>

      {/* Resume Upload */}
      <label className="block text-gray-700 font-medium mb-1">Upload Resume (PDF)</label>
      <input
        type="file"
        accept=".pdf"
        onChange={(e) => setResume(e.target.files[0])}
        className="block w-full mb-4 border border-gray-300 rounded-md p-2"
      />

      {/* JD Text Area */}
      <label className="block text-gray-700 font-medium mb-1">Paste Job Description</label>
      <textarea
        rows={6}
        placeholder="Paste the job description here..."
        value={jdText}
        onChange={(e) => setJdText(e.target.value)}
        className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      {/* Submit Button */}
      <button
        onClick={handleUpload}
        disabled={loading}
        className={`w-full py-2 text-white font-semibold rounded-md mt-4 ${
          loading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
        }`}
      >
        {loading ? "Analyzing..." : "Analyze Resume"}
      </button>

      {/* Result */}
      {score && (
        <p className="mt-4 text-green-600 font-semibold text-lg">
          ✅ Compatibility Score: {score}%
        </p>
      )}
    </div>
  );
}
