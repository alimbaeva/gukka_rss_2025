import { useEffect, useState } from 'react';
import { getHours } from '../../helper/getHours';
import ButtonSimple from '../ui/buttons/Button';
import RenderAuth from '../ui/renderElements/RenderAuth';
import { CardProps } from '../../types/types';
import './courseInfo.scss';
import { useSearch } from '../context/useSearch';
import { useLocation, useNavigate } from 'react-router-dom';
import { getCourse } from '../../helper/getCourse';
import { convertDateToUTCDate } from '../../helper/convertDate';

const CourseInfo = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { setSearchQuery } = useSearch();
  const [course, setCourse] = useState<CardProps | null>(null);

  const handleBack = () => {
    setSearchQuery('');
    navigate('/courses', { replace: true });
  };

  useEffect(() => {
    const fetchCourse = async () => {
      const id = location.state?.id as string;
      if (!id) return;
      try {
        const data = await getCourse(id);
        if (data) setCourse(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchCourse();
  }, []);

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
