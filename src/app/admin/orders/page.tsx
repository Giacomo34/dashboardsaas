import React from 'react';

const mockOrders = [
  { id: 'ORD-9842', table: '14', status: 'In preparazione', time: '12:34', items: ['2x Sandwich de salchichón', '1x Bowl del Olimpo', '2x Aperol spritz'], total: 34.0, isVip: false },
  { id: 'ORD-9843', table: '2', status: 'In attesa', time: '12:38', items: ['1x La Nórdica', '1x Edamame Flow', '2x Acqua Frizzante'], total: 24.7, isVip: true },
  { id: 'ORD-9844', table: '8', status: 'In preparazione', time: '12:41', items: ['3x Bikini 2.0', '1x La Campesina'], total: 29.7, isVip: false },
  { id: 'ORD-9845', table: '11', status: 'Pronto per il servizio', time: '12:28', items: ['4x Campari Spritz', '1x El Dúo ibérico'], total: 37.2, isVip: false },
  { id: 'ORD-9846', table: '5', status: 'In attesa', time: '12:44', items: ['1x Suka chicken pesto', '1x Hum-Baba'], total: 20.0, isVip: false },
];

export default function AdminOrders() {
  return (
    <div className="space-y-8 pb-12">
      <header className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-black text-stone-800">Ordini Live (Kitchen Display)</h2>
          <p className="text-stone-500 mt-1">Gestione flussi ordini dai QR Code dei tavoli</p>
        </div>
        <div className="flex gap-3">
          <button className="bg-white border border-stone-200 text-stone-600 px-4 py-2 rounded-xl font-bold shadow-sm">Pausa Ordini (Rush Hour)</button>
          <button className="bg-brand text-white px-4 py-2 rounded-xl font-bold shadow-sm">Nuovo Ordine Manuale</button>
        </div>
      </header>

      {/* Kanban Board like view */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Colonna: In Attesa */}
        <div className="bg-stone-100 rounded-2xl p-4 border border-stone-200">
          <h3 className="font-bold text-stone-800 mb-4 flex justify-between items-center">
            DA PREPARARE 
            <span className="bg-stone-200 text-stone-600 px-2 py-0.5 rounded text-sm">2</span>
          </h3>
          <div className="space-y-4">
            {mockOrders.filter(o => o.status === 'In attesa').map(order => (
               <div key={order.id} className="bg-white p-4 rounded-xl border border-stone-200 shadow-sm relative overflow-hidden">
                 {order.isVip && <div className="absolute top-0 inset-x-0 h-1 bg-yellow-400"></div>}
                 <div className="flex justify-between items-start mb-3">
                   <div className="font-black text-xl text-brand">Mesa {order.table}</div>
                   <div className="text-xs font-bold text-stone-400">{order.time}</div>
                 </div>
                 <ul className="text-sm font-medium text-stone-700 space-y-1 mb-4">
                   {order.items.map((it, idx) => <li key={idx}>• {it}</li>)}
                 </ul>
                 <button className="w-full bg-accent text-white py-2 rounded-lg font-bold text-sm shadow-sm hover:bg-brand transition-colors">
                   Inizia Preparazione
                 </button>
               </div>
            ))}
          </div>
        </div>

        {/* Colonna: In Preparazione */}
        <div className="bg-brand/[0.03] rounded-2xl p-4 border border-brand/10">
          <h3 className="font-bold text-brand mb-4 flex justify-between items-center">
            IN PREPARAZIONE 
            <span className="bg-brand text-white px-2 py-0.5 rounded text-sm">2</span>
          </h3>
          <div className="space-y-4">
             {mockOrders.filter(o => o.status === 'In preparazione').map(order => (
               <div key={order.id} className="bg-white p-4 rounded-xl border border-stone-200 shadow-[0_4px_15px_rgba(128,0,32,0.05)] relative overflow-hidden">
                 <div className="flex justify-between items-start mb-3">
                   <div className="font-black text-xl text-brand">Mesa {order.table}</div>
                   <div className="text-xs font-bold text-orange-500 animate-pulse">{order.time}</div>
                 </div>
                 <ul className="text-sm font-medium text-stone-700 space-y-1 mb-4">
                   {order.items.map((it, idx) => <li key={idx}>• {it}</li>)}
                 </ul>
                 <button className="w-full bg-green-500 text-white py-2 rounded-lg font-bold text-sm shadow-sm hover:bg-green-600 transition-colors">
                   Segna come Pronto
                 </button>
               </div>
            ))}
          </div>
        </div>

        {/* Colonna: Pronto */}
        <div className="bg-green-50 rounded-2xl p-4 border border-green-100">
          <h3 className="font-bold text-green-700 mb-4 flex justify-between items-center">
            PRONTO (SERVIZIO) 
            <span className="bg-green-200 text-green-800 px-2 py-0.5 rounded text-sm">1</span>
          </h3>
          <div className="space-y-4">
            {mockOrders.filter(o => o.status === 'Pronto per il servizio').map(order => (
               <div key={order.id} className="bg-white p-4 rounded-xl border border-green-200 shadow-sm relative overflow-hidden">
                 <div className="flex justify-between items-start mb-3">
                   <div className="font-black text-xl text-green-700">Mesa {order.table}</div>
                   <div className="text-xs font-bold text-stone-400">{order.time}</div>
                 </div>
                 <ul className="text-sm font-medium text-stone-500 space-y-1 opacity-70 mb-4 line-through">
                   {order.items.map((it, idx) => <li key={idx}>• {it}</li>)}
                 </ul>
                 <button className="w-full bg-stone-100 text-stone-500 py-2 rounded-lg font-bold text-sm hover:bg-stone-200 transition-colors">
                   Archivia
                 </button>
               </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
