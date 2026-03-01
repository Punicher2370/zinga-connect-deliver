import React from 'react';
import { useRestaurants } from '@/contexts/AppContext';
import { toast } from 'sonner';

export default function AdminRestaurants() {
  const { restaurants } = useRestaurants();
  return (
    <div className="animate-fade-in-up p-4 lg:p-8">
      <h1 className="font-display text-3xl text-foreground mb-6">Gestion des Restaurants</h1>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {restaurants.map(r => (
          <div key={r.id} className="bg-card border border-border rounded-xl p-5 hover:border-zinga-orange/30 transition-all">
            <div className="flex items-center gap-3 mb-3">
              <img src={r.image} alt={r.name} className="w-12 h-12 rounded-xl object-cover" />
              <div className="flex-1 min-w-0">
                <p className="font-body font-semibold text-foreground truncate">{r.name}</p>
                <p className="text-xs text-muted-foreground font-body">{r.city} · {r.category}</p>
              </div>
              <span className={`px-2 py-0.5 rounded-full text-[10px] font-body font-bold ${r.isOpen ? 'bg-zinga-green/20 text-zinga-green' : 'bg-muted text-muted-foreground'}`}>{r.isOpen ? 'Ouvert' : 'Fermé'}</span>
            </div>
            <div className="grid grid-cols-2 gap-2 text-xs font-body mb-3">
              <span className="text-muted-foreground">⭐ {r.rating} ({r.reviewCount})</span>
              <span className="text-muted-foreground">📦 {r.ordersToday} cmd/jour</span>
              <span className="text-zinga-green">💰 {r.revenueToday.toLocaleString()} F</span>
              <span className="text-zinga-orange">🔥 {Math.round(r.revenueToday * 0.18).toLocaleString()} F comm.</span>
            </div>
            <button onClick={() => toast.info(`Détails de ${r.name}`)} className="w-full py-2 border border-border text-muted-foreground rounded-lg text-xs font-body hover:bg-secondary transition-all">Voir détails</button>
          </div>
        ))}
      </div>
    </div>
  );
}
