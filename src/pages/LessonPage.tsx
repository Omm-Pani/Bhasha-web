// import { cloneElement, isValidElement, useEffect, useState } from "react";
// import type { Lesson, Languages } from "../components/lesson/lesson-data";
// import { Button } from "../components/ui/button";
// import { Card, CardContent } from "../components/ui/card";
// import { Progress } from "../components/ui/progress";
// import { Award, Sparkles, X, Heart } from "lucide-react";
// import { recordLessonCompletion } from "../lib/streak";
// import { SaveProgressCTA } from "../components/signup-cta";
// import { ThemedButton } from "../components/ui/ThemedButton";

// import { CreateSentence } from "../components/ui/questions/CreateSentence";
// import { MatchPairs, type Pair } from "../components/ui/questions/MatchPair";
// import PictureQuestionComp from "../components/ui/questions/PictureQuestionComp";

// import { useNavigate } from "react-router-dom";
// import { CreateWord } from "../components/ui/questions/CreateWord";

// import { AudioSentence } from "../components/ui/questions/AudioSentence";
// import { useGameStore } from "../store/useGameStore";

// const DATA: Pair[] = [
//   { key: "dosa", left: "dosa", right: "ದೋ ಸೆ", rightHint: "Dō se" },
//   { key: "water", left: "water", right: "ನೀ ರು", rightHint: "Nī ru" },
//   { key: "rice", left: "rice", right: "ಅ ನ್ನ", rightHint: "An na" },
//   {
//     key: "please",
//     left: "please",
//     right: "ದಯ ವಿಟ್ಟು",
//     rightHint: "daya viṭṭu",
//   },
//   { key: "tea", left: "tea", right: "ಚ ಹಾ", rightHint: "Ca hā" },
//   // { key: "please", left: "please", right: "ください", rightHint: "ku da sa i" },
// ];

