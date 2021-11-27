import React from 'react';

import IMAGE_NF from '../../images/not-found.png';
import ActorCard from './ActorCard';

const ActorLayout = ({ data }) => {
  return (
    <div>
      {data.map(({ person }) => (
        <ActorCard
          key={person.id}
          name={person.name}
          country={person.country ? person.country.name : null}
          birthday={person.birthday}
          deathday={person.deathday}
          gender={person.gender}
          image={person.image ? person.image.medium : IMAGE_NF}
        />
      ))}
    </div>
  );
};

export default ActorLayout;