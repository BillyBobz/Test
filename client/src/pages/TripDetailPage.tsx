import React from 'react';
import { useParams } from 'react-router-dom';

const TripDetailPage: React.FC = () => {
  const { id } = useParams();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Trip Details</h1>
      <p className="text-gray-600">Detailed view of trip {id}</p>
    </div>
  );
};

export default TripDetailPage;