import React, { useState } from 'react';
import { Button } from "antd";

import { apiGet } from '../util/config';

import ActorLayout from '../components/actor/ActorLayout';
import Layout from '../components/Layout';
import ShowLayout from '../components/movie/ShowLayout';

import Navs from '../components/Navs';



const Home = () => {
  const [input, setInput] = useState('');
  const [results, setResults] = useState(null);
  const [searchOption, setSearchOption] = useState('shows');

  const isMoviesSearch = searchOption === 'shows';

  const onSearch = () => {
    apiGet(`/search/${searchOption}?q=${input}`).then(result => {
      setResults(result);
    });
  };

  const onKeyDown = e => {
    if (e.keyCode === 13) {
      onSearch();
    }
  };

  const onRadioChange = e => {
    setSearchOption(e.target.value);
  };

  const onInChange = e => {
    setInput(e.target.value);
  };

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

  return (
      <div>
        <Layout/>
        <div className='nav-bar'>
          {/* <Navs/> */}
          <div className='searchComp'>
            <div>
              <div className='labels'>
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
