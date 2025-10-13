import axios from "axios";
import { useState } from "react";
import Avatar from "./Avatar";
import MetricsDashboard from "./MetricsDashboard";

export default function Interview() {
  const [question, setQuestion] = useState("Can you explain your latest project?");
  const [transcript, setTranscript] = useState("");
  const [metrics, setMetrics] = useState(null);
  const [recording, setRecording] = useState(false);

  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = SpeechRecognition ? new SpeechRecognition() : null;

  const startRecording = () => {
    if (!recognition) return alert("Speech recognition not supported in this browser!");
    recognition.start();
    recognition.onresult = (event) => {
      const last = event.results.length - 1;
      setTranscript(event.results[last][0].transcript);
    };
    setRecording(true);
  };

  const stopRecording = () => {
    recognition?.stop();
    setRecording(false);
  };

  const handleSubmit = async () => {
    try {
      const res = await axios.post("http://localhost:8080/api/interview/evaluate", {
        answer: transcript,
      });
      setMetrics(res.data);
    } catch (err) {
      console.error("Backend error:", err);
      alert("Unable to connect to backend!");
    }
  };

  return (
    <div className="bg-white shadow-xl rounded-2xl p-8 w-[90%] max-w-2xl text-center border border-gray-100">
      <Avatar />
      <h2 className="text-2xl font-semibold text-blue-700 mb-4">AI Interviewer</h2>
      <p className="text-gray-600 mb-6">{question}</p>

      <button
        onClick={recording ? stopRecording : startRecording}
        className={`px-6 py-3 rounded-full text-white font-semibold shadow-md transition-all ${
          recording ? "bg-red-500 hover:bg-red-600" : "bg-blue-600 hover:bg-blue-700"
        }`}
      >
        {recording ? "⏹ Stop Recording" : "🎙 Start Speaking"}
      </button>

      <p className="mt-4 italic text-gray-700 min-h-[60px]">
        {transcript || "Your spoken answer will appear here..."}
      </p>

      <button
        onClick={handleSubmit}
        className="mt-4 bg-green-600 hover:bg-green-700 text-white px-8 py-2 rounded-full shadow-lg transition-all"
      >
        ✅ Submit Answer
      </button>

      {metrics && <MetricsDashboard metrics={metrics} />}
    </div>
  );
}
