import { FC, useEffect, useState } from 'react';
import { RenderAuthProps, AuthorsList } from '../../../types/types';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../store/store';
import { getAuthorsThunk } from '../../../store/thunks/authorsThunks';
import { filterSelectAuth } from '../../../helper/filterSelectAuth';

const RenderAuth: FC<RenderAuthProps> = ({ authors }) => {
  const dispatch = useDispatch<AppDispatch>();
  const {
    authors: { authors: authorsslise },
  } = useSelector((state: RootState) => state.authorsReducer);

  const [authsCourse, setAuthsCourse] = useState<AuthorsList[]>([]);

  useEffect(() => {
    const fetchAuthors = () => {
      if (!authors) return;
      try {
        if (!authorsslise.length) dispatch(getAuthorsThunk());
        const data = filterSelectAuth(authors, authorsslise);
        if (data) setAuthsCourse(() => data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchAuthors();
  }, [authors, authorsslise, dispatch]);

  if (!authors.length || !authsCourse.length) return;

  return authsCourse.map((el, id) => (
    <span key={id} className="auth-item">
      {el.name}
      {id !== authorsslise.length - 1 && ', '}
    </span>
  ));
};

export default RenderAuth;
