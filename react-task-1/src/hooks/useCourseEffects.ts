import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../store/store';
import { getCourseIdThunk } from '../store/thunks/coursesThunks';
import { getAuthorsThunk } from '../store/thunks/authorsThunks';

export const useCourseEffects = (
  id: string | undefined,
  hasAuthors: boolean
) => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (!id) return;

    if (!hasAuthors) {
      dispatch(getAuthorsThunk());
    }

    dispatch(getCourseIdThunk(id));
  }, [id]);
};
