import React from 'react';
import { Settings, MapPin, Heart, Briefcase } from 'lucide-react';

const ProfilePage: React.FC = () => {
  const user = {
    name: 'John Doe',
    email: 'john@example.com',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
    preferences: {
      travelStyle: 'mid-range',
      interests: ['photography', 'food', 'culture', 'nature'],
      preferredClimate: 'temperate'
    },
    stats: {
      tripsPlanned: 5,
      destinationsVisited: 12,
      favoriteDestinations: 8
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white shadow-sm rounded-lg overflow-hidden">
        {/* Profile Header */}
        <div className="bg-gradient-to-r from-primary-600 to-primary-800 px-6 py-8">
          <div className="flex items-center">
            <img
              src={user.avatar}
              alt={user.name}
              className="h-20 w-20 rounded-full border-4 border-white"
            />
            <div className="ml-6">
              <h1 className="text-2xl font-bold text-white">{user.name}</h1>
              <p className="text-primary-100">{user.email}</p>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary-500 text-white mt-2">
                <Briefcase className="h-4 w-4 mr-1" />
                {user.preferences.travelStyle.charAt(0).toUpperCase() + user.preferences.travelStyle.slice(1)} Traveler
              </span>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="px-6 py-6 border-b border-gray-200">
          <div className="grid grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">{user.stats.tripsPlanned}</div>
              <div className="text-sm text-gray-600">Trips Planned</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">{user.stats.destinationsVisited}</div>
              <div className="text-sm text-gray-600">Destinations Visited</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">{user.stats.favoriteDestinations}</div>
              <div className="text-sm text-gray-600">Favorites</div>
            </div>
          </div>
        </div>

        {/* Preferences */}
        <div className="px-6 py-6">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Travel Interests */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                <Heart className="h-5 w-5 mr-2 text-red-500" />
                Travel Interests
              </h3>
              <div className="flex flex-wrap gap-2">
                {user.preferences.interests.map((interest) => (
                  <span
                    key={interest}
                    className="px-3 py-1 bg-primary-100 text-primary-800 text-sm font-medium rounded-full"
                  >
                    {interest.charAt(0).toUpperCase() + interest.slice(1)}
                  </span>
                ))}
              </div>
            </div>

            {/* Climate Preference */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                <MapPin className="h-5 w-5 mr-2 text-green-500" />
                Climate Preference
              </h3>
              <span className="px-4 py-2 bg-green-100 text-green-800 text-sm font-medium rounded-lg">
                {user.preferences.preferredClimate.charAt(0).toUpperCase() + user.preferences.preferredClimate.slice(1)} Climate
              </span>
            </div>
          </div>
        </div>

        {/* Settings */}
        <div className="px-6 py-6 bg-gray-50">
          <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
            <Settings className="h-5 w-5 mr-2 text-gray-500" />
            Quick Settings
          </h3>
          <div className="space-y-3">
            <button className="w-full text-left px-4 py-3 bg-white rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-900">Edit Travel Preferences</span>
                <span className="text-gray-400">→</span>
              </div>
            </button>
            <button className="w-full text-left px-4 py-3 bg-white rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-900">Notification Settings</span>
                <span className="text-gray-400">→</span>
              </div>
            </button>
            <button className="w-full text-left px-4 py-3 bg-white rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-900">Privacy Settings</span>
                <span className="text-gray-400">→</span>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;