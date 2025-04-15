import { render, screen, fireEvent } from '@testing-library/react';
import { Mock, vi } from 'vitest';
import SearchBar from '../../../components/content/_components/SearchBar';
import { useSearch } from '../../../components/context/useSearch';

vi.mock('../../../components/context/useSearch', () => ({
  useSearch: vi.fn(),
}));

describe('SearchBar component', () => {
  let setSearchQuery: Mock;
  let setIsSearch: Mock;

  beforeEach(() => {
    setSearchQuery = vi.fn();
    setIsSearch = vi.fn();
    (useSearch as Mock).mockReturnValue({
      setSearchQuery,
      searchQuery: 'test',
      setIsSearch,
    });
    render(<SearchBar />);
  });

  it('should render search input and button', () => {
    expect(screen.getByPlaceholderText('Search input')).toBeInTheDocument();
    expect(screen.getByText('Search')).toBeInTheDocument();
  });

  it('should update search query on input change', () => {
    const input = screen.getByPlaceholderText('Search input');
    fireEvent.change(input, { target: { value: 'new query' } });

    expect(setSearchQuery).toHaveBeenCalledWith('new query');
  });

  it('should call setIsSearch when search button is clicked', () => {
    const button = screen.getByText('Search');
    fireEvent.click(button);

    expect(setIsSearch).toHaveBeenCalledWith(true);
  });
});
