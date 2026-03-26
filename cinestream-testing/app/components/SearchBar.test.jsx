import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SearchBar from './SearchBar';
import { useMovieStore } from '../store/useMovieStore';
import { vi, describe, it, expect } from 'vitest';

// 1. Mock the store
vi.mock('../store/useMovieStore', () => ({
  useMovieStore: vi.fn(),
}));

describe('SearchBar Component', () => {
  it('calls setSearchQuery when the user types', async () => {
    const user = userEvent.setup();
    const mockSetSearchQuery = vi.fn();

    // 2. Setup the mock return - we don't need a local variable here
    useMovieStore.mockReturnValue({
      searchQuery: '', // Keep it empty for the test
      setSearchQuery: mockSetSearchQuery,
    });

    render(<SearchBar />);

    const input = screen.getByPlaceholderText(/search movies/i);

    // 3. Action: User types "A"
    await user.type(input, 'A');

    // 4. Assert: Did the component tell the store to update?
    // This proves the 'onChange' logic is connected correctly.
    expect(mockSetSearchQuery).toHaveBeenCalledWith('A');
  });
});