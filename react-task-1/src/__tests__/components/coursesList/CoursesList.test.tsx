import { render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import CoursesList from '../../../components/coursesList/CoursesList';
import { store } from '../../../store/store';
import { ProviderContext } from '../../../components/context/Context';

vi.mock('../../hooks/useSearchFilter', () => ({
  __esModule: true,
  default: vi.fn().mockReturnValue({
    data: [
      { id: '1', title: 'Course 1' },
      { id: '2', title: 'Course 2' },
    ],
    empty: null,
  }),
}));

vi.mock('../../context/useSearch', () => ({
  useSearch: vi.fn().mockReturnValue({
    searchQuery: '',
    triggerSearchMode: false,
  }),
}));

vi.mock('@/store/thunks/coursesThunks', async () => {
  return {
    getCoursesThunk: vi.fn().mockResolvedValue({ type: 'GET_COURSES_SUCCESS' }),
    deleteCourseThunk: vi
      .fn()
      .mockResolvedValue({ type: 'DELETE_COURSE_SUCCESS' }),
  };
});

describe('CoursesList', () => {
  beforeEach(() => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <ProviderContext>
            <CoursesList />
          </ProviderContext>
        </BrowserRouter>
      </Provider>
    );
  });

  it('renders loading state when courses are loading', () => {
    expect(screen.getByText('...loading')).toBeInTheDocument();
  });

  it('renders courses when data is available', async () => {
    const courseItems = await screen.findAllByText(/Course/);
    expect(courseItems).toHaveLength(2);
  });
});

it('renders empty state when there are no courses', async () => {
  vi.mock('../../hooks/useSearchFilter', () => ({
    __esModule: true,
    default: vi.fn().mockReturnValue({
      data: [],
      empty: 'Empty Courses List',
    }),
  }));

  render(
    <Provider store={store}>
      <BrowserRouter>
        <ProviderContext>
          <CoursesList />
        </ProviderContext>
      </BrowserRouter>
    </Provider>
  );

  await waitFor(() => {
    expect(screen.queryByText(/loading/i)).not.toBeInTheDocument();
  });

  expect(screen.getByText('Empty Courses List')).toBeInTheDocument();
});
