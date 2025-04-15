import { CoursesListType } from '../types/types';

export const mockPropsCard = {
  id: '123',
  title: 'Test Title',
  description: 'This is a test description',
  creationDate: 1744465614,
  duration: 120,
  authors: ['1', '2'],
  removeItem: vi.fn(),
};

export const mockCoursesData: CoursesListType[] = [
  {
    id: '1',
    title: 'Course 1',
    description: 'Description for Course 1',
    creationDate: 0,
    duration: 0,
    authors: [],
  },
  {
    id: '2',
    title: 'Course 2',
    description: 'Description for Course 2',
    creationDate: 0,
    duration: 0,
    authors: [],
  },
  {
    id: '3',
    title: 'Course 3',
    description: 'Description for Course 3',
    creationDate: 0,
    duration: 0,
    authors: [],
  },
];

export const mockCourse: CoursesListType = {
  id: '1',
  title: 'Course 1',
  description: 'Detailed description for Course 1',
  creationDate: 0,
  duration: 0,
  authors: ['1', '2'],
};
