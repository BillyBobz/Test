import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Calendar, MapPin } from 'lucide-react';

interface Trip {
  id: string;
  title: string;
  destination: string;
  startDate: string;
  endDate: string;
  status: 'planning' | 'booked' | 'ongoing' | 'completed';
  budget: number;
  imageUrl: string;
}

const TripsPage: React.FC = () => {
  const [trips] = useState<Trip[]>([
    {
      id: '1',
      title: 'Greece Island Hopping',
      destination: 'Santorini, Mykonos, Crete',
      startDate: '2025-06-15',
      endDate: '2025-06-25',
      status: 'planning',
      budget: 3000,
      imageUrl: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=400'
    },
    {
      id: '2',
      title: 'Japan Cultural Experience',
      destination: 'Tokyo, Kyoto, Osaka',
      startDate: '2025-09-10',
      endDate: '2025-09-20',
      status: 'planning',
      budget: 2500,
      imageUrl: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=400'
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'planning': return 'bg-blue-100 text-blue-800';
      case 'booked': return 'bg-green-100 text-green-800';
      case 'ongoing': return 'bg-yellow-100 text-yellow-800';
      case 'completed': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">My Trips</h1>
          <p className="text-lg text-gray-600">Plan and manage your travel adventures.</p>
        </div>
        <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
          <Plus className="h-4 w-4 mr-2" />
          New Trip
        </button>
      </div>

      {trips.length === 0 ? (
        <div className="text-center py-12">
          <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
            <MapPin className="h-12 w-12 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No trips yet</h3>
          <p className="text-gray-600 mb-6">Start planning your next adventure!</p>
          <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700">
            <Plus className="h-4 w-4 mr-2" />
            Create Your First Trip
          </button>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {trips.map((trip) => (
            <Link
              key={trip.id}
              to={`/trips/${trip.id}`}
              className="group block bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              <div className="aspect-w-16 aspect-h-9">
                <img
                  src={trip.imageUrl}
                  alt={trip.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(trip.status)}`}>
                    {trip.status.charAt(0).toUpperCase() + trip.status.slice(1)}
                  </span>
                  <span className="text-sm font-medium text-primary-600">
                    £{trip.budget.toLocaleString()}
                  </span>
                </div>
                
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {trip.title}
                </h3>
                
                <div className="flex items-center text-gray-600 mb-3">
                  <MapPin className="h-4 w-4 mr-1 flex-shrink-0" />
                  <span className="text-sm truncate">{trip.destination}</span>
                </div>
                
                <div className="flex items-center text-gray-600">
                  <Calendar className="h-4 w-4 mr-1" />
                  <span className="text-sm">
                    {formatDate(trip.startDate)} - {formatDate(trip.endDate)}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default TripsPage;