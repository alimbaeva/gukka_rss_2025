import { describe, it, vi, expect } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter, useNavigate } from 'react-router-dom';
import NotFound from '../../page/404/NotFound';

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: vi.fn(),
  };
});

describe('NotFound component', () => {
  it('renders error message and button', () => {
    render(
      <MemoryRouter>
        <NotFound />
      </MemoryRouter>
    );

    expect(screen.getByText(/something went wrong/i)).toBeInTheDocument();
    expect(screen.getByText(/please click on the button/i)).toBeInTheDocument();
    expect(screen.getByTestId('Main page')).toBeInTheDocument();
  });

  it('calls navigate with correct path on button click', async () => {
    const mockedNavigate = vi.fn();
    (useNavigate as unknown as () => typeof mockedNavigate) = () =>
      mockedNavigate;

    render(
      <MemoryRouter>
        <NotFound />
      </MemoryRouter>
    );

    const button = screen.getByTestId('Main page');
    await fireEvent.click(button);

    expect(mockedNavigate).toHaveBeenCalledWith('/courses', { replace: true });
  });
});