// const lesson1 = {
//   id: "1",
//   title: "Basics",
//   questions: [
//     <PictureQuestionComp
//       question='Which one of these is "Dosa" ?'
//       options={[
//         { name: "Ca hā", translation: "ಚ ಹಾ", imgsrc: "hot-tea.png", id: "1" },
//         {
//           name: "An na",
//           translation: "ಅ ನ್ನ",
//           imgsrc: "rice-bowl.png",
//           id: "2",
//         },
//         {
//           name: "Dō se",
//           translation: "ದೋ ಸೆ",
//           imgsrc: "dosa.png",
//           id: "3",
//         },
//         {
//           name: "Nī ru",
//           translation: "ನೀ ರು",
//           imgsrc: "glass-of-water.png",
//           id: "4",
//         },
//       ]}
//       answer="Dō se"
//     />,
//     <PictureQuestionComp
//       question='Which one of these is "water" ?'
//       options={[
//         { name: "Ca hā", translation: "ಚ ಹಾ", imgsrc: "hot-tea.png", id: "1" },
//         {
//           name: "An na",
//           translation: "ಅ ನ್ನ",
//           imgsrc: "rice-bowl.png",
//           id: "2",
//         },
//         {
//           name: "Nī ru",
//           translation: "ನೀ ರು",
//           imgsrc: "glass-of-water.png",
//           id: "3",
//         },
//       ]}
//       answer="Nī ru"
//     />,
//     <CreateSentence
//       title="Write this in English"
//       question="Do se  daya viṭṭu"
//       translation="ಡೋ ಸ್  ದಯಾ ವಿಟ್ಟು"
//       audioSrc="audio/DosaPlease.m4a"
//       words={["You", "Dosa", "Please", "Rice"]}
//       answer="Dosa Please"
//       onChange={(arr) => console.log("Sentence:", arr.join(" "))}
//     />,
//     <CreateWord
//       title="Say it in Kannada"
//       question="Water"
//       words={["Nī", "ru", "hā"]}
//       wordsTranslation={["ನೀ", "ರು", "ಹಾ"]}
//       answer="Nīru"
//       onChange={(arr) => console.log("Sentence:", arr.join(" "))}
//     />,
//     <AudioSentence
//       title="Tap what you hear"
//       audioSrc="audio/waterPlease.m4a"
//       words={["Nī ru", "An na", "Ca hā", "daya viṭṭu"]}
//       wordsTranslation={["ನೀ ರು", "ಅ ನ್ನ", "ಚ ಹಾ", "ದಯಾ ವಿಟ್ಟು"]}
//       answer="Nīru dayaviṭṭu"
//       onChange={(arr) => console.log("Sentence:", arr.join(" "))}
//     />,
//     <CreateWord
//       title="Say it in Kannada"
//       question="Rice"
//       words={["Nī", "na", "ru", "hā", "An"]}
//       wordsTranslation={["ನೀ", "ನ್ನ", "ರು", "ಹಾ", "ಅ"]}
//       answer="Anna"
//       onChange={(arr) => console.log("Sentence:", arr.join(" "))}
//     />,
//     <PictureQuestionComp
//       question='Which one of these is "rice"?'
//       options={[
//         { name: "Nā yi", translation: "ನಾ ಯಿ", imgsrc: "happy.png", id: "1" },
//         {
//           name: "An na",
//           translation: "ಅ ನ್ನ",
//           imgsrc: "rice-bowl.png",
//           id: "2",
//         },
//         {
//           name: "Nī ru",
//           translation: "ನೀ ರು",
//           imgsrc: "glass-of-water.png",
//           id: "3",
//         },
//       ]}
//       answer="An na"
//     />,
//     <CreateSentence
//       title="Write this in English"
//       question="An na daya viṭṭu"
//       translation="ಅ ನ್ನ ದಯ ವಿಟ್ಟು"
//       audioSrc="audio/RicePlease.m4a"
//       words={["You", "Dosa", "Please", "Rice"]}
//       answer="Rice Please"
//       onChange={(arr) => console.log("Sentence:", arr.join(" "))}
//     />,
//     <PictureQuestionComp
//       question='Which one of these is "Tea" ?'
//       options={[
//         { name: "Ca hā", translation: "ಚ ಹಾ", imgsrc: "hot-tea.png", id: "1" },
//         {
//           name: "An na",
//           translation: "ಅ ನ್ನ",
//           imgsrc: "rice-bowl.png",
//           id: "2",
//         },
//         {
//           name: "Dō se",
//           translation: "ದೋ ಸೆ",
//           imgsrc: "dosa.png",
//           id: "3",
//         },
//         {
//           name: "Nī ru",
//           translation: "ನೀ ರು",
//           imgsrc: "glass-of-water.png",
//           id: "4",
//         },
//       ]}
//       answer="Ca hā"
//     />,
//     <CreateWord
//       title="Say it in Kannada"
//       question="Tea"
//       words={["Nī", "na", "ru", "hā", "An", "Ca"]}
//       wordsTranslation={["ನೀ", "ನ್ನ", "ರು", "ಹಾ", "ನ್ನ", "ಚ"]}
//       answer="Cahā"
//       onChange={(arr) => console.log("Sentence:", arr.join(" "))}
//     />,
//     <MatchPairs pairs={DATA} />,
//     <AudioSentence
//       title="Tap what you hear"
//       audioSrc="audio/TeaPlease.m4a"
//       words={["Nī ru", "An na", "Ca hā", "daya viṭṭu"]}
//       wordsTranslation={["ನೀ ರು", "ಅ ನ್ನ", "ಚ ಹಾ", "ದಯಾ ವಿಟ್ಟು"]}
//       answer="Cahā dayaviṭṭu"
//       onChange={(arr) => console.log("Sentence:", arr.join(" "))}
//     />,
//     <AudioSentence
//       title="Tap what you hear"
//       audioSrc="audio/RicePlease.m4a"
//       words={["Nī ru", "An na", "Ca hā", "daya viṭṭu"]}
//       wordsTranslation={["ನೀ ರು", "ಅ ನ್ನ", "ಚ ಹಾ", "ದಯಾ ವಿಟ್ಟು"]}
//       answer="Anna dayaviṭṭu"
//       onChange={(arr) => console.log("Sentence:", arr.join(" "))}
//     />,
//     <MatchPairs pairs={DATA} />,
//   ],
// };
// const lesson2 = {
//   id: "1",
//   title: "Basics2",
//   questions: [
//     <MatchPairs pairs={DATA} />,
//     <CreateSentence
//       title="Write this in English"
//       question="Do se  daya viṭṭu"
//       translation="ಡೋ ಸ್  ದಯಾ ವಿಟ್ಟು"
//       audioSrc="audio/DosaPlease.m4a"
//       words={["You", "Dosa", "Please", "Rice"]}
//       answer="Dosa Please"
//       onChange={(arr) => console.log("Sentence:", arr.join(" "))}
//     />,
//     <CreateWord
//       title="Say it in Kannada"
//       question="Tea"
//       words={["Nī ru", "An na", "Ca hā", "daya viṭṭu"]}
//       wordsTranslation={["ನೀ ರು", "ಅ ನ್ನ", "ಚ ಹಾ", "ದಯಾ ವಿಟ್ಟು"]}
//       answer="Cahā"
//       onChange={(arr) => console.log("Sentence:", arr.join(" "))}
//     />,
//     <CreateWord
//       title="Say it in Kannada"
//       question="Water"
//       words={["Nī", "na", "ru", "hā", "An", "Ca"]}
//       wordsTranslation={["ನೀ", "ನ್ನ", "ರು", "ಹಾ", "ಅ", "ಚ"]}
//       answer="Nīru"
//       onChange={(arr) => console.log("Sentence:", arr.join(" "))}
//     />,
//     <CreateSentence
//       title="Write this in English"
//       question="dōse mattu anna"
//       translation="ದೋಸೆ ಮತ್ತು ಅನ್ನ"
//       audioSrc="audio/DosaAndRice.m4a"
//       words={["and", "Dosa", "Please", "Rice", "water", "you", "Tea"]}
//       answer="Dosa and Rice"
//       onChange={(arr) => console.log("Sentence:", arr.join(" "))}
//     />,
//     <CreateWord
//       title="Write it in Kannada"
//       question="tea and water"
//       words={["mattu", "dōse", "dayaviṭṭu", "anna", "nīru", "nīvu", "cahā"]}
//       wordsTranslation={[
//         "ಮತ್ತು",
//         "ದೋಸೆ",
//         "ದಯವಿಟ್ಟು",
//         "ಅನ್ನ",
//         "ನೀರು",
//         "ನೀವು",
//         "ಚಹಾ",
//       ]}
//       answer="cahā mattu nīru"
//       onChange={(arr) => console.log("Sentence:", arr.join(" "))}
//     />,
//     <MatchPairs pairs={DATA} />,
//     <CreateSentence
//       title="Write this in English"
//       question="Anna mattu dōse"
//       translation="ದೋಸೆ ಮತ್ತು ಅನ್ನ"
//       audioSrc="audio/DosaAndRice.m4a"
//       words={["and", "Dosa", "Please", "Rice", "water", "you", "Tea"]}
//       answer="Rice and Dosa"
//       onChange={(arr) => console.log("Sentence:", arr.join(" "))}
//     />,
//     <AudioSentence
//       title="Tap what you hear"
//       audioSrc="audio/WaterAndDosa.mp3"
//       words={["Nī ru", "An na", "Ca hā", "mat tu", "daya viṭṭu", "dōse"]}
//       wordsTranslation={[
//         "ನೀ ರು",
//         "ಅ ನ್ನ",
//         "ಚ ಹಾ",
//         "ಮ ತ್ತು",
//         "ದಯಾ ವಿಟ್ಟು",
//         "ಅ ನ್ನ",
//       ]}
//       answer="Nīru mattu dōse"
//       onChange={(arr) => console.log("Sentence:", arr.join(" "))}
//     />,
//     <AudioSentence
//       title="Tap what you hear"
//       audioSrc="audio/waterPlease.m4a"
//       words={["Nī ru", "An na", "Ca hā", "daya viṭṭu"]}
//       wordsTranslation={["ನೀ ರು", "ಅ ನ್ನ", "ಚ ಹಾ", "ದಯಾ ವಿಟ್ಟು"]}
//       answer="Nīru dayaviṭṭu"
//       onChange={(arr) => console.log("Sentence:", arr.join(" "))}
//     />,
//     <PictureQuestionComp
//       question='Which one of these is "water" ?'
//       options={[
//         { name: "Ca hā", translation: "ಚ ಹಾ", imgsrc: "hot-tea.png", id: "1" },
//         {
//           name: "An na",
//           translation: "ಅ ನ್ನ",
//           imgsrc: "rice-bowl.png",
//           id: "2",
//         },
//         {
//           name: "Nī ru",
//           translation: "ನೀ ರು",
//           imgsrc: "glass-of-water.png",
//           id: "3",
//         },
//       ]}
//       answer="Nī ru"
//     />,
//     <CreateWord
//       title="Say it in Kannada"
//       question="Rice"
//       words={["Nī ru", "An na", "Ca hā", "daya viṭṭu"]}
//       wordsTranslation={["ನೀ ರು", "ಅ ನ್ನ", "ಚ ಹಾ", "ದಯಾ ವಿಟ್ಟು"]}
//       answer="Anna"
//       onChange={(arr) => console.log("Sentence:", arr.join(" "))}
//     />,
//     <CreateSentence
//       title="Write this in English"
//       question="Nī ru mat tu an na daya viṭṭu"
//       translation="ನೀ ರು ಮ ತ್ತು ಅ ನ್ನ ದಯಾ ವಿಟ್ಟು"
//       audioSrc="audio/WaterAndRicePlease.mp3"
//       words={["and", "Dosa", "Please", "Rice", "water", "you", "Tea"]}
//       answer="Water and Rice Please"
//       onChange={(arr) => console.log("Sentence:", arr.join(" "))}
//     />,
//     <MatchPairs pairs={DATA} />,
//     <CreateWord
//       title="Say it in Kannada"
//       question="Rice"
//       words={["Nī", "na", "ru", "hā", "An"]}
//       wordsTranslation={["ನೀ", "ನ್ನ", "ರು", "ಹಾ", "ಅ"]}
//       answer="Anna"
//       onChange={(arr) => console.log("Sentence:", arr.join(" "))}
//     />,
//     <CreateSentence
//       title="Write it in Kannada"
//       question="cahā mattu nīru"
//       translation="ಚಹಾ ಮತ್ತು ನೀರು"
//       audioSrc="audio/TeaAndWater.mp3"
//       words={["and", "Dosa", "Please", "Rice", "water", "you", "Tea"]}
//       answer="Tea and water"
//       onChange={(arr) => console.log("Sentence:", arr.join(" "))}
//     />,
//     <MatchPairs pairs={DATA} />,
//   ],
// };

