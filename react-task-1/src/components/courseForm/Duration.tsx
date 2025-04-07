import {
  FieldErrors,
  UseFormRegister,
  FieldValues,
  Path,
} from 'react-hook-form';
import { getHours } from '../../helper/getHours';
import TextforInput from '../ui/inputs/_components/TextforInput';

interface DurationProps<T extends FieldValues> {
  register: UseFormRegister<T>;
  errors: FieldErrors<T>;
  descriptionValue: number;
}

const Duration = <T extends FieldValues>({
  register,
  errors,
  descriptionValue,
}: DurationProps<T>) => {
  return (
    <div className="item-form">
      <h2>Duration</h2>
      <div className="duration">
        <div className="input-container">
          <label htmlFor={'duration'} className="label">
            Duration
          </label>
          <input
            id={'duration'}
            type="number"
            {...register('duration' as Path<T>, { valueAsNumber: true })}
            className="input-field"
          />
          <TextforInput
            errors={errors}
            warnText={'warnText'}
            forInput={'duration'}
          />
        </div>
        <p>
          <span>
            {descriptionValue ? getHours(Number(descriptionValue)) : '00:00'}
          </span>{' '}
          hours
        </p>
      </div>
    </div>
  );
};

export default Duration;
