import React from 'react';
import Link from 'next/link';

export default function LandingPage() {
  return (
    <div className="bg-background min-h-screen font-sans text-stone-900 border-t-8 border-brand">
      {/* Navbar */}
      <nav className="flex justify-between items-center p-6 lg:px-12">
        <div className="text-2xl font-black tracking-tight flex items-center gap-2">
           <span className="text-accent text-3xl">🐢</span> SmartChiringuito
        </div>
        <div className="hidden md:flex gap-8 font-medium text-stone-600">
           <a href="#features" className="hover:text-brand">Features</a>
           <a href="#demo" className="hover:text-brand">Demo</a>
           <a href="#pricing" className="hover:text-brand">Pricing</a>
        </div>
        <Link href="/admin/dashboard" className="px-6 py-3 bg-brand text-white font-bold rounded-full hover:bg-stone-800 transition-colors">
          Admin Login
        </Link>
      </nav>

      {/* Hero Section */}
      <header className="py-20 px-6 lg:px-12 max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16">
        <div className="lg:w-1/2 space-y-8">
          <div className="inline-block px-4 py-2 bg-accent/10 text-accent font-bold rounded-full text-sm uppercase tracking-wider mb-2">
            Babaua Edition
          </div>
          <h1 className="text-5xl lg:text-7xl font-black text-brand leading-[1.1] tracking-tight">
            Il tuo Menu digitale, <br/><span className="text-accent underline decoration-4 underline-offset-4">esattamente</span> come lo hai pensato.
          </h1>
          <p className="text-xl text-stone-600 leading-relaxed font-medium">
            SmartChiringuito SaaS Demo trasforma il menu cartaceo del tuo locale in un'esperienza digitale premium, veloce e capace di aumentare i margini e l'upselling autonomamente.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
             <Link href="/app/9/menu" className="h-14 px-8 bg-brand text-white text-lg font-bold rounded-full flex items-center justify-center hover:bg-stone-800 transition-colors shadow-lg">
               Prova Esperienza Cliente
             </Link>
             <Link href="/admin/dashboard" className="h-14 px-8 bg-white border-2 border-stone-200 text-stone-700 text-lg font-bold rounded-full flex items-center justify-center hover:border-brand hover:text-brand transition-colors">
               Vedi la Dashboard
             </Link>
          </div>
        </div>
        
        {/* Mockup Showcase */}
        <div className="lg:w-1/2 relative flex justify-center perspective-1000">
           <div className="relative w-[300px] h-[600px] bg-stone-900 rounded-[3rem] border-[10px] border-stone-900 shadow-2xl overflow-hidden flex-shrink-0 z-20 transform rotate-y-[-10deg] rotate-x-[5deg]">
             {/* Notch */}
             <div className="absolute top-0 inset-x-0 h-6 bg-stone-900 z-50 rounded-b-xl w-32 mx-auto"></div>
             {/* Iframe for actual demo preview */}
             <iframe src="/app/1/menu" className="w-full h-full bg-white relative z-40 ptr-events-none" style={{ pointerEvents: 'none' }} />
           </div>
           
           {/* Decorative elements behind */}
           <div className="absolute top-1/2 right-10 transform -translate-y-1/2 w-64 h-64 bg-accent/20 rounded-full blur-3xl -z-10"></div>
           <div className="absolute bottom-10 left-10 w-48 h-48 bg-brand/10 rounded-full blur-2xl -z-10"></div>
        </div>
      </header>

      {/* Feature section */}
      <section className="bg-white py-24 px-6 lg:px-12 border-t border-stone-100">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl font-black text-brand mb-16">Ottimizzato per Locale e Gestore</h2>
          
          <div className="grid md:grid-cols-3 gap-12 text-left">
            <div className="space-y-4">
               <div className="w-14 h-14 bg-brand/10 rounded-2xl flex items-center justify-center text-2xl text-brand font-bold">📲</div>
               <h3 className="text-2xl font-bold text-stone-800">UX senza frizioni</h3>
               <p className="text-stone-600 leading-relaxed font-medium">Basta QR code goffi e PDF da zoomare. Struttura rapida, divisa in categorie logiche e scorrevoli. Con "Añade a tu plato" integrato per upselling istantaneo.</p>
            </div>
            
            <div className="space-y-4">
               <div className="w-14 h-14 bg-accent/10 rounded-2xl flex items-center justify-center text-2xl text-accent font-bold">📊</div>
               <h3 className="text-2xl font-bold text-stone-800">Dati e Margini</h3>
               <p className="text-stone-600 leading-relaxed font-medium">Scopri subito che il "Sandwich de salchichón" è il vero best seller, analizzi i margini sul tonno fresco e configuri dashboard personalizzate per il back office.</p>
            </div>
            
            <div className="space-y-4">
               <div className="w-14 h-14 bg-stone-100 rounded-2xl flex items-center justify-center text-2xl text-stone-500 font-bold">🎨</div>
               <h3 className="text-2xl font-bold text-stone-800">100% Personalizzato</h3>
               <p className="text-stone-600 leading-relaxed font-medium">Rispecchia l'identità del Babaua: Crema, Granata, Terracotta e l'icona "🐢" usata come badge Signature/Kids.</p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
