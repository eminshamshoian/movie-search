// Layout grid of the actor section
import React from 'react';

// Bring in image not found if actor image is not there to replace with
import IMAGE_NF from '../../images/not-found.png';

// Bring in the flex crid css component
import { FlexGrid } from '../styled';

// Bring in the actor card created previously
import ActorCard from './ActorCard';

// Place the data of each actor in a flex grid and inside of it place the actor card component
const ActorLayout = ({ data }) => {
  return (
    <FlexGrid>
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
    </FlexGrid>
  );
};

export default ActorLayout;
