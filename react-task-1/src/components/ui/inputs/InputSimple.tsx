import { FC } from 'react';
import './input.scss';
import { InputProps } from '../../../types/types';

const InputSimple: FC<InputProps> = ({
  type,
  label = '',
  placeholder,
  value,
  ariaLabe,
  onChange,
}) => {
  return (
    <div className="input-container">
      <label className="input-label">
        {label}
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          className="input-field"
          aria-label={ariaLabe}
          onChange={(e) => onChange?.(e.target.value)}
        />
      </label>
    </div>
  );
};

export default InputSimple;
