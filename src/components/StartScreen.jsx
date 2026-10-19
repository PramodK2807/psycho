import { STUDY_SECONDS, QUIZ_SECONDS } from "../config.js";

export default function StartScreen({ onStart }) {
  return (
    <main className="card start">
      <h1>Figure memory test</h1>
      <p className="lead">Remember where each vehicle is on the map.</p>
      <ol className="steps">
        <li>
          <strong>Study ({STUDY_SECONDS / 60} min).</strong> A map with 12 vehicles is shown. Remember what is
          where.
        </li>
        <li>
          <strong>Answer ({QUIZ_SECONDS / 60} min).</strong> The vehicles disappear. For each of the 12
          questions you see one vehicle and the empty map with the letters A to E. Choose the letter on the
          spot where that vehicle was.
        </li>
      </ol>
      <button className="btn btn--primary" onClick={onStart}>
        Start study page
      </button>
    </main>
  );
}
