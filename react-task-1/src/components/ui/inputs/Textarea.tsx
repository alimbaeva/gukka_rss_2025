import type {
  FieldErrors,
  FieldValues,
  Path,
  UseFormRegister,
} from 'react-hook-form';
import TextforInput from './_components/TextforInput';

interface InputFieldProps<T extends FieldValues> {
  forInput: keyof T;
  label: string;
  warnText: string;
  register: UseFormRegister<T>;
  errors: FieldErrors<T>;
}

const Textarea = <T extends FieldValues>({
  forInput,
  label,
  warnText,
  register,
  errors,
}: InputFieldProps<T>) => {
  return (
    <div className="input-container">
      <label htmlFor={String(forInput)} className="label">
        {label}
      </label>
      <textarea
        id={String(forInput)}
        {...register(forInput as Path<T>)}
        className="input-field"
      />
      <TextforInput
        errors={errors}
        warnText={warnText}
        forInput={String(forInput)}
      />
    </div>
  );
};

export default Textarea;