// export function LessonPage({
//   // lesson,
//   language,
//   showSignupAfter = false,
// }: {
//   lesson: Lesson;
//   language: Languages;
//   showSignupAfter?: boolean;
// }) {
//   const navigate = useNavigate();
//   const [step, setStep] = useState(0);
//   const [score, setScore] = useState(0);
//   const [done, setDone] = useState(false);
//   const [showCTA, setShowCTA] = useState(false);

//   // per-step answer state
//   const [canCheck, setCanCheck] = useState(false);
//   const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

//   const { lessonsCompleted, completeLesson } = useGameStore();
//   const lessons = [lesson1, lesson2];
//   const lesson = lessons[lessonsCompleted] || lessons[0];

//   const total = lesson.questions.length;

//   // const q = useMemo(
//   //   () => lesson.questions[step] as ChoiceQuestion | undefined,
//   //   [lesson, step]
//   // );
//   const pct = Math.round((step / lesson.questions.length) * 100);

//   useEffect(() => {
//     if (done && showSignupAfter) {
//       const t = setTimeout(() => setShowCTA(true), 600);
//       return () => clearTimeout(t);
//     }
//   }, [done, showSignupAfter]);

//   useEffect(() => {
//     setCanCheck(false);
//     setIsCorrect(null);
//   }, [step]);

