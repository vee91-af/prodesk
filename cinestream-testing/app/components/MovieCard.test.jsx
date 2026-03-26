import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import MovieCard from './MovieCard';
import { useMovieStore } from '../store/useMovieStore';
import { vi, describe, it, expect } from 'vitest';

// 1. Mock the store again
vi.mock('../store/useMovieStore', () => ({
  useMovieStore: vi.fn(),
}));

describe('MovieCard Component', () => {
  const mockMovie = {
    id: 123,
    title: 'Inception',
    poster_path: '/path.jpg',
    release_date: '2010-07-16',
  };

  it('renders movie details correctly', () => {
    // Mock the store to return an empty favorites list
    useMovieStore.mockReturnValue({
      favorites: [],
      addToFavorites: vi.fn(),
    });

    render(<MovieCard movie={mockMovie} />);

    // Check if the title is visible
    expect(screen.getByText('Inception')).toBeInTheDocument();
  });

  it('calls addToFavorites when the button is clicked', async () => {
    const user = userEvent.setup();
    const mockAdd = vi.fn();

    useMovieStore.mockReturnValue({
      favorites: [],
      addToFavorites: mockAdd,
    });

    render(<MovieCard movie={mockMovie} />);

    // Find the button (usually an icon or text like "Add to Favorites")
    // Note: Adjust the 'name' filter if your button text is different
    const favoriteButton = screen.getByRole('button'); 
    
    await user.click(favoriteButton);

    // Assert the store function was called with our movie object
    expect(mockAdd).toHaveBeenCalledWith(mockMovie);
  });
});