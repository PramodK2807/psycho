// ------------------------------------------------------------------
// ALL TESTS LIVE HERE.  To add a test (test4, test5 ...):
//   1. make the folder  public/assets/test4/  and put the images in it (see README)
//   2. add one line to TESTS below, with the 12 correct letters.
// ------------------------------------------------------------------

import { VEHICLES } from "./vehicles.js";
import { VEHICLES_TEST2 } from "./vehiclesTest2.js";

const QUESTION_COUNT = 12;

/**
 * Builds a test from a folder of your own images.
 *
 * Files expected in public/assets/<folder>/ :
 *   mainquestion.<ext>    the map with the real objects   (memory page)
 *   mainquestion1.<ext>   the same map with A B C D E printed instead of the objects (question page)
 *   q1.<qExt> ... q12.<qExt>   one image per question (the object to find)
 *
 * answers[0] is the correct letter for q1, answers[1] for q2, ... answers[11] for q12.
 */
function imageTest(folder, title, answers, { ext = "jpg", qExt = ext, shuffle = true } = {}) {
  const base = `/assets/${folder}`;
  return {
    id: folder,
    title,
    mode: "images",
    shuffle, // true = questions appear in random order each run
    studyImage: `${base}/mainquestion.${ext}`,
    labeledImage: `${base}/mainquestion1.${ext}`,
    questions: Array.from({ length: QUESTION_COUNT }, (_, i) => ({
      id: i + 1,
      name: `Question ${i + 1}`,
      img: `${base}/q${i + 1}.${qExt}`,
      correct: answers[i] ?? null,
    })),
  };
}

export const TESTS = [
  // Test 1 = your original test. The letters are placed on the blank map by the code, randomly each run.
  {
    id: "test1",
    title: "Test 1",
    mode: "generated",
    studyImage: "/assets/test1/map-study.jpg",
    blankImage: "/assets/test1/map-blank.jpg",
    vehicles: VEHICLES,
  },

  // Test 2 = same style as test 1 (random letters on the blank map), 10 vehicles.
  {
    id: "test2",
    title: "Test 2",
    mode: "generated",
    studyImage: "/assets/test2/map-study.jpg",
    blankImage: "/assets/test2/map-blank.jpg",
    vehicles: VEHICLES_TEST2,
  },

  // Fill in the 12 correct letters (A-E) once your images are uploaded.
  imageTest("test3", "Test 3", ["", "", "", "", "", "", "", "", "", "", "", ""]),

  // imageTest("test4", "Test 4", ["A","B","C","D","E","A","B","C","D","E","A","B"]),
  // imageTest("test5", "Test 5", ["A","B","C","D","E","A","B","C","D","E","A","B"]),
];

/** true when every question of an image test has a valid correct letter */
export function answersReady(test) {
  if (test.mode !== "images") return true;
  return test.questions.every((q) => ["A", "B", "C", "D", "E"].includes(q.correct));
}
