import { FC } from 'react';
import { ButtonSimpleProps } from '../../../types/types';
import './button.scss';

const ButtonSimple: FC<ButtonSimpleProps> = ({
  text,
  type = 'button',
  cusomStyle,
  ariaLabe,
  disabled = false,
  onClick,
}) => {
  return (
    <button
      data-testid={text}
      disabled={disabled}
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
