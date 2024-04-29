import React, {useRef, useEffect} from 'react';
import {search} from '../../services/backend/Backend.js';

// function (query) {
//     return search(query)
// }

const Search = () => {
    const searchRef = useRef(null);

    useEffect(() => {
        searchRef.current.focus();
    }, []);

    return (
        <div> 
            <div className="container">
                <div className="row justify-content-center mt-5">
                    <div className="col-md">
                        <div className="input-group">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Search..."
                                ref={searchRef}
                            />
                            <div className="input-group-append">
                                <button className="btn btn-primary" type="button">
                                    Search
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

    
}
export default Search;