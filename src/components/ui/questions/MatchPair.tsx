import React, { useEffect, useMemo, useState } from "react";

/** A single pair definition */
export type Pair = {
  /** Unique key for the pair (used to validate matches) */
  key: string;
  /** Left side card label (e.g., "sushi") */
  left: string;
  /** Right side primary label (e.g., "すし") */
  right: string;
  /** Optional small hint above the right label (e.g., romaji) */
  rightHint?: string;
};

export type MatchPairsProps = {
  /** Pairs to render; right column will be auto-shuffled by default */
  pairs: Pair[];
  /** Section title */
  title?: string;
  /**
   * Provide a deterministic seed to shuffle the right column in a stable way
   * across renders. If omitted, a random shuffle is used once per mount.
   */
  shuffleSeed?: number;
  /** Called when all pairs are matched */
  onComplete?: (totalMoves: number) => void;
  /** Optional className for outer wrapper */
  onAnswerChange?: (state: {
    canCheck: boolean;
    isCorrect: boolean | null;
  }) => void;

  className?: string;
  /** If true, disables shuffling of the right column */
  noShuffle?: boolean;
};

type Selected =
  | { side: "left"; key: string }
  | { side: "right"; key: string }
  | null;

/* ---------- utilities ---------- */

function seededShuffle<T>(arr: T[], seed: number) {
  // xorshift32
  let x = seed || 1;
  const rnd = () => {
    x ^= x << 13;
    x ^= x >>> 17;
    x ^= x << 5;
    return (x >>> 0) / 0xffffffff;
  };
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(rnd() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function cx(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}

/* ---------- component ---------- */

export const MatchPairs: React.FC<MatchPairsProps> = ({
  pairs,
  title = "Select the matching pairs",
  shuffleSeed,
  onComplete,
  onAnswerChange,
  className = "",
  noShuffle = false,
}) => {
  // left side is fixed in the order provided
  const left = pairs.map((p) => ({ key: p.key, label: p.left }));

  // right side can optionally be shuffled
  const right = useMemo(() => {
    const items = pairs.map((p) => ({
      key: p.key,
      label: p.right,
      hint: p.rightHint,
    }));
    if (noShuffle) return items;
    if (typeof shuffleSeed === "number")
      return seededShuffle(items, shuffleSeed || 1);
    // non-deterministic once-per-mount shuffle
    return seededShuffle(items, Math.floor(Math.random() * 1_000_000) + 1);
  }, [pairs, shuffleSeed, noShuffle]);

  // state
  const [hadMistake, setHadMistake] = useState(false);
  const [selected, setSelected] = useState<Selected>(null);
  const [locked, setLocked] = useState<Record<string, boolean>>({});
  const [wrongFlash, setWrongFlash] = useState(false);
  const [moves, setMoves] = useState(0);

  const allLocked = Object.keys(locked).length === pairs.length;

  useEffect(() => {
    if (!allLocked) {
      onAnswerChange?.({ canCheck: false, isCorrect: null });
    } else {
      onAnswerChange?.({
        canCheck: true,
        isCorrect: hadMistake ? false : true,
      });
    }
  }, [allLocked, hadMistake, onAnswerChange]);

  const handlePick = (side: "left" | "right", key: string) => {
    if (locked[key]) return; // ignore clicks on already matched tiles

    if (!selected) {
      setSelected({ side, key });
      return;
    }

    // If picking the same side twice, simply switch selection
    if (selected.side === side) {
      setSelected({ side, key });
      return;
    }

    // Different sides: evaluate a move
    setMoves((m) => m + 1);

    // Correct match?
    if (selected.key === key) {
      setLocked((prev) => {
        const next = { ...prev, [key]: true };
        // clear selection and possibly notify
        setSelected(null);
        // if all locked, fire onComplete
        if (Object.keys(next).length === pairs.length) {
          onComplete?.(moves + 1);
        }
        return next;
      });
    } else {
      setHadMistake(true);
      // wrong: brief shake/flash
      setWrongFlash(true);
      const prev = selected; // keep to show both as "selected" briefly
      setSelected({ side, key });
      // revert highlight after a moment
      window.setTimeout(() => {
        setWrongFlash(false);
        setSelected(null);
      }, 450);
      // keep both highlighted for the flash duration by ignoring state tweak
      // beyond setting wrongFlash true.
      setSelected(prev); // keep previous shown; quick visual
    }
  };

  // numbering like the screenshot: left 1..N, right 6..(6+N-1) but wrap 10=>0
  const numberBadge = (index: number, start: number) => {
    const v = start + index;
    const d = v % 10; // wrap so 10 -> 0
    return d;
  };

  const Card: React.FC<{
    number: number;
    label: string;
    hint?: string;
    active?: boolean;
    matched?: boolean;
    onClick?: () => void;
  }> = ({ number, label, hint, active, matched, onClick }) => {
    return (
      <button
        type="button"
        onClick={onClick}
        className={cx(
          "w-full cursor-pointer rounded-2xl border-2 px-4 py-3 outline-none transition",
          "bg-transparent border-[#2b3a41] text-white/95",
          active && "ring-2 ring-white/30 border-white/30",
          matched &&
            "border-emerald-500/40 ring-emerald-500/30 bg-emerald-500/10"
        )}
        aria-pressed={active}
      >
        <div className="flex items-center gap-4">
          <div
            className={cx(
              "grid h-10 w-10 place-items-center rounded-xl border text-sm font-semibold",
              "border-white/20 text-white/80",
              matched && "border-emerald-500/50 text-emerald-300"
            )}
          >
            {number}
          </div>
          <div className="min-w-0 flex-1 text-center pr-8">
            {hint && (
              <div className="text-xs tracking-wide text-white/50 leading-none mb-1">
                {hint}
              </div>
            )}
            <div className="text-xl leading-tight">{label}</div>
          </div>
        </div>
      </button>
    );
  };

  return (
    <section
      className={cx(
        "w-full rounded-3xl  text-white",
        wrongFlash && "animate-[shake_0.45s_ease]",
        className
      )}
    >
      <style>
        {`
        @keyframes shake {
          10%, 90% { transform: translateX(-1px); }
          20%, 80% { transform: translateX(2px); }
          30%, 50%, 70% { transform: translateX(-4px); }
          40%, 60% { transform: translateX(4px); }
        }
        `}
      </style>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Left column */}
        <div className="flex flex-col gap-4">
          {left.map((item, i) => {
            const isSelected =
              selected?.side === "left" && selected.key === item.key;
            const isLocked = !!locked[item.key];
            return (
              <Card
                key={item.key}
                number={numberBadge(i, 1)}
                label={item.label}
                active={isSelected}
                matched={isLocked}
                onClick={() => handlePick("left", item.key)}
              />
            );
          })}
        </div>

        {/* Right column */}
        <div className="flex flex-col gap-4">
          {right.map((item, i) => {
            const isSelected =
              selected?.side === "right" && selected.key === item.key;
            const isLocked = !!locked[item.key];
            return (
              <Card
                key={item.key}
                number={numberBadge(i, 6)}
                label={item.label}
                hint={item.hint}
                active={isSelected}
                matched={isLocked}
                onClick={() => handlePick("right", item.key)}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
};
