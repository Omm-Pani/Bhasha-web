// src/curriculum/buttonsById.ts
export type ButtonDef = { id: string; lessonIds: string[] };

export const buttonsById: Record<string, ButtonDef> = {
  S1U1B1: {
    id: "S1U1B1",
    lessonIds: ["S1U1B1L1", "S1U1B1L2", "S1U1B1L3", "S1U1B1L4"],
  },
  S1U1B2: {
    id: "S1U1B2",
    lessonIds: ["S1U1B2L1", "S1U1B2L2", "S1U1B2L3", "S1U1B2L4"],
  },
  S1U1B3: {
    id: "S1U1B3",
    lessonIds: ["S1U1B3L1", "S1U1B3L2", "S1U1B3L3", "S1U1B3L4"],
  },
  S1U1B4: {
    id: "S1U1B4",
    lessonIds: ["S1U1B4L1", "S1U1B4L2", "S1U1B4L3", "S1U1B4L4"],
  },
  S1U1B5: {
    id: "S1U1B5",
    lessonIds: ["S1U1B5L1", "S1U1B5L2", "S1U1B5L3", "S1U1B5L4"],
  },
  S1U1B6: {
    id: "S1U1B6",
    lessonIds: ["S1U1B6L1", "S1U1B6L2", "S1U1B6L3", "S1U162L4"],
  },
};
