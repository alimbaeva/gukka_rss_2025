import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../store/store';
import {
  createCourseThunk,
  updateCourseThunk,
} from '../store/thunks/coursesThunks';
import { clearCourse } from '../store/slice/coursesSlice';
import { setAuthSelect } from '../store/slice/authorsSlice';
import { CourseFormData, CourseData } from '../types/types';

export const useCourseSubmit = (
  id: string | undefined,
  selectAuth: { id: string }[],
  reset: () => void
) => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const onSubmit = async (data: CourseFormData) => {
    const courseData: CourseData = {
      title: data.title,
      description: data.description,
      duration: data.duration,
      creationDate: Math.floor(Date.now() / 1000),
      authors: selectAuth.map((el) => el.id),
    };

    const result = id
      ? await dispatch(updateCourseThunk({ id, data: courseData }))
      : await dispatch(createCourseThunk({ data: courseData }));

    if (!id) reset();
    dispatch(setAuthSelect([]));
    dispatch(clearCourse());
    navigate('/courses', { replace: true });

    return result;
  };

  return onSubmit;
};
