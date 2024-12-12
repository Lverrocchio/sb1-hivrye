import React from 'react';
import { Star } from 'lucide-react';

interface RatingProps {
  rating: number;
  reviews?: number;
  size?: 'sm' | 'md' | 'lg';
  showCount?: boolean;
}

export function Rating({ rating, reviews = 0, size = 'md', showCount = true }: RatingProps) {
  const maxStars = 5;
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;

  const getStarSize = () => {
    switch (size) {
      case 'sm':
        return 'w-4 h-4';
      case 'lg':
        return 'w-6 h-6';
      default:
        return 'w-5 h-5';
    }
  };

  const starSize = getStarSize();

  return (
    <div className="flex items-center">
      <div className="flex items-center">
        {[...Array(maxStars)].map((_, index) => (
          <Star
            key={index}
            className={`${starSize} ${
              index < fullStars
                ? 'text-yellow-400 fill-yellow-400'
                : index === fullStars && hasHalfStar
                ? 'text-yellow-400 fill-yellow-400'
                : 'text-gray-300'
            }`}
          />
        ))}
      </div>
      {showCount && (
        <div className="ml-2 text-gray-600">
          <span className="font-medium">{rating.toFixed(1)}</span>
          {reviews > 0 && (
            <span className="ml-1 text-sm">
              ({reviews} avis)
            </span>
          )}
        </div>
      )}
    </div>
  );
}