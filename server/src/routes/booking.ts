import express from 'express';
import { v4 as uuidv4 } from 'uuid';

/**
 * Booking Integration System
 * Author: BillyBobz
 * Mock booking system for hotels, flights, and activities with real-world examples
 */

const router = express.Router();

interface Booking {
  id: string;
  userId: string;
  type: 'hotel' | 'flight' | 'activity' | 'restaurant' | 'transport';
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  title: string;
  description: string;
  destination: string;
  startDate: string;
  endDate?: string;
  price: number;
  currency: string;
  provider: string;
  confirmationCode?: string;
  details: any;
  createdAt: string;
  updatedAt: string;
  author: string;
}

// Sample bookings inspired by Ahmed Hassan's Dubai trip - by BillyBobz
let bookings: Booking[] = [
  {
    id: uuidv4(),
    userId: 'ahmed_hassan',
    type: 'hotel',
    status: 'confirmed',
    title: 'Jumeirah Al Seef - Halal Certified Hotel',
    description: 'Luxury waterfront hotel with halal-certified dining and prayer facilities',
    destination: 'Dubai, UAE',
    startDate: '2025-09-05',
    endDate: '2025-09-12',
    price: 1400,
    currency: 'GBP',
    provider: 'Jumeirah Hotels',
    confirmationCode: 'JAS2025-AH-789',
    details: {
      roomType: 'Deluxe Creek View',
      guests: 1,
      amenities: ['Halal dining', 'Prayer room', 'Spa', 'Creek view', 'WiFi'],
      address: 'Al Seef, Dubai Creek',
      checkIn: '15:00',
      checkOut: '12:00',
      halalCertified: true
    },
    createdAt: '2025-08-15T10:00:00Z',
    updatedAt: '2025-08-15T10:00:00Z',
    author: 'BillyBobz Booking System'
  },
  {
    id: uuidv4(),
    userId: 'ahmed_hassan',
    type: 'activity',
    status: 'confirmed',
    title: 'Sheikh Zayed Grand Mosque Tour',
    description: 'Guided tour of the architectural masterpiece with Islamic art and calligraphy',
    destination: 'Abu Dhabi, UAE',
    startDate: '2025-09-06',
    price: 45,
    currency: 'GBP',
    provider: 'Emirates Heritage Tours',
    confirmationCode: 'SZGM-2025-456',
    details: {
      duration: '4 hours',
      includes: ['Transportation', 'Guided tour', 'Cultural presentation'],
      dressCode: 'Conservative - long sleeves and covered legs required',
      prayerTime: 'Tour includes prayer break',
      groupSize: 'Small group (max 15 people)'
    },
    createdAt: '2025-08-20T14:30:00Z',
    updatedAt: '2025-08-20T14:30:00Z',
    author: 'BillyBobz Activity Booking'
  },
  {
    id: uuidv4(),
    userId: 'ahmed_hassan',
    type: 'activity',
    status: 'confirmed',
    title: 'Desert Safari with Bedouin Cultural Experience',
    description: 'Traditional desert safari with halal BBQ dinner and cultural performances',
    destination: 'Dubai Desert, UAE',
    startDate: '2025-09-09',
    price: 85,
    currency: 'GBP',
    provider: 'Arabian Adventures',
    confirmationCode: 'DS-HALAL-2025-321',
    details: {
      duration: '8 hours (3:00 PM - 11:00 PM)',
      includes: ['4x4 dune bashing', 'Camel riding', 'Sandboarding', 'Halal BBQ dinner', 'Cultural shows'],
      halalCertified: true,
      prayerFacilities: 'Desert prayer area available',
      entertainment: ['Belly dancing', 'Tanoura dance', 'Falconry display'],
      pickup: 'Hotel pickup included'
    },
    createdAt: '2025-08-22T09:15:00Z',
    updatedAt: '2025-08-22T09:15:00Z',
    author: 'BillyBobz Desert Adventures'
  },
  {
    id: uuidv4(),
    userId: 'ahmed_hassan',
    type: 'restaurant',
    status: 'confirmed',
    title: 'Al Fanar Restaurant - Traditional Emirati Dining',
    description: 'Authentic Emirati cuisine in traditional setting with cultural ambiance',
    destination: 'Dubai, UAE',
    startDate: '2025-09-05',
    price: 35,
    currency: 'GBP',
    provider: 'Al Fanar Restaurant',
    confirmationCode: 'AFR-2025-AHMED-567',
    details: {
      cuisine: 'Traditional Emirati',
      seatingTime: '20:00',
      partySize: 1,
      specialRequests: 'Halal certified, traditional atmosphere',
      menu: 'Set menu with local specialties',
      location: 'Festival City Mall'
    },
    createdAt: '2025-08-18T16:45:00Z',
    updatedAt: '2025-08-18T16:45:00Z',
    author: 'BillyBobz Restaurant Reservations'
  }
];

