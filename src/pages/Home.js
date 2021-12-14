import React, { useState } from 'react';
import ActorLayout from '../components/actor/ActorLayout';
import Layout from '../components/Layout';
import ShowLayout from '../components/movie/ShowLayout';
import { apiGet } from '../util/config';

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

  const searchBarStyle = {
    "display": "block",
    "margin": "10px auto",
    "width": "250px",
    "padding": "10px"
  }

  const styles = {
    "margin": "10px auto",
    "padding": "5px"
  }

  const btnStyle = {
    "margin-bottom": "15px",
    "padding": "5px",
    "font-size": "12pt"
  }

  return (
    <Layout>
      <input 
        style={searchBarStyle}
        type="text"
        placeholder="Search"
        onChange={onInChange}
        onKeyDown={onKeyDown}
        value={input}
      />
      <div style={styles}>
        <label htmlFor="shows-search" style={{"padding": "0 7px"}}>
          Movies
          <input
            id="shows-search"
            type="radio"
            value="shows"
            checked={isMoviesSearch}
            onChange={onRadioChange}
          />
        </label>

        <label htmlFor="actors-search" style={{"padding": "0 7px"}}>
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
      <button type="button" onClick={onSearch} style={btnStyle}>
        Search
      </button>
      {movieResult()}
    </Layout>
  );
};

export default Home;
