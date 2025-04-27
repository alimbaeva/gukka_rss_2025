import logo from '../../assets/Logo_img.svg';
import './header.scss';
import ButtonSimple from '../ui/buttons/Button';
import { useSearch } from '../context/useSearch';
import { removeFromLocalStorage } from '../../hooks/localActions';

const Header = () => {
  const { userData, setUserData } = useSearch();

  const handleLogOut = () => {
    removeFromLocalStorage('userData');
    setUserData(undefined);
  };

  return (
    <header>
      <section className="header-wrapper container">
        <img src={logo} alt="logo image" loading="lazy" />
        {userData && (
          <div className="info-user">
            <h1 className="user-title">{userData.name}</h1>
            <ButtonSimple
              text={'LOGOUT'}
              ariaLabel={'Log out'}
              onClick={handleLogOut}
            />
          </div>
        )}
      </section>
    </header>
  );
};

export default Header;
