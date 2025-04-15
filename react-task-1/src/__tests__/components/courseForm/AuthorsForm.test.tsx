import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Mock, vi } from 'vitest';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../store/store';
import { createAuthorThunk } from '../../../store/thunks/authorsThunks';
import AuthorsForm from '../../../components/courseForm/AuthorsForm';

vi.mock('react-redux', () => ({
  useDispatch: vi.fn(),
}));

vi.mock('../../../store/thunks/authorsThunks', () => ({
  createAuthorThunk: vi.fn(),
}));

describe('AuthorsForm component', () => {
  let mockDispatch: AppDispatch;
  const resetField = vi.fn();
  const register = vi.fn();
  const errors = {};

  beforeEach(() => {
    mockDispatch = vi.fn();
    (useDispatch as unknown as Mock).mockReturnValue(mockDispatch);

    render(
      <AuthorsForm
        register={register}
        errors={errors}
        authorName="test author"
        resetField={resetField}
      />
    );
  });

  it('should render form with input and button', () => {
    expect(screen.getByLabelText('Author name')).toBeInTheDocument();
    expect(screen.getByText('Create Author')).toBeInTheDocument();
  });

  it('should dispatch createAuthorThunk when "Create Author" button is clicked', async () => {
    const button = screen.getByText('Create Author');
    fireEvent.click(button);

    await waitFor(() => {
      expect(mockDispatch).toHaveBeenCalledWith(
        createAuthorThunk('test author')
      );
    });
  });

  it('should reset authorName field after submitting', async () => {
    const button = screen.getByText('Create Author');
    fireEvent.click(button);

    await waitFor(() => {
      expect(resetField).toHaveBeenCalledWith('authorName');
    });
  });
});