//   const handleAnswerChange = (state: {
//     canCheck: boolean;
//     isCorrect: boolean | null;
//   }) => {
//     setCanCheck(state.canCheck);
//     setIsCorrect(state.isCorrect);
//   };

//   const next = () => {
//     // Defensive: only proceed if we canCheck (button will be disabled otherwise)
//     const correct = isCorrect === true;
//     if (correct) {
//       setScore((s) => s + 1);
//     } else {
//       alert("wrong");
//     }

//     const nextStep = step + 1;
//     if (nextStep >= total) {
//       setDone(true);
//       recordLessonCompletion(lesson.id);
//       completeLesson();
//       navigate("/learn");
//     } else {
//       setStep(nextStep);
//     }
//   };

//   if (done) {
//     // const xp = score * Math.ceil(lesson.xp / lesson.questions.length);
//     return (
//       <div>
//         <Card className="rounded-2xl border-2 border-primary">
//           <CardContent className="space-y-3 p-4 text-center">
//             <div className="mx-auto flex w-full max-w-sm flex-col items-center gap-2">
//               <Award className="size-8 text-primary" aria-hidden />
//               <h3 className="text-xl font-bold">Great job!</h3>
//               <p className="text-sm text-muted-foreground">
//                 You finished {lesson.title} in {language}. Score {score}/
//                 {/* {lesson.questions.length} — +{xp} XP */}
//               </p>
//               <div
//                 className="rounded-lg bg-success/15 px-3 py-2 text-sm text-foreground"
//                 style={{ ["--success" as any]: "var(--brand-success)" }}
//               >
//                 Streak updated! Keep coming back daily to grow it.
//               </div>
//               <div className="flex gap-2 pt-1">
//                 <Button variant="secondary" onClick={() => navigate("/learn")}>
//                   Continue <Sparkles className="ml-1 size-4" />
//                 </Button>
//               </div>
//             </div>
//             {showCTA && <SaveProgressCTA />}
//           </CardContent>
//         </Card>
//       </div>
//     );
//   }

