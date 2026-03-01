import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Star, MapPin } from 'lucide-react';
import { useOrders } from '@/contexts/AppContext';
import { toast } from 'sonner';

export default function ClientOrders() {
  const { orders } = useOrders();
  const navigate = useNavigate();
  const [tab, setTab] = useState<'active' | 'completed' | 'cancelled'>('active');
  const [ratingModal, setRatingModal] = useState<string | null>(null);
  const [rating, setRating] = useState(5);

  const active = orders.filter(o => ['pending', 'confirmed', 'preparing', 'delivering', 'ready_for_pickup'].includes(o.status));
  const completed = orders.filter(o => o.status === 'delivered');
  const cancelled = orders.filter(o => o.status === 'cancelled');

  const displayed = tab === 'active' ? active : tab === 'completed' ? completed : cancelled;

  const statusLabels: Record<string, { label: string; color: string }> = {
    pending: { label: 'En attente', color: 'bg-zinga-gold/20 text-zinga-gold' },
    confirmed: { label: 'Confirmée', color: 'bg-zinga-green/20 text-zinga-green' },
    preparing: { label: 'En préparation', color: 'bg-zinga-orange/20 text-zinga-orange' },
    ready_for_pickup: { label: 'Prête', color: 'bg-zinga-green/20 text-zinga-green' },
    delivering: { label: 'En livraison', color: 'bg-zinga-orange/20 text-zinga-orange animate-pulse-status' },
    delivered: { label: 'Livrée', color: 'bg-zinga-green/20 text-zinga-green' },
    cancelled: { label: 'Annulée', color: 'bg-destructive/20 text-destructive' },
  };

  return (
    <div className="animate-fade-in-up p-4 lg:p-8 max-w-3xl">
      <h1 className="font-display text-3xl text-foreground mb-6">Mes Commandes</h1>

      {/* Tabs */}
      <div className="flex gap-2 mb-6">
        {[{ key: 'active' as const, label: 'En cours', count: active.length }, { key: 'completed' as const, label: 'Terminées', count: completed.length }, { key: 'cancelled' as const, label: 'Annulées', count: cancelled.length }].map(t => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={`px-4 py-2 rounded-full text-sm font-body font-medium transition-all ${tab === t.key ? 'bg-zinga-orange text-primary-foreground' : 'bg-card border border-border text-muted-foreground'}`}
          >
            {t.label} ({t.count})
          </button>
        ))}
      </div>

      {/* Orders */}
      {displayed.length === 0 ? (
        <div className="text-center py-16">
          <span className="text-5xl mb-4 block">📦</span>
          <p className="text-muted-foreground font-body">Aucune commande {tab === 'active' ? 'en cours' : tab === 'completed' ? 'terminée' : 'annulée'}</p>
        </div>
      ) : (
        <div className="space-y-3">
          {displayed.map(order => (
            <div key={order.id} className="bg-card border border-border rounded-xl p-4 hover:border-zinga-orange/30 transition-all">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <p className="font-body font-semibold text-foreground">{order.restaurantName}</p>
                  <p className="text-xs text-muted-foreground font-body">{order.id} · {new Date(order.createdAt).toLocaleDateString('fr-FR')}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-body font-semibold ${statusLabels[order.status]?.color}`}>
                  {statusLabels[order.status]?.label}
                </span>
              </div>
              <div className="text-sm text-muted-foreground font-body mb-3">
                {order.items.map(i => `${i.emoji} ${i.name} x${i.quantity}`).join(' · ')}
              </div>
              <div className="flex items-center justify-between">
                <span className="font-body font-bold text-zinga-orange">{order.total.toLocaleString()} {order.currency}</span>
                <div className="flex gap-2">
                  {tab === 'active' && (
                    <button onClick={() => navigate(`/client/tracking/${order.id}`)} className="px-4 py-2 bg-zinga-orange text-primary-foreground rounded-lg text-xs font-body font-bold hover:bg-zinga-orange-dark transition-all">
                      Suivre
                    </button>
                  )}
                  {tab === 'completed' && !order.rating && (
                    <button onClick={() => { setRatingModal(order.id); }} className="px-4 py-2 border border-zinga-gold text-zinga-gold rounded-lg text-xs font-body font-bold hover:bg-zinga-gold/10 transition-all">
                      ⭐ Évaluer
                    </button>
                  )}
                  {tab === 'completed' && (
                    <button onClick={() => toast.success('Ajouté au panier!')} className="px-4 py-2 border border-zinga-orange text-zinga-orange rounded-lg text-xs font-body font-bold hover:bg-zinga-orange/10 transition-all">
                      🔄 Recommander
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Rating modal */}
      {ratingModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={() => setRatingModal(null)}>
          <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" />
          <div className="relative bg-zinga-dark-2 border border-border rounded-2xl p-6 w-full max-w-sm animate-fade-in-up" onClick={e => e.stopPropagation()}>
            <h3 className="font-display text-2xl text-foreground mb-4 text-center">Évaluer la commande</h3>
            <div className="flex justify-center gap-2 mb-6">
              {[1, 2, 3, 4, 5].map(s => (
                <button key={s} onClick={() => setRating(s)}>
                  <Star size={32} className={s <= rating ? 'text-zinga-gold fill-zinga-gold' : 'text-muted-foreground'} />
                </button>
              ))}
            </div>
            <button
              onClick={() => { toast.success('Merci pour votre avis! ⭐'); setRatingModal(null); }}
              className="w-full h-[52px] bg-zinga-orange text-primary-foreground rounded-lg font-body font-bold hover:bg-zinga-orange-dark transition-all"
            >
              Envoyer
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
