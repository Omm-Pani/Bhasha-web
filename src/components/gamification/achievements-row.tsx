import { Trophy, Medal, Star } from "lucide-react"

export function AchievementsRow() {
  const Item = ({
    icon: Icon,
    label,
  }: {
    icon: any
    label: string
  }) => (
    <div className="flex items-center gap-2 rounded-xl border bg-card px-3 py-2 text-xs">
      <Icon className="size-4 text-accent" aria-hidden />
      <span className="font-semibold">{label}</span>
    </div>
  )

  return (
    <div className="flex flex-wrap gap-2 pt-2">
      <Item icon={Trophy} label="Daily streak" />
      <Item icon={Medal} label="First lesson" />
      <Item icon={Star} label="Accuracy 100%" />
    </div>
  )
}
