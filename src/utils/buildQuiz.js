import { VEHICLES } from "../data/vehicles.js";
import { OPTION_LABELS } from "../config.js";

export function shuffle(list) {
  const a = [...list];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/**
 * Builds one test run.
 *  - spots: the 12 places on the empty map, each printed with a random letter A-E
 *    (letters are balanced, so every letter shows up 2-3 times, in random places).
 *  - questions: the 12 vehicles in random order. The correct answer for a vehicle
 *    is the letter printed on the spot where that vehicle was.
 */
export function buildQuiz() {
  const pool = shuffle(
    VEHICLES.map((_, i) => OPTION_LABELS[i % OPTION_LABELS.length])
  );
  const spots = VEHICLES.map((v, i) => ({ id: v.id, box: v.box, letter: pool[i] }));
  const letterBySpot = Object.fromEntries(spots.map((s) => [s.id, s.letter]));

  const questions = shuffle(VEHICLES).map((vehicle) => ({
    vehicle,
    correct: letterBySpot[vehicle.id],
  }));

  return { spots, questions };
}
