import { FC } from 'react';
import { getAuth } from '../../../helper/getAuthors';
import { RenderAuthProps } from '../../../types/types';

const RenderAuth: FC<RenderAuthProps> = ({ authors }) => {
  const auth = getAuth(authors);
  if (!auth.length) return;
  return auth.map((el, id) => (
    <span key={id} className="auth-item">
      {el.name}
    </span>
  ));
};

export default RenderAuth;
