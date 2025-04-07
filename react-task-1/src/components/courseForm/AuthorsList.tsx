import AuthListItem from '../ui/renderElements/AuthListItem';
import { AuthListItemType } from '../../types/types';

const AuthorsList = ({ title, authList, selects }: AuthListItemType) => {
  if (!authList) return;

  return (
    <div className="authorse-list-wrapper">
      <h3>{title}</h3>
      <ul className="authorse-list">
        {authList.map((el) => (
          <AuthListItem key={el.id} auth={el} selects={selects} />
        ))}
      </ul>
    </div>
  );
};

export default AuthorsList;
