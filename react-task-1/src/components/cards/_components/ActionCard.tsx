import ButtonSimple from '../../ui/buttons/Button';
import trashIcon from '../../../assets/Icon-Trash.svg';
import editIcon from '../../../assets/Icon-Edit.svg';
import ButtonIcon from '../../ui/buttons/ButtonIcon';
import { ActionCardProps } from '../../../types/types';
import { FC, useState } from 'react';
import { getHours } from '../../../helper/getHours';
import AuthorsBlock from '../../ui/renderElements/AuthorsBlock';
import { useNavigate } from 'react-router-dom';
import { convertDateToUTCDate } from '../../../helper/convertDate';
import Modal from '../../modal/Modal';
import { routes } from '../../../helper/routes';
import { ariaLabels, buttonTexts } from '../../../constants/textConstants';

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
    navigate(routes.courseDetails(id), { state: { id } });
  };
  const handleUpdateCourse = () => {
    navigate(routes.editCourse(id), { state: { id } });
  };

  return (
    <>
      <div className="card-action-wrapper">
        <div className="card-action-infor">
          <p>
            <span className="span authors-container">
              Authors: <AuthorsBlock authors={authors} />
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
            text={buttonTexts.showCourse}
            ariaLabel={ariaLabels.showCourseBtn}
            cusomStyle="show-button"
            onClick={handleMoreInfo}
          />
          <div className="card-actions">
            <ButtonIcon
              before
              pathIcon={trashIcon}
              ariaLabel={ariaLabels.trashBtn}
              onClick={() => setIsOpenModal(true)}
              cusomStyle="show-icon"
            />
            <ButtonIcon
              before={true}
              pathIcon={editIcon}
              ariaLabel={ariaLabels.editBtn}
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
              text={buttonTexts.cancel}
              ariaLabel={ariaLabels.cancelBtn}
              onClick={() => setIsOpenModal(false)}
            />
            <ButtonSimple
              text={buttonTexts.removeCourse}
              ariaLabel={ariaLabels.confirmBtn}
              onClick={handleRemove}
            />
          </div>
        </div>
      </Modal>
    </>
  );
};

export default ActionCard;
