import { Star } from "lucide-react";
import { useNavigate } from "react-router-dom";

type Props = {
  buttonId: string;
  active: boolean; // next to work on
  completed: boolean; // fully done
  progress: number; // 0..100
};

export function SkillPathButton({
  buttonId,
  active,
  completed,
  progress,
}: Props) {
  const navigate = useNavigate();

  const bg = completed || active ? "#58cc02" : "#37464f";
  const innerStar = completed || active ? "#ffffff" : "#52656d";
  const isClickable = active || completed; // up to you: completed could still be clickable to review

  return (
    <div
      className={`${buttonId[5] === "1" && active ? "mt-[67px]" : ""} mb-0 left-0 relative flex`}
    >
      <div className="relative h-[98px] w-[98px] place-items-center">
        {/* Tooltip only when active and not completed */}
        {active && !completed && (
          <>
            <style>{`
              @keyframes tooltip-bob-y {
                0%, 100% { transform: translate3d(0, 0, 0); }
                50%      { transform: translate3d(0, -8px, 0); }
              }
            `}</style>
            <div
              className=" absolute -top-8 left-1/2 -translate-x-1/2 z-10 select-none"
              aria-hidden="true"
            >
              <div
                className="inline-block will-change-transform transform-gpu"
                style={{ animation: "tooltip-bob-y 1.6s ease-in-out infinite" }}
              >
                <div className="relative rounded-[10px] bg-background border-2 border-border min-w-[80px] text-center shadow-sm">
                  <div className="text-[16px] p-[8.5px] font-bold uppercase tracking-wider text-primary">
                    START
                  </div>
                  <div className="absolute left-1/2 -translate-x-1/2 -bottom-[9px] w-[16px] h-[16px]">
                    <div className="absolute top-0 left-0 w-full h-[8px] bg-background"></div>
                    <div className="absolute inset-[2px] border-b-2 border-r-2 border-border rotate-45 bg-background"></div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        {/* Ring only when ACTIVE and NOT completed */}
        {active && !completed && (
          <svg
            className="-p-30 h-[98px] w-[98px] scale-y-[.946]"
            viewBox="0 0 100 100"
          >
            <g transform="translate(50, 50) rotate(-90)">
              <circle
                cx="0"
                cy="0"
                r={46}
                fill="none"
                stroke="rgb(55,70,79)"
                strokeWidth="8"
              />
              <circle
                cx="0"
                cy="0"
                r={46}
                fill="none"
                stroke="#58cc02"
                strokeWidth="8"
                strokeDasharray={2 * Math.PI * 46}
                strokeDashoffset={(1 - progress / 100) * (2 * Math.PI * 46)}
                strokeLinecap="round"
              />
            </g>
          </svg>
        )}

        {/* Inner button */}
        <div className="absolute inset-[10px] rounded-full overflow-hidden grid place-items-center">
          <button
            onClick={() => isClickable && navigate(`/lesson/${buttonId}`)}
            disabled={!isClickable}
            className={`cursor-pointer h-[60px] w-[68px] relative z-0 rounded-full -top-1 shadow-[0_7px_0_rgb(0,0,0,0.2),0_7px_0_${bg}] transition-all duration-50 ease-in-out active:translate-y-1.5 active:shadow-none active:transform-gpu ${isClickable ? "" : "opacity-60 cursor-not-allowed"}`}
            style={{ backgroundColor: bg }}
            aria-label={buttonId}
          >
            <Star
              fill={innerStar}
              color={innerStar}
              className="absolute top-[11.5px] left-[14px] h-[34px] w-[42px]"
            />
          </button>
        </div>
      </div>
    </div>
  );
}
