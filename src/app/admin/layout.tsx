import React from 'react';
import Link from 'next/link';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-stone-50 text-stone-900 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-brand text-white flex flex-col">
        <div className="p-6">
          <h1 className="text-2xl font-black flex items-center gap-2">
             <span className="text-accent">🐢</span> Babaua
          </h1>
          <p className="text-white/60 text-sm mt-1">Management Hub</p>
        </div>
        <nav className="flex-1 px-4 space-y-2 mt-4">
          <Link href="/admin/dashboard" className="block px-4 py-3 bg-white/10 rounded-lg font-medium text-white">
            Overview Dash
          </Link>
          <Link href="/admin/orders" className="block px-4 py-3 hover:bg-white/5 rounded-lg text-white/80 transition-colors">
            Ordini Live
          </Link>
          <Link href="/admin/kitchen-margin" className="block px-4 py-3 hover:bg-white/5 rounded-lg text-white/80 transition-colors">
            Margini & Menu
          </Link>
        </nav>
        <div className="p-4 border-t border-white/10">
          <p className="text-xs text-white/40 text-center">Demo Admin v1.0</p>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 h-screen overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
