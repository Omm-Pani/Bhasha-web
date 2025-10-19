import type { Languages, Section } from "./types";
import { section1 } from "./data/kannada/section1";
// import { section2 } from "./section-2";
// import { section3 } from './section-3'; ... and so on

// We can define the sections for each language here
const kannadaSections: Section[] = [section1 /*, section3, ... */];
// const marathiSections: Section[] = [ ... ];

export const lessonsByLang: Record<Languages, Section[]> = {
  Kannada: kannadaSections,
  Marathi: [], // Populate this with Marathi sections later
  Odia: [], // Populate this with Odia sections later
};
