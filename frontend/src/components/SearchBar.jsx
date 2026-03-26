import React, { useState, useEffect } from 'react';
import { Plus, Users, Search as SearchIcon } from 'lucide-react';

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearch(value);
  };

  return (
    <div className="search-container">
      <SearchIcon className="search-icon" size={22} />
      <input
        type="text"
        value={searchTerm}
        onChange={handleSearch}
        placeholder="Search by name, email, phone, or company..."
        className="search-input"
      />
    </div>
  );
};

export default SearchBar;
