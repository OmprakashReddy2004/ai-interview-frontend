// src/components/JobDescriptionStep.jsx


export default function JobDescriptionStep({ setJobDescription, jobDescription }) {

  // Simple handler to update state on change
  const handleChange = (e) => {
    setJobDescription(e.target.value);
  };
  
  const minLength = 50;
  const currentLength = jobDescription.length;

  return (
    <div className="w-full p-4">
      <label htmlFor="job-desc" className="block text-left text-base font-medium text-gray-700 dark:text-gray-300 mb-2">
        Paste the Job Description Text:
      </label>
      <textarea 
        id="job-desc" 
        rows="10"
        value={jobDescription}
        onChange={handleChange}
        placeholder="e.g., Senior Frontend Developer: 5+ years of React experience, strong grasp of state management (Redux/Zustand), and proven experience with Tailwind CSS..."
        // Professional text area styling
        className="w-full p-4 border border-gray-300 dark:border-gray-700 rounded-lg 
                   text-gray-900 dark:text-white bg-white dark:bg-gray-700 
                   focus:ring-indigo-500 focus:border-indigo-500 shadow-inner resize-none"
      />
      
      {/* Character Count Feedback */}
      <div className="text-right text-sm mt-2">
        <span className={`font-medium ${currentLength >= minLength ? 'text-green-500' : 'text-yellow-600 dark:text-yellow-400'}`}>
          {currentLength} / {minLength}+ characters required
        </span>
      </div>
      
    </div>
  );
}