// Home page of the application
import React, { useState } from 'react';
import { Button } from 'antd';

// Give an API call
import { apiGet } from '../util/config';

import ActorLayout from '../components/actor/ActorLayout';
import Layout from '../components/Layout';
import ShowLayout from '../components/movie/ShowLayout';

const Home = () => {
  // Keep track of state of input options such as radio button and search input as well as results
  const [input, setInput] = useState('');
  const [results, setResults] = useState(null);
  const [searchOption, setSearchOption] = useState('shows');

  const isMoviesSearch = searchOption === 'shows';

  // Create function to hit the api as soon as search button or enter key is pressed
  const onSearch = () => {
    apiGet(`/search/${searchOption}?q=${input}`).then(result => {
      setResults(result);
    });
  };

  // Map enter key to onSearch()
  const onKeyDown = e => {
    if (e.keyCode === 13) {
      onSearch();
    }
  };

  // Set whether to use movie search or actor search
  const onRadioChange = e => {
    setSearchOption(e.target.value);
  };

  // Set the input changes of search bar when typed
  const onInChange = e => {
    setInput(e.target.value);
  };

  // Map movie results
  const movieResult = () => {
    if (results && results.length === 0) {
      return <div>No results</div>;
    }

    if (results && results.length > 0) {
      return results[0].show ? (
        <ShowLayout data={results} />
      ) : (
        <ActorLayout data={results} />
      );
    }

    return null;
  };

  // place info on proper places on page
  return (
    <div>
      <Layout />
      <div className="nav-bar">
        {/* <Navs/> */}
        <div className="searchComp">
          <div>
            <div className="labels">
              <div>
                <label htmlFor="shows-search">
                  Movies
                  <input
                    id="shows-search"
                    type="radio"
                    value="shows"
                    checked={isMoviesSearch}
                    onChange={onRadioChange}
                  />
                </label>
              </div>
              <div>
                <label htmlFor="actors-search">
                  Actors
                  <input
                    id="actors-search"
                    type="radio"
                    value="people"
                    checked={!isMoviesSearch}
                    onChange={onRadioChange}
                  />
                </label>
              </div>
            </div>
            <input
              type="text"
              className="searchBar"
              placeholder="Search"
              onChange={onInChange}
              onKeyDown={onKeyDown}
              value={input}
            />
          </div>
          <Button type="primary" onClick={onSearch}>
            Search
          </Button>
        </div>
      </div>
      {movieResult()}
    </div>
  );
};

export default Home;
