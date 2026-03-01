import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart } from 'lucide-react';

export default function ClientFavorites() {
  const navigate = useNavigate();
  return (
    <div className="animate-fade-in-up p-4 lg:p-8 max-w-3xl">
      <h1 className="font-display text-3xl text-foreground mb-6">Mes Favoris</h1>
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="w-20 h-20 rounded-full bg-zinga-orange/10 flex items-center justify-center mb-4">
          <Heart size={36} className="text-zinga-orange" />
        </div>
        <h3 className="font-display text-2xl text-foreground mb-2">Aucun favori</h3>
        <p className="text-muted-foreground font-body text-sm mb-6">Explorez les restaurants et cliquez sur ❤️</p>
        <button onClick={() => navigate('/client')} className="px-6 py-3 bg-zinga-orange text-primary-foreground rounded-lg font-body font-bold hover:bg-zinga-orange-dark transition-all">
          Explorer
        </button>
      </div>
    </div>
  );
}
