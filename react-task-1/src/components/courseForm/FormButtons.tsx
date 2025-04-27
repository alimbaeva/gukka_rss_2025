import ButtonSimple from '../ui/buttons/Button';

const FormButtons = ({
  handleCloseForm,
  buttonText,
}: {
  handleCloseForm: () => void;
  buttonText: string;
}) => {
  return (
    <div className="buttons-form-wrapper">
      <ButtonSimple
        text="Cancel"
        ariaLabel="Cancel button"
        onClick={handleCloseForm}
      />
      <ButtonSimple
        text={buttonText}
        ariaLabel="Create course button"
        type="submit"
      />
    </div>
  );
};

export default FormButtons;
