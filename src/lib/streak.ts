import { getLocal, setLocal } from "./storage"

type StreakData = {
  streak: number
  last: string // ISO date yyyy-mm-dd
}

const KEY = "bhasha.streak"

const todayISO = () => new Date().toISOString().slice(0, 10)
const yesterdayISO = () => {
  const d = new Date()
  d.setDate(d.getDate() - 1)
  return d.toISOString().slice(0, 10)
}

export function getStreak() {
  const data = getLocal<StreakData>(KEY, { streak: 0, last: "" })
  return data.streak
}

export function recordLessonCompletion(_lessonId: string) {
  const data = getLocal<StreakData>(KEY, { streak: 0, last: "" })
  const t = todayISO()
  const y = yesterdayISO()

  if (data.last === t) {
    // already counted today; no change
    return setLocal(KEY, { ...data, last: t })
  }

  const nextStreak = data.last === y ? (data.streak || 0) + 1 : 1
  setLocal(KEY, { streak: nextStreak, last: t })
}
