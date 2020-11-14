import React from 'react';
import EmptyStar from './icons/EmptyStar';

import HalfStar from './icons/HalfStar';
import FullStar from './icons/FullStar';

const Rating = ({ rating, reviews }:{rating:number, reviews:number}) => {
  const stars = [];

  for (let i = 0; i < 5; i++) {
    if (i + 0.5 === rating) {
      stars.push(<HalfStar />);
    } else if (i + 1 <= rating) {
      stars.push(<FullStar />);
    } else {
      stars.push(<EmptyStar />);
    }
  }
  return (
    <div className="d-flex">
      {stars}
      <span className="mx-2">
        {reviews}
        {' '}
        {reviews === 1 ? 'review' : 'reviews'}
      </span>

    </div>
  );
};

export default Rating;
