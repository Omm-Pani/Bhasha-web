import { useParams } from "react-router-dom";
import { QuickStart } from "../components/onboarding/quick-start";
import { Languages } from "../components/lesson/lesson-data";

export default function LearnPage() {
  const { lang } = useParams<{ lang: string }>();
  const decodedLang = decodeURIComponent(lang || "").toLowerCase();
  const map: Record<string, Languages> = {
    kannada: Languages.Kannada,
    marathi: Languages.Marathi,
    odia: Languages.Odia,
  };
  return (
    <main className="mx-auto max-w-4xl px-4 py-8">
      <QuickStart defaultLanguage={map[decodedLang] ?? Languages.Kannada} />
    </main>
  );
}
