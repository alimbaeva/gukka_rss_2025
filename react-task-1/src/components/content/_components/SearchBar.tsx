import ButtonSimple from '../../ui/buttons/Button';
import InputSimple from '../../ui/inputs/InputSimple';
import './style.scss';
import { useSearch } from '../../context/useSearch';
import { ariaLabels, buttonTexts } from '../../../constants/textConstants';

const SearchBar = () => {
  const { setSearchQuery, searchQuery, setTriggerSearchMode } = useSearch();

  const handleSearch = () => setTriggerSearchMode(true);

  return (
    <div className="search-bar">
      <InputSimple
        type={'text'}
        placeholder={'Search input'}
        value={searchQuery}
        ariaLabel={'Search input'}
        onChange={setSearchQuery}
      />
      <ButtonSimple
        text={buttonTexts.searchButtonText}
        ariaLabel={ariaLabels.searchButtonText}
        onClick={handleSearch}
      />
    </div>
  );
};

export default SearchBar;
