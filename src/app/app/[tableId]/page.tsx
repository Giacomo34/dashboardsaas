import React, { use } from 'react';
import Link from 'next/link';
import { useLang } from '@/context/LangContext';

export default function TableSplash(props: { params: Promise<{ tableId: string }> }) {
  const params = use(props.params);
  const { t } = useLang();
  return (
    <div className="min-h-screen bg-brand flex flex-col items-center justify-center p-6 text-center font-sans">
      <div className="w-24 h-24 bg-accent/20 rounded-full flex items-center justify-center text-5xl mb-8 animate-bounce">
        🐢
      </div>
      
      <h1 className="text-4xl font-black text-white mb-2 tracking-tight">
        Babaua <br/> Chiringuito
      </h1>
      <p className="text-accent font-bold uppercase tracking-widest text-sm mb-12">
        {t('mesa')} {params.tableId}
      </p>

      <div className="bg-white/10 backdrop-blur-md border border-white/20 p-8 rounded-[2rem] max-w-sm w-full mx-auto shadow-2xl">
        <h2 className="text-white font-bold text-xl mb-4">{t('welcome')}</h2>
        <p className="text-white/80 font-medium leading-relaxed mb-8">
          {t('welcomeText')}
        </p>
        
        <Link 
          href={`/app/${params.tableId}/menu`}
          className="w-full h-14 bg-accent text-white rounded-full font-bold text-lg flex items-center justify-center transition-transform active:scale-95 shadow-lg shadow-accent/40 hover:bg-white hover:text-accent"
        >
          {t('openMenu')}
        </Link>
      </div>

      {/* Decorative footer */}
      <div className="mt-16 text-white/40 text-xs font-medium">
        {t('poweredBy')}
      </div>
    </div>
  );
}
