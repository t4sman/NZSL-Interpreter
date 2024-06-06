import React, { useState, useEffect } from 'react';

const SearchPage = ({ onSearch, searchResult = [], learnVideos = [], learntVideos = [], onSaveLearn, onSaveLearnt }) => {
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    console.log('Search Results:', searchResult);
  }, [searchResult]);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    console.log('Search Query:', searchQuery);
    onSearch(searchQuery);
  };

  const handleClearSearch = () => {
    setSearchQuery('');
    onSearch(''); // Reset search results
  };

  return (
    <div>
      <div className='gradient__bg' style={{ margin: '30px' }}>
        <h1>My Learning Pathway</h1>
        <form onSubmit={handleSearchSubmit}>
          <p style={{ marginBottom: '10px', textAlign: 'center' }}>Enter your desired Sign:</p>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' }}>
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              style={{ marginRight: '10px', padding: '10px', fontSize: '16px', color: 'black' }}
            />
            <button type="submit" style={{
              height: '40px',
              width: '120px',
              backgroundColor: '#2196F3',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              fontSize: '16px',
              fontWeight: 'bold',
            }}>
              Search
            </button>
            <button type="button" onClick={handleClearSearch} style={{
              height: '40px',
              width: '120px',
              backgroundColor: '#FF5733',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              fontSize: '16px',
              fontWeight: 'bold',
              marginLeft: '10px'
            }}>
              Clear
            </button>
          </div>
        </form>
        <div id="searchresults">
          {searchResult && searchResult.length > 0 ? (
            searchResult.map(result => (
              <div key={result._id} className="searchvideo" style={{ marginBottom: '20px' }}>
                <video
                  src={`https://nzsl-signbank-media-production.s3.amazonaws.com/glossvideo/${result.site_id}/${result.video_demo}`}
                  alt={result.name}
                  style={{ maxWidth: '20%', height: 'auto', marginRight: '10px' }}
                  controls
                />
                <p>{result.name}</p>
                <p>{result.maori}</p>
                <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                  <button onClick={() => onSaveLearn(result)} style={{
                    backgroundColor: '#4CAF50', // Green background
                    border: 'none',
                    color: 'white',
                    padding: '10px 20px',
                    margin: '5px',
                    cursor: 'pointer',
                    borderRadius: '4px',
                    fontSize: '14px',
                  }}>
                    Learn
                  </button>
                  <button onClick={() => onSaveLearnt(result)} style={{
                    backgroundColor: '#2196F3', // Blue background
                    border: 'none',
                    color: 'white',
                    padding: '10px 20px',
                    margin: '5px',
                    cursor: 'pointer',
                    borderRadius: '4px',
                    fontSize: '14px',
                  }}>
                    Learnt
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p></p>
          )}
        </div>
        <div style={{ margin: '30px' }}>
          <h2>My Sign List</h2>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div style={{ width: '45%' }}>
              <h3>Learn</h3>
              <ul>
                {learnVideos.map((video, index) => (
                  <li key={index}>
                    <video
                      src={`https://nzsl-signbank-media-production.s3.amazonaws.com/glossvideo/${video.site_id}/${video.video_demo}`}
                      alt={video.name}
                      style={{ maxWidth: '100%', height: 'auto' }}
                      controls
                    />
                    <p>{video.name}</p>
                    <p>{video.maori}</p>
                  </li>
                ))}
              </ul>
            </div>
            <div style={{ width: '45%' }}>
              <h3>Learnt</h3>
              <ul>
                {learntVideos.map((video, index) => (
                  <li key={index}>
                    <video
                      src={`https://nzsl-signbank-media-production.s3.amazonaws.com/glossvideo/${video.site_id}/${video.video_demo}`}
                      alt={video.name}
                      style={{ maxWidth: '100%', height: 'auto' }}
                      controls
                    />
                    <p>{video.name}</p>
                    <p>{video.maori}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
