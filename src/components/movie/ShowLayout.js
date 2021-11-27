import React from 'react';
import ShowCard from './ShowCard';

import { FlexGrid } from '../styled';

import IMAGE_NF from '../../images/not-found.png';
import { useShows } from '../../util/custom-hooks';

const ShowLayout = ({ data }) => {
  const [favShows, dispatchFavs] = useShows();
  return (
    <FlexGrid>
      {data.map(({ show }) => {
        const isStarred = favShows.includes(show.id);

        const onFavClick = () => {
          if (isStarred) {
            dispatchFavs({ type: 'REMOVE', showId: show.id });
          } else {
            dispatchFavs({ type: 'ADD', showId: show.id });
          }
        };

        return (
          <ShowCard
            key={show.id}
            id={show.id}
            name={show.name}
            image={show.image ? show.image.medium : IMAGE_NF}
            summary={show.summary}
            onFavClick={onFavClick}
            isStarred={isStarred}
          />
        );
      })}
    </FlexGrid>
  );
};

export default ShowLayout;
