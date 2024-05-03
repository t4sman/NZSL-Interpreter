import React, { useState } from 'react';
import { Navbar, SearchPage } from '../components';
import imageData from '../data/image';

const JonnyPage = () => {
  const [searchResult, setSearchResult] = useState(null);
  const [userImageList, setUserImageList] = useState([]);

  const handleSearch = (query) => {
    console.log('Search query:', query);

    const lowerCaseQuery = query.toLowerCase();
    if (lowerCaseQuery in imageData) {
      setSearchResult(imageData[lowerCaseQuery]);
    } else {
      setSearchResult(null);
    }
  };

  const handleAddImage = () => {
    if (searchResult) {
      setUserImageList([...userImageList, searchResult]);
    }
  };

  return (
    <div>
      <Navbar />
      <SearchPage />
    </div>
  );
};

export default JonnyPage;
