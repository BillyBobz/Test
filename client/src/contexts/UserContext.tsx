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
  type: 'sightseeing' | 'food' | 'activity' | 'photography' | 'transport' | 'accommodation';
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
    name: 'John Doe',
    email: 'john.doe@example.com',
    profileImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
    preferences: {
      interests: ['photography', 'food', 'culture', 'nature'],
      travelStyle: 'mid-range',
      preferredClimate: 'temperate',
      preferredCurrency: 'GBP'
    },
    joinDate: '2023-01-15',
    tripsCompleted: 12,
    countriesVisited: 8
  });

  const [currentTrip, setCurrentTrip] = useState<Trip | null>({
    id: '1',
    title: 'Greece Island Hopping',
    destination: 'Santorini',
    startDate: '2025-06-15',
    endDate: '2025-06-25',
    status: 'upcoming',
    imageUrl: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=800',
    weather: {
      temperature: 26,
      condition: 'Sunny',
      icon: '☀️'
    },
    todaysItinerary: [
      {
        time: '09:00',
        activity: 'Visit Oia Village',
        location: 'Oia, Santorini',
        type: 'sightseeing'
      },
      {
        time: '12:30',
        activity: 'Lunch at Ambrosia Restaurant',
        location: 'Oia, Santorini', 
        type: 'food'
      },
      {
        time: '15:00',
        activity: 'Wine Tasting Tour',
        location: 'Santo Wines Winery',
        type: 'activity'
      },
      {
        time: '19:30',
        activity: 'Sunset Photography at Castle Ruins',
        location: 'Oia Castle, Santorini',
        type: 'photography'
      }
    ]
  });

  const [upcomingTrips, setUpcomingTrips] = useState<Trip[]>([
    {
      id: '2',
      title: 'Tuscan Countryside',
      destination: 'Tuscany',
      startDate: '2025-09-10',
      endDate: '2025-09-20',
      status: 'upcoming',
      imageUrl: 'https://images.unsplash.com/photo-1539650116574-75c0c6d68c6c?w=800'
    },
    {
      id: '3',
      title: 'Japanese Cultural Tour',
      destination: 'Kyoto',
      startDate: '2025-11-05',
      endDate: '2025-11-15',
      status: 'upcoming',
      imageUrl: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800'
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