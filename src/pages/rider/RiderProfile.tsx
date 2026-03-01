import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Star, Package, Percent, Clock, Bike, Phone, LogOut, Shield, Award } from 'lucide-react';
import { useApp } from '@/contexts/AppContext';

export default function RiderProfile() {
  const { currentUser, logout } = useApp();
  const navigate = useNavigate();

  return (
    <div className="animate-fade-in-up p-4 max-w-xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <div className="w-20 h-20 rounded-full bg-zinga-green flex items-center justify-center text-primary-foreground font-display text-4xl">
          {currentUser?.name?.charAt(0) || 'I'}
        </div>
        <div>
          <h1 className="font-display text-3xl text-foreground">{currentUser?.name || 'Ibrahim Manga'}</h1>
          <span className="px-3 py-1 rounded-full bg-zinga-green/20 text-zinga-green text-xs font-body font-bold">⚡ Zinga Rider</span>
        </div>
      </div>

      {/* Performance */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        {[
          { icon: Package, label: 'Total livraisons', value: '234' },
          { icon: Star, label: 'Note moyenne', value: '4.9' },
          { icon: Percent, label: "Taux d'acceptation", value: '94%' },
          { icon: Clock, label: 'Temps moyen', value: '22 min' },
        ].map(s => (
          <div key={s.label} className="bg-card border border-border rounded-xl p-4">
            <s.icon size={16} className="text-muted-foreground mb-2" />
            <p className="font-display text-xl text-foreground">{s.value}</p>
            <p className="text-xs text-muted-foreground font-body">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Level */}
      <div className="bg-gradient-to-r from-zinga-gold/10 to-zinga-orange/5 border border-zinga-gold/20 rounded-xl p-5 mb-6">
        <div className="flex items-center gap-2 mb-2">
          <Award className="text-zinga-gold" size={18} />
          <h3 className="font-display text-lg text-foreground">🥈 Rider Argent</h3>
        </div>
        <div className="w-full bg-secondary rounded-full h-2 mb-2">
          <div className="bg-gradient-to-r from-zinga-gold to-zinga-orange h-2 rounded-full" style={{ width: '78%' }} />
        </div>
        <p className="text-xs text-muted-foreground font-body">234/300 livraisons pour Rider Or ⭐</p>
      </div>

      {/* Kit */}
      <div className="bg-card border border-border rounded-xl p-5 mb-6">
        <h3 className="font-display text-lg text-foreground mb-3">Mon Kit ZINGA</h3>
        <div className="space-y-2 text-sm font-body">
          <div className="flex justify-between"><span className="text-muted-foreground">T-shirt</span><span className="text-zinga-green">✅ Attribué - Taille M</span></div>
          <div className="flex justify-between"><span className="text-muted-foreground">Sacoche thermique</span><span className="text-zinga-green">✅ Attribuée - N° ZR-0034</span></div>
          <div className="flex justify-between"><span className="text-muted-foreground">Badge ID</span><span className="text-zinga-green">✅ Actif</span></div>
        </div>
      </div>

      <button onClick={() => { logout(); navigate('/'); }} className="w-full flex items-center justify-center gap-2 py-3 border border-destructive text-destructive rounded-xl font-body font-bold text-sm hover:bg-destructive/10 transition-all">
        <LogOut size={16} /> Déconnexion
      </button>
    </div>
  );
}
