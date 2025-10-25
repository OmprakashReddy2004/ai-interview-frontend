import { useRef, useState } from "react";

export default function useVoiceInterview() {
  const [speaking, setSpeaking] = useState(false);
  const [listening, setListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [interim, setInterim] = useState("");
  const [audioBlob, setAudioBlob] = useState(null);
  const [error, setError] = useState("");

  const mediaRecorderRef = useRef(null);
  const chunksRef = useRef([]);
  const recognitionRef = useRef(null);
  const synthRef = useRef(window.speechSynthesis || null);

  // ---- TEXT TO SPEECH ----
  const speak = (text) => {
    if (!synthRef.current) return;
    const utter = new SpeechSynthesisUtterance(text);
    // Optional: choose a voice
    const voices = synthRef.current.getVoices();
    const voice = voices.find(v => /en|US|UK/i.test(v.lang)) || voices[0];
    if (voice) utter.voice = voice;
    utter.rate = 1; // 0.8-1.2 natural
    utter.pitch = 1;
    utter.onstart = () => setSpeaking(true);
    utter.onend = () => setSpeaking(false);
    synthRef.current.cancel(); // stop any ongoing
    synthRef.current.speak(utter);
  };

  // ---- MICROPHONE RECORDING (MediaRecorder) ----
  const startRecording = async () => {
    setError("");
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      chunksRef.current = [];
      const rec = new MediaRecorder(stream);
      rec.ondataavailable = e => chunksRef.current.push(e.data);
      rec.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: "audio/webm" });
        setAudioBlob(blob);
        stream.getTracks().forEach(t => t.stop());
      };
      mediaRecorderRef.current = rec;
      rec.start();
    } catch (e) {
      setError("Mic permission denied or not available.");
    }
  };
  const stopRecording = () => {
    mediaRecorderRef.current?.state === "recording" && mediaRecorderRef.current.stop();
  };

  // ---- SPEECH TO TEXT (Web Speech API) ----
  const startListening = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setError("Web Speech API not supported in this browser.");
      return;
    }
    setError("");
    setTranscript("");
    setInterim("");
    const rec = new SpeechRecognition();
    rec.lang = "en-US";
    rec.interimResults = true;
    rec.continuous = true;

    rec.onresult = (e) => {
      let final = "";
      let temp = "";
      for (let i = e.resultIndex; i < e.results.length; i++) {
        const chunk = e.results[i][0].transcript;
        if (e.results[i].isFinal) final += chunk;
        else temp += chunk;
      }
      if (final) setTranscript(prev => (prev + " " + final).trim());
      setInterim(temp);
    };
    rec.onerror = (e) => setError(e.error || "Speech recognition error");
    rec.onend = () => setListening(false);

    recognitionRef.current = rec;
    setListening(true);
    rec.start();
  };

  const stopListening = () => {
    recognitionRef.current && recognitionRef.current.stop();
  };

  // convenience
  const resetAnswer = () => {
    setTranscript("");
    setInterim("");
    setAudioBlob(null);
    setError("");
  };

  return {
    // state
    speaking, listening, transcript, interim, audioBlob, error,
    // actions
    speak, startRecording, stopRecording, startListening, stopListening, resetAnswer,
  };
}
