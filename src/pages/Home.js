import React, { useState } from 'react';
import Layout from '../components/Layout';

const Home = () => {
  const [input, setInput] = useState('');

  const onSearch = () => {
    // https://api.tvmaze.com/search/shows?q=girls
    fetch(`https://api.tvmaze.com/search/shows?q=${input}`)
      .then(r => r.json())
      .then(result => {
        console.log(result);
      });
  };

  const onKeyDown = e => {
    if (e.keyCode === 13) {
      onSearch();
    }
  };

  const onInChange = e => {
    setInput(e.target.value);
  };

  return (
    <Layout>
      <input
        type="text"
        onChange={onInChange}
        onKeyDown={onKeyDown}
        value={input}
      />
      <button type="button" onClick={onSearch}>
        Search
      </button>
    </Layout>
  );
};

export default Home;
