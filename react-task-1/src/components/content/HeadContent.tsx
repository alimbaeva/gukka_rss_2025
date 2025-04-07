import { useNavigate } from 'react-router-dom';
import ButtonSimple from '../ui/buttons/Button';
import SearchBar from './_components/SearchBar';
import './headContent.scss';

const HeadContent = () => {
  const navigate = useNavigate();
  const handleAddCourse = () => {
    navigate('/courses/add', { replace: true });
  };

  return (
    <section className="head-content-wrapper container">
      <SearchBar />
      <ButtonSimple
        text={'Add new course'}
        ariaLabe={'Add new course button'}
        onClick={handleAddCourse}
      />
    </section>
  );
};

export default HeadContent;
