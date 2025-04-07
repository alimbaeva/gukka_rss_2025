import ButtonSimple from '../ui/buttons/Button';

const FormButtons = ({ handleCloseForm }: { handleCloseForm: () => void }) => {
  return (
    <div className="buttons-form-wrapper">
      <ButtonSimple
        text="Cancel"
        ariaLabe="Cancel button"
        onClick={handleCloseForm}
      />
      <ButtonSimple
        text="Create Course"
        ariaLabe="Create course button"
        type="submit"
      />
    </div>
  );
};

export default FormButtons;
