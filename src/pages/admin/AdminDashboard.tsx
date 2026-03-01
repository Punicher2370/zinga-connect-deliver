import React, { useState, useEffect } from 'react';
import { Package, DollarSign, Bike, UtensilsCrossed, Clock, Star, Users, XCircle } from 'lucide-react';
import { useOrders, useRiders, useRestaurants } from '@/contexts/AppContext';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

const revenueData = Array.from({ length: 14 }, (_, i) => ({ day: `J${i + 1}`, gmv: Math.floor(200000 + Math.random() * 300000), net: Math.floor(36000 + Math.random() * 54000) }));

const activityFeed = [
  { type: 'order', msg: '🆕 Nouvelle commande #1247 — Chez Mama Ngono — 3 200 FCFA', time: 'Il y a 2 min' },
  { type: 'delivery', msg: '✅ Commande #1243 livrée par Ibrahim Manga — 4⭐', time: 'Il y a 15 min' },
  { type: 'rider', msg: '🚴 Patrick Essomba est passé en ligne', time: 'Il y a 30 min' },
  { type: 'restaurant', msg: '🍽️ Pizza Douala a ouvert', time: 'Il y a 45 min' },
  { type: 'alert', msg: '⚠️ Commande #1239 — client non joignable', time: 'Il y a 1h' },
];

export default function AdminDashboard() {
  const { orders } = useOrders();
  const { riders } = useRiders();
  const { restaurants } = useRestaurants();
  const onlineRiders = riders.filter(r => r.isOnline).length;
  const openRestaurants = restaurants.filter(r => r.isOpen).length;
  const activeOrders = orders.filter(o => !['delivered', 'cancelled'].includes(o.status)).length;
  const [feed, setFeed] = useState(activityFeed);

  useEffect(() => {
    const interval = setInterval(() => {
      const newEvents = [
        '🆕 Nouvelle commande reçue — Le Ndolé d\'Or',
        '✅ Livraison terminée — Marie-Claire Biya',
        '🚴 Serge Atanga est disponible',
        '📦 Commande en préparation — Braise & Piment',
      ];
      const randomEvent = newEvents[Math.floor(Math.random() * newEvents.length)];
      setFeed(prev => [{ type: 'order', msg: randomEvent, time: 'À l\'instant' }, ...prev.slice(0, 9)]);
    }, 15000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="animate-fade-in-up p-4 lg:p-8">
      {/* Status bar */}
      <div className="bg-zinga-green/10 border border-zinga-green/20 rounded-xl px-4 py-3 mb-6 flex items-center gap-4 flex-wrap text-xs font-body">
        <span className="text-zinga-green font-bold flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-zinga-green animate-pulse-status" /> Plateforme opérationnelle</span>
        <span className="text-muted-foreground">Riders en ligne: {onlineRiders}/{riders.length}</span>
        <span className="text-muted-foreground">Commandes actives: {activeOrders}</span>
        <span className="text-muted-foreground">Latence API: 12ms</span>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
        {[
          { icon: Package, label: "Commandes aujourd'hui", value: '47', trend: '▲ 23%', color: 'text-zinga-orange' },
          { icon: DollarSign, label: 'Revenus ZINGA (18%)', value: '156K FCFA', trend: '▲ 12%', color: 'text-zinga-green' },
          { icon: Bike, label: 'Riders actifs', value: `${onlineRiders}/${riders.length}`, color: 'text-zinga-green' },
          { icon: UtensilsCrossed, label: 'Restaurants ouverts', value: `${openRestaurants}/${restaurants.length}`, color: 'text-zinga-gold' },
          { icon: Clock, label: 'Temps livraison moy.', value: '22 min', color: 'text-foreground' },
          { icon: Star, label: 'Satisfaction', value: '4.8/5', color: 'text-zinga-gold' },
          { icon: Users, label: 'Nouveaux clients', value: '12', color: 'text-zinga-orange' },
          { icon: XCircle, label: "Taux d'annulation", value: '2.1%', color: 'text-zinga-green' },
        ].map(s => (
          <div key={s.label} className="bg-card border border-border rounded-xl p-4">
            <s.icon size={16} className={`${s.color} mb-2`} />
            <p className={`font-display text-xl ${s.color}`}>{s.value}</p>
            <p className="text-xs text-muted-foreground font-body">{s.label}</p>
            {s.trend && <span className="text-xs text-zinga-green font-body">{s.trend}</span>}
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-[1fr_350px] gap-6">
        {/* Revenue chart */}
        <div className="bg-card border border-border rounded-xl p-5">
          <h3 className="font-display text-lg text-foreground mb-4">Revenus (14 jours)</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="day" tick={{ fontSize: 10, fill: 'hsl(36,45%,75%)' }} axisLine={false} />
              <YAxis tick={{ fontSize: 10, fill: 'hsl(36,45%,75%)' }} axisLine={false} />
              <Tooltip contentStyle={{ background: '#141414', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 8, fontFamily: 'Poppins', fontSize: 12 }} />
              <Line type="monotone" dataKey="gmv" stroke="hsl(36,45%,75%)" strokeWidth={1.5} dot={false} name="GMV" />
              <Line type="monotone" dataKey="net" stroke="hsl(21,100%,50%)" strokeWidth={2} dot={false} name="Net ZINGA" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Activity feed */}
        <div className="bg-card border border-border rounded-xl p-5">
          <h3 className="font-display text-lg text-foreground mb-4">Activité en direct 🔴</h3>
          <div className="space-y-3 max-h-[300px] overflow-y-auto">
            {feed.map((item, i) => (
              <div key={i} className={`text-sm font-body p-2 rounded-lg ${i === 0 ? 'bg-zinga-orange/5 animate-slide-in-top' : ''}`}>
                <p className="text-foreground">{item.msg}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{item.time}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
