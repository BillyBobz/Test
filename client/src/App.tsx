import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { UserProvider } from './contexts/UserContext';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import DestinationsPage from './pages/DestinationsPage';
import DestinationDetailPage from './pages/DestinationDetailPage';
import TripsPage from './pages/TripsPage';
import TripDetailPage from './pages/TripDetailPage';
import ProfilePage from './pages/ProfilePage';
import './App.css';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <UserProvider>
        <Router>
          <div className="min-h-screen bg-gray-50">
            <Header />
            <main>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/destinations" element={<DestinationsPage />} />
                <Route path="/destinations/:id" element={<DestinationDetailPage />} />
                <Route path="/trips" element={<TripsPage />} />
                <Route path="/trips/:id" element={<TripDetailPage />} />
                <Route path="/profile" element={<ProfilePage />} />
              </Routes>
            </main>
          </div>
        </Router>
      </UserProvider>
    </QueryClientProvider>
  );
}

export default App;