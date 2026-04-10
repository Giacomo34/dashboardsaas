import React, { use, useState } from 'react';
import { menuData } from '@/data/menu';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { useLang } from '@/context/LangContext';

export default function MobileMenuPage(props: { params: Promise<{ tableId: string }> }) {
  const params = use(props.params);
  const { totalItems, totalPrice } = useCart();
  const [showCallModal, setShowCallModal] = useState(false);
  const { t, lang, setLang } = useLang();

  // Simple language switcher helper
  const nextLang = () => {
    if (lang === 'es') setLang('en');
    else if (lang === 'en') setLang('it');
    else setLang('es');
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] font-sans pb-24 text-stone-900 relative">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-[#FDFBF7]/90 backdrop-blur-md border-b border-stone-200 px-4 py-4">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-xl font-bold text-[#800020]">Babaua Chiringuito</h1>
            <p className="text-sm text-stone-500">{t('mesa')} {params.tableId}</p>
          </div>
          <div className="flex items-center gap-2">
            <button 
              onClick={nextLang}
              className="px-2 py-1 bg-stone-100 rounded text-xs font-bold uppercase text-stone-600 border border-stone-200"
            >
              {lang === 'es' ? '🇪🇸 ES' : lang === 'en' ? '🇬🇧 EN' : '🇮🇹 IT'}
            </button>
            <button 
              onClick={() => setShowCallModal(true)}
              className="w-10 h-10 rounded-full bg-stone-100 flex items-center justify-center text-xl hover:bg-stone-200 transition-colors shadow-sm"
            >
              🛎️
            </button>
          </div>
        </div>
      </header>

      {/* Categorie Scroll (Orizzontale) */}
      <div className="overflow-x-auto whitespace-nowrap px-4 py-3 sticky top-[73px] bg-[#FDFBF7] z-30 mb-4 shadow-sm" style={{ scrollbarWidth: 'none' }}>
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
              {category.items.map((item) => {
                // Configuro allergeni
                const getAllergenEmoji = (a: string) => {
                  const l = a.toLowerCase();
                  if (l.includes('gluten')) return '🌾';
                  if (l.includes('lácteo') || l.includes('lacteo')) return '🥛';
                  if (l.includes('fruto') || l.includes('nuez') || l.includes('sésamo')) return '🥜';
                  if (l.includes('huevo')) return '🥚';
                  if (l.includes('pescado')) return '🐟';
                  if (l.includes('molusco') || l.includes('crustáceo') || l.includes('marisco')) return '🦐';
                  if (l.includes('soja') || l.includes('soya')) return '🌱';
                  if (l.includes('mostaza')) return '🌭';
                  if (l.includes('sulfito')) return '🍷';
                  return '';
                };

                return (
                 <Link
                  key={item.id}
                  href={`/app/${params.tableId}/item/${item.id}`}
                  className="bg-white p-4 rounded-2xl shadow-sm border border-stone-100 flex flex-col gap-2 active:scale-[0.98] transition-transform"
                 >
                  <div className="flex justify-between items-start gap-4">
                    <div className="flex-1">
                      <div className="flex items-center flex-wrap gap-1.5 mb-1">
                        <h3 className="font-bold text-lg text-stone-800 leading-tight mr-1">{item.name}</h3>
                        {item.isSignature && <span className="text-[#E07A5F]" title="Signature">🐢</span>}
                        {item.allergens?.map(a => {
                          const emoji = getAllergenEmoji(a);
                          return emoji ? (
                            <span key={a} className="text-[13px] bg-stone-100 w-5 h-5 flex items-center justify-center rounded-full" title={a}>
                              {emoji}
                            </span>
                          ) : null;
                        })}
                      </div>
                      {item.description && (
                        <p className="text-stone-500 text-sm line-clamp-2 leading-relaxed mt-1">
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
                        {t('vegan')}
                      </span>
                    )}
                    {item.isVegetarian && !item.isVegan && (
                      <span className="px-2 py-0.5 rounded-sm bg-green-50 justify-center border border-green-200 text-green-700 text-[10px] font-bold uppercase tracking-wider">
                        {t('vegetarian')}
                      </span>
                    )}
                     {item.isKids && (
                      <span className="px-2 py-0.5 rounded-sm bg-blue-100 text-blue-700 text-[10px] font-bold uppercase tracking-wider">
                        Kids
                      </span>
                    )}
                  </div>
                 </Link>
                );
              })}
            </div>
          </section>
        ))}
      </main>

      {/* Floating Cart Badge */}
      {totalItems > 0 && (
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-transparent z-40 pointer-events-none">
          <Link href={`/app/${params.tableId}/cart`} className="pointer-events-auto bg-accent hover:bg-brand transition-colors text-white rounded-full p-4 flex items-center justify-between shadow-[0_8px_30px_rgba(224,122,95,0.4)]">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center font-bold text-sm">
                {totalItems}
              </div>
              <span className="font-bold text-lg">{t('viewCart')}</span>
            </div>
            <span className="font-bold text-lg">€ {totalPrice.toLocaleString('es-ES', { minimumFractionDigits: 1 })}</span>
          </Link>
        </div>
      )}

      {/* Call Waiter Modal */}
      {showCallModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center p-4">
           <div className="bg-white w-full max-w-sm rounded-3xl p-6 shadow-2xl animate-in slide-in-from-bottom-10">
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-bold text-xl text-stone-800">{t('needHelp')}</h3>
                <button onClick={() => setShowCallModal(false)} className="w-8 h-8 bg-stone-100 rounded-full flex items-center justify-center text-stone-500">✕</button>
              </div>
              <div className="grid grid-cols-2 gap-3 mb-6">
                 <button onClick={() => setShowCallModal(false)} className="flex flex-col items-center justify-center gap-2 p-4 bg-stone-50 rounded-2xl border border-stone-100 hover:border-brand active:bg-stone-100 transition-colors">
                   <span className="text-2xl">💸</span>
                   <span className="text-xs font-bold text-stone-700">{t('bill')}</span>
                 </button>
                 <button onClick={() => setShowCallModal(false)} className="flex flex-col items-center justify-center gap-2 p-4 bg-stone-50 rounded-2xl border border-stone-100 hover:border-brand active:bg-stone-100 transition-colors">
                   <span className="text-2xl">🧻</span>
                   <span className="text-xs font-bold text-stone-700">{t('clean')}</span>
                 </button>
                 <button onClick={() => setShowCallModal(false)} className="flex flex-col items-center justify-center gap-2 p-4 bg-stone-50 rounded-2xl border border-stone-100 hover:border-brand active:bg-stone-100 transition-colors">
                   <span className="text-2xl">💧</span>
                   <span className="text-xs font-bold text-stone-700">{t('water')}</span>
                 </button>
                 <button onClick={() => setShowCallModal(false)} className="flex flex-col items-center justify-center gap-2 p-4 bg-stone-50 rounded-2xl border border-stone-100 hover:border-brand active:bg-stone-100 transition-colors">
                   <span className="text-2xl">🙋‍♂️</span>
                   <span className="text-xs font-bold text-stone-700">{t('staff')}</span>
                 </button>
              </div>
              <button onClick={() => setShowCallModal(false)} className="w-full py-3 text-stone-400 font-bold text-sm hover:text-stone-600">
                {t('cancel')}
              </button>
           </div>
        </div>
      )}
    </div>
  );
}
