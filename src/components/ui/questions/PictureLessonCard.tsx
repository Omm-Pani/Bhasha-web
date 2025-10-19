import { type FC } from "react";
import { Card, CardContent } from "../card";

type PictureLessonCardProps = {
  name: string;
  translation: string;
  imgsrc: string;
  id: string;
  selected: boolean;
  onClick?: () => void;
  className?: string;
};

export const PictureLessonCard: FC<PictureLessonCardProps> = ({
  name,
  translation,
  id,
  imgsrc,
  selected,
  onClick,
  className = "",
}) => {
  return (
    <div>
      <Card
        role="button"
        tabIndex={0}
        onClick={onClick}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onClick?.();
          }
        }}
        aria-pressed={selected}
        className={[
          "cursor-pointer relative border-x-2 border-t-2 border-b-4 shadow-md transition-all duration-100 ease-in-out",
          "!bg-transparent py-6 px-5 hover:!bg-[rgb(32,47,54)] active:translate-y-0.5 active:transform-gpu active:border-b-2",
          selected ? "border-[#3f85a7]" : "",
          className,
        ].join(" ")}
      >
        <CardContent className="text-lg !p-0">
          <div className="flex flex-col w-full grow">
            <div className="flex flex-col justify-center items-center grow w-full">
              <img
                src={imgsrc}
                alt={name}
                className="mb-[10px] md:w-[100px] bg-no-repeat bg-contain bg-center grow py-5 md:h-[140px] md:"
              />
            </div>
          </div>

          <div className="flex items-center justify-center md:justify-end gap-2">
            <div
              className={[
                "flex flex-col text-foreground text-center text-[15px] md:mr-auto",
                selected ? "!text-[#1899d6]" : "",
              ].join(" ")}
            >
              <span className="text-start text-[#52656d]">{name}</span>
              <span className="font-light">{translation}</span>
            </div>

            <span
              className={[
                "inline-flex justify-center items-center h-[30px] w-[30px] text-[15px] font-bold text-[#52656d] border-2 border-border rounded-[8px]",
                selected ? "!text-[#1899d6] !border-[#3f85a7]" : "",
              ].join(" ")}
            >
              {id}
            </span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
