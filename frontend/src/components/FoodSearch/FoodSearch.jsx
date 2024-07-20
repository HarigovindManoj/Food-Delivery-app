import React, { useContext } from 'react';
import './FoodSearch.css';
import { StoreContext } from '../../context/StoreContext';
import FoodItem from '../FoodItem/FoodItem';

const FoodSearch = () => {
  const {
    handleSearch,
    searchTerm,
    setSearchTerm,
    searchResults,
    loading,
    error
  } = useContext(StoreContext);

  return (
    <div>
      <div className="searchbar">
        <form className='form' onSubmit={handleSearch}>
          <div className="text-bar">
            <input className='search-bar-long'
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search for food..."
            />
            <button className="search-btn" type="submit">Search</button>
          </div>
        </form>
      </div>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <div className="food-display" id="food-display">
        <div className="food-display-list">
          {searchResults.map((item, index) => (
            <FoodItem
              key={item._id}
              id={item._id}
              name={item.name}
              description={item.description}
              price={item.price}
              image={item.image}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FoodSearch;
