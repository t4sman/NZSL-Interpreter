import React, { useState } from 'react';

const SearchBar = ({ onSearch, onAdd }) => {
  const [query, setQuery] = useState('');

  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    onSearch(value); // Invoke the onSearch callback with the updated query value
  };

  

  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <input
        type="text"
        placeholder="Search..."
        value={query}
        onChange={handleInputChange}
        style={{ color: 'black', marginRight: '8px' }} // Apply styles to the input field
      />
    </div>
  );
};

export default SearchBar;
