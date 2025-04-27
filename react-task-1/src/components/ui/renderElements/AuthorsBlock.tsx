import { FC, useEffect, useState } from 'react';
import { AuthorsBlockProps, AuthorsList } from '../../../types/types';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../store/store';
import { getAuthorsThunk } from '../../../store/thunks/authorsThunks';
import { filterSelectAuth } from '../../../helper/filterSelectAuth';

const AuthorsBlock: FC<AuthorsBlockProps> = ({ authors }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { authors: courseAuthors } = useSelector(
    (state: RootState) => state.authors
  );

  const [authsCourse, setAuthsCourse] = useState<AuthorsList[]>([]);

  useEffect(() => {
    const fetchAuthors = () => {
      if (!authors) return;
      try {
        if (!courseAuthors.length) dispatch(getAuthorsThunk());
        const data = filterSelectAuth(authors, courseAuthors);
        if (data) setAuthsCourse(() => data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchAuthors();
  }, [authors, courseAuthors, dispatch]);

  if (!authors.length || !authsCourse.length) return;

  return authsCourse.map((el, id) => (
    <span key={id} className="auth-item">
      {el.name}
      {id !== courseAuthors.length - 1 && ', '}
    </span>
  ));
};

export default AuthorsBlock;
