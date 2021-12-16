// Actor card where all the actor information is displayed
import React from 'react';

// Bring in a styled actor card from styled components that contains all the css styling for the cards
import { StyledActorCard } from './ActorCard.styled';

// Destructure certain items from the actor
const ActorCard = ({ image, name, gender, country, birthday, deathday }) => {
  return (
    // Place prper actor info inside of html
    <StyledActorCard>
      <div className="img-wrapper">
        <img src={image} alt="actor" />
      </div>
      <h1>
        {name} {gender ? `(${gender})` : null}
      </h1>
      <p>{country ? `Comes from ${country}` : 'No country known'}</p>
      {birthday ? <p>Born {birthday}</p> : null}
      <p className="deathday">{deathday ? `Died ${deathday}` : 'Alive'}</p>
    </StyledActorCard>
  );
};

export default ActorCard;
