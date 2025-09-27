import { create } from "zustand";

type State = {
  xp: number;
  streak: number; // client-side seed; server will own later
  lastActiveISO?: string; // to seed streak visuals
};

type Actions = {
  addXP: (n: number) => void;
  seedStreakToday: () => void;
};

export const useGameStore = create<State & Actions>((set) => ({
  xp: 0,
  streak: 0,
  lastActiveISO: undefined,
  addXP: (n) => set((s) => ({ xp: s.xp + n })),
  seedStreakToday: () =>
    set(() => ({ streak: 1, lastActiveISO: new Date().toISOString() })),
}));
