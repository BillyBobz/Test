import express, { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { Trip, ItineraryItem, Activity } from '../types';

const router = express.Router();

// Sample trips data
const trips: Trip[] = [
  {
    id: uuidv4(),
    userId: 'user1',
    title: 'Greece Island Hopping',
    description: 'A 10-day adventure through the Greek islands',
    destinations: ['santorini', 'mykonos', 'crete'],
    startDate: '2024-06-15',
    endDate: '2024-06-25',
    budget: 3000,
    status: 'planning',
    itinerary: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];

// GET /api/trips - Get all trips for a user
router.get('/', (req: Request, res: Response) => {
  const { userId, status } = req.query;
  
  let filteredTrips = trips;
  
  if (userId) {
    filteredTrips = filteredTrips.filter(t => t.userId === userId);
  }
  
  if (status) {
    filteredTrips = filteredTrips.filter(t => t.status === status);
  }
  
  res.json({
    success: true,
    data: filteredTrips,
    total: filteredTrips.length
  });
});

// GET /api/trips/:id - Get trip by ID
router.get('/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  const trip = trips.find(t => t.id === id);
  
  if (!trip) {
    return res.status(404).json({
      success: false,
      error: 'Trip not found'
    });
  }
  
  res.json({
    success: true,
    data: trip
  });
});

// POST /api/trips - Create a new trip
router.post('/', (req: Request, res: Response) => {
  const { title, description, destinations, startDate, endDate, budget, userId } = req.body;
  
  if (!title || !startDate || !endDate || !userId) {
    return res.status(400).json({
      success: false,
      error: 'Missing required fields: title, startDate, endDate, userId'
    });
  }
  
  const newTrip: Trip = {
    id: uuidv4(),
    userId,
    title,
    description: description || '',
    destinations: destinations || [],
    startDate,
    endDate,
    budget: budget || 0,
    status: 'planning',
    itinerary: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  
  trips.push(newTrip);
  
  res.status(201).json({
    success: true,
    data: newTrip
  });
});

// PUT /api/trips/:id - Update a trip
router.put('/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  const tripIndex = trips.findIndex(t => t.id === id);
  
  if (tripIndex === -1) {
    return res.status(404).json({
      success: false,
      error: 'Trip not found'
    });
  }
  
  const updatedTrip = {
    ...trips[tripIndex],
    ...req.body,
    updatedAt: new Date().toISOString()
  };
  
  trips[tripIndex] = updatedTrip;
  
  res.json({
    success: true,
    data: updatedTrip
  });
});

// DELETE /api/trips/:id - Delete a trip
router.delete('/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  const tripIndex = trips.findIndex(t => t.id === id);
  
  if (tripIndex === -1) {
    return res.status(404).json({
      success: false,
      error: 'Trip not found'
    });
  }
  
  trips.splice(tripIndex, 1);
  
  res.json({
    success: true,
    message: 'Trip deleted successfully'
  });
});

// POST /api/trips/:id/itinerary - Add itinerary item
router.post('/:id/itinerary', (req: Request, res: Response) => {
  const { id } = req.params;
  const trip = trips.find(t => t.id === id);
  
  if (!trip) {
    return res.status(404).json({
      success: false,
      error: 'Trip not found'
    });
  }
  
  const { day, date, activities } = req.body;
  
  const newItineraryItem: ItineraryItem = {
    id: uuidv4(),
    day,
    date,
    activities: activities || []
  };
  
  trip.itinerary.push(newItineraryItem);
  trip.updatedAt = new Date().toISOString();
  
  res.status(201).json({
    success: true,
    data: newItineraryItem
  });
});

export default router;