import { FC } from 'react';
import { ButtonSimpleProps } from '../../../types/types';
import './button.scss';

const ButtonSimple: FC<ButtonSimpleProps> = ({
  text,
  type = 'button',
  cusomStyle,
  ariaLabe,
  onClick,
}) => {
  return (
    <button
      type={type}
      className={`buttonSimple ${cusomStyle}`}
      aria-label={ariaLabe}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default ButtonSimple;
