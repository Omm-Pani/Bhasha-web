export const getLocal = <T,>(key: string, fallback: T): T => {
  if (typeof window === "undefined") return fallback
  try {
    const raw = localStorage.getItem(key)
    return raw ? (JSON.parse(raw) as T) : fallback
  } catch {
    return fallback
  }
}

export const setLocal = (key: string, value: any) => {
  if (typeof window === "undefined") return
  localStorage.setItem(key, JSON.stringify(value))
  // notify other tabs
  window.dispatchEvent(new StorageEvent("storage", { key }))
}
