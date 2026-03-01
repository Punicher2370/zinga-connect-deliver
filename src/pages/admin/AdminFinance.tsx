import React from 'react';
import { DollarSign } from 'lucide-react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import { useRiders, useRestaurants } from '@/contexts/AppContext';
import { toast } from 'sonner';

const cityRevenue = [{ name: 'Douala', value: 65 }, { name: 'Yaoundé', value: 25 }, { name: 'Montréal', value: 10 }];
const COLORS = ['hsl(21,100%,50%)', 'hsl(42,100%,50%)', 'hsl(152,100%,39%)'];

export default function AdminFinance() {
  const { riders } = useRiders();
  const { restaurants } = useRestaurants();

  return (
    <div className="animate-fade-in-up p-4 lg:p-8">
      <h1 className="font-display text-3xl text-foreground mb-6">Finances</h1>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
        {[
          { label: 'GMV ce mois', value: '4.8M FCFA', color: 'text-foreground' },
          { label: 'Commission ZINGA (18%)', value: '864K FCFA', color: 'text-zinga-orange' },
          { label: 'Coûts opérationnels', value: '320K FCFA', color: 'text-muted-foreground' },
          { label: 'Profit net', value: '544K FCFA', color: 'text-zinga-green' },
        ].map(s => (
          <div key={s.label} className="bg-card border border-border rounded-xl p-4">
            <DollarSign size={16} className={`${s.color} mb-2`} />
            <p className={`font-display text-xl ${s.color}`}>{s.value}</p>
            <p className="text-xs text-muted-foreground font-body">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-card border border-border rounded-xl p-5">
          <h3 className="font-display text-lg text-foreground mb-4">Revenus par ville</h3>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart><Pie data={cityRevenue} cx="50%" cy="50%" outerRadius={80} dataKey="value" label={({ name, value }) => `${name} ${value}%`}>
              {cityRevenue.map((_, i) => <Cell key={i} fill={COLORS[i]} />)}
            </Pie><Tooltip contentStyle={{ background: '#141414', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 8, fontFamily: 'Poppins', fontSize: 12 }} /></PieChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-card border border-border rounded-xl p-5">
          <h3 className="font-display text-lg text-foreground mb-4">Paiements Riders cette semaine</h3>
          <div className="space-y-2">
            {riders.map(r => (
              <div key={r.id} className="flex items-center justify-between py-2 border-b border-border last:border-0 text-sm font-body">
                <span className="text-foreground">{r.name}</span>
                <span className="text-muted-foreground">{r.totalDeliveries > 200 ? '40' : '25'} livr.</span>
                <span className="text-zinga-green font-bold">{r.earningsThisWeek.toLocaleString()} F</span>
                <button onClick={() => toast.success(`Paiement envoyé à ${r.name}`)} className="px-2 py-1 bg-zinga-orange text-primary-foreground rounded text-xs font-bold hover:bg-zinga-orange-dark transition-all">Payer</button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
