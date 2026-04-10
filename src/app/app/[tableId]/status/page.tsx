'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { useLang } from '@/context/LangContext';

export default function StatusPage(props: { params: Promise<{ tableId: string }> }) {
  const params = React.use(props.params);
  const { clearCart } = useCart();
  const { t } = useLang();
  const [orderId, setOrderId] = useState('');

  useEffect(() => {
    // Simuliamo l'invio dell'ordine
    setOrderId(Math.random().toString(36).substr(2, 6).toUpperCase());
    // Pulisce il carrello quando si arriva qui (ordine andato a buon fine)
    clearCart();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="min-h-screen bg-[#FDFBF7] font-sans flex flex-col pt-12 p-6">
      <div className="flex-1 flex flex-col items-center justify-center text-center">
        <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-5xl mb-8 shadow-[0_0_40px_rgba(34,197,94,0.3)]">
          ✓
        </div>
        
        <h1 className="text-3xl font-black text-brand mb-4">{t('orderReceived')}</h1>
        <p className="text-stone-600 text-lg mb-8 font-medium">
          {t('preparing')} <strong className="text-brand">{t('mesa')} {params.tableId}</strong>.
        </p>

        <div className="bg-white border border-stone-200 p-6 rounded-2xl w-full max-w-sm mb-12 shadow-sm">
          <p className="text-stone-400 font-bold uppercase tracking-widest text-xs mb-1">{t('orderNum')}</p>
          <p className="text-2xl font-mono font-bold text-stone-800">#{orderId || '...'}</p>
        </div>
      </div>

      <div className="space-y-4">
        <Link 
          href={`/app/${params.tableId}/menu`}
          className="block w-full h-14 border-[3px] border-accent text-accent rounded-full font-bold text-lg text-center flex items-center justify-center active:bg-accent/10 transition-colors"
        >
          {t('orderAgain')}
        </Link>
      </div>

    </div>
  );
}
