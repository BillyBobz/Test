import React from 'react';
import { Star, User } from 'lucide-react';
import { Review } from '../types';
import { format } from 'date-fns';

interface ReviewsSectionProps {
  reviews: Review[];
  averageRating: number;
}

const ReviewsSection: React.FC<ReviewsSectionProps> = ({ reviews, averageRating }) => {
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < rating 
            ? 'text-yellow-400 fill-current' 
            : 'text-gray-300'
        }`}
      />
    ));
  };

  const getSourceBadgeColor = (source: string) => {
    switch (source) {
      case 'google':
        return 'bg-blue-100 text-blue-800';
      case 'tripadvisor':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header with overall rating */}
      <div className="flex items-center justify-between">
        <h3 className="text-2xl font-bold text-gray-900">Reviews</h3>
        <div className="flex items-center space-x-2">
          <div className="flex items-center">
            {renderStars(Math.round(averageRating))}
          </div>
          <span className="text-sm text-gray-600">
            {averageRating.toFixed(1)} ({reviews.length} reviews)
          </span>
        </div>
      </div>

      {/* Reviews list */}
      <div className="space-y-6">
        {reviews.map((review) => (
          <div key={review.id} className="bg-white border border-gray-200 rounded-lg p-6">
            <div className="flex items-start space-x-4">
              {/* User avatar */}
              <div className="flex-shrink-0">
                {review.profilePhoto ? (
                  <img
                    src={review.profilePhoto}
                    alt={review.author}
                    className="h-10 w-10 rounded-full object-cover"
                  />
                ) : (
                  <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                    <User className="h-5 w-5 text-gray-500" />
                  </div>
                )}
              </div>

              {/* Review content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-3">
                    <h4 className="text-sm font-medium text-gray-900">
                      {review.author}
                    </h4>
                    <span
                      className={`px-2 py-1 text-xs font-medium rounded-full ${getSourceBadgeColor(
                        review.source
                      )}`}
                    >
                      {review.source === 'google' ? 'Google' : 
                       review.source === 'tripadvisor' ? 'TripAdvisor' : 'Internal'}
                    </span>
                  </div>
                  <span className="text-sm text-gray-500">
                    {format(new Date(review.date), 'MMM d, yyyy')}
                  </span>
                </div>

                {/* Star rating */}
                <div className="flex items-center space-x-1 mb-2">
                  {renderStars(review.rating)}
                </div>

                {/* Review text */}
                <p className="text-gray-700 text-sm leading-relaxed">
                  {review.text}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Show more reviews button */}
      {reviews.length > 3 && (
        <div className="text-center">
          <button className="text-primary-600 hover:text-primary-700 font-medium text-sm">
            Show all reviews
          </button>
        </div>
      )}
    </div>
  );
};

export default ReviewsSection;