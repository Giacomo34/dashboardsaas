'use client';
import React, { Suspense } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCart } from '@/context/CartContext';

function CartLogic({ tableId }: { tableId: string }) {
  const router = useRouter();
  const { cartItems, totalPrice, removeFromCart, clearCart } = useCart();

  const handleCheckout = () => {
    // Navigate to status screen simulating success
    router.push(`/app/${tableId}/status`);
    // Ideally clear cart, but maybe we do it on the status page
  };

  return (
    <div className="px-4 space-y-6 pt-6 bg-[#FDFBF7] min-h-screen pb-32">
      <h2 className="text-2xl font-black text-brand mb-2">Il tuo Ordine</h2>
      
      {cartItems.length === 0 ? (
        <div className="text-stone-500 bg-white p-6 rounded-2xl border border-stone-200 text-center font-medium">
          Il tuo carrello è vuoto.
        </div>
      ) : (
        <div className="space-y-4">
          {cartItems.map((cartItem) => {
            const itemCost = (cartItem.item.price || 0) * cartItem.quantity;
            const extraCost = cartItem.extras.reduce((acc, extra) => acc + extra.price, 0) * cartItem.quantity;
            const rowTotal = itemCost + extraCost;

            return (
              <div key={cartItem.cartId} className="bg-white p-4 rounded-2xl shadow-sm border border-stone-100 flex flex-col gap-2">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-lg text-stone-800 leading-tight">{cartItem.quantity}x {cartItem.item.name}</h3>
                    {cartItem.extras.length > 0 && (
                      <ul className="text-sm text-stone-500 mt-1">
                        {cartItem.extras.map((ex, exIdx) => (
                          <li key={exIdx}>+ {ex.name}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <div className="font-bold text-brand text-lg whitespace-nowrap">
                      {rowTotal.toLocaleString('es-ES', { minimumFractionDigits: 1 })} €
                    </div>
                    <button 
                      onClick={() => removeFromCart(cartItem.cartId)}
                      className="text-stone-400 text-xs font-bold uppercase tracking-wide hover:text-red-500 transition-colors"
                    >
                      Rimuovi
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {cartItems.length > 0 && (
        <>
          {/* Recap & Payment */}
          <div className="bg-white p-6 rounded-2xl border border-stone-200 mt-8 shadow-[0_8px_30px_rgba(0,0,0,0.04)]">
            <div className="flex justify-between items-center mb-4 text-stone-600 font-medium">
              <span>Subtotale</span>
              <span>{totalPrice.toLocaleString('es-ES', { minimumFractionDigits: 1 })} €</span>
            </div>
            <div className="flex justify-between items-center text-xl font-black text-brand pt-4 border-t border-stone-100">
              <span>Totale</span>
              <span>{totalPrice.toLocaleString('es-ES', { minimumFractionDigits: 1 })} €</span>
            </div>
          </div>

          <button 
            onClick={handleCheckout}
            className="w-full h-14 bg-brand text-white rounded-full font-bold text-lg mt-8 mb-4 active:scale-[0.98] transition-transform shadow-lg shadow-brand/30"
          >
             Invia Ordine alla Cucina
          </button>
        </>
      )}

      <Link href={`/app/${tableId}/menu`} className="block w-full h-14 bg-white border-2 border-stone-200 text-stone-600 rounded-full font-bold text-lg text-center flex items-center justify-center mb-12 hover:border-brand transition-colors">
         {cartItems.length === 0 ? "Torna al Menu" : "Aggiungi altro"}
      </Link>
    </div>
  );
}

export default function CartPage(props: { params: Promise<{ tableId: string }> }) {
  const params = React.use(props.params);
  return (
    <div className="min-h-screen bg-background font-sans">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-[#FDFBF7]/90 backdrop-blur-md border-b border-stone-200 px-4 py-4 flex items-center gap-4">
        <Link href={`/app/${params.tableId}/menu`} className="w-10 h-10 bg-white shadow-sm rounded-full flex items-center justify-center text-brand font-bold border border-stone-100">
          ←
        </Link>
        <div>
          <h1 className="text-xl font-bold text-brand">Carrello</h1>
          <p className="text-sm text-stone-500">Mesa {params.tableId}</p>
        </div>
      </header>

      <Suspense fallback={<div className="p-8 text-center text-stone-500">Caricamento carrello...</div>}>
        <CartLogic tableId={params.tableId} />
      </Suspense>
    </div>
  );
}
