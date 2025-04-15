import { render, screen, waitFor } from '@testing-library/react';
import Card from '../../../components/cards/Card';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { mockPropsCard } from '../../mockPData';

const store = configureStore({
  reducer: {
    authorsReducer: () => ({ authors: ['1', '2'] }),
  },
});

describe('Card component', () => {
  beforeEach(() => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Card {...mockPropsCard} />
        </MemoryRouter>
      </Provider>
    );
  });

  it('displays the title and description', () => {
    expect(screen.getByText('Test Title')).toBeInTheDocument();
    expect(screen.getByText('This is a test description')).toBeInTheDocument();
  });

  it('renders ActionCard and authors', async () => {
    await waitFor(
      () => {
        expect(screen.getByText(/Authors/)).toBeInTheDocument();
        expect(screen.getByText(/Duration/)).toBeInTheDocument();
        expect(screen.getByText(/Created/)).toBeInTheDocument();
        expect(screen.getByText(/Show course/)).toBeInTheDocument();
      },
      { timeout: 3000 }
    );
  });
});
