import { FC } from 'react';
import { ButtonIconProps } from '../../../types/types';

const ButtonIcon: FC<ButtonIconProps> = ({
  before = false,
  after = false,
  pathIcon,
  text = '',
  type = 'button',
  cusomStyle,
  ariaLabel,
  onClick,
}) => {
  return (
    <button
      data-testid={ariaLabel}
      type={type}
      className={`buttonSimple ${cusomStyle}`}
      onClick={onClick}
      aria-label={ariaLabel}
    >
      {before && <img src={pathIcon} alt={`${ariaLabel} icon`} width="15px" />}
      {text && text}
      {after && <img src={pathIcon} alt={`${ariaLabel} icon`} width="15px" />}
    </button>
  );
};

export default ButtonIcon;
