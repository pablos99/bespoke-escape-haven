
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from './components/ui/toaster';
import { Providers } from './contexts/Providers';
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
import GuideBooking from './pages/booking/GuideBooking';
import ProductBooking from './pages/booking/ProductBooking';
import { ProtectedRoute } from './components/auth/ProtectedRoute';
import AdminDashboard from './pages/admin/Dashboard';
import AdminProperties from './pages/admin/Properties';
import AdminServices from './pages/admin/Services';
import AdminDestinations from './pages/admin/Destinations';
import AdminTranslations from './pages/admin/Translations';
import AdminOrders from './pages/admin/Orders';

// Create a client
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Providers>
        <Router>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/properties" element={<Properties />} />
            <Route path="/property/:id" element={<Property />} />
            <Route path="/services" element={<Services />} />
            <Route path="/about" element={<About />} />
            <Route path="/booking" element={<Booking />} />
            <Route path="/booking/property/:id" element={<Booking />} />
            <Route path="/guides" element={<Guides />} />
            <Route path="/artisan-products" element={<ArtisanProducts />} />
            <Route path="/destinations" element={<Cities />} />
            <Route path="/destinations/bali" element={<Bali />} />
            <Route path="/destinations/tulum" element={<Tulum />} />
            <Route path="/auth/login" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/auth/signup" element={<Signup />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/booking/guide/:id" element={<GuideBooking />} />
            <Route path="/booking/product/:id" element={<ProductBooking />} />
            
            {/* Admin Routes - Protected */}
            <Route element={<ProtectedRoute />}>
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/admin/properties" element={<AdminProperties />} />
              <Route path="/admin/services" element={<AdminServices />} />
              <Route path="/admin/destinations" element={<AdminDestinations />} />
              <Route path="/admin/translations" element={<AdminTranslations />} />
              <Route path="/admin/orders" element={<AdminOrders />} />
            </Route>
            
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Toaster />
        </Router>
      </Providers>
    </QueryClientProvider>
  );
}

export default App;
