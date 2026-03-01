import React from 'react';
import { Zap, Clock, Crown } from 'lucide-react';
import { toast } from 'sonner';

export default function ClientOffers() {
  return (
    <div className="animate-fade-in-up p-4 lg:p-8 max-w-3xl">
      <h1 className="font-display text-3xl text-foreground mb-6">⚡ Offres Exclusives ZINGA</h1>

      {/* Flash Deals */}
      <section className="mb-8">
        <h2 className="font-display text-xl text-foreground mb-4 flex items-center gap-2"><Zap size={20} className="text-zinga-orange" /> Flash Deals</h2>
        <div className="space-y-3">
          {[
            { dish: 'Poulet DG', restaurant: 'Chez Mama Ngono', discount: '20%', time: '23:45:12', emoji: '🍗' },
            { dish: 'Ndolé Complet', restaurant: 'Le Ndolé d\'Or', discount: '15%', time: '18:30:00', emoji: '🥬' },
          ].map((d, i) => (
            <div key={i} className="bg-gradient-to-r from-zinga-orange/20 to-zinga-orange/5 border border-zinga-orange/20 rounded-xl p-5">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-zinga-orange text-xs font-body font-bold tracking-wider">⚡ OFFRE FLASH</span>
                  <p className="font-display text-2xl text-foreground mt-1">{d.emoji} {d.dish}</p>
                  <p className="text-sm text-muted-foreground font-body">{d.restaurant}</p>
                </div>
                <div className="text-right">
                  <span className="font-display text-3xl text-zinga-orange">-{d.discount}</span>
                  <p className="text-xs text-muted-foreground font-body mt-1">⏱ {d.time}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Happy Hour */}
      <section className="mb-8">
        <h2 className="font-display text-xl text-foreground mb-4 flex items-center gap-2"><Clock size={20} className="text-zinga-gold" /> Happy Hour</h2>
        <div className="bg-card border border-border rounded-xl p-5">
          <p className="font-body font-semibold text-foreground mb-1">Chaque jour 17h-19h</p>
          <p className="text-muted-foreground font-body text-sm">-15% sur toutes les commandes pendant le Happy Hour ZINGA!</p>
          <div className="mt-3 flex gap-2 flex-wrap">
            {['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'].map(d => (
              <span key={d} className="px-3 py-1 rounded-full bg-zinga-gold/10 text-zinga-gold text-xs font-body">{d}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ZINGA Pass */}
      <section>
        <h2 className="font-display text-xl text-foreground mb-4 flex items-center gap-2"><Crown size={20} className="text-zinga-gold" /> ZINGA Pass</h2>
        <div className="bg-gradient-to-br from-zinga-gold/20 to-zinga-orange/10 border border-zinga-gold/30 rounded-xl p-6 text-center">
          <span className="text-4xl mb-3 block">👑</span>
          <h3 className="font-display text-3xl text-foreground mb-2">ZINGA PASS</h3>
          <p className="text-muted-foreground font-body text-sm mb-4">Livraisons illimitées à 5 000 FCFA/mois</p>
          <ul className="text-sm font-body text-foreground space-y-2 mb-6 text-left max-w-xs mx-auto">
            <li>✅ Livraison gratuite illimitée</li>
            <li>✅ Offres exclusives membres</li>
            <li>✅ Support prioritaire</li>
            <li>✅ 2x points ZINGA Stars</li>
          </ul>
          <button
            onClick={() => toast.success('Merci! Votre ZINGA Pass sera activé sous peu 👑')}
            className="px-8 py-3 bg-zinga-orange text-primary-foreground rounded-lg font-body font-bold hover:bg-zinga-orange-dark hover:-translate-y-0.5 hover:shadow-[0_8px_25px_rgba(255,92,0,0.3)] transition-all"
          >
            Souscrire · 5 000 FCFA/mois
          </button>
        </div>
      </section>
    </div>
  );
}
