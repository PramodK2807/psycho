import Timer from "./Timer.jsx";
import MapBoard from "./MapBoard.jsx";
import { STUDY_SECONDS } from "../config.js";

export default function StudyPage({ src, onDone }) {
  return (
    <div className="page">
      <header className="topbar">
        <h2>Memory page</h2>
        <Timer seconds={STUDY_SECONDS} onExpire={onDone} />
      </header>
      <p className="hint">Study the map and memorize the position of every object.</p>
      <MapBoard src={src} autoRatio />
      <div className="actions">
        <button className="btn" onClick={onDone}>
          I'm ready, go to questions
        </button>
      </div>
    </div>
  );
}
