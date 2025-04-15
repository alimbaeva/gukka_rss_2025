import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { AuthorsList, CourseData } from '../types/types';
import { setAuthSelect } from '../store/slice/authorsSlice';
import { filterSelectAuth } from '../helper/filterSelectAuth';

export const useCourseDataFill = (
  course: CourseData | undefined,
  authors: AuthorsList[],
  reset: (values: Partial<CourseData>) => void
) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (course && course.authors) {
      const selected = filterSelectAuth(course.authors, authors);
      if (selected) dispatch(setAuthSelect(selected));
      reset({
        title: course.title,
        description: course.description,
        duration: course.duration,
      });
    }
  }, [course]);
};
