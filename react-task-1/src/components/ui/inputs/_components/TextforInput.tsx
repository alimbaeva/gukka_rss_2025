import type { FC } from 'react';

interface TextForInputProps {
  errorMessage?: string;
  warnText: string;
}

const TextForInput: FC<TextForInputProps> = ({ errorMessage, warnText }) => {
  return (
    <>
      {!errorMessage && <p className="warn-text">{warnText}</p>}
      {errorMessage && <p className="error-text">{`${errorMessage}`}</p>}
    </>
  );
};

export default TextForInput;
