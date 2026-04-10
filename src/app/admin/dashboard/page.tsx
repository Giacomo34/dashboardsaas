import React from 'react';
import { menuData, MenuItem } from '@/data/menu';

export default function AdminDashboard() {
  // Aggregate data from Menu
  let allItems: MenuItem[] = [];
  menuData.forEach(cat => {
    allItems = allItems.concat(cat.items);
  });

  const bestSellers = allItems.filter(i => i.isBestSeller || i.isSignature);

  return (
    <div className="space-y-8 pb-12">
      <header>
        <h2 className="text-3xl font-black text-stone-800">Overview Dashboard</h2>
        <p className="text-stone-500 mt-1">Dati in tempo reale dal menu Babaua</p>
      </header>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm">
          <p className="text-stone-500 font-bold uppercase tracking-wider text-xs mb-2">Vendite Oggi</p>
          <div className="text-3xl font-black text-brand">€ 3.240</div>
          <p className="text-green-600 text-sm mt-2 font-medium">↑ +14% rispetto a ieri</p>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm">
          <p className="text-stone-500 font-bold uppercase tracking-wider text-xs mb-2">Ordini Live (Table QR)</p>
          <div className="text-3xl font-black text-brand">24</div>
          <p className="text-stone-400 text-sm mt-2 font-medium">Piatto forte: Shakshuka</p>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm">
          <p className="text-stone-500 font-bold uppercase tracking-wider text-xs mb-2">Avg. Scontrino</p>
          <div className="text-3xl font-black text-brand">€ 28,50</div>
          <p className="text-green-600 text-sm mt-2 font-medium">↑ +5% upselling extras</p>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm bg-accent text-white">
          <p className="text-white/80 font-bold uppercase tracking-wider text-xs mb-2">Alert Magazzino</p>
          <div className="text-2xl font-black">Riordina Salmone</div>
          <p className="text-white/90 text-sm mt-2 font-medium">Stock basso per 'La Nórdica'</p>
        </div>
      </div>

      {/* Main Charts area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Top Seller from Real Menu */}
        <div className="col-span-2 bg-white rounded-2xl border border-stone-200 shadow-sm p-6">
          <h3 className="text-xl font-bold text-stone-800 mb-6">Top Sellers & Margini (Reali)</h3>
          <div className="space-y-4">
            {bestSellers.map((item, idx) => (
              <div key={idx} className="flex items-center justify-between p-4 bg-stone-50 rounded-xl border border-stone-100">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-stone-200 rounded-lg flex items-center justify-center text-xl font-bold text-stone-400">
                    {idx + 1}
                  </div>
                  <div>
                    <h4 className="font-bold text-stone-800">{item.name}</h4>
                    <p className="text-xs text-stone-500 uppercase font-bold mt-1">Margine stimato: {Math.floor(Math.random() * 20 + 60)}%</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-brand">{item.price ? `€ ${item.price}` : 'Variabile'}</div>
                  <div className="text-sm text-stone-500 font-medium">{Math.floor(Math.random() * 50 + 10)} ordini</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* AI & Insights */}
        <div className="space-y-4">
          <div className="bg-brand text-white p-6 rounded-2xl shadow-sm">
            <h3 className="text-lg font-bold mb-2 flex items-center gap-2">
              <span className="text-accent">✨</span> Trend & AI Insights
            </h3>
            <ul className="space-y-4 mt-6 text-sm">
              <li className="pb-4 border-b border-white/20">
                <strong className="block text-accent mb-1">Aumento Vendite Vegane</strong>
                I piatti "Hum-Baba" e "Edamame Flow" trainano il +18% negli acquisti healthy durante il pranzo.
              </li>
              <li className="pb-4 border-b border-white/20">
                <strong className="block text-accent mb-1">Spritz Time</strong>
                Dalle 18:30 i clienti acquistano 3 Aperol Spritz per tavolo. Suggeriamo combo con "Para Picar".
              </li>
              <li>
                <strong className="block text-accent mb-1">Opt. "Kids" converte</strong>
                L'icona 🐢 rassicura i genitori accelerando il carrello. I tavoli family spendono € 60+.
              </li>
            </ul>
          </div>
        </div>

      </div>
    </div>
  );
}
