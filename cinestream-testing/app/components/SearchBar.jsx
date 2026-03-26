"use client";
import { useMovieStore } from '../store/useMovieStore';

export default function SearchBar() {
  const { searchQuery, setSearchQuery } = useMovieStore();

  return (
    <div className="w-full max-w-xl mx-auto mb-10 px-4">
      <input 
        type="text" 
        placeholder="Search movies..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        // FIX: Added 'bg-white text-black' and a thick 'border-blue-500' 
        // to make sure it's impossible to miss on a black background.
        className="w-full p-4 rounded-full bg-white text-black border-4 border-blue-500 shadow-lg outline-none placeholder:text-gray-500 font-semibold"
      />
    </div>
  );
}