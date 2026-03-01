import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';

const revenueData = Array.from({ length: 14 }, (_, i) => ({ day: `J${i + 1}`, revenue: Math.floor(50000 + Math.random() * 80000) }));
const topItems = [
  { name: 'Poulet DG', orders: 89, revenue: 284800 },
  { name: 'Ndolé Complet', orders: 67, revenue: 167500 },
  { name: 'Poisson Braisé', orders: 54, revenue: 189000 },
  { name: 'Brochettes', orders: 45, revenue: 81000 },
  { name: 'Jus de Bissap', orders: 112, revenue: 56000 },
];
const ratingData = [{ name: '5⭐', value: 58 }, { name: '4⭐', value: 28 }, { name: '3⭐', value: 10 }, { name: '≤2⭐', value: 4 }];
const COLORS = ['hsl(152,100%,39%)', 'hsl(42,100%,50%)', 'hsl(21,100%,50%)', 'hsl(0,84%,60%)'];

export default function RestaurantStats() {
  return (
    <div className="animate-fade-in-up p-4 lg:p-8">
      <h1 className="font-display text-3xl text-foreground mb-6">Statistiques</h1>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
        {[
          { label: 'Commandes ce mois', value: '342' },
          { label: 'Revenus', value: '1.2M FCFA' },
          { label: 'Panier moyen', value: '3 500 FCFA' },
          { label: 'Clients uniques', value: '198' },
        ].map(s => (
          <div key={s.label} className="bg-card border border-border rounded-xl p-4">
            <p className="font-display text-xl text-zinga-orange">{s.value}</p>
            <p className="text-xs text-muted-foreground font-body">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-card border border-border rounded-xl p-5">
          <h3 className="font-display text-lg text-foreground mb-4">Revenus (14 jours)</h3>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="day" tick={{ fontSize: 10, fill: 'hsl(36,45%,75%)' }} axisLine={false} />
              <YAxis tick={{ fontSize: 10, fill: 'hsl(36,45%,75%)' }} axisLine={false} />
              <Tooltip contentStyle={{ background: '#141414', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 8, fontFamily: 'Poppins', fontSize: 12 }} />
              <Line type="monotone" dataKey="revenue" stroke="hsl(21,100%,50%)" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="bg-card border border-border rounded-xl p-5">
          <h3 className="font-display text-lg text-foreground mb-4">Satisfaction</h3>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie data={ratingData} cx="50%" cy="50%" innerRadius={50} outerRadius={80} dataKey="value" label={({ name, value }) => `${name} ${value}%`}>
                {ratingData.map((_, i) => <Cell key={i} fill={COLORS[i]} />)}
              </Pie>
              <Tooltip contentStyle={{ background: '#141414', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 8, fontFamily: 'Poppins', fontSize: 12 }} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-card border border-border rounded-xl p-5 mt-6">
        <h3 className="font-display text-lg text-foreground mb-4">Top 5 plats</h3>
        {topItems.map((item, i) => (
          <div key={i} className="flex items-center gap-3 py-2 border-b border-border last:border-0">
            <span className="w-6 text-center font-display text-lg text-muted-foreground">{i + 1}</span>
            <div className="flex-1"><p className="font-body text-sm text-foreground">{item.name}</p></div>
            <span className="text-xs text-muted-foreground font-body">{item.orders} cmd</span>
            <span className="text-sm text-zinga-orange font-body font-bold">{item.revenue.toLocaleString()} F</span>
          </div>
        ))}
      </div>
    </div>
  );
}
