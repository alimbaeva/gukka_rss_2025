import { useEffect } from 'react';
import { getHours } from '../../helper/getHours';
import ButtonSimple from '../ui/buttons/Button';
import './courseInfo.scss';
import { useSearch } from '../context/useSearch';
import { useLocation, useNavigate } from 'react-router-dom';
import { convertDateToUTCDate } from '../../helper/convertDate';
import { getCourseIdThunk } from '../../store/thunks/coursesThunks';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';
import { clearCourse } from '../../store/slice/coursesSlice';
import { coursesPath } from '../../constants/pathConstants';
import CourseInfoItem from './_components/CourseInfoItem';

const CourseInfo = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { setSearchQuery } = useSearch();
  const { course, isLoadingCourses } = useSelector(
    (state: RootState) => state.courses
  );

  const handleBack = () => {
    setSearchQuery('');
    navigate(coursesPath, { replace: true });
    dispatch(clearCourse());
  };

  useEffect(() => {
    const id = location.state?.id as string;
    if (!id) return;
    dispatch(getCourseIdThunk(id));
  }, []);

  if (isLoadingCourses) return <p className="container">...loading</p>;
  if (!course) return;

  return (
    <div className="cards-wrapper container">
      <header className="info-header">
        <ButtonSimple
          text={'Back'}
          ariaLabel={'Back button'}
          cusomStyle={'back-button'}
          onClick={handleBack}
        />
        <h2>{course.title}</h2>
      </header>
      <div className="info-wrapper">
        <div className="course-info">
          <h3>Description</h3>
          <p>{course.description}</p>
        </div>
        <div className="course-info incourse-infofor-el">
          <CourseInfoItem title="ID:" renderContent={() => course.id} />
          <CourseInfoItem
            title="Duration:"
            renderContent={() => getHours(course.duration)}
          />
          <CourseInfoItem
            title="Created:"
            renderContent={() => convertDateToUTCDate(course.creationDate)}
          />
          <CourseInfoItem
            title="Authors:"
            renderContent={() => course.authors}
          />
        </div>
      </div>
    </div>
  );
};

export default CourseInfo;
