import express, { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { Destination, Review } from '../types';

const router = express.Router();

// Sample destinations data
const destinations: Destination[] = [
  {
    id: uuidv4(),
    name: 'Santorini',
    country: 'Greece',
    description: 'A beautiful Greek island known for its stunning sunsets, white buildings, and blue domes.',
    imageUrl: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=800',
    rating: 4.8,
    coordinates: { lat: 36.3932, lng: 25.4615 },
    category: 'beach',
    bestTimeToVisit: 'April to October',
    averageCost: 1200, // £1,200
    activities: ['Beach hopping', 'Wine tasting', 'Sunset viewing', 'Photography'],
    address: 'Santorini Island, Cyclades, Greece',
    googlePlaceId: 'ChIJIfIOPmixnhQRbpdXOj8-Cuw',
    reviews: [
      {
        id: uuidv4(),
        author: 'Maria K.',
        rating: 5,
        text: 'Absolutely breathtaking! The sunset in Oia is something you\'ll never forget. The blue domes and white buildings create a perfect contrast against the deep blue sea.',
        date: '2025-01-15',
        profilePhoto: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=50',
        source: 'google'
      },
      {
        id: uuidv4(),
        author: 'John D.',
        rating: 4,
        text: 'Beautiful island but can get very crowded during peak season. The wine tours are fantastic and the local cuisine is amazing. Would definitely visit again!',
        date: '2025-01-10',
        profilePhoto: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50',
        source: 'google'
      },
      {
        id: uuidv4(),
        author: 'Sophie L.',
        rating: 5,
        text: 'A dream destination! Every corner is Instagram-worthy. The hotels carved into the cliffs offer stunning views. Don\'t miss the sunset cruise!',
        date: '2025-01-05',
        profilePhoto: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=50',
        source: 'google'
      }
    ]
  },
  {
    id: uuidv4(),
    name: 'Kyoto',
    country: 'Japan',
    description: 'Ancient capital with beautiful temples, traditional architecture, and stunning gardens.',
    imageUrl: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800',
    rating: 4.9,
    coordinates: { lat: 35.0116, lng: 135.7681 },
    category: 'cultural',
    bestTimeToVisit: 'March to May, September to November',
    averageCost: 1000, // £1,000
    activities: ['Temple visits', 'Garden tours', 'Traditional tea ceremony', 'Cherry blossom viewing'],
    address: 'Kyoto, Kyoto Prefecture, Japan',
    googlePlaceId: 'ChIJ67_80jHI-hQRQkZgvOKTI4Q',
    reviews: [
      {
        id: uuidv4(),
        author: 'Takeshi M.',
        rating: 5,
        text: 'Kyoto is a perfect blend of ancient and modern Japan. The temples are magnificent and the traditional gardens are peaceful. Cherry blossom season is magical!',
        date: '2025-01-20',
        profilePhoto: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50',
        source: 'google'
      },
      {
        id: uuidv4(),
        author: 'Emma R.',
        rating: 5,
        text: 'The most beautiful city I\'ve ever visited. Every temple tells a story, and the bamboo forest in Arashiyama is otherworldly. The tea ceremony was a highlight!',
        date: '2025-01-18',
        profilePhoto: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=50',
        source: 'google'
      }
    ]
  },
  {
    id: uuidv4(),
    name: 'Banff National Park',
    country: 'Canada',
    description: 'Spectacular mountain scenery, pristine lakes, and abundant wildlife in the Canadian Rockies.',
    imageUrl: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800',
    rating: 4.7,
    coordinates: { lat: 51.4968, lng: -115.9281 },
    category: 'nature',
    bestTimeToVisit: 'June to September',
    averageCost: 800, // £800
    activities: ['Hiking', 'Lake canoeing', 'Wildlife watching', 'Mountain climbing'],
    address: 'Banff National Park, Alberta, Canada',
    googlePlaceId: 'ChIJE0_VJqp5AwER04ixA6f0x0o',
    reviews: [
      {
        id: uuidv4(),
        author: 'Michael S.',
        rating: 5,
        text: 'Absolutely stunning! Lake Louise is like a postcard come to life. The hiking trails offer breathtaking views of the Canadian Rockies. Wildlife spotting was incredible!',
        date: '2025-01-12',
        profilePhoto: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=50',
        source: 'google'
      },
      {
        id: uuidv4(),
        author: 'Sarah W.',
        rating: 4,
        text: 'Nature at its finest! The turquoise lakes and snow-capped mountains create the most beautiful scenery. Perfect for outdoor enthusiasts. Can get busy in summer.',
        date: '2025-01-08',
        profilePhoto: 'https://images.unsplash.com/photo-1502767089025-6572583495c8?w=50',
        source: 'google'
      }
    ]
  },
  {
    id: uuidv4(),
    name: 'Paris',
    country: 'France',
    description: 'The City of Light, famous for its art, fashion, gastronomy, and culture.',
    imageUrl: 'https://images.unsplash.com/photo-1431274172761-fca41d930114?w=800',
    rating: 4.6,
    coordinates: { lat: 48.8566, lng: 2.3522 },
    category: 'city',
    bestTimeToVisit: 'April to June, September to October',
    averageCost: 1500, // £1,500
    activities: ['Museum visits', 'Seine river cruise', 'Café culture', 'Shopping'],
    address: 'Paris, France',
    googlePlaceId: 'ChIJD7fiBh9u5kcRYJSMaMOCCwQ',
    reviews: [
      {
        id: uuidv4(),
        author: 'Pierre L.',
        rating: 5,
        text: 'La ville lumière never disappoints! The Louvre, Eiffel Tower, and charming cafés make it magical. The croissants and wine are exceptional. A must-visit!',
        date: '2025-01-14',
        profilePhoto: 'https://images.unsplash.com/photo-1463453091185-61582044d556?w=50',
        source: 'google'
      },
      {
        id: uuidv4(),
        author: 'Anna C.',
        rating: 4,
        text: 'Beautiful architecture and rich history everywhere you look. The Seine cruise at sunset was romantic. Can be crowded at popular attractions but worth it!',
        date: '2025-01-11',
        profilePhoto: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=50',
        source: 'google'
      }
    ]
  },
  {
    id: uuidv4(),
    name: 'Machu Picchu',
    country: 'Peru',
    description: 'Ancient Incan citadel set high in the Andes Mountains, a UNESCO World Heritage site.',
    imageUrl: 'https://images.unsplash.com/photo-1526392060635-9d6019884377?w=800',
    rating: 4.9,
    coordinates: { lat: -13.1631, lng: -72.5450 },
    category: 'adventure',
    bestTimeToVisit: 'May to September',
    averageCost: 900, // £900
    activities: ['Inca Trail hiking', 'Historical tours', 'Photography', 'Llama spotting'],
    address: 'Machu Picchu, Aguas Calientes, Peru',
    googlePlaceId: 'ChIJm_CRAEYrbUcRXTgHKEfNjKM',
    reviews: [
      {
        id: uuidv4(),
        author: 'Carlos R.',
        rating: 5,
        text: 'One of the most incredible experiences of my life! The trek is challenging but absolutely worth it. The sunrise over Machu Picchu is unforgettable. Book in advance!',
        date: '2025-01-16',
        profilePhoto: 'https://images.unsplash.com/photo-1511376979163-f804ddeac37f?w=50',
        source: 'google'
      },
      {
        id: uuidv4(),
        author: 'Lisa T.',
        rating: 5,
        text: 'A bucket list destination that exceeded all expectations! The history and engineering marvel of the Incas is mind-blowing. The llamas add a cute touch!',
        date: '2025-01-09',
        profilePhoto: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=50',
        source: 'google'
      }
    ]
  },
  {
    id: uuidv4(),
    name: 'Dubai',
    country: 'United Arab Emirates',
    description: 'A modern metropolis blending traditional Islamic culture with cutting-edge architecture, luxury shopping, and world-class dining. Perfect for halal-conscious travelers.',
    imageUrl: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800',
    rating: 4.8,
    coordinates: { lat: 25.2048, lng: 55.2708 },
    category: 'city',
    bestTimeToVisit: 'November to March, September is ideal for early autumn weather',
    averageCost: 1800, // £1,800 for 8 days
    activities: ['Desert safari', 'Burj Khalifa visit', 'Gold Souk shopping', 'Traditional dhow cruise', 'Islamic heritage tours', 'Halal fine dining'],
    address: 'Dubai, United Arab Emirates',
    googlePlaceId: 'ChIJRcbZaklDXz4RYlEphFBu5r0',
    reviews: [
      {
        id: uuidv4(),
        author: 'Ahmed Hassan',
        rating: 5,
        text: 'Perfect destination for Muslim travelers! September weather was ideal - not too hot. Sheikh Zayed Grand Mosque was breathtaking, and the halal dining options are incredible. Al Fanar Restaurant serves authentic Emirati cuisine. Jumeirah Al Seef hotel was excellent with prayer facilities.',
        date: '2025-09-15',
        profilePhoto: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50',
        source: 'internal'
      },
      {
        id: uuidv4(),
        author: 'Fatima Al-Zahra',
        rating: 5,
        text: 'Dubai exceeded all expectations! The blend of modern luxury and Islamic heritage is perfect. Desert safari with halal BBQ was amazing. IMG Worlds of Adventure is great for families. Prayer facilities are available everywhere.',
        date: '2025-08-20',
        profilePhoto: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=50',
        source: 'google'
      },
      {
        id: uuidv4(),
        author: 'Omar K.',
        rating: 4,
        text: 'Fantastic city with something for everyone. The Gold and Spice Souks are must-visits. Burj Khalifa views are spectacular. September is perfect timing - weather is getting comfortable. Highly recommend for cultural experiences.',
        date: '2025-09-10',
        profilePhoto: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50',
        source: 'google'
      },
      {
        id: uuidv4(),
        author: 'Sarah M.',
        rating: 5,
        text: 'Dubai is a marvel of modern engineering while respecting traditions. The Dubai Mall is enormous, and the fountain show is magical. Halal food options are abundant and delicious. Very family-friendly destination.',
        date: '2025-09-05',
        profilePhoto: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=50',
        source: 'tripadvisor'
      }
    ]
  }
];

// GET /api/destinations - Get all destinations
router.get('/', (req: Request, res: Response) => {
  const { category, country, minRating } = req.query;
  
  let filteredDestinations = destinations;
  
  if (category) {
    filteredDestinations = filteredDestinations.filter(d => d.category === category);
  }
  
  if (country) {
    filteredDestinations = filteredDestinations.filter(d => 
      d.country.toLowerCase().includes((country as string).toLowerCase())
    );
  }
  
  if (minRating) {
    filteredDestinations = filteredDestinations.filter(d => 
      d.rating >= parseFloat(minRating as string)
    );
  }
  
  res.json({
    success: true,
    data: filteredDestinations,
    total: filteredDestinations.length
  });
});

// GET /api/destinations/:id - Get destination by ID
router.get('/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  const destination = destinations.find(d => d.id === id);
  
  if (!destination) {
    return res.status(404).json({
      success: false,
      error: 'Destination not found'
    });
  }
  
  res.json({
    success: true,
    data: destination
  });
});

// GET /api/destinations/search/:query - Search destinations
router.get('/search/:query', (req: Request, res: Response) => {
  const { query } = req.params;
  const searchTerm = query.toLowerCase();
  
  const searchResults = destinations.filter(d => 
    d.name.toLowerCase().includes(searchTerm) ||
    d.country.toLowerCase().includes(searchTerm) ||
    d.description.toLowerCase().includes(searchTerm) ||
    d.activities.some(activity => activity.toLowerCase().includes(searchTerm))
  );
  
  res.json({
    success: true,
    data: searchResults,
    total: searchResults.length
  });
});

export default router;