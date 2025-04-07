import { useNavigate } from 'react-router-dom';
import ButtonSimple from '../../components/ui/buttons/Button';

const NotFound = () => {
  const navigate = useNavigate();

  const handlePages = () => {
    navigate('/courses/', { replace: true });
  };

  return (
    <div className="cards-wrapper container">
      <h3>Something went wrong, go to the main page...</h3>
      <p>Please click on the button</p>
      <ButtonSimple
        text={'Main page'}
        ariaLabe={'Add new course button'}
        onClick={handlePages}
      />
    </div>
  );
};

export default NotFound;
