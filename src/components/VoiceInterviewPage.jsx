import { useRef, useState } from "react";
import useVoiceInterview from "../hooks/useVoiceInterview";

const API = "http://localhost:8080";

export default function VoiceInterviewPage() {
  const [role, setRole] = useState("Backend Engineer");
  const [sessionId, setSessionId] = useState(null);
  const [question, setQuestion] = useState("");
  const [qIndex, setQIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [evals, setEvals] = useState([]); // [{question, transcript, score, feedback, durationSec, missing}]
  const [done, setDone] = useState(false);

  // timers
  const startTimeRef = useRef(null);

  const {
    speaking, listening, transcript, interim, audioBlob, error,
    speak, startRecording, stopRecording, startListening, stopListening, resetAnswer
  } = useVoiceInterview();

  // Start session and get Q1
  const startInterview = async () => {
    setLoading(true);
    setDone(false);
    setEvals([]);
    try {
      const res = await fetch(`${API}/api/interview/start`, {
        method: "POST",
        headers: {"Content-Type":"application/json"},
        body: JSON.stringify({ role })
      });
      const data = await res.json();
      const q = data.question || "Tell me about a challenging backend problem you solved recently.";
      setQuestion(q);
      setSessionId(data.sessionId);
      setQIndex(1);
      // TTS ask question
      speak(q);
    } finally {
      setLoading(false);
    }
  };

  // Begin answer capture (voice)
  const beginAnswer = async () => {
    resetAnswer();
    startRecording();
    startListening();
    startTimeRef.current = Date.now();
  };

  // Finish answer: stop mic, send to backend for evaluation
  const submitAnswer = async () => {
    stopRecording();
    stopListening();
    const endTime = Date.now();
    const durationSec = Math.max(1, Math.round((endTime - startTimeRef.current) / 1000));

    const answerText = transcript.trim();
    if (!answerText) return;

    setLoading(true);
    try {
      // Optionally upload audio
      let audioUrl = null;
      if (audioBlob) {
        const form = new FormData();
        form.append("file", audioBlob, `answer-q${qIndex}.webm`);
        const up = await fetch(`${API}/api/interview/upload-audio?sessionId=${sessionId}&q=${qIndex}`, {
          method: "POST",
          body: form
        });
        const upData = await up.json();
        audioUrl = upData.url || null;
      }

      // Evaluate with Gemini
      const res = await fetch(`${API}/api/interview/answer`, {
        method: "POST",
        headers: {"Content-Type":"application/json"},
        body: JSON.stringify({
          sessionId, role,
          question, answer: answerText,
          durationSec, audioUrl
        })
      });
      const data = await res.json();

      // store per-question metrics
      const record = {
        question,
        transcript: answerText,
        score: data.score ?? null,
        feedback: data.feedback ?? "",
        missing: data.missing ?? [],
        durationSec
      };
      setEvals(prev => [...prev, record]);

      if (data.nextQuestion && qIndex < (data.totalQuestions ?? 6)) {
        setQIndex(prev => prev + 1);
        setQuestion(data.nextQuestion);
        speak(data.nextQuestion);
        resetAnswer();
      } else {
        // End interview
        setDone(true);
        await fetch(`${API}/api/interview/report`, {
          method: "POST",
          headers: {"Content-Type":"application/json"},
          body: JSON.stringify({ sessionId })
        });
      }
    } finally {
      setLoading(false);
    }
  };

  // Final report (client-side rendering of `evals`; backend also has a report)
  const totalTime = evals.reduce((s, e) => s + (e.durationSec || 0), 0);
  const avgScore = evals.length ? Math.round(evals.reduce((s, e) => s + (e.score || 0), 0) / evals.length) : 0;

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <h2 className="text-3xl font-bold text-blue-400 mb-6">🎤 AI Voice Interviewer</h2>

      {!sessionId && (
        <div className="max-w-xl">
          <label className="block text-gray-300 mb-2">Target Role / JD</label>
          <input
            className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 mb-4"
            value={role}
            onChange={(e)=>setRole(e.target.value)}
            placeholder="e.g., Backend Engineer (Spring Boot)"
          />
          <button
            onClick={startInterview}
            disabled={loading}
            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold"
          >
            Start Interview
          </button>
        </div>
      )}

      {sessionId && !done && (
        <div className="max-w-3xl space-y-4 mt-6">
          <div className="bg-gray-900 p-4 rounded-lg border border-gray-700">
            <p className="text-blue-300 mb-2">💬 Question {qIndex}:</p>
            <p>{question}</p>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-3">
            <button
              onClick={beginAnswer}
              className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg"
              disabled={listening}
            >
              🎙️ Start Answer
            </button>
            <button
              onClick={submitAnswer}
              className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg"
              disabled={!listening && !transcript}
            >
              ✅ Submit
            </button>
            {listening && <span className="text-yellow-300">Listening… speak now</span>}
            {speaking && <span className="text-blue-300">AI speaking…</span>}
          </div>

          {/* Live transcript */}
          <div className="bg-gray-900 p-4 rounded-lg border border-gray-800">
            <p className="text-gray-400 text-sm mb-2">Your answer (live):</p>
            <p className="text-gray-100 whitespace-pre-wrap">
              {transcript} <span className="text-gray-500">{interim}</span>
            </p>
          </div>

          {error && (
            <div className="text-red-400 bg-gray-900 border border-red-600 rounded-lg p-3">
              {error}
            </div>
          )}

          {/* History so far */}
          {evals.length > 0 && (
            <div className="bg-gray-950 border border-gray-800 rounded-lg p-4">
              <p className="text-gray-300 mb-3">Progress</p>
              <div className="space-y-3">
                {evals.map((e, i)=>(
                  <div key={i} className="border border-gray-800 rounded p-3">
                    <p className="text-blue-300">Q{i+1}: {e.question}</p>
                    <p className="text-gray-300 mt-1">Score: <span className="text-green-400">{e.score ?? "—"}/10</span> • Time: {e.durationSec}s</p>
                    {e.missing?.length > 0 && (
                      <p className="text-yellow-300 mt-1">Missing: {e.missing.join(", ")}</p>
                    )}
                    <p className="text-gray-400 mt-1">Feedback: {e.feedback}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {done && (
        <div className="max-w-3xl mt-8 bg-gray-900 p-6 rounded-xl border border-gray-700">
          <h3 className="text-2xl font-semibold text-blue-400 mb-4">📊 Final Report</h3>
          <p className="text-gray-300">Total Questions: {evals.length}</p>
          <p className="text-gray-300">Average Score: <span className="text-green-400">{avgScore}/10</span></p>
          <p className="text-gray-300">Total Speaking Time: {totalTime}s</p>

          <div className="mt-4 space-y-3">
            {evals.map((e, i)=>(
              <div key={i} className="border border-gray-800 rounded p-3">
                <p className="text-blue-300">Q{i+1}</p>
                <p className="text-gray-300">Score: {e.score ?? "—"}/10 • Time: {e.durationSec}s</p>
                {e.missing?.length > 0 && <p className="text-yellow-300">Missing: {e.missing.join(", ")}</p>}
                <p className="text-gray-400">Feedback: {e.feedback}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
