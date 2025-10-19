import { cloneElement, isValidElement, useEffect, useState } from "react";
import type { Lesson, Languages } from "../components/lesson/lesson-data";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { Progress } from "../components/ui/progress";
import { Award, Sparkles, X, Heart } from "lucide-react";
import { recordLessonCompletion } from "../lib/streak";
import { SaveProgressCTA } from "../components/signup-cta";
import { ThemedButton } from "../components/ui/ThemedButton";

import { CreateSentence } from "../components/ui/questions/CreateSentence";
import { MatchPairs, type Pair } from "../components/ui/questions/MatchPair";
import PictureQuestionComp from "../components/ui/questions/PictureQuestionComp";

import { useNavigate } from "react-router-dom";
import { CreateWord } from "../components/ui/questions/CreateWord";

import { AudioSentence } from "../components/ui/questions/AudioSentence";

const DATA: Pair[] = [
  { key: "dosa", left: "dosa", right: "ದೋ ಸೆ", rightHint: "Dō se" },
  { key: "water", left: "water", right: "ನೀ ರು", rightHint: "Nī ru" },
  { key: "rice", left: "rice", right: "ಅ ಕ್ಕಿ", rightHint: "Ak ki" },
  {
    key: "please",
    left: "please",
    right: "ದಯ ವಿಟ್ಟು",
    rightHint: "daya viṭṭu",
  },
  { key: "tea", left: "tea", right: "ಚ ಹಾ", rightHint: "Ca hā" },
  // { key: "please", left: "please", right: "ください", rightHint: "ku da sa i" },
];

