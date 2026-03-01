import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Pages générales
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

// Pages Client
import ClientHome from "./pages/client/ClientHome";
import ClientCart from "./pages/client/ClientCart";
import ClientOrders from "./pages/client/ClientOrders";
import ClientFavorites from "./pages/client/ClientFavorites";
import ClientOffers from "./pages/client/ClientOffers";
import ClientProfile from "./pages/client/ClientProfile";
import RestaurantDetail from "./pages/client/RestaurantDetail";
import OrderTracking from "./pages/client/OrderTracking";

// Pages Rider
import RiderHome from "./pages/rider/RiderHome";
import RiderActive from "./pages/rider/RiderActive";
import RiderEarnings from "./pages/rider/RiderEarnings";
import RiderProfile from "./pages/rider/RiderProfile";

// Pages Restaurant
import RestaurantDashboard from "./pages/restaurant/RestaurantDashboard";
import RestaurantOrders from "./pages/restaurant/RestaurantOrders";
import RestaurantMenu from "./pages/restaurant/RestaurantMenu";
import RestaurantStats from "./pages/restaurant/RestaurantStats";

// Pages Admin
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminOrders from "./pages/admin/AdminOrders";
import AdminRiders from "./pages/admin/AdminRiders";
import AdminRestaurants from "./pages/admin/AdminRestaurants";
import AdminFinance from "./pages/admin/AdminFinance";
import AdminStats from "./pages/admin/AdminStats";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>

          {/* ── PAGE D'ACCUEIL — Sélection du rôle ── */}
          <Route path="/" element={<Index />} />

          {/* ── INTERFACE CLIENT ── */}
          <Route path="/client" element={<Navigate to="/client/home" replace />} />
          <Route path="/client/home" element={<ClientHome />} />
          <Route path="/client/cart" element={<ClientCart />} />
          <Route path="/client/orders" element={<ClientOrders />} />
          <Route path="/client/favorites" element={<ClientFavorites />} />
          <Route path="/client/offers" element={<ClientOffers />} />
          <Route path="/client/profile" element={<ClientProfile />} />
          <Route path="/client/restaurant/:id" element={<RestaurantDetail />} />
          <Route path="/client/tracking/:orderId" element={<OrderTracking />} />

          {/* ── INTERFACE RIDER ── */}
          <Route path="/rider" element={<Navigate to="/rider/home" replace />} />
          <Route path="/rider/home" element={<RiderHome />} />
          <Route path="/rider/active" element={<RiderActive />} />
          <Route path="/rider/earnings" element={<RiderEarnings />} />
          <Route path="/rider/profile" element={<RiderProfile />} />

          {/* ── INTERFACE RESTAURANT ── */}
          <Route path="/restaurant" element={<Navigate to="/restaurant/dashboard" replace />} />
          <Route path="/restaurant/dashboard" element={<RestaurantDashboard />} />
          <Route path="/restaurant/orders" element={<RestaurantOrders />} />
          <Route path="/restaurant/menu" element={<RestaurantMenu />} />
          <Route path="/restaurant/stats" element={<RestaurantStats />} />

          {/* ── INTERFACE ADMIN ── */}
          <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/orders" element={<AdminOrders />} />
          <Route path="/admin/riders" element={<AdminRiders />} />
          <Route path="/admin/restaurants" element={<AdminRestaurants />} />
          <Route path="/admin/finance" element={<AdminFinance />} />
          <Route path="/admin/stats" element={<AdminStats />} />

          {/* ── 404 — doit toujours être en dernier ── */}
          <Route path="*" element={<NotFound />} />

        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
