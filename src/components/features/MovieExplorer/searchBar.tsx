"use client";

import { Input } from "@/src/components/ui/input";
import { useDebounce } from "@/src/hooks/use-debounce";
import { useMovieStore } from "@/src/stores/movieStore/store";
import { Search } from "lucide-react";
import { useEffect, useState } from "react";

export function SearchBar() {
  const { searchTerm, setSearchTerm } = useMovieStore();
  const [inputValue, setInputValue] = useState(searchTerm);
  const debouncedValue = useDebounce(inputValue, 500);

  useEffect(() => {
    setSearchTerm(debouncedValue);
  }, [debouncedValue, setSearchTerm]);

  return (
    <div className="relative w-full max-w-md">
      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      <Input
        type="search"
        placeholder="Search movies..."
        className="pl-10 w-full"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
    </div>
  );
}
