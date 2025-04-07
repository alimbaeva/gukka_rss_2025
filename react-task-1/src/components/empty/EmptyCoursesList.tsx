import { useNavigate } from 'react-router-dom';
import ButtonSimple from '../ui/buttons/Button';

const EmptyCoursesList = () => {
  const navigate = useNavigate();

  const handleAddCours = () => {
    navigate('/courses/add', { replace: true });
  };

  return (
    <div className="cards-wrapper container">
      <h3>Empty Courses List</h3>
      <p>Please click on the &quot;Add New Course&quot; button</p>
      <ButtonSimple
        text={'Add new course'}
        ariaLabe={'Add new course button'}
        onClick={handleAddCours}
      />
    </div>
  );
};

export default EmptyCoursesList;
