'use client';
import React from 'react';
import { menuData } from '@/data/menu';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';

export default function MobileMenuPage({ params }: { params: { tableId: string } }) {
  const { totalItems, totalPrice } = useCart();

  return (
    <div className="min-h-screen bg-[#FDFBF7] font-sans pb-24 text-stone-900">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-[#FDFBF7]/90 backdrop-blur-md border-b border-stone-200 px-4 py-4">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-xl font-bold text-[#800020]">Babaua Chiringuito</h1>
            <p className="text-sm text-stone-500">Mesa {params.tableId}</p>
          </div>
          <div className="w-10 h-10 rounded-full bg-[#E07A5F] flex items-center justify-center text-white font-bold">
            🐢
          </div>
        </div>
      </header>

      {/* Categorie Scroll (Orizzontale) */}
      <div className="overflow-x-auto whitespace-nowrap px-4 py-3 sticky top-[73px] bg-[#FDFBF7] z-40 mb-4 shadow-sm" style={{ scrollbarWidth: 'none' }}>
        <div className="flex gap-3">
          {menuData.map((category) => (
            <a
              key={category.id}
              href={`#${category.id}`}
              className="px-4 py-2 bg-stone-100 rounded-full text-sm font-semibold text-stone-600 hover:bg-[#800020] hover:text-white transition-colors"
            >
              {category.name}
            </a>
          ))}
        </div>
      </div>

      {/* Menu Sections */}
      <main className="px-4 space-y-10">
        {menuData.map((category) => (
          <section key={category.id} id={category.id} className="scroll-mt-32">
            <div className="mb-4">
              <h2 className="text-2xl font-black text-[#800020]">{category.name}</h2>
              {category.note && (
                <p className="text-sm font-medium text-[#E07A5F] uppercase tracking-wide mt-1">{category.note}</p>
              )}
            </div>

            <div className="flex flex-col gap-4">
              {category.items.map((item) => (
                <Link
                  key={item.id}
                  href={`/app/${params.tableId}/item/${item.id}`}
                  className="bg-white p-4 rounded-2xl shadow-sm border border-stone-100 flex flex-col gap-2 active:scale-[0.98] transition-transform"
                >
                  <div className="flex justify-between items-start gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-bold text-lg text-stone-800 leading-tight">{item.name}</h3>
                        {item.isSignature && <span className="text-[#E07A5F]" title="Signature">🐢</span>}
                      </div>
                      {item.description && (
                        <p className="text-stone-500 text-sm line-clamp-2 leading-relaxed">
                          {item.description}
                        </p>
                      )}
                    </div>
                    {item.price !== undefined && (
                      <div className="font-bold text-[#800020] text-lg whitespace-nowrap">
                        {item.price.toLocaleString('es-ES', { minimumFractionDigits: 1 })} €
                      </div>
                    )}
                  </div>

                  <div className="flex flex-wrap gap-2 mt-2">
                    {item.isBestSeller && (
                      <span className="px-2 py-0.5 rounded-sm bg-[#E07A5F] text-white text-[10px] font-bold uppercase tracking-wider">
                        Best Seller
                      </span>
                    )}
                    {item.isVegan && (
                      <span className="px-2 py-0.5 rounded-sm bg-green-100 text-green-700 text-[10px] font-bold uppercase tracking-wider">
                        Vegano
                      </span>
                    )}
                    {item.isVegetarian && !item.isVegan && (
                      <span className="px-2 py-0.5 rounded-sm bg-green-50 justify-center border border-green-200 text-green-700 text-[10px] font-bold uppercase tracking-wider">
                        Vegetariano
                      </span>
                    )}
                     {item.isKids && (
                      <span className="px-2 py-0.5 rounded-sm bg-blue-100 text-blue-700 text-[10px] font-bold uppercase tracking-wider">
                        Kids
                      </span>
                    )}
                    {item.allergens && item.allergens.length > 0 && (
                      <span className="text-[11px] text-stone-400 font-medium">
                         Alérgenos: {item.allergens.join(', ')}
                      </span>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </section>
        ))}
      </main>

      {/* Floating Cart Badge */}
      {totalItems > 0 && (
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-transparent z-50 pointer-events-none">
          <Link href={`/app/${params.tableId}/cart`} className="pointer-events-auto bg-accent hover:bg-brand transition-colors text-white rounded-full p-4 flex items-center justify-between shadow-[0_8px_30px_rgba(224,122,95,0.4)]">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center font-bold text-sm">
                {totalItems}
              </div>
              <span className="font-bold text-lg">Ver Carrito</span>
            </div>
            <span className="font-bold text-lg">€ {totalPrice.toLocaleString('es-ES', { minimumFractionDigits: 1 })}</span>
          </Link>
        </div>
      )}
    </div>
  );
}
