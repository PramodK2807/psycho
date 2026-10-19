import { useCountdown } from "../hooks/useCountdown.js";

function format(totalSeconds) {
  const m = String(Math.floor(totalSeconds / 60)).padStart(2, "0");
  const s = String(totalSeconds % 60).padStart(2, "0");
  return `${m}:${s}`;
}

/** Visible countdown. Calls onExpire once when it reaches 00:00. */
export default function Timer({ seconds, onExpire, label = "Time left" }) {
  const left = useCountdown(seconds, onExpire);
  const urgent = left <= 20;

  return (
    <div className={`timer ${urgent ? "timer--urgent" : ""}`} role="timer" aria-live="off">
      <span className="timer__label">{label}</span>
      <span className="timer__value">{format(left)}</span>
    </div>
  );
}
