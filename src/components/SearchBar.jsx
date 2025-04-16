import React from 'react';

    function SearchBar({ onSearch }) {
      const [searchTerm, setSearchTerm] = React.useState('');

      const handleChange = (event) => {
        setSearchTerm(event.target.value);
      };

      const handleSubmit = (event) => {
        event.preventDefault();
        onSearch(searchTerm);
      };

      return (
        <form onSubmit={handleSubmit} className="search-bar">
          <input
            type="text"
            placeholder="Search for a movie..."
            value={searchTerm}
            onChange={handleChange}
          />
          <button type="submit">
            <i className="bi bi-search"></i>
          </button>
        </form>
      );
    }

    export default SearchBar;
