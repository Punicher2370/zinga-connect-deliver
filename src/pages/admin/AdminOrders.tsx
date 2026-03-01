import React from 'react';
import { useOrders } from '@/contexts/AppContext';
import { toast } from 'sonner';

export default function AdminOrders() {
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
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-display text-3xl text-foreground">Toutes les commandes</h1>
        <button onClick={() => toast.info('Export CSV simulé')} className="px-4 py-2 border border-border text-muted-foreground rounded-lg font-body text-sm hover:bg-secondary transition-all">📥 Export CSV</button>
      </div>
      <div className="bg-card border border-border rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm font-body">
            <thead><tr className="border-b border-border text-xs text-muted-foreground">
              <th className="text-left p-4">ID</th><th className="text-left p-4">Client</th><th className="text-left p-4">Restaurant</th><th className="text-left p-4">Rider</th><th className="text-right p-4">Montant</th><th className="text-right p-4">Commission</th><th className="text-center p-4">Statut</th>
            </tr></thead>
            <tbody>
              {orders.map(o => (
                <tr key={o.id} className="border-b border-border hover:bg-secondary/30 transition-colors cursor-pointer">
                  <td className="p-4 text-foreground font-medium">{o.id}</td>
                  <td className="p-4 text-muted-foreground">{o.clientName}</td>
                  <td className="p-4 text-muted-foreground">{o.restaurantName}</td>
                  <td className="p-4 text-muted-foreground">{o.riderName || '—'}</td>
                  <td className="p-4 text-right text-zinga-orange font-bold">{o.total.toLocaleString()} {o.currency}</td>
                  <td className="p-4 text-right text-zinga-green">{Math.round(o.total * 0.18).toLocaleString()} {o.currency}</td>
                  <td className="p-4 text-center"><span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusLabels[o.status]?.color}`}>{statusLabels[o.status]?.label}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
