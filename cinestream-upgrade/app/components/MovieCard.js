"use client";
import { useState, useEffect } from 'react';

export default function MovieCard({ movie }) {
  const [isFav, setIsFav] = useState(false);

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem('cine-favs') || '[]');
    setIsFav(favorites.some((m) => m.id === movie.id));
  }, [movie.id]);

  const toggleFav = () => {
    const favorites = JSON.parse(localStorage.getItem('cine-favs') || '[]');
    let updated;
    if (isFav) {
      updated = favorites.filter((m) => m.id !== movie.id);
    } else {
      updated = [...favorites, movie];
    }
    localStorage.setItem('cine-favs', JSON.stringify(updated));
    setIsFav(!isFav);
  };

  return (
    <div className="bg-zinc-900 rounded-xl overflow-hidden border border-zinc-800 hover:border-red-600 transition-all cursor-pointer group">
      <div className="relative aspect-[2/3]">
        <img 
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} 
          alt={movie.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <button 
          onClick={toggleFav}
          className="absolute top-2 right-2 bg-black/60 p-2 rounded-full backdrop-blur-md hover:scale-110 transition-transform"
        >
          {isFav ? '❤️' : '🤍'}
        </button>
      </div>
      <div className="p-3">
        <h3 className="font-bold text-sm truncate">{movie.title}</h3>
        <p className="text-xs text-zinc-500 mt-1">{movie.release_date?.split('-')[0]}</p>
      </div>
    </div>
  );
}