import { useState } from "react";
import StartScreen from "./components/StartScreen.jsx";
import StudyPage from "./components/StudyPage.jsx";
import QuizPage from "./components/QuizPage.jsx";
import ResultPage from "./components/ResultPage.jsx";
import { buildQuiz } from "./utils/buildQuiz.js";
import { TESTS } from "./data/tests.js";

export default function App() {
  const [phase, setPhase] = useState("start"); // start | study | quiz | result
  const [quiz, setQuiz] = useState(null);
  const [answers, setAnswers] = useState({});

  const start = (test) => {
    setQuiz(buildQuiz(test)); // images + questions of the chosen test
    setAnswers({});
    setPhase("study");
  };

  if (phase === "start") return <StartScreen tests={TESTS} onStart={start} />;
  if (phase === "study")
    return <StudyPage src={quiz.studyImage} onDone={() => setPhase("quiz")} />;
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
