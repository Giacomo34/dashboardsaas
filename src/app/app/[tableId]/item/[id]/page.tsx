'use client';

import React, { useState, useEffect, use } from 'react';
import { menuData, MenuItem, MenuCategory } from '@/data/menu';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import { useLang } from '@/context/LangContext';

export default function ItemDetail(props: { params: Promise<{ tableId: string, id: string }> }) {
  const params = use(props.params);
  const router = useRouter();
  const { addToCart } = useCart();
  const { t } = useLang();
  const [foundItem, setFoundItem] = useState<MenuItem | null>(null);
  const [foundCategory, setFoundCategory] = useState<MenuCategory | null>(null);

  // Form state
  const [quantity, setQuantity] = useState(1);
  const [checkedExtras, setCheckedExtras] = useState<Set<number>>(new Set());
  const [notes, setNotes] = useState('');

  useEffect(() => {
    let item: MenuItem | undefined;
    let cat: MenuCategory | undefined;

    for (const c of menuData) {
      const i = c.items.find(i => i.id === params.id);
      if (i) {
        item = i;
        cat = c;
        break;
      }
    }
    if (item) {
      setFoundItem(item);
      setFoundCategory(cat || null);
    }
  }, [params.id]);

  if (!foundItem) {
    return <div className="p-8 text-center text-stone-500">{t('loading')}</div>;
  }

  const itemPrice = foundItem.price || 0;
  const extras = foundItem.extras || foundCategory?.categoryExtras || [];
  
  // Calculate pricing
  const extrasTotal = Array.from(checkedExtras).reduce((acc, idx) => acc + extras[idx].price, 0);
  const total = (itemPrice + extrasTotal) * quantity;

  // Helper per emoji
  const getEmoji = (name: string) => {
    const l = name.toLowerCase();
    if (l.includes('burra') || l.includes('campesina')) return '🥗';
    if (l.includes('taco')) return '🌮';
    if (l.includes('croissant')) return '🥐';
    if (l.includes('bowl') || l.includes('açai')) return '🥣';
    if (l.includes('spritz')) return '🍹';
    if (l.includes('mejillones') || l.includes('pulpo') || l.includes('calamar') || l.includes('pescadito')) return '🐙';
    if (l.includes('burger') || l.includes('mundaka')) return '🍔';
    if (l.includes('sandwich') || l.includes('bocata') || l.includes('bikini')) return '🥪';
    if (l.includes('tostada') || l.includes('shakshuka')) return '🍳';
    if (l.includes('edamame') || l.includes('aceitunas') || l.includes('patatas')) return '🍟';
    return '🍽️';
  };

  const itemEmoji = foundItem ? getEmoji(foundItem.name) : '🍽️';

  return (
    <div className="min-h-screen bg-background font-sans pb-32">
      {/* Immagine dinamica ad alto impatto */}
      <div className="h-72 bg-gradient-to-br from-orange-100 to-rose-100 relative overflow-hidden flex items-center justify-center">
        <div className="absolute top-4 left-4 z-10">
          <Link href={`/app/${params.tableId}/menu`} className="w-10 h-10 bg-white/80 backdrop-blur-md rounded-full flex items-center justify-center text-brand font-bold shadow-sm">
            ←
          </Link>
        </div>
        
        {/* Cerchi decorativi */}
        <div className="absolute w-64 h-64 bg-white/40 rounded-full blur-2xl -top-10 -right-10"></div>
        <div className="absolute w-40 h-40 bg-accent/20 rounded-full blur-xl bottom-0 left-10"></div>

        {/* Emoji gigante */}
        <div className="text-9xl transform hover:scale-110 transition-transform duration-500 drop-shadow-xl z-10 relative">
          {itemEmoji}
        </div>
      </div>

      <div className="px-6 py-8 bg-white -mt-8 rounded-t-[2.5rem] relative z-20 shadow-[0_-10px_30px_rgba(0,0,0,0.06)]">
        <div className="flex justify-between items-start gap-4 mb-2">
          <h1 className="text-3xl font-black text-brand leading-tight">
            {foundItem.name} {foundItem.isSignature && <span className="text-accent" title="Signature">🐢</span>}
          </h1>
          <div className="text-2xl font-black text-brand whitespace-nowrap">
            {total.toLocaleString('es-ES', { minimumFractionDigits: 1 })} €
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          {foundItem.isBestSeller && (
            <span className="px-2 py-1 rounded bg-accent text-white text-xs font-bold uppercase tracking-wide">Best Seller</span>
          )}
          {foundItem.isVegetarian && !foundItem.isVegan && (
            <span className="px-2 py-1 rounded bg-green-50 border border-green-200 text-green-700 text-xs font-bold uppercase tracking-wide">{t('vegetarian')}</span>
          )}
          {foundItem.isVegan && (
            <span className="px-2 py-1 rounded bg-green-100 text-green-800 text-xs font-bold uppercase tracking-wide">{t('vegan')}</span>
          )}
          {foundItem.isKids && (
            <span className="px-2 py-1 rounded bg-blue-100 text-blue-800 text-xs font-bold uppercase tracking-wide">Kids 🐢</span>
          )}
        </div>

        {foundItem.description && (
          <p className="text-stone-600 text-lg leading-relaxed mb-6">
            {foundItem.description}
          </p>
        )}

        {foundItem.allergens && foundItem.allergens.length > 0 && (
          <div className="mb-8 p-3 rounded-xl bg-stone-50 border border-stone-100 flex items-start gap-3">
            <span className="text-lg">⚠️</span>
            <div>
              <p className="text-xs font-bold text-stone-500 uppercase tracking-wide mb-1">{t('allergens')}</p>
              <p className="text-sm text-stone-700">{foundItem.allergens.join(', ')}</p>
            </div>
          </div>
        )}

        {extras.length > 0 && (
          <div className="mb-8">
            <h3 className="text-lg font-bold text-brand mb-4">{t('add')}</h3>
            <div className="space-y-3">
              {extras.map((extra, idx) => (
                <label key={idx} className="flex justify-between items-center p-4 border border-stone-200 rounded-xl cursor-pointer active:bg-stone-50 transition-colors">
                 <div className="flex items-center gap-3">
                   <input 
                     type="checkbox" 
                     className="w-5 h-5 rounded border-stone-300 text-accent focus:ring-accent" 
                     checked={checkedExtras.has(idx)}
                     onChange={() => toggleExtra(idx)}
                   />
                   <span className="font-semibold text-stone-800">{extra.name}</span>
                 </div>
                 <span className="text-stone-500 font-medium">+ € {extra.price.toLocaleString('es-ES', { minimumFractionDigits: 1 })}</span>
                </label>
              ))}
            </div>
          </div>
        )}

        {/* Quantity */}
        <div className="mb-8 flex items-center justify-between border border-stone-200 p-2 rounded-2xl w-32 bg-stone-50">
          <button 
             onClick={() => setQuantity(Math.max(1, quantity - 1))}
             className="w-10 h-10 flex items-center justify-center text-xl font-bold text-stone-500 active:bg-stone-200 rounded-xl"
          >-</button>
          <span className="text-lg font-bold text-stone-800">{quantity}</span>
          <button 
             onClick={() => setQuantity(quantity + 1)}
             className="w-10 h-10 flex items-center justify-center text-xl font-bold text-stone-500 active:bg-stone-200 rounded-xl"
          >+</button>
        </div>

      </div>

      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white/80 backdrop-blur-xl border-t border-stone-100 z-50">
        <button 
           onClick={handleAddToCart}
           className="w-full h-14 bg-accent hover:bg-brand transition-colors text-white rounded-full flex items-center justify-between px-6 text-lg font-bold shadow-lg"
        >
          <span>{t('addToCart')}</span>
          <span>€ {total.toLocaleString('es-ES', { minimumFractionDigits: 1 })}</span>
        </button>
      </div>

    </div>
  );
}
