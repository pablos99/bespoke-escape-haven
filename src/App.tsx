
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from './components/ui/toaster';
import Index from './pages/Index';
import Properties from './pages/Properties';
import Property from './pages/Property';
import Services from './pages/Services';
import About from './pages/About';
import Booking from './pages/Booking';
import Guides from './pages/Guides';
import ArtisanProducts from './pages/ArtisanProducts';
import NotFound from './pages/NotFound';
import Login from './pages/auth/Login';
import Signup from './pages/auth/Signup';
import Cities from './pages/cities/Cities';
import Bali from './pages/cities/Bali';
import Tulum from './pages/cities/Tulum';
import Terms from './pages/Terms';
import Privacy from './pages/Privacy';
import PropertyBooking from './pages/booking/PropertyBooking';
import GuideBooking from './pages/booking/GuideBooking';
import ProductBooking from './pages/booking/ProductBooking';

// Create a client
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/properties" element={<Properties />} />
          <Route path="/property/:id" element={<Property />} />
          <Route path="/services" element={<Services />} />
          <Route path="/about" element={<About />} />
          <Route path="/booking" element={<Booking />} />
          <Route path="/guides" element={<Guides />} />
          <Route path="/artisan-products" element={<ArtisanProducts />} />
          <Route path="/destinations" element={<Cities />} />
          <Route path="/destinations/bali" element={<Bali />} />
          <Route path="/destinations/tulum" element={<Tulum />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/booking/property/:id" element={<PropertyBooking />} />
          <Route path="/booking/guide/:id" element={<GuideBooking />} />
          <Route path="/booking/product/:id" element={<ProductBooking />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Toaster />
      </Router>
    </QueryClientProvider>
  );
}

export default App;
