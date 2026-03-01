import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Star, Clock, Plus, Minus, ShoppingCart } from 'lucide-react';
import { useRestaurants, useCart } from '@/contexts/AppContext';

export default function RestaurantDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { restaurants } = useRestaurants();
  const { addToCart, cartItems, cartTotal, cartRestaurantId } = useCart();
  const restaurant = restaurants.find(r => r.id === id);
  const [activeCategory, setActiveCategory] = useState('Tout');

  if (!restaurant) return <div className="p-8 text-center text-muted-foreground font-body">Restaurant introuvable</div>;

  const menuCategories = ['Tout', ...Array.from(new Set(restaurant.menu.map(m => m.category)))];
  const filteredMenu = activeCategory === 'Tout' ? restaurant.menu : restaurant.menu.filter(m => m.category === activeCategory);
  const cartForThis = cartRestaurantId === restaurant.id ? cartItems : [];
  const cartCount = cartForThis.reduce((s, c) => s + c.quantity, 0);

  return (
    <div className="animate-fade-in-up">
      {/* Hero */}
      <div className="relative h-64 lg:h-80">
        <img src={restaurant.image} alt={restaurant.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
        <button onClick={() => navigate(-1)} className="absolute top-4 left-4 w-10 h-10 rounded-full bg-background/60 backdrop-blur-sm flex items-center justify-center text-foreground hover:bg-background/80 transition-all">
          <ArrowLeft size={18} />
        </button>
        <div className="absolute bottom-6 left-6 right-6">
          <h1 className="font-display text-4xl text-foreground mb-2">{restaurant.name}</h1>
          <div className="flex items-center gap-3 flex-wrap">
            <span className="px-3 py-1 rounded-full bg-card/80 backdrop-blur-sm text-xs font-body text-foreground flex items-center gap-1">
              <Star size={12} className="text-zinga-gold fill-zinga-gold" /> {restaurant.rating}
            </span>
            <span className="px-3 py-1 rounded-full bg-card/80 backdrop-blur-sm text-xs font-body text-foreground flex items-center gap-1">
              <Clock size={12} /> {restaurant.deliveryTime}
            </span>
            <span className="px-3 py-1 rounded-full bg-card/80 backdrop-blur-sm text-xs font-body text-foreground">
              🛵 {restaurant.deliveryFee}
            </span>
          </div>
        </div>
      </div>

      {/* Info */}
      <div className="px-4 lg:px-8 py-4 flex items-center gap-3 border-b border-border">
        <span className="px-3 py-1 rounded-full bg-card border border-border text-xs font-body text-muted-foreground">{restaurant.category}</span>
        <span className={`px-3 py-1 rounded-full text-xs font-body font-semibold ${restaurant.isOpen ? 'bg-zinga-green/10 text-zinga-green' : 'bg-destructive/10 text-destructive'}`}>
          {restaurant.isOpen ? '🟢 Ouvert' : '⭕ Fermé'}
        </span>
        <span className="text-xs text-muted-foreground font-body">{restaurant.reviewCount} avis</span>
      </div>

      {/* Category tabs */}
      <div className="sticky top-0 z-20 bg-background border-b border-border px-4 lg:px-8">
        <div className="flex gap-2 overflow-x-auto py-3">
          {menuCategories.map(c => (
            <button
              key={c}
              onClick={() => setActiveCategory(c)}
              className={`px-4 py-1.5 rounded-full text-xs font-body font-medium whitespace-nowrap transition-all ${activeCategory === c ? 'bg-zinga-orange text-primary-foreground' : 'text-muted-foreground hover:text-foreground'}`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* Menu items */}
      <div className="px-4 lg:px-8 py-6 space-y-3">
        {filteredMenu.map(item => (
          <div
            key={item.id}
            className={`flex items-center gap-4 bg-card border border-border rounded-xl p-4 transition-all ${!item.isAvailable ? 'opacity-50' : 'hover:border-zinga-orange/30'}`}
          >
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-lg">{item.emoji}</span>
                <p className="font-body font-semibold text-foreground">{item.name}</p>
                {item.isPopular && <span className="text-[10px] font-body font-bold text-zinga-orange">🔥 Populaire</span>}
              </div>
              <p className="text-xs text-muted-foreground font-body mt-1 line-clamp-2">{item.description}</p>
              <p className="text-zinga-orange font-body font-bold text-sm mt-2">{item.price.toLocaleString()} {item.currency}</p>
            </div>
            <img src={item.image} alt={item.name} className="w-24 h-24 rounded-xl object-cover" />
            {item.isAvailable && (
              <button
                onClick={() => addToCart(item, restaurant.id, restaurant.name)}
                className="flex-shrink-0 w-10 h-10 rounded-full bg-zinga-orange text-primary-foreground flex items-center justify-center hover:bg-zinga-orange-dark transition-all hover:scale-110"
              >
                <Plus size={18} />
              </button>
            )}
          </div>
        ))}
      </div>

      {/* Sticky cart bar */}
      {cartCount > 0 && (
        <div className="fixed bottom-0 lg:bottom-4 left-0 lg:left-64 right-0 p-4 z-30">
          <button
            onClick={() => navigate('/client/cart')}
            className="w-full max-w-xl mx-auto flex items-center justify-between bg-zinga-orange text-primary-foreground rounded-xl px-6 py-4 font-body font-bold shadow-[0_8px_25px_rgba(255,92,0,0.3)] hover:-translate-y-0.5 transition-all"
          >
            <span className="flex items-center gap-2"><ShoppingCart size={18} /> Voir le panier · {cartCount} articles</span>
            <span>{cartTotal.toLocaleString()} {cartForThis[0]?.menuItem.currency || 'FCFA'}</span>
          </button>
        </div>
      )}
    </div>
  );
}