const lesson = {
  id: "1",
  title: "Basics",
  questions: [
    <PictureQuestionComp
      question='Which one of these is "Dosa" ?'
      options={[
        { name: "Ca hā", translation: "ಚ ಹಾ", imgsrc: "hot-tea.png", id: "1" },
        {
          name: "Ak ki",
          translation: "ಅ ಕ್ಕಿ",
          imgsrc: "rice-bowl.png",
          id: "2",
        },
        {
          name: "Dō se",
          translation: "ದೋ ಸೆ",
          imgsrc: "dosa.png",
          id: "3",
        },
        {
          name: "Nī ru",
          translation: "ನೀ ರು",
          imgsrc: "glass-of-water.png",
          id: "4",
        },
      ]}
      answer="Dō se"
    />,
    <PictureQuestionComp
      question='Which one of these is "water" ?'
      options={[
        { name: "Ca hā", translation: "ಚ ಹಾ", imgsrc: "hot-tea.png", id: "1" },
        {
          name: "Ak ki",
          translation: "ಅ ಕ್ಕಿ",
          imgsrc: "rice-bowl.png",
          id: "2",
        },
        {
          name: "Nī ru",
          translation: "ನೀ ರು",
          imgsrc: "glass-of-water.png",
          id: "3",
        },
      ]}
      answer="Nī ru"
    />,
    <CreateSentence
      title="Write this in English"
      question="Do se  daya viṭṭu"
      translation="ಡೋ ಸ್  ದಯಾ ವಿಟ್ಟು"
      audioSrc="audio/DosaPlease.m4a"
      words={["You", "Dosa", "Please", "Rice"]}
      answer="Dosa Please"
      onChange={(arr) => console.log("Sentence:", arr.join(" "))}
    />,
    <CreateWord
      title="Say it in Kannada"
      question="Water"
      words={["Nī", "ru", "hā"]}
      wordsTranslation={["ನೀ", "ರು", "ಹಾ"]}
      answer="Nīru"
      onChange={(arr) => console.log("Sentence:", arr.join(" "))}
    />,
    <AudioSentence
      title="Tap what you hear"
      audioSrc="audio/waterPlease.m4a"
      words={["Nī ru", "Ak ki", "Ca hā", "daya viṭṭu"]}
      wordsTranslation={["ನೀ ರು", "ಅ ಕ್ಕಿ", "ಚ ಹಾ", "ದಯಾ ವಿಟ್ಟು"]}
      answer="Nīru dayaviṭṭu"
      onChange={(arr) => console.log("Sentence:", arr.join(" "))}
    />,
    <CreateWord
      title="Say it in Kannada"
      question="Rice"
      words={["Nī", "ki", "ru", "hā", "Ak"]}
      wordsTranslation={["ನೀ", "ರು", "ರು", "ಹಾ", "ನೀ"]}
      answer="Akki"
      onChange={(arr) => console.log("Sentence:", arr.join(" "))}
    />,
    <PictureQuestionComp
      question='Which one of these is "rice"?'
      options={[
        { name: "Nā yi", translation: "ನಾ ಯಿ", imgsrc: "happy.png", id: "1" },
        {
          name: "Ak ki",
          translation: "ಅ ಕ್ಕಿ",
          imgsrc: "rice-bowl.png",
          id: "2",
        },
        {
          name: "Nī ru",
          translation: "ನೀ ರು",
          imgsrc: "glass-of-water.png",
          id: "3",
        },
      ]}
      answer="Ak ki"
    />,
    <CreateSentence
      title="Write this in English"
      question="Ak ki daya viṭṭu"
      translation="ಅ ಕ್ಕಿ ದಯ ವಿಟ್ಟು"
      audioSrc="audio/RicePlease.m4a"
      words={["You", "Dosa", "Please", "Rice"]}
      answer="Rice Please"
      onChange={(arr) => console.log("Sentence:", arr.join(" "))}
    />,
    <PictureQuestionComp
      question='Which one of these is "Tea" ?'
      options={[
        { name: "Ca hā", translation: "ಚ ಹಾ", imgsrc: "hot-tea.png", id: "1" },
        {
          name: "Ak ki",
          translation: "ಅ ಕ್ಕಿ",
          imgsrc: "rice-bowl.png",
          id: "2",
        },
        {
          name: "Dō se",
          translation: "ದೋ ಸೆ",
          imgsrc: "dosa.png",
          id: "3",
        },
        {
          name: "Nī ru",
          translation: "ನೀ ರು",
          imgsrc: "glass-of-water.png",
          id: "4",
        },
      ]}
      answer="Ca hā"
    />,
    <CreateWord
      title="Say it in Kannada"
      question="Tea"
      words={["Nī", "ki", "ru", "hā", "Ak", "Ca"]}
      wordsTranslation={["ನೀ", "ರು", "ರು", "ಹಾ", "ನೀ", "ಚ"]}
      answer="Cahā"
      onChange={(arr) => console.log("Sentence:", arr.join(" "))}
    />,
    <MatchPairs pairs={DATA} />,
    <AudioSentence
      title="Tap what you hear"
      audioSrc="audio/TeaPlease.m4a"
      words={["Nī ru", "Ak ki", "Ca hā", "daya viṭṭu"]}
      wordsTranslation={["ನೀ ರು", "ಅ ಕ್ಕಿ", "ಚ ಹಾ", "ದಯಾ ವಿಟ್ಟು"]}
      answer="Cahā dayaviṭṭu"
      onChange={(arr) => console.log("Sentence:", arr.join(" "))}
    />,
    <AudioSentence
      title="Tap what you hear"
      audioSrc="audio/RicePlease.m4a"
      words={["Nī ru", "Ak ki", "Ca hā", "daya viṭṭu"]}
      wordsTranslation={["ನೀ ರು", "ಅ ಕ್ಕಿ", "ಚ ಹಾ", "ದಯಾ ವಿಟ್ಟು"]}
      answer="Akki dayaviṭṭu"
      onChange={(arr) => console.log("Sentence:", arr.join(" "))}
    />,
    <MatchPairs pairs={DATA} />,
  ],
};

