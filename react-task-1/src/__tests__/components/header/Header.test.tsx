import { render, screen, fireEvent } from '@testing-library/react';
import Header from '../../../components/header/Header';
import { useSearch } from '../../../components/context/useSearch';
import { vi, Mock } from 'vitest';
import { removeFromLocalStorage } from '../../../hooks/localActions';

vi.mock('../../../components/context/useSearch', () => ({
  useSearch: vi.fn(),
}));

vi.mock('../../../hooks/localActions', () => ({
  removeFromLocalStorage: vi.fn(),
}));

describe('Header', () => {
  const mockSetUserData = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders logo and user info when userData exists', () => {
    (useSearch as Mock).mockReturnValue({
      userData: { name: 'Asel' },
      setUserData: mockSetUserData,
    });

    render(<Header />);

    expect(screen.getByAltText('logo image')).toBeInTheDocument();
    expect(screen.getByText('Asel')).toBeInTheDocument();
    expect(screen.getByTestId('LOGOUT')).toBeInTheDocument();
  });

  it('does not render user info when userData is undefined', () => {
    (useSearch as Mock).mockReturnValue({
      userData: undefined,
      setUserData: mockSetUserData,
    });

    render(<Header />);

    expect(screen.getByAltText('logo image')).toBeInTheDocument();
    expect(screen.queryByText('Asel')).not.toBeInTheDocument();
    expect(screen.queryByTestId('LOGOUT')).not.toBeInTheDocument();
  });

  it('calls removeFromLocalStorage and setUserData on logout', () => {
    (useSearch as Mock).mockReturnValue({
      userData: { name: 'Asel' },
      setUserData: mockSetUserData,
    });

    render(<Header />);

    const logoutBtn = screen.getByRole('button', { name: /log out/i });
    fireEvent.click(logoutBtn);

    expect(removeFromLocalStorage).toHaveBeenCalledWith('userData');
    expect(mockSetUserData).toHaveBeenCalledWith(undefined);
  });
});
