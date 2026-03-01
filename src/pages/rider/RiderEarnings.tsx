import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { DollarSign, Package, Star, Clock } from 'lucide-react';
import { toast } from 'sonner';

const weeklyData = [
  { day: 'Lun', earnings: 6500, deliveries: 4 },
  { day: 'Mar', earnings: 8200, deliveries: 5 },
  { day: 'Mer', earnings: 5400, deliveries: 3 },
  { day: 'Jeu', earnings: 9100, deliveries: 6 },
  { day: 'Ven', earnings: 11200, deliveries: 8 },
  { day: 'Sam', earnings: 12800, deliveries: 9 },
  { day: 'Dim', earnings: 7400, deliveries: 5 },
];

const recentDeliveries = [
  { restaurant: 'Chez Mama Ngono', district: 'Akwa', time: '18:04', amount: 850, rating: 5 },
  { restaurant: 'Le Ndolé d\'Or', district: 'Bastos', time: '17:30', amount: 950, rating: 4 },
  { restaurant: 'Braise & Piment', district: 'Bonapriso', time: '16:45', amount: 750, rating: 5 },
  { restaurant: 'Poulet DG Express', district: 'Mvan', time: '15:20', amount: 650, rating: 5 },
  { restaurant: 'Le Comptoir du Maquis', district: 'Deïdo', time: '14:10', amount: 800, rating: 5 },
];

export default function RiderEarnings() {
  return (
    <div className="animate-fade-in-up p-4 max-w-xl mx-auto">
      <h2 className="font-display text-2xl text-foreground mb-6">Mes Gains</h2>

      {/* Today stats */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        {[
          { icon: DollarSign, label: "Gains aujourd'hui", value: '8 500 FCFA', color: 'text-zinga-green' },
          { icon: Package, label: "Livraisons", value: '5', color: 'text-zinga-orange' },
          { icon: Star, label: 'Note moyenne', value: '4.9', color: 'text-zinga-gold' },
          { icon: Clock, label: 'Temps moyen', value: '22 min', color: 'text-foreground' },
        ].map(stat => (
          <div key={stat.label} className="bg-card border border-border rounded-xl p-4">
            <stat.icon size={18} className={`${stat.color} mb-2`} />
            <p className={`font-display text-xl ${stat.color}`}>{stat.value}</p>
            <p className="text-xs text-muted-foreground font-body">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Weekly chart */}
      <div className="bg-card border border-border rounded-xl p-5 mb-6">
        <h3 className="font-display text-lg text-foreground mb-4">Cette semaine</h3>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={weeklyData}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
            <XAxis dataKey="day" tick={{ fontSize: 12, fill: 'hsl(36, 45%, 75%)' }} axisLine={false} />
            <YAxis tick={{ fontSize: 10, fill: 'hsl(36, 45%, 75%)' }} axisLine={false} />
            <Tooltip
              contentStyle={{ background: '#141414', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 8, fontFamily: 'Poppins', fontSize: 12 }}
              labelStyle={{ color: '#FAF6F1' }}
            />
            <Bar dataKey="earnings" fill="hsl(21, 100%, 50%)" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
        <div className="flex justify-between mt-3 text-xs font-body">
          <span className="text-muted-foreground">Total: <span className="text-zinga-green font-bold">60 600 FCFA</span></span>
          <span className="text-zinga-green">▲ 12% vs semaine dernière</span>
        </div>
      </div>

      {/* Recent deliveries */}
      <div className="bg-card border border-border rounded-xl p-5 mb-6">
        <h3 className="font-display text-lg text-foreground mb-3">Dernières livraisons</h3>
        <div className="space-y-3">
          {recentDeliveries.map((d, i) => (
            <div key={i} className="flex items-center justify-between py-2 border-b border-border last:border-0 text-sm font-body">
              <div>
                <p className="text-foreground">{d.restaurant} → {d.district}</p>
                <p className="text-xs text-muted-foreground">{d.time}</p>
              </div>
              <div className="text-right">
                <p className="text-zinga-green font-bold">{d.amount} FCFA</p>
                <p className="text-xs text-zinga-gold">{'⭐'.repeat(d.rating)}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Payout */}
      <div className="bg-gradient-to-r from-zinga-green/10 to-zinga-green/5 border border-zinga-green/20 rounded-xl p-5">
        <h3 className="font-display text-lg text-foreground mb-2">Retirer mes gains</h3>
        <p className="text-2xl font-bold font-body text-zinga-green mb-3">45 600 FCFA</p>
        <div className="flex gap-2 mb-3">
          <button className="flex-1 py-2 border border-zinga-orange text-zinga-orange rounded-lg text-sm font-body font-bold hover:bg-zinga-orange/10 transition-all">🟠 Orange Money</button>
          <button className="flex-1 py-2 border border-zinga-gold text-zinga-gold rounded-lg text-sm font-body font-bold hover:bg-zinga-gold/10 transition-all">🟡 MTN MoMo</button>
        </div>
        <button onClick={() => toast.success('Retrait effectué! 💰 45 600 FCFA envoyés sur votre Orange Money')} className="w-full h-12 bg-zinga-green text-primary-foreground rounded-lg font-body font-bold hover:bg-zinga-green/80 transition-all">
          Retirer maintenant
        </button>
      </div>
    </div>
  );
}
