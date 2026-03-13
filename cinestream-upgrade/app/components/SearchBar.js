"use client";
import { useState } from 'react';

export default function SearchBar() {
  const [query, setQuery] = useState('');

  return (
    <div className="w-full max-w-md relative">
      <input
        type="text"
        placeholder="Search movies..."
        className="w-full bg-zinc-900/50 border border-zinc-700 text-white px-5 py-2.5 rounded-full focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent transition-all placeholder:text-zinc-500"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      {/* Search Icon Decor */}
      <span className="absolute right-4 top-2.5 text-zinc-500">🔍</span>
    </div>
  );
}