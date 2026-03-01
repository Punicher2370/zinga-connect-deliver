import React from 'react';
import { useOutletContext } from 'react-router-dom';
import { MapPin, DollarSign, Clock, Bike } from 'lucide-react';
import { useOrders } from '@/contexts/AppContext';
import { toast } from 'sonner';

export default function RiderHome() {
  const { isOnline } = useOutletContext<{ isOnline: boolean }>();
  const { orders, updateOrderStatus, assignRider } = useOrders();

  const pendingOrders = orders.filter(o => o.status === 'pending');

  if (!isOnline) {
    return (
      <div className="animate-fade-in-up flex flex-col items-center justify-center min-h-[70vh] p-8 text-center">
        <span className="text-6xl mb-4">🚴</span>
        <h2 className="font-display text-3xl text-foreground mb-2">Vous êtes hors ligne</h2>
        <p className="text-muted-foreground font-body text-sm">Activez votre disponibilité pour recevoir des commandes</p>
      </div>
    );
  }

  if (pendingOrders.length === 0) {
    return (
      <div className="animate-fade-in-up flex flex-col items-center justify-center min-h-[70vh] p-8 text-center">
        <div className="w-16 h-16 rounded-full bg-zinga-orange/20 flex items-center justify-center mb-4 animate-pulse-glow">
          <MapPin className="text-zinga-orange" size={28} />
        </div>
        <h2 className="font-display text-2xl text-foreground mb-2">Recherche de commandes...</h2>
        <p className="text-muted-foreground font-body text-sm mb-4">Zone de couverture: 5 km</p>
        <div className="bg-card border border-border rounded-xl p-4 max-w-xs">
          <p className="text-sm font-body text-foreground">💡 Astuce: Les commandes sont plus fréquentes entre 12h et 14h</p>
        </div>
      </div>
    );
  }

  const acceptOrder = (orderId: string) => {
    assignRider(orderId, 'rid1', 'Ibrahim Manga');
    updateOrderStatus(orderId, 'confirmed');
    toast.success('Commande acceptée! 🎉');
  };

  return (
    <div className="animate-fade-in-up p-4 max-w-xl mx-auto">
      <h2 className="font-display text-2xl text-foreground mb-4">Commandes disponibles ({pendingOrders.length})</h2>

      <div className="space-y-4">
        {pendingOrders.map(order => (
          <div key={order.id} className="bg-card border border-zinga-orange/30 rounded-xl p-5 animate-slide-in-top">
            <div className="flex items-center justify-between mb-3">
              <span className="font-body font-semibold text-foreground">{order.restaurantName}</span>
              <span className="px-2 py-1 rounded-full bg-destructive/20 text-destructive text-xs font-body font-bold">⏱ 0:30</span>
            </div>

            <div className="space-y-2 text-sm font-body text-muted-foreground mb-4">
              <div className="flex items-center gap-2"><MapPin size={14} className="text-zinga-orange" /> {order.clientDistrict}</div>
              <div className="flex items-center gap-2"><Bike size={14} /> 1.8 km du restaurant</div>
              <div className="flex items-center gap-2"><MapPin size={14} /> 3.2 km jusqu'au client</div>
              <div className="flex items-center gap-2">📦 {order.items.length} articles</div>
            </div>

            <div className="flex items-center justify-between mb-4">
              <span className="font-body font-bold text-zinga-green text-lg flex items-center gap-1"><DollarSign size={16} /> 850 FCFA</span>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => acceptOrder(order.id)}
                className="flex-1 h-12 bg-zinga-green text-primary-foreground rounded-lg font-body font-bold hover:bg-zinga-green/80 transition-all"
              >
                ✓ Accepter
              </button>
              <button className="px-6 h-12 border border-border text-muted-foreground rounded-lg font-body text-sm hover:bg-secondary transition-all">
                Passer →
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
