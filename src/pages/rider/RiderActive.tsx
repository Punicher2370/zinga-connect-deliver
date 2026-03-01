import React, { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { Phone, Check, MapPin, Camera } from 'lucide-react';
import { useOrders } from '@/contexts/AppContext';
import { toast } from 'sonner';

export default function RiderActive() {
  const { orders, updateOrderStatus } = useOrders();
  const activeOrder = orders.find(o => ['confirmed', 'preparing', 'ready_for_pickup', 'delivering'].includes(o.status) && o.riderId);
  const [step, setStep] = useState(1);
  const [checkedItems, setCheckedItems] = useState<string[]>([]);
  const [code, setCode] = useState('');
  const [showConfetti, setShowConfetti] = useState(false);

  if (!activeOrder) {
    return (
      <div className="animate-fade-in-up flex flex-col items-center justify-center min-h-[70vh] p-8 text-center">
        <span className="text-5xl mb-4">📦</span>
        <h2 className="font-display text-2xl text-foreground mb-2">Aucune commande en cours</h2>
        <p className="text-muted-foreground font-body text-sm">Acceptez une commande pour commencer</p>
      </div>
    );
  }

  const confirmDelivery = () => {
    if (code.length === 4) {
      updateOrderStatus(activeOrder.id, 'delivered');
      setShowConfetti(true);
      toast.success('🎉 Livraison confirmée! +850 FCFA');
      setTimeout(() => setShowConfetti(false), 3000);
    }
  };

  return (
    <div className="animate-fade-in-up p-4 max-w-xl mx-auto relative">
      {showConfetti && (
        <div className="fixed inset-0 z-50 pointer-events-none flex items-center justify-center">
          {['🎉', '🎊', '⭐', '🔥', '✨'].map((e, i) => (
            <span key={i} className="absolute text-4xl animate-confetti" style={{ left: `${20 + i * 15}%`, animationDelay: `${i * 0.2}s` }}>{e}</span>
          ))}
          <div className="text-center animate-fade-in-up">
            <span className="text-6xl block mb-2">✅</span>
            <h2 className="font-display text-4xl text-zinga-green">Livraison confirmée!</h2>
            <p className="text-zinga-orange font-display text-2xl mt-2">+850 FCFA</p>
          </div>
        </div>
      )}

      <h2 className="font-display text-2xl text-foreground mb-1">Commande {activeOrder.id}</h2>
      <p className="text-muted-foreground font-body text-sm mb-6">{activeOrder.restaurantName}</p>

      {/* Steps */}
      {step === 1 && (
        <div className="space-y-4">
          <div className="bg-card border border-border rounded-xl p-5">
            <h3 className="font-display text-lg text-foreground mb-2">📍 Rendez-vous au restaurant</h3>
            <p className="text-muted-foreground font-body text-sm">{activeOrder.restaurantName}</p>
            <p className="text-muted-foreground font-body text-xs mt-1">Akwa, Douala</p>
          </div>
          <button onClick={() => setStep(2)} className="w-full h-12 bg-zinga-orange text-primary-foreground rounded-lg font-body font-bold hover:bg-zinga-orange-dark transition-all">
            ✅ Je suis au restaurant
          </button>
        </div>
      )}

      {step === 2 && (
        <div className="space-y-4">
          <div className="bg-card border border-border rounded-xl p-5">
            <h3 className="font-display text-lg text-foreground mb-3">📋 Vérifiez les articles</h3>
            {activeOrder.items.map(item => (
              <label key={item.menuItemId} className="flex items-center gap-3 py-2 cursor-pointer">
                <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${checkedItems.includes(item.menuItemId) ? 'bg-zinga-green border-zinga-green' : 'border-muted-foreground'}`}>
                  {checkedItems.includes(item.menuItemId) && <Check size={12} className="text-primary-foreground" />}
                </div>
                <span className="font-body text-sm text-foreground">{item.emoji} {item.name} x{item.quantity}</span>
                <input
                  type="checkbox"
                  className="hidden"
                  onChange={() => setCheckedItems(prev => prev.includes(item.menuItemId) ? prev.filter(x => x !== item.menuItemId) : [...prev, item.menuItemId])}
                />
              </label>
            ))}
          </div>
          <div className="bg-card border border-border rounded-xl p-4">
            <p className="text-sm font-body text-muted-foreground">👤 Client: {activeOrder.clientName.split(' ')[0]} · {activeOrder.clientDistrict}</p>
          </div>
          <button
            onClick={() => { updateOrderStatus(activeOrder.id, 'delivering'); setStep(3); }}
            disabled={checkedItems.length !== activeOrder.items.length}
            className="w-full h-12 bg-zinga-orange text-primary-foreground rounded-lg font-body font-bold hover:bg-zinga-orange-dark transition-all disabled:opacity-40"
          >
            ✅ J'ai récupéré la commande
          </button>
        </div>
      )}

      {step === 3 && (
        <div className="space-y-4">
          <div className="bg-card border border-border rounded-xl p-5">
            <h3 className="font-display text-lg text-foreground mb-2">📍 Livrer au client</h3>
            <p className="text-foreground font-body text-sm">{activeOrder.clientAddress}</p>
            <div className="flex gap-2 mt-3">
              <button onClick={() => toast.info('Appel simulé')} className="flex-1 h-10 bg-zinga-orange text-primary-foreground rounded-lg font-body text-xs font-bold flex items-center justify-center gap-1 hover:bg-zinga-orange-dark transition-all">
                <Phone size={14} /> Appeler
              </button>
              <button onClick={() => toast.info('Navigation simulée')} className="flex-1 h-10 bg-secondary text-foreground rounded-lg font-body text-xs flex items-center justify-center gap-1 hover:bg-muted transition-all">
                <MapPin size={14} /> Naviguer
              </button>
            </div>
          </div>

          <div className="bg-card border border-border rounded-xl p-5">
            <h3 className="font-display text-lg text-foreground mb-3">📸 Confirmer la livraison</h3>
            <label className="text-sm font-body text-muted-foreground mb-1.5 block">Code de confirmation (4 chiffres)</label>
            <input
              className="w-full bg-secondary border border-border rounded-lg px-4 py-3 text-foreground text-center text-xl tracking-[10px] font-body focus:border-zinga-orange focus:outline-none transition-all"
              maxLength={4}
              placeholder="····"
              value={code}
              onChange={e => setCode(e.target.value.replace(/\D/g, ''))}
            />
          </div>

          <button
            onClick={confirmDelivery}
            disabled={code.length < 4}
            className="w-full h-12 bg-zinga-green text-primary-foreground rounded-lg font-body font-bold hover:bg-zinga-green/80 transition-all disabled:opacity-40"
          >
            ✅ Livraison confirmée!
          </button>
        </div>
      )}
    </div>
  );
}
