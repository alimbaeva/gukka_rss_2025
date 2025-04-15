import { fireEvent, render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { vi } from 'vitest';
import Login from '../../page/auth/Login';

vi.mock('../../api/login');
vi.mock('../../components/context/useSearch', () => ({
  useSearch: () => ({
    setUserData: vi.fn(),
  }),
}));

const renderWithRouter = (ui: React.ReactElement) => {
  return render(<BrowserRouter>{ui}</BrowserRouter>);
};

describe('Login component', () => {
  it('shows validation errors if fields are empty', async () => {
    renderWithRouter(<Login />);
    const loginButton = screen.getByTestId('Login');
    expect(loginButton).toBeDisabled();

    fireEvent.click(loginButton);

    expect(screen.getByText(/enter your username/i)).toBeInTheDocument();
    expect(screen.getByText(/enter your password/i)).toBeInTheDocument();
  });
});
