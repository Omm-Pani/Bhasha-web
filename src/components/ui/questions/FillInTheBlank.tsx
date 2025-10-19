// FillInTheBlank.tsx
import React, { useId, useState } from "react";
import { AnimatePresence, LayoutGroup, motion } from "framer-motion";

type FillInTheBlankProps = {
  title?: string;
  promptLeft: string;
  promptRight: string;
  options: string[];
  defaultSelected?: string | null;
  onChange?: (value: string | null) => void;
};

export const FillInTheBlank: React.FC<FillInTheBlankProps> = ({
  title = "Fill in the blank",
  promptLeft,
  promptRight,
  options,
  defaultSelected = null,
  onChange,
}) => {
  const [selected, setSelected] = useState<string | null>(defaultSelected);
  const labelId = useId();

  const pick = (w: string | null) => {
    setSelected(w);
    onChange?.(w ?? null);
  };

  return (
    <section className="w-full bg-transparent text-foreground">
      <LayoutGroup>
        {/* Main row */}
        <div className="mt-6 flex items-center">
          {/* Mock illustration block; replace with <img /> if needed */}
          <div
            aria-hidden
            className="h-40 w-40 shrink-0 rounded-2xl bg-[#172126]"
          />

          {/* Sentence */}
          <div className="flex-1 text-[19px] font-light leading-[39px]">
            <span className="text-foreground">{promptLeft}&nbsp;</span>

            {/* Blank area: dashed line ALWAYS visible; the chip overlays it */}
            <span className="relative inline-block align-baseline min-w-[150px] h-10">
              <span
                aria-hidden
                className="pointer-events-none absolute inset-x-0 -bottom-4 border-b-2 border-[#344651]"
              />
              <AnimatePresence mode="popLayout">
                {selected && (
                  <motion.button
                    key={`blank-${selected}`}
                    type="button"
                    onClick={() => pick(null)} // deselect -> animate back down
                    transition={{
                      type: "spring",
                      stiffness: 420,
                      damping: 32,
                      mass: 0.5,
                    }}
                    className={[
                      "absolute left-1/2 -translate-x-1/2 -bottom-2",
                      "px-4 py-1 text-[19px] rounded-[12px]",
                      "bg-transparent text-foreground",
                      "border-x-2 border-t-2 border-b-4 border-border",
                      "cursor-pointer active:translate-y-0.5 active:border-b-2",
                      "focus:outline-none",
                    ].join(" ")}
                    aria-label="Selected word (click to return)"
                  >
                    {selected}
                  </motion.button>
                )}
              </AnimatePresence>
            </span>

            <span className="text-foreground">&nbsp;{promptRight}</span>
          </div>
        </div>

        {/* Options */}
        <div className="mt-20 grid grid-cols-2 justify-center sm:flex sm:flex-wrap gap-2">
          {options.map((w) => {
            const isPicked = selected === w;
            const disableOthers = !!selected && !isPicked;

            // When picked: leave a GHOST to preserve layout footprint
            if (isPicked) {
              return (
                <div
                  key={`ghost-${w}`}
                  aria-hidden
                  className={[
                    "px-4 py-3 text-[19px] rounded-[12px]",
                    "border-2 border-dashed border-[#2d3c46]/40",
                    "bg-[#37464f] opacity-60",
                  ].join(" ")}
                >
                  <span className="opacity-0 select-none">{w}</span>
                </div>
              );
            }

            // Not picked: render the REAL chip with the SAME layoutId
            return (
              <motion.button
                key={w}
                type="button"
                onClick={() => pick(w)}
                disabled={disableOthers}
                transition={{
                  type: "spring",
                  stiffness: 420,
                  damping: 100,
                  mass: 0.5,
                }}
                className={[
                  "px-4 py-3 text-[19px] rounded-[12px] font-extralight",
                  "border-x-2 border-t-2 border-b-4 transition-all duration-100",
                  "bg-transparent text-foreground border-[#2d3c46] hover:opacity-90",
                  "active:translate-y-0.5 active:border-b-2",
                ].join(" ")}
                aria-disabled={disableOthers}
              >
                {w}
              </motion.button>
            );
          })}
        </div>
      </LayoutGroup>
    </section>
  );
};
