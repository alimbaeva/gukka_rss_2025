import { render, screen, fireEvent } from '@testing-library/react';
import FormButtons from '../../../components/courseForm/FormButtons';
import { vi } from 'vitest';

describe('FormButtons component', () => {
  const mockHandleCloseForm = vi.fn();
  const buttonText = 'Create Course';

  beforeEach(() => {
    render(
      <FormButtons
        handleCloseForm={mockHandleCloseForm}
        buttonText={buttonText}
      />
    );
  });

  it('should render both buttons', () => {
    expect(screen.getByText('Cancel')).toBeInTheDocument();
    expect(screen.getByText(buttonText)).toBeInTheDocument();
  });

  it('should call handleCloseForm when Cancel button is clicked', () => {
    fireEvent.click(screen.getByText('Cancel'));
    expect(mockHandleCloseForm).toHaveBeenCalledTimes(1);
  });

  it('should render submit button with correct type', () => {
    const submitButton = screen.getByText(buttonText);
    expect(submitButton).toHaveAttribute('type', 'submit');
  });
});
