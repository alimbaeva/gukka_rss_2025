import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import ActionCard from '../../../components/cards/_components/ActionCard';
import { ReactNode } from 'react';

const mockNavigate = vi.fn();

vi.mock('react-router-dom', async (importOriginal) => {
  const actual = (await importOriginal()) as typeof import('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
    MemoryRouter: ({ children }: { children: ReactNode }) => (
      <actual.MemoryRouter>{children}</actual.MemoryRouter>
    ),
  };
});

const store = configureStore({
  reducer: {
    authorsReducer: () => ({ authors: ['1', '2'] }),
  },
});

const mockProps = {
  id: '123',
  creationDate: 1744465614,
  duration: 120,
  authors: ['1', '2'],
  removeItem: vi.fn(),
};

describe('ActionCard component', () => {
  it('handles "Edit card" click', async () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <ActionCard {...mockProps} />
        </MemoryRouter>
      </Provider>
    );

    const card = screen.getByTestId('Edit card');

    await waitFor(() => {
      expect(card).toBeInTheDocument();
    });
    fireEvent.click(card);
    expect(mockNavigate).toHaveBeenCalledWith('/courses/123/edit', {
      state: { id: '123' },
    });
  });

  it('opens a modal window when clicking on the "Trash" button', async () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <ActionCard {...mockProps} />
        </MemoryRouter>
      </Provider>
    );

    fireEvent.click(screen.getByLabelText('Trash card'));

    expect(
      screen.getByText('Do you really want to delete the course?')
    ).toBeInTheDocument();

    fireEvent.click(screen.getByText('Remove course'));

    expect(mockNavigate).toHaveBeenCalledWith('/courses/123/edit', {
      state: { id: '123' },
    });
  });
});
