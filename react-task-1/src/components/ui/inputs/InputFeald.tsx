import type {
  FieldErrors,
  FieldValues,
  Path,
  UseFormRegister,
} from 'react-hook-form';
import TextForInput from './_components/TextforInput';
import { getErrorMessage } from '../../../helper/getErrorMessage';

interface InputFieldProps<T extends FieldValues> {
  type: string;
  forInput: keyof T;
  label: string;
  warnText: string;
  register: UseFormRegister<T>;
  errors: FieldErrors<T>;
}

const InputField = <T extends FieldValues>({
  forInput,
  label,
  type,
  warnText,
  register,
  errors,
}: InputFieldProps<T>) => {
  return (
    <div className="input-container">
      <label htmlFor={String(forInput)} className="label">
        {label}
      </label>
      <input
        id={String(forInput)}
        type={type}
        {...register(forInput as Path<T>)}
        className="input-field"
      />
      <TextForInput
        errorMessage={getErrorMessage(errors, forInput)}
        warnText={warnText}
      />
    </div>
  );
};

export default InputField;