// Mock available accommodations with halal options - by BillyBobz
const availableHotels = [
  {
    id: 'hotel_1',
    name: 'Jumeirah Al Seef',
    location: 'Dubai Creek, Dubai',
    rating: 4.8,
    pricePerNight: 200,
    currency: 'GBP',
    halalCertified: true,
    amenities: ['Halal dining', 'Prayer room', 'Spa', 'Creek view', 'WiFi', 'Pool'],
    images: ['https://images.unsplash.com/photo-1566073771259-6a8506099945'],
    description: 'Luxury waterfront hotel with authentic Arabic architecture'
  },
  {
    id: 'hotel_2',
    name: 'Atlantis The Palm',
    location: 'Palm Jumeirah, Dubai',
    rating: 4.9,
    pricePerNight: 350,
    currency: 'GBP',
    halalCertified: true,
    amenities: ['Halal restaurants', 'Aquarium', 'Water park', 'Beach access', 'Spa'],
    images: ['https://images.unsplash.com/photo-1582719478250-c89cae4dc85b'],
    description: 'Iconic resort with world-class amenities and halal dining options'
  },
  {
    id: 'hotel_3',
    name: 'Ritz-Carlton DIFC',
    location: 'Financial District, Dubai',
    rating: 4.7,
    pricePerNight: 280,
    currency: 'GBP',
    halalCertified: true,
    amenities: ['Halal fine dining', 'Business center', 'Rooftop pool', 'Prayer facilities'],
    images: ['https://images.unsplash.com/photo-1571896349842-33c89424de2d'],
    description: 'Sophisticated urban hotel with halal-certified restaurants'
  }
];

// Mock available activities - by BillyBobz
const availableActivities = [
  {
    id: 'activity_1',
    name: 'Burj Khalifa At the Top Experience',
    location: 'Downtown Dubai',
    price: 75,
    duration: '2 hours',
    category: 'Sightseeing',
    halalFriendly: true,
    description: 'Visit the world\'s tallest building with stunning city views'
  },
  {
    id: 'activity_2',
    name: 'Gold & Spice Souk Walking Tour',
    location: 'Old Dubai',
    price: 25,
    duration: '3 hours',
    category: 'Cultural',
    halalFriendly: true,
    description: 'Explore traditional markets with local guide and cultural insights'
  },
  {
    id: 'activity_3',
    name: 'IMG Worlds of Adventure',
    location: 'City of Arabia, Dubai',
    price: 65,
    duration: 'Full day',
    category: 'Entertainment',
    halalFriendly: true,
    description: 'Family-friendly indoor theme park with halal dining options'
  }
];

// Get user bookings - by BillyBobz
router.get('/user/:userId', (req: express.Request, res: express.Response) => {
  try {
    const { userId } = req.params;
    const { status, type } = req.query;

    let userBookings = bookings.filter(b => b.userId === userId);

    if (status) {
      userBookings = userBookings.filter(b => b.status === status);
    }

    if (type) {
      userBookings = userBookings.filter(b => b.type === type);
    }

    userBookings.sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime());

    res.json({
      success: true,
      bookings: userBookings,
      count: userBookings.length,
      totalValue: userBookings.reduce((sum, b) => sum + b.price, 0),
      currency: 'GBP',
      retrievedBy: 'BillyBobz'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch bookings'
    });
  }
});

