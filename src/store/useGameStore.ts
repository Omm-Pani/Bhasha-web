import { create } from "zustand";
import type { Languages } from "../components/lesson/types";

type State = {
  xp: number;
  streak: number; // client-side seed; server will own later
  lastActiveISO?: string; // to seed streak visuals
  language?: Languages;
};

type Actions = {
  addXP: (n: number) => void;
  seedStreakToday: () => void;
  setLanguage: (language: Languages) => void;
};

export const useGameStore = create<State & Actions>((set) => ({
  xp: 0,
  streak: 0,
  lastActiveISO: undefined,
  language: undefined,
  addXP: (n) => set((s) => ({ xp: s.xp + n })),
  seedStreakToday: () =>
    set(() => ({ streak: 1, lastActiveISO: new Date().toISOString() })),
  setLanguage: (lang) => set({ language: lang }),
}));
