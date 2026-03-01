import React from 'react';
import { AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

const ordersData = Array.from({ length: 30 }, (_, i) => ({ day: i + 1, orders: Math.floor(30 + Math.random() * 40) }));
const hourlyData = Array.from({ length: 24 }, (_, i) => ({ hour: `${i}h`, orders: i >= 11 && i <= 14 ? Math.floor(15 + Math.random() * 10) : i >= 18 && i <= 21 ? Math.floor(12 + Math.random() * 8) : Math.floor(Math.random() * 5) }));
const cityData = [{ name: 'Douala', value: 55 }, { name: 'Yaoundé', value: 30 }, { name: 'Montréal', value: 15 }];
const COLORS = ['hsl(21,100%,50%)', 'hsl(42,100%,50%)', 'hsl(152,100%,39%)'];

export default function AdminStats() {
  return (
    <div className="animate-fade-in-up p-4 lg:p-8">
      <h1 className="font-display text-3xl text-foreground mb-6">Statistiques</h1>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
        {[
          { label: 'LTV moyen client', value: '45 000 FCFA' },
          { label: 'CAC moyen', value: '8 000 FCFA' },
          { label: 'LTV/CAC ratio', value: '5.6x' },
          { label: 'NPS Score', value: '72/100' },
        ].map(s => (
          <div key={s.label} className="bg-card border border-border rounded-xl p-4">
            <p className="font-display text-xl text-zinga-orange">{s.value}</p>
            <p className="text-xs text-muted-foreground font-body">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-card border border-border rounded-xl p-5">
          <h3 className="font-display text-lg text-foreground mb-4">Volume de commandes (30j)</h3>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={ordersData}>
              <defs><linearGradient id="og" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="hsl(21,100%,50%)" stopOpacity={0.3} /><stop offset="95%" stopColor="hsl(21,100%,50%)" stopOpacity={0} /></linearGradient></defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="day" tick={{ fontSize: 10, fill: 'hsl(36,45%,75%)' }} axisLine={false} />
              <YAxis tick={{ fontSize: 10, fill: 'hsl(36,45%,75%)' }} axisLine={false} />
              <Tooltip contentStyle={{ background: '#141414', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 8, fontFamily: 'Poppins', fontSize: 12 }} />
              <Area type="monotone" dataKey="orders" stroke="hsl(21,100%,50%)" fill="url(#og)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-card border border-border rounded-xl p-5">
          <h3 className="font-display text-lg text-foreground mb-4">Commandes par heure</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={hourlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="hour" tick={{ fontSize: 8, fill: 'hsl(36,45%,75%)' }} axisLine={false} />
              <YAxis tick={{ fontSize: 10, fill: 'hsl(36,45%,75%)' }} axisLine={false} />
              <Tooltip contentStyle={{ background: '#141414', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 8, fontFamily: 'Poppins', fontSize: 12 }} />
              <Bar dataKey="orders" fill="hsl(21,100%,50%)" radius={[2, 2, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-card border border-border rounded-xl p-5">
          <h3 className="font-display text-lg text-foreground mb-4">Commandes par ville</h3>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart><Pie data={cityData} cx="50%" cy="50%" outerRadius={80} dataKey="value" label={({ name, value }) => `${name} ${value}%`}>
              {cityData.map((_, i) => <Cell key={i} fill={COLORS[i]} />)}
            </Pie><Tooltip contentStyle={{ background: '#141414', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 8, fontFamily: 'Poppins', fontSize: 12 }} /></PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
