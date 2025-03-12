
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppProvider } from "@/contexts/AppContext";
import Index from "./pages/Index";
import Properties from "./pages/Properties";
import Services from "./pages/Services";
import ArtisanProducts from "./pages/ArtisanProducts";
import Guides from "./pages/Guides";
import Booking from "./pages/Booking";
import About from "./pages/About";
import Cities from "./pages/cities/Cities";
import Bali from "./pages/cities/Bali";
import Tulum from "./pages/cities/Tulum";
import NotFound from "./pages/NotFound";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import PropertyBooking from "./pages/booking/PropertyBooking";
import ProductBooking from "./pages/booking/ProductBooking";
import GuideBooking from "./pages/booking/GuideBooking";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AppProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/properties" element={<Properties />} />
            <Route path="/services" element={<Services />} />
            <Route path="/artisan-products" element={<ArtisanProducts />} />
            <Route path="/services/guides" element={<Guides />} />
            <Route path="/booking" element={<Booking />} />
            <Route path="/booking/property/:propertyId" element={<PropertyBooking />} />
            <Route path="/booking/product/:productId" element={<ProductBooking />} />
            <Route path="/booking/guide/:guideId" element={<GuideBooking />} />
            <Route path="/about" element={<About />} />
            <Route path="/cities" element={<Cities />} />
            <Route path="/cities/bali" element={<Bali />} />
            <Route path="/cities/tulum" element={<Tulum />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AppProvider>
  </QueryClientProvider>
);

export default App;
