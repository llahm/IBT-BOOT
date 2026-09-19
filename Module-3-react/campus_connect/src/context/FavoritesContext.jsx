import { createContext, useContext, useMemo, useState } from "react";
import PropTypes from "prop-types";

const FavoritesContext = createContext(null);

const STORAGE_KEY = "campus-connect-favorites";

function loadInitial() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : { clubs: [], events: [] };
  } catch {
    return { clubs: [], events: [] };
  }
}

// Bonus requirement: Context API for favorite clubs/events. Without
// this, "is club 3 favorited" would have to be threaded as a prop
// through Clubs -> ClubCard -> ... from wherever the favorites array
// lives. Context lets any component (a card deep in a grid, the
// navbar badge, the Favorites page) read and update the same state
// directly with useContext, no prop-drilling required.
export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState(loadInitial);

  // Every mutation goes through this: resolves an updater against the
  // current favorites, writes the result to state, and mirrors it to
  // localStorage so favorites survive a reload too.
  function withPersist(updater) {
    setFavorites((current) => {
      const next = updater(current);
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } catch {
        // ignore storage failures — favorites still work for this session
      }
      return next;
    });
  }

  const value = useMemo(
    () => ({
      favoriteClubIds: favorites.clubs,
      favoriteEventIds: favorites.events,
      isClubFavorite: (id) => favorites.clubs.includes(id),
      isEventFavorite: (id) => favorites.events.includes(id),
      toggleClub: (id) =>
        withPersist((current) => ({
          ...current,
          clubs: current.clubs.includes(id)
            ? current.clubs.filter((clubId) => clubId !== id)
            : [...current.clubs, id],
        })),
      toggleEvent: (id) =>
        withPersist((current) => ({
          ...current,
          events: current.events.includes(id)
            ? current.events.filter((eventId) => eventId !== id)
            : [...current.events, id],
        })),
      count: favorites.clubs.length + favorites.events.length,
    }),
    [favorites]
  );

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
}

FavoritesProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export function useFavorites() {
  const ctx = useContext(FavoritesContext);
  if (!ctx) {
    throw new Error("useFavorites must be used inside a <FavoritesProvider>");
  }
  return ctx;
}
