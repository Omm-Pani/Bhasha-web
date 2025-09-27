"use client";

import { Flame } from "lucide-react";
import { useEffect, useState } from "react";
import { getStreak } from "../../lib/streak";

export function StreakBadge() {
  const [streak, setStreak] = useState(0);

  useEffect(() => {
    setStreak(getStreak());
    const onStorage = () => setStreak(getStreak());
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  return (
    <div className="inline-flex items-center gap-1 rounded-full bg-secondary/20 px-2 py-1 text-xs font-semibold">
      <Flame className="size-4 text-secondary" aria-hidden />
      <span>{streak}</span>
      <span className="text-muted-foreground">
        day{streak === 1 ? "" : "s"}
      </span>
    </div>
  );
}
