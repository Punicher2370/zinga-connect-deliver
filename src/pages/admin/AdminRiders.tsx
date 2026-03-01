import React from 'react';
import { useRiders } from '@/contexts/AppContext';
import { toast } from 'sonner';

export default function AdminRiders() {
  const { riders } = useRiders();
  const online = riders.filter(r => r.isOnline).length;

  return (
    <div className="animate-fade-in-up p-4 lg:p-8">
      <h1 className="font-display text-3xl text-foreground mb-2">Gestion des Riders</h1>
      <div className="flex gap-4 mb-6 text-sm font-body">
        <span className="text-zinga-green">🟢 En ligne: {online}</span>
        <span className="text-muted-foreground">⭕ Hors ligne: {riders.length - online}</span>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {riders.map(rider => (
          <div key={rider.id} className="bg-card border border-border rounded-xl p-5 hover:border-zinga-orange/30 transition-all">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 rounded-full bg-zinga-green/20 flex items-center justify-center text-xl font-display text-foreground">{rider.name.charAt(0)}</div>
              <div>
                <p className="font-body font-semibold text-foreground">{rider.name}</p>
                <p className="text-xs text-muted-foreground font-body">{rider.city} · {rider.vehicle}</p>
              </div>
              <span className={`ml-auto w-3 h-3 rounded-full ${rider.isOnline ? 'bg-zinga-green animate-pulse-status' : 'bg-muted-foreground'}`} />
            </div>
            <div className="grid grid-cols-2 gap-2 text-xs font-body mb-3">
              <span className="text-muted-foreground">⭐ {rider.rating}</span>
              <span className="text-muted-foreground">📦 {rider.totalDeliveries} livraisons</span>
              <span className="text-muted-foreground">💰 {rider.earningsThisWeek.toLocaleString()} F/sem</span>
              <span className="text-muted-foreground">🥈 {rider.level}</span>
            </div>
            <div className="flex gap-2">
              <button onClick={() => toast.info(`Profil de ${rider.name}`)} className="flex-1 py-2 border border-border text-muted-foreground rounded-lg text-xs font-body hover:bg-secondary transition-all">Voir profil</button>
              <button onClick={() => toast.info('Contact simulé')} className="py-2 px-3 border border-zinga-orange text-zinga-orange rounded-lg text-xs font-body hover:bg-zinga-orange/10 transition-all">Contacter</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
