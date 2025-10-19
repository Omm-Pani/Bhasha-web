import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { ChevronRight, LaughIcon as LangIcon } from "lucide-react";
import { Languages } from "../components/lesson/lesson-data";
import { Button } from "../components/ui/button";

import { useNavigate } from "react-router-dom";
import { useGameStore } from "../store/useGameStore";

export default function SelectLanguage() {
  const { language, setLanguage } = useGameStore();
  const navigate = useNavigate();

  return (
    <div>
      <main className="mx-auto my-20 max-w-4xl px-4 py-8">
        <Card className="rounded-2xl">
          <CardHeader className="flex items-start justify-between gap-2">
            <div>
              <CardTitle className="text-3xl">
                What you want to learn.
              </CardTitle>
              <p className="text-md text-muted-foreground">
                Select a language and have a fun learning.
              </p>
            </div>
            <LangIcon className="size-5 text-primary" aria-hidden />
          </CardHeader>
          <CardContent className="">
            <>
              <div className="grid grid-cols-3 gap-3">
                {Object.values(Languages).map((l) => (
                  <button
                    key={l}
                    onClick={() => setLanguage(l)}
                    className={`rounded-xl border p-3 text-md font-medium transition-colors ${l === language ? "bg-primary text-primary-foreground" : "hover:bg-muted"}`}
                    aria-label={`Choose ${l}`}
                  >
                    {l}
                  </button>
                ))}
              </div>
              <Button
                variant="secondary"
                className="w-full h-12 text-lg mt-3"
                onClick={() => navigate("/learn")}
              >
                Start Learning <ChevronRight className="ml-2 size-5" />
              </Button>
            </>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
