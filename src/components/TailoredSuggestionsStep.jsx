export default function TailoredSuggestionsStep({ resumeFile, jobDescription }) {
  return (
    <div className="text-white w-full">
      <h3 className="text-xl font-semibold mb-4 text-blue-400">
        🎯 Tailored Suggestions
      </h3>

      <p className="text-gray-300 mb-4">
        Based on your resume and job description, here are your personalized insights:
      </p>

      <div className="bg-gray-800 border border-gray-700 rounded-lg p-4 space-y-3">
        <p>• <span className="text-blue-400 font-medium">Compatibility Score:</span> 86%</p>
        <p>• <span className="text-blue-400 font-medium">Missing Keywords:</span> React, REST APIs, Docker</p>
        <p>• <span className="text-blue-400 font-medium">ATS Optimization Tip:</span> Use measurable achievements like “Optimized API calls by 30%.”</p>
        <p>• <span className="text-blue-400 font-medium">AI Suggestion:</span> Add a section on your cloud deployment experience to match the job JD.</p>
      </div>

      <div className="mt-6 text-gray-400 text-sm italic">
        (Later, this will come dynamically from your backend’s GPT analysis.)
      </div>
    </div>
  );
}
