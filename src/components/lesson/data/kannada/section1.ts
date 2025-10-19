import type { Section, Unit } from "../../types";
import { makeLesson } from "../../../../lib/utils";

export const section1: Section = {
  id: "s1",
  title: "Section 1: Rookie",
  units: [
    // Unit 1
    {
      id: "kn-s1u1",
      title: "Order in a cafe",
      lessons: [
        makeLesson("kn-s1u1l1", "Lesson 1", [
          ['"Coffee" in Kannada?', ["ಕಾಫಿ", "ಟೀ", "ಹಾಲು"], "ಕಾಫಿ"],
          ['How do you say "one"?', ["ಒಂದು", "ಎರಡು", "ಮೂರು"], "ಒಂದು"],
        ]),
        makeLesson("kn-s1u1l2", "Lesson 2", [
          /* Questions */
        ]),
        makeLesson("kn-s1u1l3", "Lesson 3", [
          /* Questions */
        ]),
        makeLesson("kn-s1u1l4", "Lesson 4", [
          /* Questions */
        ]),
        makeLesson("kn-s1u1l5", "Lesson 5", [
          /* Questions */
        ]),
      ],
    },
    // Unit 2
    {
      id: "kn-s1u2",
      title: "Introduce yourself",
      lessons: [
        makeLesson("kn-s1u2l1", "Lesson 1", [
          [
            '"My name is..."',
            ["ನನ್ನ ಹೆಸರು...", "ನಿನ್ನ ಹೆಸರು...", "ಅವನ ಹೆಸರು..."],
            "ನನ್ನ ಹೆಸರು...",
          ],
        ]),
        makeLesson("kn-s1u2l2", "Lesson 2", [
          /* Questions */
        ]),
        // ...and so on for lessons 3, 4, 5
      ],
    },
    // ... all other units for Section 1
  ],
};
