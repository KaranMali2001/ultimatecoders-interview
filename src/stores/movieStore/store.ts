import { create } from "zustand";
import { persist } from "zustand/middleware";
import { MovieStore } from "./storeTypes";

export const useMovieStore = create<MovieStore>()(
  persist(
    (set) => ({
      // Search state
      searchTerm: "",
      setSearchTerm: (term) => set({ searchTerm: term }),

      // Filter state
      filters: {
        genre: "all",
        year: "all",
        rating: "all",
      },
      setFilter: (key, value) =>
        set((state) => ({
          filters: { ...state.filters, [key]: value },
        })),
      resetFilters: () =>
        set({
          filters: { genre: "all", year: "all", rating: "all" },
        }),

      // Layout state
      layout: "grid",
      setLayout: (layout) => set({ layout }),

      // Selected movie state
      selectedMovie: null,
      isDetailOpen: false,
      selectMovie: (movie) =>
        set({
          selectedMovie: movie,
          isDetailOpen: true,
        }),
      closeMovieDetail: () =>
        set({
          isDetailOpen: false,
        }),

      // Theme state
      isDarkMode: false,
      toggleDarkMode: () =>
        set((state) => ({
          isDarkMode: !state.isDarkMode,
        })),
    }),
    {
      name: "movie-store",
      partialize: (state) => ({
        layout: state.layout,
        isDarkMode: state.isDarkMode,
        filters: state.filters,
      }),
    }
  )
);
