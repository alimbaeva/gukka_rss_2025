import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import EmptyCoursesList from '../../../components/empty/EmptyCoursesList';

const mockedUsedNavigate = vi.fn();

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockedUsedNavigate,
  };
});

describe('EmptyCoursesList', () => {
  beforeEach(() => {
    mockedUsedNavigate.mockClear();
  });

  it('renders title, description, and button', () => {
    render(
      <BrowserRouter>
        <EmptyCoursesList />
      </BrowserRouter>
    );

    expect(screen.getByText('Empty Courses List')).toBeInTheDocument();
    expect(screen.getByText(/click on the/i)).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /add new course/i })
    ).toBeInTheDocument();
  });

  it('navigates to add course page on button click', () => {
    render(
      <BrowserRouter>
        <EmptyCoursesList />
      </BrowserRouter>
    );

    const button = screen.getByRole('button', { name: /add new course/i });
    fireEvent.click(button);

    expect(mockedUsedNavigate).toHaveBeenCalledWith('/courses/add', {
      replace: true,
    });
  });
});
