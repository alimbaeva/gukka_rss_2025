import AuthorListItem from '../ui/renderElements/AuthorListItem';
import { AuthListItemType } from '../../types/types';

const AuthorsList = ({ title, authList, selects }: AuthListItemType) => {
  return (
    <div className="authorse-list-wrapper">
      <h3>{title}</h3>
      <ul className="authorse-list">
        {authList?.length &&
          authList.map((el) => (
            <AuthorListItem key={el.id} auth={el} selects={selects} />
          ))}
      </ul>
    </div>
  );
};

export default AuthorsList;
