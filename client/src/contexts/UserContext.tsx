import React, { createContext, useContext, useState, useEffect } from 'react';

interface UserPreferences {
  interests: string[];
  travelStyle: 'budget' | 'mid-range' | 'luxury';
  preferredClimate: 'cold' | 'temperate' | 'warm' | 'tropical';
  preferredCurrency: 'GBP' | 'USD' | 'EUR';
}

interface User {
  id: string;
  name: string;
  email: string;
  profileImage?: string;
  preferences: UserPreferences;
  joinDate: string;
  tripsCompleted: number;
  countriesVisited: number;
}

interface Trip {
  id: string;
  title: string;
  destination: string;
  startDate: string;
  endDate: string;
  status: 'upcoming' | 'current' | 'completed';
  imageUrl: string;
  weather?: {
    temperature: number;
    condition: string;
    icon: string;
  };
  todaysItinerary?: ItineraryItem[];
}

interface ItineraryItem {
  time: string;
  activity: string;
  location: string;
  type: 'sightseeing' | 'food' | 'activity' | 'photography' | 'transport' | 'accommodation' | 'shopping';
}

interface UserContextType {
  user: User | null;
  currentTrip: Trip | null;
  upcomingTrips: Trip[];
  setUser: (user: User) => void;
  setCurrentTrip: (trip: Trip | null) => void;
  updateUserPreferences: (preferences: Partial<UserPreferences>) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>({
    id: '1',
    name: 'Ahmed Hassan',
    email: 'ahmed.hassan@example.com',
    profileImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
    preferences: {
      interests: ['culture', 'halal food', 'shopping', 'architecture', 'family activities'],
      travelStyle: 'mid-range',
      preferredClimate: 'warm',
      preferredCurrency: 'GBP'
    },
    joinDate: '2023-01-15',
    tripsCompleted: 12,
    countriesVisited: 8
  });

  const [currentTrip, setCurrentTrip] = useState<Trip | null>({
    id: '1',
    title: 'Dubai Cultural & Shopping Experience',
    destination: 'Dubai',
    startDate: '2025-09-05',
    endDate: '2025-09-12',
    status: 'current',
    imageUrl: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800',
    weather: {
      temperature: 32,
      condition: 'Partly Cloudy',
      icon: '⛅'
    },
    todaysItinerary: [
      {
        time: '09:00',
        activity: 'Visit Sheikh Zayed Grand Mosque',
        location: 'Abu Dhabi (Day Trip)',
        type: 'sightseeing'
      },
      {
        time: '13:00',
        activity: 'Halal Lunch at Al Hadheerah',
        location: 'Al Sahra Desert Resort',
        type: 'food'
      },
      {
        time: '16:00',
        activity: 'Dubai Mall & Burj Khalifa',
        location: 'Downtown Dubai',
        type: 'shopping'
      },
      {
        time: '19:30',
        activity: 'Dubai Fountain Show',
        location: 'Dubai Mall',
        type: 'activity'
      },
      {
        time: '21:00',
        activity: 'Traditional Emirati Dinner',
        location: 'Al Fanar Restaurant',
        type: 'food'
      }
    ]
  });

  const [upcomingTrips] = useState<Trip[]>([
    {
      id: '2',
      title: 'Istanbul Heritage & Culture',
      destination: 'Istanbul',
      startDate: '2025-11-15',
      endDate: '2025-11-25',
      status: 'upcoming',
      imageUrl: 'https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?w=800'
    },
    {
      id: '3',
      title: 'Marrakech Family Adventure',
      destination: 'Marrakech',
      startDate: '2026-02-10',
      endDate: '2026-02-20',
      status: 'upcoming',
      imageUrl: 'https://images.unsplash.com/photo-1539650116574-75c0c6d68c6c?w=800'
    }
  ]);

  const updateUserPreferences = (preferences: Partial<UserPreferences>) => {
    if (user) {
      setUser({
        ...user,
        preferences: {
          ...user.preferences,
          ...preferences
        }
      });
    }
  };

  // Load user data from localStorage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('travelAppUser');
    if (savedUser) {
      try {
        const parsedUser = JSON.parse(savedUser);
        setUser(parsedUser);
      } catch (error) {
        console.error('Error parsing saved user data:', error);
      }
    }
  }, []);

  // Save user data to localStorage when user changes
  useEffect(() => {
    if (user) {
      localStorage.setItem('travelAppUser', JSON.stringify(user));
    }
  }, [user]);

  const value: UserContextType = {
    user,
    currentTrip,
    upcomingTrips,
    setUser,
    setCurrentTrip,
    updateUserPreferences
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;