// Create new booking - by BillyBobz
router.post('/', (req: express.Request, res: express.Response) => {
  try {
    const bookingData = req.body;
    
    const booking: Booking = {
      id: uuidv4(),
      ...bookingData,
      status: 'pending',
      confirmationCode: `BK-${Date.now()}-${Math.random().toString(36).substr(2, 6).toUpperCase()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      author: 'BillyBobz Booking System'
    };

    bookings.push(booking);

    // Simulate booking confirmation after 2 seconds
    setTimeout(() => {
      const bookingIndex = bookings.findIndex(b => b.id === booking.id);
      if (bookingIndex !== -1) {
        bookings[bookingIndex].status = 'confirmed';
        bookings[bookingIndex].updatedAt = new Date().toISOString();
      }
    }, 2000);

    res.json({
      success: true,
      booking,
      message: 'Booking created successfully. Confirmation pending.',
      bookedBy: 'BillyBobz'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to create booking'
    });
  }
});

// Search available hotels - by BillyBobz
router.get('/hotels/search', (req: express.Request, res: express.Response) => {
  try {
    const { destination, checkIn, checkOut, guests = 1, halalOnly = false } = req.query;

    let filteredHotels = availableHotels;

    if (destination) {
      const searchDest = (destination as string).toLowerCase();
      filteredHotels = filteredHotels.filter(hotel =>
        hotel.location.toLowerCase().includes(searchDest)
      );
    }

    if (halalOnly === 'true') {
      filteredHotels = filteredHotels.filter(hotel => hotel.halalCertified);
    }

    // Calculate total price if dates provided
    let nights = 1;
    if (checkIn && checkOut) {
      const start = new Date(checkIn as string);
      const end = new Date(checkOut as string);
      nights = Math.max(1, Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)));
    }

    const hotelsWithPricing = filteredHotels.map(hotel => ({
      ...hotel,
      totalPrice: hotel.pricePerNight * nights,
      nights,
      availability: 'Available', // Mock availability
      searchedBy: 'BillyBobz'
    }));

    res.json({
      success: true,
      hotels: hotelsWithPricing,
      searchCriteria: {
        destination,
        checkIn,
        checkOut,
        guests: Number(guests),
        halalOnly: halalOnly === 'true',
        nights
      },
      count: hotelsWithPricing.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to search hotels'
    });
  }
});

// Search available activities - by BillyBobz
router.get('/activities/search', (req: express.Request, res: express.Response) => {
  try {
    const { destination, category, halalFriendly = false } = req.query;

    let filteredActivities = availableActivities;

    if (destination) {
      const searchDest = (destination as string).toLowerCase();
      filteredActivities = filteredActivities.filter(activity =>
        activity.location.toLowerCase().includes(searchDest)
      );
    }

    if (category) {
      filteredActivities = filteredActivities.filter(activity =>
        activity.category.toLowerCase() === (category as string).toLowerCase()
      );
    }

    if (halalFriendly === 'true') {
      filteredActivities = filteredActivities.filter(activity => activity.halalFriendly);
    }

    res.json({
      success: true,
      activities: filteredActivities,
      searchCriteria: {
        destination,
        category,
        halalFriendly: halalFriendly === 'true'
      },
      count: filteredActivities.length,
      searchedBy: 'BillyBobz'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to search activities'
    });
  }
});

// Cancel booking - by BillyBobz
router.patch('/:bookingId/cancel', (req: express.Request, res: express.Response) => {
  try {
    const { bookingId } = req.params;
    const { reason } = req.body;

    const booking = bookings.find(b => b.id === bookingId);
    if (!booking) {
      return res.status(404).json({
        success: false,
        error: 'Booking not found'
      });
    }

    if (booking.status === 'cancelled') {
      return res.status(400).json({
        success: false,
        error: 'Booking is already cancelled'
      });
    }

    booking.status = 'cancelled';
    booking.updatedAt = new Date().toISOString();
    booking.details = { ...booking.details, cancellationReason: reason };

    res.json({
      success: true,
      booking,
      message: 'Booking cancelled successfully',
      cancelledBy: 'BillyBobz'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to cancel booking'
    });
  }
});

// Get booking statistics - by BillyBobz
router.get('/user/:userId/stats', (req: express.Request, res: express.Response) => {
  try {
    const { userId } = req.params;
    const userBookings = bookings.filter(b => b.userId === userId);

    const stats = {
      total: userBookings.length,
      byStatus: userBookings.reduce((acc, b) => {
        acc[b.status] = (acc[b.status] || 0) + 1;
        return acc;
      }, {} as Record<string, number>),
      byType: userBookings.reduce((acc, b) => {
        acc[b.type] = (acc[b.type] || 0) + 1;
        return acc;
      }, {} as Record<string, number>),
      totalSpent: userBookings
        .filter(b => b.status === 'confirmed' || b.status === 'completed')
        .reduce((sum, b) => sum + b.price, 0),
      upcomingBookings: userBookings.filter(b => 
        new Date(b.startDate) > new Date() && b.status === 'confirmed'
      ).length,
      currency: 'GBP',
      generatedBy: 'BillyBobz Analytics'
    };

    res.json({
      success: true,
      stats
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch booking statistics'
    });
  }
});

export default router;