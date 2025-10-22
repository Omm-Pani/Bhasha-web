// src/curriculum/questionRegistry.tsx
import React from "react";
import { CreateSentence } from "../components/ui/questions/CreateSentence";
import { CreateWord } from "../components/ui/questions/CreateWord";
import { AudioSentence } from "../components/ui/questions/AudioSentence";
import PictureQuestionComp from "../components/ui/questions/PictureQuestionComp";
import { MatchPairs } from "../components/ui/questions/MatchPair";

// 1) Derive prop types from the actual components
type PictureProps = React.ComponentProps<typeof PictureQuestionComp>;
type CreateSentenceProps = React.ComponentProps<typeof CreateSentence>;
type CreateWordProps = React.ComponentProps<typeof CreateWord>;
type AudioProps = React.ComponentProps<typeof AudioSentence>;
type MatchPairsProps = React.ComponentProps<typeof MatchPairs>;

// 2) Discriminated union = kind → exact props
export type QuestionDef =
  | { id: string; kind: "Picture"; props: PictureProps }
  | { id: string; kind: "CreateSentence"; props: CreateSentenceProps }
  | { id: string; kind: "CreateWord"; props: CreateWordProps }
  | { id: string; kind: "Audio"; props: AudioProps }
  | { id: string; kind: "MatchPairs"; props: MatchPairsProps };

// 3) Common handler you thread from LessonPage (make sure your components accept it)
type CommonHandlers = {
  onAnswerChange?: (s: {
    canCheck: boolean;
    isCorrect: boolean | null;
  }) => void;
};

// 4) Registry: TS now knows which props belong to which component
export function renderQuestion(
  def: QuestionDef,
  handlers: CommonHandlers = {}
) {
  switch (def.kind) {
    case "Picture":
      return <PictureQuestionComp {...def.props} {...handlers} />;
    case "CreateSentence":
      return <CreateSentence {...def.props} {...handlers} />;
    case "CreateWord":
      return <CreateWord {...def.props} {...handlers} />;
    case "Audio":
      return <AudioSentence {...def.props} {...handlers} />;
    case "MatchPairs":
      // If MatchPairs doesn't support onAnswerChange, don't pass handlers here:
      return <MatchPairs {...def.props} />;
    default:
      return <div>Unknown question type</div>;
  }
}
