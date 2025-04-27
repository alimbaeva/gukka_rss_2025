import { FC } from 'react';
import { ButtonSimpleProps } from '../../../types/types';
import './button.scss';

const ButtonSimple: FC<ButtonSimpleProps> = ({
  text,
  type = 'button',
  cusomStyle,
  ariaLabel,
  disabled = false,
  onClick,
}) => {
  return (
    <button
      data-testid={text}
      disabled={disabled}
      type={type}
      className={`buttonSimple ${cusomStyle}`}
      aria-label={ariaLabel}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default ButtonSimple;
