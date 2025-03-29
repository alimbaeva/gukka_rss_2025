import ButtonSimple from '../ui/buttons/Button';
import SearchBar from './_components/SearchBar';
import './headContent.scss';

const HeadContent = () => {
  return (
    <section className="head-content-wrapper container">
      <SearchBar />
      <ButtonSimple
        text={'Add new course'}
        ariaLabe={'Add new course button'}
      />
    </section>
  );
};

export default HeadContent;
