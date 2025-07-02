import React from 'react';
import { useParams } from 'react-router-dom';
import ReviewsSection from '../components/ReviewsSection';
import DirectionsSection from '../components/DirectionsSection';

const DestinationDetailPage: React.FC = () => {
  const { id } = useParams();
  console.log('Destination ID:', id); // Using the id parameter

  // Mock destination data - in real app this would come from API
  const destination = {
    id: '1',
    name: 'Santorini',
    country: 'Greece',
    description: 'A beautiful Greek island known for its stunning sunsets, white buildings, and blue domes.',
    imageUrl: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=800',
    rating: 4.8,
    coordinates: { lat: 36.3932, lng: 25.4615 },
    category: 'beach' as const,
    bestTimeToVisit: 'April to October',
    averageCost: 1200,
    activities: ['Beach hopping', 'Wine tasting', 'Sunset viewing', 'Photography'],
    address: 'Santorini Island, Cyclades, Greece',
    googlePlaceId: 'ChIJIfIOPmixnhQRbpdXOj8-Cuw',
    reviews: [
      {
        id: '1',
        author: 'Maria K.',
        rating: 5,
        text: 'Absolutely breathtaking! The sunset in Oia is something you\'ll never forget.',
        date: '2024-01-15',
        profilePhoto: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=50',
        source: 'google' as const
      }
    ]
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">{destination.name}</h1>
            <img src={destination.imageUrl} alt={destination.name} className="w-full h-64 object-cover rounded-lg" />
          </div>
          
          <ReviewsSection reviews={destination.reviews} averageRating={destination.rating} />
        </div>
        
        <div className="space-y-6">
          <DirectionsSection destination={destination} />
        </div>
      </div>
    </div>
  );
};

export default DestinationDetailPage;