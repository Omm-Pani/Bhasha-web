"use client";

import { useState } from "react";
import { LessonRunner } from "../../components/lesson/lesson-runner";
import { Languages, lessonsByLang } from "../../components/lesson/lesson-data";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { ChevronRight, LaughIcon as LangIcon } from "lucide-react";

export function QuickStart({
  defaultLanguage,
}: {
  defaultLanguage: Languages;
}) {
  const [lang, setLang] = useState<Languages>(defaultLanguage);
  const [started, setStarted] = useState(false);

  const start = () => setStarted(true);

  return (
    <Card className="rounded-2xl">
      <CardHeader className="flex items-start justify-between gap-2">
        <div>
          <CardTitle className="text-xl">Start a mini lesson</CardTitle>
          <p className="text-sm text-muted-foreground">
            Pick a language and answer a few bite-sized questions.
          </p>
        </div>
        <LangIcon className="size-5 text-primary" aria-hidden />
      </CardHeader>
      <CardContent className="space-y-3">
        {!started ? (
          <>
            <div className="grid grid-cols-3 gap-2">
              {Object.values(Languages).map((l) => (
                <button
                  key={l}
                  onClick={() => setLang(l)}
                  className={`rounded-xl border p-3 text-sm font-medium transition-colors ${l === lang ? "bg-primary text-primary-foreground" : "hover:bg-muted"}`}
                  aria-label={`Choose ${l}`}
                >
                  {l}
                </button>
              ))}
            </div>
            <Button className="w-full" onClick={start}>
              Start learning <ChevronRight className="ml-1 size-4" />
            </Button>
            <p className="text-center text-xs text-muted-foreground">
              You can create an account after finishing this lesson to save
              progress.
            </p>
          </>
        ) : (
          <LessonRunner
            language={lang}
            lesson={lessonsByLang[lang][0]}
            showSignupAfter
          />
        )}
      </CardContent>
    </Card>
  );
}
