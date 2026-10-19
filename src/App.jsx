import { useState } from "react";
import StartScreen from "./components/StartScreen.jsx";
import StudyPage from "./components/StudyPage.jsx";
import QuizPage from "./components/QuizPage.jsx";
import ResultPage from "./components/ResultPage.jsx";
import { buildQuiz } from "./utils/buildQuiz.js";

export default function App() {
  const [phase, setPhase] = useState("start"); // start | study | quiz | result
  const [quiz, setQuiz] = useState(null);
  const [answers, setAnswers] = useState({});

  const start = () => {
    setQuiz(buildQuiz()); // new random order and random A-E spots each run
    setAnswers({});
    setPhase("study");
  };

  if (phase === "start") return <StartScreen onStart={start} />;
  if (phase === "study") return <StudyPage onDone={() => setPhase("quiz")} />;
  if (phase === "quiz")
    return (
      <QuizPage
        quiz={quiz}
        answers={answers}
        setAnswers={setAnswers}
        onFinish={() => setPhase("result")}
      />
    );
  return <ResultPage quiz={quiz} answers={answers} onRestart={() => setPhase("start")} />;
}
