import Timer from "./Timer.jsx";
import MapBoard from "./MapBoard.jsx";
import { QUIZ_SECONDS, OPTION_LABELS } from "../config.js";

export default function QuizPage({ quiz, answers, setAnswers, onFinish }) {
  const { spots, questions } = quiz;
  const answered = Object.keys(answers).length;

  const submit = () => {
    const left = questions.length - answered;
    if (left > 0 && !window.confirm(`${left} question(s) are not answered. Submit anyway?`)) return;
    onFinish();
  };

  return (
    <div className="answer">
      <header className="answer__top">
        <h2>Question page</h2>
        <span className="answer__count">
          {answered} / {questions.length} answered
        </span>
        <Timer seconds={QUIZ_SECONDS} onExpire={onFinish} />
      </header>

      <div className="answer__body">
        <section className="answer__left">
          <p className="answer__rule">For each item, choose the option showing where each vehicle was on the map.</p>
          <MapBoard src="/map-blank.jpg" spots={spots} />
        </section>

        <section className="answer__right" aria-label="Questions">
          <h3 className="setname">Set-1 (Q1 - Q{questions.length})</h3>
          {questions.map((q, i) => (
            <div className="qrow" key={q.vehicle.id}>
              <span className="qrow__no">Q. {i + 1}</span>
              <div className="qrow__img">
                <span className="qrow__big">{i + 1}.</span>
                <img src={q.vehicle.img} alt={`Vehicle ${i + 1}`} draggable={false} />
              </div>
              <div className="qrow__opts" role="radiogroup" aria-label={`Question ${i + 1}`}>
                {OPTION_LABELS.map((label) => (
                  <label key={label} className="opt">
                    <input
                      type="radio"
                      name={`q-${i}`}
                      value={label}
                      checked={answers[i] === label}
                      onChange={() => setAnswers((prev) => ({ ...prev, [i]: label }))}
                    />
                    <span>{label}</span>
                  </label>
                ))}
              </div>
            </div>
          ))}
        </section>
      </div>

      <footer className="answer__bottom">
        <button className="btn btn--primary" onClick={submit}>
          Submit Section
        </button>
      </footer>
    </div>
  );
}
