"use client";
import { useState, useEffect } from 'react';
import { useMovieStore } from './store/useMovieStore';
import SearchBar from './components/SearchBar';
import MovieCard from './components/MovieCard';

export default function Home() {
  const searchQuery = useMovieStore((state) => state.searchQuery);
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      // Replace with your actual TMDB API Key
      const API_KEY = 'YOUR_ACTUAL_TMDB_KEY'; 
      try {
      const res = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=cb352db261a94b14d07d268ec9967754`);
        const data = await res.json();
        setMovies(data.results || []);
      } catch (error) {
        console.error("Failed to fetch movies:", error);
      }
    };
    fetchMovies();
  }, []);

  // Level 2 Logic: Filtering the global grid based on store state
  const filteredMovies = movies.filter((movie: any) =>
    movie.title?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <main className="p-8 bg-black min-h-screen text-white">
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-blue-500">Cine-Stream</h1>
        <div className="text-sm bg-blue-900 px-3 py-1 rounded-full">
          Zustand State Active
        </div>
      </header>

      <SearchBar />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredMovies.length > 0 ? (
          filteredMovies.map((movie: any) => (
            <MovieCard key={movie.id} movie={movie} />
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500 py-10">
            No movies found matching "{searchQuery}"
          </p>
        )}
      </div>
    </main>
  );
}