import express, { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { User } from '../types';

const router = express.Router();

// Sample users data
const users: User[] = [
  {
    id: 'user1',
    email: 'john@example.com',
    name: 'John Doe',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
    preferences: {
      travelStyle: 'mid-range',
      interests: ['photography', 'food', 'culture', 'nature'],
      preferredClimate: 'temperate'
    },
    createdAt: '2025-01-01T00:00:00.000Z'
  }
];

// GET /api/users/:id - Get user by ID
router.get('/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  const user = users.find(u => u.id === id);
  
  if (!user) {
    return res.status(404).json({
      success: false,
      error: 'User not found'
    });
  }
  
  res.json({
    success: true,
    data: user
  });
});

// POST /api/users - Create a new user
router.post('/', (req: Request, res: Response) => {
  const { email, name, preferences } = req.body;
  
  if (!email || !name) {
    return res.status(400).json({
      success: false,
      error: 'Email and name are required'
    });
  }
  
  // Check if user already exists
  const existingUser = users.find(u => u.email === email);
  if (existingUser) {
    return res.status(409).json({
      success: false,
      error: 'User with this email already exists'
    });
  }
  
  const newUser: User = {
    id: uuidv4(),
    email,
    name,
    preferences: preferences || {
      travelStyle: 'mid-range',
      interests: [],
      preferredClimate: 'temperate'
    },
    createdAt: new Date().toISOString()
  };
  
  users.push(newUser);
  
  res.status(201).json({
    success: true,
    data: newUser
  });
});

// PUT /api/users/:id - Update user
router.put('/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  const userIndex = users.findIndex(u => u.id === id);
  
  if (userIndex === -1) {
    return res.status(404).json({
      success: false,
      error: 'User not found'
    });
  }
  
  const updatedUser = {
    ...users[userIndex],
    ...req.body,
    id // Prevent ID from being changed
  };
  
  users[userIndex] = updatedUser;
  
  res.json({
    success: true,
    data: updatedUser
  });
});

// PUT /api/users/:id/preferences - Update user preferences
router.put('/:id/preferences', (req: Request, res: Response) => {
  const { id } = req.params;
  const userIndex = users.findIndex(u => u.id === id);
  
  if (userIndex === -1) {
    return res.status(404).json({
      success: false,
      error: 'User not found'
    });
  }
  
  users[userIndex].preferences = {
    ...users[userIndex].preferences,
    ...req.body
  };
  
  res.json({
    success: true,
    data: users[userIndex]
  });
});

export default router;