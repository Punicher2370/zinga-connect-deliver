import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShoppingBag, Bike, UtensilsCrossed, LayoutDashboard, ArrowRight, X } from 'lucide-react';
import { useApp } from '@/contexts/AppContext';
import { UserRole } from '@/types';
import RegistrationModal from '@/components/RegistrationModal';

const roles = [
  { role: 'client' as UserRole, icon: ShoppingBag, color: 'zinga-orange', title: 'Je commande', subtitle: 'Reçois tes repas favoris chauds à ta porte en moins de 35 minutes', tag: '🇨🇲 Douala · Yaoundé · 🇨🇦 Montréal', borderHover: 'hover:border-zinga-orange hover:shadow-[0_0_30px_rgba(255,92,0,0.15)]', iconColor: 'text-zinga-orange' },
  { role: 'rider' as UserRole, icon: Bike, color: 'zinga-green', title: 'Je livre', subtitle: 'Deviens Zinga Rider. Gagne ta liberté. Porte les couleurs.', tag: '⚡ Kit offert · Paiement quotidien', borderHover: 'hover:border-zinga-green hover:shadow-[0_0_30px_rgba(0,200,83,0.15)]', iconColor: 'text-zinga-green' },
  { role: 'restaurant' as UserRole, icon: UtensilsCrossed, color: 'zinga-gold', title: 'Je cuisine', subtitle: 'Gérez vos commandes, votre menu et développez votre activité avec ZINGA', tag: '📈 Commission 15% · Zéro abonnement', borderHover: 'hover:border-zinga-gold hover:shadow-[0_0_30px_rgba(255,179,0,0.15)]', iconColor: 'text-zinga-gold' },
  { role: 'admin' as UserRole, icon: LayoutDashboard, color: 'zinga-purple', title: "J'administre", subtitle: 'Supervisez toute la plateforme. Riders, commandes, restaurants, revenus.', tag: '🔒 Accès restreint', borderHover: 'hover:border-zinga-purple hover:shadow-[0_0_30px_rgba(155,89,182,0.15)]', iconColor: 'text-zinga-purple' },
];

const stats = [
  { label: '250+ Riders', emoji: '🚴' },
  { label: '180+ Restaurants', emoji: '🍽️' },
  { label: '12 000+ Livraisons', emoji: '📦' },
];

const marqueeText = 'LIVRAISON RAPIDE · REPAS CHAUDS · ZINGA RIDERS · CAMEROUN · CANADA · DOUALA · YAOUNDÉ · MONTRÉAL · ';

export default function LandingPage() {
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Background effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 70% 60% at 50% 40%, rgba(255,92,0,0.08), transparent)' }} />
        <div className="absolute top-20 left-1/4 w-64 h-64 rounded-full bg-zinga-orange/5 blur-[100px] animate-float-orb" />
        <div className="absolute bottom-40 right-1/4 w-48 h-48 rounded-full bg-zinga-green/5 blur-[80px] animate-float-orb" style={{ animationDelay: '3s' }} />
        <div className="absolute top-1/2 left-1/2 w-32 h-32 rounded-full bg-zinga-gold/5 blur-[60px] animate-float-orb" style={{ animationDelay: '6s' }} />
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 py-12">
        {/* Status badge */}
        <div className="animate-fade-in-up opacity-0-init mb-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-zinga-gold/30 bg-zinga-dark-3/50">
            <span className="w-2 h-2 rounded-full bg-zinga-green animate-pulse-status" />
            <span className="text-zinga-gold text-xs font-semibold tracking-[5px] uppercase font-body">DISPONIBLE · CAMEROUN & CANADA</span>
          </div>
        </div>

        {/* Logo */}
        <h1 className="animate-fade-in-up opacity-0-init animation-delay-100 font-display text-[clamp(80px,18vw,160px)] leading-none bg-gradient-to-br from-foreground via-zinga-orange to-zinga-gold bg-clip-text text-transparent drop-shadow-[0_0_40px_rgba(255,92,0,0.3)] mb-2">
          ZINGA
        </h1>

        {/* Subtitle */}
        <p className="animate-fade-in-up opacity-0-init animation-delay-200 text-zinga-green font-light text-sm tracking-[6px] uppercase mb-4 font-body">
          FOOD DELIVERY · RAPIDE · CHAUD · FIER
        </p>

        {/* Description */}
        <p className="animate-fade-in-up opacity-0-init animation-delay-300 text-muted-foreground text-center max-w-md mb-12 font-body text-sm">
          Choisissez votre profil pour accéder à votre espace ZINGA
        </p>

        {/* Role cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl w-full mb-16">
          {roles.map((r, i) => (
            <button
              key={r.role}
              onClick={() => { setSelectedRole(r.role); setShowModal(true); }}
              className={`animate-fade-in-up opacity-0-init group relative p-6 rounded-2xl bg-card border border-border text-left transition-all duration-300 hover:-translate-y-1 cursor-pointer ${r.borderHover}`}
              style={{ animationDelay: `${(i + 2) * 100}ms` }}
            >
              <div className="flex items-start justify-between mb-3">
                <div className={`w-12 h-12 rounded-xl bg-secondary flex items-center justify-center ${r.iconColor}`}>
                  <r.icon size={24} />
                </div>
                <ArrowRight className="w-5 h-5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-x-0 group-hover:translate-x-1" />
              </div>
              <h3 className="font-display text-[28px] leading-tight text-foreground mb-1">{r.title}</h3>
              <p className="text-muted-foreground text-sm font-body mb-3 leading-relaxed">{r.subtitle}</p>
              <span className="text-xs font-body text-muted-foreground/70">{r.tag}</span>
            </button>
          ))}
        </div>

        {/* Stats */}
        <div className="animate-fade-in-up opacity-0-init animation-delay-400 flex gap-4 mb-8 flex-wrap justify-center">
          {stats.map(s => (
            <div key={s.label} className="px-4 py-2 rounded-full bg-card border border-border text-sm font-body text-muted-foreground">
              {s.emoji} {s.label}
            </div>
          ))}
        </div>
      </div>

      {/* Marquee */}
      <div className="fixed bottom-0 left-0 right-0 bg-zinga-orange py-3 overflow-hidden z-20">
        <div className="flex animate-marquee whitespace-nowrap">
          <span className="text-primary-foreground font-display text-lg tracking-[3px] mx-4">{marqueeText}{marqueeText}</span>
          <span className="text-primary-foreground font-display text-lg tracking-[3px] mx-4">{marqueeText}{marqueeText}</span>
        </div>
      </div>

      {/* Registration Modal */}
      {showModal && selectedRole && (
        <RegistrationModal role={selectedRole} onClose={() => setShowModal(false)} />
      )}
    </div>
  );
}
