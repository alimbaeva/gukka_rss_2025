import ButtonIcon from '../buttons/ButtonIcon';
import addIcon from '../../../assets/add.png';
import trashIcon from '../../../assets/Icon-Trash.svg';
import { AuthListItemType } from '../../../types/types';
import Modal from '../../modal/Modal';
import ButtonSimple from '../buttons/Button';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../store/store';
import {
  addAuthToSelect,
  removeAuthFromSelect,
} from '../../../store/slice/authorsSlice';
import { removeGlobalAuthorThunk } from '../../../store/thunks/authorsThunks';
import { WARNING_MESSAGES } from '../../../constants/textConstants';

const AuthorListItem = ({ selects, auth }: AuthListItemType) => {
  const dispatch = useDispatch<AppDispatch>();

  const [isOpenModal, setIsOpenModal] = useState(false);
  const [warningText, setWarningText] = useState('');

  const handleDeleteAuthor = () => {
    if (!selects && auth) {
      dispatch(removeGlobalAuthorThunk(auth?.id));
    } else {
      if (auth) {
        dispatch(removeAuthFromSelect(auth?.id));
      }
    }
  };

  const handleModal = () => {
    if (!selects) {
      setWarningText(WARNING_MESSAGES.DELETE_AUTHOR);
    } else {
      setWarningText(WARNING_MESSAGES.REMOVE_AUTHOR_FROM_COURSE);
    }
    setIsOpenModal(true);
  };

  const handleSelectAuth = () => {
    if (auth) dispatch(addAuthToSelect(auth));
  };

  return (
    <>
      <li className="item">
        <p>{auth?.name}</p>
        {!selects && (
          <ButtonIcon
            before={true}
            pathIcon={addIcon}
            ariaLabel="Add author"
            onClick={handleSelectAuth}
            cusomStyle="auth-icon"
          />
        )}
        <ButtonIcon
          before={true}
          pathIcon={trashIcon}
          ariaLabel="Remove author"
          onClick={handleModal}
          cusomStyle="auth-icon"
        />
      </li>
      <Modal isOpen={isOpenModal} onClose={() => setIsOpenModal(false)}>
        <div className="modal-childe">
          <p>
            {warningText}: {auth?.name} ?
          </p>
          <div className="button-wraper">
            <ButtonSimple
              text={'Cunsel'}
              ariaLabel={'Open modal'}
              onClick={() => setIsOpenModal(false)}
            />
            <ButtonSimple
              text={'Remove author'}
              ariaLabel={'Remove author'}
              onClick={handleDeleteAuthor}
            />
          </div>
        </div>
      </Modal>
    </>
  );
};

export default AuthorListItem;
