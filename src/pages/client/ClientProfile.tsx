import React from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Phone, MapPin, CreditCard, Star, Share2, Bell, MessageCircle, LogOut } from 'lucide-react';
import { useApp } from '@/contexts/AppContext';
import { toast } from 'sonner';

export default function ClientProfile() {
  const { currentUser, logout } = useApp();
  const navigate = useNavigate();

  return (
    <div className="animate-fade-in-up p-4 lg:p-8 max-w-2xl">
      {/* Avatar & name */}
      <div className="flex items-center gap-4 mb-8">
        <div className="w-20 h-20 rounded-full bg-zinga-orange flex items-center justify-center text-primary-foreground font-display text-4xl">
          {currentUser?.name?.charAt(0) || 'J'}
        </div>
        <div>
          <h1 className="font-display text-3xl text-foreground">{currentUser?.name || 'Jean-Baptiste Mbarga'}</h1>
          <p className="text-muted-foreground font-body text-sm">{currentUser?.phone || '+237 655 123 456'}</p>
          <span className="text-xs text-zinga-orange font-body">📍 {currentUser?.city || 'Douala'} · Membre depuis Jan 2025</span>
        </div>
      </div>

      {/* ZINGA Stars */}
      <div className="bg-gradient-to-r from-zinga-gold/10 to-zinga-orange/5 border border-zinga-gold/20 rounded-xl p-5 mb-6">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-display text-lg text-foreground flex items-center gap-2"><Star className="text-zinga-gold" size={18} /> ZINGA Stars</h3>
          <span className="px-3 py-1 rounded-full bg-zinga-gold/20 text-zinga-gold text-xs font-body font-bold">🥈 Argent</span>
        </div>
        <div className="w-full bg-secondary rounded-full h-2 mb-2">
          <div className="bg-gradient-to-r from-zinga-gold to-zinga-orange h-2 rounded-full" style={{ width: '65%' }} />
        </div>
        <p className="text-xs text-muted-foreground font-body">650/1000 étoiles · 350 étoiles avant le niveau Or ⭐</p>
      </div>

      {/* Referral */}
      <div className="bg-card border border-border rounded-xl p-5 mb-6">
        <h3 className="font-display text-lg text-foreground mb-2 flex items-center gap-2"><Share2 size={16} className="text-zinga-orange" /> Parrainage</h3>
        <p className="text-muted-foreground text-sm font-body mb-3">Invitez un ami et gagnez 1000 FCFA chacun!</p>
        <div className="flex items-center gap-2">
          <div className="flex-1 bg-secondary rounded-lg px-4 py-2 font-body text-sm text-foreground tracking-wider">ZINGA-JB2025</div>
          <button onClick={() => { navigator.clipboard.writeText('ZINGA-JB2025'); toast.success('Code copié!'); }} className="px-4 py-2 bg-zinga-orange text-primary-foreground rounded-lg text-sm font-body font-bold hover:bg-zinga-orange-dark transition-all">
            Copier
          </button>
        </div>
      </div>

      {/* Actions */}
      <div className="space-y-2 mb-6">
        {[
          { icon: Bell, label: 'Notifications', action: () => toast.info('Notifications activées') },
          { icon: MessageCircle, label: 'Chat avec nous (WhatsApp)', action: () => toast.info('WhatsApp simulé') },
          { icon: CreditCard, label: 'Méthodes de paiement', action: () => toast.info('Paiements') },
        ].map(item => (
          <button key={item.label} onClick={item.action} className="w-full flex items-center gap-3 bg-card border border-border rounded-xl p-4 text-foreground font-body text-sm hover:border-zinga-orange/30 transition-all">
            <item.icon size={18} className="text-muted-foreground" />
            {item.label}
          </button>
        ))}
      </div>

      <button
        onClick={() => { logout(); navigate('/'); }}
        className="w-full flex items-center justify-center gap-2 py-3 border border-destructive text-destructive rounded-xl font-body font-bold text-sm hover:bg-destructive/10 transition-all"
      >
        <LogOut size={16} /> Déconnexion
      </button>
    </div>
  );
}
