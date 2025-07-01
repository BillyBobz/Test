import axios from 'axios';
import { Destination, Trip, User, WeatherData, ApiResponse } from '../types';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Destinations API
export const destinationsApi = {
  getAll: async (params?: { category?: string; country?: string; minRating?: number }) => {
    const response = await api.get<ApiResponse<Destination[]>>('/destinations', { params });
    return response.data;
  },
  
  getById: async (id: string) => {
    const response = await api.get<ApiResponse<Destination>>(`/destinations/${id}`);
    return response.data;
  },
  
  search: async (query: string) => {
    const response = await api.get<ApiResponse<Destination[]>>(`/destinations/search/${query}`);
    return response.data;
  },
};

// Trips API
export const tripsApi = {
  getAll: async (params?: { userId?: string; status?: string }) => {
    const response = await api.get<ApiResponse<Trip[]>>('/trips', { params });
    return response.data;
  },
  
  getById: async (id: string) => {
    const response = await api.get<ApiResponse<Trip>>(`/trips/${id}`);
    return response.data;
  },
  
  create: async (trip: Partial<Trip>) => {
    const response = await api.post<ApiResponse<Trip>>('/trips', trip);
    return response.data;
  },
  
  update: async (id: string, trip: Partial<Trip>) => {
    const response = await api.put<ApiResponse<Trip>>(`/trips/${id}`, trip);
    return response.data;
  },
  
  delete: async (id: string) => {
    const response = await api.delete<ApiResponse<{ message: string }>>(`/trips/${id}`);
    return response.data;
  },
  
  addItineraryItem: async (tripId: string, item: any) => {
    const response = await api.post<ApiResponse<any>>(`/trips/${tripId}/itinerary`, item);
    return response.data;
  },
};

// Users API
export const usersApi = {
  getById: async (id: string) => {
    const response = await api.get<ApiResponse<User>>(`/users/${id}`);
    return response.data;
  },
  
  create: async (user: Partial<User>) => {
    const response = await api.post<ApiResponse<User>>('/users', user);
    return response.data;
  },
  
  update: async (id: string, user: Partial<User>) => {
    const response = await api.put<ApiResponse<User>>(`/users/${id}`, user);
    return response.data;
  },
  
  updatePreferences: async (id: string, preferences: Partial<User['preferences']>) => {
    const response = await api.put<ApiResponse<User>>(`/users/${id}/preferences`, preferences);
    return response.data;
  },
};

// Weather API
export const weatherApi = {
  getByLocation: async (location: string) => {
    const response = await api.get<ApiResponse<WeatherData>>(`/weather/${location}`);
    return response.data;
  },
  
  getByCoordinates: async (lat: number, lng: number) => {
    const response = await api.get<ApiResponse<WeatherData>>(`/weather/coordinates/${lat}/${lng}`);
    return response.data;
  },
};

export default api;