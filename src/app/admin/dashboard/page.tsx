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
      <header className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-black text-stone-800">Advanced Dashboard</h2>
          <p className="text-stone-500 mt-1">Dati in tempo reale dal menu Babaua e metriche operative</p>
        </div>
        <div className="flex items-center gap-3 bg-green-50 text-green-700 px-4 py-2 rounded-xl border border-green-200 shadow-sm font-medium text-sm">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
          </span>
          Sistema Notifiche Email/SMS Attivo
        </div>
      </header>

      {/* KPI Cards (Primary) */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm">
          <p className="text-stone-500 font-bold uppercase tracking-wider text-xs mb-2">Incasso Oggi</p>
          <div className="text-3xl font-black text-brand">€ 3.840</div>
          <p className="text-green-600 text-sm mt-2 font-bold flex items-center gap-1">↑ +18.4% rispetto a ieri</p>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm">
          <p className="text-stone-500 font-bold uppercase tracking-wider text-xs mb-2">Ordini Live (QR)</p>
          <div className="text-3xl font-black text-brand">32</div>
          <p className="text-stone-400 text-sm mt-2 font-medium">Picco di ordini in corso</p>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm">
          <p className="text-stone-500 font-bold uppercase tracking-wider text-xs mb-2">Avg. Scontrino</p>
          <div className="text-3xl font-black text-brand">€ 34,20</div>
          <p className="text-green-600 text-sm mt-2 font-bold flex items-center gap-1">↑ +8% spinta Upselling</p>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm bg-accent text-white relative overflow-hidden">
          <div className="relative z-10">
            <p className="text-white/90 font-bold uppercase tracking-wider text-xs mb-2">Alert Magazzino</p>
            <div className="text-2xl font-black">Riordina Salmone</div>
            <p className="text-white/80 text-sm mt-2 font-medium">Stock critico per 'La Nórdica'</p>
          </div>
          <div className="absolute top-0 right-0 -mr-4 -mt-4 w-24 h-24 bg-white/10 rounded-full blur-xl"></div>
        </div>
      </div>

      {/* KPI Cards (Secondary / Advanced) */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-xl border border-stone-100 flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-stone-100 flex items-center justify-center text-xl">⏳</div>
          <div>
            <p className="text-stone-400 font-bold uppercase tracking-wider text-[10px]">Tempo Prep. Medio</p>
            <p className="text-xl font-bold text-stone-800">12 min</p>
          </div>
        </div>
        <div className="bg-white p-5 rounded-xl border border-stone-100 flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-stone-100 flex items-center justify-center text-xl">🔄</div>
          <div>
            <p className="text-stone-400 font-bold uppercase tracking-wider text-[10px]">Tavoli Ruotati</p>
            <p className="text-xl font-bold text-stone-800">48</p>
          </div>
        </div>
        <div className="bg-white p-5 rounded-xl border border-stone-100 flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-stone-100 flex items-center justify-center text-xl">📈</div>
          <div>
            <p className="text-stone-400 font-bold uppercase tracking-wider text-[10px]">% Extras Aggiunti</p>
            <p className="text-xl font-bold text-stone-800">62%</p>
          </div>
        </div>
        <div className="bg-white p-5 rounded-xl border border-stone-100 flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-stone-100 flex items-center justify-center text-xl">📧</div>
          <div>
            <p className="text-stone-400 font-bold uppercase tracking-wider text-[10px]">Email Clienti Raccolte</p>
            <p className="text-xl font-bold text-stone-800">1,204</p>
          </div>
        </div>
      </div>

      {/* Main Charts area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Top Seller from Real Menu */}
        <div className="col-span-2 bg-white rounded-2xl border border-stone-200 shadow-sm p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold text-stone-800">Top Sellers & Margini KPI</h3>
            <button className="text-brand font-bold text-sm bg-stone-50 px-4 py-2 rounded-lg">Scarica Report CSV</button>
          </div>
          <div className="space-y-4">
            {bestSellers.slice(0, 6).map((item, idx) => (
              <div key={idx} className="flex items-center justify-between p-4 bg-stone-50 rounded-xl border border-stone-100 hover:border-brand/30 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-white rounded flex items-center justify-center font-bold text-stone-400 shadow-sm border border-stone-100">
                    {idx + 1}
                  </div>
                  <div>
                    <h4 className="font-bold text-stone-800">{item.name}</h4>
                    <p className="text-xs text-stone-500 uppercase font-bold mt-1">
                       Food Cost: {Math.floor(Math.random() * 15 + 15)}% • Margine Netto: <span className="text-green-600">{Math.floor(Math.random() * 20 + 60)}%</span>
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-brand">{item.price ? `€ ${item.price}` : 'Variabile'}</div>
                  <div className="text-xs text-accent font-bold bg-accent/10 px-2 py-1 rounded inline-block mt-1">
                    {Math.floor(Math.random() * 80 + 30)} ordini oggi
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* AI, Insights & Marketing Automation */}
        <div className="space-y-6">
          <div className="bg-brand text-white p-6 rounded-2xl shadow-sm border border-brand">
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

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-stone-200">
             <h3 className="text-lg font-bold text-stone-800 mb-4 flex items-center gap-2">
               📧 Marketing Automation
             </h3>
             <div className="space-y-3 test-sm font-medium">
               <div className="flex justify-between items-center p-3 bg-stone-50 rounded-lg">
                 <span className="text-stone-700">Recensioni post-pasto</span>
                 <span className="text-green-600 text-xs font-bold bg-green-100 px-2 py-1 rounded">Attivo</span>
               </div>
               <div className="flex justify-between items-center p-3 bg-stone-50 rounded-lg">
                 <span className="text-stone-700">Promo "Torna da noi" (SMS)</span>
                 <span className="text-green-600 text-xs font-bold bg-green-100 px-2 py-1 rounded">Attivo</span>
               </div>
               <div className="flex justify-between items-center p-3 bg-stone-50 rounded-lg">
                 <span className="text-stone-700">Sconto Compleanno</span>
                 <span className="text-stone-400 text-xs font-bold bg-stone-200 px-2 py-1 rounded">In Pausa</span>
               </div>
             </div>
             <button className="w-full mt-4 bg-stone-100 text-stone-600 py-2 rounded-lg font-bold text-sm hover:bg-stone-200 transition-colors">
               Gestisci Campagne
             </button>
          </div>
        </div>

      </div>
    </div>
  );
}
