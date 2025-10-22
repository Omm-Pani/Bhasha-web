import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home"; // You'll create this component
import DashBoard from "./pages/Dashboard";
import SelectLanguage from "./pages/SelectLanguage";
// import { useGameStore } from "./store/useGameStore";

import { LessonPage } from "./pages/LessonPage";

function App() {
  // const language = useGameStore((state) => state.language) || "Kannada";

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/select-language" element={<SelectLanguage />}></Route>
      {/* <Route
        path="/lesson"
        element={
          <LessonPage
            language={language}
            lesson={lessonsByLang[language][0]}
            showSignupAfter
          />
        }
      /> */}
      <Route path="/lesson/:buttonId" element={<LessonPage />} />
      <Route path="/learn" element={<DashBoard />} />
    </Routes>
  );
}

export default App;
