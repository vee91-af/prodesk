"use client";
import { create } from 'zustand';

// 1. Define the TypeScript interface for your state
interface MovieState {
  favorites: any[];
  searchQuery: string;
  minRating: number;
  addToFavorites: (movie: any) => void;
  removeFromFavorites: (id: number) => void;
  setSearchQuery: (query: string) => void;
  setMinRating: (rating: number) => void;
}

// 2. Create the store (Only do this ONCE)
export const useMovieStore = create<MovieState>((set) => ({
  favorites: [],
  searchQuery: '',
  minRating: 0,

  addToFavorites: (movie) => 
    set((state) => ({ favorites: [...state.favorites, movie] })),
    
  removeFromFavorites: (id) => 
    set((state) => ({ favorites: state.favorites.filter((m) => m.id !== id) })),

  setSearchQuery: (query) => set({ searchQuery: query }),
  
  setMinRating: (rating) => set({ minRating: rating }),
}));