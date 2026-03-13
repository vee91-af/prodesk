// app/page.tsx
import MovieCard from './components/MovieCard';
import SearchBar from './components/SearchBar';

const API_KEY = 'cb352db261a94b14d07d268ec9967754'; 

async function getMovies() {
  try {
    const res = await fetch(
  `https://api.tmdb.org/3/movie/popular?api_key=${API_KEY}`, 
  { cache: 'no-store' }
);                                
    if (!res.ok) return [];
    const data = await res.json();
    return data.results;
  } catch (err) {
    return [];
  }
}

export default async function Home() {
  const movies = await getMovies();

  return (
    <main className="min-h-screen bg-black text-white px-6 py-10">
      {/* 1. BRANDING & SEARCH SECTION */}
      <div className="max-w-7xl mx-auto flex flex-col items-center mb-12">
        <h1 className="text-5xl font-black text-red-600 tracking-tighter mb-6">
          CINE STREAM
        </h1>
        
        {/* Level 2: Interactive Search Component */}
        <SearchBar />
      </div>

      {/* 2. MOVIE GRID SECTION */}
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {movies.map((movie: any) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
      
      {movies.length === 0 && (
        <p className="text-center text-zinc-500 mt-20">No movies found. Check your connection.</p>
      )}
    </main>
  );
}