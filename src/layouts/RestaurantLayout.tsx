import React from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { LayoutDashboard, Package, BookOpen, BarChart3, Star, LogOut } from 'lucide-react';
import { useApp, useRestaurants } from '@/contexts/AppContext';

const navItems = [
  { path: '/restaurant', icon: LayoutDashboard, label: 'Dashboard' },
  { path: '/restaurant/orders', icon: Package, label: 'Commandes' },
  { path: '/restaurant/menu', icon: BookOpen, label: 'Menu' },
  { path: '/restaurant/stats', icon: BarChart3, label: 'Stats' },
];

export default function RestaurantLayout() {
  const { currentUser, logout } = useApp();
  const { restaurants, toggleRestaurantOpen } = useRestaurants();
  const navigate = useNavigate();
  const location = useLocation();
  const restaurant = restaurants[0];
  const [isOpen, setIsOpen] = React.useState(restaurant?.isOpen ?? true);

  const toggle = () => { setIsOpen(!isOpen); toggleRestaurantOpen(restaurant?.id || 'r1'); };

  return (
    <div className="min-h-screen bg-background flex">
      <aside className="hidden lg:flex flex-col w-60 bg-zinga-dark-2 border-r border-border fixed h-full z-30">
        <div className="p-6">
          <h1 className="font-display text-2xl text-zinga-orange cursor-pointer" onClick={() => navigate('/')}>ZINGA</h1>
          <p className="text-xs text-muted-foreground font-body mt-1">Restaurant</p>
        </div>
        <div className="px-6 pb-4 border-b border-border">
          <p className="font-body font-semibold text-foreground text-sm">{restaurant?.name || 'Chez Mama Ngono'}</p>
          <div className="flex items-center gap-2 mt-2">
            <button onClick={toggle} className={`relative w-12 h-6 rounded-full transition-colors ${isOpen ? 'bg-zinga-green' : 'bg-secondary'}`}>
              <div className={`absolute top-0.5 w-5 h-5 rounded-full bg-primary-foreground shadow transition-transform ${isOpen ? 'translate-x-6' : 'translate-x-0.5'}`} />
            </button>
            <span className={`text-xs font-body ${isOpen ? 'text-zinga-green' : 'text-muted-foreground'}`}>{isOpen ? '🟢 Ouvert' : '⭕ Fermé'}</span>
          </div>
        </div>
        <nav className="flex-1 py-4">
          {navItems.map(item => {
            const isActive = location.pathname === item.path;
            return (
              <button key={item.path} onClick={() => navigate(item.path)} className={`w-full flex items-center gap-3 px-6 py-3 text-sm font-body transition-all ${isActive ? 'text-zinga-orange border-l-2 border-zinga-orange bg-zinga-orange/5' : 'text-muted-foreground hover:text-foreground'}`}>
                <item.icon size={18} />{item.label}
              </button>
            );
          })}
        </nav>
        <div className="p-4 border-t border-border">
          <button onClick={() => { logout(); navigate('/'); }} className="flex items-center gap-2 text-muted-foreground text-sm font-body hover:text-destructive transition-colors"><LogOut size={16} /> Déconnexion</button>
        </div>
      </aside>
      <main className="flex-1 lg:ml-60 pb-20 lg:pb-0"><Outlet context={{ restaurant, isOpen }} /></main>
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-zinga-dark-2 border-t border-border flex justify-around py-2 z-30">
        {navItems.map(item => {
          const isActive = location.pathname === item.path;
          return (<button key={item.path} onClick={() => navigate(item.path)} className={`flex flex-col items-center gap-1 p-2 ${isActive ? 'text-zinga-orange' : 'text-muted-foreground'}`}><item.icon size={20} /><span className="text-[10px] font-body">{item.label}</span></button>);
        })}
      </nav>
    </div>
  );
}
