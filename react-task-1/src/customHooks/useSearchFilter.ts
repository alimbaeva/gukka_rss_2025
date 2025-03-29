import { useState, useEffect, useCallback } from 'react';
import { CoursesListType } from '../types/types';

interface UseSearchFilterProps {
  searchQuery: string;
  isSearch: boolean;
  courseData: CoursesListType[];
}

interface DataType {
  empty: false | string;
  data: CoursesListType[];
}

const emptyText = 'Nothing was found in your search.';

const useSearchFilter = ({
  searchQuery,
  isSearch,
  courseData,
}: UseSearchFilterProps) => {
  const [searchData, setSearchData] = useState<DataType>({
    empty: false,
    data: [],
  });

  const search = useCallback(() => {
    const text = searchQuery.toLowerCase();
    const filteredData = courseData.filter(
      ({ title, description }) =>
        title.toLowerCase().includes(text) ||
        description.toLowerCase().includes(text)
    );

    setSearchData({
      empty: filteredData.length ? false : emptyText,
      data: filteredData,
    });
  }, [searchQuery, courseData]);

  useEffect(() => {
    if (isSearch) {
      search();
    } else {
      setSearchData({ empty: false, data: [] });
    }
  }, [isSearch, search]);

  return searchData;
};

export default useSearchFilter;
