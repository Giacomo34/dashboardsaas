import React from 'react';
import { menuData, MenuItem } from '@/data/menu';

export default function KitchenMargin() {
  let allItems: MenuItem[] = [];
  menuData.forEach(cat => {
    allItems = allItems.concat(cat.items);
  });

  // Calculate some fake margins for visual effect
  const itemsWithMargin = allItems.map(item => {
    const fakeCost = item.price ? (item.price * (Math.random() * 0.3 + 0.15)) : 2.5; 
    const margin = item.price ? ((item.price - fakeCost) / item.price) * 100 : 0;
    return { ...item, fakeCost, margin };
  }).filter(i => i.price).sort((a, b) => b.margin - a.margin);

  return (
    <div className="space-y-8 pb-12">
      <header className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-black text-stone-800">Analisi Margini & Menu Engineering</h2>
          <p className="text-stone-500 mt-1">Impatto sui costi e performance del Menu Babaua</p>
        </div>
        <div className="flex gap-3">
          <button className="bg-brand text-white px-4 py-2 rounded-xl font-bold shadow-sm">Esporta in Excel</button>
        </div>
      </header>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm">
          <p className="text-stone-500 font-bold uppercase tracking-wider text-xs mb-2">Food Cost Medio</p>
          <div className="text-3xl font-black text-stone-800">22.4%</div>
          <p className="text-green-600 text-sm mt-2 font-medium">Ottimo, sotto la soglia del 30%</p>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm">
          <p className="text-stone-500 font-bold uppercase tracking-wider text-xs mb-2">Piatto Più Profittevole</p>
          <div className="text-2xl font-black text-brand line-clamp-1">{itemsWithMargin[0]?.name || '-'}</div>
          <p className="text-stone-500 text-sm mt-2 font-medium">Margine netto: {itemsWithMargin[0]?.margin.toFixed(1)}%</p>
        </div>
        <div className="bg-red-50 p-6 rounded-2xl border border-red-100 shadow-sm">
           <p className="text-red-800/60 font-bold uppercase tracking-wider text-xs mb-2">Piatto Critico (Da Rivedere)</p>
           <div className="text-2xl font-black text-red-700 line-clamp-1">{itemsWithMargin[itemsWithMargin.length - 1]?.name || '-'}</div>
           <p className="text-red-700/80 text-sm mt-2 font-medium">Food Cost troppo alto: {(100 - (itemsWithMargin[itemsWithMargin.length - 1]?.margin || 0)).toFixed(1)}%</p>
        </div>
      </div>

      {/* Matrix / Table */}
      <div className="bg-white rounded-2xl border border-stone-200 shadow-sm overflow-hidden">
         <div className="p-6 border-b border-stone-100 bg-stone-50 flex justify-between items-center">
            <h3 className="font-bold text-lg text-stone-800">Dettaglio Prodotti (Cost vs Price)</h3>
            <div className="flex gap-2">
              <span className="bg-white border border-stone-200 text-stone-600 px-3 py-1 rounded text-sm font-bold shadow-sm cursor-pointer">Tutti</span>
              <span className="bg-transparent text-stone-400 px-3 py-1 rounded text-sm font-bold cursor-pointer hover:bg-stone-100">Bocadillos</span>
              <span className="bg-transparent text-stone-400 px-3 py-1 rounded text-sm font-bold cursor-pointer hover:bg-stone-100">Preliminares</span>
            </div>
         </div>
         <div className="overflow-x-auto">
           <table className="w-full text-left border-collapse">
             <thead>
               <tr className="bg-white border-b border-stone-200 text-xs uppercase tracking-wider text-stone-400">
                 <th className="p-4 font-bold">Prodotto</th>
                 <th className="p-4 font-bold">Prezzo di Vendita</th>
                 <th className="p-4 font-bold">Costo Stimato (Food Cost)</th>
                 <th className="p-4 font-bold">Margine %</th>
                 <th className="p-4 font-bold">Azione Suggerita</th>
               </tr>
             </thead>
             <tbody className="divide-y divide-stone-100">
               {itemsWithMargin.map((item, idx) => (
                 <tr key={idx} className="hover:bg-stone-50 transition-colors">
                   <td className="p-4">
                     <span className="font-bold text-stone-800 block">{item.name}</span>
                     <span className="text-xs text-stone-400 uppercase font-bold">{item.isVegan ? 'Vegano' : item.isVegetarian ? 'Vegetariano' : 'Standard'}</span>
                   </td>
                   <td className="p-4 font-bold text-stone-800">
                     € {item.price?.toFixed(2)}
                   </td>
                   <td className="p-4 font-medium text-stone-500">
                     € {item.fakeCost.toFixed(2)}
                   </td>
                   <td className="p-4">
                     <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-${item.margin > 70 ? 'green' : item.margin > 50 ? 'yellow' : 'red'}-100 text-${item.margin > 70 ? 'green' : item.margin > 50 ? 'yellow' : 'red'}-800`}>
                       {item.margin.toFixed(1)}%
                     </span>
                   </td>
                   <td className="p-4">
                     <button className="text-brand font-bold text-sm hover:underline">
                       {item.margin > 75 ? 'Metti in Promo' : item.margin < 50 ? 'Alza Prezzo' : 'Mantieni'}
                     </button>
                   </td>
                 </tr>
               ))}
             </tbody>
           </table>
         </div>
      </div>
    </div>
  );
}
