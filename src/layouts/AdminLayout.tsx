import React from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { LayoutDashboard, Package, Bike, UtensilsCrossed, DollarSign, BarChart3, LogOut } from 'lucide-react';
import { useApp } from '@/contexts/AppContext';

const navItems = [
  { path: '/admin', icon: LayoutDashboard, label: 'Dashboard' },
  { path: '/admin/orders', icon: Package, label: 'Commandes' },
  { path: '/admin/riders', icon: Bike, label: 'Riders' },
  { path: '/admin/restaurants', icon: UtensilsCrossed, label: 'Restaurants' },
  { path: '/admin/finance', icon: DollarSign, label: 'Finances' },
  { path: '/admin/stats', icon: BarChart3, label: 'Statistiques' },
];

export default function AdminLayout() {
  const { logout } = useApp();
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="min-h-screen bg-background flex">
      <aside className="hidden lg:flex flex-col w-64 bg-zinga-dark-2 border-r border-border fixed h-full z-30">
        <div className="p-6"><h1 className="font-display text-2xl text-zinga-orange cursor-pointer" onClick={() => navigate('/')}>ZINGA</h1><p className="text-xs text-zinga-purple font-body mt-1">⚙️ Administration</p></div>
        <nav className="flex-1 py-2">
          {navItems.map(item => {
            const isActive = location.pathname === item.path;
            return (<button key={item.path} onClick={() => navigate(item.path)} className={`w-full flex items-center gap-3 px-6 py-3 text-sm font-body transition-all ${isActive ? 'text-zinga-orange border-l-2 border-zinga-orange bg-zinga-orange/5' : 'text-muted-foreground hover:text-foreground'}`}><item.icon size={18} />{item.label}</button>);
          })}
        </nav>
        <div className="p-4 border-t border-border"><button onClick={() => { logout(); navigate('/'); }} className="flex items-center gap-2 text-muted-foreground text-sm font-body hover:text-destructive transition-colors"><LogOut size={16} /> Déconnexion</button></div>
      </aside>
      <main className="flex-1 lg:ml-64 pb-20 lg:pb-0"><Outlet /></main>
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-zinga-dark-2 border-t border-border flex justify-around py-2 z-30">
        {navItems.slice(0, 5).map(item => {
          const isActive = location.pathname === item.path;
          return (<button key={item.path} onClick={() => navigate(item.path)} className={`flex flex-col items-center gap-1 p-2 ${isActive ? 'text-zinga-orange' : 'text-muted-foreground'}`}><item.icon size={20} /><span className="text-[10px] font-body">{item.label}</span></button>);
        })}
      </nav>
    </div>
  );
}
