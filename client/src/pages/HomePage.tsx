import React from 'react';
import { Link } from 'react-router-dom';
import { Search, MapPin, Calendar, Star, Sun, Navigation } from 'lucide-react';
import { useUser } from '../contexts/UserContext';

const HomePage: React.FC = () => {
  const { user, currentTrip } = useUser();

  // Personalized destinations based on user preferences
  const getPersonalizedDestinations = () => {
    const allDestinations = [
      {
        id: '1',
        name: 'Istanbul',
        country: 'Turkey',
        imageUrl: 'https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?w=400',
        rating: 4.8,
        matchesInterests: ['culture', 'architecture', 'halal food', 'shopping'],
        climate: 'warm'
      },
      {
        id: '2',
        name: 'Kuala Lumpur',
        country: 'Malaysia',
        imageUrl: 'https://images.unsplash.com/photo-1596422846543-75c6fc197f07?w=400',
        rating: 4.7,
        matchesInterests: ['culture', 'halal food', 'shopping', 'family activities'],
        climate: 'warm'
      },
      {
        id: '3',
        name: 'Marrakech',
        country: 'Morocco',
        imageUrl: 'https://images.unsplash.com/photo-1539650116574-75c0c6d68c6c?w=400',
        rating: 4.6,
        matchesInterests: ['culture', 'architecture', 'shopping'],
        climate: 'warm'
      },
      {
        id: '4',
        name: 'Abu Dhabi',
        country: 'UAE',
        imageUrl: 'https://images.unsplash.com/photo-1512632578888-169bbbc64f33?w=400',
        rating: 4.9,
        matchesInterests: ['culture', 'architecture', 'family activities', 'shopping'],
        climate: 'warm'
      }
    ];

    if (!user) {
      return allDestinations.slice(0, 3);
    }

    // Filter and sort by user preferences
    return allDestinations
      .filter(dest => 
        dest.matchesInterests.some(interest => user.preferences.interests.includes(interest)) ||
        dest.climate === user.preferences.preferredClimate
      )
      .sort((a, b) => {
        const aMatches = a.matchesInterests.filter(interest => user.preferences.interests.includes(interest)).length;
        const bMatches = b.matchesInterests.filter(interest => user.preferences.interests.includes(interest)).length;
        return bMatches - aMatches;
      })
      .slice(0, 3);
  };

  const personalizedDestinations = getPersonalizedDestinations();

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'food': return '🍽️';
      case 'sightseeing': return '🏛️';
      case 'photography': return '📸';
      case 'activity': return '🎯';
      case 'shopping': return '🛍️';
      case 'transport': return '🚗';
      case 'accommodation': return '🏨';
      default: return '📍';
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Loading...</h1>
          <p className="text-gray-600">Setting up your personalized travel dashboard</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-primary-600 to-primary-800 py-16 lg:py-24">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">
            Welcome back, {user.name}!
            <span className="block text-primary-200 text-2xl md:text-3xl mt-2">Ready for your next adventure?</span>
          </h1>
          <p className="text-lg text-white/90 mb-6 max-w-2xl mx-auto">
            Your personalized travel dashboard is ready with recommendations based on your interests: {user.preferences.interests.join(', ')}
          </p>
          
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Where do you want to go next?"
                className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-lg"
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

      {/* Current Trip Section */}
      {currentTrip && (
        <section className="py-8 bg-gradient-to-r from-blue-600 to-blue-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="md:flex">
                <div className="md:w-1/3">
                  <img 
                    src={currentTrip.imageUrl} 
                    alt={currentTrip.destination}
                    className="w-full h-48 md:h-full object-cover"
                  />
                </div>
                <div className="md:w-2/3 p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-2xl font-bold text-gray-900">{currentTrip.title}</h2>
                    {currentTrip.weather && (
                      <div className="flex items-center space-x-2">
                        <Sun className="h-5 w-5 text-yellow-500" />
                        <span className="text-lg font-medium">{currentTrip.weather.temperature}°C</span>
                        <span className="text-gray-600">{currentTrip.weather.condition}</span>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex items-center text-gray-600 mb-4">
                    <Calendar className="h-5 w-5 mr-2" />
                    <span>{new Date(currentTrip.startDate).toLocaleDateString()} - {new Date(currentTrip.endDate).toLocaleDateString()}</span>
                  </div>

                  {currentTrip.todaysItinerary && currentTrip.todaysItinerary.length > 0 && (
                    <>
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">Today's Itinerary</h3>
                      <div className="space-y-2 max-h-32 overflow-y-auto">
                        {currentTrip.todaysItinerary.map((item, index) => (
                          <div key={index} className="flex items-center space-x-3 text-sm">
                            <span className="text-blue-600 font-medium w-12">{item.time}</span>
                            <span className="text-lg">{getActivityIcon(item.type)}</span>
                            <div className="flex-1">
                              <span className="text-gray-900">{item.activity}</span>
                              <span className="text-gray-500 ml-2">{item.location}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </>
                  )}

                  <div className="mt-4">
                    <Link
                      to="/trips"
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                    >
                      <Navigation className="h-4 w-4 mr-2" />
                      View Full Itinerary
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Your Travel Toolkit
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Everything you need for perfect trips, tailored to your {user.preferences.travelStyle} travel style.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="h-8 w-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Discover Destinations</h3>
              <p className="text-gray-600">
                Explore amazing destinations with detailed information, reviews, and insider tips matching your interests.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar className="h-8 w-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Plan Your Trips</h3>
              <p className="text-gray-600">
                Create detailed itineraries, manage budgets, and organize your perfect trip based on your preferences.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="h-8 w-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Smart Recommendations</h3>
              <p className="text-gray-600">
                Get personalized suggestions and insights from real travelers that match your travel style.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Personalized Recommendations */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Recommended for You</h2>
            <p className="text-lg text-gray-600">Based on your interests: {user.preferences.interests.join(', ')}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {personalizedDestinations.map((destination) => (
              <div key={destination.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <img 
                  src={destination.imageUrl} 
                  alt={destination.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{destination.name}</h3>
                  <p className="text-gray-600 mb-2">{destination.country}</p>
                  
                  {/* Interest matches */}
                  <div className="flex flex-wrap gap-1 mb-3">
                    {destination.matchesInterests
                      .filter(interest => user.preferences.interests.includes(interest))
                      .map(interest => (
                        <span key={interest} className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          {interest}
                        </span>
                      ))}
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Star className="h-5 w-5 text-yellow-400 fill-current" />
                      <span className="ml-1 text-sm text-gray-600">{destination.rating}</span>
                    </div>
                    <Link
                      to={`/destinations/${destination.id}`}
                      className="text-blue-600 hover:text-blue-800 font-medium text-sm"
                    >
                      Explore →
                    </Link>
                  </div>
                </div>
              </div>
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