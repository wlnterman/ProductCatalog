import React, { useCallback, useState } from 'react';
import { Input } from 'antd';
import { debounce } from 'lodash';
// import debounce from 'lodash/debounce';

const { Search } = Input;

interface SearchBarProps {
  onSearch: (value: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [value, setValue] = useState('');

   // Debounce the search function to limit the number of calls
   const debouncedSearch = useCallback(
    debounce((searchValue: string) => {
      onSearch(searchValue);
    }, 500), // Adjust the debounce delay as needed
    []
  );
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setValue(newValue);
    debouncedSearch(newValue);
  };
  
  return (
    <Search
      placeholder="Search by product name2"
      value={value}
      onChange={handleChange}
      
      allowClear
      style={{ marginBottom: 16 }}
    />
  );
};

export default SearchBar;