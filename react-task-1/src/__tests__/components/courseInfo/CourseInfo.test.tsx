import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import { ProviderContext } from '../../../components/context/Context';
import CourseInfo from '../../../components/courseInfo/CourseInfo';

const mockNavigate = vi.fn();
const mockDispatch = vi.fn();
vi.mock('react-router-dom', async (importOriginal) => {
  const actual = (await importOriginal()) as typeof import('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
    useLocation: () => ({
      state: { id: '2' },
    }),
  };
});

const courseMock = {
  id: '2',
  title: 'Test Course',
  description: 'Description of the course',
  duration: 60,
  creationDate: 1650000000,
  authors: ['1', '2'],
};

const authorsReducer = () => ({
  authors: ['1', '2'],
});

const coursesReducer = () => ({
  course: courseMock,
  isLoadingCourses: false,
});

const store = configureStore({
  reducer: {
    authorsReducer,
    coursesReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

describe('CourseInfo component', () => {
  beforeEach(() => {
    mockNavigate.mockClear();
    mockDispatch.mockClear();

    render(
      <Provider store={store}>
        <ProviderContext>
          <MemoryRouter>
            <CourseInfo />
          </MemoryRouter>
        </ProviderContext>
      </Provider>
    );
  });

  it('should render course information', async () => {
    expect(screen.getByText('Test Course')).toBeInTheDocument();
    expect(screen.getByText('Description of the course')).toBeInTheDocument();
    expect(screen.getByText('ID:')).toBeInTheDocument();
    expect(screen.getByText('Duration:')).toBeInTheDocument();
    expect(screen.getByText('Created:')).toBeInTheDocument();
    expect(screen.getByText('Authors:')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
  });

  it('should navigate back and clear course data when "Back" button is clicked', async () => {
    const backButton = screen.getByText('Back');
    fireEvent.click(backButton);

    expect(mockNavigate).toHaveBeenCalledWith('/courses', { replace: true });
  });
});
