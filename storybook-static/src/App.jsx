import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Heart, Search, Star } from 'lucide-react';

const API_KEY = 'cb352db261a94b14d07d268ec9967754'; // Replace with your key
const BASE_URL = 'https://api.themoviedb.org/3';
const IMAGE_URL = 'https://image.tmdb.org/t/p/w500';

export default function CineStream() {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState('');
  const [favorites, setFavorites] = useState(JSON.parse(localStorage.getItem('favs')) || []);
  const [loading, setLoading] = useState(false);
  
  // 1. Debouncing Logic: Wait for user to stop typing
  const [debouncedQuery, setDebouncedQuery] = useState('');
  useEffect(() => {
    const handler = setTimeout(() => setDebouncedQuery(query), 500);
    return () => clearTimeout(handler);
  }, [query]);

  // 2. Fetch Movies
  const fetchMovies = useCallback(async (pageNum, searchQuery) => {
    setLoading(true);
    const endpoint = searchQuery 
      ? `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${searchQuery}&page=${pageNum}`
      : `${BASE_URL}/movie/popular?api_key=${API_KEY}&page=${pageNum}`;
    
    try {
      const res = await fetch(endpoint);
      const data = await res.json();
      setMovies(prev => pageNum === 1 ? data.results : [...prev, ...data.results]);
    } catch (err) {
      console.error("Fetch error:", err);
    }
    setLoading(false);
  }, []);

  // Reset when search changes
  useEffect(() => {
    setPage(1);
    fetchMovies(1, debouncedQuery);
  }, [debouncedQuery, fetchMovies]);

  // Fetch next page when page state increments
  useEffect(() => {
    if (page > 1) fetchMovies(page, debouncedQuery);
  }, [page, debouncedQuery, fetchMovies]);

  // 3. Infinite Scroll: Intersection Observer
  const observer = useRef();
  const lastMovieElementRef = useCallback(node => {
    if (loading) return;
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        setPage(prevPage => prevPage + 1);
      }
    });
    if (node) observer.current.observe(node);
  }, [loading]);

  const toggleFavorite = (movie) => {
    const isFav = favorites.find(f => f.id === movie.id);
    const updated = isFav ? favorites.filter(f => f.id !== movie.id) : [...favorites, movie];
    setFavorites(updated);
    localStorage.setItem('favs', JSON.stringify(updated));
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white p-6">
      <header className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <h1 className="text-3xl font-bold text-red-600 tracking-tighter">CINE-STREAM</h1>
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
          <input 
            type="text"
            placeholder="Search movies..."
            className="w-full bg-slate-800 border-none rounded-full py-2 pl-10 pr-4 focus:ring-2 focus:ring-red-500 outline-none"
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
      </header>

      <main className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {movies.map((movie, index) => {
          const isLastElement = movies.length === index + 1;
          return (
            <div 
              key={`${movie.id}-${index}`}
              ref={isLastElement ? lastMovieElementRef : null}
              className="bg-slate-800 rounded-lg overflow-hidden hover:scale-105 transition-transform duration-300 relative group"
            >
              <img src={IMAGE_URL + movie.poster_path} alt={movie.title} className="w-full h-72 object-cover" />
              <button 
                onClick={() => toggleFavorite(movie)}
                className="absolute top-2 right-2 p-2 bg-black/50 rounded-full hover:bg-red-600 transition-colors"
              >
                <Heart size={18} fill={favorites.find(f => f.id === movie.id) ? "white" : "none"} />
              </button>
              <div className="p-3">
                <h3 className="font-semibold truncate text-sm">{movie.title}</h3>
                <div className="flex justify-between items-center mt-2 text-xs text-gray-400">
                  <span>{movie.release_date?.split('-')[0]}</span>
                  <span className="flex items-center gap-1 text-yellow-400">
                    <Star size={12} fill="currentColor" /> {movie.vote_average}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </main>
      {loading && <p className="text-center mt-10 animate-pulse text-red-500 font-bold">Loading more movies...</p>}
    </div>
  );
}