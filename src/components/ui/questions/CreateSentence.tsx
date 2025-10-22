// CreateSentence.tsx
import React, { useEffect, useMemo, useRef, useState } from "react";
import { LayoutGroup, motion } from "framer-motion";
import { Volume2 } from "lucide-react";
import ChatBubbleTail from "../ChatBubbleTail";
import LessonHeader from "./LessonHeader";

type Word = { id: string; text: string };

export type CreateSentenceProps = {
  words: string[] | Word[];
  title?: string;
  question: string;
  translation: string;
  /** New: URL to the audio file to play when the speaker is clicked */
  audioSrc?: string;
  defaultPicked?: string[];
  onChange?: (picked: string[]) => void;
  className?: string;
  answer: string;
  onAnswerChange?: (state: {
    canCheck: boolean;
    isCorrect: boolean | null;
  }) => void;
};

export const CreateSentence: React.FC<CreateSentenceProps> = ({
  words,
  title = "Write this in English",
  question,
  translation,
  audioSrc,
  defaultPicked = [],
  onChange,
  className = "",
  answer,
  onAnswerChange,
}) => {
  // Normalize input into stable {id, text}
  const normalized: Word[] = useMemo(
    () =>
      (words as Word[]).map((w, i) =>
        typeof (w as any) === "string"
          ? { id: `w-${i}`, text: String(w) }
          : { id: (w as Word).id ?? `w-${i}`, text: (w as Word).text }
      ),
    [words]
  );

  const idToText = useMemo(
    () => Object.fromEntries(normalized.map((w) => [w.id, w.text])),
    [normalized]
  );

  const [picked, setPicked] = useState<string[]>(
    defaultPicked.map((p) =>
      p in idToText ? p : (normalized.find((w) => w.text === p)?.id ?? p)
    )
  );

  // --- Audio player (simple, resilient) ---
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  // Recreate audio element when src changes
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
      // Restart from beginning each click
      audioRef.current.currentTime = 0;
      setIsPlaying(true);
      await audioRef.current.play();
    } catch {
      setIsPlaying(false);
      // (silently fail—autoplay policies or loading issues)
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

  /** Normalize text for comparison (trim spaces, collapse multiple spaces, case-insensitive) */
  const normalizeSentence = (s: string) =>
    s.replace(/\s+/g, " ").trim().toLowerCase();

  /** Emit initial onChange (for defaultPicked) once on mount */
  useEffect(() => {
    if (picked.length) onChange?.(picked.map((pid) => idToText[pid]));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /** Recompute canCheck/isCorrect whenever picked or answer changes */
  useEffect(() => {
    const canCheck = picked.length > 0;
    if (!onAnswerChange) return;

    if (!canCheck) {
      onAnswerChange({ canCheck, isCorrect: null });
      return;
    }

    const current = picked.map((pid) => idToText[pid]).join(" ");
    const isCorrect =
      normalizeSentence(current) === normalizeSentence(answer || "");

    onAnswerChange({ canCheck, isCorrect });
  }, [picked, answer, idToText, onAnswerChange]);

  return (
    <>
      <LessonHeader heading={title ?? "Write this in English"} />

      <section className={`w-full text-foreground ${className}`}>
        <LayoutGroup>
          {/* NOTE: this wrapper had pointer-events-none which blocks the button below.
              Keep the wrapper as-is, but explicitly re-enable the button with pointer-events-auto. */}
          <div className="leading-[39px] pt-2 pl-[10px] [@media_(min-width:700px)]:mt-[-48px] pointer-events-none">
            <div className="flex items-center ">
              <div className="self-end flex scale-150 aspect-[118/175] shrink-0 leading-none max-w-[118px] w-[177px]">
                <video autoPlay loop src="/assets/characters/woman.webm" />
              </div>
              <div className="items-end inline-flex my-3 ml-4 relative">
                <div className="flex items-center border-2 border-border rounded-[12px] py-[10px] px-[14px]">
                  <button
                    type="button"
                    onClick={playAudio}
                    disabled={!audioSrc}
                    aria-label={isPlaying ? "Playing audio" : "Play audio"}
                    title={audioSrc ? "Play" : "No audio"}
                    className={`me-2 pointer-events-auto cursor-pointer inline-flex items-center justify-center disabled:opacity-40 disabled:cursor-not-allowed`}
                  >
                    <Volume2
                      size={32}
                      color="#49c0f8"
                      className={isPlaying ? "animate-pulse" : ""}
                    />
                  </button>
                  <div className="flex flex-col pl-2 leading-7 pointer-events-auto">
                    <span className="font-extralight text-[18px] text-[#52656d]">
                      {question}
                    </span>
                    <span className="font-light pl-1">{translation}</span>
                  </div>
                </div>
                <ChatBubbleTail
                  className="text-border pointer-events-none"
                  alignmentY={40}
                />
              </div>
            </div>
          </div>

          {/* Sentence drop area */}
          <motion.div
            layout="position"
            className="h-16 z-10 w-full border-t-2 border-b-2 border-border
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
                className="h-10 px-4 py-6 inline-flex items-center shrink-0
                   rounded-[12px] border-x-2 border-t-2 border-b-4 border-border
                   text-[19px] leading-none cursor-pointer"
              >
                {idToText[pid]}
              </motion.button>
            ))}
          </motion.div>

          {/* Pool of selectable words */}
          <div className="mt-10">
            <div className="flex flex-wrap gap-3">
              {normalized.map((w) => {
                const pickedNow = isPicked(w.id);
                return (
                  <div key={`slot-${w.id}`} className="relative">
                    {pickedNow ? (
                      <div
                        aria-hidden
                        className="h-10 px-4 py-6 inline-flex items-center shrink-0
                         rounded-[12px] border-2 border-[#2d3c46] text-[19px] opacity-60"
                      >
                        <span className="opacity-0 select-none text-[19px] leading-none">
                          {w.text}
                        </span>
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
                        className="h-10 px-4 py-6 inline-flex items-center shrink-0
                         rounded-[12px] border-x-2 border-t-2 border-b-4
                         bg-transparent text-foreground border-[#2d3c46]
                         hover:opacity-90 active:translate-y-[2px] active:border-b-2
                         text-[19px] leading-none cursor-pointer"
                      >
                        {w.text}
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

   <CreateSentence
     words={["You", "are", "a", "cat", "girl", "boy", "woman", "I"]}
     question="Nimma hesaru enu?"
     translation="What is your name?"
     audioSrc="/audio/lesson1/q1.mp3"
     answer="What is your name?"
     onChange={(arr) => console.log("Sentence:", arr.join(" "))}
   />
------------------------------------------------------------ */
