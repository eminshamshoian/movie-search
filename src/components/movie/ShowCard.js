// Movie card component just like actor card
import React from 'react';
import { Link } from 'react-router-dom';

// Bring in the css for the movie section
import { StyledShowCard } from './ShowCard.styled';

// Bring in the str button css
import { Star } from '../styled';

// Function to present the shows/movies to user
const ShowCard = ({ id, image, name, summary, onStarClick, isStarred }) => {
  // Show a portion of the description so it fits on screen
  const summaryAsText = summary
    ? `${summary.split(' ').slice(0, 10).join(' ').replace(/<.+?>/g, '')}...`
    : 'No description';

  // Wrap the ontent in the StyledShowCard and give star button proper onClick info
  return (
    <StyledShowCard>
      <div className="img-wrapper">
        <img src={image} alt="show" />
      </div>

      <h1>{name}</h1>

      <p>{summaryAsText}</p>

      <div className="custom-button">
        <button type="button" onClick={onStarClick}>
          <Star active={isStarred} />
        </button>
      </div>
    </StyledShowCard>
  );
};

export default ShowCard;
