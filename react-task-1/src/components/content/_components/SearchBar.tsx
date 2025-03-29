import ButtonSimple from '../../ui/buttons/Button';
import InputSimple from '../../ui/inputs/InputSimple';
import './style.scss';
import { useSearch } from '../../context/useSearch';

const SearchBar = () => {
  const { setSearchQuery, searchQuery, setIsSearch } = useSearch();

  const handleSearch = () => setIsSearch(true);

  return (
    <div className="search-bar">
      <InputSimple
        type={'text'}
        placeholder={'Search input'}
        value={searchQuery}
        ariaLabe={'Search input'}
        onChange={setSearchQuery}
      />
      <ButtonSimple
        text={'Search'}
        ariaLabe={'Search button'}
        onClick={handleSearch}
      />
    </div>
  );
};

export default SearchBar;
