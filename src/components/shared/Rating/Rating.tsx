import React, { useMemo } from 'react';
import EmptyStar from './icons/EmptyStar';

import HalfStar from './icons/HalfStar';
import FullStar from './icons/FullStar';

const Rating = ({ rating, reviews }:{rating:number, reviews:number}) => {
  const starsRating = useMemo(() => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      if (i + 0.5 === rating) {
        stars.push(<HalfStar key={i} />);
      } else if (i + 1 <= rating) {
        stars.push(<FullStar key={i} />);
      } else {
        stars.push(<EmptyStar key={i} />);
      }
    }
    return stars;
  }, [rating]);

  return (
    <span className="d-flex">
      <span>
        {starsRating}
      </span>
      <span className="ml-2">
        <p>
          {reviews}
          {' '}
          {reviews === 1 ? 'review' : 'reviews'}
        </p>
      </span>

    </span>
  );
};

export default Rating;
