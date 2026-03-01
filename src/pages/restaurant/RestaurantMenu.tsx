import React, { useState } from 'react';
import { useRestaurants } from '@/contexts/AppContext';
import { toast } from 'sonner';

export default function RestaurantMenu() {
  const { restaurants, updateMenuItem } = useRestaurants();
  const restaurant = restaurants[0];
  const [activeCategory, setActiveCategory] = useState('Tout');
  const categories = ['Tout', ...Array.from(new Set(restaurant?.menu.map(m => m.category) || []))];
  const items = activeCategory === 'Tout' ? restaurant?.menu || [] : restaurant?.menu.filter(m => m.category === activeCategory) || [];

  return (
    <div className="animate-fade-in-up p-4 lg:p-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-display text-3xl text-foreground">Mon Menu</h1>
        <button onClick={() => toast.info('Ajout d\'article bientôt disponible')} className="px-4 py-2 bg-zinga-orange text-primary-foreground rounded-lg font-body text-sm font-bold hover:bg-zinga-orange-dark transition-all">+ Ajouter</button>
      </div>
      <div className="flex gap-2 overflow-x-auto pb-4 mb-4">
        {categories.map(c => (
          <button key={c} onClick={() => setActiveCategory(c)} className={`px-4 py-1.5 rounded-full text-xs font-body whitespace-nowrap transition-all ${activeCategory === c ? 'bg-zinga-orange text-primary-foreground' : 'bg-card border border-border text-muted-foreground'}`}>{c}</button>
        ))}
      </div>
      <div className="space-y-3">
        {items.map(item => (
          <div key={item.id} className="flex items-center gap-4 bg-card border border-border rounded-xl p-4">
            <span className="text-3xl">{item.emoji}</span>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <p className="font-body font-semibold text-foreground">{item.name}</p>
                {item.isPopular && <span className="text-[10px] text-zinga-orange font-body font-bold">🔥</span>}
              </div>
              <p className="text-xs text-muted-foreground font-body truncate">{item.description}</p>
              <p className="text-zinga-orange font-body font-bold text-sm mt-1">{item.price.toLocaleString()} {item.currency}</p>
            </div>
            <button
              onClick={() => { updateMenuItem(restaurant.id, item.id, { isAvailable: !item.isAvailable }); toast.success(item.isAvailable ? 'Marqué épuisé' : 'Marqué disponible'); }}
              className={`px-3 py-1.5 rounded-full text-xs font-body font-bold transition-all ${item.isAvailable ? 'bg-zinga-green/20 text-zinga-green' : 'bg-destructive/20 text-destructive'}`}
            >
              {item.isAvailable ? 'Disponible' : 'Épuisé'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
