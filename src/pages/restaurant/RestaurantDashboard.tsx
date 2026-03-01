import React from 'react';
import { useOutletContext } from 'react-router-dom';
import { Package, DollarSign, Clock, Star, Check, X } from 'lucide-react';
import { useOrders } from '@/contexts/AppContext';
import { toast } from 'sonner';

export default function RestaurantDashboard() {
  const { orders, updateOrderStatus } = useOrders();
  const pending = orders.filter(o => o.status === 'pending');
  const preparing = orders.filter(o => o.status === 'preparing' || o.status === 'confirmed');
  const delivered = orders.filter(o => o.status === 'delivered');

  return (
    <div className="animate-fade-in-up p-4 lg:p-8">
      <h1 className="font-display text-3xl text-foreground mb-6">Dashboard</h1>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
        {[
          { icon: Package, label: "Commandes aujourd'hui", value: '23', trend: '▲ 15%', color: 'text-zinga-orange' },
          { icon: DollarSign, label: "Revenus aujourd'hui", value: '87 500 FCFA', trend: '▲ 8%', color: 'text-zinga-green' },
          { icon: Clock, label: 'En cours', value: String(pending.length + preparing.length), color: 'text-zinga-gold' },
          { icon: Star, label: 'Note moyenne', value: '4.9/5', color: 'text-zinga-gold' },
        ].map(s => (
          <div key={s.label} className="bg-card border border-border rounded-xl p-4">
            <s.icon size={18} className={`${s.color} mb-2`} />
            <p className={`font-display text-xl ${s.color}`}>{s.value}</p>
            <p className="text-xs text-muted-foreground font-body">{s.label}</p>
            {s.trend && <span className="text-xs text-zinga-green font-body">{s.trend}</span>}
          </div>
        ))}
      </div>

      <h2 className="font-display text-xl text-foreground mb-4">Commandes en temps réel 🔴</h2>
      {pending.length === 0 && preparing.length === 0 ? (
        <div className="text-center py-12 bg-card border border-border rounded-xl"><span className="text-4xl block mb-2">✅</span><p className="text-muted-foreground font-body">Aucune commande en attente</p></div>
      ) : (
        <div className="space-y-3">
          {pending.map(order => (
            <div key={order.id} className="bg-card border-2 border-zinga-orange/50 rounded-xl p-5 animate-pulse-glow">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-body font-bold text-zinga-orange">🔔 Nouvelle commande!</span>
                <span className="text-xs font-body text-destructive">Répondez dans 02:34</span>
              </div>
              <p className="font-body font-semibold text-foreground">{order.id} · {order.clientDistrict}</p>
              <p className="text-sm text-muted-foreground font-body my-2">{order.items.map(i => `${i.emoji} ${i.name} x${i.quantity}`).join(' · ')}</p>
              <p className="text-zinga-orange font-bold font-body mb-3">{order.total.toLocaleString()} {order.currency}</p>
              <div className="flex gap-3">
                <button onClick={() => { updateOrderStatus(order.id, 'confirmed'); toast.success('Commande confirmée!'); }} className="flex-1 h-10 bg-zinga-green text-primary-foreground rounded-lg font-body font-bold text-sm flex items-center justify-center gap-1"><Check size={16} /> Confirmer</button>
                <button onClick={() => { updateOrderStatus(order.id, 'cancelled'); toast.error('Commande refusée'); }} className="px-4 h-10 bg-destructive text-primary-foreground rounded-lg font-body text-sm flex items-center justify-center gap-1"><X size={16} /> Refuser</button>
              </div>
            </div>
          ))}
          {preparing.map(order => (
            <div key={order.id} className="bg-card border border-zinga-gold/30 rounded-xl p-5">
              <span className="text-xs font-body font-bold text-zinga-gold">👨‍🍳 En préparation</span>
              <p className="font-body font-semibold text-foreground mt-1">{order.id}</p>
              <p className="text-sm text-muted-foreground font-body my-2">{order.items.map(i => `${i.emoji} ${i.name} x${i.quantity}`).join(' · ')}</p>
              <button onClick={() => { updateOrderStatus(order.id, 'ready_for_pickup'); toast.success('Prêt pour le rider!'); }} className="w-full h-10 bg-zinga-orange text-primary-foreground rounded-lg font-body font-bold text-sm mt-2">✅ Prêt pour le Rider</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
