import { BASE_URL } from "@/constants";
import MovieExplorer from "@/src/components/features/MovieExplorer/movieExplorer";
import { tryCatch } from "@/src/utils/try-catch";
import axios from "axios";
export default async function Home() {
  const { data: response, error } = await tryCatch(
    axios.get(
      `${BASE_URL}/movie/popular?api_key=${process.env.TMDB_API_KEY}&language=en-US&page=1`
    )
  );

  if (error) {
    console.error("Failed to fetch initial movies:", error);
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="p-8 text-center">
          <h2 className="text-xl font-bold mb-2">Failed to load movies</h2>
          <p className="text-muted-foreground">Please try again later.</p>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-background">
      <MovieExplorer InitialMovies={response.data.results} />
    </main>
  );
}
