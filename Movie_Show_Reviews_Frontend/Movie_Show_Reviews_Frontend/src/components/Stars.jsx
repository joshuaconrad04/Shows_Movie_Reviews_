import { FaStar } from "react-icons/fa";
import React from "react";

const Stars = ({rating} ) => {
   
     const filledStars= Array(rating).fill(0);
     const emptyStars = Array(5-rating).fill(0);

    return (

        <>
        {filledStars.map((_, i) => (
        <FaStar key={i} style={{ color: 'gold' }} />
      ))}
      {emptyStars.map((_, i) => (
        <FaStar key={i} style={{ color: 'gray' }} />
      ))}
        </>

    )
};

export default Stars;