import { useState } from "react";
import { MAP_RATIO } from "../data/vehicles.js";

/**
 * The map. Pass `spots` to print a letter on each place (test 1 answer page).
 * `highlightId` rings one spot (used on the result page).
 * `autoRatio` uses the real width/height of the picture (for your own uploaded images).
 */
export default function MapBoard({ src, spots = [], highlightId = null, autoRatio = false }) {
  const [natural, setNatural] = useState(null);
  const ratio = autoRatio && natural ? natural : MAP_RATIO;

  return (
    <div className="map" style={{ aspectRatio: ratio }}>
      <img
        className="map__img"
        src={src}
        alt=""
        draggable={false}
        onLoad={(e) => {
          const { naturalWidth: w, naturalHeight: h } = e.currentTarget;
          if (w && h) setNatural(w / h);
        }}
      />
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
