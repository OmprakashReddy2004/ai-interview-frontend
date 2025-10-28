import { useEffect, useRef, useState } from "react";
import { BASE_URL } from "../config";
export default function InterviewLive() {
  const [questionIndex, setQuestionIndex] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [answer, setAnswer] = useState("");
  const [listening, setListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [sessionId, setSessionId] = useState(null);
  const [difficulty, setDifficulty] = useState("");
  const recognitionRef = useRef(null);

  // ✅ Load questions from localStorage
  useEffect(() => {
    const sessionData = localStorage.getItem("interviewSession");
    if (sessionData) {
      const parsed = JSON.parse(sessionData);
      setSessionId(parsed.sessionId);
      setDifficulty(parsed.difficulty);
      setQuestions(parsed.questions || []);
      console.log("🎯 Loaded session:", parsed);
    } else {
      alert("⚠️ No interview session found. Please restart.");
      window.location.href = "/interview/topics";
    }
  }, []);

  // ✅ Initialize Speech Recognition
  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Your browser does not support Speech Recognition. Try Chrome.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onstart = () => {
      console.log("🎙️ Listening...");
      setListening(true);
      setTranscript("");
    };

    recognition.onresult = (event) => {
      const result = event.results[0][0].transcript;
      console.log("🗣️ Recognized:", result);
      setTranscript(result);
      setAnswer(result);
    };

    recognition.onend = () => {
      console.log("🛑 Stopped listening");
      setListening(false);
    };

    recognitionRef.current = recognition;
  }, []);

  // ✅ Speak Question with TTS
  const speakQuestion = (text) => {
    if (!window.speechSynthesis) {
      alert("Speech synthesis not supported in your browser.");
      return;
    }

    setIsSpeaking(true);
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-US";
    utterance.rate = 1;
    utterance.pitch = 1;
    utterance.onend = () => {
      setIsSpeaking(false);
      // Automatically start mic after 3 seconds
      setTimeout(() => startListening(), 3000);
    };

    window.speechSynthesis.speak(utterance);
  };

  const startListening = () => {
    if (recognitionRef.current && !listening) {
      recognitionRef.current.start();
    }
  };

  const stopListening = () => {
    if (recognitionRef.current && listening) {
      recognitionRef.current.stop();
    }
  };

  // ✅ Handle Answer Submission
  const handleSubmitAnswer = async () => {
    stopListening();
    const currentQuestion = questions[questionIndex]?.question || "";
    console.log("🧠 Sending answer to backend:", answer);

    try {
      const response = await fetch(`${BASE_URL}/api/interview/answer`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sessionId,
          questionId: questionIndex + 1,
          question: currentQuestion,
          answer,
          durationSec: 30,
        }),
      });

      const result = await response.json();
      console.log("✅ AI Feedback:", result);

      // Move to next question
      if (questionIndex < questions.length - 1) {
        const nextIndex = questionIndex + 1;
        setQuestionIndex(nextIndex);
        setAnswer("");
        setTranscript("");
        setTimeout(() => speakQuestion(questions[nextIndex].question), 2000);
      } else {
        alert("🎉 Interview complete! Generating your report...");
        generateFinalReport();
      }
    } catch (err) {
      console.error("❌ Error sending answer:", err);
    }
  };

  // ✅ Generate Final Report
  const generateFinalReport = async () => {
    try {
      const res = await fetch(`${BASE_URL}/api/interview/report`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionId }),
      });
      const data = await res.json();
      console.log("📊 Final Report:", data);
      alert("✅ Report generated successfully!");
    } catch (err) {
      console.error("❌ Error generating report:", err);
    }
  };

  // ✅ Start first question automatically
  useEffect(() => {
    if (questions.length > 0) {
      setTimeout(() => speakQuestion(questions[0].question), 1000);
    }
  }, [questions]);

  if (!questions.length) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-gray-400">
        ⚙️ Loading your interview questions...
      </div>
    );
  }

  // ✅ UI
  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-8">
      <h2 className="text-3xl font-bold text-blue-400 mb-6">
        🎤 Live AI Interview ({difficulty})
      </h2>

      <div className="bg-gray-900 border border-gray-700 rounded-2xl p-8 w-full max-w-2xl text-center shadow-lg shadow-blue-500/10">
        <h3 className="text-xl font-semibold text-blue-300 mb-4">
          Question {questionIndex + 1} of {questions.length}
        </h3>
        <p className="text-lg text-gray-200 mb-6">
          {questions[questionIndex]?.question}
        </p>

        {isSpeaking && (
          <p className="text-sm text-gray-400 animate-pulse">
            🗣️ Speaking question...
          </p>
        )}

        <div className="mt-4">
          <p className="text-gray-400 mb-2">🎧 Your answer:</p>
          <textarea
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            className="w-full p-3 rounded-lg bg-gray-800 text-white border border-gray-700"
            rows={4}
            placeholder="Your spoken or typed answer will appear here..."
          ></textarea>
        </div>

        <div className="flex justify-center mt-6 gap-4">
          <button
            onClick={startListening}
            disabled={listening}
            className={`px-6 py-2 rounded-lg font-semibold transition ${
              listening
                ? "bg-gray-700 text-gray-400 cursor-not-allowed"
                : "bg-green-600 hover:bg-green-700 text-white"
            }`}
          >
            🎙️ {listening ? "Listening..." : "Start Recording"}
          </button>

          <button
            onClick={stopListening}
            disabled={!listening}
            className="px-6 py-2 bg-red-600 hover:bg-red-700 rounded-lg text-white font-semibold transition"
          >
            🛑 Stop
          </button>

          <button
            onClick={handleSubmitAnswer}
            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-white font-semibold transition"
          >
            ✅ Submit Answer
          </button>
        </div>

        {transcript && (
          <p className="mt-4 text-sm text-gray-400 italic">
            Recognized Speech: “{transcript}”
          </p>
        )}
      </div>
    </div>
  );
}
