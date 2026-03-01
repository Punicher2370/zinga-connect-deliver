import React from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { Home, Search, Package, Heart, Gift, User, ShoppingCart, LogOut } from 'lucide-react';
import { useApp } from '@/contexts/AppContext';
import { useCart } from '@/contexts/AppContext';

const navItems = [
  { path: '/client', icon: Home, label: 'Accueil' },
  { path: '/client/orders', icon: Package, label: 'Commandes' },
  { path: '/client/favorites', icon: Heart, label: 'Favoris' },
  { path: '/client/offers', icon: Gift, label: 'Offres' },
  { path: '/client/profile', icon: User, label: 'Profil' },
];

export default function ClientLayout() {
  const { currentUser, logout } = useApp();
  const { cartItems, cartTotal } = useCart();
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="min-h-screen bg-background flex">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex flex-col w-60 bg-zinga-dark-2 border-r border-border fixed h-full z-30">
        <div className="p-6">
          <h1 className="font-display text-3xl text-zinga-orange cursor-pointer" onClick={() => navigate('/')}>ZINGA</h1>
        </div>

        {/* User info */}
        <div className="px-6 pb-4 border-b border-border">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-zinga-orange flex items-center justify-center text-primary-foreground font-bold text-sm">
              {currentUser?.name?.charAt(0) || 'J'}
            </div>
            <div>
              <p className="text-foreground text-sm font-medium font-body">{currentUser?.name || 'Jean-Baptiste'}</p>
              <span className="text-xs text-zinga-orange font-body">📍 {currentUser?.city || 'Douala'}</span>
            </div>
          </div>
        </div>

        <nav className="flex-1 py-4">
          {navItems.map(item => {
            const isActive = location.pathname === item.path || (item.path === '/client' && location.pathname === '/client');
            return (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className={`w-full flex items-center gap-3 px-6 py-3 text-sm font-body transition-all ${isActive ? 'text-zinga-orange border-l-2 border-zinga-orange bg-zinga-orange/5' : 'text-muted-foreground hover:text-foreground hover:bg-secondary/50'}`}
              >
                <item.icon size={18} />
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Cart summary */}
        {cartItems.length > 0 && (
          <div className="mx-4 mb-3">
            <button
              onClick={() => navigate('/client/cart')}
              className="w-full flex items-center justify-between bg-zinga-orange text-primary-foreground rounded-lg px-4 py-3 font-body text-sm font-semibold hover:bg-zinga-orange-dark transition-all"
            >
              <span className="flex items-center gap-2"><ShoppingCart size={16} /> {cartItems.length} articles</span>
              <span>{cartTotal.toLocaleString()} FCFA</span>
            </button>
          </div>
        )}

        <div className="p-4 border-t border-border">
          <button onClick={() => { logout(); navigate('/'); }} className="flex items-center gap-2 text-muted-foreground text-sm font-body hover:text-destructive transition-colors">
            <LogOut size={16} /> Déconnexion
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 lg:ml-60 pb-20 lg:pb-0">
        <Outlet />
      </main>

      {/* Mobile bottom nav */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-zinga-dark-2 border-t border-border flex justify-around py-2 z-30">
        {navItems.slice(0, 5).map(item => {
          const isActive = location.pathname === item.path;
          return (
            <button key={item.path} onClick={() => navigate(item.path)} className={`flex flex-col items-center gap-1 p-2 ${isActive ? 'text-zinga-orange' : 'text-muted-foreground'}`}>
              <item.icon size={20} />
              <span className="text-[10px] font-body">{item.label}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );
}
