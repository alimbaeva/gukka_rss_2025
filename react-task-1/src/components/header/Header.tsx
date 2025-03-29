import logo from '@assets/Logo_img.svg';
import './header.scss';
import ButtonSimple from '../ui/buttons/Button';

const Header = () => {
  return (
    <header>
      <section className="header-wrapper container">
        <img src={logo} alt="logo image" loading="lazy" />
        <div className="info-user">
          <h1 className="user-title">UserName</h1>
          <ButtonSimple text={'LOGOUT'} ariaLabe={'Log out'} />
        </div>
      </section>
    </header>
  );
};

export default Header;
