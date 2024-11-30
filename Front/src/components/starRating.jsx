import React from 'react';
const mediumStar = '/images/stars/mediumStar.png';
const fullStar = '/images/stars/fullStar.png';
const emptyStar = '/images/stars/startempty.png';

const StarRating = ({ rating }) => {
  const totalStars = 5;
  const roundedRating = Math.round(rating * 2) / 2; 
  const fullStars = Math.floor(roundedRating);
  const hasHalfStar = roundedRating % 1 !== 0;

  return (
    <div className="flex items-center">
    {/*  full stars */}
    {[...Array(fullStars)].map((_, index) => (
      <img 
        key={`full-${index}`} 
        src={fullStar}
        width="50px" 
        alt='fullstar'
        className="h-6 w-6 text-yellow-500 "
      />
    ))}
     
    {/* mediumstar */}
    {hasHalfStar && (
      <img 
        key="half"
        src={mediumStar} 
        width="50px"
        alt='mediumstar'
        className="h-6 w-6 text-yellow-500"
      />
    )}
    
    {/* start empty  */}
    {[...Array(totalStars - fullStars - (hasHalfStar ? 1 : 0))].map((_, index) => (
      <img 
        key={`empty-${index}`}
        src={emptyStar}
        width="50px"
        alt='emptyStar'
        className="h-6 w-6 text-yellow-500"
           
        />
      
    ))}
  </div>
);
}
export default StarRating;