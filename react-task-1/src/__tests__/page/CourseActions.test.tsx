import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { ProviderContext } from '../../components/context/Context';
import { configureStore } from '@reduxjs/toolkit';
import CourseActions from '../../page/courseActions/CourseActions';

vi.mock('../../customHooks/useCourseSubmit', () => ({
  useCourseSubmit: vi.fn().mockReturnValue(vi.fn()),
}));

vi.mock('../../customHooks/useCourseForm', () => ({
  useCourseForm: vi.fn().mockReturnValue({
    register: vi.fn(),
    handleSubmit: vi.fn(),
    reset: vi.fn(),
    resetField: vi.fn(),
    formState: { errors: {} },
    duration: '30',
    authorName: '',
  }),
}));

vi.mock('../../customHooks/useCourseEffects', () => ({
  useCourseEffects: vi.fn(),
}));

vi.mock('../../customHooks/useCourseDataFill', () => ({
  useCourseDataFill: vi.fn(),
}));

vi.mock('../../customHooks/useInitAuthors', () => ({
  useInitAuthors: vi.fn(),
}));

vi.mock('../../store/slice/coursesSlice', () => ({
  __esModule: true,
  default: vi.fn(() => ({
    isLoadingCourses: false,
    errorCourses: '',
    courseData: [{ id: 1, title: 'Test Course' }],
    course: undefined,
  })),
  actions: {
    clearCourse: vi.fn(),
  },
}));

const store = configureStore({
  reducer: {
    courses: () => ({
      isLoadingCourses: false,
      errorCourses: '',
      courseData: [{ id: 1, title: 'Test Course' }],
      course: undefined,
    }),
  },
});

describe('CourseActions', () => {
  it('should render the course creation form', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <ProviderContext>
            <CourseActions />
          </ProviderContext>
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByText('Course Creat')).toBeInTheDocument();
    expect(screen.getByText('Main Info')).toBeInTheDocument();
    expect(screen.getByLabelText('Duration')).toBeInTheDocument();
  });

  it('should render course edit form with data if course id is provided', async () => {
    const courseData = {
      id: '123',
      name: 'Test Course',
      duration: '30',
      authors: ['Author1'],
    };

    const updatedStore = configureStore({
      reducer: {
        courses: () => ({
          isLoadingCourses: false,
          errorCourses: '',
          courseData: [{ id: '123', title: 'Test Course' }],
          course: courseData,
        }),
      },
    });

    render(
      <Provider store={updatedStore}>
        <BrowserRouter>
          <ProviderContext>
            <CourseActions />
          </ProviderContext>
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByText('Authors')).toBeInTheDocument();
    expect(screen.getByText('Author name')).toBeInTheDocument();
    expect(screen.getByText('Course Authors')).toBeInTheDocument();
    expect(screen.getByText('hours')).toBeInTheDocument();
  });
});
