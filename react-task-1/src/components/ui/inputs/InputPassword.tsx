import { useState } from 'react';
import type {
  FieldErrors,
  FieldValues,
  Path,
  UseFormRegister,
} from 'react-hook-form';
import TextforInput from './_components/TextforInput';
import ButtonIcon from '../buttons/ButtonIcon';
import showIcon from '../../../assets/eye_show.svg';
import hidenIcon from '../../../assets/eye_hide.svg';

interface InputPasswordProps<T extends FieldValues> {
  forInput: keyof T;
  label: string;
  warnText: string;
  register: UseFormRegister<T>;
  errors: FieldErrors<T>;
}

const InputPassword = <T extends FieldValues>({
  forInput,
  label,
  warnText,
  register,
  errors,
}: InputPasswordProps<T>) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () =>
    setIsPasswordVisible((prevState) => !prevState);
  return (
    <div className="input-container">
      <label htmlFor={String(forInput)} className="label">
        {label}
      </label>
      <div className="password-input-wrapper">
        <input
          id={String(forInput)}
          type={isPasswordVisible ? 'text' : 'password'}
          {...register(forInput as Path<T>)}
          className="input-field"
        />
        <ButtonIcon
          before={true}
          pathIcon={isPasswordVisible ? showIcon : hidenIcon}
          ariaLabe={'Trash card'}
          onClick={togglePasswordVisibility}
          cusomStyle={'password-icon'}
        />
      </div>
      <TextforInput
        errors={errors}
        warnText={warnText}
        forInput={String(forInput)}
      />
    </div>
  );
};

export default InputPassword;