//   // Inject onAnswerChange ONLY into the current question element
//   const current = lesson.questions[step];
//   const renderedQuestion = isValidElement(current)
//     ? cloneElement(current as React.ReactElement<any>, {
//         onAnswerChange: handleAnswerChange,
//         key: `q-${step}`,
//       })
//     : current;

//   return (
//     <div className="[@media_(min-width:700px)]:max-w-[1140px] [@media_(min-width:700px)]:min-w-[900px] [@media_(min-width:700px)]:mx-auto [@media_(min-width:700px)]:pt-6 pt-0">
//       <div className="absolute inset-0">
//         <div className="py-6 px-4 grid grid-cols-1 gap-6 grid-rows-[min-content_1fr_min-content] min-h-[460px] overflow-hidden absolute top-0 left-0 h-full w-full [@media_(min-width:700px)]:p-0   [@media_(min-width:700px)_and_(max-height:650px)]:grid-rows-[90px_450px_140px] [@media_(min-width:700px)_and_(max-height:650px)]:min-h-[680px] [@media_(min-width:700px)]:gap-0 [@media_(min-width:700px)]:min-h-[690px] [@media_(min-width:700px)]:grid-rows-[100px_1fr_140px]">
//           {/* top section */}
//           <div className="col-start-1 col-end-auto  row-start-1 row-end-auto z-[100]">
//             <div className="mx-auto max-w-[1080px] [@media_(min-width:700px)]:p-0 [@media_(min-width:700px)]:pt-[50px] [@media_(min-width:700px)]:px-10 [@media_(min-width:700px)_and_(max-height:650px)]:pt-10">
//               <div className="grid items-center gap-5 grid-cols-[min-content_1fr_min-content] md:gap-6">
//                 <button
//                   onClick={() => navigate("/learn")}
//                   className="cursor-pointer "
//                 >
//                   <X size={28} className="text-[#52656d]" />
//                 </button>
//                 <Progress value={pct} className="h-4" />
//                 <div className="flex items-center justify-between gap-[5px]">
//                   <Heart size={28} fill="#ee5555" color="#ee5555" />
//                   <span className="text-[#ee5555] font-bold pl-1 pt-0.5">
//                     5
//                   </span>
//                 </div>
//                 {/* <span className="text-xs text-muted-foreground">{pct}%</span> */}
//               </div>
//             </div>
//           </div>

//           {/* mid section */}

