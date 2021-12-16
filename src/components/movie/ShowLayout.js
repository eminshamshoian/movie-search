// Main layout grid of movie section
import React from 'react';
import ShowCard from './ShowCard';

import { FlexGrid } from '../styled';

import IMAGE_NOT_FOUND from '../../images/not-found.png';

// Bring in the custon useShows hook created in custom-hooks.js
import { useShows } from '../../util/custom-hooks';

const ShowGrid = ({ data }) => {
  // Manage the state of starred
  const [starredShows, dispatchStarred] = useShows();

  return (
    // Place data in flex grid component
    <FlexGrid>
      {data.map(({ show }) => {
        const isStarred = starredShows.includes(show.id);
        // Map thru data and dispatch the remove or add actions from custom-hooks.js that is used to add stars to database
        const onStarClick = () => {
          if (isStarred) {
            dispatchStarred({ type: 'REMOVE', showId: show.id });
          } else {
            dispatchStarred({ type: 'ADD', showId: show.id });
          }
        };

        // Present the shoe card data inside of ShowCard component created before
        return (
          <ShowCard
            key={show.id}
            id={show.id}
            name={show.name}
            image={show.image ? show.image.medium : IMAGE_NOT_FOUND}
            summary={show.summary}
            onStarClick={onStarClick}
            isStarred={isStarred}
          />
        );
      })}
    </FlexGrid>
  );
};

export default ShowGrid;
