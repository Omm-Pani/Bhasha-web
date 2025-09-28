import { QuickStart } from "../components/onboarding/quick-start";
import { StreakBadge } from "../components/gamification/streak-badge";
import { AchievementsRow } from "../components/gamification/achievements-row";
import { Button } from "../components/ui/button";
import { Languages } from "../components/lesson/lesson-data";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../components/theme-provider"; // Import useTheme
import { Moon, Sun } from "lucide-react"; // Import icons

export default function Home() {
  const navigate = useNavigate();
  const { theme, setTheme } = useTheme(); // Use the theme hook

  return (
    <main className="flex min-h-[100svh] flex-col">
      <header className="sticky top-0 z-10 border-b bg-background/85 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
          <div className="flex items-center gap-2">
            <div className="h-7 w-7 rounded-lg bg-primary" aria-hidden />
            <span className="font-bold text-2xl text-primary tracking-wide">
              BHASHA
            </span>
          </div>
          <div className="flex items-center gap-3">
            <StreakBadge />
            {/* Theme Toggle Button */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            >
              <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle theme</span>
            </Button>
            <Button variant="secondary">Log in</Button>
            <Button>Sign up</Button>
          </div>
        </div>
      </header>

      <section className="mx-auto my-10 md:my-20 lg:my-40 grid w-full max-w-5xl gap-6 px-4 md:grid-cols-2 md:items-center">
        <div className="space-y-4">
          <h1 className="text-balance text-3xl font-extrabold md:text-5xl">
            Learn Kannada, Marathi, and Odia the fun way.
          </h1>
          <p className="text-muted-foreground">
            Jump right in. No account required. Finish a quick lesson, then
            decide if you want to save your progress.
          </p>
          <div className="flex gap-2">
            <Button
              className="w-full text-lg p-6 font-semibold tracking-wide leading-28"
              onClick={() => navigate("/learn/lang")}
            >
              GET STARTED
            </Button>
          </div>
          <AchievementsRow />
        </div>

        <div className="">
          <QuickStart defaultLanguage={Languages.Kannada} />
        </div>
      </section>
    </main>
  );
}
