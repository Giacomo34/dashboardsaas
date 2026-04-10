'use client';
import React, { createContext, useContext, useState } from 'react';

type Lang = 'es' | 'en' | 'it';

const translations = {
  es: {
    welcome: "¡Bienvenido/a!",
    welcomeText: "Haz tu pedido directamente desde tu móvil. Nuestro personal lo preparará y te lo llevará a la mesa.",
    openMenu: "Abrir la Carta",
    mesa: "Mesa",
    poweredBy: "Powered by SmartChiringuito",
    back: "Volver",
    addToCart: "Añadir al Carrito",
    add: "Añadir a tu plato",
    notes: "Notas / Peticiones",
    writeNote: "Ej. Sin cebolla, extra picante...",
    cart: "Carrito",
    viewCart: "Ver Carrito",
    emptyCart: "Tu carrito está vacío.",
    yourOrder: "Tu Pedido",
    subtotal: "Subtotal",
    tax: "IVA (10%)",
    total: "Total",
    checkout: "Enviar a Cocina",
    payApple: "Pay",
    payCash: "Pagar en Caja",
    processing: "Procesando el pago...",
    secureConn: "Conexión segura en curso",
    backToMenu: "Volver a la Carta",
    addMore: "Añadir más cosas",
    remove: "Quitar",
    needHelp: "¿Necesitas ayuda?",
    bill: "Cuenta",
    clean: "Limpiar",
    water: "Agua",
    staff: "Camarero",
    cancel: "Cancelar",
    orderReceived: "¡Pedido Recibido!",
    preparing: "La cocina ya está preparando tus platos para la",
    orderNum: "Número de Pedido",
    orderAgain: "Pedir de nuevo",
    vegetarian: "Vegetariano",
    vegan: "Vegano",
    allergens: "Alérgenos",
    loading: "Cargando..."
  },
  en: {
    welcome: "Welcome!",
    welcomeText: "Order directly from your smartphone. Our team will prepare it and bring it to your table.",
    openMenu: "Open Menu",
    mesa: "Table",
    poweredBy: "Powered by SmartChiringuito",
    back: "Back",
    addToCart: "Add to Order",
    add: "Add to your dish",
    notes: "Notes / Requests",
    writeNote: "Ex. No onions, extra spicy...",
    cart: "Cart",
    viewCart: "View Cart",
    emptyCart: "Your cart is empty.",
    yourOrder: "Your Order",
    subtotal: "Subtotal",
    tax: "Tax (10%)",
    total: "Total",
    checkout: "Send to Kitchen",
    payApple: "Pay",
    payCash: "Pay at Register",
    processing: "Processing payment...",
    secureConn: "Establishing secure connection",
    backToMenu: "Back to Menu",
    addMore: "Add more items",
    remove: "Remove",
    needHelp: "Need help?",
    bill: "Bill",
    clean: "Clean",
    water: "Water",
    staff: "Waiter",
    cancel: "Cancel",
    orderReceived: "Order Received!",
    preparing: "The kitchen is already preparing your food for",
    orderNum: "Order Number",
    orderAgain: "Order again",
    vegetarian: "Vegetarian",
    vegan: "Vegan",
    allergens: "Allergens",
    loading: "Loading..."
  },
  it: {
    welcome: "Benvenuto!",
    welcomeText: "Ordina direttamente dal tuo smartphone. Il nostro staff preparerà tutto e te lo porterà al tavolo.",
    openMenu: "Apri il Menu",
    mesa: "Tavolo",
    poweredBy: "Powered by SmartChiringuito",
    back: "Indietro",
    addToCart: "Aggiungi al carrello",
    add: "Aggiungi al tuo piatto",
    notes: "Note al ristorante",
    writeNote: "Es. Senza cipolla, ben cotto...",
    cart: "Carrello",
    viewCart: "Vedi Carrello",
    emptyCart: "Il tuo carrello è vuoto.",
    yourOrder: "Il tuo Ordine",
    subtotal: "Subtotale",
    tax: "IVA (10%)",
    total: "Totale",
    checkout: "Invia Ordine alla Cucina",
    payApple: "Pay",
    payCash: "Paga in Cassa",
    processing: "Elaborazione Pagamento...",
    secureConn: "Connessione sicura in corso con Apple Pay",
    backToMenu: "Torna al Menu",
    addMore: "Aggiungi altro",
    remove: "Rimuovi",
    needHelp: "Serve aiuto?",
    bill: "Conto",
    clean: "Pulizia",
    water: "Acqua",
    staff: "Staff",
    cancel: "Annulla",
    orderReceived: "Ordine Ricevuto!",
    preparing: "La cucina sta già preparando i tuoi piatti per il",
    orderNum: "Numero Ordine",
    orderAgain: "Ordina di nuovo",
    vegetarian: "Vegetariano",
    vegan: "Vegano",
    allergens: "Allergeni",
    loading: "Caricamento..."
  }
};

type TransKey = keyof typeof translations['es'];

interface LangContextType {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (key: TransKey) => string;
}

const LangContext = createContext<LangContextType>({
  lang: 'es',
  setLang: () => {},
  t: (key) => translations['es'][key] || ''
});

export function LangProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Lang>('es'); // Default to Spanish as requested

  const t = (key: TransKey) => {
    return translations[lang][key] || key;
  };

  return (
    <LangContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LangContext.Provider>
  );
}

export const useLang = () => useContext(LangContext);
