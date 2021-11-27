import React, { useState } from 'react';
import Layout from '../components/Layout';
import { apiGet } from '../util/config';

const Home = () => {
  const [input, setInput] = useState('');
  const [results, setResults] = useState(null);
  const [searchOption, setSearchOption] = useState('movies');

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

  console.log(searchOption);

  const onInChange = e => {
    setInput(e.target.value);
  };

  const movieResult = () => {
    if (results && results.length === 0) {
      return <div>No results</div>;
    }

    if (results && results.length > 0) {
      return results[0].show
        ? results.map(item => <div key={item.show.id}>{item.show.name}</div>)
        : results.map(item => (
            <div key={item.person.id}>{item.person.name}</div>
          ));
    }

    return null;
  };

  return (
    <Layout>
      <input
        type="text"
        placeholder="Search"
        onChange={onInChange}
        onKeyDown={onKeyDown}
        value={input}
      />
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
      <button type="button" onClick={onSearch}>
        Search
      </button>
      {movieResult()}
    </Layout>
  );
};

export default Home;
