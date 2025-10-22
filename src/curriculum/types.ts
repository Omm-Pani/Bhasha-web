import type { AudioSentence } from "../components/ui/questions/AudioSentence";
import type { CreateSentence } from "../components/ui/questions/CreateSentence";
import type { CreateWord } from "../components/ui/questions/CreateWord";
import type { MatchPairs } from "../components/ui/questions/MatchPair";
import type PictureQuestionComp from "../components/ui/questions/PictureQuestionComp";

// src/curriculum/types.ts
export type LessonKind =
  | "Picture"
  | "CreateSentence"
  | "CreateWord"
  | "Audio"
  | "MatchPairs";
// 1) Derive prop types from components
type PictureProps = React.ComponentProps<typeof PictureQuestionComp>;
type CreateSentenceProps = React.ComponentProps<typeof CreateSentence>;
type CreateWordProps = React.ComponentProps<typeof CreateWord>;
type AudioProps = React.ComponentProps<typeof AudioSentence>;
type MatchPairsProps = React.ComponentProps<typeof MatchPairs>;

// 2) Make LessonDef a discriminated union so TS knows "props" by "kind"
export type LessonDef =
  | { id: string; kind: "Picture"; props: PictureProps }
  | { id: string; kind: "CreateSentence"; props: CreateSentenceProps }
  | { id: string; kind: "CreateWord"; props: CreateWordProps }
  | { id: string; kind: "Audio"; props: AudioProps }
  | { id: string; kind: "MatchPairs"; props: MatchPairsProps };
