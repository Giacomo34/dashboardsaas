'use client';

import React, { useState, useEffect, use } from 'react';
import { menuData, MenuItem, MenuCategory } from '@/data/menu';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCart } from '@/context/CartContext';

export default function ItemDetail(props: { params: Promise<{ tableId: string, id: string }> }) {
  const params = use(props.params);
  const router = useRouter();
  const { addToCart } = useCart();
  const [foundItem, setFoundItem] = useState<MenuItem | null>(null);
  const [foundCategory, setFoundCategory] = useState<MenuCategory | null>(null);

  // Form state
  const [quantity, setQuantity] = useState(1);
  const [checkedExtras, setCheckedExtras] = useState<Set<number>>(new Set());

  // Unwrap params with React.use() equivalent pattern for Next 13+ client component
  // Or just use params directly if allowed, but to be strict let's just use it inside useEffect if needed.
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
    return <div className="p-8 text-center bg-background min-h-screen">Caricamento...</div>;
  }

  const extras = foundItem.extras || foundCategory?.categoryExtras || [];

  const toggleExtra = (idx: number) => {
    const newChecked = new Set(checkedExtras);
    if (newChecked.has(idx)) newChecked.delete(idx);
    else newChecked.add(idx);
    setCheckedExtras(newChecked);
  };

  const handleAddToCart = () => {
    const selectedExtras = Array.from(checkedExtras).map(idx => extras[idx]);
    addToCart(foundItem, quantity, selectedExtras);
    router.push(`/app/${params.tableId}/menu`);
  };

  // Calculate button price
  const itemPrice = foundItem.price || 0;
  const extrasTotal = Array.from(checkedExtras).reduce((acc, idx) => acc + extras[idx].price, 0);
  const total = (itemPrice + extrasTotal) * quantity;

  return (
    <div className="min-h-screen bg-background font-sans pb-32">
      <div className="h-64 bg-stone-200 relative">
        <div className="absolute top-4 left-4 z-10">
          <Link href={`/app/${params.tableId}/menu`} className="w-10 h-10 bg-white/80 backdrop-blur-md rounded-full flex items-center justify-center text-brand font-bold shadow-sm">
            ←
          </Link>
        </div>
        <div className="absolute inset-0 flex items-center justify-center text-stone-400">
          [Immagine Prodotto]
        </div>
      </div>

      <div className="px-6 py-6 bg-white -mt-6 rounded-t-3xl relative z-20 shadow-[0_-4px_20px_rgba(0,0,0,0.05)]">
        <div className="flex justify-between items-start gap-4 mb-2">
          <h1 className="text-3xl font-black text-brand leading-tight">
            {foundItem.name} {foundItem.isSignature && <span className="text-accent" title="Signature">🐢</span>}
          </h1>
          {foundItem.price !== undefined && (
             <div className="text-2xl font-bold text-brand whitespace-nowrap">
               € {foundItem.price.toLocaleString('es-ES', { minimumFractionDigits: 1 })}
             </div>
          )}
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          {foundItem.isBestSeller && (
            <span className="px-2 py-1 rounded bg-accent text-white text-xs font-bold uppercase tracking-wide">Best Seller</span>
          )}
          {foundItem.isVegetarian && !foundItem.isVegan && (
            <span className="px-2 py-1 rounded bg-green-50 border border-green-200 text-green-700 text-xs font-bold uppercase tracking-wide">Vegetariano</span>
          )}
          {foundItem.isVegan && (
            <span className="px-2 py-1 rounded bg-green-100 text-green-800 text-xs font-bold uppercase tracking-wide">Vegano</span>
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
              <p className="text-xs font-bold text-stone-500 uppercase tracking-wide mb-1">Alérgenos</p>
              <p className="text-sm text-stone-700">{foundItem.allergens.join(', ')}</p>
            </div>
          </div>
        )}

        {extras.length > 0 && (
          <div className="mb-8">
            <h3 className="text-lg font-bold text-brand mb-4">Añade a tu plato</h3>
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
          <span>Añadir al pedido</span>
          <span>€ {total.toLocaleString('es-ES', { minimumFractionDigits: 1 })}</span>
        </button>
      </div>

    </div>
  );
}
