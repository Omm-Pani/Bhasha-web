"use client";

import { useEffect, useMemo, useState } from "react";
import type { Lesson, ChoiceQuestion, Languages } from "./lesson-data";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import { Progress } from "../../components/ui/progress";
import { CheckCircle2, XCircle, Award, Sparkles } from "lucide-react";
import { recordLessonCompletion } from "../../lib/streak";
import { SaveProgressCTA } from "../../components/signup-cta";

export function LessonRunner({
  lesson,
  language,
  showSignupAfter = false,
}: {
  lesson: Lesson;
  language: Languages;
  showSignupAfter?: boolean;
}) {
  const [step, setStep] = useState(0);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);
  const [selected, setSelected] = useState<string | null>(null);
  const [showCTA, setShowCTA] = useState(false);

  const q = useMemo(
    () => lesson.questions[step] as ChoiceQuestion | undefined,
    [lesson, step]
  );
  const pct = Math.round((step / lesson.questions.length) * 100);

  useEffect(() => {
    if (done && showSignupAfter) {
      const t = setTimeout(() => setShowCTA(true), 600);
      return () => clearTimeout(t);
    }
  }, [done, showSignupAfter]);

  const choose = (opt: string) => setSelected(opt);

  const next = () => {
    if (!q) return;
    const correct = selected === q.answer;
    if (correct) setScore((s) => s + 1);
    setSelected(null);
    const nextStep = step + 1;
    if (nextStep >= lesson.questions.length) {
      setDone(true);
      recordLessonCompletion(lesson.id); // updates streak in localStorage
    } else {
      setStep(nextStep);
    }
  };

  if (done) {
    const xp = score * Math.ceil(lesson.xp / lesson.questions.length);
    return (
      <Card className="rounded-2xl border-2 border-primary">
        <CardContent className="space-y-3 p-4 text-center">
          <div className="mx-auto flex w-full max-w-sm flex-col items-center gap-2">
            <Award className="size-8 text-primary" aria-hidden />
            <h3 className="text-xl font-bold">Great job!</h3>
            <p className="text-sm text-muted-foreground">
              You finished {lesson.title} in {language}. Score {score}/
              {lesson.questions.length} — +{xp} XP
            </p>
            <div
              className="rounded-lg bg-success/15 px-3 py-2 text-sm text-foreground"
              style={{ ["--success" as any]: "var(--brand-success)" }}
            >
              Streak updated! Keep coming back daily to grow it.
            </div>
            <div className="flex gap-2 pt-1">
              <Button variant="secondary" onClick={() => location.reload()}>
                Try again
              </Button>
              <Button onClick={() => setShowCTA(true)}>
                Continue <Sparkles className="ml-1 size-4" />
              </Button>
            </div>
          </div>
          {showCTA && <SaveProgressCTA />}
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-3">
        <Progress value={pct} className="h-2" />
        <span className="text-xs text-muted-foreground">{pct}%</span>
      </div>

      <Card className="rounded-2xl">
        <CardContent className="space-y-4 p-4">
          <div className="text-base font-semibold">{q?.prompt}</div>
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            {q?.options.map((opt) => {
              const chosen = selected === opt;
              const correct = chosen && opt === q.answer;
              const wrong = chosen && opt !== q.answer;
              return (
                <button
                  key={opt}
                  onClick={() => choose(opt)}
                  className={`flex items-center justify-between rounded-xl border p-3 text-left transition-colors ${
                    chosen
                      ? "bg-primary text-primary-foreground"
                      : "hover:bg-muted"
                  }`}
                >
                  <span>{opt}</span>
                  {correct && <CheckCircle2 className="size-4" />}
                  {wrong && <XCircle className="size-4" />}
                </button>
              );
            })}
          </div>
          <div className="flex justify-end">
            <Button onClick={next} disabled={!selected}>
              Continue
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
