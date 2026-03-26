"use client";
import { useMovieStore } from '../store/useMovieStore';

const MovieCard = ({ movie }) => {
  const { addToFavorites, removeFromFavorites, favorites } = useMovieStore();
  
  // Check if this movie is already favorited
  const isFavorite = favorites.some((m) => m.id === movie.id);

  const toggleFavorite = () => {
    if (isFavorite) {
      removeFromFavorites(movie.id);
    } else {
      addToFavorites(movie);
    }
  };

  return (
    <div className="border p-4 rounded shadow">
      <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
      <h3>{movie.title}</h3>
      <button 
        onClick={toggleFavorite}
        className={`mt-2 p-2 rounded ${isFavorite ? 'bg-red-500' : 'bg-blue-500'} text-white`}
      >
        {isFavorite ? '❤️ Remove' : '🤍 Favorite'}
      </button>
    </div>
  );
};

export default MovieCard;