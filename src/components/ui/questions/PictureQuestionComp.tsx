import { useEffect, useState, type FC } from "react";
import { PictureLessonCard } from "./PictureLessonCard";
import LessonHeader from "./LessonHeader";

type Option = {
  id: string;
  name: string;
  translation: string;
  imgsrc: string;
};

type PictureQuestionCompType = {
  question: string;
  options: Option[];
  answer: string;
  onAnswerChange?: (state: {
    canCheck: boolean;
    isCorrect: boolean | null;
  }) => void;
};

const PictureQuestionComp: FC<PictureQuestionCompType> = ({
  question,
  options,
  answer,
  onAnswerChange,
}) => {
  // single-select: track the selected option id (null if none)
  const [selectedId, setSelectedId] = useState<string | null>(null);

  useEffect(() => {
    setSelectedId(null);
    onAnswerChange?.({ canCheck: false, isCorrect: null });
  }, [question, options, answer]);

  const handleClick = (id: string) => {
    setSelectedId((prev) => {
      const next = prev === id ? null : id;
      // notify parent whenever selection changes
      if (!next) {
        onAnswerChange?.({ canCheck: false, isCorrect: null });
      } else {
        const picked = options.find((o) => o.id === next)?.name ?? "";
        onAnswerChange?.({ canCheck: true, isCorrect: picked === answer });
      }
      return next;
    });
  };

  return (
    <>
      <LessonHeader heading={question} />

      <div className="grid content-center gap-4 [@media_(max-width:500px)]:gap-2 md:gap-6">
        <div className="grid gap-2 grid-cols-2 md:grid-cols-[repeat(auto-fit,minmax(0,1fr))]">
          {options.map((opt) => (
            <PictureLessonCard
              key={opt.id}
              id={opt.id}
              name={opt.name}
              translation={opt.translation}
              imgsrc={opt.imgsrc}
              selected={selectedId === opt.id}
              onClick={() => handleClick(opt.id)}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default PictureQuestionComp;
