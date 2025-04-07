import ButtonSimple from '../../ui/buttons/Button';
import trashIcon from '../../../assets/Icon-Trash.svg';
import editIcon from '../../../assets/Icon-Edit.svg';
import ButtonIcon from '../../ui/buttons/ButtonIcon';
import { ActionCardProps } from '../../../types/types';
import { FC, useState } from 'react';
import { getHours } from '../../../helper/getHours';
import RenderAuth from '../../ui/renderElements/RenderAuth';
import { useNavigate } from 'react-router-dom';
import { convertDateToUTCDate } from '../../../helper/convertDate';
import Modal from '../../modal/Modal';

const ActionCard: FC<ActionCardProps> = ({
  id,
  creationDate,
  duration,
  authors,
  removeItem,
}) => {
  const navigate = useNavigate();
  const [isOpenModal, setIsOpenModal] = useState(false);

  const handleRemove = () => removeItem(id);
  const handleMoreInfo = () => {
    navigate(`/courses/${id}`, { state: { id: id } });
  };
  const handleUpdateCourse = () => {
    navigate(`/courses/${id}/edit`, { state: { id: id } });
  };

  return (
    <>
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
              Created: {convertDateToUTCDate(creationDate)}
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
              onClick={() => setIsOpenModal(true)}
              cusomStyle={'show-icon'}
            />
            <ButtonIcon
              before={true}
              pathIcon={editIcon}
              ariaLabe={'Edit card'}
              cusomStyle={'show-icon'}
              onClick={handleUpdateCourse}
            />
          </div>
        </div>
      </div>
      <Modal isOpen={isOpenModal} onClose={() => setIsOpenModal(false)}>
        <div className="modal-childe">
          <p>Do you really want to delete the course?</p>
          <div className="button-wraper">
            <ButtonSimple
              text={'Cunsel'}
              ariaLabe={'Search button'}
              onClick={() => setIsOpenModal(false)}
            />
            <ButtonSimple
              text={'Remove course'}
              ariaLabe={'Search button'}
              onClick={handleRemove}
            />
          </div>
        </div>
      </Modal>
    </>
  );
};

export default ActionCard;
