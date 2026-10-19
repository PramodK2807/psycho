import { STUDY_SECONDS, QUIZ_SECONDS } from "../config.js";
import { answersReady } from "../data/tests.js";

export default function StartScreen({ tests, onStart }) {
  return (
    <main className="card start">
      <h1>Figure memory test</h1>
      <p className="lead">Remember where each object is on the map.</p>
      <ol className="steps">
        <li>
          <strong>Study ({STUDY_SECONDS / 60} min).</strong> A map with objects
          is shown. Remember what is where.
        </li>
        <li>
          <strong>Answer ({QUIZ_SECONDS / 60} min).</strong> The objects
          disappear. For each question you see one object and the empty map with
          the letters A to E. Choose the letter on the spot where that object
          was.
        </li>
      </ol>

      <div className="testlist">
        {tests.map((t) => (
          <div className="testlist__item" key={t.id}>
            <button className="btn btn--primary" onClick={() => onStart(t)}>
              Start {t.title}
            </button>
            {!answersReady(t) && (
              <small className="testlist__warn">
                Correct answers not filled in yet (src/data/tests.js)
              </small>
            )}
          </div>
        ))}
      </div>
    </main>
  );
}
