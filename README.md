# TravelApp - Comprehensive Travel Planning Platform

A modern, full-stack travel application built with React, TypeScript, Node.js, and Express. Plan your perfect trips with destination discovery, itinerary management, reviews, and navigation features.

## Features

### 🗺️ Destination Discovery
- Browse destinations by category (beach, mountain, city, cultural, adventure, nature)
- Search destinations by name, country, or activities
- View detailed destination information with high-quality images
- Filter by rating, country, and preferences

### ⭐ Reviews & Ratings
- Read authentic reviews from Google and other travel platforms
- View star ratings and user photos
- Filter reviews by source (Google, TripAdvisor, Internal)
- See overall ratings and review counts

### 🧭 Navigation & Directions
- Copy destination addresses with one click
- Open locations directly in Google Maps
- Get turn-by-turn directions from your current location
- View coordinates and detailed location information

### 📅 Trip Planning & Itineraries
- Create and manage personalized trip itineraries
- Add destinations to your trips
- Plan day-by-day activities
- Track trip budgets and expenses
- Manage trip status (planning, booked, ongoing, completed)

### 🌤️ Weather Integration
- View current weather conditions for destinations
- 7-day weather forecasts
- Weather-based travel recommendations
- Climate information for trip planning

### 👤 User Profiles
- Personalized travel preferences
- Save favorite destinations
- Track travel history
- Customize travel style (budget, mid-range, luxury)

### 🔍 Smart Search
- Global search across destinations
- Filter by multiple criteria
- Search suggestions and autocomplete
- Category-based browsing

## Tech Stack

### Frontend
- **React 18** with TypeScript
- **Tailwind CSS** for styling
- **React Router** for navigation
- **React Query** for state management
- **Leaflet** for interactive maps
- **Lucide React** for icons
- **Axios** for API communication

### Backend
- **Node.js** with Express
- **TypeScript** for type safety
- **CORS** for cross-origin requests
- **UUID** for unique identifiers
- **Modular route structure**

## Project Structure

```
travel-app/
├── client/                 # React frontend
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   │   ├── Header.tsx
│   │   │   ├── ReviewsSection.tsx
│   │   │   └── DirectionsSection.tsx
│   │   ├── pages/          # Page components
│   │   │   ├── HomePage.tsx
│   │   │   ├── DestinationsPage.tsx
│   │   │   ├── DestinationDetailPage.tsx
│   │   │   ├── TripsPage.tsx
│   │   │   ├── TripDetailPage.tsx
│   │   │   └── ProfilePage.tsx
│   │   ├── services/       # API services
│   │   │   └── api.ts
│   │   ├── types/          # TypeScript interfaces
│   │   │   └── index.ts
│   │   ├── App.tsx
│   │   ├── App.css
│   │   └── index.tsx
│   ├── package.json
│   ├── tsconfig.json
│   ├── tailwind.config.js
│   └── postcss.config.js
├── server/                 # Express backend
│   ├── src/
│   │   ├── routes/         # API route handlers
│   │   │   ├── destinations.ts
│   │   │   ├── trips.ts
│   │   │   ├── weather.ts
│   │   │   └── users.ts
│   │   ├── types/          # TypeScript interfaces
│   │   │   └── index.ts
│   │   └── index.ts
│   ├── package.json
│   ├── tsconfig.json
│   └── .env
├── package.json
└── README.md
```

## Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Git

### Quick Start

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/travel-app.git
   cd travel-app
   ```

2. **Install all dependencies**
   ```bash
   npm run install-all
   ```

3. **Start the development servers**
   ```bash
   npm run dev
   ```

   This will start:
   - Frontend on http://localhost:3000
   - Backend on http://localhost:5000

### Manual Setup

If you prefer to set up each part separately:

1. **Install root dependencies**
   ```bash
   npm install
   ```

2. **Setup the backend**
   ```bash
   cd server
   npm install
   npm run dev
   ```

3. **Setup the frontend** (in a new terminal)
   ```bash
   cd client
   npm install
   npm start
   ```

## Environment Variables

Create a `.env` file in the `server` directory:

```env
PORT=5000
NODE_ENV=development

# Optional: Add API keys for external services
# WEATHER_API_KEY=your_weather_api_key
# GOOGLE_MAPS_API_KEY=your_google_maps_api_key
```

## Available Scripts

### Root Level
- `npm run dev` - Start both frontend and backend in development mode
- `npm run install-all` - Install dependencies for all packages
- `npm run build` - Build the frontend for production
- `npm start` - Start the production server

### Client (Frontend)
- `npm start` - Start the React development server
- `npm run build` - Build for production
- `npm test` - Run tests

### Server (Backend)
- `npm run dev` - Start the Express server with hot reload
- `npm run build` - Compile TypeScript to JavaScript
- `npm start` - Start the production server

## API Endpoints

### Destinations
- `GET /api/destinations` - Get all destinations
- `GET /api/destinations/:id` - Get destination by ID
- `GET /api/destinations/search/:query` - Search destinations

### Trips
- `GET /api/trips` - Get user trips
- `POST /api/trips` - Create new trip
- `PUT /api/trips/:id` - Update trip
- `DELETE /api/trips/:id` - Delete trip
- `POST /api/trips/:id/itinerary` - Add itinerary item

### Weather
- `GET /api/weather/:location` - Get weather by location
- `GET /api/weather/coordinates/:lat/:lng` - Get weather by coordinates

### Users
- `GET /api/users/:id` - Get user profile
- `POST /api/users` - Create user
- `PUT /api/users/:id` - Update user
- `PUT /api/users/:id/preferences` - Update user preferences

## Key Features Explained

### Reviews System
- Displays reviews from multiple sources (Google, TripAdvisor)
- Star ratings with visual indicators
- User profile photos and review dates
- Source badges for credibility

### Directions Integration
- One-click address copying to clipboard
- Direct Google Maps integration
- Turn-by-turn navigation links
- Coordinate display for precise location

### Modern UI/UX
- Clean, minimalistic design
- Responsive layout for all devices
- Smooth animations and transitions
- Intuitive navigation
- Accessible color scheme

## Future Enhancements

- [ ] Real-time weather API integration
- [ ] Google Places API for live reviews
- [ ] User authentication and accounts
- [ ] Social features and trip sharing
- [ ] Mobile app with React Native
- [ ] Offline functionality
- [ ] Multi-language support
- [ ] Currency conversion
- [ ] Booking integration

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- React and TypeScript communities
- Tailwind CSS for the utility-first CSS framework
- Unsplash for providing beautiful travel images
- Lucide for the icon library
- Leaflet for mapping capabilities

## Support

For support, email support@travelapp.com or create an issue in the GitHub repository.

---

**Built with ❤️ for travelers around the world**