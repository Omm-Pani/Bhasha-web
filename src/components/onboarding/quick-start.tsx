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
          <CardTitle className="text-3xl">Start a mini lesson</CardTitle>
          <p className="text-md text-muted-foreground">
            Pick a language and answer a few bite-sized questions.
          </p>
        </div>
        <LangIcon className="size-5 text-primary" aria-hidden />
      </CardHeader>
      <CardContent className="">
        {!started ? (
          <>
            <div className="grid grid-cols-3 gap-3">
              {Object.values(Languages).map((l) => (
                <button
                  key={l}
                  onClick={() => setLang(l)}
                  className={`rounded-xl border p-3 text-md font-medium transition-colors ${l === lang ? "bg-primary text-primary-foreground" : "hover:bg-muted"}`}
                  aria-label={`Choose ${l}`}
                >
                  {l}
                </button>
              ))}
            </div>
            <Button
              variant="secondary"
              className="w-full h-12 text-lg mt-3"
              onClick={start}
            >
              Start Learning <ChevronRight className="ml-2 size-5" />
            </Button>
            <p className="mt-3 text-center text-xs text-muted-foreground">
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
