import { CSSProperties, ReactNode } from 'react';
import './modal.scss';
import ButtonIcon from '../ui/buttons/ButtonIcon';
import closeIcone from '../../assets/close.svg';

interface ModalProps {
  customStyle?: CSSProperties;
  children: ReactNode;
  onClose: () => void;
  isOpen: boolean;
}

const Modal = ({
  customStyle,
  children,
  onClose,
  isOpen = false,
}: ModalProps) => {
  if (!isOpen) return;
  return (
    <section className="modal-wrapper" onClick={onClose}>
      <div className={`modal-inner ${customStyle}`}>
        <header className="header-modal">
          <ButtonIcon
            before={true}
            pathIcon={closeIcone}
            ariaLabe={'close'}
            onClick={onClose}
            cusomStyle={'close-icon'}
          />
        </header>
        {children}
      </div>
    </section>
  );
};

export default Modal;
