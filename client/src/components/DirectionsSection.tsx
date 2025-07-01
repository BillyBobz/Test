import React, { useState } from 'react';
import { MapPin, Navigation, Copy, ExternalLink } from 'lucide-react';
import { Destination } from '../types';

interface DirectionsSectionProps {
  destination: Destination;
}

const DirectionsSection: React.FC<DirectionsSectionProps> = ({ destination }) => {
  const [copied, setCopied] = useState(false);

  const copyAddress = async () => {
    try {
      await navigator.clipboard.writeText(destination.address);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy address:', err);
    }
  };

  const openInGoogleMaps = () => {
    const { lat, lng } = destination.coordinates;
    const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}&destination_place_id=${destination.googlePlaceId || ''}`;
    window.open(googleMapsUrl, '_blank');
  };

  const openDirectionsInGoogleMaps = () => {
    const { lat, lng } = destination.coordinates;
    const directionsUrl = `https://www.google.com/maps/dir//Current+Location/${lat},${lng}`;
    window.open(directionsUrl, '_blank');
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6">
      <div className="flex items-center space-x-2 mb-4">
        <MapPin className="h-5 w-5 text-primary-600" />
        <h3 className="text-lg font-semibold text-gray-900">Location & Directions</h3>
      </div>

      {/* Address */}
      <div className="space-y-4">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-700 mb-1">Address</p>
            <p className="text-gray-900">{destination.address}</p>
            <p className="text-sm text-gray-500 mt-1">
              Coordinates: {destination.coordinates.lat.toFixed(4)}, {destination.coordinates.lng.toFixed(4)}
            </p>
          </div>
          <button
            onClick={copyAddress}
            className="ml-4 inline-flex items-center px-3 py-1.5 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors"
          >
            <Copy className="h-4 w-4 mr-1" />
            {copied ? 'Copied!' : 'Copy'}
          </button>
        </div>

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={openInGoogleMaps}
            className="flex-1 inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors"
          >
            <ExternalLink className="h-4 w-4 mr-2" />
            View in Google Maps
          </button>
          
          <button
            onClick={openDirectionsInGoogleMaps}
            className="flex-1 inline-flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors"
          >
            <Navigation className="h-4 w-4 mr-2" />
            Get Directions
          </button>
        </div>

        {/* Helper text */}
        <div className="bg-blue-50 border border-blue-200 rounded-md p-3">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-blue-700">
                <strong>Tip:</strong> Click "Get Directions" to open Google Maps with turn-by-turn navigation from your current location.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DirectionsSection;