import { render, screen, fireEvent } from '@testing-library/react';
import { FieldError, useForm } from 'react-hook-form';
import InputPassword from '../../../components/ui/inputs/InputPassword';

describe('InputPassword', () => {
  const ComponentWrapper = ({ hasError = false }: { hasError?: boolean }) => {
    const { register } = useForm<{ password: string }>({
      defaultValues: { password: '' },
    });

    const fakeErrors = hasError
      ? {
          password: {
            type: 'required',
            message: 'Password is required',
          } as FieldError,
        }
      : {};

    return (
      <InputPassword
        forInput="password"
        label="Password"
        warnText="Password is required"
        register={register}
        errors={fakeErrors}
      />
    );
  };

  beforeEach(() => {
    render(<ComponentWrapper />);
  });

  it('renders label, input and toggle icon', () => {
    const input = screen.getByLabelText(/password/i);
    expect(input).toBeInTheDocument();

    const toggleButton = screen.getByRole('button', { name: /trash card/i });
    expect(toggleButton).toBeInTheDocument();
  });

  it('toggles password visibility when icon is clicked', () => {
    const input = screen.getByLabelText('Password');
    const toggleButton = screen.getByRole('button');

    expect(input).toHaveAttribute('type', 'password');

    fireEvent.click(toggleButton);
    expect(input).toHaveAttribute('type', 'text');

    fireEvent.click(toggleButton);
    expect(input).toHaveAttribute('type', 'password');
  });
});

it('shows warning text if error exists', () => {
  const ComponentWrapper = ({ hasError = false }: { hasError?: boolean }) => {
    const { register } = useForm<{ password: string }>({
      defaultValues: { password: '' },
    });

    const fakeErrors = hasError
      ? {
          password: {
            type: 'required',
            message: 'Password is required',
          } as FieldError,
        }
      : {};

    return (
      <InputPassword
        forInput="password"
        label="Password"
        warnText="Password is required"
        register={register}
        errors={fakeErrors}
      />
    );
  };

  render(<ComponentWrapper hasError />);
  expect(screen.getByText('Password is required')).toBeInTheDocument();
});
