import React from 'react';
import { useOrders } from '@/contexts/AppContext';

export default function RestaurantOrders() {
  const { orders } = useOrders();
  const statusLabels: Record<string, { label: string; color: string }> = {
    pending: { label: 'En attente', color: 'bg-zinga-gold/20 text-zinga-gold' },
    confirmed: { label: 'Confirmée', color: 'bg-zinga-green/20 text-zinga-green' },
    preparing: { label: 'En préparation', color: 'bg-zinga-orange/20 text-zinga-orange' },
    ready_for_pickup: { label: 'Prête', color: 'bg-zinga-green/20 text-zinga-green' },
    delivering: { label: 'En livraison', color: 'bg-zinga-orange/20 text-zinga-orange' },
    delivered: { label: 'Livrée', color: 'bg-zinga-green/20 text-zinga-green' },
    cancelled: { label: 'Annulée', color: 'bg-destructive/20 text-destructive' },
  };

  return (
    <div className="animate-fade-in-up p-4 lg:p-8">
      <h1 className="font-display text-3xl text-foreground mb-6">Toutes les commandes</h1>
      <div className="space-y-3">
        {orders.map(order => (
          <div key={order.id} className="bg-card border border-border rounded-xl p-4 flex items-center justify-between">
            <div>
              <p className="font-body font-semibold text-foreground text-sm">{order.id}</p>
              <p className="text-xs text-muted-foreground font-body">{order.items.map(i => `${i.emoji} ${i.name}`).join(', ')}</p>
              <p className="text-xs text-muted-foreground font-body mt-1">{order.clientDistrict} · {new Date(order.createdAt).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}</p>
            </div>
            <div className="text-right">
              <span className={`inline-block px-3 py-1 rounded-full text-xs font-body font-semibold ${statusLabels[order.status]?.color}`}>{statusLabels[order.status]?.label}</span>
              <p className="text-zinga-orange font-body font-bold text-sm mt-1">{order.total.toLocaleString()} {order.currency}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
