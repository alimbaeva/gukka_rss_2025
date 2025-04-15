import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import HeadContent from '../../../components/content/HeadContent';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import { ReactNode } from 'react';
import { ProviderContext } from '../../../components/context/Context';

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

describe('HeadContent component', () => {
  beforeEach(() => {
    mockNavigate.mockClear();
  });

  it('opens navigation to add course page when clicking on the "Add new course" button', async () => {
    render(
      <Provider store={store}>
        <ProviderContext>
          <MemoryRouter>
            <HeadContent />
          </MemoryRouter>
        </ProviderContext>
      </Provider>
    );
    const button = screen.getByTestId('Add new course');

    await waitFor(() => {
      expect(button).toBeInTheDocument();
    });
    fireEvent.click(button);
    expect(mockNavigate).toHaveBeenCalledWith('/courses/add', {
      replace: true,
    });
  });
});
