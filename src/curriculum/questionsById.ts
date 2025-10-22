// src/curriculum/questionsById.ts
import type { QuestionDef } from "./questionRegistry";
import type { Pair } from "../components/ui/questions/MatchPair";

// Recreated from your original DATA constant:
const PAIRS: Pair[] = [
  { key: "dosa", left: "dosa", right: "ದೋ ಸೆ", rightHint: "Dō se" },
  { key: "water", left: "water", right: "ನೀ ರು", rightHint: "Nī ru" },
  { key: "rice", left: "rice", right: "ಅ ನ್ನ", rightHint: "An na" },
  {
    key: "please",
    left: "please",
    right: "ದಯ ವಿಟ್ಟು",
    rightHint: "daya viṭṭu",
  },
  { key: "tea", left: "tea", right: "ಚ ಹಾ", rightHint: "Ca hā" },
];

export const questionsById: Record<string, QuestionDef> = {
  /* =========================
   *  LESSON 1 → S1U1B1L1Q*
   * ========================= */

  // 1
  S1U1B1L1Q1: {
    id: "S1U1B1L1Q1",
    kind: "Picture",
    props: {
      question: 'Which one of these is "Dosa" ?',
      options: [
        {
          name: "Ca hā",
          translation: "ಚ ಹಾ",
          imgsrc: "/assets/hot-tea.png",
          id: "1",
        },
        {
          name: "An na",
          translation: "ಅ ನ್ನ",
          imgsrc: "/assets/rice-bowl.png",
          id: "2",
        },
        {
          name: "Dō se",
          translation: "ದೋ ಸೆ",
          imgsrc: "/assets/dosa.png",
          id: "3",
        },
        {
          name: "Nī ru",
          translation: "ನೀ ರು",
          imgsrc: "/assets/glass-of-water.png",
          id: "4",
        },
      ],
      answer: "Dō se",
    },
  },

  // 2
  S1U1B1L1Q2: {
    id: "S1U1B1L1Q2",
    kind: "Picture",
    props: {
      question: 'Which one of these is "water" ?',
      options: [
        {
          name: "Ca hā",
          translation: "ಚ ಹಾ",
          imgsrc: "/assets/hot-tea.png",
          id: "1",
        },
        {
          name: "An na",
          translation: "ಅ ನ್ನ",
          imgsrc: "/assets/rice-bowl.png",
          id: "2",
        },
        {
          name: "Nī ru",
          translation: "ನೀ ರು",
          imgsrc: "/assets/glass-of-water.png",
          id: "3",
        },
      ],
      answer: "Nī ru",
    },
  },

  // 3
  S1U1B1L1Q3: {
    id: "S1U1B1L1Q3",
    kind: "CreateSentence",
    props: {
      title: "Write this in English",
      question: "Do se  daya viṭṭu",
      translation: "ಡೋ ಸ್  ದಯಾ ವಿಟ್ಟು",
      audioSrc: "/assets/audio/DosaPlease.m4a",
      words: ["You", "Dosa", "Please", "Rice"],
      answer: "Dosa Please",
    },
  },

  // 4
  S1U1B1L1Q4: {
    id: "S1U1B1L1Q4",
    kind: "CreateWord",
    props: {
      title: "Say it in Kannada",
      question: "Water",
      words: ["Nī", "ru", "hā"],
      wordsTranslation: ["ನೀ", "ರು", "ಹಾ"],
      answer: "Nīru",
    },
  },

  // 5
  S1U1B1L1Q5: {
    id: "S1U1B1L1Q5",
    kind: "Audio",
    props: {
      title: "Tap what you hear",
      audioSrc: "/assets/audio/waterPlease.m4a",
      words: ["Nī ru", "An na", "Ca hā", "daya viṭṭu"],
      wordsTranslation: ["ನೀ ರು", "ಅ ನ್ನ", "ಚ ಹಾ", "ದಯಾ ವಿಟ್ಟು"],
      answer: "Nīru dayaviṭṭu",
    },
  },

  // 6
  S1U1B1L1Q6: {
    id: "S1U1B1L1Q6",
    kind: "CreateWord",
    props: {
      title: "Say it in Kannada",
      question: "Rice",
      words: ["Nī", "na", "ru", "hā", "An"],
      wordsTranslation: ["ನೀ", "ನ್ನ", "ರು", "ಹಾ", "ಅ"],
      answer: "Anna",
    },
  },

  // 7
  S1U1B1L1Q7: {
    id: "S1U1B1L1Q7",
    kind: "Picture",
    props: {
      question: 'Which one of these is "rice"?',
      options: [
        {
          name: "Nā yi",
          translation: "ನಾ ಯಿ",
          imgsrc: "/assets/happy.png",
          id: "1",
        },
        {
          name: "An na",
          translation: "ಅ ನ್ನ",
          imgsrc: "/assets/rice-bowl.png",
          id: "2",
        },
        {
          name: "Nī ru",
          translation: "ನೀ ರು",
          imgsrc: "/assets/glass-of-water.png",
          id: "3",
        },
      ],
      answer: "An na",
    },
  },

  // 8
  S1U1B1L1Q8: {
    id: "S1U1B1L1Q8",
    kind: "CreateSentence",
    props: {
      title: "Write this in English",
      question: "An na daya viṭṭu",
      translation: "ಅ ನ್ನ ದಯ ವಿಟ್ಟು",
      audioSrc: "/assets/audio/RicePlease.m4a",
      words: ["You", "Dosa", "Please", "Rice"],
      answer: "Rice Please",
    },
  },

  // 9
  S1U1B1L1Q9: {
    id: "S1U1B1L1Q9",
    kind: "Picture",
    props: {
      question: 'Which one of these is "Tea" ?',
      options: [
        {
          name: "Ca hā",
          translation: "ಚ ಹಾ",
          imgsrc: "/assets/hot-tea.png",
          id: "1",
        },
        {
          name: "An na",
          translation: "ಅ ನ್ನ",
          imgsrc: "/assets/rice-bowl.png",
          id: "2",
        },
        {
          name: "Dō se",
          translation: "ದೋ ಸೆ",
          imgsrc: "/assets/dosa.png",
          id: "3",
        },
        {
          name: "Nī ru",
          translation: "ನೀ ರು",
          imgsrc: "/assets/glass-of-water.png",
          id: "4",
        },
      ],
      answer: "Ca hā",
    },
  },

  // 10
  S1U1B1L1Q10: {
    id: "S1U1B1L1Q10",
    kind: "CreateWord",
    props: {
      title: "Say it in Kannada",
      question: "Tea",
      words: ["Nī", "na", "ru", "hā", "An", "Ca"],
      wordsTranslation: ["ನೀ", "ನ್ನ", "ರು", "ಹಾ", "ನ್ನ", "ಚ"],
      answer: "Cahā",
    },
  },

  // 11
  S1U1B1L1Q11: {
    id: "S1U1B1L1Q11",
    kind: "MatchPairs",
    props: { pairs: PAIRS },
  },

  // 12
  S1U1B1L1Q12: {
    id: "S1U1B1L1Q12",
    kind: "Audio",
    props: {
      title: "Tap what you hear",
      audioSrc: "/assets/audio/TeaPlease.m4a",
      words: ["Nī ru", "An na", "Ca hā", "daya viṭṭu"],
      wordsTranslation: ["ನೀ ರು", "ಅ ನ್ನ", "ಚ ಹಾ", "ದಯಾ ವಿಟ್ಟು"],
      answer: "Cahā dayaviṭṭu",
    },
  },

  // 13
  S1U1B1L1Q13: {
    id: "S1U1B1L1Q13",
    kind: "Audio",
    props: {
      title: "Tap what you hear",
      audioSrc: "/assets/audio/RicePlease.m4a",
      words: ["Nī ru", "An na", "Ca hā", "daya viṭ್ಟು"],
      wordsTranslation: ["ನೀ ರು", "ಅ ನ್ನ", "ಚ ಹಾ", "ದಯಾ ವಿಟ್ಟು"],
      answer: "Anna dayaviṭṭu",
    },
  },

  // 14
  S1U1B1L1Q14: {
    id: "S1U1B1L1Q14",
    kind: "MatchPairs",
    props: { pairs: PAIRS },
  },

  /* =========================
   *  LESSON 2 → S1U1B1L2Q*
   * ========================= */

  // 1
  S1U1B1L2Q1: {
    id: "S1U1B1L2Q1",
    kind: "MatchPairs",
    props: { pairs: PAIRS },
  },

  // 2
  S1U1B1L2Q2: {
    id: "S1U1B1L2Q2",
    kind: "CreateSentence",
    props: {
      title: "Write this in English",
      question: "Do se  daya viṭṭu",
      translation: "ಡೋ ಸ್  ದಯಾ ವಿಟ್ಟು",
      audioSrc: "/assets/audio/DosaPlease.m4a",
      words: ["You", "Dosa", "Please", "Rice"],
      answer: "Dosa Please",
    },
  },

  // 3
  S1U1B1L2Q3: {
    id: "S1U1B1L2Q3",
    kind: "CreateWord",
    props: {
      title: "Say it in Kannada",
      question: "Tea",
      words: ["Nī ru", "An na", "Ca hā", "daya viṭṭu"],
      wordsTranslation: ["ನೀ ರು", "ಅ ನ್ನ", "ಚ ಹಾ", "ದಯಾ ವಿಟ್ಟು"],
      answer: "Cahā",
    },
  },

  // 4
  S1U1B1L2Q4: {
    id: "S1U1B1L2Q4",
    kind: "CreateWord",
    props: {
      title: "Say it in Kannada",
      question: "Water",
      words: ["Nī", "na", "ru", "hā", "An", "Ca"],
      wordsTranslation: ["ನೀ", "ನ್ನ", "ರು", "ಹಾ", "ಅ", "ಚ"],
      answer: "Nīru",
    },
  },

  // 5
  S1U1B1L2Q5: {
    id: "S1U1B1L2Q5",
    kind: "CreateSentence",
    props: {
      title: "Write this in English",
      question: "dōse mattu anna",
      translation: "ದೋಸೆ ಮತ್ತು ಅನ್ನ",
      audioSrc: "/assets/audio/DosaAndRice.m4a",
      words: ["and", "Dosa", "Please", "Rice", "water", "you", "Tea"],
      answer: "Dosa and Rice",
    },
  },

  // 6
  S1U1B1L2Q6: {
    id: "S1U1B1L2Q6",
    kind: "CreateWord",
    props: {
      title: "Write it in Kannada",
      question: "tea and water",
      words: ["mattu", "dōse", "dayaviṭṭu", "anna", "nīru", "nīvu", "cahā"],
      wordsTranslation: [
        "ಮತ್ತು",
        "ದೋಸೆ",
        "ದಯವಿಟ್ಟು",
        "ಅನ್ನ",
        "ನೀರು",
        "ನೀವು",
        "ಚಹಾ",
      ],
      answer: "cahā mattu nīru",
    },
  },

  // 7
  S1U1B1L2Q7: {
    id: "S1U1B1L2Q7",
    kind: "MatchPairs",
    props: { pairs: PAIRS },
  },

  // 8
  S1U1B1L2Q8: {
    id: "S1U1B1L2Q8",
    kind: "CreateSentence",
    props: {
      title: "Write this in English",
      question: "Anna mattu dōse",
      translation: "ದೋಸೆ ಮತ್ತು ಅನ್ನ",
      audioSrc: "/assets/audio/DosaAndRice.m4a",
      words: ["and", "Dosa", "Please", "Rice", "water", "you", "Tea"],
      answer: "Rice and Dosa",
    },
  },

  // 9
  S1U1B1L2Q9: {
    id: "S1U1B1L2Q9",
    kind: "Audio",
    props: {
      title: "Tap what you hear",
      audioSrc: "/assets/audio/WaterAndDosa.mp3",
      words: ["Nī ru", "An na", "Ca hā", "mat tu", "daya viṭṭu", "dōse"],
      wordsTranslation: [
        "ನೀ ರು",
        "ಅ ನ್ನ",
        "ಚ ಹಾ",
        "ಮ ತ್ತು",
        "ದಯಾ ವಿಟ್ಟು",
        "ಅ ನ್ನ",
      ],
      answer: "Nīru mattu dōse",
    },
  },

  // 10
  S1U1B1L2Q10: {
    id: "S1U1B1L2Q10",
    kind: "Audio",
    props: {
      title: "Tap what you hear",
      audioSrc: "/assets/audio/waterPlease.m4a",
      words: ["Nī ru", "An na", "Ca hā", "daya viṭ್ಟು"],
      wordsTranslation: ["ನೀ ರು", "ಅ ನ್ನ", "ಚ ಹಾ", "ದಯಾ ವಿಟ್ಟು"],
      answer: "Nīru dayaviṭṭu",
    },
  },

  // 11
  S1U1B1L2Q11: {
    id: "S1U1B1L2Q11",
    kind: "Picture",
    props: {
      question: 'Which one of these is "water" ?',
      options: [
        {
          name: "Ca hā",
          translation: "ಚ ಹಾ",
          imgsrc: "/assets/hot-tea.png",
          id: "1",
        },
        {
          name: "An na",
          translation: "ಅ ನ್ನ",
          imgsrc: "/assets/rice-bowl.png",
          id: "2",
        },
        {
          name: "Nī ru",
          translation: "ನೀ ರು",
          imgsrc: "/assets/glass-of-water.png",
          id: "3",
        },
      ],
      answer: "Nī ru",
    },
  },

  // 12
  S1U1B1L2Q12: {
    id: "S1U1B1L2Q12",
    kind: "CreateWord",
    props: {
      title: "Say it in Kannada",
      question: "Rice",
      words: ["Nī ru", "An na", "Ca hā", "daya viṭ್ಟು"],
      wordsTranslation: ["ನೀ ರು", "ಅ ನ್ನ", "ಚ ಹಾ", "ದಯಾ ವಿಟ್ಟು"],
      answer: "Anna",
    },
  },

  // 13
  S1U1B1L2Q13: {
    id: "S1U1B1L2Q13",
    kind: "CreateSentence",
    props: {
      title: "Write this in English",
      question: "Nī ru mat tu an na daya viṭṭu",
      translation: "ನೀ ರು ಮ ತ್ತು ಅ ನ್ನ ದಯಾ ವಿಟ್ಟು",
      audioSrc: "/assets/audio/WaterAndRicePlease.mp3",
      words: ["and", "Dosa", "Please", "Rice", "water", "you", "Tea"],
      answer: "Water and Rice Please",
    },
  },

  // 14
  S1U1B1L2Q14: {
    id: "S1U1B1L2Q14",
    kind: "MatchPairs",
    props: { pairs: PAIRS },
  },

  // 15
  S1U1B1L2Q15: {
    id: "S1U1B1L2Q15",
    kind: "CreateWord",
    props: {
      title: "Say it in Kannada",
      question: "Rice",
      words: ["Nī", "na", "ru", "hā", "An"],
      wordsTranslation: ["ನೀ", "ನ್ನ", "ರು", "ಹಾ", "ಅ"],
      answer: "Anna",
    },
  },

  // 16
  S1U1B1L2Q16: {
    id: "S1U1B1L2Q16",
    kind: "CreateSentence",
    props: {
      title: "Write it in Kannada",
      question: "cahā mattu nīru",
      translation: "ಚಹಾ ಮತ್ತು ನೀರು",
      audioSrc: "/assets/audio/TeaAndWater.mp3",
      words: ["and", "Dosa", "Please", "Rice", "water", "you", "Tea"],
      answer: "Tea and water",
    },
  },

  // 17
  S1U1B1L2Q17: {
    id: "S1U1B1L2Q17",
    kind: "MatchPairs",
    props: { pairs: PAIRS },
  },
};
