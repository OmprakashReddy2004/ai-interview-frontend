import { createContext, useContext, useState } from "react";

const InterviewContext = createContext(null);

export function InterviewProvider({ children }) {
  const [config, setConfig] = useState({
    role: "", company: "", type: "behavioural", difficulty: "mid", questionCount: 10,
  });
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [scores, setScores] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  return (
    <InterviewContext.Provider value={{
      config, setConfig,
      questions, setQuestions,
      answers, setAnswers,
      scores, setScores,
      currentIndex, setCurrentIndex,
    }}>
      {children}
    </InterviewContext.Provider>
  );
}

export const useInterview = () => useContext(InterviewContext);