import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home"; // You'll create this component
import LearnPage from "./pages/LearnPage"; // You'll create this component

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/learn/:lang" element={<LearnPage />} />
    </Routes>
  );
}

export default App;
