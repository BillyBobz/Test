import express, { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { Destination } from '../types';

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
    averageCost: 1200,
    activities: ['Beach hopping', 'Wine tasting', 'Sunset viewing', 'Photography']
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
    averageCost: 1000,
    activities: ['Temple visits', 'Garden tours', 'Traditional tea ceremony', 'Cherry blossom viewing']
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
    averageCost: 800,
    activities: ['Hiking', 'Lake canoeing', 'Wildlife watching', 'Mountain climbing']
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
    averageCost: 1500,
    activities: ['Museum visits', 'Seine river cruise', 'Café culture', 'Shopping']
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
    averageCost: 900,
    activities: ['Inca Trail hiking', 'Historical tours', 'Photography', 'Llama spotting']
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