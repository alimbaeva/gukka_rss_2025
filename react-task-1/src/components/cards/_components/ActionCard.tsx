import ButtonSimple from '../../ui/buttons/Button';
import trashIcon from '../../../assets/Icon-Trash.svg';
import editIcon from '../../../assets/Icon-Edit.svg';
import ButtonIcon from '../../ui/buttons/ButtonIcon';
import { ActionCardProps } from '../../../types/types';
import { FC } from 'react';
import { getHours } from '../../../helper/getHours';
import RenderAuth from '../../ui/renderElements/RenderAuth';
import { useSearch } from '../../context/useSearch';

const ActionCard: FC<ActionCardProps> = ({
  id,
  creationDate,
  duration,
  authors,
  removeItem,
}) => {
  const { setMoreInfoId } = useSearch();

  const handleRemove = () => removeItem(id);
  const handleMoreInfo = () => setMoreInfoId(id);

  return (
    <div className="card-action-wrapper">
      <div className="card-action-infor">
        <p>
          <span className="span authors-container">
            Authors: <RenderAuth authors={authors} />
          </span>
        </p>
        <p>
          <span className="span">Duration: {getHours(duration)} hours</span>
        </p>
        <p>
          <span className="span">
            Created: {creationDate.replace(/\//g, '.')}
          </span>
        </p>
      </div>
      <div className="buttons-wrapper">
        <ButtonSimple
          text={'Show course'}
          ariaLabe={'Show Course button'}
          cusomStyle={'show-button'}
          onClick={handleMoreInfo}
        />
        <div className="card-actions">
          <ButtonIcon
            before={true}
            pathIcon={trashIcon}
            ariaLabe={'Trash card'}
            onClick={handleRemove}
            cusomStyle={'show-icon'}
          />
          <ButtonIcon
            before={true}
            pathIcon={editIcon}
            ariaLabe={'Edit card'}
            cusomStyle={'show-icon'}
          />
        </div>
      </div>
    </div>
  );
};

export default ActionCard;
