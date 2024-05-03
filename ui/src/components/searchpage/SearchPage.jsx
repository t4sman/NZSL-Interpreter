import React, { useState } from 'react';
import { SearchBar, Navbar } from '..';
import imageData from '../../data/image';
const backend = require('../../services/backend/Backend');

const SearchPage = () => {
  const [searchResult, setSearchResult] = useState(null);
  const [userImageList, setUserImageList] = useState([]);

  const handleSearch = (query) => {

    let results = backend.Search(query);
    console.log('Search query:', query);
    console.log(results)

    

    results.then((response) => {
      const displaysearch = document.getElementById('searchresults');
    
      displaysearch.innerHTML = '';
    
      if (response.length > 0) {
        response.forEach(result => {
          displaysearch.innerHTML +=  `<div class="searchvideo">
                                          <video src="https://nzsl-signbank-media-production.s3.amazonaws.com/glossvideo/${result.site_id}/${result.video_demo}" alt="${result.name}" style="max-width: 20%; height: auto; margin-right: 10px;" controls></video>
                                          <p>${result.name}</p>
                                          <p>${result.maori}</p>
                                          <br>
                                      </div>`;
        });
      } else {
        displaysearch.innerHTML = '<p>No results found</p>';
      }
    });
  };



  const handleAddImage = () => {
    if (searchResult) {
      setUserImageList([...userImageList, searchResult]);
    }
  };

  return (
    <div>
      <div className='gradient__bg' style={{margin: '30px'}}>
        <h1>My Learning Pathway</h1>

        
        <p style={{ marginBottom: '10px', textAlign: 'center' }}>Enter your desired Sign:</p>

        
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' }}>
          <div style={{ marginRight: '10px' }}>
            <SearchBar onSearch={handleSearch} />
          </div>
          {/* <button
            onClick={handleAddImage}
            style={{
              height: '40px',
              width: '120px',
              backgroundColor: 'transparent',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              fontSize: '16px',
              fontWeight: 'bold',
            }}
          >
            Add Sign
          </button> */}
        </div>

        
        <div id="searchresults">
        </div>

        {/* Display user image list */}
        <h2>My Sign List</h2>
        <ul>
          {userImageList.map((image, index) => (
            <li key={index}>
              <img
                src={image}
                alt={`User-added object ${index + 1}`}
                style={{ maxWidth: '18%', height: 'auto' }}
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SearchPage;
