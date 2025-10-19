// CreateWord.tsx (AudioSentence)
import React, { useEffect, useMemo, useRef, useState } from "react";
import { LayoutGroup, motion } from "framer-motion";
import LessonHeader from "./LessonHeader";
import { Volume2 } from "lucide-react";

type Word = { id: string; text: string };

export type AudioSentenceProps = {
  words: string[] | Word[];
  wordsTranslation: string[] | Word[];
  title?: string;
  audioSrc: string; // audio URL
  defaultPicked?: string[];
  onChange?: (picked: string[]) => void;
  className?: string;
  /** Correct answer (target word after joining pieces) */
  answer: string;
  /** Emits whenever selection changes or answer can be checked */
  onAnswerChange?: (state: {
    canCheck: boolean;
    isCorrect: boolean | null;
  }) => void;
};

export const AudioSentence: React.FC<AudioSentenceProps> = ({
  words,
  wordsTranslation,
  title,
  audioSrc,
  defaultPicked = [],
  onChange,
  className = "",
  answer,
  onAnswerChange,
}) => {
  // Normalize input into stable { id, text } for words
  const normalized: Word[] = useMemo(
    () =>
      (words as (string | Word)[]).map((w, i) =>
        typeof w === "string"
          ? { id: `w-${i}`, text: w }
          : { id: w.id ?? `w-${i}`, text: w.text }
      ),
    [words]
  );

  // Normalize translations to string[] (aligned by index)
  const normalizedTranslations: string[] = useMemo(
    () =>
      (wordsTranslation as (string | Word)[]).map((t) =>
        typeof t === "string" ? t : t.text
      ),
    [wordsTranslation]
  );

  // Maps
  const idToText = useMemo(
    () => Object.fromEntries(normalized.map((w) => [w.id, w.text])),
    [normalized]
  );

  const idToTrans: Record<string, string | undefined> = useMemo(() => {
    const entries = normalized.map<[string, string | undefined]>((w, i) => [
      w.id,
      normalizedTranslations[i],
    ]);
    return Object.fromEntries(entries);
  }, [normalized, normalizedTranslations]);

  // Initial picked: allow ids or texts in defaultPicked
  const [picked, setPicked] = useState<string[]>(
    defaultPicked.map((p) =>
      p in idToText ? p : (normalized.find((w) => w.text === p)?.id ?? p)
    )
  );

  // --- Audio player ---
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (!audioSrc) {
      audioRef.current?.pause();
      audioRef.current = null;
      setIsPlaying(false);
      return;
    }
    const el = new Audio(audioSrc);
    el.preload = "auto";
    const onEnd = () => setIsPlaying(false);
    const onError = () => setIsPlaying(false);
    el.addEventListener("ended", onEnd);
    el.addEventListener("error", onError);
    audioRef.current = el;
    return () => {
      el.removeEventListener("ended", onEnd);
      el.removeEventListener("error", onError);
      el.pause();
    };
  }, [audioSrc]);

  const playAudio = async () => {
    if (!audioRef.current) return;
    try {
      audioRef.current.currentTime = 0;
      setIsPlaying(true);
      await audioRef.current.play();
    } catch {
      setIsPlaying(false);
    }
  };

  // Helpers
  const isPicked = (id: string) => picked.includes(id);

  const add = (id: string) => {
    if (isPicked(id)) return;
    const next = [...picked, id];
    setPicked(next);
    onChange?.(next.map((pid) => idToText[pid]));
  };

  const remove = (id: string) => {
    const next = picked.filter((pid) => pid !== id);
    setPicked(next);
    onChange?.(next.map((pid) => idToText[pid]));
  };

  /** Emit initial onChange (for defaultPicked) once on mount */
  useEffect(() => {
    if (picked.length) onChange?.(picked.map((pid) => idToText[pid]));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /** ------------------ CreateWord comparison helpers ------------------ */
  const fold = (s: string) => s.normalize("NFC").toLowerCase().trim();
  const stripJoiners = (s: string) => fold(s).replace(/[\s_\-’']/g, "");
  const removeDiacritics = (s: string) =>
    s
      .normalize("NFD")
      .replace(/\p{Mn}+/gu, "")
      .normalize("NFC");

  /** Recompute canCheck/isCorrect whenever picked or answer changes (CreateWord) */
  useEffect(() => {
    const canCheck = picked.length > 0;
    if (!onAnswerChange) return;

    if (!canCheck) {
      onAnswerChange({ canCheck, isCorrect: null });
      return;
    }

    // For CreateWord: join tokens with NO spaces
    const currentWord = picked.map((pid) => idToText[pid]).join("");
    const ans = answer || "";

    const strictMatch = stripJoiners(currentWord) === stripJoiners(ans);
    const lenientMatch =
      removeDiacritics(stripJoiners(currentWord)) ===
      removeDiacritics(stripJoiners(ans));

    onAnswerChange({ canCheck, isCorrect: strictMatch || lenientMatch });
  }, [picked, answer, idToText, onAnswerChange]);

  // Two-line label (word + translation)
  const ChipContent: React.FC<{ id: string }> = ({ id }) => (
    <div className="flex flex-col items-center justify-center leading-tight">
      <span className="text-[15px] font-medium text-[#52656d]">
        {idToText[id]}
      </span>
      {idToTrans[id] ? (
        <span className="text-[19px] font-light">{idToTrans[id]}</span>
      ) : null}
    </div>
  );

  return (
    <>
      <LessonHeader heading={title ?? "Tap what you hear"} />

      <section className={`w-full text-foreground ${className}`}>
        <LayoutGroup>
          {/* Audio prompt */}
          <div className="pointer-events-none">
            <div className="flex items-center justify-center mb-3">
              <button
                type="button"
                onClick={playAudio}
                disabled={!audioSrc}
                aria-label={isPlaying ? "Playing audio" : "Play audio"}
                title={audioSrc ? "Play" : "No audio"}
                className="w-[100px] h-[100px] rounded-[25%] border-[#1899d6]
                           border-b-[4px] bg-[rgb(73,192,248)]
                           flex justify-center items-center
                           pointer-events-auto cursor-pointer
                           disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <Volume2
                  size={50}
                  color="black"
                  className={isPlaying ? "animate-pulse" : ""}
                />
              </button>
            </div>
          </div>

          {/* Answer drop area (selected pieces) */}
          <motion.div
            layout="position"
            className="h-16 z-10 w-full border-b-2 border-border
             flex items-center gap-2 px-3 overflow-x-auto overflow-y-hidden
             flex-nowrap whitespace-nowrap transition-none"
          >
            {picked.map((pid) => (
              <motion.button
                key={pid}
                layout="position"
                layoutId={pid}
                transition={{
                  layout: {
                    type: "spring",
                    stiffness: 1000,
                    damping: 38,
                    mass: 0.5,
                  },
                }}
                onClick={() => remove(pid)}
                className="h-14 px-4 inline-flex items-center justify-center shrink-0
                   rounded-[12px] border-x-2 border-t-2 border-b-4 border-border
                   bg-transparent text-foreground
                   text-[19px] leading-tight cursor-pointer"
              >
                <ChipContent id={pid} />
              </motion.button>
            ))}
          </motion.div>

          {/* Pool of selectable pieces */}
          <div className="mt-10">
            <div className="flex flex-wrap gap-3">
              {normalized.map((w) => {
                const pickedNow = isPicked(w.id);
                return (
                  <div key={`slot-${w.id}`} className="relative">
                    {pickedNow ? (
                      // GHOST: same footprint as the real chip (two lines, invisible)
                      <div
                        aria-hidden
                        className="h-14 px-4 inline-flex items-center justify-center shrink-0
                         rounded-[12px] border-2 border-[#2d3c46] opacity-60"
                      >
                        <div className="flex flex-col items-center justify-center leading-tight">
                          <span className="opacity-0 select-none text-[17px] md:text-[19px]">
                            {w.text}
                          </span>
                          {idToTrans[w.id] ? (
                            <span className="opacity-0 select-none text-[11px] md:text-[12px]">
                              {idToTrans[w.id]}
                            </span>
                          ) : null}
                        </div>
                      </div>
                    ) : (
                      <motion.button
                        layout
                        layoutId={w.id}
                        onClick={() => add(w.id)}
                        transition={{
                          type: "spring",
                          stiffness: 600,
                          damping: 50,
                          mass: 0.7,
                        }}
                        className="h-14 px-4 inline-flex items-center justify-center shrink-0
                         rounded-[12px] border-x-2 border-t-2 border-b-4
                         bg-transparent text-foreground border-[#2d3c46]
                         hover:opacity-90 active:translate-y-[2px] active:border-b-2
                         leading-tight cursor-pointer"
                      >
                        <ChipContent id={w.id} />
                      </motion.button>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </LayoutGroup>
      </section>
    </>
  );
};

/* -----------------------------------------------------------
   Example usage

  <AudioSentence
      title="Tap what you hear"
      audioSrc="/audio/water.m4a"
      words={["Nī", "ru", "Ak", "ki", "Ca", "hā", "daya", "viṭṭu"]}
      wordsTranslation={["ನೀ", "ರು", "ಅಕ್", "ಕಿ", "ಚ", "ಹಾ", "ದಯ", "ವಿಟ್ಟು"]}
      answer="Nīru"
      onChange={(arr) => console.log("Pieces:", arr)}
  />
------------------------------------------------------------ */
