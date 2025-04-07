import {
  FieldErrors,
  UseFormRegister,
  FieldValues,
  UseFormResetField,
} from 'react-hook-form';
import InputField from '../ui/inputs/InputFeald';
import ButtonSimple from '../ui/buttons/Button';
import { useSearch } from '../context/useSearch';
import { CourseFormData } from '../../types/types';

interface AuthorsFormProps<T extends FieldValues> {
  register: UseFormRegister<T>;
  errors: FieldErrors<T>;
  authorName: string;
  resetField: UseFormResetField<CourseFormData>;
}

const AuthorsForm = <T extends FieldValues>({
  register,
  errors,
  authorName,
  resetField,
}: AuthorsFormProps<T>) => {
  const { createAuth } = useSearch();

  const handleCreateAuth = () => {
    createAuth(authorName);
    resetField('authorName');
  };

  return (
    <div className="auth-form">
      <h2>Authors</h2>
      <div className="auth-input">
        <InputField
          forInput="authorName"
          label="Author name"
          type="text"
          warnText="Enter author name"
          register={register}
          errors={errors}
        />
        <ButtonSimple
          text="Create Author"
          ariaLabe="Create Author"
          onClick={handleCreateAuth}
        />
      </div>
    </div>
  );
};

export default AuthorsForm;
