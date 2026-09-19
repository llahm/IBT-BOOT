import "./App.css";
import { Routes, Route } from "react-router-dom";

import Layout from "./components/Layout";

import HomePage from "./pages/HomePage";
import ClubsPage from "./pages/ClubsPage";
import ClubDetailsPage from "./pages/ClubDetailsPage";
import EventsPage from "./pages/EventsPage";
import EventDetailsPage from "./pages/EventDetailsPage";
import ResourcesPage from "./pages/ResourcesPage";
import AboutPage from "./pages/AboutPage";
import FavoritesPage from "./pages/FavoritesPage";
import NotFoundPage from "./pages/NotFoundPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="clubs" element={<ClubsPage />} />
        <Route path="clubs/:id" element={<ClubDetailsPage />} />
        <Route path="events" element={<EventsPage />} />
        <Route path="events/:id" element={<EventDetailsPage />} />
        <Route path="resources" element={<ResourcesPage />} />
        <Route path="favorites" element={<FavoritesPage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

export default App;
