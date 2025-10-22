import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Languages } from "../components/lesson/types";

// Progress shape per button
type ButtonProgress = {
  completedLessonIds: string[]; // store lesson IDs done for this button
};

type State = {
  xp: number;
  streak: number;
  lastActiveISO?: string;
  language?: Languages;

  // LEGACY global counter if you still show it somewhere
  lessonsCompleted: number;

  // NEW: persisted per-button progress
  buttonProgress: Record<string, ButtonProgress>;

  // (Optional) track which button user is currently in
  currentButtonId?: string;
};

type Actions = {
  addXP: (n: number) => void;
  seedStreakToday: () => void;
  setLanguage: (language: Languages) => void;

  // legacy
  completeLesson: () => void;

  // NEW
  startButton: (buttonId: string) => void;
  markLessonComplete: (buttonId: string, lessonId: string) => void;
  resetButton: (buttonId: string) => void;
};

export const useGameStore = create<State & Actions>()(
  persist(
    (set) => ({
      xp: 0,
      streak: 0,
      lastActiveISO: undefined,
      language: undefined,

      // keep legacy for now
      lessonsCompleted: 0,
      completeLesson: () =>
        set((s) => ({ lessonsCompleted: s.lessonsCompleted + 1 })),

      // NEW
      buttonProgress: {},
      currentButtonId: undefined,

      addXP: (n) => set((s) => ({ xp: s.xp + n })),
      seedStreakToday: () =>
        set(() => ({ streak: 1, lastActiveISO: new Date().toISOString() })),
      setLanguage: (lang) => set({ language: lang }),

      startButton: (buttonId) => set({ currentButtonId: buttonId }),

      markLessonComplete: (buttonId, lessonId) =>
        set((s) => {
          const prev = s.buttonProgress[buttonId]?.completedLessonIds ?? [];
          if (prev.includes(lessonId)) return {}; // idempotent
          return {
            buttonProgress: {
              ...s.buttonProgress,
              [buttonId]: {
                completedLessonIds: [...prev, lessonId],
              },
            },
          };
        }),

      resetButton: (buttonId) =>
        set((s) => ({
          buttonProgress: {
            ...s.buttonProgress,
            [buttonId]: { completedLessonIds: [] },
          },
        })),
    }),
    {
      name: "bhasa-progress-v1",
      version: 1,
    }
  )
);

// SELECTORS you’ll use in Dashboard
export const selectButtonProgressPct =
  (buttonId: string, totalLessons: number) => (state: State) => {
    const done = state.buttonProgress[buttonId]?.completedLessonIds.length ?? 0;
    return Math.min(100, Math.round((done / Math.max(1, totalLessons)) * 100));
  };

export const selectButtonCompleted =
  (buttonId: string, totalLessons: number) => (state: State) => {
    const done = state.buttonProgress[buttonId]?.completedLessonIds.length ?? 0;
    return done >= totalLessons;
  };

// Given an ordered list like ["S1U1B1","S1U1B2",...], find the first incomplete
export const selectFirstIncompleteButtonId =
  (orderedButtonIds: string[], totals: Record<string, number>) =>
  (state: State) => {
    for (const id of orderedButtonIds) {
      const done = state.buttonProgress[id]?.completedLessonIds.length ?? 0;
      if (done < (totals[id] ?? 0)) return id;
    }
    return undefined; // all complete
  };

// Convenience: build progress + completed maps in one selector (for perf)
export const selectProgressSummary =
  (orderedButtonIds: string[], totals: Record<string, number>) =>
  (state: State) => {
    const progressMap: Record<string, number> = {};
    const completedMap: Record<string, boolean> = {};
    for (const id of orderedButtonIds) {
      const total = Math.max(1, totals[id] ?? 1);
      const done = state.buttonProgress[id]?.completedLessonIds.length ?? 0;
      progressMap[id] = Math.min(100, Math.round((done / total) * 100));
      completedMap[id] = done >= total;
    }
    return { progressMap, completedMap };
  };