//           <div className="flex flex-col min-h-0 w-full col-start-1 col-end-auto row-start-2 row-end-auto">
//             <div className="grid w-full h-full relative">
//               <div className="col-start-1 col-end-auto row-start-1 row-end-auto min-h-0">
//                 <div className="grid content-center justify-center w-full h-full text-center text-[19px] grid-cols-1 grid-rows-[minmax(0,1fr)] [@media_(min-width:700px)]:grid-cols-[min-content] [@media_(min-width:700px)]:grid-rows-[min-content]">
//                   <div
//                     key={`wrap-${step}`}
//                     className="grid gap-4 grid-rows-[min-content_minmax(0,1fr)] overflow-x-hidden overflow-y-auto transform-gpu [@media_(min-width:700px)]:min-h-[450px] [@media_(min-width:700px)]:overflow-visible [@media_(min-width:700px)]:w-[600px] [@media_(max-height:500px)]:gap-2 [@media_(min-width:700px)]:gap-6"
//                   >
//                     {/* <LessonHeader heading="Which one of these is the dog ?" /> */}
//                     {renderedQuestion}
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* bottom */}
//           <div className="grid h-full w-full col-start-1 row-start-3 relative z-[110] ">
//             <div className="col-start-1 row-start-1 min-h-0">
//               <div className=" w-full [@media_(min-width:700px)]:w-full [@media_(min-width:700px)]:max-h-[140px] [@media_(min-width:700px)]:border-t-2 [@media_(min-width:700px)]:border-border [@media_(min-width:700px)]:absolute [@media_(min-width:700px)]:bottom-0 [@media_(min-width:700px)]:min-h-[140px] [@media_(min-width:700px)]:overflow-hidden ">
//                 <div className=" relative max-w-[1000px] grid items-center justify-items-stretch gap-y-2 gap-x-4 auto-rows-fr grid-cols-1 [@media_(min-width:1000px)]:ml-[calc(50%-500px)] [@media_(min-width:700px)]:min-h-[140px] [@media_(min-width:700px)]:px-10 [@media_(min-width:700px)]:w-full [@media_(min-width:700px)]:items-center [@media_(min-width:700px)]:auto-rows-auto [@media_(min-width:700px)]:grid-cols-5 [@media_(min-width:700px)]:grid-rows-1 [@media_(min-width:700px)]:justify-between ">
//                   <div className="[@media_(min-width:700px)]:col-[auto/2] [@media_(min-width:700px)]:justify-self-start">
//                     <ThemedButton className="w-full font-bold text-[#52656d] border-border [@media_(min-width:700px)]:min-w-[150px]">
//                       <span className="uppercase text-[17px]">SKIP</span>
//                     </ThemedButton>
//                   </div>
//                   <div className=" relative [@media_(min-width:700px)]:col-start-5 [@media_(min-width:700px)]:justify-self-end">
//                     <ThemedButton
//                       disabled={!canCheck} // <= enables when an option is selected / pairs complete
//                       onClick={next}
//                       className={`min-w-[150px] [@media_(min-width:700px)]:min-w-[150px] ${canCheck && "bg-[#93d333]! text-black! font-bold"} `}
//                     >
//                       <span className="uppercase text-[17px]">CHECK</span>
//                     </ThemedButton>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
// src/pages/LessonPage.tsx
// src/pages/LessonPage.tsx
import { useEffect, useMemo, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import type { Languages } from "../components/lesson/lesson-data";

import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { Progress } from "../components/ui/progress";
import { Award, Sparkles, X, Heart } from "lucide-react";
import { recordLessonCompletion } from "../lib/streak";
import { SaveProgressCTA } from "../components/signup-cta";
import { ThemedButton } from "../components/ui/ThemedButton";

// Curriculum (data)
import { buttonsById } from "../curriculum/buttonsById";
import { lessonsById } from "../curriculum/lessonsById";
import { questionsById } from "../curriculum/questionsById"; // <-- make sure this file exists

// Question renderer (strict, per-kind)
import { renderQuestion } from "../curriculum/questionRegistry";

// Store
import { useGameStore } from "../store/useGameStore";

export function LessonPage() {
  const { buttonId } = useParams<{ buttonId: string }>();
  const navigate = useNavigate();

  // Store actions/state
  const markLessonComplete = useGameStore((s) => s.markLessonComplete);
  const buttonProgress = useGameStore((s) => s.buttonProgress);
  const completeLesson = useGameStore((s) => s.completeLesson); // legacy global, optional

  // Guard: missing param
  if (!buttonId) {
    return (
      <div className="p-6">
        <div className="text-lg font-semibold">No lesson selected.</div>
        <button className="underline mt-2" onClick={() => navigate("/learn")}>
          Back to Dashboard
        </button>
      </div>
    );
  }

  // Resolve button → lesson ids
  const button = buttonsById[buttonId];
  const lessonIds: string[] = button?.lessonIds ?? [];

  // Guard: bad id or empty
  if (!button || lessonIds.length === 0) {
    return (
      <div className="p-6">
        <div className="text-lg font-semibold">
          Unknown or empty lesson button.
        </div>
        <button className="underline mt-2" onClick={() => navigate("/learn")}>
          Back to Dashboard
        </button>
      </div>
    );
  }

  // Pick FIRST INCOMPLETE lesson for this button
  const completedLessons = new Set(
    buttonProgress[buttonId]?.completedLessonIds ?? []
  );
  const firstIncompleteIndex = lessonIds.findIndex(
    (lid) => !completedLessons.has(lid)
  );

  // If everything is already complete, send the learner back
  useEffect(() => {
    if (firstIncompleteIndex === -1) {
      navigate("/learn");
    }
    // we only want to run this once on mount for this buttonId
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [buttonId]);

  // Start with the first incomplete lesson (or 0 if all complete—though the effect above will navigate)
  const [lessonIndex] = useState(
    firstIncompleteIndex === -1 ? 0 : firstIncompleteIndex
  );

  const currentLessonId = lessonIds[lessonIndex];
  const currentLesson = lessonsById[currentLessonId];

  // Guard: malformed lesson
  if (
    !currentLesson ||
    !currentLesson.questionIds ||
    currentLesson.questionIds.length === 0
  ) {
    return (
      <div className="p-6">
        <div className="text-lg font-semibold">
          This lesson has no questions.
        </div>
        <button className="underline mt-2" onClick={() => navigate("/learn")}>
          Back to Dashboard
        </button>
      </div>
    );
  }

  // Iterate through QUESTIONS of the current lesson
  const questionIds = currentLesson.questionIds;
  const [qIndex, setQIndex] = useState(0);

  // per-question answer state
  const [canCheck, setCanCheck] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  // Reset check state when we change question or lesson
  useEffect(() => {
    setCanCheck(false);
    setIsCorrect(null);
  }, [qIndex, currentLessonId]);

  // Top bar progress: within the lesson (question-level)
  const pct = Math.round((qIndex / questionIds.length) * 100);

  const handleAnswerChange = (state: {
    canCheck: boolean;
    isCorrect: boolean | null;
  }) => {
    setCanCheck(state.canCheck);
    setIsCorrect(state.isCorrect);
  };

  const onCheck = () => {
    if (!canCheck) return;

    const correct = isCorrect === true;
    if (!correct) {
      alert("wrong");
      return;
    }

    const nextQ = qIndex + 1;
    if (nextQ >= questionIds.length) {
      // LESSON complete → persist + streak + optional legacy + redirect
      markLessonComplete(buttonId, currentLessonId);
      recordLessonCompletion(currentLessonId);
      completeLesson?.(); // keep if other parts still read it
      navigate("/learn");
    } else {
      setQIndex(nextQ);
    }
  };

  const currentQuestionDef = questionsById[questionIds[qIndex]];

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
              </div>
            </div>
          </div>

          {/* middle: render QUESTION via registry */}
          <div className="flex flex-col min-h-0 w-full col-start-1 col-end-auto row-start-2 row-end-auto">
            <div className="grid w-full h-full relative">
              <div className="col-start-1 col-end-auto row-start-1 row-end-auto min-h-0">
                <div className="grid content-center justify-center w-full h-full text-center text-[19px] grid-cols-1 grid-rows-[minmax(0,1fr)] [@media_(min-width:700px)]:grid-cols-[min-content] [@media_(min-width:700px)]:grid-rows-[min-content]">
                  <div
                    key={`${currentLessonId}-${qIndex}`}
                    className="grid gap-4 grid-rows-[min-content_minmax(0,1fr)] overflow-x-hidden overflow-y-auto transform-gpu [@media_(min-width:700px)]:min-h-[450px] [@media_(min-width:700px)]:overflow-visible [@media_(min-width:700px)]:w-[600px] [@media_(max-height:500px)]:gap-2 [@media_(min-width:700px)]:gap-6"
                  >
                    {renderQuestion(currentQuestionDef, {
                      onAnswerChange: handleAnswerChange,
                    })}
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
                      disabled={!canCheck}
                      onClick={onCheck}
                      className={`min-w-[150px] [@media_(min-width:700px)]:min-w-[150px] ${canCheck && "bg-[#93d333]! text-black! font-bold"} `}
                    >
                      <span className="uppercase text-[17px]">CHECK</span>
                    </ThemedButton>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* end bottom */}
        </div>
      </div>
    </div>
  );
}
