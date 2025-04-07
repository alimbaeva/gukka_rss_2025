import ButtonIcon from '../buttons/ButtonIcon';
import addIcon from '../../../assets/add.png';
import trashIcon from '../../../assets/Icon-Trash.svg';
import { AuthListItemType } from '../../../types/types';
import { useSearch } from '../../context/useSearch';
import Modal from '../../modal/Modal';
import ButtonSimple from '../buttons/Button';
import { useState } from 'react';

const AuthListItem = ({ selects, auth }: AuthListItemType) => {
  const { removeGlobalAuth, removeSelectAuth, addAuth } = useSearch();
  const [isOpenModal, setIsOpenModal] = useState(false);

  const handleTrashauth = () => {
    if (!selects && auth) {
      removeGlobalAuth(auth?.id);
    } else {
      if (auth) removeSelectAuth(auth?.id);
    }
  };

  const handleSelectAuth = () => {
    if (auth) addAuth(auth);
  };

  return (
    <>
      <li className="item">
        <p>{auth?.name}</p>
        {!selects && (
          <ButtonIcon
            before={true}
            pathIcon={addIcon}
            ariaLabe="Add author"
            onClick={handleSelectAuth}
            cusomStyle="auth-icon"
          />
        )}
        <ButtonIcon
          before={true}
          pathIcon={trashIcon}
          ariaLabe="Remove author"
          onClick={() => setIsOpenModal(true)}
          cusomStyle="auth-icon"
        />
      </li>
      <Modal isOpen={isOpenModal} onClose={() => setIsOpenModal(false)}>
        <div className="modal-childe">
          <p>Do you really want to delete the author: {auth?.name} ?</p>
          <div className="button-wraper">
            <ButtonSimple
              text={'Cunsel'}
              ariaLabe={'Search button'}
              onClick={() => setIsOpenModal(false)}
            />
            <ButtonSimple
              text={'Remove author'}
              ariaLabe={'Search button'}
              onClick={handleTrashauth}
            />
          </div>
        </div>
      </Modal>
    </>
  );
};

export default AuthListItem;
