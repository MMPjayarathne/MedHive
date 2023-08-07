import React from 'react';
import { Star, StarBorder,StarHalf } from '@mui/icons-material';
import { styled } from '@mui/system';
import StarIcon from '@mui/icons-material/Star';

const GoldStarIcon = styled(StarIcon)({
  color: 'gold',
});

const GoldStarHalf = styled(StarHalf)({
  color:'gold',
});

const GoldStarBorder = styled(StarBorder)({
  color:'gold',
})


const RatingStars = ({ rating }) => {
  const filledStars = Math.floor(rating);
  const hasHalfStar = rating - filledStars >= 0.5;

  const starElements = [];

  for (let i = 0; i < filledStars; i++) {
    starElements.push(<GoldStarIcon key={`filled-${i}`} />);
  }

  if (hasHalfStar) {
    starElements.push(<GoldStarHalf key="half-star" />);
  }

  const remainingStars = 5 - starElements.length;

  for (let i = 0; i < remainingStars; i++) {
    starElements.push(<GoldStarBorder key={`empty-${i}`} />);
  }

  return <>{starElements}</>;
};

export default RatingStars;
