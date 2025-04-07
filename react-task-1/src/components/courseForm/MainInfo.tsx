import { FieldErrors, UseFormRegister, FieldValues } from 'react-hook-form';
import Textarea from '../ui/inputs/Textarea';
import InputField from '../ui/inputs/InputFeald';

interface MainInfoProps<T extends FieldValues> {
  register: UseFormRegister<T>;
  errors: FieldErrors<T>;
}

const MainInfo = <T extends FieldValues>({
  register,
  errors,
}: MainInfoProps<T>) => (
  <div className="item-form">
    <h2>Main Info</h2>
    <InputField
      forInput="title"
      label="Title"
      type="text"
      warnText="Enter title course"
      register={register}
      errors={errors}
    />
    <Textarea
      forInput="description"
      label="Description"
      warnText="Enter description course"
      register={register}
      errors={errors}
    />
  </div>
);

export default MainInfo;
