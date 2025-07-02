import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import destinationRoutes from './routes/destinations';
import tripRoutes from './routes/trips';
import weatherRoutes from './routes/weather';
import userRoutes from './routes/users';
import aiAssistantRoutes from './routes/ai-assistant';
import notificationRoutes from './routes/notifications';
import socialRoutes from './routes/social';
import bookingRoutes from './routes/booking';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/destinations', destinationRoutes);
app.use('/api/trips', tripRoutes);
app.use('/api/weather', weatherRoutes);
app.use('/api/users', userRoutes);

// New features by BillyBobz
app.use('/api/ai', aiAssistantRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/social', socialRoutes);
app.use('/api/booking', bookingRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Travel app server is running!',
    features: [
      'Destinations & Reviews',
      'Trip Planning',
      'Weather Integration', 
      'User Management',
      'AI Travel Assistant (by BillyBobz)',
      'Real-time Notifications (by BillyBobz)',
      'Social Features (by BillyBobz)',
      'Booking Integration (by BillyBobz)'
    ],
    author: 'Enhanced by BillyBobz'
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
  console.log(`✨ New features by BillyBobz: AI Assistant, Notifications, Social, Booking`);
});