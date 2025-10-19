// components/AudioBubble.tsx
import React from "react";

type AudioBubbleProps = {
  text: string;
  onClick?: () => void;
  playing?: boolean;
  className?: string;
  /** If you want to hide the dotted underline */
  underline?: boolean;
};

export const AudioBubble: React.FC<AudioBubbleProps> = ({
  text,
  onClick,
  playing = false,
  className = "",
  underline = true,
}) => {
  const clickable = typeof onClick === "function";

  return (
    <div
      role={clickable ? "button" : undefined}
      aria-pressed={clickable ? playing : undefined}
      onClick={onClick}
      className={[
        // layout
        "relative inline-flex items-center gap-3 px-4 py-2",
        // bubble shape + tail
        "rounded-2xl border",
        "bg-[#1d282c] border-[#2c3b41] shadow-sm",
        // focus/hover
        clickable
          ? "cursor-pointer hover:bg-[#223037] hover:border-[#3a4c53] focus:outline-none focus:ring-2 focus:ring-sky-500/50"
          : "",
        // bubble tail (left)
        "before:absolute before:-left-2 before:top-4 before:h-3 before:w-3 before:rounded-sm",
        "before:rotate-45 before:bg-[#1d282c] before:border before:border-[#2c3b41]",
        className,
      ].join(" ")}
    >
      {/* Speaker icon */}
      <SpeakerIcon
        className={[
          "h-6 w-6 shrink-0",
          playing ? "animate-pulse" : "",
          // duotone-ish look to match screenshot
          "text-sky-400/90",
        ].join(" ")}
      />

      {/* Text with dotted underline */}
      <span
        className={[
          "text-[18px] leading-none text-slate-100",
          underline
            ? "underline decoration-dotted underline-offset-[6px] decoration-slate-400/70"
            : "",
        ].join(" ")}
      >
        {text}
      </span>
    </div>
  );
};

/** Simple inline SVG so you don't need extra icon deps */
const SpeakerIcon: React.FC<{ className?: string }> = ({ className = "" }) => (
  <svg
    viewBox="0 0 24 24"
    aria-hidden="true"
    className={className}
    fill="none"
    stroke="currentColor"
    strokeWidth={1.8}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M4 10v4a1 1 0 0 0 1 1h2.2l3.7 2.6a1 1 0 0 0 1.6-.8V7.2a1 1 0 0 0-1.6-.8L7.2 9H5a1 1 0 0 0-1 1z" />
    {/* sound waves */}
    <path d="M16.5 8.5c.9.9.9 2.1 0 3" />
    <path d="M18.7 6.3c2 2 2 5.4 0 7.4" />
  </svg>
);
