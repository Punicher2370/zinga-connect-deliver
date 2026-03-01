import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Minus, Plus, Trash2, MapPin, Tag, Check } from 'lucide-react';
import { useCart, useOrders, useApp } from '@/contexts/AppContext';
import { toast } from 'sonner';

const paymentMethods = [
  { id: 'om', label: '🟠 Orange Money' },
  { id: 'momo', label: '🟡 MTN MoMo' },
  { id: 'cash', label: '💵 Cash' },
  { id: 'card', label: '💳 Carte' },
];

export default function ClientCart() {
  const navigate = useNavigate();
  const { currentUser } = useApp();
  const { cartItems, updateQuantity, removeFromCart, clearCart, cartTotal } = useCart();
  const { createOrder } = useOrders();
  const [address, setAddress] = useState('Résidence Les Palmiers, Akwa, Douala');
  const [promoCode, setPromoCode] = useState('');
  const [promoApplied, setPromoApplied] = useState(false);
  const [payment, setPayment] = useState('om');
  const [loading, setLoading] = useState(false);

  const deliveryFee = 500;
  const discount = promoApplied ? Math.round(cartTotal * 0.2) : 0;
  const total = cartTotal + deliveryFee - discount;

  const applyPromo = () => {
    if (promoCode.toUpperCase() === 'ZINGA20') {
      setPromoApplied(true);
      toast.success('🎉 Réduction de 20% appliquée!');
    } else {
      toast.error('Code promo invalide');
    }
  };

  const placeOrder = () => {
    setLoading(true);
    setTimeout(() => {
      const orderId = `ORD-${Date.now().toString().slice(-4)}`;
      createOrder({
        id: orderId,
        clientId: currentUser?.id || 'c1',
        clientName: currentUser?.name || 'Jean-Baptiste Mbarga',
        clientPhone: currentUser?.phone || '+237 655 111 222',
        clientAddress: address,
        clientDistrict: 'Akwa',
        restaurantId: cartItems[0]?.restaurantId || 'r1',
        restaurantName: cartItems[0]?.restaurantName || 'Chez Mama Ngono',
        items: cartItems.map(c => ({ menuItemId: c.menuItem.id, name: c.menuItem.name, price: c.menuItem.price, quantity: c.quantity, emoji: c.menuItem.emoji })),
        subtotal: cartTotal,
        deliveryFee,
        discount,
        total,
        currency: 'FCFA',
        status: 'pending',
        paymentMethod: paymentMethods.find(p => p.id === payment)?.label || 'Orange Money',
        createdAt: new Date().toISOString(),
        estimatedDelivery: new Date(Date.now() + 35 * 60000).toISOString(),
      });
      clearCart();
      toast.success('Commande passée avec succès! 🎉');
      navigate(`/client/tracking/${orderId}`);
    }, 2000);
  };

  if (cartItems.length === 0) {
    return (
      <div className="animate-fade-in-up flex flex-col items-center justify-center min-h-[60vh] p-8 text-center">
        <span className="text-6xl mb-4">🛒</span>
        <h2 className="font-display text-3xl text-foreground mb-2">Panier vide</h2>
        <p className="text-muted-foreground font-body mb-6">Explorez les restaurants et ajoutez des plats</p>
        <button onClick={() => navigate('/client')} className="px-6 py-3 bg-zinga-orange text-primary-foreground rounded-lg font-body font-bold hover:bg-zinga-orange-dark transition-all">
          Explorer les restaurants
        </button>
      </div>
    );
  }

  return (
    <div className="animate-fade-in-up p-4 lg:p-8 max-w-4xl">
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-display text-3xl text-foreground">Mon Panier</h1>
        <button onClick={clearCart} className="text-destructive text-sm font-body hover:underline">Vider</button>
      </div>

      <div className="lg:flex gap-6">
        {/* Items */}
        <div className="flex-1 space-y-3 mb-6 lg:mb-0">
          <div className="px-3 py-2 bg-zinga-orange/10 rounded-lg text-zinga-orange text-sm font-body font-medium">
            🍽️ {cartItems[0]?.restaurantName}
          </div>

          {cartItems.map(item => (
            <div key={item.menuItem.id} className="flex items-center gap-4 bg-card border border-border rounded-xl p-4">
              <span className="text-2xl">{item.menuItem.emoji}</span>
              <div className="flex-1 min-w-0">
                <p className="font-body font-medium text-foreground text-sm">{item.menuItem.name}</p>
                <p className="text-zinga-orange text-sm font-body font-bold">{(item.menuItem.price * item.quantity).toLocaleString()} FCFA</p>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={() => updateQuantity(item.menuItem.id, item.quantity - 1)} className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center text-foreground hover:bg-muted transition-all">
                  <Minus size={14} />
                </button>
                <span className="w-8 text-center font-body font-semibold text-foreground">{item.quantity}</span>
                <button onClick={() => updateQuantity(item.menuItem.id, item.quantity + 1)} className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center text-foreground hover:bg-muted transition-all">
                  <Plus size={14} />
                </button>
              </div>
              <button onClick={() => removeFromCart(item.menuItem.id)} className="text-muted-foreground hover:text-destructive transition-colors">
                <Trash2 size={16} />
              </button>
            </div>
          ))}

          {/* Address */}
          <div className="mt-4">
            <label className="text-sm font-body text-muted-foreground mb-1.5 flex items-center gap-1"><MapPin size={14} /> Adresse de livraison</label>
            <textarea
              className="w-full bg-card border border-border rounded-lg px-4 py-3 text-foreground placeholder:text-muted-foreground/50 focus:border-zinga-orange focus:outline-none transition-all font-body text-sm"
              rows={2}
              value={address}
              onChange={e => setAddress(e.target.value)}
            />
          </div>
        </div>

        {/* Summary */}
        <div className="lg:w-80">
          <div className="bg-card border border-border rounded-xl p-6 lg:sticky lg:top-4 space-y-4">
            <h3 className="font-display text-xl text-foreground">Récapitulatif</h3>

            <div className="space-y-2 text-sm font-body">
              <div className="flex justify-between text-muted-foreground">
                <span>Sous-total</span>
                <span>{cartTotal.toLocaleString()} FCFA</span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>Livraison</span>
                <span>{deliveryFee.toLocaleString()} FCFA</span>
              </div>
              {promoApplied && (
                <div className="flex justify-between text-zinga-green">
                  <span>🎉 Réduction (20%)</span>
                  <span>-{discount.toLocaleString()} FCFA</span>
                </div>
              )}
            </div>

            {/* Promo */}
            <div className="flex gap-2">
              <input
                className="flex-1 bg-secondary border border-border rounded-lg px-3 py-2 text-foreground text-xs font-body focus:border-zinga-orange focus:outline-none"
                placeholder="Code promo"
                value={promoCode}
                onChange={e => setPromoCode(e.target.value)}
              />
              <button onClick={applyPromo} className="px-3 py-2 bg-secondary text-foreground rounded-lg text-xs font-body hover:bg-muted transition-all">
                {promoApplied ? <Check size={14} className="text-zinga-green" /> : 'Appliquer'}
              </button>
            </div>

            <div className="border-t border-border pt-3 flex justify-between font-body font-bold text-foreground">
              <span>Total</span>
              <span className="text-zinga-orange text-lg">{total.toLocaleString()} FCFA</span>
            </div>

            {/* Payment */}
            <div className="grid grid-cols-2 gap-2">
              {paymentMethods.map(m => (
                <button
                  key={m.id}
                  onClick={() => setPayment(m.id)}
                  className={`p-3 rounded-lg border text-xs font-body text-center transition-all ${payment === m.id ? 'border-zinga-orange bg-zinga-orange/10 text-foreground' : 'border-border text-muted-foreground'}`}
                >
                  {m.label}
                </button>
              ))}
            </div>

            <button
              onClick={placeOrder}
              disabled={loading}
              className="w-full h-[52px] bg-zinga-orange text-primary-foreground rounded-lg font-body font-bold text-sm hover:bg-zinga-orange-dark hover:-translate-y-0.5 hover:shadow-[0_8px_25px_rgba(255,92,0,0.3)] transition-all disabled:opacity-50"
            >
              {loading ? '⏳ Traitement...' : 'Commander maintenant →'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
