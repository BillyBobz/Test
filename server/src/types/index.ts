export interface Destination {
  id: string;
  name: string;
  country: string;
  description: string;
  imageUrl: string;
  rating: number;
  coordinates: {
    lat: number;
    lng: number;
  };
  category: 'beach' | 'mountain' | 'city' | 'cultural' | 'adventure' | 'nature';
  bestTimeToVisit: string;
  averageCost: number;
  activities: string[];
  address: string;
  reviews: Review[];
  googlePlaceId?: string;
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  text: string;
  date: string;
  profilePhoto?: string;
  source: 'google' | 'tripadvisor' | 'internal';
}

export interface Trip {
  id: string;
  userId: string;
  title: string;
  description: string;
  destinations: string[];
  startDate: string;
  endDate: string;
  budget: number;
  status: 'planning' | 'booked' | 'ongoing' | 'completed';
  itinerary: ItineraryItem[];
  createdAt: string;
  updatedAt: string;
}

export interface ItineraryItem {
  id: string;
  day: number;
  date: string;
  activities: Activity[];
}

export interface Activity {
  id: string;
  title: string;
  description: string;
  startTime: string;
  endTime: string;
  location: string;
  cost: number;
  category: 'transport' | 'accommodation' | 'food' | 'activity' | 'sightseeing';
}

export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  preferences: {
    travelStyle: 'budget' | 'mid-range' | 'luxury';
    interests: string[];
    preferredClimate: 'cold' | 'temperate' | 'warm' | 'hot';
  };
  createdAt: string;
}

export interface WeatherData {
  location: string;
  current: {
    temperature: number;
    condition: string;
    humidity: number;
    windSpeed: number;
    icon: string;
  };
  forecast: ForecastDay[];
}

export interface ForecastDay {
  date: string;
  high: number;
  low: number;
  condition: string;
  icon: string;
  precipitation: number;
}