import { Movie } from "@/src/types/Movie";

interface FilterState {
  genre: string;
  year: string;
  rating: string;
}

export interface MovieStore {
  // Search state
  searchTerm: string;
  setSearchTerm: (term: string) => void;

  // Filter state
  filters: FilterState;
  setFilter: (key: keyof FilterState, value: string) => void;
  resetFilters: () => void;

  // Layout state
  layout: string;
  setLayout: (layout: string) => void;

  // Selected movie state
  selectedMovie: Movie | null;
  isDetailOpen: boolean;
  selectMovie: (movie: Movie) => void;
  closeMovieDetail: () => void;

  // Theme state
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}
