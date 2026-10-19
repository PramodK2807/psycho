import { useState } from "react";
import MapBoard from "./MapBoard.jsx";

export default function ResultPage({ quiz, answers, onRestart }) {
  const { spots, questions } = quiz;
  const [focusId, setFocusId] = useState(null);
  const score = questions.reduce((n, q, i) => (answers[i] === q.correct ? n + 1 : n), 0);

  return (
    <div className="page">
      <header className="topbar">
        <h2>Result</h2>
        <button className="btn btn--primary" onClick={onRestart}>
          Try again
        </button>
      </header>

      <div className="result">
        <section className="result__left">
          <p className="score__num">
            {score} <span>/ {questions.length}</span>
          </p>
          <p className="hint">Click a row to ring that vehicle's spot on the map.</p>
          <MapBoard src="/map-blank.jpg" spots={spots} highlightId={focusId} />
        </section>

        <section className="result__right">
          {questions.map((q, i) => {
            const chosen = answers[i];
            const ok = chosen === q.correct;
            return (
              <button
                key={q.vehicle.id}
                type="button"
                className={`rrow ${ok ? "is-right" : "is-wrong"} ${focusId === q.vehicle.id ? "is-focus" : ""}`}
                onClick={() => setFocusId(q.vehicle.id)}
              >
                <span className="qrow__no">Q. {i + 1}</span>
                <img src={q.vehicle.img} alt={q.vehicle.name} />
                <span className="rrow__text">
                  {q.vehicle.name}
                  <small>
                    Your answer: <strong>{chosen ?? "none"}</strong> · Correct: <strong>{q.correct}</strong>
                  </small>
                </span>
                <span className="rrow__mark">{ok ? "✔" : "✘"}</span>
              </button>
            );
          })}
        </section>
      </div>
    </div>
  );
}
