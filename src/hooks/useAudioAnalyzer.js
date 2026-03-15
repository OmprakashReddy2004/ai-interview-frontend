import { useEffect, useRef, useState } from "react";

export function useAudioAnalyzer(isListening) {
  const [volume, setVolume] = useState(0);
  const [bars, setBars] = useState(Array(7).fill(4));
  const animRef = useRef(null);
  const analyzerRef = useRef(null);
  const streamRef = useRef(null);

  useEffect(() => {
    if (!isListening) {
      cancelAnimationFrame(animRef.current);
      setBars(Array(7).fill(4));
      streamRef.current?.getTracks().forEach(t => t.stop());
      return;
    }
    (async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        streamRef.current = stream;
        const ctx = new AudioContext();
        const source = ctx.createMediaStreamSource(stream);
        const analyzer = ctx.createAnalyser();
        analyzer.fftSize = 64;
        source.connect(analyzer);
        analyzerRef.current = analyzer;
        const data = new Uint8Array(analyzer.frequencyBinCount);
        const tick = () => {
          analyzer.getByteFrequencyData(data);
          const avg = data.reduce((a, b) => a + b, 0) / data.length;
          setVolume(Math.round(avg));
          setBars(Array.from({ length: 7 }, (_, i) => Math.max(4, (data[i * 2] / 255) * 28)));
          animRef.current = requestAnimationFrame(tick);
        };
        tick();
      } catch (e) {
        console.error("Mic error:", e);
      }
    })();
    return () => cancelAnimationFrame(animRef.current);
  }, [isListening]);

  return { volume, bars };
}