// src/curriculum/lessonsById.ts
import type { LessonDef } from "./types";

export const lessonsById: Record<string, LessonDef> = {
  S1U1B1L1: {
    id: "S1U1B1L1",
    kind: "Picture",
    props: {
      question: 'Which one of these is "Dosa" ?',
      options: [
        { name: "Ca hā", translation: "ಚ ಹಾ", imgsrc: "hot-tea.png", id: "1" },
        {
          name: "An na",
          translation: "ಅ ನ್ನ",
          imgsrc: "rice-bowl.png",
          id: "2",
        },
        { name: "Dō se", translation: "ದೋ ಸೆ", imgsrc: "dosa.png", id: "3" },
        {
          name: "Nī ru",
          translation: "ನೀ ರು",
          imgsrc: "glass-of-water.png",
          id: "4",
        },
      ],
      answer: "Dō se",
    },
  },

  S1U1B1L2: {
    id: "S1U1B1L2",
    kind: "CreateSentence",
    props: {
      title: "Write this in English",
      question: "Do se  daya viṭṭu",
      translation: "ಡೋ ಸ್  ದಯಾ ವಿಟ್ಟು",
      audioSrc: "audio/DosaPlease.m4a",
      words: ["You", "Dosa", "Please", "Rice"],
      answer: "Dosa Please",
    },
  },

  // ...and so on
};
