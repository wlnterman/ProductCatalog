import React, { useState } from 'react';
import { Input } from 'antd';

const { Search } = Input;

interface SearchBarProps {
  onSearch: (value: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [value, setValue] = useState('');

  const handleSearch = () => {
    console.log("1231231231")
    console.log(value);
    onSearch(value);
  };
  
  return (
    <Search
      placeholder="Search by product name2"
      value={value}
      //onChange={(e) => onSearch(e.target.value)}
      onChange={(e) => setValue(e.target.value)}
      onSearch={handleSearch}
      enterButton 
      allowClear
      style={{ marginBottom: 16 }}
    />
  );
};

export default SearchBar;