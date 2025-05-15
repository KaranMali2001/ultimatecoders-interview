"use client";

import { useMovieStore } from "@/src/stores/movieStore/store";
import type { Movie } from "@/src/types/Movie";
import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";

// Fetch movies from TMDB API
const fetchMovies = async ({
  pageParam = 1,
  searchTerm = "",
  filters = { genre: "all", year: "all", rating: "all" },
}: {
  pageParam?: number;
  searchTerm?: string;
  filters?: { genre: string; year: string; rating: string };
}): Promise<{
  movies: Movie[];
  nextPage: number | null;
  totalPages: number;
}> => {
  try {
    const response = await axios.get("/api/fetch-movies", {
      params: {
        page: pageParam,
        searchTerm,
        ...filters,
      },
    });

    const movies: Movie[] = response.data.results;
    const totalPages = response.data.total_pages;

    // Calculate nextPage - make sure it's null if we're at the last page
    const nextPage = pageParam < totalPages ? pageParam + 1 : null;

    return {
      movies,
      nextPage,
      totalPages,
    };
  } catch (error) {
    console.error("Error fetching movies:", error);
    throw error;
  }
};

export function useMovies(initialMovies: Movie[] = []) {
  const { searchTerm } = useMovieStore();
  console.log("seearch ", searchTerm.length);

  const query = useInfiniteQuery({
    queryKey: ["movies"],
    queryFn: ({ pageParam }) => fetchMovies({ pageParam }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => lastPage.nextPage,
    staleTime: 60000, // 1 minute
    gcTime: 300000, // 5 minutes
    refetchOnWindowFocus: false,
    enabled: !searchTerm || searchTerm.length === 0,
    initialData:
      initialMovies.length > 0
        ? {
            pages: [
              {
                movies: initialMovies,
                nextPage: 2,
                totalPages: 5,
              },
            ],
            pageParams: [1],
          }
        : undefined,
  });

  const movies = query.data?.pages.flatMap((page) => page.movies) || [];

  return {
    ...query,
    data: movies,
  };
}
