import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { MapPin, Compass, Calendar, User, Bot, Bell, Sparkles } from 'lucide-react';
import NotificationCenter from './NotificationCenter';

const Header: React.FC = () => {
  const location = useLocation();
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);

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
            <div>
              <span className="text-xl font-bold text-gray-900">TravelApp</span>
              <span className="text-xs text-gray-500 block">Enhanced by BillyBobz</span>
            </div>
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
              to="/ai-assistant"
              className={`flex items-center space-x-1 text-sm font-medium transition-colors ${
                isActive('/ai-assistant') 
                  ? 'text-purple-600' 
                  : 'text-gray-700 hover:text-purple-600'
              }`}
            >
              <Bot className="h-4 w-4" />
              <span>AI Assistant</span>
              <Sparkles className="h-3 w-3 text-purple-500" />
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

          {/* Right side actions */}
          <div className="flex items-center space-x-4">
            {/* Notifications */}
            <button
              onClick={() => setIsNotificationOpen(true)}
              className="relative p-2 text-gray-700 hover:text-primary-600 transition-colors"
            >
              <Bell className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                2
              </span>
            </button>

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
      </div>

      {/* Notification Center */}
      <NotificationCenter
        userId="user1"
        isOpen={isNotificationOpen}
        onClose={() => setIsNotificationOpen(false)}
      />
    </header>
  );
};

export default Header;