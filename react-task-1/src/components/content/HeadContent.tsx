import { useNavigate } from 'react-router-dom';
import ButtonSimple from '../ui/buttons/Button';
import SearchBar from './_components/SearchBar';
import './headContent.scss';
import { addCoursePath, coursesPath } from '../../constants/pathConstants';

const HeadContent = () => {
  const navigate = useNavigate();
  const handleAddCourse = () => {
    navigate(`${coursesPath}${addCoursePath}`, { replace: true });
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
