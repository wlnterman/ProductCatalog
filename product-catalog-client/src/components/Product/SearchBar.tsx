import React from 'react';
import { Input } from 'antd';

const { Search } = Input;

interface SearchBarProps {
  onSearch: (value: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  return (
    <Search
      placeholder="Search by product name"
      onChange={(e) => onSearch(e.target.value)}
      style={{ marginBottom: 16 }}
    />
  );
};

export default SearchBar;