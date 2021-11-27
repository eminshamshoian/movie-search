import React from 'react';
import ShowCard from './ShowCard';

import IMAGE_NF from '../../images/not-found.png';

const ShowLayout = ({ data }) => {
  return (
    <div>
      {data.map(({ show }) => (
        <ShowCard
          key={show.id}
          id={show.id}
          name={show.name}
          image={show.image ? show.image.medium : IMAGE_NF}
          summary={show.summary}
        />
      ))}
    </div>
  );
};

export default ShowLayout;