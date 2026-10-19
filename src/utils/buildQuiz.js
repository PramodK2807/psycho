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
 * Builds one test run. Every quiz has the same shape:
 *   studyImage : picture for the memory page
 *   mapImage   : picture for the question page / result page
 *   autoRatio  : true = use the real shape of mapImage (image tests)
 *   spots      : letters drawn by the code on top of mapImage (tests 1-2, empty for image tests)
 *   questions  : [{ vehicle: { id, name, img }, correct }]
 */
export function buildQuiz(test) {
  return test.mode === "images" ? buildImageQuiz(test) : buildGeneratedQuiz(test);
}

/** Your own images: the letters are already printed inside mainquestion1, answers come from tests.js */
function buildImageQuiz(test) {
  const list = test.questions.map((q) => ({
    vehicle: { id: q.id, name: q.name, img: q.img },
    correct: q.correct,
  }));
  return {
    studyImage: test.studyImage,
    mapImage: test.labeledImage,
    autoRatio: true,
    spots: [],
    questions: test.shuffle ? shuffle(list) : list,
  };
}

/**
 * Tests 1 and 2 (generated): the 12 spots on the empty map get random letters A-E
 * (balanced, so every letter shows up 2-3 times). The correct answer for a vehicle
 * is the letter printed on the spot where that vehicle was.
 */
function buildGeneratedQuiz(test) {
  const VEHICLES = test.vehicles;
  const pool = shuffle(VEHICLES.map((_, i) => OPTION_LABELS[i % OPTION_LABELS.length]));
  const spots = VEHICLES.map((v, i) => ({ id: v.id, box: v.box, letter: pool[i] }));
  const letterBySpot = Object.fromEntries(spots.map((s) => [s.id, s.letter]));

  const questions = shuffle(VEHICLES).map((vehicle) => ({
    vehicle,
    correct: letterBySpot[vehicle.id],
  }));

  return {
    studyImage: test.studyImage,
    mapImage: test.blankImage,
    autoRatio: true,
    spots,
    questions,
  };
}
