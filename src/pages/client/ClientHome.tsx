import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Star, Clock, ChevronRight, Heart, ShoppingCart } from 'lucide-react';
import { useRestaurants, useCart, useApp } from '@/contexts/AppContext';
import { Restaurant } from '@/types';

const categories = ['Tout', '🍲 Traditionnel', '🍗 Grillades', '🍔 Fast Food', '🥗 Healthy', '🍕 Pizza', '🥤 Boissons'];

export default function ClientHome() {
  const { currentUser } = useApp();
  const { restaurants } = useRestaurants();
  const { addToCart, cartItems } = useCart();
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('Tout');
  const [favorites, setFavorites] = useState<string[]>([]);

  const toggleFav = (id: string) => setFavorites(prev => prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]);

  const filteredRestaurants = restaurants.filter(r => {
    const matchSearch = r.name.toLowerCase().includes(search.toLowerCase()) || r.category.toLowerCase().includes(search.toLowerCase());
    const matchCat = activeCategory === 'Tout' || r.category.toLowerCase().includes(activeCategory.replace(/[^\w\s]/g, '').trim().toLowerCase());
    return matchSearch && matchCat;
  });

  const flashDeals = [
    { dish: 'Poulet DG', restaurant: 'Chez Mama Ngono', discount: 20, timeLeft: '23:45:12', emoji: '🍗' },
    { dish: 'Poisson Braisé', restaurant: 'Braise & Piment', discount: 15, timeLeft: '18:30:45', emoji: '🐟' },
    { dish: 'Ndolé Complet', restaurant: 'Le Ndolé d\'Or', discount: 25, timeLeft: '12:15:33', emoji: '🥬' },
  ];

  const popular = restaurants.filter(r => r.isOpen).sort((a, b) => b.rating - a.rating).slice(0, 5);

  const reorderItems = [
    { name: 'Poulet DG', restaurant: 'Chez Mama Ngono', price: 3200, emoji: '🍗', restaurantId: 'r1' },
    { name: 'Jus de Bissap', restaurant: 'Le Comptoir du Maquis', price: 500, emoji: '🥤', restaurantId: 'r6' },
    { name: 'Brochettes + Miondo', restaurant: 'Braise & Piment', price: 1800, emoji: '🥩', restaurantId: 'r3' },
  ];

  return (
    <div className="animate-fade-in-up p-4 lg:p-8 max-w-5xl">
      {/* Greeting */}
      <div className="mb-6">
        <h2 className="text-xl font-body font-semibold text-foreground">Bonjour, {currentUser?.name?.split(' ')[0] || 'Jean-Baptiste'} 👋</h2>
        <p className="text-muted-foreground text-sm font-body">Que mange-t-on aujourd'hui ?</p>
        <span className="inline-block mt-2 px-3 py-1 rounded-full bg-zinga-orange/10 text-zinga-orange text-xs font-body font-semibold">📍 {currentUser?.city || 'Douala'}</span>
      </div>

      {/* Search */}
      <div className="relative mb-6">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
        <input
          className="w-full bg-card border border-border rounded-xl pl-12 pr-4 py-3 text-foreground placeholder:text-muted-foreground/50 focus:border-zinga-orange focus:outline-none transition-all font-body text-sm"
          placeholder="Rechercher un plat ou restaurant..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>

      {/* Categories */}
      <div className="flex gap-2 overflow-x-auto pb-4 mb-6 scrollbar-hide">
        {categories.map(c => (
          <button
            key={c}
            onClick={() => setActiveCategory(c)}
            className={`px-4 py-2 rounded-full text-xs font-body font-medium whitespace-nowrap transition-all ${activeCategory === c ? 'bg-zinga-orange text-primary-foreground' : 'bg-card border border-border text-muted-foreground hover:border-muted-foreground'}`}
          >
            {c}
          </button>
        ))}
      </div>

      {/* Flash Deals */}
      <section className="mb-8">
        <h3 className="font-display text-2xl text-foreground mb-4">⚡ Offres Flash</h3>
        <div className="flex gap-4 overflow-x-auto pb-2">
          {flashDeals.map((deal, i) => (
            <div key={i} className="min-w-[260px] bg-gradient-to-br from-zinga-orange to-zinga-orange-dark rounded-2xl p-5 text-primary-foreground">
              <span className="text-xs font-body font-bold tracking-wider">⚡ OFFRE FLASH</span>
              <p className="font-display text-3xl mt-1">{deal.emoji} {deal.dish}</p>
              <p className="text-sm font-body opacity-80">{deal.restaurant}</p>
              <div className="flex justify-between items-center mt-3">
                <span className="text-2xl font-bold font-body">-{deal.discount}%</span>
                <span className="text-xs font-body bg-primary-foreground/20 px-3 py-1 rounded-full">⏱ {deal.timeLeft}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Popular restaurants */}
      <section className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-display text-2xl text-foreground">Populaires près de toi</h3>
          <button className="text-zinga-orange text-sm font-body hover:underline">Voir tout →</button>
        </div>
        <div className="flex gap-4 overflow-x-auto pb-2">
          {popular.map(r => (
            <div
              key={r.id}
              onClick={() => navigate(`/client/restaurant/${r.id}`)}
              className="min-w-[200px] bg-card border border-border rounded-2xl overflow-hidden cursor-pointer group hover:-translate-y-1 transition-all duration-300"
            >
              <div className="relative h-32">
                <img src={r.image} alt={r.name} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-card/90 to-transparent" />
                <span className={`absolute top-2 left-2 px-2 py-0.5 rounded-full text-[10px] font-body font-bold ${r.isOpen ? 'bg-zinga-green text-primary-foreground' : 'bg-destructive text-primary-foreground'}`}>
                  {r.isOpen ? 'OUVERT' : 'FERMÉ'}
                </span>
                <button onClick={e => { e.stopPropagation(); toggleFav(r.id); }} className="absolute top-2 right-2">
                  <Heart size={18} className={favorites.includes(r.id) ? 'fill-zinga-orange text-zinga-orange' : 'text-foreground/50'} />
                </button>
              </div>
              <div className="p-3">
                <p className="font-body font-semibold text-sm text-foreground truncate">{r.name}</p>
                <p className="text-xs text-muted-foreground font-body">{r.category}</p>
                <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground font-body">
                  <span className="flex items-center gap-1"><Star size={12} className="text-zinga-gold fill-zinga-gold" /> {r.rating}</span>
                  <span>·</span>
                  <span className="flex items-center gap-1"><Clock size={12} /> {r.deliveryTime}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Reorder */}
      <section className="mb-8">
        <h3 className="font-display text-2xl text-foreground mb-1">Tu as adoré ça 😍</h3>
        <p className="text-muted-foreground text-sm font-body mb-4">Commander à nouveau en 1 clic</p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {reorderItems.map((item, i) => (
            <div key={i} className="flex items-center gap-3 bg-card border border-border rounded-xl p-4 hover:-translate-y-0.5 transition-all">
              <span className="text-3xl">{item.emoji}</span>
              <div className="flex-1 min-w-0">
                <p className="font-body font-medium text-sm text-foreground truncate">{item.name}</p>
                <p className="text-xs text-muted-foreground font-body">{item.restaurant}</p>
              </div>
              <button className="px-3 py-1.5 bg-zinga-orange text-primary-foreground rounded-lg text-xs font-body font-semibold hover:bg-zinga-orange-dark transition-all whitespace-nowrap">
                {item.price.toLocaleString()} F
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* All restaurants */}
      <section>
        <h3 className="font-display text-2xl text-foreground mb-4">Tous les restaurants</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {filteredRestaurants.map(r => (
            <div
              key={r.id}
              onClick={() => navigate(`/client/restaurant/${r.id}`)}
              className="flex items-center gap-4 bg-card border border-border rounded-xl p-4 cursor-pointer hover:-translate-y-0.5 hover:border-zinga-orange/30 transition-all duration-300"
            >
              <img src={r.image} alt={r.name} className="w-20 h-20 rounded-xl object-cover" />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="font-body font-semibold text-foreground truncate">{r.name}</p>
                  {r.isNew && <span className="px-2 py-0.5 bg-zinga-gold/20 text-zinga-gold text-[10px] font-body font-bold rounded-full">NOUVEAU</span>}
                </div>
                <p className="text-xs text-muted-foreground font-body">{r.category}</p>
                <div className="flex items-center gap-3 mt-1.5 text-xs text-muted-foreground font-body">
                  <span className="flex items-center gap-1"><Star size={12} className="text-zinga-gold fill-zinga-gold" /> {r.rating} ({r.reviewCount})</span>
                  <span>⏱ {r.deliveryTime}</span>
                  <span>🛵 {r.deliveryFee}</span>
                </div>
              </div>
              <ChevronRight size={18} className="text-muted-foreground" />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
