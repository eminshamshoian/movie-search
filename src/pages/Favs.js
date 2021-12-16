// Favs page that displays all the favorites of a user
import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';

// Cal the hooks for showing and saving movies
import { useShows } from '../util/custom-hooks';

// Call the api
import { apiGet } from '../util/config';
import ShowLayout from '../components/movie/ShowLayout';

const Starred = () => {
  // Create state tracking to track stars and if a show is loading or giving error
  const [starred] = useShows();

  const [shows, setShows] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Place the useEffect hook to add the stars movies to the page based on certain components
  useEffect(() => {
    if (starred && starred.length > 0) {
      const promises = starred.map(showId => apiGet(`/shows/${showId}`));

      // Returns a promise and maps the show data while setting shows and loading information
      Promise.all(promises)
        .then(apiData => apiData.map(show => ({ show })))
        .then(results => {
          setShows(results);
          setIsLoading(false);
        })
        .catch(err => {
          setError(err.message);
          setIsLoading(false);
        });
    } else {
      setIsLoading(false);
    }
  }, [starred]);

  return (
    // Use the layout and place the shows in there if any favories are present
    <Layout>
      {isLoading && <div>Shows are still loading</div>}
      {error && <div>Error occured: {error}</div>}
      {!isLoading && !shows && <div>No shows were added</div>}
      {!isLoading && !error && shows && <ShowLayout data={shows} />}
    </Layout>
  );
};

export default Starred;
