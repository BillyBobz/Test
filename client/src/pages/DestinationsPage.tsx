import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Star, MapPin } from 'lucide-react';

interface Destination {
  id: string;
  name: string;
  country: string;
  imageUrl: string;
  rating: number;
  category: string;
  averageCost: number;
}

const DestinationsPage: React.FC = () => {
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [loading, setLoading] = useState(true);

  // Mock data - in real app this would come from API
  useEffect(() => {
    const mockDestinations = [
      {
        id: '1',
        name: 'Santorini',
        country: 'Greece',
        imageUrl: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=400',
        rating: 4.8,
        category: 'Beach',
        averageCost: 1200
      },
      {
        id: '2',
        name: 'Kyoto',
        country: 'Japan',
        imageUrl: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=400',
        rating: 4.9,
        category: 'Cultural',
        averageCost: 1000
      },
      {
        id: '3',
        name: 'Banff National Park',
        country: 'Canada',
        imageUrl: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400',
        rating: 4.7,
        category: 'Nature',
        averageCost: 800
      },
      {
        id: '4',
        name: 'Paris',
        country: 'France',
        imageUrl: 'https://images.unsplash.com/photo-1431274172761-fca41d930114?w=400',
        rating: 4.6,
        category: 'City',
        averageCost: 1500
      },
      {
        id: '5',
        name: 'Machu Picchu',
        country: 'Peru',
        imageUrl: 'https://images.unsplash.com/photo-1526392060635-9d6019884377?w=400',
        rating: 4.9,
        category: 'Adventure',
        averageCost: 900
      }
    ];
    
    setTimeout(() => {
      setDestinations(mockDestinations);
      setLoading(false);
    }, 500);
  }, []);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-8"></div>
          <div className="grid md:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="bg-gray-200 h-64 rounded-lg"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Destinations</h1>
        <p className="text-lg text-gray-600">Discover amazing places around the world with authentic reviews and directions.</p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {destinations.map((destination) => (
          <Link
            key={destination.id}
            to={`/destinations/${destination.id}`}
            className="group block bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
          >
            <div className="aspect-w-16 aspect-h-9">
              <img
                src={destination.imageUrl}
                alt={destination.name}
                className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="p-6">
              <div className="flex items-center justify-between mb-2">
                <span className="px-2 py-1 text-xs font-medium bg-primary-100 text-primary-800 rounded-full">
                  {destination.category}
                </span>
                <div className="flex items-center">
                  <Star className="h-4 w-4 text-yellow-400 fill-current" />
                  <span className="ml-1 text-sm font-medium text-gray-900">
                    {destination.rating}
                  </span>
                </div>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-1">
                {destination.name}
              </h3>
              <div className="flex items-center text-gray-600 mb-3">
                <MapPin className="h-4 w-4 mr-1" />
                <span className="text-sm">{destination.country}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-lg font-bold text-primary-600">
                  £{destination.averageCost.toLocaleString()}
                </span>
                <span className="text-sm text-gray-500">avg. cost</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default DestinationsPage;