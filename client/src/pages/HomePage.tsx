import React from 'react';
import { Link } from 'react-router-dom';
import { Search, MapPin, Calendar, Star } from 'lucide-react';

const HomePage: React.FC = () => {
  const featuredDestinations = [
    {
      id: '1',
      name: 'Santorini',
      country: 'Greece',
      imageUrl: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=400',
      rating: 4.8
    },
    {
      id: '2',
      name: 'Kyoto',
      country: 'Japan',
      imageUrl: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=400',
      rating: 4.9
    },
    {
      id: '3',
      name: 'Banff National Park',
      country: 'Canada',
      imageUrl: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400',
      rating: 4.7
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-primary-600 to-primary-800 py-20 lg:py-32">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Discover Your Next
            <span className="block text-primary-200">Adventure</span>
          </h1>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Plan, explore, and experience the world's most amazing destinations with our comprehensive travel companion.
          </p>
          
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Where do you want to go?"
                className="block w-full pl-10 pr-3 py-4 border border-gray-300 rounded-lg bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-lg"
              />
              <div className="absolute inset-y-0 right-0 flex items-center">
                <button className="h-full px-6 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-r-lg transition-colors">
                  Search
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Everything You Need for Perfect Trips
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              From discovering destinations to planning detailed itineraries, we've got you covered.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="h-8 w-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Discover Destinations</h3>
              <p className="text-gray-600">
                Explore amazing destinations with detailed information, reviews, and insider tips.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar className="h-8 w-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Plan Your Trips</h3>
              <p className="text-gray-600">
                Create detailed itineraries, manage budgets, and organize your perfect trip.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="h-8 w-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Read Reviews</h3>
              <p className="text-gray-600">
                Get insights from real travelers with authentic reviews and ratings.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Destinations */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Featured Destinations
            </h2>
            <p className="text-lg text-gray-600">
              Discover some of the world's most popular travel destinations.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {featuredDestinations.map((destination) => (
              <Link
                key={destination.id}
                to={`/destinations/${destination.id}`}
                className="group block bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow"
              >
                <div className="aspect-w-16 aspect-h-9">
                  <img
                    src={destination.imageUrl}
                    alt={destination.name}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {destination.name}
                  </h3>
                  <p className="text-gray-600 mb-3">{destination.country}</p>
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="ml-1 text-sm font-medium text-gray-900">
                      {destination.rating}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              to="/destinations"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 transition-colors"
            >
              View All Destinations
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;