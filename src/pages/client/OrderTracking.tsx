import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Phone, MessageCircle, Check } from 'lucide-react';
import { useOrders } from '@/contexts/AppContext';
import { OrderStatus } from '@/types';
import { toast } from 'sonner';

const steps: { status: OrderStatus; label: string; icon: string }[] = [
  { status: 'pending', label: 'Commande reçue', icon: '📋' },
  { status: 'confirmed', label: 'Restaurant confirmé', icon: '✅' },
  { status: 'preparing', label: 'En préparation...', icon: '👨‍🍳' },
  { status: 'ready_for_pickup', label: 'Rider récupère la commande', icon: '🚴' },
  { status: 'delivering', label: 'En route vers vous', icon: '📍' },
  { status: 'delivered', label: 'Livré !', icon: '🎉' },
];

const statusOrder: OrderStatus[] = ['pending', 'confirmed', 'preparing', 'ready_for_pickup', 'delivering', 'delivered'];

export default function OrderTracking() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { orders, updateOrderStatus } = useOrders();
  const order = orders.find(o => o.id === id);
  const [currentStatus, setCurrentStatus] = useState<OrderStatus>(order?.status || 'pending');

  // Simulate status progression
  useEffect(() => {
    if (!order || currentStatus === 'delivered') return;
    const idx = statusOrder.indexOf(currentStatus);
    if (idx < statusOrder.length - 1) {
      const timer = setTimeout(() => {
        const next = statusOrder[idx + 1];
        setCurrentStatus(next);
        updateOrderStatus(order.id, next);
        toast.success(`Statut mis à jour: ${steps.find(s => s.status === next)?.label}`);
      }, 15000);
      return () => clearTimeout(timer);
    }
  }, [currentStatus, order]);

  if (!order) {
    return (
      <div className="p-8 text-center">
        <p className="text-muted-foreground font-body">Commande introuvable</p>
        <button onClick={() => navigate('/client/orders')} className="mt-4 text-zinga-orange font-body hover:underline">Voir mes commandes</button>
      </div>
    );
  }

  const currentIdx = statusOrder.indexOf(currentStatus);

  return (
    <div className="animate-fade-in-up p-4 lg:p-8 max-w-2xl">
      <button onClick={() => navigate('/client/orders')} className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6 font-body text-sm transition-colors">
        <ArrowLeft size={16} /> Retour
      </button>

      <h1 className="font-display text-3xl text-foreground mb-1">Commande {order.id}</h1>
      <p className="text-muted-foreground font-body text-sm mb-6">{order.restaurantName}</p>

      {/* Map simulation */}
      <div className="bg-card border border-border rounded-2xl p-6 mb-6 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'radial-gradient(circle at 30% 50%, hsl(var(--zinga-orange)), transparent 50%), radial-gradient(circle at 70% 60%, hsl(var(--zinga-green)), transparent 40%)' }} />
        <div className="relative flex items-center justify-between">
          <div className="text-center">
            <div className="w-12 h-12 rounded-full bg-zinga-orange/20 flex items-center justify-center mx-auto mb-2">🍽️</div>
            <p className="text-xs font-body text-muted-foreground">Restaurant</p>
          </div>
          <div className="flex-1 mx-4 border-t-2 border-dashed border-zinga-orange/30 relative">
            <div className={`absolute top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-zinga-orange flex items-center justify-center text-primary-foreground text-sm transition-all duration-1000 ${currentStatus === 'delivering' ? 'left-[60%] animate-pulse-glow' : currentStatus === 'delivered' ? 'left-full -translate-x-full' : 'left-0'}`}>
              🚴
            </div>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 rounded-full bg-zinga-green/20 flex items-center justify-center mx-auto mb-2">🏠</div>
            <p className="text-xs font-body text-muted-foreground">Votre adresse</p>
          </div>
        </div>
      </div>

      {/* Stepper */}
      <div className="space-y-0 mb-6">
        {steps.map((step, i) => {
          const isDone = i < currentIdx;
          const isCurrent = i === currentIdx;
          return (
            <div key={step.status} className="flex gap-4">
              <div className="flex flex-col items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${isDone ? 'bg-zinga-green text-primary-foreground' : isCurrent ? 'bg-zinga-orange text-primary-foreground animate-pulse-status' : 'bg-secondary text-muted-foreground'}`}>
                  {isDone ? <Check size={14} /> : step.icon}
                </div>
                {i < steps.length - 1 && <div className={`w-0.5 h-8 ${isDone ? 'bg-zinga-green' : 'bg-secondary'}`} />}
              </div>
              <div className="pt-1">
                <p className={`font-body text-sm ${isDone || isCurrent ? 'text-foreground font-medium' : 'text-muted-foreground'}`}>
                  {step.label}
                  {isCurrent && <span className="ml-2 text-zinga-orange animate-pulse-status">●</span>}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Rider card */}
      {order.riderName && currentIdx >= 3 && (
        <div className="bg-card border border-border rounded-xl p-4 mb-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-zinga-orange flex items-center justify-center text-primary-foreground font-bold">
              {order.riderName.charAt(0)}
            </div>
            <div className="flex-1">
              <p className="font-body font-semibold text-foreground">{order.riderName}</p>
              <p className="text-xs text-muted-foreground font-body">⭐ 4.9 · Zinga Rider</p>
            </div>
            <div className="flex gap-2">
              <button onClick={() => toast.info('Appel simulé')} className="w-10 h-10 rounded-full bg-zinga-orange flex items-center justify-center text-primary-foreground hover:bg-zinga-orange-dark transition-all">
                <Phone size={16} />
              </button>
              <button onClick={() => toast.info('WhatsApp simulé')} className="w-10 h-10 rounded-full bg-zinga-green flex items-center justify-center text-primary-foreground transition-all">
                <MessageCircle size={16} />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Order details */}
      <div className="bg-card border border-border rounded-xl p-4">
        <h3 className="font-display text-lg text-foreground mb-3">Détails de la commande</h3>
        {order.items.map((item, i) => (
          <div key={i} className="flex justify-between py-2 border-b border-border last:border-0 text-sm font-body">
            <span className="text-foreground">{item.emoji} {item.name} x{item.quantity}</span>
            <span className="text-muted-foreground">{(item.price * item.quantity).toLocaleString()} {order.currency}</span>
          </div>
        ))}
        <div className="flex justify-between pt-3 font-body font-bold text-foreground">
          <span>Total</span>
          <span className="text-zinga-orange">{order.total.toLocaleString()} {order.currency}</span>
        </div>
      </div>
    </div>
  );
}
