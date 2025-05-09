"use client";

import { useState } from "react";
import { StarContainer, Star } from "./NotasFilmesStyle";

interface StarRatingProps {
  initialRating?: number;
  totalStars?: number;
  onRatingChange?: (rating: number) => void;
  readOnly?: boolean;
  size?: "small" | "medium" | "large";
}

export function StarRating({
  initialRating = 0,
  totalStars = 5,
  onRatingChange,
  readOnly = false,
  size = "medium",
}: StarRatingProps) {
  const [rating, setRating] = useState(initialRating);
  const [hoverRating, setHoverRating] = useState(0);

  const handleStarClick = (selectedRating: number) => {
    if (readOnly) return;

    setRating(selectedRating);
    if (onRatingChange) {
      onRatingChange(selectedRating);
    }
  };

  const handleStarHover = (hoveredRating: number) => {
    if (readOnly) return;
    setHoverRating(hoveredRating);
  };

  const handleMouseLeave = () => {
    if (readOnly) return;
    setHoverRating(0);
  };

  return (
    <StarContainer onMouseLeave={handleMouseLeave} $size={size}>
      {[...Array(totalStars)].map((_, index) => {
        const starValue = index + 1;
        const isFilled = hoverRating
          ? starValue <= hoverRating
          : starValue <= rating;

        return (
          <Star
            key={index}
            $filled={isFilled}
            $readOnly={readOnly}
            $size={size}
            onClick={() => handleStarClick(starValue)}
            onMouseEnter={() => handleStarHover(starValue)}
            className={isFilled ? "bi bi-star-fill" : "bi bi-star"}
          />
        );
      })}
    </StarContainer>
  );
}
