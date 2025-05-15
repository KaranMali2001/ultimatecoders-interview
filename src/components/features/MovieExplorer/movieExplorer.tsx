"use client";

import { MovieDetailModal } from "@/src/components/features/MovieExplorer/movieDetailModal";
import { MovieMaterial } from "@/src/components/features/MovieExplorer/movieMaterial";
import { SearchBar } from "@/src/components/features/MovieExplorer/searchBar";
import { useMovies } from "@/src/hooks/use-movies";
import { useMovieStore } from "@/src/stores/movieStore/store";
import { Movie } from "@/src/types/Movie";
import { useMemo } from "react";

export default function MovieExplorer({
  InitialMovies,
}: {
  InitialMovies: Movie[];
}) {
  const {
    searchTerm,

    selectedMovie,
    isDetailOpen,
    closeMovieDetail,
    selectMovie,
  } = useMovieStore();

  const {
    data: allMovies,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useMovies(InitialMovies);
  const filteredMovies = useMemo(() => {
    if (!searchTerm.trim()) return allMovies;

    const searchLower = searchTerm.toLowerCase();
    return allMovies.filter(
      (movie) =>
        movie.title?.toLowerCase().includes(searchLower) ||
        movie.overview?.toLowerCase().includes(searchLower)
    );
  }, [allMovies, searchTerm]);
  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] p-4">
        <h2 className="text-xl font-bold mb-2">Something went wrong</h2>
        <p className="text-muted-foreground">
          Failed to load movies. Please try again later.
        </p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <h1 className="text-3xl font-bold">Movie Explorer</h1>
          <SearchBar />
        </div>

        <MovieMaterial
          movies={filteredMovies}
          isLoading={isLoading}
          onMovieClick={selectMovie}
          onLoadMore={() => fetchNextPage()}
          hasMore={!!hasNextPage}
          isLoadingMore={isFetchingNextPage}
        />
      </div>

      {selectedMovie && (
        <MovieDetailModal
          movie={selectedMovie}
          isOpen={isDetailOpen}
          onClose={closeMovieDetail}
        />
      )}
    </div>
  );
}
