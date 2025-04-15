import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import Duration from '../../../components/courseForm/Duration';
import { FieldValues, FieldErrors } from 'react-hook-form';
import { getHours } from '../../../helper/getHours';

describe('Duration component', () => {
  vi.mock('../../../helper/getHours', () => ({
    getHours: vi.fn((duration: number) => {
      return `${Math.floor(duration / 60)
        .toString()
        .padStart(2, '0')}:${(duration % 60).toString().padStart(2, '0')}`;
    }),
  }));

  const renderDurationComponent = (
    descriptionValue: number,
    errors: FieldErrors<FieldValues> = {}
  ) => {
    const mockRegister = vi.fn();

    render(
      <Duration
        register={mockRegister}
        errors={errors}
        descriptionValue={descriptionValue}
      />
    );
  };

  it('should render the duration input', () => {
    renderDurationComponent(90);
    expect(screen.getByLabelText('Duration')).toBeInTheDocument();
  });

  it('should display "00:00" if descriptionValue is 0 or not provided', () => {
    renderDurationComponent(0);
    expect(screen.getByText('00:00')).toBeInTheDocument();
  });

  it('should call getHours and display correct time if descriptionValue is provided', () => {
    renderDurationComponent(90);

    expect(getHours).toHaveBeenCalledWith(90);
    expect(screen.getByText('01:30')).toBeInTheDocument();
  });

  it('should render the input field and allow entering a value', () => {
    renderDurationComponent(90);

    const input = screen.getByLabelText('Duration') as HTMLInputElement;
    fireEvent.change(input, { target: { value: '120' } });

    expect(input.value).toBe('120');
  });
});
