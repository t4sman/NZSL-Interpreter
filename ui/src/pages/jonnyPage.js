import React, { useState } from 'react';
import { SearchBar, Navbar } from '../components';
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
      <div className='gradient__bg'>
        <h1>My Learning Pathway</h1>

        
        <p style={{ marginBottom: '10px', textAlign: 'center' }}>Enter your desired image:</p>

        
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' }}>
          <div style={{ marginRight: '10px' }}>
            <SearchBar onSearch={handleSearch} />
          </div>
          <button
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
            Add Image
          </button>
        </div>

        
        <div>
          {searchResult ? (
            <img src={searchResult} alt="Search Result" style={{ maxWidth: '18%', height: 'auto' }} />
          ) : (
            <p style={{ textAlign: 'center' }}>No image found. Please enter a valid search term.</p>
          )}
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

export default JonnyPage;
