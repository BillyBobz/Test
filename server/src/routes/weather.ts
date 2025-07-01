import express, { Request, Response } from 'express';
import { WeatherData, ForecastDay } from '../types';

const router = express.Router();

// Mock weather data - In a real app, this would integrate with a weather API
const generateMockWeather = (location: string): WeatherData => {
  const conditions = ['Sunny', 'Partly Cloudy', 'Cloudy', 'Rainy', 'Thunderstorms'];
  const icons = ['☀️', '⛅', '☁️', '🌧️', '⛈️'];
  
  const randomCondition = conditions[Math.floor(Math.random() * conditions.length)];
  const randomIcon = icons[Math.floor(Math.random() * icons.length)];
  
  const forecast: ForecastDay[] = [];
  for (let i = 0; i < 7; i++) {
    const date = new Date();
    date.setDate(date.getDate() + i);
    
    forecast.push({
      date: date.toISOString().split('T')[0],
      high: Math.floor(Math.random() * 15) + 20,
      low: Math.floor(Math.random() * 10) + 10,
      condition: conditions[Math.floor(Math.random() * conditions.length)],
      icon: icons[Math.floor(Math.random() * icons.length)],
      precipitation: Math.floor(Math.random() * 50)
    });
  }
  
  return {
    location,
    current: {
      temperature: Math.floor(Math.random() * 20) + 15,
      condition: randomCondition,
      humidity: Math.floor(Math.random() * 40) + 40,
      windSpeed: Math.floor(Math.random() * 20) + 5,
      icon: randomIcon
    },
    forecast
  };
};

// GET /api/weather/:location - Get weather for a location
router.get('/:location', (req: Request, res: Response) => {
  const { location } = req.params;
  
  if (!location) {
    return res.status(400).json({
      success: false,
      error: 'Location parameter is required'
    });
  }
  
  const weatherData = generateMockWeather(location);
  
  res.json({
    success: true,
    data: weatherData
  });
});

// GET /api/weather/coordinates/:lat/:lng - Get weather by coordinates
router.get('/coordinates/:lat/:lng', (req: Request, res: Response) => {
  const { lat, lng } = req.params;
  
  if (!lat || !lng) {
    return res.status(400).json({
      success: false,
      error: 'Latitude and longitude parameters are required'
    });
  }
  
  const location = `${lat}, ${lng}`;
  const weatherData = generateMockWeather(location);
  
  res.json({
    success: true,
    data: weatherData
  });
});

export default router;