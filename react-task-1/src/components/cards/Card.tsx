import { FC } from 'react';
import ActionCard from './_components/ActionCard';
import { CardProps } from '../../types/types';
import './style.scss';

const Card: FC<CardProps> = ({
  id,
  title,
  description,
  creationDate,
  duration,
  authors,
  removeItem,
}) => {
  return (
    <div className="card-wrapper">
      <div>
        <h2 className="card-title">{title}</h2>
        <p>{description}</p>
      </div>
      <ActionCard
        id={id}
        creationDate={creationDate}
        duration={duration}
        authors={authors}
        removeItem={removeItem}
      />
    </div>
  );
};

export default Card;
