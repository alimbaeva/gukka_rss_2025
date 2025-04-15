import { useEffect } from 'react';
import { getHours } from '../../helper/getHours';
import ButtonSimple from '../ui/buttons/Button';
import RenderAuth from '../ui/renderElements/RenderAuth';
import './courseInfo.scss';
import { useSearch } from '../context/useSearch';
import { useLocation, useNavigate } from 'react-router-dom';
import { convertDateToUTCDate } from '../../helper/convertDate';
import { getCourseIdThunk } from '../../store/thunks/coursesThunks';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';
import { clearCourse } from '../../store/slice/coursesSlice';
import { coursesPath } from '../../constants/pathConstants';

const CourseInfo = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { setSearchQuery } = useSearch();
  const { course, isLoadingCourses } = useSelector(
    (state: RootState) => state.coursesReducer
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

  if (isLoadingCourses) return <p className="container">...louding</p>;
  if (!course) return;

  return (
    <div className="cards-wrapper container">
      <header className="info-header">
        <ButtonSimple
          text={'Back'}
          ariaLabe={'Back button'}
          cusomStyle={'back-button'}
          onClick={handleBack}
        />
        <h2>{course.title}</h2>
      </header>
      <div className="info-wrapper">
        <div className="infor">
          <h3>Description</h3>
          <p>{course.description}</p>
        </div>
        <div className="infor infor-el">
          <p className="item">
            <span>ID:</span>
            <span className="sub-description">{course.id}</span>
          </p>
          <p className="item">
            <span>Duration:</span>
            <span className="sub-description">
              {getHours(course.duration)} hours
            </span>
          </p>
          <p className="item">
            <span>Created:</span>
            <span className="sub-description">
              {convertDateToUTCDate(course.creationDate)}
            </span>
          </p>
          <p className="item">
            <span>Authors:</span>
            <span className="sub-description">
              <RenderAuth authors={course.authors} />
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default CourseInfo;
