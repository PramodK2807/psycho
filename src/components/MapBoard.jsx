import { MAP_RATIO } from "../data/vehicles.js";

/**
 * The road map. Pass `spots` to print a letter on each place (answer page).
 * `highlightId` rings one spot (used on the result page).
 */
export default function MapBoard({ src, spots = [], highlightId = null }) {
  return (
    <div className="map" style={{ aspectRatio: MAP_RATIO }}>
      <img className="map__img" src={src} alt="" draggable={false} />
      {spots.map((s) => (
        <span
          key={s.id}
          className={`spot ${s.id === highlightId ? "spot--on" : ""}`}
          style={{
            left: `${s.box.x + s.box.w / 2}%`,
            top: `${s.box.y + s.box.h / 2}%`,
          }}
        >
          {s.letter}
        </span>
      ))}
    </div>
  );
}
