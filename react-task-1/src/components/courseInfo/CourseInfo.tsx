import { FC } from 'react';
import { getHours } from '../../helper/getHours';
import ButtonSimple from '../ui/buttons/Button';
import RenderAuth from '../ui/renderElements/RenderAuth';
import { CardProps } from '../../types/types';
import './courseInfo.scss';
import { useSearch } from '../context/useSearch';

const CourseInfo: FC<CardProps> = ({
  id,
  title,
  description,
  creationDate,
  duration,
  authors,
}) => {
  const { setMoreInfoId, setSearchQuery } = useSearch();

  const handleBack = () => {
    setMoreInfoId('');
    setSearchQuery('');
  };

  return (
    <div className="cards-wrapper container">
      <header className="info-header">
        <ButtonSimple
          text={'Back'}
          ariaLabe={'Back button'}
          cusomStyle={'back-button'}
          onClick={handleBack}
        />
        <h2>{title}</h2>
      </header>
      <div className="info-wrapper">
        <div className="infor">
          <h3>Description</h3>
          <p>{description}</p>
        </div>
        <div className="infor infor-el">
          <p className="item">
            <span>ID:</span>
            <span className="sub-description">{id}</span>
          </p>
          <p className="item">
            <span>Duration:</span>
            <span className="sub-description">{getHours(duration)} hours</span>
          </p>
          <p className="item">
            <span>Created:</span>
            <span className="sub-description">
              {creationDate.replace(/\//g, '.')}
            </span>
          </p>
          <p className="item">
            <span>Authors:</span>
            <span className="sub-description">
              <RenderAuth authors={authors} />
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default CourseInfo;
