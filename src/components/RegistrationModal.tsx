import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Check, Loader2 } from 'lucide-react';
import { UserRole } from '@/types';
import { useApp } from '@/contexts/AppContext';

const roleColors: Record<UserRole, string> = {
  client: 'bg-zinga-orange',
  rider: 'bg-zinga-green',
  restaurant: 'bg-zinga-gold',
  admin: 'bg-zinga-purple',
};

const roleLabels: Record<UserRole, string> = {
  client: 'Client',
  rider: 'Zinga Rider',
  restaurant: 'Restaurant',
  admin: 'Admin',
};

const cities = ['Douala', 'Yaoundé', 'Bafoussam', 'Garoua', 'Montréal', 'Toronto', 'Ottawa'];

interface Props {
  role: UserRole;
  onClose: () => void;
}

export default function RegistrationModal({ role, onClose }: Props) {
  const navigate = useNavigate();
  const { setCurrentUser, setCurrentRole } = useApp();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('Douala');
  const [adminCode, setAdminCode] = useState('');
  const [adminError, setAdminError] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('Orange Money');
  const [vehicle, setVehicle] = useState('Vélo');

  const handleSubmit = () => {
    if (role === 'admin' && adminCode !== 'ZINGA2024') {
      setAdminError(true);
      return;
    }
    setLoading(true);
    setTimeout(() => {
      const user = {
        id: `user-${Date.now()}`,
        name: name || 'Jean-Baptiste Mbarga',
        phone: phone || '+237 655 123 456',
        city,
        role,
        createdAt: new Date().toISOString(),
      };
      setCurrentUser(user);
      setCurrentRole(role);
      navigate(`/${role}`);
    }, 1500);
  };

  const inputClass = "w-full bg-card border border-border rounded-lg px-4 py-3 text-foreground placeholder:text-muted-foreground/50 focus:border-zinga-orange focus:outline-none focus:ring-1 focus:ring-zinga-orange/50 transition-all font-body text-sm";
  const labelClass = "block text-sm font-medium text-muted-foreground mb-1.5 font-body";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" />
      <div
        className="relative bg-zinga-dark-2 border border-border rounded-2xl w-full max-w-md max-h-[85vh] overflow-y-auto animate-fade-in-up"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 bg-zinga-dark-2 border-b border-border p-6 pb-4 z-10">
          <button onClick={onClose} className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors">
            <X size={20} />
          </button>
          <div className={`inline-block px-3 py-1 rounded-full text-xs font-semibold tracking-widest uppercase text-primary-foreground mb-3 ${roleColors[role]}`}>
            {roleLabels[role]}
          </div>
          <h2 className="font-display text-3xl text-foreground">Créer mon compte {roleLabels[role]}</h2>

          {/* Progress */}
          <div className="flex gap-2 mt-4">
            {[1, 2, 3].map(s => (
              <div key={s} className={`h-1 flex-1 rounded-full transition-all ${s <= step ? 'bg-zinga-orange' : 'bg-secondary'}`} />
            ))}
          </div>
        </div>

        <div className="p-6 space-y-4">
          {step === 1 && (
            <>
              <div>
                <label className={labelClass}>Nom complet *</label>
                <input className={inputClass} placeholder="Jean-Baptiste Mbarga" value={name} onChange={e => setName(e.target.value)} />
              </div>
              <div>
                <label className={labelClass}>Numéro de téléphone *</label>
                <input className={inputClass} placeholder="+237 6XX XXX XXX" value={phone} onChange={e => setPhone(e.target.value)} />
              </div>
              <div>
                <label className={labelClass}>Ville *</label>
                <select className={inputClass} value={city} onChange={e => setCity(e.target.value)}>
                  {cities.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <button
                onClick={() => setStep(2)}
                className="w-full h-[52px] bg-zinga-orange text-primary-foreground rounded-lg font-body font-bold tracking-wider text-sm hover:bg-zinga-orange-dark hover:-translate-y-0.5 hover:shadow-[0_8px_25px_rgba(255,92,0,0.3)] transition-all"
              >
                Continuer →
              </button>
            </>
          )}

          {step === 2 && (
            <>
              {role === 'client' && (
                <>
                  <div>
                    <label className={labelClass}>Adresse de livraison principale *</label>
                    <textarea className={inputClass} rows={2} placeholder="Résidence Les Palmiers, Akwa, Douala" />
                  </div>
                  <div>
                    <label className={labelClass}>Mode de paiement préféré *</label>
                    <div className="grid grid-cols-2 gap-2">
                      {['🟠 Orange Money', '🟡 MTN MoMo', '💵 Cash', '💳 Carte'].map(m => (
                        <button key={m} onClick={() => setPaymentMethod(m)} className={`p-3 rounded-lg border text-sm font-body transition-all ${paymentMethod === m ? 'border-zinga-orange bg-zinga-orange/10 text-foreground' : 'border-border text-muted-foreground hover:border-muted-foreground'}`}>
                          {m}
                        </button>
                      ))}
                    </div>
                  </div>
                </>
              )}
              {role === 'rider' && (
                <>
                  <div>
                    <label className={labelClass}>Type de véhicule *</label>
                    <div className="grid grid-cols-3 gap-2">
                      {['🚲 Vélo', '🛵 Moto', '⚡ Vélo élec.'].map(v => (
                        <button key={v} onClick={() => setVehicle(v)} className={`p-3 rounded-lg border text-sm font-body text-center transition-all ${vehicle === v ? 'border-zinga-green bg-zinga-green/10 text-foreground' : 'border-border text-muted-foreground'}`}>
                          {v}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className={labelClass}>Disponibilité *</label>
                    <div className="flex flex-wrap gap-2">
                      {['🌅 Matin', '☀️ Midi', '🌆 Soir', '🌙 Nuit'].map(d => (
                        <button key={d} className="px-3 py-2 rounded-full border border-border text-xs font-body text-muted-foreground hover:border-zinga-green hover:text-foreground transition-all">
                          {d}
                        </button>
                      ))}
                    </div>
                  </div>
                </>
              )}
              {role === 'restaurant' && (
                <>
                  <div>
                    <label className={labelClass}>Nom du restaurant *</label>
                    <input className={inputClass} placeholder="Chez Mama Ngono" />
                  </div>
                  <div>
                    <label className={labelClass}>Type de cuisine *</label>
                    <select className={inputClass}>
                      <option>Cuisine camerounaise</option>
                      <option>Africaine</option>
                      <option>Fast food</option>
                      <option>Healthy</option>
                      <option>Fusion</option>
                    </select>
                  </div>
                </>
              )}
              {role === 'admin' && (
                <div>
                  <label className={labelClass}>Code d'accès *</label>
                  <input
                    type="password"
                    className={`${inputClass} ${adminError ? 'border-destructive animate-[shake_0.3s_ease-in-out]' : ''}`}
                    placeholder="Entrez le code d'accès"
                    value={adminCode}
                    onChange={e => { setAdminCode(e.target.value); setAdminError(false); }}
                  />
                  {adminError && <p className="text-destructive text-xs mt-1 font-body">Code incorrect</p>}
                </div>
              )}
              <div className="flex gap-3">
                <button onClick={() => setStep(1)} className="flex-1 h-[52px] border border-zinga-orange text-zinga-orange rounded-lg font-body font-bold text-sm hover:bg-zinga-orange/10 transition-all">
                  ← Retour
                </button>
                <button
                  onClick={() => setStep(3)}
                  className="flex-1 h-[52px] bg-zinga-orange text-primary-foreground rounded-lg font-body font-bold text-sm hover:bg-zinga-orange-dark transition-all"
                >
                  Continuer →
                </button>
              </div>
            </>
          )}

          {step === 3 && (
            <>
              <div className="text-center py-6">
                <div className="w-16 h-16 rounded-full bg-zinga-orange/20 flex items-center justify-center mx-auto mb-4">
                  <Check className="text-zinga-orange" size={32} />
                </div>
                <h3 className="font-display text-2xl text-foreground mb-2">Tout est prêt!</h3>
                <p className="text-muted-foreground text-sm font-body">Cliquez pour accéder à votre espace {roleLabels[role]}</p>
              </div>
              <button
                onClick={handleSubmit}
                disabled={loading}
                className="w-full h-[52px] bg-zinga-orange text-primary-foreground rounded-lg font-body font-bold tracking-wider text-sm hover:bg-zinga-orange-dark hover:-translate-y-0.5 hover:shadow-[0_8px_25px_rgba(255,92,0,0.3)] transition-all disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {loading ? <><Loader2 className="animate-spin" size={18} /> Chargement...</> : 'Commencer →'}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
