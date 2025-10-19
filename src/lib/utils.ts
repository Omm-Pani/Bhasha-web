import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import type { Lesson } from "../components/lesson/types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const makeLesson = (
  id: string,
  title: string,
  qa: Array<[string, string[], string]>,
  xp = 10
): Lesson => ({
  id,
  title,
  xp,
  questions: qa.map(([prompt, options, answer], i) => ({
    id: `${id}-q${i + 1}`,
    status: "normal",
    type: "multiple",
    prompt,
    options,
    answer,
  })),
});
