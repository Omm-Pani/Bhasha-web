export enum Languages {
  Kannada = "Kannada",
  Marathi = "Marathi",
  Odia = "Odia",
}

export type ChoiceQuestion = {
  id: string
  type: "multiple"
  prompt: string
  options: string[]
  answer: string
}

export type Lesson = {
  id: string
  title: string
  xp: number
  questions: ChoiceQuestion[]
}

const make = (id: string, title: string, qa: Array<[string, string[], string]>, xp = 10): Lesson => ({
  id,
  title,
  xp,
  questions: qa.map(([prompt, options, answer], i) => ({
    id: `${id}-q${i + 1}`,
    type: "multiple",
    prompt,
    options,
    answer,
  })),
})

export const lessonsByLang: Record<Languages, Lesson[]> = {
  [Languages.Kannada]: [
    make("kn-1", "Basics 1", [
      ['How do you say "hello"?', ["ನಮಸ್ಕಾರ", "ಧನ್ಯವಾದ", "ಹೌದು"], "ನಮಸ್ಕಾರ"],
      ['"Thank you" means?', ["ವಂದನೆ", "ಧನ್ಯವಾದ", "ಕ್ಷಮಿಸಿ"], "ಧನ್ಯವಾದ"],
      ['"Yes" in Kannada?', ["ಹೌದು", "ಇಲ್ಲ", "ನಮಸ್ಕಾರ"], "ಹೌದು"],
    ]),
  ],
  [Languages.Marathi]: [
    make("mr-1", "Basics 1", [
      ['"Hello" in Marathi?', ["नमस्कार", "धन्यवाद", "हो"], "नमस्कार"],
      ['"Thanks" means?', ["माफ करा", "धन्यवाद", "कृपया"], "धन्यवाद"],
      ['"Yes" in Marathi?', ["हो", "नाही", "काय"], "हो"],
    ]),
  ],
  [Languages.Odia]: [
    make("or-1", "Basics 1", [
      ['"Hello" in Odia?', ["ନମସ୍କାର", "ଧନ୍ୟବାଦ", "ହଁ"], "ନମସ୍କାର"],
      ['"Thanks" means?', ["ମାଫ କରନ୍ତୁ", "ଧନ୍ୟବାଦ", "କୃପାୟ"], "ଧନ୍ୟବାଦ"],
      ['"Yes" in Odia?', ["ହଁ", "ନା", "ନମସ୍କାର"], "ହଁ"],
    ]),
  ],
}

export { lessonsByLang as default }
