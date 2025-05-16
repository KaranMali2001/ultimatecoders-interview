"use client";

import { Badge } from "@/src/components/ui/badge";
import { Button } from "@/src/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/src/components/ui/dialog";
import type { Movie } from "@/src/types/Movie";
import { Calendar, Star, Tag, Users, X } from "lucide-react";
import Image from "next/image";

interface MovieDetailModalProps {
  movie: Movie;
  isOpen: boolean;
  onClose: () => void;
}

export function MovieDetailModal({
  movie,
  isOpen,
  onClose,
}: MovieDetailModalProps) {
  const releaseYear = new Date(movie.release_date).getFullYear();
  const rating = Math.round(movie.vote_average * 10) / 10;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl p-0 overflow-hidden">
        <div className="relative h-64 sm:h-80 w-full">
          <Image
            src={`https://image.tmdb.org/t/p/original${
              movie.backdrop_path || movie.poster_path
            }`}
            alt={movie.title}
            className="object-cover"
            fill
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-4 right-4 bg-background/20 backdrop-blur-sm hover:bg-background/40 text-white"
            onClick={onClose}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        <div className="p-6 pt-0 relative">
          <div className="flex flex-col sm:flex-row gap-6 -mt-20 sm:-mt-24">
            <div className="relative aspect-[2/3] w-32 sm:w-40 rounded-lg overflow-hidden shadow-lg flex-shrink-0 border-4 border-background">
              <Image
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                className="object-cover"
                fill
              />
            </div>

            <div className="flex-1 pt-4">
              <DialogHeader className="text-left space-y-1">
                <DialogTitle className="text-2xl sm:text-3xl font-bold">
                  {movie.title}
                </DialogTitle>
                <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    <span>{movie.release_date}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span>
                      {rating} ({movie.vote_count} votes)
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="h-4 w-4" />
                    <span>Popularity: {Math.round(movie.popularity)}</span>
                  </div>
                </div>
              </DialogHeader>

              <div className="mt-4 space-y-4">
                <p className="text-sm sm:text-base">{movie.overview}</p>

                <div className="flex flex-wrap gap-2">
                  {movie.genre_ids.map((genreId) => {
                    // This would normally come from a genre mapping
                    const genreMap: Record<number, string> = {
                      28: "Action",
                      12: "Adventure",
                      16: "Animation",
                      35: "Comedy",
                      80: "Crime",
                      18: "Drama",
                      53: "Thriller",
                    };
                    return (
                      <Badge
                        key={genreId}
                        variant="outline"
                        className="flex items-center gap-1"
                      >
                        <Tag className="h-3 w-3" />
                        {genreMap[genreId] || `Genre ${genreId}`}
                      </Badge>
                    );
                  })}
                </div>

                <div className="flex justify-end gap-2 pt-4">
                  <Button variant="outline" onClick={onClose}>
                    Close
                  </Button>
                  <Button>Watch Trailer</Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
