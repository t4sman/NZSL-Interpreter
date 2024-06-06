import React, { useState } from 'react';
import Navbar from '../components/navbar/Navbar'; // Correct import path for Navbar
import SearchPage from '../components/searchpage/SearchPage'; // Adjust import paths if needed
import backend from '../services/backend/Backend'; // Ensure this path is correct and inside `src`

const JohnnyPage = () => {
  const [searchResult, setSearchResult] = useState([]);
  const [learnVideos, setLearnVideos] = useState([]);
  const [learntVideos, setLearntVideos] = useState([]);

  const handleSearch = (query) => {
    if (!query) {
      setSearchResult([]); // Reset search results if query is empty
      return;
    }
    console.log('Searching for:', query);
    backend.Search(query).then(results => {
      console.log('Search Results:', results);
      setSearchResult(results || []); // Ensure results is an array
    }).catch(error => {
      console.error('Error fetching search results:', error);
    });
  };

  const handleSaveLearn = (videoInfo) => {
    console.log('Saving to Learn:', videoInfo);
    setLearnVideos(prevVideos => [...prevVideos, videoInfo]);
    alert('Video added to Learn');
  };

  const handleSaveLearnt = (videoInfo) => {
    console.log('Saving to Learnt:', videoInfo);
    setLearntVideos(prevVideos => [...prevVideos, videoInfo]);
    alert('Video added to Learnt');
  };

  return (
    <div className='gradient__bg'>
      <Navbar />
      <SearchPage 
        onSearch={handleSearch} 
        searchResult={searchResult} 
        learnVideos={learnVideos}
        learntVideos={learntVideos}
        onSaveLearn={handleSaveLearn}
        onSaveLearnt={handleSaveLearnt}
      />
    </div>
  );
};

export default JohnnyPage;
