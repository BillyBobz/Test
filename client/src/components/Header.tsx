import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { MapPin, Compass, Calendar, User } from 'lucide-react';

const Header: React.FC = () => {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="bg-primary-600 p-2 rounded-lg">
              <Compass className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">TravelApp</span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className={`text-sm font-medium transition-colors ${
                isActive('/') 
                  ? 'text-primary-600' 
                  : 'text-gray-700 hover:text-primary-600'
              }`}
            >
              Home
            </Link>
            <Link
              to="/destinations"
              className={`flex items-center space-x-1 text-sm font-medium transition-colors ${
                isActive('/destinations') 
                  ? 'text-primary-600' 
                  : 'text-gray-700 hover:text-primary-600'
              }`}
            >
              <MapPin className="h-4 w-4" />
              <span>Destinations</span>
            </Link>
            <Link
              to="/trips"
              className={`flex items-center space-x-1 text-sm font-medium transition-colors ${
                isActive('/trips') 
                  ? 'text-primary-600' 
                  : 'text-gray-700 hover:text-primary-600'
              }`}
            >
              <Calendar className="h-4 w-4" />
              <span>My Trips</span>
            </Link>
            <Link
              to="/profile"
              className={`flex items-center space-x-1 text-sm font-medium transition-colors ${
                isActive('/profile') 
                  ? 'text-primary-600' 
                  : 'text-gray-700 hover:text-primary-600'
              }`}
            >
              <User className="h-4 w-4" />
              <span>Profile</span>
            </Link>
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button className="text-gray-700 hover:text-primary-600">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;