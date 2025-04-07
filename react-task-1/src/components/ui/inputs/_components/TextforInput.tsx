import type { FC } from 'react';
import type { FieldErrors } from 'react-hook-form';

interface TextforInputProps {
  errors: FieldErrors;
  forInput: string;
  warnText: string;
}

const TextforInput: FC<TextforInputProps> = ({
  errors,
  warnText,
  forInput,
}) => {
  return (
    <>
      {!errors[forInput] && <p className="warn-text">{warnText}</p>}
      {errors[forInput] && (
        <p className="error-text">{`${errors[forInput]?.message}`}</p>
      )}
    </>
  );
};

export default TextforInput;
