import React from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { Home, Navigation, DollarSign, User, LogOut } from 'lucide-react';
import { useApp, useRiders } from '@/contexts/AppContext';

const navItems = [
  { path: '/rider', icon: Home, label: 'Commandes' },
  { path: '/rider/active', icon: Navigation, label: 'En cours' },
  { path: '/rider/earnings', icon: DollarSign, label: 'Gains' },
  { path: '/rider/profile', icon: User, label: 'Profil' },
];

export default function RiderLayout() {
  const { currentUser, logout } = useApp();
  const { riders, updateRiderStatus } = useRiders();
  const navigate = useNavigate();
  const location = useLocation();

  const rider = riders[0]; // Default to first rider
  const [isOnline, setIsOnline] = React.useState(rider?.isOnline ?? true);

  const toggleOnline = () => {
    setIsOnline(!isOnline);
    updateRiderStatus(rider?.id || 'rid1', !isOnline);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className={`sticky top-0 z-30 border-b border-border px-4 py-3 flex items-center justify-between transition-colors duration-500 ${isOnline ? 'bg-zinga-dark-2 border-zinga-green/20' : 'bg-zinga-dark-3'}`}>
        <div className="flex items-center gap-3">
          <span className="font-display text-xl text-zinga-orange cursor-pointer" onClick={() => navigate('/')}>ZINGA</span>
          <span className={`px-2 py-0.5 rounded-full text-[10px] font-body font-bold tracking-wider ${isOnline ? 'bg-zinga-green/20 text-zinga-green animate-pulse-status' : 'bg-secondary text-muted-foreground'}`}>
            {isOnline ? '⚡ EN LIGNE' : '⭕ HORS LIGNE'}
          </span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-sm font-body text-foreground">{currentUser?.name || rider?.name || 'Rider'}</span>
          <button
            onClick={toggleOnline}
            className={`relative w-14 h-7 rounded-full transition-colors duration-300 ${isOnline ? 'bg-zinga-green' : 'bg-secondary'}`}
          >
            <div className={`absolute top-0.5 w-6 h-6 rounded-full bg-primary-foreground shadow-md transition-transform duration-300 ${isOnline ? 'translate-x-7' : 'translate-x-0.5'}`} />
          </button>
        </div>
      </header>

      {/* Main */}
      <main className="pb-20">
        <Outlet context={{ isOnline, rider }} />
      </main>

      {/* Bottom nav */}
      <nav className="fixed bottom-0 left-0 right-0 bg-zinga-dark-2 border-t border-border flex justify-around py-2 z-30">
        {navItems.map(item => {
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
