import { FC, useEffect, useState } from 'react';
import { RenderAuthProps, AuthorsList } from '../../../types/types';
import { useSearch } from '../../context/useSearch';

const RenderAuth: FC<RenderAuthProps> = ({ authors }) => {
  const { auths, getAllAuth, filterSelectAuth } = useSearch();
  const [authsCourse, setAuthsCourse] = useState<AuthorsList[]>([]);

  useEffect(() => {
    const fetchAuthors = async () => {
      if (!authors) return;
      try {
        if (!auths) getAllAuth();
        const data = await filterSelectAuth(authors);
        if (data) setAuthsCourse(() => data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchAuthors();
  }, [authors]);

  if (!authors.length || !authsCourse.length) return;

  return authsCourse.map((el, id) => (
    <span key={id} className="auth-item">
      {el.name}
      {id !== auths.length - 1 && ', '}
    </span>
  ));
};

export default RenderAuth;
