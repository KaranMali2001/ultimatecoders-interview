"use client";

import { Button } from "@/src/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/src/components/ui/card";
import { Skeleton } from "@/src/components/ui/skeleton";
import { cn } from "@/src/lib/utils";
import { useMovieStore } from "@/src/stores/movieStore/store";
import type { Movie } from "@/src/types/Movie";
import { Bookmark, MoreVertical, Share2, Star } from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

interface MovieMaterialProps {
  movies: Movie[];
  isLoading: boolean;
  onMovieClick: (movie: Movie) => void;
  onLoadMore: () => void;
  hasMore: boolean;
  isLoadingMore: boolean;
}

export function MovieMaterial({
  movies,
  isLoading,
  onMovieClick,
  onLoadMore,
  hasMore,
  isLoadingMore,
}: MovieMaterialProps) {
  const observerRef = useRef<IntersectionObserver | null>(null);
  const loadMoreRef = useRef<HTMLDivElement>(null);

  const [loadingThrottled, setLoadingThrottled] = useState(false);
  const { searchTerm } = useMovieStore();
  // Throttled load more handler to prevent multiple calls
  const handleObserver = useCallback(() => {
    if (
      hasMore &&
      !isLoadingMore &&
      !loadingThrottled &&
      searchTerm.length === 0
    ) {
      setLoadingThrottled(true);
      onLoadMore();

      setTimeout(() => setLoadingThrottled(false), 1000);
    }
  }, [hasMore, isLoadingMore, onLoadMore, loadingThrottled, searchTerm]);

  // Set up intersection observer with throttling
  useEffect(() => {
    if (isLoading) return;

    const options = {
      root: null,
      rootMargin: "100px",
      threshold: 0.1,
    };

    observerRef.current = new IntersectionObserver((entries) => {
      const [entry] = entries;
      if (entry.isIntersecting) {
        handleObserver();
      }
    }, options);

    const currentRef = loadMoreRef.current;
    if (currentRef) {
      observerRef.current.observe(currentRef);
    }

    return () => {
      if (currentRef && observerRef.current) {
        observerRef.current.unobserve(currentRef);
      }
    };
  }, [isLoading, handleObserver]);

  if (isLoading) {
    return (
      <div className="space-y-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <Card key={i} className="overflow-hidden shadow-lg">
              <Skeleton className="h-48 w-full" />
              <CardHeader className="p-4 pb-0">
                <Skeleton className="h-6 w-3/4 mb-2" />
                <Skeleton className="h-4 w-1/2" />
              </CardHeader>
              <CardContent className="p-4">
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-2/3" />
              </CardContent>
              <CardFooter className="p-4 pt-0">
                <Skeleton className="h-10 w-full rounded-full" />
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (movies.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] p-4">
        <h2 className="text-xl font-bold mb-2">No movies found</h2>
        <p className="text-muted-foreground">
          Try adjusting your search or filters
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {movies.map((movie) => (
          <MaterialCard key={movie.id} movie={movie} onClick={onMovieClick} />
        ))}
      </div>

      {/* Invisible load more trigger - no button */}
      {hasMore && (
        <div
          ref={loadMoreRef}
          className="h-10 w-full my-8"
          aria-hidden="true"
        />
      )}

      {/* Loading indicator */}
      {isLoadingMore && (
        <div className="flex justify-center py-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <div className="h-4 w-4 rounded-full border-2 border-t-transparent border-primary animate-spin"></div>
            Loading more movies...
          </div>
        </div>
      )}

      {/* End of results message */}
      {!hasMore && movies.length > 0 && (
        <div className="text-center py-4 text-sm text-muted-foreground">
          You've reached the end of the results
        </div>
      )}
    </div>
  );
}

interface MaterialCardProps {
  movie: Movie;
  onClick: (movie: Movie) => void;
  className?: string;
}

function MaterialCard({ movie, onClick, className }: MaterialCardProps) {
  const releaseYear = new Date(movie.release_date).getFullYear();
  const rating = Math.round(movie.vote_average * 10) / 10;

  return (
    <Card
      className={cn(
        "overflow-hidden transition-all hover:shadow-xl cursor-pointer group",
        className
      )}
      onClick={() => onClick(movie)}
    >
      <div className="relative h-48 w-full overflow-hidden">
        <Image
          src={`https://image.tmdb.org/t/p/w500${
            movie.backdrop_path || movie.poster_path
          }`}
          alt={movie.title}
          className="object-cover transition-transform group-hover:scale-105"
          fill
        />
        <div className="absolute top-2 right-2 flex gap-1">
          <Button
            size="icon"
            variant="secondary"
            className="h-8 w-8 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white"
          >
            <Bookmark className="h-4 w-4" />
          </Button>
          <Button
            size="icon"
            variant="secondary"
            className="h-8 w-8 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white"
          >
            <Share2 className="h-4 w-4" />
          </Button>
          <Button
            size="icon"
            variant="secondary"
            className="h-8 w-8 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white"
          >
            <MoreVertical className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <CardHeader className="p-4 pb-0">
        <div className="flex justify-between items-start">
          <h3 className="font-bold text-lg line-clamp-1 group-hover:text-primary transition-colors">
            {movie.title}
          </h3>
          <div className="flex items-center gap-1 text-sm bg-primary/10 text-primary px-2 py-0.5 rounded-full">
            <Star className="h-4 w-4 fill-primary text-primary" />
            <span>{rating}</span>
          </div>
        </div>
        <p className="text-sm text-muted-foreground">
          {releaseYear} • {getGenreNames(movie.genre_ids).join(", ")}
        </p>
      </CardHeader>
      <CardContent className="p-4">
        <p className="text-sm text-muted-foreground line-clamp-3">
          {movie.overview}
        </p>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button className="w-full rounded-full bg-primary hover:bg-primary/90">
          Watch Now
        </Button>
      </CardFooter>
    </Card>
  );
}

// Helper function to get genre names
function getGenreNames(genreIds: number[]): string[] {
  const genreMap: Record<number, string> = {
    28: "Action",
    12: "Adventure",
    16: "Animation",
    35: "Comedy",
    80: "Crime",
    99: "Documentary",
    18: "Drama",
    10751: "Family",
    14: "Fantasy",
    36: "History",
    27: "Horror",
    10402: "Music",
    9648: "Mystery",
    10749: "Romance",
    878: "Sci-Fi",
    10770: "TV Movie",
    53: "Thriller",
    10752: "War",
    37: "Western",
  };

  return genreIds.slice(0, 2).map((id) => genreMap[id] || "Unknown");
}
