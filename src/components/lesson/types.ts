// src/components/lesson/types.ts

// --- Previous Types (Keep as is) ---
export const Languages = {
  Kannada: "Kannada",
  Marathi: "Marathi",
  Odia: "Odia",
} as const;
export type Languages = (typeof Languages)[keyof typeof Languages];
export type ChoiceQuestion = {
  id: string;
  type: "multiple";
  prompt: string;
  options: string[];
  answer: string;
};

// --- NEW Lesson Type ---
// A Lesson is a small, focused set of questions.
export type Lesson = {
  id: string;
  title: string; // e.g., "Lesson 1"
  xp: number;
  questions: ChoiceQuestion[];
};

// --- UPDATED Unit Type ---
// A Unit is now a collection of Lessons.
export type Unit = {
  id: string;
  title: string; // e.g., "Order in a cafe"
  lessons: Lesson[];
};

// --- Section Type (Keep as is) ---
export type Section = {
  id: string;
  title: string;
  units: Unit[];
};