export function LessonPage({
  // lesson,
  language,
  showSignupAfter = false,
}: {
  lesson: Lesson;
  language: Languages;
  showSignupAfter?: boolean;
}) {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);
  const [showCTA, setShowCTA] = useState(false);

  // per-step answer state
  const [canCheck, setCanCheck] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const total = lesson.questions.length;

  // const q = useMemo(
  //   () => lesson.questions[step] as ChoiceQuestion | undefined,
  //   [lesson, step]
  // );
  const pct = Math.round((step / lesson.questions.length) * 100);

  useEffect(() => {
    if (done && showSignupAfter) {
      const t = setTimeout(() => setShowCTA(true), 600);
      return () => clearTimeout(t);
    }
  }, [done, showSignupAfter]);

  useEffect(() => {
    setCanCheck(false);
    setIsCorrect(null);
  }, [step]);

  const handleAnswerChange = (state: {
    canCheck: boolean;
    isCorrect: boolean | null;
  }) => {
    setCanCheck(state.canCheck);
    setIsCorrect(state.isCorrect);
  };

  const next = () => {
    // Defensive: only proceed if we canCheck (button will be disabled otherwise)
    const correct = isCorrect === true;
    if (correct) {
      setScore((s) => s + 1);
      console.log("right");
    } else {
      alert("wrong");
    }

    const nextStep = step + 1;
    if (nextStep >= total) {
      setDone(true);
      recordLessonCompletion(lesson.id);
    } else {
      setStep(nextStep);
    }
  };

  // const next = () => {
  //   if (!q) return;
  //   const correct = selected === q.answer;
  //   if (correct) setScore((s) => s + 1);
  //   setSelected(null);
  //   const nextStep = step + 1;
  //   if (nextStep >= lesson.questions.length) {
  //     setDone(true);
  //     recordLessonCompletion(lesson.id); // updates streak in localStorage
  //   } else {
  //     setStep(nextStep);
  //   }
  // };

  if (done) {
    // const xp = score * Math.ceil(lesson.xp / lesson.questions.length);
    return (
      <div>
        <Card className="rounded-2xl border-2 border-primary">
          <CardContent className="space-y-3 p-4 text-center">
            <div className="mx-auto flex w-full max-w-sm flex-col items-center gap-2">
              <Award className="size-8 text-primary" aria-hidden />
              <h3 className="text-xl font-bold">Great job!</h3>
              <p className="text-sm text-muted-foreground">
                You finished {lesson.title} in {language}. Score {score}/
                {/* {lesson.questions.length} — +{xp} XP */}
              </p>
              <div
                className="rounded-lg bg-success/15 px-3 py-2 text-sm text-foreground"
                style={{ ["--success" as any]: "var(--brand-success)" }}
              >
                Streak updated! Keep coming back daily to grow it.
              </div>
              <div className="flex gap-2 pt-1">
                <Button variant="secondary" onClick={() => location.reload()}>
                  Try again
                </Button>
                <Button onClick={() => setShowCTA(true)}>
                  Continue <Sparkles className="ml-1 size-4" />
                </Button>
              </div>
            </div>
            {showCTA && <SaveProgressCTA />}
          </CardContent>
        </Card>
      </div>
    );
  }

  // Inject onAnswerChange ONLY into the current question element
  const current = lesson.questions[step];
  const renderedQuestion = isValidElement(current)
    ? cloneElement(current as React.ReactElement<any>, {
        onAnswerChange: handleAnswerChange,
        key: `q-${step}`,
      })
    : current;

  return (
    <div className="[@media_(min-width:700px)]:max-w-[1140px] [@media_(min-width:700px)]:min-w-[900px] [@media_(min-width:700px)]:mx-auto [@media_(min-width:700px)]:pt-6 pt-0">
      <div className="absolute inset-0">
        <div className="py-6 px-4 grid grid-cols-1 gap-6 grid-rows-[min-content_1fr_min-content] min-h-[460px] overflow-hidden absolute top-0 left-0 h-full w-full [@media_(min-width:700px)]:p-0   [@media_(min-width:700px)_and_(max-height:650px)]:grid-rows-[90px_450px_140px] [@media_(min-width:700px)_and_(max-height:650px)]:min-h-[680px] [@media_(min-width:700px)]:gap-0 [@media_(min-width:700px)]:min-h-[690px] [@media_(min-width:700px)]:grid-rows-[100px_1fr_140px]">
          {/* top section */}
          <div className="col-start-1 col-end-auto  row-start-1 row-end-auto z-[100]">
            <div className="mx-auto max-w-[1080px] [@media_(min-width:700px)]:p-0 [@media_(min-width:700px)]:pt-[50px] [@media_(min-width:700px)]:px-10 [@media_(min-width:700px)_and_(max-height:650px)]:pt-10">
              <div className="grid items-center gap-5 grid-cols-[min-content_1fr_min-content] md:gap-6">
                <button
                  onClick={() => navigate("/learn")}
                  className="cursor-pointer "
                >
                  <X size={28} className="text-[#52656d]" />
                </button>
                <Progress value={pct} className="h-4" />
                <div className="flex items-center justify-between gap-[5px]">
                  <Heart size={28} fill="#ee5555" color="#ee5555" />
                  <span className="text-[#ee5555] font-bold pl-1 pt-0.5">
                    5
                  </span>
                </div>
                {/* <span className="text-xs text-muted-foreground">{pct}%</span> */}
              </div>
            </div>
          </div>

          {/* mid section */}

          <div className="flex flex-col min-h-0 w-full col-start-1 col-end-auto row-start-2 row-end-auto">
            <div className="grid w-full h-full relative">
              <div className="col-start-1 col-end-auto row-start-1 row-end-auto min-h-0">
                <div className="grid content-center justify-center w-full h-full text-center text-[19px] grid-cols-1 grid-rows-[minmax(0,1fr)] [@media_(min-width:700px)]:grid-cols-[min-content] [@media_(min-width:700px)]:grid-rows-[min-content]">
                  <div
                    key={`wrap-${step}`}
                    className="grid gap-4 grid-rows-[min-content_minmax(0,1fr)] overflow-x-hidden overflow-y-auto transform-gpu [@media_(min-width:700px)]:min-h-[450px] [@media_(min-width:700px)]:overflow-visible [@media_(min-width:700px)]:w-[600px] [@media_(max-height:500px)]:gap-2 [@media_(min-width:700px)]:gap-6"
                  >
                    {/* <LessonHeader heading="Which one of these is the dog ?" /> */}
                    {renderedQuestion}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* bottom */}
          <div className="grid h-full w-full col-start-1 row-start-3 relative z-[110] ">
            <div className="col-start-1 row-start-1 min-h-0">
              <div className=" w-full [@media_(min-width:700px)]:w-full [@media_(min-width:700px)]:max-h-[140px] [@media_(min-width:700px)]:border-t-2 [@media_(min-width:700px)]:border-border [@media_(min-width:700px)]:absolute [@media_(min-width:700px)]:bottom-0 [@media_(min-width:700px)]:min-h-[140px] [@media_(min-width:700px)]:overflow-hidden ">
                <div className=" relative max-w-[1000px] grid items-center justify-items-stretch gap-y-2 gap-x-4 auto-rows-fr grid-cols-1 [@media_(min-width:1000px)]:ml-[calc(50%-500px)] [@media_(min-width:700px)]:min-h-[140px] [@media_(min-width:700px)]:px-10 [@media_(min-width:700px)]:w-full [@media_(min-width:700px)]:items-center [@media_(min-width:700px)]:auto-rows-auto [@media_(min-width:700px)]:grid-cols-5 [@media_(min-width:700px)]:grid-rows-1 [@media_(min-width:700px)]:justify-between ">
                  <div className="[@media_(min-width:700px)]:col-[auto/2] [@media_(min-width:700px)]:justify-self-start">
                    <ThemedButton className="w-full font-bold text-[#52656d] border-border [@media_(min-width:700px)]:min-w-[150px]">
                      <span className="uppercase text-[17px]">SKIP</span>
                    </ThemedButton>
                  </div>
                  <div className=" relative [@media_(min-width:700px)]:col-start-5 [@media_(min-width:700px)]:justify-self-end">
                    <ThemedButton
                      disabled={!canCheck} // <= enables when an option is selected / pairs complete
                      onClick={next}
                      className={`min-w-[150px] [@media_(min-width:700px)]:min-w-[150px] ${canCheck && "bg-[#93d333]! text-black! font-bold"} `}
                    >
                      <span className="uppercase text-[17px]">CHECK</span>
                    </ThemedButton>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
