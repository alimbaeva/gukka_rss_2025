import { FC } from 'react';
import { ButtonIconProps } from '../../../types/types';

const ButtonIcon: FC<ButtonIconProps> = ({
  before = false,
  after = false,
  pathIcon,
  text = '',
  type = 'button',
  cusomStyle,
  ariaLabe,
  onClick,
}) => {
  return (
    <button
      type={type}
      className={`buttonSimple ${cusomStyle}`}
      onClick={onClick}
      aria-label={ariaLabe}
    >
      {before && <img src={pathIcon} alt={`${ariaLabe} icon`} width="15px" />}
      {text && text}
      {after && <img src={pathIcon} alt={`${ariaLabe} icon`} width="15px" />}
    </button>
  );
};

export default ButtonIcon;
