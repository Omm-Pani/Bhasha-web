import { Sparkles } from "lucide-react";
import type { FC } from "react";

type LessonHeaderProps = {
  heading: string;
};

const LessonHeader: FC<LessonHeaderProps> = ({ heading }) => {
  return (
    <div className="grid gap-2">
      <div className="text-[#ce82ff] items-center inline-flex font-bold text-base uppercase tracking-wider ">
        <span className="inline-flex relative me-1">
          <Sparkles className="overflow-visible" fill="#ce82ff" />
        </span>
        New Word
      </div>
      <h1 className=" w-full m-0 text-left leading-[1.25] text-[25px] font-bold [@media_(min-width:700px)]:text-[32px]">
        <span>{heading}</span>
      </h1>
    </div>
  );
};

export default LessonHeader;
