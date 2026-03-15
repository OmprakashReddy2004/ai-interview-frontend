import { useState } from "react";
import { useInterview } from "../context/InterviewContext";
import { scoreAnswer } from "../services/interviewAI";

export function useInterviewSession() {
  const { questions, answers, setAnswers, currentIndex, setCurrentIndex, setScores } = useInterview();
  const [isScoring, setIsScoring] = useState(false);

  const submitAnswer = async (transcript) => {
    if (!questions[currentIndex]) return;
    setIsScoring(true);
    const q = questions[currentIndex];
    const score = await scoreAnswer({ question: q.question, answer: transcript, type: q.type });
    const newAnswers = [...answers, { question: q.question, transcript, score, id: q.id }];
    setAnswers(newAnswers);
    setIsScoring(false);

    if (currentIndex + 1 >= questions.length) {
      const agg = {
        communication: avg(newAnswers.map(a => a.score.communication)),
        technicalDepth: avg(newAnswers.map(a => a.score.technicalDepth)),
        structure: avg(newAnswers.map(a => a.score.structure)),
        confidence: avg(newAnswers.map(a => a.score.confidence)),
        overall: avg(newAnswers.map(a => a.score.overall)),
      };
      setScores(agg);
      return "debrief";
    }
    setCurrentIndex(currentIndex + 1);
    return "next";
  };

  return { submitAnswer, isScoring, currentQuestion: questions[currentIndex], currentIndex, total: questions.length };
}

const avg = (arr) => Math.round((arr.reduce((a, b) => a + b, 0) / arr.length) * 10) / 10;