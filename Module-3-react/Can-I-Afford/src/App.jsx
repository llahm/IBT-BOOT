import { Route, Routes } from "react-router-dom";
import Layout from "./Components/Layout";
import HomePage from "./pages/HomePage";
import ComparePage from "./pages/ComparePage";
import ResultsPage from "./pages/ResultsPage";
import "./App.css";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="compare" element={<ComparePage />} />
        <Route path="results" element={<ResultsPage />} />
      </Route>
    </Routes>
  );
}

export default App;
