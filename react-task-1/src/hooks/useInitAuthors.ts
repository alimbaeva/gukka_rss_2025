import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setAuthSelect } from '../store/slice/authorsSlice';
import { getAuthorsThunk } from '../store/thunks/authorsThunks';
import { AppDispatch } from '../store/store';

export const useInitAuthors = (hasAuthors: boolean, hasId: boolean) => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (!hasId) {
      dispatch(setAuthSelect([]));
      if (!hasAuthors) dispatch(getAuthorsThunk());
    }
  }, []);
};
