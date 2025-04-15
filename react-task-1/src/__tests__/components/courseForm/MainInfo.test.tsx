import { render, screen } from '@testing-library/react';
import { useForm } from 'react-hook-form';
import MainInfo from '../../../components/courseForm/MainInfo';

describe('MainInfo component', () => {
  const TestWrapper = () => {
    const {
      register,
      formState: { errors },
    } = useForm({
      defaultValues: {
        title: '',
        description: '',
      },
    });

    return <MainInfo register={register} errors={errors} />;
  };

  beforeEach(() => {
    render(<TestWrapper />);
  });

  it('should render the Main Info title', () => {
    expect(screen.getByText('Main Info')).toBeInTheDocument();
  });

  it('should render title and description input fields', () => {
    expect(screen.getByLabelText('Title')).toBeInTheDocument();
    expect(screen.getByLabelText('Description')).toBeInTheDocument();
  });

  it('should render correct labels and placeholders', () => {
    expect(screen.getByText('Title')).toBeInTheDocument();
    expect(screen.getByText('Description')).toBeInTheDocument();
  });
});
